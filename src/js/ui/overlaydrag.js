(function () {
  "use strict";

  // the overlay drag subsystem - dragging folders around the canvas, and dragging users between
  // folders / the unsorted area / the page. shares state + core helpers via window.tum._ov (set up
  // in overlay.js) and calls the modals file through it. manifest order: overlay.js, this, overlaymodals.js
  const O = window.tum._ov;
  const {state, pan, ICONS, render, showbackdrop, hidebackdrop, closeoverlay, toast} = O;

  const THRESHOLD = 6;

  function attachfolderdrag(node, f) {
    const head = node.querySelector(".tumfolderhead");
    let tracking = null;
    head.addEventListener("pointerdown", e => {
      if (e.target.closest(".tumfolderremove, .tumfoldercollapse")) return;
      // folders are positioned by their top-left corner (not centered), so track the exact
      // spot within the folder the user grabbed it - without this, starting a drag from the
      // header snaps the whole folder to re-center itself under the cursor instead of moving
      // smoothly from wherever it was actually grabbed
      const rect = node.getBoundingClientRect();
      tracking = {startx: e.clientX, starty: e.clientY, offsetx: e.clientX - rect.left, offsety: e.clientY - rect.top, dragging: false};
      const move = ev => {
        if (!tracking) return;
        const dx = ev.clientX - tracking.startx, dy = ev.clientY - tracking.starty;
        if (!tracking.dragging) {
          if (Math.hypot(dx, dy) < THRESHOLD) return;
          tracking.dragging = true;
          O.root.classList.add("tumfolderdragging");
        }
        // subtract the pan so the folder tracks the cursor even when the canvas is panned; no
        // clamp to the viewport - the canvas is infinite, drag it off-screen and pan back to it
        const px = ev.clientX - tracking.offsetx - pan.x;
        const py = ev.clientY - tracking.offsety - pan.y;
        node.style.left = (px / window.innerWidth * 100) + "%";
        node.style.top = (py / window.innerHeight * 100) + "%";
      };
      const up = ev => {
        document.removeEventListener("pointermove", move);
        document.removeEventListener("pointerup", up);
        O.root.classList.remove("tumfolderdragging");
        if (tracking && tracking.dragging) {
          const px = ev.clientX - tracking.offsetx - pan.x;
          const py = ev.clientY - tracking.offsety - pan.y;
          tum.folders.move(f.id, px / window.innerWidth * 100, py / window.innerHeight * 100);
        } else if (tracking) {
          O.openeditmodal(f);
        }
        tracking = null;
      };
      document.addEventListener("pointermove", move);
      document.addEventListener("pointerup", up);
    });
  }

  function attachmemberdrag(row, source, m) {
    row.addEventListener("pointerdown", e => {
      // the remove/reason buttons stay click-only (no threshold), but everything else -
      // including the copyable name/handle text - can start a drag once it moves enough,
      // same threshold pattern as the click-vs-drag split everywhere else in this file
      if (e.target.closest(".tumfoldermemberremove, .tumloosechipremove, .tumreasonbadge")) return;
      const startx = e.clientX, starty = e.clientY;
      let tracking = true, dragging = false;
      const move = ev => {
        if (!tracking) return;
        if (!dragging) {
          if (Math.hypot(ev.clientX - startx, ev.clientY - starty) < THRESHOLD) return;
          dragging = true;
          const user = {handle: m.handle, displayname: m.displayname, avatarurl: m.avatarurl, sourceurl: m.sourceurl, reason: m.reason, badges: m.badges || []};
          // render() inside begindrag rebuilds the freeform and hides this person's fresh copy
          // itself (via isdragged), so nothing to hide on the old node here
          begindrag(user, ev.clientX, ev.clientY, source);
        }
        updatedrag(ev.clientX, ev.clientY);
      };
      const up = ev => {
        tracking = false;
        document.removeEventListener("pointermove", move);
        document.removeEventListener("pointerup", up);
        if (dragging) {
          enddrag(ev.clientX, ev.clientY);
          ev.preventDefault();
          ev.stopPropagation();
        }
      };
      document.addEventListener("pointermove", move);
      document.addEventListener("pointerup", up);
    });
  }

  /*//////////////////////////////////////////////////////////////////////*/

  // a live tweet's avatar/name/handle go invisible the moment they're carried (no ghost at the
  // origin) and stay invisible for as long as the overlay is up - the "lifted out" look. they are
  // NOT hidden forever: everything comes back once the overlay fully fades (scroll is locked while
  // it's open, so the page behind can't virtualize the hidden nodes out from under us mid-session).
  // discarding or cancelling a fresh page drag restores that one immediately. tracked by handle so
  // a person picked back up off a chip/member (a re-drag carries no page refs) can still be found
  const hiddenmap = new Map(); // handle (lowercased) -> [page elements]
  function hidesource(targets) {
    if (!targets) return;
    for (const t of targets) if (t) {
      t.style.visibility = "hidden";
      // the note pencil lives inside the name block we just hid - keep it showing (visibility on a
      // child overrides the hidden parent) so dragging a noted user doesn't take their badge with it
      if (t.querySelectorAll) for (const b of t.querySelectorAll(".tumpagereasonbadge, .tumpageprofilereasonbadge")) b.style.visibility = "visible";
    }
  }
  function recordhidden(handle, targets) {
    if (!handle || !targets) return;
    const key = handle.toLowerCase();
    const arr = hiddenmap.get(key) || [];
    for (const t of targets) if (t && arr.indexOf(t) === -1) arr.push(t);
    hiddenmap.set(key, arr);
  }
  function restoreels(arr) {
    for (const t of arr) if (t) {t.style.visibility = ""; t.style.opacity = ""}
  }
  function restorehidden(handle) {
    const key = (handle || "").toLowerCase();
    const arr = hiddenmap.get(key);
    if (!arr) return;
    restoreels(arr);
    hiddenmap.delete(key);
  }
  // everything hidden this session comes back - run once the overlay has actually faded (so the
  // "lifted" look holds through the fade, per the release behaviour), and only if it's still shut
  let restoretimer = 0;
  function schedulerestoreall() {
    clearTimeout(restoretimer);
    restoretimer = setTimeout(() => {
      if (O.root && !O.root.classList.contains("tumactive")) {
        for (const arr of hiddenmap.values()) restoreels(arr);
        hiddenmap.clear();
      }
    }, 240);
  }

  // if the page still shows this account's follow control and it reads "Following @handle", they're
  // already followed - flip the action button to unfollow so the drop does the right thing. handle
  // is matched so a stray follow button elsewhere on the page can't mislead it; unknown = follow
  function detectfollowing(handle) {
    const h = (handle || "").toLowerCase();
    for (const b of document.querySelectorAll("button[aria-label]")) {
      const mm = /^(following|follow)\s+@([A-Za-z0-9_]+)$/i.exec((b.getAttribute("aria-label") || "").trim());
      if (mm && mm[2].toLowerCase() === h) return /^following/i.test(mm[1]);
    }
    return null;
  }
  function setfollowbutton(act) {
    O.els.actionfollow.dataset.act = act;
    O.els.actionfollow.querySelector("span").textContent = act;
    O.els.actionfollow.querySelector(".tumquickicon").innerHTML = act === "unfollow" ? ICONS.unfollow : ICONS.follow;
  }

  // page drags (dragdetect) hand over a user with no stored note, so a noted person lifted off a
  // tweet would show no pencil on the chip while the same person shows one everywhere else. fill it
  // in from the saved data by handle so every drag source renders the chip identically
  function notefor(handle) {
    const h = (handle || "").toLowerCase();
    for (const u of tum.unsorted.list()) if (u.handle.toLowerCase() === h && u.reason) return u.reason;
    for (const f of tum.folders.list()) for (const m of (f.members || [])) if (m.handle.toLowerCase() === h && m.reason) return m.reason;
    return "";
  }

  function begindrag(user, x, y, source) {
    if (!user.reason) user.reason = notefor(user.handle);
    state.drag = {kind: "user", user, source: source || {type: "page"}};
    state.open = false;
    setfollowbutton(detectfollowing(user.handle) === true ? "unfollow" : "follow");
    hidesource(user.dimtargets);
    recordhidden(user.handle, user.dimtargets);
    // some sources (the new chat's off-page pfps) hand over an image url that won't actually load.
    // hide a broken/slow one with VISIBILITY (not display) so the 40px avatar slot stays reserved -
    // display:none collapsed the chip narrower/shorter than the resting loose chip, which reads as
    // the dragged element "resizing" and losing its padding. matches hidebrokenavatar on the chips
    O.els.chipavatar.onerror = () => {O.els.chipavatar.style.visibility = "hidden"};
    O.els.chipavatar.onload = () => {O.els.chipavatar.style.visibility = "visible"};
    O.els.chipavatar.style.visibility = user.avatarurl ? "visible" : "hidden";
    O.els.chipavatar.src = user.avatarurl || "";
    O.els.chipname.textContent = user.displayname || user.handle;
    O.els.chiphandle.textContent = "@" + user.handle;
    O.els.chipbadges.innerHTML = (user.badges || []).join("");
    // match the resting loose chip exactly - an empty badges span would still eat a namerow gap,
    // and the note pencil has to ride along or the chip shrinks the moment a noted user is lifted
    O.els.chipbadges.style.display = (user.badges && user.badges.length) ? "" : "none";
    O.els.chipreason.style.display = user.reason ? "" : "none";
    // no fixed color for the chip - it should look like it was lifted straight off the page,
    // so it just borrows whatever background/text color x.com is actually rendering right now
    O.els.chip.style.background = tum.theme.css();
    O.els.chip.style.setProperty("--tumfg", tum.theme.fg());
    O.root.classList.add("tumdragging");
    showbackdrop();
    movechip(x, y);
    render();
  }

  function movechip(x, y) {
    O.els.chip.style.left = x + "px";
    O.els.chip.style.top = y + "px";
    // remembered so keyboard nudges/number-drops know where the held chip currently is
    if (state.drag) {state.drag.lastx = x; state.drag.lasty = y}
  }

  function rectcontains(rect, x, y) {
    return !!rect && x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
  }

  function foldertargetunderpoint(x, y) {
    for (const n of O.els.freeform.querySelectorAll(".tumfolder")) {
      const badge = n.querySelector(".tumfolderremove");
      if (rectcontains(badge.getBoundingClientRect(), x, y)) return {id: n.dataset.id, zone: "remove"};
      if (rectcontains(n.getBoundingClientRect(), x, y)) return {id: n.dataset.id, zone: "body"};
    }
    return null;
  }

  // only the top-left close X doubles as the real "discard" (removes them AND fades the overlay).
  // the quick-row pill is now a plain "delete" that keeps the overlay open; the gear is its own
  // drop-target that just opens settings
  function overclosetool(x, y) {
    if (!state.drag || state.drag.kind !== "user") return null;
    return rectcontains(O.els.toolclose.getBoundingClientRect(), x, y) ? O.els.toolclose : null;
  }
  function overgear(x, y) {
    if (!state.drag || state.drag.kind !== "user") return null;
    return rectcontains(O.els.toolgear.getBoundingClientRect(), x, y) ? O.els.toolgear : null;
  }
  // the middle-right buttons act on whoever's being carried: follow/mute/block run the real action
  // (they used to be folder auto-actions); destroy is the joke that hands them to the destroyer
  function actionbtnunderpoint(x, y) {
    if (!state.drag || state.drag.kind !== "user") return null;
    const b = O.els.actionbtns.find(n => rectcontains(n.getBoundingClientRect(), x, y));
    return b ? b.dataset.act : null;
  }
  function quickzone(x, y) {
    if (state.drag && state.drag.kind === "user") {
      if (rectcontains(O.els.quickdelete.getBoundingClientRect(), x, y)) return "delete";
      if (rectcontains(O.els.quickreason.getBoundingClientRect(), x, y)) return "reason";
      // the top-left close X is the only real discard (removes + fades); the gear opens settings
      if (overclosetool(x, y)) return "discard";
      if (overgear(x, y)) return "settings";
    }
    if (rectcontains(O.els.quickadd.getBoundingClientRect(), x, y)) return "add";
    return null;
  }

  function updatedrag(x, y) {
    if (!state.drag) return;
    movechip(x, y);
    const target = foldertargetunderpoint(x, y);
    for (const n of O.els.freeform.querySelectorAll(".tumfolder")) {
      n.classList.toggle("tumover", !!target && target.zone === "body" && n.dataset.id === target.id);
      n.classList.toggle("tumoverremove", !!target && target.zone === "remove" && n.dataset.id === target.id);
    }
    const zone = quickzone(x, y);
    O.els.quickadd.classList.toggle("tumover", zone === "add");
    O.els.quickdelete.classList.toggle("tumover", zone === "delete");
    O.els.quickreason.classList.toggle("tumover", zone === "reason");
    const act = actionbtnunderpoint(x, y);
    for (const b of O.els.actionbtns) b.classList.toggle("tumover", b.dataset.act === act);
    O.els.toolclose.classList.toggle("tumdiscardover", zone === "discard");
    O.els.toolgear.classList.toggle("tumsettingsover", zone === "settings");
  }

  function removefromsource(source, handle) {
    if (!source || source.type === "page") return;
    if (source.type === "folder") tum.folders.removemember(source.id, handle);
    else if (source.type === "unsorted") tum.unsorted.remove(handle);
  }

  function enddrag(x, y) {
    if (!state.drag) return;
    const {user, source} = state.drag;
    const act = actionbtnunderpoint(x, y);
    const target = act ? null : foldertargetunderpoint(x, y);
    const zone = act ? null : quickzone(x, y);
    O.root.classList.remove("tumdragging");
    state.drag = null;
    // the page bits were hidden and recorded at drag-start; they stay hidden unless this ends in a
    // discard (handled per-branch below), so nothing to do here
    for (const n of O.els.freeform.querySelectorAll(".tumfolder")) n.classList.remove("tumover", "tumoverremove");
    O.els.toolclose.classList.remove("tumdiscardover");
    O.els.toolgear.classList.remove("tumsettingsover");
    for (const b of O.els.actionbtns) b.classList.remove("tumover");
    O.els.quickadd.classList.remove("tumover");
    O.els.quickdelete.classList.remove("tumover");
    O.els.quickreason.classList.remove("tumover");

    if (act === "destroy") {
      // the joke: genuinely no action - not filed, not un-filed, nobody blocked. just fade out and
      // hand them to the destroyer; the page bits come back on their own once the overlay's faded
      // (they're hidden under the full-screen takeover anyway), and a re-dragged member stays filed
      O.launchdestroyer(user);
      closeoverlay();
      return;
    } else if (act) {
      // follow / mute / block / unfollow - run it for real. actions.js hits twitter's api directly
      // now, so this works for ANY carried user, not just a fresh page drag; a re-dragged member is
      // acted on but left filed where it was. skipaction rows (already blocked/muted lists) are left
      if (!user.skipaction) tum.actions.run(act, user);
      render();
      closeoverlay();
      return;
    }

    if (target && target.zone === "remove") {
      const folder = tum.folders.get(target.id);
      if (folder) O.confirmfolderdelete(folder);
    } else if (target && target.zone === "body") {
      // moving between/into folders doesn't re-trigger follow/mute/block - that only happens
      // once, on the original live drag off a real tweet
      removefromsource(source, user.handle);
      const folder = tum.folders.get(target.id);
      if (folder) {
        tum.folders.addmember(folder.id, user);
        // run the auto-action for a page drag OR a loose unsorted chip being filed for the first
        // time; a folder->folder move is exempt (it already ran when they were first filed)
        if (source.type !== "folder" && !user.skipaction) tum.actions.run(folder.action, user);
      }
      // unless "keep open" is ticked, filing someone away fades the whole overlay out
      if (!O.keepopen()) {render(); closeoverlay(); return}
    } else if (zone === "add") {
      // no render() here on purpose - the source data hasn't changed yet (still pending the
      // modal's save), and a render right now would rebuild their old row/chip from scratch,
      // undoing the hidden state set at drag-start and leaving a duplicate visible behind the
      // modal. closemodal() renders once the modal actually resolves, either way
      state.pendingcreate = {user, source};
      O.opencreatemodal();
      return;
    } else if (zone === "delete" || zone === "discard") {
      // delete (quick pill) removes them and KEEPS the overlay open for more sorting; discard (the
      // top-left close X) removes them AND fades the overlay out. a noted user can't be dropped away
      // either way - that would silently drop their note; they stay put, removable from the note popup
      if (user.reason) {
        toast("this user has a note - delete them from the note instead");
        restorehidden(user.handle); // they weren't taken - bring the page bits back
        state.open = true;
        render();
        return;
      }
      // the page bits return to view (unlike filing, which keeps them lifted out)
      removefromsource(source, user.handle);
      restorehidden(user.handle);
      if (zone === "discard") {render(); closeoverlay(); return}
      state.open = true;
      render();
      return;
    } else if (zone === "settings") {
      // dropped on the gear: open the settings pane. the carried person is neither filed nor
      // deleted - their page bits come back and they stay wherever they were
      restorehidden(user.handle);
      closeoverlay();
      try {tum.settingspane.open()} catch {}
      return;
    } else if (zone === "reason") {
      state.pendingcreate = {user, source, x, y};
      O.openreasonedit();
      return;
    } else {
      // not dropped on anything - pin them right where they were let go instead of losing
      // them, whether they started on the page, in a folder, or already loose
      removefromsource(source, user.handle);
      // pan-aware, unclamped: they stay exactly where dropped in canvas space
      const px = (x - pan.x) / window.innerWidth * 100, py = (y - pan.y) / window.innerHeight * 100;
      tum.unsorted.add(user, px, py);
      state.open = true;
      render();
      return;
    }
    state.open = true;
    hidebackdrop();
    render();
  }

  function canceldrag() {
    const d = state.drag;
    // cancelling a fresh page drag brings the page bits back; cancelling a re-drag off a filed
    // chip/member leaves them hidden (the person is still filed) and just re-renders the canvas
    if (d && d.source && d.source.type === "page") restorehidden(d.user.handle);
    O.els.toolclose.classList.remove("tumdiscardover");
    O.els.toolgear.classList.remove("tumsettingsover");
    for (const b of O.els.actionbtns) b.classList.remove("tumover");
    O.root.classList.remove("tumdragging");
    state.drag = null;
    hidebackdrop();
    render();
  }

  // hand the pieces core and the modals file reach for back to the shared object
  Object.assign(O, {attachfolderdrag, attachmemberdrag, begindrag, updatedrag, enddrag, canceldrag, restorehidden, removefromsource, schedulerestoreall});
})();

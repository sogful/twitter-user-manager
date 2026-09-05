(function () {
  "use strict";

  const O = window.tum._ov;
  const {state, pan, ICONS, render, showbackdrop, hidebackdrop, closeoverlay, toast} = O;

  const THRESHOLD = 6;

  /*//////////////////////////////////////////////////////////////////////*/

  function attachfolderdrag(node, f) {
    const head = node.querySelector(".tumfolderhead");
    let tracking = null;
    head.addEventListener("pointerdown", e => {
      if (e.button !== undefined && e.button !== 0) return;
      if (e.target.closest(".tumfolderremove")) return;
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
        const px = ev.clientX - tracking.offsetx - pan.x;
        const py = ev.clientY - tracking.offsety - pan.y;
        const w = node.offsetWidth, h = node.offsetHeight;
        const c = O.categorydrop(f.cat || null, px + w / 2, py + h / 2, w, h);
        const a = O.nooverlapadjust(node, c.x - w / 2, c.y - h / 2);

        node.style.left = a.left + "px";
        node.style.top = a.top + "px";
        O.categoryhover(c.x, c.y);
      };
      const up = ev => {
        document.removeEventListener("pointermove", move);
        document.removeEventListener("pointerup", up);
        O.root.classList.remove("tumfolderdragging");
        O.categoryhover(null);
        if (tracking && tracking.dragging) {
          const px = ev.clientX - tracking.offsetx - pan.x;
          const py = ev.clientY - tracking.offsety - pan.y;
          const w = node.offsetWidth, h = node.offsetHeight;
          const c = O.categorydrop(f.cat || null, px + w / 2, py + h / 2, w, h);
          const a = O.nooverlapadjust(node, c.x - w / 2, c.y - h / 2);
          
          node.style.left = a.left + "px";
          node.style.top = a.top + "px";

          tum.folders.update(f.id, {x: a.left, y: a.top, cat: c.cat}, true);
        } else if (tracking) {
          O.toggledcollapse(f.id); 
        }
        tracking = null;
      };
      document.addEventListener("pointermove", move);
      document.addEventListener("pointerup", up);
    });
  }

  function attachmemberdrag(row, source, m) {
    row.addEventListener("pointerdown", e => {
      if (e.target.closest(".tumfoldermemberremove, .tumloosechipremove, .tumreasonbadge")) return;
      const startx = e.clientX, starty = e.clientY;
      let tracking = true, dragging = false;
      const move = ev => {
        if (!tracking) return;
        if (!dragging) {
          if (Math.hypot(ev.clientX - startx, ev.clientY - starty) < THRESHOLD) return;
          dragging = true;
          const user = {handle: m.handle, displayname: m.displayname, avatarurl: m.avatarurl, 
                        sourceurl: m.sourceurl, reason: m.reason, badges: m.badges || []};
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

  const hiddenmap = new Map(); // handle (lowercased) -> [page elements]
  function hidesource(targets) {
    if (!targets) return;
    for (const t of targets) if (t) {
      t.style.visibility = "hidden";
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
    O.els.actionfollow.querySelector("span").textContent = act.charAt(0).toUpperCase() + act.slice(1);
    O.els.actionfollow.querySelector(".tumquickicon").innerHTML = act === "unfollow" ? ICONS.unfollow : ICONS.follow;
  }

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

    O.els.chipavatar.onerror = () => {O.els.chipavatar.style.visibility = "hidden"};
    O.els.chipavatar.onload = () => {O.els.chipavatar.style.visibility = "visible"};
    O.els.chipavatar.style.visibility = user.avatarurl ? "visible" : "hidden";
    O.els.chipavatar.src = user.avatarurl || "";
    O.els.chipname.textContent = user.displayname || user.handle;
    O.els.chiphandle.textContent = "@" + user.handle;
    O.els.chipbadges.innerHTML = (user.badges || []).join("");

    O.els.chipbadges.style.display = (user.badges && user.badges.length) ? "" : "none";
    O.els.chipreason.style.display = user.reason ? "" : "none";

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

  function overclosetool(x, y) {
    if (!state.drag || state.drag.kind !== "user") return null;
    return rectcontains(O.els.toolclose.getBoundingClientRect(), x, y) ? O.els.toolclose : null;
  }
  function overgear(x, y) {
    if (!state.drag || state.drag.kind !== "user") return null;
    return rectcontains(O.els.toolgear.getBoundingClientRect(), x, y) ? O.els.toolgear : null;
  }

  function actionbtnunderpoint(x, y) {
    if (!state.drag || state.drag.kind !== "user") return null;
    const b = O.els.actionbtns.find(n => rectcontains(n.getBoundingClientRect(), x, y));
    return b ? b.dataset.act : null;
  }
  function quickzone(x, y) {
    if (state.drag && state.drag.kind === "user") {
      if (rectcontains(O.els.quickdelete.getBoundingClientRect(), x, y)) return "delete";
      if (rectcontains(O.els.quickreason.getBoundingClientRect(), x, y)) return "reason";
      if (overclosetool(x, y)) return "discard";
      if (overgear(x, y)) return "settings";
    }
    if (rectcontains(O.els.quickadd.getBoundingClientRect(), x, y)) return "add";
    return null;
  }

  const EDGE = 60; // px zone
  const PANMAX = 16; // px per tick at the very edge
  let edgetimer = 0, edgevx = 0, edgevy = 0, edgexy = null;
  function edgevel(x, y) {
    const w = window.innerWidth, h = window.innerHeight;
    let vx = 0, vy = 0;
    if (x < EDGE) vx = (EDGE - x) / EDGE;
    else if (x > w - EDGE) vx = -(x - (w - EDGE)) / EDGE;
    if (y < EDGE) vy = (EDGE - y) / EDGE;
    else if (y > h - EDGE) vy = -(y - (h - EDGE)) / EDGE;
    edgevx = vx * PANMAX; edgevy = vy * PANMAX;
  }
  function startedge() {
    if (edgetimer) return;
    edgetimer = setInterval(() => {
      if (!state.drag || (!edgevx && !edgevy)) return;
      pan.x += edgevx; pan.y += edgevy;
      O.applypan();
      if (edgexy) updatedrag(edgexy.x, edgexy.y);
    }, 16);
  }
  function stopedge() {clearInterval(edgetimer); edgetimer = 0; edgevx = edgevy = 0; edgexy = null}

  function updatedrag(x, y) {
    if (!state.drag) {stopedge(); return}
    edgexy = {x, y};
    edgevel(x, y);
    if (edgevx || edgevy) startedge();
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
    if (!target && !zone && !act) O.categoryhover(x - pan.x, y - pan.y);
    else O.categoryhover(null);
  }

  function removefromsource(source, handle) {
    if (!source || source.type === "page") return;
    if (source.type === "folder") tum.folders.removemember(source.id, handle);
    else if (source.type === "unsorted") tum.unsorted.remove(handle);
  }

  function enddrag(x, y) {
    stopedge();
    O.categoryhover(null);
    if (!state.drag) return;
    const {user, source} = state.drag;
    const act = actionbtnunderpoint(x, y);
    const target = act ? null : foldertargetunderpoint(x, y);
    const zone = act ? null : quickzone(x, y);
    O.root.classList.remove("tumdragging");
    state.drag = null;

    for (const n of O.els.freeform.querySelectorAll(".tumfolder")) n.classList.remove("tumover", "tumoverremove");
    O.els.toolclose.classList.remove("tumdiscardover");
    O.els.toolgear.classList.remove("tumsettingsover");
    for (const b of O.els.actionbtns) b.classList.remove("tumover");
    O.els.quickadd.classList.remove("tumover");
    O.els.quickdelete.classList.remove("tumover");
    O.els.quickreason.classList.remove("tumover");

    if (act === "destroy") {
      O.launchdestroyer(user);
      closeoverlay();
      return;
    } else if (act) {
      if (!user.skipaction) tum.actions.run(act, user);
      render();
      closeoverlay();
      return;
    }

    if (target && target.zone === "remove") {
      const folder = tum.folders.get(target.id);
      if (folder) O.confirmfolderdelete(folder);
    } else if (target && target.zone === "body") {
      removefromsource(source, user.handle);
      const folder = tum.folders.get(target.id);
      if (folder) {
        tum.folders.addmember(folder.id, user);
        if (source.type !== "folder" && !user.skipaction) tum.actions.run(folder.action, user);
      }
      if (!O.keepopen()) {render(); closeoverlay(); return}
    } else if (zone === "add") {
      state.pendingcreate = {user, source};
      O.opencreatemodal();
      return;
    } else if (zone === "delete" || zone === "discard") {
      if (user.reason) {
        toast("This user has a note, delete them from the note instead");
        restorehidden(user.handle);
        state.open = true;
        render();
        return;
      }
      removefromsource(source, user.handle);
      restorehidden(user.handle);
      if (zone === "discard") {render(); closeoverlay(); return}
      state.open = true;
      render();
      return;
    } else if (zone === "settings") {
      restorehidden(user.handle);
      closeoverlay();
      try {tum.settingspane.open()} catch {}
      return;
    } else if (zone === "reason") {
      state.pendingcreate = {user, source, x, y};
      O.openreasonedit();
      return;
    } else {
      const prevcat = source.type === "unsorted" ? (tum.unsorted.get(user.handle) || {}).cat : null;
      removefromsource(source, user.handle);
      // measure the drag chip (mirrors the resting loose chip) so a wide name doesn't poke past the category edge
      const cr = O.els.chip.getBoundingClientRect();
      const c = O.categorydrop(prevcat, x - pan.x, y - pan.y, cr.width || 150, cr.height || 58);
      tum.unsorted.add(Object.assign({}, user, {cat: c.cat}), c.x, c.y);
      state.open = true;
      render();
      O.nooverlapadjusthandle(user.handle);
      return;
    }
    state.open = true;
    hidebackdrop();
    render();
  }

  function canceldrag() {
    stopedge();
    O.categoryhover(null);
    const d = state.drag;
    if (d && d.source && d.source.type === "page") restorehidden(d.user.handle);
    O.els.toolclose.classList.remove("tumdiscardover");
    O.els.toolgear.classList.remove("tumsettingsover");
    for (const b of O.els.actionbtns) b.classList.remove("tumover");
    O.root.classList.remove("tumdragging");
    state.drag = null;
    hidebackdrop();
    render();
  }

  Object.assign(O, {attachfolderdrag, attachmemberdrag, begindrag, updatedrag, enddrag, canceldrag, restorehidden, removefromsource, schedulerestoreall});

})();

(function () {
  "use strict";

  const O = window.tum._ov;
  const {state, pan, ICONS, render, showbackdrop, hidebackdrop, closeoverlay, toast} = O;
  const T = (...a) => tum.strings.t(...a);

  const THRESHOLD = 6;
  const userthreshold = 10;

  /*//////////////////////////////////////////////////////////////////////*/

  function attachfolderresize(node, f) {
    const scales = [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];
    for (const handle of node.querySelectorAll(".tumfolderresize")) {
      handle.addEventListener("pointerdown", e => {
        if (state.drag || state.gesture || e.button !== 0) return;
        e.preventDefault();
        e.stopPropagation();
        const edge = handle.dataset.edge || "";
        const west = edge.includes("w"), east = edge.includes("e");
        const north = edge.includes("n"), south = edge.includes("s");
        const startx = e.clientX, starty = e.clientY;
        const stylex = parseFloat(node.style.left), styley = parseFloat(node.style.top);
        const oldx = Number.isFinite(stylex) ? stylex : Number(f.x) || 0;
        const oldy = Number.isFinite(styley) ? styley : Number(f.y) || 0;
        const scalevaluex = Number(f.scalex), scalevaluey = Number(f.scaley);
        const oldscalex = Number.isFinite(scalevaluex) ? Math.min(2, Math.max(0.5, scalevaluex)) : 1;
        const oldscaley = Number.isFinite(scalevaluey) ? Math.min(2, Math.max(0.5, scalevaluey)) : 1;
        const stylewidth = parseFloat(node.style.width), styleheight = parseFloat(node.style.height);
        const oldwidth = Number.isFinite(stylewidth) && stylewidth > 0 ? stylewidth : 200 * oldscalex;
        const oldheight = Number.isFinite(styleheight) && styleheight > 0 ? styleheight : 288 * oldscaley;
        const olduiscale = node.style.getPropertyValue("--tumfolderuiscale");
        const oldheaderheight = node.style.getPropertyValue("--tumfolderheaderheight");
        const right = oldx + oldwidth, bottom = oldy + oldheight;
        state.gesture = {kind: "folderresize", pointerid: e.pointerId};
        let sizing = false;
        let placed = {x: oldx, y: oldy, scalex: oldscalex, scaley: oldscaley};
        const setuiscale = (scalex, scaley) => {
          const value = Math.max(0.75, Math.min(1.25, Math.sqrt(scalex * scaley)));
          node.style.setProperty("--tumfolderuiscale", value.toFixed(3));
          node.style.setProperty("--tumfolderheaderheight", `calc(${scaley * 288 <= 200 ? 36 : 40}px * var(--tumfolderuiscale,1))`);
        };

        const sizeit = ev => {
          const zoom = Number(O.zoom()) || 1;
          const dx = (ev.clientX - startx) / zoom, dy = (ev.clientY - starty) / zoom;
          const targetx = west || east ? Math.min(2, Math.max(0.5, Math.round(((oldwidth + (west ? -dx : dx)) / 200) * 4) / 4)) : oldscalex;
          const targety = north || south ? Math.min(2, Math.max(0.5, Math.round(((oldheight + (north ? -dy : dy)) / 288) * 4) / 4)) : oldscaley;
          const xscales = west || east ? scales : [oldscalex];
          const yscales = north || south ? scales : [oldscaley];
          const nooverlap = tum.settings && tum.settings.get("nooverlap");
          const others = nooverlap ? [...O.els.freeform.querySelectorAll(".tumfolder, .tumloosechip")]
            .filter(other => other !== node).map(O.scope.rectof) : [];
          let best = null, bestdistance = Infinity;
          for (const scalex of xscales) for (const scaley of yscales) {
            const width = 200 * scalex, height = 288 * scaley;
            const x = west ? right - width : oldx;
            const y = north ? bottom - height : oldy;
            let overlap = 0;
            for (const other of others) {
              const overlapx = Math.max(0, Math.min(x + width, other.left + other.w) - Math.max(x, other.left));
              const overlapy = Math.max(0, Math.min(y + height, other.top + other.h) - Math.max(y, other.top));
              overlap += overlapx * overlapy;
            }
            const distance = Math.abs(scalex - targetx) * 200 + Math.abs(scaley - targety) * 288;
            if (nooverlap ? overlap === 0 && distance < bestdistance : distance < bestdistance) {
              best = {x, y, scalex, scaley, width, height};
              bestdistance = distance;
            }
          }
          if (!best) return placed;
          placed = {x: best.x, y: best.y, scalex: best.scalex, scaley: best.scaley};
          node.style.left = best.x + "px";
          node.style.top = best.y + "px";
          node.style.width = best.width + "px";
          node.style.height = best.height + "px";
          setuiscale(best.scalex, best.scaley);
          return placed;
        };
        const move = ev => {
          if (!state.gesture || ev.pointerId !== state.gesture.pointerid) return;
          sizing = true;
          node.classList.add("tumfolderresizing");
          O.clearuserhover();
          sizeit(ev);
        };
        const up = ev => {
          if (!state.gesture) return;
          if (ev.type === "pointerup" && (ev.button !== 0 || ev.pointerId !== state.gesture.pointerid)) return;
          if (ev.type === "pointercancel" && ev.pointerId !== state.gesture.pointerid) return;
          document.removeEventListener("pointermove", move);
          document.removeEventListener("pointerup", up);
          document.removeEventListener("pointercancel", up);
          state.gesture = null;
          node.classList.remove("tumfolderresizing");
          if (ev.type === "pointercancel") {
            node.style.left = oldx + "px";
            node.style.top = oldy + "px";
            node.style.width = oldwidth + "px";
            node.style.height = oldheight + "px";
            if (olduiscale) node.style.setProperty("--tumfolderuiscale", olduiscale);
            else node.style.removeProperty("--tumfolderuiscale");
            if (oldheaderheight) node.style.setProperty("--tumfolderheaderheight", oldheaderheight);
            else node.style.removeProperty("--tumfolderheaderheight");
            return;
          }
          if (!sizing) return;
          const final = sizeit(ev);
          tum.folders.update(f.id, {x: final.x, y: final.y, scalex: final.scalex, scaley: final.scaley});
        };
        document.addEventListener("pointermove", move);
        document.addEventListener("pointerup", up);
        document.addEventListener("pointercancel", up);
      });
    }
  }

  function attachfolderdrag(node, f) {
    const head = node.querySelector(".tumfolderhead");
    let tracking = null;
    head.addEventListener("pointerdown", e => {
      if (state.drag || state.gesture || tracking) return;
      if (e.button === 1) {O.startcamerapan(e); return}
      if (e.button !== undefined && e.button !== 0) return;
      if (e.target.closest(".tumfolderaction")) return;
      if (O.startselectiondrag && O.startselectiondrag(node, e)) return;
      const rect = node.getBoundingClientRect();
      const z = O.zoom();
      tracking = {
        startx: e.clientX,
        starty: e.clientY,
        offsetx: (e.clientX - rect.left) / z,
        offsety: (e.clientY - rect.top) / z,
        width: node.offsetWidth,
        height: node.offsetHeight,
        deleterect: O.els.quickdelete.getBoundingClientRect(),
        pointerid: e.pointerId,
        dragging: false
      };
      state.gesture = {kind: "folder", pointerid: e.pointerId};
      const move = ev => {
        if (!tracking) return;
        if (ev.pointerId !== tracking.pointerid) return;
        const dx = ev.clientX - tracking.startx, dy = ev.clientY - tracking.starty;
        if (!tracking.dragging) {
          if (Math.hypot(dx, dy) < THRESHOLD) return;
          tracking.dragging = true;
          O.clearuserhover();
          O.root.classList.add("tumfolderdragging");
          node.classList.add("tumdragactive");
          O.els.quickdelete.classList.remove("tumdisabled");
        }
        const px = (ev.clientX - pan.x) / z - tracking.offsetx;
        const py = (ev.clientY - pan.y) / z - tracking.offsety;
        const w = tracking.width, h = tracking.height;
        const c = O.categorydrop(f.cat || null, px + w / 2, py + h / 2, w, h);
        const a = O.nooverlapadjustbox(c.x - w / 2, c.y - h / 2, w, h, node);

        node.style.left = Math.round(a.left) + "px";
        node.style.top = Math.round(a.top) + "px";

        const overdel = rectcontains(tracking.deleterect, ev.clientX, ev.clientY);
        O.els.quickdelete.classList.toggle("tumover", overdel);
        node.classList.toggle("tumoverremove", overdel);
        O.categoryhover(overdel ? null : c.x, overdel ? null : c.y);
      };
      const up = ev => {
        if (!tracking) return;
        if (ev.type === "pointerup" && (ev.button !== 0 || ev.pointerId !== tracking.pointerid)) return;
        if (ev.type === "mouseup" && ev.button !== 0) return;
        if (ev.type === "pointercancel" && ev.pointerId !== tracking.pointerid) return;
        document.removeEventListener("pointermove", move);
        document.removeEventListener("pointerup", up);
        document.removeEventListener("mouseup", up);
        document.removeEventListener("pointercancel", up);
        O.root.classList.remove("tumfolderdragging");
        node.classList.remove("tumdragactive", "tumoverremove");
        O.categoryhover(null);
        O.els.quickdelete.classList.remove("tumover");
        O.els.quickdelete.classList.add("tumdisabled"); 
        if (state.gesture && state.gesture.pointerid === tracking.pointerid) state.gesture = null;
        if (ev.type === "pointercancel") {
          const saved = tum.folders.get(f.id) || f;
          node.style.left = (saved.x || 0) + "px";
          node.style.top = (saved.y || 0) + "px";
        } else if (tracking.dragging && rectcontains(tracking.deleterect, ev.clientX, ev.clientY)) {
          const s = tum.folders.get(f.id) || f;
          node.style.left = (s.x || 0) + "px";
          node.style.top = (s.y || 0) + "px";
          O.confirmfolderdelete(f);
        } else if (tracking.dragging) {
          const px = (ev.clientX - pan.x) / z - tracking.offsetx;
          const py = (ev.clientY - pan.y) / z - tracking.offsety;
          const w = tracking.width, h = tracking.height;
          const c = O.categorydrop(f.cat || null, px + w / 2, py + h / 2, w, h);
          const a = O.nooverlapadjustbox(c.x - w / 2, c.y - h / 2, w, h, node);

          node.style.left = Math.round(a.left) + "px";
          node.style.top = Math.round(a.top) + "px";

          tum.folders.update(f.id, {x: Math.round(a.left), y: Math.round(a.top), cat: c.cat}, true);
        }
        tracking = null;
      };
      document.addEventListener("pointermove", move);
      document.addEventListener("pointerup", up);
      document.addEventListener("mouseup", up);
      document.addEventListener("pointercancel", up);
    });
  }

  function mergemembers(source, target) {
    const existing = new Set((target.members || []).map(member => String(member.handle || "").toLowerCase()));
    return (source.members || []).filter(member => {
      const handle = String(member && member.handle || "").toLowerCase();
      if (!handle || existing.has(handle)) return false;
      existing.add(handle);
      return true;
    });
  }
  function mergefolders(sourceid, targetid) {
    const source = tum.folders.get(sourceid);
    const target = tum.folders.get(targetid);
    if (!source || !target || source.id === target.id) return;
    const members = mergemembers(source, target);
    if (members.length > 10) {
      O.openconfirm({
        title: T("confirm.folder.merge.title", source.name, target.name),
        body: T("confirm.folder.merge.body", members.length, source.name, target.name),
        oklabel: T("confirm.folder.merge.ok"),
        positive: true,
        onok: () => commitfoldermerge(sourceid, targetid)
      });
      return;
    }
    commitfoldermerge(sourceid, targetid);
  }
  function commitfoldermerge(sourceid, targetid) {
    const source = tum.folders.get(sourceid);
    const target = tum.folders.get(targetid);
    if (!source || !target || source.id === target.id) return;
    const members = mergemembers(source, target);
    const snapshot = JSON.parse(JSON.stringify(source));
    const handles = new Set(members.map(member => String(member.handle || "").toLowerCase()));
    if (members.length) tum.folders.update(target.id, {members: [...members, ...(target.members || [])]}, true);
    tum.folders.remove(source.id);
    if (O.focusfolder) O.focusfolder(tum.folders.get(target.id));
    toast(T("toast.folder.merged", members.length, target.name), {
      label: T("action.undo"),
      onclick: () => {
        const current = tum.folders.get(targetid);
        if (current && handles.size) tum.folders.update(targetid, {members: (current.members || []).filter(member => !handles.has(String(member.handle || "").toLowerCase()))}, true);
        tum.folders.create(snapshot);
      }
    });
  }
  function attachmemberdrag(row, source, m) {
    row.addEventListener("pointerdown", e => {
      if (state.drag || state.gesture) return;
      if (e.button !== undefined && e.button !== 0) return;
      if (e.target.closest(".tumfoldermemberremove, .tumloosechipremove, .tumreasonbadge, .tumaffbadge")) return;
      if (source && source.type === "unsorted" && O.startselectiondrag && O.startselectiondrag(row, e)) return;
      const startx = e.clientX, starty = e.clientY;
      const pointerid = e.pointerId;
      state.gesture = {kind: "member", pointerid};
      let tracking = true, dragging = false;
      const move = ev => {
        if (!tracking) return;
        if (ev.pointerId !== pointerid) return;
        if (!dragging) {
          if (Math.hypot(ev.clientX - startx, ev.clientY - starty) < userthreshold) return;
          dragging = true;
          O.clearuserhover();
          const user = {...m, badges: m.badges || []};
          begindrag(user, ev.clientX, ev.clientY, source);
        }
        updatedrag(ev.clientX, ev.clientY);
      };
      const up = ev => {
        if (ev.type === "pointerup" && ev.pointerId !== pointerid) return;
        if (ev.type === "pointercancel" && ev.pointerId !== pointerid) return;
        tracking = false;
        document.removeEventListener("pointermove", move);
        document.removeEventListener("pointerup", up);
        document.removeEventListener("pointercancel", up);
        if (state.gesture && state.gesture.pointerid === pointerid) state.gesture = null;
        if (dragging && ev.type === "pointercancel") O.canceldrag();
        else if (dragging) {
          enddrag(ev.clientX, ev.clientY);
          ev.preventDefault();
          ev.stopPropagation();
        }
      };
      document.addEventListener("pointermove", move);
      document.addEventListener("pointerup", up);
      document.addEventListener("pointercancel", up);
    });
  }

  /*//////////////////////////////////////////////////////////////////////*/

  const hiddenmap = new Map(); // handle (lowercased) -> [page elements]
  function hidesource(targets) {
    if (!targets) return;
    for (const t of targets) if (t) {
      t.style.visibility = "hidden";
      if (t.querySelectorAll) for (const b of t.querySelectorAll(".tumpagereasonbadge, .tumpageprofilereasonbadge, .tumpageaccountbadge")) b.style.visibility = "visible";
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
      const label = (b.getAttribute("aria-label") || "").trim();
      const mm = /^(following|follow)\s+@([A-Za-z0-9_]+)$/i.exec(label);
      if (mm && mm[2].toLowerCase() === h) return /^following/i.test(mm[1]);
      if (location.pathname.toLowerCase().startsWith("/" + h) && /^(following|unfollow)\b/i.test(label)) return true;
    }
    return null;
  }
  function setfollowbutton(act) {
    O.els.actionfollow.dataset.act = act;
    O.els.actionfollow.querySelector("span").textContent = tum.strings.t("action.label." + act);
    O.els.actionfollow.querySelector(".tumquickicon").innerHTML = act === "unfollow" ? ICONS.unfollow : ICONS.follow;
  }

  function notefor(handle) {
    const h = (handle || "").toLowerCase();
    for (const u of tum.unsorted.list()) if (u.handle.toLowerCase() === h && u.reason) return u.reason;
    for (const f of tum.folders.list()) for (const m of (f.members || [])) if (m.handle.toLowerCase() === h && m.reason) return m.reason;
    return "";
  }

  function begindrag(user, x, y, source) {
    O.clearuserhover();
    if (!user.reason) user.reason = notefor(user.handle);
    state.drag = {kind: "user", user, source: source || {type: "page"}};
    state.open = false;
    setfollowbutton(detectfollowing(user.handle) === true ? "unfollow" : "follow");
    hidesource(user.dimtargets);
    recordhidden(user.handle, user.dimtargets);

    const DEFAULT_AVATAR = "https://abs.twimg.com/sticky/default_profile_images/default_profile_0_mini.png";
    O.els.chipavatar.onerror = () => {if (O.els.chipavatar.src !== DEFAULT_AVATAR) O.els.chipavatar.src = DEFAULT_AVATAR};
    O.els.chipavatar.style.visibility = "visible";
    O.els.chipavatar.src = O.miniavatarurl(user.avatarurl) || DEFAULT_AVATAR;
    O.els.chipname.innerHTML = O.emojihtml(user.displayname || user.handle);
    O.els.chiphandle.textContent = "@" + user.handle;
    O.els.chipbadges.innerHTML = O.badgeshtml(user.badges, user);
    O.els.chipbadges.style.display = O.els.chipbadges.children.length ? "" : "none";
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
    O.els.chip.style.transform = "translate(-50%,-50%) scale(" + O.zoom() + ")";

    if (state.drag) {state.drag.lastx = x; state.drag.lasty = y}
  }

  function rectcontains(rect, x, y) {
    return !!rect && x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
  }

  let hitrectcache = null, hitrectraf = 0;
  function hitrects() {
    if (hitrectcache && hitrectcache.folders.every(target => target.node.isConnected)) return hitrectcache;
    hitrectcache = null;
    hitrectcache = {
      folders: (O.foldernodes || []).map(node => ({
        node,
        body: node.getBoundingClientRect(),
        remove: node._tumremove && node._tumremove.getBoundingClientRect()
      })),
      close: O.els.toolclose.getBoundingClientRect(),
      gear: O.els.toolgear.getBoundingClientRect(),
      add: O.els.quickadd.getBoundingClientRect(),
      delete: O.els.quickdelete.getBoundingClientRect(),
      reason: O.els.quickreason.getBoundingClientRect(),
      actions: O.els.actionbtns.map(node => ({node, rect: node.getBoundingClientRect()}))
    };
    if (!hitrectraf) hitrectraf = requestAnimationFrame(() => {hitrectraf = 0; hitrectcache = null});
    return hitrectcache;
  }

  function foldertargetunderpoint(x, y) {
    for (const target of hitrects().folders) {
      if (rectcontains(target.remove, x, y)) return {id: target.node.dataset.id, zone: "remove"};
      if (rectcontains(target.body, x, y)) return {id: target.node.dataset.id, zone: "body"};
    }
    return null;
  }

  function overclosetool(x, y) {
    if (!state.drag || state.drag.kind !== "user") return null;
    return rectcontains(hitrects().close, x, y) ? O.els.toolclose : null;
  }
  function overgear(x, y) {
    if (!state.drag || state.drag.kind !== "user") return null;
    return rectcontains(hitrects().gear, x, y) ? O.els.toolgear : null;
  }

  function actionbtnunderpoint(x, y) {
    if (!state.drag || state.drag.kind !== "user") return null;
    const target = hitrects().actions.find(item => rectcontains(item.rect, x, y));
    return target ? target.node.dataset.act : null;
  }
  function quickzone(x, y) {
    if (state.drag && state.drag.kind === "user") {
      if (rectcontains(hitrects().delete, x, y)) return "delete";
      if (rectcontains(hitrects().reason, x, y)) return "reason";
      if (overclosetool(x, y)) return "discard";
      if (overgear(x, y)) return "settings";
    }
    if (rectcontains(hitrects().add, x, y)) return "add";
    return null;
  }

  function followwarning(user) {
    const relationship = (tum.relationships && tum.relationships.get(user.handle)) || user.relationship || {};
    const following = relationship.following === true || detectfollowing(user.handle) === true;
    if (!following) return null;
    return relationship.followedBy === true ? T("confirm.blockfollow.mutual", user.handle) : T("confirm.blockfollow.following", user.handle);
  }

  function fileinfolder(folder, user, source, doaction = true, confirmed = false) {
    if (source.type === "page" && !user.userid) user.pending = true;
    removefromsource(source, user.handle);
    tum.folders.addmember(folder.id, user);
    const actionhappened = !!(doaction && source.type !== "folder" && folder.action && !user.skipaction);
    if (actionhappened) tum.actions.run(folder.action, user, {confirmed});
    O.notifyfolderadd(folder, user, actionhappened, () => {
      tum.folders.removemember(folder.id, user.handle);
      if (source.type === "folder") tum.folders.addmember(source.id, user);
      else if (source.type === "unsorted") tum.unsorted.add(user, user.x, user.y);
      else if (source.type === "page") restorehidden(user.handle);
      state.open = true;
      render();
    });
  }

  function finishfolderdrop(folder, user, source, doaction, confirmed) {
    fileinfolder(folder, user, source, doaction, confirmed);
    if (!O.keepopen()) {render(); closeoverlay(); return}
    state.open = true;
    showbackdrop();
    render();
  }

  function discardfolderdrop(user, source) {
    if (source.type === "page") restorehidden(user.handle);
    state.open = false;
    render();
    hidebackdrop();
  }

  const EDGE = 38; // px zone
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
    movechip(x, y);
    const zone = quickzone(x, y);
    const act = actionbtnunderpoint(x, y);
    const target = (zone || act) ? null : foldertargetunderpoint(x, y);
    for (const n of O.foldernodes || []) {
      n.classList.toggle("tumover", !!target && target.zone === "body" && n.dataset.id === target.id);
      n.classList.toggle("tumoverremove", !!target && target.zone === "remove" && n.dataset.id === target.id);
    }
    O.els.quickadd.classList.toggle("tumover", zone === "add");
    O.els.quickdelete.classList.toggle("tumover", zone === "delete");
    O.els.quickreason.classList.toggle("tumover", zone === "reason");
    for (const b of O.els.actionbtns) b.classList.toggle("tumover", b.dataset.act === act);
    O.els.toolclose.classList.toggle("tumdiscardover", zone === "discard");
    O.els.toolgear.classList.toggle("tumsettingsover", zone === "settings");

    const overtarget = !!target || !!zone || !!act;
    edgexy = {x, y};
    
    if (zone || act) stopedge();
    else {edgevel(x, y); if (edgevx || edgevy) startedge(); else stopedge()}
    if (!overtarget) {const z = O.zoom(); O.categoryhover((x - pan.x) / z, (y - pan.y) / z)}
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
    const zone = act ? null : quickzone(x, y);
    const target = (act || zone) ? null : foldertargetunderpoint(x, y);

    const dragchiprect = O.els.chip.getBoundingClientRect();
    O.root.classList.remove("tumdragging");
    state.drag = null;

    for (const n of O.foldernodes || []) n.classList.remove("tumover", "tumoverremove");
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
      const folder = tum.folders.get(target.id);
      if (folder) {
        const actionable = !!folder.action && source.type !== "folder" && !user.skipaction;
        const warning = actionable && folder.action === "block" ? followwarning(user) : null;
        const confirmsetting = actionable && !!(tum.settings && tum.settings.get("confirmactions"));
        if (warning || confirmsetting) {
          const label = T("action.label." + folder.action);
          const detail = T("folder.drop.confirm.body", user.handle, folder.name, T("action.verb." + folder.action));
          O.openconfirm({
            title: T("action.confirm.single.title", label, user.handle),
            body: warning ? warning + " " + detail : detail,
            oklabel: label,
            positive: folder.action === "follow",
            altlabel: T("folder.drop.confirm.addonly"),
            cancellabel: T("folder.drop.confirm.discard"),
            onok: () => finishfolderdrop(folder, user, source, true, true),
            onalternate: () => finishfolderdrop(folder, user, source, false, true),
            oncancel: () => discardfolderdrop(user, source)
          });
          return;
        }
        fileinfolder(folder, user, source);
      }
      if (!O.keepopen()) {render(); closeoverlay(); return}
    } else if (zone === "add") {
      state.pendingcreate = {user, source};
      O.opencreatemodal();
      return;
    } else if (zone === "delete" || zone === "discard") {
      if (user.reason) {
        toast(T("toast.note.deletefrom"));
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

      const cr = dragchiprect;
      const z = O.zoom();
      const cw = (cr.width || 150) / z, ch = (cr.height || 58) / z;
      const c = O.categorydrop(prevcat, (x - pan.x) / z, (y - pan.y) / z, cw, ch);
      const adj = O.nooverlapadjustbox(c.x - cw / 2, c.y - ch / 2, cw, ch, null);
      
      tum.unsorted.add(Object.assign({}, user, {cat: c.cat, pending: source.type === "page" && !user.userid}), adj.left + cw / 2, adj.top + ch / 2);
      state.open = true;
      render();
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
    state.gesture = null;
    hidebackdrop();
    render();
  }

  Object.assign(O, {attachfolderresize, attachfolderdrag, attachmemberdrag, begindrag, updatedrag, enddrag, canceldrag, mergefolders, restorehidden, removefromsource, schedulerestoreall});

})();

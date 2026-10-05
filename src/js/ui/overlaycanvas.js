(function () {
  const O = window.tum._ov;
  const scope = O.scope;
  with (scope) {
  function contentbbox() {
    const nodes = [...els.freeform.querySelectorAll(".tumfolder, .tumcategory, .tumloosechip")];
    if (!nodes.length) return null;
    let minx = Infinity, miny = Infinity, maxx = -Infinity, maxy = -Infinity;
    for (const n of nodes) {const r = rectof(n); minx = Math.min(minx, r.left); miny = Math.min(miny, r.top); maxx = Math.max(maxx, r.left + r.w); maxy = Math.max(maxy, r.top + r.h)}
    return {minx, miny, maxx, maxy};
  }
  function centeron(cx, cy) {
    pan.x = window.innerWidth / 2 - cx * zoom;
    pan.y = window.innerHeight / 2 - cy * zoom;
    applypan();
  }
  function fitall() {
    const bb = contentbbox();
    if (!bb) {pan.x = 0; pan.y = 0; zoom = 1; applypan(); return}
    const vw = window.innerWidth, vh = window.innerHeight, pad = 80;
    const bw = (bb.maxx - bb.minx) + pad * 2, bh = (bb.maxy - bb.miny) + pad * 2;
    zoom = Math.max(ZMIN, Math.min(1, Math.min(vw / bw, vh / bh)));
    centeron((bb.minx + bb.maxx) / 2, (bb.miny + bb.maxy) / 2);
  }
  function jumpto(f) {
    if (!f) return;
    centeron((f.x || 0) + 100, (f.y || 0) + 144);
    const node = els.freeform.querySelector('.tumfolder[data-id="' + f.id + '"]');
    flashfolder(node);
    togglejumplist(false);
  }
  function focusfolder(f) {
    if (!f) return;
    centeron((f.x || 0) + 100 * (f.scalex || 1), (f.y || 0) + 144 * (f.scaley || 1));
    const node = els.freeform.querySelector('.tumfolder[data-id="' + f.id + '"]');
    flashfolder(node);
  }
  function togglejumplist(force) {
    const show = typeof force === "boolean" ? force : els.jumplist.hidden;
    els.jumplist.hidden = !show;
    if (show) {els.jumpsearch.value = ""; buildjumprows(""); els.jumpsearch.focus()}
  }
  function buildjumprows(q) {
    const rows = els.jumprows;
    rows.innerHTML = "";
    const ql = (q || "").trim().toLowerCase();
    for (const f of tum.folders.list()) {
      if (ql && !(f.name || "").toLowerCase().includes(ql)) continue;
      const row = el("div", "tumjumprow");
      row.innerHTML = `<span class="tumjumpdot" style="background:${f.color}"></span><span class="tumjumpname">${escapehtml(f.name)}</span><span class="tumjumpcount">${(f.members || []).length}</span>`;
      row.addEventListener("click", () => jumpto(f));
      rows.appendChild(row);
    }
  }
  let minimapraf = 0;
  function scheduleminimap() {if (!minimapraf) minimapraf = requestAnimationFrame(() => {minimapraf = 0; try {drawminimap()} catch {}})}
  function drawminimap() {
    if (!els.minimap || !els.minimapcanvas) return;
    const folders = tum.folders.list();
    const loose = tum.unsorted.list().filter(u => u.placed !== false);
    const has = folders.length > 0;
    els.minimap.hidden = !has;
    if (!has || !state.open) return;
    const cv = els.minimapcanvas, ctx = cv.getContext("2d"), W = cv.width, H = cv.height;
    ctx.clearRect(0, 0, W, H);

    const rects = folders.map(f => ({r: {left: f.x || 0, top: f.y || 0, w: 200 * (f.scalex || 1), h: 288 * (f.scaley || 1)}, col: f.color || "#1d9bf0"}));
    let minx = Infinity, miny = Infinity, maxx = -Infinity, maxy = -Infinity;
    for (const {r} of rects) {minx = Math.min(minx, r.left); miny = Math.min(miny, r.top); maxx = Math.max(maxx, r.left + r.w); maxy = Math.max(maxy, r.top + r.h)}
    for (const u of loose) {
      const x = u.x || 0, y = u.y || 0;
      minx = Math.min(minx, x); miny = Math.min(miny, y);
      maxx = Math.max(maxx, x); maxy = Math.max(maxy, y);
    }

    const pad = Math.max(maxx - minx, maxy - miny) * 0.05 + 20;
    let s = Math.min(W / (maxx - minx + pad * 2), H / (maxy - miny + pad * 2));
    const vw = window.innerWidth / zoom, vh = window.innerHeight / zoom;
    const ccx = (window.innerWidth / 2 - pan.x) / zoom, ccy = (window.innerHeight / 2 - pan.y) / zoom;
    const ox = (W - (maxx - minx) * s) / 2 - minx * s;
    const oy = (H - (maxy - miny) * s) / 2 - miny * s;

    cv._map = {s, ox, oy};
    for (const {r, col} of rects) {
      ctx.fillStyle = col;
      const x = ox + r.left * s, y = oy + r.top * s, w = Math.max(3, r.w * s), h = Math.max(3, r.h * s);
      ctx.beginPath();
      if (ctx.roundRect) ctx.roundRect(x, y, w, h, 1.5); else ctx.rect(x, y, w, h);
      ctx.fill();
    }
    ctx.strokeStyle = "rgba(231,233,234,0.7)";
    ctx.lineWidth = 1;
    ctx.strokeRect(ox + (ccx - vw / 2) * s, oy + (ccy - vh / 2) * s, vw * s, vh * s);
    const counts = {up: 0, down: 0, left: 0, right: 0};
    const addcount = (x, y, amount) => {
      if (x < ccx - vw / 2) counts.left += amount;
      else if (x > ccx + vw / 2) counts.right += amount;
      if (y < ccy - vh / 2) counts.up += amount;
      else if (y > ccy + vh / 2) counts.down += amount;
    };
    for (const f of folders) addcount((f.x || 0) + 100 * (f.scalex || 1), (f.y || 0) + 144 * (f.scaley || 1), (f.members || []).length);
    for (const u of loose) addcount(u.x || 0, u.y || 0, 1);
    ctx.fillStyle = tum.theme.palette().text;
    ctx.font = "700 10px Chirp, sans-serif";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    if (counts.up) ctx.fillText("↑ " + counts.up, W / 2, 7);
    if (counts.down) ctx.fillText("↓ " + counts.down, W / 2, H - 7);
    ctx.textAlign = "left";
    if (counts.left) ctx.fillText("← " + counts.left, 4, H / 2);
    ctx.textAlign = "right";
    if (counts.right) ctx.fillText(counts.right + " →", W - 4, H / 2);
  }
  function onminimapclick(e) {
    const map = els.minimapcanvas._map;
    if (!map) return;
    const rect = els.minimapcanvas.getBoundingClientRect();
    centeron((e.clientX - rect.left - map.ox) / map.s, (e.clientY - rect.top - map.oy) / map.s);
  }
  function attachminimapdrag() {
    const cv = els.minimapcanvas;
    cv.addEventListener("pointerdown", e => {
      if (e.button !== 0) return;
      const map = cv._map;
      if (!map) return;
      e.preventDefault();
      const start = {x: e.clientX, y: e.clientY};
      const center = {x: (window.innerWidth / 2 - pan.x) / zoom, y: (window.innerHeight / 2 - pan.y) / zoom};
      let moved = false;
      cv.setPointerCapture(e.pointerId);
      cv.classList.add("tumdragging");
      const move = ev => {
        const dx = ev.clientX - start.x, dy = ev.clientY - start.y;
        if (!moved && Math.hypot(dx, dy) < 2) return;
        moved = true;
        centeron(center.x - dx / map.s, center.y - dy / map.s);
      };
      const up = ev => {
        cv.classList.remove("tumdragging");
        cv.removeEventListener("pointermove", move);
        cv.removeEventListener("pointerup", up);
        cv.removeEventListener("pointercancel", up);
        if (!moved) onminimapclick(ev);
      };
      cv.addEventListener("pointermove", move);
      cv.addEventListener("pointerup", up);
      cv.addEventListener("pointercancel", up);
    });
  }

  function nooverlapadjustbox(left, top, w, h, exclude) {
    if (!els.freeform || !(tum.settings && tum.settings.get("nooverlap"))) return {left, top};
    const GAP = 0;
    const others = [...els.freeform.querySelectorAll(".tumfolder, .tumloosechip")].filter(n => n !== exclude).map(rectof);
    let l = left, t = top;
    for (let pass = 0; pass < 10; pass++) {
      let hit = false;
      for (const o of others) {
        const ox = Math.min(l + w, o.left + o.w) - Math.max(l, o.left);
        const oy = Math.min(t + h, o.top + o.h) - Math.max(t, o.top);
        if (ox <= 0 || oy <= 0) continue;
        hit = true;
        if (ox < oy) l += (l + w / 2 >= o.left + o.w / 2 ? 1 : -1) * (ox + GAP);
        else t += (t + h / 2 >= o.top + o.h / 2 ? 1 : -1) * (oy + GAP);
      }
      if (!hit) break;
    }
    return {left: l, top: t};
  }
  function nooverlapcategorybox(left, top, w, h, exclude) {
    if (!els.freeform || !(tum.settings && tum.settings.get("nooverlap"))) return {left, top};
    const others = [...els.freeform.querySelectorAll(".tumcategory")]
      .filter(node => node !== exclude)
      .map(rectof);
    const gap = 1;
    const xs = new Set([left]), ys = new Set([top]);
    for (const other of others) {
      xs.add(other.left - w - gap);
      xs.add(other.left + other.w + gap);
      ys.add(other.top - h - gap);
      ys.add(other.top + other.h + gap);
    }
    let best = null, distance = Infinity;
    for (const x of xs) for (const y of ys) {
      if (others.some(other => x < other.left + other.w && x + w > other.left && y < other.top + other.h && y + h > other.top)) continue;
      const nextdistance = (x - left) ** 2 + (y - top) ** 2;
      if (nextdistance < distance) {best = {left: x, top: y}; distance = nextdistance}
    }
    const current = exclude ? rectof(exclude) : null;
    return best || {left: current ? current.left : left, top: current ? current.top : top};
  }
  function nooverlapcategorysize(x, y, w, h, oldx, oldy, oldw, oldh, exclude, minw, minh, west, north, horizontal, vertical) {
    if (!els.freeform || !(tum.settings && tum.settings.get("nooverlap"))) return {x, y, w, h};
    const others = [...els.freeform.querySelectorAll(".tumcategory")]
      .filter(node => node !== exclude)
      .map(rectof);
    const gap = 1;
    const widths = new Set(horizontal ? [w] : [oldw]);
    const heights = new Set(vertical ? [h] : [oldh]);
    if (horizontal && w >= oldw) widths.add(oldw);
    if (vertical && h >= oldh) heights.add(oldh);
    const oldright = oldx + oldw, oldbottom = oldy + oldh;
    for (const other of others) {
      if (horizontal) widths.add(west ? oldright - other.left - other.w - gap : other.left - oldx - gap);
      if (vertical) heights.add(north ? oldbottom - other.top - other.h - gap : other.top - oldy - gap);
    }
    const validwidths = [...widths].filter(value => Number.isFinite(value) && value >= minw && value <= w);
    const validheights = [...heights].filter(value => Number.isFinite(value) && value >= minh && value <= h);
    let best = null, distance = Infinity;
    for (const nextw of validwidths) for (const nexth of validheights) {
      const nextx = west ? oldright - nextw : oldx;
      const nexty = north ? oldbottom - nexth : oldy;
      if (others.some(other => nextx < other.left + other.w && nextx + nextw > other.left && nexty < other.top + other.h && nexty + nexth > other.top)) continue;
      const nextdistance = (nextw - w) ** 2 + (nexth - h) ** 2;
      if (nextdistance < distance) {best = {x: nextx, y: nexty, w: nextw, h: nexth}; distance = nextdistance}
    }
    return best || {x: oldx, y: oldy, w: oldw, h: oldh};
  }
  function nooverlapadjust(node, left, top) {
    if (!node) return {left, top};
    return nooverlapadjustbox(left, top, node.offsetWidth, node.offsetHeight, node);
  }
  function nooverlapadjusthandle(handle) {
    if (!(tum.settings && tum.settings.get("nooverlap"))) return;
    const n = [...els.freeform.querySelectorAll(".tumloosechip")].find(x => x.dataset.handle === handle);
    if (!n) return;
    const w = n.offsetWidth, h = n.offsetHeight;
    const cx = parseFloat(n.style.left) || 0, cy = parseFloat(n.style.top) || 0; // chip pos is its center
    const a = nooverlapadjust(n, cx - w / 2, cy - h / 2); // nooverlapadjust works in top-left space
    setrect(n, a.left, a.top);
    tum.unsorted.move(handle, a.left + w / 2, a.top + h / 2, true);
  }

  /*//////////////////////////////////////////////////////////////////////*/

  function onkeydown(e) {
    if ((e.ctrlKey || e.metaKey) && e.code === "Backquote") {toggleoverlay(); e.preventDefault(); e.stopPropagation(); return}
    if (state.mergeopen && e.key === "Escape") {O.closemergepicker(); e.preventDefault(); return}
    if (root.querySelector(".tumcategorytitle.tumediting") || (shadow.activeElement && shadow.activeElement.isContentEditable)) return;
    const historykey = e.key.toLowerCase();
    if ((e.ctrlKey || e.metaKey) && (historykey === "z" || historykey === "y")) {
      const restored = historykey === "y" || e.shiftKey ? historyredo() : historyundo();
      if (restored) {e.preventDefault(); e.stopPropagation()}
      return;
    }
    if (!state.drag && !state.gesture) {
      if (e.key === "Escape") {
        if (activefolderfilters) {closefolderfilters(); e.preventDefault(); return}
        if (O.ctxopen && O.ctxopen()) {O.closectx(); return}
        if (state.selection && state.selection.size) {clearselection(); e.preventDefault(); return}
        closeoverlay();
        return;
      }
      const typing = shadow.activeElement && /^(INPUT|TEXTAREA)$/.test(shadow.activeElement.tagName);
      if (root.classList.contains("tumactive") && SCROLLKEYS.has(e.key) && !typing) e.preventDefault();
      return;
    }
    if (state.gesture) {e.preventDefault(); return}
    if (e.key === "Escape") {O.canceldrag(); e.preventDefault(); return}
    const folders = [...els.freeform.querySelectorAll(".tumfolder")];
    if (/^[1-9]$/.test(e.key)) {
      const f = folders[parseInt(e.key, 10) - 1];
      if (f) {const r = f.getBoundingClientRect(); O.enddrag(r.left + r.width / 2, r.top + r.height / 2)}
      e.preventDefault();
      return;
    }
    if (e.key.startsWith("Arrow")) {
      const step = e.shiftKey ? 1 : 12;
      let x = state.drag.lastx, y = state.drag.lasty;
      if (e.key === "ArrowLeft") x -= step;
      else if (e.key === "ArrowRight") x += step;
      else if (e.key === "ArrowUp") y -= step;
      else if (e.key === "ArrowDown") y += step;
      else return;
      O.updatedrag(clamp(x, 0, window.innerWidth), clamp(y, 0, window.innerHeight));
      e.preventDefault();
    }
  }

  /*//////////////////////////////////////////////////////////////////////*/

  function openandflash(folderid) {
    state.open = true;
    showbackdrop();
    render();
    const n = els.freeform.querySelector('.tumfolder[data-id="' + folderid + '"]');
    flashfolder(n);
  }

  function flashfolder(node) {
    if (!node) return;
    if (node.getAnimations) for (const animation of node.getAnimations()) {
      if (animation.id === "tumfolderflash") animation.cancel();
    }
    if (node.animate) {
      const animation = node.animate([
        {outlineColor: "transparent"},
        {outlineColor: "#1d9bf0"},
        {outlineColor: "transparent"}
      ], {duration: 500, iterations: 2, easing: "ease-in-out"});
      animation.id = "tumfolderflash";
      return;
    }
    node.classList.remove("tumflash");
    requestAnimationFrame(() => node.classList.add("tumflash"));
    setTimeout(() => node.classList.remove("tumflash"), 1200);
  }

  /*//////////////////////////////////////////////////////////////////////*/

  let toasttimer = 0;
  function toast(msg, options) {
    els.toast.replaceChildren();
    const text = document.createElement("span");
    text.className = "tumtoasttext";
    text.textContent = msg;
    els.toast.appendChild(text);
    if (options && options.label && typeof options.onclick === "function") {
      const button = document.createElement("button");
      button.className = "tumtoastundo";
      button.type = "button";
      button.textContent = options.label;
      button.addEventListener("click", async event => {
        event.stopPropagation();
        if (button.disabled) return;
        button.disabled = true;
        clearTimeout(toasttimer);
        await options.onclick();
      });
      els.toast.appendChild(button);
    }
    els.toast.classList.add("tumshow");
    clearTimeout(toasttimer);
    toasttimer = setTimeout(() => els.toast.classList.remove("tumshow"), options ? 5000 : 2600);
  }
  function notifyfolderadd(folder, user, actionhappened, onundo) {
    if (!folder || !user || !user.handle || actionhappened) return;
    if (tum.settings && !tum.settings.get("folderaddtoast")) return;
    toast(T("toast.added", user.handle), {
      label: T("action.undo"),
      onclick: onundo || (() => tum.folders.removemember(folder.id, user.handle))
    });
  }

  Object.assign(O, {
    state, pan, ICONS, el, escapehtml, emojihtml, linkify, iconhtml, avatarurl, miniavatarurl, fullavatarurl, badgeshtml,
    render, showbackdrop, hidebackdrop, closeoverlay, toast, notifyfolderadd, openprofile, clearuserhover, clearselection, selecteditems, startselectiondrag, historybegin, historyend, historyundo, historyredo, applypan, fitall,
    categoryhover, categorydrop, newcategory, renamecategory, nooverlapadjust, nooverlapadjustbox, nooverlapcategorybox, nooverlapcategorysize, nooverlapadjusthandle, findfreespot, focusfolder,
    zoom: () => zoom, startcamerapan,
    keepopen: () => keepopen
  });

  window.tum.overlay = {
    mount() {build()},
    begindrag: (user, x, y) => O.begindrag(user, x, y, {type: "page"}),
    updatedrag: (x, y) => O.updatedrag(x, y),
    enddrag: (x, y) => O.enddrag(x, y),
    canceldrag: () => O.canceldrag(),
    toast, notifyfolderadd,
    open: () => openoverlay(),
    canvascenter: () => ({x: Math.round((window.innerWidth / 2 - pan.x) / zoom), y: Math.round((window.innerHeight / 2 - pan.y) / zoom)}),
    opencreatemodal: opts => O.opencreatemodal(opts),
    confirm: opts => O.openconfirm(opts),
    openreasonview: (source, m) => O.openreasonview(source, m),
    openandflash,
    foldericonhtml: f => iconhtml(f.icon) || ICONS[f.action] || ICONS.folder
  };
  
    Object.assign(scope, {contentbbox, centeron, fitall, jumpto, focusfolder, togglejumplist, buildjumprows, scheduleminimap, drawminimap, onminimapclick, attachminimapdrag, nooverlapadjustbox, nooverlapcategorybox, nooverlapcategorysize, nooverlapadjust, nooverlapadjusthandle, onkeydown, openandflash, flashfolder, toast, notifyfolderadd});
  }
})();

(function () {
  const O = window.tum._ov;
  const scope = O.scope;
  with (scope) {
  function membercatof(node) {
    if (node.classList.contains("tumfolder")) {const f = tum.folders.get(node.dataset.id); return f && f.cat || null}
    if (node.classList.contains("tumloosechip")) {const u = tum.unsorted.get(node.dataset.handle); return u && u.cat || null}
    return null;
  }

  function buildcategorynode(c) {
    const node = el("div", "tumcategory");
    node.dataset.id = c.id;
    node._tumcategory = c;
    node.style.left = (c.x || 0) + "px";
    node.style.top = (c.y || 0) + "px";
    node.style.width = (c.w || 480) + "px";
    node.style.height = (c.h || 360) + "px";
    node.innerHTML =
      `<div class="tumcategorytitle">${escapehtml(c.name || T("confirm.category.default"))}</div>` +
      `<div class="tumcatresize tumcatresizer"></div>` +
      `<div class="tumcatresize tumcatresizeb"></div>` +
      `<div class="tumcatresize tumcatresizebr"></div>`;
    attachcategorydrag(node, c);
    attachcategoryresize(node, c);
    return node;
  }

  function attachcategorydrag(node, c) {
    node.addEventListener("pointerdown", e => {
      if (state.drag || state.gesture) return;
      if (e.button === 1) {startcamerapan(e); return}
      if (e.button !== 0) return;
      if (startselectiondrag(node, e)) return;
      if (e.target.closest(".tumcategorytitle.tumediting")) return;
      if (e.target.closest(".tumfolder, .tumloosechip, .tumcatresize")) return;
      const ontitle = !!e.target.closest(".tumcategorytitle");
      e.preventDefault();
      state.gesture = {kind: "category", pointerid: e.pointerId};
      const startx = e.clientX, starty = e.clientY;
      const ox = c.x || 0, oy = c.y || 0;
      const members = [...els.freeform.querySelectorAll(".tumfolder, .tumloosechip")]
        .filter(n => membercatof(n) === c.id)
        .map(n => ({n, left: parseFloat(n.style.left) || 0, top: parseFloat(n.style.top) || 0}));
      let dragging = false;
      let placed = {left: ox, top: oy};
      const move = ev => {
        if (!state.gesture || ev.pointerId !== state.gesture.pointerid) return;
        const dx = (ev.clientX - startx) / zoom, dy = (ev.clientY - starty) / zoom;
        if (!dragging) {
          if (Math.hypot(ev.clientX - startx, ev.clientY - starty) < 6) return;
          dragging = true;
          clearuserhover();
          root.classList.add("tumfolderdragging");
        }
        placed = nooverlapcategorybox(ox + dx, oy + dy, c.w || 480, c.h || 360, node);
        const actualx = placed.left - ox, actualy = placed.top - oy;
        node.style.left = placed.left + "px";
        node.style.top = placed.top + "px";
        for (const m of members) {m.n.style.left = (m.left + actualx) + "px"; m.n.style.top = (m.top + actualy) + "px"}
      };
      const up = ev => {
        if (!state.gesture || (ev.type === "pointerup" || ev.type === "pointercancel") && ev.pointerId !== state.gesture.pointerid) return;
        document.removeEventListener("pointermove", move);
        document.removeEventListener("pointerup", up);
        document.removeEventListener("pointercancel", up);
        root.classList.remove("tumfolderdragging");
        state.gesture = null;

        if (ev.type === "pointercancel") return;
        if (!dragging) {if (ontitle) startcategoryrename(node, c); return}
        placed = nooverlapcategorybox(
          ox + (ev.clientX - startx) / zoom,
          oy + (ev.clientY - starty) / zoom,
          c.w || 480,
          c.h || 360,
          node
        );
        const dx = placed.left - ox, dy = placed.top - oy;

        tum.categories.update(c.id, {x: placed.left, y: placed.top}, true);
        const fmoves = [], umoves = [];
        for (const m of members) {
          if (m.n.dataset.id) fmoves.push({id: m.n.dataset.id, x: m.left + dx, y: m.top + dy});
          else if (m.n.dataset.handle) umoves.push({handle: m.n.dataset.handle, x: m.left + dx, y: m.top + dy});
        }
        if (fmoves.length) tum.folders.bulkmove(fmoves);
        if (umoves.length) tum.unsorted.bulkmove(umoves);
      };
      document.addEventListener("pointermove", move);
      document.addEventListener("pointerup", up);
      document.addEventListener("pointercancel", up);
    });
  }

  function attachcategoryresize(node, c) {
    for (const handle of node.querySelectorAll(".tumcatresize")) {
      const right = handle.classList.contains("tumcatresizer") || handle.classList.contains("tumcatresizebr");
      const bottom = handle.classList.contains("tumcatresizeb") || handle.classList.contains("tumcatresizebr");
      handle.addEventListener("pointerdown", e => {
        if (state.drag || state.gesture) return;
        if (e.button !== 0) return;
        
        e.preventDefault();
        e.stopPropagation();
        state.gesture = {kind: "resize", pointerid: e.pointerId};

        const startx = e.clientX, starty = e.clientY;
        const ow = c.w || 480, oh = c.h || 360;
        let sizing = false;

        const SNAP = 26;
        const snapdim = (v, folder) => {
          const cell = folder, base = 2 * CATBORDER;
          const n = Math.round((v - base) / cell);
          if (n < 1) return v;
          const snapped = base + n * cell;
          return Math.abs(snapped - v) <= SNAP ? snapped : v;
        };

        const ext = categorycontentextent(c);
        const minw = Math.max(160, ext.right - c.x + CATBORDER);
        const minh = Math.max(120, ext.bottom - c.y + CATBORDER);
        const sizeit = ev => {
          let w = right ? ow + (ev.clientX - startx) / zoom : ow;
          let h = bottom ? oh + (ev.clientY - starty) / zoom : oh;
          if (right) w = Math.max(minw, snapdim(w, 200));
          if (bottom) h = Math.max(minh, snapdim(h, 288));
          const limited = nooverlapcategorysize(c.x || 0, c.y || 0, w, h, node, minw, minh, right, bottom);
          w = limited.w;
          h = limited.h;
          node.style.width = w + "px";
          node.style.height = h + "px";
          return {w, h};
        };
        const move = ev => {
          if (!state.gesture || ev.pointerId !== state.gesture.pointerid) return;
          sizing = true;
          sizeit(ev);
        };
        const up = ev => {
          if (!state.gesture || (ev.type === "pointerup" || ev.type === "pointercancel") && ev.pointerId !== state.gesture.pointerid) return;
          document.removeEventListener("pointermove", move);
          document.removeEventListener("pointerup", up);
          document.removeEventListener("pointercancel", up);
          state.gesture = null;
          if (ev.type === "pointercancel") return;
          if (!sizing) return;
          const s = sizeit(ev);
          tum.categories.update(c.id, {w: s.w, h: s.h}, true);
        };
        document.addEventListener("pointermove", move);
        document.addEventListener("pointerup", up);
        document.addEventListener("pointercancel", up);
      });
    }
  }

  function startcategoryrename(node, c) {
    const title = node.querySelector(".tumcategorytitle");
    if (title.isContentEditable) return;
    title.contentEditable = "true";
    title.classList.add("tumediting");
    title.focus();
    const sel = shadow.getSelection ? shadow.getSelection() : window.getSelection();
    try {const r = document.createRange(); r.selectNodeContents(title); sel.removeAllRanges(); sel.addRange(r)} catch {}
    const finish = () => {
      title.contentEditable = "false";
      title.classList.remove("tumediting");
      const name = (title.textContent || "").trim() || T("confirm.category.default");
      title.textContent = name;
      tum.categories.update(c.id, {name}, true);
    };
    title.addEventListener("blur", finish, {once: true});
    title.addEventListener("keydown", e => {
      e.stopPropagation();
      if (e.key === "Enter") {e.preventDefault(); title.blur()}
      else if (e.key === "Escape") {title.textContent = c.name || T("confirm.category.default"); title.blur()}
    });
  }

  let hoveredcategory = null;
  function categoryhover(lx, ly) {
    if (!els.freeform) return;
    const next = lx == null ? null : (O.categorynodes || []).find(n => {
      const c = n._tumcategory;
      return c && lx >= c.x && lx <= c.x + c.w && ly >= c.y && ly <= c.y + c.h;
    });
    if (next === hoveredcategory) return;
    if (hoveredcategory) hoveredcategory.classList.remove("tumcategoryover");
    if (next) next.classList.add("tumcategoryover");
    hoveredcategory = next;
  }

    const CATOUT = 48;
    scope.CATBORDER = 2;

  function categorycontentextent(c) {
    let right = c.x + CATBORDER, bottom = c.y + CATBORDER;
    for (const f of tum.folders.list()) if (f.cat === c.id) {
      const n = els.freeform.querySelector('.tumfolder[data-id="' + f.id + '"]');
      const w = n ? n.offsetWidth : 200, h = n ? n.offsetHeight : 288;
      right = Math.max(right, (f.x || 0) + w);
      bottom = Math.max(bottom, (f.y || 0) + h);
    }
    for (const u of tum.unsorted.list()) if (u.cat === c.id) {
      const n = els.freeform.querySelector('.tumloosechip[data-handle="' + u.handle + '"]');
      const w = n ? n.offsetWidth : 150, h = n ? n.offsetHeight : 58;
      right = Math.max(right, (u.x || 0) + w / 2);
      bottom = Math.max(bottom, (u.y || 0) + h / 2);
    }
    return {right, bottom};
  }
  const catclamp = (c, cx, cy, w, h) => ({x: clamp(cx, c.x + CATBORDER + w / 2, c.x + c.w - CATBORDER - w / 2), y: clamp(cy, c.y + CATBORDER + h / 2, c.y + c.h - CATBORDER - h / 2), cat: c.id});
  const catunder = (cx, cy, skip) => {
    for (const c of tum.categories.list()) if (c.id !== skip && cx >= c.x && cx <= c.x + c.w && cy >= c.y && cy <= c.y + c.h) return c;
    return null;
  };
  function categorydrop(currentcat, cx, cy, w, h) {
    const prev = currentcat && tum.categories.get(currentcat);
    if (prev) {
      const lox = prev.x + CATBORDER + w / 2, hix = prev.x + prev.w - CATBORDER - w / 2;
      const loy = prev.y + CATBORDER + h / 2, hiy = prev.y + prev.h - CATBORDER - h / 2;
      const dx = cx < lox ? lox - cx : cx > hix ? cx - hix : 0;
      const dy = cy < loy ? loy - cy : cy > hiy ? cy - hiy : 0;
      if (Math.max(dx, dy) <= CATOUT) return {x: clamp(cx, lox, hix), y: clamp(cy, loy, hiy), cat: currentcat};
      const other = catunder(cx, cy, currentcat);
      return other ? catclamp(other, cx, cy, w, h) : {x: cx, y: cy, cat: null};
    }
    const cat = catunder(cx, cy, null);
    return cat ? catclamp(cat, cx, cy, w, h) : {x: cx, y: cy, cat: null};
  }

  function newcategory(lx, ly) {
    const w = 480, h = 360;
    const x = typeof lx === "number" ? (lx - pan.x) / zoom - w / 2 : 120;
    const y = typeof ly === "number" ? (ly - pan.y) / zoom - 40 : 120;
    const a = nooverlapcategorybox(x, y, w, h, null);
    const c = tum.categories.create({x: a.left, y: a.top, w, h});
    state.open = true;
    render();
    if (tum.iconpicker) tum.iconpicker.close();
    const node = els.freeform.querySelector('.tumcategory[data-id="' + c.id + '"]');
    if (node) startcategoryrename(node, c);
    return c;
  }
  function renamecategory(id) {
    const node = els.freeform.querySelector('.tumcategory[data-id="' + id + '"]');
    const c = tum.categories.get(id);
    if (node && c) startcategoryrename(node, c);
  }

  /*//////////////////////////////////////////////////////////////////////*/

  function rectof(n) {
    const w = n.offsetWidth, h = n.offsetHeight;
    let left = parseFloat(n.style.left) || 0, top = parseFloat(n.style.top) || 0;
    if (n.classList.contains("tumloosechip")) {left -= w / 2; top -= h / 2}
    return {left, top, w, h};
  }

  function setrect(n, left, top) {
    if (n.classList.contains("tumloosechip")) {left += n.offsetWidth / 2; top += n.offsetHeight / 2}
    n.style.left = left + "px";
    n.style.top = top + "px";
  }
  
  function findfreespot(x, y, w, h) {
    if (!els.freeform) return {x, y, cat: null};
    const others = [...els.freeform.querySelectorAll(".tumfolder, .tumloosechip")].map(rectof);
    const categories = tum.categories.list();
    const GAP = 14;
    const overlaps = (l, t) => others.some(o => l < o.left + o.w + GAP && l + w + GAP > o.left && t < o.top + o.h + GAP && t + h + GAP > o.top);
    const categoryat = (l, t) => {
      const touched = categories.filter(c => l < c.x + c.w && l + w > c.x && t < c.y + c.h && t + h > c.y);
      if (!touched.length) return null;
      const containing = touched.find(c => l >= c.x + 2 && t >= c.y + 2 && l + w <= c.x + c.w - 2 && t + h <= c.y + c.h - 2);
      return containing && touched.length === 1 ? containing.id : false;
    };
    const candidate = (l, t) => {
      if (overlaps(l, t)) return null;
      const cat = categoryat(l, t);
      return cat === false ? null : {x: l, y: t, cat};
    };
    const initial = candidate(Math.round(x), Math.round(y));
    if (initial) return initial;
    const step = 16;
    for (let ring = 1;; ring++) {
      const top = -ring, bottom = ring;
      for (let dx = -ring; dx <= ring; dx++) {
        for (const dy of [top, bottom]) {
          const spot = candidate(Math.round(x + dx * step), Math.round(y + dy * step));
          if (spot) return spot;
        }
      }
      for (let dy = -ring + 1; dy < ring; dy++) {
        for (const dx of [-ring, ring]) {
          const spot = candidate(Math.round(x + dx * step), Math.round(y + dy * step));
          if (spot) return spot;
        }
      }
    }
  }
  /*//////////////////////////////////////////////////////////////////////*/

    Object.assign(scope, {membercatof, buildcategorynode, attachcategorydrag, attachcategoryresize, startcategoryrename, categoryhover, categorycontentextent, categorydrop, newcategory, renamecategory, rectof, setrect, findfreespot});
  }
})();

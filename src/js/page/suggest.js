(function () {
  "use strict";

  window.tum = window.tum || {};

  const KINDS = {
    blocked: {re: /^\/settings\/blocked/, label: "blocked"},
    muted: {re: /^\/settings\/muted\/all/, label: "muted"}
  };
  let banner = null, dismissed = new Set();

  function currentkind() {
    for (const k in KINDS) if (KINDS[k].re.test(location.pathname)) return k;
    return null;
  }

  function removebanner() {
    if (banner) {banner.remove(); banner = null}
  }

  function buildbanner(kind) {
    const pal = tum.theme.palette();
    const b = document.createElement("div");
    b.className = "tumsuggestbanner";
    b.dataset.kind = kind;
    b.style.borderBottom = "1px solid " + pal.border;
    b.style.background = pal.hover;
    b.style.color = pal.text;
    b.innerHTML =
      '<span class="tumsuggesttext">You can sort your ' + KINDS[kind].label + ' tab into folders from here!</span>' +
      '<button class="tumsuggestx">Dismiss</button>';
    b.querySelector(".tumsuggestx").style.color = pal.muted;
    b.querySelector(".tumsuggestx").addEventListener("click", () => {dismissed.add(kind); removebanner()});
    return b;
  }

  /*//////////////////////////////////////////////////////////////////////*/

  const SKIPH = /^\/(i|home|explore|search|notifications|messages|settings|compose)\b/i;
  let overlayset = new Set();
  function rebuildoverlayset() {
    const s = new Set();
    try {for (const u of tum.unsorted.list()) s.add((u.handle || "").toLowerCase())} catch {}
    try {for (const f of tum.folders.list()) for (const m of (f.members || [])) s.add((m.handle || "").toLowerCase())} catch {}
    overlayset = s;
  }
  function cellhandle(cell) {
    for (const a of cell.querySelectorAll('a[href^="/"]')) {
      const href = a.getAttribute("href") || "";
      const m = /^\/([A-Za-z0-9_]+)\/?$/.exec(href);
      if (m && !SKIPH.test(href)) return m[1].toLowerCase();
    }
    return null;
  }
  function ty(node) {const m = /translateY\(\s*(-?[\d.]+)px/.exec(node.style.transform || ""); return m ? parseFloat(m[1]) : 0}

  let colobs = null, colroot = null, relayframe = 0, scrollhooked = false;
  function spacerof() {
    const c = document.querySelector('[data-testid="cellInnerDiv"]');
    return c ? c.parentElement : null;
  }
  function schedulerelayout() {
    // setTimeout, not rAF - rAF is paused while the tab isn't focused, which would
    // leave the list un-columned until you interacted (same reason badges/iconpicker avoid it)
    if (relayframe) return;
    relayframe = setTimeout(() => {relayframe = 0; relayout()}, 0);
  }
  function resetcol(cells) {
    for (const c of cells) {
      if (!("tumset" in c.dataset)) continue; // never touched it
      c.style.removeProperty("width");
      c.style.removeProperty("left");
      c.style.removeProperty("display");
      c.style.setProperty("transform", "translateY(" + (+c.dataset.tumy || 0) + "px)");
      delete c.dataset.tumset;
    }
  }
  function relayout() {
    if (!currentkind()) return;
    const root = colroot || spacerof();
    if (!root) return;
    const cells = [...root.querySelectorAll('[data-testid="cellInnerDiv"]')].filter(c => c.querySelector('[data-testid="UserCell"]'));
    if (cells.length < 2) return;
    for (const c of cells) if (!("tumy" in c.dataset)) c.dataset.tumy = String(ty(c));
    // two columns only work when the WHOLE list is in the DOM. x.com virtualizes long
    // block/mute lists (a small window of a much taller reserved area, recycled on
    // scroll) - repositioning that window just makes it drift off screen, so detect it
    // and leave a big list as a normal single-column list. fully mounted = the mounted
    // rows span from the top down to (near) react's reserved height.
    const tys = cells.map(c => +c.dataset.tumy || 0);
    const fullymounted = Math.min(...tys) < 200 && Math.max(...tys) + 160 >= root.scrollHeight * 0.85;
    if (!fullymounted) {resetcol(cells); return}

    const visible = [];
    for (const c of cells) {
      const h = cellhandle(c);
      if (h && overlayset.has(h)) {c.style.setProperty("display", "none", "important"); continue}
      if (c.style.display === "none") c.style.removeProperty("display");
      visible.push(c);
    }
    visible.sort((a, b) => (+a.dataset.tumy || 0) - (+b.dataset.tumy || 0));
    const anchor = visible.length ? (+visible[0].dataset.tumy || 0) : 0;
    const ys = [anchor, anchor];
    for (let i = 0; i < visible.length; i++) {
      const c = visible[i], col = i % 2;
      c.style.setProperty("width", "50%", "important");
      c.style.setProperty("left", col ? "50%" : "0", "important");
      c.style.setProperty("transform", "translateY(" + ys[col] + "px)", "important");
      c.dataset.tumset = c.style.transform; // fingerprint of our own write, so the observer can tell it apart from react's
      ys[col] += c.offsetHeight;
    }
  }
  function startcol() {
    const root = spacerof();
    if (!root) return;
    if (colobs && colroot === root) {schedulerelayout(); return}
    stopcol();
    colroot = root;
    for (const c of root.querySelectorAll('[data-testid="cellInnerDiv"]')) c.dataset.tumy = String(ty(c));
    // react repositions the recycled window on scroll but not necessarily every
    // frame, so re-pack on scroll too, else the packed block lags and slides away
    if (!scrollhooked) {scrollhooked = true; window.addEventListener("scroll", () => {if (currentkind()) schedulerelayout()}, true)}
    // never drop react's mutations (that would freeze tumy and the block drifts up
    // as you scroll); instead ignore only the exact transform WE last wrote
    colobs = new MutationObserver(muts => {
      let changed = false;
      for (const m of muts) {
        if (m.type === "childList" && (m.addedNodes.length || m.removedNodes.length)) {changed = true; continue}
        const t = m.target;
        if (t.getAttribute && t.getAttribute("data-testid") === "cellInnerDiv") {
          if (t.style.transform === t.dataset.tumset) continue; // our own write
          const y = String(ty(t));
          if (t.dataset.tumy !== y) {t.dataset.tumy = y; changed = true}
        }
      }
      if (changed) schedulerelayout();
    });
    colobs.observe(root, {attributes: true, attributeFilter: ["style"], subtree: true, childList: true});
    schedulerelayout();
  }
  function stopcol() {
    if (colobs) {colobs.disconnect(); colobs = null}
    colroot = null;
  }

  /*//////////////////////////////////////////////////////////////////////*/

  function listcontainer() {
    const cells = document.querySelectorAll('[data-testid="UserCell"]');
    if (!cells.length) return null;
    const total = cells.length;
    let node = cells[0];
    while (node.parentElement && node.parentElement !== document.body) {
      if (node.parentElement.querySelectorAll('[data-testid="UserCell"]').length === total) return node.parentElement;
      node = node.parentElement;
    }
    return cells[0].parentElement;
  }

  function refresh() {
    const kind = currentkind();
    if (kind) {rebuildoverlayset(); startcol()} else stopcol();
    const container = listcontainer();
    if (!kind || dismissed.has(kind) || !container) {removebanner(); return}
    if (banner && banner.dataset.kind === kind && banner.parentElement === container && container.firstChild === banner) return;
    removebanner();
    banner = buildbanner(kind);
    container.insertBefore(banner, container.firstChild);
  }

  let scheduled = 0;
  function schedule() {
    if (scheduled) return;
    scheduled = setTimeout(() => {scheduled = 0; refresh()}, 120);
  }

  window.tum.suggest = {
    refresh,
    init() {
      new MutationObserver(schedule).observe(document.body, {childList: true, subtree: true});
      const onchange = () => {rebuildoverlayset(); if (currentkind()) schedulerelayout()};
      try {tum.folders.subscribe(onchange); tum.unsorted.subscribe(onchange)} catch {}
      let lastpath = location.pathname;
      setInterval(() => {
        if (location.pathname !== lastpath) {lastpath = location.pathname; if (!currentkind()) dismissed.clear()}
        refresh();
      }, 1000);
      schedule();
    }
  };
})();

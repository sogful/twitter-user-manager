(function () {
  "use strict";

  window.tum = window.tum || {};

  let manifest = [];
  const byid = new Map();
  let categories = [];
  let ready = null;

  // the manifest only holds path references now, not inlined svg markup - fetched on demand
  // (and cached as resolved text, so a later sync lookup through svgfor() can actually hit)
  // so configs/icons.json stays a fraction of the size of the icon set on disk
  const svgcache = new Map(); // id -> resolved svg text
  const svgpending = new Map(); // id -> in-flight promise
  const loadlisteners = new Set();
  let notifyraf = 0;
  function notifyloaded() {
    if (notifyraf) return;
    notifyraf = requestAnimationFrame(() => {
      notifyraf = 0;
      for (const cb of loadlisteners) try {cb()} catch {}
    });
  }
  function iconurl(id) {
    try {return chrome.runtime.getURL(id)} catch {return id}
  }
  function getsvg(id) {
    if (svgcache.has(id)) return Promise.resolve(svgcache.get(id));
    if (svgpending.has(id)) return svgpending.get(id);
    const p = fetch(iconurl(id)).then(r => r.text()).catch(() => "").then(text => {
      svgcache.set(id, text);
      svgpending.delete(id);
      notifyloaded();
      return text;
    });
    svgpending.set(id, p);
    return p;
  }
  // warm the cache in the background right after the manifest loads, in small batches so it
  // doesn't fire 600 requests at once - by the time someone actually opens the picker most
  // icons are already sitting in memory instead of popping in one by one
  async function prefetchall() {
    const batch = 24;
    for (let i = 0; i < manifest.length; i += batch) {
      await Promise.all(manifest.slice(i, i + batch).map(ic => getsvg(ic.id)));
    }
  }

  function loadmanifest() {
    if (ready) return ready;
    ready = new Promise(res => {
      let href = "configs/icons.json";
      try {href = chrome.runtime.getURL("configs/icons.json")} catch {}
      fetch(href).then(r => r.json()).then(list => {
        manifest = Array.isArray(list) ? list : [];
        for (const ic of manifest) byid.set(ic.id, ic);
        categories = [...new Set(manifest.map(ic => ic.category))].filter(Boolean);
        res();
        prefetchall();
      }).catch(() => res());
    });
    return ready;
  }
  loadmanifest();

  let panel = null, cats = null, grid = null, searchinput = null;
  let onpickcb = null, outsideclick = null, hostroot = null;
  let issearching = false;

  function matches(icon, q) {
    if (icon.name.toLowerCase().includes(q)) return true;
    return icon.tags.some(t => t.includes(q));
  }

  function makeitem(icon) {
    const btn = document.createElement("button");
    btn.className = "tumipitem";
    btn.type = "button";
    btn.title = icon.name;
    getsvg(icon.id).then(svg => {if (svg) btn.innerHTML = svg});
    btn.addEventListener("click", () => {
      if (onpickcb) onpickcb(icon.id);
      close();
    });
    return btn;
  }

  function rendercategories() {
    grid.innerHTML = "";
    issearching = false;
    for (const cat of categories) {
      const section = document.createElement("div");
      section.className = "tumipsection";
      section.dataset.category = cat;
      const title = document.createElement("div");
      title.className = "tumipsectiontitle";
      title.textContent = cat;
      const row = document.createElement("div");
      row.className = "tumiprow";
      for (const ic of manifest) if (ic.category === cat) row.appendChild(makeitem(ic));
      section.appendChild(title);
      section.appendChild(row);
      grid.appendChild(section);
    }
  }

  function rendersearch(q) {
    issearching = true;
    grid.innerHTML = "";
    const results = manifest.filter(ic => matches(ic, q));
    const section = document.createElement("div");
    section.className = "tumipsection";
    const title = document.createElement("div");
    title.className = "tumipsectiontitle";
    title.textContent = results.length + " results";
    const row = document.createElement("div");
    row.className = "tumiprow";
    for (const ic of results) row.appendChild(makeitem(ic));
    section.appendChild(title);
    section.appendChild(row);
    grid.appendChild(section);
    if (!results.length) {
      const empty = document.createElement("div");
      empty.className = "tumipempty";
      empty.textContent = "no icons found";
      grid.appendChild(empty);
    }
  }

  function selectcat(cat) {
    for (const b of cats.children) b.classList.toggle("tumselected", b.dataset.category === cat);
  }

  function buildcats() {
    cats.innerHTML = "";
    for (const cat of categories) {
      const btn = document.createElement("button");
      btn.className = "tumipcat";
      btn.type = "button";
      btn.title = cat;
      btn.dataset.category = cat;
      const first = manifest.find(ic => ic.category === cat);
      if (first) getsvg(first.id).then(svg => {if (svg) btn.innerHTML = svg});
      btn.addEventListener("click", () => {
        if (issearching) {searchinput.value = ""; rendercategories()}
        const section = grid.querySelector(`.tumipsection[data-category="${CSS.escape(cat)}"]`);
        if (section) section.scrollIntoView({block: "start", behavior: "instant"});
        selectcat(cat);
      });
      cats.appendChild(btn);
    }
    selectcat(categories[0]);
  }

  function onscroll() {
    if (issearching) return;
    const sections = [...grid.querySelectorAll(".tumipsection")];
    if (!sections.length) return;
    // the very last section usually can't be scrolled all the way flush to the top (there's
    // nothing left below it to push it up further), so a plain nearest-top match would keep
    // picking the section before it - special-case being scrolled to the bottom, same fix
    // the kaomoji picker this is modeled on uses for its own category highlighting
    const atbottom = Math.ceil(grid.scrollTop + grid.clientHeight) >= grid.scrollHeight - 1;
    if (atbottom) {selectcat(sections[sections.length - 1].dataset.category); return}
    const gridtop = grid.getBoundingClientRect().top;
    let best = sections[0], bestdist = Infinity;
    for (const section of sections) {
      const top = section.getBoundingClientRect().top;
      if (top > gridtop + 4) continue;
      const dist = gridtop - top;
      if (dist < bestdist) {bestdist = dist; best = section}
    }
    selectcat(best.dataset.category);
  }

  function position(anchorrect) {
    const w = 300, h = 420, gap = 8;
    let left = anchorrect.left;
    let top = anchorrect.bottom + gap;
    const vw = window.innerWidth, vh = window.innerHeight;
    if (left + w > vw - 8) left = vw - w - 8;
    if (left < 8) left = 8;
    if (top + h > vh - 8) top = anchorrect.top - h - gap;
    if (top < 8) top = 8;
    panel.style.left = left + "px";
    panel.style.top = top + "px";
  }

  function open(anchorel, onpick) {
    if (!panel) return;
    onpickcb = onpick;
    loadmanifest().then(() => {
      buildcats();
      rendercategories();
      position(anchorel.getBoundingClientRect());
      panel.classList.add("tumshow");
      searchinput.value = "";
      requestAnimationFrame(() => searchinput.focus());
    });
    if (!outsideclick) {
      // listening on the shadow root itself (not document) - a document-level listener would
      // see every shadow-internal click retargeted to the host element, breaking contains()
      outsideclick = e => {if (panel && !panel.contains(e.target) && e.target !== anchorel && !anchorel.contains(e.target)) close()};
      hostroot.addEventListener("pointerdown", outsideclick, true);
    }
  }

  function close() {
    if (panel) panel.classList.remove("tumshow");
    if (outsideclick) {
      hostroot.removeEventListener("pointerdown", outsideclick, true);
      outsideclick = null;
    }
  }

  function build(root) {
    hostroot = root;
    panel = document.createElement("div");
    panel.className = "tumiconpicker";
    panel.innerHTML = `
      <div class="tumipsearch">
        <svg viewBox="0 0 24 24"><circle cx="10" cy="10" r="6.5"/><line x1="15" y1="15" x2="20.5" y2="20.5"/></svg>
        <input class="tumipsearchinput" placeholder="search icons" autocomplete="off">
      </div>
      <div class="tumipcats"></div>
      <div class="tumipgrid"></div>
    `;
    root.appendChild(panel);
    cats = panel.querySelector(".tumipcats");
    grid = panel.querySelector(".tumipgrid");
    searchinput = panel.querySelector(".tumipsearchinput");
    searchinput.addEventListener("input", () => {
      const q = searchinput.value.trim().toLowerCase();
      if (q) rendersearch(q);
      else rendercategories();
    });
    grid.addEventListener("scroll", onscroll);
    panel.addEventListener("pointerdown", e => e.stopPropagation());
  }

  window.tum.iconpicker = {
    mount: build,
    open, close,
    // synchronous - returns "" if not fetched yet, which callers fall back to a default icon
    // for. getsvg() below kicks the real fetch off so a later onload() notification catches up
    svgfor: id => {if (id && !svgcache.has(id)) getsvg(id); return svgcache.get(id) || ""},
    onload: cb => loadlisteners.add(cb)
  };
})();

(function () {
  "use strict";

  window.tum = window.tum || {};

  let manifest = [];
  const byid = new Map();
  let categories = [];
  let ready = null;

  const svgcache = new Map();   // id -> resolved svg text
  const svgpending = new Map(); // id -> in-flight promise
  const loadlisteners = new Set();

  /*//////////////////////////////////////////////////////////////////////*/

  let notifyraf = 0;
  function notifyloaded() {
    if (notifyraf) return;
    notifyraf = requestAnimationFrame(() => {
      notifyraf = 0;
      for (const cb of loadlisteners) try {cb()} catch {}
    });
  }

  function iconurl(id) {
    try {return chrome.runtime.getURL(id)} catch {return "../../" + id}
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
  async function prefetchall() {
    const batch = 24;
    for (let i = 0; i < manifest.length; i += batch) {
      await Promise.all(manifest.slice(i, i + batch).map(ic => getsvg(ic.id)));
    }
  }

  function loadmanifest() {
    if (ready) return ready;
    ready = new Promise(res => {
      let href = "../../assets/static/icons.json";
      try {href = chrome.runtime.getURL("assets/static/icons.json")} catch {}
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

  /*//////////////////////////////////////////////////////////////////////*/

  const EMOJICATORDER = ["Smileys & people", "Animals & nature", "Food & drink", "Activity", "Travel & places", "Objects", "Symbols", "Flags"];
  const CATICON = {
    "Smileys & people": "1f600", "Animals & nature": "1f43b", "Food & drink": "1f354",
    "Activity": "26bd", "Travel & places": "1f698", "Objects": "1f4a1",
    "Symbols": "1f523", "Flags": "1f6a9"
  };
  let emojilist = [];
  let emojicategories = [];
  let emojiready = null;

  // i hope they don't remove this cdn from the whole bullshit twemoji phasing out
  function emojiurl(id) {
    return `https://abs.twimg.com/emoji/v2/svg/${id}.svg`;
  }

  function loademoji() {
    if (emojiready) return emojiready;
    emojiready = new Promise(res => {
      let href = "../../assets/static/emoji.json";
      try {href = chrome.runtime.getURL("assets/static/emoji.json")} catch {}
      fetch(href).then(r => r.json()).then(list => {
        emojilist = Array.isArray(list) ? list : [];
        const present = new Set(emojilist.map(e => e.category));
        emojicategories = EMOJICATORDER.filter(c => present.has(c));
        res();
      }).catch(() => res());
    });
    return emojiready;
  }
  loademoji();

  let panel = null, cats = null, emojicats = null, grid = null, searchinput = null;
  let onpickcb = null, outsideclick = null, hostroot = null;
  let issearching = false;

  const capitalize = s => s.replace(/\b\w/g, c => c.toUpperCase());

  function matches(icon, q) {
    if (icon.name.toLowerCase().includes(q)) return true;
    return icon.tags.some(t => t.includes(q));
  }
  function matchesemoji(e, q) {
    return e.name.includes(q);
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

  function makeemojiitem(e) {
    const btn = document.createElement("button");
    btn.className = "tumipemoji";
    btn.type = "button";
    btn.title = e.name;
    const img = document.createElement("img");
    img.src = emojiurl(e.id);
    img.alt = e.char;
    img.loading = "lazy";
    img.addEventListener("error", () => {img.remove(); btn.textContent = e.char}, {once: true});
    btn.appendChild(img);
    btn.addEventListener("click", () => {
      if (onpickcb) onpickcb("emoji:" + e.id);
      close();
    });
    return btn;
  }

  function mksection(cat, type) {
    const section = document.createElement("div");
    section.className = "tumipsection";
    section.dataset.category = cat;
    section.dataset.type = type;
    const title = document.createElement("div");
    title.className = "tumipsectiontitle";
    title.textContent = type === "emoji" ? cat.slice(6) : capitalize(cat);
    const row = document.createElement("div");
    row.className = type === "emoji" ? "tumipemojirow" : "tumiprow";
    section.appendChild(title);
    section.appendChild(row);
    return section;
  }
  function fillsection(section) {
    if (section.dataset.filled) return;
    section.dataset.filled = "1";
    const row = section.querySelector(".tumiprow, .tumipemojirow");
    const cat = section.dataset.category;
    if (section.dataset.type === "emoji") {
      const ec = cat.slice(6);
      for (const e of emojilist) if (e.category === ec) row.appendChild(makeemojiitem(e));
    } else {
      for (const ic of manifest) if (ic.category === cat) row.appendChild(makeitem(ic));
    }
  }
  function fillvisible() {
    if (issearching || !grid) return;
    const gr = grid.getBoundingClientRect();
    let did = false;
    for (const s of grid.querySelectorAll(".tumipsection")) {
      if (s.dataset.filled) continue;
      const r = s.getBoundingClientRect();
      if (r.top < gr.bottom + 500 && r.bottom > gr.top - 500) {fillsection(s); did = true}
    }
    if (did) setTimeout(fillvisible, 0);
  }
  function rendercategories() {
    grid.innerHTML = "";
    issearching = false;
    for (const cat of categories) grid.appendChild(mksection(cat, "icon"));
    for (const cat of emojicategories) grid.appendChild(mksection("emoji:" + cat, "emoji"));
    setTimeout(fillvisible, 0);
  }

  function rendersearch(q) {
    issearching = true;
    grid.innerHTML = "";
    const iconresults = manifest.filter(ic => matches(ic, q));
    const section = document.createElement("div");
    section.className = "tumipsection";
    const title = document.createElement("div");
    title.className = "tumipsectiontitle";
    title.textContent = iconresults.length + " icon results";
    const row = document.createElement("div");
    row.className = "tumiprow";
    for (const ic of iconresults) row.appendChild(makeitem(ic));
    section.appendChild(title);
    section.appendChild(row);
    grid.appendChild(section);

    const emojiresults = emojilist.filter(e => matchesemoji(e, q)).slice(0, 200);
    if (emojiresults.length) {
      const esection = document.createElement("div");
      esection.className = "tumipsection";
      const etitle = document.createElement("div");
      etitle.className = "tumipsectiontitle";
      etitle.textContent = emojiresults.length + " emoji results";
      const erow = document.createElement("div");
      erow.className = "tumipemojirow";
      for (const e of emojiresults) erow.appendChild(makeemojiitem(e));
      esection.appendChild(etitle);
      esection.appendChild(erow);
      grid.appendChild(esection);
    }

    if (!iconresults.length && !emojiresults.length) {
      const empty = document.createElement("div");
      empty.className = "tumipempty";
      empty.textContent = "No icons found";
      grid.appendChild(empty);
    }
  }

  function selectcat(cat) {
    for (const b of cats.children) b.classList.toggle("tumselected", b.dataset.category === cat);
    for (const b of emojicats.children) b.classList.toggle("tumselected", b.dataset.category === cat);
  }

  function addcattab(container, key, title, fill) {
    const btn = document.createElement("button");
    btn.className = "tumipcat";
    btn.type = "button";
    btn.title = title;
    btn.dataset.category = key;
    fill(btn);
    btn.addEventListener("click", () => {
      if (issearching) {searchinput.value = ""; rendercategories()}
      const section = grid.querySelector(`.tumipsection[data-category="${CSS.escape(key)}"]`);
      if (section) {fillsection(section); section.scrollIntoView({block: "start", behavior: "instant"}); fillvisible()}
      selectcat(key);
    });
    container.appendChild(btn);
  }

  function buildcats() {
    cats.innerHTML = "";
    emojicats.innerHTML = "";
    for (const cat of categories) {
      addcattab(cats, cat, cat, btn => {
        const first = manifest.find(ic => ic.category === cat);
        if (first) getsvg(first.id).then(svg => {if (svg) btn.innerHTML = svg});
      });
    }
    for (const cat of emojicategories) {
      addcattab(emojicats, "emoji:" + cat, cat, btn => {
        const cp = CATICON[cat];
        const first = emojilist.find(e => e.category === cat);
        if (!cp && !first) return;
        const img = document.createElement("img");
        img.src = emojiurl(cp || first.id);
        img.addEventListener("error", () => {img.remove(); if (first) btn.textContent = first.char}, {once: true});
        btn.appendChild(img);
      });
    }
    selectcat(categories[0]);
  }

  function onscroll() {
    if (issearching) return;
    fillvisible();
    const sections = [...grid.querySelectorAll(".tumipsection")];
    if (!sections.length) return;
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
    const w = 320, h = 480, gap = 8;
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
    Promise.all([loadmanifest(), loademoji()]).then(() => {
      buildcats();
      rendercategories();
      position(anchorel.getBoundingClientRect());
      panel.classList.add("tumshow");
      searchinput.value = "";
      requestAnimationFrame(() => searchinput.focus());
    });
    if (!outsideclick) {
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
        <input class="tumipsearchinput" placeholder="Search icons and emoji" autocomplete="off">
      </div>
      <div class="tumipcats"></div>
      <div class="tumipcats tumipcatsemoji"></div>
      <div class="tumipgrid"></div>
      <div class="tumipfooter">
        <span>icon color</span>
        <input class="tumipcolor" type="color" value="#71767b" title="tint the monochrome icons above (preview only)">
      </div>
    `;
    root.appendChild(panel);
    cats = panel.querySelector(".tumipcats:not(.tumipcatsemoji)");
    emojicats = panel.querySelector(".tumipcatsemoji");
    grid = panel.querySelector(".tumipgrid");
    searchinput = panel.querySelector(".tumipsearchinput");
    panel.querySelector(".tumipcolor").addEventListener("input", e => {
      grid.style.setProperty("--tumipcolor", e.target.value);
    });
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
    svgfor: id => {if (id && !svgcache.has(id)) getsvg(id); return svgcache.get(id) || ""},
    emojiurl,
    onload: cb => loadlisteners.add(cb)
  };
})();

(function () {
  "use strict";

  window.tum = window.tum || {};

  let manifest = [];
  const byid = new Map();
  let ready = null;

  function loadmanifest() {
    if (ready) return ready;
    ready = new Promise(res => {
      let href = "configs/icons.json";
      try {href = chrome.runtime.getURL("configs/icons.json")} catch {}
      fetch(href).then(r => r.json()).then(list => {
        manifest = Array.isArray(list) ? list : [];
        for (const ic of manifest) byid.set(ic.id, ic);
        res();
      }).catch(() => res());
    });
    return ready;
  }
  loadmanifest();

  const DEFAULTCOUNT = 120, SEARCHCAP = 200;

  let panel = null, grid = null, searchinput = null, onpickcb = null, outsideclick = null, hostroot = null;

  function matches(icon, q) {
    if (icon.name.toLowerCase().includes(q)) return true;
    return icon.tags.some(t => t.includes(q));
  }

  function renderresults(q) {
    grid.innerHTML = "";
    const list = q ? manifest.filter(ic => matches(ic, q)).slice(0, SEARCHCAP) : manifest.slice(0, DEFAULTCOUNT);
    for (const ic of list) {
      const btn = document.createElement("button");
      btn.className = "tumipitem";
      btn.type = "button";
      btn.title = ic.name;
      btn.innerHTML = ic.svg;
      btn.addEventListener("click", () => {
        if (onpickcb) onpickcb(ic.id);
        close();
      });
      grid.appendChild(btn);
    }
    if (!list.length) {
      const empty = document.createElement("div");
      empty.className = "tumipempty";
      empty.textContent = "no icons found";
      grid.appendChild(empty);
    }
  }

  function position(anchorrect) {
    const w = 280, h = 340, gap = 8;
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
      renderresults("");
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
      <div class="tumipgrid"></div>
    `;
    root.appendChild(panel);
    grid = panel.querySelector(".tumipgrid");
    searchinput = panel.querySelector(".tumipsearchinput");
    searchinput.addEventListener("input", () => renderresults(searchinput.value.trim().toLowerCase()));
    panel.addEventListener("pointerdown", e => e.stopPropagation());
  }

  window.tum.iconpicker = {
    mount: build,
    open, close,
    svgfor: id => {const ic = byid.get(id); return ic ? ic.svg : ""}
  };
})();

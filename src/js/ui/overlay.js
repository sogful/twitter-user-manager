(function () {
  "use strict";

  window.tum = window.tum || {};
  const O = window.tum._ov = {};
  const T = (...a) => tum.strings.t(...a);
  const DEFAULT_AVATAR = "https://abs.twimg.com/sticky/default_profile_images/default_profile_0_mini.png";

  const ICONS = {
    follow: '<svg viewBox="0 0 24 24"><circle cx="9" cy="8" r="4"/><path d="M2 21c0-4 3-7 7-7s7 3 7 7"/><line x1="18" y1="8" x2="18" y2="14"/><line x1="15" y1="11" x2="21" y2="11"/></svg>',
    unfollow: '<svg viewBox="0 0 24 24"><circle cx="9" cy="8" r="4"/><path d="M2 21c0-4 3-7 7-7s7 3 7 7"/><line x1="15" y1="11" x2="21" y2="11"/></svg>',
    mute: '<svg viewBox="0 0 24 24"><path d="M12 3a5 5 0 0 0-5 5v3.5c0 .9-.4 1.8-1 2.5l-1 1.2c-.5.6 0 1.5.8 1.5h13.4c.8 0 1.3-.9.8-1.5l-1-1.2c-.6-.7-1-1.6-1-2.5V8a5 5 0 0 0-5-5z"/><path d="M9.5 20a2.5 2.5 0 0 0 5 0"/><line x1="3" y1="3" x2="21" y2="21"/></svg>',
    block: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><line x1="5.5" y1="5.5" x2="18.5" y2="18.5"/></svg>',
    plus: '<svg viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>',
    close: '<svg viewBox="0 0 24 24"><line x1="5" y1="5" x2="19" y2="19"/><line x1="19" y1="5" x2="5" y2="19"/></svg>',
    trash: '<svg viewBox="0 0 24 24"><path d="M4 7h16"/><path d="M9 7V4h6v3"/><path d="M6 7l1 13h10l1-13"/></svg>',
    pencil: '<svg viewBox="0 0 24 24"><path d="M4 20l1-4L16 5l3 3L8 19l-4 1z"/><path d="M14 7l3 3"/></svg>',
    chevron: '<svg viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg>',
    check: '<svg viewBox="0 0 24 24"><path d="M5 12l5 5L20 6"/></svg>',
    download: '<svg viewBox="0 0 24 24"><path d="M12 3v12"/><path d="M7 11l5 5 5-5"/><path d="M4 20h16"/></svg>',
    upload: '<svg viewBox="0 0 24 24"><path d="M12 21V9"/><path d="M7 13l5-5 5 5"/><path d="M4 4h16"/></svg>',
    sort: '<svg viewBox="0 0 24 24"><path d="M7 4v16M4 7l3-3 3 3"/><path d="M17 20V4M14 17l3 3 3-3"/></svg>',
    folder: '<svg viewBox="0 0 24 24"><path d="M3 6a1 1 0 0 1 1-1h5l2 2h9a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z"/></svg>',
    profile: '<svg viewBox="0 0 24 24"><path d="M14 3h7v7"/><path d="M10 14L21 3"/><path d="M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5"/></svg>',
    category: '<svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="16" rx="2" stroke-dasharray="3 3"/></svg>',
    gear: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>'
  };

  /*//////////////////////////////////////////////////////////////////////*/

  const TEXTPNG = chrome.runtime.getURL("assets/images/text.png");
  const SORTMODES = ["az", "za", "new", "old"];
  const SORTLABEL = {az: "A-Z", za: "Z-A", new: "NEW", old: "OLD", added: "NEW"};

  const MEMBERCAP = 200; // render cap per folder list
  const showncap = new Map();
  const THRESHOLD = 6;
  const URLRE = /(https?:\/\/[^\s<]+)/g;

  let shadow = null, root = null, host = null;
  let els = {};

  const settings = tum.storage.create("tum.settings", {global: true});
  let keepopen = true;
  function applysetting(v) {keepopen = v && "keepopen" in v ? !!v.keepopen : true}
  settings.get().then(applysetting);
  settings.subscribe(applysetting);

  const campos = tum.storage.create("tum.campos");
  let campostimer = 0;
  function savecampos() {clearTimeout(campostimer); campostimer = setTimeout(() => {try {campos.set({x: pan.x, y: pan.y})} catch {}}, 400)}
  let state = {drag: null, open: false, modalopen: false, reasonopen: false, confirmopen: false, editing: null, pendingcreate: null, reasontarget: null, reasonmode: "edit", confirmtarget: null};

  /*//////////////////////////////////////////////////////////////////////*/

  function el(tag, cls, html) {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html !== undefined) e.innerHTML = html;
    return e;
  }
  function escapehtml(s) {
    const d = document.createElement("div");
    d.textContent = s == null ? "" : s;
    return d.innerHTML;
  }
  function linkify(text) {
    return escapehtml(text).replace(URLRE, u => `<a href="${u}" target="_blank" rel="noopener">${u}</a>`);
  }
  function clamp(v, a, b) {return Math.max(a, Math.min(b, v))}
  function badgeshtml(badges) {
    const b = (Array.isArray(badges) ? badges : []).filter(h => !/\/emoji\//.test(h));
    return b.length ? `<span class="tumbadges">${b.join("")}</span>` : "";
  }
  function readablefg(hex) {
    const n = parseInt(hex.replace("#", ""), 16);
    const r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
    const yiq = (r * 299 + g * 587 + b * 114) / 1000;
    return yiq >= 150 ? "#000" : "white";
  }
  function splitcount(n) {
    const s = String(n);
    if (s.length < 4) return s;
    const h = Math.ceil(s.length / 2);
    return s.slice(0, h) + "<br>" + s.slice(h);
  }
  function iconhtml(icon) {
    if (!icon) return "";
    if (icon.startsWith("emoji:")) return `<img class="tumiconemoji" src="${tum.iconpicker.emojiurl(icon.slice(6))}">`;
    if (icon.endsWith(".svg")) return tum.iconpicker.svgfor(icon);
    return escapehtml(icon);
  }

  /*//////////////////////////////////////////////////////////////////////*/

  function loadcss() {
    return new Promise(res => {
      let href = "../css/overlay.css";
      try {href = chrome.runtime.getURL("src/css/overlay.css")} catch {}
      fetch(href).then(r => r.text()).then(css => {
        const st = document.createElement("style");
        st.textContent = css;
        shadow.appendChild(st);
        res();
      }).catch(() => res());
    });
  }
  function destroyeravailable() {
    try {const u = chrome.runtime.getURL("desktopdestroyer/index.html"); return !!u && u !== "about:blank"} catch {return false}
  }

  function build() {
    if (document.getElementById("tum-host")) return;
    host = document.createElement("div");
    host.id = "tum-host";
    document.documentElement.appendChild(host);
    shadow = host.attachShadow({mode: "open"});
    loadcss().then(buildmarkup);
  }

  let pinraf = 0;
  function pinhost() {
    pinraf = 0;
    if (!host) return;
    const r = host.getBoundingClientRect();
    const dx = -r.left, dy = -r.top;
    host.style.transform = (dx || dy) ? `translate(${dx}px,${dy}px)` : "";
    const vw = window.innerWidth, vh = window.innerHeight;
    if (Math.round(r.width) !== vw) host.style.width = vw + "px";
    if (Math.round(r.height) !== vh) host.style.height = vh + "px";
  }
  function schedulepin() {if (!pinraf) pinraf = requestAnimationFrame(pinhost)}
  window.addEventListener("scroll", schedulepin, true);
  window.addEventListener("resize", schedulepin);

  let pan = {x: 0, y: 0};
  let zoom = 1;
  const ZMIN = 0.35, ZMAX = 2.5;
  function applypan() {
    if (els.freeform) {
      els.freeform.style.transformOrigin = "0 0";
      els.freeform.style.transform = `translate(${pan.x}px,${pan.y}px) scale(${zoom})`;
    }
    scheduleminimap();
    if (els.gridlayer) {
      els.gridlayer.style.backgroundPosition = `${pan.x}px ${pan.y}px`;
      els.gridlayer.style.backgroundSize = `${window.innerWidth * zoom}px ${window.innerHeight * zoom}px`;
    }
    savecampos();
  }
  function zoomat(sx, sy, factor) {
    const old = zoom;
    zoom = Math.max(ZMIN, Math.min(ZMAX, zoom * factor));
    if (zoom === old) return;
    const cx = (sx - pan.x) / old, cy = (sy - pan.y) / old;
    pan.x = sx - cx * zoom;
    pan.y = sy - cy * zoom;
    applypan();
  }
  function onwheel(e) {
    if (!e.ctrlKey) return;
    if (!state.open || state.modalopen || state.reasonopen || state.confirmopen) return;
    e.preventDefault();
    zoomat(e.clientX, e.clientY, e.deltaY < 0 ? 1.12 : 1 / 1.12);
  }
  function startcamerapan(e) {
    e.preventDefault();
    const startx = e.clientX, starty = e.clientY;
    const ps = {x: pan.x, y: pan.y};
    const move = ev => {pan.x = ps.x + (ev.clientX - startx); pan.y = ps.y + (ev.clientY - starty); applypan()};
    const up = () => {document.removeEventListener("pointermove", move, true); document.removeEventListener("pointerup", up, true); root.classList.remove("tumpanning")};
    root.classList.add("tumpanning");
    document.addEventListener("pointermove", move, true);
    document.addEventListener("pointerup", up, true);
  }

  function updategrid() {
    if (!els.gridlayer) return;
    const w = window.innerWidth, h = window.innerHeight, line = "rgba(255,255,255,0.16)";
    const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='${w}' height='${h}'><path d='M${w - 0.5} 0V${h}M0 ${h - 0.5}H${w}' fill='none' stroke='${line}' stroke-width='1' stroke-dasharray='7 7'/></svg>`;
    els.gridlayer.style.backgroundImage = `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
  }
  window.addEventListener("resize", updategrid);

  function attachpan() {
    const bd = els.backdrop;
    root.addEventListener("wheel", onwheel, {passive: false});
    root.addEventListener("pointerdown", e => {if (e.button === 1) {e.preventDefault(); e.stopPropagation(); startcamerapan(e)}}, true);
    bd.addEventListener("mousedown", e => {if (e.button === 1) e.preventDefault()});
    bd.addEventListener("pointerdown", e => {
      if (e.button !== 0 && e.button !== 1) return;
      e.preventDefault();
      try {bd.setPointerCapture(e.pointerId)} catch {}
      const ctxwasdismissed = O._ctxdismiss;
      O._ctxdismiss = false;
      const startx = e.clientX, starty = e.clientY;
      const panstart = {x: pan.x, y: pan.y};
      let panning = false;
      const move = ev => {
        const dx = ev.clientX - startx, dy = ev.clientY - starty;
        if (!panning) {
          if (Math.hypot(dx, dy) < THRESHOLD) return;
          panning = true;
          root.classList.add("tumpanning");
        }
        pan.x = panstart.x + dx;
        pan.y = panstart.y + dy;
        applypan();
      };
      const finish = ev => {
        bd.removeEventListener("pointermove", move);
        bd.removeEventListener("pointerup", finish);
        bd.removeEventListener("pointercancel", finish);
        try {bd.releasePointerCapture(e.pointerId)} catch {}
        root.classList.remove("tumpanning");
        if (!panning && !ctxwasdismissed && e.button === 0 && ev.type === "pointerup") closeoverlay();
      };
      bd.addEventListener("pointermove", move);
      bd.addEventListener("pointerup", finish);
      bd.addEventListener("pointercancel", finish);
    });
  }

  function setupscrolllock() {
    const allow = ev => {
      for (const n of (ev.composedPath ? ev.composedPath() : [])) {
        if (n instanceof Element && (n.classList.contains("tumfolderlist") || n.classList.contains("tumipgrid") || n.classList.contains("tumreasontext"))) return true;
      }
      return false;
    };
    const block = ev => {if (root && root.classList.contains("tumactive") && !allow(ev)) ev.preventDefault()};
    window.addEventListener("wheel", block, {capture: true, passive: false});
    window.addEventListener("touchmove", block, {capture: true, passive: false});
    window.addEventListener("mousedown", ev => {if (ev.button === 1 && root && root.classList.contains("tumactive")) ev.preventDefault()}, {capture: true});
  }
  const SCROLLKEYS = new Set([" ", "PageUp", "PageDown", "Home", "End", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"]);

  function wirearrows() {
    const DIRS = {tumedgeup: [0, 1], tumedgedown: [0, -1], tumedgeleft: [1, 0], tumedgeright: [-1, 0]};
    const SPEED = 15;
    for (const arrow of root.querySelectorAll(".tumedgearrow")) {
      const cls = Object.keys(DIRS).find(c => arrow.classList.contains(c));
      if (!cls) continue;
      const [sx, sy] = DIRS[cls];
      arrow.addEventListener("pointerdown", e => {
        if (e.button !== 0) return;
        e.preventDefault();
        let timer = setInterval(() => {pan.x += sx * SPEED; pan.y += sy * SPEED; applypan()}, 16);
        const stop = () => {clearInterval(timer); document.removeEventListener("pointerup", stop); document.removeEventListener("pointercancel", stop)};
        document.addEventListener("pointerup", stop);
        document.addEventListener("pointercancel", stop);
      });
    }
  }

  function buildmarkup() {
    root = el("div", "tumroot");
    O.root = root;
    loadmarkup().then(html => {
      root.innerHTML = html;
      const tp = root.querySelector("[data-tumtextpng]");
      if (tp) tp.src = TEXTPNG;
      shadow.appendChild(root);
      wiremarkup();
    });
  }

  let markuphtml = null;
  function loadmarkup() {
    if (markuphtml != null) return Promise.resolve(markuphtml);
    let url = "overlay.html";
    try {url = chrome.runtime.getURL("src/html/overlay.html")} catch {}
    return fetch(url).then(r => r.text()).then(t => {markuphtml = t; return t});
  }
  function wiremarkup() {

    els = O.els = {
      backdrop: root.querySelector(".tumbackdrop"),
      canvas: root.querySelector(".tumcanvas"),
      gridlayer: root.querySelector(".tumgridlayer"),
      freeform: root.querySelector(".tumfreeform"),
      quickadd: root.querySelector(".tumquickadd"),
      quickdelete: root.querySelector(".tumquickdelete"),
      quickreason: root.querySelector(".tumquickreason"),
      chip: root.querySelector(".tumchip"),
      chipavatar: root.querySelector(".tumchipavatar"),
      chipname: root.querySelector(".tumchipname"),
      chipbadges: root.querySelector(".tumchipbadges"),
      chipreason: root.querySelector(".tumchipreason"),
      chiphandle: root.querySelector(".tumchiphandle"),
      modal: root.querySelector(".tummodal"),
      modaliconbtn: root.querySelector(".tummodaliconbtn"),
      modaliconclear: root.querySelector(".tummodaliconclear"),
      modalname: root.querySelector(".tummodalname"),
      modaldesc: root.querySelector(".tummodaldesc"),
      modalclose: root.querySelector(".tummodalclose"),
      modalactions: root.querySelectorAll(".tummodalaction"),
      modalactionsrow: root.querySelector(".tummodalactions"),
      modalcolors: root.querySelector(".tummodalcolors"),
      modalsave: root.querySelector(".tummodalsave"),
      reasonmodal: root.querySelector(".tumreasonmodal"),
      reasontitle: root.querySelector(".tumreasontitle"),
      reasonclose: root.querySelector(".tumreasonclose"),
      reasonview: root.querySelector(".tumreasonview"),
      reasontext: root.querySelector(".tumreasontext"),
      reasonsource: root.querySelector(".tumreasonsource"),
      reasonedit: root.querySelector(".tumreasonedit"),
      reasondelete: root.querySelector(".tumreasondelete"),
      toolgear: root.querySelector(".tumtoolgear"),
      actionbar: root.querySelector(".tumactionbar"),
      actionbtns: [...root.querySelectorAll(".tumactionbtn")],
      actionfollow: root.querySelector(".tumactionfollow"),
      actiondestroy: root.querySelector(".tumactiondestroy"),
      toolclose: root.querySelector(".tumtoolclose"),
      toolexport: root.querySelector(".tumtoolexport"),
      toolimport: root.querySelector(".tumtoolimport"),
      toolfit: root.querySelector(".tumtoolfit"),
      tooljump: root.querySelector(".tumtooljump"),
      jumplist: root.querySelector(".tumjumplist"),
      jumpsearch: root.querySelector(".tumjumpsearch"),
      jumprows: root.querySelector(".tumjumprows"),
      minimap: root.querySelector(".tumminimap"),
      minimapcanvas: root.querySelector(".tumminimapcanvas"),
      reasonform: root.querySelector(".tumreasonform"),
      reasonactions: root.querySelector(".tumreasonactions"),
      reasonactionbtns: root.querySelectorAll(".tumreasonactions .tummodalaction"),
      reasoninput: root.querySelector(".tumreasoninput"),
      reasonsourceinput: root.querySelector(".tumreasonsourceinput"),
      reasonsave: root.querySelector(".tumreasonsave"),
      confirmsheet: root.querySelector(".tumconfirmsheet"),
      confirmtitle: root.querySelector(".tumconfirmtitle"),
      confirmbody: root.querySelector(".tumconfirmbody"),
      confirmok: root.querySelector(".tumconfirmok"),
      confirmcancel: root.querySelector(".tumconfirmcancel"),
      toast: root.querySelector(".tumtoast")
    };

    for (const c of tum.folders.COLORS) {
      const sw = el("button", "tummodalcolor");
      sw.style.backgroundColor = c;
      sw.dataset.color = c;
      sw.addEventListener("click", () => O.selectcolor(c));
      els.modalcolors.appendChild(sw);
    }
    tum.iconpicker.mount(root);
    tum.iconpicker.onload(() => {render(); if (state.modalopen) O.refreshiconbtn()});

    attachpan();
    setupscrolllock();
    wirearrows();

    root.addEventListener("contextmenu", O.oncontextmenu);
    root.addEventListener("pointerdown", e => {
      let dismiss = false;
      const editing = root.querySelector(".tumcategorytitle.tumediting");
      if (editing && !e.target.closest(".tumcategorytitle")) {editing.blur(); dismiss = true}
      if (O.ctxopen && O.ctxopen() && !e.target.closest(".tumcontextmenu")) {O.closectx(); dismiss = true}
      O._ctxdismiss = dismiss;
    }, true);
    els.modalclose.addEventListener("click", O.closemodal);
    els.modal.addEventListener("click", e => {if (e.target === els.modal) O.closemodal()});
    els.modalsave.addEventListener("click", O.savemodal);
    els.modalname.addEventListener("input", O.editfields);
    els.modaldesc.addEventListener("input", O.editfields);
    els.modaliconbtn.addEventListener("click", e => {e.stopPropagation(); tum.iconpicker.open(els.modaliconbtn, id => O.selecticon(id))});
    els.modaliconclear.addEventListener("click", e => {e.stopPropagation(); O.selecticon("")});

    for (const b of els.modalactions) b.addEventListener("click", () => O.toggleaction(b.dataset.action));
    for (const b of els.reasonactionbtns) b.addEventListener("click", () => O.togglereasonaction(b.dataset.action));

    els.reasonclose.addEventListener("click", O.closereasonmodal);
    els.reasonmodal.addEventListener("click", e => {if (e.target === els.reasonmodal) O.closereasonmodal()});
    els.reasonedit.addEventListener("click", () => O.setreasonmode("edit"));
    els.reasondelete.addEventListener("click", O.deletenoteduser);
    els.reasonsave.addEventListener("click", O.savereason);

    els.toolgear.addEventListener("click", () => {
      closeoverlay();
      try {tum.settingspane.open()} catch {}
    });
    els.confirmcancel.addEventListener("click", O.closeconfirmsheet);
    els.confirmsheet.addEventListener("click", e => {if (e.target === els.confirmsheet) O.closeconfirmsheet()});
    els.confirmok.addEventListener("click", () => {
      const fn = state.confirmaction;
      O.closeconfirmsheet();
      if (fn) fn();
    });

    els.quickadd.addEventListener("click", () => {if (!state.drag) O.opencreatemodal()});
    els.toolclose.addEventListener("click", () => {if (!state.drag) closeoverlay()});
    els.toolexport.addEventListener("click", O.exportdata);
    els.toolimport.addEventListener("click", O.importdata);
    els.toolfit.addEventListener("click", fitall);
    els.tooljump.addEventListener("click", togglejumplist);
    els.jumpsearch.addEventListener("input", () => buildjumprows(els.jumpsearch.value));
    els.jumpsearch.addEventListener("pointerdown", e => e.stopPropagation());
    els.minimapcanvas.addEventListener("click", onminimapclick);

    function applydestroyoption() {
      const on = (!tum.settings || tum.settings.get("destroyoption")) && destroyeravailable();
      els.actiondestroy.style.display = on ? "" : "none";
      els.actionbtns = [...root.querySelectorAll(".tumactionbtn")].filter(b => getComputedStyle(b).display !== "none");
    }
    applydestroyoption();
    if (tum.settings) tum.settings.onchange(applydestroyoption);

    document.addEventListener("keydown", onkeydown, true);
    document.addEventListener("keydown", onpeekdown, true);
    document.addEventListener("keyup", onpeekup, true);
    window.addEventListener("blur", () => {peekkeys.clear(); updatepeek()});

    tum.folders.subscribe(render);
    tum.unsorted.subscribe(render);
    tum.categories.subscribe(render);
    Promise.all([tum.folders.ready, tum.unsorted.ready, tum.categories.ready]).then(() => {
      render();
      setTimeout(() => {if (!state.open && tum.settings && tum.settings.get("autoopen")) openoverlay()}, 350);
    });

    applytheme();
    updategrid();
    pinhost();
    campos.get().then(v => {if (v && typeof v.x === "number") {pan.x = v.x; pan.y = v.y; applypan()}});
  }

  function applytheme() {
    if (!host) return;
    const p = tum.theme.palette();
    for (const k in p) host.style.setProperty("--tum" + k, p[k]);
  }

  /*//////////////////////////////////////////////////////////////////////*/

  function showbackdrop() {
    applytheme();
    root.classList.add("tumactive");
    refreshmarquees();
  }
  function hidebackdrop() {
    if (state.drag || state.open || state.modalopen || state.reasonopen || state.confirmopen) return;
    root.classList.remove("tumactive");
    O.schedulerestoreall(); 
  }
  function closeoverlay() {
    state.open = false;
    if (O.closectx) O.closectx();
    O.closemodal();
    O.closereasonmodal();
    O.closeconfirmsheet();
    hidebackdrop();
  }

  function openoverlay() {
    state.open = true;
    showbackdrop();
    render();
  }
  function toggleoverlay() {
    if (state.drag) return;
    if (state.open || root.classList.contains("tumactive")) closeoverlay();
    else openoverlay();
  }

  const PEEKSEL = ".tumpagereasonbadge,.tumpageprofilereasonbadge,.tumpagefolderdot," +
    ".tumextrablock,.tumbreachbadge,.tumbasedinitem,.tumbasedin,.tumhd,.tumperday,.tumprofilepostdetails,.tumprofessionaldetail," +
    '[data-testid="usermanagerLink"]';
  function ensurehidestyle() {
    if (document.getElementById("tumhideallstyle")) return;
    const st = document.createElement("style");
    st.id = "tumhideallstyle";
    st.textContent = "html.tumhideall " + PEEKSEL.split(",").join(",html.tumhideall ") + "{display:none!important}";
    document.head.appendChild(st);
  }
  const peekkeys = new Set();
  let peekdelay = 0;
  function updatepeek() {
    ensurehidestyle();
    clearTimeout(peekdelay);
    if (!peekkeys.size) {document.documentElement.classList.remove("tumhideall"); return}
    peekdelay = setTimeout(() => {if (peekkeys.size) document.documentElement.classList.add("tumhideall")}, 100);
  }
  function ispeekkey(e) {return e.key === "Control" || e.key === "PrintScreen"}
  function onpeekdown(e) {if (ispeekkey(e)) {peekkeys.add(e.key); updatepeek()}}
  function onpeekup(e) {if (ispeekkey(e)) {peekkeys.delete(e.key); updatepeek()}}

  /*//////////////////////////////////////////////////////////////////////*/

  function render() {
    if (!els.freeform) return;
    els.freeform.innerHTML = "";
    for (const c of tum.categories.list()) els.freeform.appendChild(buildcategorynode(c));
    for (const f of tum.folders.list()) els.freeform.appendChild(buildfoldernode(f));
    for (const u of tum.unsorted.list()) if (u.placed !== false) els.freeform.appendChild(buildloosechip(u));
    updatequickstate();
    refreshmarquees();
    scheduleminimap();
    if (els.jumplist && !els.jumplist.hidden) buildjumprows(els.jumpsearch.value);
  }

  function enablemarquee(outer) {
    const inner = outer.querySelector(".tummqinner");
    if (!inner) return;
    const dist = inner.scrollWidth - outer.clientWidth;
    if (dist > 2) {
      outer.style.setProperty("--mqshift", -dist + "px");
      outer.style.setProperty("--mqdur", Math.max(4, dist / 25).toFixed(1) + "s");
      outer.classList.add("tummarqueeon");
    } else {
      outer.classList.remove("tummarqueeon");
    }
  }
  function refreshmarquees() {
    if (!els.freeform) return;
    for (const outer of els.freeform.querySelectorAll(".tumfoldername, .tumfolderdesc, .tumfoldermembername, .tumloosechipname")) enablemarquee(outer);
  }

  function isdragged(source, handle) {
    const d = state.drag;
    if (!d || !d.source || !d.user) return false;
    if ((d.user.handle || "").toLowerCase() !== (handle || "").toLowerCase()) return false;
    if (d.source.type !== source.type) return false;
    if (source.type === "folder") return d.source.id === source.id;
    return source.type === "unsorted";
  }

  function updatequickstate() {
    const active = !!(state.drag && state.drag.kind === "user");
    els.quickdelete.classList.toggle("tumdisabled", !active);
    els.quickreason.classList.toggle("tumdisabled", !active);
    for (const b of els.actionbtns) b.classList.toggle("tumdisabled", !active);
  }

  function sortedmembers(f) {
    const members = Array.isArray(f.members) ? f.members.slice() : [];
    if (f.sort === "az") members.sort((a, b) => (a.displayname || a.handle).localeCompare(b.displayname || b.handle));
    else if (f.sort === "za") members.sort((a, b) => (b.displayname || b.handle).localeCompare(a.displayname || a.handle));
    else if (f.sort === "old") members.reverse();
    return members;
  }

  function buildfoldernode(f) {
    const members = sortedmembers(f);
    const node = el("div", "tumfolder");
    if (f.collapsed) node.classList.add("tumcollapsed");
    node.style.setProperty("--tumcolor", f.color);
    const fg = readablefg(f.color);
    node.style.setProperty("--tumheaderfg", fg);
    node.style.setProperty("--tumheaderbtnbg", fg === "#000" ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.25)");
    node.style.left = (f.x || 0) + "px";
    node.style.top = (f.y || 0) + "px";
    node.dataset.id = f.id;
    node.innerHTML = `
      <div class="tumfolderhead">
        <div class="tumfoldertitle">
          <div class="tumfoldericoncol">
            ${f.icon ? `<span class="tumfolderactionicon">${iconhtml(f.icon)}</span>` : ""}
            <span class="tumfoldercount">${splitcount(members.length)}</span>
          </div>
          <div class="tumfoldertitlelines">
            <div class="tumfoldertoprow">
              <span class="tumfoldername"><span class="tummqinner">${escapehtml(f.name)}</span></span>
              ${f.action ? `<span class="tumfolderauto"><span class="tumfolderautoicon">${ICONS[f.action]}</span>${f.action}</span>` : ""}
            </div>
            ${f.description ? `<div class="tumfolderdesc"><span class="tummqinner">${escapehtml(f.description)}</span></div>` : ""}
          </div>
        </div>
        <div class="tumfolderheadbtns">
          <div class="tumfolderremove">${ICONS.close}</div>
        </div>
      </div>
      <div class="tumfoldertools">
        <input class="tumfoldersearch" placeholder="${T("folder.search")}">
        <button class="tumfoldersort" title="Sort: ${SORTLABEL[f.sort] || SORTLABEL.added}">${SORTLABEL[f.sort] || SORTLABEL.added}</button>
      </div>
      <div class="tumfolderlist"></div>
    `;
    const list = node.querySelector(".tumfolderlist");
    if (!members.length) {
      list.appendChild(el("div", "tumfolderempty", T("folder.empty")));
    } else {
      const src = {type: "folder", id: f.id};
      const fill = shown => {
        for (const m of members.slice(shown - MEMBERCAP < 0 ? 0 : shown - MEMBERCAP, shown)) list.appendChild(buildmemberrow(src, m));
        if (members.length > shown) {
          const more = el("div", "tumfoldermore", T("folder.more", members.length - shown));
          more.addEventListener("click", e => {e.stopPropagation(); more.remove(); const next = shown + MEMBERCAP; showncap.set(f.id, next); fill(next)});
          list.appendChild(more);
        }
      };
      const cap = showncap.get(f.id) || MEMBERCAP;
      for (const m of members.slice(0, cap)) list.appendChild(buildmemberrow(src, m));
      if (members.length > cap) {
        const more = el("div", "tumfoldermore", T("folder.more", members.length - cap));
        more.addEventListener("click", e => {e.stopPropagation(); more.remove(); const next = cap + MEMBERCAP; showncap.set(f.id, next); fill(next)});
        list.appendChild(more);
      }
    }
    O.attachfolderdrag(node, f);
    node.querySelector(".tumfolderremove").addEventListener("click", e => {
      e.stopPropagation();
      O.confirmfolderdelete(f);
    });
    node.querySelector(".tumfoldersort").addEventListener("click", e => {
      e.stopPropagation();
      const next = SORTMODES[(SORTMODES.indexOf(f.sort) + 1) % SORTMODES.length];
      tum.folders.update(f.id, {sort: next});
    });
    node.querySelector(".tumfoldersearch").addEventListener("pointerdown", e => e.stopPropagation());
    node.querySelector(".tumfoldersearch").addEventListener("input", e => {
      const q = e.target.value.trim().toLowerCase();
      for (const row of list.querySelectorAll(".tumfoldermember")) {
        const text = row.textContent.toLowerCase();
        row.style.display = !q || text.includes(q) ? "" : "none";
      }
    });
    return node;
  }

  function openprofile(source, m) {
    const go = () => {
      closeoverlay();
      setTimeout(() => {
        try {
          history.pushState({}, "", "/" + encodeURIComponent(m.handle));
          window.dispatchEvent(new PopStateEvent("popstate"));
        } catch {}
      }, 200);
    };
    const folder = source && source.type === "folder" ? tum.folders.get(source.id) : null;
    if (folder && folder.action === "block") {
      O.openconfirm({
        title: "Open @" + m.handle + "?",
        body: "This folder blocks its members, so @" + m.handle + " is likely blocked. Open their profile anyway?",
        oklabel: "Open profile",
        onok: go
      });
    } else go();
  }
  function wireavatar(av, source, m) {
    if (!av) return;
    av.style.cursor = "pointer";
    av.addEventListener("click", e => {e.stopPropagation(); e.preventDefault(); openprofile(source, m)});
  }

  function buildmemberrow(source, m) {
    const row = el("div", "tumfoldermember");
    row.dataset.handle = m.handle;
    if (isdragged(source, m.handle)) row.style.visibility = "hidden";
    row.innerHTML = `
      <img class="tumfoldermemberavatar" src="${m.avatarurl || ""}">
      <div class="tumfoldermembertext">
        <div class="tumfoldermembernamerow">
          <span class="tumcopy tumfoldermembername"><span class="tummqinner">${escapehtml(m.displayname || m.handle)}</span></span>
          ${badgeshtml(m.badges)}
          ${m.reason ? `<span class="tumreasonbadge">${ICONS.pencil}</span>` : ""}
        </div>
        <span class="tumcopy tumfoldermemberhandle">@${escapehtml(m.handle)}</span>
      </div>
      <button class="tumfoldermemberremove">${ICONS.close}</button>
    `;
    wirecopy(row);
    hidebrokenavatar(row);
    wireavatar(row.querySelector(".tumfoldermemberavatar"), source, m);
    if (m.reason) row.querySelector(".tumreasonbadge").addEventListener("click", e => {
      e.stopPropagation();
      O.openreasonview(source, m);
    });
    row.querySelector(".tumfoldermemberremove").addEventListener("click", e => {
      e.stopPropagation();
      tum.folders.removemember(source.id, m.handle);
    });
    O.attachmemberdrag(row, source, m);
    return row;
  }

  function buildloosechip(u) {
    const chip = el("div", "tumloosechip");
    chip.dataset.handle = u.handle;
    if (isdragged({type: "unsorted"}, u.handle)) chip.style.visibility = "hidden";
    chip.style.left = (u.x || 0) + "px";
    chip.style.top = (u.y || 0) + "px";
    chip.style.background = tum.theme.css();
    chip.style.setProperty("--tumfg", tum.theme.fg());
    chip.innerHTML = `
      <img class="tumloosechipavatar" src="${u.avatarurl || ""}">
      <div class="tumloosechipinfo">
        <div class="tumloosechipnamerow">
          <span class="tumcopy tumloosechipname"><span class="tummqinner">${escapehtml(u.displayname || u.handle)}</span></span>
          ${badgeshtml(u.badges)}
          ${u.reason ? `<span class="tumreasonbadge">${ICONS.pencil}</span>` : ""}
        </div>
        <span class="tumcopy tumloosechiphandle">@${escapehtml(u.handle)}</span>
      </div>
      <button class="tumloosechipremove">${ICONS.close}</button>
    `;
    wirecopy(chip);
    hidebrokenavatar(chip);
    wireavatar(chip.querySelector(".tumloosechipavatar"), {type: "unsorted"}, u);
    if (u.reason) chip.querySelector(".tumreasonbadge").addEventListener("click", e => {
      e.stopPropagation();
      O.openreasonview({type: "unsorted"}, u);
    });
    chip.querySelector(".tumloosechipremove").addEventListener("click", e => {
      e.stopPropagation();
      tum.unsorted.remove(u.handle);
    });
    O.attachmemberdrag(chip, {type: "unsorted"}, u);
    return chip;
  }

  function hidebrokenavatar(container) {
    for (const img of container.querySelectorAll(".tumfoldermemberavatar, .tumloosechipavatar")) {
      if (!img.getAttribute("src")) img.src = DEFAULT_AVATAR;
      img.addEventListener("error", () => {if (img.src !== DEFAULT_AVATAR) img.src = DEFAULT_AVATAR}, {once: true});
    }
  }
  function wirecopy(container) {
    for (const t of container.querySelectorAll(".tumcopy")) {
      t.addEventListener("click", e => {
        e.stopPropagation();
        const text = t.textContent || "";
        navigator.clipboard.writeText(text).then(() => toast(T("toast.copied", text))).catch(() => {});
      });
    }
  }

  /*//////////////////////////////////////////////////////////////////////*/

  function toggledcollapse(id) {
    const f = tum.folders.get(id);
    if (!f) return;
    const now = !f.collapsed;
    tum.folders.update(id, {collapsed: now}, true);
    const node = els.freeform.querySelector('.tumfolder[data-id="' + id + '"]');
    if (node) {
      node.classList.toggle("tumcollapsed", now);
      if (!now) resolveoverlap(node);
    }
  }

  /*//////////////////////////////////////////////////////////////////////*/

  function membercatof(node) {
    if (node.classList.contains("tumfolder")) {const f = tum.folders.get(node.dataset.id); return f && f.cat || null}
    if (node.classList.contains("tumloosechip")) {const u = tum.unsorted.get(node.dataset.handle); return u && u.cat || null}
    return null;
  }

  function buildcategorynode(c) {
    const node = el("div", "tumcategory");
    node.dataset.id = c.id;
    node.style.left = (c.x || 0) + "px";
    node.style.top = (c.y || 0) + "px";
    node.style.width = (c.w || 480) + "px";
    node.style.height = (c.h || 360) + "px";
    node.innerHTML =
      `<div class="tumcategorytitle">${escapehtml(c.name || "Edit Me...")}</div>` +
      `<div class="tumcatresize tumcatresizer"></div>` +
      `<div class="tumcatresize tumcatresizeb"></div>` +
      `<div class="tumcatresize tumcatresizebr"></div>`;
    attachcategorydrag(node, c);
    attachcategoryresize(node, c);
    return node;
  }

  function attachcategorydrag(node, c) {
    node.addEventListener("pointerdown", e => {
      if (e.button === 1) {startcamerapan(e); return}
      if (e.button !== 0) return;
      if (e.target.closest(".tumcategorytitle.tumediting")) return;
      if (e.target.closest(".tumfolder, .tumloosechip, .tumcatresize")) return;
      const ontitle = !!e.target.closest(".tumcategorytitle");
      e.preventDefault();
      const startx = e.clientX, starty = e.clientY;
      const ox = c.x || 0, oy = c.y || 0;
      const members = [...els.freeform.querySelectorAll(".tumfolder, .tumloosechip")]
        .filter(n => membercatof(n) === c.id)
        .map(n => ({n, left: parseFloat(n.style.left) || 0, top: parseFloat(n.style.top) || 0}));
      let dragging = false;
      const move = ev => {
        const dx = (ev.clientX - startx) / zoom, dy = (ev.clientY - starty) / zoom;
        if (!dragging) {if (Math.hypot(ev.clientX - startx, ev.clientY - starty) < 6) return; dragging = true; root.classList.add("tumfolderdragging")}
        node.style.left = (ox + dx) + "px";
        node.style.top = (oy + dy) + "px";
        for (const m of members) {m.n.style.left = (m.left + dx) + "px"; m.n.style.top = (m.top + dy) + "px"}
      };
      const up = ev => {
        document.removeEventListener("pointermove", move);
        document.removeEventListener("pointerup", up);
        root.classList.remove("tumfolderdragging");

        if (!dragging) {if (ontitle) startcategoryrename(node, c); return}
        const dx = (ev.clientX - startx) / zoom, dy = (ev.clientY - starty) / zoom;

        tum.categories.update(c.id, {x: ox + dx, y: oy + dy}, true);
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
    });
  }

  function attachcategoryresize(node, c) {
    for (const handle of node.querySelectorAll(".tumcatresize")) {
      const right = handle.classList.contains("tumcatresizer") || handle.classList.contains("tumcatresizebr");
      const bottom = handle.classList.contains("tumcatresizeb") || handle.classList.contains("tumcatresizebr");
      handle.addEventListener("pointerdown", e => {
        if (e.button !== 0) return;
        
        e.preventDefault();
        e.stopPropagation();

        const startx = e.clientX, starty = e.clientY;
        const ow = c.w || 480, oh = c.h || 360;
        let sizing = false;

        const GRIDGAP = 14, SNAP = 26;
        const snapdim = (v, folder) => {
          const cell = folder + GRIDGAP, base = 2 * CATBORDER - GRIDGAP;
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
          node.style.width = w + "px";
          node.style.height = h + "px";
          return {w, h};
        };
        const move = ev => {sizing = true; sizeit(ev)};
        const up = ev => {
          document.removeEventListener("pointermove", move);
          document.removeEventListener("pointerup", up);
          if (!sizing) return;
          const s = sizeit(ev);
          tum.categories.update(c.id, {w: s.w, h: s.h}, true);
        };
        document.addEventListener("pointermove", move);
        document.addEventListener("pointerup", up);
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
      const name = (title.textContent || "").trim() || "Edit Me...";
      title.textContent = name;
      tum.categories.update(c.id, {name}, true);
    };
    title.addEventListener("blur", finish, {once: true});
    title.addEventListener("keydown", e => {
      e.stopPropagation();
      if (e.key === "Enter") {e.preventDefault(); title.blur()}
      else if (e.key === "Escape") {title.textContent = c.name || "Edit Me..."; title.blur()}
    });
  }

  function categoryhover(lx, ly) {
    if (!els.freeform) return;
    for (const n of els.freeform.querySelectorAll(".tumcategory")) {
      let inside = false;
      if (lx != null) {
        const c = tum.categories.get(n.dataset.id);
        inside = !!c && lx >= c.x && lx <= c.x + c.w && ly >= c.y && ly <= c.y + c.h;
      }
      n.classList.toggle("tumcategoryover", inside);
    }
  }

  const CATOUT = 48;
  const CATBORDER = 2;

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
    const c = tum.categories.create({x, y, w, h});
    state.open = true;
    render();
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
    if (!els.freeform) return {x, y};
    const others = [...els.freeform.querySelectorAll(".tumfolder")].map(rectof);
    const GAP = 14;
    const overlaps = (l, t) => others.some(o => l < o.left + o.w + GAP && l + w + GAP > o.left && t < o.top + o.h + GAP && t + h + GAP > o.top);
    if (!overlaps(x, y)) return {x, y};
    const sx = w + GAP, sy = h + GAP;
    for (let ring = 1; ring < 60; ring++) {
      for (let dx = -ring; dx <= ring; dx++) for (let dy = -ring; dy <= ring; dy++) {
        if (Math.max(Math.abs(dx), Math.abs(dy)) !== ring) continue;
        const nx = Math.round(x + dx * sx), ny = Math.round(y + dy * sy);
        if (!overlaps(nx, ny)) return {x: nx, y: ny};
      }
    }
    return {x, y};
  }
  /*//////////////////////////////////////////////////////////////////////*/

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
    if (node) {node.classList.remove("tumflash"); void node.offsetWidth; node.classList.add("tumflash"); setTimeout(() => node.classList.remove("tumflash"), 1200)}
    togglejumplist(false);
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
    const has = tum.folders.list().length > 0;
    els.minimap.hidden = !has;
    if (!has || !state.open) return;
    const cv = els.minimapcanvas, ctx = cv.getContext("2d"), W = cv.width, H = cv.height;
    ctx.clearRect(0, 0, W, H);

    const nodes = [...els.freeform.querySelectorAll(".tumfolder")];
    if (!nodes.length) return;
    const rects = nodes.map(n => ({r: rectof(n), col: n.style.getPropertyValue("--tumcolor") || "#1d9bf0"}));
    let minx = Infinity, miny = Infinity, maxx = -Infinity, maxy = -Infinity;
    for (const {r} of rects) {minx = Math.min(minx, r.left); miny = Math.min(miny, r.top); maxx = Math.max(maxx, r.left + r.w); maxy = Math.max(maxy, r.top + r.h)}

    const pad = Math.max(maxx - minx, maxy - miny) * 0.05 + 20;
    let s = Math.min(W / (maxx - minx + pad * 2), H / (maxy - miny + pad * 2));
    const vw = window.innerWidth / zoom, vh = window.innerHeight / zoom;
    s = Math.min(s, (W * 0.5) / vw, (H * 0.5) / vh);
    const ccx = (window.innerWidth / 2 - pan.x) / zoom, ccy = (window.innerHeight / 2 - pan.y) / zoom;
    const ox = W / 2 - ccx * s, oy = H / 2 - ccy * s;

    cv._map = {s, ox, oy};
    for (const {r, col} of rects) {
      ctx.fillStyle = col;
      const x = ox + r.left * s, y = oy + r.top * s, w = Math.max(3, r.w * s), h = Math.max(3, r.h * s);
      ctx.beginPath();
      if (ctx.roundRect) ctx.roundRect(x, y, w, h, 1.5); else ctx.rect(x, y, w, h);
      ctx.fill();
    }
  }
  function onminimapclick(e) {
    const map = els.minimapcanvas._map;
    if (!map) return;
    const rect = els.minimapcanvas.getBoundingClientRect();
    centeron((e.clientX - rect.left - map.ox) / map.s, (e.clientY - rect.top - map.oy) / map.s);
  }

  function resolveoverlap(active) {
    if (!active || !els.freeform || !(tum.settings && tum.settings.get("nooverlap"))) return;
    const GAP = 0;
    const all = [...els.freeform.querySelectorAll(".tumfolder, .tumloosechip")];
    const queue = [active];
    const movedset = new Set();
    let guard = 0;
    while (queue.length && guard++ < 400) {
      const a = queue.shift();
      const ar = rectof(a);
      for (const b of all) {
        if (b === a) continue;
        const br = rectof(b);
        const ox = Math.min(ar.left + ar.w, br.left + br.w) - Math.max(ar.left, br.left);
        const oy = Math.min(ar.top + ar.h, br.top + br.h) - Math.max(ar.top, br.top);
        if (ox <= 0 || oy <= 0) continue;
        let nl = br.left, nt = br.top;
        if (ox < oy) nl += (br.left + br.w / 2 >= ar.left + ar.w / 2 ? 1 : -1) * (ox + GAP);
        else nt += (br.top + br.h / 2 >= ar.top + ar.h / 2 ? 1 : -1) * (oy + GAP);
        setrect(b, nl, nt);
        movedset.add(b);
        queue.push(b);
      }
    }
    if (!movedset.size) return;
    const fmoves = [], umoves = [];
    for (const n of movedset) {
      const l = parseFloat(n.style.left) || 0, t = parseFloat(n.style.top) || 0;
      if (n.dataset.id) fmoves.push({id: n.dataset.id, x: l, y: t});
      else if (n.dataset.handle) umoves.push({handle: n.dataset.handle, x: l, y: t});
    }
    if (fmoves.length) tum.folders.bulkmove(fmoves);
    if (umoves.length) tum.unsorted.bulkmove(umoves);
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
    if (root.querySelector(".tumcategorytitle.tumediting") || (shadow.activeElement && shadow.activeElement.isContentEditable)) return;
    if (!state.drag) {
      if (e.key === "Escape") {if (O.ctxopen && O.ctxopen()) {O.closectx(); return} closeoverlay(); return}
      const typing = shadow.activeElement && /^(INPUT|TEXTAREA)$/.test(shadow.activeElement.tagName);
      if (root.classList.contains("tumactive") && SCROLLKEYS.has(e.key) && !typing) e.preventDefault();
      return;
    }
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
    if (!n) return;
    void n.offsetWidth;
    n.classList.add("tumflash");
    setTimeout(() => n.classList.remove("tumflash"), 1200);
  }

  /*//////////////////////////////////////////////////////////////////////*/

  let toasttimer = 0;
  function toast(msg) {
    els.toast.textContent = msg;
    els.toast.classList.add("tumshow");
    clearTimeout(toasttimer);
    toasttimer = setTimeout(() => els.toast.classList.remove("tumshow"), 2600);
  }

  Object.assign(O, {
    state, pan, ICONS, el, escapehtml, linkify, iconhtml,
    render, showbackdrop, hidebackdrop, closeoverlay, toast, openprofile, applypan,
    toggledcollapse, categoryhover, categorydrop, newcategory, renamecategory, resolveoverlap, nooverlapadjust, nooverlapadjustbox, nooverlapadjusthandle, findfreespot,
    zoom: () => zoom, startcamerapan,
    keepopen: () => keepopen
  });

  window.tum.overlay = {
    mount() {build()},
    begindrag: (user, x, y) => O.begindrag(user, x, y, {type: "page"}),
    updatedrag: (x, y) => O.updatedrag(x, y),
    enddrag: (x, y) => O.enddrag(x, y),
    canceldrag: () => O.canceldrag(),
    toast,
    open: () => openoverlay(),
    canvascenter: () => ({x: Math.round((window.innerWidth / 2 - pan.x) / zoom), y: Math.round((window.innerHeight / 2 - pan.y) / zoom)}),
    opencreatemodal: opts => O.opencreatemodal(opts),
    confirm: opts => O.openconfirm(opts),
    openreasonview: (source, m) => O.openreasonview(source, m),
    openandflash,
    foldericonhtml: f => iconhtml(f.icon) || ICONS[f.action] || ICONS.folder
  };
  
})();

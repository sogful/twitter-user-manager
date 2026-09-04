(function () {
  "use strict";

  window.tum = window.tum || {};
  const O = window.tum._ov = {};

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
    gear: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>'
  };

  /*//////////////////////////////////////////////////////////////////////*/

  const TEXTPNG = chrome.runtime.getURL("assets/images/text.png");
  const SORTMODES = ["az", "za", "new", "old"];
  const SORTLABEL = {az: "A-Z", za: "Z-A", new: "NEW", old: "OLD", added: "NEW"};

  const MEMBERCAP = 200; // render cap per folder list
  const THRESHOLD = 6; // px before a pointerdown on the backdrop becomes a pan
  const URLRE = /(https?:\/\/[^\s<]+)/g;

  let shadow = null, root = null, host = null;
  let els = {};

  const settings = tum.storage.create("tum.settings");
  let keepopen = false;
  function applysetting(v) {keepopen = !!(v && v.keepopen)}
  settings.get().then(applysetting);
  settings.subscribe(applysetting);
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
    return Array.isArray(badges) && badges.length ? `<span class="tumbadges">${badges.join("")}</span>` : "";
  }
  function readablefg(hex) {
    const n = parseInt(hex.replace("#", ""), 16);
    const r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
    const yiq = (r * 299 + g * 587 + b * 114) / 1000;
    return yiq >= 150 ? "#000" : "white";
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
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = href;
      link.addEventListener("load", () => res(), {once: true});
      link.addEventListener("error", () => res(), {once: true});
      shadow.appendChild(link);
    });
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
  function applypan() {
    if (els.freeform) els.freeform.style.transform = `translate(${pan.x}px,${pan.y}px)`;
    if (els.gridlayer) els.gridlayer.style.backgroundPosition = `${pan.x}px ${pan.y}px`;
    schedulemarquees();
  }

  function updategrid() {
    if (!els.gridlayer) return;
    const w = window.innerWidth, h = window.innerHeight, line = "rgba(255,255,255,0.1)";
    const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='${w}' height='${h}'><path d='M${w - 0.5} 0V${h}M0 ${h - 0.5}H${w}' fill='none' stroke='${line}' stroke-width='1' stroke-dasharray='7 7'/></svg>`;
    els.gridlayer.style.backgroundImage = `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
  }
  window.addEventListener("resize", updategrid);

  function attachpan() {
    const bd = els.backdrop;
    bd.addEventListener("mousedown", e => {if (e.button === 1) e.preventDefault()});
    bd.addEventListener("pointerdown", e => {
      if (e.button !== 0 && e.button !== 1) return;
      // preventDefault + pointer capture so a touchscreen / pen doesn't hand the
      // gesture to native scrolling (which fires pointercancel and the pan never
      // starts, even though the move cursor shows)
      e.preventDefault();
      try {bd.setPointerCapture(e.pointerId)} catch {}
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
        if (!panning && e.button === 0 && ev.type === "pointerup") closeoverlay();
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
  }
  const SCROLLKEYS = new Set([" ", "PageUp", "PageDown", "Home", "End", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"]);

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
      modalname: root.querySelector(".tummodalname"),
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
    els.modalclose.addEventListener("click", O.closemodal);
    els.modalsave.addEventListener("click", O.savemodal);
    els.modaliconbtn.addEventListener("click", e => {e.stopPropagation(); tum.iconpicker.open(els.modaliconbtn, id => O.selecticon(id))});
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

    function applydestroyoption() {
      const on = !tum.settings || tum.settings.get("destroyoption");
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
    Promise.all([tum.folders.ready, tum.unsorted.ready]).then(render);

    applytheme();
    updategrid();
    pinhost();
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
    ".tumextrablock,.tumbreachbadge,.tumbreachbackdrop,.tumbasedinitem,.tumbasedin,.tumhd,.tumperday," +
    '[data-testid="usermanagerLink"]';
  function ensurehidestyle() {
    if (document.getElementById("tumhideallstyle")) return;
    const st = document.createElement("style");
    st.id = "tumhideallstyle";
    st.textContent = "html.tumhideall " + PEEKSEL.split(",").join(",html.tumhideall ") + "{display:none!important}";
    document.head.appendChild(st);
  }
  const peekkeys = new Set();
  function updatepeek() {
    ensurehidestyle();
    document.documentElement.classList.toggle("tumhideall", peekkeys.size > 0);
  }
  function ispeekkey(e) {return e.key === "Control" || e.key === "PrintScreen"}
  function onpeekdown(e) {if (ispeekkey(e)) {peekkeys.add(e.key); updatepeek()}}
  function onpeekup(e) {if (ispeekkey(e)) {peekkeys.delete(e.key); updatepeek()}}

  /*//////////////////////////////////////////////////////////////////////*/

  function render() {
    if (!els.freeform) return;
    els.freeform.innerHTML = "";
    for (const f of tum.folders.list()) els.freeform.appendChild(buildfoldernode(f));
    for (const u of tum.unsorted.list()) if (u.placed !== false) els.freeform.appendChild(buildloosechip(u));
    updatequickstate();
    refreshmarquees();
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
    const vw = window.innerWidth, vh = window.innerHeight;
    for (const outer of els.freeform.querySelectorAll(".tumfoldername, .tumfoldermembername, .tumloosechipname")) {
      const r = outer.getBoundingClientRect();
      let visible = r.width > 0 && r.bottom > 0 && r.top < vh && r.right > 0 && r.left < vw;
      if (visible) {
        const list = outer.closest(".tumfolderlist");
        if (list) {const lr = list.getBoundingClientRect(); visible = r.bottom > lr.top + 1 && r.top < lr.bottom - 1}
      }
      if (visible) enablemarquee(outer);
      else outer.classList.remove("tummarqueeon");
    }
  }
  let mqraf = 0;
  function schedulemarquees() {if (!mqraf) mqraf = setTimeout(() => {mqraf = 0; refreshmarquees()}, 80)}

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
    else if (f.sort === "old") members.reverse(); // members are unshifted on add, so index 0 is newest
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
    node.style.left = f.x + "%";
    node.style.top = f.y + "%";
    node.dataset.id = f.id;
    node.innerHTML = `
      <div class="tumfolderhead">
        <div class="tumfoldertitle">
          <div class="tumfoldericoncol">
            <span class="tumfolderactionicon">${iconhtml(f.icon) || ICONS[f.action] || ICONS.folder}</span>
            <span class="tumfoldercount">${members.length}</span>
          </div>
          <div class="tumfoldertitlelines">
            <span class="tumfoldername"><span class="tummqinner">${escapehtml(f.name)}</span></span>
            ${f.action ? `<span class="tumfolderauto"><span class="tumfolderautoicon">${ICONS[f.action]}</span>${f.action}</span>` : ""}
          </div>
        </div>
        <div class="tumfolderheadbtns">
          <div class="tumfolderexport" title="Export this folder"><svg viewBox="0 0 24 24"><path d="M12 3v11"/><path d="M8 10l4 4 4-4"/><path d="M5 20h14"/></svg></div>
          <div class="tumfoldercollapse">${ICONS.chevron}</div>
          <div class="tumfolderremove">${ICONS.close}</div>
        </div>
      </div>
      <div class="tumfoldertools">
        <input class="tumfoldersearch" placeholder="Search">
        <button class="tumfoldersort" title="Sort: ${SORTLABEL[f.sort] || SORTLABEL.added}">${SORTLABEL[f.sort] || SORTLABEL.added}</button>
      </div>
      <div class="tumfolderlist"></div>
    `;
    const list = node.querySelector(".tumfolderlist");
    list.addEventListener("scroll", schedulemarquees);
    if (!members.length) {
      list.appendChild(el("div", "tumfolderempty", "drop users here"));
    } else {
      for (const m of members.slice(0, MEMBERCAP)) list.appendChild(buildmemberrow({type: "folder", id: f.id}, m));
      if (members.length > MEMBERCAP) list.appendChild(el("div", "tumfoldermore", `+${members.length - MEMBERCAP} more`));
    }
    O.attachfolderdrag(node, f);
    node.querySelector(".tumfolderremove").addEventListener("click", e => {
      e.stopPropagation();
      O.confirmfolderdelete(f);
    });
    node.querySelector(".tumfolderexport").addEventListener("click", e => {
      e.stopPropagation();
      O.exportfolder(f);
    });
    node.querySelector(".tumfoldercollapse").addEventListener("click", e => {
      e.stopPropagation();
      tum.folders.update(f.id, {collapsed: !f.collapsed});
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
    const url = "https://x.com/" + encodeURIComponent(m.handle);
    const go = () => {try {window.open(url, "_blank", "noopener")} catch {}};
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
    chip.style.left = u.x + "%";
    chip.style.top = u.y + "%";
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
    for (const img of container.querySelectorAll("img")) img.addEventListener("error", () => {img.style.visibility = "hidden"}, {once: true});
  }
  function wirecopy(container) {
    for (const t of container.querySelectorAll(".tumcopy")) {
      t.addEventListener("click", e => {
        e.stopPropagation();
        const text = t.textContent || "";
        navigator.clipboard.writeText(text).then(() => toast("Copied " + text)).catch(() => {});
      });
    }
  }

  /*//////////////////////////////////////////////////////////////////////*/

  function onkeydown(e) {
    if ((e.ctrlKey || e.metaKey) && e.code === "Backquote") {toggleoverlay(); e.preventDefault(); e.stopPropagation(); return}
    if (!state.drag) {
      if (e.key === "Escape") {closeoverlay(); return}
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
    toasttimer = setTimeout(() => els.toast.classList.remove("tumshow"), 1800);
  }

  Object.assign(O, {
    state, pan, ICONS, el, escapehtml, linkify, iconhtml,
    render, showbackdrop, hidebackdrop, closeoverlay, toast,
    keepopen: () => keepopen
  });

  window.tum.overlay = {
    mount() {build()},
    begindrag: (user, x, y) => O.begindrag(user, x, y, {type: "page"}),
    updatedrag: (x, y) => O.updatedrag(x, y),
    enddrag: (x, y) => O.enddrag(x, y),
    canceldrag: () => O.canceldrag(),
    toast,
    openreasonview: (source, m) => O.openreasonview(source, m),
    openandflash,
    foldericonhtml: f => iconhtml(f.icon) || ICONS[f.action] || ICONS.folder
  };
})();

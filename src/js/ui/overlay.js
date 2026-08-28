(function () {
  "use strict";

  window.tum = window.tum || {};

  const ICONS = {
    follow: '<svg viewBox="0 0 24 24"><circle cx="9" cy="8" r="4"/><path d="M2 21c0-4 3-7 7-7s7 3 7 7"/><line x1="18" y1="8" x2="18" y2="14"/><line x1="15" y1="11" x2="21" y2="11"/></svg>',
    mute: '<svg viewBox="0 0 24 24"><path d="M12 3a5 5 0 0 0-5 5v3.5c0 .9-.4 1.8-1 2.5l-1 1.2c-.5.6 0 1.5.8 1.5h13.4c.8 0 1.3-.9.8-1.5l-1-1.2c-.6-.7-1-1.6-1-2.5V8a5 5 0 0 0-5-5z"/><path d="M9.5 20a2.5 2.5 0 0 0 5 0"/><line x1="3" y1="3" x2="21" y2="21"/></svg>',
    block: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><line x1="5.5" y1="5.5" x2="18.5" y2="18.5"/></svg>',
    plus: '<svg viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>',
    close: '<svg viewBox="0 0 24 24"><line x1="5" y1="5" x2="19" y2="19"/><line x1="19" y1="5" x2="5" y2="19"/></svg>',
    trash: '<svg viewBox="0 0 24 24"><path d="M4 7h16"/><path d="M9 7V4h6v3"/><path d="M6 7l1 13h10l1-13"/></svg>',
    pencil: '<svg viewBox="0 0 24 24"><path d="M4 20l1-4L16 5l3 3L8 19l-4 1z"/><path d="M14 7l3 3"/></svg>',
    chevron: '<svg viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg>',
    sort: '<svg viewBox="0 0 24 24"><path d="M7 4v16M4 7l3-3 3 3"/><path d="M17 20V4M14 17l3 3 3-3"/></svg>',
    folder: '<svg viewBox="0 0 24 24"><path d="M3 6a1 1 0 0 1 1-1h5l2 2h9a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z"/></svg>'
  };
  const SORTMODES = ["added", "az", "za"];
  const SORTLABEL = {added: "newest first", az: "A - Z", za: "Z - A"};

  const MEMBERCAP = 200; // render cap per folder list - a "+n more" note instead of true virtualization
  const URLRE = /(https?:\/\/[^\s<]+)/g;

  let shadow = null, root = null, host = null;
  let els = {};
  // state.drag describes whatever is currently being carried around: {kind:"user"|"folder",
  // user, source: {type:"page"} | {type:"folder", id} | {type:"unsorted"}, folderid}
  let state = {drag: null, open: false, modalopen: false, reasonopen: false, confirmopen: false, editing: null, pendingcreate: null, reasontarget: null, reasonmode: "edit", confirmtarget: null};

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
  // verified/automated/etc badges lifted off the page - stored as html strings so they persist,
  // rendered inline right after the name the same way the drag chip shows them
  function badgeshtml(badges) {
    return Array.isArray(badges) && badges.length ? `<span class="tumbadges">${badges.join("")}</span>` : "";
  }
  // a folder's header text/icon sit directly on its color with nothing behind them - most of
  // the palette is dark enough for white to read fine, but a bright one (yellow) needs black
  // instead, same call twitter itself makes for text against its own bright accent colors
  function readablefg(hex) {
    const n = parseInt(hex.replace("#", ""), 16);
    const r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
    const yiq = (r * 299 + g * 587 + b * 114) / 1000;
    return yiq >= 150 ? "#000" : "#fff";
  }

  /*//////////////////////////////////////////////////////////////////////*/

  function loadcss() {
    return new Promise(res => {
      // always a <link>, never fetch+inline: a relative url() (the font files) only resolves
      // against the stylesheet's own href when the browser loads it as a real stylesheet resource.
      // the fallback path is relative to whatever page loaded this script (preview.html, at
      // src/html/) - the chrome.runtime.getURL path is root-relative within the extension and
      // doesn't care where it was injected from
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
    // x.com is an SPA - if something on the page ever evicts our host from the DOM (a full
    // re-render on some route, an aggressive third-party script, etc) this lets main.js
    // detect it and call mount() again to rebuild, instead of the overlay silently staying gone
    if (document.getElementById("tum-host")) return;
    // no inline "all:initial" here on purpose - an inline style beats a non-!important
    // stylesheet rule, which would permanently block the shadow stylesheet's own
    // :host{position:fixed} from ever taking effect once it loads (this was the actual
    // cause of the overlay never truly being viewport-fixed - it was stuck in normal
    // document flow the whole time). the :host rule resets everything else once css loads.
    host = document.createElement("div");
    host.id = "tum-host";
    document.documentElement.appendChild(host);
    shadow = host.attachShadow({mode: "open"});
    loadcss().then(buildmarkup);
  }

  // some ancestor between the host and the viewport can occasionally break position:fixed's
  // containing block (a transform/filter/contain on <html> is the usual culprit) - rather than
  // chase that down blindly, just measure where the host actually rendered and paint-shift it
  // back to (0,0) with a transform, and keep its box explicitly sized to the real viewport
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
  // a resize can push an already-placed folder or loose person off the newly smaller screen -
  // no data changed, so just re-run the same visual nudge-back-on-screen pass, not a full render
  window.addEventListener("resize", () => {if (els.freeform) for (const n of els.freeform.children) clampvisible(n)});

  function buildmarkup() {
    root = el("div", "tumroot");
    root.innerHTML = `
      <div class="tumbackdrop"></div>
      <div class="tumcanvas">
        <div class="tumfreeform"></div>
        <div class="tumquickrow">
          <div class="tumquick tumquickadd"><div class="tumquickicon">${ICONS.plus}</div><span>new folder</span></div>
          <div class="tumquick tumquickdiscard"><div class="tumquickicon">${ICONS.trash}</div><span>discard</span></div>
          <div class="tumquick tumquickreason"><div class="tumquickicon">${ICONS.pencil}</div><span>custom reason</span></div>
        </div>
      </div>
      <div class="tumchip">
        <img class="tumchipavatar">
        <div class="tumchipinfo">
          <div class="tumchipnamerow"><span class="tumchipname"></span><span class="tumchipbadges"></span></div>
          <span class="tumchiphandle"></span>
        </div>
        <button class="tumchipremove">${ICONS.close}</button>
      </div>
      <div class="tummodal">
        <div class="tummodalcard">
          <div class="tummodalhead">
            <button class="tummodaliconbtn" title="click to pick an icon">${ICONS.folder}</button>
            <input class="tummodalname" maxlength="40" placeholder="folder name">
            <button class="tummodalclose">${ICONS.close}</button>
          </div>
          <div class="tummodalactions">
            <button data-action="follow" class="tummodalaction">${ICONS.follow}<span>follow</span></button>
            <button data-action="mute" class="tummodalaction">${ICONS.mute}<span>mute</span></button>
            <button data-action="block" class="tummodalaction">${ICONS.block}<span>block</span></button>
          </div>
          <div class="tummodalcolors"></div>
          <button class="tummodalsave">create</button>
        </div>
      </div>
      <div class="tumreasonmodal">
        <div class="tumreasoncard">
          <div class="tumreasonhead">
            <span class="tumreasontitle"></span>
            <button class="tumreasonclose">${ICONS.close}</button>
          </div>
          <div class="tumreasonview">
            <div class="tumreasontext"></div>
            <a class="tumreasonsource" target="_blank" rel="noopener">view attached post</a>
            <button class="tumreasonedit">edit</button>
          </div>
          <div class="tumreasonform">
            <div class="tumreasonactions">
              <button data-action="follow" class="tummodalaction">${ICONS.follow}<span>follow</span></button>
              <button data-action="mute" class="tummodalaction">${ICONS.mute}<span>mute</span></button>
              <button data-action="block" class="tummodalaction">${ICONS.block}<span>block</span></button>
            </div>
            <textarea class="tumreasoninput" maxlength="500" placeholder="Add notes here.."></textarea>
            <button class="tumreasonsave">save note</button>
          </div>
        </div>
      </div>
      <div class="tumconfirmsheet">
        <div class="tumconfirmcard">
          <div class="tumconfirmtitle"></div>
          <div class="tumconfirmbody"></div>
          <button class="tumconfirmok">Delete</button>
          <button class="tumconfirmcancel">Cancel</button>
        </div>
      </div>
      <div class="tumtoast"></div>
    `;
    shadow.appendChild(root);

    els = {
      backdrop: root.querySelector(".tumbackdrop"),
      canvas: root.querySelector(".tumcanvas"),
      freeform: root.querySelector(".tumfreeform"),
      quickadd: root.querySelector(".tumquickadd"),
      quickdiscard: root.querySelector(".tumquickdiscard"),
      quickreason: root.querySelector(".tumquickreason"),
      chip: root.querySelector(".tumchip"),
      chipavatar: root.querySelector(".tumchipavatar"),
      chipname: root.querySelector(".tumchipname"),
      chipbadges: root.querySelector(".tumchipbadges"),
      chiphandle: root.querySelector(".tumchiphandle"),
      modal: root.querySelector(".tummodal"),
      modaliconbtn: root.querySelector(".tummodaliconbtn"),
      modalname: root.querySelector(".tummodalname"),
      modalclose: root.querySelector(".tummodalclose"),
      modalactions: root.querySelectorAll(".tummodalaction"),
      modalcolors: root.querySelector(".tummodalcolors"),
      modalsave: root.querySelector(".tummodalsave"),
      reasonmodal: root.querySelector(".tumreasonmodal"),
      reasontitle: root.querySelector(".tumreasontitle"),
      reasonclose: root.querySelector(".tumreasonclose"),
      reasonview: root.querySelector(".tumreasonview"),
      reasontext: root.querySelector(".tumreasontext"),
      reasonsource: root.querySelector(".tumreasonsource"),
      reasonedit: root.querySelector(".tumreasonedit"),
      reasonform: root.querySelector(".tumreasonform"),
      reasonactions: root.querySelector(".tumreasonactions"),
      reasonactionbtns: root.querySelectorAll(".tumreasonactions .tummodalaction"),
      reasoninput: root.querySelector(".tumreasoninput"),
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
      sw.addEventListener("click", () => selectcolor(c));
      els.modalcolors.appendChild(sw);
    }
    tum.iconpicker.mount(root);
    tum.iconpicker.onload(() => {render(); if (state.modalopen) refreshiconbtn()});

    els.backdrop.addEventListener("click", () => closeoverlay());
    els.modalclose.addEventListener("click", closemodal);
    els.modalsave.addEventListener("click", savemodal);
    els.modaliconbtn.addEventListener("click", e => {e.stopPropagation(); tum.iconpicker.open(els.modaliconbtn, id => selecticon(id))});
    for (const b of els.modalactions) b.addEventListener("click", () => selectaction(b.dataset.action === modalaction ? null : b.dataset.action));
    for (const b of els.reasonactionbtns) b.addEventListener("click", () => selectreasonaction(b.dataset.action === reasonaction ? null : b.dataset.action));
    els.reasonclose.addEventListener("click", closereasonmodal);
    els.reasonmodal.addEventListener("click", e => {if (e.target === els.reasonmodal) closereasonmodal()});
    els.reasonedit.addEventListener("click", () => setreasonmode("edit"));
    els.reasonsave.addEventListener("click", savereason);
    els.confirmcancel.addEventListener("click", closeconfirmsheet);
    els.confirmsheet.addEventListener("click", e => {if (e.target === els.confirmsheet) closeconfirmsheet()});
    els.confirmok.addEventListener("click", () => {
      if (state.confirmtarget) tum.folders.remove(state.confirmtarget);
      closeconfirmsheet();
    });

    els.quickadd.addEventListener("click", () => {if (!state.drag) opencreatemodal()});

    document.addEventListener("keydown", e => {
      if (e.key === "Escape" && !state.drag) closeoverlay();
    }, true);

    tum.folders.subscribe(render);
    tum.unsorted.subscribe(render);
    Promise.all([tum.folders.ready, tum.unsorted.ready]).then(render);

    applytheme();
    pinhost();
  }

  // push x.com's current theme palette onto the host as css variables - overlay.css reads these
  // via var(--tum..., <dark fallback>), so the whole overlay (folders, modals, picker, backdrop)
  // recolors to match light/dim/dark instead of being hardcoded dark. re-applied on every open in
  // case the user switched themes while the tab stayed put
  function applytheme() {
    if (!host) return;
    const p = tum.theme.palette();
    for (const k in p) host.style.setProperty("--tum" + k, p[k]);
  }

  /*//////////////////////////////////////////////////////////////////////*/

  // deliberately NOT locking scroll via overflow:hidden on html/body - x.com's timeline is a
  // virtualized list, and toggling overflow on an ancestor makes it think its container just
  // resized, which resets its own scroll position back to the top. the full-viewport backdrop
  // (pointer-events: auto while active) already blocks wheel/touch from reaching the real page
  // underneath on its own, so nothing needs to touch the page's own scroll state at all
  function showbackdrop() {
    applytheme();
    root.classList.add("tumactive");
  }
  function hidebackdrop() {
    if (state.drag || state.open || state.modalopen || state.reasonopen || state.confirmopen) return;
    root.classList.remove("tumactive");
    undimall();
  }
  function closeoverlay() {
    state.open = false;
    closemodal();
    closereasonmodal();
    closeconfirmsheet();
    hidebackdrop();
  }

  /*//////////////////////////////////////////////////////////////////////*/

  function render() {
    if (!els.freeform) return;
    els.freeform.innerHTML = "";
    for (const f of tum.folders.list()) els.freeform.appendChild(buildfoldernode(f));
    for (const u of tum.unsorted.list()) els.freeform.appendChild(buildloosechip(u));
    for (const n of els.freeform.children) clampvisible(n);
    updatequickstate();
  }

  // begindrag() ends by calling render(), which wipes and rebuilds the whole freeform - so the
  // element the drag started on is already destroyed by the time the drag is live. this lets the
  // rebuild hide the freshly-made copy of whoever's being carried, instead of leaving it sitting
  // at its old spot as a ghost beside the drag chip (a stale visibility:hidden on the old node
  // did nothing). enddrag/canceldrag clear state.drag then render again, restoring it
  function isdragged(source, handle) {
    const d = state.drag;
    if (!d || !d.source || !d.user) return false;
    if ((d.user.handle || "").toLowerCase() !== (handle || "").toLowerCase()) return false;
    if (d.source.type !== source.type) return false;
    if (source.type === "folder") return d.source.id === source.id;
    return source.type === "unsorted";
  }

  // a stored position that made sense at one screen size can put a folder or a loose person
  // partway (or fully) off-screen at a smaller one - this is purely a visual nudge back onto
  // screen, not a data change, so they snap back to their real stored spot the moment either
  // the screen is big enough again or the user actually moves them
  function clampvisible(node) {
    const r = node.getBoundingClientRect();
    const dx = r.left < 0 ? -r.left : (r.right > window.innerWidth ? window.innerWidth - r.right : 0);
    const dy = r.top < 0 ? -r.top : (r.bottom > window.innerHeight ? window.innerHeight - r.bottom : 0);
    if (!dx && !dy) return;
    const cs = getComputedStyle(node);
    node.style.left = (parseFloat(cs.left) + dx) + "px";
    node.style.top = (parseFloat(cs.top) + dy) + "px";
  }

  function updatequickstate() {
    // "discard" and "custom reason" need someone actually in hand to apply to - dim them
    // out rather than hide them, so the row stays put and predictable either way
    const active = !!(state.drag && state.drag.kind === "user");
    els.quickdiscard.classList.toggle("tumdisabled", !active);
    els.quickreason.classList.toggle("tumdisabled", !active);
  }

  function sortedmembers(f) {
    const members = Array.isArray(f.members) ? f.members.slice() : [];
    if (f.sort === "az") members.sort((a, b) => (a.displayname || a.handle).localeCompare(b.displayname || b.handle));
    else if (f.sort === "za") members.sort((a, b) => (b.displayname || b.handle).localeCompare(a.displayname || a.handle));
    // "added" (default): already newest-first, addmember unshifts
    return members;
  }

  function buildfoldernode(f) {
    const members = sortedmembers(f);
    const node = el("div", "tumfolder");
    if (f.collapsed) node.classList.add("tumcollapsed");
    node.style.setProperty("--tumcolor", f.color);
    node.style.setProperty("--tumheaderfg", readablefg(f.color));
    node.style.left = f.x + "%";
    node.style.top = f.y + "%";
    node.dataset.id = f.id;
    node.innerHTML = `
      <div class="tumfolderhead">
        <div class="tumfoldertitle">
          <span class="tumfolderactionicon">${iconhtml(f.icon) || ICONS[f.action] || ICONS.folder}</span>
          <span class="tumfoldername">${escapehtml(f.name)}</span>
        </div>
        <div class="tumfolderheadbtns">
          <div class="tumfoldercollapse">${ICONS.chevron}</div>
          <div class="tumfolderremove">${ICONS.close}</div>
        </div>
      </div>
      <div class="tumfoldertools">
        <input class="tumfoldersearch" placeholder="search">
        <button class="tumfoldersort" title="${SORTLABEL[f.sort] || SORTLABEL.added}">${ICONS.sort}</button>
      </div>
      <div class="tumfolderlist"></div>
    `;
    const list = node.querySelector(".tumfolderlist");
    if (!members.length) {
      list.appendChild(el("div", "tumfolderempty", "drop users here"));
    } else {
      for (const m of members.slice(0, MEMBERCAP)) list.appendChild(buildmemberrow({type: "folder", id: f.id}, m));
      if (members.length > MEMBERCAP) list.appendChild(el("div", "tumfoldermore", `+${members.length - MEMBERCAP} more`));
    }
    attachfolderdrag(node, f);
    node.querySelector(".tumfolderremove").addEventListener("click", e => {
      e.stopPropagation();
      confirmfolderdelete(f);
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

  function buildmemberrow(source, m) {
    const row = el("div", "tumfoldermember");
    row.dataset.handle = m.handle;
    if (isdragged(source, m.handle)) row.style.visibility = "hidden";
    row.innerHTML = `
      <img class="tumfoldermemberavatar" src="${m.avatarurl || ""}">
      <div class="tumfoldermembertext">
        <div class="tumfoldermembernamerow">
          <span class="tumcopy tumfoldermembername">${escapehtml(m.displayname || m.handle)}</span>
          ${badgeshtml(m.badges)}
          ${m.reason ? `<span class="tumreasonbadge">${ICONS.pencil}</span>` : ""}
        </div>
        <span class="tumcopy tumfoldermemberhandle">@${escapehtml(m.handle)}</span>
      </div>
      <button class="tumfoldermemberremove">${ICONS.close}</button>
    `;
    wirecopy(row);
    if (m.reason) row.querySelector(".tumreasonbadge").addEventListener("click", e => {
      e.stopPropagation();
      openreasonview(source, m);
    });
    row.querySelector(".tumfoldermemberremove").addEventListener("click", e => {
      e.stopPropagation();
      tum.folders.removemember(source.id, m.handle);
    });
    attachmemberdrag(row, source, m);
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
          <span class="tumcopy tumloosechipname">${escapehtml(u.displayname || u.handle)}</span>
          ${badgeshtml(u.badges)}
          ${u.reason ? `<span class="tumreasonbadge">${ICONS.pencil}</span>` : ""}
        </div>
        <span class="tumcopy tumloosechiphandle">@${escapehtml(u.handle)}</span>
      </div>
      <button class="tumloosechipremove">${ICONS.close}</button>
    `;
    wirecopy(chip);
    if (u.reason) chip.querySelector(".tumreasonbadge").addEventListener("click", e => {
      e.stopPropagation();
      openreasonview({type: "unsorted"}, u);
    });
    chip.querySelector(".tumloosechipremove").addEventListener("click", e => {
      e.stopPropagation();
      tum.unsorted.remove(u.handle);
    });
    attachmemberdrag(chip, {type: "unsorted"}, u);
    return chip;
  }

  function wirecopy(container) {
    for (const t of container.querySelectorAll(".tumcopy")) {
      t.addEventListener("click", e => {
        e.stopPropagation();
        const text = t.textContent || "";
        navigator.clipboard.writeText(text).then(() => toast("copied " + text)).catch(() => {});
      });
    }
  }

  /*//////////////////////////////////////////////////////////////////////*/
  // dragging folders around (freeform reposition) and dragging users out of a folder/the
  // unsorted area (into another folder, back to unsorted, or onto a quick action) both reuse
  // the same click-vs-drag threshold pattern dragdetect.js uses for the page itself

  const THRESHOLD = 6;

  function attachfolderdrag(node, f) {
    const head = node.querySelector(".tumfolderhead");
    let tracking = null;
    head.addEventListener("pointerdown", e => {
      if (e.target.closest(".tumfolderremove, .tumfoldercollapse")) return;
      // folders are positioned by their top-left corner (not centered), so track the exact
      // spot within the folder the user grabbed it - without this, starting a drag from the
      // header snaps the whole folder to re-center itself under the cursor instead of moving
      // smoothly from wherever it was actually grabbed
      const rect = node.getBoundingClientRect();
      tracking = {startx: e.clientX, starty: e.clientY, offsetx: e.clientX - rect.left, offsety: e.clientY - rect.top, dragging: false};
      const move = ev => {
        if (!tracking) return;
        const dx = ev.clientX - tracking.startx, dy = ev.clientY - tracking.starty;
        if (!tracking.dragging) {
          if (Math.hypot(dx, dy) < THRESHOLD) return;
          tracking.dragging = true;
          root.classList.add("tumfolderdragging");
        }
        const px = clamp(ev.clientX - tracking.offsetx, 0, window.innerWidth - node.offsetWidth);
        const py = clamp(ev.clientY - tracking.offsety, 0, window.innerHeight - node.offsetHeight);
        node.style.left = (px / window.innerWidth * 100) + "%";
        node.style.top = (py / window.innerHeight * 100) + "%";
      };
      const up = ev => {
        document.removeEventListener("pointermove", move);
        document.removeEventListener("pointerup", up);
        root.classList.remove("tumfolderdragging");
        if (tracking && tracking.dragging) {
          const px = clamp(ev.clientX - tracking.offsetx, 0, window.innerWidth - node.offsetWidth);
          const py = clamp(ev.clientY - tracking.offsety, 0, window.innerHeight - node.offsetHeight);
          tum.folders.move(f.id, px / window.innerWidth * 100, py / window.innerHeight * 100);
        } else if (tracking) {
          openeditmodal(f);
        }
        tracking = null;
      };
      document.addEventListener("pointermove", move);
      document.addEventListener("pointerup", up);
    });
  }

  function attachmemberdrag(row, source, m) {
    row.addEventListener("pointerdown", e => {
      // the remove/reason buttons stay click-only (no threshold), but everything else -
      // including the copyable name/handle text - can start a drag once it moves enough,
      // same threshold pattern as the click-vs-drag split everywhere else in this file
      if (e.target.closest(".tumfoldermemberremove, .tumloosechipremove, .tumreasonbadge")) return;
      const startx = e.clientX, starty = e.clientY;
      let tracking = true, dragging = false;
      const move = ev => {
        if (!tracking) return;
        if (!dragging) {
          if (Math.hypot(ev.clientX - startx, ev.clientY - starty) < THRESHOLD) return;
          dragging = true;
          const user = {handle: m.handle, displayname: m.displayname, avatarurl: m.avatarurl, sourceurl: m.sourceurl, reason: m.reason, badges: m.badges || []};
          // render() inside begindrag rebuilds the freeform and hides this person's fresh copy
          // itself (via isdragged), so nothing to hide on the old node here
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

  // a live tweet's avatar/name/handle go fully invisible the moment they're actually being
  // carried around (no ghost of them left sitting at the original spot next to the drag chip),
  // then settle into a soft dim once they're let go somewhere - as if that data had really been
  // lifted out. the dim stays for as long as the overlay itself is open, not just for the drag,
  // and only comes back once the whole canvas fades away
  let dimmedtargets = [];
  function hidesource(targets) {
    if (!targets) return;
    for (const t of targets) if (t) t.style.visibility = "hidden";
  }
  function dimsource(targets) {
    if (!targets) return;
    for (const t of targets) if (t) {t.style.visibility = ""; t.style.opacity = "0.25"; dimmedtargets.push(t)}
  }
  function undimtargets(targets) {
    if (!targets) return;
    for (const t of targets) {
      if (!t) continue;
      t.style.visibility = "";
      t.style.opacity = "";
      const i = dimmedtargets.indexOf(t);
      if (i !== -1) dimmedtargets.splice(i, 1);
    }
  }
  function undimall() {
    for (const t of dimmedtargets) if (t) {t.style.visibility = ""; t.style.opacity = ""}
    dimmedtargets = [];
  }

  function begindrag(user, x, y, source) {
    state.drag = {kind: "user", user, source: source || {type: "page"}};
    state.open = false;
    hidesource(user.dimtargets);
    els.chipavatar.src = user.avatarurl || "";
    els.chipavatar.style.display = user.avatarurl ? "" : "none";
    els.chipname.textContent = user.displayname || user.handle;
    els.chiphandle.textContent = "@" + user.handle;
    els.chipbadges.innerHTML = (user.badges || []).join("");
    // no fixed color for the chip - it should look like it was lifted straight off the page,
    // so it just borrows whatever background/text color x.com is actually rendering right now
    els.chip.style.background = tum.theme.css();
    els.chip.style.setProperty("--tumfg", tum.theme.fg());
    root.classList.add("tumdragging");
    showbackdrop();
    movechip(x, y);
    render();
  }

  function movechip(x, y) {
    els.chip.style.left = x + "px";
    els.chip.style.top = y + "px";
  }

  function rectcontains(rect, x, y) {
    return !!rect && x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
  }

  function foldertargetunderpoint(x, y) {
    for (const n of els.freeform.querySelectorAll(".tumfolder")) {
      const badge = n.querySelector(".tumfolderremove");
      if (rectcontains(badge.getBoundingClientRect(), x, y)) return {id: n.dataset.id, zone: "remove"};
      if (rectcontains(n.getBoundingClientRect(), x, y)) return {id: n.dataset.id, zone: "body"};
    }
    return null;
  }

  function quickzone(x, y) {
    if (state.drag && state.drag.kind === "user") {
      if (rectcontains(els.quickdiscard.getBoundingClientRect(), x, y)) return "discard";
      if (rectcontains(els.quickreason.getBoundingClientRect(), x, y)) return "reason";
    }
    if (rectcontains(els.quickadd.getBoundingClientRect(), x, y)) return "add";
    return null;
  }

  function updatedrag(x, y) {
    if (!state.drag) return;
    movechip(x, y);
    const target = foldertargetunderpoint(x, y);
    for (const n of els.freeform.querySelectorAll(".tumfolder")) {
      n.classList.toggle("tumover", !!target && target.zone === "body" && n.dataset.id === target.id);
      n.classList.toggle("tumoverremove", !!target && target.zone === "remove" && n.dataset.id === target.id);
    }
    const zone = quickzone(x, y);
    els.quickadd.classList.toggle("tumover", zone === "add");
    els.quickdiscard.classList.toggle("tumover", zone === "discard");
    els.quickreason.classList.toggle("tumover", zone === "reason");
  }

  function removefromsource(source, handle) {
    if (!source || source.type === "page") return;
    if (source.type === "folder") tum.folders.removemember(source.id, handle);
    else if (source.type === "unsorted") tum.unsorted.remove(handle);
  }

  function enddrag(x, y) {
    if (!state.drag) return;
    const {user, source} = state.drag;
    const target = foldertargetunderpoint(x, y);
    const zone = quickzone(x, y);
    root.classList.remove("tumdragging");
    state.drag = null;
    // whatever happens next, the drag itself is over - swap the real page element from fully
    // hidden (while actively held) to the softer persistent dim, regardless of where they landed
    dimsource(user.dimtargets);
    for (const n of els.freeform.querySelectorAll(".tumfolder")) n.classList.remove("tumover", "tumoverremove");
    els.quickadd.classList.remove("tumover");
    els.quickdiscard.classList.remove("tumover");
    els.quickreason.classList.remove("tumover");

    if (target && target.zone === "remove") {
      const folder = tum.folders.get(target.id);
      if (folder) confirmfolderdelete(folder);
    } else if (target && target.zone === "body") {
      // moving between/into folders doesn't re-trigger follow/mute/block - that only happens
      // once, on the original live drag off a real tweet
      removefromsource(source, user.handle);
      const folder = tum.folders.get(target.id);
      if (folder) {
        tum.folders.addmember(folder.id, user);
        if (source.type === "page") tum.actions.run(folder.action, user);
      }
    } else if (zone === "add") {
      // no render() here on purpose - the source data hasn't changed yet (still pending the
      // modal's save), and a render right now would rebuild their old row/chip from scratch,
      // undoing the hidden state set at drag-start and leaving a duplicate visible behind the
      // modal. closemodal() renders once the modal actually resolves, either way
      state.pendingcreate = {user, source};
      opencreatemodal();
      return;
    } else if (zone === "discard") {
      removefromsource(source, user.handle);
      render();
      closeoverlay();
      return;
    } else if (zone === "reason") {
      state.pendingcreate = {user, source, x, y};
      openreasonedit();
      return;
    } else {
      // not dropped on anything - pin them right where they were let go instead of losing
      // them, whether they started on the page, in a folder, or already loose
      removefromsource(source, user.handle);
      const px = clamp(x / window.innerWidth * 100, 3, 97), py = clamp(y / window.innerHeight * 100, 4, 96);
      tum.unsorted.add(user, px, py);
      state.open = true;
      render();
      return;
    }
    state.open = true;
    hidebackdrop();
    render();
  }

  function canceldrag() {
    if (state.drag) undimtargets(state.drag.user.dimtargets);
    root.classList.remove("tumdragging");
    state.drag = null;
    hidebackdrop();
  }

  /*//////////////////////////////////////////////////////////////////////*/

  let modalcolor = "#1d9bf0", modalaction = null, modalicon = "";

  function selectcolor(c) {
    modalcolor = c;
    for (const sw of els.modalcolors.children) sw.classList.toggle("tumselected", sw.dataset.color === c);
  }
  function selectaction(a) {
    modalaction = a;
    for (const b of els.modalactions) b.classList.toggle("tumselected", b.dataset.action === a);
    refreshiconbtn();
  }
  // a folder icon can be an svg-path id into the icon manifest, an "emoji:<codepoint>" ref
  // (rendered as the twemoji svg from twitter's cdn, matching the picker), or - for legacy
  // folders - a literal emoji char. otherwise fall back to the action icon or a plain default
  function iconhtml(icon) {
    if (!icon) return "";
    if (icon.startsWith("emoji:")) return `<img class="tumiconemoji" src="${tum.iconpicker.emojiurl(icon.slice(6))}">`;
    if (icon.endsWith(".svg")) return tum.iconpicker.svgfor(icon);
    return escapehtml(icon);
  }
  function refreshiconbtn() {
    els.modaliconbtn.innerHTML = iconhtml(modalicon) || ICONS[modalaction] || ICONS.folder;
  }
  function selecticon(id) {
    modalicon = id;
    refreshiconbtn();
  }

  function opencreatemodal() {
    state.editing = null;
    state.modalopen = true;
    modalicon = "";
    els.modalname.value = "";
    els.modalsave.textContent = "create";
    // no action pre-selected - dropping into a folder with none set just files the person,
    // no follow/mute/block runs
    selectaction(null);
    selectcolor(tum.folders.COLORS[tum.folders.list().length % tum.folders.COLORS.length]);
    els.modalactions.forEach(b => b.classList.remove("tumdimmed"));
    showbackdrop();
    els.modal.classList.add("tumshow");
    els.modalname.focus();
  }

  function openeditmodal(f) {
    state.editing = f.id;
    state.modalopen = true;
    modalicon = f.icon || "";
    els.modalname.value = f.name;
    els.modalsave.textContent = "save";
    selectaction(f.action);
    selectcolor(f.color);
    // this folder already exists (maybe with members filed under its current action already)
    // - the action picker still works, just visually backed off so it's not the obvious thing
    // to fiddle with while renaming
    els.modalactions.forEach(b => b.classList.add("tumdimmed"));
    showbackdrop();
    els.modal.classList.add("tumshow");
  }

  function closemodal() {
    els.modal.classList.remove("tumshow");
    tum.iconpicker.close();
    // a pendingcreate drop that never got saved (dragged into "new folder" then dismissed
    // without saving) needs its original row/chip visible again - it was hidden at drag-start
    // and nothing else has re-rendered since, so do it here
    const hadpending = !!state.pendingcreate;
    state.pendingcreate = null;
    state.editing = null;
    state.modalopen = false;
    hidebackdrop();
    if (hadpending) render();
  }

  function savemodal() {
    const name = (els.modalname.value || "").trim() || "unnamed";
    // purely cosmetic - swaps out the action icon shown on the folder header, the action
    // itself (follow/mute/block) still runs exactly the same either way
    const icon = modalicon;
    if (state.editing) {
      tum.folders.update(state.editing, {name, icon, action: modalaction, color: modalcolor});
    } else {
      const folder = tum.folders.create({name, icon, action: modalaction, color: modalcolor});
      if (state.pendingcreate) {
        const {user, source} = state.pendingcreate;
        removefromsource(source, user.handle);
        tum.folders.addmember(folder.id, user);
        if (source.type === "page") tum.actions.run(folder.action, user);
      }
    }
    closemodal();
    state.open = true;
    render();
  }

  /*//////////////////////////////////////////////////////////////////////*/

  let reasonaction = null;

  function selectreasonaction(a) {
    reasonaction = a;
    for (const b of els.reasonactionbtns) b.classList.toggle("tumselected", b.dataset.action === a);
  }

  function setreasonmode(mode) {
    state.reasonmode = mode;
    els.reasonview.classList.toggle("tumshow", mode === "view");
    els.reasonform.classList.toggle("tumshow", mode === "edit");
    // an action picker only makes sense while filing someone fresh off a live drag - editing
    // an existing member's note later shouldn't be able to re-trigger follow/mute/block
    els.reasonactions.style.display = state.pendingcreate ? "" : "none";
    if (mode === "edit") els.reasoninput.focus();
  }

  function openreasonedit() {
    const {user} = state.pendingcreate;
    state.reasonopen = true;
    state.reasontarget = null;
    els.reasontitle.textContent = "note for @" + user.handle;
    els.reasoninput.value = user.reason || "";
    selectreasonaction(null);
    // this is filing someone off the canvas directly, not creating/editing a folder - the
    // action picker here should never read as backed-off the way it does on an existing folder
    els.reasonactionbtns.forEach(b => b.classList.remove("tumdimmed"));
    els.reasonmodal.classList.add("tumshow");
    setreasonmode("edit");
  }

  function openreasonview(source, m) {
    state.reasonopen = true;
    state.reasontarget = {source, handle: m.handle};
    els.reasontitle.textContent = "note for @" + m.handle;
    els.reasontext.innerHTML = linkify(m.reason || "");
    if (m.sourceurl) {els.reasonsource.href = m.sourceurl; els.reasonsource.style.display = ""}
    else els.reasonsource.style.display = "none";
    els.reasoninput.value = m.reason || "";
    els.reasonmodal.classList.add("tumshow");
    setreasonmode("view");
  }

  function closereasonmodal() {
    els.reasonmodal.classList.remove("tumshow");
    // a pendingcreate drop that never got saved (drag into "custom reason" then dismissed
    // without saving) still needs its original spot back - a full render() is the simplest way
    // to make that person visible again, since nothing else re-renders on its own here
    const hadpending = !!state.pendingcreate;
    state.pendingcreate = null;
    state.reasontarget = null;
    state.reasonopen = false;
    undimall();
    if (hadpending) render();
  }

  function savereason() {
    const text = (els.reasoninput.value || "").trim();
    if (state.pendingcreate) {
      const {user, source, x, y} = state.pendingcreate;
      const withreason = Object.assign({}, user, {reason: text});
      removefromsource(source, user.handle);
      const px = clamp((x != null ? x : window.innerWidth / 2) / window.innerWidth * 100, 3, 97);
      const py = clamp((y != null ? y : window.innerHeight / 2) / window.innerHeight * 100, 4, 96);
      tum.unsorted.add(withreason, px, py);
      if (source.type === "page") tum.actions.run(reasonaction, user);
    } else if (state.reasontarget) {
      const {source, handle} = state.reasontarget;
      if (source.type === "folder") tum.folders.setmemberreason(source.id, handle, text);
      else tum.unsorted.setreason(handle, text);
    }
    closereasonmodal();
    state.open = true;
    render();
  }

  /*//////////////////////////////////////////////////////////////////////*/

  function confirmfolderdelete(folder) {
    const members = Array.isArray(folder.members) ? folder.members : [];
    if (members.length <= 1) {tum.folders.remove(folder.id); return}
    state.confirmopen = true;
    state.confirmtarget = folder.id;
    els.confirmtitle.textContent = "Delete " + folder.name + "?";
    els.confirmbody.textContent = `This removes the folder and its ${members.length} members, this cannot be undone. Note that actions done to users will stay active.`;
    showbackdrop();
    els.confirmsheet.classList.add("tumshow");
  }

  function closeconfirmsheet() {
    els.confirmsheet.classList.remove("tumshow");
    state.confirmopen = false;
    state.confirmtarget = null;
    hidebackdrop();
  }

  /*//////////////////////////////////////////////////////////////////////*/

  let toasttimer = 0;
  function toast(msg) {
    els.toast.textContent = msg;
    els.toast.classList.add("tumshow");
    clearTimeout(toasttimer);
    toasttimer = setTimeout(() => els.toast.classList.remove("tumshow"), 1800);
  }

  window.tum.overlay = {
    mount() {build()},
    begindrag: (user, x, y) => begindrag(user, x, y, {type: "page"}),
    updatedrag, enddrag, canceldrag, toast,
    openreasonview
  };
})();

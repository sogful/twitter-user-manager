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
    pencil: '<svg viewBox="0 0 24 24"><path d="M4 20l1-4L16 5l3 3L8 19l-4 1z"/><path d="M14 7l3 3"/></svg>'
  };

  const MEMBERCAP = 200; // render cap per folder list - a "+n more" note instead of true virtualization

  let shadow = null, root = null;
  let els = {};
  // three states the overlay can be in: idle (closed), dragging (a user is being carried),
  // and open-but-not-dragging ("idle-open") - reached by releasing a drag onto empty space
  // instead of a button, which is when rename/delete become reachable via plain clicks
  let state = {dragging: false, open: false, user: null, pendingcreate: null, editing: null};
  let scrollprev = "";

  function el(tag, cls, html) {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html !== undefined) e.innerHTML = html;
    return e;
  }

  function loadcss() {
    return new Promise(res => {
      // always a <link>, never fetch+inline: a relative url() (the font files) only resolves
      // against the stylesheet's own href when the browser loads it as a real stylesheet resource
      let href = "src/css/overlay.css";
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
    // css is loaded before any markup is inserted, so the overlay never flashes
    // unstyled/interactive content while the stylesheet is still in flight
    const host = document.createElement("div");
    host.id = "tum-host";
    host.style.all = "initial";
    document.documentElement.appendChild(host);
    shadow = host.attachShadow({mode: "open"});
    loadcss().then(buildmarkup);
  }

  function buildmarkup() {
    root = el("div", "tumroot");
    root.innerHTML = `
      <div class="tumbackdrop"></div>
      <div class="tumcanvas">
        <div class="tumfolderdock"></div>
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
      </div>
      <div class="tummodal">
        <div class="tummodalcard">
          <div class="tummodalhead">
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
        <div class="tummodalcard">
          <div class="tummodalhead">
            <input class="tumreasoninput" maxlength="140" placeholder="why? (just for you, nothing is sent)">
            <button class="tumreasonclose">${ICONS.close}</button>
          </div>
          <button class="tumreasonsave">save note</button>
        </div>
      </div>
      <div class="tumtoast"></div>
    `;
    shadow.appendChild(root);

    els = {
      backdrop: root.querySelector(".tumbackdrop"),
      canvas: root.querySelector(".tumcanvas"),
      dock: root.querySelector(".tumfolderdock"),
      quickadd: root.querySelector(".tumquickadd"),
      quickdiscard: root.querySelector(".tumquickdiscard"),
      quickreason: root.querySelector(".tumquickreason"),
      chip: root.querySelector(".tumchip"),
      chipavatar: root.querySelector(".tumchipavatar"),
      chipname: root.querySelector(".tumchipname"),
      chipbadges: root.querySelector(".tumchipbadges"),
      chiphandle: root.querySelector(".tumchiphandle"),
      modal: root.querySelector(".tummodal"),
      modalname: root.querySelector(".tummodalname"),
      modalclose: root.querySelector(".tummodalclose"),
      modalactions: root.querySelectorAll(".tummodalaction"),
      modalcolors: root.querySelector(".tummodalcolors"),
      modalsave: root.querySelector(".tummodalsave"),
      reasonmodal: root.querySelector(".tumreasonmodal"),
      reasoninput: root.querySelector(".tumreasoninput"),
      reasonclose: root.querySelector(".tumreasonclose"),
      reasonsave: root.querySelector(".tumreasonsave"),
      toast: root.querySelector(".tumtoast")
    };

    for (const c of tum.folders.COLORS) {
      const sw = el("button", "tummodalcolor");
      sw.style.backgroundColor = c;
      sw.dataset.color = c;
      sw.addEventListener("click", () => selectcolor(c));
      els.modalcolors.appendChild(sw);
    }

    els.backdrop.addEventListener("click", () => closeoverlay());
    els.modalclose.addEventListener("click", closemodal);
    els.modalsave.addEventListener("click", savemodal);
    for (const b of els.modalactions) b.addEventListener("click", () => selectaction(b.dataset.action));
    els.reasonclose.addEventListener("click", closereasonmodal);
    els.reasonsave.addEventListener("click", savereason);

    tum.folders.subscribe(renderfolders);
    tum.folders.ready.then(renderfolders);
  }

  /*//////////////////////////////////////////////////////////////////////*/

  function showbackdrop() {
    if (!root.classList.contains("tumactive")) {
      scrollprev = document.documentElement.style.overflow;
      document.documentElement.style.overflow = "hidden";
    }
    root.classList.add("tumactive");
  }
  function hidebackdrop() {
    if (state.dragging || state.open || state.modalopen || state.reasonopen) return;
    root.classList.remove("tumactive");
    document.documentElement.style.overflow = scrollprev || "";
  }
  function closeoverlay() {
    state.open = false;
    closemodal();
    closereasonmodal();
    hidebackdrop();
  }

  function renderfolders() {
    if (!els.dock) return;
    const folders = tum.folders.list();
    els.dock.innerHTML = "";
    for (const f of folders) els.dock.appendChild(buildfoldernode(f));
  }

  function buildfoldernode(f) {
    const members = Array.isArray(f.members) ? f.members : [];
    const node = el("div", "tumfolder");
    node.style.setProperty("--tumcolor", f.color);
    node.dataset.id = f.id;
    node.innerHTML = `
      <div class="tumfolderhead">
        <div class="tumfoldertitle">
          <span class="tumfolderactionicon">${ICONS[f.action] || ICONS.follow}</span>
          <span class="tumfoldername">${escapehtml(f.name)}</span>
        </div>
        <div class="tumfolderremove">${ICONS.close}</div>
      </div>
      <div class="tumfolderlist"></div>
    `;
    const list = node.querySelector(".tumfolderlist");
    if (!members.length) {
      list.appendChild(el("div", "tumfolderempty", "drop users here"));
    } else {
      for (const m of members.slice(0, MEMBERCAP)) list.appendChild(buildmemberrow(f.id, m));
      if (members.length > MEMBERCAP) list.appendChild(el("div", "tumfoldermore", `+${members.length - MEMBERCAP} more`));
    }
    node.querySelector(".tumfolderhead").addEventListener("click", e => {
      if (state.dragging) return;
      if (e.target.closest(".tumfolderremove")) return;
      openeditmodal(f);
    });
    return node;
  }

  function buildmemberrow(folderid, m) {
    const row = el("div", "tumfoldermember");
    row.innerHTML = `
      <img class="tumfoldermemberavatar" src="${m.avatarurl || ""}">
      <div class="tumfoldermembertext">
        <span class="tumfoldermembername">${escapehtml(m.displayname || m.handle)}</span>
        <span class="tumfoldermemberhandle">@${escapehtml(m.handle)}</span>
      </div>
      <button class="tumfoldermemberremove">${ICONS.close}</button>
    `;
    row.querySelector(".tumfoldermemberremove").addEventListener("click", e => {
      e.stopPropagation();
      tum.folders.removemember(folderid, m.handle);
    });
    return row;
  }

  function escapehtml(s) {
    const d = document.createElement("div");
    d.textContent = s;
    return d.innerHTML;
  }

  /*//////////////////////////////////////////////////////////////////////*/

  function begindrag(user, x, y) {
    state.dragging = true;
    state.open = false;
    state.user = user;
    els.chipavatar.src = user.avatarurl || "";
    els.chipavatar.style.display = user.avatarurl ? "" : "none";
    els.chipname.textContent = user.displayname || user.handle;
    els.chiphandle.textContent = "@" + user.handle;
    els.chipbadges.innerHTML = "";
    for (const b of (user.badges || [])) els.chipbadges.appendChild(b);
    // no fixed color for the chip - it should look like it was lifted straight off the page,
    // so it just borrows whatever background/text color x.com is actually rendering right now
    els.chip.style.background = tum.theme.css();
    els.chip.style.setProperty("--tumfg", tum.theme.fg());
    root.classList.add("tumdragging");
    showbackdrop();
    movechip(x, y);
    renderfolders();
  }

  function movechip(x, y) {
    els.chip.style.left = x + "px";
    els.chip.style.top = y + "px";
  }

  function rectcontains(rect, x, y) {
    return !!rect && x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
  }

  // a folder node has two drop zones: the small "remove" badge in its header, and the rest of
  // the node (its body, which runs the folder's action and files the user into its list)
  function foldertargetunderpoint(x, y) {
    for (const n of els.dock.querySelectorAll(".tumfolder")) {
      const badge = n.querySelector(".tumfolderremove");
      if (rectcontains(badge.getBoundingClientRect(), x, y)) return {id: n.dataset.id, zone: "remove"};
      if (rectcontains(n.getBoundingClientRect(), x, y)) return {id: n.dataset.id, zone: "body"};
    }
    return null;
  }

  function quickzone(x, y) {
    if (rectcontains(els.quickadd.getBoundingClientRect(), x, y)) return "add";
    if (rectcontains(els.quickdiscard.getBoundingClientRect(), x, y)) return "discard";
    if (rectcontains(els.quickreason.getBoundingClientRect(), x, y)) return "reason";
    return null;
  }

  function updatedrag(x, y) {
    if (!state.dragging) return;
    movechip(x, y);
    const target = foldertargetunderpoint(x, y);
    for (const n of els.dock.querySelectorAll(".tumfolder")) {
      n.classList.toggle("tumover", !!target && target.zone === "body" && n.dataset.id === target.id);
      n.classList.toggle("tumoverremove", !!target && target.zone === "remove" && n.dataset.id === target.id);
    }
    const zone = quickzone(x, y);
    els.quickadd.classList.toggle("tumover", zone === "add");
    els.quickdiscard.classList.toggle("tumover", zone === "discard");
    els.quickreason.classList.toggle("tumover", zone === "reason");
  }

  function enddrag(x, y) {
    if (!state.dragging) return;
    const user = state.user;
    const target = foldertargetunderpoint(x, y);
    const zone = quickzone(x, y);
    root.classList.remove("tumdragging");
    state.dragging = false;
    for (const n of els.dock.querySelectorAll(".tumfolder")) n.classList.remove("tumover", "tumoverremove");
    els.quickadd.classList.remove("tumover");
    els.quickdiscard.classList.remove("tumover");
    els.quickreason.classList.remove("tumover");

    if (target && target.zone === "remove") {
      const folder = tum.folders.get(target.id);
      if (folder) {tum.folders.remove(target.id); toast("removed " + folder.name)}
    } else if (target && target.zone === "body") {
      const folder = tum.folders.get(target.id);
      if (folder) {
        tum.folders.addmember(folder.id, user);
        toast("dropped @" + user.handle + " on " + folder.name);
        tum.actions.run(folder.action, user);
      }
    } else if (zone === "add") {
      state.pendingcreate = user;
      state.user = null;
      renderfolders();
      opencreatemodal();
      return;
    } else if (zone === "discard") {
      toast("discarded @" + user.handle);
      state.user = null;
      closeoverlay();
      renderfolders();
      return;
    } else if (zone === "reason") {
      state.pendingcreate = user;
      state.user = null;
      renderfolders();
      openreasonmodal();
      return;
    } else {
      // dropped on empty space, not on any button - keep the overlay open instead of
      // closing it, and unlock rename/delete on the folders (reachable only from here)
      state.user = null;
      state.open = true;
      renderfolders();
      return;
    }
    state.user = null;
    hidebackdrop();
    renderfolders();
  }

  function canceldrag() {
    root.classList.remove("tumdragging");
    state.dragging = false;
    state.user = null;
    hidebackdrop();
  }

  /*//////////////////////////////////////////////////////////////////////*/

  let modalcolor = "#1d9bf0", modalaction = "follow";

  function selectcolor(c) {
    modalcolor = c;
    for (const sw of els.modalcolors.children) sw.classList.toggle("tumselected", sw.dataset.color === c);
  }
  function selectaction(a) {
    modalaction = a;
    for (const b of els.modalactions) b.classList.toggle("tumselected", b.dataset.action === a);
  }

  function opencreatemodal() {
    state.editing = null;
    state.modalopen = true;
    els.modalname.value = "";
    els.modalsave.textContent = "create";
    selectaction("follow");
    selectcolor(tum.folders.COLORS[tum.folders.list().length % tum.folders.COLORS.length]);
    showbackdrop();
    els.modal.classList.add("tumshow");
    els.modalname.focus();
  }

  function openeditmodal(f) {
    state.editing = f.id;
    state.modalopen = true;
    els.modalname.value = f.name;
    els.modalsave.textContent = "save";
    selectaction(f.action);
    selectcolor(f.color);
    showbackdrop();
    els.modal.classList.add("tumshow");
  }

  function closemodal() {
    els.modal.classList.remove("tumshow");
    state.pendingcreate = null;
    state.editing = null;
    state.modalopen = false;
    hidebackdrop();
  }

  function savemodal() {
    const name = (els.modalname.value || "").trim() || "unnamed";
    if (state.editing) {
      tum.folders.update(state.editing, {name, action: modalaction, color: modalcolor});
    } else {
      const folder = tum.folders.create({name, action: modalaction, color: modalcolor});
      if (state.pendingcreate) {
        tum.folders.addmember(folder.id, state.pendingcreate);
        toast("dropped @" + state.pendingcreate.handle + " on " + folder.name);
        tum.actions.run(folder.action, state.pendingcreate);
      }
    }
    closemodal();
  }

  /*//////////////////////////////////////////////////////////////////////*/
  // TODO: this is currently just a local note (toast + console) - no destination for it is
  // defined yet. wire it up once it's clearer what a "custom reason" should actually do
  // (report flow? a persisted log? attach it to a folder drop?)

  function openreasonmodal() {
    state.reasonopen = true;
    els.reasoninput.value = "";
    showbackdrop();
    els.reasonmodal.classList.add("tumshow");
    els.reasoninput.focus();
  }
  function closereasonmodal() {
    els.reasonmodal.classList.remove("tumshow");
    state.pendingcreate = null;
    state.reasonopen = false;
    hidebackdrop();
  }
  function savereason() {
    const text = (els.reasoninput.value || "").trim();
    const user = state.pendingcreate;
    if (user && text) {
      toast("noted for @" + user.handle);
      try {console.log("%c[tum]", "color:#1d9bf0;font-weight:700", "custom reason for", user.handle + ":", text)} catch {}
    }
    closereasonmodal();
  }

  /*//////////////////////////////////////////////////////////////////////*/

  let toasttimer = 0;
  function toast(msg) {
    els.toast.textContent = msg;
    els.toast.classList.add("tumshow");
    clearTimeout(toasttimer);
    toasttimer = setTimeout(() => els.toast.classList.remove("tumshow"), 2200);
  }

  window.tum.overlay = {
    mount() {build()},
    begindrag, updatedrag, enddrag, canceldrag, toast
  };
})();

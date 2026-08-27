(function () {
  "use strict";

  window.tum = window.tum || {};

  const ICONS = {
    follow: '<svg viewBox="0 0 24 24"><circle cx="9" cy="8" r="4"/><path d="M2 21c0-4 3-7 7-7s7 3 7 7"/><line x1="18" y1="8" x2="18" y2="14"/><line x1="15" y1="11" x2="21" y2="11"/></svg>',
    mute: '<svg viewBox="0 0 24 24"><path d="M12 3a5 5 0 0 0-5 5v3.5c0 .9-.4 1.8-1 2.5l-1 1.2c-.5.6 0 1.5.8 1.5h13.4c.8 0 1.3-.9.8-1.5l-1-1.2c-.6-.7-1-1.6-1-2.5V8a5 5 0 0 0-5-5z"/><path d="M9.5 20a2.5 2.5 0 0 0 5 0"/><line x1="3" y1="3" x2="21" y2="21"/></svg>',
    block: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><line x1="5.5" y1="5.5" x2="18.5" y2="18.5"/></svg>',
    plus: '<svg viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>',
    close: '<svg viewBox="0 0 24 24"><line x1="5" y1="5" x2="19" y2="19"/><line x1="19" y1="5" x2="5" y2="19"/></svg>'
  };

  let shadow = null, root = null;
  let els = {};
  // no separate "manage mode" - the dock only exists while a user is being dragged, and every
  // folder action (create/remove) happens by releasing the dragged user onto the right spot in it
  let state = {dragging: false, user: null, pendingcreate: null};

  function el(tag, cls, html) {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html !== undefined) e.innerHTML = html;
    return e;
  }

  function loadcss() {
    return new Promise(res => {
      let href = null;
      try {href = chrome.runtime.getURL("src/css/overlay.css")} catch {}
      if (href) {
        fetch(href).then(r => r.text()).then(css => {
          shadow.appendChild(el("style", null, css));
          res();
        }).catch(() => res());
      } else {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "src/css/overlay.css";
        link.addEventListener("load", () => res(), {once: true});
        link.addEventListener("error", () => res(), {once: true});
        shadow.appendChild(link);
      }
    });
  }

  let building = false;
  function build() {
    if (building) return;
    building = true;
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
      <div class="tumcanvas"></div>
      <div class="tumchip"><img class="tumchipavatar"><span class="tumchipname"></span></div>
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
      <div class="tumtoast"></div>
    `;
    shadow.appendChild(root);

    els = {
      backdrop: root.querySelector(".tumbackdrop"),
      canvas: root.querySelector(".tumcanvas"),
      chip: root.querySelector(".tumchip"),
      chipavatar: root.querySelector(".tumchipavatar"),
      chipname: root.querySelector(".tumchipname"),
      modal: root.querySelector(".tummodal"),
      modalname: root.querySelector(".tummodalname"),
      modalclose: root.querySelector(".tummodalclose"),
      modalactions: root.querySelectorAll(".tummodalaction"),
      modalcolors: root.querySelector(".tummodalcolors"),
      modalsave: root.querySelector(".tummodalsave"),
      toast: root.querySelector(".tumtoast")
    };

    for (const c of tum.folders.COLORS) {
      const sw = el("button", "tummodalcolor");
      sw.style.backgroundColor = c;
      sw.dataset.color = c;
      sw.addEventListener("click", () => selectcolor(c));
      els.modalcolors.appendChild(sw);
    }

    els.modalclose.addEventListener("click", closemodal);
    els.modalsave.addEventListener("click", savemodal);
    for (const b of els.modalactions) b.addEventListener("click", () => selectaction(b.dataset.action));

    tum.folders.subscribe(renderfolders);
    tum.folders.ready.then(renderfolders);
  }

  /*//////////////////////////////////////////////////////////////////////*/

  function showbackdrop() {root.classList.add("tumactive")}
  function hidebackdrop() {if (!state.dragging && !state.modalopen) root.classList.remove("tumactive")}

  function renderfolders() {
    if (!els.canvas) return;
    const folders = tum.folders.list();
    els.canvas.innerHTML = "";
    for (const f of folders) els.canvas.appendChild(buildfoldernode(f));
    const add = el("div", "tumfolder tumaddfolder");
    add.innerHTML = `<div class="tumfoldericon">${ICONS.plus}</div>`;
    els.canvas.appendChild(add);
  }

  function buildfoldernode(f) {
    const node = el("div", "tumfolder");
    node.style.setProperty("--tumcolor", f.color);
    node.dataset.id = f.id;
    node.innerHTML = `
      <div class="tumfoldericon">${ICONS[f.action] || ICONS.follow}</div>
      <div class="tumfolderremove">${ICONS.close}</div>
      <div class="tumfolderlabel">${escapehtml(f.name)}</div>
    `;
    return node;
  }

  function escapehtml(s) {
    const d = document.createElement("div");
    d.textContent = s;
    return d.innerHTML;
  }

  /*//////////////////////////////////////////////////////////////////////*/

  function begindrag(user, x, y) {
    state.dragging = true;
    state.user = user;
    els.chipavatar.src = user.avatarurl || "";
    els.chipavatar.style.display = user.avatarurl ? "" : "none";
    els.chipname.textContent = "@" + user.handle;
    root.classList.add("tumdragging");
    showbackdrop();
    movechip(x, y);
    renderfolders();
  }

  function movechip(x, y) {
    els.chip.style.left = x + "px";
    els.chip.style.top = y + "px";
  }

  // a folder node has two drop zones: the small "remove" badge in its corner, and the rest
  // of the node (its body, which runs the folder's action)
  function foldertargetunderpoint(x, y) {
    const nodes = els.canvas.querySelectorAll(".tumfolder:not(.tumaddfolder)");
    for (const n of nodes) {
      const badge = n.querySelector(".tumfolderremove");
      const br = badge.getBoundingClientRect();
      if (x >= br.left && x <= br.right && y >= br.top && y <= br.bottom) return {id: n.dataset.id, zone: "remove"};
      const r = n.getBoundingClientRect();
      if (x >= r.left && x <= r.right && y >= r.top && y <= r.bottom) return {id: n.dataset.id, zone: "body"};
    }
    return null;
  }

  function addzoneunderpoint(x, y) {
    const add = els.canvas.querySelector(".tumaddfolder");
    if (!add) return false;
    const r = add.getBoundingClientRect();
    return x >= r.left && x <= r.right && y >= r.top && y <= r.bottom;
  }

  function updatedrag(x, y) {
    if (!state.dragging) return;
    movechip(x, y);
    const target = foldertargetunderpoint(x, y);
    for (const n of els.canvas.querySelectorAll(".tumfolder:not(.tumaddfolder)")) {
      n.classList.toggle("tumover", !!target && target.zone === "body" && n.dataset.id === target.id);
      n.classList.toggle("tumoverremove", !!target && target.zone === "remove" && n.dataset.id === target.id);
    }
    const add = els.canvas.querySelector(".tumaddfolder");
    if (add) add.classList.toggle("tumover", addzoneunderpoint(x, y));
  }

  function enddrag(x, y) {
    if (!state.dragging) return;
    const user = state.user;
    const target = foldertargetunderpoint(x, y);
    const overadd = addzoneunderpoint(x, y);
    root.classList.remove("tumdragging");
    state.dragging = false;
    for (const n of els.canvas.querySelectorAll(".tumfolder")) n.classList.remove("tumover", "tumoverremove");

    if (target && target.zone === "remove") {
      const folder = tum.folders.get(target.id);
      if (folder) {
        tum.folders.remove(target.id);
        toast("removed " + folder.name);
      }
    } else if (target && target.zone === "body") {
      const folder = tum.folders.get(target.id);
      if (folder) {
        toast("dropped @" + user.handle + " on " + folder.name);
        tum.actions.run(folder.action, user);
      }
    } else if (overadd) {
      state.pendingcreate = user;
      state.user = null;
      hidebackdrop();
      renderfolders();
      opencreatemodal();
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
    state.modalopen = true;
    els.modalname.value = "";
    selectaction("follow");
    selectcolor(tum.folders.COLORS[tum.folders.list().length % tum.folders.COLORS.length]);
    showbackdrop();
    els.modal.classList.add("tumshow");
    els.modalname.focus();
  }

  function closemodal() {
    els.modal.classList.remove("tumshow");
    state.pendingcreate = null;
    state.modalopen = false;
    hidebackdrop();
  }

  function savemodal() {
    const name = (els.modalname.value || "").trim() || "unnamed";
    const folder = tum.folders.create({name, action: modalaction, color: modalcolor});
    if (state.pendingcreate) {
      toast("dropped @" + state.pendingcreate.handle + " on " + folder.name);
      tum.actions.run(folder.action, state.pendingcreate);
    }
    closemodal();
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

(function () {
  "use strict";

  window.tum = window.tum || {};

  const ICONS = {
    follow: '<svg viewBox="0 0 24 24"><circle cx="9" cy="8" r="4"/><path d="M2 21c0-4 3-7 7-7s7 3 7 7"/><line x1="18" y1="8" x2="18" y2="14"/><line x1="15" y1="11" x2="21" y2="11"/></svg>',
    mute: '<svg viewBox="0 0 24 24"><path d="M12 3a5 5 0 0 0-5 5v3.5c0 .9-.4 1.8-1 2.5l-1 1.2c-.5.6 0 1.5.8 1.5h13.4c.8 0 1.3-.9.8-1.5l-1-1.2c-.6-.7-1-1.6-1-2.5V8a5 5 0 0 0-5-5z"/><path d="M9.5 20a2.5 2.5 0 0 0 5 0"/><line x1="3" y1="3" x2="21" y2="21"/></svg>',
    block: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><line x1="5.5" y1="5.5" x2="18.5" y2="18.5"/></svg>',
    plus: '<svg viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>',
    trash: '<svg viewBox="0 0 24 24"><path d="M4 7h16"/><path d="M9 7V4h6v3"/><path d="M6 7l1 13h10l1-13"/></svg>',
    close: '<svg viewBox="0 0 24 24"><line x1="5" y1="5" x2="19" y2="19"/><line x1="19" y1="5" x2="5" y2="19"/></svg>',
    gear: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M18.4 5.6L17 7M7 17l-1.4 1.4"/></svg>'
  };

  let shadow = null, root = null;
  let els = {};
  let state = {dragging: false, managing: false, user: null, overfolder: null, pendingcreate: null, editing: null};

  function el(tag, cls, html) {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html !== undefined) e.innerHTML = html;
    return e;
  }

  function loadcss() {
    return new Promise(res => {
      let href = null;
      try {href = chrome.runtime.getURL("css/overlay.css")} catch {}
      if (href) {
        fetch(href).then(r => r.text()).then(css => {
          shadow.appendChild(el("style", null, css));
          res();
        }).catch(() => res());
      } else {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "css/overlay.css";
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
      <button class="tumfab" title="manage folders">${ICONS.gear}</button>
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
          <div class="tummodalfoot">
            <button class="tummodaldelete">${ICONS.trash}<span>delete</span></button>
            <button class="tummodalsave">save</button>
          </div>
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
      fab: root.querySelector(".tumfab"),
      modal: root.querySelector(".tummodal"),
      modalname: root.querySelector(".tummodalname"),
      modalclose: root.querySelector(".tummodalclose"),
      modalactions: root.querySelectorAll(".tummodalaction"),
      modalcolors: root.querySelector(".tummodalcolors"),
      modaldelete: root.querySelector(".tummodaldelete"),
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

    els.fab.addEventListener("click", () => state.managing ? closemanage() : openmanage());
    els.backdrop.addEventListener("click", () => {if (state.managing) closemanage()});
    els.modalclose.addEventListener("click", closemodal);
    els.modalsave.addEventListener("click", savemodal);
    els.modaldelete.addEventListener("click", deletemodal);
    for (const b of els.modalactions) b.addEventListener("click", () => selectaction(b.dataset.action));

    tum.folders.subscribe(renderfolders);
    tum.folders.ready.then(renderfolders);
  }

  /*//////////////////////////////////////////////////////////////////////*/

  function showbackdrop() {root.classList.add("tumactive")}
  function hidebackdrop() {if (!state.managing && !state.dragging && !state.modalopen) root.classList.remove("tumactive")}

  function renderfolders() {
    if (!els.canvas) return;
    const folders = tum.folders.list();
    els.canvas.innerHTML = "";
    for (const f of folders) els.canvas.appendChild(buildfoldernode(f));
    const add = el("div", "tumfolder tumaddfolder");
    add.innerHTML = ICONS.plus;
    add.style.left = "50%";
    add.style.top = "88%";
    add.addEventListener("click", e => {e.stopPropagation(); if (state.managing) opencreatemodal(50, 88)});
    els.canvas.appendChild(add);
  }

  function buildfoldernode(f) {
    const node = el("div", "tumfolder");
    node.style.left = f.x + "%";
    node.style.top = f.y + "%";
    node.style.setProperty("--tumcolor", f.color);
    node.dataset.id = f.id;
    node.innerHTML = `<div class="tumfoldericon">${ICONS[f.action] || ICONS.follow}</div><div class="tumfolderlabel">${escapehtml(f.name)}</div>`;
    if (state.managing) attachreposition(node, f);
    node.addEventListener("click", e => {
      e.stopPropagation();
      if (state.managing) openeditmodal(f);
    });
    return node;
  }

  function escapehtml(s) {
    const d = document.createElement("div");
    d.textContent = s;
    return d.innerHTML;
  }

  function attachreposition(node, f) {
    let moved = false;
    node.addEventListener("pointerdown", e => {
      e.stopPropagation();
      const rect = els.canvas.getBoundingClientRect();
      moved = false;
      const move = ev => {
        moved = true;
        const x = clamp((ev.clientX - rect.left) / rect.width * 100, 3, 97);
        const y = clamp((ev.clientY - rect.top) / rect.height * 100, 3, 97);
        node.style.left = x + "%";
        node.style.top = y + "%";
      };
      const up = ev => {
        document.removeEventListener("pointermove", move);
        document.removeEventListener("pointerup", up);
        if (moved) {
          const rect2 = els.canvas.getBoundingClientRect();
          const x = clamp((ev.clientX - rect2.left) / rect2.width * 100, 3, 97);
          const y = clamp((ev.clientY - rect2.top) / rect2.height * 100, 3, 97);
          tum.folders.update(f.id, {x, y});
        }
      };
      document.addEventListener("pointermove", move);
      document.addEventListener("pointerup", up);
    });
  }

  function clamp(v, a, b) {return Math.max(a, Math.min(b, v))}

  /*//////////////////////////////////////////////////////////////////////*/

  function openmanage() {
    state.managing = true;
    root.classList.add("tummanaging");
    showbackdrop();
    renderfolders();
  }
  function closemanage() {
    state.managing = false;
    root.classList.remove("tummanaging");
    closemodal();
    hidebackdrop();
    renderfolders();
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

  function folderunderpoint(x, y) {
    const nodes = els.canvas.querySelectorAll(".tumfolder:not(.tumaddfolder)");
    for (const n of nodes) {
      const r = n.getBoundingClientRect();
      if (x >= r.left && x <= r.right && y >= r.top && y <= r.bottom) return n.dataset.id;
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
    const id = folderunderpoint(x, y);
    for (const n of els.canvas.querySelectorAll(".tumfolder")) n.classList.toggle("tumover", n.dataset.id === id);
    const add = els.canvas.querySelector(".tumaddfolder");
    if (add) add.classList.toggle("tumover", addzoneunderpoint(x, y));
    state.overfolder = id;
  }

  async function enddrag(x, y) {
    if (!state.dragging) return;
    const user = state.user;
    const id = state.overfolder;
    const overadd = addzoneunderpoint(x, y);
    root.classList.remove("tumdragging");
    state.dragging = false;
    state.overfolder = null;
    for (const n of els.canvas.querySelectorAll(".tumfolder")) n.classList.remove("tumover");

    if (id) {
      const folder = tum.folders.get(id);
      if (folder) {
        toast("dropped @" + user.handle + " on " + folder.name);
        tum.actions.run(folder.action, user);
      }
    } else if (overadd) {
      state.pendingcreate = user;
      opencreatemodal(50, 88);
      state.user = null;
      hidebackdrop();
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
    state.overfolder = null;
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

  function opencreatemodal(x, y) {
    state.editing = null;
    state.modalopen = true;
    els.modalname.value = "";
    els.modaldelete.style.display = "none";
    selectaction("follow");
    selectcolor(tum.folders.COLORS[tum.folders.list().length % tum.folders.COLORS.length]);
    showbackdrop();
    els.modal.classList.add("tumshow");
    els.modalname.focus();
    els.modal.dataset.x = x;
    els.modal.dataset.y = y;
  }

  function openeditmodal(f) {
    state.editing = f.id;
    state.modalopen = true;
    els.modalname.value = f.name;
    els.modaldelete.style.display = "";
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
      const x = parseFloat(els.modal.dataset.x) || 50;
      const y = parseFloat(els.modal.dataset.y) || 50;
      const folder = tum.folders.create({name, action: modalaction, color: modalcolor, x, y});
      if (state.pendingcreate) {
        toast("dropped @" + state.pendingcreate.handle + " on " + folder.name);
        tum.actions.run(folder.action, state.pendingcreate);
      }
    }
    closemodal();
  }

  function deletemodal() {
    if (state.editing) tum.folders.remove(state.editing);
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

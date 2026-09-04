(function () {
  "use strict";

  const O = window.tum._ov;
  const {el, escapehtml, linkify, iconhtml, ICONS, state, render, showbackdrop, hidebackdrop, closeoverlay, toast, restorehidden, removefromsource} = O;

  function launchdestroyer(user) {
    const pal = tum.theme.palette();
    const bg = tum.theme.css();
    const box = el("div", "tumdestroyer");
    box.style.background = bg;
    const frame = document.createElement("iframe");
    frame.className = "tumdestroyerframe";
    frame.allow = "autoplay";
    frame.src = chrome.runtime.getURL("desktopdestroyer/index.html") +
      "#url=" + encodeURIComponent(user.avatarurl || "") + "&bg=" + encodeURIComponent(bg);

    const exit = document.createElement("button");
    exit.className = "tumdestroyerexit";
    exit.style.background = pal.elev;
    exit.style.borderColor = pal.border;
    exit.innerHTML = ICONS.close;
    const exitsvg = exit.querySelector("svg");
    if (exitsvg) exitsvg.style.stroke = pal.text;
    function removeit() {box.remove(); document.removeEventListener("keydown", onkey, true)}
    function onkey(e) {if (e.key === "Escape") removeit()}
    exit.addEventListener("click", removeit);
    document.addEventListener("keydown", onkey, true);
    box.appendChild(frame);
    box.appendChild(exit);
    document.body.appendChild(box);
  }

  const safename = s => (s || "folder").replace(/[^a-z0-9]+/gi, "-").replace(/^-+|-+$/g, "").toLowerCase() || "folder";
  function downloadjson(data, name) {
    const blob = new Blob([JSON.stringify(data, null, 2)], {type: "application/json"});
    const url = URL.createObjectURL(blob);
    const a = el("a");
    a.href = url;
    a.download = name;
    O.root.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  function pickjson(cb) {
    const input = el("input");
    input.type = "file";
    input.accept = "application/json,.json";
    input.addEventListener("change", () => {
      const file = input.files && input.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        try {cb(JSON.parse(reader.result))}
        catch {toast("Import failed - not valid JSON")}
      };
      reader.readAsText(file);
    });
    input.click();
  }
  const stamp = () => new Date().toISOString().slice(0, 10);

  function exportdata() {
    downloadjson({version: 1, folders: tum.folders.list(), unsorted: tum.unsorted.list()}, "twitter-user-manager-" + stamp() + ".json");
    toast("Exported " + tum.folders.list().length + " folders");
  }
  function importdata() {pickjson(applyimport)}

  function applyimport(data) {
    if (data && data.folder && !Array.isArray(data.folders)) {finishfolderimport(data.folder); return}
    const folders = Array.isArray(data && data.folders) ? data.folders : [];
    const unsorted = Array.isArray(data && data.unsorted) ? data.unsorted : [];
    let nf = 0, nu = 0;
    for (const f of folders) {
      if (!f || typeof f !== "object") continue;
      const created = tum.folders.create({name: f.name, action: f.action, color: f.color, icon: f.icon, x: f.x, y: f.y});
      for (const m of (Array.isArray(f.members) ? f.members : [])) if (m && m.handle) tum.folders.addmember(created.id, m);
      nf++;
    }
    for (const u of unsorted) {
      if (!u || !u.handle) continue;
      tum.unsorted.add(u, u.x, u.y);
      nu++;
    }
    state.open = true;
    render();
    toast("Imported " + nf + " folders, " + nu + " loose users");
  }

  /*//////////////////////////////////////////////////////////////////////*/

  function exportfolder(f) {
    downloadjson({version: 1, folder: {name: f.name, action: f.action, color: f.color, icon: f.icon, members: f.members || []}},
      "folder-" + safename(f.name) + "-" + stamp() + ".json");
    toast("Exported folder " + f.name);
  }
  function finishfolderimport(f) {
    const members = (Array.isArray(f.members) ? f.members : []).filter(m => m && m.handle);
    const doimport = () => {
      const created = tum.folders.create({name: f.name, action: f.action, color: f.color, icon: f.icon});
      for (const m of members) tum.folders.addmember(created.id, m);
      state.open = true;
      render();
      toast("Imported folder " + created.name + " (" + members.length + " users)");
    };
    if (f.action && members.length) {
      const cap = f.action.charAt(0).toUpperCase() + f.action.slice(1);
      openconfirm({
        title: "Import and " + f.action + " all?",
        body: "This folder is set to " + f.action + " its members. Importing will " + f.action + " all " + members.length + " users in it, in the background. You can cancel while it runs.",
        oklabel: cap + " all",
        onok: () => {doimport(); tum.actions.enqueue(f.action, members.map(m => m.handle))}
      });
    } else doimport();
  }

  /*//////////////////////////////////////////////////////////////////////*/

  let modalcolor = "#1d9bf0", modalaction = null, modalicon = "";

  function selectcolor(c) {
    modalcolor = c;
    for (const sw of O.els.modalcolors.children) sw.classList.toggle("tumselected", sw.dataset.color === c);
  }
  function selectaction(a) {
    modalaction = a;
    for (const b of O.els.modalactions) b.classList.toggle("tumselected", b.dataset.action === a);
    refreshiconbtn();
  }
  function toggleaction(a) {selectaction(a === modalaction ? null : a)}
  function refreshiconbtn() {
    O.els.modaliconbtn.innerHTML = iconhtml(modalicon) || ICONS[modalaction] || ICONS.folder;
    if (O.els.modaliconclear) O.els.modaliconclear.classList.toggle("tumshow", !!modalicon);
  }
  function selecticon(id) {
    modalicon = id;
    refreshiconbtn();
  }

  function opencreatemodal() {
    state.editing = null;
    state.modalopen = true;
    state.open = true;
    modalicon = "";
    O.els.modalname.value = "";
    O.els.modalsave.textContent = "Create";
    selectaction(null);
    selectcolor(tum.folders.COLORS[tum.folders.list().length % tum.folders.COLORS.length]);
    O.els.modalactionsrow.style.display = "";
    showbackdrop();
    O.els.modal.classList.add("tumshow");
    O.els.modalname.focus();
  }

  function openeditmodal(f) {
    state.editing = f.id;
    state.modalopen = true;
    modalicon = f.icon || "";
    O.els.modalname.value = f.name;
    O.els.modalsave.textContent = "Save";
    selectaction(f.action);
    selectcolor(f.color);
    O.els.modalactionsrow.style.display = "";
    showbackdrop();
    O.els.modal.classList.add("tumshow");
  }

  function closemodal() {
    O.els.modal.classList.remove("tumshow");
    tum.iconpicker.close();
    const pendinghandle = state.pendingcreate && state.pendingcreate.user && state.pendingcreate.user.handle;
    state.pendingcreate = null;
    state.editing = null;
    state.modalopen = false;
    hidebackdrop();
    if (pendinghandle) {restorehidden(pendinghandle); render()}
  }

  function savemodal() {
    const name = (O.els.modalname.value || "").trim() || "unnamed";
    const icon = modalicon, action = modalaction, color = modalcolor;
    let filed = false;
    if (state.editing) {
      const fid = state.editing;
      const f = tum.folders.get(fid);
      const prevaction = f ? f.action : null;
      const members = f && Array.isArray(f.members) ? f.members.slice() : [];
      const apply = () => tum.folders.update(fid, {name, icon, action, color});
      const changed = action && action !== prevaction;
      // a meaningful batch gets a warning first; a few members just runs quietly
      if (changed && members.length > 3) {
        const cap = action.charAt(0).toUpperCase() + action.slice(1);
        closemodal();
        openconfirm({
          title: action.charAt(0).toUpperCase() + action.slice(1) + " " + members.length + " members?",
          body: "Setting this folder's action to " + action + " will " + action + " all " + members.length + " users already in it, in the background. You can cancel while it runs.",
          oklabel: cap + " all",
          onok: () => {apply(); tum.actions.enqueue(action, members.map(m => m.handle)); state.open = true; render()}
        });
        return;
      }
      apply();
      if (changed && members.length) tum.actions.enqueue(action, members.map(m => m.handle));
    } else {
      const folder = tum.folders.create({name, icon, action, color});
      if (state.pendingcreate) {
        const {user, source} = state.pendingcreate;
        removefromsource(source, user.handle);
        tum.folders.addmember(folder.id, user);
        if (source.type !== "folder" && !user.skipaction) tum.actions.run(folder.action, user);
        filed = true;
      }
    }
    closemodal();
    if (filed && !O.keepopen()) closeoverlay();
    state.open = true;
    render();
  }

  /*//////////////////////////////////////////////////////////////////////*/

  let reasonaction = null;

  function selectreasonaction(a) {
    reasonaction = a;
    for (const b of O.els.reasonactionbtns) b.classList.toggle("tumselected", b.dataset.action === a);
  }
  function togglereasonaction(a) {selectreasonaction(a === reasonaction ? null : a)}

  function setreasonmode(mode) {
    state.reasonmode = mode;
    O.els.reasonview.classList.toggle("tumshow", mode === "view");
    O.els.reasonform.classList.toggle("tumshow", mode === "edit");
    O.els.reasonactions.style.display = state.pendingcreate ? "" : "none";
    if (mode === "edit") O.els.reasoninput.focus();
  }

  function openreasonedit() {
    const {user} = state.pendingcreate;
    state.reasonopen = true;
    state.reasontarget = null;
    O.els.reasontitle.textContent = "Note for @" + user.handle;
    O.els.reasoninput.value = user.reason || "";
    O.els.reasonsourceinput.value = user.sourceurl || "";
    selectreasonaction(null);
    O.els.reasonactionbtns.forEach(b => b.classList.remove("tumdimmed"));
    O.els.reasonmodal.classList.add("tumshow");
    setreasonmode("edit");
  }

  function openreasonview(source, m) {
    state.reasonopen = true;
    state.reasontarget = {source, handle: m.handle};
    O.els.reasontitle.textContent = "Note for @" + m.handle;
    O.els.reasontext.innerHTML = linkify(m.reason || "");
    if (m.sourceurl) {O.els.reasonsource.href = m.sourceurl; O.els.reasonsource.style.display = ""}
    else O.els.reasonsource.style.display = "none";
    O.els.reasoninput.value = m.reason || "";
    O.els.reasonsourceinput.value = m.sourceurl || "";
    O.els.reasonmodal.classList.add("tumshow");
    setreasonmode("view");
  }

  function closereasonmodal() {
    O.els.reasonmodal.classList.remove("tumshow");
    const pendinghandle = state.pendingcreate && state.pendingcreate.user && state.pendingcreate.user.handle;
    state.pendingcreate = null;
    state.reasontarget = null;
    state.reasonopen = false;
    if (pendinghandle) {restorehidden(pendinghandle); render()}
  }

  function savereason() {
    const text = (O.els.reasoninput.value || "").trim();
    const src = (O.els.reasonsourceinput.value || "").trim() || null;
    if (state.pendingcreate) {
      const {user, source} = state.pendingcreate;
      if (source.type === "folder") {
        tum.folders.setmemberreason(source.id, user.handle, text, src);
      } else if (source.type === "unsorted") {
        tum.unsorted.setreason(user.handle, text, src);
      } else {
        tum.unsorted.add(Object.assign({}, user, {reason: text, sourceurl: src, placed: false}));
        if (!user.skipaction) tum.actions.run(reasonaction, user);
      }
    } else if (state.reasontarget) {
      const {source, handle} = state.reasontarget;
      if (source.type === "folder") tum.folders.setmemberreason(source.id, handle, text, src);
      else tum.unsorted.setreason(handle, text, src);
    }
    closereasonmodal();
    state.open = true;
    render();
  }

  function deletenoteduser() {
    if (state.reasontarget) removefromsource(state.reasontarget.source, state.reasontarget.handle);
    closereasonmodal();
    state.open = true;
    render();
  }

  /*//////////////////////////////////////////////////////////////////////*/

  function openconfirm(opts) {
    state.confirmopen = true;
    state.confirmaction = typeof opts.onok === "function" ? opts.onok : null;
    O.els.confirmtitle.textContent = opts.title || "Are you sure?";
    O.els.confirmbody.textContent = opts.body || "";
    O.els.confirmok.textContent = opts.oklabel || "Confirm";
    showbackdrop();
    O.els.confirmsheet.classList.add("tumshow");
  }

  function confirmfolderdelete(folder) {
    const members = Array.isArray(folder.members) ? folder.members : [];
    if (members.length <= 1) {tum.folders.remove(folder.id); return}
    const id = folder.id;
    openconfirm({
      title: "Delete " + folder.name + "?",
      body: `This removes the folder and its ${members.length} members, this cannot be undone. Note that actions done to users will stay active.`,
      oklabel: "Delete",
      onok: () => tum.folders.remove(id)
    });
  }

  function confirmcategorydelete(c) {
    openconfirm({
      title: "Delete category?",
      body: "This removes the \"" + (c.name || "Edit Me...") + "\" category outline. The folders and users inside stay exactly where they are.",
      oklabel: "Delete",
      onok: () => tum.categories.remove(c.id)
    });
  }

  function closeconfirmsheet() {
    O.els.confirmsheet.classList.remove("tumshow");
    state.confirmopen = false;
    state.confirmaction = null;
    hidebackdrop();
  }

  /*//////////////////////////////////////////////////////////////////////*/

  let ctxel = null;
  function ensurectx() {
    if (ctxel) return ctxel;
    ctxel = el("div", "tumcontextmenu");
    O.root.appendChild(ctxel);
    return ctxel;
  }
  function ctxopen() {return !!(ctxel && ctxel.classList.contains("tumshow"))}
  function closectx() {if (ctxel) ctxel.classList.remove("tumshow")}

  function ctxrow(item) {
    const r = el("button", "tumctxrow" + (item.danger ? " tumctxdanger" : ""));
    r.innerHTML = `<span class="tumctxicon">${item.icon || ""}</span><span class="tumctxlabel">${escapehtml(item.label)}</span>`;
    r.addEventListener("click", e => {e.stopPropagation(); closectx(); if (item.onclick) item.onclick()});
    return r;
  }
  function openctx(x, y, items) {
    const menu = ensurectx();
    menu.innerHTML = "";
    for (const it of items) menu.appendChild(ctxrow(it));
    menu.style.left = "0px";
    menu.style.top = "0px";
    menu.classList.add("tumshow");
    const r = menu.getBoundingClientRect();
    menu.style.left = Math.max(8, Math.min(x, window.innerWidth - r.width - 8)) + "px";
    menu.style.top = Math.max(8, Math.min(y, window.innerHeight - r.height - 8)) + "px";
  }

  function resolveuser(node) {
    if (node.classList.contains("tumloosechip")) {
      const u = tum.unsorted.list().find(x => x.handle === node.dataset.handle);
      return u ? {source: {type: "unsorted"}, m: u} : null;
    }
    const fnode = node.closest(".tumfolder");
    const f = fnode && tum.folders.get(fnode.dataset.id);
    const m = f && (f.members || []).find(x => x.handle === node.dataset.handle);
    return m ? {source: {type: "folder", id: f.id}, m} : null;
  }

  // the explore-picker "new user" flow is a separate, bigger job - stub for now
  function newuser() {toast("Adding users from search is coming soon");}

  function oncontextmenu(e) {
    if (!O.root.classList.contains("tumactive") || state.drag) return;
    if (e.target.closest("input, textarea")) return;
    if (e.target.closest(".tummodalcard, .tumreasoncard, .tumconfirmcard, .tumiconpicker")) return;
    const chip = e.target.closest(".tumloosechip");
    const memberrow = e.target.closest(".tumfoldermember");
    const foldernode = e.target.closest(".tumfolder");
    const catnode = e.target.closest(".tumcategory");
    e.preventDefault();
    let items;
    if (chip || memberrow) {
      const info = resolveuser(chip || memberrow);
      if (!info) {closectx(); return}
      items = [
        {label: "Open profile", icon: ICONS.profile, onclick: () => O.openprofile(info.source, info.m)},
        {label: "Delete", icon: ICONS.trash, danger: true, onclick: () => {removefromsource(info.source, info.m.handle); state.open = true; render()}}
      ];
    } else if (foldernode) {
      const f = tum.folders.get(foldernode.dataset.id);
      if (!f) {closectx(); return}
      items = [
        {label: f.collapsed ? "Expand" : "Collapse", icon: ICONS.chevron, onclick: () => O.toggledcollapse(f.id)},
        {label: "Edit", icon: ICONS.pencil, onclick: () => openeditmodal(f)},
        {label: "Delete", icon: ICONS.trash, danger: true, onclick: () => confirmfolderdelete(f)},
        {label: "New user", icon: ICONS.plus, onclick: () => newuser(f)}
      ];
    } else if (catnode) {
      const cid = catnode.dataset.id;
      const c = tum.categories.get(cid);
      if (!c) {closectx(); return}
      items = [
        {label: "Rename", icon: ICONS.pencil, onclick: () => O.renamecategory(cid)},
        {label: "Delete", icon: ICONS.trash, danger: true, onclick: () => confirmcategorydelete(c)}
      ];
    } else {
      const {clientX, clientY} = e;
      items = [
        {label: "New user", icon: ICONS.plus, onclick: () => newuser(null)},
        {label: "New folder", icon: ICONS.folder, onclick: () => opencreatemodal()},
        {label: "New category", icon: ICONS.category, onclick: () => O.newcategory(clientX, clientY)}
      ];
    }
    openctx(e.clientX, e.clientY, items);
  }

  /*//////////////////////////////////////////////////////////////////////*/

  Object.assign(O, {launchdestroyer, exportdata, importdata, exportfolder, openconfirm,
    oncontextmenu, closectx, ctxopen, newuser,
    opencreatemodal, openeditmodal, closemodal, savemodal,
    selectcolor, selectaction, toggleaction, refreshiconbtn, selecticon, selectreasonaction, togglereasonaction,
    setreasonmode, openreasonedit, openreasonview, closereasonmodal, savereason, deletenoteduser, confirmfolderdelete, closeconfirmsheet});
})();

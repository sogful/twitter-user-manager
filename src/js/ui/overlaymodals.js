(function () {
  "use strict";

  // the overlay modals + tools - folder create/edit, note (reason) popup, delete-confirm sheet,
  // json export/import, and the destroyer joke. shares state + helpers via window.tum._ov; the drag
  // file (loaded before this) puts restorehidden/removefromsource there. manifest: overlay.js, overlaydrag.js, this
  const O = window.tum._ov;
  const {el, linkify, iconhtml, ICONS, state, pan, render, showbackdrop, hidebackdrop, closeoverlay, toast, restorehidden, removefromsource} = O;

  // the "destroy" joke: full-screen the desktopdestroyer (in its own extension iframe so its global
  // canvas/input code stays sandboxed) with the target's avatar as the surface to smash. it's purely
  // for laughs - nothing is blocked/muted/followed - and the exit button just tears the iframe down
  function launchdestroyer(user) {
    const box = el("div", "tumdestroyer");
    box.style.cssText = "position:fixed;inset:0;z-index:2147483647;background:#000";
    const frame = document.createElement("iframe");
    frame.style.cssText = "position:absolute;inset:0;width:100%;height:100%;border:0";
    frame.allow = "autoplay";
    frame.src = chrome.runtime.getURL("desktopdestroyer/index.html") + "#" + encodeURIComponent(user.avatarurl || "");
    // the same round icon button as the overlay's own close (tumtoolclose), rebuilt inline since
    // this button lives in the page's light dom, outside the shadow O.root that holds .tumtool css
    const exit = document.createElement("button");
    exit.innerHTML = ICONS.close;
    exit.style.cssText = "position:absolute;top:16px;right:16px;z-index:2;width:34px;height:34px;border-radius:999px;padding:0;" +
      "background:#16181c;border:1px solid #2f3336;display:flex;align-items:center;justify-content:center;cursor:pointer";
    exit.querySelector("svg").style.cssText = "width:18px;height:18px;stroke:#e7e9ea;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round";
    exit.addEventListener("mouseenter", () => {exit.style.background = "#f4212e"; exit.style.borderColor = "#f4212e"; exit.querySelector("svg").style.stroke = "#fff"});
    exit.addEventListener("mouseleave", () => {exit.style.background = "#16181c"; exit.style.borderColor = "#2f3336"; exit.querySelector("svg").style.stroke = "#e7e9ea"});
    function removeit() {box.remove(); document.removeEventListener("keydown", onkey, true)}
    function onkey(e) {if (e.key === "Escape") removeit()}
    exit.addEventListener("click", removeit);
    document.addEventListener("keydown", onkey, true);
    box.appendChild(frame);
    box.appendChild(exit);
    document.body.appendChild(box);
  }

  // back up / restore everything as a single json file. import merges (never wipes) - imported
  // folders are added alongside whatever's already there, so a bad import can't cost you data

  function exportdata() {
    const data = {version: 1, folders: tum.folders.list(), unsorted: tum.unsorted.list()};
    const blob = new Blob([JSON.stringify(data, null, 2)], {type: "application/json"});
    const url = URL.createObjectURL(blob);
    const a = el("a");
    a.href = url;
    a.download = "twitter-user-manager-" + new Date().toISOString().slice(0, 10) + ".json";
    O.root.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    toast("exported " + tum.folders.list().length + " folders");
  }

  function importdata() {
    const input = el("input");
    input.type = "file";
    input.accept = "application/json,.json";
    input.addEventListener("change", () => {
      const file = input.files && input.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        try {applyimport(JSON.parse(reader.result))}
        catch {toast("import failed - not valid json")}
      };
      reader.readAsText(file);
    });
    input.click();
  }

  function applyimport(data) {
    const folders = Array.isArray(data && data.folders) ? data.folders : [];
    const unsorted = Array.isArray(data && data.unsorted) ? data.unsorted : [];
    let nf = 0, nu = 0;
    for (const f of folders) {
      if (!f || typeof f !== "object") continue;
      // create() gives it a fresh id so a re-import can't clobber an existing folder
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
    toast("imported " + nf + " folders, " + nu + " loose users");
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
  // clicking the already-selected action deselects it - the toggle reads modal state that lives in
  // here, so core wires the buttons to these instead of doing the compare itself
  function toggleaction(a) {selectaction(a === modalaction ? null : a)}
  function refreshiconbtn() {
    O.els.modaliconbtn.innerHTML = iconhtml(modalicon) || ICONS[modalaction] || ICONS.folder;
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
    O.els.modalsave.textContent = "create";
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
    O.els.modalsave.textContent = "save";
    selectaction(f.action);
    selectcolor(f.color);
    O.els.modalactionsrow.style.display = "none";
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
    const icon = modalicon;
    let filed = false;
    if (state.editing) {
      tum.folders.update(state.editing, {name, icon, action: modalaction, color: modalcolor});
    } else {
      const folder = tum.folders.create({name, icon, action: modalaction, color: modalcolor});
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
    O.els.reasontitle.textContent = "note for @" + user.handle;
    O.els.reasoninput.value = user.reason || "";
    selectreasonaction(null);
    O.els.reasonactionbtns.forEach(b => b.classList.remove("tumdimmed"));
    O.els.reasonmodal.classList.add("tumshow");
    setreasonmode("edit");
  }

  function openreasonview(source, m) {
    state.reasonopen = true;
    state.reasontarget = {source, handle: m.handle};
    O.els.reasontitle.textContent = "note for @" + m.handle;
    O.els.reasontext.innerHTML = linkify(m.reason || "");
    if (m.sourceurl) {O.els.reasonsource.href = m.sourceurl; O.els.reasonsource.style.display = ""}
    else O.els.reasonsource.style.display = "none";
    O.els.reasoninput.value = m.reason || "";
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
    if (state.pendingcreate) {
      const {user, source, x, y} = state.pendingcreate;
      const withreason = Object.assign({}, user, {reason: text});
      removefromsource(source, user.handle);
      if (source.type === "page") {
        withreason.placed = false;
        tum.unsorted.add(withreason);
        if (!user.skipaction) tum.actions.run(reasonaction, user);
      } else {
        const sx = x != null ? x : window.innerWidth / 2, sy = y != null ? y : window.innerHeight / 2;
        const px = (sx - pan.x) / window.innerWidth * 100, py = (sy - pan.y) / window.innerHeight * 100;
        tum.unsorted.add(withreason, px, py);
      }
    } else if (state.reasontarget) {
      const {source, handle} = state.reasontarget;
      if (source.type === "folder") tum.folders.setmemberreason(source.id, handle, text);
      else tum.unsorted.setreason(handle, text);
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

  function confirmfolderdelete(folder) {
    const members = Array.isArray(folder.members) ? folder.members : [];
    if (members.length <= 1) {tum.folders.remove(folder.id); return}
    state.confirmopen = true;
    state.confirmtarget = folder.id;
    O.els.confirmtitle.textContent = "Delete " + folder.name + "?";
    O.els.confirmbody.textContent = `This removes the folder and its ${members.length} members, this cannot be undone. Note that actions done to users will stay active.`;
    showbackdrop();
    O.els.confirmsheet.classList.add("tumshow");
  }

  function closeconfirmsheet() {
    O.els.confirmsheet.classList.remove("tumshow");
    state.confirmopen = false;
    state.confirmtarget = null;
    hidebackdrop();
  }

  // hand the pieces core and the drag file reach for back to the shared object
  Object.assign(O, {launchdestroyer, exportdata, importdata, opencreatemodal, openeditmodal, closemodal, savemodal,
    selectcolor, selectaction, toggleaction, refreshiconbtn, selecticon, selectreasonaction, togglereasonaction,
    setreasonmode, openreasonedit, openreasonview, closereasonmodal, savereason, deletenoteduser, confirmfolderdelete, closeconfirmsheet});
})();

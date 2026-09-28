(function () {
  "use strict";

  const O = window.tum._ov;
  const {el, escapehtml, linkify, iconhtml, avatarurl, fullavatarurl, ICONS, state, render, showbackdrop, hidebackdrop, closeoverlay, toast, restorehidden, removefromsource} = O;
  const T = (...a) => tum.strings.t(...a);

  function launchdestroyer(user) {
    const durl = chrome.runtime.getURL("desktopdestroyer/index.html");
    if (!durl || durl === "about:blank") {toast(T("toast.destroyer.unavailable")); return}
    const pal = tum.theme.palette();
    const bg = tum.theme.css();
    const box = el("div", "tumdestroyer");
    box.style.background = bg;
    const frame = document.createElement("iframe");
    frame.className = "tumdestroyerframe";
    frame.allow = "autoplay";
    frame.src = durl + "#url=" + encodeURIComponent(avatarurl(user.avatarurl) || "") + "&bg=" + encodeURIComponent(bg);

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

  // ytdlp-style
  const FWMAP = {"<": "＜", ">": "＞", ":": "：", "\"": "＂", "/": "／", "\\": "＼", "|": "｜", "?": "？", "*": "＊"};
  const fnsafe = s => {let o = ""; for (const ch of (s || "")) o += (FWMAP[ch] || ch); return o.replace(/[. ]+$/, "").trim() || "folder"};
  function ownhandle() {
    const a = document.querySelector('[data-testid="AppTabBar_Profile_Link"]');
    let h = a && (a.getAttribute("href") || "").replace(/^\//, "").replace(/\/$/, "");
    if (!h) {const sw = document.querySelector('[data-testid="SideNav_AccountSwitcher_Button"]'); const m = sw && /@([A-Za-z0-9_]+)/.exec(sw.textContent || ""); if (m) h = m[1]}
    return h || "account";
  }
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
        catch {toast(T("toast.import.failed"))}
      };
      reader.readAsText(file);
    });
    input.click();
  }
  const stamp = () => new Date().toISOString().slice(0, 10);
  function exporticon(icon) {return (icon || "").replace(/^assets\/svgs/, "")}
  function importicon(icon) {return icon && icon.startsWith("/") ? "assets/svgs" + icon : icon}
  function compactavatar(value) {
    const match = /^https:\/\/pbs\.twimg\.com\/profile_images\/(.+)$/i.exec(value || "");
    return match ? match[1] : value;
  }
  function compactdate(value) {
    if (typeof value === "number") return value > 100000000000 ? Math.floor(value / 1000) : value;
    const time = Date.parse(value || "");
    return isNaN(time) ? value : Math.floor(time / 1000);
  }
  function exportmember(member) {
    const out = {};
    for (const key of ["handle", "displayname", "reason", "sourceurl", "userid", "createdat", "followers", "following", "tweets", "mediatweets", "favorites", "highlights", "verifiedtype", "blueverified", "unfindable"]) {
      if (member[key] !== undefined && member[key] !== null && member[key] !== "") out[key] = key === "createdat" ? compactdate(member[key]) : member[key];
    }
    if (member.avatarurl) out.avatarurl = compactavatar(member.avatarurl);
    const badges = (Array.isArray(member.badges) ? member.badges : []).flatMap(badge => {
      if (typeof badge === "string" && /^(verified|verifiedbusiness|verifiedgovernment|translator|translatormod|protected)$/.test(badge)) return [badge];
      if (badge && badge.type === "affiliation" && /^[A-Za-z0-9_]+$/.test(badge.handle || "")) return [{type: "affiliation", handle: badge.handle, avatarurl: compactavatar(badge.avatarurl) || null}];
      return [];
    });
    if (member.protected) badges.push("protected");
    if (badges.length) out.badges = [...new Set(badges)];
    return out;
  }

  function isunfindable(member) {
    return !!member && (member.unfindable === true || (!member.userid && !member.pending));
  }
  function exportfolderdata(folder) {
    return {id: folder.id, name: folder.name, action: folder.action, color: folder.color, description: folder.description || "", icon: exporticon(folder.icon), sort: folder.sort, collapsed: !!folder.collapsed, cat: folder.cat || null, x: folder.x, y: folder.y, members: (folder.members || []).map(exportmember)};
  }

  function exportcategory(category) {
    return {id: category.id, name: category.name, x: category.x, y: category.y, w: category.w, h: category.h};
  }

  function exportloosemember(member) {
    return Object.assign(exportmember(member), {cat: member.cat || null, placed: member.placed !== false, x: member.x, y: member.y});
  }

  function exportdata() {
    downloadjson({version: 2, folders: tum.folders.list().map(exportfolderdata), categories: tum.categories.list().map(exportcategory), unsorted: tum.unsorted.list().map(exportloosemember)}, "＠" + ownhandle() + ".json");
    toast(T("toast.exported.folders", tum.folders.list().length));
  }
  function importdata() {pickjson(applyimport)}

  function importposition(item, index) {
    return {
      x: typeof item.x === "number" ? item.x : 60 + (index % 5) * 240,
      y: typeof item.y === "number" ? item.y : 80 + Math.floor(index / 5) * 340
    };
  }

  function rightedge() {
    let edge = 0;
    for (const folder of tum.folders.list()) edge = Math.max(edge, (folder.x || 0) + 214);
    for (const category of tum.categories.list()) edge = Math.max(edge, (category.x || 0) + (category.w || 480));
    for (const member of tum.unsorted.list()) edge = Math.max(edge, (member.x || 0) + 90);
    return edge;
  }

  function importprofile(data, replace) {
    const sourcefolders = Array.isArray(data && data.folders) ? data.folders.filter(folder => folder && typeof folder === "object") : [];
    const sourcecategories = Array.isArray(data && data.categories) ? data.categories.filter(category => category && typeof category === "object") : [];
    const sourceunsorted = Array.isArray(data && data.unsorted) ? data.unsorted.filter(member => member && member.handle) : [];
    const categoryids = new Set(replace ? [] : tum.categories.list().map(category => category.id));
    const categorymap = new Map();
    const categories = sourcecategories.map((category, index) => {
      const id = category.id && !categoryids.has(category.id) ? category.id : "cimport" + Date.now().toString(36) + index.toString(36);
      categoryids.add(id);
      categorymap.set(category.id, id);
      return Object.assign({}, category, {id});
    });
    const folders = sourcefolders.map((folder, index) => Object.assign({}, folder, importposition(folder, index), {cat: categorymap.get(folder.cat) || null}));
    const unsorted = sourceunsorted.map((member, index) => Object.assign({}, member, importposition(member, index), {cat: categorymap.get(member.cat) || null}));
    if (!replace) {
      const left = Math.min(0, ...folders.map(folder => folder.x), ...categories.map(category => category.x || 0), ...unsorted.map(member => member.x));
      const shift = rightedge() - left + 80;
      for (const category of categories) category.x = (category.x || 0) + shift;
      for (const folder of folders) folder.x += shift;
      for (const member of unsorted) member.x += shift;
    }
    tum.categories.import(categories, replace);
    tum.folders.import(folders.map(folder => Object.assign({}, folder, {icon: importicon(folder.icon)})), replace);
    tum.unsorted.import(unsorted, replace);
    state.open = true;
    render();
    setTimeout(O.fitall, 0);
    toast(T("toast.imported.all", folders.length, unsorted.length));
  }

  function applyimport(data) {
    if (data && data.folder && !Array.isArray(data.folders)) {finishfolderimport(data.folder); return}
    const folders = Array.isArray(data && data.folders) ? data.folders : [];
    if (!folders.length) {toast(T("toast.import.failed")); return}
    openconfirm({
      title: "Import profile",
      body: "Replace clears this overlay and restores the imported layout. Add keeps this overlay and places the import to its right.",
      oklabel: "Replace overlay",
      altlabel: "Add to the right",
      cancellabel: "Cancel",
      onok: () => importprofile(data, true),
      onalternate: () => importprofile(data, false)
    });
  }

  /*//////////////////////////////////////////////////////////////////////*/

  function exportfolder(f) {
    downloadjson({folder: exportfolderdata(f)},
      fnsafe(f.name) + ".json");
    toast(T("toast.exported.folder", f.name));
  }
  const shareendpoint = "https://list.coolsite.cv/api/lists";
  const validshareid = id => /^[23456789abcdefghjkmnpqrstuvwxyz]{5}$/i.test(id || "");
  const validsharekey = key => /^[0-9a-f]{32}$/i.test(key || "");
  const hasshare = f => validshareid(f.sharedid) && validsharekey(f.sharedkey);
  const shareurl = f => hasshare(f) ? "https://list.coolsite.cv/" + f.sharedid : "";

  async function sharefolder(f, sync = false) {
    const managed = hasshare(f);
    const id = managed ? f.sharedid : "";
    const headers = {"content-type": "application/json"};
    if (managed) headers["x-list-key"] = f.sharedkey;
    let response, data;
    try {
      response = await fetch(shareendpoint + (id ? "/" + id : ""), {method: id ? "PUT" : "POST", headers, body: JSON.stringify({folder: exportfolderdata(f)})});
      data = await response.json();
    } catch {toast(sync ? T("toast.share.syncfailed") : T("toast.share.failed")); return}
    if (!response.ok || !data || !data.url) {toast(data && data.error || (sync ? T("toast.share.syncfailed") : T("toast.share.failed"))); return}
    tum.folders.update(f.id, {sharedid: data.id, sharedkey: data.key || f.sharedkey, sharedpublished: true});
    if (sync) toast(T("toast.share.synced"));
    else window.open(data.url, "_blank", "noopener,noreferrer");
  }

  async function unsharefolder(f) {
    if (!hasshare(f)) return;
    let response;
    try {
      response = await fetch(shareendpoint + "/" + f.sharedid, {method: "DELETE", headers: {"x-list-key": f.sharedkey}});
    } catch {toast(T("toast.share.unpublishfailed")); return}
    if (!response.ok) {toast(T("toast.share.unpublishfailed")); return}
    tum.folders.update(f.id, {sharedpublished: false});
    toast(T("toast.share.unpublished"));
  }
  function importintofolder(folder) {
    pickjson(data => {
      let members = [];
      if (data && data.folder && Array.isArray(data.folder.members)) members = data.folder.members;
      else if (Array.isArray(data && data.members)) members = data.members;
      else if (Array.isArray(data)) members = data;
      members = members.filter(m => m && m.handle);
      if (!members.length) {toast(T("folder.import.empty")); return}
      const cur = tum.folders.get(folder.id);
      const have = new Set((cur && cur.members || []).map(m => (m.handle || "").toLowerCase()));
      const add = [];
      for (const m of members) {
        const k = (m.handle || "").toLowerCase();
        if (have.has(k)) continue;
        have.add(k);
        add.push(m);
      }
      const added = tum.folders.addmembers(folder.id, add);
      state.open = true;
      render();
      const dupes = members.length - added;
      toast(dupes ? T("folder.import.added.dupes", added, folder.name, dupes) : T("folder.import.added", added, folder.name));
    });
  }
  function finishfolderimport(f) {
    const members = (Array.isArray(f.members) ? f.members : []).filter(m => m && m.handle);
    const doimport = () => {
      const created = tum.folders.create({id: f.id, name: f.name, action: f.action, color: f.color, description: f.description, icon: importicon(f.icon)});
      tum.folders.addmembers(created.id, members);
      state.open = true;
      render();
      toast(T("toast.imported.folder", created.name, members.length));
    };
    if (f.action && members.length) {
      const cap = f.action.charAt(0).toUpperCase() + f.action.slice(1);
      openconfirm({
        title: T("confirm.import.title", f.action),
        body: T("confirm.import.body", f.action, f.action, members.length),
        oklabel: T("action.confirm.ok", cap),
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
  function toggleaction(a) {
    const next = a === modalaction ? null : a;
    selectaction(next);
  }
  
  function applyeditaction(action, prevaction, members) {
    if (!action || action === prevaction) return false;
    const cap = action.charAt(0).toUpperCase() + action.slice(1);
    if (members.length > 3) {
      openconfirm({
        title: cap + " " + members.length + " members?",
        body: "Setting this folder's action to " + action + " will " + action + " all " + members.length + " users already in it, in the background. You can cancel while it runs.",
        oklabel: cap + " all",
        onok: () => {tum.actions.enqueue(action, members.map(m => m.handle)); state.open = true; render()}
      });
      return true;
    } else if (members.length) {
      tum.actions.enqueue(action, members.map(m => m.handle));
    }
    return false;
  }
  function commitedit() {
    const fid = state.editing;
    const folder = fid && tum.folders.get(fid);
    if (!folder) return false;
    const patch = {
      name: (O.els.modalname.value || "").trim() || "unnamed",
      description: (O.els.modaldesc.value || "").trim(),
      icon: modalicon,
      action: modalaction,
      color: modalcolor
    };
    const changed = Object.keys(patch).some(key => folder[key] !== patch[key]);
    const prevaction = folder.action;
    const members = Array.isArray(folder.members) ? folder.members.slice() : [];
    if (changed) tum.folders.update(fid, patch);
    return changed && applyeditaction(modalaction, prevaction, members);
  }
  function refreshiconbtn() {
    O.els.modaliconbtn.innerHTML = iconhtml(modalicon) || ICONS[modalaction] || ICONS.folder;
    if (O.els.modaliconclear) O.els.modaliconclear.classList.toggle("tumshow", !!modalicon);
  }
  function selecticon(id) {
    modalicon = id;
    refreshiconbtn();
  }

  function opencreatemodal(opts) {
    opts = opts || {};
    state.editing = null;
    state.modalopen = true;
    state.open = true;

    state.pendingfoldercat = opts.cat ? {catid: opts.cat, cx: opts.cx, cy: opts.cy} : null;
    state.pendingpos = (typeof opts.x === "number" && typeof opts.y === "number") ? {x: opts.x, y: opts.y} : null;
    state.pendingoncreate = typeof opts.oncreate === "function" ? opts.oncreate : null;
   
    modalicon = "";

    O.els.modalname.value = opts.name || "";
    O.els.modaldesc.value = opts.description || "";
    O.els.modalsave.textContent = "Create";
    O.els.modalsave.hidden = false;

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
    O.els.modaldesc.value = f.description || "";
    O.els.modalsave.hidden = true;

    selectaction(f.action);
    selectcolor(f.color);

    O.els.modalactionsrow.style.display = "";
    showbackdrop();
    O.els.modal.classList.add("tumshow");
  }

  function closemodal() {
    const actionprompted = commitedit();
    O.els.modal.classList.remove("tumshow");
    tum.iconpicker.close();

    const pendinghandle = state.pendingcreate && state.pendingcreate.user && state.pendingcreate.user.handle;
    state.pendingcreate = null;
    state.pendingfoldercat = null;
    state.pendingpos = null;
    state.pendingoncreate = null;
    state.editing = null;
    state.modalopen = false;
    
    hidebackdrop();
    if (pendinghandle) {restorehidden(pendinghandle); render()}
    return actionprompted;
  }

  function savemodal() {
    const name = (O.els.modalname.value || "").trim() || "unnamed";
    const description = (O.els.modaldesc.value || "").trim();
    const icon = modalicon, action = modalaction, color = modalcolor;
    let filed = false;
    if (state.editing) {
      closemodal();
      return;
    } else {
      let fx, fy, fcat = null;
      if (state.pendingfoldercat) {
        const pc = O.categorydrop(null, state.pendingfoldercat.cx, state.pendingfoldercat.cy, 200, 288);
        fx = pc.x - 100; fy = pc.y - 144; fcat = pc.cat;
        state.pendingfoldercat = null;
      } else {
        let bx, by;
        if (state.pendingpos) {bx = state.pendingpos.x; by = state.pendingpos.y}
        else {let cc = null; try {cc = tum.overlay.canvascenter()} catch {} if (cc) {bx = cc.x - 100; by = cc.y - 144}}
        if (typeof bx === "number") {const spot = O.findfreespot(bx, by, 200, 288); fx = spot.x; fy = spot.y}
      }
      const folder = tum.folders.create({name, description, icon, action, color, x: fx, y: fy, cat: fcat});
      if (state.pendingcreate) {
        const {user, source} = state.pendingcreate;
        removefromsource(source, user.handle);
        tum.folders.addmember(folder.id, user);
        if (source.type !== "folder" && !user.skipaction) tum.actions.run(folder.action, user);
        filed = true;
      }
      if (state.pendingoncreate) {const cb = state.pendingoncreate; setTimeout(() => {try {cb(folder)} catch {}}, 0)}
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
    state.confirmalternate = typeof opts.onalternate === "function" ? opts.onalternate : null;
    state.confirmcancel = typeof opts.oncancel === "function" ? opts.oncancel : null;
    O.els.confirmtitle.textContent = opts.title || "Are you sure?";
    O.els.confirmbody.textContent = opts.body || "";
    O.els.confirmok.textContent = opts.oklabel || "Confirm";
    O.els.confirmsecondary.textContent = opts.altlabel || "";
    O.els.confirmsecondary.hidden = !state.confirmalternate;
    O.els.confirmcancel.textContent = opts.cancellabel || "Cancel";
    showbackdrop();
    O.els.confirmsheet.classList.add("tumshow");
  }

  function confirmfolderdelete(folder) {
    const members = Array.isArray(folder.members) ? folder.members : [];
    const always = !!(tum.settings && tum.settings.get("confirmdelete"));
    if (members.length <= 1 && !always) {tum.folders.remove(folder.id); return}
    const id = folder.id;
    const memtext = members.length ? " and its " + members.length + " member" + (members.length > 1 ? "s" : "") : "";
    openconfirm({
      title: "Delete " + folder.name + "?",
      body: `This removes the folder${memtext}, this cannot be undone.` + (members.length ? " Note that actions done to users will stay active!" : ""),
      oklabel: "Delete",
      onok: () => tum.folders.remove(id)
    });
  }

  function confirmcategorydelete(c) {
    const empty = !tum.folders.list().some(f => f.cat === c.id) && !tum.unsorted.list().some(u => u.cat === c.id);
    if (empty) {tum.categories.remove(c.id); return}
    openconfirm({
      title: "Delete category?",
      body: "This removes the \"" + (c.name || "Edit Me...") + "\" category outline. The folders and users will stay where they were.",
      oklabel: "Delete",
      onok: () => tum.categories.remove(c.id)
    });
  }

  function closeconfirmsheet(cancelled = true) {
    const oncancel = state.confirmcancel;
    O.els.confirmsheet.classList.remove("tumshow");
    state.confirmopen = false;
    state.confirmaction = null;
    state.confirmalternate = null;
    state.confirmcancel = null;
    hidebackdrop();
    if (cancelled && oncancel) oncancel();
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
    if (item.type === "section") {
      const section = el("div", "tumctxsection");
      const label = el("div", "tumctxsectionlabel");
      label.textContent = item.label;
      const link = el("a", "tumctxlink");
      link.href = item.href;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.textContent = item.href;
      link.addEventListener("click", e => e.stopPropagation());
      section.append(label, link);
      return section;
    }
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

  function newuser(target) {
    if (tum.newuser) {closeoverlay(); tum.newuser.start(target || {type: "canvas"})}
    else toast("Adding users from search is coming soon");
  }
  function replaceuser(info) {
    const old = info.m;
    const target = info.source.type === "folder" ? {type: "folder", id: info.source.id, replace: info} : {type: "canvas", cx: old.x, cy: old.y, cat: old.cat, replace: info};
    newuser(target);
  }
  function openavatar(user) {
    const url = fullavatarurl(user.avatarurl);
    if (url) window.open(url, "_blank", "noopener");
  }

  function oncontextmenu(e) {
    if (!O.root.classList.contains("tumactive") || state.drag) return;
    if (e.target.closest("input, textarea")) return;
    if (e.target.closest(".tummodalcard, .tumreasoncard, .tumconfirmcard, .tumiconpicker")) return;
    if (e.target.closest(".tumtools, .tumtoolsright, .tumminimap, .tumjumplist")) return;

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
        ...(isunfindable(info.m) ? [{label: T("menu.replace"), icon: ICONS.profile, onclick: () => replaceuser(info)}] : [{label: T("menu.openprofile"), icon: ICONS.profile, onclick: () => O.openprofile(info.source, info.m)}]),
        {label: T("menu.openavatar"), icon: ICONS.profile, onclick: () => openavatar(info.m)},
        {label: info.m.reason ? T("menu.editnote") : T("menu.customnote"), icon: ICONS.pencil, onclick: () => {O.openreasonview(info.source, info.m); O.setreasonmode("edit")}},
        {label: T("menu.delete"), icon: ICONS.trash, danger: true, onclick: () => {removefromsource(info.source, info.m.handle); state.open = true; render()}}
      ];
    } else if (foldernode) {
      const f = tum.folders.get(foldernode.dataset.id);
      if (!f) {closectx(); return}
      const knownshare = shareurl(f);
      const published = knownshare && f.sharedpublished !== false;
      items = [
        {label: f.collapsed ? T("menu.expand") : T("menu.collapse"), icon: ICONS.chevron, onclick: () => O.toggledcollapse(f.id)},
        {label: T("menu.edit"), icon: ICONS.pencil, onclick: () => openeditmodal(f)},
        {label: T("menu.newuser"), icon: ICONS.plus, onclick: () => newuser({type: "folder", id: f.id})},
        {label: T("menu.export"), icon: ICONS.download, onclick: () => exportfolder(f)},
        ...(f.action && !knownshare ? [{label: T("menu.share"), icon: ICONS.upload, onclick: () => sharefolder(f)}] : []),
        {label: T("menu.delete"), icon: ICONS.trash, danger: true, onclick: () => confirmfolderdelete(f)},
        ...(knownshare ? [
          {type: "section", label: T("menu.sharedlist"), href: knownshare},
          ...(!published ? [{label: T("menu.republish"), icon: ICONS.upload, onclick: () => sharefolder(f)}] : []),
          ...(published ? [
            {label: T("menu.syncshare"), icon: ICONS.upload, onclick: () => sharefolder(f, true)},
            {label: T("menu.unpublish"), icon: ICONS.trash, danger: true, onclick: () => unsharefolder(f)}
          ] : [])
        ] : [])
      ];
    } else if (catnode) {
      const cid = catnode.dataset.id;
      const c = tum.categories.get(cid);
      if (!c) {closectx(); return}
      const {clientX, clientY} = e;
      items = [
        {label: T("menu.rename"), icon: ICONS.pencil, onclick: () => O.renamecategory(cid)},
        {label: T("menu.delete"), icon: ICONS.trash, danger: true, onclick: () => confirmcategorydelete(c)},
        {label: T("menu.newuser"), icon: ICONS.plus, onclick: () => newuser({type: "category", id: cid, cx: (clientX - O.pan.x) / O.zoom(), cy: (clientY - O.pan.y) / O.zoom()})},
        {label: T("menu.newfolder"), icon: ICONS.folder, onclick: () => opencreatemodal({cat: cid, cx: (clientX - O.pan.x) / O.zoom(), cy: (clientY - O.pan.y) / O.zoom()})}
      ];
    } else {
      const {clientX, clientY} = e;
      items = [
        {label: T("menu.newuser"), icon: ICONS.plus, onclick: () => newuser({type: "canvas", cx: (clientX - O.pan.x) / O.zoom(), cy: (clientY - O.pan.y) / O.zoom()})},
        {label: T("menu.newfolder"), icon: ICONS.folder, onclick: () => opencreatemodal()},
        {label: T("menu.newcategory"), icon: ICONS.category, onclick: () => O.newcategory(clientX, clientY)},
        {label: T("menu.import"), icon: ICONS.upload, onclick: () => importdata()}
      ];
    }
    openctx(e.clientX, e.clientY, items);
  }

  /*//////////////////////////////////////////////////////////////////////*/

  Object.assign(O, {launchdestroyer, exportdata, importdata, exportfolder, sharefolder, unsharefolder, openconfirm,
    oncontextmenu, closectx, ctxopen, newuser,
    opencreatemodal, openeditmodal, closemodal, savemodal,
    selectcolor, selectaction, toggleaction, refreshiconbtn, selecticon, selectreasonaction, togglereasonaction,
    setreasonmode, openreasonedit, openreasonview, closereasonmodal, savereason, deletenoteduser, confirmfolderdelete, confirmcategorydelete, closeconfirmsheet});
})();

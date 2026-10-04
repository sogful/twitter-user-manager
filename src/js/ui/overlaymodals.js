(function () {
  "use strict";

  const O = window.tum._ov;
  const {el, escapehtml, linkify, iconhtml, avatarurl, ICONS, state, render, showbackdrop, hidebackdrop, closeoverlay, toast, restorehidden, removefromsource} = O;
  const T = (...a) => tum.strings.t(...a);
  const actionlabel = action => T("action.label." + action);

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
  const fnsafe = (s, fallback = "folder") => {let o = ""; for (const ch of (s || "")) o += (FWMAP[ch] || ch); return o.replace(/[. ]+$/, "").trim() || fallback};
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
  function stamp() {
    const date = new Date();
    const part = value => String(value).padStart(2, "0");
    return part(date.getMonth() + 1) + "-" + part(date.getDate()) + "-" + String(date.getFullYear()).slice(-2);
  }
  function exportfilename(type, title, fallback) {return type + " " + stamp() + " (＂" + fnsafe(title, fallback) + "＂).json"}
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
    for (const key of ["handle", "displayname", "reason", "sourceurl", "userid", "createdat", "followers", "following", "tweets", "mediatweets", "favorites", "highlights", "verifiedtype", "translatortype", "blueverified", "unfindable"]) {
      if (member[key] !== undefined && member[key] !== null && member[key] !== "") out[key] = key === "createdat" ? compactdate(member[key]) : member[key];
    }
    if (member.avatarurl) out.avatarurl = compactavatar(member.avatarurl);
    const badges = (Array.isArray(member.badges) ? member.badges : []).flatMap(badge => {
      if (typeof badge === "string" && /^(verified|blue|verifiedbusiness|verifiedgovernment|translator|translatormod|protected)$/.test(badge)) return [badge];
      if (badge && badge.type === "affiliation" && /^[A-Za-z0-9_]+$/.test(badge.handle || "")) return [{type: "affiliation", handle: badge.handle, avatarurl: compactavatar(badge.avatarurl) || null}];
      return [];
    });
    if (member.protected) badges.push("protected");
    if (badges.length) out.badges = [...new Set(badges)];
    return out;
  }

  function exportfolderdata(folder) {
    return {
      id: folder.id, name: folder.name, action: folder.action, color: folder.color,
      description: folder.description || "", icon: exporticon(folder.icon), sort: folder.sort,
      badgefilters: [...new Set((Array.isArray(folder.badgefilters) ? folder.badgefilters : []).filter(type => /^(verified|blue|verifiedbusiness|verifiedgovernment|protected|affiliated|translator|translatormod)$/.test(type)))],
      collapsed: !!folder.collapsed, cat: folder.cat || null,
      twitterlist: folder.twitterlist || null,
      members: (folder.members || []).map(exportmember)
    };
  }

  function exportcategory(category) {return {id: category.id, name: category.name, w: category.w, h: category.h}}

  function exportcategorydata(category) {
    return {
      category: exportcategory(category),
      folders: tum.folders.list().filter(folder => folder.cat === category.id).map(exportfolderdata),
      unsorted: tum.unsorted.list().filter(member => member.cat === category.id).map(exportloosemember)
    };
  }

  function exportloosemember(member) {return Object.assign(exportmember(member), {cat: member.cat || null, placed: member.placed !== false})}

  function exportdata() {
    downloadjson({version: 2, folders: tum.folders.list().map(exportfolderdata), categories: tum.categories.list().map(exportcategory), unsorted: tum.unsorted.list().map(exportloosemember)}, "tumprofile " + stamp() + " (＠" + ownhandle() + ").json");
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

  function profilesnapshot() {
    return JSON.parse(JSON.stringify({
      categories: tum.categories.list(),
      folders: tum.folders.list(),
      unsorted: tum.unsorted.list()
    }));
  }
  function restoreprofile(snapshot) {
    tum.categories.import(snapshot.categories, true);
    tum.folders.import(snapshot.folders, true);
    tum.unsorted.import(snapshot.unsorted, true);
    state.open = true;
    O.clearselection();
    render();
  }

  function importprofile(data, replace) {
    const previous = profilesnapshot();
    const sourcefolders = Array.isArray(data && data.folders) ? data.folders.filter(folder => folder && typeof folder === "object") : [];
    const sourcecategories = Array.isArray(data && data.categories) ? data.categories.filter(category => category && typeof category === "object") : [];
    const sourceunsorted = Array.isArray(data && data.unsorted) ? data.unsorted.filter(member => member && member.handle) : [];
    const categoryids = new Set(replace ? [] : tum.categories.list().map(category => category.id));
    const categorymap = new Map(), categorylayouts = new Map(), categoryslots = new Map(), categorysourceids = new Map();
    const categories = sourcecategories.map((category, index) => {
      const id = category.id && !categoryids.has(category.id) ? category.id : "cimport" + Date.now().toString(36) + index.toString(36);
      categoryids.add(id);
      categorymap.set(category.id, id);
      const hasposition = typeof category.x === "number" && typeof category.y === "number";
      const x = hasposition ? category.x : 60 + (index % 3) * 540;
      const y = hasposition ? category.y : 80 + Math.floor(index / 3) * 920;
      const layout = Object.assign({}, category, {id, x, y, w: category.w || 480, h: category.h || 360});
      categorylayouts.set(category.id, layout);
      categorysourceids.set(id, category.id);
      return layout;
    });
    for (const category of categories) {
      const count = sourcefolders.filter(folder => folder.cat === categorysourceids.get(category.id)).length;
      const columns = Math.max(1, Math.floor((category.w - 4) / 200));
      category.h = Math.max(category.h, 4 + Math.ceil(count / columns) * 288);
    }
    const autolayout = (item, index, loose) => {
      if (typeof item.x === "number" && typeof item.y === "number") return importposition(item, index);
      const category = categorylayouts.get(item.cat);
      if (!category) return importposition(item, index);
      const slot = categoryslots.get(item.cat) || 0;
      categoryslots.set(item.cat, slot + 1);
      const columns = Math.max(1, Math.floor((category.w - 4) / 200));
      const x = category.x + 2 + (slot % columns) * 200;
      const y = category.y + 2 + Math.floor(slot / columns) * (loose ? 62 : 288);
      return loose ? {x: x + 75, y: y + 29} : {x, y};
    };
    const folders = sourcefolders.map((folder, index) => Object.assign({}, folder, autolayout(folder, index, false), {cat: categorymap.get(folder.cat) || null}));
    const unsorted = sourceunsorted.map((member, index) => Object.assign({}, member, autolayout(member, index, true), {cat: categorymap.get(member.cat) || null}));
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
    O.clearselection();
    render();
    toast(T("toast.imported.all", folders.length, unsorted.length), {
      label: T("action.undo"),
      onclick: () => restoreprofile(previous)
    });
  }

  function applyimport(data) {
    if (data && data.folder && !Array.isArray(data.folders)) {finishfolderimport(data.folder); return}
    if (data && data.category && !Array.isArray(data.categories)) {
      data = Object.assign({}, data, {categories: [data.category]});
    }
    const folders = Array.isArray(data && data.folders) ? data.folders : [];
    const categories = Array.isArray(data && data.categories) ? data.categories : [];
    const unsorted = Array.isArray(data && data.unsorted) ? data.unsorted : [];
    if (!folders.length && !categories.length && !unsorted.length) {toast(T("toast.import.failed")); return}
    openconfirm({
      title: T("confirm.importprofile.title"),
      body: T("confirm.importprofile.body"),
      oklabel: T("confirm.importprofile.replace"),
      altlabel: T("confirm.importprofile.add"),
      cancellabel: T("common.cancel"),
      onok: () => importprofile(data, true),
      onalternate: () => importprofile(data, false)
    });
  }

  /*//////////////////////////////////////////////////////////////////////*/

  function exportfolder(f) {
    downloadjson({folder: exportfolderdata(f)}, exportfilename("tumfolder", f.name, "folder"));
    toast(T("toast.exported.folder", f.name));
  }
  function exportcategoryfile(category) {
    downloadjson(exportcategorydata(category), exportfilename("tumcategory", category.name, "category"));
    toast(T("toast.exported.category", category.name));
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
      toast(dupes ? T("folder.import.added.dupes", added, folder.name, dupes) : T("folder.import.added", added, folder.name), {
        label: T("action.undo"),
        onclick: () => {for (const member of add) tum.folders.removemember(folder.id, member.handle)}
      });
    });
  }
  function finishfolderimport(f) {
    const members = (Array.isArray(f.members) ? f.members : []).filter(m => m && m.handle);
    const doimport = () => {
      const created = tum.folders.create({id: f.id, name: f.name, action: f.action, color: f.color, description: f.description, icon: importicon(f.icon)});
      tum.folders.addmembers(created.id, members);
      state.open = true;
      render();
      toast(T("toast.imported.folder", created.name, members.length), f.action ? null : {
        label: T("action.undo"),
        onclick: () => tum.folders.remove(created.id)
      });
    };
    if (f.action && members.length) {
      const cap = actionlabel(f.action);
      openconfirm({
        title: T("confirm.import.title", f.action),
        body: T("confirm.import.body", f.action, f.action, members.length),
        oklabel: T("action.confirm.ok", cap),
        positive: f.action === "follow",
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
    const cap = actionlabel(action);
    if (members.length > 3) {
      openconfirm({
        title: T("confirm.action.folder.title", cap, members.length),
        body: T("confirm.action.folder.body", T("action.verb." + action), T("action.verb." + action), members.length),
        oklabel: T("action.confirm.ok", cap),
        positive: action === "follow",
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
    O.els.modalsave.textContent = T("folder.create");
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
    let createdfolder = null;
    if (state.editing) {
      closemodal();
      return;
    } else {
      let fx, fy, fcat = null;
      if (state.pendingfoldercat) {
        const pc = O.categorydrop(null, state.pendingfoldercat.cx, state.pendingfoldercat.cy, 200, 288);
        const spot = O.findfreespot(pc.x - 100, pc.y - 144, 200, 288);
        fx = spot.x; fy = spot.y; fcat = spot.cat;
        state.pendingfoldercat = null;
      } else {
        let bx, by;
        if (state.pendingpos) {bx = state.pendingpos.x; by = state.pendingpos.y}
        else {let cc = null; try {cc = tum.overlay.canvascenter()} catch {} if (cc) {bx = cc.x - 100; by = cc.y - 144}}
        if (typeof bx === "number") {const spot = O.findfreespot(bx, by, 200, 288); fx = spot.x; fy = spot.y; fcat = spot.cat}
      }
      const folder = createdfolder = tum.folders.create({name, description, icon, action, color, x: fx, y: fy, cat: fcat});
      if (state.pendingcreate) {
        const {user, source} = state.pendingcreate;
        removefromsource(source, user.handle);
        tum.folders.addmember(folder.id, user);
        const actionhappened = !!(source.type !== "folder" && folder.action && !user.skipaction);
        if (actionhappened) tum.actions.run(folder.action, user);
        O.notifyfolderadd(folder, user, actionhappened, () => {
          tum.folders.removemember(folder.id, user.handle);
          if (source.type === "folder") tum.folders.addmember(source.id, user);
          else if (source.type === "unsorted") tum.unsorted.add(user, user.x, user.y);
          else if (source.type === "page") restorehidden(user.handle);
          state.open = true;
          render();
        });
        filed = true;
      }
      if (state.pendingoncreate) {const cb = state.pendingoncreate; setTimeout(() => {try {cb(folder)} catch {}}, 0)}
    }
    closemodal();
    if (filed && !O.keepopen()) closeoverlay();
    state.open = true;
    render();
    O.focusfolder(createdfolder);
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
    O.els.reasontitle.textContent = T("confirm.note.title", user.handle);
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
    O.els.reasontitle.textContent = T("confirm.note.title", m.handle);
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
    O.els.confirmtitle.textContent = opts.title || T("confirm.default.title");
    O.els.confirmbody.textContent = opts.body || "";
    O.els.confirmok.textContent = opts.oklabel || T("confirm.default.ok");
    O.els.confirmok.classList.toggle("tumconfirmpositive", opts.positive === true);
    O.els.confirmsecondary.textContent = opts.altlabel || "";
    O.els.confirmsecondary.hidden = !state.confirmalternate;
    O.els.confirmcancel.textContent = opts.cancellabel || T("pick.cancel");
    showbackdrop();
    O.els.confirmsheet.classList.add("tumshow");
  }

  function confirmfolderdelete(folder) {
    const members = Array.isArray(folder.members) ? folder.members : [];
    const always = !!(tum.settings && tum.settings.get("confirmdelete"));
    if (members.length <= 1 && !always) {tum.folders.remove(folder.id); return}
    const id = folder.id;
    const memtext = members.length ? T(members.length === 1 ? "confirm.folder.member.one" : "confirm.folder.member.many", members.length) : "";
    openconfirm({
      title: T("confirm.folder.delete.title", folder.name),
      body: !members.length ? T("confirm.folder.delete.empty") : T(folder.action ? "confirm.folder.delete.members.action" : "confirm.folder.delete.members", memtext),
      oklabel: T("overlay.delete"),
      onok: () => tum.folders.remove(id)
    });
  }

  function confirmcategorydelete(c) {
    const empty = !tum.folders.list().some(f => f.cat === c.id) && !tum.unsorted.list().some(u => u.cat === c.id);
    if (empty) {tum.categories.remove(c.id); return}
    openconfirm({
      title: T("confirm.category.delete.title"),
      body: T("confirm.category.delete.body", c.name || T("confirm.category.default")),
      oklabel: T("overlay.delete"),
      onok: () => tum.categories.remove(c.id)
    });
  }
  function uploadfolderlist(folder) {
    const members = Array.isArray(folder && folder.members) ? folder.members : [];
    if (!members.length) {toast(T("toast.twlist.empty")); return}
    openconfirm({
      title: T("confirm.twlist.title", folder.name || T("folder.unnamed")),
      body: T("confirm.twlist.body", folder.name || T("folder.unnamed"), members.length),
      oklabel: T("confirm.twlist.ok"),
      positive: true,
      onok: async () => {
        if (!tum.lists || typeof tum.lists.uploadfolder !== "function") {toast(T("toast.twlist.failed")); return}
        try {
          await tum.lists.uploadfolder(folder, {
            onstart: () => closeoverlay(),
            oncreated: result => {
              tum.folders.update(folder.id, {twitterlist: {id: result.id, private: true}});
              try {
                history.pushState({}, "", "/i/lists/" + encodeURIComponent(result.id));
                window.dispatchEvent(new PopStateEvent("popstate"));
              } catch {}
            }
          });
        } catch (error) {
          if (!error || !error.batchshown) toast(error && error.message === "busy" ? T("toast.twlist.busy") : T("toast.twlist.failed"));
        }
      }
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

  let mergepicker = null;

  function closemergepicker() {
    if (!mergepicker) return;
    mergepicker.remove();
    mergepicker = null;
    state.mergeopen = false;
  }

  function openmergepicker(source) {
    if (!source || !tum.folders.get(source.id)) return;
    closemergepicker();
    state.mergeopen = true;
    state.open = true;
    showbackdrop();

    const shade = el("div", "tummergeshade");
    const card = el("div", "tumjumplist tummergefoldersearch");
    const search = el("input", "tumjumpsearch");
    const rows = el("div", "tumjumprows");
    card.setAttribute("role", "dialog");
    card.setAttribute("aria-label", T("folder.merge.title", source.name || T("folder.unnamed")));
    search.type = "search";
    search.placeholder = T("folder.merge.search");

    const build = () => {
      const query = search.value.trim().toLowerCase();
      const targets = tum.folders.list().filter(folder => {
        if (folder.id === source.id) return false;
        const text = ((folder.name || "") + " " + (folder.description || "")).toLowerCase();
        return !query || text.includes(query);
      }).sort((a, b) => (a.name || "").localeCompare(b.name || ""));
      rows.replaceChildren();
      const rowheight = 29;
      const maxrows = Math.max(1, Math.floor((window.innerHeight - 90) / rowheight));
      const columns = Math.max(2, Math.ceil(targets.length / maxrows));
      card.style.setProperty("--tummergecolumns", String(columns));
      card.style.width = Math.min(window.innerWidth - 32, columns * 190 + 16) + "px";
      if (!targets.length) {
        const empty = el("div", "tummergeempty");
        empty.textContent = T("folder.merge.empty");
        rows.appendChild(empty);
        return;
      }
      for (const target of targets) {
        const row = el("button", "tumjumprow");
        const dot = el("span", "tumjumpdot");
        const name = el("span", "tumjumpname");
        const count = el("span", "tumjumpcount");
        row.type = "button";
        dot.style.background = target.color || "#1d9bf0";
        name.textContent = target.name || T("folder.unnamed");
        count.textContent = String((target.members || []).length);
        row.append(dot, name, count);
        row.addEventListener("click", event => {
          event.preventDefault();
          event.stopPropagation();
          closemergepicker();
          O.mergefolders(source.id, target.id);
        });
        rows.appendChild(row);
      }
    };

    search.addEventListener("input", build);
    search.addEventListener("keydown", event => event.stopPropagation());
    shade.addEventListener("pointerdown", event => {if (event.target === shade) closemergepicker()});
    card.addEventListener("pointerdown", event => event.stopPropagation());
    card.append(search, rows);
    shade.appendChild(card);
    O.root.appendChild(shade);
    mergepicker = shade;
    build();
    requestAnimationFrame(() => search.focus());
  }

  /*//////////////////////////////////////////////////////////////////////*/

  Object.assign(O, {launchdestroyer, exportdata, importdata, exportfolder, exportcategoryfile, sharefolder, unsharefolder, openconfirm,
    shareurl, uploadfolderlist,
    opencreatemodal, openeditmodal, closemodal, savemodal,
    openmergepicker, closemergepicker,
    selectcolor, selectaction, toggleaction, refreshiconbtn, selecticon, selectreasonaction, togglereasonaction,
    setreasonmode, openreasonedit, openreasonview, closereasonmodal, savereason, deletenoteduser, confirmfolderdelete, confirmcategorydelete, closeconfirmsheet});
})();

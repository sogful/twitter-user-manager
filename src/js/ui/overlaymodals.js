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
    const source = JSON.stringify(data, null, 2);
    const contents = tum.settings && tum.settings.get("minifyexports") ? JSONC.minify(source) : source;
    const blob = new Blob([contents], {type: "application/json"});
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
    for (const key of ["handle", "displayname", "reason", "sourceurl", "userid", "createdat", "followers", "following", "tweets", "mediatweets", "favorites", "highlights", "verifiedtype", "verificationkind", "translatortype", "blueverified", "affiliateverified", "unfindable"]) {
      if (member[key] !== undefined && member[key] !== null && member[key] !== "") out[key] = key === "createdat" ? compactdate(member[key]) : member[key];
    }
    if (member.avatarurl) out.avatarurl = compactavatar(member.avatarurl);
    const badges = (Array.isArray(member.badges) ? member.badges : []).flatMap(badge => {
      if (typeof badge === "string" && /^(verified|blue|verifiedbusiness|verifiedgovernment|verifiedaffiliate|translator|translatorunbadged|translatormod|protected)$/.test(badge)) return [badge];
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
      description: folder.description || "", icon: exporticon(folder.icon),
      scalex: folder.scalex || 1, scaley: folder.scaley || 1,
      cat: folder.cat || null,
      downloadedlist: folder.downloadedlist || null,
      members: (folder.members || []).map(exportmember)
    };
  }

  function exportcategory(category) {return {id: category.id, name: category.name, w: category.w, h: category.h, downloadedlist: category.downloadedlist || null}}

  function exportcategorydata(category) {
    return {
      category: exportcategory(category),
      folders: tum.folders.list().filter(folder => folder.cat === category.id).map(exportfolderdata),
      unsorted: tum.unsorted.list().filter(member => member.cat === category.id).map(member => Object.assign(exportloosemember(member), {downloadedlistid: member.downloadedlistid || null}))
    };
  }

  function exportloosemember(member) {return Object.assign(exportmember(member), {cat: member.cat || null, placed: member.placed !== false, downloadedlistid: member.downloadedlistid || null})}

  function exportdata() {
    downloadjson({version: 3, folders: tum.folders.list().map(exportfolderdata), categories: tum.categories.list().map(exportcategory), unsorted: tum.unsorted.list().map(exportloosemember)}, "tumprofile " + stamp() + " (＠" + ownhandle() + ").json");
    toast(T("toast.exported.folders", tum.folders.list().length));
  }
  function importdata() {pickjson(applyimport)}

  function placeimportmodules(categories, sourcefolders, sourceunsorted, sourcecategoryids, replace) {
    const modules = [];
    for (const category of categories) modules.push({type: "category", item: category, width: category.w, height: category.h});
    for (const folder of sourcefolders) if (!sourcecategoryids.has(folder.cat)) {
      const scalex = Math.max(0.5, Math.min(2, Number(folder.scalex) || 1));
      const scaley = Math.max(0.5, Math.min(2, Number(folder.scaley) || 1));
      modules.push({type: "folder", item: folder, width: 200 * scalex, height: 288 * scaley});
    }
    for (const member of sourceunsorted) if (!sourcecategoryids.has(member.cat)) modules.push({type: "member", item: member, width: 150, height: 58});
    if (!modules.length) return {folderpositions: new Map(), memberpositions: new Map()};
    const columns = Math.ceil(Math.sqrt(modules.length));
    const rows = Math.ceil(modules.length / columns);
    const columnwidths = Array(columns).fill(0), rowheights = Array(rows).fill(0);
    for (let index = 0; index < modules.length; index++) {
      const module = modules[index];
      columnwidths[index % columns] = Math.max(columnwidths[index % columns], module.width);
      rowheights[Math.floor(index / columns)] = Math.max(rowheights[Math.floor(index / columns)], module.height);
    }
    const gap = 80;
    const totalwidth = columnwidths.reduce((total, width) => total + width, 0) + gap * (columns - 1);
    const totalheight = rowheights.reduce((total, height) => total + height, 0) + gap * (rows - 1);
    const center = tum.overlay.canvascenter();
    const folderpositions = new Map(), memberpositions = new Map();
    const nooverlap = !replace && tum.settings && tum.settings.get("nooverlap");
    const columnleft = [], rowtop = [];
    let offset = center.x - totalwidth / 2;
    for (const width of columnwidths) {columnleft.push(offset); offset += width + gap}
    offset = center.y - totalheight / 2;
    for (const height of rowheights) {rowtop.push(offset); offset += height + gap}
    for (let index = 0; index < modules.length; index++) {
      const module = modules[index];
      const column = index % columns, row = Math.floor(index / columns);
      let x = columnleft[column] + (columnwidths[column] - module.width) / 2;
      let y = rowtop[row] + (rowheights[row] - module.height) / 2;
      if (module.type === "category") {
        if (nooverlap && O.nooverlapcategorybox) {
          const adjusted = O.nooverlapcategorybox(x, y, module.width, module.height);
          x = adjusted.left; y = adjusted.top;
        }
        module.item.x = Math.round(x); module.item.y = Math.round(y);
      } else if (module.type === "folder") {
        if (nooverlap && O.nooverlapadjustbox) {
          const adjusted = O.nooverlapadjustbox(x, y, module.width, module.height);
          x = adjusted.left; y = adjusted.top;
        }
        folderpositions.set(module.item, {x: Math.round(x), y: Math.round(y)});
      } else {
        if (nooverlap && O.nooverlapadjustbox) {
          const adjusted = O.nooverlapadjustbox(x, y, module.width, module.height);
          x = adjusted.left; y = adjusted.top;
        }
        memberpositions.set(module.item, {x: Math.round(x + module.width / 2), y: Math.round(y + module.height / 2)});
      }
    }
    return {folderpositions, memberpositions};
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
    const sourcefolders = Array.isArray(data && data.folders) ? data.folders.filter(folder => folder && typeof folder === "object").map(folder => {
      const item = {...folder};
      for (const key of ["x", "y", "badgefilters", "sort", "twitterlist"]) delete item[key];
      return item;
    }) : [];
    const sourcecategories = Array.isArray(data && data.categories) ? data.categories.filter(category => category && typeof category === "object").map(category => {
      const item = {...category};
      delete item.x; delete item.y;
      return item;
    }) : [];
    const sourceunsorted = Array.isArray(data && data.unsorted) ? data.unsorted.filter(member => member && member.handle).map(member => {
      const item = {...member};
      delete item.x; delete item.y;
      return item;
    }) : [];
    const categoryids = new Set(replace ? [] : tum.categories.list().map(category => category.id));
    const categorymap = new Map(), categorylayouts = new Map(), categoryslots = new Map(), categorysourceids = new Map();
    const sourcecategoryids = new Set(sourcecategories.map(category => category.id));
    const categories = sourcecategories.map((category, index) => {
      const id = category.id && !categoryids.has(category.id) ? category.id : "cimport" + Date.now().toString(36) + index.toString(36);
      categoryids.add(id);
      categorymap.set(category.id, id);
      const width = typeof category.w === "number" && Number.isFinite(category.w) && category.w > 0 ? category.w : 480;
      const height = typeof category.h === "number" && Number.isFinite(category.h) && category.h > 0 ? category.h : 360;
      const layout = Object.assign({}, category, {id, x: 0, y: 0, w: width, h: height});
      categorylayouts.set(category.id, layout);
      categorysourceids.set(id, category.id);
      return layout;
    });
    if (!(data && data.version >= 3)) {
      for (const category of categories) {
        const count = sourcefolders.filter(folder => folder.cat === categorysourceids.get(category.id)).length;
        const columns = Math.max(1, Math.floor((category.w - 4) / 200));
        category.h = Math.max(category.h, 4 + Math.ceil(count / columns) * 288);
      }
    }
    const positions = placeimportmodules(categories, sourcefolders, sourceunsorted, sourcecategoryids, replace);
    const autolayout = (item, index, loose) => {
      const category = categorylayouts.get(item.cat);
      if (!category) return (loose ? positions.memberpositions : positions.folderpositions).get(item) || tum.overlay.canvascenter();
      const slot = categoryslots.get(item.cat) || 0;
      categoryslots.set(item.cat, slot + 1);
      const width = loose ? 150 : 200 * (item.scalex || 1);
      const height = loose ? 62 : 288 * (item.scaley || 1);
      const columns = Math.max(1, Math.floor((category.w - 4) / width));
      const x = category.x + 2 + (slot % columns) * width;
      const y = category.y + 2 + Math.floor(slot / columns) * height;
      return loose ? {x: x + 75, y: y + 29} : {x, y};
    };
    const folders = sourcefolders.map((folder, index) => Object.assign({}, folder, autolayout(folder, index, false), {cat: categorymap.get(folder.cat) || null}));
    const unsorted = sourceunsorted.map((member, index) => Object.assign({}, member, autolayout(member, index, true), {cat: categorymap.get(member.cat) || null}));
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
  function downloadedmeta(value) {
    if (!value || typeof value !== "object" || !validshareid(value.id) || !["folder", "category"].includes(value.type)) return null;
    const result = {id: value.id, type: value.type, autosync: value.autosync === true};
    if (typeof value.folderid === "string" && /^[A-Za-z0-9_-]{1,80}$/.test(value.folderid)) result.folderid = value.folderid;
    if (Number.isFinite(value.lastsync)) result.lastsync = value.lastsync;
    return result;
  }
  async function collisionenabled() {
    if (tum.settings && typeof tum.settings.get === "function") return !!tum.settings.get("nooverlap");
    try {return !!(await tum.storage.create("tum.settings", {global: true}).get())?.nooverlap} catch {return false}
  }
  const shareurl = f => hasshare(f) ? "https://list.coolsite.cv/" + f.sharedid : "";
  function opensharetab(url) {
    try {
      chrome.runtime.sendMessage({type: "tumopenshare", url}, response => {
        if (chrome.runtime.lastError || !response || !response.ok) window.open(url, "_blank", "noopener,noreferrer");
      });
    } catch {window.open(url, "_blank", "noopener,noreferrer")}
  }

  function sharefolderdata(folder) {
    return Object.assign(exportfolderdata(folder), {x: folder.x, y: folder.y});
  }
  function sharecategorydata(category) {
    return {
      id: category.id, name: category.name, x: category.x, y: category.y, w: category.w, h: category.h,
      folders: tum.folders.list().filter(folder => folder.cat === category.id).map(sharefolderdata),
      unsorted: tum.unsorted.list().filter(member => member.cat === category.id).map(member => Object.assign(exportloosemember(member), {x: member.x, y: member.y}))
    };
  }
  async function shareentry(item, type, sync = false, open = true) {
    const managed = hasshare(item);
    const id = managed ? item.sharedid : "";
    const headers = {"content-type": "application/json"};
    if (managed) headers["x-list-key"] = item.sharedkey;
    const payload = type === "category"
      ? {type, category: sharecategorydata(item)}
      : {type, folder: sharefolderdata(item)};
    let response, data;
    try {
      response = await fetch(shareendpoint + (id ? "/" + id : ""), {method: id ? "PUT" : "POST", headers, body: JSON.stringify(payload)});
      data = await response.json();
    } catch {toast(sync ? T("toast.share.syncfailed") : T("toast.share.failed")); return}
    if (!response.ok || !data || !data.url) {toast(data && data.error || (sync ? T("toast.share.syncfailed") : T("toast.share.failed"))); return}
    const patch = {sharedid: data.id, sharedkey: data.key || item.sharedkey, sharedpublished: true};
    if (type === "category") tum.categories.update(item.id, patch);
    else tum.folders.update(item.id, patch);
    if (sync) toast(T("toast.share.synced"));
    else if (open) opensharetab(data.url);
    return data.url;
  }

  function sharefolder(folder, sync = false, open = true) {return shareentry(folder, "folder", sync, open)}
  function sharecategory(category, sync = false, open = true) {return shareentry(category, "category", sync, open)}

  async function unshareentry(item, type) {
    if (!hasshare(item)) return;
    let response;
    try {response = await fetch(shareendpoint + "/" + item.sharedid, {method: "DELETE", headers: {"x-list-key": item.sharedkey}})}
    catch {toast(T("toast.share.unpublishfailed")); return}
    if (!response.ok) {toast(T("toast.share.unpublishfailed")); return}
    const patch = {sharedid: "", sharedkey: "", sharedpublished: true};
    if (type === "category") tum.categories.update(item.id, patch);
    else tum.folders.update(item.id, patch);
    toast(T("toast.share.unpublished"));
  }
  function unsharefolder(folder) {return unshareentry(folder, "folder")}
  function unsharecategory(category) {return unshareentry(category, "category")}

  async function importsharedentry(data) {
    await tum.storage.accountready;
    await Promise.all([tum.folders.whenready(), tum.categories.whenready(), tum.unsorted.whenready()]);
    const zoom = O.zoom();
    const center = {x: (window.innerWidth / 2 - O.pan.x) / zoom, y: (window.innerHeight / 2 - O.pan.y) / zoom};
    const sourceinfo = downloadedmeta(data && data.downloadedlist);
    if (data && data.type === "category" && data.category) {
      const source = data.category;
      const scalew = Math.max(240, Number(source.w) || 480), scaleh = Math.max(180, Number(source.h) || 360);
      let categoryx = center.x - scalew / 2, categoryy = center.y - scaleh / 2;
      if (await collisionenabled() && O.nooverlapcategorybox) {
        const adjusted = O.nooverlapcategorybox(categoryx, categoryy, scalew, scaleh);
        categoryx = adjusted.left; categoryy = adjusted.top;
      }
      const categorymeta = sourceinfo && sourceinfo.type === "category" ? Object.assign({}, sourceinfo, {autosync: false}) : null;
      const category = tum.categories.create({name: source.name, w: source.w, h: source.h, x: categoryx, y: categoryy, downloadedlist: categorymeta});
      const dx = category.x - (source.x || 0), dy = category.y - (source.y || 0);
      const folders = (data.folders || []).map(folder => {
        const childmeta = categorymeta && /^[A-Za-z0-9_-]{1,80}$/.test(folder.id || "")
          ? Object.assign({}, categorymeta, {folderid: folder.id}) : null;
        const copy = Object.assign({}, folder, {cat: category.id, x: (folder.x || 0) + dx, y: (folder.y || 0) + dy, downloadedlist: childmeta});
        delete copy.id; delete copy.sharedid; delete copy.sharedkey; delete copy.sharedpublished; delete copy.twitterlist;
        copy.icon = importicon(copy.icon);
        return copy;
      });
      tum.folders.import(folders, false);
      tum.unsorted.import((data.unsorted || []).map(member => {
        const copy = Object.assign({}, member, {cat: category.id, downloadedlistid: categorymeta ? categorymeta.id : null});
        if (Number.isFinite(member.x)) copy.x = member.x + dx;
        if (Number.isFinite(member.y)) copy.y = member.y + dy;
        return copy;
      }), false);
      return {type: "category", id: category.id};
    }
    const source = data && data.folder || data;
    if (!source || !Array.isArray(source.members)) throw new Error("shared folder unavailable");
    const scalex = Math.max(0.5, Math.min(2, Number(source.scalex) || 1));
    const scaley = Math.max(0.5, Math.min(2, Number(source.scaley) || 1));
    let folderx = center.x - 100 * scalex, foldery = center.y - 144 * scaley;
    if (await collisionenabled() && O.nooverlapadjustbox) {
      const adjusted = O.nooverlapadjustbox(folderx, foldery, 200 * scalex, 288 * scaley);
      folderx = adjusted.left; foldery = adjusted.top;
    }
    const folder = Object.assign({}, source, {x: folderx, y: foldery, cat: null, downloadedlist: sourceinfo && sourceinfo.type === "folder" ? Object.assign({}, sourceinfo, {autosync: false}) : null});
    delete folder.id; delete folder.sharedid; delete folder.sharedkey; delete folder.sharedpublished; delete folder.twitterlist;
    folder.icon = importicon(folder.icon);
    const added = tum.folders.import([folder], false)[0];
    if (!added) throw new Error("shared folder unavailable");
    return {type: "folder", id: added.id};
  }
  function sourcefolder(data, metadata) {
    if (!data) return null;
    if (data.type === "category") return (data.folders || []).find(folder => folder.id === metadata.folderid) || null;
    if (data.type === "folder") return data.folder || null;
    return Array.isArray(data.members) ? data : null;
  }
  async function fetchdownloadsource(id) {
    if (!validshareid(id)) throw new Error("download source unavailable");
    const response = await fetch("https://list.coolsite.cv/" + id + ".json", {cache: "no-store"});
    if (!response.ok) throw new Error("download source unavailable");
    return response.json();
  }
  function updatefromsource(folder, source, metadata, position = null) {
    if (!folder || !source || !Array.isArray(source.members)) return false;
    const patch = {
      name: source.name || folder.name,
      action: source.action || null,
      color: source.color || folder.color,
      description: source.description || "",
      icon: importicon(source.icon || ""),
      scalex: source.scalex || 1,
      scaley: source.scaley || 1,
      members: source.members,
      cat: folder.cat,
      x: position && Number.isFinite(position.x) ? position.x : folder.x,
      y: position && Number.isFinite(position.y) ? position.y : folder.y,
      downloadedlist: Object.assign({}, metadata, {lastsync: Date.now()})
    };
    tum.folders.update(folder.id, patch);
    return true;
  }
  function syncsourcecategory(category, data) {
    if (!category || !data || data.type !== "category") return false;
    const metadata = downloadedmeta(category.downloadedlist);
    if (!metadata) return false;
    const sourcecategory = data.category || {};
    const savedmetadata = Object.assign({}, metadata, {lastsync: Date.now()});
    tum.categories.update(category.id, {name: sourcecategory.name || category.name, w: sourcecategory.w || category.w, h: sourcecategory.h || category.h, downloadedlist: savedmetadata});
    const sourcefolders = Array.isArray(data.folders) ? data.folders : [];
    const sourceids = new Set(sourcefolders.map(folder => folder.id));
    const localfolders = tum.folders.list().filter(folder => folder.cat === category.id && folder.downloadedlist && folder.downloadedlist.id === metadata.id && folder.downloadedlist.type === "category");
    const bysourceid = new Map(localfolders.map(folder => [folder.downloadedlist.folderid, folder]));
    for (const folder of localfolders) if (!sourceids.has(folder.downloadedlist.folderid)) tum.folders.remove(folder.id);
    for (const source of sourcefolders) {
      const childmeta = Object.assign({}, metadata, {folderid: source.id});
      const position = {x: category.x + (Number(source.x) || 0) - (Number(sourcecategory.x) || 0), y: category.y + (Number(source.y) || 0) - (Number(sourcecategory.y) || 0)};
      let target = bysourceid.get(source.id);
      if (target) {
        updatefromsource(target, source, childmeta, position);
        bysourceid.delete(source.id);
      } else {
        const created = tum.folders.create(Object.assign({}, source, position, {cat: category.id, downloadedlist: childmeta, icon: importicon(source.icon)}));
        target = created;
      }
    }
    const sourceusers = Array.isArray(data.unsorted) ? data.unsorted : [];
    const sourcehandles = new Set(sourceusers.map(member => String(member.handle || "").toLowerCase()));
    for (const member of tum.unsorted.list()) if (member.cat === category.id && member.downloadedlistid === metadata.id && !sourcehandles.has(member.handle.toLowerCase())) tum.unsorted.remove(member.handle);
    for (const member of sourceusers) {
      const existing = tum.unsorted.get(member.handle);
      const x = existing && existing.downloadedlistid === metadata.id ? existing.x : category.x + (Number(member.x) || 0) - (Number(sourcecategory.x) || 0);
      const y = existing && existing.downloadedlistid === metadata.id ? existing.y : category.y + (Number(member.y) || 0) - (Number(sourcecategory.y) || 0);
      tum.unsorted.add(Object.assign({}, member, {cat: category.id, downloadedlistid: metadata.id}), x, y);
    }
    return true;
  }
  async function syncdownloadedentry(item, type, quiet = false) {
    const metadata = downloadedmeta(item && item.downloadedlist);
    if (!metadata) return false;
    try {
      const data = await fetchdownloadsource(metadata.id);
      let changed = false;
      if (type === "category" && metadata.type === "category" && !metadata.folderid) changed = syncsourcecategory(item, data);
      else if (type === "folder") changed = updatefromsource(tum.folders.get(item.id), sourcefolder(data, metadata), metadata);
      if (!changed) throw new Error("download source no longer contains this entry");
      if (!quiet) toast(T("toast.downloaded.syncdone", item.name || "list"));
      return true;
    } catch (error) {
      if (!quiet) toast(error && error.message || T("toast.downloaded.syncfailed"));
      return false;
    }
  }
  function setdownloadedautosync(item, type) {
    const metadata = downloadedmeta(item && item.downloadedlist);
    if (!metadata) return false;
    const patch = {downloadedlist: Object.assign({}, metadata, {autosync: !metadata.autosync})};
    if (type === "category") tum.categories.update(item.id, patch);
    else tum.folders.update(item.id, patch);
    toast(T(patch.downloadedlist.autosync ? "toast.downloaded.autoon" : "toast.downloaded.autooff"));
    return patch.downloadedlist.autosync;
  }
  async function claimdownloadsession(id) {
    return new Promise(resolve => {
      try {
        chrome.runtime.sendMessage({type: "tumclaimdownloadsync", id}, response => {
          if (chrome.runtime.lastError) {resolve(false); return}
          resolve(!!(response && response.claimed));
        });
      } catch {resolve(false)}
    });
  }
  async function syncdownloadedsession() {
    const targets = [
      ...tum.categories.list().filter(category => category.downloadedlist && category.downloadedlist.autosync).map(item => ({item, type: "category"})),
      ...tum.folders.list().filter(folder => folder.downloadedlist && folder.downloadedlist.autosync).map(item => ({item, type: "folder"}))
    ];
    const groups = new Map();
    for (const target of targets) {
      const metadata = downloadedmeta(target.item.downloadedlist);
      if (!metadata) continue;
      if (!groups.has(metadata.id)) groups.set(metadata.id, []);
      groups.get(metadata.id).push(target);
    }
    for (const [id, group] of groups) {
      if (!await claimdownloadsession(id)) continue;
      try {
        const data = await fetchdownloadsource(id);
        for (const target of group) {
          const metadata = downloadedmeta(target.item.downloadedlist);
          if (target.type === "category" && metadata.type === "category" && !metadata.folderid) syncsourcecategory(target.item, data);
          else if (target.type === "folder") updatefromsource(tum.folders.get(target.item.id), sourcefolder(data, metadata), metadata);
        }
      } catch {}
    }
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
      const center = tum.overlay.canvascenter();
      const scalex = Math.max(0.5, Math.min(2, Number(f.scalex) || 1));
      const scaley = Math.max(0.5, Math.min(2, Number(f.scaley) || 1));
      let x = center.x - 100 * scalex, y = center.y - 144 * scaley;
      if (tum.settings && tum.settings.get("nooverlap") && O.nooverlapadjustbox) {
        const adjusted = O.nooverlapadjustbox(x, y, 200 * scalex, 288 * scaley);
        x = adjusted.left; y = adjusted.top;
      }
      const created = tum.folders.create({id: f.id, name: f.name, action: f.action, color: f.color, description: f.description, icon: importicon(f.icon), scalex, scaley, x, y, downloadedlist: downloadedmeta(f.downloadedlist)});
      tum.folders.addmembers(created.id, members);
      state.open = true;
      render();
      toast(T("toast.imported.folder", created.name, members.length), f.action ? null : {
        label: T("action.undo"),
        onclick: () => tum.folders.remove(created.id)
      });
    };
    if (f.action && members.length && !tum.sharepage) {
      const cap = actionlabel(f.action);
      openconfirm({
        title: T("confirm.import.title", f.action),
        body: T("confirm.import.body", f.action, f.action, members.length),
        oklabel: T("action.confirm.ok", cap),
        positive: f.action === "follow",
        onok: () => {doimport(); if (tum.actions) tum.actions.enqueue(f.action, members.map(m => m.handle))}
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
    if (tum.sharepage) return false;
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
        const actionhappened = !!(!tum.sharepage && source.type !== "folder" && folder.action && !user.skipaction && tum.actions);
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
        if (!tum.sharepage && !user.skipaction && tum.actions) tum.actions.run(reasonaction, user);
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

  Object.assign(O, {launchdestroyer, exportdata, importdata, exportfolder, exportcategoryfile, sharefolder, unsharefolder, sharecategory, unsharecategory, importsharedentry, syncdownloadedentry, setdownloadedautosync, syncdownloadedsession, openconfirm,
    shareurl, uploadfolderlist,
    opencreatemodal, openeditmodal, closemodal, savemodal,
    openmergepicker, closemergepicker,
    selectcolor, selectaction, toggleaction, refreshiconbtn, selecticon, selectreasonaction, togglereasonaction,
    setreasonmode, openreasonedit, openreasonview, closereasonmodal, savereason, deletenoteduser, confirmfolderdelete, confirmcategorydelete, closeconfirmsheet});
})();

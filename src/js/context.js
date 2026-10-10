(function () {
  "use strict";

  const O = window.tum._ov;
  const {state, el, escapehtml, ICONS, render, closeoverlay, toast} = O;
  const T = (...a) => tum.strings.t(...a);

  let ctxel = null;
  let ctxpanels = [];
  let contextversion = 0;

  function ensurectx() {
    if (ctxel) return ctxel;
    ctxel = el("div", "tumcontextmenu");
    O.root.appendChild(ctxel);
    return ctxel;
  }
  function ctxopen() {return !!(ctxel && ctxel.classList.contains("tumshow"))}
  function closectx(invalidate = true) {
    if (invalidate) contextversion++;
    if (ctxel) ctxel.classList.remove("tumshow");
    for (const panel of ctxpanels) panel.remove();
    ctxpanels = [];
  }

  function ctxrow(item) {
    if (item.type === "divider") return el("div", "tumctxdivider");
    const row = el("button", "tumctxrow" + (item.danger ? " tumctxdanger" : ""));
    if (item.disabled) {
      row.disabled = true;
      row.setAttribute("aria-disabled", "true");
    }
    row.innerHTML = `<span class="tumctxicon">${item.icon || ""}</span><span class="tumctxlabel">${escapehtml(item.label)}</span>`;
    row.addEventListener("click", event => {
      if (item.disabled) return;
      event.stopPropagation();
      closectx();
      if (item.onclick) item.onclick();
    });
    return row;
  }
  function ctxpanel(item) {
    const panel = el("div", "tumctxpanel" + (item.disabled ? " tumdisabled" : ""));
    if (item.disabled) panel.setAttribute("aria-disabled", "true");
    const title = el("div", "tumctxpaneltitle");
    title.textContent = item.label;
    panel.appendChild(title);
    if (item.href) {
      const link = el("a", "tumctxlink" + (item.hrefinactive ? " tuminactive" : ""));
      link.href = item.href;
      if (!item.path) {
        link.target = "_blank";
        link.rel = "noopener noreferrer";
      }
      if (item.disabled || item.hrefinactive) {
        link.setAttribute("aria-disabled", "true");
        link.tabIndex = -1;
      }
      link.textContent = item.href;
      link.addEventListener("click", event => {
        event.stopPropagation();
        if (item.disabled || item.hrefinactive) {event.preventDefault(); return}
        if (!item.path) return;
        event.preventDefault();
        closectx();
        O.navigatepath(item.path);
      });
      panel.appendChild(link);
    }
    for (const entry of item.items || []) panel.appendChild(ctxrow(Object.assign({}, entry, {disabled: item.disabled || entry.disabled})));
    O.root.appendChild(panel);
    return panel;
  }
  function openctx(x, y, items) {
    closectx(false);
    const menu = ensurectx();
    const entries = items.filter(item => item.type !== "panel");
    const panels = items.filter(item => item.type === "panel");
    menu.replaceChildren(...entries.map(ctxrow));
    menu.style.left = "0px";
    menu.style.top = "0px";
    menu.classList.add("tumshow");
    const rect = menu.getBoundingClientRect();
    menu.style.left = Math.max(8, Math.min(x, window.innerWidth - rect.width - 8)) + "px";
    menu.style.top = Math.max(8, Math.min(y, window.innerHeight - rect.height - 8)) + "px";

    const menurect = menu.getBoundingClientRect();
    let top = menurect.top;
    for (const item of panels) {
      const panel = ctxpanel(item);
      const panelrect = panel.getBoundingClientRect();
      panel.style.left = Math.max(menurect.right + 18, 8) + "px";
      panel.style.top = Math.max(8, Math.min(top, window.innerHeight - panelrect.height - 8)) + "px";
      top += panelrect.height + 10;
      ctxpanels.push(panel);
    }
  }

  function resolveuser(node) {
    if (node.classList.contains("tumloosechip")) {
      const user = tum.unsorted.list().find(item => item.handle === node.dataset.handle);
      return user ? {source: {type: "unsorted"}, m: user} : null;
    }
    const foldernode = node.closest(".tumfolder");
    const folder = foldernode && tum.folders.get(foldernode.dataset.id);
    const member = folder && (folder.members || []).find(item => item.handle === node.dataset.handle);
    return member ? {source: {type: "folder", id: folder.id}, m: member} : null;
  }
  function isunfindable(member) {
    return !!member && member.unfindable === true;
  }
  function newuser(target) {
    if (tum.newuser) {closeoverlay(); tum.newuser.start(target || {type: "canvas"})}
    else toast(T("picker.addsoon"));
  }
  function replaceuser(info) {
    const old = info.m;
    const target = info.source.type === "folder" ? {type: "folder", id: info.source.id, replace: info} : {type: "canvas", cx: old.x, cy: old.y, cat: old.cat, replace: info};
    newuser(target);
  }
  function openavatar(user) {
    const url = O.fullavatarurl(user.avatarurl);
    if (url) window.open(url, "_blank", "noopener");
  }
  function uniquerefreshmembers(members) {
    const unique = new Map();
    for (const member of members || []) {
      if (!member || (!member.handle && !member.userid)) continue;
      const key = member.userid ? "id:" + String(member.userid) : "handle:" + String(member.handle || "").toLowerCase();
      if (!unique.has(key)) unique.set(key, {handle: member.handle, userid: member.userid || null});
    }
    return [...unique.values()];
  }
  function refreshdata(members) {
    const users = uniquerefreshmembers(members);
    if (!users.length) {toast(T("toast.refresh.empty")); return}
    const start = () => {
      if (!tum.accountdata || typeof tum.accountdata.refresh !== "function") {toast(T("toast.refresh.unavailable")); return}
      const result = tum.accountdata.refresh(users);
      if (result === "busy") {toast(T("settings.repopulate.busy")); return}
      if (!result) {toast(T("toast.refresh.empty")); return}
      toast(T("settings.repopulate.started", users.length));
    };
    if (users.length > 20) {
      O.openconfirm({
        title: T("confirm.refresh.title", users.length),
        body: T("confirm.refresh.body", users.length),
        oklabel: T("confirm.refresh.ok"),
        onok: start
      });
    } else start();
  }
  function categorymembers(category) {
    return [
      ...tum.folders.list().filter(folder => folder.cat === category.id).flatMap(folder => folder.members || []),
      ...tum.unsorted.list().filter(member => member.cat === category.id)
    ];
  }
  function twitterlistid(folder) {
    try {return tum.lists.folderlistid(folder)} catch {return ""}
  }
  function sharedpanel(item, type = "folder") {
    const href = O.shareurl(item);
    if (!href) return null;
    const published = item.sharedpublished !== false;
    const sync = () => type === "category" ? O.sharecategory(item, true) : O.sharefolder(item, true);
    const unshare = () => type === "category" ? O.unsharecategory(item) : O.unsharefolder(item);
    const share = () => type === "category" ? O.sharecategory(item) : O.sharefolder(item);
    return {
      type: "panel",
      label: T("menu.sharedlist"),
      href,
      hrefinactive: !published,
      items: published ? [
        {label: T("menu.syncshare"), icon: ICONS.refresh, onclick: sync},
        {label: T("menu.unpublish"), icon: ICONS.trash, danger: true, onclick: unshare}
      ] : [
        {label: T("menu.republish"), icon: ICONS.upload, onclick: share}
      ]
    };
  }
  function downloadedpanel(item, type = "folder") {
    const metadata = item && item.downloadedlist;
    if (!metadata || !/^[23456789abcdefghjkmnpqrstuvwxyz]{5}$/i.test(metadata.id || "")) return null;
    const sync = () => O.syncdownloadedentry(item, type);
    const toggle = () => O.setdownloadedautosync(item, type);
    return {
      type: "panel",
      label: T("menu.downloadedlist"),
      href: "https://list.coolsite.cv/" + metadata.id,
      items: [
        {label: T("menu.syncdownloaded"), icon: ICONS.refresh, onclick: sync},
        {label: T(metadata.autosync ? "menu.autosync.off" : "menu.autosync.on"), icon: ICONS.check, onclick: toggle}
      ]
    };
  }
  function deletetwitterlist(folder) {
    O.openconfirm({
      title: T("confirm.twlist.delete.title", folder.name),
      body: T("confirm.twlist.delete.body"),
      oklabel: T("confirm.twlist.delete.ok"),
      onok: async () => {
        try {
          await tum.lists.deletelist(folder);
          tum.folders.update(folder.id, {twitterlist: null});
          toast(T("toast.twlist.deleted"));
        } catch (error) {
          toast(error && error.message === "busy" ? T("toast.twlist.busy") : T("toast.twlist.deletefailed"));
        }
      }
    });
  }
  function twitterlistpanel(folder, isprivate, disabled = false) {
    const id = twitterlistid(folder);
    if (!id) return null;
    const setprivacy = async () => {
      try {
        await tum.lists.setlistprivacy(folder, !isprivate);
        tum.folders.update(folder.id, {twitterlist: {id, private: !isprivate}});
        toast(T(isprivate ? "toast.twlist.published" : "toast.twlist.unpublished"), {
          label: T("action.undo"),
          onclick: async () => {
            try {
              await tum.lists.setlistprivacy(folder, isprivate);
              tum.folders.update(folder.id, {twitterlist: {id, private: isprivate}});
              toast(T("toast.twlist.visibilityrestored"));
            } catch {toast(T("toast.twlist.privacyfailed"))}
          }
        });
      } catch (error) {
        toast(error && error.message === "busy" ? T("toast.twlist.busy") : T("toast.twlist.privacyfailed"));
      }
    };
    const sync = async () => {
      try {
        await tum.lists.syncfolder(folder);
      } catch (error) {
        if (!error || !error.batchshown) toast(error && error.message === "busy" ? T("toast.twlist.busy") : T("toast.twlist.syncfailed"));
      }
    };
    return {
      type: "panel",
      label: T("menu.twitterlist"),
      disabled,
      href: "https://x.com/i/lists/" + encodeURIComponent(id),
      path: "/i/lists/" + encodeURIComponent(id),
      items: [
        {label: T("menu.synctwitter"), icon: ICONS.refresh, onclick: sync},
        {label: T(isprivate ? "menu.publishtwitter" : "menu.unpublishtwitter"), icon: ICONS.upload, onclick: setprivacy},
        {label: T("menu.deletetwitterlist"), icon: ICONS.trash, danger: true, onclick: () => deletetwitterlist(folder)}
      ]
    };
  }
  function folderitems(folder, liststate) {
    const listid = tum.sharepage ? "" : twitterlistid(folder);
    const listknown = !listid || !!(liststate && liststate.known);
    const list = listid && listknown && liststate.exists ? twitterlistpanel(folder, liststate.private) : null;
    const listpending = listid && !listknown ? twitterlistpanel(folder, true, true) : null;
    const share = sharedpanel(folder);
    const downloaded = downloadedpanel(folder);
    const createuser = !tum.sharepage ? [{label: T("menu.newuser"), icon: ICONS.plus, onclick: () => newuser({type: "folder", id: folder.id})}] : [];
    const twactions = [
      ...(!share ? [{label: T("menu.share"), icon: ICONS.upload, onclick: () => O.sharefolder(folder)}] : []),
      ...(!tum.sharepage && listknown && !list ? [{label: T("menu.uploadtwlist"), icon: ICONS.upload, onclick: () => O.uploadfolderlist(folder)}] : [])
    ];
    return [
      ...createuser,
      ...(createuser.length ? [{type: "divider"}] : []),
      {label: T("menu.edit"), icon: ICONS.pencil, onclick: () => O.openeditmodal(folder)},
      ...(!tum.sharepage ? [{label: T("menu.refreshdata"), icon: ICONS.refresh, onclick: () => refreshdata(folder.members || [])}] : []),
      {label: T("menu.export"), icon: ICONS.download, onclick: () => O.exportfolder(folder)},
      {label: T("menu.merge"), icon: ICONS.folder, onclick: () => O.openmergepicker(folder)},
      ...(twactions.length ? [{type: "divider"}, ...twactions, {type: "divider"}] : []),
      {label: T("menu.delete"), icon: ICONS.trash, danger: true, onclick: () => O.confirmfolderdelete(folder)},
      ...(downloaded ? [downloaded] : []),
      ...(share ? [share] : []),
      ...(list ? [list] : listpending ? [listpending] : [])
    ];
  }
  function selectioncontains(node) {
    if (!node || !state.selection) return false;
    if (node.classList.contains("tumfolder")) return state.selection.has("folder:" + node.dataset.id);
    if (node.classList.contains("tumcategory")) return state.selection.has("category:" + node.dataset.id);
    if (node.classList.contains("tumloosechip")) return state.selection.has("user:" + String(node.dataset.handle || "").toLowerCase());
    return false;
  }
  function selectionmembers(items) {
    const members = [];
    for (const item of items) {
      if (item.type === "folder") members.push(...(item.data.members || []));
      else if (item.type === "user") members.push(item.data);
      else if (item.type === "category") members.push(...categorymembers(item.data));
    }
    return members;
  }
  function publishselected(entries) {
    O.openconfirm({
      title: T("confirm.selection.publish.title", entries.length),
      body: T("confirm.selection.publish.body"),
      oklabel: T("confirm.selection.publish.ok"),
      onok: async () => {
        for (let index = 0; index < entries.length; index++) {
          const entry = entries[index];
          if (entry.type === "category") await O.sharecategory(entry.data);
          else await O.sharefolder(entry.data);
        }
      }
    });
  }
  function deleteselection(items) {
    O.openconfirm({
      title: T("confirm.selection.delete.title", items.length),
      body: T("confirm.selection.delete.body"),
      oklabel: T("overlay.delete"),
      onok: () => {
        for (const item of items) if (item.type === "folder") tum.folders.remove(item.id);
        for (const item of items) if (item.type === "user") tum.unsorted.remove(item.handle);
        for (const item of items) if (item.type === "category") tum.categories.remove(item.id);
        O.clearselection();
        render();
      }
    });
  }
  function selectionmenu(items) {
    const entries = items.filter(item => item.type === "folder" || item.type === "category");
    return [
      ...(entries.length ? [{label: T("menu.publishselected"), icon: ICONS.upload, onclick: () => publishselected(entries)}] : []),
      ...(!tum.sharepage ? [{label: T("menu.refreshdata"), icon: ICONS.refresh, onclick: () => refreshdata(selectionmembers(items))}] : []),
      {label: T("menu.delete"), icon: ICONS.trash, danger: true, onclick: () => deleteselection(items)}
    ];
  }

  async function oncontextmenu(event) {
    if (!O.root.classList.contains("tumactive") || state.drag || O.root.classList.contains("tumfolderdragging")) return;
    if (event.target.closest("input, textarea, .tumcontextmenu, .tumctxpanel")) return;
    if (event.target.closest(".tummodalcard, .tumreasoncard, .tumconfirmcard, .tumiconpicker")) return;
    if (event.target.closest(".tumtools, .tumtoolsright, .tumminimap, .tumjumplist")) return;

    const chip = event.target.closest(".tumloosechip");
    const memberrow = event.target.closest(".tumfoldermember");
    const foldernode = event.target.closest(".tumfolder");
    const categorynode = event.target.closest(".tumcategory");
    event.preventDefault();
    const version = ++contextversion;
    let items;
    const selection = typeof O.selecteditems === "function" ? O.selecteditems() : [];
    const selectednode = chip || foldernode || categorynode;

    if (selection.length && (!selectednode || selectioncontains(selectednode))) {
      items = selectionmenu(selection);
    } else if (chip || memberrow) {
      const info = resolveuser(chip || memberrow);
      if (!info) {closectx(); return}
      items = [
        ...(!tum.sharepage && isunfindable(info.m) ? [{label: T("menu.replace"), icon: ICONS.profile, onclick: () => replaceuser(info)}] : []),
        ...(!tum.sharepage && !isunfindable(info.m) ? [{label: T("menu.openprofile"), icon: ICONS.profile, onclick: () => O.openprofile(info.source, info.m)}] : []),
        ...(!tum.sharepage ? [{label: T("menu.openavatar"), icon: ICONS.profile, onclick: () => openavatar(info.m)}] : []),
        ...(!tum.sharepage ? [{label: T("menu.refreshdata"), icon: ICONS.refresh, onclick: () => refreshdata([info.m])}] : []),
        {label: info.m.reason ? T("menu.editnote") : T("menu.customnote"), icon: ICONS.pencil, onclick: () => {O.openreasonview(info.source, info.m); O.setreasonmode("edit")}},
        {label: T("menu.delete"), icon: ICONS.trash, danger: true, onclick: () => {O.removefromsource(info.source, info.m.handle); state.open = true; render()}}
      ];
    } else if (foldernode) {
      const folder = tum.folders.get(foldernode.dataset.id);
      if (!folder) {closectx(); return}
      const listid = tum.sharepage ? "" : twitterlistid(folder);
      items = folderitems(folder, {known: !listid, exists: false, private: true});
      if (version !== contextversion) return;
      openctx(event.clientX, event.clientY, items);
      if (listid) {
        try {
          const current = await tum.lists.getlist(listid);
          const currentfolder = tum.folders.get(folder.id);
          if (version !== contextversion || !ctxopen() || !O.root.classList.contains("tumactive") || !currentfolder || twitterlistid(currentfolder) !== listid) return;
          if (!current.exists) {
            tum.folders.update(folder.id, {twitterlist: null});
          } else {
            const stored = typeof currentfolder.twitterlist === "object" ? currentfolder.twitterlist : {};
            if (stored.id !== listid || stored.private !== current.private) {
              tum.folders.update(folder.id, {twitterlist: {id: listid, private: current.private}});
            }
          }
          const updated = tum.folders.get(folder.id);
          if (updated && version === contextversion && ctxopen()) {
            openctx(event.clientX, event.clientY, folderitems(updated, {known: true, exists: !!current.exists, private: !!current.private}));
          }
        } catch {}
      }
      return;
    } else if (categorynode) {
      const id = categorynode.dataset.id;
      const category = tum.categories.get(id);
      if (!category) {closectx(); return}
      const share = sharedpanel(category, "category");
      const downloaded = downloadedpanel(category, "category");
      const createitems = [
        ...(!tum.sharepage ? [{label: T("menu.newuser"), icon: ICONS.plus, onclick: () => newuser({type: "category", id, cx: (event.clientX - O.pan.x) / O.zoom(), cy: (event.clientY - O.pan.y) / O.zoom()})}] : []),
        {label: T("menu.newfolder"), icon: ICONS.folder, onclick: () => O.opencreatemodal({cat: id, cx: (event.clientX - O.pan.x) / O.zoom(), cy: (event.clientY - O.pan.y) / O.zoom()})}
      ];
      items = [
        ...createitems,
        {type: "divider"},
        {label: T("menu.rename"), icon: ICONS.pencil, onclick: () => O.renamecategory(id)},
        ...(!tum.sharepage ? [{label: T("menu.refreshdata"), icon: ICONS.refresh, onclick: () => refreshdata(categorymembers(category))}] : []),
        {label: T("menu.export"), icon: ICONS.download, onclick: () => O.exportcategoryfile(category)},
        ...(!share ? [{type: "divider"}, {label: T("menu.share"), icon: ICONS.upload, onclick: () => O.sharecategory(category)}, {type: "divider"}] : []),
        {label: T("menu.delete"), icon: ICONS.trash, danger: true, onclick: () => O.confirmcategorydelete(category)},
        ...(share ? [share] : []),
        ...(downloaded ? [downloaded] : [])
      ];
    } else {
      items = [
        ...(!tum.sharepage ? [{label: T("menu.newuser"), icon: ICONS.plus, onclick: () => newuser({type: "canvas", cx: (event.clientX - O.pan.x) / O.zoom(), cy: (event.clientY - O.pan.y) / O.zoom()})}] : []),
        {label: T("menu.newfolder"), icon: ICONS.folder, onclick: () => O.opencreatemodal()},
        {type: "divider"},
        {label: T("menu.newcategory"), icon: ICONS.category, onclick: () => O.newcategory(event.clientX, event.clientY)},
        {label: T("menu.import"), icon: ICONS.upload, onclick: () => O.importdata()}
      ];
    }
    if (version !== contextversion) return;
    openctx(event.clientX, event.clientY, items);
  }

  Object.assign(O, {oncontextmenu, closectx, ctxopen});
})();

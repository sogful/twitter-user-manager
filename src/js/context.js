(function () {
  "use strict";

  const O = window.tum._ov;
  const {state, el, escapehtml, ICONS, render, closeoverlay, toast} = O;
  const T = (...a) => tum.strings.t(...a);

  let ctxel = null;
  let ctxpanels = [];

  function ensurectx() {
    if (ctxel) return ctxel;
    ctxel = el("div", "tumcontextmenu");
    O.root.appendChild(ctxel);
    return ctxel;
  }
  function ctxopen() {return !!(ctxel && ctxel.classList.contains("tumshow"))}
  function closectx() {
    if (ctxel) ctxel.classList.remove("tumshow");
    for (const panel of ctxpanels) panel.remove();
    ctxpanels = [];
  }

  function ctxrow(item) {
    const row = el("button", "tumctxrow" + (item.danger ? " tumctxdanger" : ""));
    row.innerHTML = `<span class="tumctxicon">${item.icon || ""}</span><span class="tumctxlabel">${escapehtml(item.label)}</span>`;
    row.addEventListener("click", event => {
      event.stopPropagation();
      closectx();
      if (item.onclick) item.onclick();
    });
    return row;
  }
  function ctxpanel(item) {
    const panel = el("div", "tumctxpanel");
    const title = el("div", "tumctxpaneltitle");
    title.textContent = item.label;
    panel.appendChild(title);
    if (item.href) {
      const link = el("a", "tumctxlink");
      link.href = item.href;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.textContent = item.href;
      link.addEventListener("click", event => event.stopPropagation());
      panel.appendChild(link);
    }
    for (const entry of item.items || []) panel.appendChild(ctxrow(entry));
    O.root.appendChild(panel);
    return panel;
  }
  function openctx(x, y, items) {
    closectx();
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
    return !!member && (member.unfindable === true || (!member.userid && !member.pending));
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
  function sharedpanel(folder) {
    const href = O.shareurl(folder);
    if (!href) return null;
    const published = folder.sharedpublished !== false;
    return {
      type: "panel",
      label: T("menu.sharedlist"),
      href,
      items: published ? [
        {label: T("menu.syncshare"), icon: ICONS.refresh, onclick: () => O.sharefolder(folder, true)},
        {label: T("menu.unpublish"), icon: ICONS.trash, danger: true, onclick: () => O.unsharefolder(folder)}
      ] : [
        {label: T("menu.republish"), icon: ICONS.upload, onclick: () => O.sharefolder(folder)}
      ]
    };
  }
  function twitterlistpanel(folder) {
    const id = twitterlistid(folder);
    if (!id) return null;
    const list = typeof folder.twitterlist === "object" ? folder.twitterlist : {};
    const private = list.private !== false;
    const setprivacy = async () => {
      try {
        await tum.lists.setlistprivacy(folder, !private);
        tum.folders.update(folder.id, {twitterlist: {id, private: !private}});
        toast(T(private ? "toast.twlist.published" : "toast.twlist.unpublished"), {
          label: T("action.undo"),
          onclick: async () => {
            try {
              await tum.lists.setlistprivacy(folder, private);
              tum.folders.update(folder.id, {twitterlist: {id, private}});
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
      href: "https://x.com/i/lists/" + encodeURIComponent(id),
      items: [
        {label: T("menu.synctwitter"), icon: ICONS.refresh, onclick: sync},
        {label: T(private ? "menu.publishtwitter" : "menu.unpublishtwitter"), icon: ICONS.upload, onclick: setprivacy}
      ]
    };
  }

  function oncontextmenu(event) {
    if (!O.root.classList.contains("tumactive") || state.drag || state.gesture) return;
    if (event.target.closest("input, textarea, .tumcontextmenu, .tumctxpanel")) return;
    if (event.target.closest(".tummodalcard, .tumreasoncard, .tumconfirmcard, .tumiconpicker")) return;
    if (event.target.closest(".tumtools, .tumtoolsright, .tumminimap, .tumjumplist")) return;

    const chip = event.target.closest(".tumloosechip");
    const memberrow = event.target.closest(".tumfoldermember");
    const foldernode = event.target.closest(".tumfolder");
    const categorynode = event.target.closest(".tumcategory");
    event.preventDefault();
    let items;

    if (chip || memberrow) {
      const info = resolveuser(chip || memberrow);
      if (!info) {closectx(); return}
      items = [
        ...(isunfindable(info.m) ? [{label: T("menu.replace"), icon: ICONS.profile, onclick: () => replaceuser(info)}] : [{label: T("menu.openprofile"), icon: ICONS.profile, onclick: () => O.openprofile(info.source, info.m)}]),
        {label: T("menu.openavatar"), icon: ICONS.profile, onclick: () => openavatar(info.m)},
        {label: T("menu.refreshdata"), icon: ICONS.refresh, onclick: () => refreshdata([info.m])},
        {label: info.m.reason ? T("menu.editnote") : T("menu.customnote"), icon: ICONS.pencil, onclick: () => {O.openreasonview(info.source, info.m); O.setreasonmode("edit")}},
        {label: T("menu.delete"), icon: ICONS.trash, danger: true, onclick: () => {O.removefromsource(info.source, info.m.handle); state.open = true; render()}}
      ];
    } else if (foldernode) {
      const folder = tum.folders.get(foldernode.dataset.id);
      if (!folder) {closectx(); return}
      const share = sharedpanel(folder);
      const list = twitterlistpanel(folder);
      items = [
        {label: T("menu.edit"), icon: ICONS.pencil, onclick: () => O.openeditmodal(folder)},
        {label: T("menu.refreshdata"), icon: ICONS.refresh, onclick: () => refreshdata(folder.members || [])},
        {label: T("menu.newuser"), icon: ICONS.plus, onclick: () => newuser({type: "folder", id: folder.id})},
        {label: T("menu.export"), icon: ICONS.download, onclick: () => O.exportfolder(folder)},
        ...(folder.action && !share ? [{label: T("menu.share"), icon: ICONS.upload, onclick: () => O.sharefolder(folder)}] : []),
        ...(!list ? [{label: T("menu.uploadtwlist"), icon: ICONS.upload, onclick: () => O.uploadfolderlist(folder)}] : []),
        {label: T("menu.delete"), icon: ICONS.trash, danger: true, onclick: () => O.confirmfolderdelete(folder)},
        ...(share ? [share] : []),
        ...(list ? [list] : [])
      ];
    } else if (categorynode) {
      const id = categorynode.dataset.id;
      const category = tum.categories.get(id);
      if (!category) {closectx(); return}
      items = [
        {label: T("menu.rename"), icon: ICONS.pencil, onclick: () => O.renamecategory(id)},
        {label: T("menu.refreshdata"), icon: ICONS.refresh, onclick: () => refreshdata(categorymembers(category))},
        {label: T("menu.delete"), icon: ICONS.trash, danger: true, onclick: () => O.confirmcategorydelete(category)},
        {label: T("menu.newuser"), icon: ICONS.plus, onclick: () => newuser({type: "category", id, cx: (event.clientX - O.pan.x) / O.zoom(), cy: (event.clientY - O.pan.y) / O.zoom()})},
        {label: T("menu.newfolder"), icon: ICONS.folder, onclick: () => O.opencreatemodal({cat: id, cx: (event.clientX - O.pan.x) / O.zoom(), cy: (event.clientY - O.pan.y) / O.zoom()})}
      ];
    } else {
      items = [
        {label: T("menu.newuser"), icon: ICONS.plus, onclick: () => newuser({type: "canvas", cx: (event.clientX - O.pan.x) / O.zoom(), cy: (event.clientY - O.pan.y) / O.zoom()})},
        {label: T("menu.newfolder"), icon: ICONS.folder, onclick: () => O.opencreatemodal()},
        {label: T("menu.newcategory"), icon: ICONS.category, onclick: () => O.newcategory(event.clientX, event.clientY)},
        {label: T("menu.import"), icon: ICONS.upload, onclick: () => O.importdata()}
      ];
    }
    openctx(event.clientX, event.clientY, items);
  }

  Object.assign(O, {oncontextmenu, closectx, ctxopen});
})();

(function () {
  const O = window.tum._ov;
  const scope = O.scope;
  with (scope) {
  function rendersignature(value, extra) {
    try {return JSON.stringify(value) + (extra || "")} catch {return String(Date.now())}
  }
  function updatefoldersearchclear(node) {
    const search = node.querySelector(".tumfoldersearch");
    const clear = node.querySelector(".tumfolderclear");
    if (search && clear) clear.hidden = !search.value;
  }
  function filterfolderrows(list, query) {
    const folder = list && list.closest(".tumfolder");
    if (folder && typeof folder._tumfiltermembers === "function") {
      folder._tumfiltermembers(query);
      return;
    }
    const q = (query || "").trim().toLowerCase();
    for (const row of list.querySelectorAll(".tumfoldermember")) {
      row.style.display = !q || row.textContent.toLowerCase().includes(q) ? "" : "none";
    }
  }
  function restorefolderview(node, view) {
    if (!view) return;
    const search = node.querySelector(".tumfoldersearch");
    const list = node.querySelector(".tumfolderlist");
    if (search) {
      search.value = view.query || "";
      updatefoldersearchclear(node);
      filterfolderrows(list, search.value);
    }
    if (list) list.scrollTop = view.scroll;
  }
  function syncfreeform(nodes) {
    const keep = new Set(nodes);
    let cursor = els.freeform.firstElementChild;
    for (const node of nodes) {
      if (node === cursor) cursor = cursor.nextElementSibling;
      else els.freeform.insertBefore(node, cursor);
    }
    for (const node of [...els.freeform.children]) if (!keep.has(node) && node !== (userhover && userhover.card)) node.remove();
  }
  function selectionkey(node) {
    if (node.classList.contains("tumfolder")) return "folder:" + node.dataset.id;
    if (node.classList.contains("tumcategory")) return "category:" + node.dataset.id;
    if (node.classList.contains("tumloosechip")) return "user:" + String(node.dataset.handle || "").toLowerCase();
    return "";
  }
  function syncselection() {
    const selection = state.selection || new Set();
    for (const node of els.freeform.querySelectorAll(".tumfolder, .tumcategory, .tumloosechip")) node.classList.toggle("tumselected", selection.has(selectionkey(node)));
  }
  function setselection(selection) {
    state.selection = new Set(selection || []);
    if (els.freeform) syncselection();
  }
  function clearselection() {setselection()}
  function setselectionbox(x1, y1, x2, y2) {
    const left = Math.min(x1, x2), top = Math.min(y1, y2);
    els.selectionbox.style.left = left + "px";
    els.selectionbox.style.top = top + "px";
    els.selectionbox.style.width = Math.abs(x2 - x1) + "px";
    els.selectionbox.style.height = Math.abs(y2 - y1) + "px";
  }
  function selectinrect(x1, y1, x2, y2, prior) {
    const left = Math.min(x1, x2), top = Math.min(y1, y2), right = Math.max(x1, x2), bottom = Math.max(y1, y2);
    const next = new Set(prior || []);
    for (const node of els.freeform.querySelectorAll(".tumfolder, .tumcategory, .tumloosechip")) {
      const rect = node.getBoundingClientRect();
      if (rect.left >= left && rect.top >= top && rect.right <= right && rect.bottom <= bottom) next.add(selectionkey(node));
    }
    setselection(next);
  }
  function selecteditems() {
    const selected = state.selection || new Set();
    const out = [];
    for (const category of tum.categories.list()) if (selected.has("category:" + category.id)) out.push({type: "category", id: category.id, data: category});
    for (const folder of tum.folders.list()) if (selected.has("folder:" + folder.id)) out.push({type: "folder", id: folder.id, data: folder});
    for (const user of tum.unsorted.list()) if (selected.has("user:" + String(user.handle || "").toLowerCase())) out.push({type: "user", handle: user.handle, data: user});
    return out;
  }
  const HISTORYLIMIT = 500;
  const history = {active: false, replaying: false, depth: 0, before: null, transactionbefore: null, timer: 0, past: [], future: []};
  function clonehistory(value) {return JSON.parse(JSON.stringify(value))}
  function historyprofile() {
    return {
      folders: clonehistory(tum.folders.list()),
      categories: clonehistory(tum.categories.list()),
      unsorted: clonehistory(tum.unsorted.list())
    };
  }
  function historykey(type, item) {return type === "user" ? String(item.handle || "").toLowerCase() : item.id}
  function historychanges(type, before, after) {
    const olditems = new Map(before.map(item => [historykey(type, item), item]));
    const newitems = new Map(after.map(item => [historykey(type, item), item]));
    const keys = new Set([...olditems.keys(), ...newitems.keys()]);
    const changes = [];
    for (const key of keys) {
      const olditem = olditems.get(key), newitem = newitems.get(key);
      if (JSON.stringify(olditem) !== JSON.stringify(newitem)) changes.push({key, before: olditem ? clonehistory(olditem) : null, after: newitem ? clonehistory(newitem) : null});
    }
    return changes;
  }
  function commithistory(before, after) {
    if (!before || !after || history.replaying) return false;
    const entry = {
      folders: historychanges("folder", before.folders, after.folders),
      categories: historychanges("category", before.categories, after.categories),
      unsorted: historychanges("user", before.unsorted, after.unsorted)
    };
    if (!entry.folders.length && !entry.categories.length && !entry.unsorted.length) return false;
    history.past.push(entry);
    if (history.past.length > HISTORYLIMIT) history.past.splice(0, history.past.length - HISTORYLIMIT);
    history.future = [];
    return true;
  }
  function flushhistory() {
    clearTimeout(history.timer);
    history.timer = 0;
    if (!history.active || history.replaying || history.depth) return;
    const after = historyprofile();
    commithistory(history.before, after);
    history.before = after;
  }
  function queuehistory() {
    if (!history.active || history.replaying || history.depth) return;
    clearTimeout(history.timer);
    history.timer = setTimeout(flushhistory, 0);
  }
  function historybegin() {
    if (!history.active || history.replaying) return;
    if (!history.depth) history.transactionbefore = historyprofile();
    history.depth++;
  }
  function historyend() {
    if (!history.active || history.replaying || !history.depth) return;
    history.depth--;
    if (history.depth) return;
    clearTimeout(history.timer);
    history.timer = 0;
    const after = historyprofile();
    commithistory(history.transactionbefore, after);
    history.before = after;
    history.transactionbefore = null;
  }
  function restorehistorylist(type, changes, version, items) {
    const restored = new Map(items.map(item => [historykey(type, item), clonehistory(item)]));
    for (const change of changes) {
      const value = change[version];
      if (value) restored.set(change.key, clonehistory(value));
      else restored.delete(change.key);
    }
    return [...restored.values()];
  }
  function restorehistory(entry, version) {
    if (!entry) return false;
    history.replaying = true;
    clearTimeout(history.timer);
    history.timer = 0;
    const categories = restorehistorylist("category", entry.categories, version, tum.categories.list());
    const folders = restorehistorylist("folder", entry.folders, version, tum.folders.list());
    const unsorted = restorehistorylist("user", entry.unsorted, version, tum.unsorted.list());
    tum.categories.import(categories, true);
    tum.folders.import(folders.map(folder => Object.assign({}, folder, {members: (folder.members || []).slice().reverse()})), true);
    tum.unsorted.import(unsorted, true);
    history.before = historyprofile();
    history.replaying = false;
    clearselection();
    clearuserhover();
    render(true);
    return true;
  }
  function historyundo() {
    const entry = history.past.pop();
    if (!entry || !restorehistory(entry, "before")) return false;
    history.future.push(entry);
    return true;
  }
  function historyredo() {
    const entry = history.future.pop();
    if (!entry || !restorehistory(entry, "after")) return false;
    history.past.push(entry);
    return true;
  }
  function installhistory() {
    Promise.all([tum.folders.ready, tum.unsorted.ready, tum.categories.ready]).then(() => {
      history.before = historyprofile();
      history.active = true;
      tum.folders.subscribe(queuehistory);
      tum.unsorted.subscribe(queuehistory);
      tum.categories.subscribe(queuehistory);
    });
  }
  function startselectiondrag(node, event) {
    const ownkey = selectionkey(node);
    if (!ownkey || !state.selection.has(ownkey) || state.selection.size < 2 || event.button !== 0 || state.drag || state.gesture) return false;
    const selectedcategories = new Set([...state.selection].filter(key => key.startsWith("category:")).map(key => key.slice(9)));
    const categories = tum.categories.list().filter(category => selectedcategories.has(category.id)).map(category => ({
      id: category.id, node: (O.categorynodes || []).find(item => item.dataset.id === category.id), x: category.x || 0, y: category.y || 0
    })).filter(item => item.node);
    const folders = new Map();
    for (const folder of tum.folders.list()) {
      const direct = state.selection.has("folder:" + folder.id);
      if (!direct && !selectedcategories.has(folder.cat)) continue;
      const item = (O.foldernodes || []).find(node2 => node2.dataset.id === folder.id);
      if (item) folders.set(folder.id, {id: folder.id, node: item, x: folder.x || 0, y: folder.y || 0});
    }
    const users = new Map();
    for (const user of tum.unsorted.list()) {
      const key = String(user.handle || "").toLowerCase();
      const direct = state.selection.has("user:" + key);
      if (!direct && !selectedcategories.has(user.cat)) continue;
      const item = [...els.freeform.querySelectorAll(".tumloosechip")].find(node2 => String(node2.dataset.handle || "").toLowerCase() === key);
      if (item) users.set(key, {handle: user.handle, node: item, x: user.x || 0, y: user.y || 0});
    }
    if (!categories.length && !folders.size && !users.size) return false;
    event.preventDefault();
    event.stopPropagation();
    const startx = event.clientX, starty = event.clientY, pointerid = event.pointerId;
    state.gesture = {kind: "selectiondrag", pointerid};
    let dragging = false;
    const movingnodes = [...categories, ...folders.values(), ...users.values()];
    const place = moveevent => {
      const dx = Math.round((moveevent.clientX - startx) / zoom), dy = Math.round((moveevent.clientY - starty) / zoom);
      for (const item of categories) {item.node.style.left = (item.x + dx) + "px"; item.node.style.top = (item.y + dy) + "px"}
      for (const item of folders.values()) {item.node.style.left = (item.x + dx) + "px"; item.node.style.top = (item.y + dy) + "px"}
      for (const item of users.values()) {item.node.style.left = (item.x + dx) + "px"; item.node.style.top = (item.y + dy) + "px"}
      return {dx, dy};
    };
    historybegin();
    const move = moveevent => {
      if (!state.gesture || state.gesture.pointerid !== pointerid || moveevent.pointerId !== pointerid) return;
      if (!dragging && Math.hypot(moveevent.clientX - startx, moveevent.clientY - starty) < THRESHOLD) return;
      if (!dragging) {
        dragging = true;
        clearuserhover();
        root.classList.add("tumfolderdragging");
        for (const item of movingnodes) item.node.classList.add("tumdragactive");
      }
      place(moveevent);
    };
    const finish = upevent => {
      if (!state.gesture || state.gesture.pointerid !== pointerid || upevent.pointerId !== pointerid) return;
      document.removeEventListener("pointermove", move);
      document.removeEventListener("pointerup", finish);
      document.removeEventListener("pointercancel", finish);
      state.gesture = null;
      root.classList.remove("tumfolderdragging");
      for (const item of movingnodes) item.node.classList.remove("tumdragactive");
      if (dragging && upevent.type === "pointerup") {
        const {dx, dy} = place(upevent);
        for (const item of categories) tum.categories.update(item.id, {x: item.x + dx, y: item.y + dy}, true);
        if (folders.size) tum.folders.bulkmove([...folders.values()].map(item => ({id: item.id, x: item.x + dx, y: item.y + dy})));
        if (users.size) tum.unsorted.bulkmove([...users.values()].map(item => ({handle: item.handle, x: item.x + dx, y: item.y + dy})));
      } else if (!dragging) clearselection();
      else render(true);
      historyend();
    };
    document.addEventListener("pointermove", move);
    document.addEventListener("pointerup", finish);
    document.addEventListener("pointercancel", finish);
    return true;
  }
  let renderraf = 0, scheduledforce = false;
  function schedulerender(force) {
    scheduledforce = scheduledforce || force === true;
    if (renderraf) return;
    renderraf = requestAnimationFrame(() => {
      renderraf = 0;
      const nextforce = scheduledforce;
      scheduledforce = false;
      render(nextforce);
    });
  }
  function render(force) {
    if (renderraf) {cancelAnimationFrame(renderraf); renderraf = 0; scheduledforce = false}
    if (!els.freeform) return;
    clearaffiliatetooltip();
    force = force === true;
    const categories = new Map([...els.freeform.querySelectorAll(".tumcategory")].map(node => [node.dataset.id, node]));
    const folders = new Map([...els.freeform.querySelectorAll(".tumfolder")].map(node => [node.dataset.id, node]));
    const loose = new Map([...els.freeform.querySelectorAll(".tumloosechip")].map(node => [(node.dataset.handle || "").toLowerCase(), node]));
    const changed = [], nodes = [];
    O.categorynodes = tum.categories.list().map(category => {
      const signature = rendersignature(category);
      let node = categories.get(category.id);
      if (force || !node || node._tumsignature !== signature) {node = buildcategorynode(category); node._tumsignature = signature; changed.push(node)}
      nodes.push(node);
      return node;
    });
    O.foldernodes = tum.folders.list().map(folder => {
      const dragging = state.drag && state.drag.source && state.drag.source.type === "folder" && state.drag.source.id === folder.id ? state.drag.user.handle : "";
      const signature = rendersignature(folder, dragging + (folder.icon ? "|icon:" + iconhtml(folder.icon) : ""));
      const old = folders.get(folder.id);
      let node = old;
      if (force || !node || node._tumsignature !== signature) {
        const list = old && old.querySelector(".tumfolderlist");
        const search = old && old.querySelector(".tumfoldersearch");
        const view = old ? {scroll: list ? list.scrollTop : 0, query: search ? search.value.trim() : ""} : null;
        node = buildfoldernode(folder);
        node._tumsignature = signature;
        node._tumrestore = view;
        changed.push(node);
      }
      nodes.push(node);
      return node;
    });
    for (const user of tum.unsorted.list()) if (user.placed !== false) {
      const key = (user.handle || "").toLowerCase();
      const dragging = state.drag && state.drag.source && state.drag.source.type === "unsorted" && (state.drag.user.handle || "").toLowerCase() === key ? "dragging" : "";
      const signature = rendersignature(user, dragging);
      let node = loose.get(key);
      if (force || !node || node._tumsignature !== signature) {node = buildloosechip(user); node._tumsignature = signature; changed.push(node)}
      nodes.push(node);
    }
    syncfreeform(nodes);
    syncselection();
    if (userhover && !userhover.row.isConnected) clearuserhover();
    for (const node of O.foldernodes) if (node._tumrestore) {restorefolderview(node, node._tumrestore); delete node._tumrestore}
    updatequickstate();
    if (changed.length) schedulemarquees(changed);
    scheduleminimap();
    if (els.jumplist && !els.jumplist.hidden) buildjumprows(els.jumpsearch.value);
    if (activefolderfilters) refreshfolderfilters();
  }

  let marqueeraf = 0;
  const marqueeroots = new Set();
  function schedulemarquees(nodes) {
    for (const node of nodes || []) if (node) marqueeroots.add(node);
    if (marqueeraf) return;
    marqueeraf = requestAnimationFrame(() => {
      marqueeraf = 0;
      const targets = new Set();
      for (const node of marqueeroots) {
        if (!node.isConnected) continue;
        if (node.matches && node.matches(".tumfoldername, .tumfolderdesc, .tumfoldermembername, .tumloosechipname")) targets.add(node);
        for (const outer of node.querySelectorAll(".tumfoldername, .tumfolderdesc, .tumfoldermembername, .tumloosechipname")) targets.add(outer);
      }
      marqueeroots.clear();
      const measured = [...targets].map(outer => {
        const inner = outer.querySelector(".tummqinner");
        return {outer, dist: inner ? inner.scrollWidth - outer.clientWidth : 0};
      });
      for (const {outer, dist} of measured) {
        if (dist > 2) {
          outer.style.setProperty("--mqshift", -dist + "px");
          outer.style.setProperty("--mqdur", Math.max(4, dist / 25).toFixed(1) + "s");
          outer.classList.add("tummarqueeon");
        } else outer.classList.remove("tummarqueeon");
      }
    });
  }

  function isdragged(source, handle) {
    const d = state.drag;
    if (!d || !d.source || !d.user) return false;
    if ((d.user.handle || "").toLowerCase() !== (handle || "").toLowerCase()) return false;
    if (d.source.type !== source.type) return false;
    if (source.type === "folder") return d.source.id === source.id;
    return source.type === "unsorted";
  }

  function updatequickstate() {
    const active = !!(state.drag && state.drag.kind === "user");
    els.quickdelete.classList.toggle("tumdisabled", !active);
    els.quickreason.classList.toggle("tumdisabled", !active);
    for (const b of els.actionbtns) b.classList.toggle("tumdisabled", !active);
  }

    Object.assign(scope, {rendersignature, updatefoldersearchclear, filterfolderrows, restorefolderview, syncfreeform, selectionkey, syncselection, setselection, clearselection, setselectionbox, selectinrect, selecteditems, clonehistory, historyprofile, historykey, historychanges, commithistory, flushhistory, queuehistory, historybegin, historyend, restorehistorylist, restorehistory, historyundo, historyredo, installhistory, startselectiondrag, schedulerender, render, schedulemarquees, isdragged, updatequickstate});
  }
})();

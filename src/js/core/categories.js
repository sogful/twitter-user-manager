(function () {
  "use strict";

  window.tum = window.tum || {};

  const store = tum.storage.create("tum.categories");

  let list = [];
  const listeners = new Set();
  let resolveready;
  const ready = new Promise(res => {resolveready = res});

  const uid = () => "c" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
  function emit() {for (const cb of listeners) try {cb(list.slice())} catch {}}
  function persist() {store.set(list)}

  async function load() {
    const v = await store.get();
    list = Array.isArray(v) ? v : [];
    resolveready();
    emit();
  }
  load();

  store.subscribe(v => {list = Array.isArray(v) ? v : []; emit()});

  window.tum.categories = {
    ready,
    list: () => list.slice(),
    get: id => list.find(c => c.id === id),
    create(partial) {
      const c = {
        id: uid(),
        name: partial && partial.name || "Edit Me...",
        x: partial && typeof partial.x === "number" ? partial.x : 120,
        y: partial && typeof partial.y === "number" ? partial.y : 120,
        w: partial && typeof partial.w === "number" ? partial.w : 480,
        h: partial && typeof partial.h === "number" ? partial.h : 360
      };
      list.push(c);
      persist();
      emit();
      return c;
    },
    update(id, patch, silent) {
      const c = list.find(x => x.id === id);
      if (!c) return null;
      Object.assign(c, patch);
      persist();
      if (!silent) emit();
      return c;
    },
    move(id, x, y) {
      const c = list.find(x2 => x2.id === id);
      if (!c) return;
      c.x = x; c.y = y;
      persist();
      emit();
    },
    remove(id) {
      list = list.filter(c => c.id !== id);
      persist();
      emit();
    },
    subscribe: cb => {listeners.add(cb); return () => listeners.delete(cb)}
  };
})();

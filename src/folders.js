(function () {
  "use strict";

  window.tum = window.tum || {};

  const ACTIONS = ["follow", "mute", "block"];
  const COLORS = ["#1d9bf0", "#00ba7c", "#f91880", "#ffd400", "#7856ff", "#f4212e"];
  let colorcursor = 0;

  let list = [];
  const listeners = new Set();
  let loaded = false;
  let resolveready;
  const ready = new Promise(res => {resolveready = res});

  const uid = () => "f" + Date.now().toString(36) + Math.random().toString(36).slice(2, 8);

  function emit() {for (const cb of listeners) try {cb(list.slice())} catch {}}

  function persist() {tum.storage.set(list)}

  async function load() {
    const v = await tum.storage.get();
    list = Array.isArray(v) ? v : [];
    loaded = true;
    resolveready();
    emit();
  }
  load();

  tum.storage.subscribe(v => {
    list = Array.isArray(v) ? v : [];
    emit();
  });

  function nextcolor() {
    const c = COLORS[colorcursor % COLORS.length];
    colorcursor++;
    return c;
  }

  window.tum.folders = {
    ACTIONS, COLORS,
    ready,
    list: () => list.slice(),
    get: id => list.find(f => f.id === id),
    create(partial) {
      const folder = {
        id: uid(),
        name: (partial.name || "new folder").slice(0, 40),
        action: ACTIONS.includes(partial.action) ? partial.action : "follow",
        color: partial.color || nextcolor(),
        x: typeof partial.x === "number" ? partial.x : 50,
        y: typeof partial.y === "number" ? partial.y : 50
      };
      list.push(folder);
      persist();
      emit();
      return folder;
    },
    update(id, patch) {
      const f = list.find(x => x.id === id);
      if (!f) return null;
      Object.assign(f, patch);
      persist();
      emit();
      return f;
    },
    remove(id) {
      list = list.filter(f => f.id !== id);
      persist();
      emit();
    },
    subscribe: cb => {listeners.add(cb); return () => listeners.delete(cb)}
  };
})();

(function () {
  "use strict";

  window.tum = window.tum || {};

  // people dropped outside any folder - kept exactly where they were released instead of
  // vanishing, draggable later into a real folder (or moved around freely)
  const store = tum.storage.create("tum.unsorted");

  let list = [];
  const listeners = new Set();
  let resolveready;
  const ready = new Promise(res => {resolveready = res});

  function emit() {for (const cb of listeners) try {cb(list.slice())} catch {}}
  function persist() {store.set(list)}

  async function load() {
    const v = await store.get();
    list = Array.isArray(v) ? v : [];
    resolveready();
    emit();
  }
  load();

  store.subscribe(v => {
    list = Array.isArray(v) ? v : [];
    emit();
  });

  window.tum.unsorted = {
    ready,
    list: () => list.slice(),
    get: handle => list.find(m => m.handle.toLowerCase() === (handle || "").toLowerCase()),
    add(user, x, y) {
      const key = (user.handle || "").toLowerCase();
      const existing = list.find(m => m.handle.toLowerCase() === key);
      const entry = {
        handle: user.handle,
        displayname: user.displayname,
        avatarurl: user.avatarurl,
        sourceurl: user.sourceurl !== undefined ? user.sourceurl : (existing && existing.sourceurl) || null,
        reason: user.reason !== undefined ? user.reason : (existing && existing.reason) || "",
        badges: Array.isArray(user.badges) ? user.badges : (existing && existing.badges) || [],
        x: typeof x === "number" ? x : (existing ? existing.x : 50),
        y: typeof y === "number" ? y : (existing ? existing.y : 50)
      };
      list = list.filter(m => m.handle.toLowerCase() !== key);
      list.push(entry);
      persist();
      emit();
      return entry;
    },
    remove(handle) {
      list = list.filter(m => m.handle.toLowerCase() !== (handle || "").toLowerCase());
      persist();
      emit();
    },
    move(handle, x, y) {
      const m = list.find(m => m.handle.toLowerCase() === (handle || "").toLowerCase());
      if (!m) return;
      m.x = x; m.y = y;
      persist();
      emit();
    },
    setreason(handle, reason) {
      const m = list.find(m => m.handle.toLowerCase() === (handle || "").toLowerCase());
      if (!m) return;
      m.reason = reason;
      persist();
      emit();
    },
    subscribe: cb => {listeners.add(cb); return () => listeners.delete(cb)}
  };
})();

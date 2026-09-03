(function () {
  "use strict";

  window.tum = window.tum || {};

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
      const placed = user.placed !== undefined ? user.placed : (typeof x === "number" || !existing || existing.placed !== false);
      const entry = {
        handle: user.handle,
        displayname: user.displayname,
        avatarurl: user.avatarurl,
        sourceurl: user.sourceurl !== undefined ? user.sourceurl : (existing && existing.sourceurl) || null,
        reason: user.reason !== undefined ? user.reason : (existing && existing.reason) || "",
        badges: Array.isArray(user.badges) ? user.badges : (existing && existing.badges) || [],
        placed,
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
    setreason(handle, reason, sourceurl) {
      const m = list.find(m => m.handle.toLowerCase() === (handle || "").toLowerCase());
      if (!m) return;
      m.reason = reason;
      if (sourceurl !== undefined) m.sourceurl = sourceurl;
      persist();
      emit();
    },
    subscribe: cb => {listeners.add(cb); return () => listeners.delete(cb)}
  };
})();

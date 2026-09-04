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

  // one-time viewport-% -> absolute px, same as folders (stops resize from shifting chips)
  function migratepositions() {
    let changed = false;
    const w = window.innerWidth || 1280, h = window.innerHeight || 800;
    for (const m of list) if (m && m.pos !== "px") {
      m.x = Math.round((typeof m.x === "number" ? m.x : 50) / 100 * w);
      m.y = Math.round((typeof m.y === "number" ? m.y : 50) / 100 * h);
      m.pos = "px";
      changed = true;
    }
    if (changed) persist();
  }

  async function load() {
    const v = await store.get();
    list = Array.isArray(v) ? v : [];
    migratepositions();
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
        cat: user.cat !== undefined ? user.cat : (existing && existing.cat) || null,
        pos: "px",
        x: typeof x === "number" ? x : (existing ? existing.x : 80),
        y: typeof y === "number" ? y : (existing ? existing.y : 80)
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
    move(handle, x, y, silent) {
      const m = list.find(m => m.handle.toLowerCase() === (handle || "").toLowerCase());
      if (!m) return;
      m.x = x; m.y = y;
      persist();
      if (!silent) emit();
    },
    bulkmove(moves) {
      for (const mv of moves) {const m = list.find(x => x.handle.toLowerCase() === (mv.handle || "").toLowerCase()); if (m) {m.x = mv.x; m.y = mv.y}}
      persist();
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

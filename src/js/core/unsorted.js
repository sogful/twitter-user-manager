(function () {
  "use strict";

  window.tum = window.tum || {};

  const store = tum.storage.create("tum.unsorted");

  let list = [];
  let loadversion = 0;
  const listeners = new Set();
  let resolveready;
  const ready = new Promise(res => {resolveready = res});

  function emit() {for (const cb of listeners) try {cb(list.slice())} catch {}}
  function persist() {store.set(list)}

  function mergedmember(existing, user, x, y) {
    const entry = {
      handle: user.handle || (existing && existing.handle),
      displayname: user.displayname !== undefined ? user.displayname : (existing && existing.displayname),
      avatarurl: user.avatarurl != null ? user.avatarurl : (existing && existing.avatarurl),
      sourceurl: user.sourceurl !== undefined ? user.sourceurl : (existing && existing.sourceurl) || null,
      reason: user.reason !== undefined ? user.reason : (existing && existing.reason) || "",
      badges: Array.isArray(user.badges) ? user.badges : (existing && existing.badges) || [],
      placed: user.placed !== undefined ? user.placed : (typeof x === "number" || !existing || existing.placed !== false),
      cat: user.cat !== undefined ? user.cat : (existing && existing.cat) || null,
      pos: "px",
      x: typeof x === "number" ? x : (existing ? existing.x : 80),
      y: typeof y === "number" ? y : (existing ? existing.y : 80)
    };
    for (const key of ["userid", "createdat", "followers", "following", "tweets", "mediatweets", "favorites", "highlights", "verifiedtype", "blueverified", "protected"]) {
      if (user[key] !== undefined && user[key] !== null) entry[key] = user[key];
      else if (existing && existing[key] !== undefined) entry[key] = existing[key];
    }
    return entry;
  }

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
    const version = ++loadversion;
    const v = await store.get();
    if (version !== loadversion) return;
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
      const entry = mergedmember(existing, user, x, y);
      list = list.filter(m => m.handle.toLowerCase() !== key);
      list.push(entry);
      persist();
      emit();
      if (!entry.userid && tum.accountdata) tum.accountdata.enrich(entry.handle);
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
    refreshmember(handle, user) {
      const key = (handle || "").toLowerCase();
      let changed = false;
      list = list.map(m => {
        const sameid = user.userid && m.userid && String(user.userid) === String(m.userid);
        if (!sameid && m.handle.toLowerCase() !== key) return m;
        changed = true;
        return mergedmember(m, user);
      });
      if (changed) {persist(); emit()}
      return changed;
    },
    subscribe: cb => {listeners.add(cb); return () => listeners.delete(cb)}
  };
  window.addEventListener("tumaccountchange", load);
})();

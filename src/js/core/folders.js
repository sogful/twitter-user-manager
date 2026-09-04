(function () {
  "use strict";

  window.tum = window.tum || {};

  const ACTIONS = ["follow", "mute", "block"];
  // how colorful!
  const COLORS = ["#1d9bf0", "#00ba7c", "#f91880", "#ffd400", "#7856ff", "#f4212e"];
  let colorcursor = 0;
  let createcount = 0;

  let list = [];
  const listeners = new Set();
  let resolveready;
  const ready = new Promise(res => {resolveready = res});

  /*//////////////////////////////////////////////////////////////////////*/

  const uid = () => "f" + Date.now().toString(36) + Math.random().toString(36).slice(2, 8);

  function emit() {for (const cb of listeners) try {cb(list.slice())} catch {}}
  function persist() {tum.storage.set(list)}

  /*//////////////////////////////////////////////////////////////////////*/

  // positions used to be viewport percentages, which shifted folders around on resize.
  // one-time convert them to absolute px (using the current viewport as the reference)
  function migratepositions() {
    let changed = false;
    const w = window.innerWidth || 1280, h = window.innerHeight || 800;
    for (const f of list) {
      if (f && f.pos !== "px") {
        f.x = Math.round((typeof f.x === "number" ? f.x : 30) / 100 * w);
        f.y = Math.round((typeof f.y === "number" ? f.y : 30) / 100 * h);
        f.pos = "px";
        changed = true;
      }
    }
    if (changed) persist();
  }

  async function load() {
    const v = await tum.storage.get();
    list = Array.isArray(v) ? v : [];
    migratepositions();
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
      createcount++;
      const folder = {
        id: uid(),
        name: (partial.name || "new folder").slice(0, 40),
        action: ACTIONS.includes(partial.action) ? partial.action : null,
        color: partial.color || nextcolor(),
        icon: (partial.icon || "").slice(0, 64),
        sort: "added",
        collapsed: partial.collapsed !== undefined ? partial.collapsed : !!(window.tum.settings && tum.settings.get("startcollapsed")),
        cat: partial.cat || null,
        description: (partial.description || "").slice(0, 200),
        pos: "px",
        x: typeof partial.x === "number" ? partial.x : 60 + (createcount % 6) * 62,
        y: typeof partial.y === "number" ? partial.y : 80 + (createcount % 4) * 84,
        members: []
      };
      list.push(folder);
      persist();
      emit();
      return folder;
    },
    update(id, patch, silent) {
      const f = list.find(x => x.id === id);
      if (!f) return null;
      Object.assign(f, patch);
      persist();
      if (!silent) emit();
      return f;
    },
    move(id, x, y) {
      const f = list.find(x2 => x2.id === id);
      if (!f) return;
      f.x = x; f.y = y;
      persist();
      emit();
    },
    // apply many position updates in ONE persist (avoids per-item storage writes each
    // firing an onChanged -> render with a half-updated list, which flashed old positions)
    bulkmove(moves) {
      for (const m of moves) {const f = list.find(x => x.id === m.id); if (f) {f.x = m.x; f.y = m.y}}
      persist();
    },
    remove(id) {
      list = list.filter(f => f.id !== id);
      persist();
      emit();
    },

    addmember(id, user) {
      const f = list.find(x => x.id === id);
      if (!f) return null;
      if (!Array.isArray(f.members)) f.members = [];
      const key = (user.handle || "").toLowerCase();
      const existing = f.members.find(m => m.handle.toLowerCase() === key);
      f.members = f.members.filter(m => m.handle.toLowerCase() !== key);
      f.members.unshift({
        handle: user.handle,
        displayname: user.displayname,
        avatarurl: user.avatarurl,
        sourceurl: user.sourceurl !== undefined ? user.sourceurl : (existing && existing.sourceurl) || null,
        reason: user.reason !== undefined ? user.reason : (existing && existing.reason) || "",
        badges: Array.isArray(user.badges) ? user.badges : (existing && existing.badges) || []
      });
      persist();
      emit();
      return f;
    },
    removemember(id, handle) {
      const f = list.find(x => x.id === id);
      if (!f || !Array.isArray(f.members)) return null;
      const key = (handle || "").toLowerCase();
      f.members = f.members.filter(m => m.handle.toLowerCase() !== key);
      persist();
      emit();
      return f;
    },
    setmemberreason(id, handle, reason, sourceurl) {
      const f = list.find(x => x.id === id);
      if (!f || !Array.isArray(f.members)) return;
      const m = f.members.find(m => m.handle.toLowerCase() === (handle || "").toLowerCase());
      if (!m) return;
      m.reason = reason;
      if (sourceurl !== undefined) m.sourceurl = sourceurl;
      persist();
      emit();
    },
    subscribe: cb => {listeners.add(cb); return () => listeners.delete(cb)}
  };
})();

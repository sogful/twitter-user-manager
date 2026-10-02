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

  function compactavatar(value) {
    const match = /^https:\/\/pbs\.twimg\.com\/profile_images\/(.+)$/i.exec(value || "");
    return match ? match[1] : value;
  }
  function compactdate(value) {
    if (typeof value === "number") return value > 100000000000 ? Math.floor(value / 1000) : value;
    const time = Date.parse(value || "");
    return isNaN(time) ? value : Math.floor(time / 1000);
  }
  function badgeflag(value) {return value === true || value === 1 || String(value || "").toLowerCase() === "true"}
  function cleanbadges(badges) {
    return (Array.isArray(badges) ? badges : []).flatMap(badge => {
      if (typeof badge === "string" && /^(verified|blue|verifiedbusiness|verifiedgovernment|translator|translatormod|protected)$/.test(badge)) return [badge];
      if (typeof badge === "string" && /<svg\b/i.test(badge)) {
        const label = badge.toLowerCase();
        if (/icon-verified|verified account/.test(label)) return [/lineargradient/.test(label) ? "verifiedbusiness" : /#829aab/.test(label) ? "verifiedgovernment" : "verified"];
        if (/icon-lock|protected account/.test(label)) return ["protected"];
        if (/translator/.test(label)) return [/moderator|\bmod\b|r-1cvl2hr/.test(label) ? "translatormod" : "translator"];
      }
      if (badge && badge.type === "affiliation" && /^[A-Za-z0-9_]+$/.test(badge.handle || "")) return [{type: "affiliation", handle: badge.handle, avatarurl: compactavatar(badge.avatarurl) || null}];
      return [];
    });
  }

  function mergedmember(existing, user, x, y) {
    const entry = {
      handle: user.handle || (existing && existing.handle),
      displayname: user.displayname !== undefined ? user.displayname : (existing && existing.displayname),
      avatarurl: compactavatar(user.avatarurl != null ? user.avatarurl : (existing && existing.avatarurl)),
      sourceurl: user.sourceurl !== undefined ? user.sourceurl : (existing && existing.sourceurl) || null,
      reason: user.reason !== undefined ? user.reason : (existing && existing.reason) || "",
      badges: cleanbadges(Array.isArray(user.badges) ? user.badges : (existing && existing.badges)),
      placed: user.placed !== undefined ? user.placed : (typeof x === "number" || !existing || existing.placed !== false),
      cat: user.cat !== undefined ? user.cat : (existing && existing.cat) || null,
      pos: "px",
      x: typeof x === "number" ? x : (existing ? existing.x : 80),
      y: typeof y === "number" ? y : (existing ? existing.y : 80)
    };
    for (const key of ["userid", "createdat", "followers", "following", "tweets", "mediatweets", "favorites", "highlights", "verifiedtype", "blueverified", "protected", "unfindable", "pending"]) {
      const value = user[key] !== undefined && user[key] !== null ? user[key] : (existing && existing[key]);
      if (value !== undefined) entry[key] = key === "blueverified" ? badgeflag(value) : value;
    }
    entry.createdat = compactdate(entry.createdat);
    if (entry.userid || entry.unfindable) delete entry.pending;
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
    import(items, replace) {
      const next = replace ? [] : list.slice();
      const known = new Set(next.map(item => (item.handle || "").toLowerCase()));
      const added = [];
      for (const item of (Array.isArray(items) ? items : [])) {
        const key = (item && item.handle || "").toLowerCase();
        if (!key || known.has(key)) continue;
        const entry = mergedmember(null, item, item.x, item.y);
        next.push(entry);
        known.add(key);
        added.push(entry);
      }
      list = next;
      persist();
      emit();
      return added;
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

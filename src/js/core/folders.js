(function () {
  "use strict";

  window.tum = window.tum || {};
  const T = (...a) => tum.strings.t(...a);

  const ACTIONS = ["follow", "mute", "block"];
  const badgefiltertypes = new Set(["verified", "blue", "verifiedbusiness", "verifiedgovernment", "verifiedaffiliate", "protected", "affiliated", "translator", "translatormod"]);
  // how colorful!
  const COLORS = [
    // twitter classics
    "#1d9bf0", "#00ba7c", "#f91880", "#ffd400", "#7856ff", "#f4212e",
    // rainbow
    "#ff3b30", "#ff9500", "#ffcc00", "#ffee00", "#a3e635", "#34c759", "#00c7be", "#32ade6", "#007aff", "#5856d6", "#af52de", "#ff2d92",
    // misc
    "#ff6b6b", "#ff8fab", "#c9a26b", "#8b5e3c", "#7ee2b8", "#40e0d0", "#9acd32", "#d4af37", "#b0b8c0", "#71767b", "#3a3f44", "#e7e9ea"
  ];
  let colorcursor = 0;
  let createcount = 0;

  let list = [];
  let loadversion = 0;
  const listeners = new Set();
  let resolveready;
  const ready = new Promise(res => {resolveready = res});

  /*//////////////////////////////////////////////////////////////////////*/

  const uid = () => "f" + Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
  function folderscale(value) {
    if (typeof value !== "number" || !Number.isFinite(value)) return 1;
    return Math.min(2, Math.max(0.5, Math.round(value * 4) / 4));
  }

  function emit() {for (const cb of listeners) try {cb(list.slice())} catch {}}
  function persist() {tum.storage.set(list)}

  function makefolder(partial, ids) {
    partial = partial || {};
    createcount++;
    const folder = {
      id: partial.id && !ids.has(partial.id) ? partial.id : uid(),
      name: (partial.name || T("folder.default.name")).slice(0, 40),
      action: ACTIONS.includes(partial.action) ? partial.action : null,
      color: partial.color || nextcolor(),
      icon: (partial.icon || "").slice(0, 64),
      sort: partial.sort || "added",
      badgefilters: Array.isArray(partial.badgefilters) ? [...new Set(partial.badgefilters.filter(type => badgefiltertypes.has(type)))] : [],
      cat: partial.cat || null,
      description: (partial.description || "").slice(0, 200),
      scalex: folderscale(partial.scalex),
      scaley: folderscale(partial.scaley),
      twitterlist: (() => {
        const list = partial.twitterlist;
        const id = typeof list === "string" ? list : list && list.id;
        return /^\d+$/.test(String(id || "")) ? {id: String(id), private: !(list && list.private === false)} : null;
      })(),
      pos: "px",
      x: typeof partial.x === "number" ? partial.x : 60 + (createcount % 6) * 62,
      y: typeof partial.y === "number" ? partial.y : 80 + (createcount % 4) * 84,
      members: []
    };
    ids.add(folder.id);
    for (const member of (Array.isArray(partial.members) ? partial.members : [])) {
      if (!member || !member.handle) continue;
      folder.members.unshift(mergedmember(null, member));
    }
    return folder;
  }

  /*//////////////////////////////////////////////////////////////////////*/

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
    const version = ++loadversion;
    const v = await tum.storage.get();
    if (version !== loadversion) return;
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
    const cleaned = (Array.isArray(badges) ? badges : []).flatMap(badge => {
      if (typeof badge === "string" && /^(verified|blue|verifiedbusiness|verifiedgovernment|verifiedaffiliate|translator|translatormod|protected)$/.test(badge)) return [badge];
      if (typeof badge === "string" && /<svg\b/i.test(badge)) {
        const label = badge.toLowerCase();
        if (/icon-verified|verified account/.test(label)) return [/lineargradient/.test(label) ? "verifiedbusiness" : /#829aab/.test(label) ? "verifiedgovernment" : "verified"];
        if (/icon-lock|protected account/.test(label)) return ["protected"];
        if (/translator/.test(label)) return [/moderator|\bmod\b|r-1cvl2hr/.test(label) ? "translatormod" : "translator"];
      }
      if (badge && badge.type === "affiliation" && /^[A-Za-z0-9_]+$/.test(badge.handle || "")) return [{type: "affiliation", handle: badge.handle, avatarurl: compactavatar(badge.avatarurl) || null}];
      return [];
    });
    const seen = new Set();
    return cleaned.filter(badge => {
      const key = badge && typeof badge === "object" ? "affiliation" : String(badge);
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }

  function mergedmember(existing, user) {
    const entry = {
      handle: user.handle || (existing && existing.handle),
      displayname: user.displayname !== undefined ? user.displayname : (existing && existing.displayname),
      avatarurl: compactavatar(user.avatarurl != null ? user.avatarurl : (existing && existing.avatarurl)),
      sourceurl: user.sourceurl !== undefined ? user.sourceurl : (existing && existing.sourceurl) || null,
      reason: user.reason !== undefined ? user.reason : (existing && existing.reason) || "",
      badges: cleanbadges(Array.isArray(user.badges) ? user.badges : (existing && existing.badges)),
    };
    for (const key of ["userid", "createdat", "followers", "following", "tweets", "mediatweets", "favorites", "highlights", "verifiedtype", "verificationkind", "translatortype", "blueverified", "protected", "unfindable", "pending"]) {
      const value = user[key] !== undefined && user[key] !== null ? user[key] : (existing && existing[key]);
      if (value !== undefined) entry[key] = key === "blueverified" ? badgeflag(value) : value;
    }
    entry.createdat = compactdate(entry.createdat);
    if (entry.userid || entry.unfindable) delete entry.pending;
    return entry;
  }

  window.tum.folders = {
    ACTIONS, COLORS,
    ready,
    list: () => list.slice(),
    get: id => list.find(f => f.id === id),
    create(partial) {
      const folder = makefolder(partial, new Set(list.map(item => item.id)));
      list.push(folder);
      persist();
      emit();
      return folder;
    },
    import(items, replace) {
      const next = replace ? [] : list.slice();
      const ids = new Set(next.map(item => item.id));
      const added = [];
      for (const item of (Array.isArray(items) ? items : [])) {
        if (!item || typeof item !== "object") continue;
        const folder = makefolder(item, ids);
        next.push(folder);
        added.push(folder);
      }
      list = next;
      persist();
      emit();
      return added;
    },
    update(id, patch, silent) {
      const f = list.find(x => x.id === id);
      if (!f) return null;
      if (!patch || !Object.keys(patch).some(key => f[key] !== patch[key])) return f;
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
      f.members.unshift(mergedmember(existing, user));
      persist();
      emit();
      if (!f.members[0].userid && tum.accountdata) tum.accountdata.enrich(f.members[0].handle);
      return f;
    },
    addmembers(id, users) {
      const f = list.find(x => x.id === id);
      if (!f || !Array.isArray(users) || !users.length) return 0;
      if (!Array.isArray(f.members)) f.members = [];
      let added = 0;
      for (const user of users) {
        const key = (user && user.handle || "").toLowerCase();
        if (!key) continue;
        const existing = f.members.find(m => m.handle.toLowerCase() === key);
        f.members = f.members.filter(m => m.handle.toLowerCase() !== key);
        f.members.unshift(mergedmember(existing, user));
        added++;
      }
      if (!added) return 0;
      persist();
      emit();
      return added;
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
    refreshmember(handle, user) {
      const key = (handle || "").toLowerCase();
      let changed = false;
      for (const f of list) if (Array.isArray(f.members)) {
        f.members = f.members.map(m => {
          const sameid = user.userid && m.userid && String(user.userid) === String(m.userid);
          if (!sameid && m.handle.toLowerCase() !== key) return m;
          changed = true;
          return mergedmember(m, user);
        });
      }
      if (changed) {persist(); emit()}
      return changed;
    },
    subscribe: cb => {listeners.add(cb); return () => listeners.delete(cb)}
  };
  window.addEventListener("tumaccountchange", load);
})();

(function () {
  "use strict";

  window.tum = window.tum || {};

  const HASCHROME = typeof chrome !== "undefined" && chrome.storage && chrome.storage.local;

  // which account is logged in right now. the twid cookie holds the current
  // account id as "u=<id>" (url-encoded "u%3D<id>"); auth_multi lists all of them
  // but we only need the active one. folders/notes/queue are namespaced per account
  // since the block/mute/follow actions only ever apply to the logged-in account -
  // showing another account's list here would be meaningless. settings stay global.
  function accountid() {
    try {
      const m = document.cookie.match(/(?:^|;\s*)twid=([^;]+)/);
      if (m) {
        const dec = decodeURIComponent(m[1]);
        const im = dec.match(/u=?(\d+)/);
        if (im) return im[1];
        const dm = m[1].match(/(\d{5,})/);
        if (dm) return dm[1];
      }
    } catch {}
    return null;
  }
  const ACCT = accountid();
  window.tum.accountid = ACCT;
  const NS = ACCT ? "a" + ACCT + "." : ""; // per-account key prefix ("" = not logged in / legacy)

  /*//////////////////////////////////////////////////////////////////////*/
  // one-time migration: the account that first runs this build inherits the old
  // un-namespaced folders/notes. guarded by a GLOBAL flag so switching accounts
  // later doesn't copy that same data onto a second account.
  const MIGKEY = "tum.migrated.v2";
  const LEGACY = ["tum.folders", "tum.unsorted"];
  if (NS) {
    if (HASCHROME) {
      chrome.storage.local.get([MIGKEY, ...LEGACY, ...LEGACY.map(k => NS + k)], r => {
        void chrome.runtime.lastError;
        if (!r || r[MIGKEY]) return;
        const writes = {[MIGKEY]: true};
        for (const k of LEGACY) if (r[k] != null && r[NS + k] == null) writes[NS + k] = r[k];
        chrome.storage.local.set(writes, () => void chrome.runtime.lastError);
      });
    } else {
      try {
        if (!localStorage.getItem(MIGKEY)) {
          for (const k of LEGACY) {
            const old = localStorage.getItem(k);
            if (old != null && localStorage.getItem(NS + k) == null) localStorage.setItem(NS + k, old);
          }
          localStorage.setItem(MIGKEY, "1");
        }
      } catch {}
    }
  }

  // if the logged-in account changes under us (account switch), reload so the right
  // profile loads. debounced so a momentary cookie flicker doesn't reload.
  let switchtimer = 0;
  setInterval(() => {
    if (accountid() === ACCT) {clearTimeout(switchtimer); switchtimer = 0; return}
    if (!switchtimer) switchtimer = setTimeout(() => {if (accountid() !== ACCT) {try {location.reload()} catch {}}}, 1500);
  }, 2000);

  /*//////////////////////////////////////////////////////////////////////*/

  function create(key, opts) {
    const rk = opts && opts.global ? key : NS + key; // real storage key
    const listeners = new Set();
    function notify(v) {for (const cb of listeners) try {cb(v)} catch {}}

    function get() {
      return new Promise(res => {
        if (HASCHROME) {
          chrome.storage.local.get([rk], r => {void chrome.runtime.lastError; res(r && r[rk] || null)});
        } else {
          let v = null;
          try {v = JSON.parse(localStorage.getItem(rk) || "null")} catch {}
          res(v);
        }
      });
    }

    function set(value) {
      return new Promise(res => {
        if (HASCHROME) {
          chrome.storage.local.set({[rk]: value}, () => {void chrome.runtime.lastError; res()});
        } else {
          try {localStorage.setItem(rk, JSON.stringify(value))} catch {}
          res();
        }
      });
    }

    if (HASCHROME) {
      chrome.storage.onChanged.addListener((changes, area) => {
        if (area === "local" && changes[rk]) notify(changes[rk].newValue);
      });
    } else {
      window.addEventListener("storage", e => {
        if (e.key !== rk) return;
        let v = null;
        try {v = JSON.parse(e.newValue || "null")} catch {}
        notify(v);
      });
    }

    return {get, set, subscribe: cb => {listeners.add(cb); return () => listeners.delete(cb)}};
  }

  window.tum.storage = create("tum.folders");
  window.tum.storage.create = create;
})();

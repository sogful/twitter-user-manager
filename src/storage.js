(function () {
  "use strict";

  window.tum = window.tum || {};

  const HASCHROME = typeof chrome !== "undefined" && chrome.storage && chrome.storage.local;

  function create(key) {
    const listeners = new Set();
    function notify(v) {for (const cb of listeners) try {cb(v)} catch {}}

    function get() {
      return new Promise(res => {
        if (HASCHROME) {
          chrome.storage.local.get([key], r => {void chrome.runtime.lastError; res(r && r[key] || null)});
        } else {
          let v = null;
          try {v = JSON.parse(localStorage.getItem(key) || "null")} catch {}
          res(v);
        }
      });
    }

    function set(value) {
      return new Promise(res => {
        if (HASCHROME) {
          chrome.storage.local.set({[key]: value}, () => {void chrome.runtime.lastError; res()});
        } else {
          try {localStorage.setItem(key, JSON.stringify(value))} catch {}
          res();
        }
      });
    }

    if (HASCHROME) {
      chrome.storage.onChanged.addListener((changes, area) => {
        if (area === "local" && changes[key]) notify(changes[key].newValue);
      });
    } else {
      window.addEventListener("storage", e => {
        if (e.key !== key) return;
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

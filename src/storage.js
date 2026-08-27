(function () {
  "use strict";

  window.tum = window.tum || {};

  const KEY = "tum.folders";
  const HASCHROME = typeof chrome !== "undefined" && chrome.storage && chrome.storage.local;
  const listeners = new Set();

  function notify(v) {for (const cb of listeners) try {cb(v)} catch {}}

  function get() {
    return new Promise(res => {
      if (HASCHROME) {
        chrome.storage.local.get([KEY], r => {void chrome.runtime.lastError; res(r && r[KEY] || null)});
      } else {
        let v = null;
        try {v = JSON.parse(localStorage.getItem(KEY) || "null")} catch {}
        res(v);
      }
    });
  }

  function set(value) {
    return new Promise(res => {
      if (HASCHROME) {
        chrome.storage.local.set({[KEY]: value}, () => {void chrome.runtime.lastError; res()});
      } else {
        try {localStorage.setItem(KEY, JSON.stringify(value))} catch {}
        res();
      }
    });
  }

  if (HASCHROME) {
    chrome.storage.onChanged.addListener((changes, area) => {
      if (area === "local" && changes[KEY]) notify(changes[KEY].newValue);
    });
  } else {
    window.addEventListener("storage", e => {
      if (e.key !== KEY) return;
      let v = null;
      try {v = JSON.parse(e.newValue || "null")} catch {}
      notify(v);
    });
  }

  window.tum.storage = {
    get, set,
    subscribe: cb => {listeners.add(cb); return () => listeners.delete(cb)}
  };
})();

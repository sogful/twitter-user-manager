(function () {
  "use strict";

  window.tum = window.tum || {};

  const map = {};
  let url = "assets/static/strings.json";
  try {url = chrome.runtime.getURL("assets/static/strings.json")} catch {}
  const ready = fetch(url).then(r => r.json()).then(j => {Object.assign(map, j)}).catch(() => {});

  window.tum.strings = {
    ready,
    t(key, ...subs) {
      let s = map[key] != null ? map[key] : key;
      let i = 0;
      return String(s).replace(/%s/g, () => (i < subs.length ? subs[i++] : "%s"));
    }
  };
})();

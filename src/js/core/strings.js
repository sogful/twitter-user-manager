(function () {
  "use strict";

  window.tum = window.tum || {};

  // user-facing text lives in assets/static/strings.json; t(key, ...subs) looks it up and fills %s
  // placeholders in order, falling back to the key itself if the file hasn't loaded / lacks the key
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

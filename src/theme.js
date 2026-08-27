(function () {
  "use strict";

  window.tum = window.tum || {};

  // lifted from twitter-flags' theme detection: read the page's actual background
  // color instead of guessing, since x.com ships light/dim/lights-out and nothing else tells us which
  function rgbof(str) {
    const m = /rgba?\(([^)]+)\)/.exec(str || "");
    if (!m) return null;
    const p = m[1].split(",").map(x => parseFloat(x));
    if (p.length < 3) return null;
    if (p.length >= 4 && p[3] === 0) return null;
    return [p[0] || 0, p[1] || 0, p[2] || 0];
  }
  function hexof(h) {
    const m = /^#?([0-9a-f]{6})$/i.exec((h || "").trim());
    if (!m) return null;
    const n = parseInt(m[1], 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  }
  function luminance(rgb) {
    const c = rgb.map(v => {v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)});
    return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
  }

  function backgroundrgb() {
    try {
      let bg = document.body && rgbof(getComputedStyle(document.body).backgroundColor);
      if (!bg && document.documentElement) bg = rgbof(getComputedStyle(document.documentElement).backgroundColor);
      if (!bg) {const m = document.querySelector('meta[name="theme-color"]'); if (m) bg = hexof(m.getAttribute("content"))}
      return bg;
    } catch {return null}
  }

  window.tum.theme = {
    css: () => {const rgb = backgroundrgb(); return rgb ? `rgb(${rgb[0]},${rgb[1]},${rgb[2]})` : "#000"},
    isdark: () => {const rgb = backgroundrgb(); return rgb ? luminance(rgb) <= 0.5 : true},
    fg: () => {
      try {const c = getComputedStyle(document.body).color; if (c) return c} catch {}
      return window.tum.theme.isdark() ? "#e7e9ea" : "#0f1419";
    }
  };
})();

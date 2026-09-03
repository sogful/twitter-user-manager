(function () {
  "use strict";

  window.tum = window.tum || {};

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

  function classify() {
    const rgb = backgroundrgb();
    if (!rgb) return "dark";
    if (luminance(rgb) > 0.5) return "light";
    return (rgb[0] + rgb[1] + rgb[2]) <= 24 ? "dark" : "dim";
  }

  /*//////////////////////////////////////////////////////////////////////*/

  const PALETTES = {
    dark: {
      elev: "#16181c", deep: "#000000", border: "#2f3336", input: "#000000",
      inputborder: "#37434d", text: "#e7e9ea", muted: "#71767b",
      hover: "rgba(255,255,255,0.06)", cancelborder: "#536471", backdrop: "rgba(0,0,0,0.72)"
    },
    dim: {
      elev: "#1e2732", deep: "#15202b", border: "#38444d", input: "#15202b",
      inputborder: "#38444d", text: "#f7f9f9", muted: "#8b98a5",
      hover: "rgba(255,255,255,0.06)", cancelborder: "#38444d", backdrop: "rgba(0,0,0,0.72)"
    },
    light: {
      elev: "white", deep: "white", border: "#eff3f4", input: "white",
      inputborder: "#cfd9de", text: "#0f1419", muted: "#536471",
      hover: "rgba(0,0,0,0.03)", cancelborder: "#cfd9de", backdrop: "rgba(0,0,0,0.6)"
    }
  };
  
  /*//////////////////////////////////////////////////////////////////////*/

  window.tum.theme = {
    css: () => {const rgb = backgroundrgb(); return rgb ? `rgb(${rgb[0]},${rgb[1]},${rgb[2]})` : "#000"},
    isdark: () => {const rgb = backgroundrgb(); return rgb ? luminance(rgb) <= 0.5 : true},
    fg: () => {
      try {const c = getComputedStyle(document.body).color; if (c) return c} catch {}
      return window.tum.theme.isdark() ? "#e7e9ea" : "#0f1419";
    },
    classify,
    palette: () => PALETTES[classify()] || PALETTES.dark
  };
})();

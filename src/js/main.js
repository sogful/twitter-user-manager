(function () {
  "use strict";

  function safe(label, fn) {try {fn()} catch (e) {console.warn("[tum] " + label + " failed:", e)}}

  function injectpagecss() {
    if (document.querySelector("style[data-tumpagecss]")) return;
    let href = "../css/page.css";
    try {href = chrome.runtime.getURL("src/css/page.css")} catch {}
    fetch(href).then(r => r.text()).then(css => {
      if (document.querySelector("style[data-tumpagecss]")) return;
      const st = document.createElement("style");
      st.setAttribute("data-tumpagecss", "");
      st.textContent = css;
      (document.head || document.documentElement).appendChild(st);
    }).catch(() => {});
  }

  function init() {
    safe("pagecss", injectpagecss);
    safe("overlay", () => tum.overlay.mount());
    safe("dragdetect", () => tum.dragdetect.init());
    safe("newuser", () => tum.newuser.init());
    safe("lists", () => tum.lists.init());
    safe("badges", () => tum.badges.init());
    safe("suggest", () => tum.suggest.init());
    safe("profileinfo", () => tum.profileinfo.init());
    safe("settings", () => tum.settings.init());
    setInterval(() => {if (!document.getElementById("tum-host")) safe("overlay", () => tum.overlay.mount())}, 4000);
  }

  function boot() {
    const go = () => {if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, {once: true}); else init()};
    if (window.tum && tum.strings && tum.strings.ready) tum.strings.ready.then(go, go);
    else go();
  }
  boot();
})();

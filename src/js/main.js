(function () {
  "use strict";

  function safe(label, fn) {try {fn()} catch (e) {console.warn("[tum] " + label + " failed:", e)}}

  function injectpagecss() {
    if (document.querySelector("link[data-tumpagecss]")) return;
    let href = "../css/page.css";
    try {href = chrome.runtime.getURL("src/css/page.css")} catch {}
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    link.setAttribute("data-tumpagecss", "");
    (document.head || document.documentElement).appendChild(link);
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

  // wait for the strings file before rendering so labels/toasts don't flash their fallback keys
  function boot() {
    const go = () => {if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, {once: true}); else init()};
    if (window.tum && tum.strings && tum.strings.ready) tum.strings.ready.then(go, go);
    else go();
  }
  boot();
})();

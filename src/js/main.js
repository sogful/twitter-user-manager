(function () {
  "use strict";

  function safe(label, fn) {try {fn()} catch (e) {console.warn("[tum] " + label + " failed:", e)}}

  function init() {
    safe("overlay", () => tum.overlay.mount());
    safe("dragdetect", () => tum.dragdetect.init());
    safe("badges", () => tum.badges.init());
    safe("suggest", () => tum.suggest.init());
    safe("profileinfo", () => tum.profileinfo.init());
    safe("settings", () => tum.settings.init());
    setInterval(() => {if (!document.getElementById("tum-host")) safe("overlay", () => tum.overlay.mount())}, 4000);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, {once: true});
  else init();
})();

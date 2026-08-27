(function () {
  "use strict";

  function init() {
    tum.overlay.mount();
    tum.dragdetect.init();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, {once: true});
  else init();
})();

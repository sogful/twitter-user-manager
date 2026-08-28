(function () {
  "use strict";

  function init() {
    tum.overlay.mount();
    tum.dragdetect.init();
    tum.badges.init();
    tum.suggest.init();
    // x.com is a single-page app and never reloads on navigation, so this only ever runs
    // once - if the overlay host ever gets evicted from the DOM on some route, self-heal
    // instead of silently staying gone for the rest of the tab's life
    setInterval(() => {if (!document.getElementById("tum-host")) tum.overlay.mount()}, 4000);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, {once: true});
  else init();
})();

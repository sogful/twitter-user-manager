(function () {
  "use strict";

  window.tum = window.tum || {};
  window.tum.sharepage = true;

  function attachbutton() {
    const button = document.getElementById("addtotum");
    if (!button || button.dataset.tumReady) return !!button;
    button.dataset.tumReady = "true";
    button.disabled = false;
    button.addEventListener("click", async () => {
      if (button.dataset.tumAdded) return;
      button.disabled = true;
      button.textContent = "Adding to Twitter User Manager…";
      try {
        const data = JSON.parse(document.getElementById("listdata").textContent);
        await tum._ov.importsharedentry(data);
        button.dataset.tumAdded = "true";
        button.textContent = "Added to Twitter User Manager";
        tum.overlay.open();
        hidexcontrols();
      } catch {
        button.disabled = false;
        button.textContent = "Couldn’t add to Twitter User Manager";
      }
    });
    return true;
  }

  function hidexcontrols() {
    const root = tum._ov && tum._ov.root;
    if (!root) return false;
    for (const node of root.querySelectorAll(".tumactionbar, .tumtoolsright, .tumreasonactions")) node.style.display = "none";
    return true;
  }

  function init() {
    const root = tum._ov && tum._ov.root;
    if (root) {
      const observer = new MutationObserver(() => {hidexcontrols()});
      observer.observe(root, {childList: true, subtree: true});
      hidexcontrols();
    }
    if (attachbutton()) return;
    const observer = new MutationObserver(() => {
      if (attachbutton()) observer.disconnect();
    });
    observer.observe(document.documentElement, {childList: true, subtree: true});
  }

  window.tum.sharebridge = {init};
})();

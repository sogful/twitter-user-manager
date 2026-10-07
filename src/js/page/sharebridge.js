(function () {
  "use strict";

  window.tum = window.tum || {};
  window.tum.sharepage = true;

  function label(button, value) {
    const text = button.querySelector(".addlabel");
    if (text) text.textContent = value;
  }

  function attachbutton() {
    const button = document.getElementById("addtotum");
    if (!button || button.dataset.tumReady) return !!button;
    button.dataset.tumReady = "true";
    button.href = location.pathname + location.search + "#add";
    button.removeAttribute("target");
    button.removeAttribute("rel");
    button.addEventListener("click", async event => {
      event.preventDefault();
      if (button.dataset.tumAdded) return;
      button.setAttribute("aria-disabled", "true");
      button.classList.add("working");
      label(button, "Adding to Twitter User Manager…");
      history.replaceState(null, "", location.pathname + location.search + "#add");
      try {
        await tum.overlay.mount();
        const data = JSON.parse(document.getElementById("listdata").textContent);
        await tum._ov.importsharedentry(data);
        button.dataset.tumAdded = "true";
        button.setAttribute("aria-disabled", "true");
        button.classList.remove("working");
        button.classList.add("added");
        label(button, "Added to Twitter User Manager");
        tum.overlay.open();
        hidexcontrols();
      } catch {
        button.removeAttribute("aria-disabled");
        button.classList.remove("working");
        label(button, "Couldn’t add to Twitter User Manager");
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

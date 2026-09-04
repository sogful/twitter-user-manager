(function () {
  "use strict";

  window.tum = window.tum || {};

  const KINDS = {
    blocked: {re: /^\/settings\/blocked/, label: "blocked"},
    muted: {re: /^\/settings\/muted\/all/, label: "muted"}
  };

  // dismissals persist (global - it's a UI hint, not account data) so a dismissed
  // banner stays gone across sessions and account switches
  const dstore = tum.storage.create("tum.suggestdismissed", {global: true});
  let dismissed = new Set();
  dstore.get().then(v => {if (Array.isArray(v)) {dismissed = new Set(v); refresh()}});
  dstore.subscribe(v => {if (Array.isArray(v)) {dismissed = new Set(v); refresh()}});

  let banner = null;

  function currentkind() {
    for (const k in KINDS) if (KINDS[k].re.test(location.pathname)) return k;
    return null;
  }

  function removebanner() {
    if (banner) {banner.remove(); banner = null}
  }

  function buildbanner(kind) {
    const pal = tum.theme.palette();
    const b = document.createElement("div");
    b.className = "tumsuggestbanner";
    b.dataset.kind = kind;
    b.style.borderBottom = "1px solid " + pal.border;
    b.style.background = pal.hover;
    b.style.color = pal.text;
    b.innerHTML =
      '<span class="tumsuggesttext">You can sort your ' + KINDS[kind].label + ' tab into folders from here!</span>' +
      '<button class="tumsuggestx">Dismiss</button>';
    b.querySelector(".tumsuggestx").style.color = pal.muted;
    b.querySelector(".tumsuggestx").addEventListener("click", () => {
      dismissed.add(kind);
      dstore.set([...dismissed]);
      removebanner();
    });
    return b;
  }

  function listcontainer() {
    const cells = document.querySelectorAll('[data-testid="UserCell"]');
    if (!cells.length) return null;
    const total = cells.length;
    let node = cells[0];
    while (node.parentElement && node.parentElement !== document.body) {
      if (node.parentElement.querySelectorAll('[data-testid="UserCell"]').length === total) return node.parentElement;
      node = node.parentElement;
    }
    return cells[0].parentElement;
  }

  function refresh() {
    const kind = currentkind();
    const container = listcontainer();
    if (!kind || dismissed.has(kind) || !container) {removebanner(); return}
    if (banner && banner.dataset.kind === kind && banner.parentElement === container && container.firstChild === banner) return;
    removebanner();
    banner = buildbanner(kind);
    container.insertBefore(banner, container.firstChild);
  }

  let scheduled = 0;
  function schedule() {
    if (scheduled) return;
    scheduled = setTimeout(() => {scheduled = 0; refresh()}, 120);
  }

  window.tum.suggest = {
    refresh,
    init() {
      new MutationObserver(schedule).observe(document.body, {childList: true, subtree: true});
      setInterval(refresh, 1000);
      schedule();
    }
  };
})();

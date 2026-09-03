(function () {
  "use strict";

  window.tum = window.tum || {};

  const KINDS = {
    blocked: {re: /^\/settings\/blocked/, label: "blocked"},
    muted: {re: /^\/settings\/muted\/all/, label: "muted"}
  };
  const FONT = '"TwitterChirp","Chirp",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif';

  let banner = null, dismissed = new Set();

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
    b.style.cssText = "display:flex;align-items:center;gap:10px;padding:12px 16px;font-family:" + FONT + ";border-bottom:1px solid " + pal.border + ";background:" + pal.hover + ";color:" + pal.text;
    b.innerHTML =
      '<span style="flex:1;font-size:13px;line-height:1.35">You can sort your ' + KINDS[kind].label + ' tab into folders from here!</span>' +
      '<button class="tumsuggestx" style="background:none;border:none;color:' + pal.muted + ';cursor:pointer;font-size:13px;font-weight:700;padding:4px 8px;font-family:inherit">dismiss</button>';
    b.querySelector(".tumsuggestx").addEventListener("click", () => {dismissed.add(kind); removebanner()});
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
      let lastpath = location.pathname;
      setInterval(() => {
        if (location.pathname !== lastpath) {lastpath = location.pathname; if (!currentkind()) dismissed.clear()}
        refresh();
      }, 1000);
      schedule();
    }
  };
})();

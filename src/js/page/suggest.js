(function () {
  "use strict";

  window.tum = window.tum || {};

  // twitter's own blocked / muted-accounts settings pages are concrete, ready-made lists - offer
  // to pull them straight into a folder instead of re-sorting everyone by hand. a small side panel
  // shows up only on those two pages, scrapes the (virtualized) list by scrolling it, and files
  // everyone into a matching folder. the folder's action is set so it keeps working as a real
  // block/mute folder for anyone dragged in later, but importing the already-blocked/muted ones
  // never re-runs the action (addmember doesn't)
  const KINDS = {
    blocked: {re: /^\/settings\/blocked/, name: "Blocked accounts", action: "block", color: "#f4212e", label: "blocked"},
    muted: {re: /^\/settings\/muted\/all/, name: "Muted accounts", action: "mute", color: "#ffd400", label: "muted"}
  };

  const sleep = ms => new Promise(r => setTimeout(r, ms));
  let panel = null, dismissed = new Set();

  function currentkind() {
    for (const k in KINDS) if (KINDS[k].re.test(location.pathname)) return k;
    return null;
  }

  function extractrows() {
    const out = [];
    for (const cell of document.querySelectorAll('[data-testid="UserCell"]')) {
      let handle = null, avatarurl = null, displayname = null;
      const av = cell.querySelector('[data-testid^="UserAvatar-Container-"]');
      if (av) {
        const m = /UserAvatar-Container-(.+)$/.exec(av.getAttribute("data-testid") || "");
        if (m) handle = m[1];
        const img = av.querySelector("img");
        if (img) avatarurl = img.src;
      }
      for (const a of cell.querySelectorAll('a[role="link"][href^="/"]')) {
        const t = (a.textContent || "").trim();
        if (t && !t.startsWith("@")) {displayname = t; break}
      }
      if (handle) out.push({handle, displayname: displayname || handle, avatarurl});
    }
    return out;
  }

  // scroll the list a bounded number of times, collecting rows as they virtualize in
  async function scrapeall() {
    const map = new Map();
    const collect = () => {for (const u of extractrows()) if (!map.has(u.handle.toLowerCase())) map.set(u.handle.toLowerCase(), u)};
    let stagnant = 0;
    for (let i = 0; i < 60 && stagnant < 3; i++) {
      collect();
      const before = map.size;
      window.scrollTo(0, document.documentElement.scrollHeight);
      await sleep(450);
      collect();
      stagnant = map.size === before ? stagnant + 1 : 0;
    }
    window.scrollTo(0, 0);
    return [...map.values()];
  }

  function folderfor(kind) {
    const cfg = KINDS[kind];
    const existing = tum.folders.list().find(f => f.name === cfg.name);
    if (existing) return existing;
    return tum.folders.create({name: cfg.name, action: cfg.action, color: cfg.color});
  }

  async function sortnow(kind, btn) {
    const cfg = KINDS[kind];
    btn.textContent = "sorting..";
    btn.disabled = true;
    const users = await scrapeall();
    const folder = folderfor(kind);
    for (const u of users) tum.folders.addmember(folder.id, u);
    dismissed.add(kind); // don't re-offer this page for the rest of the visit
    removepanel();
    tum.overlay.openandflash(folder.id);
    tum.overlay.toast("filed " + users.length + " " + cfg.label + " accounts into a folder");
  }

  function removepanel() {
    if (panel) {panel.remove(); panel = null}
  }

  function buildpanel(kind) {
    const cfg = KINDS[kind];
    const pal = tum.theme.palette();
    const p = document.createElement("div");
    p.className = "tumsuggestpanel";
    p.style.cssText = "position:fixed;top:96px;right:18px;z-index:2147483000;width:250px;padding:16px;border-radius:16px;font-family:inherit;border:1px solid " + pal.border + ";background:" + pal.elev + ";color:" + pal.text;
    p.innerHTML =
      '<div style="font-size:15px;font-weight:800;margin-bottom:4px">sort your ' + cfg.label + ' list</div>' +
      '<div style="font-size:13px;line-height:1.35;color:' + pal.muted + ';margin-bottom:12px">this is a ready-made list - file everyone here into a folder in one go.</div>' +
      '<button class="tumsuggestgo" style="width:100%;background:#1d9bf0;color:#fff;border:none;border-radius:999px;padding:9px 16px;font-weight:700;font-size:14px;cursor:pointer">sort into a folder</button>' +
      '<button class="tumsuggestx" style="position:absolute;top:10px;right:10px;background:none;border:none;color:' + pal.muted + ';cursor:pointer;font-size:16px;line-height:1;padding:2px">x</button>';
    p.querySelector(".tumsuggestgo").addEventListener("click", () => sortnow(kind, p.querySelector(".tumsuggestgo")));
    p.querySelector(".tumsuggestx").addEventListener("click", () => {dismissed.add(kind); removepanel()});
    document.body.appendChild(p);
    return p;
  }

  function refresh() {
    const kind = currentkind();
    if (!kind || dismissed.has(kind) || !document.querySelector('[data-testid="UserCell"]')) {
      removepanel();
      return;
    }
    if (panel && panel.dataset.kind === kind) return;
    removepanel();
    panel = buildpanel(kind);
    panel.dataset.kind = kind;
  }

  // setTimeout, not requestAnimationFrame - rAF is paused on a backgrounded tab, and the list
  // often finishes loading while the tab isn't focused
  let scheduled = 0;
  function schedule() {
    if (scheduled) return;
    scheduled = setTimeout(() => {scheduled = 0; refresh()}, 120);
  }

  window.tum.suggest = {
    refresh,
    init() {
      new MutationObserver(schedule).observe(document.body, {childList: true, subtree: true});
      // leaving a blocked/muted page should clear the dismissal so it can offer again next visit
      let lastpath = location.pathname;
      setInterval(() => {
        if (location.pathname !== lastpath) {lastpath = location.pathname; if (!currentkind()) dismissed.clear()}
        refresh();
      }, 1000);
      schedule();
    }
  };
})();

(function () {
  "use strict";

  window.tum = window.tum || {};

  const T = (...a) => tum.strings.t(...a);
  const SEARCHINPUT = '[data-testid="SearchBox_Search_Input"]';
  const RESULTSEL = '[data-testid="TypeaheadUser"], [data-testid="UserCell"]';

  let target = null;
  let active = false;
  let obs = null;
  let banner = null;
  let returnurl = null, returnscroll = 0;

  function targetlabel() {
    if (target && target.type === "folder") {const f = tum.folders.get(target.id); return f ? T("pick.target.folder", f.name) : T("pick.target.afolder")}
    if (target && target.type === "category") return T("pick.target.category");
    return T("pick.target.canvas");
  }

  function showchrome() {
    if (!banner) {
      banner = document.createElement("div");
      banner.className = "tumpickbanner";
      const label = document.createElement("span");
      label.className = "tumpicklabel";
      const cancel = document.createElement("button");
      cancel.className = "tumpickcancel";
      cancel.textContent = T("pick.cancel");
      cancel.addEventListener("click", exit);
      banner.appendChild(label);
      banner.appendChild(cancel);
      document.body.appendChild(banner);
    }
    banner.querySelector(".tumpicklabel").textContent = T("pick.instr", targetlabel());
    document.documentElement.classList.add("tumpickuser");
  }
  function removechrome() {
    document.documentElement.classList.remove("tumpickuser");
    if (banner) {banner.remove(); banner = null}
  }

  function handlefromlink(href) {
    const h = (href || "").replace(/^\//, "").replace(/\/$/, "");
    return /^[A-Za-z0-9_]+$/.test(h) && !/^(i|home|explore|search|notifications|messages|settings|compose)$/i.test(h) ? h : null;
  }
  function extractresult(el) {
    let handle = null;
    for (const a of el.querySelectorAll('a[href^="/"]')) {const h = handlefromlink(a.getAttribute("href")); if (h) {handle = h; break}}
    if (!handle) {
      const at = [...el.querySelectorAll("span")].map(s => (s.textContent || "").trim()).find(t => /^@[A-Za-z0-9_]+$/.test(t));
      if (at) handle = at.slice(1);
    }
    if (!handle) return null;
    const img = el.querySelector("img");
    const texts = [...el.querySelectorAll("span")].map(s => (s.textContent || "").trim()).filter(Boolean);
    const nm = texts.find(t => t && !t.startsWith("@"));
    return {handle, displayname: nm || handle, avatarurl: img ? img.src : null, badges: [], sourceurl: null};
  }

  function addtotarget(user) {
    if (!target) return;
    if (target.type === "folder") {
      tum.folders.addmember(target.id, user);
      const f = tum.folders.get(target.id);
      if (f && f.action && !user.skipaction) try {tum.actions.run(f.action, user)} catch {}
    } else {
      const px = typeof target.cx === "number" ? target.cx : 200;
      const py = typeof target.cy === "number" ? target.cy : 200;
      tum.unsorted.add(Object.assign({}, user, {cat: target.type === "category" ? target.id : null}), px, py);
    }
    try {tum.overlay.toast(T("toast.added", user.handle))} catch {}
  }

  function onclick(e) {
    if (!active) return;
    if (e.target.closest(SEARCHINPUT) || e.target.closest(".tumpickbanner")) return;
    const result = e.target.closest(RESULTSEL);
    if (result) {
      const user = extractresult(result);
      if (user) {e.preventDefault(); e.stopPropagation(); addtotarget(user); exit(); return}
    }
    if (e.target.closest('[data-testid="typeaheadResult"]')) {e.preventDefault(); e.stopPropagation()}
  }
  function onkey(e) {
    if (!active) return;
    if (e.key === "Escape") {exit(); e.preventDefault(); return}
    if (e.key === "Enter" && e.target.closest(SEARCHINPUT)) {e.preventDefault(); e.stopPropagation()}
  }

  function start(t) {
    target = t || {type: "canvas"};
    active = true;
    returnurl = location.pathname + location.search;
    returnscroll = window.scrollY || 0;
    try {history.pushState({}, "", "/explore"); window.dispatchEvent(new PopStateEvent("popstate"))} catch {}
    if (!obs) {obs = new MutationObserver(() => {if (active && !document.documentElement.classList.contains("tumpickuser")) showchrome()}); obs.observe(document.body, {childList: true, subtree: true})}
    setTimeout(() => {
      if (!active) return;
      showchrome();
      const input = document.querySelector(SEARCHINPUT);
      if (input) {input.focus(); input.click()}
    }, 300);
  }
  function exit() {
    if (!active) return;

    active = false;
    target = null;
    
    removechrome();

    try {history.pushState({}, "", returnurl || "/home"); window.dispatchEvent(new PopStateEvent("popstate"))} catch {}
    let n = 0;
    const iv = setInterval(() => {window.scrollTo(0, returnscroll); if (++n > 14) clearInterval(iv)}, 90);
    setTimeout(() => {try {tum.overlay.open()} catch {}}, 450);
  }

  window.tum.newuser = {
    start,
    active: () => active,
    init() {
      document.addEventListener("click", onclick, true);
      document.addEventListener("keydown", onkey, true);
    }
  };
})();

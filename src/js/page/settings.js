(function () {
  "use strict";

  window.tum = window.tum || {};

  const T = (...a) => tum.strings.t(...a);
  const FAKE = "/settings/usermanager";
  const NAVSEL = 'div[role="tablist"]';

  const store = tum.storage.create("tum.settings", {global: true});

  const DEFAULTS = {keepopen: true, nooverlap: false, startcollapsed: false, autoopen: false, pagepencils: true, avatardots: true, extrainfo: true, hideposts: true, confirmdelete: false, destroyoption: true};
  const SECTIONS = [
    {title: "Overlay", items: [
      {key: "keepopen", title: "Keep open on folder drop", desc: "Leave the overlay open after moving someone into a folder instead of fading it out."},
      {key: "nooverlap", title: "Prevent overlap", desc: "Stop folders/users from covering each otherby pushing them away."},
      {key: "startcollapsed", title: "Start folders collapsed", desc: "New folders begin minimized to just their title bar."},
      {key: "autoopen", title: "Open on page load", desc: "Fade the overlay in when the page finishes loading."}
    ]},
    {title: "On the page", items: [
      {key: "pagepencils", title: "Note pencils on the page", desc: "Show a small pencil next to people you've saved a note on, in tweets and on profiles. It's clickable!"},
      {key: "avatardots", title: "Folder tags on avatars", desc: "Mark the avatar of anyone you've filed with their folder's colour and icon."},
      {key: "extrainfo", title: "Extended profile info", desc: "Add the account id, email, exact age, location and breach lookups on profiles."}
    ]},
    {title: "Actions", items: [
      {key: "hideposts", title: "Hide posts on mute / block", desc: "When you mute or block from the overlay, also hide that person's posts already on the page."},
      {key: "confirmdelete", title: "Always confirm delete", desc: "Ask before deleting any folder, even empty or single member ones."}
    ]},
    {title: "Extras", items: [
      {key: "destroyoption", title: "Fun", desc: "Yeah...", img: "assets/images/yeah.png"}
    ]}
  ];
  let vals = {...DEFAULTS};
  const listeners = new Set();
  function emitchange() {for (const cb of listeners) try {cb(vals)} catch (e) {}}
  store.get().then(v => {vals = {...DEFAULTS, ...(v || {})}; syncswitches(); emitchange()});
  store.subscribe(v => {vals = {...DEFAULTS, ...(v || {})}; syncswitches(); emitchange()});
  function setval(key, on) {vals = {...vals, [key]: on}; store.set(vals); syncswitches(); emitchange()}

  function manifestversion() {
    try {return chrome.runtime.getManifest().version} catch {return "1.3"}
  }

  function onsettings() {return location.pathname.indexOf("/settings") === 0}
  function onus() {return location.pathname.replace(/\/$/, "") === FAKE}
  function navtab() {return document.querySelector('[data-testid="usermanagerLink"]')}

  function ensureflashstyle() {
    if (document.getElementById("tumusmstyle")) return;
    const st = document.createElement("style");
    st.id = "tumusmstyle";
    st.textContent = 'html.tumusmroute [data-testid="error-detail"]{display:none!important}';
    (document.head || document.documentElement).appendChild(st);
  }
  function syncroute() {
    ensureflashstyle();
    document.documentElement.classList.toggle("tumusmroute", onus());
  }

  function navto(path) {
    history.pushState({}, "", path);
    syncroute();
    window.dispatchEvent(new PopStateEvent("popstate"));
  }

  /*//////////////////////////////////////////////////////////////////////*/

  function ensurenav() {
    if (!onsettings()) return;
    const list = document.querySelector(NAVSEL);
    if (!list) return;
    if (navtab()) {markselected(); return}
    const tpl = list.querySelector('a[role="tab"][data-testid$="Link"]') || list.querySelector('a[role="tab"]');
    if (!tpl) return;
    const a = tpl.cloneNode(true);
    a.setAttribute("href", FAKE);
    a.setAttribute("data-testid", "usermanagerLink");
    a.setAttribute("aria-selected", "false");
    const leaf = [...a.querySelectorAll("span")].find(s => !s.children.length);
    if (leaf) leaf.textContent = T("settings.tab");
    const help = list.querySelector('[data-testid="helpCenterLink"]');
    if (help) list.insertBefore(a, help);
    else list.appendChild(a);
    markselected();
  }
  function markselected() {
    const tab = navtab();
    if (tab) tab.setAttribute("aria-selected", onus() ? "true" : "false");
  }

  /*//////////////////////////////////////////////////////////////////////*/

  function palette() {
    const ref = document.querySelector('a[role="tab"] [data-testid="test-LTRtext"]') ||
      document.querySelector('a[role="tab"] span') || document.querySelector('a[role="tab"]') || document.body;
    const primary = getComputedStyle(ref).color || "rgb(15,20,25)";
    const sec = "#71767b"; // twitter's beautifuyl wonderful gray
    return {primary, sec};
  }

  function makecheckbox(key) {
    const wrap = document.createElement("span");
    wrap.className = "tumsetcheckwrap";
    wrap.dataset.key = key;
    const box = document.createElement("span");
    box.className = "tumsetcheck";
    box.setAttribute("role", "checkbox");
    box.tabIndex = 0;
    box.innerHTML = '<svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>';
    const svg = box.querySelector("svg");
    function paint() {
      const on = !!vals[key];
      box.style.background = on ? "#1d9bf0" : "transparent";
      box.style.border = on ? "2px solid #1d9bf0" : "2px solid rgba(120,120,120,0.7)";
      svg.style.opacity = on ? "1" : "0";
      box.setAttribute("aria-checked", on ? "true" : "false");
    }
    paint();
    box._paint = paint;
    wrap.addEventListener("click", () => setval(key, !vals[key]));
    wrap.appendChild(box);
    return wrap;
  }
  function syncswitches() {for (const s of document.querySelectorAll(".tumsetcheck")) if (s._paint) s._paint()}

  function buildrow(item, primary, sec) {
    const row = document.createElement("div");
    row.className = "tumsetrow";
    const txt = document.createElement("div");
    txt.className = "tumsetrowtext";
    const t1 = document.createElement("div");
    t1.className = "tumsettitle";
    t1.style.color = primary;
    t1.textContent = item.title;
    const t2 = document.createElement("div");
    t2.className = "tumsetdesc";
    t2.style.color = sec;
    if (item.img) {
      const im = document.createElement("img");
      im.className = "tumsetdescimg";
      try {im.src = chrome.runtime.getURL(item.img)} catch {im.src = "../../" + item.img}
      t2.appendChild(im);
    }
    t2.appendChild(document.createTextNode(item.desc));
    txt.appendChild(t1);
    txt.appendChild(t2);
    row.appendChild(txt);
    row.appendChild(makecheckbox(item.key));
    return row;
  }

  function buildpane() {
    const {primary, sec} = palette();
    const pane = document.createElement("div");
    pane.className = "tumsettingspane";
    const head = document.createElement("div");
    head.className = "tumsetpanehead";
    head.style.color = primary;
    head.textContent = T("settings.pane.title");
    pane.appendChild(head);
    const sub = document.createElement("div");
    sub.className = "tumsetpanesub";
    sub.style.color = sec;
    sub.textContent = T("settings.pane.sub");
    pane.appendChild(sub);
    for (const section of SECTIONS) {
      const sh = document.createElement("div");
      sh.className = "tumsetsubhead";
      sh.style.color = primary;
      sh.textContent = section.title;
      pane.appendChild(sh);
      for (const item of section.items) pane.appendChild(buildrow(item, primary, sec));
    }
    const ver = document.createElement("div");
    ver.className = "tumsetversion";
    ver.style.color = sec;
    ver.textContent = "v" + manifestversion();
    pane.appendChild(ver);
    return pane;
  }

  function ensurepane() {
    if (!onus()) {const p = document.querySelector(".tumsettingspane"); if (p) p.remove(); return}
    // match whatever branding the page currently shows (" / X", or " / Twitter" from a reverter)
    const wanted = "User Manager" + brandsuffix;
    if (document.title !== wanted) document.title = wanted;
    markselected();
    const err = document.querySelector('[data-testid="error-detail"]');
    if (err) err.style.display = "none";
    if (document.querySelector(".tumsettingspane")) return;
    const host = err ? err.parentElement : null;
    if (!host) return;
    host.insertBefore(buildpane(), err);
  }

  /*//////////////////////////////////////////////////////////////////////*/

  // remember the site's title suffix so our page reads "User Manager / X" (or "/ Twitter" when a
  // branding-reverter script is installed), tracked off whatever other pages currently show
  let brandsuffix = " / X";
  function tracktitle() {
    const t = document.title || "";
    if (t.indexOf("User Manager") === 0) return; // our own title, don't read it back
    const m = / \/ (X|Twitter)$/.exec(t);
    if (m) brandsuffix = m[0];
  }

  let scheduled = 0;
  function scan() {scheduled = 0; tracktitle(); syncroute(); ensurenav(); ensurepane()}
  function schedule() {if (!scheduled) scheduled = setTimeout(scan, 80)}

  window.tum.settingspane = {open() {if (!onus()) navto(FAKE)}};

  window.tum.settings = {
    get(key) {return key in vals ? vals[key] : DEFAULTS[key]},
    onchange(cb) {listeners.add(cb); return () => listeners.delete(cb)},
    init() {
      document.addEventListener("click", e => {
        if (e.target.closest && e.target.closest('[data-testid="usermanagerLink"]')) {
          e.preventDefault();
          e.stopPropagation();
          navto(FAKE);
        }
      }, true);
      window.addEventListener("popstate", schedule);
      new MutationObserver(schedule).observe(document.body, {childList: true, subtree: true});
      syncroute();
      schedule();
    }
  };
})();

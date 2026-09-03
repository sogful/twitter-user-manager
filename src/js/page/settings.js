(function () {
  "use strict";

  window.tum = window.tum || {};

  const FAKE = "/settings/usermanager";
  const NAVSEL = 'div[role="tablist"]';
  const CHIRP = '"TwitterChirp",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif';
  const store = tum.storage.create("tum.settings");

  const DEFAULTS = {keepopen: false, pagepencils: true, avatardots: true, extrainfo: true, hideposts: true, destroyoption: true};
  const SCHEMA = [
    {key: "keepopen", title: "Keep open on folder drop", desc: "Leave the overlay open after filing someone into a folder instead of fading it out."},
    {key: "pagepencils", title: "Note pencils on the page", desc: "Show a small pencil next to people you've saved a note on, in tweets and on profiles."},
    {key: "avatardots", title: "Folder tags on avatars", desc: "Mark the avatar of anyone you've filed with their folder's colour and icon."},
    {key: "extrainfo", title: "Extended profile info", desc: "Add the account id, email, exact age, location and breach lookups on profiles."},
    {key: "hideposts", title: "Hide posts on mute / block", desc: "When you mute or block from the overlay, also hide that person's posts already on the page."},
    {key: "destroyoption", title: "Fun", desc: "Yeah..."}
  ];
  let vals = {...DEFAULTS};
  const listeners = new Set();
  function emitchange() {for (const cb of listeners) try {cb(vals)} catch (e) {}}
  store.get().then(v => {vals = {...DEFAULTS, ...(v || {})}; syncswitches(); emitchange()});
  store.subscribe(v => {vals = {...DEFAULTS, ...(v || {})}; syncswitches(); emitchange()});
  function setval(key, on) {vals = {...vals, [key]: on}; store.set(vals); syncswitches(); emitchange()}

  function onsettings() {return location.pathname.indexOf("/settings") === 0}
  function onus() {return location.pathname.replace(/\/$/, "") === FAKE}
  function navtab() {return document.querySelector('[data-testid="usermanagerLink"]')}

  // twitter paints its "page doesn't exist" card for our unknown route before our scan swaps in the
  // pane - a css rule keyed off a <html> class hides that card the instant we're on the route, so the
  // not-found frame never flashes. the class is set synchronously in navto (before twitter's router
  // even reacts to the popstate) and kept in sync on every scan
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
    if (leaf) leaf.textContent = "User Manager";
    // sit it just above Help Center (the external link that's always last), else append
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

  // read twitter's own settings text colour so the pane matches the current theme; the secondary
  // (description) colour is just the primary dimmed, which reads right in both light and dark
  function palette() {
    // read the colour off twitter's own tab LABEL (a link's own colour is the blue link colour,
    // not the near-black primary text) so the pane matches the real settings text in either theme
    const ref = document.querySelector('a[role="tab"] [data-testid="test-LTRtext"]') ||
      document.querySelector('a[role="tab"] span') || document.querySelector('a[role="tab"]') || document.body;
    const primary = getComputedStyle(ref).color || "rgb(15,20,25)";
    const m = /(\d+),\s*(\d+),\s*(\d+)/.exec(primary);
    const sec = m ? "rgba(" + m[1] + "," + m[2] + "," + m[3] + ",0.55)" : "rgb(113,118,123)";
    return {primary, sec};
  }

  // twitter's own square checkbox look: rounded box, blue fill + white check when on. a <span>, not
  // a <button> - twitter's global button styling overrides even an inline !important background
  function makecheckbox(key) {
    // twitter wraps its checkbox in a larger circular hit area that tints light-blue on hover;
    // the square check sits centered inside it
    const wrap = document.createElement("span");
    wrap.className = "tumsetcheckwrap";
    wrap.dataset.key = key;
    wrap.style.cssText = "display:flex;align-items:center;justify-content:center;width:38px;height:38px;" +
      "border-radius:50%;flex:0 0 auto;cursor:pointer;transition:background .15s ease";
    const box = document.createElement("span");
    box.className = "tumsetcheck";
    box.setAttribute("role", "checkbox");
    box.tabIndex = 0;
    box.style.cssText = "width:20px;height:20px;border-radius:5px;flex:0 0 auto;box-sizing:border-box;" +
      "display:flex;align-items:center;justify-content:center";
    box.innerHTML = '<svg viewBox="0 0 24 24" style="width:15px;height:15px;fill:#fff"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>';
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
    wrap.addEventListener("mouseenter", () => {wrap.style.background = "rgba(29,155,240,0.1)"});
    wrap.addEventListener("mouseleave", () => {wrap.style.background = ""});
    wrap.appendChild(box);
    return wrap;
  }
  function syncswitches() {for (const s of document.querySelectorAll(".tumsetcheck")) if (s._paint) s._paint()}

  function buildrow(item, primary, sec) {
    const row = document.createElement("div");
    row.style.cssText = "display:flex;align-items:center;gap:16px;padding:12px 16px";
    const txt = document.createElement("div");
    txt.style.cssText = "flex:1 1 auto;min-width:0";
    const t1 = document.createElement("div");
    t1.style.cssText = "font-size:15px;color:" + primary;
    t1.textContent = item.title;
    const t2 = document.createElement("div");
    t2.style.cssText = "font-size:13px;color:" + sec + ";margin-top:2px";
    t2.textContent = item.desc;
    txt.appendChild(t1);
    txt.appendChild(t2);
    row.appendChild(txt);
    row.appendChild(makecheckbox(item.key));
    row.addEventListener("mouseenter", () => {row.style.background = "rgba(120,120,120,0.08)"});
    row.addEventListener("mouseleave", () => {row.style.background = ""});
    return row;
  }

  function buildpane() {
    const {primary, sec} = palette();
    const pane = document.createElement("div");
    pane.className = "tumsettingspane";
    pane.style.cssText = "font-family:" + CHIRP;
    const head = document.createElement("div");
    head.style.cssText = "padding:18px 16px 2px;font-size:20px;font-weight:800;line-height:1.3;color:" + primary;
    head.textContent = "User Manager";
    pane.appendChild(head);
    const sub = document.createElement("div");
    sub.style.cssText = "padding:2px 16px 16px;font-size:13px;color:" + sec;
    sub.textContent = "Preferences for the extension.";
    pane.appendChild(sub);
    for (const item of SCHEMA) pane.appendChild(buildrow(item, primary, sec));
    return pane;
  }

  // on our route, hide twitter's not-found card and drop our pane into that same detail column
  function ensurepane() {
    if (!onus()) {const p = document.querySelector(".tumsettingspane"); if (p) p.remove(); return}
    // twitter titles the unknown route "Page not found / X" - make it read our section instead
    if (document.title !== "User Manager / X") document.title = "User Manager / X";
    markselected();
    const err = document.querySelector('[data-testid="error-detail"]');
    if (err) err.style.display = "none";
    if (document.querySelector(".tumsettingspane")) return;
    const host = err ? err.parentElement : null;
    if (!host) return;
    host.insertBefore(buildpane(), err);
  }

  /*//////////////////////////////////////////////////////////////////////*/

  let scheduled = 0;
  function scan() {scheduled = 0; syncroute(); ensurenav(); ensurepane()}
  function schedule() {if (!scheduled) scheduled = setTimeout(scan, 80)}

  window.tum.settingspane = {open() {if (!onus()) navto(FAKE)}};

  window.tum.settings = {
    // synchronous read for the other modules; falls back to the default until the store loads
    get(key) {return key in vals ? vals[key] : DEFAULTS[key]},
    // fires whenever any toggle changes (and once the store first loads); returns an unsubscribe
    onchange(cb) {listeners.add(cb); return () => listeners.delete(cb)},
    init() {
      // twitter's tablist swallows clicks on its tab children in the capture phase (it only routes
      // the tabs it knows), so our <a>'s own listener never fires - catch the click at document
      // capture, ahead of twitter's, and drive the nav ourselves through a body-level link
      document.addEventListener("click", e => {
        if (e.target.closest && e.target.closest('[data-testid="usermanagerLink"]')) {
          e.preventDefault();
          e.stopPropagation();
          navto(FAKE);
        }
      }, true);
      window.addEventListener("popstate", schedule);
      new MutationObserver(schedule).observe(document.body, {childList: true, subtree: true});
      // cover a direct load / refresh of the route too - hide the card as early as we run
      syncroute();
      schedule();
    }
  };
})();

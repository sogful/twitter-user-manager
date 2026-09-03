(function () {
  "use strict";

  window.tum = window.tum || {};

  // a fake settings section at /settings/usermanager. twitter's own client already tolerates the
  // unknown route (it stays on the url and just renders a "page doesn't exist" card in the detail
  // column), so we add a "User Manager" tab to its nav list and swap that not-found card for our
  // own pane. works on refresh/direct load because it's driven off location.pathname, not a click
  const FAKE = "/settings/usermanager";
  const NAVSEL = 'div[role="tablist"]';
  const CHIRP = '"TwitterChirp",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif';
  const store = tum.storage.create("tum.settings");

  let keepopen = false;
  store.get().then(v => {keepopen = !!(v && v.keepopen); syncswitch()});
  store.subscribe(v => {keepopen = !!(v && v.keepopen); syncswitch()});

  function onsettings() {return location.pathname.indexOf("/settings") === 0}
  function onus() {return location.pathname.replace(/\/$/, "") === FAKE}
  function navtab() {return document.querySelector('[data-testid="usermanagerLink"]')}

  // navigate WITHOUT a reload: twitter's spa router listens on popstate, so pushState + a synthetic
  // popstate makes it render the route client-side (a raw <a> click, by contrast, full-reloads -
  // twitter routes via its own react Link handlers, not bare anchor navigations). works from any
  // page: for /settings/usermanager twitter renders the settings shell + its not-found card, which
  // ensurepane then swaps for ours
  function navto(path) {
    history.pushState({}, "", path);
    window.dispatchEvent(new PopStateEvent("popstate"));
  }

  /*//////////////////////////////////////////////////////////////////////*/

  // clone one of twitter's real settings tabs so ours inherits its exact styling, then relabel it.
  // appended at the end of the list (not spliced in) so react's reconciliation of its own children
  // doesn't trip over our extra node
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
  function makecheckbox() {
    // twitter wraps its checkbox in a larger circular hit area that tints light-blue on hover;
    // the square check sits centered inside it
    const wrap = document.createElement("span");
    wrap.className = "tumsetcheckwrap";
    wrap.style.cssText = "display:flex;align-items:center;justify-content:center;width:38px;height:38px;" +
      "border-radius:50%;flex:0 0 auto;cursor:pointer";
    const box = document.createElement("span");
    box.className = "tumsetcheck";
    box.setAttribute("role", "checkbox");
    box.tabIndex = 0;
    box.style.cssText = "width:20px;height:20px;border-radius:5px;flex:0 0 auto;box-sizing:border-box;" +
      "display:flex;align-items:center;justify-content:center";
    box.innerHTML = '<svg viewBox="0 0 24 24" style="width:15px;height:15px;fill:#fff"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>';
    const svg = box.querySelector("svg");
    function paint() {
      box.style.background = keepopen ? "#1d9bf0" : "transparent";
      box.style.border = keepopen ? "2px solid #1d9bf0" : "2px solid rgba(120,120,120,0.7)";
      svg.style.opacity = keepopen ? "1" : "0";
      box.setAttribute("aria-checked", keepopen ? "true" : "false");
    }
    paint();
    box._paint = paint;
    wrap.addEventListener("click", () => {keepopen = !keepopen; store.set({keepopen}); paint()});
    wrap.addEventListener("mouseenter", () => {wrap.style.background = "rgba(29,155,240,0.1)"});
    wrap.addEventListener("mouseleave", () => {wrap.style.background = ""});
    wrap.appendChild(box);
    return wrap;
  }
  function syncswitch() {const s = document.querySelector(".tumsetcheck"); if (s && s._paint) s._paint()}

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

    const row = document.createElement("div");
    row.style.cssText = "display:flex;align-items:center;gap:16px;padding:12px 16px";
    const txt = document.createElement("div");
    txt.style.cssText = "flex:1 1 auto;min-width:0";
    const t1 = document.createElement("div");
    t1.style.cssText = "font-size:15px;color:" + primary;
    t1.textContent = "Keep open on folder drop";
    const t2 = document.createElement("div");
    t2.style.cssText = "font-size:13px;color:" + sec + ";margin-top:2px";
    t2.textContent = "Leave the overlay open after filing someone into a folder instead of fading it out.";
    txt.appendChild(t1);
    txt.appendChild(t2);
    row.appendChild(txt);
    row.appendChild(makecheckbox());
    row.addEventListener("mouseenter", () => {row.style.background = "rgba(120,120,120,0.08)"});
    row.addEventListener("mouseleave", () => {row.style.background = ""});
    pane.appendChild(row);
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
  function scan() {scheduled = 0; ensurenav(); ensurepane()}
  function schedule() {if (!scheduled) scheduled = setTimeout(scan, 80)}

  window.tum.settingspane = {open() {if (!onus()) navto(FAKE)}};

  window.tum.settings = {
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
      schedule();
    }
  };
})();

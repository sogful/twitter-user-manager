(function () {
  "use strict";

  window.tum = window.tum || {};

  // a fake settings section at /settings/usermanager. twitter's own client already tolerates the
  // unknown route (it stays on the url and just renders a "page doesn't exist" card in the detail
  // column), so we add a "User Manager" tab to its nav list and swap that not-found card for our
  // own pane. works on refresh/direct load because it's driven off location.pathname, not a click
  const FAKE = "/settings/usermanager";
  const NAVSEL = 'div[role="tablist"]';
  const store = tum.storage.create("tum.settings");

  let keepopen = false;
  store.get().then(v => {keepopen = !!(v && v.keepopen); syncswitch()});
  store.subscribe(v => {keepopen = !!(v && v.keepopen); syncswitch()});

  function onsettings() {return location.pathname.indexOf("/settings") === 0}
  function onus() {return location.pathname.replace(/\/$/, "") === FAKE}
  function navtab() {return document.querySelector('[data-testid="usermanagerLink"]')}

  // synth an <a> click so twitter's OWN router does the navigation - works from any page, no reload
  function navto(path) {
    const a = document.createElement("a");
    a.href = path;
    a.style.cssText = "position:fixed;left:-9999px;top:-9999px";
    document.body.appendChild(a);
    a.click();
    a.remove();
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
    list.appendChild(a);
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

  function makeswitch() {
    const sw = document.createElement("button");
    sw.className = "tumsetswitch";
    sw.setAttribute("role", "switch");
    sw.style.cssText = "position:relative;width:44px;height:24px;border-radius:999px;border:0;padding:0;cursor:pointer;flex:0 0 auto;transition:background .15s";
    const knob = document.createElement("span");
    knob.style.cssText = "position:absolute;top:2px;width:20px;height:20px;border-radius:50%;background:#fff;transition:left .15s;box-shadow:0 1px 3px rgba(0,0,0,0.4)";
    sw.appendChild(knob);
    function paint() {
      sw.style.background = keepopen ? "#1d9bf0" : "rgba(120,120,120,0.5)";
      knob.style.left = keepopen ? "22px" : "2px";
      sw.setAttribute("aria-checked", keepopen ? "true" : "false");
    }
    paint();
    sw._paint = paint;
    sw.addEventListener("click", () => {keepopen = !keepopen; store.set({keepopen}); paint()});
    return sw;
  }
  function syncswitch() {const s = document.querySelector(".tumsetswitch"); if (s && s._paint) s._paint()}

  function buildpane() {
    const {primary, sec} = palette();
    const pane = document.createElement("div");
    pane.className = "tumsettingspane";
    pane.style.cssText = "font-family:inherit";
    const head = document.createElement("div");
    head.style.cssText = "padding:4px 16px 2px;font-size:20px;font-weight:800;color:" + primary;
    head.textContent = "User Manager";
    pane.appendChild(head);
    const sub = document.createElement("div");
    sub.style.cssText = "padding:2px 16px 14px;font-size:13px;color:" + sec;
    sub.textContent = "Preferences for the drag-to-sort overlay.";
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
    row.appendChild(makeswitch());
    row.addEventListener("mouseenter", () => {row.style.background = "rgba(120,120,120,0.08)"});
    row.addEventListener("mouseleave", () => {row.style.background = ""});
    pane.appendChild(row);
    return pane;
  }

  // on our route, hide twitter's not-found card and drop our pane into that same detail column
  function ensurepane() {
    if (!onus()) {const p = document.querySelector(".tumsettingspane"); if (p) p.remove(); return}
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

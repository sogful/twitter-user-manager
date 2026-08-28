(function () {
  "use strict";

  window.tum = window.tum || {};

  // a small pencil next to a matched handle's name on the real page (tweets, replies, hover
  // cards, and a profile's own header) whenever there's a saved note for them - clicking it
  // opens the same reason popup the canvas itself uses, so the note is reachable without
  // having to dig them out of a folder
  const PENCIL = '<svg viewBox="0 0 24 24"><path d="M4 20l1-4L16 5l3 3L8 19l-4 1z"/><path d="M14 7l3 3"/></svg>';
  const NAMEBOXSEL = '[data-testid="User-Name"]';
  const SKIPHREF = /^\/(i|home|search|notifications|messages)\/?$/;
  const PROFILEPATH = /^\/([A-Za-z0-9_]+)\/?$/;

  let reasonmap = new Map(); // handle (lowercased) -> {handle, reason, sourceurl, source}

  function rebuildreasonmap() {
    reasonmap = new Map();
    for (const u of tum.unsorted.list()) {
      if (u.reason) reasonmap.set(u.handle.toLowerCase(), {handle: u.handle, reason: u.reason, sourceurl: u.sourceurl, source: {type: "unsorted"}});
    }
    for (const f of tum.folders.list()) {
      for (const m of (f.members || [])) {
        if (m.reason) reasonmap.set(m.handle.toLowerCase(), {handle: m.handle, reason: m.reason, sourceurl: m.sourceurl, source: {type: "folder", id: f.id}});
      }
    }
  }

  function handlefromnamebox(namebox) {
    for (const a of namebox.querySelectorAll('a[role="link"][href^="/"]')) {
      const href = a.getAttribute("href") || "";
      if (/^\/[^/]+\/?$/.test(href) && !SKIPHREF.test(href)) return href.replace(/^\//, "").replace(/\/$/, "");
    }
    return null;
  }

  function openbadge(handle) {
    const entry = reasonmap.get((handle || "").toLowerCase());
    if (entry) tum.overlay.openreasonview(entry.source, entry);
  }

  function makebadge(handle, entry) {
    const badge = document.createElement("span");
    badge.className = "tumpagereasonbadge";
    badge.dataset.handle = handle;
    badge.title = "note: " + entry.reason.slice(0, 80);
    badge.innerHTML = PENCIL;
    // inline, not a page stylesheet - this lives in x.com's own DOM, outside our shadow root.
    // a sibling of the name link (not nested inside it) so it sits to the right of the name in
    // the same flex row instead of getting squeezed onto its own line inside a narrower box
    badge.style.cssText = "display:inline-flex;flex-shrink:0;vertical-align:middle;margin-left:3px;cursor:pointer;width:13px;height:13px";
    badge.querySelector("svg").style.cssText = "width:100%;height:100%;fill:none;stroke:#1d9bf0;stroke-width:2.4;stroke-linecap:round;stroke-linejoin:round";
    badge.addEventListener("click", e => {
      e.preventDefault();
      e.stopPropagation();
      openbadge(badge.dataset.handle);
    });
    return badge;
  }

  function scantweets() {
    for (const namebox of document.querySelectorAll(NAMEBOXSEL)) {
      const handle = handlefromnamebox(namebox);
      const existing = namebox.querySelector(".tumpagereasonbadge");
      const entry = handle ? reasonmap.get(handle.toLowerCase()) : null;
      if (!entry) {
        if (existing) existing.remove();
        continue;
      }
      if (existing) {
        // a virtualized timeline reuses this exact node for a different tweet as you scroll -
        // always recheck which handle it's currently showing rather than trust a stale flag
        existing.dataset.handle = handle;
        existing.title = "note: " + entry.reason.slice(0, 80);
        continue;
      }
      const namelink = namebox.querySelector('a[role="link"][href^="/"]');
      if (!namelink) continue;
      namebox.insertBefore(makebadge(handle, entry), namelink.nextSibling);
    }
  }

  // profile headers don't use the User-Name component at all (the name there is plain text,
  // not a link - see dragdetect.js) so this needs its own separate scan
  function scanprofileheader() {
    const m = PROFILEPATH.exec(location.pathname);
    const heading = document.querySelector("main h2");
    const existing = document.querySelector(".tumpageprofilereasonbadge");
    if (!m || !heading) {
      if (existing) existing.remove();
      return;
    }
    const handle = m[1];
    const entry = reasonmap.get(handle.toLowerCase());
    if (!entry) {
      if (existing) existing.remove();
      return;
    }
    if (existing) {
      existing.dataset.handle = handle;
      existing.title = "note: " + entry.reason.slice(0, 80);
      return;
    }
    const badge = makebadge(handle, entry);
    badge.classList.add("tumpageprofilereasonbadge");
    heading.parentNode.insertBefore(badge, heading.nextSibling);
  }

  function scan() {
    scantweets();
    scanprofileheader();
  }

  let scheduled = false;
  function schedulescan() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {scheduled = false; scan()});
  }

  window.tum.badges = {
    init() {
      tum.folders.subscribe(() => {rebuildreasonmap(); schedulescan()});
      tum.unsorted.subscribe(() => {rebuildreasonmap(); schedulescan()});
      Promise.all([tum.folders.ready, tum.unsorted.ready]).then(() => {rebuildreasonmap(); schedulescan()});
      new MutationObserver(schedulescan).observe(document.body, {childList: true, subtree: true});
    }
  };
})();

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
  let membermap = new Map(); // handle (lowercased) -> {name, color} of the folder they're filed in

  function rebuildreasonmap() {
    reasonmap = new Map();
    membermap = new Map();
    for (const u of tum.unsorted.list()) {
      if (u.reason) reasonmap.set(u.handle.toLowerCase(), {handle: u.handle, reason: u.reason, sourceurl: u.sourceurl, source: {type: "unsorted"}});
    }
    for (const f of tum.folders.list()) {
      for (const m of (f.members || [])) {
        if (m.reason) reasonmap.set(m.handle.toLowerCase(), {handle: m.handle, reason: m.reason, sourceurl: m.sourceurl, source: {type: "folder", id: f.id}});
        // first folder wins if somehow in two - the dot just signals "already filed somewhere"
        if (!membermap.has(m.handle.toLowerCase())) membermap.set(m.handle.toLowerCase(), {id: f.id, name: f.name, color: f.color, icon: f.icon, action: f.action});
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
      // append onto the display name's own text line (the first dir="ltr" inside the name link) so
      // it sits inline right after the name in BOTH the timeline row and the expanded column layout
      // - inserting against the namebox/parent put it on its own line below in the expanded tweet
      const nameline = namelink.querySelector('div[dir="ltr"]') || namelink;
      nameline.appendChild(makebadge(handle, entry));
    }
  }

  // the profile display name lives in [data-testid="UserName"], inside a flex row - the note
  // badge goes inline right after the name div there. the earlier "main h2" target was the
  // sticky-header title, whose parent is a column, so the badge wrapped onto its own line
  function scanprofileheader() {
    const m = PROFILEPATH.exec(location.pathname);
    const namebox = document.querySelector('[data-testid="UserName"]');
    const nameel = namebox && namebox.querySelector('div[dir="ltr"]');
    const existing = document.querySelector(".tumpageprofilereasonbadge");
    if (!m || !nameel) {
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
    // the profile nickname is bigger than a tweet name, so its note badge is bumped up to match
    badge.style.width = "16px";
    badge.style.height = "16px";
    nameel.parentNode.insertBefore(badge, nameel.nextSibling);
  }

  // a colored badge on the avatar of anyone already filed in a folder, carrying that folder's
  // own icon so you can tell which at a glance. the ring matches the page background so it reads
  // like twitter's own presence markers; clicking it opens the overlay focused on that folder
  function dotcontrast(hex) {
    const n = parseInt((hex || "#1d9bf0").replace("#", ""), 16);
    const r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
    return (r * 299 + g * 587 + b * 114) / 1000 >= 150 ? "#000" : "#fff";
  }
  function filldot(dot, entry, pagebg) {
    dot.title = "filed in: " + entry.name + " (click to open)";
    dot.style.background = entry.color;
    dot.style.borderColor = pagebg;
    const fg = dotcontrast(entry.color);
    dot.innerHTML = tum.overlay.foldericonhtml ? tum.overlay.foldericonhtml(entry) : "";
    for (const svg of dot.querySelectorAll("svg")) {
      // a custom picker icon carries its own fill="currentColor" paths - just set the colour and let
      // them draw themselves; only the built-in stroke icons want the forced fill:none + stroke
      if (svg.hasAttribute("fill")) svg.style.cssText = "width:11px;height:11px;color:" + fg + ";display:block";
      else svg.style.cssText = "width:11px;height:11px;stroke:" + fg + ";fill:none;stroke-width:2.4;display:block";
    }
    for (const img of dot.querySelectorAll("img")) {img.style.cssText = "width:12px;height:12px;display:block"}
  }
  function scanavatars() {
    const pagebg = getComputedStyle(document.body).backgroundColor || "#000";
    for (const av of document.querySelectorAll('[data-testid^="UserAvatar-Container-"]')) {
      const m = /UserAvatar-Container-(.+)$/.exec(av.getAttribute("data-testid") || "");
      const handle = m && m[1];
      const entry = handle ? membermap.get(handle.toLowerCase()) : null;
      const existing = av.querySelector(".tumpagefolderdot");
      if (!entry) {
        if (existing) existing.remove();
        continue;
      }
      if (existing) {
        existing.dataset.folder = entry.id;
        filldot(existing, entry, pagebg);
        continue;
      }
      if (getComputedStyle(av).position === "static") av.style.position = "relative";
      const dot = document.createElement("span");
      dot.className = "tumpagefolderdot";
      dot.dataset.folder = entry.id;
      // high z-index + explicit pointer-events so the whole dot is clickable - the avatar's own
      // profile-link overlay otherwise sits on top and leaves only a sliver of the dot hittable
      dot.style.cssText = "position:absolute;bottom:-2px;right:-2px;width:18px;height:18px;border-radius:50%;z-index:9999;pointer-events:auto;cursor:pointer;box-sizing:border-box;display:flex;align-items:center;justify-content:center;border:2px solid " + pagebg;
      filldot(dot, entry, pagebg);
      // the dot sits inside a profile-link avatar; stop the press from reaching twitter's own
      // navigation (capture-phase, but only stopPropagation - preventDefault on pointerdown would
      // also kill the click that follows), then open the folder on the click itself
      const stop = e => e.stopPropagation();
      for (const ev of ["pointerdown", "pointerup", "mousedown", "mouseup"]) dot.addEventListener(ev, stop, true);
      dot.addEventListener("click", e => {
        e.preventDefault();
        e.stopPropagation();
        tum.overlay.openandflash(dot.dataset.folder);
      }, true);
      av.appendChild(dot);
    }
  }

  function setting(key) {return !tum.settings || tum.settings.get(key)}
  function removeall(sel) {for (const n of document.querySelectorAll(sel)) n.remove()}

  function scan() {
    if (setting("pagepencils")) {scantweets(); scanprofileheader()}
    else removeall(".tumpagereasonbadge, .tumpageprofilereasonbadge");
    if (setting("avatardots")) scanavatars();
    else removeall(".tumpagefolderdot");
  }

  // setTimeout rather than requestAnimationFrame: rAF is throttled/paused when the tab isn't
  // focused, which would leave note pencils and folder dots missing until you interacted
  let scheduled = 0;
  function schedulescan() {
    if (scheduled) return;
    scheduled = setTimeout(() => {scheduled = 0; scan()}, 100);
  }

  window.tum.badges = {
    init() {
      tum.folders.subscribe(() => {rebuildreasonmap(); schedulescan()});
      tum.unsorted.subscribe(() => {rebuildreasonmap(); schedulescan()});
      if (tum.settings) tum.settings.onchange(schedulescan);
      Promise.all([tum.folders.ready, tum.unsorted.ready]).then(() => {rebuildreasonmap(); schedulescan()});
      new MutationObserver(schedulescan).observe(document.body, {childList: true, subtree: true});
    }
  };
})();

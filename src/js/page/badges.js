(function () {
  "use strict";

  window.tum = window.tum || {};
  const T = (...a) => tum.strings.t(...a);

  const PENCIL = '<svg viewBox="0 0 24 24"><path d="M4 20l1-4L16 5l3 3L8 19l-4 1z"/><path d="M14 7l3 3"/></svg>';
  const NAMEBOXSEL = '[data-testid="User-Name"]';
  const SKIPHREF = /^\/(i|home|search|notifications|messages)\/?$/;
  const PROFILEPATH = /^\/([A-Za-z0-9_]+)\/?$/;

  let reasonmap = new Map();
  let membermap = new Map();
  let accountmap = new Map();
  const capturedaccountmap = new Map();

  /*//////////////////////////////////////////////////////////////////////*/

  function rebuildreasonmap() {
    reasonmap = new Map();
    membermap = new Map();
    accountmap = new Map();
    for (const u of tum.unsorted.list()) {
      if (u.handle) accountmap.set(u.handle.toLowerCase(), u);
      if (u.reason) reasonmap.set(u.handle.toLowerCase(), {handle: u.handle, reason: u.reason, sourceurl: u.sourceurl, source: {type: "unsorted"}});
    }
    for (const f of tum.folders.list()) {
      for (const m of (f.members || [])) {
        if (m.handle) accountmap.set(m.handle.toLowerCase(), m);
        if (m.reason) reasonmap.set(m.handle.toLowerCase(), {handle: m.handle, reason: m.reason, sourceurl: m.sourceurl, source: {type: "folder", id: f.id}});
        if (!membermap.has(m.handle.toLowerCase())) membermap.set(m.handle.toLowerCase(), {id: f.id, name: f.name, color: f.color, icon: f.icon, action: f.action});
      }
    }
    for (const [handle, user] of capturedaccountmap) accountmap.set(handle, user);
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

  function accountbadgecontent(user, includetranslator = true) {
    if (!user || !tum._ov || !tum._ov.scope || typeof tum._ov.scope.badgeshtml !== "function") return null;
    const badges = Array.isArray(user.badges) ? user.badges : [];
    const kindmap = {blue: "blue", legacy: "verified", business: "verifiedbusiness", government: "verifiedgovernment", affiliate: "verifiedaffiliate"};
    const badgeset = new Set(badges.filter(value => typeof value === "string"));
    const affiliate = accountaffiliate(user, badges);
    if (typeof user.verificationkind === "string") {
      if (user.verificationkind === "affiliate") {
        if (user.blueverified === true) badgeset.add("blue");
      } else {
        for (const type of ["blue", "verified", "verifiedbusiness", "verifiedgovernment", "verifiedaffiliate"]) badgeset.delete(type);
        if (kindmap[user.verificationkind]) badgeset.add(kindmap[user.verificationkind]);
        if (user.verificationkind === "legacy" && user.blueverified === true) badgeset.add("blue");
      }
    } else {
      const verifiedtype = String(user.verifiedtype || "").toLowerCase();
      if (/government/.test(verifiedtype)) badgeset.add("verifiedgovernment");
      else if (/business/.test(verifiedtype)) badgeset.add("verifiedbusiness");
      badgeset.delete("blue"); badgeset.delete("verified");
    }
    if (affiliate) badgeset.add("verifiedaffiliate");
    const translator = String(user.translatortype || "").toLowerCase();
    if (includetranslator && (translator === "regular" || translator === "badged")) badgeset.add("translator");
    else if (includetranslator && translator === "moderator") badgeset.add("translatormod");
    const visible = [...badgeset].filter(type => !affiliate && ["blue", "verified", "verifiedbusiness", "verifiedgovernment"].includes(type)
      || includetranslator && ["translator", "translatormod"].includes(type));
    if (!visible.length) return null;
    return {
      html: tum._ov.scope.badgeshtml(visible, user),
      signature: JSON.stringify({kind: user.verificationkind, verifiedtype: user.verifiedtype, translator, visible: visible.slice().sort()})
    };
  }

  function markaffiliatecheck(namebox, user) {
    if (!namebox) return;
    const badges = Array.isArray(user && user.badges) ? user.badges : [];
    const affiliate = accountaffiliate(user, badges) && accountblue(user, badges);
    for (const icon of namebox.querySelectorAll("svg")) {
      if (icon.closest(".tumpageaccountbadge")) continue;
      const checkmark = [...icon.querySelectorAll("path")].some(path => /^M20\.396 11c/.test(path.getAttribute("d") || ""));
      if (checkmark) icon.classList.toggle("tumaffiliatecheck", !!affiliate);
    }
  }

  function accountaffiliate(user, badges) {
    if (!user) return false;
    if (typeof user.affiliateverified === "boolean") return user.affiliateverified;
    const verifiedtype = String(user.verifiedtype || "").toLowerCase();
    if (user.verificationkind === "affiliate" || verifiedtype === "affiliate"
      || badges.some(value => value && typeof value === "object" && value.type === "affiliation")) return true;
    return badges.includes("verifiedaffiliate") && typeof user.verificationkind !== "string";
  }

  function accountblue(user, badges) {
    if (!user) return false;
    const verifiedtype = String(user.verifiedtype || "").toLowerCase();
    if (user.verificationkind === "business" || user.verificationkind === "government"
      || /business|government/.test(verifiedtype)) return false;
    return user.verificationkind === "blue" || user.blueverified === true || verifiedtype === "blue" || badges.includes("blue");
  }

  function makeaccountbadge(handle, user, profile = false) {
    const content = accountbadgecontent(user);
    if (!content || !content.html) return null;
    const badge = document.createElement("span");
    badge.className = profile ? "tumpageaccountbadge tumpageprofileaccountbadge" : "tumpageaccountbadge";
    badge.dataset.handle = handle;
    badge.dataset.signature = content.signature;
    badge.setAttribute("aria-label", T("badge.accountstatus"));
    badge.innerHTML = content.html;
    const labels = [...badge.querySelectorAll("svg[aria-label]")].map(icon => icon.getAttribute("aria-label")).filter(Boolean);
    badge.title = labels.join(" · ");
    return badge;
  }

  function makebadge(handle, entry) {
    const badge = document.createElement("span");
    badge.className = "tumpagereasonbadge";
    badge.dataset.handle = handle;
    badge.title = T("badge.note", entry.reason.slice(0, 80));
    badge.innerHTML = PENCIL;
    badge.addEventListener("click", e => {
      e.preventDefault();
      e.stopPropagation();
      openbadge(badge.dataset.handle);
    });
    return badge;
  }

  function scantweets() {
    const notesenabled = setting("pagepencils");
    for (const namebox of document.querySelectorAll(NAMEBOXSEL)) {
      const handle = handlefromnamebox(namebox);
      const existing = namebox.querySelector(".tumpagereasonbadge");
      const accountbadge = namebox.querySelector(".tumpageaccountbadge");
      const entry = handle ? reasonmap.get(handle.toLowerCase()) : null;
      const account = handle ? accountmap.get(handle.toLowerCase()) : null;
      markaffiliatecheck(namebox, account);
      const nextbadge = handle ? makeaccountbadge(handle, account) : null;
      if (accountbadge && nextbadge && accountbadge.dataset.signature === nextbadge.dataset.signature) {
        nextbadge.remove();
      } else if (accountbadge) accountbadge.remove();
      if (nextbadge && !namebox.querySelector(".tumpageaccountbadge")) {
        const anchor = namebox.querySelector('a[role="link"][href^="/"]');
        const nameline = anchor && (anchor.querySelector('div[dir="ltr"]') || anchor);
        if (nameline) nameline.appendChild(nextbadge);
      }
      if (!notesenabled) {if (existing) existing.remove(); continue}
      if (!entry) {
        if (existing) existing.remove();
        continue;
      }
      if (existing) {
        existing.dataset.handle = handle;
        existing.title = T("badge.note", entry.reason.slice(0, 80));
        continue;
      }
      const namelink = namebox.querySelector('a[role="link"][href^="/"]');
      if (!namelink) continue;
      const nameline = namelink.querySelector('div[dir="ltr"]') || namelink;
      nameline.appendChild(makebadge(handle, entry));
    }
  }

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
      existing.title = T("badge.note", entry.reason.slice(0, 80));
      return;
    }
    const badge = makebadge(handle, entry);
    badge.classList.add("tumpageprofilereasonbadge");
    nameel.parentNode.insertBefore(badge, nameel.nextSibling);
  }

  function scanprofileaccountbadge() {
    const m = PROFILEPATH.exec(location.pathname);
    const namebox = document.querySelector('[data-testid="UserName"]');
    const nameel = namebox && namebox.querySelector('div[dir="ltr"]');
    const existing = document.querySelector(".tumpageprofileaccountbadge");
    const handle = m && m[1];
    const user = handle ? accountmap.get(handle.toLowerCase()) : null;
    markaffiliatecheck(namebox, user);
    const nextbadge = handle && nameel ? makeaccountbadge(handle, user, true) : null;
    if (existing && nextbadge && existing.dataset.signature === nextbadge.dataset.signature) {nextbadge.remove(); return}
    if (existing) existing.remove();
    if (!nextbadge || !nameel || !nameel.parentNode) return;
    const note = namebox.querySelector(".tumpageprofilereasonbadge");
    if (note && note.parentNode === nameel.parentNode) nameel.parentNode.insertBefore(nextbadge, note.nextSibling);
    else nameel.parentNode.insertBefore(nextbadge, nameel.nextSibling);
  }

  function dotcontrast(hex) {
    const n = parseInt((hex || "#1d9bf0").replace("#", ""), 16);
    const r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
    return (r * 299 + g * 587 + b * 114) / 1000 >= 150 ? "#000" : "white";
  }
  function filldot(dot, entry, pagebg) {
    dot.title = T("badge.filedin", entry.name);
    dot.style.background = entry.color;
    dot.style.borderColor = pagebg;
    const fg = dotcontrast(entry.color);
    dot.innerHTML = tum.overlay.foldericonhtml ? tum.overlay.foldericonhtml(entry) : "";
    for (const svg of dot.querySelectorAll("svg")) {
      if (svg.hasAttribute("fill")) svg.style.color = fg;
      else {svg.style.stroke = fg; svg.style.fill = "none"; svg.style.strokeWidth = "2.4"}
    }
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
      filldot(dot, entry, pagebg);
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
    scantweets();
    if (setting("pagepencils")) scanprofileheader();
    else removeall(".tumpagereasonbadge, .tumpageprofilereasonbadge");
    scanprofileaccountbadge();
    if (setting("avatardots")) scanavatars();
    else removeall(".tumpagefolderdot");
  }

  let scheduled = 0;
  function schedulescan() {
    if (scheduled) return;
    scheduled = setTimeout(() => {scheduled = 0; scan()}, 180);
  }

  window.tum.badges = {
    init() {
      tum.folders.subscribe(() => {rebuildreasonmap(); schedulescan()});
      tum.unsorted.subscribe(() => {rebuildreasonmap(); schedulescan()});
      window.addEventListener("message", event => {
        if (event.source !== window || !event.data || event.data.__tumuser !== 1 || !event.data.data || !event.data.data.handle) return;
        const handle = event.data.data.handle.toLowerCase();
        const user = {
          handle: event.data.data.handle,
          badges: event.data.data.badges,
          verificationkind: event.data.data.verificationkind,
          verifiedtype: event.data.data.verifiedtype,
          blueverified: event.data.data.blueverified,
          affiliateverified: event.data.data.affiliateverified,
          translatortype: event.data.data.translatortype
        };
        capturedaccountmap.delete(handle);
        capturedaccountmap.set(handle, user);
        accountmap.set(handle, user);
        if (capturedaccountmap.size > 500) capturedaccountmap.delete(capturedaccountmap.keys().next().value);
        for (const namebox of document.querySelectorAll(NAMEBOXSEL)) {
          if (String(handlefromnamebox(namebox) || "").toLowerCase() === handle) markaffiliatecheck(namebox, user);
        }
        const profilehandle = PROFILEPATH.exec(location.pathname);
        if (profilehandle && profilehandle[1].toLowerCase() === handle) markaffiliatecheck(document.querySelector('[data-testid="UserName"]'), user);
        schedulescan();
      });
      if (tum.settings) tum.settings.onchange(schedulescan);
      Promise.all([tum.folders.ready, tum.unsorted.ready]).then(() => {rebuildreasonmap(); schedulescan()});
      new MutationObserver(schedulescan).observe(document.body, {childList: true, subtree: true});
    }
  };
})();

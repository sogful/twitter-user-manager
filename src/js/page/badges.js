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
  const cachedaccountmap = new Map();
  const nativecheckoriginals = new WeakMap();
  const accountcache = tum.storage.create("tum.accountbadges", {global: true});
  const accountcachelimit = 500;
  const checkmarktypes = new Set(["blue", "verified", "verifiedbusiness", "verifiedgovernment", "verifiedaffiliate"]);
  let accountcachevalues = null;
  let accountcacheload = Promise.resolve();
  let accountcachequeue = Promise.resolve();

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
    for (const [handle, user] of cachedaccountmap) {
      const existing = accountmap.get(handle);
      if (existing && existing.userid && user.userid && String(existing.userid) !== String(user.userid)) continue;
      accountmap.set(handle, existing ? mergeaccountdata(existing, user) : user);
    }
    for (const [handle, user] of capturedaccountmap) accountmap.set(handle, user);
  }

  function cachebadgekey(badge) {
    return badge && typeof badge === "object" && badge.type === "affiliation"
      ? "affiliation:" + String(badge.handle || "").toLowerCase() : String(badge);
  }
  function cleanaccountbadges(values) {
    const badges = (Array.isArray(values) ? values : []).filter(value =>
      typeof value === "string" && /^(verified|blue|verifiedbusiness|verifiedgovernment|verifiedaffiliate|translator|translatorunbadged|translatormod|protected)$/.test(value)
      || value && typeof value === "object" && value.type === "affiliation" && /^[A-Za-z0-9_]+$/.test(value.handle || ""));
    const seen = new Set();
    return badges.filter(badge => {
      const key = cachebadgekey(badge);
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }
  function normalizeaccount(user) {
    if (!user || typeof user !== "object" || typeof user.handle !== "string" || !user.handle.trim()) return null;
    const currentverification = user.verificationversion === 1;
    const badges = cleanaccountbadges(user.badges);
    const entry = {handle: user.handle.trim(), badges: currentverification ? badges : badges.filter(badge => typeof badge !== "string" || !checkmarktypes.has(badge))};
    const userid = user.userid || user.restId;
    if (userid != null && String(userid)) entry.userid = String(userid);
    if (typeof user.displayname === "string") entry.displayname = user.displayname;
    if (currentverification) {
      entry.verificationversion = 1;
      for (const key of ["verificationkind", "verifiedtype"]) {
        if (typeof user[key] === "string" && user[key]) entry[key] = user[key];
      }
    } else {
      entry.verificationkind = "unknown";
      entry.blueverified = false;
    }
    for (const key of ["translatortype"]) {
      if (typeof user[key] === "string" && user[key]) entry[key] = user[key];
    }
    for (const key of ["affiliateverified"]) {
      if (typeof user[key] === "boolean") entry[key] = user[key];
    }
    if (currentverification && typeof user.blueverified === "boolean") entry.blueverified = user.blueverified;
    return entry;
  }
  function sameaccount(a, b) {
    if (!a || !b) return false;
    if (a.userid && b.userid) return String(a.userid) === String(b.userid);
    return String(a.handle || "").toLowerCase() === String(b.handle || "").toLowerCase();
  }
  function mergeaccountdata(existing, incoming) {
    const merged = {...existing};
    for (const [key, value] of Object.entries(incoming || {})) {
      if (value !== undefined && value !== null) merged[key] = value;
    }
    if (incoming && incoming.verificationkind === "unknown") delete merged.verifiedtype;
    let badges = cleanaccountbadges(existing && existing.badges);
    if (incoming && typeof incoming.verificationkind === "string") badges = badges.filter(badge => typeof badge !== "string" || !checkmarktypes.has(badge));
    if (incoming && typeof incoming.translatortype === "string") badges = badges.filter(badge => badge !== "translator" && badge !== "translatormod");
    if (incoming && incoming.affiliateverified === false) badges = badges.filter(badge => badge !== "verifiedaffiliate" && !(badge && typeof badge === "object" && badge.type === "affiliation"));
    for (const badge of cleanaccountbadges(incoming && incoming.badges)) {
      const key = cachebadgekey(badge);
      badges = badges.filter(value => cachebadgekey(value) !== key);
      badges.push(badge);
    }
    merged.badges = cleanaccountbadges(badges);
    return merged;
  }
  function loadaccountcache(values) {
    const entries = [];
    for (const value of Array.isArray(values) ? values : []) {
      const entry = normalizeaccount(value);
      if (!entry) continue;
      for (let index = entries.length - 1; index >= 0; index--) {
        if (entry.userid && entries[index].userid && String(entry.userid) !== String(entries[index].userid)
          && String(entry.handle).toLowerCase() === String(entries[index].handle).toLowerCase()) entries.splice(index, 1);
      }
      const index = entries.findIndex(existing => sameaccount(existing, entry));
      if (index >= 0) {
        const prior = entries.splice(index, 1)[0];
        entries.push(mergeaccountdata(prior, entry));
      } else entries.push(entry);
    }
    accountcachevalues = entries.slice(-accountcachelimit);
    cachedaccountmap.clear();
    for (const entry of accountcachevalues) cachedaccountmap.set(entry.handle.toLowerCase(), entry);
    rebuildreasonmap();
    schedulescan();
  }
  function persistaccountcache(user) {
    accountcachequeue = accountcachequeue.catch(() => {}).then(async () => {
      await accountcacheload;
      const entry = normalizeaccount(user);
      if (!entry) return;
      accountcachevalues = accountcachevalues.filter(existing =>
        !(entry.userid && existing.userid && String(entry.userid) !== String(existing.userid)
          && String(entry.handle).toLowerCase() === String(existing.handle).toLowerCase()));
      const index = accountcachevalues.findIndex(existing => sameaccount(existing, entry));
      if (index >= 0) {
        const prior = accountcachevalues.splice(index, 1)[0];
        accountcachevalues.push(mergeaccountdata(prior, entry));
      } else accountcachevalues.push(entry);
      accountcachevalues = accountcachevalues.slice(-accountcachelimit);
      cachedaccountmap.clear();
      for (const value of accountcachevalues) cachedaccountmap.set(value.handle.toLowerCase(), value);
      rebuildreasonmap();
      schedulescan();
      await accountcache.set(accountcachevalues);
    }).catch(() => {});
    return accountcachequeue;
  }
  function clearaccountcache() {
    accountcachequeue = accountcachequeue.catch(() => {}).then(async () => {
      await accountcacheload;
      accountcachevalues = [];
      cachedaccountmap.clear();
      capturedaccountmap.clear();
      rebuildreasonmap();
      schedulescan();
      await accountcache.set([]);
    }).catch(() => {});
    return accountcachequeue;
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

  function accountbadgecontent(user, includetranslator = true, includecheck = true) {
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
    const visible = [...badgeset].filter(type => includecheck && !affiliate && ["blue", "verified", "verifiedbusiness", "verifiedgovernment"].includes(type)
      || includetranslator && ["translator", "translatormod"].includes(type));
    if (!visible.length) return null;
    const displayuser = includecheck ? user : {
      ...user,
      badges: [],
      verificationkind: null,
      verifiedtype: null,
      blueverified: false,
      affiliateverified: false
    };
    return {
      html: tum._ov.scope.badgeshtml(visible, displayuser),
      signature: JSON.stringify({kind: user.verificationkind, verifiedtype: user.verifiedtype, translator, visible: visible.slice().sort()})
    };
  }

  function isverifiedicon(icon) {
    if (icon.closest(".tumpageaccountbadge")) return false;
    if (icon.getAttribute("data-testid") === "icon-verified" || icon.getAttribute("aria-label") === "Verified account") return true;
    if (icon.querySelector('[aria-label="Verified account"]')) return true;
    return [...icon.querySelectorAll("path")].some(path => /^M20\.396 11c/.test(path.getAttribute("d") || ""));
  }

  function hasnativecheckinside(namebox) {
    if (!namebox) return false;
    for (const icon of namebox.querySelectorAll('svg,[data-testid="icon-verified"],[aria-label="Verified account"]')) {
      if (isverifiedicon(icon)) return true;
    }
    return false;
  }

  function hasnativecheck(namebox) {
    return hasnativecheckinside(namebox) || hasnativecheckinside(namebox && namebox.parentElement);
  }

  function hasnativetranslator(namebox) {
    if (!namebox) return false;
    const containers = [namebox, namebox.parentElement].filter(Boolean);
    return containers.some(container => [...container.querySelectorAll("svg")]
      .filter(icon => !icon.closest(".tumpageaccountbadge, .tumtranslatorregularbadge"))
      .some(icon => /translator/i.test(icon.getAttribute("aria-label") || "")
        || [...icon.querySelectorAll("path")].some(path => /^M12 1\.75C6\.34/.test(path.getAttribute("d") || ""))));
  }

  function markaffiliatecheck(namebox, user) {
    if (!namebox) return;
    const badges = Array.isArray(user && user.badges) ? user.badges : [];
    const affiliate = accountaffiliate(user, badges) && accountblue(user, badges);
    const bluecontent = user && user.verificationkind === "blue" && !affiliate ? accountbadgecontent(user, false, true) : null;
    const template = bluecontent && document.createElement("template");
    if (template) template.innerHTML = bluecontent.html;
    const blueicon = template && template.content.querySelector(".tumbadgeblue svg");
    const containers = [namebox, namebox.parentElement].filter(Boolean);
    const icons = new Set(containers.flatMap(container => [...container.querySelectorAll("svg")]));
    for (const icon of icons) {
      if (!isverifiedicon(icon)) continue;
      let original = nativecheckoriginals.get(icon);
      if (blueicon) {
        if (!original) {
          original = {
            viewbox: icon.getAttribute("viewBox"),
            innerhtml: icon.innerHTML,
            label: icon.getAttribute("aria-label")
          };
          nativecheckoriginals.set(icon, original);
        }
        const viewbox = blueicon.getAttribute("viewBox");
        const label = blueicon.getAttribute("aria-label");
        if (viewbox && icon.getAttribute("viewBox") !== viewbox) icon.setAttribute("viewBox", viewbox);
        if (icon.innerHTML !== blueicon.innerHTML) icon.innerHTML = blueicon.innerHTML;
        if (label && icon.getAttribute("aria-label") !== label) icon.setAttribute("aria-label", label);
        icon.classList.add("tumbluecheck");
      } else if (original) {
        if (original.viewbox == null) icon.removeAttribute("viewBox");
        else icon.setAttribute("viewBox", original.viewbox);
        if (icon.innerHTML !== original.innerhtml) icon.innerHTML = original.innerhtml;
        if (original.label == null) icon.removeAttribute("aria-label");
        else icon.setAttribute("aria-label", original.label);
        nativecheckoriginals.delete(icon);
        icon.classList.remove("tumbluecheck");
      }
      icon.classList.toggle("tumaffiliatecheck", !!affiliate);
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

  function makeaccountbadge(handle, user, profile = false, includecheck = true, sticky = false, includetranslator = true) {
    const content = accountbadgecontent(user, includetranslator, includecheck);
    if (!content || !content.html) return null;
    const badge = document.createElement("span");
    badge.className = profile
      ? "tumpageaccountbadge tumpageprofileaccountbadge" + (sticky ? " tumpageprofilestickybadge" : "")
      : "tumpageaccountbadge";
    badge.dataset.handle = handle;
    badge.dataset.signature = content.signature;
    badge.setAttribute("aria-label", T("badge.accountstatus"));
    badge.innerHTML = content.html;
    return badge;
  }

  function makebadge(handle, entry) {
    const badge = document.createElement("span");
    badge.className = "tumpagereasonbadge";
    badge.dataset.handle = handle;
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
      if (accountbadge) accountbadge.removeAttribute("title");
      const entry = handle ? reasonmap.get(handle.toLowerCase()) : null;
      const account = handle ? accountmap.get(handle.toLowerCase()) : null;
      markaffiliatecheck(namebox, account);
      if (account || !accountbadge) {
        const nextbadge = handle ? makeaccountbadge(handle, account, false, !hasnativecheck(namebox), false, !hasnativetranslator(namebox)) : null;
        if (accountbadge && nextbadge && accountbadge.dataset.signature === nextbadge.dataset.signature) {
          nextbadge.remove();
        } else if (accountbadge) accountbadge.remove();
        if (nextbadge && !namebox.querySelector(".tumpageaccountbadge")) {
          const anchor = namebox.querySelector('a[role="link"][href^="/"]');
          const nameline = anchor && (anchor.querySelector('div[dir="ltr"]') || anchor);
          if (nameline) nameline.appendChild(nextbadge);
        }
      }
      if (!notesenabled) {if (existing) existing.remove(); continue}
      if (!entry) {
        if (existing) existing.remove();
        continue;
      }
      if (existing) {
        existing.dataset.handle = handle;
        existing.removeAttribute("title");
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
      existing.removeAttribute("title");
      return;
    }
    const badge = makebadge(handle, entry);
    badge.classList.add("tumpageprofilereasonbadge");
    nameel.parentNode.insertBefore(badge, nameel.nextSibling);
  }

  function scanprofileaccountbadge() {
    const m = PROFILEPATH.exec(location.pathname);
    const handle = m && m[1];
    const user = handle ? accountmap.get(handle.toLowerCase()) : null;
    if (!handle) {
      for (const badge of document.querySelectorAll(".tumpageprofileaccountbadge")) badge.remove();
      return;
    }
    const targets = [];
    const namebox = document.querySelector('[data-testid="UserName"]');
    const nameel = namebox && namebox.querySelector('div[dir="ltr"]');
    if (namebox && nameel) targets.push({box: namebox, line: nameel, sticky: false});
    const displayname = String(user && user.displayname || "").trim().toLowerCase();
    for (const heading of document.querySelectorAll('h1,h2,h3,[role="heading"]')) {
      if (namebox && namebox.contains(heading)) continue;
      const bounds = heading.getBoundingClientRect();
      if (!bounds.width || bounds.top < 0 || bounds.top > 110) continue;
      const title = String(heading.innerText || heading.textContent || "").split("\n")[0].trim().toLowerCase();
      const nativecheck = hasnativecheckinside(heading);
      if (title !== displayname && title !== handle.toLowerCase() && title !== "@" + handle.toLowerCase() && !nativecheck) continue;
      const nameline = [...heading.querySelectorAll("span,div")].find(node => String(node.textContent || "").trim().toLowerCase() === title);
      let line = heading;
      for (let parent = nameline && nameline.parentElement; parent && parent !== heading; parent = parent.parentElement) {
        const display = getComputedStyle(parent).display;
        if (["flex", "inline-flex"].includes(display) && [...parent.querySelectorAll("svg")].some(isverifiedicon)) {
          line = parent;
          break;
        }
      }
      targets.push({box: heading, line, sticky: true});
    }
    for (const badge of document.querySelectorAll(".tumpageprofileaccountbadge")) {
      if (!targets.some(target => target.box.contains(badge))) badge.remove();
    }
    for (const target of targets) {
      markaffiliatecheck(target.box, user);
      const selector = target.sticky ? ".tumpageprofilestickybadge" : ".tumpageprofileaccountbadge:not(.tumpageprofilestickybadge)";
      const existingbadges = [...target.box.querySelectorAll(selector)];
      const existing = existingbadges[0];
      for (const badge of existingbadges) badge.removeAttribute("title");
      const nextbadge = makeaccountbadge(handle, user, true, !hasnativecheck(target.box), target.sticky, !hasnativetranslator(target.box));
      if (!user && existing) continue;
      if (existing && nextbadge && existing.dataset.signature === nextbadge.dataset.signature) {
        nextbadge.remove();
        for (const duplicate of existingbadges.slice(1)) duplicate.remove();
        continue;
      }
      for (const badge of existingbadges) badge.remove();
      if (!nextbadge || !target.line) continue;
      if (target.sticky) target.line.appendChild(nextbadge);
      else {
        const note = target.box.querySelector(".tumpageprofilereasonbadge");
        if (note && note.parentNode === target.line.parentNode) target.line.parentNode.insertBefore(nextbadge, note.nextSibling);
        else target.line.parentNode.insertBefore(nextbadge, target.line.nextSibling);
      }
    }
  }

  function dotcontrast(hex) {
    const n = parseInt((hex || "#1d9bf0").replace("#", ""), 16);
    const r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
    return (r * 299 + g * 587 + b * 114) / 1000 >= 150 ? "#000" : "white";
  }
  function filldot(dot, entry, pagebg) {
    dot.removeAttribute("title");
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
      accountcache.subscribe(loadaccountcache);
      accountcacheload = accountcache.get().then(loadaccountcache, () => loadaccountcache([]));
      window.addEventListener("message", event => {
        if (event.source !== window || !event.data || event.data.__tumuser !== 1 || !event.data.data || !event.data.data.handle) return;
        const handle = event.data.data.handle.toLowerCase();
        const user = {
          handle: event.data.data.handle,
          displayname: event.data.data.displayname,
          badges: event.data.data.badges,
          verificationkind: event.data.data.verificationkind,
          verifiedtype: event.data.data.verifiedtype,
          blueverified: event.data.data.blueverified,
          affiliateverified: event.data.data.affiliateverified,
          translatortype: event.data.data.translatortype,
          verificationversion: event.data.data.verificationversion
        };
        capturedaccountmap.delete(handle);
        capturedaccountmap.set(handle, user);
        accountmap.set(handle, user);
        if (capturedaccountmap.size > 500) capturedaccountmap.delete(capturedaccountmap.keys().next().value);
        persistaccountcache({...user, userid: event.data.data.restId});
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
    },
    clearaccountcache
  };
})();

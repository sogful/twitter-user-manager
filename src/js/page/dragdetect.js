(function () {
  "use strict";

  window.tum = window.tum || {};

  const THRESHOLD = 6;
  const AVATARSEL = '[data-testid="Tweet-User-Avatar"], [data-testid^="UserAvatar-Container-"]';
  const ARTICLESEL = 'article[data-testid="tweet"], article[role="article"], div[data-testid="HoverCard"]';
  const NAMEBOXSEL = '[data-testid="User-Name"]';
  const PROFILEAVATARSEL = 'a[href$="/photo"]';
  const USERCELLSEL = '[data-testid="UserCell"]';

  /*//////////////////////////////////////////////////////////////////////*/

  function inprofileheader(target) {
    return !!target.closest(PROFILEAVATARSEL);
  }

  function isemojiimg(el) {
    if (!el || el.tagName !== "IMG") return false;
    const src = el.getAttribute("src") || "", alt = el.getAttribute("alt") || "";
    return /\/emoji\//.test(src) || (!!alt && /[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{2190}-\u{21FF}\u{2B00}-\u{2BFF}\u{FE00}-\u{FE0F}]/u.test(alt));
  }
  function nametext(el) {
    if (!el) return "";
    let s = "";
    for (const n of el.childNodes) {
      if (n.nodeType === 3) s += n.nodeValue;
      else if (n.nodeType === 1) {
        if (n.tagName === "IMG") s += n.getAttribute("alt") || "";
        else s += nametext(n);
      }
    }
    return s.trim();
  }
  function capturebadges(root) {
    if (!root) return [];
    return [...root.querySelectorAll("img, svg")].filter(b => !isemojiimg(b)).map(b => {
      const clone = b.cloneNode(true);
      try {
        const cs = getComputedStyle(b);
        clone.style.color = cs.color;
        if (b.tagName.toLowerCase() === "svg" && cs.fill && cs.fill !== "none") clone.style.fill = cs.fill;
      } catch {}
      return clone.outerHTML;
    });
  }

  function badgeels(scope) {
    return scope ? [...scope.querySelectorAll("img, svg")].filter(e => !e.closest(".tumpagereasonbadge, .tumpagefolderdot")) : [];
  }

  function cellprofilehandle(scope) {
    const av = scope.querySelector('[data-testid^="UserAvatar-Container-"]');
    const m = av && /UserAvatar-Container-(.+)$/.exec(av.getAttribute("data-testid") || "");
    return m ? m[1] : null;
  }

  function usercellhandle(target) {
    const cell = target.closest(USERCELLSEL);
    if (!cell) return null;
    const btn = target.closest('button, [role="button"]');
    if (btn && btn !== cell) return null;
    if (target.closest('[data-testid^="UserAvatar-Container-"]')) return cell;
    const link = target.closest('a[role="link"][href^="/"]');
    if (!link) return null;
    const handle = cellprofilehandle(cell);
    const href = (link.getAttribute("href") || "").replace(/^\//, "").replace(/\/$/, "");
    return handle && href.toLowerCase() === handle.toLowerCase() ? cell : null;
  }

  function isdraghandle(target) {
    if (target.closest(AVATARSEL)) return true;
    if (inprofileheader(target)) return true;
    // the expanded profile header's name/handle block is NOT a drag handle - only the pfp is
    if (target.closest('[data-testid="UserName"]')) return false;
    if (usercellhandle(target)) return true;
    const namebox = target.closest(NAMEBOXSEL);
    if (namebox && target.closest('a[role="link"]') && !target.closest('button, [role="button"]')) return true;
    if (!target.closest(ARTICLESEL)) {
      const link = target.closest("a[href]");
      if (link && handlefromhref(link.getAttribute("href"))) return true;
      if (target.matches && target.matches('img[alt="user avatar"]')) return true;
      if (!target.children.length && /^@[A-Za-z0-9_]+$/.test((target.textContent || "").trim())) return true;
    }
    if (target.closest('[data-testid^="dm-conversation-item-"]')) return true;
    if (/^\/notifications/.test(location.pathname) && target.matches && target.matches("img") && /profile_images/.test(target.currentSrc || target.src || "")) return true;
    // a bare profile-image (e.g. explore "Today's News" preview) whose handle we know from the avatar map
    if (target.matches && target.matches("img") && /profile_images/.test(target.currentSrc || target.src || "") && avatarmap.has(avatarkey(target.src))) return true;
    return false;
  }

  const SKIPPATH = /^\/(i|home|explore|search|notifications|messages|settings|compose)(\/|$)/i;

  function findprofilecaret() {
    for (const b of document.querySelectorAll('button[aria-label="More"]')) {
      if (!b.closest("article")) return b;
    }
    return null;
  }

  function findprofilefollowbutton() {
    for (const b of document.querySelectorAll('button[aria-label^="Follow @"]')) {
      if (!b.closest("article")) return b;
    }
    return null;
  }

  function findprofilenametargets(heading, handle) {
    const targets = [heading];
    const name = (heading.textContent || "").trim();
    const scope = document.querySelector("main");
    if (!scope) return targets;
    for (const node of scope.querySelectorAll("div, span")) {
      if (node === heading || node.children.length) continue;
      const t = (node.textContent || "").trim();
      if (!t) continue;
      if (t === name || t === "@" + handle) targets.push(node);
    }
    return targets;
  }

  function extractprofileheaderuser() {
    const m = /^\/([A-Za-z0-9_]+)\/?$/.exec(location.pathname);
    if (!m || SKIPPATH.test(location.pathname)) return null;
    const handle = m[1];
    const heading = document.querySelector("main h2");
    if (!heading) return null;
    const avatarlink = document.querySelector(PROFILEAVATARSEL);
    const avatarimg = avatarlink && avatarlink.querySelector("img");
    const displayname = nametext(heading) || handle;
    const badges = capturebadges(heading);
    const usernameblock = document.querySelector('[data-testid="UserName"]');
    const avatarcontainer = avatarlink && avatarlink.closest('[data-testid^="UserAvatar-Container-"]');
    const hdpill = avatarcontainer && avatarcontainer.querySelector(".tumhd");
    const dimtargets = [avatarlink, hdpill, usernameblock, ...findprofilenametargets(heading, handle)].filter(Boolean);
    return {handle, displayname, avatarurl: avatarimg ? avatarimg.src : null, badges, sourceurl: null, dimtargets, caret: findprofilecaret(), followbutton: findprofilefollowbutton(), source: "live"};
  }

  function extractusercell(cell) {
    let handle = null, avatarurl = null, displayname = null, namelink = null, handlelink = null;
    const av = cell.querySelector('[data-testid^="UserAvatar-Container-"]');
    if (av) {
      const m = /UserAvatar-Container-(.+)$/.exec(av.getAttribute("data-testid") || "");
      if (m) handle = m[1];
      const img = av.querySelector("img");
      if (img) avatarurl = img.src;
    }
    for (const a of cell.querySelectorAll('a[role="link"][href^="/"]')) {
      const href = (a.getAttribute("href") || "").replace(/^\//, "").replace(/\/$/, "");
      if (!handle || href.toLowerCase() !== handle.toLowerCase()) continue;
      const t = (a.textContent || "").trim();
      if (t.startsWith("@")) handlelink = handlelink || a;
      else if (t && !namelink) {displayname = nametext(a); namelink = a}
    }
    if (!handle) return null;
    const badges = capturebadges(namelink);
    const dimtargets = [av, namelink, handlelink, ...badgeels(namelink && namelink.parentElement)].filter(Boolean);
    const skipaction = /^\/settings\/(blocked|muted)/.test(location.pathname);
    return {handle, displayname: displayname || handle, avatarurl, badges, sourceurl: null, dimtargets, skipaction, source: "live"};
  }

  function extractfromnamebox(namebox) {
    let handle = null, displayname = null, namelink = null, handlelink = null;
    const links = namebox.querySelectorAll('a[role="link"][href^="/"]');
    for (const a of links) {
      const href = a.getAttribute("href") || "";
      if (/^\/[^/]+\/?$/.test(href) && !/^\/(i|home|search|notifications|messages)\/?$/.test(href)) {
        handle = href.replace(/^\//, "").replace(/\/$/, "");
        break;
      }
    }
    if (!handle) return null;
    namelink = links[0];
    handlelink = links[1];
    if (namelink) displayname = nametext(namelink) || null;
    let scope = namebox, avatar = null;
    for (let i = 0; i < 5 && scope && !avatar; i++) {avatar = scope.querySelector('[data-testid^="UserAvatar-Container-"]'); scope = scope.parentElement}
    const avatarimg = avatar && avatar.querySelector("img");
    const dimtargets = [avatar, namelink, handlelink, ...badgeels(namebox)].filter(Boolean);
    return {
      handle, displayname: displayname || handle, avatarurl: avatarimg ? avatarimg.src : null, 
      badges: capturebadges(namelink), sourceurl: null, dimtargets, source: "live"
    };
  }

  function extractnearavatar(av) {
    const m = /UserAvatar-Container-(.+)$/.exec(av.getAttribute("data-testid") || "");
    if (!m || m[1] === "unknown") return null;
    const handle = m[1];
    const img = av.querySelector("img");
    let scope = av, namelink = null, handlelink = null, displayname = null;
    for (let i = 0; i < 6 && scope; i++) {
      for (const a of scope.querySelectorAll('a[role="link"][href^="/"]')) {
        const href = (a.getAttribute("href") || "").replace(/^\//, "").replace(/\/$/, "");
        if (href.toLowerCase() !== handle.toLowerCase()) continue;
        const t = (a.textContent || "").trim();
        if (t.startsWith("@")) handlelink = handlelink || a;
        else if (t && !namelink) {displayname = nametext(a); namelink = a}
      }
      if (namelink || handlelink) break;
      scope = scope.parentElement;
    }
    const dimtargets = [av, namelink, handlelink, ...badgeels(namelink && namelink.parentElement)].filter(Boolean);
    return {
      handle, displayname: displayname || handle, avatarurl: img ? img.src : null, 
      badges: capturebadges(namelink), sourceurl: null, dimtargets, source: "live"
    };
  }

  const RESERVED = /^(i|home|explore|search|notifications|messages|settings|compose)$/i;
  function handlefromhref(href) {
    if (!href) return null;
    let path = href;
    const m = /^https?:\/\/(?:x|twitter)\.com(\/.*)$/i.exec(href);
    if (m) path = m[1];
    const hm = /^\/([A-Za-z0-9_]+)\/?$/.exec(path);
    return hm && !RESERVED.test(hm[1]) ? hm[1] : null;
  }
  function extractfromlink(link) {
    const handle = handlefromhref(link.getAttribute("href"));
    if (!handle) return null;
    let scope = link, namelink = null, handlelink = null, displayname = null, avatar = null;
    for (let i = 0; i < 6 && scope; i++) {
      for (const a of scope.querySelectorAll("a[href]")) {
        const hh = handlefromhref(a.getAttribute("href"));
        if (!hh || hh.toLowerCase() !== handle.toLowerCase()) continue;
        const t = (a.textContent || "").trim();
        if (t.startsWith("@")) handlelink = handlelink || a;
        else if (t && !namelink) {displayname = nametext(a); namelink = a}
      }
      if (!avatar) avatar = scope.querySelector('[data-testid="UserAvatar-Container-' + handle + '"]');
      if (namelink || handlelink) break;
      scope = scope.parentElement;
    }
    const img = avatar && avatar.querySelector("img");
    const dimtargets = [avatar, namelink, handlelink, ...badgeels(namelink && namelink.parentElement)].filter(Boolean);
    return {
      handle, displayname: displayname || handle, avatarurl: img ? img.src : null, 
      badges: capturebadges(namelink), sourceurl: null, dimtargets, source: "live"
    };
  }

  function chatavatar(scope) {return scope.querySelector('img[alt="user avatar"]') || scope.querySelector("img")}
  function chathandle(scope) {
    for (const a of scope.querySelectorAll("a[href]")) {const h = handlefromhref(a.getAttribute("href")); if (h) return h}
    for (const s of scope.querySelectorAll("span, div")) {
      if (s.children.length) continue;
      const m = /^@([A-Za-z0-9_]+)$/.exec((s.textContent || "").trim());
      if (m) return m[1];
    }
    return null;
  }
  function hashandlespan(el) {
    return [...el.querySelectorAll("span, div")].some(s => !s.children.length && /^@[A-Za-z0-9_]+$/.test((s.textContent || "").trim()));
  }
  function extractchatuser(startel) {
    let s = startel, handle = null;
    for (let i = 0; i < 8 && s && !handle; i++) {handle = chathandle(s); if (!handle) s = s.parentElement}
    if (!handle) return null;
    let scope = startel;
    for (let i = 0; i < 8 && scope && !hashandlespan(scope); i++) scope = scope.parentElement;
    scope = scope || startel;
    let imgscope = startel;
    for (let i = 0; i < 8 && imgscope && !chatavatar(imgscope); i++) imgscope = imgscope.parentElement;
    const img = (startel.matches && startel.matches("img")) ? startel : chatavatar(imgscope || scope);
    const dimtargets = [];
    if (img) dimtargets.push(img.parentElement || img);
    for (const sp of scope.querySelectorAll("span, div")) {
      if (sp.children.length || !/^@[A-Za-z0-9_]+$/.test((sp.textContent || "").trim())) continue;
      const p = sp.parentElement;
      dimtargets.push(p && (p.textContent || "").trim().length < 40 ? p : sp);
    }
    return {handle, displayname: handle, avatarurl: img ? img.src : null, badges: [], sourceurl: null, dimtargets: dimtargets.filter(Boolean), source: "live"};
  }

  function headerbullets(namebox, statuslink, article) {
    if (!namebox || !statuslink) return [];
    let container = namebox;
    while (container && !container.contains(statuslink)) container = container.parentElement;
    container = container || article;
    return [...container.querySelectorAll("span")].filter(s => !s.children.length && (s.textContent || "").trim() === "·" && !s.closest('[data-testid="tweetText"]'));
  }

  function extractuser(article) {
    const namebox = article.querySelector(NAMEBOXSEL) || (article.matches(NAMEBOXSEL) ? article : null);
    const avatarcontainer = article.querySelector('[data-testid="Tweet-User-Avatar"], [data-testid^="UserAvatar-Container-"]');
    const avatarimg = avatarcontainer && avatarcontainer.querySelector("img");
    const avatarurl = avatarimg ? avatarimg.src : null;
    const handleav = article.querySelector('[data-testid^="UserAvatar-Container-"]');
    let handle = null;
    if (handleav) {
      const m = /UserAvatar-Container-(.+)$/.exec(handleav.getAttribute("data-testid") || "");
      if (m) handle = m[1];
    }
    const scope = namebox || article;
    if (!handle) {
      for (const a of scope.querySelectorAll('a[role="link"][href^="/"]')) {
        const href = a.getAttribute("href") || "";
        if (/^\/[^/]+\/?$/.test(href) && !/^\/(i|home|search|notifications|messages)\/?$/.test(href)) {
          handle = href.replace(/^\//, "").replace(/\/$/, "");
          break;
        }
      }
    }
    if (!handle) return null;
    let displayname = null, namelink = null, handlelink = null;
    for (const a of scope.querySelectorAll('a[role="link"][href^="/"]')) {
      const href = (a.getAttribute("href") || "").replace(/^\//, "").replace(/\/$/, "");
      if (href.toLowerCase() !== handle.toLowerCase()) continue;
      const t = (a.textContent || "").trim();
      if (t.startsWith("@")) handlelink = handlelink || a;
      else if (t && !namelink) {displayname = nametext(a); namelink = a}
    }
    const badges = capturebadges(namelink);
    const statuslink = article.querySelector('a[href*="/status/"]');
    const sourceurl = statuslink ? new URL(statuslink.getAttribute("href"), location.origin).href : null;
    const badgescope = namebox || (namelink && namelink.parentElement);
    const dimtargets = [avatarcontainer, namelink, handlelink, statuslink, ...headerbullets(namebox, statuslink, article), ...badgeels(badgescope)];
    if (!namelink && !handlelink && namebox) {
      dimtargets.push(namebox);
      if (!displayname) {
        const full = (namebox.textContent || "").trim();
        const at = full.toLowerCase().indexOf("@" + handle.toLowerCase());
        displayname = (at > 0 ? full.slice(0, at) : full.split("\n")[0]).replace(/[·•∙]\s*$/, "").trim() || null;
      }
    }
    return {handle, displayname: displayname || handle, avatarurl, badges, sourceurl, dimtargets: dimtargets.filter(Boolean), article, source: "live"};
  }

  let ownhandlecache = null;
  function ownhandle() {
    if (ownhandlecache) return ownhandlecache;
    const a = document.querySelector('[data-testid="AppTabBar_Profile_Link"]');
    let h = a && (a.getAttribute("href") || "").replace(/^\//, "").replace(/\/$/, "");
    if (!h) {
      const sw = document.querySelector('[data-testid="SideNav_AccountSwitcher_Button"]');
      const m = sw && /@([A-Za-z0-9_]+)/.exec(sw.textContent || "");
      if (m) h = m[1];
    }
    if (h) ownhandlecache = h.toLowerCase();
    return ownhandlecache;
  }
  function isself(handle) {const o = ownhandle(); return !!o && (handle || "").toLowerCase() === o}

  /*//////////////////////////////////////////////////////////////////////*/

  // pfp-url -> {handle, name}
  const avatarmap = new Map();
  function avatarkey(url) {
    const m = /profile_images\/(\d+)\/([^/?#.]+)/.exec(url || "");
    return m ? m[1] + "/" + m[2].replace(/_(normal|bigger|mini|x96|reasonably_small|\d+x\d+)$/i, "") : null;
  }
  window.addEventListener("message", e => {
    if (!e.data || e.data.__tumavatars !== 1 || !Array.isArray(e.data.data)) return;
    for (const u of e.data.data) {const k = avatarkey(u.avatar); if (k) avatarmap.set(k, {handle: u.handle, name: u.name})}
  });
  function nearestavatarimg(target) {
    if (target.matches && target.matches("img")) return target;
    const scope = target.closest('[data-testid^="UserAvatar-Container-"], a[href^="/"], [role="link"]') || target;
    return scope.querySelector ? scope.querySelector("img") : null;
  }
  function extractfromavatarmap(target) {
    const img = nearestavatarimg(target);
    const hit = img && avatarmap.get(avatarkey(img.src));
    if (!hit) return null;
    const av = img.closest('[data-testid^="UserAvatar-Container-"]') || img.parentElement || img;
    return {handle: hit.handle, displayname: hit.name || hit.handle, avatarurl: img.src, badges: [], sourceurl: null, dimtargets: [av].filter(Boolean), source: "live"};
  }
  // explore "Today's News" avatars are handle-less imgs buried in nested divs, so a real pointerdown
  // lands on a wrapper/text node, not the img. find the resolvable avatar actually under the cursor.
  function avatarmapatpoint(x, y) {
    let best = null, bestd = Infinity;
    for (const img of document.querySelectorAll("img")) {
      const src = img.currentSrc || img.src || "";
      if (!/profile_images/.test(src) || !avatarmap.has(avatarkey(src))) continue;
      const r = img.getBoundingClientRect();
      if (r.width < 1) continue;
      if (x < r.left - 4 || x > r.right + 4 || y < r.top - 4 || y > r.bottom + 4) continue;
      const d = Math.hypot(r.left + r.width / 2 - x, r.top + r.height / 2 - y);
      if (d < bestd) {best = img; bestd = d}
    }
    return best;
  }

  function aggregatednotifavatar(target, article) {
    if (!/^\/notifications/.test(location.pathname)) return null;
    const av = target.closest('[data-testid^="UserAvatar-Container-"]');
    if (!av) return null;
    const m = /UserAvatar-Container-(.+)$/.exec(av.getAttribute("data-testid") || "");
    if (!m || m[1] === "unknown") return null;
    const handles = new Set();
    for (const v of article.querySelectorAll('[data-testid^="UserAvatar-Container-"]')) {
      const mm = /UserAvatar-Container-(.+)$/.exec(v.getAttribute("data-testid") || "");
      if (mm && mm[1] !== "unknown") handles.add(mm[1].toLowerCase());
    }
    return handles.size > 1 ? av : null;
  }

  let tracking = null; // {startx, starty, user, dragging}

  function onpointerdown(e) {
    if (e.button !== undefined && e.button !== 0) return;
    if (e.target.closest && e.target.closest(".tumpagefolderdot, .tumpagereasonbadge")) return;
    // resolvable avatar (e.g. Today's News preview) under the cursor even when the target is a wrapper
    let mapav = null;
    if (!isdraghandle(e.target)) {
      mapav = avatarmapatpoint(e.clientX, e.clientY);
      if (!mapav) return;
    }
    let user;
    if (mapav) {
      user = extractfromavatarmap(mapav);
    } else if (inprofileheader(e.target)) {
      user = extractprofileheaderuser();
    } else {
      const cell = e.target.closest(USERCELLSEL);
      const article = e.target.closest(ARTICLESEL);
      const quoted = e.target.closest('div[role="link"][tabindex]');

      const aggav = article ? aggregatednotifavatar(e.target, article) : null;
      if (cell) user = extractusercell(cell);
      else if (aggav) {
        user = extractnearavatar(aggav);
        const mapped = extractfromavatarmap(aggav);
        if (user && mapped && mapped.displayname && mapped.displayname !== user.handle) user.displayname = mapped.displayname;
      }
      else if (quoted && article && article.contains(quoted) && quoted.querySelector('[data-testid^="UserAvatar-Container-"]')) user = extractuser(quoted);
      else if (article) user = extractuser(article);
      else {
        const namebox = e.target.closest(NAMEBOXSEL);
        const av = e.target.closest('[data-testid^="UserAvatar-Container-"]');
        const plink = e.target.closest("a[href]");
        const chatitem = e.target.closest('[data-testid^="dm-conversation-item-"]');
        const chatavatarimg = e.target.matches && e.target.matches('img[alt="user avatar"]');
        const handlespan = !e.target.children.length && /^@[A-Za-z0-9_]+$/.test((e.target.textContent || "").trim());

        if (namebox) user = extractfromnamebox(namebox);
        else if (av) user = extractnearavatar(av);
        else if (chatitem || chatavatarimg || handlespan) user = extractchatuser(e.target);
        else if (plink && handlefromhref(plink.getAttribute("href"))) user = extractfromlink(plink);
        else {user = extractfromavatarmap(e.target); if (!user) return}
      }
    }
    if (!user) user = extractfromavatarmap(e.target);
    if (!user) return;
    if (isself(user.handle)) return;
    tracking = {startx: e.clientX, starty: e.clientY, user, dragging: false};
  }

  function onpointermove(e) {
    if (!tracking) return;
    const dx = e.clientX - tracking.startx, dy = e.clientY - tracking.starty;
    if (!tracking.dragging) {
      if (Math.hypot(dx, dy) < THRESHOLD) return;
      tracking.dragging = true;
      tum.overlay.begindrag(tracking.user, e.clientX, e.clientY);
      document.body.style.userSelect = "none";
    } else {
      tum.overlay.updatedrag(e.clientX, e.clientY);
    }
    if (tracking.dragging) e.preventDefault();
  }

  function onpointerup(e) {
    if (!tracking) return;
    document.body.style.userSelect = "";
    if (tracking.dragging) {
      tum.overlay.enddrag(e.clientX, e.clientY);
      e.preventDefault();
      e.stopPropagation();
    }
    tracking = null;
  }

  function onpointercancel() {
    if (tracking && tracking.dragging) tum.overlay.canceldrag();
    document.body.style.userSelect = "";
    tracking = null;
  }

  function ondragstart(e) {
    if (isdraghandle(e.target)) e.preventDefault();
  }

  window.tum.dragdetect = {
    init() {
      document.addEventListener("dragstart", ondragstart, true);
      document.addEventListener("pointerdown", onpointerdown, true);
      document.addEventListener("pointermove", onpointermove, true);
      document.addEventListener("pointerup", onpointerup, true);
      document.addEventListener("pointercancel", onpointercancel, true);
    }
  };
  
})();

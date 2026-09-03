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

  function capturebadges(root) {
    if (!root) return [];
    return [...root.querySelectorAll("img, svg")].map(b => {
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
    const displayname = heading.textContent || handle;
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
      else if (t && !namelink) {displayname = t; namelink = a}
    }
    if (!handle) return null;
    const badges = capturebadges(namelink);
    const dimtargets = [av, namelink, handlelink, ...badgeels(namelink && namelink.parentElement)].filter(Boolean);
    return {handle, displayname: displayname || handle, avatarurl, badges, sourceurl: null, dimtargets, skipaction: true, source: "live"};
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
    if (namelink) displayname = namelink.textContent || null;
    let scope = namebox, avatar = null;
    for (let i = 0; i < 5 && scope && !avatar; i++) {avatar = scope.querySelector('[data-testid^="UserAvatar-Container-"]'); scope = scope.parentElement}
    const avatarimg = avatar && avatar.querySelector("img");
    const dimtargets = [avatar, namelink, handlelink, ...badgeels(namebox)].filter(Boolean);
    return {handle, displayname: displayname || handle, avatarurl: avatarimg ? avatarimg.src : null, badges: capturebadges(namelink), sourceurl: null, dimtargets, source: "live"};
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
        else if (t && !namelink) {displayname = t; namelink = a}
      }
      if (namelink || handlelink) break;
      scope = scope.parentElement;
    }
    const dimtargets = [av, namelink, handlelink, ...badgeels(namelink && namelink.parentElement)].filter(Boolean);
    return {handle, displayname: displayname || handle, avatarurl: img ? img.src : null, badges: capturebadges(namelink), sourceurl: null, dimtargets, source: "live"};
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
        else if (t && !namelink) {displayname = t; namelink = a}
      }
      if (!avatar) avatar = scope.querySelector('[data-testid="UserAvatar-Container-' + handle + '"]');
      if (namelink || handlelink) break;
      scope = scope.parentElement;
    }
    const img = avatar && avatar.querySelector("img");
    const dimtargets = [avatar, namelink, handlelink, ...badgeels(namelink && namelink.parentElement)].filter(Boolean);
    return {handle, displayname: displayname || handle, avatarurl: img ? img.src : null, badges: capturebadges(namelink), sourceurl: null, dimtargets, source: "live"};
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
      else if (t && !namelink) {displayname = t; namelink = a}
    }
    const badges = capturebadges(namelink);
    const statuslink = article.querySelector('a[href*="/status/"]');
    const sourceurl = statuslink ? new URL(statuslink.getAttribute("href"), location.origin).href : null;
    const badgescope = namebox || (namelink && namelink.parentElement);
    const dimtargets = [avatarcontainer, namelink, handlelink, statuslink, ...headerbullets(namebox, statuslink, article), ...badgeels(badgescope)];
    if (!namelink && !handlelink && namebox) {
      dimtargets.push(namebox);
      if (!displayname) displayname = (namebox.textContent || "").trim().split("\n")[0] || null;
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

  let tracking = null; // {startx, starty, user, dragging}

  function onpointerdown(e) {
    if (e.button !== undefined && e.button !== 0) return;
    if (e.target.closest && e.target.closest(".tumpagefolderdot, .tumpagereasonbadge")) return;
    if (!isdraghandle(e.target)) return;
    let user;
    if (inprofileheader(e.target)) {
      user = extractprofileheaderuser();
    } else {
      const cell = e.target.closest(USERCELLSEL);
      const article = e.target.closest(ARTICLESEL);
      const quoted = e.target.closest('div[role="link"][tabindex]');

      if (cell) user = extractusercell(cell);
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
        else return;
      }
    }
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

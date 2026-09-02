(function () {
  "use strict";

  window.tum = window.tum || {};

  const THRESHOLD = 6;
  const AVATARSEL = '[data-testid="Tweet-User-Avatar"], [data-testid^="UserAvatar-Container-"]';
  // TODO: verify against a live x.com session - HoverCard reuses the tweet's own User-Name
  // component as far as I know, but this specific testid is unconfirmed
  const ARTICLESEL = 'article[data-testid="tweet"], article[role="article"], div[data-testid="HoverCard"]';
  const NAMEBOXSEL = '[data-testid="User-Name"]';
  // confirmed live: the profile header's big name is plain text, not a link (nowhere to
  // navigate to from your own page), so it can't reuse the tweet/hovercard extraction at all -
  // this scopes to the header's own avatar-photo link and its one <h2>
  const PROFILEAVATARSEL = 'a[href$="/photo"]';

  const USERCELLSEL = '[data-testid="UserCell"]';

  // the big nickname is plain text on a profile page (nowhere to navigate to from your own
  // page), and dragging it would fight with just wanting to select/copy it normally - only the
  // photo starts a drag here, same as the avatar is the drag handle everywhere else
  function inprofileheader(target) {
    return !!target.closest(PROFILEAVATARSEL);
  }

  // clone each verified/automated/etc badge to an html string, but inline its resolved color
  // first - the checkmark svg is fill:currentColor tinted by a css class that won't follow it
  // into our shadow root, so without this the blue/gold badge renders flat black once dropped
  function capturebadges(root) {
    if (!root) return [];
    return [...root.querySelectorAll("img, svg")].map(b => {
      const clone = b.cloneNode(true);
      // the checkmark's blue comes from a twitter css class (fill:currentColor) that won't follow
      // it into our shadow root, so inline BOTH color and the resolved fill - color alone leaves the
      // path defaulting to black
      try {
        const cs = getComputedStyle(b);
        clone.style.color = cs.color;
        if (b.tagName.toLowerCase() === "svg" && cs.fill && cs.fill !== "none") clone.style.fill = cs.fill;
      } catch {}
      return clone.outerHTML;
    });
  }

  // every badge glyph in a name block - verified/automated live inside the name link, but the
  // affiliated badge (the little company square) is a sibling, so these have to be hidden
  // explicitly on drag or they'd be left floating where the name used to be. our OWN injected
  // note-pencil / folder-dot are excluded - they're our ui, not the user's identity
  function badgeels(scope) {
    return scope ? [...scope.querySelectorAll("img, svg")].filter(e => !e.closest(".tumpagereasonbadge, .tumpagefolderdot")) : [];
  }

  // the profile a UserCell/User-Name points at (its avatar and name/handle all link to it) - used
  // to tell a name/handle link apart from a mention link sitting in the bio next to it
  function cellprofilehandle(scope) {
    const av = scope.querySelector('[data-testid^="UserAvatar-Container-"]');
    const m = av && /UserAvatar-Container-(.+)$/.exec(av.getAttribute("data-testid") || "");
    return m ? m[1] : null;
  }

  // a UserCell (followers, following, mutes, blocks, who-to-follow, likers, search people, list
  // members...) is a drag handle on its avatar and on its name/@handle links - but not its action
  // button, and not a mention link that happens to sit in the bio
  function usercellhandle(target) {
    const cell = target.closest(USERCELLSEL);
    if (!cell) return null;
    // the whole cell is itself a role="button", so only bail on a button that ISN'T the cell -
    // i.e. the follow/mute/block action control nested inside it
    const btn = target.closest('button, [role="button"]');
    if (btn && btn !== cell) return null;
    if (target.closest('[data-testid^="UserAvatar-Container-"]')) return cell;
    const link = target.closest('a[role="link"][href^="/"]');
    if (!link) return null;
    const handle = cellprofilehandle(cell);
    const href = (link.getAttribute("href") || "").replace(/^\//, "").replace(/\/$/, "");
    return handle && href.toLowerCase() === handle.toLowerCase() ? cell : null;
  }

  // both the nickname and the @handle start a drag now (tweets, hovercards, cells and anywhere
  // else a User-Name shows up), plus avatars and the profile header - but not action buttons
  function isdraghandle(target) {
    if (target.closest(AVATARSEL)) return true;
    if (inprofileheader(target)) return true;
    if (usercellhandle(target)) return true;
    // a User-Name's name/@handle link, as long as it isn't wrapped in some action button
    const namebox = target.closest(NAMEBOXSEL);
    if (namebox && target.closest('a[role="link"]') && !target.closest('button, [role="button"]')) return true;
    // a bare profile link OUTSIDE any tweet (a list creator, chat header, side-rail name...) -
    // scoped to outside articles so a @mention inside a tweet still grabs the tweet's author.
    // handlefromhref also accepts the absolute https://x.com/name links the new chat uses
    if (!target.closest(ARTICLESEL)) {
      const link = target.closest("a[href]");
      if (link && handlefromhref(link.getAttribute("href"))) return true;
      // new x chat: a bare "user avatar" image or a plain @handle text span (intro card, panels)
      if (target.matches && target.matches('img[alt="user avatar"]')) return true;
      if (!target.children.length && /^@[A-Za-z0-9_]+$/.test((target.textContent || "").trim())) return true;
    }
    // a chat-list row (new x chat) - resolvable only if it shows an @handle, checked at extract time
    if (target.closest('[data-testid^="dm-conversation-item-"]')) return true;
    return false;
  }

  const SKIPPATH = /^\/(i|home|explore|search|notifications|messages|settings|compose)(\/|$)/i;

  // a profile page has no per-tweet caret - it has its own single "More" overflow button up
  // in the header (next to Follow) with the same Mute/Block items. picking the wrong caret
  // (e.g. the first tweet's) would run the action on a random stranger, so this has to find
  // that specific button rather than reuse the article-scoped lookup actions.js does for tweets
  function findprofilecaret() {
    for (const b of document.querySelectorAll('button[aria-label="More"]')) {
      if (!b.closest("article")) return b;
    }
    return null;
  }

  // follow has its own dedicated button on a profile page - it isn't in the More menu the way
  // it is on a tweet, so the "follow" action needs a different click target than mute/block do
  function findprofilefollowbutton() {
    for (const b of document.querySelectorAll('button[aria-label^="Follow @"]')) {
      if (!b.closest("article")) return b;
    }
    return null;
  }

  // twitter doesn't tag the sticky-header name or the @handle line under the big heading with
  // any stable testid, so find them by exact text match instead of guessing a class name -
  // only leaf nodes (no children) so a match can't accidentally swallow the bio text next to it
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
    // no specific tweet to attach and nothing to dim to a percent besides the header itself -
    // "or none if directly from profile" is intentional, not a gap. covers the sticky-header
    // duplicate of the name too, not just the big one, so nothing readable is left behind
    // the UserName block holds the display name, @handle and every badge together - hiding it
    // whole takes the verified/affiliated badges with it, and the text-match pass still covers
    // the sticky-header duplicate of the name up top
    const usernameblock = document.querySelector('[data-testid="UserName"]');
    const dimtargets = [avatarlink, usernameblock, ...findprofilenametargets(heading, handle)].filter(Boolean);
    return {handle, displayname, avatarurl: avatarimg ? avatarimg.src : null, badges, sourceurl: null, dimtargets, caret: findprofilecaret(), followbutton: findprofilefollowbutton(), source: "live"};
  }

  // the blocked / muted settings lists are plain UserCells, not tweets - draggable so you can
  // sort them into folders by hand. skipaction: they're already blocked/muted and these rows have
  // no caret menu to re-run anything through, so dropping them just files them, never re-acts
  function extractusercell(cell) {
    let handle = null, avatarurl = null, displayname = null, namelink = null, handlelink = null;
    const av = cell.querySelector('[data-testid^="UserAvatar-Container-"]');
    if (av) {
      const m = /UserAvatar-Container-(.+)$/.exec(av.getAttribute("data-testid") || "");
      if (m) handle = m[1];
      const img = av.querySelector("img");
      if (img) avatarurl = img.src;
    }
    // among the links pointing at this profile, the one with non-@ text is the nickname, the one
    // starting @ is the handle - a bio mention points at a different profile and is ignored
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

  // a User-Name that isn't inside a tweet article (some side rails, dialogs, etc) - same idea as
  // extractuser but it hunts for a nearby avatar rather than assuming an article wraps everything
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

  // a bare avatar that isn't inside a tweet/cell/hovercard/profile-header (a list creator, a
  // chat header, a menu row...) - grab the handle off its testid and hunt nearby for the matching
  // name/@handle links so those get hidden too. the catch-all that makes most stray avatars work
  function extractnearavatar(av) {
    const m = /UserAvatar-Container-(.+)$/.exec(av.getAttribute("data-testid") || "");
    if (!m || m[1] === "unknown") return null; // "unknown" is a list/placeholder icon, not a user
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

  // a bare profile link outside any tweet - a list's creator attribution, a side-rail name, etc.
  // the handle is the link's own href; the matching name/@handle links nearby get hidden, and if
  // that profile's real avatar is around it's used for the chip (a list icon is not)
  // a profile handle out of a link href - copes with both relative (/name) and the absolute
  // (https://x.com/name) form the new chat uses, and rejects reserved single-segment paths
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

  // the new x chat (chat-list rows, the chatlog intro card, the triple-dot info panel) has no
  // UserAvatar-Container and no relative profile links - just an avatar <img alt="user avatar">,
  // plain @handle text spans, and sometimes a View-Profile/header link. resolve the handle from a
  // profile link if there is one, else an @handle token, then hide the pfp AND the name cluster
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
    // hide scope: the nearest ancestor that actually holds a @handle span, which is the small
    // pfp+name+@handle cluster (well short of the "N Followers · Joined" line and View Profile)
    let scope = startel;
    for (let i = 0; i < 8 && scope && !hashandlespan(scope); i++) scope = scope.parentElement;
    scope = scope || startel;
    // the pfp and the name are separate siblings in chat, so if the name was grabbed the avatar
    // won't be in the @handle scope - walk up until an ancestor actually holds a "user avatar" img,
    // so the chip shows the pfp and it gets hidden on the page too
    let imgscope = startel;
    for (let i = 0; i < 8 && imgscope && !chatavatar(imgscope); i++) imgscope = imgscope.parentElement;
    const img = (startel.matches && startel.matches("img")) ? startel : chatavatar(imgscope || scope);
    const dimtargets = [];
    if (img) dimtargets.push(img.parentElement || img); // the parent carries the placeholder circle bg
    // hide each @handle span and, since the display name has no link to key off, the small block
    // that wraps it (name + @handle sit together)
    for (const sp of scope.querySelectorAll("span, div")) {
      if (sp.children.length || !/^@[A-Za-z0-9_]+$/.test((sp.textContent || "").trim())) continue;
      const p = sp.parentElement;
      dimtargets.push(p && (p.textContent || "").trim().length < 40 ? p : sp);
    }
    return {handle, displayname: handle, avatarurl: img ? img.src : null, badges: [], sourceurl: null, dimtargets: dimtargets.filter(Boolean), source: "live"};
  }

  function extractuser(article) {
    const namebox = article.querySelector(NAMEBOXSEL) || (article.matches(NAMEBOXSEL) ? article : null);
    const avatarcontainer = article.querySelector('[data-testid="Tweet-User-Avatar"], [data-testid^="UserAvatar-Container-"]');
    const avatarimg = avatarcontainer && avatarcontainer.querySelector("img");
    const avatarurl = avatarimg ? avatarimg.src : null;
    // the handle comes off the UserAvatar-Container testid specifically (a Tweet-User-Avatar
    // wrapper carries no handle), else the first plain profile link. hover cards have no User-Name
    // box and quoted tweets have no links inside theirs (the whole quote is one big link) - both
    // are handled by falling back to the avatar/handle text below
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
    // among the links pointing at this profile, non-@ text is the nickname, @-text is the handle
    let displayname = null, namelink = null, handlelink = null;
    for (const a of scope.querySelectorAll('a[role="link"][href^="/"]')) {
      const href = (a.getAttribute("href") || "").replace(/^\//, "").replace(/\/$/, "");
      if (href.toLowerCase() !== handle.toLowerCase()) continue;
      const t = (a.textContent || "").trim();
      if (t.startsWith("@")) handlelink = handlelink || a;
      else if (t && !namelink) {displayname = t; namelink = a}
    }
    const badges = capturebadges(namelink);
    // the tweet permalink, if this drag came from a tweet card - a hover card/profile isn't
    // wrapped in one, so there's nothing to attach in that case, which is intentional
    const statuslink = article.querySelector('a[href*="/status/"]');
    const sourceurl = statuslink ? new URL(statuslink.getAttribute("href"), location.origin).href : null;
    const badgescope = namebox || (namelink && namelink.parentElement);
    const dimtargets = [avatarcontainer, namelink, handlelink, statuslink, ...badgeels(badgescope)];
    // quoted tweet: the name/@handle are text spans, not links, so there's no namelink to hide -
    // hide the whole User-Name block instead (and grab the display name from it for the chip)
    if (!namelink && !handlelink && namebox) {
      dimtargets.push(namebox);
      if (!displayname) displayname = (namebox.textContent || "").trim().split("\n")[0] || null;
    }
    return {handle, displayname: displayname || handle, avatarurl, badges, sourceurl, dimtargets: dimtargets.filter(Boolean), article, source: "live"};
  }

  let tracking = null; // {startx, starty, user, dragging}

  function onpointerdown(e) {
    if (e.button !== undefined && e.button !== 0) return;
    // our own injected page badges (note pencil, folder dot) sit inside avatars/name blocks -
    // clicking them shouldn't start a drag of that user
    if (e.target.closest && e.target.closest(".tumpagefolderdot, .tumpagereasonbadge")) return;
    if (!isdraghandle(e.target)) return;
    let user;
    if (inprofileheader(e.target)) {
      user = extractprofileheaderuser();
    } else {
      const cell = e.target.closest(USERCELLSEL);
      const article = e.target.closest(ARTICLESEL);
      // a quoted tweet is a role=link block nested in the article with its own avatar - dragging
      // inside it should grab the quoted author, not the outer tweet's author
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
        // a bare avatar or a bare profile link somewhere else (list creator, chat header, menu...)
        if (namebox) user = extractfromnamebox(namebox);
        else if (av) user = extractnearavatar(av);
        else if (chatitem || chatavatarimg || handlespan) user = extractchatuser(e.target);
        else if (plink && handlefromhref(plink.getAttribute("href"))) user = extractfromlink(plink);
        else return;
      }
    }
    if (!user) return;
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
    // the avatar img and the name/handle links are natively draggable by the browser,
    // which hijacks the gesture into an HTML5 drag before our pointermove threshold ever
    // fires - kill it on our handles so the custom pointer-based drag can take over
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

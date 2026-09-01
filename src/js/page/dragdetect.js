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
      try {clone.style.color = getComputedStyle(b).color} catch {}
      return clone.outerHTML;
    });
  }

  // every badge glyph in a name block - verified/automated live inside the name link, but the
  // affiliated badge (the little company square) is a sibling, so these have to be hidden
  // explicitly on drag or they'd be left floating where the name used to be
  function badgeels(scope) {
    return scope ? [...scope.querySelectorAll("img, svg")] : [];
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
    // a bare profile link OUTSIDE any tweet (a list creator, side-rail name, bio mention...) -
    // scoped to outside articles so a @mention inside a tweet still grabs the tweet's author
    if (!target.closest(ARTICLESEL)) {
      const link = target.closest('a[role="link"][href^="/"]');
      if (link && /^\/[A-Za-z0-9_]+\/?$/.test(link.getAttribute("href") || "")) return true;
    }
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
  const HANDLERE = /^\/([A-Za-z0-9_]+)\/?$/;
  function extractfromlink(link) {
    const mm = HANDLERE.exec(link.getAttribute("href") || "");
    if (!mm) return null;
    const handle = mm[1];
    let scope = link, namelink = null, handlelink = null, displayname = null, avatar = null;
    for (let i = 0; i < 6 && scope; i++) {
      for (const a of scope.querySelectorAll('a[role="link"][href^="/"]')) {
        const href = (a.getAttribute("href") || "").replace(/^\//, "").replace(/\/$/, "");
        if (href.toLowerCase() !== handle.toLowerCase()) continue;
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
        const plink = e.target.closest('a[role="link"][href^="/"]');
        // a bare avatar or a bare profile link somewhere else (list creator, chat header, menu...)
        if (namebox) user = extractfromnamebox(namebox);
        else if (av) user = extractnearavatar(av);
        else if (plink && /^\/[A-Za-z0-9_]+\/?$/.test(plink.getAttribute("href") || "")) user = extractfromlink(plink);
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

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

  // the big nickname is plain text on a profile page (nowhere to navigate to from your own
  // page), and dragging it would fight with just wanting to select/copy it normally - only the
  // photo starts a drag here, same as the avatar is the drag handle everywhere else
  function inprofileheader(target) {
    return !!target.closest(PROFILEAVATARSEL);
  }

  // only the nickname (display name) and the avatar should start a drag - not the @handle text,
  // which sits in its own link right next to it inside the same User-Name block
  function isdraghandle(target) {
    if (target.closest(AVATARSEL)) return true;
    if (inprofileheader(target)) return true;
    const namebox = target.closest(NAMEBOXSEL);
    if (!namebox) return false;
    const link = target.closest('a[role="link"]');
    if (!link) return false;
    return !(link.textContent || "").trim().startsWith("@");
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
    // outerHTML, not cloned nodes - the badges have to survive being stored to disk and
    // re-rendered on the placed chip/member later, not just live for the length of one drag
    const badges = [...heading.querySelectorAll("img, svg")].map(b => b.outerHTML);
    // no specific tweet to attach and nothing to dim to a percent besides the header itself -
    // "or none if directly from profile" is intentional, not a gap. covers the sticky-header
    // duplicate of the name too, not just the big one, so nothing readable is left behind
    const dimtargets = [avatarlink, ...findprofilenametargets(heading, handle)].filter(Boolean);
    return {handle, displayname, avatarurl: avatarimg ? avatarimg.src : null, badges, sourceurl: null, dimtargets, caret: findprofilecaret(), followbutton: findprofilefollowbutton(), source: "live"};
  }

  // the blocked / muted settings lists are plain UserCells, not tweets - draggable so you can
  // sort them into folders by hand. skipaction: they're already blocked/muted and these rows have
  // no caret menu to re-run anything through, so dropping them just files them, never re-acts
  function extractusercell(cell) {
    let handle = null, avatarurl = null, displayname = null, namelink = null;
    const av = cell.querySelector('[data-testid^="UserAvatar-Container-"]');
    if (av) {
      const m = /UserAvatar-Container-(.+)$/.exec(av.getAttribute("data-testid") || "");
      if (m) handle = m[1];
      const img = av.querySelector("img");
      if (img) avatarurl = img.src;
    }
    for (const a of cell.querySelectorAll('a[role="link"][href^="/"]')) {
      const t = (a.textContent || "").trim();
      if (t && !t.startsWith("@")) {displayname = t; namelink = a; break}
    }
    if (!handle) return null;
    const badges = namelink ? [...namelink.querySelectorAll("img, svg")].map(b => b.outerHTML) : [];
    const dimtargets = [av, namelink].filter(Boolean);
    return {handle, displayname: displayname || handle, avatarurl, badges, sourceurl: null, dimtargets, skipaction: true, source: "live"};
  }

  function extractuser(article) {
    const namebox = article.querySelector(NAMEBOXSEL) || (article.matches(NAMEBOXSEL) ? article : null);
    let handle = null, displayname = null, badges = [], namelink = null, handlelink = null;
    if (namebox) {
      const links = namebox.querySelectorAll('a[role="link"][href^="/"]');
      for (const a of links) {
        const href = a.getAttribute("href") || "";
        if (/^\/[^/]+\/?$/.test(href) && !/^\/(i|home|search|notifications|messages)\/?$/.test(href)) {
          handle = href.replace(/^\//, "").replace(/\/$/, "");
          break;
        }
      }
      // the display-name link (always first) carries the nickname text plus any verified/
      // automated/etc badges as inline img/svg siblings of that text - clone them as-is so the
      // drag chip can show the exact same badges without guessing which ones apply
      namelink = links[0];
      handlelink = links[1];
      if (namelink) {
        displayname = namelink.textContent || null;
        badges = [...namelink.querySelectorAll("img, svg")].map(b => b.outerHTML);
      }
    }
    const avatarcontainer = article.querySelector('[data-testid="Tweet-User-Avatar"], [data-testid^="UserAvatar-Container-"]');
    const avatarimg = avatarcontainer && avatarcontainer.querySelector("img");
    const avatarurl = avatarimg ? avatarimg.src : null;
    if (!handle && avatarcontainer) {
      const m = /UserAvatar-Container-(.+)$/.exec(avatarcontainer.getAttribute("data-testid") || "");
      if (m) handle = m[1];
    }
    if (!handle) return null;
    // the tweet permalink, if this drag actually came from a tweet card - a profile header or
    // bio isn't wrapped in one, so there's nothing to attach in that case, which is intentional
    const statuslink = article.querySelector('a[href*="/status/"]');
    const sourceurl = statuslink ? new URL(statuslink.getAttribute("href"), location.origin).href : null;
    // as if the info had actually been lifted off the page - dimmed while held, restored on release
    const dimtargets = [avatarcontainer, namelink, handlelink, statuslink].filter(Boolean);
    return {handle, displayname: displayname || handle, avatarurl, badges, sourceurl, dimtargets, article, source: "live"};
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
      const article = e.target.closest(ARTICLESEL);
      if (article) user = extractuser(article);
      else {
        const cell = e.target.closest('[data-testid="UserCell"]');
        if (!cell) return;
        user = extractusercell(cell);
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

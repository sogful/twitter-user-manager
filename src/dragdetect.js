(function () {
  "use strict";

  window.tum = window.tum || {};

  const THRESHOLD = 6;
  const AVATARSEL = '[data-testid="Tweet-User-Avatar"], [data-testid^="UserAvatar-Container-"]';
  const ARTICLESEL = 'article[data-testid="tweet"], article[role="article"]';

  // only the nickname (display name) and the avatar should start a drag - not the @handle text,
  // which sits in its own link right next to it inside the same User-Name block
  function isdraghandle(target) {
    if (target.closest(AVATARSEL)) return true;
    const namebox = target.closest('[data-testid="User-Name"]');
    if (!namebox) return false;
    const link = target.closest('a[role="link"]');
    if (!link) return false;
    return !(link.textContent || "").trim().startsWith("@");
  }

  function extractuser(article) {
    const namebox = article.querySelector('[data-testid="User-Name"]');
    let handle = null, displayname = null, badges = [];
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
      const namelink = links[0];
      if (namelink) {
        displayname = namelink.textContent || null;
        badges = [...namelink.querySelectorAll("img, svg")].map(b => b.cloneNode(true));
      }
    }
    const avatarimg = article.querySelector('[data-testid="Tweet-User-Avatar"] img, [data-testid^="UserAvatar-Container-"] img');
    const avatarurl = avatarimg ? avatarimg.src : null;
    if (!handle) {
      const anyavatarlink = article.querySelector('[data-testid^="UserAvatar-Container-"]');
      if (anyavatarlink) {
        const m = /UserAvatar-Container-(.+)$/.exec(anyavatarlink.getAttribute("data-testid") || "");
        if (m) handle = m[1];
      }
    }
    if (!handle) return null;
    return {handle, displayname: displayname || handle, avatarurl, badges, article, source: "live"};
  }

  let tracking = null; // {startx, starty, user, dragging}

  function onpointerdown(e) {
    if (e.button !== undefined && e.button !== 0) return;
    if (!isdraghandle(e.target)) return;
    const article = e.target.closest(ARTICLESEL);
    if (!article) return;
    const user = extractuser(article);
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

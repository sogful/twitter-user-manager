(function () {
  "use strict";

  window.tum = window.tum || {};

  const THRESHOLD = 6;
  const HANDLESEL = '[data-testid="User-Name"], [data-testid="Tweet-User-Avatar"], [data-testid^="UserAvatar-Container-"]';
  const ARTICLESEL = 'article[data-testid="tweet"], article[role="article"]';

  function extractuser(article) {
    const namebox = article.querySelector('[data-testid="User-Name"]');
    let handle = null, displayname = null;
    if (namebox) {
      const links = namebox.querySelectorAll('a[role="link"][href^="/"]');
      for (const a of links) {
        const href = a.getAttribute("href") || "";
        if (/^\/[^/]+\/?$/.test(href) && !/^\/(i|home|search|notifications|messages)\/?$/.test(href)) {
          handle = href.replace(/^\//, "").replace(/\/$/, "");
          break;
        }
      }
      const namespan = namebox.querySelector('span');
      if (namespan) displayname = namespan.textContent || null;
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
    return {handle, displayname: displayname || handle, avatarurl, article, source: "live"};
  }

  let tracking = null; // {startx, starty, user, dragging}

  function onpointerdown(e) {
    if (e.button !== undefined && e.button !== 0) return;
    const handle = e.target.closest(HANDLESEL);
    if (!handle) return;
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

  window.tum.dragdetect = {
    init() {
      document.addEventListener("pointerdown", onpointerdown, true);
      document.addEventListener("pointermove", onpointermove, true);
      document.addEventListener("pointerup", onpointerup, true);
      document.addEventListener("pointercancel", onpointercancel, true);
    }
  };
})();

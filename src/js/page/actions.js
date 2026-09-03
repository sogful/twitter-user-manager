(function () {
  "use strict";

  window.tum = window.tum || {};

  const LOG = true;
  const log = (...a) => {if (LOG) try {console.log("%c[tum]", "color:#1d9bf0;font-weight:700", ...a)} catch {}};

  // verified live against x.com: follow/block items read "follow @handle" / "block @handle",
  // but mute reads just "mute" with no handle - matching on a trailing "@" would silently miss it.
  const MENUTEXT = {
    follow: /^follow(\s|$)/i,
    unfollow: /^unfollow(\s|$)/i,
    mute: /^mute(\s|$)/i,
    unmute: /^unmute(\s|$)/i,
    block: /^block(\s|$)/i,
    unblock: /^unblock(\s|$)/i
  };

  // the primary path: replay twitter's own v1.1 endpoints so an action works for ANY user, whether
  // or not their tweet/profile is still mounted on the page. these are same-origin (x.com), so the
  // content-script fetch isn't subject to the page's connect-src csp; they take `screen_name`
  // directly (no id lookup needed), the public web bearer, and the ct0 cookie as the csrf token
  const ENDPOINTS = {
    follow: "friendships/create.json", unfollow: "friendships/destroy.json",
    mute: "mutes/users/create.json", unmute: "mutes/users/destroy.json",
    block: "blocks/create.json", unblock: "blocks/destroy.json"
  };
  const BEARER = "Bearer AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA";

  // twitter's own toast wording for each action
  const SUCCESSMSG = {
    follow: h => "You followed @" + h, unfollow: h => "You unfollowed @" + h,
    mute: h => "@" + h + " has been muted.", unmute: h => "@" + h + " has been unmuted.",
    block: h => "@" + h + " has been blocked.", unblock: h => "@" + h + " has been unblocked."
  };

  // muting/blocking through the api doesn't update twitter's own react state, so their posts stay
  // on the page - emulate twitter and hide them ourselves (currently visible + any that load in,
  // via a persistent observer). the author is matched off the tweet header's own @handle links
  const hidden = new Set();
  let hideobs = null;
  function tweetauthor(art) {
    const nb = art.querySelector('[data-testid="User-Name"]');
    if (!nb) return null;
    for (const a of nb.querySelectorAll('a[role="link"][href^="/"]')) {
      const h = (a.getAttribute("href") || "").replace(/^\//, "").replace(/\/$/, "").toLowerCase();
      if (/^[a-z0-9_]+$/.test(h)) return h;
    }
    return null;
  }
  function applyhide() {
    if (!hidden.size) return;
    for (const art of document.querySelectorAll("article")) {
      if (art.dataset.tumhidden) continue;
      const author = tweetauthor(art);
      if (author && hidden.has(author)) {art.style.display = "none"; art.dataset.tumhidden = author}
    }
  }
  function hideposts(handle) {
    hidden.add(handle.toLowerCase());
    if (!hideobs) {hideobs = new MutationObserver(applyhide); hideobs.observe(document.body, {childList: true, subtree: true})}
    applyhide();
  }
  function showposts(handle) {
    const h = handle.toLowerCase();
    hidden.delete(h);
    for (const art of document.querySelectorAll('article[data-tumhidden="' + h + '"]')) {art.style.display = ""; delete art.dataset.tumhidden}
  }
  function notify(action, handle) {
    try {tum.overlay.toast(SUCCESSMSG[action] ? SUCCESSMSG[action](handle) : action + " @" + handle)} catch {}
    const hide = !tum.settings || tum.settings.get("hideposts");
    if (hide && (action === "mute" || action === "block")) hideposts(handle);
    else if (action === "unmute" || action === "unblock") showposts(handle);
  }

  async function apiaction(action, handle) {
    const path = ENDPOINTS[action];
    if (!path || !handle) return false;
    const ct0 = (document.cookie.match(/ct0=([^;]+)/) || [])[1] || "";
    if (!ct0) return false; // not logged in / no csrf token to sign the request
    try {
      const r = await fetch("/i/api/1.1/" + path, {
        method: "POST",
        credentials: "include",
        headers: {
          authorization: BEARER,
          "x-csrf-token": ct0,
          "x-twitter-auth-type": "OAuth2Session",
          "x-twitter-active-user": "yes",
          "x-twitter-client-language": "en",
          "content-type": "application/x-www-form-urlencoded"
        },
        body: "screen_name=" + encodeURIComponent(handle)
      });
      return r.ok;
    } catch {return false}
  }

  function waitfor(check, timeout) {
    return new Promise(res => {
      const v = check();
      if (v) {res(v); return}
      let done = false;
      const stop = () => {if (done) return; done = true; obs.disconnect(); clearInterval(iv); clearTimeout(to)};
      const obs = new MutationObserver(() => {const v2 = check(); if (v2) {stop(); res(v2)}});
      obs.observe(document.body, {childList: true, subtree: true});
      const iv = setInterval(() => {const v2 = check(); if (v2) {stop(); res(v2)}}, 60);
      const to = setTimeout(() => {stop(); res(null)}, timeout || 3000);
    });
  }

  function findmenuitem(re) {
    const items = document.querySelectorAll('[role="menuitem"]');
    for (const it of items) if (re.test((it.textContent || "").trim())) return it;
    return null;
  }

  async function openmenu(caret) {
    if (!caret) {log("no caret/more button found, cannot open user menu"); return false}
    caret.click();
    const menu = await waitfor(() => document.querySelector('[role="menu"]'), 2000);
    return !!menu;
  }

  async function clickmenuitem(kind) {
    const re = MENUTEXT[kind];
    const item = await waitfor(() => findmenuitem(re), 1500);
    if (!item) {log("menu item for", kind, "not found - twitter probably changed the menu"); return false}
    item.click();
    return true;
  }

  async function confirmdialog() {
    // block asks for confirmation, mute/follow usually don't
    const btn = await waitfor(() => document.querySelector('[data-testid="confirmationSheetConfirm"]'), 1200);
    if (btn) btn.click();
  }

  async function runreal(action, user) {
    // a profile page has its own dedicated Follow button rather than a "follow @x" item in
    // the More menu - use it directly when this drag came from there
    if (action === "follow" && user.followbutton) {
      if (!document.contains(user.followbutton)) {
        log("source follow button is gone from the DOM, can't", action, user.handle);
        return false;
      }
      user.followbutton.click();
      return true;
    }
    // a profile-header drag carries its own caret (the page's single overflow button) instead
    // of an article - using the wrong one here would run the action on whoever's tweet happens
    // to be first on the page, not the person actually being dropped
    let caret = user.caret;
    if (!caret) {
      if (!user.article || !document.contains(user.article)) {
        log("source tweet is gone from the DOM, can't", action, user.handle);
        return false;
      }
      caret = user.article.querySelector('[data-testid="caret"]');
    } else if (!document.contains(caret)) {
      log("source caret is gone from the DOM, can't", action, user.handle);
      return false;
    }
    const opened = await openmenu(caret);
    if (!opened) return false;
    const ok = await clickmenuitem(action);
    if (ok && action === "block") await confirmdialog();
    document.body.click(); // closes any leftover menu
    return ok;
  }

  window.tum.actions = {
    async run(action, user) {
      if (!action) {log("no action set on this folder, just filing", user.handle); return true}
      log("running", action, "on", user.handle);
      try {
        // api first (works from anywhere); if it fails, fall back to the on-page caret/follow menu
        let ok = await apiaction(action, user.handle);
        if (!ok) ok = await runreal(action, user);
        if (ok) notify(action, user.handle); // twitter-style toast + hide their posts on mute/block
        log(ok ? "done: " + action + " " + user.handle : "failed: " + action + " " + user.handle);
        // the caret/follow button this needs only exists while the tweet or profile it came
        // from is still actually mounted on the page - if it scrolled out and got virtualized
        // away (or the menu item just wasn't where expected), this fails silently otherwise,
        // which reads as the drop just not having worked at all
        if (!ok) tum.overlay.toast("couldn't " + action + " @" + user.handle + " - scroll back to them and try again");
        return ok;
      } catch (e) {
        log("action error:", e && e.message);
        tum.overlay.toast("couldn't " + action + " @" + user.handle);
        return false;
      }
    }
  };
})();

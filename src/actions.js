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
        const ok = await runreal(action, user);
        log(ok ? "done: " + action + " " + user.handle : "failed: " + action + " " + user.handle);
        return ok;
      } catch (e) {
        log("action error:", e && e.message);
        return false;
      }
    }
  };
})();

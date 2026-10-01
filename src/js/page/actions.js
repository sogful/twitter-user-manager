(function () {
  "use strict";

  window.tum = window.tum || {};

  const T = (...a) => tum.strings.t(...a);
  const LOG = false;
  const log = (...a) => {if (LOG) try {console.log("%c[tum]", "color:#1d9bf0;font-weight:700", ...a)} catch {}};

  const MENUTEXT = {
    follow: /^follow(\s|$)/i,
    unfollow: /^unfollow(\s|$)/i,
    mute: /^mute(\s|$)/i,
    unmute: /^unmute(\s|$)/i,
    block: /^block(\s|$)/i,
    unblock: /^unblock(\s|$)/i
  };

  const ENDPOINTS = {
    follow: "friendships/create.json", unfollow: "friendships/destroy.json",
    mute: "mutes/users/create.json", unmute: "mutes/users/destroy.json",
    block: "blocks/create.json", unblock: "blocks/destroy.json"
  };
  const BEARER = "Bearer AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA";
  const INVERSE = {follow: "unfollow", mute: "unmute", block: "unblock"};

  const successmsg = (action, h) => T("action.success." + action, h);
  const actionlabel = action => T("action.label." + action);

  /*//////////////////////////////////////////////////////////////////////*/

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
  function applypostvisibility(action, handle) {
    const hide = !tum.settings || tum.settings.get("hideposts");
    if (hide && (action === "mute" || action === "block")) hideposts(handle);
    else if (action === "unmute" || action === "unblock") showposts(handle);
  }

  async function undoaction(action, handle) {
    const inverse = INVERSE[action];
    if (!inverse) return;
    if (await apiaction(inverse, handle)) {
      applypostvisibility(inverse, handle);
      tum.overlay.toast(successmsg(inverse, handle));
    } else {
      tum.overlay.toast(T("action.undo.failed", T("action.verb." + action), handle));
    }
  }

  function notify(action, handle) {
    const inverse = INVERSE[action];
    try {
      tum.overlay.toast(successmsg(action, handle), inverse ? {
        label: T("action.undo"),
        onclick: () => undoaction(action, handle)
      } : null);
    } catch {}
    applypostvisibility(action, handle);
  }

  function confirmindividual(action, handle) {
    if (!INVERSE[action] || !tum.settings || !tum.settings.get("confirmactions")) return Promise.resolve(true);
    return new Promise(resolve => {
      let settled = false;
      const finish = answer => {
        if (settled) return;
        settled = true;
        resolve(answer);
      };
      const label = actionlabel(action);
      try {
        tum.overlay.confirm({
          title: T("action.confirm.single.title", label, handle),
          body: T("action.confirm.single.body", T("action.verb." + action), handle),
          oklabel: label,
          onok: () => finish(true),
          oncancel: () => finish(false)
        });
      } catch {finish(true)}
    });
  }

  async function apiraw(action, handle) {
    const path = ENDPOINTS[action];
    if (!path || !handle) return 0;
    const ct0 = (document.cookie.match(/ct0=([^;]+)/) || [])[1] || "";
    if (!ct0) return 0;
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
      return r.status;
    } catch {return 0}
  }
  async function apiaction(action, handle) {
    const s = await apiraw(action, handle);
    return s >= 200 && s < 300;
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
    if (!caret) {log(T("log.action.noCaret")); return false}
    caret.click();
    const menu = await waitfor(() => document.querySelector('[role="menu"]'), 2000);
    return !!menu;
  }

  async function clickmenuitem(kind) {
    const re = MENUTEXT[kind];
    const item = await waitfor(() => findmenuitem(re), 1500);
    if (!item) {log(T("log.action.menuMissing", actionlabel(kind))); return false}
    item.click();
    return true;
  }

  async function confirmdialog() {
    const btn = await waitfor(() => document.querySelector('[data-testid="confirmationSheetConfirm"]'), 1200);
    if (btn) btn.click();
  }

  async function runreal(action, user) {
    if (action === "follow" && user.followbutton) {
      if (!document.contains(user.followbutton)) {
        log(T("log.action.followButtonGone"));
        return false;
      }
      user.followbutton.click();
      return true;
    }
    let caret = user.caret;
    if (!caret) {
      if (!user.article || !document.contains(user.article)) {
        log(T("log.action.tweetGone"));
        return false;
      }
      caret = user.article.querySelector('[data-testid="caret"]');
    } else if (!document.contains(caret)) {
      log(T("log.action.caretGone"));
      return false;
    }
    const opened = await openmenu(caret);
    if (!opened) return false;
    const ok = await clickmenuitem(action);
    if (ok && action === "block") await confirmdialog();
    document.body.click();
    return ok;
  }

  /*//////////////////////////////////////////////////////////////////////*/

  const DELAYS = {block: 500, mute: 500, follow: 2500}; // ms between requests
  const JITTER = 0.35;
  const BACKOFF = 60000;
  const VERBING = {block: "action.batch.blocking", mute: "action.batch.muting", follow: "action.batch.following"};
  const jitter = ms => Math.round(ms * (1 + (Math.random() * 2 - 1) * JITTER));
  const sleep = ms => new Promise(r => setTimeout(r, ms));

  const bstore = tum.storage.create("tum.batchqueue");
  let bqueue = []; // {action, handle, done, failed}
  let brunning = false, bcancel = false, bnote = "";
  const blisteners = new Set();

  function batchstate() {
    const total = bqueue.length;
    const done = bqueue.filter(i => i.done).length;
    const failed = bqueue.filter(i => i.failed).length;
    const cur = bqueue.find(i => !i.done && !i.failed);
    return {total, done, failed, pending: total - done - failed, active: brunning, action: cur && cur.action, note: bnote};
  }
  function bemit() {
    const st = batchstate();
    for (const cb of blisteners) try {cb(st)} catch {}
    renderbar(st);
  }
  function bpersist() {try {bstore.set(bqueue)} catch {}}

  async function brun() {
    if (brunning) return;
    brunning = true; bcancel = false;
    bemit();
    while (!bcancel) {
      const next = bqueue.find(i => !i.done && !i.failed);
      if (!next) break;
      const status = await apiraw(next.action, next.handle);
      if (bcancel) break;
      if (status === 429 || status === 420) {
        bnote = "ratelimit"; bemit();
        await sleep(BACKOFF);
        bnote = "";
        continue;
      }
      if (status >= 200 && status < 300) next.done = true;
      else next.failed = true;
      bpersist(); bemit();
      await sleep(jitter(DELAYS[next.action] || 800));
    }
    brunning = false;
    if (!bcancel) {
      const done = bqueue.filter(i => i.done).length, failed = bqueue.filter(i => i.failed).length;
      if (done || failed) try {tum.overlay.toast(failed ? T("toast.batch.done.skipped", done, failed) : T("toast.batch.done", done))} catch {}
    }
    bqueue = bqueue.filter(i => !i.done && !i.failed);
    bpersist(); bemit();
  }

  const TARGETCONN = {follow: "following", mute: "muting", block: "blocking"};
  async function connections(handles) {
    const out = new Map();
    const ct0 = (document.cookie.match(/ct0=([^;]+)/) || [])[1] || "";
    if (!ct0 || !handles.length) return out;
    for (let i = 0; i < handles.length; i += 100) {
      const chunk = handles.slice(i, i + 100);
      try {
        const r = await fetch("/i/api/1.1/friendships/lookup.json?screen_name=" + encodeURIComponent(chunk.join(",")), {
          credentials: "include",
          headers: {authorization: BEARER, "x-csrf-token": ct0, "x-twitter-auth-type": "OAuth2Session", "x-twitter-active-user": "yes"}
        });
        if (!r.ok) continue;
        const d = await r.json();
        for (const u of (Array.isArray(d) ? d : [])) out.set((u.screen_name || "").toLowerCase(), new Set(u.connections || []));
      } catch {}
    }
    return out;
  }
  async function alreadydone(action, handle) {
    const target = TARGETCONN[action];
    if (!target) return false;
    const c = (await connections([handle])).get((handle || "").toLowerCase());
    return !!(c && c.has(target));
  }

  async function enqueue(action, handles) {
    if (!action || !ENDPOINTS[action] || !Array.isArray(handles)) return;
    let list = handles.filter(Boolean);
    const target = TARGETCONN[action];
    if (target) {
      const conns = await connections(list);
      list = list.filter(h => {const c = conns.get(h.toLowerCase()); return !(c && c.has(target))});
    }
    const have = new Set(bqueue.map(i => i.action + "|" + i.handle.toLowerCase()));
    for (const h of list) {
      const key = action + "|" + h.toLowerCase();
      if (have.has(key)) continue;
      have.add(key);
      bqueue.push({action, handle: h});
    }
    bpersist();
    brun();
  }
  function cancelbatch() {
    bcancel = true;
    bqueue = [];
    bnote = "";
    bpersist();
    bemit();
  }

  /*//////////////////////////////////////////////////////////////////////*/

  let bar = null;
  function ensurebar() {
    if (bar && document.documentElement.contains(bar)) return bar;
    bar = document.createElement("div");
    bar.className = "tumbatchbar";
    bar.innerHTML = '<div class="tumbatchfill"></div>' +
      '<div class="tumbatchrow"><span class="tumbatchlabel"></span><button class="tumbatchcancel"></button></div>';
    bar.querySelector(".tumbatchcancel").textContent = T("import.stop");
    bar.querySelector(".tumbatchcancel").addEventListener("click", cancelbatch);
    try {tum.theme.paint(bar)} catch {}
    document.documentElement.appendChild(bar);
    return bar;
  }
  function renderbar(st) {
    if (!st.total || (!st.active && !st.pending)) {
      if (bar) {bar.remove(); bar = null}
      return;
    }
    const b = ensurebar();
    const processed = st.done + st.failed;
    b.querySelector(".tumbatchfill").style.width = (st.total ? Math.round(processed / st.total * 100) : 0) + "%";
    let label;
    if (st.note === "ratelimit") label = T("action.batch.ratelimited");
    else label = T(VERBING[st.action] || "action.batch.working") + " " + Math.min(processed + 1, st.total) + " / " + st.total + (st.failed ? T("action.batch.skipped", st.failed) : "");
    b.querySelector(".tumbatchlabel").textContent = label;
  }

  bstore.get().then(v => {
    bqueue = (Array.isArray(v) ? v : []).filter(i => i && i.action && i.handle && !i.done && !i.failed);
    if (bqueue.length) {bemit(); brun()}
  });

  window.tum.actions = {
    enqueue, cancelbatch, batchstate,
    onbatch(cb) {blisteners.add(cb); return () => blisteners.delete(cb)},
    async run(action, user, options) {
      if (!action) {log(T("log.action.noAction")); return true}
      if (await alreadydone(action, user.handle)) {log(T("log.action.alreadyDone")); return true}
      if (!(options && options.confirmed) && !await confirmindividual(action, user.handle)) {log(T("log.action.cancelled")); return false}
      log(T("log.action.running", T("action.verb." + action), user.handle));
      try {
        let ok = await apiaction(action, user.handle);
        if (!ok) ok = await runreal(action, user);
        if (ok) notify(action, user.handle);
        log(T(ok ? "log.action.done" : "log.action.failed", T("action.verb." + action), user.handle));
        if (!ok) tum.overlay.toast(T("toast.action.failed.retry", T("action.verb." + action), user.handle));
        return ok;
      } catch (e) {
        log(T("log.action.error", e && e.message));
        tum.overlay.toast(T("toast.action.failed", T("action.verb." + action), user.handle));
        return false;
      }
    }
  };
})();

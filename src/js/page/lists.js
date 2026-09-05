(function () {
  "use strict";

  window.tum = window.tum || {};

  const sleep = ms => new Promise(r => setTimeout(r, ms));

  const QID = "8rYmkvWQe9jRRZdy_-vkGA";
  const BEARER = "Bearer AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA";
  // the feature flags x.com sends with ListMembers; a stale/missing one can 400, refresh if lists stop importing
  const FEATURES = '{"rweb_video_screen_enabled":false,"rweb_cashtags_enabled":true,"profile_label_improvements_pcf_label_in_post_enabled":true,"responsive_web_profile_redirect_enabled":true,"rweb_tipjar_consumption_enabled":false,"verified_phone_label_enabled":false,"creator_subscriptions_tweet_preview_api_enabled":true,"responsive_web_graphql_timeline_navigation_enabled":true,"premium_content_api_read_enabled":false,"communities_web_enable_tweet_community_results_fetch":true,"c9s_tweet_anatomy_moderator_badge_enabled":true,"responsive_web_grok_analyze_button_fetch_trends_enabled":false,"responsive_web_grok_analyze_post_followups_enabled":true,"rweb_cashtags_composer_attachment_enabled":true,"responsive_web_jetfuel_frame":true,"responsive_web_grok_share_attachment_enabled":true,"responsive_web_grok_annotations_enabled":true,"articles_preview_enabled":true,"responsive_web_edit_tweet_api_enabled":true,"rweb_conversational_replies_downvote_enabled":false,"graphql_is_translatable_rweb_tweet_is_translatable_enabled":true,"view_counts_everywhere_api_enabled":true,"longform_notetweets_consumption_enabled":true,"responsive_web_twitter_article_tweet_consumption_enabled":true,"content_disclosure_indicator_enabled":true,"content_disclosure_ai_generated_indicator_enabled":true,"responsive_web_grok_show_grok_translated_post":true,"responsive_web_grok_analysis_button_from_backend":true,"post_ctas_fetch_enabled":false,"freedom_of_speech_not_reach_fetch_enabled":true,"standardized_nudges_misinfo":true,"tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled":true,"longform_notetweets_rich_text_read_enabled":true,"longform_notetweets_inline_media_enabled":false,"responsive_web_grok_image_annotation_enabled":true,"responsive_web_grok_imagine_annotation_enabled":true,"responsive_web_grok_community_note_auto_translation_is_enabled":true,"responsive_web_enhance_cards_enabled":false}';

  let importing = false, cancel = false;
  let bar = null;

  function listname() {
    const col = document.querySelector('[data-testid="primaryColumn"]');
    const h2 = col && col.querySelector('h2[role="heading"]');
    const t = h2 && (h2.textContent || "").trim();
    if (t) return t;
    const dt = (document.title || "").replace(/ \/ (X|Twitter)\s*$/, "").replace(/ on (X|Twitter).*$/, "").trim();
    return dt || "Imported list";
  }
  // "123 Members" / "2.2K Members" link under the header -> approx total for the progress denominator
  function parseabbrev(text) {
    // no gap between the number and its K/M, else the "M" in "Members" gets read as millions
    const m = /([\d,.]+)([KM])?/.exec(text || "");
    if (!m) return 0;
    let n = parseFloat(m[1].replace(/,/g, ""));
    if (!isFinite(n)) return 0;
    const s = (m[2] || "").toUpperCase();
    if (s === "K") n *= 1000; else if (s === "M") n *= 1000000;
    return Math.round(n);
  }
  function membercount() {
    const col = document.querySelector('[data-testid="primaryColumn"]');
    if (!col) return 0;
    for (const a of col.querySelectorAll('a[href$="/members"], a[href$="/members/"]')) {
      const n = parseabbrev(a.textContent || "");
      if (n) return n;
    }
    return 0;
  }
  // the list's own description: a non-link dir=ltr div inside the list detail card (the block that
  // also holds the "N Members" link), so we skip the sticky bar's "See new posts" etc.
  function listdescription() {
    const col = document.querySelector('[data-testid="primaryColumn"]');
    if (!col) return "";
    const memlink = col.querySelector('a[href$="/members"], a[href$="/members/"]');
    if (!memlink) return "";
    let card = memlink;
    for (let i = 0; i < 6 && card.parentElement; i++) {
      card = card.parentElement;
      if (card.querySelector("h1, h2, [role=\"heading\"]") && (card.textContent || "").length < 800) break;
    }
    const name = listname();
    for (const d of card.querySelectorAll('div[dir="ltr"]')) {
      if (d.closest('a, button, [role="button"], [role="heading"]')) continue;
      const t = (d.textContent || "").trim();
      if (!t || t === name || t.startsWith("@") || t.length > 200) continue;
      if (/^[\d,.]+[KM]?\s+(Members|Followers)$/i.test(t)) continue;
      return t;
    }
    return "";
  }

  /*//////////////////////////////////////////////////////////////////////*/

  function ensurebar() {
    if (bar && document.documentElement.contains(bar)) return bar;
    bar = document.createElement("div");
    bar.className = "tumbatchbar";
    bar.innerHTML = '<div class="tumbatchfill"></div>' +
      '<div class="tumbatchrow"><span class="tumbatchlabel"></span><button class="tumbatchcancel">Stop</button></div>';
    bar.querySelector(".tumbatchcancel").addEventListener("click", () => {cancel = true});
    try {tum.theme.paint(bar)} catch {}
    document.documentElement.appendChild(bar);
    return bar;
  }
  function renderbar(count, expected, note) {
    const b = ensurebar();
    const pct = expected ? Math.min(100, Math.round(count / expected * 100)) : 0;
    b.querySelector(".tumbatchfill").style.width = pct + "%";
    b.querySelector(".tumbatchlabel").textContent = note || ("Importing list " + count + (expected ? " / " + expected : "") + " users");
  }
  function removebar() {if (bar) {bar.remove(); bar = null}}

  /*//////////////////////////////////////////////////////////////////////*/

  // ListMembers is served through x.com's shared-worker network layer, out of reach of our
  // fetch hooks, and the /members route only fills its modal on a full navigation - so we just
  // call the graphql endpoint ourselves and page through it with the bottom cursor
  function parsepage(j) {
    const users = [];
    let cursor = null;
    (function walk(o) {
      if (!o || typeof o !== "object") return;
      if (o.__typename === "User" && o.core && o.core.screen_name) {
        users.push({
          handle: o.core.screen_name,
          displayname: o.core.name || o.core.screen_name,
          avatarurl: (o.avatar && o.avatar.image_url) || (o.legacy && o.legacy.profile_image_url_https) || null
        });
      }
      if (o.cursorType === "Bottom" && o.value) cursor = o.value;
      for (const k in o) {const v = o[k]; if (v && typeof v === "object") walk(v)}
    })(j);
    return {users, cursor};
  }
  async function attempt(qid, features, listId, cursor) {
    const ct0 = (document.cookie.match(/ct0=([^;]+)/) || [])[1] || "";
    const vars = {listId, count: 100};
    if (cursor) vars.cursor = cursor;
    const url = "/i/api/graphql/" + qid + "/ListMembers?variables=" + encodeURIComponent(JSON.stringify(vars)) + "&features=" + encodeURIComponent(features);
    let r;
    try {
      r = await fetch(url, {credentials: "include", headers: {
        authorization: BEARER, "x-csrf-token": ct0, "x-twitter-auth-type": "OAuth2Session",
        "x-twitter-active-user": "yes", "x-twitter-client-language": "en"
      }});
    } catch (e) {return {ok: false, status: 0, users: {users: [], cursor: null}}}
    let j = null;
    try {j = await r.json()} catch {}
    const parsed = j ? parsepage(j) : {users: [], cursor: null};
    // a rotated qid 404s, rotated/removed feature flags 400; a 200 with only errors and no users also counts as broken
    const ok = r.ok && j && !(j.errors && j.errors.length && parsed.users.length === 0);
    return {ok, status: r.status, users: parsed};
  }

  async function fetchpage(listId, cursor) {
    const a = await attempt(QID, FEATURES, listId, cursor);
    return {ok: a.ok, users: a.users.users, cursor: a.users.cursor, status: a.status};
  }

  /*//////////////////////////////////////////////////////////////////////*/

  // rotation-proof fallback: when the graphql endpoint stops working (x.com rotated the queryId or a
  // feature flag), fall back to scraping the "List members" modal. That modal only fills on a real
  // navigation, so we persist the pending import, full-navigate to it, and resume after the reload.
  const pendingstore = tum.storage.create("tum.listpendingimport");

  function memberscope() {return document.querySelector('[aria-modal="true"][role="dialog"]') || document.querySelector('[role="dialog"]')}
  function scrollcontainer(scope) {
    const cell = scope && scope.querySelector('[data-testid="UserCell"]');
    let e = cell;
    while (e && e !== scope) {const st = getComputedStyle(e); if (/(auto|scroll)/.test(st.overflowY)) return e; e = e.parentElement}
    return null;
  }
  function handlefromlink(href) {
    const h = (href || "").replace(/^\//, "").replace(/\/$/, "");
    return /^[A-Za-z0-9_]+$/.test(h) && !/^(i|home|explore|search|notifications|messages|settings|compose)$/i.test(h) ? h : null;
  }
  function extractcell(cell) {
    let handle = null;
    for (const a of cell.querySelectorAll('a[href^="/"]')) {const h = handlefromlink(a.getAttribute("href")); if (h) {handle = h; break}}
    if (!handle) {
      const at = [...cell.querySelectorAll("span")].map(s => (s.textContent || "").trim()).find(t => /^@[A-Za-z0-9_]+$/.test(t));
      if (at) handle = at.slice(1);
    }
    if (!handle) return null;
    const img = cell.querySelector("img");
    const texts = [...cell.querySelectorAll("span")].map(s => (s.textContent || "").trim()).filter(Boolean);
    const nm = texts.find(t => t && !t.startsWith("@"));
    return {handle, displayname: nm || handle, avatarurl: img ? img.src : null, sourceurl: "https://x.com/" + handle, reason: "", badges: []};
  }
  function harvestcells(seen, built) {
    const scope = memberscope() || document.querySelector('[data-testid="primaryColumn"]');
    if (!scope) return;
    for (const cell of scope.querySelectorAll('[data-testid="UserCell"]')) {
      const u = extractcell(cell);
      if (!u) continue;
      const h = u.handle.toLowerCase();
      if (seen.has(h)) continue;
      seen.add(h);
      built.push(u);
    }
  }

  function startscrapefallback(listid, folderid, name, expected) {
    try {pendingstore.set({listid, folderid, name, expected, ts: Date.now()})} catch {}
    removebar();
    try {tum.overlay.toast("Import endpoint changed - falling back to the members page...")} catch {}
    location.href = "/i/lists/" + listid + "/members";
  }

  async function resumescrape() {
    let p;
    try {p = await pendingstore.get()} catch {p = null}
    if (!p || !p.listid) return;
    // stale/abandoned pending (nav never happened) - drop it
    if (location.pathname.indexOf("/i/lists/" + p.listid) !== 0) {
      if (Date.now() - (p.ts || 0) > 90000) {try {pendingstore.set(null)} catch {}}
      return;
    }
    if (importing) return;
    importing = true; cancel = false; setbtn();
    ensurebar(); renderbar(0, p.expected);

    const seen = new Set(), built = [];
    for (let w = 0; w < 40 && !cancel; w++) {
      const s = memberscope();
      if (s && s.querySelector('[data-testid="UserCell"]')) break;
      await sleep(400);
    }
    let last = 0, stagnant = 0, saved = 0;
    while (!cancel) {
      harvestcells(seen, built);
      const scope = memberscope();
      const sc = scope && scrollcontainer(scope);
      if (sc) sc.scrollTop = sc.scrollHeight;
      else if (scope) {const cells = scope.querySelectorAll('[data-testid="UserCell"]'); if (cells.length) cells[cells.length - 1].scrollIntoView()}
      await sleep(650);
      harvestcells(seen, built);
      renderbar(built.length, p.expected);
      if (built.length - saved >= 300) {tum.folders.update(p.folderid, {members: built.slice()}, true); saved = built.length}
      if (built.length === last) stagnant++; else stagnant = 0;
      last = built.length;
      if (p.expected && built.length >= p.expected) break;
      if (stagnant >= 6 && built.length > 0) break;
      if (stagnant >= 12) break;
    }
    tum.folders.update(p.folderid, {members: built});
    try {pendingstore.set(null)} catch {}
    removebar();
    importing = false;
    try {tum.overlay.toast((cancel ? "Stopped - imported " : "Imported ") + built.length + " into \"" + p.name + "\"")} catch {}
    setbtn();
    setTimeout(() => {try {tum.overlay.open()} catch {}}, 500);
  }

  function finishimport(folder, built, name) {
    tum.folders.update(folder.id, {members: built});
    removebar();
    importing = false;
    try {tum.overlay.toast((cancel ? "Stopped - imported " : "Imported ") + built.length + " into \"" + name + "\"")} catch {}
    setTimeout(() => {try {tum.overlay.open()} catch {}}, 400);
    ensureicons();
  }

  // list members: fast graphql path, reload+scrape fallback on rotation
  async function graphqlimport(folder, id, name, expected) {
    if (importing) return;
    importing = true; cancel = false; ensureicons();
    const seen = new Set(), built = [];
    let cursor = null, saved = 0;
    ensurebar(); renderbar(0, expected);
    while (!cancel) {
      let page;
      try {page = await fetchpage(id, cursor)} catch (e) {break}
      if (page.status === 429 || page.status === 420) {
        renderbar(built.length, expected, "Rate limited, waiting a minute...");
        await sleep(60000);
        continue;
      }
      if (!page.ok && built.length === 0) {importing = false; startscrapefallback(id, folder.id, name, expected); return}
      let added = 0;
      for (const u of page.users) {
        const h = (u.handle || "").toLowerCase();
        if (!h || seen.has(h)) continue;
        seen.add(h);
        built.push({handle: u.handle, displayname: u.displayname, avatarurl: u.avatarurl, sourceurl: "https://x.com/" + u.handle, reason: "", badges: []});
        added++;
      }
      renderbar(built.length, expected);
      if (built.length - saved >= 300) {tum.folders.update(folder.id, {members: built.slice()}, true); saved = built.length}
      if (!page.cursor || added === 0 || page.cursor === cursor) break;
      cursor = page.cursor;
      await sleep(400);
    }
    finishimport(folder, built, name);
  }

  // everything else: scrape the user list already on the page (auto-scroll in place). mode "usercells"
  // (followers/community/reposters) reads UserCell rows; "articles" reads tweet authors (quotes/replies)
  function harvestarticles(seen, built) {
    const col = document.querySelector('[data-testid="primaryColumn"]');
    if (!col) return;
    for (const art of col.querySelectorAll("article")) {
      const av = art.querySelector('[data-testid^="UserAvatar-Container-"]');
      if (!av) continue;
      const m = /UserAvatar-Container-(.+)$/.exec(av.getAttribute("data-testid") || "");
      if (!m || m[1] === "unknown") continue;
      const handle = m[1], h = handle.toLowerCase();
      if (seen.has(h)) continue;
      seen.add(h);
      const img = av.querySelector("img");
      const nb = art.querySelector('[data-testid="User-Name"]');
      let nm = handle;
      if (nb) {const t = [...nb.querySelectorAll("span")].map(s => (s.textContent || "").trim()).find(x => x && !x.startsWith("@")); if (t) nm = t}
      built.push({handle, displayname: nm, avatarurl: img ? img.src : null, sourceurl: "https://x.com/" + handle, reason: "", badges: []});
    }
  }
  async function scrapeimport(folder, expected, name, mode) {
    if (importing) return;
    importing = true; cancel = false; ensureicons();
    const seen = new Set(), built = [];
    const harvest = mode === "articles" ? harvestarticles : harvestcells;
    ensurebar(); renderbar(0, expected);
    let last = 0, stagnant = 0, saved = 0;
    for (let w = 0; w < 30 && !cancel; w++) {
      const s = memberscope() || document.querySelector('[data-testid="primaryColumn"]');
      if (s && (s.querySelector('[data-testid="UserCell"]') || s.querySelector("article"))) break;
      await sleep(400);
    }
    while (!cancel) {
      harvest(seen, built);
      const scope = memberscope();
      if (scope) {const sc = scrollcontainer(scope); if (sc) sc.scrollTop = sc.scrollHeight; else {const cs = scope.querySelectorAll('[data-testid="UserCell"]'); if (cs.length) cs[cs.length - 1].scrollIntoView()}}
      else window.scrollTo(0, document.documentElement.scrollHeight);
      await sleep(650);
      harvest(seen, built);
      renderbar(built.length, expected);
      if (built.length - saved >= 300) {tum.folders.update(folder.id, {members: built.slice()}, true); saved = built.length}
      if (built.length === last) stagnant++; else stagnant = 0;
      last = built.length;
      if (expected && built.length >= expected) break;
      if (stagnant >= 6 && built.length > 0) break;
      if (stagnant >= 12) break;
    }
    finishimport(folder, built, name);
  }

  /*//////////////////////////////////////////////////////////////////////*/

  const RESERVED = /^(i|home|explore|search|notifications|messages|settings|compose|hashtag)$/i;
  const FOLLOWLABEL = {followers: "followers", following: "following", verified_followers: "verified followers"};

  function headername() {
    const col = document.querySelector('[data-testid="primaryColumn"]');
    const h2 = col && col.querySelector('h2[role="heading"]');
    return h2 ? (h2.textContent || "").trim() : "";
  }
  function tweettext() {
    const col = document.querySelector('[data-testid="primaryColumn"]');
    const t = col && col.querySelector('[data-testid="tweetText"]');
    return t ? (t.textContent || "").trim().slice(0, 120) : "";
  }
  function cap(s) {return s ? s.charAt(0).toUpperCase() + s.slice(1) : s}

  // where to hang the icon: the primary-column header actions row, or an open dialog's title bar
  function headerrow() {
    const col = document.querySelector('[data-testid="primaryColumn"]');
    const back = col && col.querySelector('[data-testid="app-bar-back"]');
    const row = back && back.parentElement && back.parentElement.parentElement;
    return (row && row.children.length >= 2) ? {parent: row, before: row.lastElementChild} : null;
  }
  function dialogrow() {
    const dlg = document.querySelector('[aria-modal="true"][role="dialog"]') || document.querySelector('[role="dialog"]');
    if (!dlg) return null;
    const close = dlg.querySelector('[data-testid="app-bar-close"], [aria-label="Close"]');
    const row = close && close.parentElement;
    return row ? {parent: row, before: null} : null;
  }
  // the replies filter row on a tweet ("Relevant" / "Most recent") - a grey small icon at its right
  function replyfilterrow() {
    const col = document.querySelector('[data-testid="primaryColumn"]');
    if (!col) return null;
    let filter = null;
    for (const b of col.querySelectorAll('button[aria-haspopup="menu"], [role="button"]')) {
      const t = (b.textContent || "").trim();
      if (/^(Relevant|Most recent|Liked|Recency|Likes)$/i.test(t)) {filter = b; break}
    }
    if (!filter) return null;
    // walk up to the row that spans the column (holds "Relevant" on the left, "View quotes" on the right)
    const colw = col.getBoundingClientRect().width || 600;
    let row = filter.parentElement;
    for (let i = 0; i < 5 && row && row !== col; i++) {
      if (row.getBoundingClientRect().width >= colw * 0.7) break;
      row = row.parentElement;
    }
    return row ? {parent: row, before: null} : null;
  }

  const SURFACES = [
    {
      key: "list",
      match: () => {const m = /^\/i\/lists\/(\d+)$/.exec(location.pathname); return m ? {id: m[1]} : null},
      anchor: headerrow,
      meta: () => ({name: listname(), description: listdescription()}),
      start: (folder, ctx) => graphqlimport(folder, ctx.id, listname(), membercount())
    },
    {
      key: "follows",
      match: () => {const m = /^\/([A-Za-z0-9_]+)\/(followers|following|verified_followers)$/.exec(location.pathname); return (m && !RESERVED.test(m[1])) ? {user: m[1], kind: m[2]} : null},
      anchor: headerrow,
      meta: ctx => ({name: (headername() || "@" + ctx.user) + "'s " + cap(FOLLOWLABEL[ctx.kind]), description: "@" + ctx.user + "'s " + FOLLOWLABEL[ctx.kind]}),
      start: (folder, ctx, meta) => scrapeimport(folder, 0, meta.name, "usercells")
    },
    {
      key: "community",
      match: () => {const m = /^\/i\/communities\/(\d+)\/(members|moderators)$/.exec(location.pathname); return m ? {id: m[1], kind: m[2]} : null},
      anchor: headerrow,
      meta: ctx => ({name: (headername() || "Community") + " " + ctx.kind, description: "community " + ctx.kind}),
      start: (folder, ctx, meta) => scrapeimport(folder, 0, meta.name, "usercells")
    },
    {
      key: "reposts",
      match: () => {const m = /^\/([A-Za-z0-9_]+)\/status\/(\d+)\/(retweets|reposts)$/.exec(location.pathname); return m ? {user: m[1], id: m[2]} : null},
      anchor: () => dialogrow() || headerrow(),
      meta: ctx => ({name: "@" + ctx.user + " reposters", description: tweettext() || ("reposters of @" + ctx.user + "'s post")}),
      start: (folder, ctx, meta) => scrapeimport(folder, 0, meta.name, "usercells")
    },
    {
      key: "quotes",
      match: () => {const m = /^\/([A-Za-z0-9_]+)\/status\/(\d+)\/quotes$/.exec(location.pathname); return m ? {user: m[1], id: m[2]} : null},
      anchor: headerrow,
      meta: ctx => ({name: "@" + ctx.user + " quoters", description: tweettext() || ("quoters of @" + ctx.user + "'s post")}),
      start: (folder, ctx, meta) => scrapeimport(folder, 0, meta.name, "articles")
    },
    {
      key: "replies",
      match: () => {const m = /^\/([A-Za-z0-9_]+)\/status\/(\d+)$/.exec(location.pathname); return (m && replyfilterrow()) ? {user: m[1], id: m[2]} : null},
      anchor: replyfilterrow,
      variant: "tumimportgrey",
      meta: ctx => ({name: "@" + ctx.user + " repliers", description: tweettext() || ("repliers to @" + ctx.user + "'s post")}),
      start: (folder, ctx, meta) => scrapeimport(folder, 0, meta.name, "articles")
    }
  ];

  const FOLDERSVG = '<svg viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M10 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2zm2 5 4 4h-3v4h-2v-4H8l4-4z"/></svg>';

  function beginimport(surface) {
    if (importing) return;
    const ctx = surface.match();
    if (!ctx) return;
    const meta = surface.meta(ctx);
    let center = null;
    try {center = tum.overlay.canvascenter()} catch {}
    tum.overlay.opencreatemodal({
      name: (meta.name || "Imported").slice(0, 40),
      description: meta.description || "",
      x: center ? center.x - 100 : undefined,
      y: center ? center.y - 144 : undefined,
      oncreate: folder => {try {surface.start(folder, ctx, meta)} catch {}}
    });
  }

  function makeicon(surface) {
    const b = document.createElement("button");
    b.className = "tumimportfolder" + (surface.variant ? " " + surface.variant : "");
    b.type = "button";
    b.title = "Import as folder";
    b.setAttribute("aria-label", "Import as folder");
    b.innerHTML = FOLDERSVG;
    b.addEventListener("click", e => {e.preventDefault(); e.stopPropagation(); beginimport(surface)});
    return b;
  }

  function ensureicons() {
    const active = SURFACES.find(s => s.match());
    const existing = document.querySelector(".tumimportfolder");
    if (!active) {if (existing) existing.remove(); return}
    if (existing) {existing.classList.toggle("tumbusy", importing); return}
    const a = active.anchor();
    if (!a || !a.parent) return;
    const icon = makeicon(active);
    if (a.before) a.parent.insertBefore(icon, a.before); else a.parent.appendChild(icon);
    icon.classList.toggle("tumbusy", importing);
  }

  let scheduled = 0;
  function schedule() {if (!scheduled) scheduled = setTimeout(() => {scheduled = 0; ensureicons()}, 150)}

  window.tum.lists = {
    init() {
      window.addEventListener("popstate", schedule);
      new MutationObserver(schedule).observe(document.body, {childList: true, subtree: true});
      schedule();
      setTimeout(() => {try {resumescrape()} catch {}}, 1500);
    }
  };
})();

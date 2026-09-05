(function () {
  "use strict";

  window.tum = window.tum || {};

  const sleep = ms => new Promise(r => setTimeout(r, ms));

  const BEARER = "Bearer AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA";
  // shared feature flags (identical across ListMembers/Followers/Following/Retweeters); a stale/removed
  // one 400s - refresh from a live request if imports break. community slices send no features.
  const FEATURES = '{"rweb_video_screen_enabled":false,"rweb_cashtags_enabled":true,"profile_label_improvements_pcf_label_in_post_enabled":true,"responsive_web_profile_redirect_enabled":true,"rweb_tipjar_consumption_enabled":false,"verified_phone_label_enabled":false,"creator_subscriptions_tweet_preview_api_enabled":true,"responsive_web_graphql_timeline_navigation_enabled":true,"premium_content_api_read_enabled":false,"communities_web_enable_tweet_community_results_fetch":true,"c9s_tweet_anatomy_moderator_badge_enabled":true,"responsive_web_grok_analyze_button_fetch_trends_enabled":false,"responsive_web_grok_analyze_post_followups_enabled":true,"rweb_cashtags_composer_attachment_enabled":true,"responsive_web_jetfuel_frame":true,"responsive_web_grok_share_attachment_enabled":true,"responsive_web_grok_annotations_enabled":true,"articles_preview_enabled":true,"responsive_web_edit_tweet_api_enabled":true,"rweb_conversational_replies_downvote_enabled":false,"graphql_is_translatable_rweb_tweet_is_translatable_enabled":true,"view_counts_everywhere_api_enabled":true,"longform_notetweets_consumption_enabled":true,"responsive_web_twitter_article_tweet_consumption_enabled":true,"content_disclosure_indicator_enabled":true,"content_disclosure_ai_generated_indicator_enabled":true,"responsive_web_grok_show_grok_translated_post":true,"responsive_web_grok_analysis_button_from_backend":true,"post_ctas_fetch_enabled":false,"freedom_of_speech_not_reach_fetch_enabled":true,"standardized_nudges_misinfo":true,"tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled":true,"longform_notetweets_rich_text_read_enabled":true,"longform_notetweets_inline_media_enabled":false,"responsive_web_grok_image_annotation_enabled":true,"responsive_web_grok_imagine_annotation_enabled":true,"responsive_web_grok_community_note_auto_translation_is_enabled":true,"responsive_web_enhance_cards_enabled":false}';
  const CQFEATURES = '{"c9s_list_members_action_api_enabled":false,"c9s_superc9s_indication_enabled":false}';

  // graphql endpoints that page a user list by bottom cursor. feat=null sends no features param.
  const EP = {
    list: {qid: "8rYmkvWQe9jRRZdy_-vkGA", op: "ListMembers", feat: FEATURES, vars: (x, c) => ({listId: x.id, count: 100, cursor: c || undefined})},
    followers: {qid: "JNyQdTISpzCkj_1fqxDvFg", op: "Followers", feat: FEATURES, vars: (x, c) => ({userId: x.userid, count: 100, includePromotedContent: false, withGrokTranslatedBio: true, cursor: c || undefined})},
    following: {qid: "qGZZDF3mp91q7X22s3HxpA", op: "Following", feat: FEATURES, vars: (x, c) => ({userId: x.userid, count: 100, includePromotedContent: false, withGrokTranslatedBio: true, cursor: c || undefined})},
    verified_followers: {qid: "u3PkPbg--arppBcwNbF1ig", op: "BlueVerifiedFollowers", feat: FEATURES, vars: (x, c) => ({userId: x.userid, count: 100, includePromotedContent: false, withGrokTranslatedBio: true, cursor: c || undefined})},
    reposts: {qid: "ROjiuYueotTnWoI8m2YaiQ", op: "Retweeters", feat: FEATURES, vars: (x, c) => ({tweetId: x.id, count: 100, includePromotedContent: false, cursor: c || undefined})},
    members: {qid: "woAp_YdzAdqnWDrqLTNpAw", op: "membersSliceTimeline_Query", feat: null, vars: (x, c) => ({communityId: x.id, cursor: c || null})},
    moderators: {qid: "0oYT9GRiWUhrz5xoqFE9uw", op: "moderatorsSliceTimeline_Query", feat: null, vars: (x, c) => ({communityId: x.id, count: 100, cursor: c || null})}
  };
  const CQID = "-ElI1vg3dYbttVMhBhGdLw"; // CommunityQuery, for the community's name

  const hdrs = ct0 => ({authorization: BEARER, "x-csrf-token": ct0, "x-twitter-auth-type": "OAuth2Session", "x-twitter-active-user": "yes", "x-twitter-client-language": "en"});
  const ct0 = () => (document.cookie.match(/ct0=([^;]+)/) || [])[1] || "";

  // profile visits fetch UserByScreenName (page-sourced) which usercapture relays as __tumuser with the
  // rest_id; cache handle->id so follows/followers/verified can use graphql (needs userId)
  const useridmap = new Map();
  window.addEventListener("message", e => {
    if (!e.data || e.data.__tumuser !== 1 || !e.data.data) return;
    const d = e.data.data;
    if (d.handle && d.restId) useridmap.set(d.handle.toLowerCase(), String(d.restId));
  });
  const UBSN = {qid: "Gb-d6r0vxPOADdG62OEBpQ", features: '{"hidden_profile_subscriptions_enabled":true,"profile_label_improvements_pcf_label_in_post_enabled":true,"responsive_web_profile_redirect_enabled":true,"rweb_tipjar_consumption_enabled":false,"verified_phone_label_enabled":false,"subscriptions_verification_info_is_identity_verified_enabled":true,"subscriptions_verification_info_verified_since_enabled":true,"highlights_tweets_tab_ui_enabled":true,"responsive_web_twitter_article_notes_tab_enabled":true,"subscriptions_feature_can_gift_premium":true,"creator_subscriptions_tweet_preview_api_enabled":true,"responsive_web_graphql_timeline_navigation_enabled":true}', toggles: '{"withPayments":false,"withAuxiliaryUserLabels":true}'};
  async function resolveuserid(handle) {
    const cached = useridmap.get(handle.toLowerCase());
    if (cached) return cached;
    try {
      const vars = {screen_name: handle, withGrokTranslatedBio: true};
      const url = "/i/api/graphql/" + UBSN.qid + "/UserByScreenName?variables=" + encodeURIComponent(JSON.stringify(vars)) + "&features=" + encodeURIComponent(UBSN.features) + "&fieldToggles=" + encodeURIComponent(UBSN.toggles);
      const r = await fetch(url, {credentials: "include", headers: hdrs(ct0())});
      const j = await r.json();
      let id = "";
      (function w(o) {if (!o || typeof o !== "object" || id) return; if (o.rest_id && o.core && o.core.screen_name) {id = o.rest_id; return} for (const k in o) if (o[k] && typeof o[k] === "object") w(o[k])})(j);
      if (id) {useridmap.set(handle.toLowerCase(), String(id)); return String(id)}
    } catch {}
    return null;
  }

  let importing = false, cancel = false, runtoken = 0;
  let bar = null;

  /*//////////////////////////////////////////////////////////////////////*/

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
  function listname() {
    const col = document.querySelector('[data-testid="primaryColumn"]');
    const h2 = col && col.querySelector('h2[role="heading"]');
    const t = h2 && (h2.textContent || "").trim();
    if (t) return t;
    const dt = (document.title || "").replace(/ \/ (X|Twitter)\s*$/, "").replace(/ on (X|Twitter).*$/, "").trim();
    return dt || "Imported list";
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
  function headername() {
    const col = document.querySelector('[data-testid="primaryColumn"]');
    const h2 = col && col.querySelector('h2[role="heading"]');
    return h2 ? (h2.textContent || "").trim() : "";
  }
  function cap(s) {return s ? s.charAt(0).toUpperCase() + s.slice(1) : s}

  async function communityname(id) {
    try {
      const url = "/i/api/graphql/" + CQID + "/CommunityQuery?variables=" + encodeURIComponent(JSON.stringify({communityId: id})) + "&features=" + encodeURIComponent(CQFEATURES);
      const r = await fetch(url, {credentials: "include", headers: hdrs(ct0())});
      const j = await r.json();
      let out = "";
      (function w(o) {if (!o || typeof o !== "object" || out) return; if (o.__typename === "Community" && o.name) {out = o.name; return} for (const k in o) if (o[k] && typeof o[k] === "object") w(o[k])})(j);
      return out;
    } catch {return ""}
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
    b.querySelector(".tumbatchlabel").textContent = note || ("Importing " + count + (expected ? " / " + expected : "") + " users");
  }
  function removebar() {if (bar) {bar.remove(); bar = null}}

  const mkmember = u => ({handle: u.handle, displayname: u.displayname, avatarurl: u.avatarurl, sourceurl: "https://x.com/" + u.handle, reason: "", badges: []});

  /*//////////////////////////////////////////////////////////////////////*/

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
  async function eppage(ep, ctx, cursor) {
    const vars = ep.vars(ctx, cursor);
    let url = "/i/api/graphql/" + ep.qid + "/" + ep.op + "?variables=" + encodeURIComponent(JSON.stringify(vars));
    if (ep.feat) url += "&features=" + encodeURIComponent(ep.feat);
    let r;
    try {r = await fetch(url, {credentials: "include", headers: hdrs(ct0())})} catch (e) {return {ok: false, status: 0, users: [], cursor: null}}
    let j = null;
    try {j = await r.json()} catch {}
    const parsed = j ? parsepage(j) : {users: [], cursor: null};
    const ok = r.ok && j && !(j.errors && j.errors.length && parsed.users.length === 0);
    return {ok, status: r.status, users: parsed.users, cursor: parsed.cursor};
  }

  // generic pager: pull pages from pagefn(cursor) into the folder; on a broken first page use fallback
  async function runimport(folder, name, expected, pagefn, fallback) {
    const token = ++runtoken; // a newer import supersedes this one
    importing = true; cancel = false; ensureicons();
    const seen = new Set(), built = [];
    let cursor = null, saved = 0;
    ensurebar(); renderbar(0, expected);
    while (!cancel && token === runtoken) {
      let page;
      try {page = await pagefn(cursor)} catch (e) {break}
      if (page.status === 429 || page.status === 420) {
        renderbar(built.length, expected, "Rate limited, waiting a minute...");
        await sleep(60000);
        continue;
      }
      if (!page.ok && built.length === 0) {if (token !== runtoken) return; importing = false; if (fallback) {fallback(folder, name, expected); return} break}
      let added = 0;
      for (const u of page.users) {
        const h = (u.handle || "").toLowerCase();
        if (!h || seen.has(h)) continue;
        seen.add(h);
        built.push(mkmember(u));
        added++;
      }
      renderbar(built.length, expected);
      if (built.length - saved >= 300) {tum.folders.update(folder.id, {members: built.slice()}, true); saved = built.length}
      if (!page.cursor || added === 0 || page.cursor === cursor) break;
      cursor = page.cursor;
      await sleep(350);
    }
    if (token !== runtoken) {if (built.length) tum.folders.update(folder.id, {members: built}); return}
    // graphql returned nothing usable (empty/private timeline, rotated qid we didn't catch) but the
    // page itself shows a user list -> fall back to scraping it
    if (built.length === 0 && !cancel && fallback) {importing = false; fallback(folder, name, expected); return}
    finishimport(folder, built, name);
  }

  /*//////////////////////////////////////////////////////////////////////*/

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
    return {handle, displayname: nm || handle, avatarurl: img ? img.src : null};
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
      built.push(mkmember(u));
    }
  }
  // tweet authors, for quotes/replies. skips promoted tweets and the "Discover more" section below.
  function harvestarticles(seen, built) {
    const col = document.querySelector('[data-testid="primaryColumn"]');
    if (!col) return;
    let boundary = null;
    for (const h of col.querySelectorAll('h2, [role="heading"]')) {if (/discover more/i.test(h.textContent || "")) {boundary = h; break}}
    for (const art of col.querySelectorAll("article")) {
      if (boundary && (art.compareDocumentPosition(boundary) & Node.DOCUMENT_POSITION_PRECEDING)) continue; // article sits below "Discover more"
      if (art.closest('[data-testid="placementTracking"]')) continue; // promoted
      if ([...art.querySelectorAll("span")].some(s => !s.children.length && /^(Ad|Promoted)$/.test((s.textContent || "").trim()))) continue;
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
      built.push(mkmember({handle, displayname: nm, avatarurl: img ? img.src : null}));
    }
  }
  // scrape the user list already on the page, auto-scrolling in place (rotation-proof fallback / quotes+replies)
  async function scrapeimport(folder, expected, name, mode) {
    const token = ++runtoken;
    importing = true; cancel = false; ensureicons();
    const seen = new Set(), built = [];
    const harvest = mode === "articles" ? harvestarticles : harvestcells;
    ensurebar(); renderbar(0, expected);
    let last = 0, stagnant = 0, saved = 0;
    for (let w = 0; w < 30 && !cancel && token === runtoken; w++) {
      const s = memberscope() || document.querySelector('[data-testid="primaryColumn"]');
      if (s && (s.querySelector('[data-testid="UserCell"]') || s.querySelector("article"))) break;
      await sleep(400);
    }
    let iters = 0;
    while (!cancel && token === runtoken) {
      harvest(seen, built);
      const scope = memberscope();
      if (scope) {const sc = scrollcontainer(scope); if (sc) sc.scrollTop = sc.scrollHeight; else {const cs = scope.querySelectorAll('[data-testid="UserCell"]'); if (cs.length) cs[cs.length - 1].scrollIntoView()}}
      else window.scrollTo(0, document.documentElement.scrollHeight);
      // a backgrounded tab throttles timers and loads rows slowly - wait longer + tolerate more
      // stagnation so it doesn't conclude "done" early (the #1 cause of imports ending abruptly)
      await sleep(document.hidden ? 1300 : 650);
      harvest(seen, built);
      renderbar(built.length, expected);
      if (built.length - saved >= 300) {tum.folders.update(folder.id, {members: built.slice()}, true); saved = built.length}
      // only count "no new users" toward stopping while the tab is VISIBLE - a backgrounded tab stops
      // loading rows entirely, so we must NOT conclude "done" there; we pause and resume on refocus
      if (built.length === last) {if (!document.hidden) stagnant++} else stagnant = 0;
      last = built.length;
      if (expected && built.length >= expected) break;
      if (!document.hidden && built.length > 0 && stagnant >= 6) break;
      if (!document.hidden && stagnant >= 12) break;
      if (++iters > 9000) break; // absolute safety so a forever-hidden scrape can't spin indefinitely
    }
    if (token !== runtoken) {if (built.length) tum.folders.update(folder.id, {members: built}); return}
    finishimport(folder, built, name);
  }

  /*//////////////////////////////////////////////////////////////////////*/

  // list members graphql only fills its modal on a full navigation, so its fallback reloads to /members
  // and resumes the scrape there. (other surfaces show their list inline, so they just scrape in place.)
  const pendingstore = tum.storage.create("tum.listpendingimport");
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
    if (location.pathname.indexOf("/i/lists/" + p.listid) !== 0) {
      if (Date.now() - (p.ts || 0) > 90000) {try {pendingstore.set(null)} catch {}}
      return;
    }
    try {pendingstore.set(null)} catch {}
    scrapeimport(tum.folders.get(p.folderid) || {id: p.folderid}, p.expected, p.name, "usercells");
  }

  function finishimport(folder, built, name) {
    tum.folders.update(folder.id, {members: built});
    removebar();
    importing = false;
    autoaction(folder, built);
    try {tum.overlay.toast((cancel ? "Stopped - imported " : "Imported ") + built.length + " into \"" + name + "\"")} catch {}
    setTimeout(() => {try {tum.overlay.open()} catch {}}, 400);
    ensureicons();
  }
  // if the folder was created with an auto-action, run it on every imported member (big warning past 200)
  function autoaction(folder, built) {
    const f = tum.folders.get(folder.id);
    if (!f || !f.action || !built.length || cancel) return;
    const handles = built.map(m => m.handle);
    const run = () => {try {tum.actions.enqueue(f.action, handles)} catch {}};
    if (built.length > 200) {
      try {
        tum.overlay.confirm({
          title: cap(f.action) + " " + built.length + " people?",
          body: "This will " + f.action + " all " + built.length + " imported users in the background. Doing this to this many accounts at once can hit rate limits and temporarily break follows/blocks on your account. You can Stop it while it runs.",
          oklabel: cap(f.action) + " all",
          onok: run
        });
      } catch {run()}
    } else run();
  }

  /*//////////////////////////////////////////////////////////////////////*/

  const RESERVED = /^(i|home|explore|search|notifications|messages|settings|compose|hashtag)$/i;
  const FOLLOWLABEL = {followers: "Followers", following: "Following", verified_followers: "Verified followers"};

  // icon anchors: rightmost of the primary-column header (back button is leftmost), or a dialog title bar
  function headerrow() {
    const col = document.querySelector('[data-testid="primaryColumn"]');
    const back = col && col.querySelector('[data-testid="app-bar-back"]');
    const row = back && back.parentElement && back.parentElement.parentElement;
    if (!row || row.children.length < 2) return null;
    const last = row.lastElementChild;
    // a real actions cluster (share/more) -> sit just LEFT of it (list pages)
    if (last.querySelector('[data-testid$="-button"], [aria-label="More"], [aria-label="Share post"], button')) return {parent: row, before: last};
    // a trailing empty reserved slot (community members tab) -> fill it so there's no floating gap
    if (last.tagName === "DIV" && !last.children.length && !(last.textContent || "").trim() && last.getBoundingClientRect().width < 90) return {parent: last, before: null};
    // otherwise (followers/verified/moderators) append at the rightmost
    return {parent: row, before: null};
  }
  function dialogrow() {
    const dlg = document.querySelector('[aria-modal="true"][role="dialog"]') || document.querySelector('[role="dialog"]');
    if (!dlg) return null;
    const close = dlg.querySelector('[data-testid="app-bar-close"], [aria-label="Close"]');
    const row = close && close.parentElement;
    return row ? {parent: row, before: null} : null;
  }
  // slightly to the right of the reply sort ("Relevant"), leaving "View quotes" on the right edge
  function replyfilterrow() {
    const col = document.querySelector('[data-testid="primaryColumn"]');
    if (!col) return null;
    let filter = null;
    for (const b of col.querySelectorAll('button[aria-haspopup="menu"], [role="button"]')) {
      const t = (b.textContent || "").trim();
      if (/^(Relevant|Most recent|Liked|Recency|Likes)$/i.test(t)) {filter = b; break}
    }
    if (!filter) return null;
    const colw = col.getBoundingClientRect().width || 600;
    let row = filter.parentElement;
    for (let i = 0; i < 5 && row && row !== col; i++) {
      if (row.getBoundingClientRect().width >= colw * 0.7) break;
      row = row.parentElement;
    }
    if (!row) return null;
    let child = filter;
    while (child.parentElement && child.parentElement !== row) child = child.parentElement;
    return {parent: row, before: child.nextSibling};
  }

  const SURFACES = [
    {
      key: "list",
      match: () => {const m = /^\/i\/lists\/(\d+)$/.exec(location.pathname); return m ? {id: m[1]} : null},
      anchor: headerrow,
      meta: () => ({name: listname(), description: listdescription()}),
      start: (folder, ctx) => runimport(folder, listname(), membercount(), c => eppage(EP.list, ctx, c), (f, n, e) => startscrapefallback(ctx.id, f.id, n, e))
    },
    {
      key: "follows",
      match: () => {const m = /^\/([A-Za-z0-9_]+)\/(followers|following|verified_followers)$/.exec(location.pathname); return (m && !RESERVED.test(m[1])) ? {user: m[1], kind: m[2]} : null},
      anchor: headerrow,
      meta: ctx => ({name: (headername() || "@" + ctx.user) + " " + FOLLOWLABEL[ctx.kind], description: "(@" + ctx.user + ")"}),
      start: async (folder, ctx, meta) => {
        const uid = await resolveuserid(ctx.user);
        if (uid) {ctx.userid = uid; runimport(folder, meta.name, 0, c => eppage(EP[ctx.kind], ctx, c), (f, n, e) => scrapeimport(f, e, n, "usercells"))}
        else scrapeimport(folder, 0, meta.name, "usercells");
      }
    },
    {
      key: "community",
      match: () => {const m = /^\/i\/communities\/(\d+)\/(members|moderators)$/.exec(location.pathname); return m ? {id: m[1], kind: m[2]} : null},
      anchor: headerrow,
      // the members graphql only returns a bounded 17-user "slice" with no cursor, so scrape the
      // inline (infinitely-scrolling) member list instead
      meta: async ctx => {const nm = await communityname(ctx.id); return {name: (nm || "Community") + " " + cap(ctx.kind), description: "(" + ctx.id + ")"}},
      start: (folder, ctx, meta) => scrapeimport(folder, 0, meta.name, "usercells")
    },
    {
      key: "reposts",
      match: () => {const m = /^\/([A-Za-z0-9_]+)\/status\/(\d+)\/(retweets|reposts)$/.exec(location.pathname); return m ? {user: m[1], id: m[2]} : null},
      anchor: () => dialogrow() || headerrow(),
      meta: ctx => ({name: "@" + ctx.user + " reposters", description: "(" + ctx.id + ")"}),
      start: (folder, ctx, meta) => runimport(folder, meta.name, 0, c => eppage(EP.reposts, ctx, c), (f, n, e) => scrapeimport(f, e, n, "usercells"))
    },
    {
      key: "quotes",
      match: () => {const m = /^\/([A-Za-z0-9_]+)\/status\/(\d+)\/quotes$/.exec(location.pathname); return m ? {user: m[1], id: m[2]} : null},
      anchor: headerrow,
      meta: ctx => ({name: "@" + ctx.user + " quoters", description: "(" + ctx.id + ")"}),
      start: (folder, ctx, meta) => scrapeimport(folder, 0, meta.name, "articles")
    },
    {
      key: "replies",
      match: () => {const m = /^\/([A-Za-z0-9_]+)\/status\/(\d+)$/.exec(location.pathname); return (m && replyfilterrow()) ? {user: m[1], id: m[2]} : null},
      anchor: replyfilterrow,
      variant: "tumimportgrey",
      meta: ctx => ({name: "@" + ctx.user + " repliers", description: "(" + ctx.id + ")"}),
      start: (folder, ctx, meta) => scrapeimport(folder, 0, meta.name, "articles")
    }
  ];

  const FOLDERSVG = '<svg viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M10 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2zm2 5 4 4h-3v4h-2v-4H8l4-4z"/></svg>';

  async function beginimport(surface) {
    const ctx = surface.match();
    if (!ctx) return;
    let meta;
    try {meta = await surface.meta(ctx)} catch {meta = {name: "Imported", description: ""}}
    let center = null;
    try {center = tum.overlay.canvascenter()} catch {}
    tum.overlay.opencreatemodal({
      name: meta.name || "Imported",
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

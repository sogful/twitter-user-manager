(function () {
  "use strict";

  window.tum = window.tum || {};

  const T = (...a) => tum.strings.t(...a);
  const FAKE = "/settings/usermanager";
  const NAVSEL = 'div[role="tablist"]';

  const store = tum.storage.create("tum.settings", {global: true});

  const DEFAULTS = {
    keepopen: true, folderaddtoast: true, nooverlap: false, startcollapsed: false, 
    autoopen: false, pagepencils: true, avatardots: true, 
    extrainfo: true, hideposts: false, confirmactions: false, confirmdelete: false, destroyoption: false
  };

  const SECTIONS = [
    {title: "settings.section.overlay", items: [
      {key: "keepopen"}, {key: "folderaddtoast"}, {key: "nooverlap"}, {key: "startcollapsed"}, {key: "autoopen"}
    ]},
    {title: "settings.section.onpage", items: [
      {key: "pagepencils"}, {key: "avatardots"}, {key: "extrainfo"}
    ]},
    {title: "settings.section.actions", items: [
      {key: "hideposts"}, {key: "confirmactions"}, {key: "confirmdelete"}
    ]},
    {title: "settings.section.extras", items: [
      {key: "destroyoption", img: "assets/images/yeah.png"}
    ]}
  ];

  let vals = {...DEFAULTS};

  /*//////////////////////////////////////////////////////////////////////*/

  const listeners = new Set();
  function emitchange() {for (const cb of listeners) try {cb(vals)} catch (e) {}}
  store.get().then(v => {vals = {...DEFAULTS, ...(v || {})}; syncswitches(); emitchange()});
  store.subscribe(v => {vals = {...DEFAULTS, ...(v || {})}; syncswitches(); emitchange()});
  function setval(key, on) {vals = {...vals, [key]: on}; store.set(vals); syncswitches(); emitchange()}

  function manifestversion() {
    try {return chrome.runtime.getManifest().version} catch {return "1.3"}
  }

  function onsettings() {return location.pathname.indexOf("/settings") === 0}
  function onus() {return location.pathname.replace(/\/$/, "") === FAKE}
  function navtab() {return document.querySelector('[data-testid="usermanagerLink"]')}

  function ensureflashstyle() {
    if (document.getElementById("tumusmstyle")) return;
    const st = document.createElement("style");
    st.id = "tumusmstyle";
    st.textContent = 'html.tumusmroute [data-testid="error-detail"]{display:none!important}';
    (document.head || document.documentElement).appendChild(st);
  }
  function syncroute() {
    ensureflashstyle();
    document.documentElement.classList.toggle("tumusmroute", onus());
    try {document.documentElement.classList.toggle("tumsetlight", tum.theme && tum.theme.classify() === "light")} catch {}
  }

  function navto(path) {
    history.pushState({}, "", path);
    syncroute();
    window.dispatchEvent(new PopStateEvent("popstate"));
  }

  /*//////////////////////////////////////////////////////////////////////*/

  function ensurenav() {
    if (!onsettings()) return;
    const list = document.querySelector(NAVSEL);
    if (!list) return;
    if (navtab()) {markselected(); return}
    const tpl = list.querySelector('a[role="tab"][data-testid$="Link"]') || list.querySelector('a[role="tab"]');
    if (!tpl) return;
    const a = tpl.cloneNode(true);
    a.setAttribute("href", FAKE);
    a.setAttribute("data-testid", "usermanagerLink");
    a.setAttribute("aria-selected", "false");
    const leaf = [...a.querySelectorAll("span")].find(s => !s.children.length);
    if (leaf) leaf.textContent = T("settings.tab");
    const help = list.querySelector('[data-testid="helpCenterLink"]');
    if (help) list.insertBefore(a, help);
    else list.appendChild(a);
    markselected();
  }
  function markselected() {
    const tab = navtab();
    if (tab) tab.setAttribute("aria-selected", onus() ? "true" : "false");
  }

  /*//////////////////////////////////////////////////////////////////////*/

  function palette() {
    const ref = document.querySelector('a[role="tab"] [data-testid="test-LTRtext"]') ||
      document.querySelector('a[role="tab"] span') || document.querySelector('a[role="tab"]') || document.body;
    const primary = getComputedStyle(ref).color || "rgb(15,20,25)";
    const sec = "#71767b"; // twitter's beautifuyl wonderful gray
    return {primary, sec};
  }

  function makecheckbox(key) {
    const wrap = document.createElement("span");
    wrap.className = "tumsetcheckwrap";
    wrap.dataset.key = key;
    const box = document.createElement("span");
    box.className = "tumsetcheck";
    box.setAttribute("role", "checkbox");
    box.tabIndex = 0;
    box.innerHTML = '<svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>';
    const svg = box.querySelector("svg");
    function paint() {
      const on = !!vals[key];
      box.style.background = on ? "#1d9bf0" : "transparent";
      box.style.border = on ? "2px solid #1d9bf0" : "2px solid rgba(120,120,120,0.7)";
      svg.style.opacity = on ? "1" : "0";
      box.setAttribute("aria-checked", on ? "true" : "false");
    }
    paint();
    box._paint = paint;
    wrap.addEventListener("click", () => setval(key, !vals[key]));
    wrap.appendChild(box);
    return wrap;
  }
  function syncswitches() {for (const s of document.querySelectorAll(".tumsetcheck")) if (s._paint) s._paint()}

  function buildrow(item, primary, sec) {
    const row = document.createElement("div");
    row.className = "tumsetrow";
    const txt = document.createElement("div");
    txt.className = "tumsetrowtext";
    const t1 = document.createElement("div");
    t1.className = "tumsettitle";
    t1.style.color = primary;
    t1.textContent = T("settings." + item.key + ".title");
    const t2 = document.createElement("div");
    t2.className = "tumsetdesc";
    t2.style.color = sec;
    if (item.img) {
      const im = document.createElement("img");
      im.className = "tumsetdescimg";
      try {im.src = chrome.runtime.getURL(item.img)} catch {im.src = "../../" + item.img}
      t2.appendChild(im);
    }
    t2.appendChild(document.createTextNode(T("settings." + item.key + ".desc")));
    txt.appendChild(t1);
    txt.appendChild(t2);
    row.appendChild(txt);
    row.appendChild(makecheckbox(item.key));
    return row;
  }

  function destroyeravailable() {
    try {const u = chrome.runtime.getURL("desktopdestroyer/index.html"); return !!u && u !== "about:blank"} catch {return false}
  }
  function currenthandle() {
    const a = document.querySelector('[data-testid="AppTabBar_Profile_Link"]');
    let h = a && (a.getAttribute("href") || "").replace(/^\//, "").replace(/\/$/, "");
    if (!h) {const sw = document.querySelector('[data-testid="SideNav_AccountSwitcher_Button"]'); const m = sw && /@([A-Za-z0-9_]+)/.exec(sw.textContent || ""); if (m) h = m[1]}
    return h ? "@" + h : T("settings.currentaccount");
  }
  const PUBBEARER = "Bearer AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA";
  const FEATURES = '{"hidden_profile_subscriptions_enabled":true,"profile_label_improvements_pcf_label_in_post_enabled":true,"responsive_web_profile_redirect_enabled":true,"rweb_tipjar_consumption_enabled":false,"verified_phone_label_enabled":false,"subscriptions_verification_info_is_identity_verified_enabled":true,"subscriptions_verification_info_verified_since_enabled":true,"highlights_tweets_tab_ui_enabled":true,"responsive_web_graphql_timeline_navigation_enabled":true}';
  const REFRESHBATCHSIZE = 120;
  const REFRESHPAUSE = 16 * 60 * 1000;
  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

  function profilecontainers(result) {
    const legacy = result.legacy || {};
    return [result, legacy, result.verification, result.profile_bio, result.profile_metadata, result.extended_profile,
      legacy.verification, legacy.profile_bio, legacy.extended_profile].filter(value => value && typeof value === "object");
  }
  function badgeflag(value) {return value === true || value === 1 || String(value || "").toLowerCase() === "true"}
  function affiliationuser(value, depth = 0) {
    if (!value || typeof value !== "object" || depth > 4) return null;
    const core = value.core || {}, legacy = value.legacy || {};
    if (core.screen_name || legacy.screen_name || value.screen_name || value.username) return value;
    for (const key of ["user", "user_result", "user_results", "result", "data"]) {
      const found = affiliationuser(value[key], depth + 1);
      if (found) return found;
    }
    return null;
  }
  function profilebadges(result) {
    const badges = [];
    const legacy = result && result.legacy || {};
    const containers = profilecontainers(result);
    const values = key => containers.map(item => item[key]).filter(value => value !== undefined && value !== null && value !== "");
    const verifiedtype = String(result.verification && result.verification.verified_type || result.verified_type || legacy.verified_type || "").toLowerCase();
    const blue = badgeflag(result.is_blue_verified) || badgeflag(legacy.is_blue_verified);
    const verified = badgeflag(result.verified) || badgeflag(legacy.verified);
    if (/government/.test(verifiedtype)) badges.push("verifiedgovernment");
    else if (/business/.test(verifiedtype)) badges.push("verifiedbusiness");
    else if (blue) badges.push("blue");
    else if (verified) badges.push("verified");

    const translatorflags = ["is_translator", "translator_enabled", "translator", "is_translator_mod", "is_translator_moderator", "translator_moderator"];
    const modflags = ["is_translator_mod", "is_translator_moderator", "translator_moderator"];
    const translatorlabels = ["translator_type", "translator_badge_type", "translation_type"]
      .flatMap(values).map(value => String(value || "").toLowerCase());
    const typedtranslator = translatorlabels.some(value => value && !/^(none|false|null|undefined)$/.test(value));
    const translatormod = modflags.some(key => values(key).some(badgeflag)) || translatorlabels.some(value => /mod|moderator|r-1cvl2hr/.test(value));
    if (translatorflags.some(key => values(key).some(badgeflag)) || typedtranslator) badges.push(translatormod ? "translatormod" : "translator");

    const highlight = containers.map(item => item.affiliates_highlighted_label || item.affiliation_label || item.profile_affiliates_highlighted_label).find(Boolean);
    const label = highlight && (highlight.label || highlight);
    if (label && typeof label === "object") {
      const rawurl = label.url && (typeof label.url === "string" ? label.url : label.url.url);
      const match = /(?:x|twitter)\.com\/([A-Za-z0-9_]+)/i.exec(String(rawurl || "")) || /^\/?([A-Za-z0-9_]+)\/?$/.exec(String(rawurl || ""));
      const linkeduser = affiliationuser(label) || affiliationuser(highlight);
      const core = linkeduser && linkeduser.core || {}, legacy = linkeduser && linkeduser.legacy || {};
      const handle = label.handle || label.screen_name || label.username || core.screen_name || legacy.screen_name || linkeduser && (linkeduser.screen_name || linkeduser.username) || match && match[1];
      const avatar = linkeduser && linkeduser.avatar;
      const avatarvalue = label.avatar_url || avatar && (avatar.image_url || avatar.url) || label.badge && label.badge.url || null;
      const avatarurl = typeof avatarvalue === "string" ? avatarvalue : avatarvalue && (avatarvalue.url || avatarvalue.image_url) || null;
      if (handle && /^[A-Za-z0-9_]+$/.test(handle)) badges.push({type: "affiliation", handle, avatarurl});
    }
    return badges.length ? badges : null;
  }
  function profilefromresult(result) {
    if (!result || typeof result !== "object") return null;
    const core = result.core || {}, legacy = result.legacy || {}, rel = result.relationship_counts || {}, tweets = result.tweet_counts || {};
    const handle = core.screen_name || legacy.screen_name;
    if (!handle || !result.rest_id) return null;
    const user = {
      handle,
      displayname: core.name || legacy.name || handle,
      avatarurl: (result.avatar && result.avatar.image_url) || legacy.profile_image_url_https || null,
      userid: String(result.rest_id),
      createdat: core.created_at || legacy.created_at || null,
      followers: rel.followers != null ? rel.followers : legacy.followers_count,
      following: rel.following != null ? rel.following : legacy.friends_count,
      tweets: tweets.tweets != null ? tweets.tweets : legacy.statuses_count,
      mediatweets: tweets.media_tweets != null ? tweets.media_tweets : legacy.media_count,
      favorites: result.action_counts && result.action_counts.favorites_count != null ? result.action_counts.favorites_count : legacy.favourites_count,
      highlights: result.highlights_info && result.highlights_info.can_highlight_tweets ? Number(result.highlights_info.highlighted_tweets || 0) : null,
      verifiedtype: result.verification && result.verification.verified_type || result.verified_type || null,
      blueverified: badgeflag(result.is_blue_verified),
      protected: !!(result.privacy && result.privacy.protected || legacy.protected),
      unfindable: false
    };
    const badges = profilebadges(result);
    if (badges) user.badges = badges;
    return user;
  }
  function finduser(value, budget) {
    if (!value || typeof value !== "object" || budget.n-- <= 0) return null;
    if (value.rest_id && value.core && value.core.screen_name) return value;
    for (const child of Object.values(value)) {
      const found = finduser(child, budget);
      if (found) return found;
    }
    return null;
  }
  function headers() {
    const ct0 = (document.cookie.match(/ct0=([^;]+)/) || [])[1] || "";
    return {authorization: PUBBEARER, "x-csrf-token": ct0, "x-twitter-auth-type": "OAuth2Session", "x-twitter-active-user": "yes", "x-twitter-client-language": "en"};
  }
  async function requestprofile(member) {
    const byid = member.userid ? {qid: "VQfQ9wwYdk6j_u2O4vt64Q", operation: "UserByRestId", variables: {userId: String(member.userid), withGrokTranslatedBio: true}} :
      {qid: "Gb-d6r0vxPOADdG62OEBpQ", operation: "UserByScreenName", variables: {screen_name: member.handle, withGrokTranslatedBio: true}};
    const toggles = '{"withAuxiliaryUserLabels":true}';
    const url = "/i/api/graphql/" + byid.qid + "/" + byid.operation + "?variables=" + encodeURIComponent(JSON.stringify(byid.variables)) + "&features=" + encodeURIComponent(FEATURES) + "&fieldToggles=" + encodeURIComponent(toggles);
    let response;
    try {response = await fetch(url, {credentials: "include", headers: headers()})} catch {return {ok: false, retry: false, missing: false}}
    if (!response.ok) return {ok: false, retry: response.status === 429, missing: response.status === 404};
    let json = null;
    try {json = await response.json()} catch {}
    const user = profilefromresult(finduser(json, {n: 30000}));
    return user ? {ok: true, user} : {ok: false, retry: false, missing: true};
  }
  function saveprofile(oldhandle, user) {
    const members = [...tum.folders.list().flatMap(folder => folder.members || []), ...tum.unsorted.list()];
    const key = String(oldhandle || "").toLowerCase();
    const existing = members.filter(member => user.userid && member.userid
      ? String(member.userid) === String(user.userid)
      : String(member.handle || "").toLowerCase() === key);
    const badges = new Map();
    const newbadges = Array.isArray(user.badges) ? user.badges : [];
    for (const badge of [...existing.flatMap(member => Array.isArray(member.badges) ? member.badges : []), ...newbadges]) {
      const key = badge && typeof badge === "object" ? "affiliation:" + String(badge.handle || "").toLowerCase() : String(badge);
      badges.set(key, badge);
    }
    const refreshed = Object.assign({}, user, badges.size ? {badges: [...badges.values()]} : {});
    const folders = tum.folders.refreshmember(oldhandle, refreshed);
    const unsorted = tum.unsorted.refreshmember(oldhandle, refreshed);
    return folders || unsorted;
  }
  function markunfindable(member) {
    const user = {handle: member.handle, userid: member.userid, unfindable: true};
    tum.folders.refreshmember(member.handle, user);
    tum.unsorted.refreshmember(member.handle, user);
  }
  const pendingenrichment = new Set();
  async function enrichprofile(handle) {
    const key = String(handle || "").toLowerCase();
    if (!key || pendingenrichment.has(key)) return;
    pendingenrichment.add(key);
    const result = await requestprofile({handle});
    if (result.ok) saveprofile(handle, result.user);
    pendingenrichment.delete(key);
  }
  window.tum.accountdata = {enrich: enrichprofile, refresh: startrefresh};
  function storedprofile(data) {
    if (!data || !data.handle || !data.restId) return null;
    return {
      handle: data.handle,
      displayname: data.displayname || data.handle,
      avatarurl: data.avatar || null,
      userid: String(data.restId),
      createdat: data.createdAt || null,
      followers: data.followers,
      following: data.following,
      tweets: data.tweets,
      mediatweets: data.mediaTweets,
      favorites: data.favorites,
      highlights: data.highlights,
      verifiedtype: data.verifiedType,
      blueverified: badgeflag(data.blueVerified),
      protected: data.isProtected,
      badges: Array.isArray(data.badges) ? data.badges : []
    };
  }
  const repopulatestore = tum.storage.create("tum.repopulation");
  let repopulation = null, repopulating = false, repopulatecancel = false, repopulatebar = null;
  function removerepopulatebar() {if (repopulatebar) {repopulatebar.remove(); repopulatebar = null}}
  function ensurerepopulatebar() {
    if (repopulatebar && document.documentElement.contains(repopulatebar)) return repopulatebar;
    repopulatebar = document.createElement("div");
    repopulatebar.className = "tumbatchbar tumrepopulatebar";
    repopulatebar.innerHTML = '<div class="tumbatchfill"></div><span class="tumbatchdrag" title="' + T("settings.repopulate.drag") + '"></span><div class="tumbatchrow"><span class="tumbatchlabel"></span><button class="tumbatchcancel">' + T("import.stop") + "</button></div>";
    repopulatebar.querySelector(".tumbatchcancel").addEventListener("click", cancelrepopulate);
    wiredrag(repopulatebar);
    try {tum.theme.paint(repopulatebar)} catch {}
    document.documentElement.appendChild(repopulatebar);
    return repopulatebar;
  }
  function renderrepopulate(note) {
    if (!repopulation) {removerepopulatebar(); return}
    const bar = ensurerepopulatebar();
    const total = repopulation.members.length;
    bar.querySelector(".tumbatchfill").style.width = Math.round(repopulation.index / total * 100) + "%";
    bar.querySelector(".tumbatchlabel").textContent = note || T("settings.repopulate.progress", Math.min(repopulation.index + 1, total), total);
  }
  function persistrepopulation() {return repopulatestore.set(repopulation)}
  function cancelrepopulate() {
    repopulatecancel = true;
    repopulation = null;
    persistrepopulation();
    removerepopulatebar();
  }
  function wiredrag(bar) {
    const handle = bar.querySelector(".tumbatchdrag");
    handle.addEventListener("pointerdown", event => {
      event.preventDefault();
      const rect = bar.getBoundingClientRect();
      const startx = event.clientX - rect.left, starty = event.clientY - rect.top;
      bar.style.left = rect.left + "px";
      bar.style.top = rect.top + "px";
      bar.style.right = "auto";
      bar.style.bottom = "auto";
      const move = moveevent => {
        bar.style.left = Math.max(0, Math.min(window.innerWidth - rect.width, moveevent.clientX - startx)) + "px";
        bar.style.top = Math.max(0, Math.min(window.innerHeight - rect.height, moveevent.clientY - starty)) + "px";
      };
      const end = () => {document.removeEventListener("pointermove", move); document.removeEventListener("pointerup", end)};
      document.addEventListener("pointermove", move);
      document.addEventListener("pointerup", end);
    });
  }
  function formatwait(milliseconds) {
    const seconds = Math.max(0, Math.ceil(milliseconds / 1000));
    return Math.floor(seconds / 60) + ":" + String(seconds % 60).padStart(2, "0");
  }
  async function waitrepopulate(until, label) {
    while (repopulation && !repopulatecancel) {
      const remaining = until - Date.now();
      if (remaining <= 0) return;
      renderrepopulate(label(formatwait(remaining)));
      await sleep(Math.min(1000, remaining));
    }
  }
  async function runrepopulate() {
    if (repopulating || !repopulation) return;
    repopulating = true;
    repopulatecancel = false;
    try {
      while (repopulation && !repopulatecancel && repopulation.index < repopulation.members.length) {
        if (repopulation.waituntil && repopulation.waituntil > Date.now()) {
          await waitrepopulate(repopulation.waituntil, remaining => T("settings.repopulate.ratelimited", remaining));
          if (!repopulation || repopulatecancel) break;
          repopulation.waituntil = 0;
          await persistrepopulation();
        }
        const member = repopulation.members[repopulation.index];
        renderrepopulate();
        let result = await requestprofile(member);
        if (!repopulation || repopulatecancel) break;
        if (result.retry) {
          repopulation.waituntil = Date.now() + REFRESHPAUSE;
          await persistrepopulation();
          continue;
        }
        if (result.ok) {
          if (saveprofile(member.handle, result.user)) repopulation.updated++;
          else repopulation.failed = (repopulation.failed || 0) + 1;
        } else if (result.missing) {
          markunfindable(member);
          repopulation.missing++;
        } else repopulation.failed = (repopulation.failed || 0) + 1;
        repopulation.index++;
        if (repopulation.index < repopulation.members.length && repopulation.index % REFRESHBATCHSIZE === 0) {
          repopulation.waituntil = Date.now() + REFRESHPAUSE;
          await persistrepopulation();
          await waitrepopulate(repopulation.waituntil, remaining => T("settings.repopulate.pause", remaining, REFRESHBATCHSIZE));
          if (!repopulation || repopulatecancel) break;
          repopulation.waituntil = 0;
        }
        await persistrepopulation();
        if (repopulation && !repopulatecancel && repopulation.index < repopulation.members.length) await sleep(700);
      }
      if (repopulation && !repopulatecancel && repopulation.index >= repopulation.members.length) {
        const done = repopulation.failed ? T("settings.repopulate.done.failed", repopulation.updated, repopulation.missing, repopulation.failed) : T("settings.repopulate.done", repopulation.updated, repopulation.missing);
        try {tum.overlay.toast(done)} catch {}
        repopulation = null;
        await persistrepopulation();
        removerepopulatebar();
      }
    } finally {repopulating = false}
  }
  function startrefresh(members) {
    if (repopulating || repopulation) return "busy";
    const unique = new Map();
    for (const member of members || []) {
      if (!member || (!member.handle && !member.userid)) continue;
      unique.set(member.userid ? "id:" + String(member.userid) : "handle:" + member.handle.toLowerCase(), {handle: member.handle || "", userid: member.userid || null});
    }
    if (!unique.size) return false;
    repopulation = {members: [...unique.values()], index: 0, updated: 0, missing: 0, failed: 0, waituntil: 0};
    persistrepopulation().then(runrepopulate, () => {repopulation = null; removerepopulatebar()});
    return true;
  }
  async function repopulate(button) {
    if (repopulating) return;
    if (repopulation) {runrepopulate(); return}
    const members = [...tum.folders.list().flatMap(folder => folder.members || []), ...tum.unsorted.list()];
    if (!startrefresh(members)) button.textContent = T("settings.repopulate.empty");
  }
  async function loadrepopulation() {
    if (repopulating) return;
    let saved = null;
    try {saved = await repopulatestore.get()} catch {}
    if (!saved || !Array.isArray(saved.members) || !saved.members.length || typeof saved.index !== "number") return;
    repopulation = saved;
    runrepopulate();
  }
  function buildrepulaterow(primary, sec) {
    const row = document.createElement("div");
    row.className = "tumsetrow";
    const txt = document.createElement("div");
    txt.className = "tumsetrowtext";
    const title = document.createElement("div");
    title.className = "tumsettitle";
    title.style.color = primary;
    title.textContent = T("settings.repopulate.title");
    const desc = document.createElement("div");
    desc.className = "tumsetdesc";
    desc.style.color = sec;
    desc.textContent = T("settings.repopulate.desc");
    txt.append(title, desc);
    const button = document.createElement("button");
    button.className = "tumsetdangerbtn";
    button.textContent = T("settings.repopulate.button");
    button.addEventListener("click", () => repopulate(button));
    row.append(txt, button);
    return row;
  }
  function builddangerrow(primary, sec) {
    const row = document.createElement("div");
    row.className = "tumsetrow";
    const txt = document.createElement("div");
    txt.className = "tumsetrowtext";
    const t1 = document.createElement("div");
    t1.className = "tumsettitle";
    t1.style.color = primary;
    t1.textContent = T("settings.deleteall.title");
    const t2 = document.createElement("div");
    t2.className = "tumsetdesc";
    t2.style.color = sec;
    t2.textContent = T("settings.deleteall.desc", currenthandle());
    txt.appendChild(t1);
    txt.appendChild(t2);
    const btn = document.createElement("button");
    btn.className = "tumsetdangerbtn";
    btn.textContent = T("settings.deleteall.button");
    let armed = false, timer = 0;
    const reset = () => {armed = false; btn.classList.remove("tumarmed"); btn.textContent = T("settings.deleteall.button")};
    btn.addEventListener("click", () => {
      if (!armed) {armed = true; btn.classList.add("tumarmed"); btn.textContent = T("settings.deleteall.confirm"); clearTimeout(timer); timer = setTimeout(reset, 4000); return}
      clearTimeout(timer);
      for (const f of tum.folders.list()) tum.folders.remove(f.id);
      for (const c of (tum.categories ? tum.categories.list() : [])) tum.categories.remove(c.id);
      for (const u of tum.unsorted.list()) tum.unsorted.remove(u.handle);
      btn.classList.remove("tumarmed");
      btn.textContent = T("settings.deleteall.done");
      btn.disabled = true;
      armed = false;
      setTimeout(() => {btn.disabled = false; reset()}, 2500);
    });
    row.appendChild(txt);
    row.appendChild(btn);
    return row;
  }

  function buildpane() {
    const {primary, sec} = palette();
    const pane = document.createElement("div");
    pane.className = "tumsettingspane";
    const head = document.createElement("div");
    head.className = "tumsetpanehead";
    head.style.color = primary;
    head.textContent = T("settings.pane.title");
    pane.appendChild(head);
    const sub = document.createElement("div");
    sub.className = "tumsetpanesub";
    sub.style.color = sec;
    sub.textContent = T("settings.pane.sub");
    pane.appendChild(sub);
    for (const section of SECTIONS) {
      const items = section.items.filter(it => it.key !== "destroyoption" || destroyeravailable());
      if (!items.length) continue;
      const sh = document.createElement("div");
      sh.className = "tumsetsubhead";
      sh.style.color = primary;
      sh.textContent = T(section.title);
      pane.appendChild(sh);
      for (const item of items) pane.appendChild(buildrow(item, primary, sec));
    }
    const dh = document.createElement("div");
    dh.className = "tumsetsubhead";
    dh.style.color = primary;
    dh.textContent = T("settings.section.danger");
    pane.appendChild(dh);
    pane.appendChild(buildrepulaterow(primary, sec));
    pane.appendChild(builddangerrow(primary, sec));
    const ver = document.createElement("div");
    ver.className = "tumsetversion";
    ver.style.color = sec;
    ver.textContent = "v" + manifestversion();
    pane.appendChild(ver);
    return pane;
  }

  function ensurepane() {
    if (!onus()) {const p = document.querySelector(".tumsettingspane"); if (p) p.remove(); return}
    const brand = T("settings.brand");
    const wanted = T("settings.brand.title", brand, brandsuffix);
    if (document.title !== wanted) document.title = wanted;
    markselected();
    const err = document.querySelector('[data-testid="error-detail"]');
    if (err) err.style.display = "none";
    if (document.querySelector(".tumsettingspane")) return;
    const host = err ? err.parentElement : null;
    if (!host) return;
    host.insertBefore(buildpane(), err);
  }

  /*//////////////////////////////////////////////////////////////////////*/

  let brandsuffix = " / Twitter";
  function tracktitle() {
    const t = document.title || "";
    if (t.indexOf(T("settings.brand")) === 0) return;
    const m = / \/ (X|Twitter)$/.exec(t);
    if (m) brandsuffix = " / Twitter";
  }

  let scheduled = 0;
  function scan() {scheduled = 0; tracktitle(); syncroute(); ensurenav(); ensurepane()}
  function schedule() {if (!scheduled) scheduled = setTimeout(scan, 80)}

  window.tum.settingspane = {open() {if (!onus()) navto(FAKE)}};

  window.tum.settings = {
    get(key) {return key in vals ? vals[key] : DEFAULTS[key]},
    onchange(cb) {listeners.add(cb); return () => listeners.delete(cb)},
    init() {
      loadrepopulation();
      window.addEventListener("tumaccountchange", loadrepopulation);
      window.addEventListener("message", e => {
        if (e.source !== window || !e.data || !e.data.__tumuser) return;
        const user = storedprofile(e.data.data);
        if (user) saveprofile(user.handle, user);
      });
      document.addEventListener("click", e => {
        if (e.target.closest && e.target.closest('[data-testid="usermanagerLink"]')) {
          e.preventDefault();
          e.stopPropagation();
          navto(FAKE);
        }
      }, true);
      window.addEventListener("popstate", schedule);
      new MutationObserver(schedule).observe(document.body, {childList: true, subtree: true});
      syncroute();
      schedule();
    }
  };
})();

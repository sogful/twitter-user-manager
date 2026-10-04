(function () {
  "use strict";

  function profilecontainers(result) {
    const legacy = result.legacy || {};
    return [result, legacy, result.verification, result.profile_bio, result.profile_metadata, result.extended_profile,
      legacy.verification, legacy.profile_bio, legacy.extended_profile].filter(value => value && typeof value === "object");
  }
  function badgeflag(value) {return value === true || value === 1 || String(value || "").toLowerCase() === "true"}
  function profiletranslationtype(result) {
    const translation = profilecontainers(result).map(item => item.profile_translation).find(value => value && typeof value === "object");
    const type = translation && translation.translator_type;
    return typeof type === "string" && type.trim() ? type.trim().toLowerCase() : undefined;
  }
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
    const verifiedtype = String(result.verification && result.verification.verified_type || result.verified_type || legacy.verified_type || "").toLowerCase();
    const blue = badgeflag(result.is_blue_verified) || badgeflag(legacy.is_blue_verified);
    const verified = badgeflag(result.verified) || badgeflag(legacy.verified);
    if (/government/.test(verifiedtype)) badges.push("verifiedgovernment");
    else if (/business/.test(verifiedtype)) badges.push("verifiedbusiness");
    else if (blue) badges.push("blue");
    else if (verified) badges.push("verified");

    const translatorType = profiletranslationtype(result);
    if (translatorType === "regular" || translatorType === "badged") badges.push("translator");
    else if (translatorType === "moderator") badges.push("translatormod");

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
    return badges;
  }

  function pick(u) {
    if (!u || typeof u !== "object") return null;
    const core = u.core || {}, rel = u.relationship_counts || {}, tw = u.tweet_counts || {};
    const ver = u.verification || {}, priv = u.privacy || {}, legacy = u.legacy || {}, bio = u.profile_bio || {};
    const actions = u.action_counts || {}, highlights = u.highlights_info || {}, media = u.media_permissions || {};
    const professional = u.professional || {}, perspectives = u.relationship_perspectives || {};
    const withheld = [bio.withheld_in_countries, u.withheld_in_countries, legacy.withheld_in_countries].find(c => Array.isArray(c) && c.length) || null;
    const handle = core.screen_name || legacy.screen_name;
    if (!handle) return null;
    return {
      handle,
      displayname: core.name || legacy.name || handle,
      restId: u.rest_id || null,
      createdAt: core.created_at || legacy.created_at || null,
      followers: rel.followers != null ? rel.followers : legacy.followers_count,
      following: rel.following != null ? rel.following : legacy.friends_count,
      tweets: tw.tweets != null ? tw.tweets : legacy.statuses_count,
      mediaTweets: tw.media_tweets != null ? tw.media_tweets : legacy.media_count,
      favorites: actions.favorites_count != null ? actions.favorites_count : legacy.favourites_count,
      highlights: highlights.can_highlight_tweets ? Number(highlights.highlighted_tweets || 0) : null,
      verifiedType: ver.verified_type || u.verified_type || null,
      blueVerified: badgeflag(u.is_blue_verified),
      translatorType: profiletranslationtype(u) || null,
      isProtected: !!(priv.protected || legacy.protected),
      badges: profilebadges(u),
      relationship: {
        following: perspectives.following != null ? !!perspectives.following : null,
        followedBy: perspectives.followed_by != null ? !!perspectives.followed_by : null
      },
      possiblySensitive: !!(u.possibly_sensitive != null ? u.possibly_sensitive : legacy.possibly_sensitive),
      withheld,
      accountLabel: u.parody_commentary_fan_label && u.parody_commentary_fan_label !== "None" ? u.parody_commentary_fan_label : null,
      canMediaTag: media.can_media_tag != null ? media.can_media_tag : legacy.can_media_tag,
      premiumGiftingEligible: u.premium_gifting_eligible != null ? !!u.premium_gifting_eligible : null,
      subscriptionsHidden: u.has_hidden_subscriptions_on_profile != null ? !!u.has_hidden_subscriptions_on_profile : null,
      subscriptionsEligible: u.super_follow_eligible != null ? !!u.super_follow_eligible : null,
      profileInterstitialType: (u.profile_metadata && u.profile_metadata.profile_interstitial_type) || legacy.profile_interstitial_type || null,
      seedTweets: u.user_seed_tweet_count != null ? u.user_seed_tweet_count : legacy.user_seed_tweet_count,
      verifiedSinceMsec: u.verification_info && u.verification_info.verified_since_msec ? Number(u.verification_info.verified_since_msec) : null,
      professional: professional.category && professional.category.length ? {
        category: professional.category[0].name || null,
        categoryId: professional.category[0].id != null ? professional.category[0].id : null,
        type: professional.professional_type || null,
        restId: professional.rest_id || null
      } : null,
      avatar: (u.avatar && u.avatar.image_url) || legacy.profile_image_url_https || null,
      banner: (u.banner && u.banner.image_url) || legacy.profile_banner_url || null
    };
  }

  function profilefrompayload(value, budget = {n: 30000}) {
    if (!value || typeof value !== "object" || budget.n-- <= 0) return null;
    if (value.rest_id && value.core && value.core.screen_name) return value;
    for (const child of Object.values(value)) {
      const user = profilefrompayload(child, budget);
      if (user) return user;
    }
    return null;
  }
  const profilecache = new Map();
  function relay(text) {
    try {
      const j = JSON.parse(text);
      const data = j && j.data;
      const u = data && (data.user && data.user.result || data.user_result_by_screen_name && data.user_result_by_screen_name.result) || profilefrompayload(data);
      const d = pick(u);
      if (d) {
        const key = d.handle.toLowerCase();
        profilecache.delete(key);
        profilecache.set(key, d);
        if (profilecache.size > 40) profilecache.delete(profilecache.keys().next().value);
        window.postMessage({__tumuser: 1, data: d}, location.origin);
        fetchabout(d.handle);
      }
    } catch {}
  }
  window.addEventListener("message", event => {
    if (event.source !== window || !event.data || event.data.__tumusercaptureinit !== 1) return;
    for (const user of profilecache.values()) window.postMessage({__tumuser: 1, data: user}, location.origin);
  });

  const PUBBEARER = "Bearer AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA";
  const ABOUTQID = "TzOG2twZEfhr9KmClvVVqA";
  
  const qids = {};
  function learnqid(url) {
    const m = /\/i\/api\/graphql\/([^/?#]+)\/([A-Za-z0-9_]+)/.exec(String(url || ""));
    if (m) qids[m[2]] = m[1];
  }
  const aboutqid = () => qids.AboutAccountQuery || ABOUTQID;
  let bearer = null;
  const aboutdone = new Set();
  function grabbearer(init) {
    try {
      const h = init && init.headers;
      if (!h) return;
      const a = typeof h.get === "function" ? h.get("authorization") : (h.authorization || h.Authorization);
      if (a && /^Bearer /.test(a)) bearer = a;
    } catch {}
  }
  async function fetchabout(handle) {
    const key = handle.toLowerCase();
    if (aboutdone.has(key)) return;
    aboutdone.add(key);
    try {
      const ct0 = (document.cookie.match(/ct0=([^;]+)/) || [])[1] || "";
      const path = "/i/api/graphql/" + aboutqid() + "/AboutAccountQuery";
      const url = path + "?variables=" + encodeURIComponent(JSON.stringify({screenName: handle}));
      const r = await origfetch(url, {credentials: "include", headers: await graphqlheaders(ct0, "GET", path)});
      if (!r.ok) return;
      const j = await r.json();
      const ab = j && j.data && j.data.user_result_by_screen_name && j.data.user_result_by_screen_name.result && j.data.user_result_by_screen_name.result.about_profile;
      if (!ab) return;
      const uc = ab.username_changes || {};
      window.postMessage({__tumabout: 1, data: {
        handle,
        basedIn: ab.account_based_in || null,
        locationAccurate: ab.location_accurate,
        source: ab.source || null,
        changesCount: uc.count != null ? Number(uc.count) : null,
        changesLastMsec: uc.last_changed_at_msec ? Number(uc.last_changed_at_msec) : null
      }}, location.origin);
    } catch {}
  }

  function scanusers(obj, out, budget) {
    if (!obj || typeof obj !== "object" || budget.n <= 0) return;
    budget.n--;
    if (typeof obj.screen_name === "string" && (obj.profile_image_url_https || obj.profile_image_url)) {
      out.push({handle: obj.screen_name, name: obj.name || obj.screen_name, avatar: obj.profile_image_url_https || obj.profile_image_url});
    }
    if (obj.core && typeof obj.core.screen_name === "string") {
      const av = (obj.avatar && obj.avatar.image_url) || (obj.legacy && obj.legacy.profile_image_url_https);
      if (av) out.push({handle: obj.core.screen_name, name: obj.core.name || obj.core.screen_name, avatar: av});
    }
    for (const k in obj) {const v = obj[k]; if (v && typeof v === "object") scanusers(v, out, budget)}
  }
  function relaynotifs(text) {
    try {
      const j = JSON.parse(text);
      const out = [];
      scanusers(j, out, {n: 40000});
      if (out.length) window.postMessage({__tumavatars: 1, data: out}, location.origin);
    } catch {}
  }
  const isnotifs = url => typeof url === "string" && /\/notifications\/|Notifications/.test(url);
  const isexplore = url => typeof url === "string" && url.indexOf("ExplorePage") >= 0;

  const origfetch = window.fetch;
  let transactionready = null;

  function textbytes(value) {
    const raw = atob(value);
    return Array.from(raw, char => char.charCodeAt(0));
  }
  function bytesbase64(bytes) {
    let text = "";
    for (let i = 0; i < bytes.length; i += 0x8000) text += String.fromCharCode(...bytes.slice(i, i + 0x8000));
    return btoa(text).replace(/=/g, "");
  }
  function floathex(value) {
    const result = [];
    let quotient = Math.floor(value);
    let fraction = value - quotient;
    while (quotient > 0) {
      quotient = Math.floor(value / 16);
      const remainder = Math.floor(value - quotient * 16);
      result.unshift(remainder > 9 ? String.fromCharCode(remainder + 55) : String(remainder));
      value = quotient;
    }
    if (fraction === 0) return result.join("");
    result.push(".");
    while (fraction > 0) {
      fraction *= 16;
      const integer = Math.floor(fraction);
      fraction -= integer;
      result.push(integer > 9 ? String.fromCharCode(integer + 55) : String(integer));
    }
    return result.join("");
  }
  function cubicvalue(curves, time) {
    const calculate = (a, b, value) => 3 * a * (1 - value) * (1 - value) * value + 3 * b * (1 - value) * value * value + value * value * value;
    if (time <= 0) {
      if (curves[0] > 0) return curves[1] / curves[0] * time;
      if (curves[1] === 0 && curves[2] > 0) return curves[3] / curves[2] * time;
      return 0;
    }
    if (time >= 1) {
      if (curves[2] < 1) return 1 + (curves[3] - 1) / (curves[2] - 1) * (time - 1);
      if (curves[2] === 1 && curves[0] < 1) return 1 + (curves[1] - 1) / (curves[0] - 1) * (time - 1);
      return 1;
    }
    let start = 0, middle = 0, end = 1;
    while (start < end) {
      middle = (start + end) / 2;
      const estimate = calculate(curves[0], curves[2], middle);
      if (Math.abs(time - estimate) < 0.00001) return calculate(curves[1], curves[3], middle);
      if (estimate < time) start = middle;
      else end = middle;
    }
    return calculate(curves[1], curves[3], middle);
  }
  function animationkey(keybytes, rowindex, indices, source) {
    const frames = [...source.querySelectorAll("[id^='loading-x-anim']")];
    const frame = frames[keybytes[5] % 4];
    const path = frame && frame.children[0] && frame.children[0].children[1];
    const d = path && path.getAttribute("d");
    if (!d) throw new Error("transaction animation unavailable");
    const rows = d.substring(9).split("C").map(item => {
      const values = item.replace(/[^\d]+/g, " ").trim();
      return values ? values.split(/\s+/).map(Number) : [];
    });
    const row = rows[keybytes[rowindex] % 16];
    if (!row || row.length < 11) throw new Error("transaction animation unavailable");
    let frametime = indices.reduce((total, index) => total * (keybytes[index] % 16), 1);
    frametime = Math.round(frametime / 10) * 10;
    const blend = cubicvalue(row.slice(7).map((value, index) => {
      const low = index % 2 ? -1 : 0;
      return Math.round((value * (1 - low) / 255 + low) * 100) / 100;
    }), frametime / 4096);
    const colors = row.slice(0, 3).map((value, index) => Math.round(value * (1 - blend) + row[index + 3] * blend)).map(value => Math.max(value, 0));
    const degrees = Math.floor(row[6] * 300 / 255 + 60) * blend;
    const radians = degrees * Math.PI / 180;
    const matrix = [Math.cos(radians), -Math.sin(radians), Math.sin(radians), Math.cos(radians)];
    const parts = colors.map(value => value.toString(16));
    for (let value of matrix) {
      value = Math.round(value * 100) / 100;
      if (value < 0) value = -value;
      const hex = floathex(value);
      parts.push(hex.startsWith(".") ? "0" + hex.toLowerCase() : hex || "0");
    }
    return parts.concat("0", "0").join("").replace(/[.-]/g, "");
  }
  async function transactiondata() {
    if (transactionready) return transactionready;
    transactionready = (async () => {
    const response = await origfetch("/i/jf/", {credentials: "include", cache: "no-store"});
    if (!response.ok) throw new Error("request failed");
    const source = new DOMParser().parseFromString(await response.text(), "text/html");
    const key = source.querySelector("[name='twitter-site-verification']")?.getAttribute("content") || "";
    const runtime = [...source.querySelectorAll("script")].map(script => script.textContent || "").join("\n") + "\n" + source.documentElement.outerHTML;
    const match = /(\d+):\s*["']ondemand\.s["'][\s\S]*?\}\)\[e\]\s*\|\|\s*e\)\s*\+\s*["']\.["']\s*\+\s*\(\{[\s\S]*?\b\1:\s*["']([a-zA-Z0-9_-]+)["']/s.exec(runtime);
    if (!key || !match || !source.querySelector("[id^='loading-x-anim']")) throw new Error("transaction data unavailable");
    const ondemand = await origfetch("https://abs.twimg.com/responsive-web/client-web/ondemand.s." + match[2] + "a.js", {cache: "no-store"});
    if (!ondemand.ok) throw new Error("transaction data unavailable");
    const indices = [...(await ondemand.text()).matchAll(/\(\w\[(\d{1,2})\],\s*16\)/g)].map(item => Number(item[1]));
    if (indices.length < 2) throw new Error("transaction data unavailable");
    const keybytes = textbytes(key);
    return {keybytes, animationkey: animationkey(keybytes, indices[0], indices.slice(1), source)};
    })();
    try {return await transactionready}
    catch (error) {transactionready = null; throw error}
  }
  async function transactionid(path, method) {
    const transaction = await transactiondata();
    const now = Math.floor((Date.now() - 1682924400 * 1000) / 1000);
    const timebytes = [now & 255, now >> 8 & 255, now >> 16 & 255, now >> 24 & 255];
    const bytes = new Uint8Array(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(method.toUpperCase() + "!" + path + "!" + now + "obfiowerehiring" + transaction.animationkey)));
    const random = Math.floor(Math.random() * 256);
    return bytesbase64([random, ...transaction.keybytes, ...timebytes, ...bytes.slice(0, 16), 3].map(value => value ^ random));
  }
  const LISTMUTATIONS = {
    CreateList: "UQRa0jJ9doxGEIQRea1Y0w",
    ListAddMember: "zyA-tgY7gWLLGqg0hKS-2Q",
    ListRemoveMember: "B5tMzrMYuFHJex_4EXFTSw",
    UpdateList: "CToNDwmbHSq5tqV0ExBFeg",
    EditListBanner: "CChy7omMr21Rx5xgqzTDeA"
  };

  function listheaders(ct0, type) {
    const headers = {
      authorization: bearer || PUBBEARER,
      "x-csrf-token": ct0,
      "x-twitter-auth-type": "OAuth2Session",
      "x-twitter-active-user": "yes",
      "x-twitter-client-language": "en"
    };
    if (type) headers["content-type"] = type;
    return headers;
  }
  async function graphqlheaders(ct0, method, path, type) {
    const headers = listheaders(ct0, type);
    headers["x-client-transaction-id"] = await transactionid(path, method);
    return headers;
  }

  let webpackrequire = null;
  function findlistmodule() {
    if (!webpackrequire) {
      const chunks = window.webpackChunk_twitter_responsive_web;
      if (!chunks || typeof chunks.push !== "function") return null;
      chunks.push([["tumlistrefresh"], {}, value => {webpackrequire = value}]);
    }
    if (!webpackrequire || !webpackrequire.c) return null;
    for (const entry of Object.values(webpackrequire.c)) {
      const values = [entry && entry.exports, ...Object.values(entry && entry.exports || {})];
      for (const value of values) {
        if (value && value.namespace === "lists" && typeof value.fetchOne === "function") return value;
      }
    }
    return null;
  }
  function findlistcomponent(listid) {
    const wanted = String(listid);
    for (const element of document.querySelectorAll("*")) {
      for (const name of Object.keys(element)) {
        if (!name.startsWith("__reactFiber$")) continue;
        let fiber = element[name], depth = 0;
        while (fiber && depth++ < 80) {
          const component = fiber.stateNode;
          const timelineid = String(component && component.props && component.props.timelineId || "");
          const store = component && component.context && component.context.store;
          if (component && component._timelineAPI && timelineid.includes(wanted) && store && typeof store.dispatch === "function") return component;
          fiber = fiber.return;
        }
      }
    }
    return null;
  }
  function refreshcurrentlist(listid) {
    const route = /^\/i\/lists\/(\d+)/.exec(location.pathname);
    if (!route || route[1] !== String(listid)) return false;
    const component = findlistcomponent(listid);
    if (!component) return false;
    const requests = [];
    const listmodule = findlistmodule();
    if (listmodule) {
      try {requests.push(Promise.resolve(component.context.store.dispatch(listmodule.fetchOne(String(listid)))))} catch {}
    }
    try {requests.push(Promise.resolve(component._timelineAPI.fetchTop({requestContext: "REFRESH"})))} catch {}
    if (!requests.length) return false;
    Promise.allSettled(requests);
    return true;
  }
  window.addEventListener("message", event => {
    const request = event.data;
    if (event.source !== window || !request || request.__tumlistrefresh !== 1 || !request.id || !/^\d+$/.test(String(request.listid || ""))) return;
    Promise.resolve(refreshcurrentlist(request.listid)).then(ok => {
      window.postMessage({__tumlistrefreshresponse: 1, id: request.id, ok}, location.origin);
    }).catch(() => {
      window.postMessage({__tumlistrefreshresponse: 1, id: request.id, ok: false}, location.origin);
    });
  });

  window.addEventListener("message", async event => {
    const request = event.data;
    if (event.source !== window || !request || request.__tumgraphqlrequest !== 1) return;
    if (!request.id || !request.operation || !request.qid || !request.variables || typeof request.variables !== "object") return;
    let response = null, data = null, failure = "";
    try {
      const qid = qids[request.operation] || request.qid;
      const path = "/i/api/graphql/" + qid + "/" + request.operation;
      let url = path + "?variables=" + encodeURIComponent(JSON.stringify(request.variables));
      if (request.features) url += "&features=" + encodeURIComponent(request.features);
      if (request.fieldToggles) url += "&fieldToggles=" + encodeURIComponent(request.fieldToggles);
      const ct0 = (document.cookie.match(/ct0=([^;]+)/) || [])[1] || "";
      response = await origfetch(url, {
        credentials: "include",
        headers: await graphqlheaders(ct0, "GET", path)
      });
      try {data = await response.json()} catch {}
    } catch (error) {failure = error && error.message || "request failed"}
    window.postMessage({
      __tumgraphqlresponse: 1,
      id: request.id,
      ok: !!(response && response.ok),
      status: response ? response.status : 0,
      rateLimitReset: response && Number(response.headers.get("x-rate-limit-reset") || 0) ? Number(response.headers.get("x-rate-limit-reset")) * 1000 : response && Number(response.headers.get("retry-after") || 0) ? Date.now() + Number(response.headers.get("retry-after")) * 1000 : 0,
      data,
      error: failure || (!response ? "network" : "request failed")
    }, location.origin);
  });

  /*//////////////////////////////////////////////////////////////////////*/

  function richhistory() {
    for (const anchor of document.querySelectorAll("#react-root a[href]")) {
      const key = Object.keys(anchor).find(name => name.startsWith("__reactFiber"));
      for (let fiber = key && anchor[key]; fiber; fiber = fiber.return) {
        for (let dependency = fiber.dependencies && fiber.dependencies.firstContext; dependency; dependency = dependency.next) {
          const value = dependency.memoizedValue;
          if (value && value._id === "RichHistory" && typeof value.push === "function") return value;
        }
      }
    }
    return null;
  }

  window.addEventListener("message", event => {
    const request = event.data;
    if (event.source !== window || !request || request.__tumnavigate !== 1 || !request.id) return;
    const path = String(request.path || "");
    let ok = false;
    if (/^\/[A-Za-z0-9_]+$/.test(path) || /^\/i\/lists\/\d+$/.test(path)) {
      try {
        const history = richhistory();
        if (history) {history.push(path); ok = true}
      } catch {}
    }
    window.postMessage({__tumnavigateresponse: 1, id: request.id, ok}, location.origin);
  });

  async function uploadlistbanner(encoded, ct0) {
    if (typeof encoded !== "string" || !/^[A-Za-z0-9+/=]+$/.test(encoded)) throw new Error("invalid banner");
    const total = Math.floor(encoded.replace(/=+$/, "").length * 3 / 4);
    if (!total || total > 5 * 1024 * 1024) throw new Error("invalid banner size");
    const base = "/i/media/upload.json";
    const initurl = base + "?" + new URLSearchParams({command: "INIT", media_type: "image/png", media_category: "tweet_image", total_bytes: String(total)});
    const init = await origfetch(initurl, {method: "POST", credentials: "include", headers: listheaders(ct0)});
    const initdata = await init.json();
    const mediaid = initdata && initdata.media_id_string;
    if (!init.ok || !mediaid) throw new Error("banner init failed");

    const appendurl = base + "?" + new URLSearchParams({command: "APPEND", media_id: mediaid, segment_index: "0"});
    const append = await origfetch(appendurl, {
      method: "POST",
      credentials: "include",
      headers: listheaders(ct0, "application/x-www-form-urlencoded"),
      body: new URLSearchParams({media_data: encoded})
    });
    if (!append.ok) throw new Error("banner append failed");

    const finalizeurl = base + "?" + new URLSearchParams({command: "FINALIZE", media_id: mediaid});
    const finalize = await origfetch(finalizeurl, {method: "POST", credentials: "include", headers: listheaders(ct0)});
    const finalizedata = await finalize.json();
    if (!finalize.ok || finalizedata && finalizedata.error) throw new Error("banner finalize failed");
    return mediaid;
  }

  window.addEventListener("message", async event => {
    const request = event.data;
    if (event.source !== window || !request || request.__tumlistrequest !== 1) return;
    const queryId = LISTMUTATIONS[request.operation];
    const banner = request.operation === "UploadListBanner";
    if ((!queryId && !banner) || !request.id || !request.variables || typeof request.variables !== "object") return;
    let response = null, data = null;
    let failure = "";
    try {
      const ct0 = (document.cookie.match(/ct0=([^;]+)/) || [])[1] || "";
      if (banner) data = {mediaId: await uploadlistbanner(request.variables.data, ct0)};
      else {
        const path = "/i/api/graphql/" + (qids[request.operation] || queryId) + "/" + request.operation;
        response = await origfetch(path, {
          method: "POST",
          credentials: "include",
          headers: await graphqlheaders(ct0, "POST", path, "application/json"),
          body: JSON.stringify({variables: request.variables, features: request.features || {}, queryId: qids[request.operation] || queryId})
        });
        try {data = await response.json()} catch {}
      }
    } catch (error) {failure = error && error.message || "request failed"}
    const error = data && data.errors && data.errors[0] && data.errors[0].message;
    window.postMessage({
      __tumlistresponse: 1,
      id: request.id,
      ok: banner ? !!(data && data.mediaId) : !!(response && response.ok && data && data.data),
      status: response ? response.status : 0,
      data,
      error: error || failure || (!response ? "network" : "request failed")
    }, location.origin);
  });
  window.fetch = function (...args) {
    grabbearer(args[1]);
    try {learnqid((args[0] && args[0].url) || args[0])} catch {}
    return origfetch.apply(this, args).then(res => {
      try {
        const url = (args[0] && args[0].url) || args[0] || "";
        if (typeof url === "string" && /UserBy(?:ScreenName|RestId)/.test(url)) res.clone().text().then(relay).catch(() => {});
        else if (isnotifs(url) || isexplore(url)) res.clone().text().then(relaynotifs).catch(() => {});
      } catch {}
      return res;
    });
  };

  const origopen = XMLHttpRequest.prototype.open, origsend = XMLHttpRequest.prototype.send;
  XMLHttpRequest.prototype.open = function (m, u) {this.__tumurl = u; try {learnqid(u)} catch {} return origopen.apply(this, arguments)};
  XMLHttpRequest.prototype.send = function () {
    try {
      this.addEventListener("load", () => {
        try {
          if (/UserBy(?:ScreenName|RestId)/.test(String(this.__tumurl))) relay(this.responseText);
          else if (isnotifs(String(this.__tumurl)) || isexplore(String(this.__tumurl))) relaynotifs(this.responseText);
        } catch {}
      });
    } catch {}
    return origsend.apply(this, arguments);
  };
})();

(function () {
  "use strict";

  function profilebadges(result) {
    const badges = [];
    const legacy = result.legacy || {};
    const verification = result.verification || {};
    const bio = result.profile_bio || {};
    const verifiedtype = String(verification.verified_type || result.verified_type || legacy.verified_type || "").toLowerCase();
    if (/government/.test(verifiedtype)) badges.push("verifiedgovernment");
    else if (/business/.test(verifiedtype)) badges.push("verifiedbusiness");
    else if (result.is_blue_verified) badges.push("blue");
    else if (verification.verified || result.verified || legacy.verified) badges.push("verified");

    const translatorflags = [
      result.is_translator, result.translator_enabled, result.translator,
      result.is_translator_mod, legacy.is_translator, legacy.is_translator_mod,
      bio.is_translator, bio.is_translator_mod
    ];
    const translatorlabels = [
      result.translator_type, legacy.translator_type, bio.translator_type
    ].map(value => String(value || "").toLowerCase());
    const typedtranslator = translatorlabels.some(value => value && !/^(none|false|null|undefined)$/.test(value));
    const translatormod = translatorflags[3] === true || translatorflags[5] === true || translatorflags[7] === true ||
      translatorlabels.some(value => /mod|moderator|r-1cvl2hr/.test(value));
    if (translatorflags.some(value => value === true) || typedtranslator) badges.push(translatormod ? "translatormod" : "translator");

    const highlight = result.affiliates_highlighted_label;
    const label = highlight && (highlight.label || highlight);
    if (label && typeof label === "object") {
      const rawurl = label.url && (typeof label.url === "string" ? label.url : label.url.url);
      const match = /(?:x|twitter)\.com\/([A-Za-z0-9_]+)/i.exec(String(rawurl || "")) || /^\/?([A-Za-z0-9_]+)\/?$/.exec(String(rawurl || ""));
      const linkeduser = [label.user, highlight.user, label.user_results, highlight.user_results]
        .map(value => value && (value.user_results && value.user_results.result || value.result || value))
        .find(value => value && typeof value === "object");
      const handle = label.handle || label.screen_name || label.username ||
        linkeduser && (linkeduser.core && linkeduser.core.screen_name || linkeduser.legacy && linkeduser.legacy.screen_name || linkeduser.screen_name || linkeduser.username) ||
        match && match[1];
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
      blueVerified: !!u.is_blue_verified,
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

  function relay(text) {
    try {
      const j = JSON.parse(text);
      const u = j && j.data && j.data.user && j.data.user.result;
      const d = pick(u);
      if (d) {window.postMessage({__tumuser: 1, data: d}, location.origin); fetchabout(d.handle)}
    } catch {}
  }

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
      const url = "/i/api/graphql/" + aboutqid() + "/AboutAccountQuery?variables=" + encodeURIComponent(JSON.stringify({screenName: handle}));
      const r = await origfetch(url, {credentials: "include", headers: {
        authorization: bearer || PUBBEARER, "x-csrf-token": ct0, "x-twitter-auth-type": "OAuth2Session",
        "x-twitter-active-user": "yes", "x-twitter-client-language": "en"
      }});
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

  async function uploadlistbanner(encoded, ct0) {
    if (typeof encoded !== "string" || !/^[A-Za-z0-9+/=]+$/.test(encoded)) throw new Error("invalid banner");
    const total = Math.floor(encoded.replace(/=+$/, "").length * 3 / 4);
    if (!total || total > 5 * 1024 * 1024) throw new Error("invalid banner size");
    const base = "https://upload.twitter.com/i/media/upload.json";
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
        response = await origfetch("/i/api/graphql/" + queryId + "/" + request.operation, {
          method: "POST",
          credentials: "include",
          headers: listheaders(ct0, "application/json"),
          body: JSON.stringify({variables: request.variables, features: request.features || {}, queryId})
        });
        try {data = await response.json()} catch {}
      }
    } catch (error) {failure = error && error.message || "request failed"}
    const error = data && data.errors && data.errors[0] && data.errors[0].message;
    window.postMessage({
      __tumlistresponse: 1,
      id: request.id,
      ok: banner ? !!(data && data.mediaId) : !!(response && response.ok && data && data.data),
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
        if (typeof url === "string" && url.indexOf("UserByScreenName") >= 0) res.clone().text().then(relay).catch(() => {});
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
          if (String(this.__tumurl).indexOf("UserByScreenName") >= 0) relay(this.responseText);
          else if (isnotifs(String(this.__tumurl)) || isexplore(String(this.__tumurl))) relaynotifs(this.responseText);
        } catch {}
      });
    } catch {}
    return origsend.apply(this, arguments);
  };
})();

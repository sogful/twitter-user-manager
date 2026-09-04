(function () {
  "use strict";

  function pick(u) {
    if (!u || typeof u !== "object") return null;
    const core = u.core || {}, rel = u.relationship_counts || {}, tw = u.tweet_counts || {};
    const ver = u.verification || {}, priv = u.privacy || {}, legacy = u.legacy || {};
    const handle = core.screen_name || legacy.screen_name;
    if (!handle) return null;
    return {
      handle,
      restId: u.rest_id || null,
      createdAt: core.created_at || legacy.created_at || null,
      followers: rel.followers != null ? rel.followers : legacy.followers_count,
      following: rel.following != null ? rel.following : legacy.friends_count,
      tweets: tw.tweets != null ? tw.tweets : legacy.statuses_count,
      mediaTweets: tw.media_tweets != null ? tw.media_tweets : legacy.media_count,
      verifiedType: ver.verified_type || u.verified_type || null,
      blueVerified: !!u.is_blue_verified,
      isProtected: !!(priv.protected || legacy.protected),
      possiblySensitive: !!(u.possibly_sensitive != null ? u.possibly_sensitive : legacy.possibly_sensitive),
      withheld: (legacy.withheld_in_countries && legacy.withheld_in_countries.length ? legacy.withheld_in_countries : null) || u.withheld_in_countries || null,
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

  // notifications hand us pfp+username for avatars that carry no handle in the dom
  // (aggregated "A and 3 others" rows), so we harvest every user we can see and
  // ship a pfp-url -> handle map to the content side for dragging
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

  const origfetch = window.fetch;
  window.fetch = function (...args) {
    grabbearer(args[1]);
    try {learnqid((args[0] && args[0].url) || args[0])} catch {}
    return origfetch.apply(this, args).then(res => {
      try {
        const url = (args[0] && args[0].url) || args[0] || "";
        if (typeof url === "string" && url.indexOf("UserByScreenName") >= 0) res.clone().text().then(relay).catch(() => {});
        else if (isnotifs(url)) res.clone().text().then(relaynotifs).catch(() => {});
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
          else if (isnotifs(String(this.__tumurl))) relaynotifs(this.responseText);
        } catch {}
      });
    } catch {}
    return origsend.apply(this, arguments);
  };
})();

// runs in the MAIN world (see manifest world:"MAIN") so it can wrap the page's own fetch/XHR and
// read x.com's UserByScreenName graphql response - that's where the rich user fields live (id,
// exact counts, created_at, withheld countries, sensitivity, full-res avatar/banner). the fields
// migrated out of the old flat `legacy` object into core/relationship_counts/tweet_counts/etc, so
// this normalizes them, then hands the result to the isolated content script via postMessage
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
      // only present on withheld accounts - check every place it has lived
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

  // the "About this account" panel (the arrow off the join date -> /handle/about) has data the
  // profile response lacks: account-based-in country + whether it's accurate (the "possibly using
  // VPN" shield), what it's connected via, and the username-change count/date. that data comes from
  // its own AboutAccountQuery, which only fires on the /about page - so we replay it ourselves. the
  // request is a plain authed GET; we reuse twitter's own bearer (grabbed off its requests, else the
  // public web one) + the ct0 csrf cookie, and let credentials:include carry the session cookies
  const PUBBEARER = "Bearer AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA";
  const ABOUTQID = "TzOG2twZEfhr9KmClvVVqA"; // AboutAccountQuery id - stable, may need a bump on a big twitter deploy
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
      const url = "/i/api/graphql/" + ABOUTQID + "/AboutAccountQuery?variables=" + encodeURIComponent(JSON.stringify({screenName: handle}));
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

  const origfetch = window.fetch;
  window.fetch = function (...args) {
    grabbearer(args[1]);
    return origfetch.apply(this, args).then(res => {
      try {
        const url = (args[0] && args[0].url) || args[0] || "";
        if (typeof url === "string" && url.indexOf("UserByScreenName") >= 0) res.clone().text().then(relay).catch(() => {});
      } catch {}
      return res;
    });
  };

  const origopen = XMLHttpRequest.prototype.open, origsend = XMLHttpRequest.prototype.send;
  XMLHttpRequest.prototype.open = function (m, u) {this.__tumurl = u; return origopen.apply(this, arguments)};
  XMLHttpRequest.prototype.send = function () {
    try {
      this.addEventListener("load", () => {
        try {if (String(this.__tumurl).indexOf("UserByScreenName") >= 0) relay(this.responseText)} catch {}
      });
    } catch {}
    return origsend.apply(this, arguments);
  };
})();

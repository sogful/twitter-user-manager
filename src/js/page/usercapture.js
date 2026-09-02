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
      if (d) window.postMessage({__tumuser: 1, data: d}, location.origin);
    } catch {}
  }

  const origfetch = window.fetch;
  window.fetch = function (...args) {
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

(function () {
  "use strict";

  window.tum = window.tum || {};

  const HASCHROME = typeof chrome !== "undefined" && chrome.storage && chrome.storage.local;

  function accountid() {
    try {
      const m = document.cookie.match(/(?:^|;\s*)twid=([^;]+)/);
      if (m) {
        const dec = decodeURIComponent(m[1]);
        const im = dec.match(/u=?(\d+)/);
        if (im) return im[1];
        const dm = m[1].match(/(\d{5,})/);
        if (dm) return dm[1];
      }
    } catch {}
    return null;
  }
  function activehandle() {
    const switcher = document.querySelector('[data-testid="SideNav_AccountSwitcher_Button"]');
    const avatar = switcher && switcher.querySelector('[data-testid^="UserAvatar-Container-"]');
    const match = avatar && /UserAvatar-Container-([A-Za-z0-9_]+)$/.exec(avatar.getAttribute("data-testid") || "");
    return match ? match[1].toLowerCase() : null;
  }
  function delegatehandle() {
    const active = activehandle(), primary = savedprimary(ACCT);
    return active && primary && active !== primary ? active : null;
  }
  function sessionkey(id) {return "tum.primaryhandle." + id}
  function savedprimary(id) {
    try {return sessionStorage.getItem(sessionkey(id)) || null} catch {return null}
  }
  function saveprimary(id, handle) {
    try {sessionStorage.setItem(sessionkey(id), handle)} catch {}
  }
  function userhandle(obj) {
    if (!obj || typeof obj !== "object") return null;
    if (obj.core && obj.core.screen_name) return String(obj.core.screen_name).toLowerCase();
    if (obj.legacy && obj.legacy.screen_name) return String(obj.legacy.screen_name).toLowerCase();
    if (obj.screen_name) return String(obj.screen_name).toLowerCase();
    for (const value of Object.values(obj)) {
      const found = userhandle(value);
      if (found) return found;
    }
    return null;
  }
  let primaryloading = false;
  async function primaryhandle(id) {
    const saved = savedprimary(id);
    if (saved || primaryloading) return saved;
    primaryloading = true;
    const ct0 = (document.cookie.match(/ct0=([^;]+)/) || [])[1] || "";
	// https://news.ycombinator.com/item?id=35549764
    const bearer = "Bearer AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA";
    const features = '{"hidden_profile_subscriptions_enabled":true,"profile_label_improvements_pcf_label_in_post_enabled":true,"responsive_web_profile_redirect_enabled":true,"rweb_tipjar_consumption_enabled":false,"verified_phone_label_enabled":false,"subscriptions_verification_info_is_identity_verified_enabled":true,"subscriptions_verification_info_verified_since_enabled":true,"highlights_tweets_tab_ui_enabled":true,"responsive_web_twitter_article_notes_tab_enabled":true,"subscriptions_feature_can_gift_premium":true,"creator_subscriptions_tweet_preview_api_enabled":true,"responsive_web_graphql_timeline_navigation_enabled":true}';
    const variables = {userId: id, withGrokTranslatedBio: true};
    const url = "/i/api/graphql/VQfQ9wwYdk6j_u2O4vt64Q/UserByRestId?variables=" + encodeURIComponent(JSON.stringify(variables)) + "&features=" + encodeURIComponent(features) + "&fieldToggles=" + encodeURIComponent('{"withPayments":false,"withAuxiliaryUserLabels":true}');
    try {
      const response = await fetch(url, {credentials: "include", headers: {
        authorization: bearer, "x-csrf-token": ct0, "x-twitter-auth-type": "OAuth2Session",
        "x-twitter-active-user": "yes", "x-twitter-client-language": "en"
      }});
      if (!response.ok) return null;
      const handle = userhandle(await response.json());
      if (handle) {
        saveprimary(id, handle);
        checkaccount();
      }
      return handle;
    } catch {return null} finally {primaryloading = false}
  }

  const ACCT = accountid();
  const DELEGATE = delegatehandle();
  window.tum.accountid = ACCT;
  window.tum.accountprofile = DELEGATE || ACCT;
  const NS = ACCT ? "a" + ACCT + (DELEGATE ? ".d" + DELEGATE : "") + "." : "";
  let currentscope = NS;

  function scopestring(id, active, primary) {
    if (!id) return "";
    const delegate = active && primary && active !== primary ? ".d" + active : "";
    return "a" + id + delegate + ".";
  }
  function checkaccount() {
    const id = accountid();
    const active = activehandle();
    const primary = savedprimary(id);
    if (!primary && id) primaryhandle(id);
    if (!id || !active) return;
    const scope = scopestring(id, active, primary);
    if (scope === currentscope) return;
    currentscope = scope;
    window.tum.accountid = id;
    window.tum.accountprofile = primary && active !== primary ? active : id;
    window.dispatchEvent(new CustomEvent("tumaccountchange"));
  }

  /*//////////////////////////////////////////////////////////////////////*/

  const MIGKEY = "tum.migrated.v2";
  const LEGACY = ["tum.folders", "tum.unsorted"];
  if (NS) {
    if (HASCHROME) {
      chrome.storage.local.get([MIGKEY, ...LEGACY, ...LEGACY.map(k => NS + k)], r => {
        void chrome.runtime.lastError;
        if (!r || r[MIGKEY]) return;
        const writes = {[MIGKEY]: true};
        for (const k of LEGACY) if (r[k] != null && r[NS + k] == null) writes[NS + k] = r[k];
        chrome.storage.local.set(writes, () => void chrome.runtime.lastError);
      });
    } else {
      try {
        if (!localStorage.getItem(MIGKEY)) {
          for (const k of LEGACY) {
            const old = localStorage.getItem(k);
            if (old != null && localStorage.getItem(NS + k) == null) localStorage.setItem(NS + k, old);
          }
          localStorage.setItem(MIGKEY, "1");
        }
      } catch {}
    }
  }

  setInterval(checkaccount, 1000);

  /*//////////////////////////////////////////////////////////////////////*/

  function create(key, opts) {
    function storagekey() {return opts && opts.global ? key : currentscope + key}
    const listeners = new Set();
    function notify(v) {for (const cb of listeners) try {cb(v)} catch {}}

    function get() {
      return new Promise(res => {
        const rk = storagekey();
        if (HASCHROME) {
          chrome.storage.local.get([rk], r => {void chrome.runtime.lastError; res(r && r[rk] || null)});
        } else {
          let v = null;
          try {v = JSON.parse(localStorage.getItem(rk) || "null")} catch {}
          res(v);
        }
      });
    }

    function set(value) {
      return new Promise(res => {
        const rk = storagekey();
        if (HASCHROME) {
          chrome.storage.local.set({[rk]: value}, () => {void chrome.runtime.lastError; res()});
        } else {
          try {localStorage.setItem(rk, JSON.stringify(value))} catch {}
          res();
        }
      });
    }

    if (HASCHROME) {
      chrome.storage.onChanged.addListener((changes, area) => {
        const rk = storagekey();
        if (area === "local" && changes[rk]) notify(changes[rk].newValue);
      });
    } else {
      window.addEventListener("storage", e => {
        const rk = storagekey();
        if (e.key !== rk) return;
        let v = null;
        try {v = JSON.parse(e.newValue || "null")} catch {}
        notify(v);
      });
    }

    return {get, set, subscribe: cb => {listeners.add(cb); return () => listeners.delete(cb)}};
  }

  window.tum.storage = create("tum.folders");
  window.tum.storage.create = create;
})();

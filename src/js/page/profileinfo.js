(function () {
  "use strict";

  window.tum = window.tum || {};

  // extra detail on a profile beyond the sorting side of the extension. an email pulled from the
  // breach-data lookup and a numeric id are dropped in as their own items alongside twitter's own
  // ones (location / link / joined); the richer stats (full join date + age, exact follow counts,
  // posts/day, full-res pfp/banner) are woven into the native spots they belong next to. only the
  // handful with no native home (sensitivity/protected/withheld flags, rename history) live in a
  // small appended block. the breach email fetch runs in the service worker (background.js) to
  // dodge x.com's connect-src csp; the rich user fields come from usercapture.js (main world)
  const PROFILEPATH = /^\/([A-Za-z0-9_]+)\/?$/;
  const SKIP = /^\/(i|home|explore|search|notifications|messages|settings|compose)\/?$/i;
  const ITEMSSEL = '[data-testid="UserProfileHeader_Items"]';
  // outlined envelope (material "mail_outline") - fill:currentColor draws it as an outline so it
  // matches twitter's own fill-based item icons rather than looking like a solid block
  const MAILPATH = "M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8l8 5 8-5v10zm0-12l-8 5-8-5h16z";
  // material "tag" (#) - reads as an identifier next to the numeric id
  const TAGPATH = "M20 10V8h-4V4h-2v4h-4V4H8v4H4v2h4v4H4v2h4v4h2v-4h4v4h2v-4h4v-2h-4v-4h4zm-6 4h-4v-4h4v4z";
  // material "history" (clock with a back-arrow) - for the previous-@handles entry
  const HISTORYPATH = "M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z";
  // material "warning" triangle - for the sensitivity/protected/withheld flags (drawn red)
  const WARNPATH = "M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z";
  // twitter's own ui font, so our injected pills/labels match rather than falling back to serif
  const CHIRP = '"TwitterChirp",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif';

  // one shared toast for the whole extension - the overlay's twitter-recreation bottom toast
  function pagetoast(msg) {try {tum.overlay.toast(msg)} catch {}}

  // execCommand is synchronous inside the click gesture (the async clipboard api can hang while
  // the tab isn't focused); fall back to it for the odd browser that still needs it
  function copytext(text) {
    try {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.cssText = "position:fixed;top:-1000px;left:-1000px;opacity:0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    } catch {}
    try {if (navigator.clipboard) navigator.clipboard.writeText(text)} catch {}
  }

  const cache = new Map(); // handle (lowercased) -> email | null (looked up, none) | undefined (unknown)

  function currenthandle() {
    const m = PROFILEPATH.exec(location.pathname);
    if (!m || SKIP.test(location.pathname)) return null;
    return m[1];
  }

  /*//////////////////////////////////////////////////////////////////////*/
  // items-row entries (email, id): clone one of twitter's own gray info items so we inherit its
  // exact color, size, padding and alignment, then swap the icon glyph + text. cloning the join
  // date / location (never the blue url link) keeps the gray - a hand-rolled node picked up the
  // url's blue and clipped long values

  function cloneditem(template, iconpath, cls) {
    const node = template.cloneNode(true);
    node.removeAttribute("data-testid");
    node.removeAttribute("href"); // don't navigate on click - we handle it (copy)
    node.removeAttribute("role");
    node.classList.add(cls);
    node.style.overflow = "visible"; // never clip the value
    node.querySelectorAll("svg").forEach((s, i) => {
      if (i === 0) s.innerHTML = '<g><path d="' + iconpath + '"></path></g>';
      else s.remove(); // drop the chevron/secondary icons
    });
    return node;
  }
  // put the value into the first non-empty leaf text span, blank any others
  function setleaf(node, text) {
    const leaves = [...node.querySelectorAll("span")].filter(s => s.children.length === 0);
    let set = false;
    for (const s of leaves) {
      if ((s.textContent || "").trim() === "") continue;
      if (!set) {s.textContent = text; s.style.overflow = "visible"; s.style.textOverflow = "clip"; set = true}
      else s.textContent = "";
    }
    if (!set) node.appendChild(document.createTextNode(text));
  }
  function copyitem(node, value, tip) {
    node.style.cursor = "pointer";
    node.title = tip;
    node.addEventListener("click", e => {
      e.preventDefault();
      e.stopPropagation();
      // don't swap the text in place - a longer value would reflow onto the previous line. show
      // the confirmation in the twitter-style bottom toast instead
      copytext(value);
      pagetoast("Copied " + value);
    });
  }
  function template(items) {
    return items.querySelector('[data-testid="UserJoinDate"]') || items.querySelector('[data-testid="UserLocation"]');
  }

  function injectemail(items, handle) {
    const email = cache.get(handle.toLowerCase());
    const existing = items.querySelector(".tumemailitem");
    if (!email) {if (existing) existing.remove(); return}
    if (existing && existing.dataset.handle === handle) return;
    if (existing) existing.remove();
    const tpl = template(items);
    if (!tpl) return;
    const item = cloneditem(tpl, MAILPATH, "tumemailitem");
    setleaf(item, email);
    copyitem(item, email, "email from breach data - click to copy");
    item.dataset.handle = handle;
    items.appendChild(item);
  }

  function injectid(items, handle, id) {
    const existing = items.querySelector(".tumiditem");
    if (!id) {if (existing) existing.remove(); return}
    if (existing && existing.dataset.id === String(id)) return;
    if (existing) existing.remove();
    const tpl = template(items);
    if (!tpl) return;
    const item = cloneditem(tpl, TAGPATH, "tumiditem");
    setleaf(item, "ID: " + id);
    copyitem(item, String(id), "user id - click to copy");
    item.dataset.id = String(id);
    // keep it right after twitter's own items, before our email
    const email = items.querySelector(".tumemailitem");
    if (email) items.insertBefore(item, email);
    else items.appendChild(item);
  }

  /*//////////////////////////////////////////////////////////////////////*/
  // rich fields off x.com's own UserByScreenName (captured in the main world by usercapture.js and
  // posted here) plus a memory.lol lookup for the id + rename history

  const userdata = new Map(); // handle (lc) -> normalized UserByScreenName fields
  const memcache = new Map(); // handle (lc) -> {id, names} | null (requested/none)

  function fmtnum(n) {return typeof n === "number" ? n.toLocaleString("en-US") : n}
  function parsetwdate(s) {const d = new Date(s); return isNaN(d) ? null : d}
  function agestr(d) {
    let months = (Date.now() - d.getTime()) / (1000 * 60 * 60 * 24 * 30.4375);
    const y = Math.floor(months / 12), m = Math.floor(months % 12);
    return (y ? y + "y " : "") + m + "m";
  }
  function perday(u) {
    const d = parsetwdate(u.createdAt);
    if (!d || typeof u.tweets !== "number") return null;
    const days = Math.max(1, (Date.now() - d.getTime()) / 86400000);
    return (u.tweets / days).toFixed(1);
  }
  function fullres(url) {return (url || "").replace(/_(normal|bigger|mini|(\d+)x(\d+))\.(jpg|jpeg|png|webp|gif)$/i, ".$4")}

  // full join date + account age, rewritten into twitter's own "Joined December 2007" span (we
  // have the exact created_at, twitter only renders month+year). idempotent via the "·" marker
  function applyjoin(items, u) {
    const d = parsetwdate(u.createdAt);
    if (!d) return;
    const join = items.querySelector('[data-testid="UserJoinDate"]');
    if (!join) return;
    const leaf = [...join.querySelectorAll("span")].filter(s => s.children.length === 0).find(s => /joined/i.test(s.textContent || ""));
    if (!leaf || leaf.textContent.indexOf("·") >= 0) return;
    const date = d.toLocaleDateString("en-GB", {day: "numeric", month: "long", year: "numeric"});
    leaf.textContent = "Joined " + date + " · " + agestr(d) + " old";
  }

  // exact follow counts written straight into twitter's own visible count (it renders "92.3M";
  // we swap in "92,379,840"). idempotent - the exact form has commas, so skip once it's applied
  function applycounts(handle, u) {
    const set = (sel, n) => {
      if (typeof n !== "number") return;
      const exact = fmtnum(n);
      document.querySelectorAll(sel).forEach(a => {
        const leaf = [...a.querySelectorAll("span")].find(s => !s.children.length && /^[\d.,]+[KMB]?$/i.test((s.textContent || "").trim()));
        if (leaf && leaf.textContent.trim() !== exact) leaf.textContent = exact;
      });
    };
    set('a[href$="/' + handle + '/verified_followers"], a[href$="/' + handle + '/followers"]', u.followers);
    set('a[href$="/' + handle + '/following"]', u.following);
  }

  // posts/day appended inside twitter's sticky-header "74.2K posts" count (a child span, so react's
  // text update to the count leaves it be; re-added by the next scan if a route change wipes it)
  function applyperday(u) {
    const pd = perday(u);
    if (!pd) return;
    const el = [...document.querySelectorAll('[data-testid="primaryColumn"] div')].find(d => d.children.length === 0 && /^[\d.,KMB]+\s+posts$/i.test((d.textContent || "").trim()));
    if (!el || el.querySelector(".tumperday")) return;
    const s = document.createElement("span");
    s.className = "tumperday";
    s.textContent = " (" + pd + "/day)";
    s.style.cssText = "opacity:.45";
    el.appendChild(s);
  }

  // small "HD" pill at the bottom-right of the banner and the avatar, opening the full-res image
  // in a new tab. appended as an extra (untracked) child of twitter's own relative-positioned
  // containers so absolute positioning is anchored to them
  function hdbutton(href) {
    const a = document.createElement("a");
    a.className = "tumhd";
    a.textContent = "HD";
    a.href = href; a.target = "_blank"; a.rel = "noopener";
    a.title = "open full-res in a new tab";
    a.style.cssText = "position:absolute;bottom:8px;right:8px;z-index:3;display:flex;align-items:center;" +
      "height:18px;padding:0 6px;border-radius:9px;background:rgba(0,0,0,0.6);color:#fff;" +
      "font-family:" + CHIRP + ";font-size:10px;font-weight:700;line-height:1;letter-spacing:.02em;" +
      "cursor:pointer;text-decoration:none;backdrop-filter:blur(4px);opacity:0;transition:opacity .15s,background .12s";
    a.addEventListener("mouseenter", () => {a.style.background = "rgba(0,0,0,0.82)"});
    a.addEventListener("mouseleave", () => {a.style.background = "rgba(0,0,0,0.6)"});
    // stop the click bubbling to twitter's own /photo|/header_photo link (which would navigate)
    a.addEventListener("click", e => {e.stopPropagation()});
    return a;
  }
  // the pill fades in only while its own image (banner / avatar) is hovered - a css :hover rule
  // rather than js listeners (survives twitter re-rendering the container, no rebinding needed)
  let styleadded = false;
  function ensurehdstyle() {
    if (styleadded) return;
    styleadded = true;
    const s = document.createElement("style");
    // !important because the pill carries an inline opacity:0 that a plain rule can't outrank
    s.textContent = 'a[href*="/header_photo"]:hover .tumhd,[data-testid^="UserAvatar-Container-"]:hover .tumhd{opacity:1!important}';
    document.head.appendChild(s);
  }
  function applyhd(handle, u) {
    ensurehdstyle();
    if (u.banner) {
      const banner = document.querySelector('a[href$="/' + handle + '/header_photo"]');
      if (banner && !banner.querySelector(":scope > .tumhd")) {
        if (getComputedStyle(banner).position === "static") banner.style.position = "relative";
        banner.appendChild(hdbutton(u.banner));
      }
    }
    if (u.avatar) {
      // the profile avatar is the largest UserAvatar-Container for this handle (the sticky-header
      // and tweet ones are smaller)
      const avs = [...document.querySelectorAll('[data-testid="UserAvatar-Container-' + handle + '"]')];
      const big = avs.map(a => [a, a.getBoundingClientRect().width]).sort((x, y) => y[1] - x[1])[0];
      if (big && big[1] > 80) {
        const av = big[0];
        if (!av.querySelector(":scope > .tumhd")) {
          if (getComputedStyle(av).position === "static") av.style.position = "relative";
          // nudge inward so it rides the circle's lower-right edge rather than the empty corner
          const b = hdbutton(fullres(u.avatar));
          b.style.bottom = "10px"; b.style.right = "10px";
          av.appendChild(b);
        }
      }
    }
  }

  // previous @handles (memory.lol), as its own items-row entry with a history icon so it inherits
  // twitter's item styling instead of rendering as bare serif text. the list can be long, so its
  // text is allowed to wrap under the icon
  function injecthistory(items, handle) {
    const key = handle.toLowerCase();
    const mem = memcache.get(key);
    const existing = items.querySelector(".tumhistoryitem");
    const others = mem && mem.names ? mem.names.filter(n => n.name.toLowerCase() !== key) : [];
    if (!others.length) {if (existing) existing.remove(); return}
    const text = others.map(n => "@" + n.name + (n.from ? " (" + n.from.slice(0, 4) + (n.to ? "-" + n.to.slice(0, 4) : "") + ")" : "")).join(", ");
    if (existing && existing.dataset.val === text) return;
    if (existing) existing.remove();
    const tpl = template(items);
    if (!tpl) return;
    const item = cloneditem(tpl, HISTORYPATH, "tumhistoryitem");
    setleaf(item, "Formerly " + text);
    item.querySelectorAll("span").forEach(s => {if (!s.children.length) s.style.whiteSpace = "normal"});
    item.dataset.val = text;
    item.title = "previous @handles (memory.lol)";
    items.appendChild(item);
  }

  // sensitivity / protected / withheld flags, as a red items-row entry with a warning icon
  function injectflags(items, handle) {
    const u = userdata.get(handle.toLowerCase());
    const existing = items.querySelector(".tumflagsitem");
    const flags = [];
    if (u) {
      if (u.possiblySensitive) flags.push("possibly sensitive");
      if (u.isProtected) flags.push("protected");
      if (u.withheld && u.withheld.length) flags.push("withheld in " + u.withheld.join(", "));
    }
    if (!flags.length) {if (existing) existing.remove(); return}
    const text = flags.join(" · ");
    if (existing && existing.dataset.val === text) return;
    if (existing) existing.remove();
    const tpl = template(items);
    if (!tpl) return;
    const item = cloneditem(tpl, WARNPATH, "tumflagsitem");
    setleaf(item, text);
    item.style.color = "#f4212e"; // icon is fill:currentColor, so this reds it too
    item.querySelectorAll("span").forEach(s => {if (!s.children.length) s.style.color = "#f4212e"});
    item.dataset.val = text;
    items.appendChild(item);
  }

  function scan() {
    const handle = currenthandle();
    const items = document.querySelector(ITEMSSEL);
    if (!handle || !items) return;
    const key = handle.toLowerCase();
    if (!cache.has(key)) {
      cache.set(key, null); // mark requested so we don't fire twice while it's in flight
      try {
        chrome.runtime.sendMessage({type: "tumemail", handle}, resp => {
          void chrome.runtime.lastError;
          cache.set(key, resp && resp.email ? resp.email : null);
          schedule();
        });
      } catch {}
    }
    if (!memcache.has(key)) {
      memcache.set(key, null);
      try {
        chrome.runtime.sendMessage({type: "tummemorylol", handle}, resp => {
          void chrome.runtime.lastError;
          memcache.set(key, resp && resp.id ? resp : null);
          schedule();
        });
      } catch {}
    }
    const u = userdata.get(key), mem = memcache.get(key);
    injectemail(items, handle);
    injectid(items, handle, (u && u.restId) || (mem && mem.id));
    if (u) {
      applyjoin(items, u);
      applycounts(handle, u);
      applyperday(u);
      applyhd(handle, u);
    }
    injecthistory(items, handle);
    injectflags(items, handle);
  }

  // setTimeout, not rAF (rAF pauses on a backgrounded tab); mirrors badges.js/suggest.js
  let scheduled = 0;
  function schedule() {
    if (scheduled) return;
    scheduled = setTimeout(() => {scheduled = 0; scan()}, 120);
  }

  window.tum.profileinfo = {
    init() {
      // usercapture.js (main world) posts the UserByScreenName fields here as they load
      window.addEventListener("message", e => {
        if (e.source !== window || !e.data || !e.data.__tumuser || !e.data.data || !e.data.data.handle) return;
        userdata.set(e.data.data.handle.toLowerCase(), e.data.data);
        schedule();
      });
      new MutationObserver(schedule).observe(document.body, {childList: true, subtree: true});
      schedule();
    }
  };
})();

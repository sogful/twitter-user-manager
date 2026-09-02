(function () {
  "use strict";

  window.tum = window.tum || {};

  // extra detail on a profile beyond the sorting side of the extension: an email pulled from the
  // breach-data lookup, dropped in alongside twitter's own profile items (location / link / joined)
  // under the bio. the fetch itself happens in the service worker (see background.js) to dodge
  // x.com's connect-src csp; here we just ask for it and render the result
  const PROFILEPATH = /^\/([A-Za-z0-9_]+)\/?$/;
  const SKIP = /^\/(i|home|explore|search|notifications|messages|settings|compose)\/?$/i;
  const ITEMSSEL = '[data-testid="UserProfileHeader_Items"]';
  // outlined envelope (material icons "mail_outline") - fill:currentColor draws it as an outline,
  // so it still matches twitter's own fill-based item icons rather than looking like a solid block
  const MAILPATH = "M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8l8 5 8-5v10zm0-12l-8 5-8-5h16z";

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

  // clone one of twitter's own gray info items (join date / location - never the blue url link)
  // so the email inherits its exact color, size, padding and alignment, then swap the icon glyph
  // and text and strip any extra bits (the join-date "expand" chevron, etc). the previous hand
  // rolled element picked up the url link's blue and clipped long emails with overflow:hidden
  function makeitem(template, email) {
    const node = template.cloneNode(true);
    node.removeAttribute("data-testid");
    // the join-date item is an <a> to /<user>/about - strip anything that would navigate so a
    // click just copies instead of jumping to that page
    node.removeAttribute("href");
    node.removeAttribute("role");
    node.classList.add("tumemailitem");
    node.style.overflow = "visible"; // never clip the address
    const svgs = node.querySelectorAll("svg");
    svgs.forEach((s, i) => {
      if (i === 0) s.innerHTML = '<g><path d="' + MAILPATH + '"></path></g>';
      else s.remove(); // drop the chevron/secondary icons
    });
    // put the email into the first non-empty leaf text span, blank any others
    const leaves = [...node.querySelectorAll("span")].filter(s => s.children.length === 0);
    let set = false;
    for (const s of leaves) {
      if ((s.textContent || "").trim() === "") continue;
      if (!set) {s.textContent = email; s.style.overflow = "visible"; s.style.textOverflow = "clip"; set = true}
      else s.textContent = "";
    }
    if (!set) node.appendChild(document.createTextNode(email));
    node.style.cursor = "pointer";
    node.title = "email from breach data - click to copy";
    node.addEventListener("click", e => {
      e.preventDefault();
      e.stopPropagation();
      // don't swap the text in place - a longer email would reflow onto the previous line. show
      // the confirmation in the twitter-style bottom toast instead
      copytext(email);
      pagetoast("Copied " + email);
    });
    return node;
  }

  function inject(items, handle) {
    const email = cache.get(handle.toLowerCase());
    const existing = items.querySelector(".tumemailitem");
    if (!email) {if (existing) existing.remove(); return}
    if (existing && existing.dataset.handle === handle) return;
    if (existing) existing.remove();
    // clone a gray sibling (join date, else location) - not the url link, which is blue
    const template = items.querySelector('[data-testid="UserJoinDate"]') || items.querySelector('[data-testid="UserLocation"]');
    if (!template) return;
    const item = makeitem(template, email);
    item.dataset.handle = handle;
    items.appendChild(item);
  }

  /*//////////////////////////////////////////////////////////////////////*/
  // extra user detail: the rich fields off x.com's own UserByScreenName (captured in the main
  // world by usercapture.js and posted here) plus a memory.lol lookup for the id + rename history,
  // rendered as a compact block under the profile items. everything here is opt-in info the user
  // picked; nothing that isn't available is shown

  const userdata = new Map(); // handle (lc) -> normalized UserByScreenName fields
  const memcache = new Map(); // handle (lc) -> {id, names} | null (requested/none)

  function fmtnum(n) {return typeof n === "number" ? n.toLocaleString("en-US") : n}
  function parsetwdate(s) {const d = new Date(s); return isNaN(d) ? null : d}
  function agestr(d) {
    let months = (Date.now() - d.getTime()) / (1000 * 60 * 60 * 24 * 30.4375);
    const y = Math.floor(months / 12), m = Math.floor(months % 12);
    return (y ? y + "y " : "") + m + "m";
  }
  function joinedline(u) {
    const d = parsetwdate(u.createdAt);
    if (!d) return null;
    const date = d.toLocaleDateString("en-GB", {day: "numeric", month: "short", year: "numeric"});
    let s = "Joined " + date + " · " + agestr(d);
    if (typeof u.tweets === "number") {
      const days = Math.max(1, (Date.now() - d.getTime()) / 86400000);
      s += " · " + (u.tweets / days).toFixed(1) + " posts/day";
    }
    return s;
  }
  function fullres(url) {return (url || "").replace(/_(normal|bigger|mini|(\d+)x(\d+))\.(jpg|jpeg|png|webp|gif)$/i, ".$4")}

  function row(gray) {
    const d = document.createElement("div");
    d.style.cssText = "display:flex;align-items:center;flex-wrap:wrap;gap:6px;color:" + gray + ";font-size:14px;line-height:1.4;margin-top:2px";
    return d;
  }
  function copyspan(label, value, gray) {
    const s = document.createElement("span");
    s.textContent = label + value;
    s.title = "click to copy";
    s.style.cssText = "cursor:pointer";
    s.addEventListener("click", e => {e.preventDefault(); e.stopPropagation(); copytext(value); pagetoast("Copied " + value)});
    return s;
  }
  function linkspan(text, href, gray) {
    const a = document.createElement("a");
    a.textContent = text; a.href = href; a.target = "_blank"; a.rel = "noopener";
    a.style.cssText = "color:#1d9bf0;text-decoration:none";
    return a;
  }

  function buildextra(items, handle) {
    const key = handle.toLowerCase();
    const u = userdata.get(key), mem = memcache.get(key);
    let box = document.querySelector(".tumextrainfo");
    if (!u && !(mem && mem.names)) {if (box) box.remove(); return}
    if (box && box.dataset.handle === handle) return; // already built for this profile
    if (box) box.remove();
    const cs = getComputedStyle(items);
    const gray = cs.color, font = cs.fontSize;
    box = document.createElement("div");
    box.className = "tumextrainfo";
    box.dataset.handle = handle;
    box.style.cssText = "margin-top:8px;font-family:inherit;font-size:" + font + ";color:" + gray;

    const id = (u && u.restId) || (mem && mem.id);
    if (id) {const r = row(gray); r.appendChild(copyspan("ID: ", id, gray)); box.appendChild(r)}
    if (u) {
      const jl = joinedline(u);
      if (jl) {const r = row(gray); r.textContent = jl; box.appendChild(r)}
      if (typeof u.followers === "number") {
        const r = row(gray);
        r.textContent = fmtnum(u.followers) + " followers · " + fmtnum(u.following) + " following · " + fmtnum(u.tweets) + " posts";
        box.appendChild(r);
      }
      const flags = [];
      if (u.possiblySensitive) flags.push("possibly sensitive");
      if (u.isProtected) flags.push("protected");
      if (u.withheld && u.withheld.length) flags.push("withheld in " + u.withheld.join(", "));
      if (flags.length) {const r = row("#f4212e"); r.textContent = flags.join(" · "); box.appendChild(r)}
    }
    // rename history (memory.lol) - only when there's more than the current handle
    if (mem && mem.names && mem.names.length) {
      const others = mem.names.filter(n => n.name.toLowerCase() !== key);
      if (others.length) {
        const r = row(gray);
        r.textContent = "formerly " + others.map(n => "@" + n.name + (n.from ? " (" + n.from.slice(0, 4) + (n.to ? "-" + n.to.slice(0, 4) : "") + ")" : "")).join(", ");
        box.appendChild(r);
      }
    }
    if (u && (u.avatar || u.banner)) {
      const r = row(gray);
      if (u.avatar) r.appendChild(linkspan("full-res pfp", fullres(u.avatar), gray));
      if (u.avatar && u.banner) {const sep = document.createElement("span"); sep.textContent = "·"; r.appendChild(sep)}
      if (u.banner) r.appendChild(linkspan("banner", u.banner, gray));
      box.appendChild(r);
    }
    if (box.children.length) items.parentNode.insertBefore(box, items.nextSibling);
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
          forcerebuild();
          schedule();
        });
      } catch {}
    }
    inject(items, handle);
    buildextra(items, handle);
  }

  // captured/looked-up data can arrive after the block was already built for this profile - drop
  // the "already built" guard so the next scan re-renders with the new fields
  function forcerebuild() {const b = document.querySelector(".tumextrainfo"); if (b) b.dataset.handle = ""}

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
        const d = e.data.data;
        userdata.set(d.handle.toLowerCase(), d);
        forcerebuild();
        schedule();
      });
      new MutationObserver(schedule).observe(document.body, {childList: true, subtree: true});
      schedule();
    }
  };
})();

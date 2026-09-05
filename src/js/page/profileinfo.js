(function () {
  "use strict";

  window.tum = window.tum || {};

  const PROFILEPATH = /^\/([A-Za-z0-9_]+)\/?$/;
  const SKIP = /^\/(i|home|explore|search|notifications|messages|settings|compose)\/?$/i;
  const ITEMSSEL = '[data-testid="UserProfileHeader_Items"]';

  const MAILPATH = "M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8l8 5 8-5v10zm0-12l-8 5-8-5h16z";
  const TAGPATH = "M20 10V8h-4V4h-2v4h-4V4H8v4H4v2h4v4H4v2h4v4h2v-4h4v4h2v-4h4v-2h-4v-4h4zm-6 4h-4v-4h4v4z";
  const WARNPATH = "M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z";
  const GLOBEPATH = "M12.25 2C6.59 2 2 6.59 2 12.25S6.59 22.5 12.25 22.5 22.5 17.91 22.5 12.25 17.91 2 12.25 2zM9.13 4.61c-.1.21-.2.44-.29.66-.62 1.6-1.01 3.69-1.08 5.98h-3.7c.36-3.01 2.35-5.53 5.07-6.64zm-5.07 8.64h3.72c.11 2.09.49 4 1.06 5.48.18.46.39.89.62 1.29-2.88-1.04-5.02-3.63-5.4-6.77zM13.79 18c-.29.75-.61 1.28-.91 1.62-.31.33-.52.38-.63.38-.11 0-.32-.05-.63-.38-.3-.34-.62-.87-.91-1.62-.48-1.22-.82-2.87-.92-4.75h4.92c-.1 1.88-.44 3.53-.92 4.75zm-4.03-6.75c.07-2.09.43-3.92.95-5.25.29-.75.61-1.28.91-1.62.31-.33.52-.38.63-.38.11 0 .32.05.63.38.3.34.62.87.91 1.62.52 1.33.88 3.16.95 5.25H9.76zm5.28 8.77c.23-.4.44-.83.62-1.29.57-1.48.95-3.39 1.06-5.48h3.72c-.38 3.14-2.52 5.73-5.4 6.77zm1.7-8.77c-.07-2.29-.46-4.38-1.08-5.98-.09-.22-.19-.45-.29-.66 2.72 1.11 4.71 3.63 5.07 6.64h-3.7z";
  const CHANGESPATH = "M12 3.786c-4.556 0-8.25 3.694-8.25 8.25s3.694 8.25 8.25 8.25c1.595 0 3.081-.451 4.341-1.233l1.054 1.7c-1.568.972-3.418 1.534-5.395 1.534-5.661 0-10.25-4.589-10.25-10.25S6.339 1.786 12 1.786s10.25 4.589 10.25 10.25c0 .901-.21 1.77-.452 2.477-.592 1.731-2.343 2.477-3.917 2.334-1.242-.113-2.307-.74-3.013-1.647-.961 1.253-2.45 2.011-4.092 1.78-2.581-.363-4.127-2.971-3.76-5.578.366-2.606 2.571-4.688 5.152-4.325 1.019.143 1.877.637 2.519 1.342l1.803.258-.507 3.549c-.187 1.31.761 2.509 2.079 2.629.915.083 1.627-.356 1.843-.99.2-.585.345-1.224.345-1.83 0-4.556-3.694-8.25-8.25-8.25zm-.111 5.274c-1.247-.175-2.645.854-2.893 2.623-.249 1.769.811 3.143 2.058 3.319 1.247.175 2.645-.854 2.893-2.623.249-1.769-.811-3.144-2.058-3.319z";
  const SHIELDPATH = "M12 2c1.982.042 3.945.396 5.816 1.05 1.09.372 2.154.816 3.184 1.33v7.64c.03 1.404-.27 2.797-.876 4.065-.606 1.268-1.501 2.376-2.613 3.235-.87.66-1.786 1.254-2.743 1.78-.838.514-1.787.823-2.768.9-.98-.077-1.929-.386-2.768-.9-.956-.526-1.873-1.12-2.743-1.78-1.112-.859-2.007-1.967-2.613-3.235-.606-1.268-.906-2.66-.876-4.066V4.38c1.03-.513 2.095-.957 3.184-1.33C8.056 2.398 10.018 2.043 12 2zm0 2c-1.767.047-3.515.367-5.184.95-.767.25-1.398.51-1.816.69v6.38c-.03 1.091.197 2.175.663 3.164.466.988 1.157 1.853 2.018 2.526.793.601 1.63 1.146 2.5 1.63.55.35 1.172.575 1.819.66.648-.084 1.27-.31 1.822-.66.87-.484 1.706-1.029 2.5-1.63.86-.673 1.55-1.538 2.016-2.526.465-.989.692-2.073.662-3.164V5.64c-.416-.18-1.049-.44-1.816-.69C15.516 4.367 13.767 4.047 12 4zm0 10c.83 0 1.5.67 1.5 1.5S12.83 17 12 17s-1.5-.67-1.5-1.5.67-1.5 1.5-1.5zm1-1.3c-.004-.001-.502-.2-1-.2-.5 0-1 .2-1 .2L10.75 7h2.5L13 12.7z";
  const PINPATH = "M12 7c-1.93 0-3.5 1.57-3.5 3.5S10.07 14 12 14s3.5-1.57 3.5-3.5S13.93 7 12 7zm0 5c-.827 0-1.5-.673-1.5-1.5S11.173 9 12 9s1.5.673 1.5 1.5S12.827 12 12 12zm0-10c-4.687 0-8.5 3.813-8.5 8.5 0 5.967 7.621 11.116 7.945 11.332l.555.37.555-.37c.324-.216 7.945-5.365 7.945-11.332C20.5 5.813 16.687 2 12 2zm0 17.77c-1.665-1.241-6.5-5.196-6.5-9.27C5.5 6.916 8.416 4 12 4s6.5 2.916 6.5 6.5c0 4.073-4.835 8.028-6.5 9.27z";
  const DBPATH = "M12 2C8.13 2 5 3.34 5 5v14c0 1.66 3.13 3 7 3s7-1.34 7-3V5c0-1.66-3.13-3-7-3zm5 17c0 .35-1.69 1-5 1s-5-.65-5-1v-2.23c1.34.63 3.13 1 5 1s3.66-.37 5-1V19zm0-4c0 .35-1.69 1-5 1s-5-.65-5-1v-2.23c1.34.63 3.13 1 5 1s3.66-.37 5-1V15zm0-4c0 .35-1.69 1-5 1s-5-.65-5-1V8.77c1.34.63 3.13 1 5 1s3.66-.37 5-1V11zM12 8c-3.31 0-5-.65-5-1s1.69-1 5-1 5 .65 5 1-1.69 1-5 1z";

  /*//////////////////////////////////////////////////////////////////////*/
  
  function pagetoast(msg) {try {tum.overlay.toast(msg)} catch {}}

  function copytext(text) {
    try {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.className = "tumoffscreen";
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

  const SVGNS = "http://www.w3.org/2000/svg";
  function iconsvg(path, em) {
    const svg = document.createElementNS(SVGNS, "svg");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.classList.add("tuminfoicon");
    svg.style.width = svg.style.height = (em || 1.15) + "em";
    const p = document.createElementNS(SVGNS, "path");
    p.setAttribute("d", path);
    svg.appendChild(p);
    return svg;
  }
  function entryrow(iconpath) {
    const d = document.createElement("div");
    d.className = "tuminforow";
    d.appendChild(iconsvg(iconpath));
    return d;
  }
  function copyable(row, value) {
    row.style.cursor = "pointer";
    row.addEventListener("click", e => {e.preventDefault(); e.stopPropagation(); copytext(value); pagetoast("Copied " + value)});
  }

  const userdata = new Map();    // handle -> normalized UserByScreenName fields
  const memcache = new Map();    // handle -> {id, names} | null (requested/none)
  const aboutdata = new Map();   // handle -> AboutAccountQuery fields | null
  const breachcache = new Map(); // handle -> {results} | {skipped} | {discarded} | null
  const memfallback = new Set(); // handles a memory.lol fallback

  function requestmemory(key, arg) {
    memcache.set(key, null);
    try {
      chrome.runtime.sendMessage({type: "tummemorylol", ...arg}, resp => {
        void chrome.runtime.lastError;
        memcache.set(key, resp && resp.id ? resp : null);
        schedule();
      });
    } catch {}
  }

  function itemgray(items) {
    const g = items.querySelector('[data-testid="UserJoinDate"]') || items.querySelector('[data-testid="UserLocation"]');
    return g ? getComputedStyle(g).color : "rgb(83,100,113)";
  }
  function fmtnum(n) {return typeof n === "number" ? n.toLocaleString("en-US") : n}
  function parsetwdate(s) {const d = new Date(s); return isNaN(d) ? null : d}
  function perday(u) {
    const d = parsetwdate(u.createdAt);
    if (!d || typeof u.tweets !== "number") return null;
    const days = Math.max(1, (Date.now() - d.getTime()) / 86400000);
    return (u.tweets / days).toFixed(1);
  }
  function fullres(url) {return (url || "").replace(/_(normal|bigger|mini|(\d+)x(\d+))\.(jpg|jpeg|png|webp|gif)$/i, ".$4")}

  function applyjoin(items, u) {
    const d = parsetwdate(u.createdAt);

    if (!d) return;
    const join = items.querySelector('[data-testid="UserJoinDate"]');
    if (!join || join.dataset.tumjoin) return;
    join.dataset.tumjoin = "1";
    if (join.tagName === "A") {join.removeAttribute("href"); join.removeAttribute("role")}
    join.style.cursor = "default";
    join.style.pointerEvents = "none";
    if (join.parentElement) join.parentElement.style.pointerEvents = "none";
    join.querySelectorAll("svg").forEach((s, i) => {if (i > 0) s.style.display = "none"});
    
    const leaf = [...join.querySelectorAll("span")].filter(s => s.children.length === 0).find(s => /joined/i.test(s.textContent || ""));
    if (!leaf) return;
    const date = d.toLocaleDateString("en-GB", {day: "numeric", month: "long", year: "numeric"});
    leaf.textContent = "Joined " + date;
  }

  function applycounts(handle, u) {
    const set = (sel, n) => {
      if (typeof n !== "number") return;
      const exact = fmtnum(n);
      document.querySelectorAll(sel).forEach(a => {
        a.removeAttribute("title");
        const leaf = [...a.querySelectorAll("span")].find(s => !s.children.length && /^[\d.,]+[KMB]?$/i.test((s.textContent || "").trim()));
        if (leaf && leaf.textContent.trim() !== exact) leaf.textContent = exact;
      });
    };
    set('a[href$="/' + handle + '/verified_followers"], a[href$="/' + handle + '/followers"]', u.followers);
    set('a[href$="/' + handle + '/following"]', u.following);
  }

  function applyperday(u) {
    const pd = perday(u);
    if (!pd) return;
    const el = [...document.querySelectorAll('[data-testid="primaryColumn"] div')].find(d => d.children.length === 0 && /^[\d.,KMB]+\s+posts$/i.test((d.textContent || "").trim()));
    if (!el || el.querySelector(".tumperday")) return;
    const s = document.createElement("span");
    s.className = "tumperday";
    s.textContent = " (" + pd + "/day)";
    el.appendChild(s);
  }

  function hdbutton(href) {
    const a = document.createElement("a");
    a.className = "tumhd";
    a.textContent = "HD";
    a.href = href; a.target = "_blank"; a.rel = "noopener";
    a.title = "Open full-res in a new tab";
    a.addEventListener("click", e => {e.stopPropagation()});
    return a;
  }
  function applyhd(handle, u) {
    if (u.banner) {
      const banner = document.querySelector('a[href$="/' + handle + '/header_photo"]');
      if (banner && !banner.querySelector(":scope > .tumhd")) {
        if (getComputedStyle(banner).position === "static") banner.style.position = "relative";
        banner.appendChild(hdbutton(u.banner));
      }
    }
    if (u.avatar) {
      const avs = [...document.querySelectorAll('[data-testid="UserAvatar-Container-' + handle + '"]')];
      const big = avs.map(a => [a, a.getBoundingClientRect().width]).sort((x, y) => y[1] - x[1])[0];
      if (big && big[1] > 80) {
        const av = big[0];
        if (!av.querySelector(":scope > .tumhd")) {
          if (getComputedStyle(av).position === "static") av.style.position = "relative";
          const b = hdbutton(fullres(u.avatar));
          b.style.bottom = "10px"; b.style.right = "10px";
          av.appendChild(b);
        }
      }
    }
  }

  function monthyear(msec) {return new Date(msec).toLocaleDateString("en-GB", {month: "long", year: "numeric"})}
  function memdate(s) {
    if (!s) return "";
    const d = new Date(/^\d{4}-\d{2}-\d{2}$/.test(s) ? s + "T00:00:00" : s);
    return isNaN(d) ? s : d.toLocaleDateString("en-GB", {day: "numeric", month: "short", year: "numeric"});
  }

  function buildblock(items, handle) {
    const key = handle.toLowerCase();
    const u = userdata.get(key), mem = memcache.get(key), ab = aboutdata.get(key);
    const id = (u && u.restId) || (mem && mem.id) || null;
    const email = cache.get(key) || null;
    const source = ab && ab.source;
    const changes = ab && ab.changesCount;
    const changedon = ab && ab.changesLastMsec;
    const names = mem && mem.names ? mem.names.filter(n => n.name.toLowerCase() !== key) : [];
    const flags = [];
    if (u) {
      if (u.possiblySensitive) flags.push("possibly sensitive");
      if (u.withheld && u.withheld.length) flags.push("withheld in " + u.withheld.join(", "));
    }
    const sig = JSON.stringify([id, email, source, changes, changedon, names.map(n => [n.name, n.from, n.to]), flags]);
    let box = document.querySelector(".tumextrablock");
    if (box && box.dataset.sig === sig && box.dataset.handle === handle) return;
    if (box) box.remove();
    if (!id && !email && !source && !changes && !names.length && !flags.length) return;
    const gray = itemgray(items);
    box = document.createElement("div");
    box.className = "tumextrablock";
    box.dataset.sig = sig;
    box.dataset.handle = handle;
    box.style.color = gray;

    if (id) {const r = entryrow(TAGPATH); const t = document.createElement("span"); t.textContent = "ID: " + id; r.appendChild(t); copyable(r, String(id)); box.appendChild(r)}
    if (email) {const r = entryrow(MAILPATH); const t = document.createElement("span"); t.textContent = email; r.appendChild(t); copyable(r, email); box.appendChild(r)}
    if (source) {const r = entryrow(GLOBEPATH); const t = document.createElement("span"); t.textContent = "Connected via " + source; r.appendChild(t); box.appendChild(r)}
    if (changes || names.length) {
      const r = entryrow(CHANGESPATH);
      const wrap = document.createElement("div");
      wrap.className = "tumusernames";
      const head = document.createElement("span");
      const n = changes != null ? changes : names.length;
      head.textContent = n + " username change" + (n === 1 ? "" : "s") + (changedon ? " (Last on " + monthyear(changedon) + ")" : "");
      wrap.appendChild(head);
      for (const nm of names) {
        const line = document.createElement("span");
        line.className = "tumusernameold";
        line.textContent = "@" + nm.name + (nm.from ? " (" + memdate(nm.from) + (nm.to ? " - " + memdate(nm.to) : "") + ")" : "");
        wrap.appendChild(line);
      }
      r.appendChild(wrap);
      box.appendChild(r);
    }
    if (flags.length) {
      const r = entryrow(WARNPATH); r.style.color = "#f4212e";
      const t = document.createElement("span"); t.textContent = flags.join(" · "); r.appendChild(t);
      box.appendChild(r);
    }
    items.parentNode.insertBefore(box, items.nextSibling);
  }

  function textleft(el) {
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) {
      if ((node.textContent || "").trim()) {
        const r = document.createRange();
        r.selectNodeContents(node);
        return Math.round(r.getBoundingClientRect().left - el.getBoundingClientRect().left);
      }
    }
    return null;
  }

  function vpnshield() {
    const shield = iconsvg(SHIELDPATH, 1);
    shield.style.color = "#f4212e";
    const wrap = document.createElement("span");
    wrap.title = "Using/have used a VPN";
    wrap.className = "tumvpnwrap";
    wrap.appendChild(shield);
    return wrap;
  }

  function injectbasedin(items, handle) {
    const ab = aboutdata.get(handle.toLowerCase());
    const loc = items.querySelector('[data-testid="UserLocation"]');
    const stray = items.querySelector(":scope > .tumbasedinitem");
    if (!ab || !ab.basedIn) {
      const ex = loc && loc.querySelector(".tumbasedin"); if (ex) ex.remove();
      if (stray) stray.remove();
      return;
    }
    const sig = ab.basedIn + "|" + ab.locationAccurate;
    if (loc) {
      if (stray) stray.remove();
      const existing = loc.querySelector(".tumbasedin");
      if (existing && existing.dataset.sig === sig) return;
      if (existing) existing.remove();
      
      loc.style.overflow = "visible";
      loc.style.verticalAlign = "top";
      const line = document.createElement("span");
      line.className = "tumbasedin";
      line.dataset.sig = sig;
      const indent = textleft(loc);
      line.style.marginLeft = (indent != null ? indent : 22) + "px";

      const t = document.createElement("span"); t.textContent = ab.basedIn; line.appendChild(t);
      if (ab.locationAccurate === false) line.appendChild(vpnshield());
      loc.appendChild(line);
      return;
    }

    if (stray && stray.dataset.sig === sig) return;
    if (stray) stray.remove();
    const item = document.createElement("span");
    item.className = "tumbasedinitem";
    item.dataset.sig = sig;
    item.style.color = itemgray(items);
    item.appendChild(iconsvg(PINPATH, 1.25));
    const t = document.createElement("span"); t.textContent = ab.basedIn; item.appendChild(t);
    if (ab.locationAccurate === false) item.appendChild(vpnshield());
    items.appendChild(item);
  }

  /*//////////////////////////////////////////////////////////////////////*/

  function breachmodal(results, strong, gray, bg, onclose) {
    const backdrop = document.createElement("div");
    backdrop.className = "tumbreachbackdrop";
    const modal = document.createElement("div");
    modal.className = "tumbreachmodal";
    modal.style.background = bg;
    modal.style.color = strong;
    modal.addEventListener("click", e => e.stopPropagation());
    const head = document.createElement("div");
    head.className = "tumbreachhead";
    const title = document.createElement("div");
    title.textContent = results.length + " breach record" + (results.length === 1 ? "" : "s");
    title.className = "tumbreachtitle";
    const x = document.createElement("button");
    x.textContent = "✕";
    x.className = "tumbreachclose";
    x.style.color = strong;
    x.addEventListener("click", onclose);
    head.appendChild(title); head.appendChild(x);
    modal.appendChild(head);
    for (const rec of results) {
      const card = document.createElement("div");
      card.className = "tumbreachcard";
      const srcrow = document.createElement("div");
      srcrow.className = "tumbreachsrcrow";
      const src = document.createElement("span");
      src.textContent = rec.source || "Unknown source";
      src.className = "tumbreachsrc";
      srcrow.appendChild(src);
      if (rec.categories && rec.categories.length) {
        const cat = document.createElement("span");
        cat.textContent = Array.isArray(rec.categories) ? rec.categories.join(", ") : rec.categories;
        cat.className = "tumbreachcat";
        cat.style.color = gray;
        srcrow.appendChild(cat);
      }
      card.appendChild(srcrow);
      const fields = document.createElement("div");
      fields.className = "tumbreachfields";
      for (const [k, v] of Object.entries(rec)) {
        if (k === "source" || k === "categories" || v == null || v === "") continue;
        const f = document.createElement("span");
        f.className = "tumbreachfield";
        const kk = document.createElement("span"); kk.textContent = k + ": "; kk.style.color = gray;
        f.appendChild(kk);
        f.appendChild(document.createTextNode(Array.isArray(v) ? v.join(", ") : (typeof v === "object" ? JSON.stringify(v) : String(v))));
        fields.appendChild(f);
      }
      card.appendChild(fields);
      modal.appendChild(card);
    }
    backdrop.appendChild(modal);
    return backdrop;
  }

  function injectbreach(handle) {
    const res = breachcache.get(handle.toLowerCase());
    const un = document.querySelector('[data-testid="UserName"]');
    if (!un) return;
    const existing = un.querySelector(".tumbreachbadge");
    if (!res || !res.results || !res.results.length) {if (existing) existing.remove(); return}
    if (existing) return;
    const leaf = [...un.querySelectorAll("span")].find(s => !s.children.length && (s.textContent || "").trim().toLowerCase() === "@" + handle.toLowerCase());
    if (!leaf) return;
    const strong = getComputedStyle(document.querySelector("main h2") || document.body).color;
    const gray = itemgray(document.querySelector(ITEMSSEL) || document.body);
    const bg = getComputedStyle(document.body).backgroundColor || "#000";
    const badge = document.createElement("span");
    badge.className = "tumbreachbadge";
    const ic = iconsvg(DBPATH, 1.1); ic.style.top = "0"; badge.appendChild(ic);
    const cnt = document.createElement("span"); cnt.textContent = res.results.length; badge.appendChild(cnt);
    badge.title = res.results.length + " breach record" + (res.results.length === 1 ? "" : "s") + " - click to view";
    let modal = null;
    function close() {if (modal) {modal.remove(); modal = null; document.removeEventListener("keydown", onkey)}}
    function onkey(e) {if (e.key === "Escape") close()}
    badge.addEventListener("click", e => {
      e.preventDefault(); e.stopPropagation();
      if (modal) {close(); return}
      modal = breachmodal(res.results, strong, gray, bg, close);
      modal.addEventListener("click", close);
      document.body.appendChild(modal);
      document.addEventListener("keydown", onkey);
    });
    leaf.insertAdjacentElement("afterend", badge);
  }

  function removeextras() {
    for (const n of document.querySelectorAll(".tumextrablock, .tumbreachbadge, .tumbasedinitem, .tumbasedin, .tumhd, .tumperday")) n.remove();
  }

  function scan() {
    if (tum.settings && !tum.settings.get("extrainfo")) {removeextras(); return}
    const handle = currenthandle();
    const items = document.querySelector(ITEMSSEL);
    if (!handle || !items) return;
    const key = handle.toLowerCase();
    if (!cache.has(key)) {
      cache.set(key, null);
      try {
        chrome.runtime.sendMessage({type: "tumemail", handle}, resp => {
          void chrome.runtime.lastError;
          cache.set(key, resp && resp.email ? resp.email : null);
          schedule();
        });
      } catch {}
    }
    if (!memcache.has(key)) {
      const uu = userdata.get(key);
      if (uu && uu.restId) requestmemory(key, {id: uu.restId});
      else if (!memfallback.has(key)) {
        memfallback.add(key);
        setTimeout(() => {if (!memcache.has(key)) requestmemory(key, {handle})}, 3000);
      }
    }
    if (!breachcache.has(key)) {
      breachcache.set(key, null);
      try {
        chrome.runtime.sendMessage({type: "tumbreach", handle}, resp => {
          void chrome.runtime.lastError;
          breachcache.set(key, resp || {});
          schedule();
        });
      } catch {}
    }
    const u = userdata.get(key);
    if (u) {
      applyjoin(items, u);
      applycounts(handle, u);
      applyperday(u);
      applyhd(handle, u);
    }
    injectbasedin(items, handle);
    injectbreach(handle);
    buildblock(items, handle);
  }

  let scheduled = 0;
  function schedule() {
    if (scheduled) return;
    scheduled = setTimeout(() => {scheduled = 0; scan()}, 120);
  }

  window.tum.profileinfo = {
    init() {
      window.addEventListener("message", e => {
        if (e.source !== window || !e.data || !e.data.data || !e.data.data.handle) return;
        if (e.data.__tumuser) {userdata.set(e.data.data.handle.toLowerCase(), e.data.data); schedule()}
        else if (e.data.__tumabout) {aboutdata.set(e.data.data.handle.toLowerCase(), e.data.data); schedule()}
      });
      new MutationObserver(schedule).observe(document.body, {childList: true, subtree: true});
      if (tum.settings) tum.settings.onchange(schedule);
      schedule();
    }
  };
})();

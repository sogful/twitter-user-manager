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
  const FONT = '"TwitterChirp","Chirp",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif';

  // a copy of x.com's own bottom toast (captured 1:1 from its "Copied to clipboard" notification):
  // blue pill, white text, 4px radius, 12px padding, bottom-centred, 170ms opacity fade, no shadow
  let toastel = null, toasttimer = 0;
  function pagetoast(msg) {
    if (!toastel) {
      toastel = document.createElement("div");
      toastel.className = "tumpagetoast";
      toastel.style.cssText = "position:fixed;bottom:32px;left:50%;transform:translateX(-50%);z-index:2147483000;background:#1d9bf0;color:#fff;border-radius:4px;padding:12px;font-family:" + FONT + ";font-size:15px;line-height:20px;max-width:90vw;text-align:center;pointer-events:none;opacity:0;transition:opacity 170ms cubic-bezier(0,0,1,1)";
      document.body.appendChild(toastel);
    }
    toastel.textContent = msg;
    requestAnimationFrame(() => {if (toastel) toastel.style.opacity = "1"});
    clearTimeout(toasttimer);
    toasttimer = setTimeout(() => {if (toastel) toastel.style.opacity = "0"}, 2500);
  }

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
    inject(items, handle);
  }

  // setTimeout, not rAF (rAF pauses on a backgrounded tab); mirrors badges.js/suggest.js
  let scheduled = 0;
  function schedule() {
    if (scheduled) return;
    scheduled = setTimeout(() => {scheduled = 0; scan()}, 120);
  }

  window.tum.profileinfo = {
    init() {
      new MutationObserver(schedule).observe(document.body, {childList: true, subtree: true});
      schedule();
    }
  };
})();

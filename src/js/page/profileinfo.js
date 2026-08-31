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
  // filled envelope path (google material symbols "mail") dropped into a cloned item's own svg
  const MAILPATH = "M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z";

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
      const span = node.querySelector("span") || node;
      const prev = span.textContent;
      navigator.clipboard.writeText(email).then(() => {
        span.textContent = "copied!";
        setTimeout(() => {span.textContent = prev}, 1200);
      }).catch(() => {});
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

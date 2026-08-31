// the email lookup runs from the service worker, not the content script: x.com's connect-src CSP
// would block a page-context fetch to the lookup host, but a background fetch (host granted in
// host_permissions) isn't subject to the page's CSP. no cache here on purpose - the worker is a
// direct primary-key D1 lookup (~150ms), so every hit is fresh, which keeps timing honest and the
// data current. dedup within a single profile view is handled content-side (profileinfo.js)
const ENDPOINT = "https://twt.boomlings.eu.org/?screenname=";

async function lookup(handle) {
  try {
    const r = await fetch(ENDPOINT + encodeURIComponent(handle));
    const d = await r.json();
    if (d && d.found && d.email) return d.email;
  } catch {}
  return null;
}

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg && msg.type === "tumemail" && msg.handle) {
    lookup(msg.handle).then(email => sendResponse({email}));
    return true; // keep the channel open for the async response
  }
});

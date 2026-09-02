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

// memory.lol: numeric id + the account's @handle history (renames), one GET. from the worker so
// the page's csp can't block it. returns {id, names:[{name, from, to}]} sorted oldest-first
async function memorylol(handle) {
  try {
    const r = await fetch("https://api.memory.lol/v1/tw/" + encodeURIComponent(handle));
    const d = await r.json();
    const acct = d && d.accounts && d.accounts[0];
    if (!acct) return null;
    const names = Object.entries(acct.screen_names || {}).map(([name, range]) => ({name, from: range && range[0], to: range && range[1]}));
    names.sort((a, b) => String(a.from || "").localeCompare(String(b.from || "")));
    return {id: acct.id_str || String(acct.id), names};
  } catch {}
  return null;
}

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg && msg.type === "tumemail" && msg.handle) {
    lookup(msg.handle).then(email => sendResponse({email}));
    return true;
  }
  if (msg && msg.type === "tummemorylol" && msg.handle) {
    memorylol(msg.handle).then(res => sendResponse(res || {}));
    return true;
  }
});

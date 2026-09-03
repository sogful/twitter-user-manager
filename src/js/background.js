const ENDPOINT = "https://twt.boomlings.eu.org/?screenname=";

async function lookup(handle) {
  try {
    const r = await fetch(ENDPOINT + encodeURIComponent(handle));
    const d = await r.json();
    if (d && d.found && d.email) return d.email;
  } catch {}
  return null;
}

async function memtoken() {
  try {
    const c = await chrome.cookies.get({url: "https://memory.lol/", name: "google_token"});
    return c && c.value ? c.value : null;
  } catch {return null}
}

async function memorylol(q) {
  try {
    const path = q && q.id ? "id/" + encodeURIComponent(q.id) : encodeURIComponent(q && q.handle);
    const tok = await memtoken();
    const opts = tok ? {headers: {Authorization: "Bearer " + tok}} : undefined;
    const r = await fetch("https://api.memory.lol/v1/tw/" + path, opts);
    const d = await r.json();
    const acct = d && (d.screen_names ? d : (d.accounts && d.accounts[0]));
    if (!acct) return null;
    const names = Object.entries(acct.screen_names || {}).map(([name, range]) => ({name, from: range && range[0], to: range && range[1]}));
    names.sort((a, b) => String(a.from || "").localeCompare(String(b.from || "")));
    return {id: acct.id_str || String(acct.id), names};
  } catch {}
  return null;
}

let commonset = null;
async function loadcommon() {
  if (commonset) return commonset;
  try {const r = await fetch(chrome.runtime.getURL("assets/static/common.json")); commonset = new Set(await r.json())}
  catch {commonset = new Set()}
  return commonset;
}
async function breachlookup(handle) {
  const h = (handle || "").toLowerCase();
  if (h.length <= 6) return {skipped: "short"};
  const common = await loadcommon();
  if (common.has(h)) return {skipped: "common"};
  try {
    const r = await fetch("https://swolesome.pages.dev/api/proxy", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({term: handle, fields: ["username"], wildcard: false, case_sensitive: false, _target_url: "https://breach.vip/api/search"})
    });
    if (!r.ok) return {error: true};
    const d = await r.json();
    const results = Array.isArray(d.results) ? d.results : [];
    if (results.length > 50) return {discarded: true, count: results.length};
    return {results};
  } catch {return {error: true}}
}

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg && msg.type === "tumemail" && msg.handle) {
    lookup(msg.handle).then(email => sendResponse({email}));
    return true;
  }
  if (msg && msg.type === "tummemorylol" && (msg.id || msg.handle)) {
    memorylol({id: msg.id, handle: msg.handle}).then(res => sendResponse(res || {}));
    return true;
  }
  if (msg && msg.type === "tumbreach" && msg.handle) {
    breachlookup(msg.handle).then(res => sendResponse(res || {}));
    return true;
  }
});

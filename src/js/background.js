const ENDPOINT = "https://twt.boomlings.eu.org/?screenname=";
const quotaqueues = new Map();
const queuequeues = new Map();

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

/*
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
*/

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg && msg.type === "tumlistqueue" && sender.tab && /^https:\/\/(?:www\.)?(?:x|twitter)\.com\//i.test(sender.tab.url || "")) {
    const key = "tum.listaddqueue";
    const previous = queuequeues.get(key) || Promise.resolve();
    const next = previous.catch(() => {}).then(async () => {
      const jobs = await new Promise((resolve, reject) => chrome.storage.local.get([key], values => {
        const error = chrome.runtime.lastError;
        if (error) reject(new Error(error.message));
        else resolve(Array.isArray(values && values[key]) ? values[key] : []);
      }));
      const write = value => new Promise((resolve, reject) => chrome.storage.local.set({[key]: value}, () => {
        const error = chrome.runtime.lastError;
        if (error) reject(new Error(error.message)); else resolve();
      }));
      if (msg.action === "list") return {jobs};
      if (msg.action === "save" && msg.job && typeof msg.job.id === "string" && /^\d+$/.test(String(msg.job.listid || "")) && Array.isArray(msg.job.ids)) {
        const clean = Object.assign({}, msg.job, {ids: [...new Set(msg.job.ids.map(String).filter(id => /^\d+$/.test(id)))].slice(0, 5000)});
        const index = jobs.findIndex(job => job && job.id === clean.id);
        if (index < 0 && jobs.length >= 500) return {error: true};
        if (index < 0) jobs.push(clean); else jobs[index] = clean;
        if (JSON.stringify(jobs).length > 8000000) return {error: true};
        await write(jobs);
        return {ok: true};
      }
      if (msg.action === "remove") {
        await write(jobs.filter(job => job && job.id !== msg.id));
        return {ok: true};
      }
      if (msg.action === "removelist") {
        await write(jobs.filter(job => job && job.listid !== String(msg.listid)));
        return {ok: true};
      }
      return {error: true};
    });
    queuequeues.set(key, next.then(() => undefined, () => undefined));
    next.then(sendResponse, () => sendResponse({error: true}));
    return true;
  }
  if (msg && msg.type === "tumlistquota" && sender.tab && /^https:\/\/(?:www\.)?(?:x|twitter)\.com\//i.test(sender.tab.url || "")) {
    if (!["reserve", "commit", "release"].includes(msg.action)) {
      sendResponse({allowed: false, error: true});
      return false;
    }
    const account = /^\d+$/.test(String(msg.account || "")) ? String(msg.account) : "unresolved";
    const key = "tum.listaddquota." + account;
    const day = 24 * 60 * 60 * 1000;
    const queues = quotaqueues;
    const previous = queues.get(key) || Promise.resolve();
    const next = previous.catch(() => {}).then(async () => {
      const entries = await new Promise((resolve, reject) => chrome.storage.local.get([key], values => {
        const error = chrome.runtime.lastError;
        if (error) reject(new Error(error.message));
        else resolve(Array.isArray(values && values[key]) ? values[key] : []);
      }));
      const write = value => new Promise((resolve, reject) => chrome.storage.local.set({[key]: value}, () => {
        const error = chrome.runtime.lastError;
        if (error) reject(new Error(error.message)); else resolve();
      }));
      const now = Date.now();
      const fresh = entries.filter(entry => entry && typeof entry.id === "string" && Number.isFinite(entry.at) && now - entry.at < day);
      if (msg.action === "reserve") {
        if (fresh.length >= 150) {
          const resumeat = Math.min(...fresh.map(entry => entry.at)) + day;
          await write(fresh);
          return {allowed: false, resumeat, used: fresh.length};
        }
        const id = crypto.randomUUID();
        fresh.push({id, at: now});
        await write(fresh);
        return {allowed: true, id, resumeat: fresh.length >= 150 ? Math.min(...fresh.map(entry => entry.at)) + day : 0, used: fresh.length};
      }
      const index = fresh.findIndex(entry => entry.id === msg.id);
      if (index >= 0) {
        if (msg.action === "commit") fresh[index].at = now;
        else if (msg.action === "release") fresh.splice(index, 1);
      }
      await write(fresh);
      return {allowed: true, used: fresh.length};
    });
    quotaqueues.set(key, next.then(() => undefined, () => undefined));
    next.then(sendResponse, () => sendResponse({allowed: false, error: true}));
    return true;
  }
  if (msg && msg.type === "tumemail" && msg.handle) {
    lookup(msg.handle).then(email => sendResponse({email}));
    return true;
  }
  if (msg && msg.type === "tummemorylol" && (msg.id || msg.handle)) {
    memorylol({id: msg.id, handle: msg.handle}).then(res => sendResponse(res || {}));
    return true;
  }
  /* Disabled until the breach.vip API is available again.
  if (msg && msg.type === "tumbreach" && msg.handle) {
    breachlookup(msg.handle).then(res => sendResponse(res || {}));
    return true;
  }
  */
});

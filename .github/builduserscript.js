// some code copied from twitter flags..

const fs = require("fs");
const path = require("path");

const root = (() => {
  let d = __dirname;
  while (!fs.existsSync(path.join(d, "manifest.json"))) {
    const up = path.dirname(d);
    if (up === d) throw new Error("repo root (manifest.json) not found");
    d = up;
  }
  return d;
})();
const rd = p => fs.readFileSync(path.join(root, p), "utf8");
const b64 = p => fs.readFileSync(path.join(root, p)).toString("base64");
const must = (before, after, label) => {if (before === after) throw new Error("transform did not apply: " + label); return after};

/*//////////////////////////////////////////////////////////////////////*/

const manifest = JSON.parse(rd("manifest.json"));
const version = manifest.version || "0";

let overlaycss = rd("src/css/overlay.css");
overlaycss = must(overlaycss, overlaycss.replace(/@font-face\s*\{[^{}]*\}/g, ""), "strip @font-face");
overlaycss = must(overlaycss, overlaycss.replace(/"Chirp"/g, '"TwitterChirp"'), "chirp -> twitterchirp");

const assets = {};
assets["src/html/overlay.html"] = rd("src/html/overlay.html");
assets["src/css/overlay.css"] = overlaycss;
assets["src/css/page.css"] = rd("src/css/page.css");
assets["assets/static/icons.json"] = rd("assets/static/icons.json");
assets["assets/static/emoji.json"] = rd("assets/static/emoji.json");
assets["assets/static/common.json"] = rd("assets/static/common.json");
assets["assets/static/strings.json"] = rd("assets/static/strings.json");
assets["assets/images/text.png"] = "data:image/png;base64," + b64("assets/images/text.png");
assets["assets/images/yeah.png"] = "data:image/png;base64," + b64("assets/images/yeah.png");

let svgcount = 0;
(function walk(dir) {
  for (const name of fs.readdirSync(path.join(root, dir))) {
    const rel = dir + "/" + name;
    const st = fs.statSync(path.join(root, rel));
    if (st.isDirectory()) walk(rel);
    else if (name.endsWith(".svg")) {assets[rel] = fs.readFileSync(path.join(root, rel), "utf8"); svgcount++}
  }
})("assets/svgs");

/*//////////////////////////////////////////////////////////////////////*/

const sandboxfiles = [
  "src/js/core/storage.js",
  "src/js/core/strings.js",
  "src/js/core/theme.js",
  "src/js/ui/iconpicker.js",
  "src/js/core/folders.js",
  "src/js/core/unsorted.js",
  "src/js/core/categories.js",
  "src/js/page/actions.js",
  "src/js/page/dragdetect.js",
  "src/js/page/newuser.js",
  "src/js/page/lists.js",
  "src/js/ui/overlay.js",
  "src/js/ui/overlaydrag.js",
  "src/js/ui/overlaymodals.js",
  "src/js/page/badges.js",
  "src/js/page/suggest.js",
  "src/js/page/profileinfo.js",
  "src/js/page/settings.js",
  "src/js/main.js"
];
const sandboxsrc = sandboxfiles.map(f => "// ===== " + f + " =====\n" + rd(f)).join("\n\n");
const capturesrc = rd("src/js/page/usercapture.js");

/*//////////////////////////////////////////////////////////////////////*/

const appmatches = ["https://x.com/*", "https://twitter.com/*", "https://mobile.x.com/*", "https://mobile.twitter.com/*"];
const connects = ["twt.boomlings.eu.org", "api.memory.lol", "memory.lol", "swolesome.pages.dev"];
const metagroups = [
  [["@name", "twitter user manager"], ["@description", manifest.description || "sort and get additional info for accounts!"], ["@version", version]],
  [["@namespace", manifest.homepage_url || "https://github.com/twitter-user-manager"], ["@author", manifest.author || "cv"]],
  appmatches.map(m => ["@match", m]),
  connects.map(c => ["@connect", c]),
  [["@grant", "GM_xmlhttpRequest"], ["@grant", "GM.xmlHttpRequest"], ["@run-at", "document-start"], ["@noframes", ""]]
];
const dirw = Math.max(...metagroups.flat().map(p => p[0].length));
const fmt = ([d, v]) => (v ? "// " + d.padEnd(dirw) + "  " + v : "// " + d);
const meta = "// ==UserScript==\n" + metagroups.map(g => g.map(fmt).join("\n")).join("\n") + "\n// ==/UserScript==\n";

/*//////////////////////////////////////////////////////////////////////*/

const shim = `
  /*//////////////////////////////////////////////////////////////////////*/

  const DESTROYERBASE = "";

  const _realfetch = (typeof window !== "undefined" && window.fetch) ? window.fetch.bind(window) : null;
  function fetch(input, opts) {
    const u = typeof input === "string" ? input : (input && input.url);
    if (typeof u === "string" && u.slice(0, 5) === "data:") {
      try {
        const comma = u.indexOf(",");
        const meta = u.slice(5, comma);
        const body = /;base64/i.test(meta) ? atob(u.slice(comma + 1)) : decodeURIComponent(u.slice(comma + 1));
        return Promise.resolve(new Response(body, {status: 200, headers: {"Content-Type": meta.split(";")[0] || "text/plain"}}));
      } catch (e) {return Promise.reject(e)}
    }
    return _realfetch ? _realfetch(input, opts) : Promise.reject(new Error("no fetch"));
  }

  const gmx = (typeof GM_xmlhttpRequest !== "undefined" && GM_xmlhttpRequest) || (typeof GM !== "undefined" && GM.xmlHttpRequest) || null;
  function gmfetch(opts) {
    return new Promise((res, rej) => {
      if (!gmx) {rej(new Error("no GM_xmlhttpRequest")); return}
      gmx({
        method: opts.method || "GET", url: opts.url, headers: opts.headers, data: opts.data,
        onload: r => res({ok: r.status >= 200 && r.status < 300, status: r.status, text: r.responseText}),
        onerror: () => rej(new Error("gm error")), ontimeout: () => rej(new Error("gm timeout"))
      });
    });
  }

  function mimeof(p) {
    if (p.endsWith(".svg")) return "image/svg+xml";
    if (p.endsWith(".json")) return "application/json";
    if (p.endsWith(".html")) return "text/html";
    if (p.endsWith(".css")) return "text/css";
    return "text/plain";
  }
  function geturl(p) {
    p = String(p).replace(/^\\.?\\//, "");
    if (p.indexOf("desktopdestroyer/") === 0) return DESTROYERBASE ? DESTROYERBASE.replace(/\\/$/, "") + "/" + p.slice("desktopdestroyer/".length) : "about:blank";
    const v = TUMASSETS[p];
    if (v == null) return p;
    if (v.slice(0, 5) === "data:") return v;
    return "data:" + mimeof(p) + ";charset=utf-8," + encodeURIComponent(v);
  }

  /*//////////////////////////////////////////////////////////////////////*/

  async function emaillookup(handle) {
    try {const r = await gmfetch({url: "https://twt.boomlings.eu.org/?screenname=" + encodeURIComponent(handle)}); const d = JSON.parse(r.text); if (d && d.found && d.email) return d.email} catch {}
    return null;
  }
  async function memorylol(q) {
    try {
      const sub = q && q.id ? "id/" + encodeURIComponent(q.id) : encodeURIComponent(q && q.handle);
      const r = await gmfetch({url: "https://api.memory.lol/v1/tw/" + sub});
      const d = JSON.parse(r.text);
      const acct = d && (d.screen_names ? d : (d.accounts && d.accounts[0]));
      if (!acct) return null;
      const names = Object.entries(acct.screen_names || {}).map(([name, range]) => ({name, from: range && range[0], to: range && range[1]}));
      names.sort((a, b) => String(a.from || "").localeCompare(String(b.from || "")));
      return {id: acct.id_str || String(acct.id), names};
    } catch {}
    return null;
  }
  let commonset = null;
  function loadcommon() {
    if (commonset) return commonset;
    try {commonset = new Set(JSON.parse(TUMASSETS["assets/static/common.json"] || "[]"))} catch {commonset = new Set()}
    return commonset;
  }
  async function breachlookup(handle) {
    const h = (handle || "").toLowerCase();
    if (h.length <= 6) return {skipped: "short"};
    if (loadcommon().has(h)) return {skipped: "common"};
    try {
      const r = await gmfetch({
        method: "POST", url: "https://swolesome.pages.dev/api/proxy",
        headers: {"Content-Type": "application/json"},
        data: JSON.stringify({term: handle, fields: ["username"], wildcard: false, case_sensitive: false, _target_url: "https://breach.vip/api/search"})
      });
      if (!r.ok) return {error: true};
      const d = JSON.parse(r.text);
      const results = Array.isArray(d.results) ? d.results : [];
      if (results.length > 50) return {discarded: true, count: results.length};
      return {results};
    } catch {return {error: true}}
  }

  function dispatch(msg) {
    if (!msg) return Promise.resolve({});
    if (msg.type === "tumemail" && msg.handle) return emaillookup(msg.handle).then(email => ({email}));
    if (msg.type === "tummemorylol" && (msg.id || msg.handle)) return memorylol({id: msg.id, handle: msg.handle}).then(r => r || {});
    if (msg.type === "tumbreach" && msg.handle) return breachlookup(msg.handle).then(r => r || {});
    return Promise.resolve({});
  }

  const chrome = {
    runtime: {
      getURL: geturl,
      lastError: undefined,
      onMessage: {addListener: () => {}},
      sendMessage: (msg, cb) => {const p = dispatch(msg); if (cb) {p.then(cb); return} return p}
    }
  };
  try {window.chrome = window.chrome && window.chrome.runtime && window.chrome.runtime.getURL ? window.chrome : chrome} catch {}
`;

/*//////////////////////////////////////////////////////////////////////*/

const output = [
  meta,
  "(function () {",
  '  "use strict";',
  "",
  "  const TUMASSETS = " + JSON.stringify(assets) + ";",
  "",
  "  try {",
  "    const s = document.createElement(\"script\");",
  "    s.textContent = " + JSON.stringify(capturesrc) + ";",
  "    (document.head || document.documentElement).appendChild(s);",
  "    s.remove();",
  "  } catch (e) {}",
  "",
  shim,
  "",
  "  /*//////////////////////////////////////////////////////////////////////*/",
  "",
  sandboxsrc,
  "})();",
  ""
].join("\n");

const outpath = path.join(__dirname, "twitterusermanager.user.js");
fs.writeFileSync(outpath, output);
console.log("built ->", outpath);
console.log("svgs inlined:", svgcount, "| size:", (output.length / 1024).toFixed(1) + " kb");

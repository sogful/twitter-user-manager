"use strict";

const tps = 20; // 20 fps! so retro!
const tickms = 1000 / tps;
const dt = tickms / (1000 / 60);

const desktopdestroyer = {
  W: 0, H: 0, dpr: 1, tick: 0,
  fx: [], dctx: null, fctx: null,
  mouse: {x: -99, y: -99, down: false, inside: false},
  weapon: null,
  sound: null,
  panel: {open: false, x: 0, y: 0, hover: -1}
};

/*//////////////////////////////////////////////////////////////////////*/

function canvafit() {
  const dmg = document.querySelector(".damage");
  const fx = document.querySelector(".fx");
  const w = window.innerWidth, h = window.innerHeight;

  let keep = null;
  if (desktopdestroyer.dctx && dmg.width) {
    keep = document.createElement("canvas");
    keep.width = dmg.width; keep.height = dmg.height;
    keep.getContext("2d").drawImage(dmg, 0, 0);
  }
  const old = desktopdestroyer.dpr;

  desktopdestroyer.dpr = Math.min(window.devicePixelRatio || 1, 2);
  desktopdestroyer.W = w; desktopdestroyer.H = h;
  const dpr = desktopdestroyer.dpr;
  for (const cv of [dmg, fx]) {cv.width = w * dpr; cv.height = h * dpr}

  desktopdestroyer.dctx = dmg.getContext("2d");
  desktopdestroyer.fctx = fx.getContext("2d");
  desktopdestroyer.dctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  desktopdestroyer.fctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  if (keep) desktopdestroyer.dctx.drawImage(keep, 0, 0, keep.width / old, keep.height / old);
}

/*//////////////////////////////////////////////////////////////////////*/

const sounddir = "assets/audio/";
const snd = {
  hammer: ["crash", "crash2", "crash3", "shatter", "shatter2", "shatter3", "shatter4", "break"],
  shell: ["ammo", "ammo2", "ammo3", "ammo4", "ammo5", "ammo6", "ammo7", "ammo8"],
  sawidle: "sawprepare", sawcut: "saw",
  gun: "shootheavy", guntail: "bang",
  flamestart: "throwflamein", flameloop: "throwflame", flameend: "throwflameout",
  colorloop: "colorsplat", colordrop: "colorsplat2",
  phaser: "electricshock", stamp: "stamp", termite: "click", washloop: "waterflow"
};
const soundnames = Array.from(new Set([].concat(
  snd.hammer, snd.shell, snd.sawidle, snd.sawcut, snd.gun, snd.guntail,
  snd.flamestart, snd.flameloop, snd.flameend, snd.colorloop, snd.colordrop,
  snd.phaser, snd.stamp, snd.termite, snd.washloop)));

function makesound() {
  const audioctx = window.AudioContext || window.webkitAudioContext;
  let ac = null, useel = false, decoding = null;
  const raw = {}, buf = {}, els = {}, loops = {};

  async function load() {
    if (!audioctx) {
      useel = true;
      for (const n of soundnames) {const a = new Audio(sounddir + n + ".wav"); a.preload = "auto"; els[n] = a}
      return;
    }
    await Promise.all(soundnames.map(async n => {
      try {const r = await fetch(sounddir + n + ".wav"); if (r.ok) raw[n] = await r.arrayBuffer()} catch (e) {}
    }));
  }
  function ensureac() {
    if (useel || ac) return;
    try {ac = new audioctx()} catch (e) {useel = true; return}
    decoding = Promise.all(soundnames.map(async n => {
      if (raw[n]) try {buf[n] = await ac.decodeAudioData(raw[n])} catch (e) {}
    }));
  }
  function resume() {
    if (useel) return;
    ensureac();
    if (ac && ac.state === "suspended") ac.resume();
  }
  function play(name, vol, looping) {
    if (useel) {
      const t = els[name];
      if (!t) return null;
      const a = t.cloneNode();
      a.loop = !!looping; a.volume = vol;
      a.play().catch(() => {});
      return a;
    }
    resume();
    const b = buf[name];
    if (!b || !ac) return null;
    const src = ac.createBufferSource(), gain = ac.createGain();
    src.buffer = b; src.loop = !!looping; gain.gain.value = vol;
    src.connect(gain); gain.connect(ac.destination);
    src.start();
    return src;
  }
  function stop(h) {
    if (!h) return;
    if (useel) {h.pause(); try {h.currentTime = 0} catch (e) {}}
    else try {h.stop()} catch (e) {}
  }
  function loop(key, name, vol, on) {
    if (!on) {stop(loops[key]); loops[key] = null}
    else if (!loops[key]) loops[key] = play(name, vol, true);
  }

  const one = (name, vol) => play(name, vol, false);
  const anyof = (list, vol) => one(pick(list), vol);

  return {
    load, resume,
    mode() {return useel ? "element" : "webaudio"},
    hammer() {anyof(snd.hammer, 0.8)},
    shell() {anyof(snd.shell, 0.45)},
    gun() {one(snd.gun, 0.5)},
    gunend() {one(snd.guntail, 0.35)},
    sawidle(on) {loop("sawidle", snd.sawidle, 0.4, on)},
    sawcut(on) {loop("sawcut", snd.sawcut, 0.5, on)},
    flame(on) {
      if (on && !loops.flame) one(snd.flamestart, 0.5);
      else if (!on && loops.flame) one(snd.flameend, 0.4);
      loop("flame", snd.flameloop, 0.4, on);
    },
    spray(on) {loop("color", snd.colorloop, 0.4, on)},
    colordrop() {one(snd.colordrop, 0.22)},
    phaser() {one(snd.phaser, 0.45)},
    stamp() {one(snd.stamp, 0.6)},
    termite() {one(snd.termite, 0.7)},
    wash(on) {loop("wash", snd.washloop, 0.5, on)},
    stopall() {for (const k in loops) {stop(loops[k]); loops[k] = null}}
  };
}

/*//////////////////////////////////////////////////////////////////////*/

const panel = {w: 384, h: 320, cw: 128, ch: 96, cols: 3};

function openpanel(x, y) {
  const p = desktopdestroyer.panel;
  p.x = clamp(x - panel.w / 2, 4, desktopdestroyer.W - panel.w - 4);
  p.y = clamp(y - 40, 4, desktopdestroyer.H - panel.h - 4);
  p.open = true; p.hover = -1;
}
function closepanel() {desktopdestroyer.panel.open = false}

function onpanel(x, y) {
  const p = desktopdestroyer.panel;
  return x >= p.x && y >= p.y && x < p.x + panel.w && y < p.y + panel.h;
}

function panelcell(x, y) {
  if (!onpanel(x, y)) return -1;
  const p = desktopdestroyer.panel;
  const col = ((x - p.x) / panel.cw) | 0, row = ((y - p.y) / panel.ch) | 0;
  return row > 2 ? -1 : row * panel.cols + col;
}

function drawpanel(c) {
  const p = desktopdestroyer.panel;
  c.drawImage(sheet("toolspopup"), p.x, p.y);
  if (p.hover < 0) return;
  const bx = p.x + (p.hover % panel.cols) * panel.cw;
  const by = p.y + ((p.hover / panel.cols) | 0) * panel.ch;
  c.drawImage(sheet("selectionbox"), bx, by);
}

/*//////////////////////////////////////////////////////////////////////*/

function selectweapon(i) {
  const old = desktopdestroyer.weapon;
  if (old && old.ondeselect) old.ondeselect();
  desktopdestroyer.sound.stopall();
  desktopdestroyer.mouse.down = false;
  desktopdestroyer.weapon = weapons[i];
  if (desktopdestroyer.weapon.onselect) desktopdestroyer.weapon.onselect();
}

function applydown(x, y) {
  const w = desktopdestroyer.weapon;
  desktopdestroyer.mouse.down = true;
  if (w.fire) {w.fire(x, y); w.cool = w.auto}
  else if (w.tick) w.tick(x, y);
  else if (w.down) w.down(x, y);
}
function applymove(x, y) {
  const w = desktopdestroyer.weapon;
  if (desktopdestroyer.mouse.down && w.move) w.move(x, y);
}
function applyup(x, y) {
  const w = desktopdestroyer.weapon;
  if (desktopdestroyer.mouse.down && w.up) w.up(x, y);
  desktopdestroyer.mouse.down = false;
}

function panelclick(x, y) {
  const cell = panelcell(x, y);
  if (cell >= 0) {selectweapon(cell); closepanel()}
  else if (!onpanel(x, y)) closepanel();
}

/*//////////////////////////////////////////////////////////////////////*/

function bindinput() {
  const root = document.body;
  const mouse = desktopdestroyer.mouse;

  root.addEventListener("contextmenu", e => {
    e.preventDefault();
    if (desktopdestroyer.panel.open) closepanel(); else openpanel(e.clientX, e.clientY);
  });

  root.addEventListener("mousedown", e => {
    desktopdestroyer.sound.resume();
    if (e.button === 2) return;
    if (desktopdestroyer.panel.open) {panelclick(e.clientX, e.clientY); return}
    if (e.button !== 0) return;
    mouse.x = e.clientX; mouse.y = e.clientY;
    applydown(e.clientX, e.clientY);
  });

  window.addEventListener("mousemove", e => {
    mouse.x = e.clientX; mouse.y = e.clientY; mouse.inside = true;
    if (desktopdestroyer.panel.open) desktopdestroyer.panel.hover = panelcell(e.clientX, e.clientY);
    else applymove(e.clientX, e.clientY);
  });

  window.addEventListener("mouseup", e => {if (e.button === 0) applyup(mouse.x, mouse.y)});
  root.addEventListener("mouseleave", () => {mouse.inside = false});

  window.addEventListener("keydown", e => {
    desktopdestroyer.sound.resume();
    if (e.key >= "0" && e.key <= "8") {selectweapon(+e.key); closepanel()}
    if (e.key === "Escape") closepanel();
  });

  let hold = null;
  root.addEventListener("touchstart", e => {
    desktopdestroyer.sound.resume();
    const t = e.touches[0];
    mouse.x = t.clientX; mouse.y = t.clientY; mouse.inside = true;
    if (desktopdestroyer.panel.open) {
      const cell = panelcell(t.clientX, t.clientY);
      if (cell >= 0) selectweapon(cell);
      closepanel();
      return;
    }
    hold = setTimeout(() => {openpanel(t.clientX, t.clientY); hold = null}, 500);
    applydown(t.clientX, t.clientY);
  });
  root.addEventListener("touchmove", e => {
    if (hold) {clearTimeout(hold); hold = null}
    const t = e.touches[0];
    mouse.x = t.clientX; mouse.y = t.clientY;
    applymove(t.clientX, t.clientY);
  });
  root.addEventListener("touchend", () => {
    if (hold) {clearTimeout(hold); hold = null}
    applyup(mouse.x, mouse.y);
  });
}

/*//////////////////////////////////////////////////////////////////////*/

let prev = 0;
function frame(ts) {
  requestAnimationFrame(frame);
  if (!prev) {prev = ts; return}
  if (ts - prev < tickms) return;
  prev = ts;
  desktopdestroyer.tick++;
  step();
}

function step() {
  const w = desktopdestroyer.weapon;
  const mouse = desktopdestroyer.mouse;

  if (!desktopdestroyer.panel.open && mouse.down) {
    if (w.fire) {
      w.cool -= tickms;
      if (w.cool <= 0) {w.fire(mouse.x, mouse.y); w.cool = w.auto}
    }
    if (w.tick) w.tick(mouse.x, mouse.y);
  }

  const f = desktopdestroyer.fctx;
  f.clearRect(0, 0, desktopdestroyer.W, desktopdestroyer.H);
  const alive = [];
  for (const p of desktopdestroyer.fx) {
    p.update(dt);
    if (!p.dead) {p.draw(f); alive.push(p)}
  }
  desktopdestroyer.fx = alive;

  if (desktopdestroyer.panel.open) drawpanel(f);
  else if (mouse.inside && w.cursor) w.cursor(f, mouse.x, mouse.y);
}

/*//////////////////////////////////////////////////////////////////////*/

function setbackdrop() {
  const raw = decodeURIComponent((location.hash || "").slice(1));
  if (!raw) return;
  const av = raw.replace(/_(normal|bigger|mini|\d+x\d+)\.(jpg|jpeg|png|webp|gif)$/i, "_400x400.$2");
  document.body.style.background = "white url('" + av + "') center/min(50vw,50vh) auto no-repeat";
}

async function boot() {
  setbackdrop();
  canvafit();
  await loadassets();
  desktopdestroyer.sound = makesound();
  await desktopdestroyer.sound.load();
  selectweapon(0);
  bindinput();
  window.addEventListener("resize", canvafit);
  requestAnimationFrame(frame);
}
boot();

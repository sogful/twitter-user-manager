"use strict";

const img = "assets/images/";
const sheets = {
  hammerhold:         [img + "tools/hammerhold.png",         1, 1, 112, 160],
  hammerhit:          [img + "tools/hammerhit.png",          1, 1, 74, 160],
  chainsaw:           [img + "tools/chainsaw.png",           2, 1, 192, 192],
  chainsawactive:     [img + "tools/chainsawactive.png",     2, 8, 192, 192],
  machinegun:         [img + "tools/machinegun.png",         1, 1, 192, 192],
  machinegunshoot:    [img + "tools/machinegunshoot.png",    2, 1, 192, 192],
  flamethrower:       [img + "tools/flamethrower.png",       2, 1, 320, 256],
  colorthrower:       [img + "tools/colorthrower.png",       4, 1, 320, 256],
  phaser:             [img + "tools/phaser.png",             1, 1, 384, 320],
  phaseractive:       [img + "tools/phaseractive.png",       3, 1, 384, 320],
  stamphold:          [img + "tools/stamphold.png",          1, 1, 256, 256],
  stampplace:         [img + "tools/stampplace.png",         1, 1, 256, 256],
  termitehand:        [img + "tools/termitehand.png",        1, 1, 96, 96],
  termitehandplacing: [img + "tools/termitehandplacing.png", 3, 1, 128, 96],
  washer:             [img + "tools/washer.png",             1, 1, 384, 320],
  washeractive:       [img + "tools/washeractive.png",       3, 1, 384, 320],

  flame:         [img + "flame.png",         8, 1, 51, 51],
  tinyexplosion: [img + "tinyexplosion.png", 14, 1, 16, 16],
  bullets:       [img + "bullets.png",       8, 1, 64, 64],
  termites:      [img + "termites.png",      4, 4, 32, 32],
  termitesplat:  [img + "termitesplat.png",  1, 1, 32, 32],

  toolspopup:   [img + "toolspopup.png",   1, 1, 384, 320],
  selectionbox: [img + "selectionbox.png", 1, 1, 128, 96]
};

const paints = [
  ["red", "#ff2020"], ["green", "#20c030"], ["blue", "#2050ff"], ["yellow", "#ffd010"],
  ["purple", "#a020d0"], ["cyan", "#10c0d0"], ["orange", "#ff8000"], ["pink", "#ff60b0"]
];
for (const p of paints) sheets["bubble" + p[0]] = [img + "bubbles/" + p[0] + ".png", 20, 1, 64, 64];

const grids = {};
for (const k in sheets) {
  const s = sheets[k];
  grids[k] = {cols: s[1], rows: s[2], cw: s[3], ch: s[4], frames: s[1] * s[2]};
}

/*//////////////////////////////////////////////////////////////////////*/

// plain (non-sheet) images, grouped by damage type
function nums(dir, name, n) {
  return Array.from({length: n}, (nil, i) => img + dir + "/" + name + (i + 1) + ".png");
}
const decals = {
  cracks:    nums("cracks", "", 8),                   // hammer hits
  black:     ["", "2", "3", "4"].map(s => img + "particles/black" + s + ".png"),
  scorch:    nums("noise", "", 4),                    // flamethrower
  splatters: nums("splatters", "", 5),                // color thrower
  burnmarks: nums("burnmarks", "", 10),               // phaser
  stamps:    ["bunny", "closed", "creature", "nobombs", "ok",
              "radioactive", "secret", "smile", "tongueout"].map(n => img + "stamps/" + n + ".png"),
  dust:      nums("particles", "dust", 5),            // hammer
  fire:      nums("particles", "fire", 5)             // chainsaw
};

const assets = {img: {}, decal: {}};

function loadimg(src) {
  return new Promise(res => {
    const im = new Image();
    im.onload = () => res(im);
    im.onerror = () => {console.warn("missing asset", src); res(null)};
    im.src = src;
  });
}

async function loadassets() {
  const jobs = [];
  for (const k in sheets) jobs.push(loadimg(sheets[k][0]).then(im => {if (im) assets.img[k] = im}));
  for (const g in decals) {
    assets.decal[g] = [];
    decals[g].forEach((src, i) => jobs.push(loadimg(src).then(im => {
      if (im) {im.dkey = g + i; assets.decal[g][i] = im}
    })));
  }
  await Promise.all(jobs);
  for (const g in assets.decal) assets.decal[g] = assets.decal[g].filter(Boolean);
}

/*//////////////////////////////////////////////////////////////////////*/

function sheet(name) {return assets.img[name]}
function grid(name) {return grids[name]}
function drawframe(c, name, f, x, y, scale, rot) {
  const im = assets.img[name], g = grids[name];
  if (!im) return;
  f = ((f % g.frames) + g.frames) % g.frames;
  const sx = (f % g.cols) * g.cw, sy = ((f / g.cols) | 0) * g.ch;
  scale = scale || 1;
  c.save();
  c.translate(x, y);
  if (rot) c.rotate(rot);
  c.scale(scale, scale);
  c.drawImage(im, sx, sy, g.cw, g.ch, -g.cw / 2, -g.ch / 2, g.cw, g.ch);
  c.restore();
}

function pickdecal(group) {
  const a = assets.decal[group];
  return a.length ? a[(Math.random() * a.length) | 0] : null;
}

function drawdecal(c, im, x, y, scale, rot) {
  if (!im) return;
  scale = scale || 1;
  const w = im.width * scale, h = im.height * scale;
  c.save();
  c.translate(x, y);
  if (rot) c.rotate(rot);
  c.drawImage(im, -w / 2, -h / 2, w, h);
  c.restore();
}

/*//////////////////////////////////////////////////////////////////////*/

function hueof(hex) {
  const r = parseInt(hex.slice(1, 3), 16) / 255,
    g = parseInt(hex.slice(3, 5), 16) / 255,
    b = parseInt(hex.slice(5, 7), 16) / 255;
  const mx = Math.max(r, g, b), mn = Math.min(r, g, b), d = mx - mn;
  if (!d) return 0;
  let h = mx === r ? ((g - b) / d) % 6 : mx === g ? (b - r) / d + 2 : (r - g) / d + 4;
  h *= 60;
  return Math.round(h < 0 ? h + 360 : h);
}

const recolor = {};
function paintdecal(im, hex) {
  if (!hex || hex === "#ff2020") return im;
  const ck = im.dkey + "|" + hex;
  if (recolor[ck]) return recolor[ck];
  const cv = document.createElement("canvas");
  cv.width = im.width; cv.height = im.height;
  const x = cv.getContext("2d");
  x.drawImage(im, 0, 0);
  try {
    const d = x.getImageData(0, 0, cv.width, cv.height), p = d.data;
    const r = parseInt(hex.slice(1, 3), 16),
      g = parseInt(hex.slice(3, 5), 16),
      b = parseInt(hex.slice(5, 7), 16);
    for (let i = 0; i < p.length; i += 4) {
      if (p[i] > 180 && p[i + 1] < 90 && p[i + 2] < 90) {p[i] = r; p[i + 1] = g; p[i + 2] = b}
    }
    x.putImageData(d, 0, 0);
  } catch (e) {
    x.clearRect(0, 0, cv.width, cv.height);
    x.filter = "hue-rotate(" + hueof(hex) + "deg)"; // uhh kind of inaccurate color shift
    x.drawImage(im, 0, 0);
  }
  recolor[ck] = cv;
  return cv;
}

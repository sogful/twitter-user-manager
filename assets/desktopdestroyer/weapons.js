"use strict";

function rnd(a, b) {return a + Math.random() * (b - a)}
function rint(a, b) {return Math.floor(rnd(a, b + 1))}
function pick(arr) {return arr[rint(0, arr.length - 1)]}
function clamp(v, a, b) {return v < a ? a : v > b ? b : v}
function since(t0, fps) {return Math.floor((desktopdestroyer.tick - t0) * fps / tps)}
function afr(fps, frames, t0) {return since(t0 || 0, fps) % frames}

/*//////////////////////////////////////////////////////////////////////*/

const ap = {
  hammerhold: [-11, 58], hammerhit: [-15, 68],
  chainsaw: [39, 53], chainsawactive: [0, 0],
  machinegun: [96, 96], machinegunshoot: [96, 96],
  flamethrower: [58, 22], colorthrower: [47, 23],
  phaser: [122, 93], phaseractive: [122, 93],
  stamphold: [80, -120], stampplace: [80, -120],
  termitehandplacing: [35, 15], termitehand: [18, -10],
  washer: [123, 93], washeractive: [123, 93]
};

function tool(c, name, f, x, y, rot) {
  const o = ap[name];
  drawframe(c, name, f || 0, x + o[0], y + o[1], 1, rot || 0);
}

const sawdir = [180.8, -135.6, -0.8, 44.4, 90.9, 44.4, 88.2, 137.6];
function norm(a) {return (a + 540) % 360 - 180}
function sawrow(deg) {
  let best = 0, bd = 999;
  for (let i = 0; i < 8; i++) {
    const d = Math.abs(norm(deg - sawdir[i]));
    if (d < bd) {bd = d; best = i}
  }
  return best;
}

function stamp(group, x, y, scale, rot, hex) {
  let im = pickdecal(group);
  if (!im) return;
  if (hex) im = paintdecal(im, hex);
  drawdecal(desktopdestroyer.dctx, im, x, y, scale, rot);
}

function destroytermite(x, y, r, splat) {
  const r2 = r * r;
  for (const p of desktopdestroyer.fx) {
    if (p.kind !== "termite" || p.dead) continue;
    const dx = p.x - x, dy = p.y - y;
    if (dx * dx + dy * dy > r2) continue;
    p.dead = true;
    if (splat) drawdecal(desktopdestroyer.dctx, sheet("termitesplat"), p.x, p.y, 1, rnd(0, 6.3));
  }
}

/*//////////////////////////////////////////////////////////////////////*/

function panim(name, x, y, scale, fps) {
  const frames = grid(name).frames, t0 = desktopdestroyer.tick;
  return {
    x, y, scale: scale || 1, dead: false,
    update() {if (since(t0, fps) >= frames) this.dead = true},
    draw(c) {drawframe(c, name, Math.min(since(t0, fps), frames - 1), this.x, this.y, this.scale, 0)}
  };
}

function ppart(group, x, y) {
  const im = pickdecal(group);
  return {
    x, y, vx: rnd(-2.5, 2.5), vy: rnd(-3.5, -0.5), grav: rnd(0.18, 0.3), dead: false,
    update(dt) {
      this.vy += this.grav * dt;
      this.x += this.vx * dt; this.y += this.vy * dt;
      if (this.x < -16 || this.x > desktopdestroyer.W + 16 ||
        this.y > desktopdestroyer.H + 16 || this.y < -80) this.dead = true;
    },
    draw(c) {
      if (im) c.drawImage(im, Math.round(this.x - im.width / 2), Math.round(this.y - im.height / 2));
    }
  };
}

function pcasing(x, y) {
  const frames = grid("bullets").frames, t0 = desktopdestroyer.tick;
  return {
    x, y, vx: rnd(1.5, 3.5), vy: rnd(-4, -2), dead: false,
    update(dt) {
      this.vy += 0.32 * dt;
      this.x += this.vx * dt; this.y += this.vy * dt;
      if (this.y > desktopdestroyer.H) {this.dead = true; desktopdestroyer.sound.shell(); return}
      if (this.x < -40 || this.x > desktopdestroyer.W + 40 || this.y < -80) this.dead = true;
    },
    draw(c) {drawframe(c, "bullets", afr(12, frames, t0), this.x, this.y, 1, 0)}
  };
}

function pflame(x, y) {
  const frames = grid("flame").frames, t0 = desktopdestroyer.tick;
  const fly = rint(5, 10);
  const stick = fly + rint(6, 14);
  const life = stick + rint(90, 130);
  const a0 = -2.356 + rnd(-0.45, 0.45);
  const sp0 = rnd(6, 11);
  const a1 = rnd(0, 6.3), sp1 = rnd(0.15, 0.4);
  const sc = rnd(0.8, 1.4);
  return {
    x, y, n: 0, dead: false,
    update(dt) {
      this.n++;
      if (this.n <= fly) {
        const f = 1 - this.n / (fly + 1);
        this.x += Math.cos(a0) * sp0 * f * dt;
        this.y += Math.sin(a0) * sp0 * f * dt;
      } else if (this.n > stick) {
        this.x += Math.cos(a1) * sp1 * dt;
        this.y += Math.sin(a1) * sp1 * dt;
      }
      if (this.n > fly && this.n % 2 === 0) {
        stamp("scorch", this.x, this.y, 1, rnd(0, 6.3));
        destroytermite(this.x, this.y, 18, true);
      }
      if (this.n > life || this.x < -40 || this.x > desktopdestroyer.W + 40 ||
        this.y < -40 || this.y > desktopdestroyer.H + 40) this.dead = true;
    },
    draw(c) {drawframe(c, "flame", afr(7, frames, t0), this.x, this.y, sc, 0)}
  };
}

function pbubble(x, y, paint) {
  const name = "bubble" + paint[0], frames = grid(name).frames, t0 = desktopdestroyer.tick;
  return {
    x, y, vx: -rnd(0.6, 1.6), vy: -rnd(0.5, 1.3), dead: false,
    update(dt) {
      this.x += this.vx * dt; this.y += this.vy * dt;
      if (desktopdestroyer.tick - t0 >= frames) this.splat();
    },
    splat() {
      if (this.dead) return;
      this.dead = true;
      stamp("splatters", this.x, this.y, rnd(0.95, 1.35), rnd(0, 6.3), paint[1]);
      destroytermite(this.x, this.y, 45, false);
      desktopdestroyer.sound.colordrop();
    },
    draw(c) {
      drawframe(c, name, Math.min(desktopdestroyer.tick - t0, frames - 1), this.x, this.y, 1, 0);
    }
  };
}

function pspark(x, y) {
  const a = rnd(0, 6.3), s = rnd(2, 6);
  return {
    x, y, vx: Math.cos(a) * s, vy: Math.sin(a) * s, life: 0, max: rnd(3, 6), dead: false,
    update(dt) {
      this.vy += 0.2 * dt; this.vx *= 0.94;
      this.x += this.vx * dt; this.y += this.vy * dt;
      this.life++; if (this.life > this.max) this.dead = true;
    },
    draw(c) {
      c.fillStyle = "#ff9028";
      c.fillRect(Math.round(this.x) - 1, Math.round(this.y) - 1, 2, 2);
    }
  };
}

function ptermite(x, y) {
  const frames = grid("termites").frames, t0 = desktopdestroyer.tick;
  return {
    x, y, dir: rnd(0, 6.3), dead: false, kind: "termite",
    update(dt) {
      this.dir += rnd(-0.12, 0.12) * dt;
      this.x += Math.cos(this.dir) * 0.3 * dt;
      this.y += Math.sin(this.dir) * 0.3 * dt;
      const c = desktopdestroyer.dctx;
      c.fillStyle = "rgba(28,18,10,0.9)";
      c.beginPath(); c.arc(this.x, this.y, rnd(3, 4.2), 0, 7); c.fill();
      if (this.x < -20 || this.y < -20 ||
        this.x > desktopdestroyer.W + 20 || this.y > desktopdestroyer.H + 20) this.dead = true;
    },
    draw(c) {drawframe(c, "termites", afr(8, frames, t0), this.x, this.y, 1, this.dir + 1.57)}
  };
}

/*//////////////////////////////////////////////////////////////////////*/

const weapons = [
  {
    name: "hammer",
    cursor(c, x, y) {tool(c, desktopdestroyer.mouse.down ? "hammerhit" : "hammerhold", 0, x, y)},
    down(x, y) {
      stamp("cracks", x, y, 1, rnd(0, 6.3));
      destroytermite(x, y, 32, true);
      desktopdestroyer.sound.hammer();
      for (let i = 0; i < 6; i++) desktopdestroyer.fx.push(ppart("dust", x, y));
    }
  },
  {
    name: "chain-saw", dir: 180,
    onselect() {desktopdestroyer.sound.sawidle(true)},
    ondeselect() {desktopdestroyer.sound.sawidle(false); desktopdestroyer.sound.sawcut(false)},
    cursor(c, x, y) {
      const ph = afr(14, 2);
      if (desktopdestroyer.mouse.down) {
        const row = sawrow(this.dir);
        tool(c, "chainsawactive", row * 2 + ph, x, y, norm(this.dir - sawdir[row]) * Math.PI / 180);
      } else tool(c, "chainsaw", ph, x, y);
    },
    down(x, y) {
      this.lx = x; this.ly = y;
      desktopdestroyer.sound.sawidle(false); desktopdestroyer.sound.sawcut(true);
    },
    move(x, y) {
      const dx = x - this.lx, dy = y - this.ly;
      if (Math.hypot(dx, dy) > 2) {
        this.dir = Math.round(Math.atan2(dy, dx) * 180 / Math.PI / 22.5) * 22.5;
      }
      sawcutthing(desktopdestroyer.dctx, this.lx, this.ly, x, y);
      destroytermite(x, y, 12, true);
      for (let i = 0; i < 2; i++) desktopdestroyer.fx.push(ppart("fire", x, y));
      this.lx = x; this.ly = y;
    },
    up() {desktopdestroyer.sound.sawcut(false); desktopdestroyer.sound.sawidle(true)}
  },
  {
    name: "machine gun", auto: 90, firet: -999,
    cursor(c, x, y) {
      const firing = desktopdestroyer.tick - this.firet < 2;
      tool(c, firing ? "machinegunshoot" : "machinegun", afr(20, 2), x, y);
    },
    fire(x, y) {
      const sx = x + rnd(-5, 5), sy = y + rnd(-5, 5);
      stamp("black", sx, sy, 1, rnd(0, 6.3));
      destroytermite(sx, sy, 14, true);
      desktopdestroyer.fx.push(panim("tinyexplosion", sx, sy, 1.5, 30));
      desktopdestroyer.fx.push(pcasing(sx, sy - 2));
      this.firet = desktopdestroyer.tick;
      desktopdestroyer.sound.gun();
    },
    up() {desktopdestroyer.sound.gunend()}
  },
  {
    name: "flame-thrower", n: 0,
    cursor(c, x, y) {tool(c, "flamethrower", afr(8, 2), x, y)},
    tick(x, y) {
      this.n++;
      if (this.n % 2 === 0 && desktopdestroyer.fx.length < 240) {
        desktopdestroyer.fx.push(pflame(x + rnd(-6, 6), y + rnd(-6, 6)));
      }
      desktopdestroyer.sound.flame(true);
    },
    up() {desktopdestroyer.sound.flame(false)}
  },
  {
    name: "color-thrower", n: 0,
    cursor(c, x, y) {tool(c, "colorthrower", afr(10, 4), x, y)},
    tick(x, y) {
      this.n++;
      if (this.n % 2 === 0) {
        desktopdestroyer.fx.push(pbubble(x + rnd(-6, 6), y + rnd(-6, 6), pick(paints)));
      }
      desktopdestroyer.sound.spray(true);
    },
    up() {desktopdestroyer.sound.spray(false)}
  },
  {
    name: "phaser", auto: 200, firet: -999,
    cursor(c, x, y) {
      const firing = desktopdestroyer.tick - this.firet < 4;
      tool(c, firing ? "phaseractive" : "phaser", afr(15, 3), x, y);
    },
    fire(x, y) {
      stamp("burnmarks", x, y, 0.62, rnd(0, 6.3));
      stamp("burnmarks", x, y, 0.62, rnd(0, 6.3));
      destroytermite(x, y, 40, true);
      for (let i = 0; i < 6; i++) desktopdestroyer.fx.push(pspark(x, y));
      this.firet = desktopdestroyer.tick;
      desktopdestroyer.sound.phaser();
    }
  },
  {
    name: "stamp",
    cursor(c, x, y) {tool(c, desktopdestroyer.mouse.down ? "stampplace" : "stamphold", 0, x, y)},
    down(x, y) {
      stamp("stamps", x, y, 1, rnd(-0.12, 0.12));
      destroytermite(x, y, 40, true);
      desktopdestroyer.sound.stamp();
    }
  },
  {
    name: "termite",
    cursor(c, x, y) {
      if (desktopdestroyer.mouse.down) tool(c, "termitehand", 0, x, y);
      else tool(c, "termitehandplacing", afr(6, 3), x, y);
    },
    down(x, y) {desktopdestroyer.fx.push(ptermite(x, y)); desktopdestroyer.sound.termite()}
  },
  {
    name: "washing",
    cursor(c, x, y) {
      tool(c, desktopdestroyer.mouse.down ? "washeractive" : "washer", afr(15, 3), x, y);
    },
    down(x, y) {this.wash(x, y); desktopdestroyer.sound.wash(true)},
    move(x, y) {this.wash(x, y)},
    up() {desktopdestroyer.sound.wash(false)},
    wash(x, y) {
      const c = desktopdestroyer.dctx;
      c.save();
      c.globalCompositeOperation = "destination-out";
      c.beginPath(); c.arc(x, y, 26, 0, 7); c.fill();
      c.restore();
      destroytermite(x, y, 26, false);
    }
  }
];

/*//////////////////////////////////////////////////////////////////////*/

function sawcutthing(c, x1, y1, x2, y2) {
  const dx = x2 - x1, dy = y2 - y1;
  const n = Math.max(1, Math.round(Math.hypot(dx, dy)));
  c.fillStyle = "#000000";
  for (let i = 0; i <= n; i++) {
    const px = Math.round(x1 + dx * i / n), py = Math.round(y1 + dy * i / n);
    c.fillRect(px - 1, py - 1, 3, 3);
  }
}

import {chromium} from "playwright";
import {pathToFileURL} from "url";
const url = pathToFileURL(process.cwd() + "/index.html").href;
const b = await chromium.launch();
const pg = await b.newPage({viewport:{width:900,height:600}});
const errs=[], warns=[];
pg.on("pageerror", e=>errs.push("PAGEERR "+e.message));
pg.on("console", m=>{if(m.type()==="error")errs.push(m.text()); if(m.type()==="warning")warns.push(m.text())});
await pg.goto(url); await pg.waitForTimeout(900);

const names=["hammer","chainsaw","machinegun","flame","color","phaser","stamp","termite","washing"];
// cursor per weapon (idle)
for(let i=0;i<=8;i++){
  await pg.keyboard.press(String(i));
  await pg.mouse.move(450,300);
  await pg.waitForTimeout(90);
  await pg.screenshot({path:`probe_cur_${i}.png`});
}
// panel + hover on cell 4 (color-thrower, middle)
await pg.mouse.click(450,300,{button:"right"});
await pg.waitForTimeout(150);
const px=450-192+128+40, py=300-40+96+40; // middle cell centre
await pg.mouse.move(px,py); await pg.waitForTimeout(120);
await pg.screenshot({path:"probe_panel.png"});
await pg.keyboard.press("Escape");

// use each weapon somewhere
const spots=[[0,150,120],[1,240,120,360,230],[2,470,140],[3,600,150],[4,720,160],[5,200,330],[6,470,340],[7,620,350]];
for(const s of spots){
  await pg.keyboard.press(String(s[0]));
  await pg.mouse.move(s[1],s[2]); await pg.mouse.down();
  if(s[3]!==undefined){for(let i=0;i<=10;i++)await pg.mouse.move(s[1]+(s[3]-s[1])*i/10,s[2]+(s[4]-s[2])*i/10);}
  await pg.waitForTimeout(s[0]===3||s[0]===4?600:150);
  await pg.mouse.up(); await pg.waitForTimeout(60);
}
await pg.keyboard.press("2");
await pg.mouse.move(450,250); await pg.mouse.down(); await pg.waitForTimeout(500); await pg.mouse.up();
await pg.waitForTimeout(1400); // let bubbles splat
await pg.screenshot({path:"probe_render.png"});
console.log("ERRORS:",errs.length?errs.join(" | "):"none");
console.log("MISSING ASSETS:",warns.length?warns.join(" | "):"none");
await b.close();

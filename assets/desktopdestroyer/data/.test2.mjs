import {chromium} from "playwright";
import {pathToFileURL} from "url";
const url = pathToFileURL(process.cwd() + "/index.html").href;
const b = await chromium.launch();
const pg = await b.newPage({viewport:{width:900,height:600}});
const errs=[]; pg.on("pageerror",e=>errs.push(e.message));
await pg.goto(url); await pg.waitForTimeout(900);
async function active(key,x,y,name,drag){
  await pg.keyboard.press(key);
  await pg.mouse.move(x,y); await pg.mouse.down();
  if(drag){for(let i=1;i<=6;i++)await pg.mouse.move(x+drag[0]*i/6,y+drag[1]*i/6);}
  await pg.waitForTimeout(120);
  await pg.screenshot({path:`probe_act_${name}.png`});
  await pg.mouse.up(); await pg.waitForTimeout(80);
}
await active("5",450,300,"phaser");
await active("8",450,300,"washing");
await active("2",450,300,"machinegun");
await active("3",450,300,"flame");
await active("0",450,300,"hammer");
// chainsaw in 4 drag directions
const dirs={right:[60,0],down:[0,60],left:[-60,0],upleft:[-45,-45]};
for(const [n,d] of Object.entries(dirs)) await active("1",450,300,"saw_"+n,d);
console.log("ERRORS:",errs.length?errs.join(" | "):"none");
await b.close();

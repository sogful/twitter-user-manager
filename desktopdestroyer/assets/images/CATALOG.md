# asset catalog

graphics ripped from the gemtree "peter" engine exe. everything blits 1:1 (native px).
the frame grids below live in `assets.js` (`sheets`) - there is no manifest fetch,
so the page also runs straight off `file://`.

## tools (`tools/`)

each tool sprite hides its **action point** (hammer head, muzzle, nozzle, beam burst,
stamp face) somewhere inside its cell. `ap` in weapons.js shifts the cell so that point
lands on the cursor. the gray shapes are the engine's drop-shadow (alpha 112).

| file | cols x rows | cell | notes |
|------|------|------|------|
| hammerhold | 1x1 | 112x160 | idle (raised, angled) |
| hammerhit | 1x1 | 74x160 | striking (vertical) |
| chainsaw | 2x1 | 192x192 | idle, 2 chain phases |
| chainsawactive | 2x8 | 192x192 | **8 blade directions x 2 chain phases** - the blade swings to follow the drag |
| machinegun | 1x1 | 192x192 | idle |
| machinegunshoot | 2x1 | 192x192 | muzzle flash baked in |
| flamethrower | 2x1 | 320x256 | barrel points up-left |
| colorthrower | 4x1 | 320x256 | |
| phaser | 1x1 | 384x320 | idle |
| phaseractive | 3x1 | 384x320 | beam + green burst baked in |
| stamphold / stampplace | 1x1 | 256x256 | pawn raised / pressed (face drops 62px) |
| termitehand | 1x1 | 96x96 | idle |
| termitehandplacing | 3x1 | 128x96 | dropping termites |
| washer | 1x1 | 384x320 | idle |
| washeractive | 3x1 | 384x320 | jet + cyan burst baked in |

## effects

| file | cols x rows | cell | use |
|------|------|------|------|
| flame.png | 8x1 | 51x51 | flame-thrower fire |
| bullets.png | 8x1 | 64x64 | tumbling ejected casing |
| termites.png | 4x4 | 32x32 | crawling termite |
| termitesplat.png | 1x1 | 32x32 | squashed termite, left where any weapon hits one (the color-thrower buries it and the washer hoses it away, so those leave none) |
| bubbles/`<color>`.png | 20x1 | 64x64 | paint blob, swells over 20 frames then splats |
| tinyexplosion.png | 14x1 | 16x16 | machine-gun impact (leaves a black trace) |

## ui

| file | use |
|------|------|
| toolspopup.png (384x320) | right-click tool panel: 3x3 grid of 128x96 cells, bottom 32px is the footer |
| selectionbox.png (128x96) | hover highlight, exactly one cell |

## decals (stamped onto the damage layer)

| folder | count | size | weapon |
|------|------|------|------|
| cracks/ | 8 | 64x64 | hammer |
| particles/black*.png | 4 | 16x16 | black trace left by the machine-gun's tiny explosion |
| noise/ | 4 | 48x48 | flame-thrower scorch (tinted dark) |
| splatters/ | 5 | 128x128 | color-thrower; ships red, only the red body pixels are swapped so the black outline + white highlight survive |
| burnmarks/ | 10 | 128x128 | phaser |
| stamps/ | 9 | 96x96 | stamp prints (all English/universal) |
| particles/dust1-5.png | 5 | 6x6 | hammer debris |
| particles/fire1-5.png | 5 | 6x6 | chain-saw sparks |

## audio (`../audio/`, mapping in desktopdestroyer.js `snd`)

| files | trigger |
|------|------|
| crash, crash2, crash3, shatter, shatter2-4, break | hammer, one random per hit |
| sawprepare | chain-saw idle, looped while the tool is selected |
| saw | chain-saw cutting, looped while held (swaps with the idle loop) |
| shootheavy | machine gun, per shot |
| bang | machine-gun reverberation tail, on release |
| ammo, ammo2-8 | ejected casing landing, one random each |
| throwflamein / throwflame / throwflameout | flame-thrower start / loop / end |
| colorsplat | color-thrower spray, looped |
| colorsplat2 | paint blob impact |
| electricshock | phaser, per shot |
| stamp | stamp, per print |
| click | termite |
| waterflow | washing, looped |

unused: `burning.wav` (an alternate sustained fire loop), `bubbles/orange2.png`,
`colors/`, `bunny*` (mascot), `manifest.js` / `manifest.json` (stale leftovers -
safe to delete).

## engine notes

- the whole sim steps on a fixed **~20fps tick** (`tickms` in desktopdestroyer.js); nothing is
  drawn between ticks, so motion is chunky like the original. speeds are unchanged
  (`dt` compensates). there is no screen shake.
- audio uses **webaudio buffers** so the saw / flame / spray / water loops are
  seamless. over `file://` `fetch` is blocked and it falls back to `<audio>`, whose
  `loop` has an audible seam - serve over http (as github pages does) for gapless.
  `desktopdestroyer.sound.mode()` reports which path is live.
- the chain-saw sheet has no straight-up or up-right art, so the nearest row is
  drawn and rotated the remaining few degrees about the blade tip.

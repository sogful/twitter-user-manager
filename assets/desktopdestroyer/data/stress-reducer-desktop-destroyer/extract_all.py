# extract all graphics from the gemtree "peter" .petprg container.
# sections (consecutive from file offset 0x210, sizes in the 0x20-byte directory):
#   PICTURE  : 16 items, format A  [complen:u32][LZ]            -> 32x32
#   MAP      :  1 item , tiled                                  (blank desktop)
#   BACKGRND : 58 items, format B  [w:u32][h:u32][complen:u32][LZ]
#   SPRITE   : 48 items, tiled     [cellsX][cellsY][_][cellW|cellH<<16][..x4] + cells[[len:u32][LZ]]
# pixels are 8-bit palette indices, bottom-up (flip), index 0 = transparent.
import struct, json, os
from petlz import decompress
from PIL import Image

D = open(".petprg", "rb").read()
PAL = json.load(open("extracted/palette.json"))
OUT = "extracted/sprites"
os.makedirs(OUT, exist_ok=True)

# RGBA palette, index 0 transparent (color-key) per the engine's blit
RGBA = []
for i, c in enumerate(PAL):
    RGBA.append((c[0], c[1], c[2], 255))
RGBA += [(0, 0, 0, 0)] * (256 - len(RGBA))
RGBA[0] = (0, 0, 0, 0)        # index 0 = transparent color key
RGBA[1] = (0, 0, 0, 112)      # index 1 = engine's soft drop-shadow

def img_from_indices(pix, w, h):
    im = Image.new("RGBA", (w, h))
    im.putdata([RGBA[b] for b in pix])
    return im.transpose(Image.FLIP_TOP_BOTTOM)   # DIBs are bottom-up

def names():
    out = {}
    for ln in open("extracted/inventory.txt", encoding="latin1"):
        ln = ln.rstrip("\n")
        if len(ln) > 5 and ln[:3].strip().isdigit():
            out[int(ln[:3])] = ln[5:].strip()
    return out
NAMES = names()

def slug(s):
    return "".join(c if c.isalnum() else "_" for c in s.lower()).strip("_")[:48]

SEC = {"picture": 0x58363, "map": 0x58ab7, "background": 0x58fe7,
       "sprite": 0x7cfac, "sound": 0xbe48c}

def dump_background():
    o = SEC["background"]; n = 58; saved = 0
    for i in range(n):
        w, h, cl = struct.unpack("<III", D[o:o + 12])
        if not (0 < w < 4000 and 0 < h < 4000): break
        pix, _ = decompress(D, o + 12, w * h, w)
        img_from_indices(pix, w, h).save(f"{OUT}/bg_{i:02d}.png")
        o += 12 + cl; saved += 1
    return saved

def dump_sprite():
    o = SEC["sprite"]; n = 48; saved = 0; meta = []
    for i in range(n):
        cx, cy, d2 = struct.unpack("<III", D[o:o + 12])
        cw, ch = struct.unpack("<HH", D[o + 12:o + 16])
        if not (0 < cx < 64 and 0 < cy < 64 and 0 < cw <= 1024 and 0 < ch <= 1024):
            break
        p = o + 0x20
        W, H = cx * cw, cy * ch
        canvas = [0] * (W * H)
        for celly in range(cy):
            for cellx in range(cx):
                ln = struct.unpack("<I", D[p:p + 4])[0]
                pix, _ = decompress(D, p + 4, cw * ch, cw)
                for yy in range(ch):
                    for xx in range(cw):
                        canvas[(celly * ch + yy) * W + (cellx * cw + xx)] = pix[yy * cw + xx]
                p += 4 + ln
        img_from_indices(canvas, W, H).save(f"{OUT}/spr_{i:02d}.png")
        meta.append((i, cx, cy, cw, ch))
        o = p; saved += 1
    return saved, meta

def dump_picture():
    o = SEC["picture"]; n = 16; saved = 0
    for i in range(n):
        cl = struct.unpack("<I", D[o:o + 4])[0]
        if not (0 < cl < 0x40000): break
        pix, _ = decompress(D, o + 4, 32 * 32, 32)
        img_from_indices(pix, 32, 32).save(f"{OUT}/pic_{i:02d}.png")
        o += 4 + cl; saved += 1
    return saved

if __name__ == "__main__":
    nb = dump_background()
    ns, meta = dump_sprite()
    np = dump_picture()
    print(f"backgrounds: {nb}/58   sprites: {ns}/48   pictures: {np}/16")
    print("sprite cell-grids:", meta)
    print("output:", OUT)

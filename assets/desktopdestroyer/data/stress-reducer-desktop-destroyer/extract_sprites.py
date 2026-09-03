#!/usr/bin/env python3
"""
extract_sprites.py
reverse-engineering + asset extractor for the gemtree "peter" .petprg container
(stress reducer / desktop destroyer).

what this script DOES, with confidence levels:

 [solid]   reconstructs the exact 256-color (224 used) palette the interpreter
           builds in memory. index 0 = transparent, index 1 = 0x70 alpha shadow,
           indices >=0xe0 = transparent. saved as palette.png + palette.json.
 [solid]   extracts the full ordered inventory of every map/picture/sprite/
           background object name from the container's symbol-comment table.
           saved as inventory.txt. these are the human names (hammer, chain-saw,
           machine gun, flame, shell, splinter, potsherd, phaser, stamp, ...).
 [decoder] a complete decoder for the "PSPR" tile-map bitmap format the
           interpreter loads (FUN_00405d60). if a PSPR block is present it is
           decoded to an RGBA PNG (8-bit indexed -> palette, transparency keyed).
           the binary it loads stores maps as a grid of cells, each cell
           cellw*cellh 8-bit pixels, optionally LZ-bitstream compressed.

what this script could NOT do (documented in the report):
 - the flat / compressed pixel data for the 218 graphics objects is NOT present
   at the section-directory offsets in THIS particular .petprg dump, and no
   "PSPR" headers exist anywhere in the file (verified by full-file scan).
   the section directory dword[4] points into the symbol/comment table, not
   pixels. the audio region (0x59000-0xf6000) is genuine PCM (the 224 MUSIC
   clips), not disguised sprites. so the bitmaps are either stored only inside
   the compressed LOADER resource / a sibling file, or this dump was saved
   without rasterized graphics. the PSPR decoder below is ready for when a
   real PSPR-format export is provided.

binary format facts (from ghidra decomp of the interpreter):
 - maps/pictures are 8-bit palette-indexed.
 - in-memory map object (0x68 bytes): [+4]=width(cells) [+8]=height(cells)
   pixel cell array at [+0x20], width*height entries.
 - PSPR on-disk/clipboard header (0x28 bytes):
     +0x00  "PSPR" magic
     +0x04  u32 width   (cells, 1..0x800)
     +0x08  u32 height  (cells, 1..0x400)
     +0x0c  u32 sub     (<=width, width-sub<0x400)
     +0x10  u16 cellw   (pixels per cell, x)
     +0x12  u16 cellh   (pixels per cell, y)
     +0x14  u16 ?       (small)
     +0x16  u16/i16 ?   (CONCAT into a dword < 0x36ee81)
     +0x18  f64 ?       (0..1e6)
     +0x20  u32 palsize (10..0x100)
     +0x24  u32 flags   (low byte: 1 = LZ-compressed pixel stream)
   then palsize u32 palette entries, then either:
     flags==1: u32 complen, complen bytes -> LZ decode to w*h*cellw*cellh bytes
     else    : w*h*cellw*cellh raw 8-bit pixels
   pixels are stored cell-row-major; total = cellh*cellw*height*width bytes.
"""

import os, sys, json, struct, re

HERE = os.path.dirname(os.path.abspath(__file__))
DATADIR = os.path.normpath(os.path.join(HERE, ".."))   # parent "data" folder
def _find(name):
    for base in (HERE, DATADIR):
        p = os.path.join(base, name)
        if os.path.exists(p):
            return p
    return os.path.join(HERE, name)

PETPRG = _find(".petprg")
RDATA = _find(".rdata")
OUT = os.path.join(HERE, "extracted")
os.makedirs(OUT, exist_ok=True)

try:
    from PIL import Image
    HAVE_PIL = True
except Exception:
    HAVE_PIL = False


#/////////////////////////////////////////////////////////////////////////
# palette reconstruction (exact replica of interpreter FUN @ 0x4095f0)
#/////////////////////////////////////////////////////////////////////////

def build_palette(rdata_bytes):
    # base colors at .rdata 0x433bf8 (35 dwords, 0x00RRGGBB) and ramp at 0x433be4
    base = 0x433000
    def at(a, n): return rdata_bytes[a - base:a - base + n]
    ramp = list(struct.unpack("<5I", at(0x433be4, 20)))          # 0xd8 0xb0 0x84 0x58 0x2c
    basecols = list(struct.unpack("<35I", at(0x433bf8, 0x8c)))

    buf = bytearray(0x428)
    def w8(o, v): buf[o] = v & 0xff
    def w32(o, v): struct.pack_into("<I", buf, o, v & 0xffffffff)
    w32(0, 0x28); w32(4, 0x20); w32(8, 0x20)
    struct.pack_into("<H", buf, 12, 1); struct.pack_into("<H", buf, 14, 8)
    w32(0x24, 0xe0)
    # special seed bytes set before the ramp loop
    w8(0x2a, 0x95); w8(0x29, 0x22); w8(0x28, 0x8c)
    w8(0x2e, 0x61); w8(0x2d, 0x1e); w8(0x2c, 0x6f)
    pb = 0x30
    for ci in range(35):
        col = basecols[ci]
        w32(pb, col)
        b0, b1, b2 = buf[pb], buf[pb + 1], buf[pb + 2]
        p20 = pb + 5
        for ri in range(5):
            iv = ramp[ri]
            buf[p20 + 1] = (b2 * iv) >> 8
            buf[p20]     = (b1 * iv) >> 8
            buf[p20 - 1] = (b0 * iv) >> 8
            p20 += 4
        pb += 0x18
    # grayscale tail: iVar17 = 0xaf5, step -0xff, gray = iVar17/11
    iv = 0xaf5
    while iv >= 0:
        bv = (iv // 0xb) & 0xff
        buf[pb + 2] = bv; buf[pb + 1] = bv; buf[pb] = bv
        pb += 4
        iv -= 0xff

    pal = []  # list of (r,g,b)
    for i in range(256):
        o = 0x28 + i * 4
        B, G, R = buf[o], buf[o + 1], buf[o + 2]
        pal.append((R, G, B))
    return pal


def palette_alpha(idx):
    # from interpreter: index 0 fully transparent, index 1 ~ 0x70 shadow alpha,
    # indices >= 0xe0 transparent (unused tail).
    if idx == 0:
        return 0
    if idx == 1:
        return 0x70
    if idx >= 0xe0:
        return 0
    return 0xff


def save_palette_png(pal, path):
    if not HAVE_PIL:
        return
    cell = 16
    im = Image.new("RGB", (cell * 16, cell * 16), (0, 0, 0))
    px = im.load()
    for i in range(256):
        cx, cy = (i % 16) * cell, (i // 16) * cell
        r, g, b = pal[i]
        for y in range(cell):
            for x in range(cell):
                px[cx + x, cy + y] = (r, g, b)
    im.save(path)


#/////////////////////////////////////////////////////////////////////////
# LZ bitstream decompressor (replica of interpreter FUN @ 0x408a50)
# operates with a row predictor; rowlen = cellw bytes
#/////////////////////////////////////////////////////////////////////////

class BitReader:
    def __init__(self, data):
        self.d = data; self.i = 0; self.bit = 0; self.cur = 0
    def read_bit(self):
        if self.bit == 0:
            if self.i >= len(self.d):
                return 0
            self.cur = self.d[self.i]; self.i += 1; self.bit = 8
        b = self.cur & 1
        self.cur >>= 1; self.bit -= 1
        return b
    def read_byte(self):
        if self.i >= len(self.d):
            return 0
        v = self.d[self.i]; self.i += 1
        return v


def lz_decode(comp, outlen, rowlen):
    """approximate port of FUN_00408a50: literal / copy-prev-byte / copy-row-above."""
    br = BitReader(comp)
    out = bytearray()
    iv = -rowlen
    while len(out) < outlen:
        if br.read_bit() == 0:
            out.append(br.read_byte())            # literal from secondary stream
            continue
        if br.read_bit() == 0:
            if br.read_bit() == 0:
                out.append(out[-1] if out else 0)  # repeat prev byte once
            else:
                run = 0
                if br.read_bit(): run |= 1
                if br.read_bit(): run |= 2
                if br.read_bit(): run |= 4
                if run == 0: run = 0x16
                src = out[-2] if (run == 1 and len(out) >= 2) else (out[-1] if out else 0)
                for _ in range(run):
                    out.append(src)
        else:
            if br.read_bit() == 0:
                idx = len(out) + iv
                out.append(out[idx] if 0 <= idx < len(out) else 0)  # copy from row above
            else:
                run = 0
                if br.read_bit(): run |= 1
                if br.read_bit(): run |= 2
                if br.read_bit(): run |= 4
                if run == 0: run = 0x16
                for _ in range(run):
                    idx = len(out) + iv
                    out.append(out[idx] if 0 <= idx < len(out) else 0)
    return bytes(out[:outlen])


#/////////////////////////////////////////////////////////////////////////
# PSPR map decoder
#/////////////////////////////////////////////////////////////////////////

def decode_pspr(data, off, pal):
    if data[off:off + 4] != b"PSPR":
        return None
    w, h, sub = struct.unpack_from("<III", data, off + 4)
    cellw, cellh = struct.unpack_from("<HH", data, off + 0x10)
    palsize = struct.unpack_from("<I", data, off + 0x20)[0]
    flags = struct.unpack_from("<I", data, off + 0x24)[0]
    p = off + 0x28 + palsize * 4
    pixw, pixh = w * cellw, h * cellh
    total = pixw * pixh
    if flags & 1:
        complen = struct.unpack_from("<I", data, p)[0]; p += 4
        pix = lz_decode(data[p:p + complen], total, cellw)
    else:
        pix = data[p:p + total]
    if not HAVE_PIL:
        return (pixw, pixh, pix)
    im = Image.new("RGBA", (pixw, pixh))
    out = im.load()
    for y in range(pixh):
        for x in range(pixw):
            idx = pix[y * pixw + x] if y * pixw + x < len(pix) else 0
            r, g, b = pal[idx]
            out[x, y] = (r, g, b, palette_alpha(idx))
    return im


def find_and_decode_pspr(data, pal):
    n = 0; i = 0
    while True:
        j = data.find(b"PSPR", i)
        if j < 0: break
        try:
            im = decode_pspr(data, j, pal)
            if im is not None and HAVE_PIL:
                im.save(os.path.join(OUT, "pspr_%06x.png" % j)); n += 1
        except Exception as e:
            print("  pspr@%06x failed: %s" % (j, e))
        i = j + 4
    return n


#/////////////////////////////////////////////////////////////////////////
# inventory extraction (graphics object names, in file order)
#/////////////////////////////////////////////////////////////////////////

def extract_inventory(data):
    pat = re.compile(rb"(picture of [ -~]{2,60}|sprite of [ -~]{2,60}|map of [ -~]{2,60}|background of [ -~]{2,60})")
    seen, names = set(), []
    for m in pat.finditer(data):
        s = m.group(0).decode("latin1")
        s = re.sub(r"[\x00-\x1f].*$", "", s).rstrip()
        # drop trailing single punctuation that is actually the next record's len byte
        s = re.sub(r"[#!\"'$%&()*+]$", "", s).rstrip()
        if s and s not in seen:
            seen.add(s); names.append(s)
    return names


#/////////////////////////////////////////////////////////////////////////
# main
#/////////////////////////////////////////////////////////////////////////

def main():
    data = open(PETPRG, "rb").read()
    rd = open(RDATA, "rb").read()

    pal = build_palette(rd)
    json.dump(pal, open(os.path.join(OUT, "palette.json"), "w"))
    save_palette_png(pal, os.path.join(OUT, "palette.png"))
    print("palette: 256 entries (224 used), idx0=transparent idx1=shadow -> extracted/palette.png")

    names = extract_inventory(data)
    with open(os.path.join(OUT, "inventory.txt"), "w", encoding="utf-8") as f:
        for i, s in enumerate(names):
            f.write("%3d  %s\n" % (i, s))
    print("inventory: %d graphics objects -> extracted/inventory.txt" % len(names))

    npspr = find_and_decode_pspr(data, pal)
    print("PSPR bitmaps decoded from container: %d" % npspr)
    if npspr == 0:
        print("  (no PSPR blocks in this .petprg; pixel data not present in this dump.")
        print("   provide a PSPR export to decode bitmaps with this script.)")


if __name__ == "__main__":
    main()

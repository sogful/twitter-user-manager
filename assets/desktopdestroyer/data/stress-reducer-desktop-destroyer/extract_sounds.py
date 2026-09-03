# extract the SOUND section (34 clips) from the .petprg.
# each record: [len:u32][samplerate:u32][_:u32] then a WAVEFORMATEX (MS-ADPCM,
# wFormatTag=2, 50 bytes incl 7 coef pairs) followed by ADPCM data.
# browsers can't decode MS-ADPCM, so we decode to 16-bit PCM and write plain WAV.
import struct, os, wave

D = open(".petprg", "rb").read()
SOUND_OFF = 0xbe48c
N = 34
OUT = "extracted/sounds"
os.makedirs(OUT, exist_ok=True)

ADAPT = [230, 230, 230, 230, 307, 409, 512, 614,
         768, 614, 512, 409, 307, 230, 230, 230]

def clamp16(v):
    return -32768 if v < -32768 else 32767 if v > 32767 else v

def decode_adpcm(data, coefs, block_align, nch):
    # decode ms-adpcm (mono or stereo); stereo is downmixed to mono
    out = bytearray()
    pos = 0
    hdr = 7 * nch
    while pos + hdr <= len(data):
        blk = data[pos:pos + block_align]
        pos += block_align
        st = []
        for ch in range(nch):
            pred = blk[ch]
            if pred >= len(coefs): pred = 0
            st.append({"c": coefs[pred]})
        off = nch
        for ch in range(nch):
            st[ch]["d"] = struct.unpack("<h", blk[off:off + 2])[0]; off += 2
        for ch in range(nch):
            st[ch]["s1"] = struct.unpack("<h", blk[off:off + 2])[0]; off += 2
        for ch in range(nch):
            st[ch]["s2"] = struct.unpack("<h", blk[off:off + 2])[0]; off += 2
        # initial two sample frames
        out += struct.pack("<h", sum(s["s2"] for s in st) // nch)
        out += struct.pack("<h", sum(s["s1"] for s in st) // nch)
        nibs = []
        for i in range(off, len(blk)):
            nibs.append((blk[i] >> 4) & 0xF); nibs.append(blk[i] & 0xF)
        for k in range(0, len(nibs) - nch + 1, nch):
            frame = []
            for ch in range(nch):
                s = st[ch]; c1, c2 = s["c"]; nib = nibs[k + ch]
                predict = (s["s1"] * c1 + s["s2"] * c2) >> 8
                sn = nib - 16 if nib >= 8 else nib
                val = clamp16(predict + sn * s["d"])
                s["s2"] = s["s1"]; s["s1"] = val
                d = (ADAPT[nib] * s["d"]) >> 8
                s["d"] = 16 if d < 16 else d
                frame.append(val)
            out += struct.pack("<h", sum(frame) // nch)
    return bytes(out)

def extract():
    o = SOUND_OFF
    info = []
    for i in range(N):
        ln = struct.unpack("<I", D[o:o + 4])[0]
        sr = struct.unpack("<I", D[o + 4:o + 8])[0]
        fmt = o + 0xc
        tag, ch = struct.unpack("<HH", D[fmt:fmt + 4])
        sps = struct.unpack("<I", D[fmt + 4:fmt + 8])[0]
        ba = struct.unpack("<H", D[fmt + 12:fmt + 14])[0]
        bits = struct.unpack("<H", D[fmt + 14:fmt + 16])[0]
        ncoef = struct.unpack("<H", D[fmt + 20:fmt + 22])[0]
        if tag != 2 or ncoef > 16 or ba == 0 or ln < 64:
            info.append((i, sr, 0, 0, 0.0))   # placeholder / non-adpcm, skip
            o = o + 0xc + ln
            continue
        coefs = []
        for k in range(ncoef):
            a, b = struct.unpack("<hh", D[fmt + 22 + k * 4:fmt + 22 + k * 4 + 4])
            coefs.append((a, b))
        fmt_size = 22 + ncoef * 4
        adpcm = D[fmt + fmt_size: o + 0xc + ln]
        if tag == 2:
            pcm = decode_adpcm(adpcm, coefs, ba, ch if ch in (1, 2) else 1)
        else:                               # plain 8-bit pcm fallback
            pcm = b"".join(struct.pack("<h", (b - 128) << 8) for b in adpcm)
        w = wave.open(f"{OUT}/snd_{i:02d}.wav", "wb")
        w.setnchannels(1); w.setsampwidth(2); w.setframerate(sps)
        w.writeframes(pcm); w.close()
        dur = len(pcm) / 2 / sps
        info.append((i, sps, ba, len(adpcm), round(dur, 2)))
        o = o + 0xc + ln
    return info

if __name__ == "__main__":
    for r in extract():
        print("snd_%02d  rate=%d blockalign=%d adpcm=%d dur=%.2fs" % r)
    print("output:", OUT)

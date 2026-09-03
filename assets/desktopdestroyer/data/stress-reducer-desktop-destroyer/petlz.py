# port of the gemtree "peter" LZ bitstream codec (exe FUN_00408a50 / FUN_004089f0)
# bits are LSB-first; control bits and literal bytes share one source pointer.

def decompress(src, off, outsize, stride):
    if outsize < stride or stride < 2:
        stride = outsize
    dst = bytearray(outsize)
    sp = off
    bb = 0  # 16-bit bit buffer; refill pulls a 16-bit LE word (0x8000 sentinel)

    def readbyte():
        nonlocal sp
        b = src[sp]; sp += 1; return b

    def readbit():
        nonlocal bb, sp
        low = bb & 1
        if (bb >> 1) == 0:
            w = src[sp] | (src[sp + 1] << 8); sp += 2
            bb = ((w >> 1) | 0x8000) & 0xFFFF
            return w & 1
        bb = (bb >> 1) & 0xFFFF
        return low

    dp = 0
    while dp < outsize:
        if readbit() == 0:                       # 0 : literal byte
            dst[dp] = readbyte(); dp += 1; continue
        if readbit() == 0:                        # 10x : left-neighbour ops
            if readbit() == 0:                    # 100 : copy dst[-1]
                dst[dp] = dst[dp - 1]; dp += 1
            else:                                 # 101 : length-coded
                L = readbit() | (readbit() << 1) | (readbit() << 2)
                if L == 1:
                    dst[dp] = dst[dp - 2]; dp += 1
                else:
                    if L == 0: L = 0x16
                    v = dst[dp - 1]
                    for _ in range(L): dst[dp] = v; dp += 1
        else:                                     # 11x : row-above ops
            if readbit() == 0:                    # 110 : copy dst[-stride]
                dst[dp] = dst[dp - stride]; dp += 1
            else:                                 # 111 : length-coded
                L = readbit() | (readbit() << 1) | (readbit() << 2)
                if L == 1:
                    dst[dp] = dst[dp - stride + 1]; dp += 1
                else:
                    if L == 0: L = 0x16
                    for _ in range(L):
                        dst[dp] = dst[dp - stride]; dp += 1
    return bytes(dst), sp

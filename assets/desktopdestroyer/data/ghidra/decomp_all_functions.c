/* decomp_all_functions.c — full Ghidra decompile of every function. */
/* Each block is preceded by a /*** TARGET <hexAddr> <name> ***/ banner. */
/* Grep for the banner to find a function by RVA or name. */


/******************************************************************************/
/* TARGET 00401000  FUN_00401000 */
/******************************************************************************/

void __fastcall FUN_00401000(undefined4 *param_1)

{
  *param_1 = &DAT_00436100;
  DAT_00436100 = DAT_00436100 + 1;
  return;
}



/******************************************************************************/
/* TARGET 00401020  FUN_00401020 */
/******************************************************************************/

void __thiscall FUN_00401020(void *this,undefined4 *param_1)

{
  int *piVar1;
  
  piVar1 = (int *)*param_1;
  *(int **)this = piVar1;
  *piVar1 = *piVar1 + 1;
  return;
}



/******************************************************************************/
/* TARGET 00401030  FUN_00401030 */
/******************************************************************************/

void __fastcall FUN_00401030(int *param_1)

{
  int iVar1;
  
  iVar1 = *(int *)*param_1 + -1;
  *(int *)*param_1 = iVar1;
  if (iVar1 == 0) {
    if (*(HICON *)(*param_1 + 8) != (HICON)0x0) {
      DestroyIcon(*(HICON *)(*param_1 + 8));
    }
    if (*(HCURSOR *)(*param_1 + 0xc) != (HCURSOR)0x0) {
      DestroyCursor(*(HCURSOR *)(*param_1 + 0xc));
    }
    FUN_0040d410(*(int **)(*param_1 + 0x14));
    FUN_0040d410((int *)*param_1);
  }
  return;
}



/******************************************************************************/
/* TARGET 00401070  FUN_00401070 */
/******************************************************************************/

void __fastcall FUN_00401070(undefined4 *param_1)

{
  *param_1 = &DAT_00436100;
  DAT_00436100 = DAT_00436100 + 1;
  return;
}



/******************************************************************************/
/* TARGET 00401090  FUN_00401090 */
/******************************************************************************/

void __thiscall FUN_00401090(void *this,int *param_1)

{
  *(int **)this = param_1;
  *param_1 = *param_1 + 1;
  return;
}



/******************************************************************************/
/* TARGET 004010a0  FUN_004010a0 */
/******************************************************************************/

void __fastcall FUN_004010a0(undefined4 *param_1)

{
  undefined4 *puVar1;
  LPVOID pvVar2;
  
  puVar1 = FUN_0040d3a0(0x18);
  *param_1 = puVar1;
  *puVar1 = 1;
  puVar1[1] = 3;
  puVar1[2] = 0;
  puVar1[3] = 0;
  pvVar2 = FUN_0040d3a0(0x400);
  puVar1[5] = pvVar2;
  return;
}



/******************************************************************************/
/* TARGET 004010e0  FUN_004010e0 */
/******************************************************************************/

void __fastcall FUN_004010e0(int *param_1)

{
  undefined1 *puVar1;
  
  if (*(int *)(*param_1 + 4) == 4) {
    puVar1 = FUN_0040d3a0(0x400);
    FUN_00408a50(puVar1,(undefined1 *)(*(int *)(*param_1 + 0x14) + 4),0x400,0x20);
    *(undefined1 **)(*param_1 + 0x14) = puVar1;
    *(int *)*param_1 = *(int *)*param_1 + -0x40000000;
    *(undefined4 *)(*param_1 + 4) = 3;
  }
  return;
}



/******************************************************************************/
/* TARGET 00401130  FUN_00401130 */
/******************************************************************************/

void __fastcall FUN_00401130(int *param_1)

{
  int iVar1;
  
  iVar1 = *(int *)*param_1 + -1;
  *(int *)*param_1 = iVar1;
  if (iVar1 == 0) {
    if (*(HICON *)(*param_1 + 8) != (HICON)0x0) {
      DestroyIcon(*(HICON *)(*param_1 + 8));
    }
    if (*(HCURSOR *)(*param_1 + 0xc) != (HCURSOR)0x0) {
      DestroyCursor(*(HCURSOR *)(*param_1 + 0xc));
    }
    FUN_0040d410(*(int **)(*param_1 + 0x14));
    FUN_0040d410((int *)*param_1);
  }
  *param_1 = (int)&DAT_00436100;
  DAT_00436100 = DAT_00436100 + 1;
  return;
}



/******************************************************************************/
/* TARGET 00401180  FUN_00401180 */
/******************************************************************************/

void __fastcall FUN_00401180(int *param_1)

{
  undefined4 *puVar1;
  LPVOID pvVar2;
  int iVar3;
  
  iVar3 = *(int *)*param_1;
  if (iVar3 != 1) {
    iVar3 = iVar3 + -1;
    *(int *)*param_1 = iVar3;
    if (iVar3 == 0) {
      if (*(HICON *)(*param_1 + 8) != (HICON)0x0) {
        DestroyIcon(*(HICON *)(*param_1 + 8));
      }
      if (*(HCURSOR *)(*param_1 + 0xc) != (HCURSOR)0x0) {
        DestroyCursor(*(HCURSOR *)(*param_1 + 0xc));
      }
      FUN_0040d410(*(int **)(*param_1 + 0x14));
      FUN_0040d410((int *)*param_1);
    }
    puVar1 = FUN_0040d3a0(0x18);
    *param_1 = (int)puVar1;
    *puVar1 = 1;
    puVar1[1] = 3;
    puVar1[2] = 0;
    puVar1[3] = 0;
    pvVar2 = FUN_0040d3a0(0x400);
    puVar1[5] = pvVar2;
  }
  return;
}



/******************************************************************************/
/* TARGET 00401200  FUN_00401200 */
/******************************************************************************/

undefined4 __thiscall FUN_00401200(void *this,int param_1)

{
  HANDLE hFile;
  int *lpBuffer;
  char *pcVar1;
  BOOL BVar2;
  undefined4 uVar3;
  uint uVar4;
  byte bVar5;
  int iVar6;
  undefined4 *puVar7;
  byte *pbVar8;
  int *piVar9;
  undefined4 *puVar10;
  char *pcVar11;
  DWORD local_4;
  
  FUN_004010e0(this);
  hFile = CreateFileA((LPCSTR)(param_1 + 0xc),0x40000000,0,(LPSECURITY_ATTRIBUTES)0x0,2,0x80,
                      (HANDLE)0x0);
  if (hFile != (HANDLE)0xffffffff) {
    lpBuffer = FUN_0040d3a0(0x8be);
    piVar9 = lpBuffer;
    for (iVar6 = 0x22f; iVar6 != 0; iVar6 = iVar6 + -1) {
      *piVar9 = 0;
      piVar9 = piVar9 + 1;
    }
    *(undefined2 *)piVar9 = 0;
    *(undefined2 *)((int)lpBuffer + 2) = 1;
    *(undefined2 *)(lpBuffer + 1) = 1;
    *(undefined1 *)((int)lpBuffer + 6) = 0x20;
    *(undefined1 *)((int)lpBuffer + 7) = 0x20;
    *(undefined4 *)((int)lpBuffer + 0xe) = 0x8a8;
    *(undefined4 *)((int)lpBuffer + 0x12) = 0x16;
    *(undefined4 *)((int)lpBuffer + 0x16) = 0x28;
    *(undefined4 *)((int)lpBuffer + 0x1a) = 0x20;
    *(undefined4 *)((int)lpBuffer + 0x1e) = 0x40;
    *(undefined2 *)((int)lpBuffer + 0x22) = 1;
    *(undefined2 *)(lpBuffer + 9) = 8;
    *(undefined4 *)((int)lpBuffer + 0x2a) = 0x400;
    pcVar1 = (char *)((int)lpBuffer + 0x43e);
    puVar7 = (undefined4 *)(DAT_00437118 + 0x2c);
    puVar10 = (undefined4 *)((int)lpBuffer + 0x42);
    for (iVar6 = 0xff; iVar6 != 0; iVar6 = iVar6 + -1) {
      *puVar10 = *puVar7;
      puVar7 = puVar7 + 1;
      puVar10 = puVar10 + 1;
    }
    puVar7 = *(undefined4 **)(*(int *)this + 0x14);
    pcVar11 = pcVar1;
    for (iVar6 = 0x100; iVar6 != 0; iVar6 = iVar6 + -1) {
      *(undefined4 *)pcVar11 = *puVar7;
      puVar7 = puVar7 + 1;
      pcVar11 = pcVar11 + 4;
    }
    pbVar8 = (byte *)((int)lpBuffer + 0x83e);
    iVar6 = 0x80;
    do {
      bVar5 = 0;
      if (*pcVar1 == '\0') {
        bVar5 = 0x80;
      }
      if (pcVar1[1] == '\0') {
        bVar5 = bVar5 | 0x40;
      }
      if (pcVar1[2] == '\0') {
        bVar5 = bVar5 | 0x20;
      }
      if (pcVar1[3] == '\0') {
        bVar5 = bVar5 | 0x10;
      }
      if (pcVar1[4] == '\0') {
        bVar5 = bVar5 | 8;
      }
      if (pcVar1[5] == '\0') {
        bVar5 = bVar5 | 4;
      }
      if (pcVar1[6] == '\0') {
        bVar5 = bVar5 | 2;
      }
      if (pcVar1[7] == '\0') {
        bVar5 = bVar5 | 1;
      }
      pcVar1 = pcVar1 + 8;
      *pbVar8 = bVar5;
      pbVar8 = pbVar8 + 1;
      iVar6 = iVar6 + -1;
    } while (iVar6 != 0);
    BVar2 = WriteFile(hFile,lpBuffer,0x8be,&local_4,(LPOVERLAPPED)0x0);
    CloseHandle(hFile);
    FUN_0040d410(lpBuffer);
    if ((BVar2 != 0) && (local_4 == 0x8be)) {
      uVar3 = FUN_00406610(&param_1);
      return CONCAT31((int3)((uint)uVar3 >> 8),1);
    }
    DeleteFileA((LPCSTR)(param_1 + 0xc));
  }
  uVar4 = FUN_00406610(&param_1);
  return uVar4 & 0xffffff00;
}



/******************************************************************************/
/* TARGET 00401390  FUN_00401390 */
/******************************************************************************/

undefined4 __fastcall FUN_00401390(int *param_1)

{
  undefined4 uVar1;
  HICON pHVar2;
  int extraout_ECX;
  int iVar3;
  int *local_4;
  
  if (*(int *)(*param_1 + 8) == 0) {
    local_4 = param_1;
    FUN_004064c0(&local_4);
    FUN_00406d50((int *)&local_4);
    iVar3 = extraout_ECX;
    FUN_00401020(&stack0xfffffff4,&local_4);
    uVar1 = FUN_00401200(param_1,iVar3);
    if ((char)uVar1 != '\0') {
      pHVar2 = ExtractIconA(DAT_00437268,(LPCSTR)(local_4 + 3),0);
      *(HICON *)(*param_1 + 8) = pHVar2;
      if (*(int *)(*param_1 + 8) == 1) {
        *(undefined4 *)(*param_1 + 8) = 0;
      }
      DeleteFileA((LPCSTR)(local_4 + 3));
    }
    FUN_00406610(&local_4);
    return *(undefined4 *)(*param_1 + 8);
  }
  return *(undefined4 *)(*param_1 + 8);
}



/******************************************************************************/
/* TARGET 00401420  FUN_00401420 */
/******************************************************************************/

undefined4 __fastcall FUN_00401420(int *param_1)

{
  byte bVar1;
  uint uVar2;
  byte *pbVar3;
  byte *pbVar4;
  int *pvANDPlane;
  int *pvXORPlane;
  HCURSOR pHVar5;
  byte bVar6;
  int iVar7;
  int xHotSpot;
  int iVar8;
  byte local_26;
  byte local_25;
  byte *local_24;
  byte *local_20;
  int local_1c;
  byte *local_18;
  int local_14;
  
  if (*(int *)(*param_1 + 0xc) != 0) {
    return *(undefined4 *)(*param_1 + 0xc);
  }
  FUN_004010e0(param_1);
  local_18 = *(byte **)(*param_1 + 0x14);
  pvANDPlane = FUN_0040d3a0(0x80);
  local_24 = (byte *)(pvANDPlane + 0x1f);
  pvXORPlane = FUN_0040d3a0(0x80);
  local_20 = (byte *)(pvXORPlane + 0x1f);
  xHotSpot = 0x10;
  local_14 = 0x10;
  local_1c = 0x1f;
  do {
    iVar7 = 8;
    pbVar3 = local_24;
    pbVar4 = local_20;
    do {
      local_20 = pbVar4;
      local_24 = pbVar3;
      local_25 = 0xff;
      local_26 = 0;
      bVar6 = 0x80;
      iVar8 = 7;
      do {
        bVar1 = *local_18;
        local_18 = local_18 + 1;
        if (bVar1 != 0) {
          if (bVar1 < 0xd4) {
            uVar2 = (uint)bVar1;
            if (0x31 < uVar2) {
              xHotSpot = iVar7 - iVar8;
              local_14 = local_1c;
            }
            if ((uVar2 < 0x3f) ||
               ((uVar2 < 0x80 && (local_25 = local_25 ^ bVar6, (int)(uVar2 - 2) % 6 < 3))))
            goto LAB_0040151a;
          }
          else {
            local_25 = local_25 ^ bVar6;
            if (bVar1 < 0xda) {
LAB_0040151a:
              local_26 = local_26 | bVar6;
            }
          }
        }
        bVar6 = bVar6 >> 1;
        iVar8 = iVar8 + -1;
      } while (-1 < iVar8);
      iVar7 = iVar7 + 8;
      *local_24 = local_25;
      *local_20 = local_26;
      pbVar3 = local_24 + 1;
      pbVar4 = local_20 + 1;
    } while (iVar7 < 0x21);
    local_24 = local_24 + -7;
    local_20 = local_20 + -7;
    local_1c = local_1c + -1;
    if (local_1c < 0) {
      pHVar5 = CreateCursor(DAT_00437268,xHotSpot,local_14,0x20,0x20,pvANDPlane,pvXORPlane);
      *(HCURSOR *)(*param_1 + 0xc) = pHVar5;
      FUN_0040d410(pvANDPlane);
      FUN_0040d410(pvXORPlane);
      return *(undefined4 *)(*param_1 + 0xc);
    }
  } while( true );
}



/******************************************************************************/
/* TARGET 004015d0  FUN_004015d0 */
/******************************************************************************/

int * __thiscall FUN_004015d0(void *this,int *param_1)

{
  int *piVar1;
  int iVar2;
  
  iVar2 = **(int **)this + -1;
  **(int **)this = iVar2;
  if (iVar2 == 0) {
    if (*(HICON *)(*(int *)this + 8) != (HICON)0x0) {
      DestroyIcon(*(HICON *)(*(int *)this + 8));
    }
    if (*(HCURSOR *)(*(int *)this + 0xc) != (HCURSOR)0x0) {
      DestroyCursor(*(HCURSOR *)(*(int *)this + 0xc));
    }
    FUN_0040d410(*(int **)(*(int *)this + 0x14));
    FUN_0040d410(*(int **)this);
  }
  piVar1 = (int *)*param_1;
  *(int **)this = piVar1;
  *piVar1 = *piVar1 + 1;
  return this;
}



/******************************************************************************/
/* TARGET 00401630  FUN_00401630 */
/******************************************************************************/

void __fastcall FUN_00401630(int *param_1)

{
  int *piVar1;
  
  FUN_00401670(param_1,param_1[1]);
  piVar1 = FUN_0040d470((int *)*param_1,0);
  *param_1 = (int)piVar1;
  param_1[2] = 0;
  return;
}



/******************************************************************************/
/* TARGET 00401650  FUN_00401650 */
/******************************************************************************/

undefined * __fastcall FUN_00401650(int *param_1,uint param_2)

{
  if (param_2 < (uint)param_1[1]) {
    return (undefined *)(*param_1 + param_2 * 4);
  }
  return &DAT_0043708c;
}



/******************************************************************************/
/* TARGET 00401670  FUN_00401670 */
/******************************************************************************/

void __fastcall FUN_00401670(int *param_1,int param_2)

{
  int iVar1;
  int *piVar2;
  
  iVar1 = param_1[1];
  if (iVar1 < param_2) {
    param_2 = iVar1;
  }
  piVar2 = (int *)(*param_1 + -4 + iVar1 * 4);
  param_1[1] = iVar1 - param_2;
  if (0 < param_2) {
    do {
      FUN_00401030(piVar2);
      piVar2 = piVar2 + -1;
      param_2 = param_2 + -1;
    } while (param_2 != 0);
  }
  return;
}



/******************************************************************************/
/* TARGET 004016a0  FUN_004016a0 */
/******************************************************************************/

int __fastcall FUN_004016a0(int *param_1)

{
  int iVar1;
  
  iVar1 = param_1[1];
  if (param_1[2] <= iVar1) {
    FUN_00401850(param_1);
  }
  param_1[1] = iVar1 + 1;
  FUN_004010a0((undefined4 *)(*param_1 + iVar1 * 4));
  return iVar1;
}



/******************************************************************************/
/* TARGET 004016d0  FUN_004016d0 */
/******************************************************************************/

int __fastcall FUN_004016d0(int *param_1,int *param_2)

{
  int iVar1;
  
  iVar1 = param_1[1];
  if (param_1[2] <= iVar1) {
    FUN_00401850(param_1);
  }
  param_1[1] = iVar1 + 1;
  FUN_00401090((void *)(*param_1 + iVar1 * 4),param_2);
  return iVar1;
}



/******************************************************************************/
/* TARGET 00401700  FUN_00401700 */
/******************************************************************************/

int __fastcall FUN_00401700(int *param_1,uint param_2)

{
  int iVar1;
  
  iVar1 = param_1[1];
  if (param_1[2] <= iVar1) {
    FUN_00401850(param_1);
  }
  param_1[1] = iVar1 + 1U;
  if (param_2 < iVar1 + 1U) {
    FUN_00401090((void *)(*param_1 + iVar1 * 4),*(int **)(*param_1 + param_2 * 4));
    return iVar1;
  }
  FUN_00401070((undefined4 *)(*param_1 + iVar1 * 4));
  return iVar1;
}



/******************************************************************************/
/* TARGET 00401750  FUN_00401750 */
/******************************************************************************/

int __fastcall FUN_00401750(int *param_1,uint param_2,int param_3)

{
  int iVar1;
  int *piVar2;
  int iVar3;
  int iVar4;
  
  iVar1 = param_1[1];
  if (param_1[2] <= iVar1) {
    FUN_00401850(param_1);
  }
  param_1[1] = iVar1 + 1U;
  if (param_2 < iVar1 + 1U) {
    piVar2 = *(int **)(*param_1 + param_2 * 4);
    FUN_00401090((void *)(*param_1 + iVar1 * 4),piVar2);
    param_3 = param_3 + -1;
    if (0 < param_3) {
      do {
        iVar4 = param_1[1];
        if (param_1[2] <= iVar4) {
          FUN_00401850(param_1);
        }
        param_1[1] = iVar4 + 1;
        FUN_00401090((void *)(*param_1 + iVar4 * 4),piVar2);
        param_3 = param_3 + -1;
      } while (param_3 != 0);
      return iVar1;
    }
  }
  else {
    FUN_00401070((undefined4 *)(*param_1 + iVar1 * 4));
    iVar4 = param_3 + -1;
    if (0 < iVar4) {
      do {
        iVar3 = param_1[1];
        if (param_1[2] <= iVar3) {
          FUN_00401850(param_1);
        }
        param_1[1] = iVar3 + 1;
        FUN_00401070((undefined4 *)(*param_1 + iVar3 * 4));
        iVar4 = iVar4 + -1;
      } while (iVar4 != 0);
    }
  }
  return iVar1;
}



/******************************************************************************/
/* TARGET 00401810  FUN_00401810 */
/******************************************************************************/

undefined4 * __thiscall FUN_00401810(void *this,int param_1)

{
  *(undefined4 *)this = 0;
  *(undefined4 *)((int)this + 4) = 0;
  *(undefined4 *)((int)this + 8) = 0;
  FUN_004018a0(this,param_1);
  FUN_004018d0(this,0xffffffff);
  return this;
}



/******************************************************************************/
/* TARGET 00401840  thunk_FUN_00401880 */
/******************************************************************************/

void __fastcall thunk_FUN_00401880(undefined4 *param_1)

{
  int *piVar1;
  
  piVar1 = FUN_0040d470((int *)*param_1,0);
  *param_1 = piVar1;
  param_1[1] = 0;
  param_1[2] = 0;
  return;
}



/******************************************************************************/
/* TARGET 00401850  FUN_00401850 */
/******************************************************************************/

void __fastcall FUN_00401850(undefined4 *param_1)

{
  int iVar1;
  int *piVar2;
  
  iVar1 = param_1[2];
  param_1[2] = iVar1 << 1;
  if (iVar1 << 1 == 0) {
    param_1[2] = 0x400;
  }
  piVar2 = FUN_0040d470((int *)*param_1,param_1[2] << 2);
  *param_1 = piVar2;
  return;
}



/******************************************************************************/
/* TARGET 00401880  FUN_00401880 */
/******************************************************************************/

void __fastcall FUN_00401880(undefined4 *param_1)

{
  int *piVar1;
  
  piVar1 = FUN_0040d470((int *)*param_1,0);
  *param_1 = piVar1;
  param_1[1] = 0;
  param_1[2] = 0;
  return;
}



/******************************************************************************/
/* TARGET 004018a0  FUN_004018a0 */
/******************************************************************************/

void __fastcall FUN_004018a0(undefined4 *param_1,int param_2)

{
  uint uVar1;
  int *piVar2;
  
  param_1[1] = param_2;
  if ((int)param_1[2] < param_2) {
    uVar1 = param_2 + 0x800U & 0xfffffc00;
    param_1[2] = uVar1;
    piVar2 = FUN_0040d470((int *)*param_1,uVar1 * 4);
    *param_1 = piVar2;
  }
  return;
}



/******************************************************************************/
/* TARGET 004018d0  FUN_004018d0 */
/******************************************************************************/

void __fastcall FUN_004018d0(undefined4 *param_1,undefined4 param_2)

{
  int iVar1;
  undefined4 *puVar2;
  
  iVar1 = param_1[1];
  puVar2 = (undefined4 *)*param_1;
  if (0 < iVar1) {
    for (; iVar1 != 0; iVar1 = iVar1 + -1) {
      *puVar2 = param_2;
      puVar2 = puVar2 + 1;
    }
  }
  return;
}



/******************************************************************************/
/* TARGET 004018e0  FUN_004018e0 */
/******************************************************************************/

void __fastcall FUN_004018e0(int *param_1,uint param_2,undefined4 param_3)

{
  uint uVar1;
  undefined1 *puVar2;
  uint uVar3;
  undefined4 *puVar4;
  undefined4 *puVar5;
  int iVar6;
  undefined4 *puVar7;
  
  uVar1 = param_1[1];
  if (uVar1 < param_2) {
    param_2 = ((int)param_2 < 0) - 1 & uVar1;
  }
  uVar3 = uVar1 - param_2;
  FUN_004018a0(param_1,uVar1 + 1);
  if ((int)uVar3 < 1) {
    *(undefined4 *)(*param_1 + param_2 * 4) = param_3;
    return;
  }
  iVar6 = uVar3 * 4;
  puVar5 = (undefined4 *)(*param_1 + param_2 * 4);
  puVar7 = (undefined4 *)(*param_1 + 4 + param_2 * 4);
  if ((puVar5 < puVar7) && (puVar4 = puVar5 + uVar3, puVar7 < puVar4)) {
    puVar2 = (undefined1 *)((int)puVar7 + iVar6 + -1);
    if (iVar6 < 1) {
      *(undefined4 *)(*param_1 + param_2 * 4) = param_3;
      return;
    }
    do {
      puVar4 = (undefined4 *)((int)puVar4 - 1);
      *puVar2 = *(undefined1 *)puVar4;
      puVar2 = puVar2 + -1;
      iVar6 = iVar6 + -1;
    } while (iVar6 != 0);
    *(undefined4 *)(*param_1 + param_2 * 4) = param_3;
    return;
  }
  for (uVar3 = uVar3 & 0x3fffffff; uVar3 != 0; uVar3 = uVar3 - 1) {
    *puVar7 = *puVar5;
    puVar5 = puVar5 + 1;
    puVar7 = puVar7 + 1;
  }
  for (iVar6 = 0; iVar6 != 0; iVar6 = iVar6 + -1) {
    *(undefined1 *)puVar7 = *(undefined1 *)puVar5;
    puVar5 = (undefined4 *)((int)puVar5 + 1);
    puVar7 = (undefined4 *)((int)puVar7 + 1);
  }
  *(undefined4 *)(*param_1 + param_2 * 4) = param_3;
  return;
}



/******************************************************************************/
/* TARGET 004019a0  FUN_004019a0 */
/******************************************************************************/

void __fastcall FUN_004019a0(int *param_1,uint param_2)

{
  int iVar1;
  uint uVar2;
  undefined4 *puVar3;
  undefined4 *puVar4;
  
  if (param_2 < (uint)param_1[1]) {
    iVar1 = param_1[1] - 1;
    param_1[1] = iVar1;
    if ((int)param_2 < iVar1) {
      puVar3 = (undefined4 *)(*param_1 + 4 + param_2 * 4);
      puVar4 = (undefined4 *)(*param_1 + param_2 * 4);
      for (uVar2 = iVar1 - param_2 & 0x3fffffff; uVar2 != 0; uVar2 = uVar2 - 1) {
        *puVar4 = *puVar3;
        puVar3 = puVar3 + 1;
        puVar4 = puVar4 + 1;
      }
      for (iVar1 = 0; iVar1 != 0; iVar1 = iVar1 + -1) {
        *(undefined1 *)puVar4 = *(undefined1 *)puVar3;
        puVar3 = (undefined4 *)((int)puVar3 + 1);
        puVar4 = (undefined4 *)((int)puVar4 + 1);
      }
    }
  }
  return;
}



/******************************************************************************/
/* TARGET 004019e0  FUN_004019e0 */
/******************************************************************************/

int __fastcall FUN_004019e0(int *param_1,undefined4 param_2)

{
  int iVar1;
  
  iVar1 = param_1[1];
  if (param_1[2] <= iVar1) {
    FUN_00401850(param_1);
  }
  param_1[1] = iVar1 + 1;
  *(undefined4 *)(*param_1 + iVar1 * 4) = param_2;
  return iVar1;
}



/******************************************************************************/
/* TARGET 00401a10  FUN_00401a10 */
/******************************************************************************/

void __fastcall FUN_00401a10(undefined4 *param_1)

{
  *param_1 = 0;
  param_1[1] = 0;
  param_1[2] = 0;
  return;
}



/******************************************************************************/
/* TARGET 00401a20  FUN_00401a20 */
/******************************************************************************/

undefined4 * __thiscall FUN_00401a20(void *this,int param_1)

{
  *(undefined4 *)this = 0;
  *(undefined4 *)((int)this + 4) = 0;
  *(undefined4 *)((int)this + 8) = 0;
  FUN_00401a80(this,param_1);
  FUN_00401ab0(this,0);
  return this;
}



/******************************************************************************/
/* TARGET 00401a50  FUN_00401a50 */
/******************************************************************************/

void __fastcall FUN_00401a50(undefined4 *param_1)

{
  int iVar1;
  int *piVar2;
  
  iVar1 = param_1[2];
  param_1[2] = iVar1 << 1;
  if (iVar1 << 1 == 0) {
    param_1[2] = 0x1000;
  }
  piVar2 = FUN_0040d470((int *)*param_1,param_1[2]);
  *param_1 = piVar2;
  return;
}



/******************************************************************************/
/* TARGET 00401a80  FUN_00401a80 */
/******************************************************************************/

void __fastcall FUN_00401a80(undefined4 *param_1,int param_2)

{
  int *piVar1;
  uint uVar2;
  
  param_1[1] = param_2;
  if ((int)param_1[2] < param_2) {
    uVar2 = param_2 + 0x2000U & 0xfffff000;
    param_1[2] = uVar2;
    piVar1 = FUN_0040d470((int *)*param_1,uVar2);
    *param_1 = piVar1;
  }
  return;
}



/******************************************************************************/
/* TARGET 00401ab0  FUN_00401ab0 */
/******************************************************************************/

void __fastcall FUN_00401ab0(undefined4 *param_1,undefined1 param_2)

{
  uint uVar1;
  uint uVar2;
  undefined4 *puVar3;
  
  uVar2 = param_1[1];
  if (0 < (int)uVar2) {
    puVar3 = (undefined4 *)*param_1;
    for (uVar1 = uVar2 >> 2; uVar1 != 0; uVar1 = uVar1 - 1) {
      *puVar3 = CONCAT22(CONCAT11(param_2,param_2),CONCAT11(param_2,param_2));
      puVar3 = puVar3 + 1;
    }
    for (uVar2 = uVar2 & 3; uVar2 != 0; uVar2 = uVar2 - 1) {
      *(undefined1 *)puVar3 = param_2;
      puVar3 = (undefined4 *)((int)puVar3 + 1);
    }
  }
  return;
}



/******************************************************************************/
/* TARGET 00401ae0  FUN_00401ae0 */
/******************************************************************************/

int __fastcall FUN_00401ae0(int *param_1,undefined1 param_2)

{
  int iVar1;
  
  iVar1 = param_1[1];
  if (param_1[2] <= iVar1) {
    FUN_00401a50(param_1);
  }
  param_1[1] = iVar1 + 1;
  *(undefined1 *)(*param_1 + iVar1) = param_2;
  return iVar1;
}



/******************************************************************************/
/* TARGET 00401b10  FUN_00401b10 */
/******************************************************************************/

int __fastcall FUN_00401b10(int *param_1,uint param_2)

{
  int iVar1;
  
  iVar1 = param_1[1];
  if (param_1[2] <= iVar1) {
    FUN_00401a50(param_1);
  }
  param_1[1] = iVar1 + 1U;
  if (param_2 < iVar1 + 1U) {
    *(undefined1 *)(*param_1 + iVar1) = *(undefined1 *)(*param_1 + param_2);
    return iVar1;
  }
  *(undefined1 *)(*param_1 + iVar1) = 0;
  return iVar1;
}



/******************************************************************************/
/* TARGET 00401b50  FUN_00401b50 */
/******************************************************************************/

int __fastcall FUN_00401b50(int *param_1,uint param_2,int param_3)

{
  undefined1 uVar1;
  int iVar2;
  int iVar3;
  int iVar4;
  
  iVar2 = param_1[1];
  if (param_1[2] <= iVar2) {
    FUN_00401a50(param_1);
  }
  param_1[1] = iVar2 + 1U;
  if (param_2 < iVar2 + 1U) {
    uVar1 = *(undefined1 *)(*param_1 + param_2);
    *(undefined1 *)(*param_1 + iVar2) = uVar1;
    param_3 = param_3 + -1;
    if (0 < param_3) {
      do {
        iVar4 = param_1[1];
        if (param_1[2] <= iVar4) {
          FUN_00401a50(param_1);
        }
        param_1[1] = iVar4 + 1;
        param_3 = param_3 + -1;
        *(undefined1 *)(*param_1 + iVar4) = uVar1;
      } while (param_3 != 0);
      return iVar2;
    }
  }
  else {
    iVar4 = param_3 + -1;
    *(undefined1 *)(*param_1 + iVar2) = 0;
    if (0 < iVar4) {
      do {
        iVar3 = param_1[1];
        if (param_1[2] <= iVar3) {
          FUN_00401a50(param_1);
        }
        param_1[1] = iVar3 + 1;
        iVar4 = iVar4 + -1;
        *(undefined1 *)(*param_1 + iVar3) = 0;
      } while (iVar4 != 0);
    }
  }
  return iVar2;
}



/******************************************************************************/
/* TARGET 00401c00  FUN_00401c00 */
/******************************************************************************/

void __fastcall FUN_00401c00(undefined4 *param_1)

{
  int iVar1;
  int *piVar2;
  
  iVar1 = param_1[2];
  param_1[2] = iVar1 << 1;
  if (iVar1 << 1 == 0) {
    param_1[2] = 0x100;
  }
  piVar2 = FUN_0040d470((int *)*param_1,param_1[2] << 4);
  *param_1 = piVar2;
  return;
}



/******************************************************************************/
/* TARGET 00401c30  FUN_00401c30 */
/******************************************************************************/

void __fastcall FUN_00401c30(undefined4 *param_1)

{
  int *piVar1;
  
  FUN_00401c50((int)param_1,param_1[1]);
  piVar1 = FUN_0040d470((int *)*param_1,0);
  *param_1 = piVar1;
  param_1[2] = 0;
  return;
}



/******************************************************************************/
/* TARGET 00401c50  FUN_00401c50 */
/******************************************************************************/

void __fastcall FUN_00401c50(int param_1,int param_2)

{
  int iVar1;
  
  iVar1 = *(int *)(param_1 + 4) - param_2;
  *(int *)(param_1 + 4) = iVar1;
  if (iVar1 < 0) {
    *(undefined4 *)(param_1 + 4) = 0;
  }
  return;
}



/******************************************************************************/
/* TARGET 00401c70  FUN_00401c70 */
/******************************************************************************/

int __fastcall FUN_00401c70(int *param_1)

{
  int iVar1;
  undefined4 *puVar2;
  
  iVar1 = param_1[1];
  if (param_1[2] <= iVar1) {
    FUN_00401c00(param_1);
  }
  param_1[1] = iVar1 + 1;
  puVar2 = (undefined4 *)(iVar1 * 0x10 + *param_1);
  *puVar2 = DAT_00436118;
  puVar2[1] = DAT_0043611c;
  puVar2[2] = DAT_00436120;
  puVar2[3] = DAT_00436124;
  return iVar1;
}



/******************************************************************************/
/* TARGET 00401cc0  FUN_00401cc0 */
/******************************************************************************/

int __fastcall FUN_00401cc0(int *param_1,uint param_2)

{
  int iVar1;
  undefined4 *puVar2;
  undefined4 *puVar3;
  
  iVar1 = param_1[1];
  if (param_1[2] <= iVar1) {
    FUN_00401c00(param_1);
  }
  param_1[1] = iVar1 + 1U;
  if (param_2 < iVar1 + 1U) {
    puVar3 = (undefined4 *)(param_2 * 0x10 + *param_1);
    puVar2 = (undefined4 *)(iVar1 * 0x10 + *param_1);
    *puVar2 = *puVar3;
    puVar2[1] = puVar3[1];
    puVar2[2] = puVar3[2];
    puVar2[3] = puVar3[3];
    return iVar1;
  }
  puVar2 = (undefined4 *)(iVar1 * 0x10 + *param_1);
  *puVar2 = DAT_00436118;
  puVar2[1] = DAT_0043611c;
  puVar2[2] = DAT_00436120;
  puVar2[3] = DAT_00436124;
  return iVar1;
}



/******************************************************************************/
/* TARGET 00401d40  FUN_00401d40 */
/******************************************************************************/

void FUN_00401d40(void)

{
  DAT_00436f30 = FUN_0040d3a0(0x14);
  *DAT_00436f30 = 1;
  DAT_00436f30[1] = 1;
  DAT_00436f30[2] = 1;
  FUN_00401070(DAT_00436f30 + 3);
  DAT_00436f30[4] = 0;
  return;
}



/******************************************************************************/
/* TARGET 00401d90  FUN_00401d90 */
/******************************************************************************/

void __fastcall FUN_00401d90(undefined4 *param_1)

{
  int *piVar1;
  
  piVar1 = DAT_00436f30;
  *param_1 = DAT_00436f30;
  *piVar1 = *piVar1 + 1;
  return;
}



/******************************************************************************/
/* TARGET 00401da0  FUN_00401da0 */
/******************************************************************************/

void __thiscall FUN_00401da0(void *this,int param_1,int param_2)

{
  undefined4 *puVar1;
  undefined4 *puVar2;
  int iVar3;
  
  if (param_1 < 1) {
    param_1 = 1;
  }
  if (param_2 < 1) {
    param_2 = 1;
  }
  iVar3 = param_1 * param_2;
  puVar1 = FUN_0040d3a0(iVar3 * 8 + 0xc);
  puVar1[2] = param_2;
  *puVar1 = 1;
  puVar1[1] = param_1;
  puVar2 = puVar1 + 3;
  if (0 < iVar3) {
    do {
      FUN_00401070(puVar2);
      puVar2 = puVar2 + 2;
      iVar3 = iVar3 + -1;
    } while (iVar3 != 0);
  }
  *(undefined4 **)this = puVar1;
  return;
}



/******************************************************************************/
/* TARGET 00401e10  FUN_00401e10 */
/******************************************************************************/

void __fastcall FUN_00401e10(undefined4 *param_1)

{
  int *piVar1;
  
  piVar1 = DAT_00436f30;
  *param_1 = DAT_00436f30;
  *piVar1 = *piVar1 + 1;
  return;
}



/******************************************************************************/
/* TARGET 00401e20  FUN_00401e20 */
/******************************************************************************/

void __thiscall FUN_00401e20(void *this,int param_1,int param_2)

{
  undefined4 *puVar1;
  undefined4 *puVar2;
  int iVar3;
  
  if (param_1 < 1) {
    param_1 = 1;
  }
  if (param_2 < 1) {
    param_2 = 1;
  }
  iVar3 = param_1 * param_2;
  puVar1 = FUN_0040d3a0(iVar3 * 8 + 0xc);
  puVar1[2] = param_2;
  *puVar1 = 1;
  puVar1[1] = param_1;
  puVar2 = puVar1 + 3;
  if (0 < iVar3) {
    do {
      FUN_00401070(puVar2);
      puVar2 = puVar2 + 2;
      iVar3 = iVar3 + -1;
    } while (iVar3 != 0);
    *(undefined4 **)this = puVar1;
    return;
  }
  *(undefined4 **)this = puVar1;
  return;
}



/******************************************************************************/
/* TARGET 00401ea0  FUN_00401ea0 */
/******************************************************************************/

void __fastcall FUN_00401ea0(int *param_1)

{
  int iVar1;
  int *piVar2;
  
  iVar1 = *(int *)*param_1 + -1;
  *(int *)*param_1 = iVar1;
  if (iVar1 == 0) {
    iVar1 = *param_1;
    piVar2 = (int *)(iVar1 + 0xc);
    iVar1 = *(int *)(iVar1 + 8) * *(int *)(iVar1 + 4);
    if (0 < iVar1) {
      do {
        FUN_00401030(piVar2);
        piVar2 = piVar2 + 2;
        iVar1 = iVar1 + -1;
      } while (iVar1 != 0);
    }
    FUN_0040d410((int *)*param_1);
  }
  return;
}



/******************************************************************************/
/* TARGET 00401ee0  FUN_00401ee0 */
/******************************************************************************/

void __fastcall FUN_00401ee0(int *param_1)

{
  undefined4 *puVar1;
  int iVar2;
  void *this;
  int *local_4;
  
  this = (void *)(*param_1 + 0xc);
  local_4 = param_1;
  puVar1 = (undefined4 *)FUN_00401650(&DAT_00437228,0);
  FUN_00401020(&local_4,puVar1);
  iVar2 = *(int *)(*param_1 + 8) * *(int *)(*param_1 + 4);
  if (0 < iVar2) {
    do {
      FUN_004015d0(this,(int *)&local_4);
      *(undefined4 *)((int)this + 4) = 0;
      this = (void *)((int)this + 8);
      iVar2 = iVar2 + -1;
    } while (iVar2 != 0);
  }
  FUN_00401030((int *)&local_4);
  return;
}



/******************************************************************************/
/* TARGET 00401f40  FUN_00401f40 */
/******************************************************************************/

void __fastcall FUN_00401f40(int *param_1)

{
  int *piVar1;
  undefined4 *puVar2;
  int iVar3;
  undefined4 *puVar4;
  void *this;
  int iVar5;
  int *piVar6;
  int local_8;
  
  piVar1 = (int *)*param_1;
  if (1 < *piVar1) {
    local_8 = piVar1[2];
    iVar3 = piVar1[1];
    if (iVar3 < 1) {
      iVar3 = 1;
    }
    if (local_8 < 1) {
      local_8 = 1;
    }
    iVar5 = iVar3 * local_8;
    puVar2 = FUN_0040d3a0(iVar5 * 8 + 0xc);
    puVar2[1] = iVar3;
    *puVar2 = 1;
    puVar2[2] = local_8;
    puVar4 = puVar2 + 3;
    if (0 < iVar5) {
      do {
        FUN_00401070(puVar4);
        puVar4 = puVar4 + 2;
        iVar5 = iVar5 + -1;
      } while (iVar5 != 0);
    }
    piVar6 = piVar1 + 3;
    *param_1 = (int)puVar2;
    local_8 = piVar1[2] * piVar1[1];
    if (0 < local_8) {
      this = (void *)(((int)puVar2 - (int)piVar1) + (int)piVar6);
      do {
        FUN_004015d0(this,piVar6);
        *(int *)(((int)puVar2 - (int)piVar1) + 4 + (int)piVar6) = piVar6[1];
        piVar6 = piVar6 + 2;
        this = (void *)((int)this + 8);
        local_8 = local_8 + -1;
      } while (local_8 != 0);
    }
    *piVar1 = *piVar1 + -1;
  }
  return;
}



/******************************************************************************/
/* TARGET 00402000  FUN_00402000 */
/******************************************************************************/

void __thiscall FUN_00402000(void *this,int param_1,int param_2)

{
  undefined4 *puVar1;
  int iVar2;
  undefined4 *puVar3;
  int *piVar4;
  
  iVar2 = **(int **)this + -1;
  **(int **)this = iVar2;
  if (iVar2 == 0) {
    iVar2 = *(int *)this;
    piVar4 = (int *)(iVar2 + 0xc);
    iVar2 = *(int *)(iVar2 + 8) * *(int *)(iVar2 + 4);
    if (0 < iVar2) {
      do {
        FUN_00401030(piVar4);
        piVar4 = piVar4 + 2;
        iVar2 = iVar2 + -1;
      } while (iVar2 != 0);
    }
    FUN_0040d410(*(int **)this);
  }
  if (param_1 < 1) {
    param_1 = 1;
  }
  if (param_2 < 1) {
    param_2 = 1;
  }
  iVar2 = param_1 * param_2;
  puVar1 = FUN_0040d3a0(iVar2 * 8 + 0xc);
  puVar1[1] = param_1;
  puVar1[2] = param_2;
  *puVar1 = 1;
  puVar3 = puVar1 + 3;
  if (iVar2 < 1) {
    *(undefined4 **)this = puVar1;
    return;
  }
  do {
    FUN_00401070(puVar3);
    puVar3 = puVar3 + 2;
    iVar2 = iVar2 + -1;
  } while (iVar2 != 0);
  *(undefined4 **)this = puVar1;
  return;
}



/******************************************************************************/
/* TARGET 004020b0  FUN_004020b0 */
/******************************************************************************/

int * __thiscall FUN_004020b0(void *this,int *param_1)

{
  int iVar1;
  int *piVar2;
  
  iVar1 = **(int **)this + -1;
  **(int **)this = iVar1;
  if (iVar1 == 0) {
    iVar1 = *(int *)this;
    piVar2 = (int *)(iVar1 + 0xc);
    iVar1 = *(int *)(iVar1 + 8) * *(int *)(iVar1 + 4);
    if (0 < iVar1) {
      do {
        FUN_00401030(piVar2);
        piVar2 = piVar2 + 2;
        iVar1 = iVar1 + -1;
      } while (iVar1 != 0);
    }
    FUN_0040d410(*(int **)this);
  }
  piVar2 = (int *)*param_1;
  *(int **)this = piVar2;
  *piVar2 = *piVar2 + 1;
  return this;
}



/******************************************************************************/
/* TARGET 00402110  FUN_00402110 */
/******************************************************************************/

void __fastcall FUN_00402110(int *param_1)

{
  int *piVar1;
  
  FUN_00402130(param_1,param_1[1]);
  piVar1 = FUN_0040d470((int *)*param_1,0);
  *param_1 = (int)piVar1;
  param_1[2] = 0;
  return;
}



/******************************************************************************/
/* TARGET 00402130  FUN_00402130 */
/******************************************************************************/

void __fastcall FUN_00402130(int *param_1,int param_2)

{
  int iVar1;
  int *piVar2;
  
  iVar1 = param_1[1];
  if (iVar1 < param_2) {
    param_2 = iVar1;
  }
  piVar2 = (int *)(*param_1 + -4 + iVar1 * 4);
  param_1[1] = iVar1 - param_2;
  if (0 < param_2) {
    do {
      FUN_00401ea0(piVar2);
      piVar2 = piVar2 + -1;
      param_2 = param_2 + -1;
    } while (param_2 != 0);
  }
  return;
}



/******************************************************************************/
/* TARGET 00402160  FUN_00402160 */
/******************************************************************************/

int __thiscall FUN_00402160(void *this,int param_1,int param_2)

{
  int iVar1;
  
  iVar1 = *(int *)((int)this + 4);
  if (*(int *)((int)this + 8) <= iVar1) {
    FUN_00401850(this);
  }
  *(int *)((int)this + 4) = iVar1 + 1;
  FUN_00401e20((void *)(iVar1 * 4 + *(int *)this),param_1,param_2);
  FUN_00401ee0((int *)(iVar1 * 4 + *(int *)this));
  return iVar1;
}



/******************************************************************************/
/* TARGET 004021b0  FUN_004021b0 */
/******************************************************************************/

int __fastcall FUN_004021b0(int *param_1,undefined4 *param_2)

{
  int iVar1;
  
  iVar1 = param_1[1];
  if (param_1[2] <= iVar1) {
    FUN_00401850(param_1);
  }
  param_1[1] = iVar1 + 1;
  FUN_00401090((void *)(*param_1 + iVar1 * 4),(int *)*param_2);
  return iVar1;
}



/******************************************************************************/
/* TARGET 004021e0  FUN_004021e0 */
/******************************************************************************/

int __fastcall FUN_004021e0(int *param_1,uint param_2)

{
  int iVar1;
  
  iVar1 = param_1[1];
  if (param_1[2] <= iVar1) {
    FUN_00401850(param_1);
  }
  param_1[1] = iVar1 + 1U;
  if (param_2 < iVar1 + 1U) {
    FUN_00401090((void *)(*param_1 + iVar1 * 4),*(int **)(*param_1 + param_2 * 4));
    return iVar1;
  }
  FUN_00401e10((undefined4 *)(*param_1 + iVar1 * 4));
  return iVar1;
}



/******************************************************************************/
/* TARGET 00402230  FUN_00402230 */
/******************************************************************************/

int __fastcall FUN_00402230(int *param_1,uint param_2,int param_3)

{
  int iVar1;
  int *piVar2;
  int iVar3;
  int iVar4;
  
  iVar1 = param_1[1];
  if (param_1[2] <= iVar1) {
    FUN_00401850(param_1);
  }
  param_1[1] = iVar1 + 1U;
  if (param_2 < iVar1 + 1U) {
    piVar2 = *(int **)(*param_1 + param_2 * 4);
    FUN_00401090((void *)(*param_1 + iVar1 * 4),piVar2);
    param_3 = param_3 + -1;
    if (0 < param_3) {
      do {
        iVar4 = param_1[1];
        if (param_1[2] <= iVar4) {
          FUN_00401850(param_1);
        }
        param_1[1] = iVar4 + 1;
        FUN_00401090((void *)(*param_1 + iVar4 * 4),piVar2);
        param_3 = param_3 + -1;
      } while (param_3 != 0);
      return iVar1;
    }
  }
  else {
    FUN_00401e10((undefined4 *)(*param_1 + iVar1 * 4));
    iVar4 = param_3 + -1;
    if (0 < iVar4) {
      do {
        iVar3 = param_1[1];
        if (param_1[2] <= iVar3) {
          FUN_00401850(param_1);
        }
        param_1[1] = iVar3 + 1;
        FUN_00401e10((undefined4 *)(*param_1 + iVar3 * 4));
        iVar4 = iVar4 + -1;
      } while (iVar4 != 0);
    }
  }
  return iVar1;
}



/******************************************************************************/
/* TARGET 004022f0  FUN_004022f0 */
/******************************************************************************/

void __fastcall FUN_004022f0(undefined4 *param_1)

{
  *param_1 = &DAT_00436128;
  DAT_00436128 = DAT_00436128 + 1;
  return;
}



/******************************************************************************/
/* TARGET 00402310  FUN_00402310 */
/******************************************************************************/

void __fastcall FUN_00402310(undefined4 *param_1)

{
  *param_1 = &DAT_00436128;
  DAT_00436128 = DAT_00436128 + 1;
  return;
}



/******************************************************************************/
/* TARGET 00402330  FUN_00402330 */
/******************************************************************************/

void __fastcall FUN_00402330(int *param_1)

{
  int iVar1;
  
  iVar1 = *(int *)*param_1 + -1;
  *(int *)*param_1 = iVar1;
  if (iVar1 == 0) {
    FUN_0040d410(*(int **)(*param_1 + 0xc));
    FUN_0040d410((int *)*param_1);
  }
  return;
}



/******************************************************************************/
/* TARGET 00402350  FUN_00402350 */
/******************************************************************************/

void __fastcall FUN_00402350(int *param_1)

{
  int iVar1;
  
  iVar1 = *(int *)*param_1 + -1;
  *(int *)*param_1 = iVar1;
  if (iVar1 == 0) {
    FUN_0040d410(*(int **)(*param_1 + 0xc));
    FUN_0040d410((int *)*param_1);
  }
  *param_1 = (int)&DAT_00436128;
  DAT_00436128 = DAT_00436128 + 1;
  return;
}



/******************************************************************************/
/* TARGET 00402380  FUN_00402380 */
/******************************************************************************/

int * __thiscall FUN_00402380(void *this,int *param_1)

{
  int *piVar1;
  int iVar2;
  
  iVar2 = **(int **)this + -1;
  **(int **)this = iVar2;
  if (iVar2 == 0) {
    FUN_0040d410(*(int **)(*(int *)this + 0xc));
    FUN_0040d410(*(int **)this);
  }
  piVar1 = (int *)*param_1;
  *(int **)this = piVar1;
  *piVar1 = *piVar1 + 1;
  return this;
}



/******************************************************************************/
/* TARGET 004023c0  FUN_004023c0 */
/******************************************************************************/

void __fastcall FUN_004023c0(int *param_1)

{
  int *piVar1;
  
  FUN_004023e0(param_1,param_1[1]);
  piVar1 = FUN_0040d470((int *)*param_1,0);
  *param_1 = (int)piVar1;
  param_1[2] = 0;
  return;
}



/******************************************************************************/
/* TARGET 004023e0  FUN_004023e0 */
/******************************************************************************/

void __fastcall FUN_004023e0(int *param_1,int param_2)

{
  int iVar1;
  int *piVar2;
  
  iVar1 = param_1[1];
  if (iVar1 < param_2) {
    param_2 = iVar1;
  }
  piVar2 = (int *)(*param_1 + -4 + iVar1 * 4);
  param_1[1] = iVar1 - param_2;
  if (0 < param_2) {
    do {
      FUN_00402330(piVar2);
      piVar2 = piVar2 + -1;
      param_2 = param_2 + -1;
    } while (param_2 != 0);
  }
  return;
}



/******************************************************************************/
/* TARGET 00402410  FUN_00402410 */
/******************************************************************************/

int __fastcall FUN_00402410(int *param_1,uint param_2)

{
  int iVar1;
  
  iVar1 = param_1[1];
  if (param_1[2] <= iVar1) {
    FUN_00401850(param_1);
  }
  param_1[1] = iVar1 + 1U;
  if (param_2 < iVar1 + 1U) {
    FUN_00401090((void *)(*param_1 + iVar1 * 4),*(int **)(*param_1 + param_2 * 4));
    return iVar1;
  }
  FUN_00402310((undefined4 *)(*param_1 + iVar1 * 4));
  return iVar1;
}



/******************************************************************************/
/* TARGET 00402460  FUN_00402460 */
/******************************************************************************/

int __fastcall FUN_00402460(int *param_1,uint param_2,int param_3)

{
  int iVar1;
  int *piVar2;
  int iVar3;
  int iVar4;
  
  iVar1 = param_1[1];
  if (param_1[2] <= iVar1) {
    FUN_00401850(param_1);
  }
  param_1[1] = iVar1 + 1U;
  if (param_2 < iVar1 + 1U) {
    piVar2 = *(int **)(*param_1 + param_2 * 4);
    FUN_00401090((void *)(*param_1 + iVar1 * 4),piVar2);
    param_3 = param_3 + -1;
    if (0 < param_3) {
      do {
        iVar4 = param_1[1];
        if (param_1[2] <= iVar4) {
          FUN_00401850(param_1);
        }
        param_1[1] = iVar4 + 1;
        FUN_00401090((void *)(*param_1 + iVar4 * 4),piVar2);
        param_3 = param_3 + -1;
      } while (param_3 != 0);
      return iVar1;
    }
  }
  else {
    FUN_00402310((undefined4 *)(*param_1 + iVar1 * 4));
    iVar4 = param_3 + -1;
    if (0 < iVar4) {
      do {
        iVar3 = param_1[1];
        if (param_1[2] <= iVar3) {
          FUN_00401850(param_1);
        }
        param_1[1] = iVar3 + 1;
        FUN_00402310((undefined4 *)(*param_1 + iVar3 * 4));
        iVar4 = iVar4 + -1;
      } while (iVar4 != 0);
    }
  }
  return iVar1;
}



/******************************************************************************/
/* TARGET 00402520  FUN_00402520 */
/******************************************************************************/

void __fastcall FUN_00402520(int *param_1)

{
  int iVar1;
  
  iVar1 = *(int *)*param_1 + -1;
  *(int *)*param_1 = iVar1;
  if (iVar1 == 0) {
    FUN_0040d410(*(int **)(*param_1 + 0x10));
    FUN_0040d410((int *)*param_1);
  }
  return;
}



/******************************************************************************/
/* TARGET 00402540  FUN_00402540 */
/******************************************************************************/

void __fastcall FUN_00402540(undefined4 *param_1)

{
  *param_1 = &DAT_00436138;
  DAT_00436138 = DAT_00436138 + 1;
  return;
}



/******************************************************************************/
/* TARGET 00402560  FUN_00402560 */
/******************************************************************************/

undefined4 * __thiscall FUN_00402560(void *this,int param_1,int param_2)

{
  undefined4 *puVar1;
  LPVOID pvVar2;
  
  if (param_1 < 1) {
    param_1 = 1;
  }
  if (param_2 < 1) {
    param_2 = 1;
  }
  puVar1 = FUN_0040d3a0(0x18);
  *puVar1 = 1;
  puVar1[1] = 3;
  puVar1[2] = param_1;
  puVar1[3] = param_2;
  pvVar2 = FUN_0040d3a0(param_1 * param_2);
  puVar1[4] = pvVar2;
  *(undefined4 **)this = puVar1;
  return this;
}



/******************************************************************************/
/* TARGET 004025c0  thunk_FUN_00402520 */
/******************************************************************************/

void __fastcall thunk_FUN_00402520(int *param_1)

{
  int iVar1;
  
  iVar1 = *(int *)*param_1 + -1;
  *(int *)*param_1 = iVar1;
  if (iVar1 == 0) {
    FUN_0040d410(*(int **)(*param_1 + 0x10));
    FUN_0040d410((int *)*param_1);
  }
  return;
}



/******************************************************************************/
/* TARGET 004025d0  FUN_004025d0 */
/******************************************************************************/

void __fastcall FUN_004025d0(undefined4 *param_1)

{
  *param_1 = &DAT_00436138;
  DAT_00436138 = DAT_00436138 + 1;
  return;
}



/******************************************************************************/
/* TARGET 004025f0  FUN_004025f0 */
/******************************************************************************/

void __fastcall FUN_004025f0(int *param_1)

{
  int *piVar1;
  undefined4 *puVar2;
  LPVOID pvVar3;
  uint uVar4;
  int iVar5;
  int iVar6;
  undefined4 *puVar7;
  
  FUN_00402700(param_1);
  piVar1 = (int *)*param_1;
  if (1 < *piVar1) {
    iVar6 = piVar1[2];
    iVar5 = piVar1[3];
    if (iVar6 < 1) {
      iVar6 = 1;
    }
    if (iVar5 < 1) {
      iVar5 = 1;
    }
    puVar2 = FUN_0040d3a0(0x18);
    *puVar2 = 1;
    puVar2[1] = 3;
    puVar2[2] = iVar6;
    puVar2[3] = iVar5;
    pvVar3 = FUN_0040d3a0(iVar6 * iVar5);
    puVar2[4] = pvVar3;
    *param_1 = (int)puVar2;
    iVar6 = piVar1[3];
    iVar5 = piVar1[2];
    puVar7 = (undefined4 *)piVar1[4];
    puVar2 = (undefined4 *)puVar2[4];
    for (uVar4 = (uint)(iVar6 * iVar5) >> 2; uVar4 != 0; uVar4 = uVar4 - 1) {
      *puVar2 = *puVar7;
      puVar7 = puVar7 + 1;
      puVar2 = puVar2 + 1;
    }
    for (uVar4 = iVar6 * iVar5 & 3; uVar4 != 0; uVar4 = uVar4 - 1) {
      *(undefined1 *)puVar2 = *(undefined1 *)puVar7;
      puVar7 = (undefined4 *)((int)puVar7 + 1);
      puVar2 = (undefined4 *)((int)puVar2 + 1);
    }
    *(int *)(*param_1 + 4) = piVar1[1];
    *piVar1 = *piVar1 + -1;
  }
  return;
}



/******************************************************************************/
/* TARGET 00402680  FUN_00402680 */
/******************************************************************************/

void __fastcall FUN_00402680(int *param_1)

{
  FUN_00402520(param_1);
  *param_1 = (int)&DAT_00436138;
  DAT_00436138 = DAT_00436138 + 1;
  return;
}



/******************************************************************************/
/* TARGET 004026a0  FUN_004026a0 */
/******************************************************************************/

void __thiscall FUN_004026a0(void *this,int param_1,int param_2)

{
  undefined4 *puVar1;
  LPVOID pvVar2;
  
  FUN_00402520(this);
  if (param_1 < 1) {
    param_1 = 1;
  }
  if (param_2 < 1) {
    param_2 = 1;
  }
  puVar1 = FUN_0040d3a0(0x18);
  *puVar1 = 1;
  puVar1[1] = 3;
  puVar1[2] = param_1;
  puVar1[3] = param_2;
  pvVar2 = FUN_0040d3a0(param_1 * param_2);
  puVar1[4] = pvVar2;
  *(undefined4 **)this = puVar1;
  return;
}



/******************************************************************************/
/* TARGET 00402700  FUN_00402700 */
/******************************************************************************/

void __fastcall FUN_00402700(int *param_1)

{
  int iVar1;
  undefined1 *puVar2;
  int iVar3;
  
  iVar3 = *param_1;
  if (*(int *)(iVar3 + 4) == 4) {
    iVar1 = *(int *)(iVar3 + 8);
    iVar3 = *(int *)(iVar3 + 0xc) * iVar1;
    puVar2 = FUN_0040d3a0(iVar3);
    FUN_00408a50(puVar2,(undefined1 *)(*(int *)(*param_1 + 0x10) + 4),iVar3,iVar1);
    *(undefined1 **)(*param_1 + 0x10) = puVar2;
    *(int *)*param_1 = *(int *)*param_1 + -0x40000000;
    *(undefined4 *)(*param_1 + 4) = 3;
  }
  return;
}



/******************************************************************************/
/* TARGET 00402760  FUN_00402760 */
/******************************************************************************/

void __thiscall FUN_00402760(void *this,int *param_1)

{
  int iVar1;
  int iVar2;
  int iVar3;
  uint uVar4;
  undefined4 *puVar5;
  uint uVar6;
  int iVar7;
  int iVar8;
  char *pcVar9;
  undefined4 *puVar10;
  int local_c;
  int local_8;
  
  FUN_004025f0(this);
  FUN_00402700(param_1);
  iVar8 = *(int *)this;
  iVar1 = *param_1;
  iVar7 = *(int *)(iVar8 + 8);
  iVar2 = *(int *)(iVar1 + 8);
  if (iVar2 < iVar7) {
    uVar6 = iVar7 - iVar2;
    local_c = 0;
    iVar7 = iVar2;
  }
  else {
    local_c = iVar2 - iVar7;
    uVar6 = 0;
  }
  local_8 = *(int *)(iVar8 + 0xc);
  iVar2 = *(int *)(iVar1 + 0xc);
  if (iVar2 < local_8) {
    iVar3 = local_8 - iVar2;
    local_8 = iVar2;
  }
  else {
    iVar3 = 0;
  }
  puVar5 = *(undefined4 **)(iVar8 + 0x10);
  pcVar9 = *(char **)(iVar1 + 0x10);
  if (0 < local_8) {
    do {
      iVar8 = iVar7;
      if (0 < iVar7) {
        do {
          if (*pcVar9 == '\0') {
            *(undefined1 *)puVar5 = 0;
          }
          pcVar9 = pcVar9 + 1;
          puVar5 = (undefined4 *)((int)puVar5 + 1);
          iVar8 = iVar8 + -1;
        } while (iVar8 != 0);
      }
      puVar10 = puVar5;
      for (uVar4 = uVar6 >> 2; uVar4 != 0; uVar4 = uVar4 - 1) {
        *puVar10 = 0;
        puVar10 = puVar10 + 1;
      }
      puVar5 = (undefined4 *)((int)puVar5 + uVar6);
      for (uVar4 = uVar6 & 3; uVar4 != 0; uVar4 = uVar4 - 1) {
        *(undefined1 *)puVar10 = 0;
        puVar10 = (undefined4 *)((int)puVar10 + 1);
      }
      pcVar9 = pcVar9 + local_c;
      local_8 = local_8 + -1;
    } while (local_8 != 0);
  }
  uVar4 = (uVar6 + iVar7) * iVar3;
  for (uVar6 = uVar4 >> 2; uVar6 != 0; uVar6 = uVar6 - 1) {
    *puVar5 = 0;
    puVar5 = puVar5 + 1;
  }
  for (uVar4 = uVar4 & 3; uVar4 != 0; uVar4 = uVar4 - 1) {
    *(undefined1 *)puVar5 = 0;
    puVar5 = (undefined4 *)((int)puVar5 + 1);
  }
  return;
}



/******************************************************************************/
/* TARGET 00402830  FUN_00402830 */
/******************************************************************************/

void __thiscall FUN_00402830(void *this,char param_1,char param_2)

{
  char *pcVar1;
  int iVar2;
  
  FUN_004025f0(this);
  iVar2 = *(int *)this;
  pcVar1 = *(char **)(iVar2 + 0x10);
  iVar2 = *(int *)(iVar2 + 0xc) * *(int *)(iVar2 + 8);
  if (0 < iVar2) {
    do {
      if (*pcVar1 == param_1) {
        *pcVar1 = param_2;
      }
      else if (*pcVar1 == param_2) {
        *pcVar1 = param_1;
      }
      pcVar1 = pcVar1 + 1;
      iVar2 = iVar2 + -1;
    } while (iVar2 != 0);
  }
  return;
}



/******************************************************************************/
/* TARGET 00402870  FUN_00402870 */
/******************************************************************************/

void __thiscall FUN_00402870(void *this,char param_1,char param_2)

{
  int iVar1;
  char *pcVar2;
  
  FUN_004025f0(this);
  iVar1 = *(int *)this;
  pcVar2 = *(char **)(iVar1 + 0x10);
  iVar1 = *(int *)(iVar1 + 0xc) * *(int *)(iVar1 + 8);
  if (0 < iVar1) {
    do {
      if (*pcVar2 == param_1) {
        *pcVar2 = param_2;
      }
      pcVar2 = pcVar2 + 1;
      iVar1 = iVar1 + -1;
    } while (iVar1 != 0);
  }
  return;
}



/******************************************************************************/
/* TARGET 004028a0  FUN_004028a0 */
/******************************************************************************/

undefined1 * __fastcall FUN_004028a0(int *param_1)

{
  int iVar1;
  byte bVar2;
  int iVar3;
  undefined1 *puVar4;
  undefined1 *puVar5;
  byte *pbVar6;
  int iVar7;
  uint local_8;
  
  FUN_00402700(param_1);
  iVar7 = *(int *)(*param_1 + 0xc) * *(int *)(*param_1 + 8);
  puVar4 = FUN_0040d3a0(iVar7 * 5);
  iVar3 = DAT_00437118;
  pbVar6 = *(byte **)(*param_1 + 0x10);
  iVar1 = DAT_00437118 + 0x28;
  puVar5 = puVar4;
  if (0 < iVar7) {
    do {
      bVar2 = *pbVar6;
      pbVar6 = pbVar6 + 1;
      local_8 = (uint)bVar2;
      if (local_8 == 0) {
        *puVar5 = 0;
        puVar5[1] = 0;
        puVar5[2] = 0;
        puVar5[3] = 0xff;
        puVar5[4] = 0;
      }
      else if (local_8 == 1) {
        *puVar5 = 0;
        puVar5[1] = 0;
        puVar5[2] = 0;
        puVar5[3] = 0;
        puVar5[4] = 0xff;
      }
      else {
        *puVar5 = *(undefined1 *)(iVar1 + local_8 * 4);
        puVar5[1] = *(undefined1 *)(iVar3 + 0x29 + local_8 * 4);
        puVar5[2] = *(undefined1 *)(iVar3 + 0x2a + local_8 * 4);
        puVar5[3] = 0;
        puVar5[4] = 0;
      }
      puVar5 = puVar5 + 5;
      iVar7 = iVar7 + -1;
    } while (iVar7 != 0);
  }
  return puVar4;
}



/******************************************************************************/
/* TARGET 00402950  FUN_00402950 */
/******************************************************************************/

void __thiscall FUN_00402950(void *this,byte *param_1,int param_2)

{
  byte bVar1;
  byte bVar2;
  byte bVar3;
  int iVar4;
  int *piVar5;
  uint uVar6;
  int iVar7;
  int *piVar8;
  byte *pbVar9;
  uint uVar10;
  byte *pbVar11;
  int *piVar12;
  uint uVar13;
  byte *local_1c;
  int local_18;
  int local_14;
  
  piVar12 = *(int **)this;
  iVar4 = piVar12[2];
  local_14 = piVar12[3];
  if (1 < *piVar12) {
    FUN_004026a0(this,iVar4,local_14);
  }
  FUN_00402700(this);
  local_1c = param_1;
  pbVar9 = *(byte **)(*(int *)this + 0x10);
  if (param_2 == 0) {
    if (0 < local_14) {
      do {
        iVar7 = iVar4;
        if (0 < iVar4) {
          do {
            if (param_1[3] < 0x81) {
              if ((uint)param_1[4] + (uint)param_1[3] < 0x81) {
                *pbVar9 = *(byte *)(((uint)(param_1[1] >> 2) << 6 | (uint)(*param_1 >> 2) << 0xc |
                                    (uint)(param_1[2] >> 2)) + DAT_00437150);
              }
              else {
                *pbVar9 = 1;
              }
            }
            else {
              *pbVar9 = 0;
            }
            pbVar9 = pbVar9 + 1;
            param_1 = param_1 + 5;
            iVar7 = iVar7 + -1;
          } while (iVar7 != 0);
        }
        local_14 = local_14 + -1;
      } while (local_14 != 0);
    }
    return;
  }
  uVar6 = iVar4 * 0xc + 0x40;
  piVar5 = FUN_0040d3a0(uVar6);
  piVar12 = piVar5;
  for (uVar6 = uVar6 >> 2; uVar6 != 0; uVar6 = uVar6 - 1) {
    *piVar12 = 0;
    piVar12 = piVar12 + 1;
  }
  for (iVar7 = 0; iVar7 != 0; iVar7 = iVar7 + -1) {
    *(undefined1 *)piVar12 = 0;
    piVar12 = (int *)((int)piVar12 + 1);
  }
  pbVar11 = param_1;
  param_1 = pbVar9;
  if (0 < local_14) {
    do {
      piVar12 = piVar5;
      local_18 = iVar4;
      if (0 < iVar4) {
        do {
          piVar8 = piVar12 + 3;
          if (pbVar11[3] < 0x81) {
            if (0x80 < (uint)pbVar11[4] + (uint)pbVar11[3]) {
              *pbVar9 = 1;
              goto LAB_004029f6;
            }
            bVar1 = pbVar11[1];
            bVar2 = pbVar11[2];
            iVar7 = (*piVar12 + piVar12[6] + *piVar8) * 5;
            uVar10 = (uint)*pbVar11 - ((int)(iVar7 + (iVar7 >> 0x1f & 7U)) >> 3);
            iVar7 = (piVar12[7] + piVar12[1] + piVar12[4]) * 5;
            uVar13 = (uint)bVar1 - ((int)(iVar7 + (iVar7 >> 0x1f & 7U)) >> 3);
            iVar7 = (piVar12[8] + piVar12[5] + piVar12[2]) * 5;
            uVar6 = (uint)bVar2 - ((int)((iVar7 >> 0x1f & 7U) + iVar7) >> 3);
            if (0xff < uVar10) {
              uVar10 = ((-1 < (int)uVar10) - 1U & 1) + 0xff;
            }
            if (0xff < uVar13) {
              uVar13 = ((-1 < (int)uVar13) - 1U & 1) + 0xff;
            }
            if (0xff < uVar6) {
              uVar6 = ((-1 < (int)uVar6) - 1U & 1) + 0xff;
            }
            bVar3 = *(byte *)((((uVar10 & 0xff) >> 2) << 0xc | ((uVar13 & 0xff) >> 2) << 6 |
                              (uVar6 & 0xff) >> 2) + DAT_00437150);
            pbVar9 = (byte *)(DAT_00437118 + 0x28 + (uint)bVar3 * 4);
            *piVar8 = (uint)*pbVar9 - (uint)*pbVar11;
            piVar12[4] = (uint)pbVar9[1] - (uint)bVar1;
            piVar12[5] = (uint)pbVar9[2] - (uint)bVar2;
            *param_1 = bVar3;
          }
          else {
            *pbVar9 = 0;
LAB_004029f6:
            *piVar8 = 0;
            piVar12[4] = 0;
            piVar12[5] = 0;
            param_1 = pbVar9;
            local_1c = pbVar11;
          }
          pbVar9 = param_1 + 1;
          pbVar11 = local_1c + 5;
          local_18 = local_18 + -1;
          piVar12 = piVar8;
          param_1 = pbVar9;
          local_1c = pbVar11;
        } while (local_18 != 0);
      }
      local_14 = local_14 + -1;
    } while (local_14 != 0);
  }
  FUN_0040d410(piVar5);
  return;
}



/******************************************************************************/
/* TARGET 00402c40  FUN_00402c40 */
/******************************************************************************/

void __cdecl FUN_00402c40(int param_1,int param_2,int param_3,undefined1 *param_4,int param_5)

{
  byte *pbVar1;
  double dVar2;
  double dVar3;
  double dVar4;
  double dVar5;
  int iVar6;
  uint *puVar7;
  uint uVar8;
  double *pdVar9;
  uint *puVar10;
  int iVar11;
  int iVar12;
  undefined1 *puVar13;
  int local_6c;
  undefined1 *local_68;
  int local_60;
  double local_58;
  double local_50;
  double local_48;
  double local_40;
  double local_38;
  double local_20;
  double local_18;
  
  dVar3 = (double)param_5 / (double)param_2;
  dVar4 = 2.0 / dVar3;
  if (dVar4 < 2.0) {
    dVar4 = 2.0;
  }
  iVar6 = FUN_0040a250(dVar4 + dVar4 + 3.0);
  puVar7 = FUN_0040d3a0(iVar6 * 0xc + 0x80);
  local_50 = 1.0 / dVar3;
  if (local_50 <= 1.0) {
    local_50 = 1.0;
  }
  dVar4 = local_50 + local_50;
  if ((dVar4 <= 0.5) || (dVar4 <= 0.5)) {
    dVar4 = 0.5;
    local_50 = 1.0;
  }
  local_6c = 0;
  if (0 < param_5) {
    local_68 = param_4;
    do {
      iVar12 = 0;
      local_48 = 0.0;
      dVar2 = (double)local_6c / dVar3;
      uVar8 = FUN_0040a250(dVar2 - (dVar4 + 1e-07));
      iVar6 = FUN_0040a250(dVar2 + dVar4 + 1e-07);
      uVar8 = ((int)uVar8 < 1) - 1 & uVar8;
      puVar10 = puVar7;
      while( true ) {
        iVar11 = param_2;
        if (iVar6 + 1 < param_2) {
          iVar11 = iVar6 + 1;
        }
        if (iVar11 <= (int)uVar8) break;
        *puVar10 = uVar8;
        dVar5 = ((double)(int)uVar8 - dVar2) / local_50;
        if (dVar5 < 0.0) {
          dVar5 = -dVar5;
        }
        if (1.0 <= dVar5) {
          if (2.0 <= dVar5) {
            dVar5 = 0.0;
          }
          else {
            dVar5 = (dVar5 * -20.0 +
                     dVar5 * dVar5 * 12.0 + dVar5 * dVar5 * dVar5 * -2.3333333333333335 +
                    10.666666666666666) * 0.16666666666666666;
          }
        }
        else {
          dVar5 = (dVar5 * dVar5 * -12.0 + dVar5 * dVar5 * dVar5 * 7.0 + 5.333333333333333) *
                  0.16666666666666666;
        }
        iVar12 = iVar12 + 1;
        uVar8 = uVar8 + 1;
        local_48 = dVar5 / local_50 + local_48;
        *(double *)(puVar10 + 1) = dVar5 / local_50;
        puVar10 = puVar10 + 3;
      }
      if (((local_48 != 0.0) && (local_48 != 1.0)) && (0 < iVar12)) {
        pdVar9 = (double *)(puVar7 + 1);
        iVar6 = iVar12;
        do {
          iVar6 = iVar6 + -1;
          *pdVar9 = *pdVar9 / local_48;
          pdVar9 = (double *)((int)pdVar9 + 0xc);
        } while (iVar6 != 0);
      }
      if (0 < param_3) {
        iVar6 = 0;
        local_60 = param_3;
        puVar13 = local_68;
        do {
          local_40 = 0.0;
          local_38 = 0.0;
          local_58 = 0.0;
          local_20 = 0.0;
          local_18 = 0.0;
          if (0 < iVar12) {
            local_40 = 0.0;
            local_38 = 0.0;
            local_20 = 0.0;
            local_18 = 0.0;
            puVar10 = puVar7;
            iVar11 = iVar12;
            do {
              dVar2 = *(double *)(puVar10 + 1);
              pbVar1 = (byte *)(param_1 + (iVar6 + *puVar10) * 5);
              puVar10 = puVar10 + 3;
              local_40 = (double)*pbVar1 * dVar2 + local_40;
              local_58 = (double)pbVar1[1] * dVar2 + local_58;
              iVar11 = iVar11 + -1;
              local_38 = (double)pbVar1[2] * dVar2 + local_38;
              local_20 = (double)pbVar1[3] * dVar2 + local_20;
              local_18 = (double)pbVar1[4] * dVar2 + local_18;
            } while (iVar11 != 0);
          }
          dVar2 = local_18 + local_20;
          if ((0.0001 < dVar2) && (dVar2 < 254.0)) {
            dVar2 = 1.0 / (1.0 - dVar2 * 0.0009765625);
            local_40 = dVar2 * local_40;
            local_58 = dVar2 * local_58;
            local_38 = dVar2 * local_38;
          }
          uVar8 = FUN_0040a250(local_40);
          if (0xff < uVar8) {
            uVar8 = ((-1 < (int)uVar8) - 1U & 1) + 0xff;
          }
          *puVar13 = (char)uVar8;
          uVar8 = FUN_0040a250(local_58);
          if (0xff < uVar8) {
            uVar8 = ((-1 < (int)uVar8) - 1U & 1) + 0xff;
          }
          puVar13[1] = (char)uVar8;
          uVar8 = FUN_0040a250(local_38);
          if (0xff < uVar8) {
            uVar8 = ((-1 < (int)uVar8) - 1U & 1) + 0xff;
          }
          puVar13[2] = (char)uVar8;
          uVar8 = FUN_0040a250(local_20);
          if (0xff < uVar8) {
            uVar8 = ((-1 < (int)uVar8) - 1U & 1) + 0xff;
          }
          puVar13[3] = (char)uVar8;
          uVar8 = FUN_0040a250(local_18);
          if (0xff < uVar8) {
            uVar8 = ((-1 < (int)uVar8) - 1U & 1) + 0xff;
          }
          puVar13[4] = (char)uVar8;
          puVar13 = puVar13 + param_5 * 5;
          iVar6 = iVar6 + param_2;
          local_60 = local_60 + -1;
        } while (local_60 != 0);
      }
      local_6c = local_6c + 1;
      local_68 = local_68 + 5;
    } while (local_6c < param_5);
  }
  FUN_0040d410((int *)puVar7);
  return;
}



/******************************************************************************/
/* TARGET 00403120  FUN_00403120 */
/******************************************************************************/

void __cdecl FUN_00403120(int param_1,int param_2,int param_3,undefined1 *param_4,int param_5)

{
  byte *pbVar1;
  double dVar2;
  double dVar3;
  double dVar4;
  double dVar5;
  int iVar6;
  uint *puVar7;
  uint uVar8;
  double *pdVar9;
  uint *puVar10;
  int iVar11;
  int iVar12;
  undefined1 *puVar13;
  int local_70;
  undefined1 *local_6c;
  double local_60;
  double local_50;
  double local_48;
  double local_40;
  double local_38;
  double local_20;
  double local_18;
  
  dVar3 = (double)param_5 / (double)param_3;
  dVar4 = 2.0 / dVar3;
  if (dVar4 < 2.0) {
    dVar4 = 2.0;
  }
  iVar6 = FUN_0040a250(dVar4 + dVar4 + 3.0);
  puVar7 = FUN_0040d3a0(iVar6 * 0xc + 0x80);
  local_50 = 1.0 / dVar3;
  if (local_50 <= 1.0) {
    local_50 = 1.0;
  }
  dVar4 = local_50 + local_50;
  if ((dVar4 <= 0.5) || (dVar4 <= 0.5)) {
    dVar4 = 0.5;
    local_50 = 1.0;
  }
  local_70 = 0;
  if (0 < param_5) {
    local_6c = param_4;
    do {
      iVar12 = 0;
      local_48 = 0.0;
      dVar2 = (double)local_70 / dVar3;
      uVar8 = FUN_0040a250(dVar2 - (dVar4 + 1e-07));
      iVar6 = FUN_0040a250(dVar2 + dVar4 + 1e-07);
      uVar8 = ((int)uVar8 < 1) - 1 & uVar8;
      puVar10 = puVar7;
      while( true ) {
        iVar11 = param_3;
        if (iVar6 + 1 < param_3) {
          iVar11 = iVar6 + 1;
        }
        if (iVar11 <= (int)uVar8) break;
        *puVar10 = uVar8;
        dVar5 = ((double)(int)uVar8 - dVar2) / local_50;
        if (dVar5 < 0.0) {
          dVar5 = -dVar5;
        }
        if (1.0 <= dVar5) {
          if (2.0 <= dVar5) {
            dVar5 = 0.0;
          }
          else {
            dVar5 = (dVar5 * -20.0 +
                     dVar5 * dVar5 * 12.0 + dVar5 * dVar5 * dVar5 * -2.3333333333333335 +
                    10.666666666666666) * 0.16666666666666666;
          }
        }
        else {
          dVar5 = (dVar5 * dVar5 * -12.0 + dVar5 * dVar5 * dVar5 * 7.0 + 5.333333333333333) *
                  0.16666666666666666;
        }
        iVar12 = iVar12 + 1;
        uVar8 = uVar8 + 1;
        local_48 = dVar5 / local_50 + local_48;
        *(double *)(puVar10 + 1) = dVar5 / local_50;
        puVar10 = puVar10 + 3;
      }
      if (((local_48 != 0.0) && (local_48 != 1.0)) && (0 < iVar12)) {
        pdVar9 = (double *)(puVar7 + 1);
        iVar6 = iVar12;
        do {
          iVar6 = iVar6 + -1;
          *pdVar9 = *pdVar9 / local_48;
          pdVar9 = (double *)((int)pdVar9 + 0xc);
        } while (iVar6 != 0);
      }
      iVar6 = 0;
      puVar13 = local_6c;
      if (0 < param_2) {
        do {
          local_40 = 0.0;
          local_38 = 0.0;
          local_60 = 0.0;
          local_20 = 0.0;
          local_18 = 0.0;
          if (0 < iVar12) {
            local_40 = 0.0;
            local_38 = 0.0;
            local_20 = 0.0;
            local_18 = 0.0;
            puVar10 = puVar7;
            iVar11 = iVar12;
            do {
              uVar8 = *puVar10;
              dVar2 = *(double *)(puVar10 + 1);
              puVar10 = puVar10 + 3;
              pbVar1 = (byte *)(param_1 + (uVar8 * param_2 + iVar6) * 5);
              local_40 = (double)*pbVar1 * dVar2 + local_40;
              local_60 = (double)pbVar1[1] * dVar2 + local_60;
              iVar11 = iVar11 + -1;
              local_38 = (double)pbVar1[2] * dVar2 + local_38;
              local_20 = (double)pbVar1[3] * dVar2 + local_20;
              local_18 = (double)pbVar1[4] * dVar2 + local_18;
            } while (iVar11 != 0);
          }
          dVar2 = local_18 + local_20;
          if ((0.0001 < dVar2) && (dVar2 < 254.0)) {
            dVar2 = 1.0 / (1.0 - dVar2 * 0.0009765625);
            local_40 = dVar2 * local_40;
            local_60 = dVar2 * local_60;
            local_38 = dVar2 * local_38;
          }
          uVar8 = FUN_0040a250(local_40);
          if (0xff < uVar8) {
            uVar8 = ((-1 < (int)uVar8) - 1U & 1) + 0xff;
          }
          *puVar13 = (char)uVar8;
          uVar8 = FUN_0040a250(local_60);
          if (0xff < uVar8) {
            uVar8 = ((-1 < (int)uVar8) - 1U & 1) + 0xff;
          }
          puVar13[1] = (char)uVar8;
          uVar8 = FUN_0040a250(local_38);
          if (0xff < uVar8) {
            uVar8 = ((-1 < (int)uVar8) - 1U & 1) + 0xff;
          }
          puVar13[2] = (char)uVar8;
          uVar8 = FUN_0040a250(local_20);
          if (0xff < uVar8) {
            uVar8 = ((-1 < (int)uVar8) - 1U & 1) + 0xff;
          }
          puVar13[3] = (char)uVar8;
          uVar8 = FUN_0040a250(local_18);
          if (0xff < uVar8) {
            uVar8 = ((-1 < (int)uVar8) - 1U & 1) + 0xff;
          }
          puVar13[4] = (char)uVar8;
          puVar13 = puVar13 + 5;
          iVar6 = iVar6 + 1;
        } while (iVar6 < param_2);
      }
      local_6c = local_6c + param_2 * 5;
      local_70 = local_70 + 1;
    } while (local_70 < param_5);
  }
  FUN_0040d410((int *)puVar7);
  return;
}



/******************************************************************************/
/* TARGET 004035f0  FUN_004035f0 */
/******************************************************************************/

int * __cdecl FUN_004035f0(int *param_1,int param_2,int param_3,int param_4,int param_5)

{
  int *piVar1;
  int *piVar2;
  
  if (param_5 < param_3) {
    piVar1 = FUN_0040d3a0(param_2 * param_5 * 5);
    FUN_00403120((int)param_1,param_2,param_3,(undefined1 *)piVar1,param_5);
    FUN_0040d410(param_1);
    if (param_4 != param_2) {
      piVar2 = FUN_0040d3a0(param_4 * param_5 * 5);
      FUN_00402c40((int)piVar1,param_2,param_5,(undefined1 *)piVar2,param_4);
      FUN_0040d410(piVar1);
      return piVar2;
    }
  }
  else {
    if (param_4 != param_2) {
      piVar1 = FUN_0040d3a0(param_3 * param_4 * 5);
      FUN_00402c40((int)param_1,param_2,param_3,(undefined1 *)piVar1,param_4);
      FUN_0040d410(param_1);
      param_1 = piVar1;
    }
    piVar1 = param_1;
    if (param_5 != param_3) {
      piVar1 = FUN_0040d3a0(param_4 * param_5 * 5);
      FUN_00403120((int)param_1,param_4,param_3,(undefined1 *)piVar1,param_5);
      FUN_0040d410(param_1);
      return piVar1;
    }
  }
  return piVar1;
}



/******************************************************************************/
/* TARGET 004036e0  FUN_004036e0 */
/******************************************************************************/

void __thiscall FUN_004036e0(void *this,int param_1,int param_2,int param_3,int param_4)

{
  int iVar1;
  int iVar2;
  int *piVar3;
  byte *pbVar4;
  int iVar5;
  undefined1 *puVar6;
  undefined1 *puVar7;
  int local_2c;
  int local_28;
  int local_24;
  int *local_20;
  int local_1c;
  int *local_18;
  int *local_14;
  double local_10;
  
  iVar2 = *(int *)(*(int *)this + 8);
  local_1c = *(int *)(*(int *)this + 0xc);
  if ((param_1 != iVar2) || (param_2 != local_1c)) {
    local_24 = iVar2;
    local_14 = this;
    FUN_00402700(this);
    if (param_3 == 0) {
      local_20 = FUN_0040d3a0(param_1 * 4);
      FUN_00402540(&local_28);
      FUN_004026a0(&local_28,param_1,param_2);
      local_10 = (double)local_24 / (double)param_1;
      local_2c = 0;
      if (0 < param_1) {
        local_18 = local_20;
        do {
          iVar2 = FUN_0040a2d0((double)local_2c * local_10);
          if (local_24 <= iVar2) {
            iVar2 = local_24 + -1;
          }
          local_2c = local_2c + 1;
          *local_18 = iVar2;
          local_18 = local_18 + 1;
        } while (local_2c < param_1);
      }
      local_10 = (double)local_1c / (double)param_2;
      local_2c = 0;
      puVar6 = *(undefined1 **)(local_28 + 0x10);
      if (0 < param_2) {
        do {
          iVar2 = FUN_0040a2d0((double)local_2c * local_10);
          if (local_1c <= iVar2) {
            iVar2 = local_1c + -1;
          }
          iVar1 = *(int *)(*(int *)this + 0x10);
          piVar3 = local_20;
          iVar5 = param_1;
          puVar7 = puVar6;
          if (0 < param_1) {
            do {
              puVar7 = puVar6 + 1;
              iVar5 = iVar5 + -1;
              *puVar6 = *(undefined1 *)(iVar2 * local_24 + iVar1 + *piVar3);
              piVar3 = piVar3 + 1;
              this = local_14;
              puVar6 = puVar7;
            } while (iVar5 != 0);
          }
          local_2c = local_2c + 1;
          puVar6 = puVar7;
        } while (local_2c < param_2);
      }
      FUN_0040d410(local_20);
      FUN_00404260(this,&local_28);
      thunk_FUN_00402520(&local_28);
      return;
    }
    piVar3 = (int *)FUN_004028a0(this);
    pbVar4 = (byte *)FUN_004035f0(piVar3,iVar2,local_1c,param_1,param_2);
    FUN_004026a0(this,param_1,param_2);
    FUN_00402950(this,pbVar4,param_4);
    FUN_0040d410((int *)pbVar4);
  }
  return;
}



/******************************************************************************/
/* TARGET 00403890  FUN_00403890 */
/******************************************************************************/

void __thiscall FUN_00403890(void *this,double param_1,char param_2)

{
  byte bVar1;
  byte bVar2;
  int *piVar3;
  uint uVar4;
  uint uVar5;
  uint uVar6;
  int iVar7;
  byte *pbVar8;
  byte *pbVar9;
  int iVar10;
  int *piVar11;
  int local_20;
  
  if ((0 < *(int *)(*(int *)this + 8)) && (0 < *(int *)(*(int *)this + 0xc))) {
    param_1 = ABS(param_1);
    if (param_1 <= 1000.0) {
      if (param_1 == 1.0) {
        return;
      }
    }
    else {
      param_1 = 1000.0;
    }
    FUN_00402700(this);
    piVar3 = FUN_0040d3a0(0x100);
    if (param_2 != '\0') {
      local_20 = 0;
      do {
        iVar10 = FUN_0040a250((double)local_20 * param_1);
        if (0xff < iVar10) {
          iVar10 = 0xff;
        }
        *(char *)(local_20 + (int)piVar3) = (char)iVar10;
        local_20 = local_20 + 1;
      } while (local_20 < 0x100);
      pbVar8 = FUN_004028a0(this);
      iVar10 = *(int *)(*(int *)this + 0xc) * *(int *)(*(int *)this + 8);
      pbVar9 = pbVar8;
      if (0 < iVar10) {
        do {
          *pbVar9 = *(byte *)((uint)*pbVar9 + (int)piVar3);
          pbVar9[1] = *(byte *)((uint)pbVar9[1] + (int)piVar3);
          iVar10 = iVar10 + -1;
          pbVar9[2] = *(byte *)((uint)pbVar9[2] + (int)piVar3);
          pbVar9 = pbVar9 + 5;
        } while (iVar10 != 0);
      }
      FUN_00402950(this,pbVar8,1);
      FUN_0040d410((int *)pbVar8);
      FUN_0040d410(piVar3);
      return;
    }
    FUN_004025f0(this);
    *(undefined1 *)piVar3 = 0;
    *(undefined1 *)((int)piVar3 + 1) = 1;
    local_20 = 2;
    iVar10 = 0x30;
    do {
      bVar1 = *(byte *)(iVar10 + 1 + DAT_00437118);
      bVar2 = *(byte *)(iVar10 + DAT_00437118);
      uVar4 = FUN_0040a250((double)*(byte *)(iVar10 + 2 + DAT_00437118) * param_1);
      if (0xff < (int)uVar4) {
        uVar4 = 0xff;
      }
      uVar5 = FUN_0040a250((double)bVar1 * param_1);
      if (0xff < (int)uVar5) {
        uVar5 = 0xff;
      }
      uVar6 = FUN_0040a250((double)bVar2 * param_1);
      if (0xff < (int)uVar6) {
        uVar6 = 0xff;
      }
      iVar10 = iVar10 + 4;
      *(undefined1 *)(local_20 + (int)piVar3) =
           *(undefined1 *)
            ((((uVar6 & 0xff) >> 2) << 0xc | ((uVar5 & 0xff) >> 2) << 6 | (uVar4 & 0xff) >> 2) +
            DAT_00437150);
      local_20 = local_20 + 1;
    } while (iVar10 < 0x3a8);
    piVar11 = piVar3 + 0x38;
    for (iVar10 = 8; iVar10 != 0; iVar10 = iVar10 + -1) {
      *piVar11 = -0x20202021;
      piVar11 = piVar11 + 1;
    }
    iVar10 = *(int *)this;
    iVar7 = *(int *)(iVar10 + 0xc) * *(int *)(iVar10 + 8);
    pbVar9 = *(byte **)(iVar10 + 0x10);
    if (0 < iVar7) {
      do {
        iVar7 = iVar7 + -1;
        *pbVar9 = *(byte *)((uint)*pbVar9 + (int)piVar3);
        pbVar9 = pbVar9 + 1;
      } while (iVar7 != 0);
    }
    FUN_0040d410(piVar3);
  }
  return;
}



/******************************************************************************/
/* TARGET 00403b20  FUN_00403b20 */
/******************************************************************************/

void __thiscall FUN_00403b20(void *this,double param_1,char param_2,uint param_3)

{
  double dVar1;
  undefined1 uVar2;
  uint uVar3;
  undefined1 *puVar4;
  undefined1 *puVar5;
  int iVar6;
  int iVar7;
  undefined1 *puVar8;
  int iVar9;
  uint uVar10;
  float10 fVar11;
  float10 fVar12;
  float10 fVar13;
  int iStack_64;
  int iStack_60;
  int iStack_5c;
  uint uStack_58;
  undefined1 *puStack_54;
  uint uStack_50;
  void *local_4c;
  double dStack_48;
  int iStack_3c;
  int iStack_38;
  int iStack_34;
  int iStack_30;
  int iStack_2c;
  int iStack_28;
  int iStack_24;
  double dStack_20;
  double dStack_18;
  double dStack_10;
  
  iVar7 = *(int *)(*(int *)this + 8);
  iVar9 = *(int *)(*(int *)this + 0xc);
  if (iVar7 < 1) {
    return;
  }
  if (iVar9 < 1) {
    return;
  }
  for (; param_1 < 0.0; param_1 = param_1 + 804.247719318987) {
  }
  local_4c = this;
  fVar11 = (float10)FUN_00430a3a(this);
  dVar1 = (double)fVar11;
  if (((float10)-0.0001 < fVar11) && (fVar11 < (float10)0.0001)) {
    return;
  }
  FUN_00402700(this);
  if ((1.5706963267948966 < dVar1) && (dVar1 < 1.5708963267948965)) {
    FUN_00402560(&iStack_60,iVar9,iVar7);
    FUN_00402700(&iStack_60);
    FUN_004025f0(&iStack_60);
    puVar8 = *(undefined1 **)(iStack_60 + 0x10);
    puVar5 = (undefined1 *)((iVar9 + -1) * iVar7 + *(int *)(*(int *)this + 0x10));
    puVar4 = (undefined1 *)iVar9;
    uStack_58 = iVar7;
    do {
      do {
        puStack_54 = puVar4;
        uVar2 = *puVar5;
        puVar5 = puVar5 + -iVar7;
        *puVar8 = uVar2;
        puVar8 = puVar8 + 1;
        puStack_54 = (undefined1 *)((int)puStack_54 + -1);
        puVar4 = puStack_54;
      } while (puStack_54 != (undefined1 *)0x0);
      puVar5 = puVar5 + iVar9 * iVar7 + 1;
      uStack_58 = uStack_58 + -1;
      puVar4 = (undefined1 *)iVar9;
    } while (uStack_58 != 0);
    FUN_00404260(this,&iStack_60);
    thunk_FUN_00402520(&iStack_60);
    return;
  }
  if ((3.141492653589793 < dVar1) && (dVar1 < 3.1416926535897933)) {
    FUN_004025f0(this);
    puVar8 = *(undefined1 **)(*(int *)this + 0x10);
    iVar6 = (iVar9 * iVar7) / 2;
    puVar5 = puVar8 + iVar9 * iVar7 + -1;
    if (iVar6 < 1) {
      return;
    }
    do {
      uVar2 = *puVar8;
      *puVar8 = *puVar5;
      *puVar5 = uVar2;
      puVar8 = puVar8 + 1;
      puVar5 = puVar5 + -1;
      iVar6 = iVar6 + -1;
    } while (iVar6 != 0);
    return;
  }
  if ((4.71228898038469 < dVar1) && (dVar1 < 4.712488980384689)) {
    FUN_00402560(&iStack_60,iVar9,iVar7);
    FUN_00402700(&iStack_60);
    FUN_004025f0(&iStack_60);
    puVar8 = *(undefined1 **)(iStack_60 + 0x10);
    puVar5 = (undefined1 *)(*(int *)(*(int *)this + 0x10) + -1 + iVar7);
    iVar6 = iVar9;
    puStack_54 = (undefined1 *)iVar7;
    do {
      do {
        uVar2 = *puVar5;
        puVar5 = puVar5 + iVar7;
        *puVar8 = uVar2;
        puVar8 = puVar8 + 1;
        iVar6 = iVar6 + -1;
      } while (iVar6 != 0);
      puVar5 = puVar5 + (-1 - iVar9 * iVar7);
      puStack_54 = (undefined1 *)((int)puStack_54 + -1);
      iVar6 = iVar9;
    } while (puStack_54 != (undefined1 *)0x0);
    FUN_00404260(local_4c,&iStack_60);
    thunk_FUN_00402520(&iStack_60);
    return;
  }
  if (param_2 != '\0') {
    FUN_004036e0(this,iVar7 * 2,iVar9 * 2,0,0);
  }
  uVar3 = *(uint *)(*(int *)this + 8);
  uStack_58 = *(uint *)(*(int *)this + 0xc);
  fVar11 = (float10)(int)uStack_58;
  fVar12 = (float10)(int)uVar3;
  fVar13 = (float10)fpatan(fVar11,fVar12);
  dStack_48 = (double)fVar13;
  dStack_20 = (double)SQRT(fVar11 * fVar11 + fVar12 * fVar12);
  uStack_50 = uVar3;
  iVar7 = FUN_0040a2d0(dVar1 / 1.5707963267948966);
  if (iVar7 == 0) {
    fVar11 = (float10)fcos((float10)dVar1 - (float10)dStack_48);
    iStack_64 = FUN_0040a250((double)(fVar11 * (float10)dStack_20 + (float10)0.4));
    fVar11 = (float10)dStack_48 + (float10)dVar1;
  }
  else {
    if (iVar7 != 1) {
      if (iVar7 == 2) {
        fVar11 = (float10)fcos((float10)dVar1 - (float10)dStack_48);
        iStack_64 = FUN_0040a250((double)((float10)0.4 - fVar11 * (float10)dStack_20));
        fVar11 = (float10)fsin((float10)dStack_48 + (float10)dVar1);
        fVar11 = (float10)0.4 - fVar11 * (float10)dStack_20;
      }
      else {
        fVar11 = (float10)fcos((float10)dStack_48 + (float10)dVar1);
        iStack_64 = FUN_0040a250((double)(fVar11 * (float10)dStack_20 + (float10)0.4));
        fVar11 = (float10)fsin((float10)dVar1 - (float10)dStack_48);
        fVar11 = (float10)0.4 - fVar11 * (float10)dStack_20;
      }
      goto LAB_00403ec6;
    }
    fVar11 = (float10)fcos((float10)dStack_48 + (float10)dVar1);
    iStack_64 = FUN_0040a250((double)((float10)0.4 - fVar11 * (float10)dStack_20));
    fVar11 = (float10)dVar1 - (float10)dStack_48;
  }
  fVar11 = (float10)fsin(fVar11);
  fVar11 = fVar11 * (float10)dStack_20 + (float10)0.4;
LAB_00403ec6:
  iStack_60 = FUN_0040a250((double)fVar11);
  if (iStack_64 < 0x8001) {
    if (iStack_64 < 1) {
      iStack_64 = 1;
    }
  }
  else {
    iStack_64 = 0x8000;
  }
  if (iStack_60 < 0x8001) {
    if (iStack_60 < 1) {
      iStack_60 = 1;
    }
  }
  else {
    iStack_60 = 0x8000;
  }
  iStack_34 = iStack_64 / 2;
  iStack_3c = (int)(uVar3 + 1) / 2;
  iStack_38 = (int)(uStack_58 + 1) / 2;
  iVar7 = iStack_60 / 2;
  iStack_24 = iVar7;
  FUN_00402560(&iStack_5c,iStack_64,iStack_60);
  FUN_00402700(&iStack_5c);
  FUN_004025f0(&iStack_5c);
  iStack_28 = *(int *)(*(int *)this + 0x10);
  puStack_54 = *(undefined1 **)(iStack_5c + 0x10);
  uStack_50 = 0;
  if (0 < iStack_60) {
    do {
      iVar9 = 0;
      dStack_48 = (double)CONCAT44(dStack_48._4_4_,uStack_50 - iVar7);
      dStack_18 = (double)(int)(uStack_50 - iVar7);
      dStack_10 = dStack_18 * dStack_18;
      if (0 < iStack_64) {
        iStack_30 = uVar3 - iStack_3c;
        iStack_2c = uStack_58 - iStack_38;
        do {
          fVar11 = (float10)(iVar9 - iStack_34);
          fVar12 = (float10)fpatan((float10)dStack_18,fVar11);
          dStack_48 = (double)(fVar12 - (float10)dVar1);
          dStack_20 = (double)SQRT(fVar11 * fVar11 + (float10)dStack_10);
          fVar11 = (float10)fcos((float10)dStack_48);
          iVar7 = FUN_0040a250((double)(fVar11 * (float10)dStack_20));
          fVar11 = (float10)fsin((float10)dStack_48);
          uVar10 = iVar7 + iStack_30;
          iVar7 = FUN_0040a250((double)(fVar11 * (float10)dStack_20));
          if ((uVar10 < uVar3) && ((uint)(iVar7 + iStack_2c) < uStack_58)) {
            *puStack_54 = *(undefined1 *)((iVar7 + iStack_2c) * uVar3 + uVar10 + iStack_28);
          }
          else {
            *puStack_54 = 0;
          }
          puStack_54 = puStack_54 + 1;
          iVar9 = iVar9 + 1;
          iVar7 = iStack_24;
        } while (iVar9 < iStack_64);
      }
      uStack_50 = uStack_50 + 1;
      this = local_4c;
    } while ((int)uStack_50 < iStack_60);
  }
  FUN_00404260(this,&iStack_5c);
  if (param_2 != '\0') {
    FUN_004036e0(this,(iStack_64 + 1) / 2,(iStack_60 + 1) / 2,1,param_3 & 0xff);
  }
  thunk_FUN_00402520(&iStack_5c);
  return;
}



/******************************************************************************/
/* TARGET 004040e0  FUN_004040e0 */
/******************************************************************************/

void __thiscall FUN_004040e0(void *this,byte *param_1)

{
  byte bVar1;
  int *piVar2;
  int iVar3;
  undefined4 *puVar4;
  LPVOID pvVar5;
  undefined1 *puVar6;
  int iVar7;
  int local_c;
  int local_8;
  
  piVar2 = *(int **)this;
  iVar3 = piVar2[2];
  iVar7 = piVar2[3];
  if (1 < *piVar2) {
    local_c = iVar3;
    if (iVar3 < 1) {
      local_c = 1;
    }
    local_8 = iVar7;
    if (iVar7 < 1) {
      local_8 = 1;
    }
    puVar4 = FUN_0040d3a0(0x18);
    puVar4[2] = local_c;
    *puVar4 = 1;
    puVar4[1] = 3;
    puVar4[3] = local_8;
    pvVar5 = FUN_0040d3a0(local_c * local_8);
    puVar4[4] = pvVar5;
    *(undefined4 **)this = puVar4;
    *piVar2 = *piVar2 + -1;
  }
  iVar7 = iVar7 * iVar3;
  piVar2[1] = 3;
  puVar6 = *(undefined1 **)(*(int *)this + 0x10);
  if (0 < iVar7) {
    do {
      bVar1 = *param_1;
      param_1 = param_1 + 1;
      iVar7 = iVar7 + -1;
      *puVar6 = *(undefined1 *)((uint)bVar1 + DAT_0043724c);
      puVar6 = puVar6 + 1;
    } while (iVar7 != 0);
  }
  return;
}



/******************************************************************************/
/* TARGET 00404190  FUN_00404190 */
/******************************************************************************/

void __fastcall FUN_00404190(int *param_1)

{
  undefined1 uVar1;
  int iVar2;
  undefined1 *puVar3;
  undefined1 *puVar4;
  int iVar5;
  undefined1 *puVar6;
  int iVar7;
  int local_8;
  
  FUN_00402700(param_1);
  FUN_004025f0(param_1);
  iVar7 = *param_1;
  local_8 = *(int *)(iVar7 + 0xc);
  iVar2 = *(int *)(iVar7 + 8);
  if (0 < local_8) {
    iVar5 = iVar2 / 2;
    puVar3 = *(undefined1 **)(iVar7 + 0x10);
    do {
      puVar6 = puVar3 + iVar2;
      iVar7 = iVar5;
      puVar4 = puVar6;
      if (0 < iVar5) {
        do {
          puVar4 = puVar4 + -1;
          uVar1 = *puVar3;
          *puVar3 = *puVar4;
          *puVar4 = uVar1;
          puVar3 = puVar3 + 1;
          iVar7 = iVar7 + -1;
        } while (iVar7 != 0);
      }
      local_8 = local_8 + -1;
      puVar3 = puVar6;
    } while (local_8 != 0);
  }
  return;
}



/******************************************************************************/
/* TARGET 00404200  FUN_00404200 */
/******************************************************************************/

void __fastcall FUN_00404200(int *param_1)

{
  undefined1 uVar1;
  int iVar2;
  int iVar3;
  undefined1 *puVar4;
  int iVar5;
  undefined1 *puVar6;
  
  FUN_00402700(param_1);
  FUN_004025f0(param_1);
  iVar3 = *param_1;
  iVar2 = *(int *)(iVar3 + 8);
  puVar6 = *(undefined1 **)(iVar3 + 0x10);
  puVar4 = puVar6 + (*(int *)(iVar3 + 0xc) + -1) * iVar2;
  iVar3 = *(int *)(iVar3 + 0xc) / 2;
  if (0 < iVar3) {
    do {
      iVar5 = iVar2;
      if (0 < iVar2) {
        do {
          uVar1 = *puVar6;
          *puVar6 = *puVar4;
          *puVar4 = uVar1;
          puVar6 = puVar6 + 1;
          puVar4 = puVar4 + 1;
          iVar5 = iVar5 + -1;
        } while (iVar5 != 0);
      }
      iVar3 = iVar3 + -1;
      puVar4 = puVar4 + iVar2 * -2;
    } while (iVar3 != 0);
  }
  return;
}



/******************************************************************************/
/* TARGET 00404250  FUN_00404250 */
/******************************************************************************/

void FUN_00404250(void)

{
  return;
}



/******************************************************************************/
/* TARGET 00404260  FUN_00404260 */
/******************************************************************************/

int * __thiscall FUN_00404260(void *this,undefined4 *param_1)

{
  int *piVar1;
  
  FUN_00402520(this);
  piVar1 = (int *)*param_1;
  *(int **)this = piVar1;
  *piVar1 = *piVar1 + 1;
  return this;
}



/******************************************************************************/
/* TARGET 00404280  FUN_00404280 */
/******************************************************************************/

int * __thiscall FUN_00404280(void *this,int *param_1)

{
  FUN_00402520(this);
  *(int **)this = param_1;
  *param_1 = *param_1 + 1;
  return this;
}



/******************************************************************************/
/* TARGET 004042a0  FUN_004042a0 */
/******************************************************************************/

int * __thiscall FUN_004042a0(void *this,int *param_1)

{
  undefined4 *puVar1;
  LPVOID pvVar2;
  int iVar3;
  undefined4 *puVar4;
  
  FUN_004010e0(param_1);
  FUN_00402520(this);
  puVar1 = FUN_0040d3a0(0x18);
  *puVar1 = 1;
  puVar1[1] = 3;
  puVar1[2] = 0x20;
  puVar1[3] = 0x20;
  pvVar2 = FUN_0040d3a0(0x400);
  puVar1[4] = pvVar2;
  *(undefined4 **)this = puVar1;
  puVar4 = *(undefined4 **)(*param_1 + 0x14);
  puVar1 = (undefined4 *)puVar1[4];
  for (iVar3 = 0x100; iVar3 != 0; iVar3 = iVar3 + -1) {
    *puVar1 = *puVar4;
    puVar4 = puVar4 + 1;
    puVar1 = puVar1 + 1;
  }
  return this;
}



/******************************************************************************/
/* TARGET 00404310  FUN_00404310 */
/******************************************************************************/

int * __thiscall FUN_00404310(int *param_1,int *param_2)

{
  int iVar1;
  undefined4 *puVar2;
  LPVOID pvVar3;
  undefined4 *puVar4;
  int *piVar5;
  int iVar6;
  undefined4 *puVar7;
  int iVar8;
  int *piVar9;
  undefined4 *puVar10;
  int local_10;
  int *local_8;
  
  iVar1 = *(int *)(*param_2 + 4);
  piVar5 = *(int **)(*param_2 + 8);
  iVar8 = iVar1 * 0x20;
  FUN_00402520(param_1);
  iVar6 = (int)piVar5 << 5;
  if (iVar8 < 1) {
    iVar8 = 1;
  }
  if (iVar6 < 1) {
    iVar6 = 1;
  }
  puVar2 = FUN_0040d3a0(0x18);
  *puVar2 = 1;
  puVar2[1] = 3;
  puVar2[2] = iVar8;
  puVar2[3] = iVar6;
  pvVar3 = FUN_0040d3a0(iVar8 * iVar6);
  puVar2[4] = pvVar3;
  *param_1 = (int)puVar2;
  puVar2 = (undefined4 *)puVar2[4];
  piVar9 = (int *)(*param_2 + 0xc);
  param_2 = piVar9;
  local_8 = piVar5;
  if (0 < (int)piVar5) {
    do {
      local_10 = iVar1;
      if (0 < iVar1) {
        do {
          FUN_004010e0(piVar9);
          iVar6 = 0x20;
          puVar4 = *(undefined4 **)(*piVar9 + 0x14);
          do {
            puVar7 = puVar2 + iVar1 * 8;
            iVar6 = iVar6 + -1;
            puVar10 = puVar4;
            for (iVar8 = 8; iVar8 != 0; iVar8 = iVar8 + -1) {
              *puVar2 = *puVar10;
              puVar10 = puVar10 + 1;
              puVar2 = puVar2 + 1;
            }
            puVar4 = puVar4 + 8;
            puVar2 = puVar7;
          } while (iVar6 != 0);
          puVar2 = puVar7 + iVar1 * -0x100 + 8;
          piVar9 = param_2 + 2;
          local_10 = local_10 + -1;
          param_2 = piVar9;
        } while (local_10 != 0);
      }
      puVar2 = puVar2 + iVar1 * 0xf8;
      local_8 = (int *)((int)local_8 + -1);
      piVar5 = (int *)0x0;
    } while (local_8 != (int *)0x0);
  }
  return piVar5;
}



/******************************************************************************/
/* TARGET 00404430  FUN_00404430 */
/******************************************************************************/

void __fastcall FUN_00404430(int *param_1)

{
  int *piVar1;
  
  FUN_00404450(param_1,param_1[1]);
  piVar1 = FUN_0040d470((int *)*param_1,0);
  *param_1 = (int)piVar1;
  param_1[2] = 0;
  return;
}



/******************************************************************************/
/* TARGET 00404450  FUN_00404450 */
/******************************************************************************/

void __fastcall FUN_00404450(int *param_1,int param_2)

{
  int iVar1;
  int *piVar2;
  
  iVar1 = param_1[1];
  if (iVar1 < param_2) {
    param_2 = iVar1;
  }
  piVar2 = (int *)(*param_1 + -4 + iVar1 * 4);
  param_1[1] = iVar1 - param_2;
  if (0 < param_2) {
    do {
      thunk_FUN_00402520(piVar2);
      piVar2 = piVar2 + -1;
      param_2 = param_2 + -1;
    } while (param_2 != 0);
  }
  return;
}



/******************************************************************************/
/* TARGET 00404480  FUN_00404480 */
/******************************************************************************/

int __fastcall FUN_00404480(int *param_1,uint param_2)

{
  int iVar1;
  
  iVar1 = param_1[1];
  if (param_1[2] <= iVar1) {
    FUN_00401850(param_1);
  }
  param_1[1] = iVar1 + 1U;
  if (param_2 < iVar1 + 1U) {
    FUN_00401090((void *)(*param_1 + iVar1 * 4),*(int **)(*param_1 + param_2 * 4));
    return iVar1;
  }
  FUN_004025d0((undefined4 *)(*param_1 + iVar1 * 4));
  return iVar1;
}



/******************************************************************************/
/* TARGET 004044d0  FUN_004044d0 */
/******************************************************************************/

int __fastcall FUN_004044d0(int *param_1,uint param_2,int param_3)

{
  int iVar1;
  int *piVar2;
  int iVar3;
  int iVar4;
  
  iVar1 = param_1[1];
  if (param_1[2] <= iVar1) {
    FUN_00401850(param_1);
  }
  param_1[1] = iVar1 + 1U;
  if (param_2 < iVar1 + 1U) {
    piVar2 = *(int **)(*param_1 + param_2 * 4);
    FUN_00401090((void *)(*param_1 + iVar1 * 4),piVar2);
    param_3 = param_3 + -1;
    if (0 < param_3) {
      do {
        iVar4 = param_1[1];
        if (param_1[2] <= iVar4) {
          FUN_00401850(param_1);
        }
        param_1[1] = iVar4 + 1;
        FUN_00401090((void *)(*param_1 + iVar4 * 4),piVar2);
        param_3 = param_3 + -1;
      } while (param_3 != 0);
      return iVar1;
    }
  }
  else {
    FUN_004025d0((undefined4 *)(*param_1 + iVar1 * 4));
    iVar4 = param_3 + -1;
    if (0 < iVar4) {
      do {
        iVar3 = param_1[1];
        if (param_1[2] <= iVar3) {
          FUN_00401850(param_1);
        }
        param_1[1] = iVar3 + 1;
        FUN_004025d0((undefined4 *)(*param_1 + iVar3 * 4));
        iVar4 = iVar4 + -1;
      } while (iVar4 != 0);
    }
  }
  return iVar1;
}



/******************************************************************************/
/* TARGET 00404590  FUN_00404590 */
/******************************************************************************/

void __fastcall FUN_00404590(undefined4 *param_1)

{
  int iVar1;
  int *piVar2;
  
  iVar1 = param_1[2];
  param_1[2] = iVar1 << 1;
  if (iVar1 << 1 == 0) {
    param_1[2] = 0x200;
  }
  piVar2 = FUN_0040d470((int *)*param_1,param_1[2] << 3);
  *param_1 = piVar2;
  return;
}



/******************************************************************************/
/* TARGET 004045c0  FUN_004045c0 */
/******************************************************************************/

void __fastcall FUN_004045c0(undefined4 *param_1,int param_2)

{
  uint uVar1;
  int *piVar2;
  
  param_1[1] = param_2;
  if ((int)param_1[2] < param_2) {
    uVar1 = param_2 + 0x800U & 0xfffffc00;
    param_1[2] = uVar1;
    piVar2 = FUN_0040d470((int *)*param_1,uVar1 * 8);
    *param_1 = piVar2;
  }
  return;
}



/******************************************************************************/
/* TARGET 004045f0  FUN_004045f0 */
/******************************************************************************/

float10 __fastcall FUN_004045f0(int *param_1,uint param_2)

{
  if (param_2 < (uint)param_1[1]) {
    return (float10)*(double *)(*param_1 + param_2 * 8);
  }
  return (float10)0.0;
}



/******************************************************************************/
/* TARGET 00404610  FUN_00404610 */
/******************************************************************************/

void __fastcall FUN_00404610(int *param_1,uint param_2,undefined8 param_3)

{
  undefined1 *puVar1;
  int iVar2;
  undefined4 *puVar3;
  undefined4 *puVar4;
  uint uVar5;
  undefined4 *puVar6;
  
  uVar5 = param_1[1];
  if (uVar5 < param_2) {
    param_2 = ((int)param_2 < 0) - 1 & uVar5;
  }
  iVar2 = uVar5 - param_2;
  FUN_004045c0(param_1,uVar5 + 1);
  if (0 < iVar2) {
    uVar5 = iVar2 * 8;
    puVar4 = (undefined4 *)(*param_1 + param_2 * 8);
    puVar6 = (undefined4 *)(*param_1 + 8 + param_2 * 8);
    if ((puVar4 < puVar6) && (puVar3 = puVar4 + iVar2 * 2, puVar6 < puVar3)) {
      puVar1 = (undefined1 *)((int)puVar6 + (uVar5 - 1));
      if (0 < (int)uVar5) {
        do {
          puVar3 = (undefined4 *)((int)puVar3 - 1);
          *puVar1 = *(undefined1 *)puVar3;
          puVar1 = puVar1 + -1;
          uVar5 = uVar5 - 1;
        } while (uVar5 != 0);
        *(undefined8 *)(*param_1 + param_2 * 8) = param_3;
        return;
      }
    }
    else {
      for (uVar5 = uVar5 >> 2; uVar5 != 0; uVar5 = uVar5 - 1) {
        *puVar6 = *puVar4;
        puVar4 = puVar4 + 1;
        puVar6 = puVar6 + 1;
      }
      for (iVar2 = 0; iVar2 != 0; iVar2 = iVar2 + -1) {
        *(undefined1 *)puVar6 = *(undefined1 *)puVar4;
        puVar4 = (undefined4 *)((int)puVar4 + 1);
        puVar6 = (undefined4 *)((int)puVar6 + 1);
      }
    }
  }
  *(undefined8 *)(*param_1 + param_2 * 8) = param_3;
  return;
}



/******************************************************************************/
/* TARGET 004046a0  FUN_004046a0 */
/******************************************************************************/

int __thiscall FUN_004046a0(void *this,undefined8 param_1)

{
  int iVar1;
  
  iVar1 = *(int *)((int)this + 4);
  if (*(int *)((int)this + 8) <= iVar1) {
    FUN_00404590(this);
  }
  *(int *)((int)this + 4) = iVar1 + 1;
  *(undefined8 *)(*(int *)this + iVar1 * 8) = param_1;
  return iVar1;
}



/******************************************************************************/
/* TARGET 004046d0  FUN_004046d0 */
/******************************************************************************/

int __fastcall FUN_004046d0(int *param_1,uint param_2)

{
  int iVar1;
  int iVar2;
  
  iVar1 = param_1[1];
  if (param_1[2] <= iVar1) {
    FUN_00404590(param_1);
  }
  param_1[1] = iVar1 + 1U;
  if (param_2 < iVar1 + 1U) {
    iVar2 = *param_1;
    *(undefined4 *)(iVar2 + iVar1 * 8) = *(undefined4 *)(iVar2 + param_2 * 8);
    *(undefined4 *)(iVar2 + 4 + iVar1 * 8) = *(undefined4 *)(iVar2 + 4 + param_2 * 8);
    return iVar1;
  }
  iVar2 = *param_1;
  *(undefined4 *)(iVar2 + iVar1 * 8) = 0;
  *(undefined4 *)(iVar2 + 4 + iVar1 * 8) = 0;
  return iVar1;
}



/******************************************************************************/
/* TARGET 00404720  FUN_00404720 */
/******************************************************************************/

int __fastcall FUN_00404720(int *param_1,uint param_2,int param_3)

{
  undefined8 uVar1;
  int iVar2;
  int iVar3;
  int iVar4;
  int local_14;
  
  iVar2 = param_1[1];
  if (param_1[2] <= iVar2) {
    FUN_00404590(param_1);
  }
  param_1[1] = iVar2 + 1U;
  if (param_2 < iVar2 + 1U) {
    uVar1 = *(undefined8 *)(*param_1 + param_2 * 8);
    *(undefined8 *)(*param_1 + iVar2 * 8) = uVar1;
    local_14 = param_3 + -1;
    if (0 < local_14) {
      do {
        iVar3 = param_1[1];
        if (param_1[2] <= iVar3) {
          FUN_00404590(param_1);
        }
        param_1[1] = iVar3 + 1;
        *(undefined8 *)(*param_1 + iVar3 * 8) = uVar1;
        local_14 = local_14 + -1;
      } while (local_14 != 0);
      return iVar2;
    }
  }
  else {
    iVar3 = *param_1;
    local_14 = param_3 + -1;
    *(undefined4 *)(iVar3 + iVar2 * 8) = 0;
    *(undefined4 *)(iVar3 + 4 + iVar2 * 8) = 0;
    if (0 < local_14) {
      do {
        iVar3 = param_1[1];
        if (param_1[2] <= iVar3) {
          FUN_00404590(param_1);
        }
        iVar4 = *param_1;
        param_1[1] = iVar3 + 1;
        *(undefined4 *)(iVar4 + iVar3 * 8) = 0;
        local_14 = local_14 + -1;
        *(undefined4 *)(iVar4 + 4 + iVar3 * 8) = 0;
      } while (local_14 != 0);
    }
  }
  return iVar2;
}



/******************************************************************************/
/* TARGET 00404800  FUN_00404800 */
/******************************************************************************/

void __fastcall FUN_00404800(undefined4 *param_1)

{
  *param_1 = &DAT_00436158;
  DAT_00436158 = DAT_00436158 + 1;
  return;
}



/******************************************************************************/
/* TARGET 00404820  FUN_00404820 */
/******************************************************************************/

void __fastcall FUN_00404820(undefined4 *param_1)

{
  *param_1 = &DAT_00436158;
  DAT_00436158 = DAT_00436158 + 1;
  return;
}



/******************************************************************************/
/* TARGET 00404840  FUN_00404840 */
/******************************************************************************/

void __fastcall FUN_00404840(int *param_1)

{
  int *piVar1;
  int iVar2;
  
  iVar2 = *(int *)*param_1 + -1;
  *(int *)*param_1 = iVar2;
  if (iVar2 == 0) {
    piVar1 = *(int **)(*param_1 + 0x14);
    if (piVar1 != (int *)0x0) {
      (**(code **)(*piVar1 + 0x48))(piVar1);
      (**(code **)(**(int **)(*param_1 + 0x14) + 8))(*(int **)(*param_1 + 0x14));
    }
    FUN_0040d410(*(int **)(*param_1 + 0x1c));
    FUN_0040d410((int *)*param_1);
  }
  return;
}



/******************************************************************************/
/* TARGET 00404880  FUN_00404880 */
/******************************************************************************/

void __thiscall FUN_00404880(void *this,int param_1)

{
  undefined4 *puVar1;
  LPVOID pvVar2;
  
  if (param_1 < 0) {
    param_1 = 0;
  }
  puVar1 = FUN_0040d3a0(0x20);
  *(undefined4 **)this = puVar1;
  *puVar1 = 1;
  puVar1[1] = param_1;
  puVar1[2] = 0x5622;
  puVar1[3] = 1;
  *(undefined2 *)(puVar1 + 4) = 1;
  *(undefined2 *)((int)puVar1 + 0x12) = 0x10;
  puVar1[5] = 0;
  puVar1[6] = 0;
  pvVar2 = FUN_0040d3a0(param_1);
  puVar1[7] = pvVar2;
  return;
}



/******************************************************************************/
/* TARGET 004048e0  FUN_004048e0 */
/******************************************************************************/

void __fastcall FUN_004048e0(int *param_1)

{
  int *piVar1;
  undefined4 *puVar2;
  LPVOID pvVar3;
  uint uVar4;
  uint uVar5;
  int *piVar6;
  undefined4 *puVar7;
  int iVar8;
  int *piVar9;
  
  piVar1 = (int *)*param_1;
  if (1 < *piVar1) {
    iVar8 = piVar1[1];
    if (iVar8 < 0) {
      iVar8 = 0;
    }
    puVar2 = FUN_0040d3a0(0x20);
    *param_1 = (int)puVar2;
    *puVar2 = 1;
    puVar2[3] = 1;
    *(undefined2 *)(puVar2 + 4) = 1;
    puVar2[1] = iVar8;
    puVar2[2] = 0x5622;
    *(undefined2 *)((int)puVar2 + 0x12) = 0x10;
    puVar2[5] = 0;
    puVar2[6] = 0;
    pvVar3 = FUN_0040d3a0(iVar8);
    puVar2[7] = pvVar3;
    puVar2 = (undefined4 *)((int *)*param_1)[7];
    piVar6 = piVar1;
    piVar9 = (int *)*param_1;
    for (iVar8 = 8; iVar8 != 0; iVar8 = iVar8 + -1) {
      *piVar9 = *piVar6;
      piVar6 = piVar6 + 1;
      piVar9 = piVar9 + 1;
    }
    *(undefined4 **)(*param_1 + 0x1c) = puVar2;
    *(undefined4 *)(*param_1 + 0x14) = 0;
    uVar5 = *(uint *)(*param_1 + 4);
    puVar7 = (undefined4 *)piVar1[7];
    for (uVar4 = uVar5 >> 2; uVar4 != 0; uVar4 = uVar4 - 1) {
      *puVar2 = *puVar7;
      puVar7 = puVar7 + 1;
      puVar2 = puVar2 + 1;
    }
    for (uVar5 = uVar5 & 3; uVar5 != 0; uVar5 = uVar5 - 1) {
      *(undefined1 *)puVar2 = *(undefined1 *)puVar7;
      puVar7 = (undefined4 *)((int)puVar7 + 1);
      puVar2 = (undefined4 *)((int)puVar2 + 1);
    }
    *(undefined4 *)*param_1 = 1;
    *piVar1 = *piVar1 + -1;
  }
  return;
}



/******************************************************************************/
/* TARGET 00404990  FUN_00404990 */
/******************************************************************************/

void __fastcall FUN_00404990(int *param_1)

{
  FUN_00404840(param_1);
  FUN_00401090(param_1,&DAT_00436158);
  return;
}



/******************************************************************************/
/* TARGET 004049b0  FUN_004049b0 */
/******************************************************************************/

void __thiscall FUN_004049b0(void *this,int param_1)

{
  FUN_00404840(this);
  FUN_00404880(this,param_1);
  return;
}



/******************************************************************************/
/* TARGET 004049d0  FUN_004049d0 */
/******************************************************************************/

void __thiscall FUN_004049d0(void *this,uint param_1)

{
  int *piVar1;
  
  FUN_004048e0(this);
  if ((int)param_1 < 0) {
    param_1 = 0;
  }
  piVar1 = FUN_0040d470(*(int **)(*(int *)this + 0x1c),param_1);
  *(int **)(*(int *)this + 0x1c) = piVar1;
  *(uint *)(*(int *)this + 4) = param_1;
  return;
}



/******************************************************************************/
/* TARGET 00404aa0  FUN_00404aa0 */
/******************************************************************************/

void __fastcall FUN_00404aa0(int *param_1)

{
  undefined2 uVar1;
  int iVar2;
  int iVar3;
  short *psVar4;
  int iVar5;
  char *pcVar6;
  
  FUN_00404d90(param_1);
  iVar2 = *param_1;
  if ((*(short *)(iVar2 + 0x12) != 0x10) && (*(int *)(iVar2 + 0xc) == 1)) {
    iVar5 = *(int *)(iVar2 + 4);
    FUN_00404880(param_1,iVar5 * 2);
    iVar3 = *param_1;
    *(undefined4 *)(iVar3 + 8) = *(undefined4 *)(iVar2 + 8);
    *(undefined4 *)(iVar3 + 0xc) = *(undefined4 *)(iVar2 + 0xc);
    uVar1 = *(undefined2 *)(iVar2 + 0x10);
    *(undefined2 *)(iVar3 + 0x12) = 0x10;
    *(undefined2 *)(iVar3 + 0x10) = uVar1;
    *(undefined4 *)(iVar3 + 0x18) = 0;
    pcVar6 = *(char **)(iVar2 + 0x1c);
    psVar4 = *(short **)(iVar3 + 0x1c);
    if (0 < iVar5) {
      do {
        *psVar4 = (short)(char)(*pcVar6 + -0x80) << 8;
        pcVar6 = pcVar6 + 1;
        iVar5 = iVar5 + -1;
        psVar4 = psVar4 + 1;
      } while (iVar5 != 0);
    }
    *param_1 = iVar2;
    FUN_00404840(param_1);
    *param_1 = iVar3;
  }
  return;
}



/******************************************************************************/
/* TARGET 00404b30  FUN_00404b30 */
/******************************************************************************/

void __fastcall FUN_00404b30(int *param_1)

{
  undefined1 uVar1;
  undefined2 uVar2;
  int iVar3;
  int iVar4;
  undefined1 *puVar5;
  undefined2 *puVar6;
  undefined1 *puVar7;
  undefined2 *puVar8;
  int iVar9;
  
  FUN_00404d90(param_1);
  iVar3 = *param_1;
  if ((*(short *)(iVar3 + 0x10) != 2) && (*(int *)(iVar3 + 0xc) == 1)) {
    iVar9 = *(int *)(iVar3 + 4);
    FUN_00404880(param_1,iVar9 * 2);
    iVar4 = *param_1;
    *(undefined4 *)(iVar4 + 8) = *(undefined4 *)(iVar3 + 8);
    *(undefined4 *)(iVar4 + 0xc) = *(undefined4 *)(iVar3 + 0xc);
    *(undefined2 *)(iVar4 + 0x10) = 2;
    *(undefined4 *)(iVar4 + 0x18) = 0;
    *(undefined2 *)(iVar4 + 0x12) = *(undefined2 *)(iVar3 + 0x12);
    if (*(short *)(iVar3 + 0x12) == 8) {
      puVar7 = *(undefined1 **)(iVar3 + 0x1c);
      puVar5 = *(undefined1 **)(iVar4 + 0x1c);
      if (0 < iVar9) {
        do {
          uVar1 = *puVar7;
          puVar7 = puVar7 + 1;
          *puVar5 = uVar1;
          puVar5[1] = uVar1;
          puVar5 = puVar5 + 2;
          iVar9 = iVar9 + -1;
        } while (iVar9 != 0);
        *param_1 = iVar3;
        FUN_00404840(param_1);
        *param_1 = iVar4;
        return;
      }
    }
    else {
      puVar6 = *(undefined2 **)(iVar4 + 0x1c);
      puVar8 = *(undefined2 **)(iVar3 + 0x1c);
      iVar9 = iVar9 / 2;
      if (0 < iVar9) {
        do {
          uVar2 = *puVar8;
          puVar8 = puVar8 + 1;
          *puVar6 = uVar2;
          puVar6[1] = uVar2;
          puVar6 = puVar6 + 2;
          iVar9 = iVar9 + -1;
        } while (iVar9 != 0);
      }
    }
    *param_1 = iVar3;
    FUN_00404840(param_1);
    *param_1 = iVar4;
  }
  return;
}



/******************************************************************************/
/* TARGET 00404ce0  FUN_00404ce0 */
/******************************************************************************/

void __fastcall FUN_00404ce0(int *param_1)

{
  undefined1 *puVar1;
  undefined2 *puVar2;
  int iVar3;
  int iVar4;
  int iVar5;
  undefined1 *puVar6;
  undefined2 *puVar7;
  int iVar8;
  
  FUN_00404d90(param_1);
  iVar3 = *param_1;
  if (*(int *)(iVar3 + 0xc) == 1) {
    iVar8 = *(int *)(iVar3 + 4);
    FUN_00404880(param_1,iVar8);
    iVar4 = *param_1;
    *(undefined4 *)(iVar4 + 8) = *(undefined4 *)(iVar3 + 8);
    *(undefined4 *)(iVar4 + 0xc) = *(undefined4 *)(iVar3 + 0xc);
    *(undefined2 *)(iVar4 + 0x10) = *(undefined2 *)(iVar3 + 0x10);
    *(undefined4 *)(iVar4 + 0x18) = 0;
    *(undefined2 *)(iVar4 + 0x12) = *(undefined2 *)(iVar3 + 0x12);
    if (*(short *)(iVar3 + 0x12) == 8) {
      puVar6 = *(undefined1 **)(iVar4 + 0x1c);
      iVar5 = *(int *)(iVar3 + 0x1c) + iVar8;
      if (0 < iVar8) {
        do {
          puVar1 = (undefined1 *)(iVar5 + -1);
          iVar5 = iVar5 + -1;
          *puVar6 = *puVar1;
          puVar6 = puVar6 + 1;
          iVar8 = iVar8 + -1;
        } while (iVar8 != 0);
        *param_1 = iVar3;
        FUN_00404840(param_1);
        *param_1 = iVar4;
        return;
      }
    }
    else {
      puVar7 = *(undefined2 **)(iVar4 + 0x1c);
      iVar8 = iVar8 / 2;
      iVar5 = *(int *)(iVar3 + 0x1c) + iVar8 * 2;
      if (0 < iVar8) {
        do {
          puVar2 = (undefined2 *)(iVar5 + -2);
          iVar5 = iVar5 + -2;
          *puVar7 = *puVar2;
          puVar7 = puVar7 + 1;
          iVar8 = iVar8 + -1;
        } while (iVar8 != 0);
      }
    }
    *param_1 = iVar3;
    FUN_00404840(param_1);
    *param_1 = iVar4;
  }
  return;
}



/******************************************************************************/
/* TARGET 00404d90  FUN_00404d90 */
/******************************************************************************/

void __fastcall FUN_00404d90(int *param_1)

{
  ushort uVar1;
  int iVar2;
  int *piVar3;
  undefined4 *puVar4;
  int *piVar5;
  undefined4 local_70;
  int local_6c;
  undefined2 local_68;
  short local_66;
  undefined2 uStack_64;
  undefined2 uStack_62;
  int local_60;
  ushort local_5c;
  ushort uStack_5a;
  undefined2 local_58;
  int local_54 [4];
  int local_44;
  int *local_38;
  int local_34;
  undefined4 uStack_30;
  
  if (*(int *)(*param_1 + 0xc) != 1) {
    local_68 = 1;
    local_66 = 2;
    uStack_64 = 0x5622;
    uStack_62 = 0;
    uStack_5a = 0x10;
    local_58 = 0;
    acmFormatSuggest(0,*(undefined4 *)(*param_1 + 0x1c),&local_68,0x12,0x90000);
    if (local_66 != 2) {
      local_66 = 1;
    }
    if (uStack_5a != 8) {
      uStack_5a = 0x10;
    }
    uVar1 = (uStack_5a >> 3) * local_66;
    _local_5c = CONCAT22(uStack_5a,uVar1);
    local_60 = (uint)uVar1 * CONCAT22(uStack_62,uStack_64);
    iVar2 = acmStreamOpen(&local_70,0,*(undefined4 *)(*param_1 + 0x1c),&local_68,0,0,0,4);
    if (iVar2 == 0) {
      iVar2 = *param_1;
      local_6c = (*(int *)(iVar2 + 4) - *(int *)(iVar2 + 0x18)) * 4;
      acmStreamSize(local_70,*(int *)(iVar2 + 4) - *(int *)(iVar2 + 0x18),&local_6c,0);
      piVar3 = FUN_0040d3a0(local_6c);
      piVar5 = local_54;
      for (iVar2 = 0x15; iVar2 != 0; iVar2 = iVar2 + -1) {
        *piVar5 = 0;
        piVar5 = piVar5 + 1;
      }
      iVar2 = *param_1;
      local_54[0] = 0x54;
      local_54[3] = *(int *)(iVar2 + 0x1c) + *(int *)(iVar2 + 0x18);
      local_44 = *(int *)(iVar2 + 4) - *(int *)(iVar2 + 0x18);
      local_34 = local_6c;
      local_38 = piVar3;
      acmStreamPrepareHeader(local_70,local_54,0);
      iVar2 = acmStreamConvert(local_70,local_54,0);
      acmStreamUnprepareHeader(local_70,local_54,0);
      acmStreamClose(local_70,0);
      if (iVar2 == 0) {
        iVar2 = *(int *)*param_1 + -1;
        *(int *)*param_1 = iVar2;
        if (iVar2 == 0) {
          piVar5 = *(int **)(*param_1 + 0x14);
          if (piVar5 != (int *)0x0) {
            (**(code **)(*piVar5 + 0x48))(piVar5);
            (**(code **)(**(int **)(*param_1 + 0x14) + 8))(*(int **)(*param_1 + 0x14));
          }
          FUN_0040d410(*(int **)(*param_1 + 0x1c));
          FUN_0040d410((int *)*param_1);
        }
        puVar4 = FUN_0040d3a0(0x20);
        *param_1 = (int)puVar4;
        *puVar4 = 1;
        *(undefined4 *)(*param_1 + 4) = uStack_30;
        *(uint *)(*param_1 + 8) = CONCAT22(uStack_62,uStack_64);
        *(undefined4 *)(*param_1 + 0xc) = 1;
        *(short *)(*param_1 + 0x10) = local_66;
        *(ushort *)(*param_1 + 0x12) = uStack_5a;
        *(undefined4 *)(*param_1 + 0x18) = 0;
        *(undefined4 *)(*param_1 + 0x14) = 0;
        *(int **)(*param_1 + 0x1c) = piVar3;
        return;
      }
      FUN_0040d410(piVar3);
    }
  }
  return;
}



/******************************************************************************/
/* TARGET 00404fb0  FUN_00404fb0 */
/******************************************************************************/

void __fastcall FUN_00404fb0(int *param_1,int param_2)

{
  int iVar1;
  
  FUN_00404d90(param_1);
  iVar1 = *(int *)(*param_1 + 8);
  if (param_2 < 10) {
    param_2 = 10;
  }
  else if (1000000 < param_2) {
    param_2 = 1000000;
  }
  if ((iVar1 != param_2) && (*(int *)(*param_1 + 0xc) == 1)) {
    FUN_00405020(param_1,(double)iVar1 / (double)param_2);
    *(int *)(*param_1 + 8) = param_2;
  }
  return;
}



/******************************************************************************/
/* TARGET 00405020  FUN_00405020 */
/******************************************************************************/

void __thiscall FUN_00405020(void *this,double param_1)

{
  byte *pbVar1;
  short sVar2;
  short sVar3;
  int iVar4;
  int iVar5;
  int iVar6;
  double dVar7;
  uint uVar8;
  int iVar9;
  uint uVar10;
  short *psVar11;
  uint uVar12;
  int local_2c;
  short *local_28;
  short *local_24;
  int local_20;
  
  FUN_00404d90(this);
  if (param_1 < 0.0) {
    FUN_00404ce0(this);
    param_1 = -param_1;
  }
  iVar4 = *(int *)this;
  if ((*(int *)(iVar4 + 0xc) == 1) && (param_1 != 1.0)) {
    if (1e-05 <= param_1) {
      if (100000.0 < param_1) {
        param_1 = 100000.0;
      }
    }
    else {
      param_1 = 1e-05;
    }
    uVar10 = *(uint *)(iVar4 + 4);
    sVar2 = *(short *)(iVar4 + 0x12);
    sVar3 = *(short *)(iVar4 + 0x10);
    uVar8 = FUN_0040a250((double)(int)uVar10 / param_1);
    local_24 = (short *)(uVar8 & -((int)((int)sVar2 + ((int)sVar2 >> 0x1f & 7U)) >> 3) * (int)sVar3)
    ;
    if (0 < (int)uVar10) {
      FUN_00404880(this,(int)local_24);
      iVar5 = *(int *)this;
      *(undefined4 *)(iVar5 + 8) = *(undefined4 *)(iVar4 + 8);
      *(undefined4 *)(iVar5 + 0xc) = *(undefined4 *)(iVar4 + 0xc);
      *(undefined2 *)(iVar5 + 0x10) = *(undefined2 *)(iVar4 + 0x10);
      *(undefined4 *)(iVar5 + 0x14) = 0;
      *(undefined4 *)(iVar5 + 0x18) = 0;
      local_2c = 0;
      local_28 = *(short **)(iVar5 + 0x1c);
      *(undefined2 *)(iVar5 + 0x12) = *(undefined2 *)(iVar4 + 0x12);
      iVar6 = *(int *)(iVar4 + 0x1c);
      if (*(short *)(iVar4 + 0x12) == 8) {
        if (*(short *)(iVar4 + 0x10) == 1) {
          if (0 < (int)local_24) {
            do {
              uVar8 = FUN_0040a2d0((double)local_2c * param_1);
              if (uVar10 <= uVar8) {
                uVar8 = uVar10 - 1;
              }
              uVar12 = uVar8 + 1;
              if (uVar10 <= uVar12) {
                uVar12 = uVar10 - 1;
              }
              iVar9 = FUN_0040a250(((double)local_2c * param_1 - (double)(int)uVar8) *
                                   (double)(int)((uint)*(byte *)(uVar12 + iVar6) -
                                                (uint)*(byte *)(uVar8 + iVar6)));
              *(char *)((int)local_28 + local_2c) = (char)iVar9 + *(char *)(uVar8 + iVar6);
              local_2c = local_2c + 1;
              local_24 = (short *)((int)local_24 - 1);
            } while (local_24 != (short *)0x0);
          }
        }
        else {
          uVar10 = (int)uVar10 / 2;
          local_20 = (int)local_24 / 2;
          if (0 < local_20) {
            do {
              uVar8 = FUN_0040a2d0((double)local_2c * param_1);
              if (uVar10 <= uVar8) {
                uVar8 = uVar10 - 1;
              }
              uVar12 = uVar8 + 1;
              if (uVar10 <= uVar12) {
                uVar12 = uVar10 - 1;
              }
              dVar7 = (double)local_2c * param_1 - (double)(int)uVar8;
              iVar9 = FUN_0040a250((double)(int)((uint)*(byte *)(iVar6 + uVar12 * 2) -
                                                (uint)*(byte *)(iVar6 + uVar8 * 2)) * dVar7);
              pbVar1 = (byte *)(iVar6 + 1 + uVar8 * 2);
              *(char *)local_28 = (char)iVar9 + *(char *)(iVar6 + uVar8 * 2);
              iVar9 = FUN_0040a250((double)(int)((uint)*(byte *)(iVar6 + 1 + uVar12 * 2) -
                                                (uint)*pbVar1) * dVar7);
              *(byte *)((int)local_28 + 1) = (char)iVar9 + *pbVar1;
              local_28 = local_28 + 1;
              local_2c = local_2c + 1;
              local_20 = local_20 + -1;
            } while (local_20 != 0);
          }
        }
      }
      else if (*(short *)(iVar4 + 0x10) == 1) {
        uVar10 = (int)uVar10 / 2;
        psVar11 = (short *)((int)local_24 / 2);
        local_24 = local_28;
        if (0 < (int)psVar11) {
          do {
            local_28 = psVar11;
            uVar8 = FUN_0040a2d0((double)local_2c * param_1);
            if (uVar10 <= uVar8) {
              uVar8 = uVar10 - 1;
            }
            uVar12 = uVar8 + 1;
            if (uVar10 <= uVar12) {
              uVar12 = uVar10 - 1;
            }
            iVar9 = FUN_0040a250(((double)local_2c * param_1 - (double)(int)uVar8) *
                                 (double)((int)*(short *)(iVar6 + uVar12 * 2) -
                                         (int)*(short *)(iVar6 + uVar8 * 2)));
            local_2c = local_2c + 1;
            *local_24 = (short)iVar9 + *(short *)(iVar6 + uVar8 * 2);
            local_24 = local_24 + 1;
            psVar11 = (short *)((int)local_28 + -1);
          } while ((int)local_28 + -1 != 0);
        }
      }
      else {
        uVar10 = (int)(uVar10 + ((int)uVar10 >> 0x1f & 3U)) >> 2;
        local_24 = (short *)((int)((int)local_24 + ((int)local_24 >> 0x1f & 3U)) >> 2);
        if (0 < (int)local_24) {
          do {
            uVar8 = FUN_0040a2d0((double)local_2c * param_1);
            if (uVar10 <= uVar8) {
              uVar8 = uVar10 - 1;
            }
            uVar12 = uVar8 + 1;
            if (uVar10 <= uVar12) {
              uVar12 = uVar10 - 1;
            }
            dVar7 = (double)local_2c * param_1 - (double)(int)uVar8;
            iVar9 = FUN_0040a250((double)((int)*(short *)(iVar6 + uVar12 * 4) -
                                         (int)*(short *)(iVar6 + uVar8 * 4)) * dVar7);
            psVar11 = (short *)(iVar6 + 2 + uVar8 * 4);
            *local_28 = (short)iVar9 + *(short *)(iVar6 + uVar8 * 4);
            iVar9 = FUN_0040a250((double)((int)*(short *)(iVar6 + 2 + uVar12 * 4) - (int)*psVar11) *
                                 dVar7);
            local_2c = local_2c + 1;
            local_28[1] = (short)iVar9 + *psVar11;
            local_28 = local_28 + 2;
            local_24 = (short *)((int)local_24 + -1);
          } while (local_24 != (short *)0x0);
        }
      }
      *(int *)this = iVar4;
      FUN_00404840(this);
      *(int *)this = iVar5;
    }
  }
  return;
}



/******************************************************************************/
/* TARGET 004054d0  FUN_004054d0 */
/******************************************************************************/

void __thiscall FUN_004054d0(void *this,int param_1)

{
  int iVar1;
  uint uVar2;
  uint uVar3;
  int iVar4;
  undefined4 *puVar5;
  undefined4 *puVar6;
  
  FUN_00404d90(this);
  FUN_00404d90(&param_1);
  if ((*(int *)(*(int *)this + 0xc) == 1) && (*(int *)(param_1 + 0xc) == 1)) {
    if (*(short *)(param_1 + 0x12) == 0x10) {
      FUN_00404aa0(this);
    }
    if (*(short *)(*(int *)this + 0x12) == 0x10) {
      FUN_00404aa0(&param_1);
    }
    if (*(short *)(param_1 + 0x10) == 2) {
      FUN_00404b30(this);
    }
    if (*(short *)(*(int *)this + 0x10) == 2) {
      FUN_00404b30(&param_1);
    }
    iVar4 = *(int *)(param_1 + 8);
    iVar1 = *(int *)(*(int *)this + 8);
    if (iVar1 != iVar4) {
      if (iVar4 < iVar1) {
        iVar4 = iVar1;
      }
      if (iVar4 < 0x2b2b) {
        iVar4 = 0x2b11;
      }
      else {
        iVar4 = ((0x5654 < iVar4) - 1 & 0xffffa9de) + 0xac44;
      }
      FUN_00404fb0(&param_1,iVar4);
      FUN_00404fb0(this,iVar4);
    }
    iVar4 = *(int *)this;
    *(uint *)(iVar4 + 4) =
         *(uint *)(iVar4 + 4) &
         -((int)((int)*(short *)(iVar4 + 0x12) + ((int)*(short *)(iVar4 + 0x12) >> 0x1f & 7U)) >> 3)
         * (int)*(short *)(iVar4 + 0x10);
    iVar4 = *(int *)(*(int *)this + 4);
    uVar3 = *(uint *)(param_1 + 4);
    FUN_004049d0(this,uVar3 + iVar4);
    puVar5 = *(undefined4 **)(param_1 + 0x1c);
    puVar6 = (undefined4 *)(*(int *)(*(int *)this + 0x1c) + iVar4);
    for (uVar2 = uVar3 >> 2; uVar2 != 0; uVar2 = uVar2 - 1) {
      *puVar6 = *puVar5;
      puVar5 = puVar5 + 1;
      puVar6 = puVar6 + 1;
    }
    for (uVar3 = uVar3 & 3; uVar3 != 0; uVar3 = uVar3 - 1) {
      *(undefined1 *)puVar6 = *(undefined1 *)puVar5;
      puVar5 = (undefined4 *)((int)puVar5 + 1);
      puVar6 = (undefined4 *)((int)puVar6 + 1);
    }
    FUN_00404840(&param_1);
    return;
  }
  FUN_00404840(&param_1);
  return;
}



/******************************************************************************/
/* TARGET 00405610  FUN_00405610 */
/******************************************************************************/

void __thiscall FUN_00405610(void *this,double param_1,double param_2)

{
  int iVar1;
  int iVar2;
  undefined2 *puVar3;
  float10 fVar4;
  int local_14;
  
  if (0.0 <= param_2) {
    if (3600.0 < param_2) {
      param_2 = 3600.0;
    }
  }
  else {
    param_2 = 0.0;
  }
  param_1 = ABS(param_1);
  if (1.0 <= param_1) {
    if (11025.0 < param_1) {
      param_1 = 11025.0;
    }
  }
  else {
    param_1 = 1.0;
  }
  local_14 = FUN_0040a250(param_1 * param_2);
  if (local_14 < 1) {
    local_14 = 1;
  }
  iVar1 = FUN_0040a250(((double)local_14 / param_1) * 22050.0);
  FUN_004049b0(this,iVar1 * 2);
  *(undefined2 *)(*(int *)this + 0x12) = 0x10;
  *(undefined4 *)(*(int *)this + 8) = 0x5622;
  puVar3 = *(undefined2 **)(*(int *)this + 0x1c);
  for (; 0 < iVar1; iVar1 = iVar1 + -1) {
    fVar4 = (float10)fsin((float10)iVar1 *
                          (float10)(param_1 * 3.141592653589793 * 9.070294784580499e-05));
    iVar2 = FUN_0040a250((double)(fVar4 * (float10)32767.0));
    *puVar3 = (short)iVar2;
    puVar3 = puVar3 + 1;
  }
  return;
}



/******************************************************************************/
/* TARGET 00405750  FUN_00405750 */
/******************************************************************************/

int * __thiscall FUN_00405750(void *this,int *param_1)

{
  int *piVar1;
  int iVar2;
  
  iVar2 = **(int **)this + -1;
  **(int **)this = iVar2;
  if (iVar2 == 0) {
    piVar1 = *(int **)(*(int *)this + 0x14);
    if (piVar1 != (int *)0x0) {
      (**(code **)(*piVar1 + 0x48))(piVar1);
      (**(code **)(**(int **)(*(int *)this + 0x14) + 8))(*(int **)(*(int *)this + 0x14));
    }
    FUN_0040d410(*(int **)(*(int *)this + 0x1c));
    FUN_0040d410(*(int **)this);
  }
  piVar1 = (int *)*param_1;
  *(int **)this = piVar1;
  *piVar1 = *piVar1 + 1;
  return this;
}



/******************************************************************************/
/* TARGET 004057b0  FUN_004057b0 */
/******************************************************************************/

void __fastcall FUN_004057b0(int *param_1)

{
  int *piVar1;
  
  FUN_004057d0(param_1,param_1[1]);
  piVar1 = FUN_0040d470((int *)*param_1,0);
  *param_1 = (int)piVar1;
  param_1[2] = 0;
  return;
}



/******************************************************************************/
/* TARGET 004057d0  FUN_004057d0 */
/******************************************************************************/

void __fastcall FUN_004057d0(int *param_1,int param_2)

{
  int iVar1;
  int *piVar2;
  
  iVar1 = param_1[1];
  if (iVar1 < param_2) {
    param_2 = iVar1;
  }
  piVar2 = (int *)(*param_1 + -4 + iVar1 * 4);
  param_1[1] = iVar1 - param_2;
  if (0 < param_2) {
    do {
      FUN_00404840(piVar2);
      piVar2 = piVar2 + -1;
      param_2 = param_2 + -1;
    } while (param_2 != 0);
  }
  return;
}



/******************************************************************************/
/* TARGET 00405800  FUN_00405800 */
/******************************************************************************/

int __fastcall FUN_00405800(int *param_1,uint param_2)

{
  int iVar1;
  
  iVar1 = param_1[1];
  if (param_1[2] <= iVar1) {
    FUN_00401850(param_1);
  }
  param_1[1] = iVar1 + 1U;
  if (param_2 < iVar1 + 1U) {
    FUN_00401090((void *)(*param_1 + iVar1 * 4),*(int **)(*param_1 + param_2 * 4));
    return iVar1;
  }
  FUN_00404820((undefined4 *)(*param_1 + iVar1 * 4));
  return iVar1;
}



/******************************************************************************/
/* TARGET 00405850  FUN_00405850 */
/******************************************************************************/

int __fastcall FUN_00405850(int *param_1,uint param_2,int param_3)

{
  int iVar1;
  int *piVar2;
  int iVar3;
  int iVar4;
  
  iVar1 = param_1[1];
  if (param_1[2] <= iVar1) {
    FUN_00401850(param_1);
  }
  param_1[1] = iVar1 + 1U;
  if (param_2 < iVar1 + 1U) {
    piVar2 = *(int **)(*param_1 + param_2 * 4);
    FUN_00401090((void *)(*param_1 + iVar1 * 4),piVar2);
    param_3 = param_3 + -1;
    if (0 < param_3) {
      do {
        iVar4 = param_1[1];
        if (param_1[2] <= iVar4) {
          FUN_00401850(param_1);
        }
        param_1[1] = iVar4 + 1;
        FUN_00401090((void *)(*param_1 + iVar4 * 4),piVar2);
        param_3 = param_3 + -1;
      } while (param_3 != 0);
      return iVar1;
    }
  }
  else {
    FUN_00404820((undefined4 *)(*param_1 + iVar1 * 4));
    iVar4 = param_3 + -1;
    if (0 < iVar4) {
      do {
        iVar3 = param_1[1];
        if (param_1[2] <= iVar3) {
          FUN_00401850(param_1);
        }
        param_1[1] = iVar3 + 1;
        FUN_00404820((undefined4 *)(*param_1 + iVar3 * 4));
        iVar4 = iVar4 + -1;
      } while (iVar4 != 0);
    }
  }
  return iVar1;
}



/******************************************************************************/
/* TARGET 00405910  FUN_00405910 */
/******************************************************************************/

undefined4 FUN_00405910(void)

{
  DAT_00436f3c = FUN_0040d3a0(0x24);
  if (DAT_00436f3c == (undefined4 *)0x0) {
    return 0;
  }
  *DAT_00436f3c = 1;
  DAT_00436f3c[1] = 1;
  DAT_00436f3c[2] = 1;
  DAT_00436f3c[3] = 1;
  DAT_00436f3c[4] = 0x37;
  DAT_00436f3c[5] = 1000;
  DAT_00436f3c[6] = 0;
  DAT_00436f3c[7] = 0x40200000;
  FUN_004025d0(DAT_00436f3c + 8);
  return 1;
}



/******************************************************************************/
/* TARGET 004059a0  FUN_004059a0 */
/******************************************************************************/

void __fastcall FUN_004059a0(undefined4 *param_1)

{
  int *piVar1;
  
  param_1[8] = 0;
  param_1[10] = 0;
  param_1[0xc] = 0;
  param_1[0xe] = 0;
  param_1[0x10] = 0;
  param_1[0x12] = 0;
  param_1[0x14] = 0;
  param_1[0x18] = 0;
  *(undefined1 *)(param_1 + 1) = 0;
  *(undefined1 *)((int)param_1 + 5) = 0;
  *(undefined1 *)((int)param_1 + 6) = 0;
  param_1[2] = 0;
  param_1[3] = 0;
  param_1[4] = 0;
  param_1[5] = 0;
  param_1[6] = 0;
  param_1[7] = 0;
  param_1[9] = 0;
  param_1[0xb] = 0;
  param_1[0xd] = 0;
  param_1[0xf] = 0;
  param_1[0x11] = 0;
  param_1[0x13] = 0;
  param_1[0x15] = 0;
  param_1[0x16] = 0xffffffff;
  param_1[0x19] = 0xbff00000;
  piVar1 = DAT_00436f3c;
  *param_1 = DAT_00436f3c;
  *piVar1 = *piVar1 + 1;
  return;
}



/******************************************************************************/
/* TARGET 00405a10  FUN_00405a10 */
/******************************************************************************/

undefined4 * __thiscall FUN_00405a10(void *this,int param_1,int param_2)

{
  undefined4 *puVar1;
  int iVar2;
  int local_10;
  undefined4 *local_c;
  
  *(undefined4 *)((int)this + 0x20) = 0;
  *(undefined4 *)((int)this + 0x28) = 0;
  *(undefined4 *)((int)this + 0x30) = 0;
  *(undefined4 *)((int)this + 0x38) = 0;
  *(undefined4 *)((int)this + 0x40) = 0;
  *(undefined4 *)((int)this + 0x48) = 0;
  *(undefined4 *)((int)this + 0x50) = 0;
  *(undefined4 *)((int)this + 0x60) = 0;
  *(undefined1 *)((int)this + 4) = 0;
  *(undefined1 *)((int)this + 5) = 0;
  *(undefined1 *)((int)this + 6) = 0;
  *(undefined4 *)((int)this + 8) = 0;
  *(undefined4 *)((int)this + 0xc) = 0;
  *(undefined4 *)((int)this + 0x10) = 0;
  *(undefined4 *)((int)this + 0x14) = 0;
  *(undefined4 *)((int)this + 0x18) = 0;
  *(undefined4 *)((int)this + 0x1c) = 0;
  *(undefined4 *)((int)this + 0x24) = 0;
  *(undefined4 *)((int)this + 0x2c) = 0;
  *(undefined4 *)((int)this + 0x34) = 0;
  *(undefined4 *)((int)this + 0x3c) = 0;
  *(undefined4 *)((int)this + 0x44) = 0;
  *(undefined4 *)((int)this + 0x4c) = 0;
  *(undefined4 *)((int)this + 0x54) = 0;
  *(undefined4 *)((int)this + 0x58) = 0xffffffff;
  *(undefined4 *)((int)this + 100) = 0xbff00000;
  local_c = (undefined4 *)param_2;
  local_10 = param_1;
  if (param_1 < 1) {
    local_10 = 1;
  }
  if (param_2 < 1) {
    local_c = (undefined4 *)0x1;
  }
  iVar2 = local_10 * (int)local_c;
  puVar1 = FUN_0040d3a0(iVar2 * 4 + 0x20);
  puVar1[6] = 0;
  *puVar1 = 1;
  puVar1[1] = local_10;
  puVar1[2] = local_c;
  puVar1[3] = 1;
  puVar1[4] = 0x37;
  puVar1[5] = 1000;
  puVar1[7] = 0x40200000;
  *(undefined4 **)this = puVar1;
  local_c = puVar1 + 8;
  if (0 < iVar2) {
    do {
      FUN_004025d0(local_c);
      local_c = local_c + 1;
      iVar2 = iVar2 + -1;
    } while (iVar2 != 0);
  }
  return this;
}



/******************************************************************************/
/* TARGET 00405b20  FUN_00405b20 */
/******************************************************************************/

void __fastcall FUN_00405b20(undefined4 *param_1)

{
  int *piVar1;
  
  param_1[0x16] = 0xffffffff;
  param_1[8] = 0;
  param_1[10] = 0;
  param_1[0xc] = 0;
  param_1[0xe] = 0;
  param_1[0x10] = 0;
  param_1[0x12] = 0;
  param_1[0x14] = 0;
  param_1[0x18] = 0;
  *(undefined1 *)(param_1 + 1) = 0;
  *(undefined1 *)((int)param_1 + 5) = 0;
  *(undefined1 *)((int)param_1 + 6) = 0;
  param_1[2] = 0;
  param_1[3] = 0;
  param_1[4] = 0;
  param_1[5] = 0;
  param_1[6] = 0;
  param_1[7] = 0;
  param_1[9] = 0;
  param_1[0xb] = 0;
  param_1[0xd] = 0;
  param_1[0xf] = 0;
  param_1[0x11] = 0;
  param_1[0x13] = 0;
  param_1[0x15] = 0;
  param_1[0x19] = 0xbff00000;
  piVar1 = DAT_00436f3c;
  *param_1 = DAT_00436f3c;
  *piVar1 = *piVar1 + 1;
  return;
}



/******************************************************************************/
/* TARGET 00405b90  FUN_00405b90 */
/******************************************************************************/

void __thiscall FUN_00405b90(void *this,int *param_1)

{
  *(undefined4 *)((int)this + 0x58) = 0xffffffff;
  *(undefined4 *)((int)this + 0x20) = 0;
  *(undefined4 *)((int)this + 0x28) = 0;
  *(undefined4 *)((int)this + 0x30) = 0;
  *(undefined4 *)((int)this + 0x38) = 0;
  *(undefined4 *)((int)this + 0x40) = 0;
  *(undefined4 *)((int)this + 0x48) = 0;
  *(undefined4 *)((int)this + 0x50) = 0;
  *(undefined1 *)((int)this + 4) = 0;
  *(undefined1 *)((int)this + 5) = 0;
  *(undefined1 *)((int)this + 6) = 0;
  *(undefined4 *)((int)this + 8) = 0;
  *(undefined4 *)((int)this + 0xc) = 0;
  *(undefined4 *)((int)this + 0x10) = 0;
  *(undefined4 *)((int)this + 0x14) = 0;
  *(undefined4 *)((int)this + 0x18) = 0;
  *(undefined4 *)((int)this + 0x1c) = 0;
  *(undefined4 *)((int)this + 0x24) = 0;
  *(undefined4 *)((int)this + 0x2c) = 0;
  *(undefined4 *)((int)this + 0x34) = 0;
  *(undefined4 *)((int)this + 0x3c) = 0;
  *(undefined4 *)((int)this + 0x44) = 0;
  *(undefined4 *)((int)this + 0x4c) = 0;
  *(undefined4 *)((int)this + 0x54) = 0;
  *(undefined4 *)((int)this + 0x60) = 0;
  *(undefined4 *)((int)this + 100) = 0xbff00000;
  *(int **)this = param_1;
  *param_1 = *param_1 + 1;
  return;
}



/******************************************************************************/
/* TARGET 00405c00  FUN_00405c00 */
/******************************************************************************/

void __fastcall FUN_00405c00(int *param_1)

{
  int iVar1;
  int *piVar2;
  
  iVar1 = *(int *)*param_1 + -1;
  *(int *)*param_1 = iVar1;
  if (iVar1 == 0) {
    iVar1 = *param_1;
    piVar2 = (int *)(iVar1 + 0x20);
    iVar1 = *(int *)(iVar1 + 8) * *(int *)(iVar1 + 4);
    if (0 < iVar1) {
      do {
        thunk_FUN_00402520(piVar2);
        piVar2 = piVar2 + 1;
        iVar1 = iVar1 + -1;
      } while (iVar1 != 0);
    }
    FUN_0040d410((int *)*param_1);
  }
  return;
}



/******************************************************************************/
/* TARGET 00405c40  FUN_00405c40 */
/******************************************************************************/

void __thiscall FUN_00405c40(void *this,int param_1,int param_2)

{
  undefined4 *puVar1;
  int iVar2;
  int *piVar3;
  
  iVar2 = **(int **)this + -1;
  **(int **)this = iVar2;
  if (iVar2 == 0) {
    iVar2 = *(int *)this;
    piVar3 = (int *)(iVar2 + 0x20);
    iVar2 = *(int *)(iVar2 + 8) * *(int *)(iVar2 + 4);
    if (0 < iVar2) {
      do {
        thunk_FUN_00402520(piVar3);
        piVar3 = piVar3 + 1;
        iVar2 = iVar2 + -1;
      } while (iVar2 != 0);
    }
    FUN_0040d410(*(int **)this);
  }
  if (param_1 < 1) {
    param_1 = 1;
  }
  if (param_2 < 1) {
    param_2 = 1;
  }
  iVar2 = param_1 * param_2;
  puVar1 = FUN_0040d3a0(iVar2 * 4 + 0x20);
  puVar1[6] = 0;
  *puVar1 = 1;
  puVar1[1] = param_1;
  puVar1[2] = param_2;
  puVar1[3] = 1;
  puVar1[4] = 0x37;
  puVar1[5] = 1000;
  puVar1[7] = 0x40200000;
  *(undefined4 **)this = puVar1;
  puVar1 = puVar1 + 8;
  if (0 < iVar2) {
    do {
      FUN_004025d0(puVar1);
      puVar1 = puVar1 + 1;
      iVar2 = iVar2 + -1;
    } while (iVar2 != 0);
  }
  return;
}



/******************************************************************************/
/* TARGET 00405cf0  FUN_00405cf0 */
/******************************************************************************/

int __fastcall FUN_00405cf0(int *param_1)

{
  int *piVar1;
  
  piVar1 = (int *)(*param_1 + 0x20 + (*(int *)(*param_1 + 4) * param_1[7] + param_1[6]) * 4);
  FUN_00402700(piVar1);
  return *piVar1;
}



/******************************************************************************/
/* TARGET 00405d10  FUN_00405d10 */
/******************************************************************************/

void __fastcall FUN_00405d10(int *param_1)

{
  int iVar1;
  int *piVar2;
  
  iVar1 = *(int *)*param_1 + -1;
  *(int *)*param_1 = iVar1;
  if (iVar1 == 0) {
    iVar1 = *param_1;
    piVar2 = (int *)(iVar1 + 0x20);
    iVar1 = *(int *)(iVar1 + 8) * *(int *)(iVar1 + 4);
    if (0 < iVar1) {
      do {
        thunk_FUN_00402520(piVar2);
        piVar2 = piVar2 + 1;
        iVar1 = iVar1 + -1;
      } while (iVar1 != 0);
    }
    FUN_0040d410((int *)*param_1);
  }
  piVar2 = DAT_00436f3c;
  *param_1 = (int)DAT_00436f3c;
  *piVar2 = *piVar2 + 1;
  return;
}



/******************************************************************************/
/* TARGET 00405d60  FUN_00405d60 */
/******************************************************************************/

void __fastcall FUN_00405d60(int *param_1)

{
  uint uVar1;
  uint uVar2;
  int *piVar3;
  byte *pbVar4;
  int iVar5;
  DWORD DVar6;
  byte *local_54;
  DWORD local_4c;
  int local_48;
  undefined4 local_44;
  int *local_40;
  uint local_3c;
  undefined4 local_38;
  undefined4 local_34;
  undefined4 local_30;
  char local_2c;
  char local_2b;
  char local_2a;
  char local_29;
  int local_28;
  int local_24;
  int local_20;
  ushort local_1c;
  ushort uStack_1a;
  undefined2 local_18;
  short sStack_16;
  int *local_14;
  undefined4 local_10;
  undefined4 uStack_c;
  short local_8;
  short local_6;
  
  local_38 = DAT_004377a8;
  local_8 = 0;
  FUN_004181b0((undefined4 *)&local_2c,0x28);
  local_44 = CONCAT22(sStack_16,local_18);
  local_40 = local_14;
  local_34 = local_10;
  local_30 = uStack_c;
  local_4c = (DWORD)local_6;
  iVar5 = (int)local_8;
  uVar1 = (uint)local_1c;
  uVar2 = (uint)uStack_1a;
  local_48 = local_20;
  if ((((((local_2c == 'P') && (local_2b == 'S')) && (local_2a == 'P')) &&
       (((local_29 == 'R' && (0 < local_28)) &&
        ((local_28 < 0x801 && ((0 < local_24 && (local_24 < 0x401)))))))) &&
      ((0 < local_20 &&
       ((((((local_20 < 0x401 && (local_20 <= local_28)) && (local_28 - local_20 < 0x401)) &&
          ((local_1c != 0 && (uVar1 < 0x8001)))) &&
         ((uStack_1a != 0 && ((uVar2 < 0x8001 && (-1 < sStack_16)))))) &&
        (CONCAT22(sStack_16,local_18) < 0x36ee81)))))) &&
     ((((0.0 <= (double)CONCAT44(uStack_c,local_10) &&
        ((double)CONCAT44(uStack_c,local_10) <= 1000000.0)) && (9 < iVar5)) &&
      ((iVar5 < 0x101 && ((int)local_4c < 2)))))) {
    local_3c = uVar2;
    piVar3 = FUN_0040d3a0(iVar5 * 4 + 0xf4);
    piVar3[8] = iVar5;
    *(undefined2 *)((int)piVar3 + 0xe) = 8;
    FUN_004181b0(piVar3 + 10,iVar5 << 2);
    piVar3[10] = *(int *)(DAT_00437118 + 0x28);
    if (0xdf < iVar5) {
      piVar3[0xb] = *(int *)(DAT_00437118 + 0x2c);
    }
    FUN_00409da0((int)piVar3);
    FUN_0040d410(piVar3);
    FUN_00405c40(param_1,local_28,local_24);
    DVar6 = uVar2 * uVar1 * local_24 * local_28;
    *(int *)(*param_1 + 0xc) = local_48;
    *(undefined4 *)(*param_1 + 0x10) = local_44;
    *(int **)(*param_1 + 0x14) = local_40;
    iVar5 = *param_1;
    *(undefined4 *)(iVar5 + 0x18) = local_34;
    *(undefined4 *)(iVar5 + 0x1c) = local_30;
    pbVar4 = FUN_0040d3a0(DVar6);
    if (local_4c == 1) {
      FUN_004181b0(&local_4c,4);
      local_40 = FUN_0040d3a0(local_4c);
      FUN_004181b0(local_40,local_4c);
      piVar3 = local_40;
      FUN_00408a50(pbVar4,(undefined1 *)local_40,DVar6,uVar1);
      FUN_0040d410(piVar3);
    }
    else {
      FUN_004181b0((undefined4 *)pbVar4,DVar6);
    }
    if (0 < local_24 * local_28) {
      iVar5 = 0x20;
      local_54 = pbVar4;
      local_4c = local_24 * local_28;
      do {
        FUN_004026a0((void *)(iVar5 + *param_1),uVar1,local_3c);
        FUN_004040e0((void *)(iVar5 + *param_1),local_54);
        iVar5 = iVar5 + 4;
        local_54 = local_54 + uVar2 * uVar1;
        local_4c = local_4c - 1;
      } while (local_4c != 0);
    }
    FUN_0040d410((int *)pbVar4);
    return;
  }
  DAT_004377a8 = local_38;
  DAT_00437798 = 1;
  return;
}



/******************************************************************************/
/* TARGET 00406090  FUN_00406090 */
/******************************************************************************/

void __fastcall FUN_00406090(int *param_1)

{
  int iVar1;
  int iVar2;
  int iVar3;
  int *piVar4;
  int *piVar5;
  int iVar6;
  uint uVar7;
  int *piVar8;
  uint uVar9;
  int *piVar10;
  int *local_1c;
  int local_18;
  int local_10;
  
  iVar6 = *param_1;
  iVar1 = *(int *)(*(int *)(iVar6 + 0x20) + 8);
  iVar2 = *(int *)(*(int *)(iVar6 + 0x20) + 0xc);
  local_10 = *(int *)(iVar6 + 8) * *(int *)(iVar6 + 4);
  iVar3 = local_10 * iVar2 * iVar1;
  piVar4 = FUN_0040d3a0((iVar3 * 3) / 2 + 0x3ac);
  *(undefined1 *)piVar4 = 0x50;
  *(undefined1 *)((int)piVar4 + 1) = 0x53;
  *(undefined1 *)((int)piVar4 + 2) = 0x50;
  *(undefined1 *)((int)piVar4 + 3) = 0x52;
  piVar4[1] = *(int *)(*param_1 + 4);
  piVar4[2] = *(int *)(*param_1 + 8);
  iVar6 = *(int *)(*param_1 + 0xc);
  *(short *)(piVar4 + 4) = (short)iVar1;
  piVar4[3] = iVar6;
  *(short *)((int)piVar4 + 0x12) = (short)iVar2;
  piVar4[5] = *(int *)(*param_1 + 0x10);
  piVar4[6] = *(int *)(*param_1 + 0x14);
  iVar6 = *param_1;
  piVar4[7] = *(int *)(iVar6 + 0x18);
  piVar4[8] = *(int *)(iVar6 + 0x1c);
  *(undefined2 *)(piVar4 + 9) = 0xe0;
  *(undefined2 *)((int)piVar4 + 0x26) = 1;
  piVar5 = (int *)(DAT_00437118 + 0x28);
  piVar8 = piVar4 + 10;
  for (iVar6 = 0xe0; iVar6 != 0; iVar6 = iVar6 + -1) {
    *piVar8 = *piVar5;
    piVar5 = piVar5 + 1;
    piVar8 = piVar8 + 1;
  }
  piVar5 = FUN_0040d3a0(iVar3);
  if (0 < local_10) {
    uVar9 = iVar2 * iVar1;
    local_18 = 0x20;
    local_1c = piVar5;
    do {
      FUN_00402700((int *)(local_18 + *param_1));
      piVar8 = *(int **)(*(int *)(local_18 + *param_1) + 0x10);
      piVar10 = local_1c;
      for (uVar7 = uVar9 >> 2; uVar7 != 0; uVar7 = uVar7 - 1) {
        *piVar10 = *piVar8;
        piVar8 = piVar8 + 1;
        piVar10 = piVar10 + 1;
      }
      for (uVar7 = uVar9 & 3; uVar7 != 0; uVar7 = uVar7 - 1) {
        *(char *)piVar10 = (char)*piVar8;
        piVar8 = (int *)((int)piVar8 + 1);
        piVar10 = (int *)((int)piVar10 + 1);
      }
      local_1c = (int *)((int)local_1c + uVar9);
      local_18 = local_18 + 4;
      local_10 = local_10 + -1;
    } while (local_10 != 0);
  }
  iVar6 = FUN_00408710((int)(piVar4 + 0xeb),(char *)piVar5,iVar3,iVar1);
  piVar4[0xea] = iVar6;
  FUN_0040d410(piVar5);
  FUN_00417fb0((undefined1 *)piVar4,iVar6 + 0x3ac);
  FUN_0040d410(piVar4);
  return;
}



/******************************************************************************/
/* TARGET 00406220  FUN_00406220 */
/******************************************************************************/

int * __thiscall FUN_00406220(void *this,int *param_1)

{
  int iVar1;
  int *piVar2;
  
  iVar1 = **(int **)this + -1;
  **(int **)this = iVar1;
  if (iVar1 == 0) {
    iVar1 = *(int *)this;
    piVar2 = (int *)(iVar1 + 0x20);
    iVar1 = *(int *)(iVar1 + 8) * *(int *)(iVar1 + 4);
    if (0 < iVar1) {
      do {
        thunk_FUN_00402520(piVar2);
        piVar2 = piVar2 + 1;
        iVar1 = iVar1 + -1;
      } while (iVar1 != 0);
    }
    FUN_0040d410(*(int **)this);
  }
  piVar2 = (int *)*param_1;
  *(int **)this = piVar2;
  *piVar2 = *piVar2 + 1;
  return this;
}



/******************************************************************************/
/* TARGET 00406280  FUN_00406280 */
/******************************************************************************/

void __fastcall FUN_00406280(undefined4 *param_1)

{
  int iVar1;
  int *piVar2;
  
  iVar1 = param_1[2];
  param_1[2] = iVar1 << 1;
  if (iVar1 << 1 == 0) {
    param_1[2] = 0x400;
  }
  piVar2 = FUN_0040d470((int *)*param_1,param_1[2] * 0x68);
  *param_1 = piVar2;
  return;
}



/******************************************************************************/
/* TARGET 004062b0  FUN_004062b0 */
/******************************************************************************/

void __fastcall FUN_004062b0(int *param_1)

{
  int *piVar1;
  
  FUN_004062d0(param_1,param_1[1]);
  piVar1 = FUN_0040d470((int *)*param_1,0);
  *param_1 = (int)piVar1;
  param_1[2] = 0;
  return;
}



/******************************************************************************/
/* TARGET 004062d0  FUN_004062d0 */
/******************************************************************************/

void __fastcall FUN_004062d0(int *param_1,int param_2)

{
  int iVar1;
  int *piVar2;
  
  iVar1 = param_1[1];
  if (iVar1 < param_2) {
    param_2 = iVar1;
  }
  piVar2 = (int *)(*param_1 + -0x68 + iVar1 * 0x68);
  param_1[1] = iVar1 - param_2;
  if (0 < param_2) {
    do {
      FUN_00405c00(piVar2);
      piVar2 = piVar2 + -0x1a;
      param_2 = param_2 + -1;
    } while (param_2 != 0);
  }
  return;
}



/******************************************************************************/
/* TARGET 00406310  FUN_00406310 */
/******************************************************************************/

int __fastcall FUN_00406310(int *param_1)

{
  int iVar1;
  
  iVar1 = param_1[1];
  if (param_1[2] <= iVar1) {
    FUN_00406280(param_1);
  }
  param_1[1] = iVar1 + 1;
  FUN_00405b20((undefined4 *)(*param_1 + iVar1 * 0x68));
  return iVar1;
}



/******************************************************************************/
/* TARGET 00406340  FUN_00406340 */
/******************************************************************************/

int __fastcall FUN_00406340(int *param_1,undefined4 *param_2)

{
  int iVar1;
  
  iVar1 = param_1[1];
  if (param_1[2] <= iVar1) {
    FUN_00406280(param_1);
  }
  param_1[1] = iVar1 + 1;
  FUN_00405b90((void *)(*param_1 + iVar1 * 0x68),(int *)*param_2);
  return iVar1;
}



/******************************************************************************/
/* TARGET 00406380  FUN_00406380 */
/******************************************************************************/

int __fastcall FUN_00406380(int *param_1,uint param_2)

{
  int iVar1;
  
  iVar1 = param_1[1];
  if (param_1[2] <= iVar1) {
    FUN_00406280(param_1);
  }
  param_1[1] = iVar1 + 1U;
  if (param_2 < iVar1 + 1U) {
    FUN_00405b90((void *)(*param_1 + iVar1 * 0x68),*(int **)(*param_1 + param_2 * 0x68));
    return iVar1;
  }
  FUN_00405b20((undefined4 *)(*param_1 + iVar1 * 0x68));
  return iVar1;
}



/******************************************************************************/
/* TARGET 004063e0  FUN_004063e0 */
/******************************************************************************/

int __fastcall FUN_004063e0(int *param_1,uint param_2,int param_3)

{
  int iVar1;
  int *piVar2;
  int iVar3;
  int iVar4;
  
  iVar1 = param_1[1];
  if (param_1[2] <= iVar1) {
    FUN_00406280(param_1);
  }
  param_1[1] = iVar1 + 1U;
  if (param_2 < iVar1 + 1U) {
    piVar2 = *(int **)(*param_1 + param_2 * 0x68);
    FUN_00405b90((void *)(*param_1 + iVar1 * 0x68),piVar2);
    param_3 = param_3 + -1;
    if (0 < param_3) {
      do {
        iVar4 = param_1[1];
        if (param_1[2] <= iVar4) {
          FUN_00406280(param_1);
        }
        param_1[1] = iVar4 + 1;
        FUN_00405b90((void *)(*param_1 + iVar4 * 0x68),piVar2);
        param_3 = param_3 + -1;
      } while (param_3 != 0);
      return iVar1;
    }
  }
  else {
    FUN_00405b20((undefined4 *)(*param_1 + iVar1 * 0x68));
    iVar4 = param_3 + -1;
    if (0 < iVar4) {
      do {
        iVar3 = param_1[1];
        if (param_1[2] <= iVar3) {
          FUN_00406280(param_1);
        }
        param_1[1] = iVar3 + 1;
        FUN_00405b20((undefined4 *)(*param_1 + iVar3 * 0x68));
        iVar4 = iVar4 + -1;
      } while (iVar4 != 0);
    }
  }
  return iVar1;
}



/******************************************************************************/
/* TARGET 004064c0  FUN_004064c0 */
/******************************************************************************/

void __fastcall FUN_004064c0(undefined4 *param_1)

{
  *param_1 = &DAT_00436178;
  DAT_00436178 = DAT_00436178 + 1;
  return;
}



/******************************************************************************/
/* TARGET 004064e0  FUN_004064e0 */
/******************************************************************************/

int * __thiscall FUN_004064e0(void *this,char param_1)

{
  undefined4 *puVar1;
  
  if (param_1 == '\0') {
    FUN_00406ad0(this);
    return this;
  }
  puVar1 = FUN_0040d3a0(0xe);
  *(undefined4 **)this = puVar1;
  *puVar1 = 1;
  puVar1[1] = 1;
  puVar1[2] = 0xffffffff;
  *(undefined1 *)((int)puVar1 + 0xd) = 0;
  *(char *)(*(int *)this + 0xc) = param_1;
  return this;
}



/******************************************************************************/
/* TARGET 00406530  FUN_00406530 */
/******************************************************************************/

int * __thiscall FUN_00406530(void *this,LPCSTR param_1,uint param_2)

{
  uint uVar1;
  undefined4 *puVar2;
  uint uVar3;
  CHAR *pCVar4;
  
  uVar1 = 0;
  if ((param_1 != (LPCSTR)0x0) && (uVar1 = param_2, (int)param_2 < 0)) {
    uVar1 = lstrlenA(param_1);
  }
  uVar3 = uVar1;
  if ((int)uVar1 < 0) {
    uVar3 = 0;
  }
  puVar2 = FUN_0040d3a0(uVar3 + 0xd);
  *(undefined4 **)this = puVar2;
  *puVar2 = 1;
  puVar2[1] = uVar3;
  puVar2[2] = 0xffffffff;
  *(undefined1 *)((int)puVar2 + uVar3 + 0xc) = 0;
  pCVar4 = (CHAR *)(*(int *)this + 0xc);
  for (uVar3 = uVar1 >> 2; uVar3 != 0; uVar3 = uVar3 - 1) {
    *(undefined4 *)pCVar4 = *(undefined4 *)param_1;
    param_1 = param_1 + 4;
    pCVar4 = pCVar4 + 4;
  }
  for (uVar1 = uVar1 & 3; uVar1 != 0; uVar1 = uVar1 - 1) {
    *pCVar4 = *param_1;
    param_1 = param_1 + 1;
    pCVar4 = pCVar4 + 1;
  }
  return this;
}



/******************************************************************************/
/* TARGET 004065a0  FUN_004065a0 */
/******************************************************************************/

int * __thiscall FUN_004065a0(void *this,LPCWSTR param_1,int param_2)

{
  int cchWideChar;
  undefined4 *puVar1;
  int iVar2;
  
  cchWideChar = 0;
  if ((param_1 != (LPCWSTR)0x0) && (cchWideChar = param_2, param_2 < 0)) {
    cchWideChar = lstrlenW(param_1);
  }
  iVar2 = cchWideChar;
  if (cchWideChar < 0) {
    iVar2 = 0;
  }
  puVar1 = FUN_0040d3a0(iVar2 + 0xd);
  *(undefined4 **)this = puVar1;
  *puVar1 = 1;
  puVar1[1] = iVar2;
  puVar1[2] = 0xffffffff;
  *(undefined1 *)((int)puVar1 + iVar2 + 0xc) = 0;
  WideCharToMultiByte(DAT_00437260,0,param_1,cchWideChar,(LPSTR)(*(int *)this + 0xc),cchWideChar + 1
                      ,(LPCSTR)0x0,(LPBOOL)0x0);
  return this;
}



/******************************************************************************/
/* TARGET 00406610  FUN_00406610 */
/******************************************************************************/

void __fastcall FUN_00406610(undefined4 *param_1)

{
  int iVar1;
  
  iVar1 = *(int *)*param_1 + -1;
  *(int *)*param_1 = iVar1;
  if (iVar1 == 0) {
    FUN_0040d410((int *)*param_1);
    return;
  }
  return;
}



/******************************************************************************/
/* TARGET 00406630  FUN_00406630 */
/******************************************************************************/

void __fastcall FUN_00406630(undefined4 *param_1)

{
  *param_1 = &DAT_00436178;
  DAT_00436178 = DAT_00436178 + 1;
  return;
}



/******************************************************************************/
/* TARGET 00406650  FUN_00406650 */
/******************************************************************************/

void __thiscall FUN_00406650(void *this,LPCSTR param_1,uint param_2)

{
  uint uVar1;
  undefined4 *puVar2;
  uint uVar3;
  CHAR *pCVar4;
  
  uVar1 = 0;
  if ((param_1 != (LPCSTR)0x0) && (uVar1 = param_2, (int)param_2 < 0)) {
    uVar1 = lstrlenA(param_1);
  }
  uVar3 = uVar1;
  if ((int)uVar1 < 0) {
    uVar3 = 0;
  }
  puVar2 = FUN_0040d3a0(uVar3 + 0xd);
  *(undefined4 **)this = puVar2;
  *puVar2 = 1;
  puVar2[1] = uVar3;
  puVar2[2] = 0xffffffff;
  *(undefined1 *)((int)puVar2 + uVar3 + 0xc) = 0;
  pCVar4 = (CHAR *)(*(int *)this + 0xc);
  for (uVar3 = uVar1 >> 2; uVar3 != 0; uVar3 = uVar3 - 1) {
    *(undefined4 *)pCVar4 = *(undefined4 *)param_1;
    param_1 = param_1 + 4;
    pCVar4 = pCVar4 + 4;
  }
  for (uVar1 = uVar1 & 3; uVar1 != 0; uVar1 = uVar1 - 1) {
    *pCVar4 = *param_1;
    param_1 = param_1 + 1;
    pCVar4 = pCVar4 + 1;
  }
  return;
}



/******************************************************************************/
/* TARGET 004066c0  FUN_004066c0 */
/******************************************************************************/

void __thiscall FUN_004066c0(void *this,LPCWSTR param_1,int param_2)

{
  int cchWideChar;
  undefined4 *puVar1;
  int iVar2;
  
  cchWideChar = 0;
  if ((param_1 != (LPCWSTR)0x0) && (cchWideChar = param_2, param_2 < 0)) {
    cchWideChar = lstrlenW(param_1);
  }
  iVar2 = cchWideChar;
  if (cchWideChar < 0) {
    iVar2 = 0;
  }
  puVar1 = FUN_0040d3a0(iVar2 + 0xd);
  *(undefined4 **)this = puVar1;
  *puVar1 = 1;
  puVar1[1] = iVar2;
  puVar1[2] = 0xffffffff;
  *(undefined1 *)((int)puVar1 + iVar2 + 0xc) = 0;
  WideCharToMultiByte(DAT_00437260,0,param_1,cchWideChar,(LPSTR)(*(int *)this + 0xc),cchWideChar + 1
                      ,(LPCSTR)0x0,(LPBOOL)0x0);
  return;
}



/******************************************************************************/
/* TARGET 00406730  FUN_00406730 */
/******************************************************************************/

void __thiscall FUN_00406730(void *this,undefined4 *param_1)

{
  uint uVar1;
  uint uVar2;
  undefined4 *puVar3;
  
  uVar2 = *(uint *)(*(int *)this + 4);
  puVar3 = (undefined4 *)(*(int *)this + 0xc);
  for (uVar1 = uVar2 >> 2; uVar1 != 0; uVar1 = uVar1 - 1) {
    *param_1 = *puVar3;
    puVar3 = puVar3 + 1;
    param_1 = param_1 + 1;
  }
  for (uVar2 = uVar2 & 3; uVar2 != 0; uVar2 = uVar2 - 1) {
    *(undefined1 *)param_1 = *(undefined1 *)puVar3;
    puVar3 = (undefined4 *)((int)puVar3 + 1);
    param_1 = (undefined4 *)((int)param_1 + 1);
  }
  return;
}



/******************************************************************************/
/* TARGET 00406760  FUN_00406760 */
/******************************************************************************/

void __thiscall FUN_00406760(void *this,LPWSTR param_1)

{
  int cbMultiByte;
  
  cbMultiByte = *(int *)(*(int *)this + 4);
  MultiByteToWideChar(DAT_00437260,0,(LPCSTR)(*(int *)this + 0xc),cbMultiByte,param_1,
                      cbMultiByte + 1);
  return;
}



/******************************************************************************/
/* TARGET 00406790  FUN_00406790 */
/******************************************************************************/

void __thiscall FUN_00406790(void *this,int param_1)

{
  int *piVar1;
  
  FUN_00406db0(this);
  if (param_1 < 0) {
    param_1 = 0;
  }
  piVar1 = FUN_0040d470(*(int **)this,param_1 + 0xd);
  *(int **)this = piVar1;
  piVar1[1] = param_1;
  piVar1[2] = -1;
  *(undefined1 *)((int)piVar1 + param_1 + 0xc) = 0;
  return;
}



/******************************************************************************/
/* TARGET 004067d0  FUN_004067d0 */
/******************************************************************************/

char * __fastcall FUN_004067d0(int *param_1,int *param_2)

{
  char cVar1;
  int iVar2;
  int iVar3;
  int iVar4;
  char *pcVar5;
  int iVar6;
  int iVar7;
  char *pcVar8;
  char *pcVar9;
  bool bVar10;
  
  iVar2 = *param_2;
  iVar3 = *(int *)(iVar2 + 4);
  if (iVar3 == 0) {
    return (char *)0x0;
  }
  if (iVar3 == 1) {
    pcVar5 = FUN_00406860(param_1,*(char *)(iVar2 + 0xc));
    return pcVar5;
  }
  iVar4 = *param_1;
  pcVar5 = (char *)(iVar4 + 0xc);
  iVar7 = *(int *)(iVar4 + 4) - iVar3;
  do {
    if (iVar7 < 0) {
      return (char *)0xffffffff;
    }
    cVar1 = *pcVar5;
    pcVar5 = pcVar5 + 1;
    if (cVar1 == *(char *)(iVar2 + 0xc)) {
      bVar10 = true;
      pcVar8 = pcVar5;
      pcVar9 = (char *)(iVar2 + 0xd);
      iVar6 = iVar3;
      do {
        iVar6 = iVar6 + -1;
        if (iVar6 == 0) break;
        bVar10 = *pcVar8 == *pcVar9;
        pcVar8 = pcVar8 + 1;
        pcVar9 = pcVar9 + 1;
      } while (bVar10);
      if (bVar10) {
        return pcVar5 + (-0xd - iVar4);
      }
    }
    iVar7 = iVar7 + -1;
  } while( true );
}



/******************************************************************************/
/* TARGET 00406860  FUN_00406860 */
/******************************************************************************/

char * __fastcall FUN_00406860(int *param_1,char param_2)

{
  char *pcVar1;
  char cVar2;
  int iVar3;
  char *pcVar4;
  
  iVar3 = *param_1;
  pcVar4 = (char *)(iVar3 + 0xc);
  cVar2 = *(char *)(iVar3 + 0xc);
  while ((cVar2 != '\0' && (cVar2 != param_2))) {
    pcVar1 = pcVar4 + 1;
    pcVar4 = pcVar4 + 1;
    cVar2 = *pcVar1;
  }
  if (*pcVar4 != '\0') {
    return pcVar4 + (-0xc - iVar3);
  }
  return (char *)0xffffffff;
}



/******************************************************************************/
/* TARGET 00406890  FUN_00406890 */
/******************************************************************************/

void __fastcall FUN_00406890(int *param_1,char param_2)

{
  char *pcVar1;
  int iVar2;
  int iVar3;
  
  iVar2 = *(int *)(*param_1 + 4);
  iVar3 = *param_1 + 0xc + iVar2;
  do {
    iVar2 = iVar2 + -1;
    if (iVar2 < 0) {
      return;
    }
    pcVar1 = (char *)(iVar3 + -1);
    iVar3 = iVar3 + -1;
  } while (*pcVar1 != param_2);
  return;
}



/******************************************************************************/
/* TARGET 004068b0  FUN_004068b0 */
/******************************************************************************/

int __fastcall FUN_004068b0(int *param_1)

{
  char cVar1;
  int iVar2;
  int iVar3;
  int iVar4;
  char *pcVar5;
  
  iVar2 = *param_1;
  iVar4 = 0;
  pcVar5 = (char *)(iVar2 + 0xc);
  do {
    while( true ) {
      cVar1 = *pcVar5;
      pcVar5 = pcVar5 + 1;
      if (cVar1 != '\r') break;
      if (*pcVar5 == '\n') {
        iVar4 = iVar4 + 1;
      }
    }
  } while (cVar1 != '\0');
  iVar3 = *(int *)(iVar2 + 4);
  if (((1 < iVar3) &&
      ((*(char *)(iVar2 + 10 + iVar3) != '\r' || (*(char *)(iVar2 + 0xb + iVar3) != '\n')))) ||
     (iVar3 == 1)) {
    iVar4 = iVar4 + 1;
  }
  return iVar4;
}



/******************************************************************************/
/* TARGET 004068f0  FUN_004068f0 */
/******************************************************************************/

void * __fastcall FUN_004068f0(int *param_1,void *param_2,int param_3)

{
  int iVar1;
  uint uVar2;
  uint uVar3;
  char *pcVar4;
  uint uVar5;
  
  uVar5 = 0;
  uVar2 = 0;
  iVar1 = *(int *)(*param_1 + 4);
  pcVar4 = (char *)(*param_1 + 0xc);
  if (0 < iVar1) {
    do {
      uVar3 = uVar2;
      if (((*pcVar4 == '\r') && ((int)uVar2 < iVar1 + -1)) && (pcVar4[1] == '\n')) {
        param_3 = param_3 + -1;
        if (param_3 < 0) break;
        uVar3 = uVar2 + 1;
        pcVar4 = pcVar4 + 1;
        uVar5 = uVar2 + 2;
      }
      pcVar4 = pcVar4 + 1;
      uVar2 = uVar3 + 1;
    } while ((int)uVar2 < iVar1);
  }
  if (0 < param_3) {
    uVar5 = uVar2;
  }
  FUN_00406bb0(param_1,param_2,uVar5,uVar2 - uVar5);
  return param_2;
}



/******************************************************************************/
/* TARGET 00406950  FUN_00406950 */
/******************************************************************************/

void * __thiscall
FUN_00406950(void *this,void *param_1,int param_2,int param_3,int param_4,int param_5)

{
  uint uVar1;
  bool bVar2;
  char *pcVar3;
  int iVar4;
  uint uVar5;
  int iVar6;
  int iVar7;
  uint uVar8;
  
  uVar8 = 0;
  if (param_2 < 0) {
    param_2 = 0x7fffffff;
  }
  if (param_3 < 0) {
    param_3 = 0x7fffffff;
  }
  if (param_4 < 0) {
    param_4 = 0x7fffffff;
  }
  if (param_5 < 0) {
    param_5 = 0x7fffffff;
  }
  if ((param_4 != 0x7fffffff) || (bVar2 = true, param_5 != 0x7fffffff)) {
    bVar2 = false;
  }
  if ((param_4 < param_2) ||
     ((iVar4 = param_2, iVar6 = param_3, param_4 == param_2 && (param_5 < param_3)))) {
    iVar4 = param_4;
    iVar6 = param_5;
    param_4 = param_2;
    param_5 = param_3;
  }
  iVar7 = param_4 - iVar4;
  if ((iVar7 == 0) && (param_5 = param_5 - iVar6, param_5 == 0)) {
    FUN_00401020(param_1,&DAT_00437078);
    return param_1;
  }
  uVar1 = *(uint *)(*(int *)this + 4);
  pcVar3 = (char *)(*(int *)this + 0xc);
  if (iVar4 < 1) {
joined_r0x00406a26:
    for (; (((int)uVar8 < (int)uVar1 && (iVar6 != 0)) &&
           ((*pcVar3 != '\r' || (((int)(uVar1 - 1) <= (int)uVar8 || (pcVar3[1] != '\n'))))));
        pcVar3 = pcVar3 + 1) {
      iVar6 = iVar6 + -1;
      uVar8 = uVar8 + 1;
    }
  }
  else if (0 < (int)uVar1) {
    do {
      if ((((*pcVar3 == '\r') && ((int)uVar8 < (int)(uVar1 - 1))) && (pcVar3[1] == '\n')) &&
         (iVar4 = iVar4 + -1, iVar4 == 0)) {
        uVar8 = uVar8 + 2;
        pcVar3 = pcVar3 + 2;
        goto joined_r0x00406a26;
      }
      uVar8 = uVar8 + 1;
      pcVar3 = pcVar3 + 1;
    } while ((int)uVar8 < (int)uVar1);
  }
  uVar5 = uVar1;
  if (!bVar2) {
    uVar5 = uVar8;
    if (iVar7 < 1) {
joined_r0x00406a7c:
      for (; (((int)uVar5 < (int)uVar1 && (param_5 != 0)) &&
             ((*pcVar3 != '\r' || (((int)(uVar1 - 1) <= (int)uVar5 || (pcVar3[1] != '\n'))))));
          pcVar3 = pcVar3 + 1) {
        param_5 = param_5 + -1;
        uVar5 = uVar5 + 1;
      }
    }
    else {
      for (; (int)uVar5 < (int)uVar1; uVar5 = uVar5 + 1) {
        if ((((*pcVar3 == '\r') && ((int)uVar5 < (int)(uVar1 - 1))) && (pcVar3[1] == '\n')) &&
           (iVar7 = iVar7 + -1, iVar7 == 0)) {
          uVar5 = uVar5 + 2;
          pcVar3 = pcVar3 + 2;
          goto joined_r0x00406a7c;
        }
        pcVar3 = pcVar3 + 1;
      }
    }
  }
  FUN_00406bb0(this,param_1,uVar8,uVar5 - uVar8);
  return param_1;
}



/******************************************************************************/
/* TARGET 00406ad0  FUN_00406ad0 */
/******************************************************************************/

void __fastcall FUN_00406ad0(undefined4 *param_1)

{
  int iVar1;
  
  iVar1 = *(int *)*param_1 + -1;
  *(int *)*param_1 = iVar1;
  if (iVar1 == 0) {
    FUN_0040d410((int *)*param_1);
  }
  *param_1 = &DAT_00436178;
  DAT_00436178 = DAT_00436178 + 1;
  return;
}



/******************************************************************************/
/* TARGET 00406b00  FUN_00406b00 */
/******************************************************************************/

void __fastcall FUN_00406b00(int *param_1)

{
  FUN_00406db0(param_1);
  CharUpperA((LPSTR)(*param_1 + 0xc));
  return;
}



/******************************************************************************/
/* TARGET 00406b20  FUN_00406b20 */
/******************************************************************************/

void __fastcall FUN_00406b20(int *param_1)

{
  FUN_00406db0(param_1);
  CharLowerA((LPSTR)(*param_1 + 0xc));
  return;
}



/******************************************************************************/
/* TARGET 00406b40  FUN_00406b40 */
/******************************************************************************/

void * __fastcall FUN_00406b40(int *param_1,void *param_2,uint param_3)

{
  uint uVar1;
  
  uVar1 = *(uint *)(*param_1 + 4);
  if (uVar1 < param_3) {
    param_3 = ((int)param_3 < 0) - 1 & uVar1;
  }
  FUN_00406530(param_2,(LPCSTR)(*param_1 + 0xc),param_3);
  return param_2;
}



/******************************************************************************/
/* TARGET 00406b70  FUN_00406b70 */
/******************************************************************************/

void * __fastcall FUN_00406b70(int *param_1,void *param_2,uint param_3)

{
  uint uVar1;
  
  uVar1 = *(uint *)(*param_1 + 4);
  if (uVar1 < param_3) {
    param_3 = ((int)param_3 < 0) - 1 & uVar1;
  }
  FUN_00406530(param_2,(LPCSTR)((*param_1 - param_3) + 0xc + uVar1),param_3);
  return param_2;
}



/******************************************************************************/
/* TARGET 00406bb0  FUN_00406bb0 */
/******************************************************************************/

void * __fastcall FUN_00406bb0(int *param_1,void *param_2,uint param_3,uint param_4)

{
  uint uVar1;
  
  uVar1 = *(uint *)(*param_1 + 4);
  if (uVar1 < param_3) {
    param_3 = ((int)param_3 < 0) - 1 & uVar1;
  }
  if ((int)param_4 < 0) {
    param_4 = 0;
  }
  if (uVar1 < param_3 + param_4) {
    param_4 = uVar1 - param_3;
  }
  FUN_00406530(param_2,(LPCSTR)(*param_1 + 0xc + param_3),param_4);
  return param_2;
}



/******************************************************************************/
/* TARGET 00406c00  FUN_00406c00 */
/******************************************************************************/

void __thiscall FUN_00406c00(void *this,uint param_1,int param_2)

{
  uint uVar1;
  uint uVar2;
  undefined4 *puVar3;
  undefined4 *puVar4;
  
  uVar2 = *(uint *)(*(int *)this + 4);
  if (uVar2 < param_1) {
    param_1 = ((int)param_1 < 0) - 1 & uVar2;
  }
  if (param_2 < 0) {
    param_2 = 0;
  }
  if (uVar2 < param_1 + param_2) {
    param_2 = uVar2 - param_1;
  }
  if (param_2 != 0) {
    FUN_00406db0(this);
    uVar1 = (uVar2 - (param_1 + param_2)) + 1;
    puVar3 = (undefined4 *)(*(int *)this + 0xc + param_1 + param_2);
    puVar4 = (undefined4 *)(*(int *)this + 0xc + param_1);
    for (uVar2 = uVar1 >> 2; uVar2 != 0; uVar2 = uVar2 - 1) {
      *puVar4 = *puVar3;
      puVar3 = puVar3 + 1;
      puVar4 = puVar4 + 1;
    }
    for (uVar1 = uVar1 & 3; uVar1 != 0; uVar1 = uVar1 - 1) {
      *(undefined1 *)puVar4 = *(undefined1 *)puVar3;
      puVar3 = (undefined4 *)((int)puVar3 + 1);
      puVar4 = (undefined4 *)((int)puVar4 + 1);
    }
    *(int *)(*(int *)this + 4) = *(int *)(*(int *)this + 4) - param_2;
  }
  return;
}



/******************************************************************************/
/* TARGET 00406c70  FUN_00406c70 */
/******************************************************************************/

void __fastcall FUN_00406c70(int *param_1)

{
  byte *pbVar1;
  byte bVar2;
  int iVar3;
  undefined1 *puVar4;
  uint uVar5;
  uint uVar6;
  undefined4 *puVar7;
  undefined4 *puVar8;
  
  FUN_00406db0(param_1);
  iVar3 = *param_1;
  puVar7 = (undefined4 *)(iVar3 + 0xc);
  bVar2 = *(byte *)(iVar3 + 0xc);
  while ((bVar2 != 0 && (bVar2 < 0x21))) {
    pbVar1 = (byte *)((int)puVar7 + 1);
    puVar7 = (undefined4 *)((int)puVar7 + 1);
    bVar2 = *pbVar1;
  }
  puVar4 = (undefined1 *)((int)puVar7 + (-0xc - iVar3));
  if (puVar4 != (undefined1 *)0x0) {
    *(int *)(iVar3 + 4) = *(int *)(iVar3 + 4) - (int)puVar4;
    uVar5 = *(int *)(*param_1 + 4) + 1;
    puVar8 = (undefined4 *)(*param_1 + 0xc);
    for (uVar6 = uVar5 >> 2; uVar6 != 0; uVar6 = uVar6 - 1) {
      *puVar8 = *puVar7;
      puVar7 = puVar7 + 1;
      puVar8 = puVar8 + 1;
    }
    for (uVar5 = uVar5 & 3; uVar5 != 0; uVar5 = uVar5 - 1) {
      *(undefined1 *)puVar8 = *(undefined1 *)puVar7;
      puVar7 = (undefined4 *)((int)puVar7 + 1);
      puVar8 = (undefined4 *)((int)puVar8 + 1);
    }
  }
  return;
}



/******************************************************************************/
/* TARGET 00406cc0  FUN_00406cc0 */
/******************************************************************************/

void __fastcall FUN_00406cc0(int *param_1)

{
  byte *pbVar1;
  int iVar2;
  int iVar3;
  int iVar4;
  
  FUN_00406db0(param_1);
  iVar2 = *param_1;
  iVar3 = *(int *)(iVar2 + 4);
  iVar4 = iVar2 + 0xc + iVar3;
  while ((iVar3 != 0 && (pbVar1 = (byte *)(iVar4 + -1), iVar4 = iVar4 + -1, *pbVar1 < 0x21))) {
    iVar3 = iVar3 + -1;
  }
  *(int *)(iVar2 + 4) = iVar3;
  *(undefined1 *)(*param_1 + 0xc + iVar3) = 0;
  return;
}



/******************************************************************************/
/* TARGET 00406d00  FUN_00406d00 */
/******************************************************************************/

void FUN_00406d00(void)

{
  FUN_004064e0(&DAT_00436f40,'#');
  return;
}



/******************************************************************************/
/* TARGET 00406d10  FUN_00406d10 */
/******************************************************************************/

void FUN_00406d10(void)

{
  FUN_0040d9b0(0x406d20);
  return;
}



/******************************************************************************/
/* TARGET 00406d30  FUN_00406d30 */
/******************************************************************************/

int __fastcall FUN_00406d30(int *param_1)

{
  int iVar1;
  uint3 uVar2;
  
  iVar1 = *param_1;
  uVar2 = (uint3)((uint)iVar1 >> 8);
  if (*(int *)(iVar1 + 4) < 1) {
    return (uint)uVar2 << 8;
  }
  return CONCAT31(uVar2,*(undefined1 *)(iVar1 + 0xb + *(int *)(iVar1 + 4)));
}



/******************************************************************************/
/* TARGET 00406d50  FUN_00406d50 */
/******************************************************************************/

void __fastcall FUN_00406d50(int *param_1)

{
  int *lpBuffer;
  int *lpTempFileName;
  
  lpBuffer = FUN_0040d3a0(0x100);
  lpTempFileName = FUN_0040d3a0(0x200);
  *(undefined1 *)lpBuffer = 0;
  *(undefined1 *)lpTempFileName = 0;
  GetTempPathA(0xff,(LPSTR)lpBuffer);
  GetTempFileNameA((LPCSTR)lpBuffer,(LPCSTR)&lpPrefixString_00436188,0,(LPSTR)lpTempFileName);
  FUN_00407cf0(param_1,(LPCSTR)lpTempFileName);
  FUN_0040d410(lpBuffer);
  FUN_0040d410(lpTempFileName);
  return;
}



/******************************************************************************/
/* TARGET 00406db0  FUN_00406db0 */
/******************************************************************************/

void __fastcall FUN_00406db0(int *param_1)

{
  int *piVar1;
  undefined4 *puVar2;
  uint uVar3;
  uint uVar4;
  int iVar5;
  int *piVar6;
  int *piVar7;
  
  piVar1 = (int *)*param_1;
  if (1 < *piVar1) {
    iVar5 = piVar1[1];
    if (iVar5 < 0) {
      iVar5 = 0;
    }
    puVar2 = FUN_0040d3a0(iVar5 + 0xd);
    *param_1 = (int)puVar2;
    *puVar2 = 1;
    puVar2[1] = iVar5;
    puVar2[2] = 0xffffffff;
    *(undefined1 *)((int)puVar2 + iVar5 + 0xc) = 0;
    uVar4 = piVar1[1];
    piVar6 = piVar1 + 3;
    piVar7 = (int *)(*param_1 + 0xc);
    for (uVar3 = uVar4 >> 2; uVar3 != 0; uVar3 = uVar3 - 1) {
      *piVar7 = *piVar6;
      piVar6 = piVar6 + 1;
      piVar7 = piVar7 + 1;
    }
    for (uVar4 = uVar4 & 3; uVar4 != 0; uVar4 = uVar4 - 1) {
      *(char *)piVar7 = (char)*piVar6;
      piVar6 = (int *)((int)piVar6 + 1);
      piVar7 = (int *)((int)piVar7 + 1);
    }
    *piVar1 = *piVar1 + -1;
    *(undefined4 *)(*param_1 + 8) = 0xffffffff;
    return;
  }
  *(undefined4 *)(*param_1 + 8) = 0xffffffff;
  return;
}



/******************************************************************************/
/* TARGET 00406e20  FUN_00406e20 */
/******************************************************************************/

int __fastcall FUN_00406e20(int *param_1,uint param_2)

{
  int iVar1;
  uint3 uVar2;
  
  iVar1 = *param_1;
  uVar2 = (uint3)((uint)iVar1 >> 8);
  if (param_2 < *(uint *)(iVar1 + 4)) {
    return CONCAT31(uVar2,*(undefined1 *)(iVar1 + 0xc + param_2));
  }
  return (uint)uVar2 << 8;
}



/******************************************************************************/
/* TARGET 00406e30  FUN_00406e30 */
/******************************************************************************/

void __thiscall FUN_00406e30(void *this,HWND param_1)

{
  undefined4 *puVar1;
  int iVar2;
  
  iVar2 = **(int **)this + -1;
  **(int **)this = iVar2;
  if (iVar2 == 0) {
    FUN_0040d410(*(int **)this);
  }
  iVar2 = GetWindowTextLengthA(param_1);
  if (iVar2 < 0) {
    iVar2 = 0;
  }
  puVar1 = FUN_0040d3a0(iVar2 + 0xd);
  *(undefined4 **)this = puVar1;
  *puVar1 = 1;
  puVar1[1] = iVar2;
  puVar1[2] = 0xffffffff;
  *(undefined1 *)((int)puVar1 + iVar2 + 0xc) = 0;
  GetWindowTextA(param_1,(LPSTR)(*(int *)this + 0xc),*(int *)(*(int *)this + 4) + 1);
  return;
}



/******************************************************************************/
/* TARGET 00406e90  FUN_00406e90 */
/******************************************************************************/

void __fastcall FUN_00406e90(int *param_1,HWND param_2)

{
  SetWindowTextA(param_2,(LPCSTR)(*param_1 + 0xc));
  return;
}



/******************************************************************************/
/* TARGET 00406ea0  FUN_00406ea0 */
/******************************************************************************/

void __thiscall FUN_00406ea0(void *this,HWND param_1,int param_2)

{
  HWND hWnd;
  undefined4 *puVar1;
  int iVar2;
  
  hWnd = GetDlgItem(param_1,param_2);
  if (hWnd != (HWND)0x0) {
    iVar2 = **(int **)this + -1;
    **(int **)this = iVar2;
    if (iVar2 == 0) {
      FUN_0040d410(*(int **)this);
    }
    iVar2 = GetWindowTextLengthA(hWnd);
    if (iVar2 < 0) {
      iVar2 = 0;
    }
    puVar1 = FUN_0040d3a0(iVar2 + 0xd);
    *(undefined4 **)this = puVar1;
    *puVar1 = 1;
    puVar1[1] = iVar2;
    puVar1[2] = 0xffffffff;
    *(undefined1 *)((int)puVar1 + iVar2 + 0xc) = 0;
    GetWindowTextA(hWnd,(LPSTR)(*(int *)this + 0xc),*(int *)(*(int *)this + 4) + 1);
    return;
  }
  FUN_00406ad0(this);
  return;
}



/******************************************************************************/
/* TARGET 00406f20  FUN_00406f20 */
/******************************************************************************/

void __fastcall FUN_00406f20(int *param_1,HWND param_2,int param_3)

{
  HWND hWnd;
  
  hWnd = GetDlgItem(param_2,param_3);
  if (hWnd != (HWND)0x0) {
    SetWindowTextA(hWnd,(LPCSTR)(*param_1 + 0xc));
  }
  return;
}



/******************************************************************************/
/* TARGET 00406f50  FUN_00406f50 */
/******************************************************************************/

void __fastcall FUN_00406f50(int *param_1)

{
  DWORD DVar1;
  undefined4 *puVar2;
  int iVar3;
  CHAR *pCVar4;
  uint uVar5;
  CHAR *pCVar6;
  CHAR local_104 [260];
  
  local_104[0] = '\0';
  DVar1 = GetCurrentDirectoryA(0x104,local_104);
  if ((int)DVar1 < 0) {
    DVar1 = 0;
  }
  else if (0x104 < (int)DVar1) {
    DVar1 = 0x104;
  }
  iVar3 = *(int *)*param_1 + -1;
  *(int *)*param_1 = iVar3;
  if (iVar3 == 0) {
    FUN_0040d410((int *)*param_1);
  }
  uVar5 = DVar1;
  if ((int)DVar1 < 0) {
    uVar5 = 0;
  }
  puVar2 = FUN_0040d3a0(uVar5 + 0xd);
  *param_1 = (int)puVar2;
  *puVar2 = 1;
  puVar2[1] = uVar5;
  puVar2[2] = 0xffffffff;
  *(undefined1 *)((int)puVar2 + uVar5 + 0xc) = 0;
  pCVar4 = local_104;
  pCVar6 = (CHAR *)(*param_1 + 0xc);
  for (uVar5 = DVar1 >> 2; uVar5 != 0; uVar5 = uVar5 - 1) {
    *(undefined4 *)pCVar6 = *(undefined4 *)pCVar4;
    pCVar4 = pCVar4 + 4;
    pCVar6 = pCVar6 + 4;
  }
  for (uVar5 = DVar1 & 3; uVar5 != 0; uVar5 = uVar5 - 1) {
    *pCVar6 = *pCVar4;
    pCVar4 = pCVar4 + 1;
    pCVar6 = pCVar6 + 1;
  }
  return;
}



/******************************************************************************/
/* TARGET 00406ff0  FUN_00406ff0 */
/******************************************************************************/

int __thiscall FUN_00406ff0(void *this,int param_1)

{
  byte bVar1;
  uint uVar2;
  
  uVar2 = *(int *)(*(int *)this + 4) - 1;
  if (-1 < (int)uVar2) {
    do {
      bVar1 = *(byte *)(*(int *)this + 0xc + uVar2);
      if (bVar1 < 0x20) {
        bVar1 = 0;
      }
      switch(bVar1) {
      case 0:
      case 0x22:
      case 0x2a:
      case 0x2f:
      case 0x3c:
      case 0x3e:
      case 0x3f:
      case 0x7c:
        FUN_00406c00(this,uVar2,1);
        if ((int)uVar2 < param_1) {
          param_1 = param_1 + -1;
        }
      }
      uVar2 = uVar2 - 1;
    } while (-1 < (int)uVar2);
    return param_1;
  }
  return param_1;
}



/******************************************************************************/
/* TARGET 004070d0  FUN_004070d0 */
/******************************************************************************/

void __thiscall FUN_004070d0(void *this,uint param_1)

{
  bool bVar1;
  undefined4 *puVar2;
  int iVar3;
  uint uVar4;
  char *pcVar5;
  uint uVar6;
  char *pcVar7;
  char local_3 [3];
  
  bVar1 = false;
  pcVar5 = local_3 + 2;
  uVar6 = 0;
  if ((int)param_1 < 0) {
    bVar1 = true;
    param_1 = -param_1;
  }
  do {
    uVar4 = uVar6;
    pcVar7 = pcVar5;
    pcVar5 = pcVar7 + -1;
    *pcVar5 = (char)((ulonglong)param_1 % 10) + '0';
    param_1 = param_1 / 10;
    uVar6 = uVar4 + 1;
  } while (param_1 != 0);
  if (bVar1) {
    pcVar5 = pcVar7 + -2;
    uVar6 = uVar4 + 2;
    *pcVar5 = '-';
  }
  iVar3 = **(int **)this + -1;
  **(int **)this = iVar3;
  if (iVar3 == 0) {
    FUN_0040d410(*(int **)this);
  }
  uVar4 = uVar6;
  if ((int)uVar6 < 0) {
    uVar4 = 0;
  }
  puVar2 = FUN_0040d3a0(uVar4 + 0xd);
  *(undefined4 **)this = puVar2;
  *puVar2 = 1;
  puVar2[1] = uVar4;
  puVar2[2] = 0xffffffff;
  *(undefined1 *)((int)puVar2 + uVar4 + 0xc) = 0;
  pcVar7 = (char *)(*(int *)this + 0xc);
  for (uVar4 = uVar6 >> 2; uVar4 != 0; uVar4 = uVar4 - 1) {
    *(undefined4 *)pcVar7 = *(undefined4 *)pcVar5;
    pcVar5 = pcVar5 + 4;
    pcVar7 = pcVar7 + 4;
  }
  for (uVar6 = uVar6 & 3; uVar6 != 0; uVar6 = uVar6 - 1) {
    *pcVar7 = *pcVar5;
    pcVar5 = pcVar5 + 1;
    pcVar7 = pcVar7 + 1;
  }
  return;
}



/******************************************************************************/
/* TARGET 00407180  FUN_00407180 */
/******************************************************************************/

uint __cdecl FUN_00407180(char *param_1)

{
  char *pcVar1;
  char cVar2;
  bool bVar3;
  uint uVar4;
  
  uVar4 = 0;
  bVar3 = false;
  cVar2 = *param_1;
  while (cVar2 != '\0') {
    if (cVar2 == '-') {
      bVar3 = !bVar3;
    }
    else if (((cVar2 != '+') && (cVar2 != ' ')) && (cVar2 != '\t')) break;
    pcVar1 = param_1 + 1;
    param_1 = param_1 + 1;
    cVar2 = *pcVar1;
  }
  cVar2 = *param_1;
  while (((cVar2 != '\0' && ('/' < cVar2)) && (cVar2 < ':'))) {
    if ((0xccccccc < uVar4) || (uVar4 = cVar2 + -0x30 + uVar4 * 10, 0x80000000 < uVar4)) {
      uVar4 = 0x80000000;
    }
    pcVar1 = param_1 + 1;
    param_1 = param_1 + 1;
    cVar2 = *pcVar1;
  }
  if (!bVar3) {
    if (0x7fffffff < uVar4) {
      uVar4 = 0x7fffffff;
    }
    return uVar4;
  }
  return -uVar4;
}



/******************************************************************************/
/* TARGET 00407200  FUN_00407200 */
/******************************************************************************/

void __fastcall FUN_00407200(int *param_1,byte param_2)

{
  int iVar1;
  int *piVar2;
  int iVar3;
  
  if (99 < param_2) {
    param_2 = ((-1 < (char)param_2) - 1U & 0x9d) + 99;
  }
  iVar1 = *(int *)(*param_1 + 4);
  FUN_00406db0(param_1);
  iVar3 = iVar1 + 2;
  if (iVar3 < 0) {
    iVar3 = 0;
  }
  piVar2 = FUN_0040d470((int *)*param_1,iVar3 + 0xd);
  *param_1 = (int)piVar2;
  piVar2[1] = iVar3;
  piVar2[2] = -1;
  *(undefined1 *)((int)piVar2 + iVar3 + 0xc) = 0;
  *(char *)(*param_1 + 0xc + iVar1) =
       (((char)param_2 / '\n' + ((char)param_2 >> 7)) -
       (char)((longlong)(int)(char)param_2 * 0x66666667 >> 0x3f)) + '0';
  *(char *)(*param_1 + 0xd + iVar1) = (char)param_2 % '\n' + '0';
  return;
}



/******************************************************************************/
/* TARGET 00407280  FUN_00407280 */
/******************************************************************************/

void __fastcall FUN_00407280(int *param_1,ushort param_2)

{
  int iVar1;
  
  if (9999 < param_2) {
    param_2 = ((-1 < (short)param_2) - 1 & 0xd8f1) + 9999;
  }
  iVar1 = (int)(short)param_2;
  FUN_00407200(param_1,((char)(iVar1 / 100) + (char)((short)param_2 >> 7)) -
                       (char)((longlong)iVar1 * 0x51eb851f >> 0x3f));
  FUN_00407200(param_1,(byte)(iVar1 % 100));
  return;
}



/******************************************************************************/
/* TARGET 004072d0  FUN_004072d0 */
/******************************************************************************/

void __fastcall FUN_004072d0(int *param_1,byte param_2)

{
  int iVar1;
  
  FUN_00407200(param_1,param_2);
  iVar1 = *param_1;
  if (*(char *)(*(int *)(iVar1 + 4) + 10 + iVar1) == '0') {
    *(undefined1 *)(*(int *)(iVar1 + 4) + 10 + iVar1) = 0x20;
  }
  return;
}



/******************************************************************************/
/* TARGET 004072f0  FUN_004072f0 */
/******************************************************************************/

void __fastcall FUN_004072f0(int *param_1,undefined4 *param_2,uint param_3)

{
  int iVar1;
  int *piVar2;
  uint uVar3;
  int iVar4;
  undefined4 *puVar5;
  
  if (0 < (int)param_3) {
    FUN_00406db0(param_1);
    iVar1 = ((int *)*param_1)[1];
    iVar4 = param_3 + iVar1;
    if (iVar4 < 0) {
      iVar4 = 0;
    }
    piVar2 = FUN_0040d470((int *)*param_1,iVar4 + 0xd);
    *param_1 = (int)piVar2;
    piVar2[1] = iVar4;
    piVar2[2] = -1;
    *(undefined1 *)((int)piVar2 + iVar4 + 0xc) = 0;
    puVar5 = (undefined4 *)(*param_1 + 0xc + iVar1);
    for (uVar3 = param_3 >> 2; uVar3 != 0; uVar3 = uVar3 - 1) {
      *puVar5 = *param_2;
      param_2 = param_2 + 1;
      puVar5 = puVar5 + 1;
    }
    for (uVar3 = param_3 & 3; uVar3 != 0; uVar3 = uVar3 - 1) {
      *(undefined1 *)puVar5 = *(undefined1 *)param_2;
      param_2 = (undefined4 *)((int)param_2 + 1);
      puVar5 = (undefined4 *)((int)puVar5 + 1);
    }
  }
  return;
}



/******************************************************************************/
/* TARGET 00407360  FUN_00407360 */
/******************************************************************************/

void __fastcall FUN_00407360(int *param_1,LPCWSTR param_2,uint param_3)

{
  uint uVar1;
  
  uVar1 = param_3;
  FUN_004065a0(&param_3,param_2,param_3);
  FUN_004072f0(param_1,(undefined4 *)(param_3 + 0xc),uVar1);
  FUN_00406610(&param_3);
  return;
}



/******************************************************************************/
/* TARGET 00407390  FUN_00407390 */
/******************************************************************************/

void __thiscall FUN_00407390(void *this,uint param_1)

{
  byte bVar1;
  char cVar2;
  undefined4 *puVar3;
  int iVar4;
  char *pcVar5;
  
  iVar4 = **(int **)this + -1;
  **(int **)this = iVar4;
  if (iVar4 == 0) {
    FUN_0040d410(*(int **)this);
  }
  puVar3 = FUN_0040d3a0(0x15);
  *(undefined4 **)this = puVar3;
  *puVar3 = 1;
  puVar3[1] = 8;
  puVar3[2] = 0xffffffff;
  *(undefined1 *)(puVar3 + 5) = 0;
  iVar4 = 8;
  pcVar5 = (char *)(*(int *)this + 0x14);
  do {
    pcVar5 = pcVar5 + -1;
    bVar1 = (byte)param_1 & 0xf;
    if (bVar1 < 10) {
      cVar2 = bVar1 + 0x30;
    }
    else {
      cVar2 = bVar1 + 0x37;
    }
    param_1 = param_1 >> 4;
    iVar4 = iVar4 + -1;
    *pcVar5 = cVar2;
  } while (iVar4 != 0);
  return;
}



/******************************************************************************/
/* TARGET 004073f0  FUN_004073f0 */
/******************************************************************************/

void __thiscall FUN_004073f0(void *this,double param_1)

{
  bool bVar1;
  char cVar2;
  undefined4 *puVar3;
  int iVar4;
  uint uVar5;
  char *pcVar6;
  int iVar7;
  int iVar8;
  uint uVar9;
  char *pcVar10;
  char *pcVar11;
  uint uVar12;
  char *pcVar13;
  undefined4 *puVar14;
  longlong lVar15;
  char local_22 [2];
  undefined4 local_20;
  
  if ((param_1._0_4_ == 0) && (param_1._4_4_ == 0x7ff00000)) {
    iVar7 = **(int **)this + -1;
    **(int **)this = iVar7;
    if (iVar7 == 0) {
      FUN_0040d410(*(int **)this);
    }
    puVar3 = FUN_0040d3a0(0x12);
    *(undefined4 **)this = puVar3;
    *puVar3 = 1;
    puVar3[1] = 5;
    puVar3[2] = 0xffffffff;
    *(undefined1 *)((int)puVar3 + 0x11) = 0;
    *(undefined1 *)(*(int *)this + 0xc) = 0x31;
    *(undefined1 *)(*(int *)this + 0xd) = 0x23;
    *(undefined1 *)(*(int *)this + 0xe) = 0x49;
    *(undefined1 *)(*(int *)this + 0xf) = 0x4e;
    *(undefined1 *)(*(int *)this + 0x10) = 0x46;
    return;
  }
  if (param_1 == 0.0) {
    iVar7 = **(int **)this + -1;
    **(int **)this = iVar7;
    if (iVar7 == 0) {
      FUN_0040d410(*(int **)this);
    }
    puVar3 = FUN_0040d3a0(0xe);
    *(undefined4 **)this = puVar3;
    *puVar3 = 1;
    puVar3[1] = 1;
    puVar3[2] = 0xffffffff;
    *(undefined1 *)((int)puVar3 + 0xd) = 0;
    *(undefined1 *)(*(int *)this + 0xc) = 0x30;
    return;
  }
  bVar1 = param_1 < 0.0;
  if (bVar1) {
    param_1 = -param_1;
  }
  iVar7 = 0;
  if (param_1 < 1.0) {
    if (param_1 < 1e-256) {
      param_1 = param_1 * 1e+257;
      iVar7 = -0x101;
    }
    if (param_1 < 1e-128) {
      param_1 = param_1 * 1e+129;
      iVar7 = iVar7 + -0x81;
    }
    if (param_1 < 1e-64) {
      param_1 = param_1 * 1e+65;
      iVar7 = iVar7 + -0x41;
    }
    if (param_1 < 1e-32) {
      param_1 = param_1 * 1e+33;
      iVar7 = iVar7 + -0x21;
    }
    if (param_1 < 1e-16) {
      param_1 = param_1 * 1e+17;
      iVar7 = iVar7 + -0x11;
    }
    if (param_1 < 1e-08) {
      param_1 = param_1 * 1000000000.0;
      iVar7 = iVar7 + -9;
    }
    if (param_1 < 0.0001) {
      param_1 = param_1 * 100000.0;
      iVar7 = iVar7 + -5;
    }
    if (param_1 < 0.01) {
      param_1 = param_1 * 1000.0;
      iVar7 = iVar7 + -3;
    }
    if (param_1 < 0.1) {
      param_1 = param_1 * 100.0;
      iVar7 = iVar7 + -2;
    }
    if (param_1 < 1.0) {
      param_1 = param_1 * 10.0;
      iVar7 = iVar7 + -1;
    }
  }
  else {
    if (1e+256 <= param_1) {
      param_1 = param_1 * 1e-256;
      iVar7 = 0x100;
    }
    if (1e+128 <= param_1) {
      param_1 = param_1 * 1e-128;
      iVar7 = iVar7 + 0x80;
    }
    if (1e+64 <= param_1) {
      param_1 = param_1 * 1e-64;
      iVar7 = iVar7 + 0x40;
    }
    if (1e+32 <= param_1) {
      param_1 = param_1 * 1e-32;
      iVar7 = iVar7 + 0x20;
    }
    if (1e+16 <= param_1) {
      param_1 = param_1 * 1e-16;
      iVar7 = iVar7 + 0x10;
    }
    if (100000000.0 <= param_1) {
      param_1 = param_1 * 1e-08;
      iVar7 = iVar7 + 8;
    }
    if (10000.0 <= param_1) {
      param_1 = param_1 * 0.0001;
      iVar7 = iVar7 + 4;
    }
    if (100.0 <= param_1) {
      param_1 = param_1 * 0.01;
      iVar7 = iVar7 + 2;
    }
    if (10.0 <= param_1) {
      param_1 = param_1 * 0.1;
      iVar7 = iVar7 + 1;
    }
  }
  if (100000000.0 <= param_1 * 10000000.0 + 6e-08) {
    iVar7 = iVar7 + 1;
  }
  lVar15 = FUN_0040d9c0();
  iVar4 = (int)lVar15;
  lVar15 = FUN_0040d9c0();
  iVar8 = (int)lVar15;
  pcVar11 = local_22 + 1;
  param_1 = 3.45845952088873e-323;
  do {
    pcVar11 = pcVar11 + -1;
    *pcVar11 = (char)(iVar8 % 10) + '0';
    iVar8 = iVar8 / 10;
    uVar5 = param_1._0_4_ - 1;
    param_1 = (double)(ulonglong)uVar5;
  } while (uVar5 != 0);
  iVar8 = 8;
  do {
    pcVar10 = pcVar11;
    pcVar11 = pcVar10 + -1;
    *pcVar11 = (char)(iVar4 % 10) + '0';
    iVar4 = iVar4 / 10;
    iVar8 = iVar8 + -1;
  } while (iVar8 != 0);
  pcVar6 = local_22 + 1;
  uVar5 = 0xf;
  do {
    pcVar13 = pcVar6 + -1;
    pcVar6 = pcVar6 + -1;
    if (*pcVar13 != '0') break;
    uVar5 = uVar5 - 1;
  } while (1 < (int)uVar5);
  pcVar6 = (char *)&local_20;
  if (bVar1) {
    local_20._0_1_ = '-';
    pcVar6 = (char *)((int)&local_20 + 1);
  }
  if (iVar7 < 0xf) {
    if (-1 < iVar7) {
      do {
        *pcVar6 = *pcVar11;
        pcVar10 = pcVar6 + 1;
        pcVar11 = pcVar11 + 1;
        uVar5 = uVar5 - 1;
        if (iVar7 < 1) {
          if ((int)uVar5 < 1) goto LAB_004078b9;
          if (iVar7 == 0) {
            *pcVar10 = DAT_004361b0;
            pcVar10 = pcVar6 + 2;
          }
        }
        iVar7 = iVar7 + -1;
        pcVar6 = pcVar10;
      } while( true );
    }
LAB_004077b6:
    if (-4 < iVar7) {
      *pcVar6 = '0';
      pcVar6[1] = DAT_004361b0;
      pcVar10 = pcVar6 + 2;
      if (iVar7 + 1 < 0) {
        uVar9 = -(iVar7 + 1);
        uVar12 = uVar9 >> 2;
        pcVar6 = pcVar10;
        while (uVar12 != 0) {
          uVar12 = uVar12 - 1;
          builtin_strncpy(pcVar6,"0000",4);
          pcVar6 = pcVar6 + 4;
        }
        for (uVar12 = uVar9 & 3; uVar12 != 0; uVar12 = uVar12 - 1) {
          *pcVar6 = '0';
          pcVar6 = pcVar6 + 1;
        }
        pcVar10 = pcVar10 + uVar9;
      }
      if (0 < (int)uVar5) {
        pcVar6 = pcVar10;
        for (uVar12 = uVar5 >> 2; uVar12 != 0; uVar12 = uVar12 - 1) {
          *(undefined4 *)pcVar6 = *(undefined4 *)pcVar11;
          pcVar11 = pcVar11 + 4;
          pcVar6 = pcVar6 + 4;
        }
        pcVar10 = pcVar10 + uVar5;
        for (uVar5 = uVar5 & 3; uVar5 != 0; uVar5 = uVar5 - 1) {
          *pcVar6 = *pcVar11;
          pcVar11 = pcVar11 + 1;
          pcVar6 = pcVar6 + 1;
        }
      }
      goto LAB_004078b9;
    }
  }
  else if (iVar7 < 0) goto LAB_004077b6;
  *pcVar6 = *pcVar11;
  pcVar11 = pcVar6 + 1;
  uVar5 = uVar5 - 1;
  if (0 < (int)uVar5) {
    *pcVar11 = DAT_004361b0;
    pcVar13 = pcVar6 + 2;
    for (uVar12 = uVar5 >> 2; uVar12 != 0; uVar12 = uVar12 - 1) {
      *(undefined4 *)pcVar13 = *(undefined4 *)pcVar10;
      pcVar13 = pcVar13 + 4;
      pcVar10 = pcVar10 + 4;
    }
    pcVar11 = pcVar6 + 2 + uVar5;
    for (uVar5 = uVar5 & 3; uVar5 != 0; uVar5 = uVar5 - 1) {
      *pcVar13 = *pcVar10;
      pcVar10 = pcVar10 + 1;
      pcVar13 = pcVar13 + 1;
    }
  }
  *pcVar11 = 'e';
  pcVar10 = pcVar11 + 1;
  if (iVar7 < 0) {
    *pcVar10 = '-';
    pcVar10 = pcVar11 + 2;
    iVar7 = -iVar7;
  }
  cVar2 = (char)(iVar7 >> 0x1f);
  if (iVar7 < 100) {
    if (9 < iVar7) {
      *pcVar10 = (((char)(iVar7 / 10) + cVar2) - (char)((longlong)iVar7 * 0x66666667 >> 0x3f)) + '0'
      ;
      goto LAB_004078a7;
    }
  }
  else {
    *pcVar10 = (((char)(iVar7 / 100) + cVar2) - (char)((longlong)iVar7 * 0x51eb851f >> 0x3f)) + '0';
    iVar7 = iVar7 % 100;
    pcVar10 = pcVar10 + 1;
    *pcVar10 = (((char)(iVar7 / 10) + (char)(iVar7 >> 0x1f)) -
               (char)((longlong)iVar7 * 0x66666667 >> 0x3f)) + '0';
LAB_004078a7:
    iVar7 = iVar7 % 10;
    pcVar10 = pcVar10 + 1;
  }
  *pcVar10 = (char)iVar7 + '0';
  pcVar10 = pcVar10 + 1;
LAB_004078b9:
  uVar5 = (int)pcVar10 - (int)&local_20;
  iVar7 = **(int **)this + -1;
  **(int **)this = iVar7;
  if (iVar7 == 0) {
    FUN_0040d410(*(int **)this);
  }
  uVar12 = uVar5;
  if ((int)uVar5 < 0) {
    uVar12 = 0;
  }
  puVar3 = FUN_0040d3a0(uVar12 + 0xd);
  *(undefined4 **)this = puVar3;
  *puVar3 = 1;
  puVar3[1] = uVar12;
  puVar3[2] = 0xffffffff;
  *(undefined1 *)((int)puVar3 + uVar12 + 0xc) = 0;
  puVar3 = &local_20;
  puVar14 = (undefined4 *)(*(int *)this + 0xc);
  for (uVar12 = uVar5 >> 2; uVar12 != 0; uVar12 = uVar12 - 1) {
    *puVar14 = *puVar3;
    puVar3 = puVar3 + 1;
    puVar14 = puVar14 + 1;
  }
  for (uVar5 = uVar5 & 3; uVar5 != 0; uVar5 = uVar5 - 1) {
    *(undefined1 *)puVar14 = *(undefined1 *)puVar3;
    puVar3 = (undefined4 *)((int)puVar3 + 1);
    puVar14 = (undefined4 *)((int)puVar14 + 1);
  }
  return;
}



/******************************************************************************/
/* TARGET 00407930  FUN_00407930 */
/******************************************************************************/

float10 __cdecl FUN_00407930(char *param_1)

{
  char *pcVar1;
  bool bVar2;
  bool bVar3;
  char cVar4;
  int iVar5;
  bool bVar6;
  char *pcVar7;
  float10 fVar8;
  float10 fVar9;
  
  fVar8 = (float10)0.0;
  iVar5 = 0;
  bVar2 = false;
  fVar9 = (float10)1.0;
  bVar6 = false;
  cVar4 = *param_1;
  pcVar7 = param_1;
  while (cVar4 != '\0') {
    if (cVar4 == '-') {
      bVar2 = !bVar2;
    }
    else if (((cVar4 != '+') && (cVar4 != ' ')) && (cVar4 != '\t')) break;
    pcVar1 = pcVar7 + 1;
    pcVar7 = pcVar7 + 1;
    cVar4 = *pcVar1;
  }
  if (cVar4 == '$') {
    do {
      do {
        cVar4 = pcVar7[1];
        pcVar7 = pcVar7 + 1;
      } while (cVar4 == ' ');
    } while (cVar4 == '\t');
    if (cVar4 != '\0') {
      while( true ) {
        if (('`' < cVar4) && (cVar4 < 'g')) {
          cVar4 = cVar4 + -0x20;
        }
        if (((cVar4 < '0') || ('9' < cVar4)) && ((cVar4 < 'A' || ('F' < cVar4)))) break;
        param_1 = (char *)(cVar4 + -0x30);
        if (9 < (int)param_1) {
          param_1 = (char *)(cVar4 + -0x37);
        }
        cVar4 = pcVar7[1];
        pcVar7 = pcVar7 + 1;
        fVar8 = fVar8 * (float10)16.0 + (float10)(int)param_1;
        if (cVar4 == '\0') {
          return fVar8;
        }
      }
    }
  }
  else if (cVar4 == '%') {
    do {
      do {
        cVar4 = pcVar7[1];
        pcVar7 = pcVar7 + 1;
      } while (cVar4 == ' ');
    } while (cVar4 == '\t');
    if (cVar4 != '\0') {
      while ((cVar4 == '0' || (cVar4 == '1'))) {
        iVar5 = (int)cVar4;
        pcVar7 = pcVar7 + 1;
        cVar4 = *pcVar7;
        fVar8 = fVar8 + fVar8 + (float10)(iVar5 + -0x30);
        if (cVar4 == '\0') {
          return fVar8;
        }
      }
    }
  }
  else {
    while (((cVar4 != '\0' && ('/' < cVar4)) && (cVar4 < ':'))) {
      pcVar7 = pcVar7 + 1;
      fVar8 = fVar8 * (float10)10.0 + (float10)(cVar4 + -0x30);
      cVar4 = *pcVar7;
    }
    if ((cVar4 == '.') || (cVar4 == ',')) {
      pcVar1 = pcVar7 + 1;
      pcVar7 = pcVar7 + 1;
      cVar4 = *pcVar1;
      while (((cVar4 != '\0' && ('/' < cVar4)) && (cVar4 < ':'))) {
        fVar9 = fVar9 * (float10)10.0;
        pcVar7 = pcVar7 + 1;
        fVar8 = (float10)(cVar4 + -0x30) / fVar9 + fVar8;
        cVar4 = *pcVar7;
      }
    }
    while ((cVar4 == ' ' || (cVar4 == '\t'))) {
      pcVar1 = pcVar7 + 1;
      pcVar7 = pcVar7 + 1;
      cVar4 = *pcVar1;
    }
    bVar3 = false;
    if ((cVar4 == 'E') || (cVar4 == 'e')) {
      while( true ) {
        while( true ) {
          cVar4 = pcVar7[1];
          pcVar7 = pcVar7 + 1;
          if ((cVar4 != ' ') && ((cVar4 != '\t' && (cVar4 != '+')))) break;
          if (cVar4 == '-') {
            bVar6 = bVar6 == false;
            bVar3 = bVar6;
          }
        }
        if (cVar4 != '-') break;
        bVar6 = bVar6 == false;
        bVar3 = bVar6;
      }
      if (cVar4 != '\0') {
        do {
          if ((cVar4 < '0') || ('9' < cVar4)) break;
          pcVar7 = pcVar7 + 1;
          iVar5 = cVar4 + -0x30 + iVar5 * 10;
          cVar4 = *pcVar7;
        } while (cVar4 != '\0');
        if (iVar5 != 0) {
          if (bVar3) {
            if (0xff < iVar5) {
              fVar8 = fVar8 * (float10)1e-256;
              iVar5 = iVar5 + -0x100;
            }
            if (0x7f < iVar5) {
              fVar8 = fVar8 * (float10)1e-128;
              iVar5 = iVar5 + -0x80;
            }
            if (0x3f < iVar5) {
              fVar8 = fVar8 * (float10)1e-64;
              iVar5 = iVar5 + -0x40;
            }
            if (0x1f < iVar5) {
              fVar8 = fVar8 * (float10)1e-32;
              iVar5 = iVar5 + -0x20;
            }
            if (0xf < iVar5) {
              fVar8 = fVar8 * (float10)1e-16;
              iVar5 = iVar5 + -0x10;
            }
            if (7 < iVar5) {
              fVar8 = fVar8 * (float10)1e-08;
              iVar5 = iVar5 + -8;
            }
            if (3 < iVar5) {
              fVar8 = fVar8 * (float10)0.0001;
              iVar5 = iVar5 + -4;
            }
            if (1 < iVar5) {
              fVar8 = fVar8 * (float10)0.01;
              iVar5 = iVar5 + -2;
            }
            if (0 < iVar5) {
              fVar8 = fVar8 * (float10)0.1;
            }
          }
          else {
            if (0xff < iVar5) {
              fVar8 = fVar8 * (float10)1e+256;
              iVar5 = iVar5 + -0x100;
            }
            if (0x7f < iVar5) {
              fVar8 = fVar8 * (float10)1e+128;
              iVar5 = iVar5 + -0x80;
            }
            if (0x3f < iVar5) {
              fVar8 = fVar8 * (float10)1e+64;
              iVar5 = iVar5 + -0x40;
            }
            if (0x1f < iVar5) {
              fVar8 = fVar8 * (float10)1e+32;
              iVar5 = iVar5 + -0x20;
            }
            if (0xf < iVar5) {
              fVar8 = fVar8 * (float10)1e+16;
              iVar5 = iVar5 + -0x10;
            }
            if (7 < iVar5) {
              fVar8 = fVar8 * (float10)100000000.0;
              iVar5 = iVar5 + -8;
            }
            if (3 < iVar5) {
              fVar8 = fVar8 * (float10)10000.0;
              iVar5 = iVar5 + -4;
            }
            if (1 < iVar5) {
              fVar8 = fVar8 * (float10)100.0;
              iVar5 = iVar5 + -2;
            }
            if (0 < iVar5) {
              fVar8 = fVar8 * (float10)10.0;
            }
          }
        }
      }
    }
    if (((((cVar4 == '#') && (pcVar7[1] == 'I')) && (pcVar7[2] == 'N')) && (pcVar7[3] == 'F')) &&
       ((fVar8 == (float10)1.0 || (fVar8 == (float10)0.0)))) {
      return (float10)INFINITY;
    }
    if (bVar2) {
      fVar8 = -fVar8;
    }
  }
  return fVar8;
}



/******************************************************************************/
/* TARGET 00407cc0  FUN_00407cc0 */
/******************************************************************************/

undefined4 * __fastcall FUN_00407cc0(undefined4 *param_1,undefined4 *param_2)

{
  int *piVar1;
  int iVar2;
  
  iVar2 = *(int *)*param_1 + -1;
  *(int *)*param_1 = iVar2;
  if (iVar2 == 0) {
    FUN_0040d410((int *)*param_1);
  }
  piVar1 = (int *)*param_2;
  *param_1 = piVar1;
  *piVar1 = *piVar1 + 1;
  return param_1;
}



/******************************************************************************/
/* TARGET 00407cf0  FUN_00407cf0 */
/******************************************************************************/

int * __fastcall FUN_00407cf0(int *param_1,LPCSTR param_2)

{
  undefined4 *puVar1;
  int iVar2;
  uint uVar3;
  uint uVar4;
  CHAR *pCVar5;
  
  uVar3 = 0;
  if (param_2 != (LPCSTR)0x0) {
    uVar3 = lstrlenA(param_2);
  }
  iVar2 = *(int *)*param_1 + -1;
  *(int *)*param_1 = iVar2;
  if (iVar2 == 0) {
    FUN_0040d410((int *)*param_1);
  }
  uVar4 = uVar3;
  if ((int)uVar3 < 0) {
    uVar4 = 0;
  }
  puVar1 = FUN_0040d3a0(uVar4 + 0xd);
  *param_1 = (int)puVar1;
  *puVar1 = 1;
  puVar1[1] = uVar4;
  puVar1[2] = 0xffffffff;
  *(undefined1 *)((int)puVar1 + uVar4 + 0xc) = 0;
  pCVar5 = (CHAR *)(*param_1 + 0xc);
  for (uVar4 = uVar3 >> 2; uVar4 != 0; uVar4 = uVar4 - 1) {
    *(undefined4 *)pCVar5 = *(undefined4 *)param_2;
    param_2 = param_2 + 4;
    pCVar5 = pCVar5 + 4;
  }
  for (uVar3 = uVar3 & 3; uVar3 != 0; uVar3 = uVar3 - 1) {
    *pCVar5 = *param_2;
    param_2 = param_2 + 1;
    pCVar5 = pCVar5 + 1;
  }
  return param_1;
}



/******************************************************************************/
/* TARGET 00407d60  FUN_00407d60 */
/******************************************************************************/

int * __fastcall FUN_00407d60(int *param_1,char param_2)

{
  undefined4 *puVar1;
  int iVar2;
  
  if (param_2 == '\0') {
    FUN_00406ad0(param_1);
    return param_1;
  }
  iVar2 = *(int *)*param_1 + -1;
  *(int *)*param_1 = iVar2;
  if (iVar2 == 0) {
    FUN_0040d410((int *)*param_1);
  }
  puVar1 = FUN_0040d3a0(0xe);
  *param_1 = (int)puVar1;
  *puVar1 = 1;
  puVar1[1] = 1;
  puVar1[2] = 0xffffffff;
  *(undefined1 *)((int)puVar1 + 0xd) = 0;
  *(char *)(*param_1 + 0xc) = param_2;
  return param_1;
}



/******************************************************************************/
/* TARGET 00407dc0  FUN_00407dc0 */
/******************************************************************************/

int * __fastcall FUN_00407dc0(int *param_1,int *param_2)

{
  int iVar1;
  int *piVar2;
  uint uVar3;
  uint uVar4;
  int iVar5;
  undefined4 *puVar6;
  undefined4 *puVar7;
  
  uVar4 = *(uint *)(*param_2 + 4);
  iVar1 = *(int *)(*param_1 + 4);
  FUN_00406db0(param_1);
  iVar5 = uVar4 + iVar1;
  if (iVar5 < 0) {
    iVar5 = 0;
  }
  piVar2 = FUN_0040d470((int *)*param_1,iVar5 + 0xd);
  *param_1 = (int)piVar2;
  piVar2[1] = iVar5;
  piVar2[2] = -1;
  *(undefined1 *)((int)piVar2 + iVar5 + 0xc) = 0;
  puVar6 = (undefined4 *)(*param_2 + 0xc);
  puVar7 = (undefined4 *)(*param_1 + 0xc + iVar1);
  for (uVar3 = uVar4 >> 2; uVar3 != 0; uVar3 = uVar3 - 1) {
    *puVar7 = *puVar6;
    puVar6 = puVar6 + 1;
    puVar7 = puVar7 + 1;
  }
  for (uVar4 = uVar4 & 3; uVar4 != 0; uVar4 = uVar4 - 1) {
    *(undefined1 *)puVar7 = *(undefined1 *)puVar6;
    puVar6 = (undefined4 *)((int)puVar6 + 1);
    puVar7 = (undefined4 *)((int)puVar7 + 1);
  }
  return param_1;
}



/******************************************************************************/
/* TARGET 00407e30  FUN_00407e30 */
/******************************************************************************/

int * __fastcall FUN_00407e30(int *param_1,LPCSTR param_2)

{
  int iVar1;
  int *piVar2;
  uint uVar3;
  uint uVar4;
  int iVar5;
  CHAR *pCVar6;
  
  uVar4 = 0;
  iVar1 = *(int *)(*param_1 + 4);
  if (param_2 != (LPCSTR)0x0) {
    uVar4 = lstrlenA(param_2);
  }
  FUN_00406db0(param_1);
  iVar5 = iVar1 + uVar4;
  if (iVar5 < 0) {
    iVar5 = 0;
  }
  piVar2 = FUN_0040d470((int *)*param_1,iVar5 + 0xd);
  *param_1 = (int)piVar2;
  piVar2[1] = iVar5;
  piVar2[2] = -1;
  *(undefined1 *)((int)piVar2 + iVar5 + 0xc) = 0;
  pCVar6 = (CHAR *)(*param_1 + 0xc + iVar1);
  for (uVar3 = uVar4 >> 2; uVar3 != 0; uVar3 = uVar3 - 1) {
    *(undefined4 *)pCVar6 = *(undefined4 *)param_2;
    param_2 = param_2 + 4;
    pCVar6 = pCVar6 + 4;
  }
  for (uVar4 = uVar4 & 3; uVar4 != 0; uVar4 = uVar4 - 1) {
    *pCVar6 = *param_2;
    param_2 = param_2 + 1;
    pCVar6 = pCVar6 + 1;
  }
  return param_1;
}



/******************************************************************************/
/* TARGET 00407ea0  FUN_00407ea0 */
/******************************************************************************/

int * __fastcall FUN_00407ea0(int *param_1,undefined1 param_2)

{
  int iVar1;
  int *piVar2;
  int iVar3;
  
  iVar1 = *(int *)(*param_1 + 4);
  FUN_00406db0(param_1);
  iVar3 = iVar1 + 1;
  if (iVar3 < 0) {
    iVar3 = 0;
  }
  piVar2 = FUN_0040d470((int *)*param_1,iVar3 + 0xd);
  *param_1 = (int)piVar2;
  piVar2[1] = iVar3;
  piVar2[2] = -1;
  *(undefined1 *)((int)piVar2 + iVar3 + 0xc) = 0;
  *(undefined1 *)(*param_1 + 0xc + iVar1) = param_2;
  return param_1;
}



/******************************************************************************/
/* TARGET 00407ef0  FUN_00407ef0 */
/******************************************************************************/

int * __fastcall FUN_00407ef0(int *param_1,int *param_2,int *param_3)

{
  uint uVar1;
  undefined4 *puVar2;
  uint uVar3;
  uint uVar4;
  int iVar5;
  undefined4 *puVar6;
  
  uVar4 = *(uint *)(*param_3 + 4);
  uVar1 = *(uint *)(*param_2 + 4);
  iVar5 = uVar4 + uVar1;
  if (iVar5 < 0) {
    iVar5 = 0;
  }
  puVar2 = FUN_0040d3a0(iVar5 + 0xd);
  *param_1 = (int)puVar2;
  *puVar2 = 1;
  puVar2[1] = iVar5;
  puVar2[2] = 0xffffffff;
  *(undefined1 *)((int)puVar2 + iVar5 + 0xc) = 0;
  puVar2 = (undefined4 *)(*param_2 + 0xc);
  puVar6 = (undefined4 *)(*param_1 + 0xc);
  for (uVar3 = uVar1 >> 2; uVar3 != 0; uVar3 = uVar3 - 1) {
    *puVar6 = *puVar2;
    puVar2 = puVar2 + 1;
    puVar6 = puVar6 + 1;
  }
  for (uVar3 = uVar1 & 3; uVar3 != 0; uVar3 = uVar3 - 1) {
    *(undefined1 *)puVar6 = *(undefined1 *)puVar2;
    puVar2 = (undefined4 *)((int)puVar2 + 1);
    puVar6 = (undefined4 *)((int)puVar6 + 1);
  }
  puVar2 = (undefined4 *)(*param_3 + 0xc);
  puVar6 = (undefined4 *)(*param_1 + 0xc + uVar1);
  for (uVar3 = uVar4 >> 2; uVar3 != 0; uVar3 = uVar3 - 1) {
    *puVar6 = *puVar2;
    puVar2 = puVar2 + 1;
    puVar6 = puVar6 + 1;
  }
  for (uVar4 = uVar4 & 3; uVar4 != 0; uVar4 = uVar4 - 1) {
    *(undefined1 *)puVar6 = *(undefined1 *)puVar2;
    puVar2 = (undefined4 *)((int)puVar2 + 1);
    puVar6 = (undefined4 *)((int)puVar6 + 1);
  }
  return param_1;
}



/******************************************************************************/
/* TARGET 00407f80  FUN_00407f80 */
/******************************************************************************/

int * __fastcall FUN_00407f80(int *param_1,int *param_2,LPCSTR param_3)

{
  uint uVar1;
  undefined4 *puVar2;
  uint uVar3;
  int iVar4;
  undefined4 *puVar5;
  CHAR *pCVar6;
  uint local_4;
  
  local_4 = 0;
  uVar1 = *(uint *)(*param_2 + 4);
  if (param_3 != (LPCSTR)0x0) {
    local_4 = lstrlenA(param_3);
  }
  iVar4 = local_4 + uVar1;
  if (iVar4 < 0) {
    iVar4 = 0;
  }
  puVar2 = FUN_0040d3a0(iVar4 + 0xd);
  *param_1 = (int)puVar2;
  *puVar2 = 1;
  puVar2[1] = iVar4;
  puVar2[2] = 0xffffffff;
  *(undefined1 *)((int)puVar2 + iVar4 + 0xc) = 0;
  puVar2 = (undefined4 *)(*param_2 + 0xc);
  puVar5 = (undefined4 *)(*param_1 + 0xc);
  for (uVar3 = uVar1 >> 2; uVar3 != 0; uVar3 = uVar3 - 1) {
    *puVar5 = *puVar2;
    puVar2 = puVar2 + 1;
    puVar5 = puVar5 + 1;
  }
  for (uVar3 = uVar1 & 3; uVar3 != 0; uVar3 = uVar3 - 1) {
    *(undefined1 *)puVar5 = *(undefined1 *)puVar2;
    puVar2 = (undefined4 *)((int)puVar2 + 1);
    puVar5 = (undefined4 *)((int)puVar5 + 1);
  }
  pCVar6 = (CHAR *)(*param_1 + 0xc + uVar1);
  for (uVar3 = local_4 >> 2; uVar3 != 0; uVar3 = uVar3 - 1) {
    *(undefined4 *)pCVar6 = *(undefined4 *)param_3;
    param_3 = param_3 + 4;
    pCVar6 = pCVar6 + 4;
  }
  for (local_4 = local_4 & 3; local_4 != 0; local_4 = local_4 - 1) {
    *pCVar6 = *param_3;
    param_3 = param_3 + 1;
    pCVar6 = pCVar6 + 1;
  }
  return param_1;
}



/******************************************************************************/
/* TARGET 00408020  FUN_00408020 */
/******************************************************************************/

int * __fastcall FUN_00408020(int *param_1,undefined1 param_2,int *param_3)

{
  undefined4 *puVar1;
  uint uVar2;
  uint uVar3;
  int iVar4;
  undefined4 *puVar5;
  
  uVar3 = *(uint *)(*param_3 + 4);
  iVar4 = uVar3 + 1;
  if (iVar4 < 0) {
    iVar4 = 0;
  }
  puVar1 = FUN_0040d3a0(iVar4 + 0xd);
  *param_1 = (int)puVar1;
  *puVar1 = 1;
  puVar1[1] = iVar4;
  puVar1[2] = 0xffffffff;
  *(undefined1 *)((int)puVar1 + iVar4 + 0xc) = 0;
  *(undefined1 *)(*param_1 + 0xc) = param_2;
  puVar1 = (undefined4 *)(*param_3 + 0xc);
  puVar5 = (undefined4 *)(*param_1 + 0xd);
  for (uVar2 = uVar3 >> 2; uVar2 != 0; uVar2 = uVar2 - 1) {
    *puVar5 = *puVar1;
    puVar1 = puVar1 + 1;
    puVar5 = puVar5 + 1;
  }
  for (uVar3 = uVar3 & 3; uVar3 != 0; uVar3 = uVar3 - 1) {
    *(undefined1 *)puVar5 = *(undefined1 *)puVar1;
    puVar1 = (undefined4 *)((int)puVar1 + 1);
    puVar5 = (undefined4 *)((int)puVar5 + 1);
  }
  return param_1;
}



/******************************************************************************/
/* TARGET 00408090  FUN_00408090 */
/******************************************************************************/

int * __fastcall FUN_00408090(int *param_1,int *param_2,undefined1 param_3)

{
  uint uVar1;
  undefined4 *puVar2;
  uint uVar3;
  int iVar4;
  undefined4 *puVar5;
  
  uVar1 = *(uint *)(*param_2 + 4);
  iVar4 = uVar1 + 1;
  if (iVar4 < 0) {
    iVar4 = 0;
  }
  puVar2 = FUN_0040d3a0(iVar4 + 0xd);
  *param_1 = (int)puVar2;
  *puVar2 = 1;
  puVar2[1] = iVar4;
  puVar2[2] = 0xffffffff;
  *(undefined1 *)((int)puVar2 + iVar4 + 0xc) = 0;
  puVar2 = (undefined4 *)(*param_2 + 0xc);
  puVar5 = (undefined4 *)(*param_1 + 0xc);
  for (uVar3 = uVar1 >> 2; uVar3 != 0; uVar3 = uVar3 - 1) {
    *puVar5 = *puVar2;
    puVar2 = puVar2 + 1;
    puVar5 = puVar5 + 1;
  }
  for (uVar3 = uVar1 & 3; uVar3 != 0; uVar3 = uVar3 - 1) {
    *(undefined1 *)puVar5 = *(undefined1 *)puVar2;
    puVar2 = (undefined4 *)((int)puVar2 + 1);
    puVar5 = (undefined4 *)((int)puVar5 + 1);
  }
  *(undefined1 *)(*param_1 + 0xc + uVar1) = param_3;
  return param_1;
}



/******************************************************************************/
/* TARGET 00408100  FUN_00408100 */
/******************************************************************************/

undefined4 __fastcall FUN_00408100(int *param_1,int *param_2)

{
  int iVar1;
  char *pcVar2;
  char *pcVar3;
  bool bVar4;
  
  iVar1 = *(int *)(*param_1 + 4);
  if (iVar1 == *(int *)(*param_2 + 4)) {
    bVar4 = true;
    pcVar2 = (char *)(*param_1 + 0xc);
    pcVar3 = (char *)(*param_2 + 0xc);
    do {
      if (iVar1 == 0) break;
      iVar1 = iVar1 + -1;
      bVar4 = *pcVar2 == *pcVar3;
      pcVar2 = pcVar2 + 1;
      pcVar3 = pcVar3 + 1;
    } while (bVar4);
    if (bVar4) {
      return 1;
    }
  }
  return 0;
}



/******************************************************************************/
/* TARGET 00408130  FUN_00408130 */
/******************************************************************************/

undefined4 __fastcall FUN_00408130(int *param_1,LPCSTR param_2)

{
  int iVar1;
  char *pcVar2;
  bool bVar3;
  
  iVar1 = 0;
  if (param_2 != (LPCSTR)0x0) {
    iVar1 = lstrlenA(param_2);
  }
  if (iVar1 == *(int *)(*param_1 + 4)) {
    bVar3 = true;
    pcVar2 = (char *)(*param_1 + 0xc);
    do {
      if (iVar1 == 0) break;
      iVar1 = iVar1 + -1;
      bVar3 = *pcVar2 == *param_2;
      pcVar2 = pcVar2 + 1;
      param_2 = param_2 + 1;
    } while (bVar3);
    if (bVar3) {
      return 1;
    }
  }
  return 0;
}



/******************************************************************************/
/* TARGET 00408170  FUN_00408170 */
/******************************************************************************/

undefined4 __fastcall FUN_00408170(int *param_1,char param_2)

{
  if ((*(int *)(*param_1 + 4) == 1) && (*(char *)(*param_1 + 0xc) == param_2)) {
    return 1;
  }
  return 0;
}



/******************************************************************************/
/* TARGET 00408190  FUN_00408190 */
/******************************************************************************/

undefined4 __fastcall FUN_00408190(int *param_1,int *param_2)

{
  int iVar1;
  char *pcVar2;
  char *pcVar3;
  bool bVar4;
  
  iVar1 = *(int *)(*param_1 + 4);
  if (iVar1 == *(int *)(*param_2 + 4)) {
    bVar4 = true;
    pcVar2 = (char *)(*param_1 + 0xc);
    pcVar3 = (char *)(*param_2 + 0xc);
    do {
      if (iVar1 == 0) break;
      iVar1 = iVar1 + -1;
      bVar4 = *pcVar2 == *pcVar3;
      pcVar2 = pcVar2 + 1;
      pcVar3 = pcVar3 + 1;
    } while (bVar4);
    if (bVar4) {
      return 0;
    }
  }
  return 1;
}



/******************************************************************************/
/* TARGET 004081c0  FUN_004081c0 */
/******************************************************************************/

bool __fastcall FUN_004081c0(int *param_1,int *param_2)

{
  int iVar1;
  
  iVar1 = CompareStringA(0x400,0,(PCNZCH)(*param_1 + 0xc),*(int *)(*param_1 + 4),
                         (PCNZCH)(*param_2 + 0xc),*(int *)(*param_2 + 4));
  return iVar1 < 3;
}



/******************************************************************************/
/* TARGET 004081f0  thunk_FUN_00408200 */
/******************************************************************************/

void __fastcall thunk_FUN_00408200(int *param_1)

{
  int *piVar1;
  
  FUN_00408260(param_1,param_1[1]);
  piVar1 = FUN_0040d470((int *)*param_1,0);
  *param_1 = (int)piVar1;
  param_1[2] = 0;
  return;
}



/******************************************************************************/
/* TARGET 00408200  FUN_00408200 */
/******************************************************************************/

void __fastcall FUN_00408200(int *param_1)

{
  int *piVar1;
  
  FUN_00408260(param_1,param_1[1]);
  piVar1 = FUN_0040d470((int *)*param_1,0);
  *param_1 = (int)piVar1;
  param_1[2] = 0;
  return;
}



/******************************************************************************/
/* TARGET 00408220  FUN_00408220 */
/******************************************************************************/

undefined4 * __fastcall FUN_00408220(int *param_1,uint param_2)

{
  if (param_2 < (uint)param_1[1]) {
    return (undefined4 *)(*param_1 + param_2 * 4);
  }
  return &DAT_00437078;
}



/******************************************************************************/
/* TARGET 00408240  FUN_00408240 */
/******************************************************************************/

void __fastcall FUN_00408240(int *param_1,uint param_2,undefined4 *param_3)

{
  if (param_2 < (uint)param_1[1]) {
    FUN_00407cc0((undefined4 *)(*param_1 + param_2 * 4),param_3);
  }
  return;
}



/******************************************************************************/
/* TARGET 00408260  FUN_00408260 */
/******************************************************************************/

void __fastcall FUN_00408260(int *param_1,int param_2)

{
  int iVar1;
  undefined4 *puVar2;
  
  iVar1 = param_1[1];
  if (iVar1 < param_2) {
    param_2 = iVar1;
  }
  puVar2 = (undefined4 *)(*param_1 + -4 + iVar1 * 4);
  param_1[1] = iVar1 - param_2;
  if (0 < param_2) {
    do {
      FUN_00406610(puVar2);
      puVar2 = puVar2 + -1;
      param_2 = param_2 + -1;
    } while (param_2 != 0);
  }
  return;
}



/******************************************************************************/
/* TARGET 00408290  FUN_00408290 */
/******************************************************************************/

int __fastcall FUN_00408290(int *param_1)

{
  int iVar1;
  
  iVar1 = param_1[1];
  if (param_1[2] <= iVar1) {
    FUN_00401850(param_1);
  }
  param_1[1] = iVar1 + 1;
  FUN_00406630((undefined4 *)(*param_1 + iVar1 * 4));
  return iVar1;
}



/******************************************************************************/
/* TARGET 004082c0  FUN_004082c0 */
/******************************************************************************/

int __fastcall FUN_004082c0(int *param_1,uint param_2)

{
  int iVar1;
  
  iVar1 = param_1[1];
  if (param_1[2] <= iVar1) {
    FUN_00401850(param_1);
  }
  param_1[1] = iVar1 + 1U;
  if (param_2 < iVar1 + 1U) {
    FUN_00401090((void *)(*param_1 + iVar1 * 4),*(int **)(*param_1 + param_2 * 4));
    return iVar1;
  }
  FUN_00406630((undefined4 *)(*param_1 + iVar1 * 4));
  return iVar1;
}



/******************************************************************************/
/* TARGET 00408310  FUN_00408310 */
/******************************************************************************/

int __fastcall FUN_00408310(int *param_1,uint param_2,int param_3)

{
  int iVar1;
  int *piVar2;
  int iVar3;
  int iVar4;
  
  iVar1 = param_1[1];
  if (param_1[2] <= iVar1) {
    FUN_00401850(param_1);
  }
  param_1[1] = iVar1 + 1U;
  if (param_2 < iVar1 + 1U) {
    piVar2 = *(int **)(*param_1 + param_2 * 4);
    FUN_00401090((void *)(*param_1 + iVar1 * 4),piVar2);
    param_3 = param_3 + -1;
    if (0 < param_3) {
      do {
        iVar4 = param_1[1];
        if (param_1[2] <= iVar4) {
          FUN_00401850(param_1);
        }
        param_1[1] = iVar4 + 1;
        FUN_00401090((void *)(*param_1 + iVar4 * 4),piVar2);
        param_3 = param_3 + -1;
      } while (param_3 != 0);
      return iVar1;
    }
  }
  else {
    FUN_00406630((undefined4 *)(*param_1 + iVar1 * 4));
    iVar4 = param_3 + -1;
    if (0 < iVar4) {
      do {
        iVar3 = param_1[1];
        if (param_1[2] <= iVar3) {
          FUN_00401850(param_1);
        }
        param_1[1] = iVar3 + 1;
        FUN_00406630((undefined4 *)(*param_1 + iVar3 * 4));
        iVar4 = iVar4 + -1;
      } while (iVar4 != 0);
    }
  }
  return iVar1;
}



/******************************************************************************/
/* TARGET 004083d0  FUN_004083d0 */
/******************************************************************************/

void __fastcall FUN_004083d0(int *param_1)

{
  int *piVar1;
  int iVar2;
  int iVar3;
  undefined4 *puVar4;
  
  iVar3 = param_1[3];
  param_1[3] = iVar3 + 0x28;
  piVar1 = FUN_0040d470((int *)*param_1,(iVar3 + 0x28) * 0xac);
  *param_1 = (int)piVar1;
  piVar1 = FUN_0040d470((int *)param_1[1],param_1[3]);
  param_1[1] = (int)piVar1;
  puVar4 = (undefined4 *)((int)piVar1 + iVar3);
  for (iVar2 = 10; iVar2 != 0; iVar2 = iVar2 + -1) {
    *puVar4 = 0;
    puVar4 = puVar4 + 1;
  }
  piVar1 = (int *)(*param_1 + -0xac + iVar3 * 0xac);
  iVar2 = 0x28;
  do {
    piVar1 = piVar1 + 0x2b;
    iVar3 = iVar3 + 1;
    iVar2 = iVar2 + -1;
    *piVar1 = iVar3;
  } while (iVar2 != 0);
  *piVar1 = param_1[4];
  param_1[4] = param_1[3] + -0x28;
  return;
}



/******************************************************************************/
/* TARGET 00408450  FUN_00408450 */
/******************************************************************************/

void __fastcall FUN_00408450(undefined4 *param_1)

{
  *param_1 = 0;
  param_1[1] = 0;
  param_1[2] = 0;
  param_1[3] = 0;
  param_1[4] = 0xffffffff;
  return;
}



/******************************************************************************/
/* TARGET 00408480  FUN_00408480 */
/******************************************************************************/

void __fastcall FUN_00408480(int *param_1)

{
  uint uVar1;
  int *piVar2;
  
  uVar1 = param_1[3];
  while (uVar1 = uVar1 - 1, -1 < (int)uVar1) {
    FUN_004084c0(param_1,uVar1);
  }
  piVar2 = FUN_0040d470((int *)*param_1,0);
  *param_1 = (int)piVar2;
  piVar2 = FUN_0040d470((int *)param_1[1],0);
  param_1[1] = (int)piVar2;
  param_1[2] = 0;
  param_1[3] = 0;
  param_1[4] = -1;
  return;
}



/******************************************************************************/
/* TARGET 004084c0  FUN_004084c0 */
/******************************************************************************/

void __fastcall FUN_004084c0(int *param_1,uint param_2)

{
  HGDIOBJ ho;
  int iVar1;
  int iVar2;
  
  if ((param_2 < (uint)param_1[3]) && (*(char *)(param_2 + param_1[1]) != '\0')) {
    iVar2 = param_2 * 0xac + *param_1;
    FUN_00406610((undefined4 *)(iVar2 + 0x14));
    FUN_00401030((int *)(iVar2 + 0x18));
    thunk_FUN_00402520((int *)(iVar2 + 0x1c));
    FUN_0040d410(*(int **)(iVar2 + 0x20));
    ho = *(HGDIOBJ *)(iVar2 + 0x6c);
    if ((ho != DAT_004375c0) && ((ho != DAT_00437450 && (ho != (HGDIOBJ)0x0)))) {
      DeleteObject(ho);
    }
    FUN_004160d0(*(int *)(iVar2 + 0x70));
    iVar1 = *(int *)(iVar2 + 0x88) * *(int *)(iVar2 + 0x84);
    while (iVar1 = iVar1 + -1, -1 < iVar1) {
      FUN_00406610((undefined4 *)(*(int *)(iVar2 + 0x8c) + iVar1 * 4));
    }
    FUN_0040d410(*(int **)(iVar2 + 0x8c));
    FUN_0040d410(*(int **)(iVar2 + 0x90));
    *(int *)(*param_1 + param_2 * 0xac) = param_1[4];
    *(undefined1 *)(param_2 + param_1[1]) = 0;
    param_1[4] = param_2;
    param_1[2] = param_1[2] + -1;
  }
  return;
}



/******************************************************************************/
/* TARGET 004085b0  FUN_004085b0 */
/******************************************************************************/

int __fastcall FUN_004085b0(int *param_1)

{
  int iVar1;
  int iVar2;
  undefined4 *puVar3;
  undefined4 *puVar4;
  
  if (param_1[4] < 0) {
    FUN_004083d0(param_1);
  }
  iVar1 = param_1[4];
  param_1[4] = *(int *)(iVar1 * 0xac + *param_1);
  *(undefined1 *)(param_1[1] + iVar1) = 1;
  puVar3 = (undefined4 *)(iVar1 * 0xac + *param_1);
  puVar4 = puVar3;
  for (iVar2 = 0x2b; iVar2 != 0; iVar2 = iVar2 + -1) {
    *puVar4 = 0;
    puVar4 = puVar4 + 1;
  }
  FUN_00406630(puVar3 + 5);
  FUN_00401070(puVar3 + 6);
  FUN_004025d0(puVar3 + 7);
  puVar3[0x27] = 0x9999999a;
  puVar3[8] = 0;
  puVar3[0x1b] = 0;
  puVar3[0x26] = 9000;
  puVar3[0x28] = 0x3fb99999;
  puVar3[3] = iVar1;
  puVar3[4] = iVar1;
  param_1[2] = param_1[2] + 1;
  return iVar1;
}



/******************************************************************************/
/* TARGET 00408650  FUN_00408650 */
/******************************************************************************/

void FUN_00408650(void)

{
  uint uVar1;
  undefined4 *puVar2;
  undefined4 *puVar3;
  
  puVar2 = &DAT_00436f5c;
  puVar3 = DAT_00436f48;
  for (uVar1 = DAT_00436fc4 >> 2; uVar1 != 0; uVar1 = uVar1 - 1) {
    *puVar3 = *puVar2;
    puVar2 = puVar2 + 1;
    puVar3 = puVar3 + 1;
  }
  for (uVar1 = DAT_00436fc4 & 3; uVar1 != 0; uVar1 = uVar1 - 1) {
    *(undefined1 *)puVar3 = *(undefined1 *)puVar2;
    puVar2 = (undefined4 *)((int)puVar2 + 1);
    puVar3 = (undefined4 *)((int)puVar3 + 1);
  }
  DAT_00436f48 = (undefined4 *)((int)DAT_00436f48 + DAT_00436fc4);
  DAT_00436fc4 = 2;
  return;
}



/******************************************************************************/
/* TARGET 00408690  FUN_00408690 */
/******************************************************************************/

void __fastcall FUN_00408690(int param_1,int param_2)

{
  int iVar1;
  int iVar2;
  
  iVar1 = DAT_00436f54 + param_2;
  iVar2 = param_1 << ((byte)DAT_00436f54 & 0x1f);
  DAT_00436f5c._0_2_ = (ushort)DAT_00436f5c | (ushort)iVar2;
  if (0x10 < iVar1) {
    FUN_00408650();
    iVar1 = iVar1 + -0x10;
    DAT_00436f5c._0_2_ = (ushort)((uint)iVar2 >> 0x10);
  }
  DAT_00436f54 = iVar1;
  return;
}



/******************************************************************************/
/* TARGET 004086d0  FUN_004086d0 */
/******************************************************************************/

void FUN_004086d0(void)

{
  FUN_00408690(0,1);
  *(undefined1 *)((int)&DAT_00436f5c + DAT_00436fc4) = *DAT_00436fc8;
  DAT_00436fc8 = DAT_00436fc8 + 1;
  DAT_00436f50 = DAT_00436f50 + -1;
  DAT_00436fc4 = DAT_00436fc4 + 1;
  return;
}



/******************************************************************************/
/* TARGET 00408710  FUN_00408710 */
/******************************************************************************/

int __cdecl FUN_00408710(int param_1,char *param_2,int param_3,int param_4)

{
  int iVar1;
  int iVar2;
  int iVar3;
  
  DAT_00436f4c = param_1;
  DAT_00436f48 = param_1;
  DAT_00436f44 = param_2;
  DAT_00436fc8 = param_2;
  DAT_00436f50 = param_3;
  if (param_3 < 1) {
    return 0;
  }
  if ((param_3 < param_4) || (param_4 < 2)) {
    param_4 = param_3;
  }
  DAT_00436f54 = 0;
  DAT_00436fc4 = 2;
  DAT_00436f5c._0_2_ = 0;
  FUN_004086d0();
  for (iVar1 = param_4; 0 < iVar1; iVar1 = iVar1 + -1) {
    if (DAT_00436f50 < 1) goto LAB_004089d0;
    iVar2 = 0;
    if (DAT_00436f50 < 1) {
LAB_00408809:
      if ((DAT_00436f44 + 1 < DAT_00436fc8) && (*DAT_00436fc8 == DAT_00436fc8[-2])) {
        FUN_00408690(0xd,6);
        DAT_00436fc8 = DAT_00436fc8 + 1;
        DAT_00436f50 = DAT_00436f50 + -1;
      }
      else {
        FUN_004086d0();
      }
    }
    else {
      do {
        if (DAT_00436fc8[-1] != DAT_00436fc8[iVar2]) break;
        iVar2 = iVar2 + 1;
      } while (iVar2 < DAT_00436f50);
      if (iVar2 < 1) goto LAB_00408809;
      DAT_00436fc8 = DAT_00436fc8 + iVar2;
      DAT_00436f50 = DAT_00436f50 - iVar2;
      do {
        if (iVar2 == 1) {
          FUN_00408690(1,3);
          break;
        }
        if (iVar2 < 0x16) {
          iVar3 = iVar2;
          if (7 < iVar2) {
            iVar3 = 7;
          }
          FUN_00408690(iVar3 * 8 + 5,6);
          iVar3 = -iVar3;
        }
        else {
          FUN_00408690(5,6);
          iVar3 = -0x16;
        }
        iVar2 = iVar2 + iVar3;
      } while (0 < iVar2);
    }
  }
joined_r0x00408861:
  do {
    if (DAT_00436f50 < 1) {
LAB_004089d0:
      FUN_00408650();
      return DAT_00436f48 - DAT_00436f4c;
    }
    iVar1 = 0;
    if (0 < DAT_00436f50) {
      do {
        if (DAT_00436fc8[-1] != DAT_00436fc8[iVar1]) break;
        iVar1 = iVar1 + 1;
      } while (iVar1 < DAT_00436f50);
    }
    iVar2 = 0;
    if (0 < DAT_00436f50) {
      do {
        if (DAT_00436fc8[iVar2 - param_4] != DAT_00436fc8[iVar2]) break;
        iVar2 = iVar2 + 1;
      } while (iVar2 < DAT_00436f50);
    }
    if ((0 < iVar1) || (0 < iVar2)) {
      if (iVar1 < iVar2) {
        DAT_00436fc8 = DAT_00436fc8 + iVar2;
        DAT_00436f50 = DAT_00436f50 - iVar2;
        for (; 0 < iVar2; iVar2 = iVar2 + iVar1) {
          if (iVar2 == 1) {
            iVar1 = 3;
            goto LAB_004089b8;
          }
          if (iVar2 < 0x16) {
            iVar1 = iVar2;
            if (7 < iVar2) {
              iVar1 = 7;
            }
            FUN_00408690(iVar1 * 8 + 7,6);
            iVar1 = -iVar1;
          }
          else {
            FUN_00408690(7,6);
            iVar1 = -0x16;
          }
        }
      }
      else {
        DAT_00436fc8 = DAT_00436fc8 + iVar1;
        DAT_00436f50 = DAT_00436f50 - iVar1;
        if (0 < iVar1) {
          while (iVar1 != 1) {
            if (iVar1 < 0x16) {
              iVar2 = iVar1;
              if (7 < iVar1) {
                iVar2 = 7;
              }
              FUN_00408690(iVar2 * 8 + 5,6);
              iVar2 = -iVar2;
            }
            else {
              FUN_00408690(5,6);
              iVar2 = -0x16;
            }
            iVar1 = iVar1 + iVar2;
            if (iVar1 < 1) goto joined_r0x00408861;
          }
          iVar1 = 1;
LAB_004089b8:
          FUN_00408690(iVar1,3);
        }
      }
      goto joined_r0x00408861;
    }
    if (*DAT_00436fc8 == DAT_00436fc8[-2]) {
      iVar1 = 0xd;
LAB_004088b0:
      FUN_00408690(iVar1,6);
      DAT_00436fc8 = DAT_00436fc8 + 1;
      DAT_00436f50 = DAT_00436f50 + -1;
    }
    else {
      if (*DAT_00436fc8 == DAT_00436fc8[1 - param_4]) {
        iVar1 = 0xf;
        goto LAB_004088b0;
      }
      FUN_004086d0();
    }
  } while( true );
}



/******************************************************************************/
/* TARGET 004089f0  FUN_004089f0 */
/******************************************************************************/

uint FUN_004089f0(void)

{
  ushort uVar1;
  uint uVar2;
  ushort local_4;
  
  uVar2 = DAT_00436fc0 & 1;
  local_4 = (ushort)DAT_00436fc0;
  if (local_4 >> 1 == 0) {
    uVar1 = *DAT_00436fc8;
    DAT_00436fc8 = DAT_00436fc8 + 1;
    DAT_00436fc0 = CONCAT22(DAT_00436fc0._2_2_,CONCAT11((byte)(uVar1 >> 9),(char)(uVar1 >> 1))) |
                   0x8000;
    return uVar1 & 1;
  }
  DAT_00436fc0 = CONCAT22(DAT_00436fc0._2_2_,local_4 >> 1);
  return uVar2;
}



/******************************************************************************/
/* TARGET 00408a50  FUN_00408a50 */
/******************************************************************************/

void __cdecl FUN_00408a50(undefined1 *param_1,undefined1 *param_2,int param_3,int param_4)

{
  int iVar1;
  uint uVar2;
  undefined1 uVar3;
  uint uVar4;
  
  if ((param_3 < param_4) || (param_4 < 2)) {
    param_4 = param_3;
  }
  iVar1 = -param_4;
  DAT_00436fc0._0_2_ = 0;
  DAT_00436f4c = param_1;
  DAT_00436f48 = param_1;
  DAT_00436f44 = param_2;
  DAT_00436fc8 = param_2;
  DAT_00436f50 = param_3;
joined_r0x00408a96:
  do {
    while( true ) {
      while( true ) {
        while( true ) {
          if (param_3 < 1) {
            return;
          }
          uVar2 = FUN_004089f0();
          if (uVar2 != 0) break;
          *DAT_00436f48 = *DAT_00436fc8;
          DAT_00436f48 = DAT_00436f48 + 1;
          DAT_00436fc8 = DAT_00436fc8 + 1;
          param_3 = param_3 + -1;
        }
        uVar2 = FUN_004089f0();
        if (uVar2 != 0) break;
        uVar2 = FUN_004089f0();
        if (uVar2 == 0) {
          *DAT_00436f48 = DAT_00436f48[-1];
          DAT_00436f48 = DAT_00436f48 + 1;
          param_3 = param_3 + -1;
        }
        else {
          uVar2 = FUN_004089f0();
          uVar4 = (uint)(uVar2 != 0);
          uVar2 = FUN_004089f0();
          if (uVar2 != 0) {
            uVar4 = uVar4 | 2;
          }
          uVar2 = FUN_004089f0();
          if (uVar2 != 0) {
            uVar4 = uVar4 | 4;
          }
          if (uVar4 == 0) {
            uVar4 = 0x16;
          }
          else if (uVar4 == 1) {
            uVar3 = DAT_00436f48[-2];
            goto LAB_00408b42;
          }
          param_3 = param_3 - uVar4;
          uVar3 = DAT_00436f48[-1];
          do {
            *DAT_00436f48 = uVar3;
            DAT_00436f48 = DAT_00436f48 + 1;
            uVar4 = uVar4 - 1;
          } while (0 < (int)uVar4);
        }
      }
      uVar2 = FUN_004089f0();
      if (uVar2 != 0) break;
      uVar3 = DAT_00436f48[iVar1];
LAB_00408b42:
      *DAT_00436f48 = uVar3;
      DAT_00436f48 = DAT_00436f48 + 1;
      param_3 = param_3 + -1;
    }
    uVar2 = FUN_004089f0();
    uVar4 = (uint)(uVar2 != 0);
    uVar2 = FUN_004089f0();
    if (uVar2 != 0) {
      uVar4 = uVar4 | 2;
    }
    uVar2 = FUN_004089f0();
    if (uVar2 != 0) {
      uVar4 = uVar4 | 4;
    }
    if (uVar4 == 0) {
      uVar4 = 0x16;
LAB_00408bea:
      param_3 = param_3 - uVar4;
      do {
        *DAT_00436f48 = DAT_00436f48[iVar1];
        DAT_00436f48 = DAT_00436f48 + 1;
        uVar4 = uVar4 - 1;
      } while (0 < (int)uVar4);
      goto joined_r0x00408a96;
    }
    if (uVar4 != 1) goto LAB_00408bea;
    *DAT_00436f48 = DAT_00436f48[iVar1 + 1];
    DAT_00436f48 = DAT_00436f48 + 1;
    param_3 = param_3 + -1;
  } while( true );
}



/******************************************************************************/
/* TARGET 00408c20  FUN_00408c20 */
/******************************************************************************/

void __cdecl FUN_00408c20(HWND param_1)

{
  HDC hdc;
  HPALETTE hPal;
  
  hdc = GetDC(param_1);
  hPal = SelectPalette(hdc,DAT_00437274,0);
  RealizePalette(hdc);
  SelectPalette(hdc,hPal,0);
  ReleaseDC(param_1,hdc);
  return;
}



/******************************************************************************/
/* TARGET 00408ca0  FUN_00408ca0 */
/******************************************************************************/

void FUN_00408ca0(void)

{
  FUN_004064c0(&DAT_0043706c);
  return;
}



/******************************************************************************/
/* TARGET 00408cb0  FUN_00408cb0 */
/******************************************************************************/

void FUN_00408cb0(void)

{
  FUN_0040d9b0(0x408cc0);
  return;
}



/******************************************************************************/
/* TARGET 00408ce0  FUN_00408ce0 */
/******************************************************************************/

void FUN_00408ce0(void)

{
  FUN_004064c0((undefined4 *)&DAT_0043711c);
  return;
}



/******************************************************************************/
/* TARGET 00408cf0  FUN_00408cf0 */
/******************************************************************************/

void FUN_00408cf0(void)

{
  FUN_0040d9b0(0x408d00);
  return;
}



/******************************************************************************/
/* TARGET 00408d20  FUN_00408d20 */
/******************************************************************************/

void FUN_00408d20(void)

{
  FUN_004064c0(&DAT_00437078);
  return;
}



/******************************************************************************/
/* TARGET 00408d30  FUN_00408d30 */
/******************************************************************************/

void FUN_00408d30(void)

{
  FUN_0040d9b0(0x408d40);
  return;
}



/******************************************************************************/
/* TARGET 00408d60  FUN_00408d60 */
/******************************************************************************/

void FUN_00408d60(void)

{
  FUN_00401000((undefined4 *)&DAT_0043708c);
  return;
}



/******************************************************************************/
/* TARGET 00408d70  FUN_00408d70 */
/******************************************************************************/

void FUN_00408d70(void)

{
  FUN_0040d9b0(0x408d80);
  return;
}



/******************************************************************************/
/* TARGET 00408da0  FUN_00408da0 */
/******************************************************************************/

void FUN_00408da0(void)

{
  FUN_00401d90((undefined4 *)&DAT_004371c0);
  return;
}



/******************************************************************************/
/* TARGET 00408db0  FUN_00408db0 */
/******************************************************************************/

void FUN_00408db0(void)

{
  FUN_0040d9b0(0x408dc0);
  return;
}



/******************************************************************************/
/* TARGET 00408de0  FUN_00408de0 */
/******************************************************************************/

void FUN_00408de0(void)

{
  FUN_00402540((undefined4 *)&DAT_004371d8);
  return;
}



/******************************************************************************/
/* TARGET 00408df0  FUN_00408df0 */
/******************************************************************************/

void FUN_00408df0(void)

{
  FUN_0040d9b0(0x408e00);
  return;
}



/******************************************************************************/
/* TARGET 00408e20  FUN_00408e20 */
/******************************************************************************/

void FUN_00408e20(void)

{
  FUN_004059a0((undefined4 *)&DAT_00437090);
  return;
}



/******************************************************************************/
/* TARGET 00408e30  FUN_00408e30 */
/******************************************************************************/

void FUN_00408e30(void)

{
  FUN_0040d9b0(0x408e40);
  return;
}



/******************************************************************************/
/* TARGET 00408e60  FUN_00408e60 */
/******************************************************************************/

void FUN_00408e60(void)

{
  FUN_00404800((undefined4 *)&DAT_00437158);
  return;
}



/******************************************************************************/
/* TARGET 00408e70  FUN_00408e70 */
/******************************************************************************/

void FUN_00408e70(void)

{
  FUN_0040d9b0(0x408e80);
  return;
}



/******************************************************************************/
/* TARGET 00408ea0  FUN_00408ea0 */
/******************************************************************************/

void FUN_00408ea0(void)

{
  FUN_004022f0((undefined4 *)&DAT_0043721c);
  return;
}



/******************************************************************************/
/* TARGET 00408eb0  FUN_00408eb0 */
/******************************************************************************/

void FUN_00408eb0(void)

{
  FUN_0040d9b0(0x408ec0);
  return;
}



/******************************************************************************/
/* TARGET 00408ee0  FUN_00408ee0 */
/******************************************************************************/

void FUN_00408ee0(void)

{
  FUN_00401a10(&DAT_00437130);
  return;
}



/******************************************************************************/
/* TARGET 00408ef0  FUN_00408ef0 */
/******************************************************************************/

void FUN_00408ef0(void)

{
  FUN_0040d9b0(0x408f00);
  return;
}



/******************************************************************************/
/* TARGET 00408f20  FUN_00408f20 */
/******************************************************************************/

void FUN_00408f20(void)

{
  FUN_00401a10(&DAT_004371e0);
  return;
}



/******************************************************************************/
/* TARGET 00408f30  FUN_00408f30 */
/******************************************************************************/

void FUN_00408f30(void)

{
  FUN_0040d9b0(0x408f40);
  return;
}



/******************************************************************************/
/* TARGET 00408f60  FUN_00408f60 */
/******************************************************************************/

void FUN_00408f60(void)

{
  FUN_00401a10(&DAT_004371c8);
  return;
}



/******************************************************************************/
/* TARGET 00408f70  FUN_00408f70 */
/******************************************************************************/

void FUN_00408f70(void)

{
  FUN_0040d9b0(0x408f80);
  return;
}



/******************************************************************************/
/* TARGET 00408fa0  FUN_00408fa0 */
/******************************************************************************/

void FUN_00408fa0(void)

{
  FUN_00401a10(&DAT_00437228);
  return;
}



/******************************************************************************/
/* TARGET 00408fb0  FUN_00408fb0 */
/******************************************************************************/

void FUN_00408fb0(void)

{
  FUN_0040d9b0(0x408fc0);
  return;
}



/******************************************************************************/
/* TARGET 00408fe0  FUN_00408fe0 */
/******************************************************************************/

void FUN_00408fe0(void)

{
  FUN_00401a10(&DAT_004371f0);
  return;
}



/******************************************************************************/
/* TARGET 00408ff0  FUN_00408ff0 */
/******************************************************************************/

void FUN_00408ff0(void)

{
  FUN_0040d9b0(0x409000);
  return;
}



/******************************************************************************/
/* TARGET 00409020  FUN_00409020 */
/******************************************************************************/

void FUN_00409020(void)

{
  FUN_00401a10(&DAT_00437210);
  return;
}



/******************************************************************************/
/* TARGET 00409030  FUN_00409030 */
/******************************************************************************/

void FUN_00409030(void)

{
  FUN_0040d9b0(0x409040);
  return;
}



/******************************************************************************/
/* TARGET 00409060  FUN_00409060 */
/******************************************************************************/

void FUN_00409060(void)

{
  FUN_00401a10(&DAT_00437080);
  return;
}



/******************************************************************************/
/* TARGET 00409070  FUN_00409070 */
/******************************************************************************/

void FUN_00409070(void)

{
  FUN_0040d9b0(0x409080);
  return;
}



/******************************************************************************/
/* TARGET 004090a0  FUN_004090a0 */
/******************************************************************************/

void FUN_004090a0(void)

{
  FUN_00401a10(&DAT_00437200);
  return;
}



/******************************************************************************/
/* TARGET 004090b0  FUN_004090b0 */
/******************************************************************************/

void FUN_004090b0(void)

{
  FUN_0040d9b0(0x4090c0);
  return;
}



/******************************************************************************/
/* TARGET 004090e0  FUN_004090e0 */
/******************************************************************************/

void FUN_004090e0(void)

{
  FUN_00401a10(&DAT_00437120);
  return;
}



/******************************************************************************/
/* TARGET 004090f0  FUN_004090f0 */
/******************************************************************************/

void FUN_004090f0(void)

{
  FUN_0040d9b0(0x409100);
  return;
}



/******************************************************************************/
/* TARGET 00409120  FUN_00409120 */
/******************************************************************************/

void FUN_00409120(void)

{
  FUN_00401a10(&DAT_00437108);
  return;
}



/******************************************************************************/
/* TARGET 00409130  FUN_00409130 */
/******************************************************************************/

void FUN_00409130(void)

{
  FUN_0040d9b0(0x409140);
  return;
}



/******************************************************************************/
/* TARGET 00409160  FUN_00409160 */
/******************************************************************************/

void FUN_00409160(void)

{
  FUN_00408450(&DAT_00437238);
  return;
}



/******************************************************************************/
/* TARGET 00409170  FUN_00409170 */
/******************************************************************************/

void FUN_00409170(void)

{
  FUN_0040d9b0(0x409180);
  return;
}



/******************************************************************************/
/* TARGET 00409190  FUN_00409190 */
/******************************************************************************/

void __cdecl FUN_00409190(undefined4 *param_1,undefined4 *param_2)

{
  code *pcVar1;
  
  for (; param_1 < param_2; param_1 = param_1 + 1) {
    pcVar1 = (code *)*param_1;
    if ((pcVar1 != (code *)0x0) && (pcVar1 != (code *)0xffffffff)) {
      (*pcVar1)();
    }
  }
  return;
}



/******************************************************************************/
/* TARGET 004091c0  FUN_004091c0 */
/******************************************************************************/

void __cdecl FUN_004091c0(int param_1)

{
  DAT_004361a4 = param_1;
  DAT_004361a8 = (&DAT_004361b8)[param_1 * 8];
  DAT_004361ac = *(undefined4 *)(&DAT_004361c0 + param_1 * 0x20);
  DAT_00437260 = *(undefined4 *)(&DAT_004361bc + param_1 * 0x20);
  DAT_004361b0 = ((param_1 != 5) - 1U & 2) + 0x2c;
  if (param_1 == 1) {
    DAT_0043725c = 0x13;
    return;
  }
  if ((param_1 != 0xe) && (param_1 != 0x13)) {
    DAT_0043725c = 5;
    return;
  }
  DAT_0043725c = 1;
  return;
}



/******************************************************************************/
/* TARGET 00409240  FUN_00409240 */
/******************************************************************************/

void FUN_00409240(void)

{
  return;
}



/******************************************************************************/
/* TARGET 00409250  FUN_00409250 */
/******************************************************************************/

void FUN_00409250(void)

{
  HDC hdc;
  
  DAT_00436fd0 = GetSystemMetrics(0x10);
  DAT_00437070 = GetSystemMetrics(0x11);
  DAT_004370fc = GetSystemMetrics(0);
  DAT_00437250 = GetSystemMetrics(1);
  hdc = GetDC(DAT_00437308);
  if (hdc != (HDC)0x0) {
    DAT_00437220 = GetDeviceCaps(hdc,0xc);
    ReleaseDC(DAT_00437308,hdc);
  }
  return;
}



/******************************************************************************/
/* TARGET 004092b0  FUN_004092b0 */
/******************************************************************************/

void FUN_004092b0(void)

{
  if (DAT_004372ea == '\0') {
    FUN_00409250();
    return;
  }
  return;
}



/******************************************************************************/
/* TARGET 004092c0  entry */
/******************************************************************************/

/* WARNING (jumptable): Unable to track spacebase fully for stack */
/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

void entry(void)

{
  double dVar1;
  LANGID LVar2;
  UINT UVar3;
  LSTATUS LVar4;
  uint uVar5;
  HRSRC hResInfo;
  HGLOBAL hResData;
  DWORD DVar6;
  LPVOID pvVar7;
  undefined4 *puVar8;
  int iVar9;
  LPSTR pCVar10;
  undefined4 uVar11;
  uint *puVar12;
  byte *pbVar13;
  BYTE *pBVar14;
  int iVar15;
  byte bVar16;
  int iVar17;
  undefined4 *puVar18;
  int *piVar19;
  byte *pbVar20;
  undefined4 *puVar21;
  LOGPALETTE *pLVar22;
  HKEY local_130;
  uint local_12c;
  DWORD local_128 [2];
  _SYSTEMTIME local_120;
  CHAR local_10c [264];
  
  DAT_00437154 = GetVersion();
  lpVersionInformation_00436fd8 = (LPOSVERSIONINFOA)0x94;
  GetVersionExA((LPOSVERSIONINFOA)&lpVersionInformation_00436fd8);
  DAT_00437268 = GetModuleHandleA((LPCSTR)0x0);
  UVar3 = GetACP();
  switch(UVar3) {
  case 0x4e2:
    DAT_004361a0 = 0xee;
    _DAT_0043625c = UVar3;
    _DAT_00436260 = DAT_004361a0;
    break;
  case 0x4e3:
    DAT_004361a0 = 0xcc;
    break;
  case 0x4e4:
    DAT_004361a0 = 0;
    break;
  case 0x4e5:
    DAT_004361a0 = 0xa1;
    _DAT_0043625c = UVar3;
    _DAT_00436260 = DAT_004361a0;
    break;
  case 0x4e6:
    DAT_004361a0 = 0xa2;
    _DAT_0043625c = UVar3;
    _DAT_00436260 = DAT_004361a0;
    break;
  case 0x4e7:
    DAT_004361ac = 0xb1;
    break;
  case 0x4e8:
    DAT_004361a0 = 0xb2;
    _DAT_0043625c = UVar3;
    _DAT_00436260 = DAT_004361a0;
    break;
  case 0x4e9:
    DAT_004361a0 = 0xba;
    break;
  case 0x4ea:
    DAT_004361ac = 0xa3;
    break;
  default:
    DAT_004361a0 = 1;
  }
  local_12c = 0;
  LVar4 = RegOpenKeyExA((HKEY)0x80000002,PTR_s_Software_Gemtree_Software_Peter_004364b8,0,1,
                        &local_130);
  if (LVar4 == 0) {
    local_128[1] = 4;
    local_128[0] = 4;
    RegQueryValueExA(local_130,s_Language_00436734,(LPDWORD)0x0,local_128 + 1,(LPBYTE)&local_12c,
                     local_128);
    RegCloseKey(local_130);
  }
  if (local_12c == 0) {
    LVar2 = GetUserDefaultLangID();
    local_12c = LVar2 & 0xff;
  }
  iVar17 = 0;
  puVar12 = &DAT_004361b8;
  do {
    iVar9 = iVar17;
    if (*puVar12 == local_12c) break;
    puVar12 = puVar12 + 8;
    iVar17 = iVar17 + 1;
    iVar9 = DAT_0043619c;
  } while ((int)puVar12 < 0x4364b8);
  DAT_0043619c = iVar9;
  FUN_004091c0(DAT_0043619c);
  if (DAT_00436fe8 == 1) {
    if (DAT_00436fe4 < 0x3e9) goto LAB_00409469;
  }
  else if (DAT_00436fe8 != 2) goto LAB_00409469;
  DAT_0043726c = LoadLibraryA(s_KERNEL32_DLL_00436724);
  if (DAT_0043726c != (HMODULE)0x0) {
    DAT_00437288 = GetProcAddress(DAT_0043726c,s_GetDiskFreeSpaceExA_00436710);
  }
LAB_00409469:
  DAT_00437280 = GetForegroundWindow();
  FUN_004092b0();
  DAT_00437290 = DAT_00436fd0 / 2;
  DAT_004372a8 = DAT_00437070 / 2;
  uVar5 = FUN_0040d2f0();
  if ((char)uVar5 == '\0') {
    FUN_004099e0(0xfd);
  }
  DAT_00437100 = (((int)DAT_00437154 < 1) - 1 & 0x1e) + 0x1e;
  GetLocalTime(&local_120);
  DAT_0043714c = (uint)local_120.wMinute * 0x4a7e8efd + (uint)local_120.wSecond * 0x3f9ca33 +
                 (uint)local_120.wMilliseconds * 0x76ddb + (local_120._6_4_ & 0xffff) * -0x4f620aea;
  FUN_00409ad0();
  _DAT_00436114 = FUN_0040d3a0(0x400);
  puVar21 = _DAT_00436114;
  for (iVar17 = 0x100; iVar17 != 0; iVar17 = iVar17 + -1) {
    *puVar21 = 0;
    puVar21 = puVar21 + 1;
  }
  _DAT_00436148 = FUN_0040d3a0(0x400);
  puVar21 = _DAT_00436148;
  for (iVar17 = 0x100; iVar17 != 0; iVar17 = iVar17 + -1) {
    *puVar21 = 0;
    puVar21 = puVar21 + 1;
  }
  FUN_00405910();
  FUN_00401d40();
  FUN_00409190((undefined4 *)&DAT_00436000,(undefined4 *)&DAT_004360fc);
  GetModuleFileNameA(DAT_00437268,local_10c,0x104);
  FUN_00407cf0((int *)&DAT_0043711c,local_10c);
  DAT_00437118 = FUN_0040d3a0(0x428);
  puVar21 = DAT_00437118;
  for (iVar17 = 0x10a; iVar17 != 0; iVar17 = iVar17 + -1) {
    *puVar21 = 0;
    puVar21 = puVar21 + 1;
  }
  *DAT_00437118 = 0x28;
  DAT_00437118[1] = 0x20;
  DAT_00437118[2] = 0x20;
  *(undefined2 *)(DAT_00437118 + 3) = 1;
  *(undefined2 *)((int)DAT_00437118 + 0xe) = 8;
  DAT_00437118[4] = 0;
  puVar18 = &DAT_00433bf8;
  DAT_00437118[9] = 0xe0;
  puVar21 = DAT_00437118;
  puVar8 = DAT_00437118 + 10;
  *(undefined1 *)((int)DAT_00437118 + 0x2a) = 0x95;
  *(undefined1 *)((int)puVar21 + 0x29) = 0x22;
  *(undefined1 *)puVar8 = 0x8c;
  *(undefined1 *)((int)puVar21 + 0x2e) = 0x61;
  *(undefined1 *)((int)puVar21 + 0x2d) = 0x1e;
  *(undefined1 *)(puVar21 + 0xb) = 0x6f;
  pbVar13 = (byte *)(puVar21 + 0xc);
  do {
    piVar19 = &DAT_00433be4;
    *(undefined4 *)pbVar13 = *puVar18;
    pbVar20 = pbVar13 + 5;
    do {
      iVar17 = *piVar19;
      piVar19 = piVar19 + 1;
      pbVar20[1] = (byte)((uint)pbVar13[2] * iVar17 +
                          ((int)((uint)pbVar13[2] * iVar17) >> 0x1f & 0xffU) >> 8);
      *pbVar20 = (byte)((uint)pbVar13[1] * iVar17 +
                        ((int)((uint)pbVar13[1] * iVar17) >> 0x1f & 0xffU) >> 8);
      pbVar20[-1] = (byte)((uint)*pbVar13 * iVar17 +
                           ((int)((uint)*pbVar13 * iVar17) >> 0x1f & 0xffU) >> 8);
      pbVar20 = pbVar20 + 4;
    } while ((int)piVar19 < 0x433bf8);
    puVar18 = puVar18 + 1;
    pbVar13 = pbVar13 + 0x18;
  } while ((int)puVar18 < 0x433c84);
  iVar17 = 0xaf5;
  do {
    bVar16 = ((char)(iVar17 / 0xb) + (char)(iVar17 >> 0x1f)) -
             (char)((longlong)iVar17 * 0x2e8ba2e9 >> 0x3f);
    iVar17 = iVar17 + -0xff;
    pbVar13[2] = bVar16;
    pbVar13[1] = bVar16;
    *pbVar13 = bVar16;
    pbVar13 = pbVar13 + 4;
  } while (-1 < iVar17);
  DAT_00437150 = FUN_0040d3a0(0x40000);
  hResInfo = FindResourceA(DAT_00437268,(LPCSTR)0x36,s_LOADER_00436708);
  hResData = LoadResource(DAT_00437268,hResInfo);
  if ((hResInfo == (HRSRC)0x0) || (hResData == (HGLOBAL)0x0)) {
    FUN_004099e0(0xfb);
  }
  DVar6 = SizeofResource(DAT_00437268,hResInfo);
  iVar17 = DVar6 - 6;
  pvVar7 = LockResource(hResData);
  FUN_00409e50(DAT_00437150,0x40000,(ushort *)((int)pvVar7 + 6),iVar17);
  DAT_0043724c = FUN_0040d3a0(0x100);
  DAT_00437278 = FUN_0040d3a0(0x404);
  pLVar22 = DAT_00437278;
  for (iVar17 = 0x101; iVar17 != 0; iVar17 = iVar17 + -1) {
    pLVar22->palVersion = 0;
    pLVar22->palNumEntries = 0;
    pLVar22 = (LOGPALETTE *)pLVar22->palPalEntry;
  }
  iVar17 = 0xe0;
  DAT_00437278->palVersion = 0x300;
  DAT_00437278->palNumEntries = 0xe0;
  pBVar14 = (BYTE *)(DAT_00437118 + 10);
  pLVar22 = DAT_00437278;
  do {
    pLVar22->palPalEntry[0].peRed = pBVar14[2];
    pLVar22->palPalEntry[0].peGreen = pBVar14[1];
    pLVar22->palPalEntry[0].peBlue = *pBVar14;
    pLVar22->palPalEntry[0].peFlags = '\0';
    iVar17 = iVar17 + -1;
    pBVar14 = pBVar14 + 4;
    pLVar22 = (LOGPALETTE *)pLVar22->palPalEntry;
  } while (iVar17 != 0);
  DAT_00437274 = CreatePalette(DAT_00437278);
  puVar8 = FUN_0040d3a0(0x400);
  puVar21 = DAT_00437118 + 10;
  iVar17 = 0;
  DAT_0043715c = puVar8;
  do {
    uVar11 = *puVar21;
    *puVar8 = uVar11;
    *(undefined1 *)puVar8 = *(undefined1 *)((int)puVar8 + 2);
    *(char *)((int)puVar8 + 2) = (char)uVar11;
    *(undefined1 *)((int)puVar8 + 3) = 0;
    if (iVar17 == 0) {
      *puVar8 = 0xff000000;
    }
    else if (iVar17 == 1) {
      *puVar8 = 0x70000000;
    }
    else if (0xdf < iVar17) {
      *puVar8 = 0;
    }
    puVar8 = puVar8 + 1;
    puVar21 = puVar21 + 1;
    iVar17 = iVar17 + 1;
  } while (iVar17 < 0x100);
  DAT_004370f8 = FUN_0040d3a0(0x560);
  *DAT_004370f8 = 0;
  DAT_004370f8[1] = 0;
  DAT_004370f8[2] = 0;
  local_130 = (HKEY)0x2;
  DAT_004370f8[3] = 0x3ff00000;
  do {
    dVar1 = (double)(int)local_130;
    local_130 = (HKEY)((int)&local_130->unused + 1);
    *(double *)(DAT_004370f8 + (int)local_130 * 2 + -2) =
         dVar1 * *(double *)(DAT_004370f8 + (int)local_130 * 2 + -4);
  } while ((int)local_130 < 0xac);
  DAT_00437074 = FUN_0040d3a0(0x100);
  iVar17 = 0;
  do {
    if (((iVar17 < 0xe0) && (1 < iVar17)) &&
       ((iVar9 = iVar17 + 1, (iVar17 + -1) % 6 != 0 || (iVar17 == 0xda)))) {
      if ((0xd4 < iVar9) && (iVar9 < 0xdf)) {
        iVar9 = iVar17 + 2;
      }
    }
    else {
      iVar9 = 0xdf;
    }
    iVar15 = iVar17 + 1;
    *(char *)((int)DAT_00437074 + iVar17) = (char)iVar9;
    iVar17 = iVar15;
  } while (iVar15 < 0x100);
  pCVar10 = GetCommandLineA();
  FUN_00407cf0(&DAT_0043706c,pCVar10);
  DAT_00437140 = (int *)((int)&DAT_00437268->unused + DAT_00436190);
  DAT_00437148 = DAT_00436194 + (int)DAT_00437140;
  _DAT_00437258 = DAT_00436194;
  DAT_00437144 = DAT_00436194;
  DAT_00437254 = DAT_00437140;
  if (DAT_00436194 < 500) {
    FUN_004099e0(0xfb);
  }
  if (*DAT_00437254 == 0x14c4552) {
    DAT_00437284 = 1;
  }
  else if (*DAT_00437254 == 0x1544550) {
    DAT_00437284 = 0;
  }
  else {
    FUN_004099e0(0xfb);
  }
  FUN_00414fd0();
  FUN_0040e328();
  uVar11 = FUN_0040a790();
  if ((char)uVar11 == '\0') {
    FUN_004099e0(0xfc);
  }
  if (DAT_004361a8 != 9) {
    FUN_00409240();
  }
  FUN_0041b2e0();
  FUN_004099e0(DAT_00437270);
  return;
}



/******************************************************************************/
/* TARGET 004099e0  FUN_004099e0 */
/******************************************************************************/

void __cdecl FUN_004099e0(UINT param_1)

{
  DeleteObject(DAT_00437274);
  if (DAT_0043726c != (HMODULE)0x0) {
    FreeLibrary(DAT_0043726c);
  }
  FUN_0040d340();
  if (DAT_00436768 != '\0') {
    SetForegroundWindow(DAT_00437280);
  }
                    /* WARNING: Subroutine does not return */
  ExitProcess(param_1);
}



/******************************************************************************/
/* TARGET 00409a30  FUN_00409a30 */
/******************************************************************************/

void __cdecl FUN_00409a30(HWND param_1,HWND param_2)

{
  tagRECT local_20;
  tagRECT local_10;
  
  if (param_2 == (HWND)0x0) {
    SystemParametersInfoA(0x30,0,&local_20,0);
  }
  else {
    GetWindowRect(param_2,&local_20);
  }
  GetWindowRect(param_1,&local_10);
  SetWindowPos(param_1,(HWND)0x0,
               (local_20.right + local_20.left) / 2 - (local_10.right - local_10.left) / 2,
               (local_20.bottom + local_20.top) / 2 - (local_10.bottom - local_10.top) / 2,0,0,0x205
              );
  return;
}



/******************************************************************************/
/* TARGET 00409ad0  FUN_00409ad0 */
/******************************************************************************/

void FUN_00409ad0(void)

{
  return;
}



/******************************************************************************/
/* TARGET 00409af0  FUN_00409af0 */
/******************************************************************************/

undefined4 __cdecl FUN_00409af0(int param_1,int param_2)

{
  char cVar1;
  int iVar2;
  DWORD DVar3;
  BOOL BVar4;
  int *lpBuffer;
  UINT UVar5;
  int *piVar6;
  int *piVar7;
  int iVar8;
  uint dwCreationFlags;
  _STARTUPINFOA *p_Var9;
  DWORD local_60;
  int local_5c;
  int local_58;
  _PROCESS_INFORMATION local_54;
  _STARTUPINFOA local_44;
  
  local_60 = 0;
  FUN_00406c70(&param_1);
  iVar2 = param_2;
  if (*(int *)(param_1 + 4) == 0) {
    FUN_00406610(&param_1);
    return 0;
  }
  p_Var9 = &local_44;
  for (iVar8 = 0x11; iVar8 != 0; iVar8 = iVar8 + -1) {
    p_Var9->cb = 0;
    p_Var9 = (_STARTUPINFOA *)&p_Var9->lpReserved;
  }
  local_54.hProcess = (HANDLE)0x0;
  local_54.hThread = (HANDLE)0x0;
  local_54.dwProcessId = 0;
  local_54.dwThreadId = 0;
  dwCreationFlags = (-(uint)(param_2 != 0) & 0xfffffff8) + 8 | 0x4000000;
  local_44.cb = 0x44;
  BVar4 = CreateProcessA((LPCSTR)0x0,(LPSTR)(param_1 + 0xc),(LPSECURITY_ATTRIBUTES)0x0,
                         (LPSECURITY_ATTRIBUTES)0x0,0,dwCreationFlags,(LPVOID)0x0,(LPCSTR)0x0,
                         &local_44,&local_54);
  if (BVar4 != 0) {
LAB_00409d49:
    if (iVar2 != 0) {
      WaitForSingleObject(local_54.hProcess,0xffffffff);
      GetExitCodeProcess(local_54.hProcess,&local_60);
    }
    CloseHandle(local_54.hProcess);
    CloseHandle(local_54.hThread);
    DVar3 = local_60;
    FUN_00406610(&param_1);
    return DVar3;
  }
  if ((*(int *)(param_1 + 4) == 2) && (*(char *)(param_1 + 0xd) == ':')) {
    BVar4 = SetCurrentDirectoryA((LPCSTR)(param_1 + 0xc));
    if (BVar4 != 0) {
      FUN_00406610(&param_1);
      return 0;
    }
  }
  else {
    if ((((*(int *)(param_1 + 4) < 3) ||
         ((*(char *)(param_1 + 0xc) != 'c' && (*(char *)(param_1 + 0xc) != 'C')))) ||
        ((*(char *)(param_1 + 0xd) != 'd' && (*(char *)(param_1 + 0xd) != 'D')))) ||
       ((((cVar1 = *(char *)(param_1 + 0xe), cVar1 != ' ' && (cVar1 != '\t')) && (cVar1 != '.')) &&
        (cVar1 != '\\')))) {
      lpBuffer = FUN_0040d3a0(0x400);
      UVar5 = GetWindowsDirectoryA((LPSTR)lpBuffer,0x400);
      FUN_00406530(&param_2,(LPCSTR)lpBuffer,UVar5);
      if (DAT_00437154 < 1) {
        piVar7 = &param_1;
        piVar6 = FUN_00407f80(&local_5c,&param_2,s__command_com__c_00436740);
        piVar7 = FUN_00407ef0(&local_58,piVar6,piVar7);
        FUN_00407cc0(&param_1,piVar7);
        FUN_00406610(&local_58);
        piVar7 = &local_5c;
      }
      else {
        piVar7 = &param_1;
        piVar6 = FUN_00407f80(&local_58,&param_2,s__system32_cmd_exe__c_00436750);
        piVar7 = FUN_00407ef0(&local_5c,piVar6,piVar7);
        FUN_00407cc0(&param_1,piVar7);
        FUN_00406610(&local_5c);
        piVar7 = &local_58;
      }
      FUN_00406610(piVar7);
      FUN_0040d410(lpBuffer);
      BVar4 = CreateProcessA((LPCSTR)0x0,(LPSTR)(param_1 + 0xc),(LPSECURITY_ATTRIBUTES)0x0,
                             (LPSECURITY_ATTRIBUTES)0x0,0,dwCreationFlags,(LPVOID)0x0,(LPCSTR)0x0,
                             &local_44,&local_54);
      if (BVar4 != 0) {
        FUN_00406610(&param_2);
        goto LAB_00409d49;
      }
      DAT_00437798 = 1;
      FUN_00406610(&param_2);
      goto LAB_00409d2a;
    }
    FUN_00406c00(&param_1,0,2);
    FUN_00406c70(&param_1);
    FUN_00406cc0(&param_1);
    BVar4 = SetCurrentDirectoryA((LPCSTR)(param_1 + 0xc));
    if (BVar4 != 0) {
      FUN_00406610(&param_1);
      return 0;
    }
  }
  DAT_00437798 = 1;
LAB_00409d2a:
  FUN_00406610(&param_1);
  return 1;
}



/******************************************************************************/
/* TARGET 00409da0  FUN_00409da0 */
/******************************************************************************/

void __cdecl FUN_00409da0(int param_1)

{
  int iVar1;
  int iVar2;
  byte *pbVar3;
  uint uVar4;
  int iVar5;
  int iVar6;
  undefined4 *puVar7;
  
  iVar5 = *(int *)(param_1 + 0x20);
  iVar1 = *(int *)(DAT_00437118 + 0x28);
  iVar2 = *(int *)(DAT_00437118 + 0x2c);
  pbVar3 = (byte *)(param_1 + 0x28);
  if (iVar5 == 0) {
    iVar5 = 1 << (*(byte *)(param_1 + 0xe) & 0x1f);
  }
  if ((0 < iVar5) && (iVar5 < 0x101)) {
    iVar6 = iVar5;
    puVar7 = DAT_0043724c;
    if (0 < iVar5) {
      do {
        if (*(int *)pbVar3 == iVar1) {
          *(undefined1 *)puVar7 = 0;
        }
        else if (*(int *)pbVar3 == iVar2) {
          *(undefined1 *)puVar7 = 1;
        }
        else {
          *(undefined1 *)puVar7 =
               *(undefined1 *)
                (((uint)(pbVar3[1] >> 2) << 6 | (uint)(*pbVar3 >> 2) << 0xc | (uint)(pbVar3[2] >> 2)
                 ) + DAT_00437150);
        }
        puVar7 = (undefined4 *)((int)puVar7 + 1);
        pbVar3 = pbVar3 + 4;
        iVar6 = iVar6 + -1;
      } while (iVar6 != 0);
    }
    for (uVar4 = 0x100U - iVar5 >> 2; uVar4 != 0; uVar4 = uVar4 - 1) {
      *puVar7 = 0xdfdfdfdf;
      puVar7 = puVar7 + 1;
    }
    for (uVar4 = 0x100U - iVar5 & 3; uVar4 != 0; uVar4 = uVar4 - 1) {
      *(undefined1 *)puVar7 = 0xdf;
      puVar7 = (undefined4 *)((int)puVar7 + 1);
    }
  }
  return;
}



/******************************************************************************/
/* TARGET 00409e50  FUN_00409e50 */
/******************************************************************************/

void __cdecl FUN_00409e50(byte *param_1,int param_2,ushort *param_3,int param_4)

{
  ushort uVar1;
  ushort uVar2;
  ushort *puVar3;
  ushort *puVar4;
  int iVar5;
  byte bVar6;
  uint uVar7;
  byte *pbVar8;
  ushort *puVar9;
  int iVar10;
  uint local_c;
  int local_8;
  byte *local_4;
  
  puVar9 = param_3;
  local_4 = param_1;
  local_8 = 0;
  iVar10 = 0;
  param_3 = (ushort *)0x0;
  do {
    while( true ) {
      uVar1 = (ushort)param_3 >> 1;
      puVar3 = param_3;
      if (uVar1 == 0) {
        if (param_4 <= iVar10) {
          return;
        }
        uVar2 = *puVar9;
        puVar9 = puVar9 + 1;
        iVar10 = iVar10 + 2;
        uVar1 = CONCAT11((byte)(uVar2 >> 9),(char)(uVar2 >> 1)) | 0x8000;
        puVar3 = (ushort *)(uint)uVar2;
      }
      param_3 = (ushort *)(uint)uVar1;
      if (((uint)puVar3 & 1) != 0) break;
      if (param_4 <= iVar10) {
        return;
      }
      if (param_2 <= local_8) {
        return;
      }
      *local_4 = (byte)*puVar9;
      local_4 = local_4 + 1;
      local_8 = local_8 + 1;
      puVar9 = (ushort *)((int)puVar9 + 1);
      iVar10 = iVar10 + 1;
    }
    bVar6 = 0;
    uVar1 = uVar1 >> 1;
    puVar3 = param_3;
    if (uVar1 == 0) {
      if (param_4 <= iVar10) {
        return;
      }
      uVar2 = *puVar9;
      puVar9 = puVar9 + 1;
      iVar10 = iVar10 + 2;
      uVar1 = CONCAT11((byte)(uVar2 >> 9),(char)(uVar2 >> 1)) | 0x8000;
      puVar3 = (ushort *)(uint)uVar2;
    }
    param_3 = (ushort *)(uint)uVar1;
    local_c = (uint)puVar3 & 1;
    do {
      uVar7 = local_c;
      puVar3 = param_3;
      local_c = uVar7 + 2;
      uVar1 = (ushort)param_3 >> 1;
      param_3 = (ushort *)(uint)uVar1;
      if (uVar1 == 0) {
        if (param_4 <= iVar10) goto LAB_00409f7b;
        uVar1 = *puVar9;
        puVar3 = (ushort *)(uint)uVar1;
        puVar9 = puVar9 + 1;
        iVar10 = iVar10 + 2;
        param_3 = (ushort *)(uint)(ushort)(CONCAT11((byte)(uVar1 >> 9),(char)(uVar1 >> 1)) | 0x8000)
        ;
      }
      if (((uint)puVar3 & 1) == 0) goto LAB_00409f7b;
    } while ((int)local_c < 0x16);
    local_c = uVar7 + 4;
LAB_00409f7b:
    if (6 < (int)local_c) {
      if (local_c == 7) {
        if (param_4 <= iVar10) {
          return;
        }
        uVar1 = *puVar9;
        puVar9 = (ushort *)((int)puVar9 + 1);
        iVar10 = iVar10 + 1;
        if ((byte)uVar1 == 0xff) {
          return;
        }
        local_c = (byte)uVar1 + 0x19;
      }
      else {
        local_c = local_c - 1;
      }
    }
    if (local_c != 2) {
      uVar1 = (ushort)param_3 >> 1;
      puVar3 = param_3;
      if (uVar1 == 0) {
        if (param_4 <= iVar10) {
          return;
        }
        uVar2 = *puVar9;
        puVar9 = puVar9 + 1;
        iVar10 = iVar10 + 2;
        uVar1 = CONCAT11((byte)(uVar2 >> 9),(char)(uVar2 >> 1)) | 0x8000;
        puVar3 = (ushort *)(uint)uVar2;
      }
      param_3 = (ushort *)(uint)uVar1;
      puVar4 = param_3;
      if (((uint)puVar3 & 1) == 0) {
        uVar1 = uVar1 >> 1;
        param_3 = (ushort *)(uint)uVar1;
        puVar3 = param_3;
        param_3._0_2_ = uVar1;
        if (uVar1 == 0) {
          if (param_4 <= iVar10) {
            return;
          }
          uVar1 = *puVar9;
          puVar4 = (ushort *)(uint)uVar1;
          puVar9 = puVar9 + 1;
          iVar10 = iVar10 + 2;
          puVar3 = (ushort *)(CONCAT11((byte)(uVar1 >> 9),(char)(uVar1 >> 1)) | 0x8000);
          param_3._0_2_ = (ushort)puVar3;
        }
        bVar6 = (byte)puVar3;
        param_3._0_2_ = (ushort)param_3 >> 1;
        if ((ushort)param_3 == 0) {
          if (param_4 <= iVar10) {
            return;
          }
          uVar1 = *puVar9;
          bVar6 = (byte)uVar1;
          puVar9 = puVar9 + 1;
          iVar10 = iVar10 + 2;
          param_3._0_2_ = CONCAT11((byte)(uVar1 >> 9),(char)(uVar1 >> 1)) | 0x8000;
        }
        uVar2 = (ushort)param_3 >> 1;
        uVar1 = (ushort)param_3;
        if (uVar2 == 0) {
          if (param_4 <= iVar10) {
            return;
          }
          uVar1 = *puVar9;
          puVar9 = puVar9 + 1;
          iVar10 = iVar10 + 2;
          uVar2 = CONCAT11((byte)(uVar1 >> 9),(char)(uVar1 >> 1)) | 0x8000;
        }
        param_3 = (ushort *)(uint)uVar2;
        bVar6 = (((byte)puVar4 & 1) << 1 | bVar6 & 1) << 1 | (byte)uVar1 & 1;
        if (bVar6 < 2) {
          bVar6 = bVar6 + 1;
        }
        else {
          uVar2 = uVar2 >> 1;
          puVar3 = param_3;
          if (uVar2 == 0) {
            if (param_4 <= iVar10) {
              return;
            }
            uVar1 = *puVar9;
            puVar9 = puVar9 + 1;
            iVar10 = iVar10 + 2;
            uVar2 = CONCAT11((byte)(uVar1 >> 9),(char)(uVar1 >> 1)) | 0x8000;
            puVar3 = (ushort *)(uint)uVar1;
          }
          param_3 = (ushort *)(uint)uVar2;
          bVar6 = (bVar6 << 1 | (byte)puVar3 & 1) - 1;
          if (6 < bVar6) {
            uVar2 = uVar2 >> 1;
            puVar3 = param_3;
            if (uVar2 == 0) {
              if (param_4 <= iVar10) {
                return;
              }
              uVar1 = *puVar9;
              puVar9 = puVar9 + 1;
              iVar10 = iVar10 + 2;
              uVar2 = CONCAT11((byte)(uVar1 >> 9),(char)(uVar1 >> 1)) | 0x8000;
              puVar3 = (ushort *)(uint)uVar1;
            }
            param_3 = (ushort *)(uint)uVar2;
            bVar6 = (bVar6 * '\x02' | (byte)puVar3 & 1) - 7;
            if (0xd < bVar6) {
              uVar2 = uVar2 >> 1;
              puVar3 = param_3;
              if (uVar2 == 0) {
                if (param_4 <= iVar10) {
                  return;
                }
                uVar1 = *puVar9;
                puVar9 = puVar9 + 1;
                iVar10 = iVar10 + 2;
                uVar2 = CONCAT11((byte)(uVar1 >> 9),(char)(uVar1 >> 1)) | 0x8000;
                puVar3 = (ushort *)(uint)uVar1;
              }
              param_3 = (ushort *)(uint)uVar2;
              bVar6 = (bVar6 * '\x02' | (byte)puVar3 & 1) - 0xe;
            }
          }
        }
      }
    }
    if (param_4 <= iVar10) {
      return;
    }
    uVar1 = *puVar9;
    puVar9 = (ushort *)((int)puVar9 + 1);
    iVar10 = iVar10 + 1;
    iVar5 = local_8 - ((uint)bVar6 * 0x100 + (uint)(byte)uVar1 & 0xffff);
    if (iVar5 < 0) {
      return;
    }
    pbVar8 = param_1 + iVar5;
    for (; ((0 < (int)local_c && (iVar5 < param_2)) && (local_8 < param_2)); local_8 = local_8 + 1)
    {
      *local_4 = *pbVar8;
      local_4 = local_4 + 1;
      pbVar8 = pbVar8 + 1;
      iVar5 = iVar5 + 1;
      local_c = local_c - 1;
    }
  } while( true );
}



/******************************************************************************/
/* TARGET 0040a210  FUN_0040a210 */
/******************************************************************************/

float10 FUN_0040a210(void)

{
  DAT_0043714c = DAT_0043714c * 0x343fd + 0x269ec3;
  return (float10)DAT_0043714c * (float10)2.3283064365386963e-10;
}



/******************************************************************************/
/* TARGET 0040a250  FUN_0040a250 */
/******************************************************************************/

int __cdecl FUN_0040a250(double param_1)

{
  return (int)ROUND(param_1);
}



/******************************************************************************/
/* TARGET 0040a270  FUN_0040a270 */
/******************************************************************************/

int __cdecl FUN_0040a270(double param_1)

{
  return (int)ROUND(param_1);
}



/******************************************************************************/
/* TARGET 0040a2a0  FUN_0040a2a0 */
/******************************************************************************/

int __cdecl FUN_0040a2a0(double param_1)

{
  return (int)ROUND(param_1);
}



/******************************************************************************/
/* TARGET 0040a2d0  FUN_0040a2d0 */
/******************************************************************************/

int __cdecl FUN_0040a2d0(double param_1)

{
  return (int)ROUND(param_1);
}



/******************************************************************************/
/* TARGET 0040a300  FUN_0040a300 */
/******************************************************************************/

undefined4 __cdecl FUN_0040a300(int param_1)

{
  int iVar1;
  BOOL BVar2;
  DWORD DVar3;
  
  FUN_00406c70(&param_1);
  FUN_00406cc0(&param_1);
  iVar1 = *(int *)(param_1 + 4);
  while ((iVar1 != 0 && (*(char *)(iVar1 + 0xb + param_1) == '\\'))) {
    FUN_00406c00(&param_1,iVar1 - 1,0x7fffffff);
    FUN_00406cc0(&param_1);
    iVar1 = *(int *)(param_1 + 4);
  }
  BVar2 = CreateDirectoryA((LPCSTR)(param_1 + 0xc),(LPSECURITY_ATTRIBUTES)0x0);
  if (BVar2 == 0) {
    DVar3 = GetFileAttributesA((LPCSTR)(param_1 + 0xc));
    if ((DVar3 != 0xffffffff) && ((DVar3 & 0x10) != 0)) {
      FUN_00406610(&param_1);
      return 1;
    }
    FUN_00406610(&param_1);
    return 0;
  }
  FUN_00406610(&param_1);
  return 1;
}



/******************************************************************************/
/* TARGET 0040a3a0  FUN_0040a3a0 */
/******************************************************************************/

undefined4 __cdecl FUN_0040a3a0(int param_1)

{
  int iVar1;
  uint uVar2;
  undefined4 *puVar3;
  char *pcVar4;
  int *piVar5;
  undefined4 uVar6;
  int extraout_ECX;
  int extraout_ECX_00;
  int extraout_ECX_01;
  int extraout_var;
  int local_10;
  int local_c;
  undefined4 local_8;
  undefined4 local_4;
  
  FUN_00401020(&stack0xffffffe8,&param_1);
  iVar1 = FUN_0040a300(extraout_var);
  if (iVar1 != 0) {
    FUN_00406610(&param_1);
    return 1;
  }
  FUN_00406c70(&param_1);
  FUN_00406cc0(&param_1);
  iVar1 = *(int *)(param_1 + 4);
  while ((iVar1 != 0 && (*(char *)(iVar1 + 0xb + param_1) == '\\'))) {
    FUN_00406c00(&param_1,iVar1 - 1,0x7fffffff);
    FUN_00406cc0(&param_1);
    iVar1 = *(int *)(param_1 + 4);
  }
  FUN_00401020(&local_10,&param_1);
  FUN_004064c0(&local_c);
  iVar1 = FUN_00406890(&local_10,'\\');
  while (-1 < iVar1) {
    iVar1 = 0x7fffffff;
    uVar2 = FUN_00406890(&local_10,'\\');
    FUN_00406c00(&local_10,uVar2,iVar1);
    iVar1 = extraout_ECX;
    FUN_00401020(&stack0xffffffe8,&local_10);
    iVar1 = FUN_0040a300(iVar1);
    if (iVar1 != 0) break;
    iVar1 = FUN_00406890(&local_10,'\\');
  }
  iVar1 = *(int *)(local_10 + 4);
  if (iVar1 < *(int *)(param_1 + 4)) {
    do {
      FUN_00407ea0(&local_10,0x5c);
      puVar3 = FUN_00406bb0(&param_1,&local_8,*(uint *)(local_10 + 4),*(uint *)(param_1 + 4));
      FUN_00407cc0(&local_c,puVar3);
      FUN_00406610(&local_8);
      pcVar4 = FUN_00406860(&local_c,'\\');
      iVar1 = extraout_ECX_00;
      if ((int)pcVar4 < 0) break;
      piVar5 = FUN_00406b40(&local_c,&local_4,(uint)pcVar4);
      FUN_00407dc0(&local_10,piVar5);
      FUN_00406610(&local_4);
      iVar1 = extraout_ECX_01;
      FUN_00401020(&stack0xffffffe8,&local_10);
      iVar1 = FUN_0040a300(iVar1);
      if (iVar1 == 0) {
        FUN_00406610(&local_c);
        FUN_00406610(&local_10);
        FUN_00406610(&param_1);
        return 0;
      }
      iVar1 = *(int *)(local_10 + 4);
    } while (iVar1 < *(int *)(param_1 + 4));
  }
  FUN_00401020(&stack0xffffffe8,&param_1);
  uVar6 = FUN_0040a300(iVar1);
  FUN_00406610(&local_c);
  FUN_00406610(&local_10);
  FUN_00406610(&param_1);
  return uVar6;
}



/******************************************************************************/
/* TARGET 0040a5a0  FUN_0040a5a0 */
/******************************************************************************/

void FUN_0040a5a0(void)

{
  FUN_004064c0(&DAT_004372e0);
  return;
}



/******************************************************************************/
/* TARGET 0040a5b0  FUN_0040a5b0 */
/******************************************************************************/

void FUN_0040a5b0(void)

{
  FUN_0040d9b0(0x40a5c0);
  return;
}



/******************************************************************************/
/* TARGET 0040a5e0  FUN_0040a5e0 */
/******************************************************************************/

void FUN_0040a5e0(void)

{
  FUN_004064c0(&DAT_004372d8);
  return;
}



/******************************************************************************/
/* TARGET 0040a5f0  FUN_0040a5f0 */
/******************************************************************************/

void FUN_0040a5f0(void)

{
  FUN_0040d9b0(0x40a600);
  return;
}



/******************************************************************************/
/* TARGET 0040a610  FUN_0040a610 */
/******************************************************************************/

/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

void __cdecl FUN_0040a610(int *param_1)

{
  int iVar1;
  BOOL BVar2;
  int iVar3;
  int iVar4;
  int iVar5;
  tagRECT local_20;
  tagRECT local_10;
  
  iVar1 = FUN_0040a2a0((double)(*(int *)(*DAT_004371f0 + 4) << 5) * _DAT_004368d0);
  local_20.bottom = FUN_0040a2a0((double)(*(int *)(*DAT_004371f0 + 8) << 5) * _DAT_004368d0);
  local_20.right = iVar1;
  if (DAT_004370fc < iVar1) {
    local_20.right = DAT_004370fc;
  }
  if (DAT_00437250 < local_20.bottom) {
    local_20.bottom = DAT_00437250;
  }
  local_20.left = 0;
  local_20.top = 0;
  AdjustWindowRectEx(&local_20,DAT_0043677c,0,DAT_00436778);
  if ((DAT_00437314 != '\0') && (BVar2 = GetWindowRect(DAT_00437310,&local_10), BVar2 != 0)) {
    local_20.bottom = local_20.bottom + (local_10.bottom - local_10.top);
  }
  iVar1 = local_20.right - local_20.left;
  if (DAT_004370fc < local_20.right - local_20.left) {
    iVar1 = DAT_004370fc;
  }
  iVar5 = local_20.bottom - local_20.top;
  if (DAT_00437250 < local_20.bottom - local_20.top) {
    iVar5 = DAT_00437250;
  }
  iVar4 = DAT_00437290 - iVar1 / 2;
  if (iVar4 < 0) {
    iVar4 = 0;
  }
  iVar3 = DAT_004372a8 - iVar5 / 2;
  if (iVar3 < 0) {
    iVar3 = 0;
  }
  *param_1 = iVar4;
  param_1[1] = iVar3;
  param_1[2] = iVar4 + iVar1;
  param_1[3] = iVar3 + iVar5;
  return;
}



/******************************************************************************/
/* TARGET 0040a750  FUN_0040a750 */
/******************************************************************************/

void FUN_0040a750(void)

{
  if (DAT_0043730c == '\0') {
    DAT_0043730c = '\x01';
    FUN_00418a80(DAT_00437238);
    ShowWindow(DAT_00437308,5);
    SetFocus(DAT_00437308);
  }
  return;
}



/******************************************************************************/
/* TARGET 0040a790  FUN_0040a790 */
/******************************************************************************/

/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

undefined4 FUN_0040a790(void)

{
  int iVar1;
  undefined4 *puVar2;
  DWORD DVar3;
  undefined4 uVar4;
  int *piVar5;
  int local_38;
  int local_34;
  int local_30;
  int local_2c;
  WNDCLASSA local_28;
  
  iVar1 = DAT_00437398 + -1;
  if (-1 < iVar1) {
    piVar5 = (int *)(iVar1 * 0x20 + 0x10 + DAT_004373ac);
    do {
      if ((piVar5[-1] == 3) && (*piVar5 == 0)) {
        puVar2 = FUN_00408220(&DAT_004371e0,*(uint *)(iVar1 * 0x20 + 0x18 + DAT_004373ac));
        FUN_00407cc0(&DAT_004372e0,puVar2);
        break;
      }
      iVar1 = iVar1 + -1;
      piVar5 = piVar5 + -8;
    } while (-1 < iVar1);
  }
  DVar3 = GetSysColor(0x12);
  DAT_004373b0 = DVar3 & 0xffffff;
  DVar3 = GetSysColor(0xf);
  DAT_004375c4 = DVar3 & 0xffffff;
  DAT_004375c0 = CreateSolidBrush(DAT_004375c4);
  DVar3 = GetSysColor(8);
  DAT_0043763c = DVar3 & 0xffffff;
  DVar3 = GetSysColor(5);
  DAT_00437434 = DVar3 & 0xffffff;
  DAT_00437450 = CreateSolidBrush(DAT_00437434);
  DVar3 = GetSysColor(0xe);
  DAT_00437630 = DVar3 & 0xffffff;
  DVar3 = GetSysColor(0xd);
  _DAT_004374b4 = DVar3 & 0xffffff;
  DAT_00437420 = CreateSolidBrush(_DAT_004374b4);
  local_28.style = 0xb;
  local_28.lpfnWndProc = (WNDPROC)&LAB_0040c240;
  local_28.cbClsExtra = 0;
  local_28.cbWndExtra = 4;
  local_28.hInstance = DAT_00437268;
  local_28.hIcon = LoadIconA(DAT_00437268,(LPCSTR)0x1);
  local_28.hCursor = LoadCursorA((HINSTANCE)0x0,(LPCSTR)0x7f00);
  local_28.hbrBackground = (HBRUSH)0x0;
  local_28.lpszMenuName = (LPCSTR)0x0;
  local_28.lpszClassName = s_PeterProgClass_00436780;
  RegisterClassA(&local_28);
  FUN_0040a610(&local_38);
  DAT_00437308 = CreateWindowExA(DAT_00436778,s_PeterProgClass_00436780,(LPCSTR)(DAT_004372e0 + 0xc)
                                 ,DAT_0043677c,local_38,local_34,local_30 - local_38,
                                 local_2c - local_34,(HWND)0x0,(HMENU)0x0,DAT_00437268,(LPVOID)0x0);
  if (DAT_00437308 == (HWND)0x0) {
    return 0;
  }
  FUN_004092b0();
  FUN_004085b0((int *)&DAT_00437238);
  *DAT_00437238 = DAT_00437308;
  DAT_00437238[1] = 0xffffffff;
  DAT_00437238[2] = 0;
  FUN_00407cc0(DAT_00437238 + 5,&DAT_004372e0);
  *(undefined1 *)((int)DAT_00437238 + 0x42) = 1;
  DAT_00437238[0x19] = DAT_004373b0;
  DAT_00437238[0x1a] = DAT_004375c4;
  DAT_00437238[0x1b] = DAT_004375c0;
  *(undefined1 *)((int)DAT_00437238 + 0x3d) = 1;
  *(undefined1 *)(DAT_00437238 + 0xf) = 1;
  *(undefined1 *)((int)DAT_00437238 + 0x3e) = 1;
  *(undefined1 *)(DAT_00437238 + 0x10) = 1;
  *(undefined1 *)((int)DAT_00437238 + 0x3f) = 0;
  SetWindowLongA(DAT_00437308,0,0);
  DAT_00437310 = CreateStatusWindowA(0x40000100,(LPCSTR)(DAT_004372d8 + 0xc),DAT_00437308,0x30ec);
  if (DAT_00437310 != (HWND)0x0) {
    DAT_004372dc = LoadCursorA((HINSTANCE)0x0,(LPCSTR)0x7f00);
    DAT_004372e4 = LoadCursorA(DAT_00437268,(LPCSTR)0x4);
    DAT_0043610c = DAT_004372dc;
    uVar4 = FUN_0040b090(DAT_00437238);
    return CONCAT31((int3)((uint)uVar4 >> 8),1);
  }
  return 0;
}



/******************************************************************************/
/* TARGET 0040aa50  FUN_0040aa50 */
/******************************************************************************/

void __cdecl FUN_0040aa50(int param_1,int param_2)

{
  int iVar1;
  int iVar2;
  int iVar3;
  int *piVar4;
  int *piVar5;
  int iVar6;
  int iVar7;
  int iVar8;
  
  if (0 < param_2) {
    piVar5 = (int *)(param_1 + 4);
    iVar6 = param_2;
    do {
      iVar6 = iVar6 + -1;
      param_2 = piVar5[1];
      iVar8 = piVar5[-1];
      iVar7 = *piVar5;
      piVar4 = piVar5 + 3;
      param_1 = iVar6;
      if (0 < iVar6) {
        do {
          iVar1 = *piVar4;
          iVar2 = piVar4[1];
          iVar3 = piVar4[2];
          if ((iVar1 < iVar8) ||
             ((iVar8 == iVar1 && ((iVar2 < iVar7 || ((iVar7 == iVar2 && (iVar3 < param_2)))))))) {
            *piVar4 = iVar8;
            piVar5[-1] = iVar1;
            piVar4[1] = iVar7;
            *piVar5 = iVar2;
            piVar4[2] = param_2;
            piVar5[1] = iVar3;
            iVar7 = iVar2;
            iVar8 = iVar1;
            param_2 = iVar3;
          }
          piVar4 = piVar4 + 4;
          param_1 = param_1 + -1;
        } while (param_1 != 0);
      }
      piVar5 = piVar5 + 4;
    } while (0 < iVar6);
  }
  return;
}



/******************************************************************************/
/* TARGET 0040aaf0  FUN_0040aaf0 */
/******************************************************************************/

void FUN_0040aaf0(void)

{
  DWORD *pDVar1;
  BOOL BVar2;
  int iVar3;
  DWORD iModeNum;
  undefined4 *puVar4;
  undefined4 local_94 [9];
  WORD local_70;
  DWORD local_6c;
  DWORD local_2c;
  DWORD local_28;
  DWORD local_24;
  
  if (DAT_004372f8 == '\0') {
    DAT_004372f8 = '\x01';
    DAT_004372f4 = FUN_0040d3a0(0x400);
    iModeNum = 0;
    while (DAT_004372f0 < 0x40) {
      puVar4 = local_94;
      for (iVar3 = 0x25; iVar3 != 0; iVar3 = iVar3 + -1) {
        *puVar4 = 0;
        puVar4 = puVar4 + 1;
      }
      local_70 = 0x94;
      local_6c = 0x1c0000;
      BVar2 = EnumDisplaySettingsA((LPCSTR)0x0,iModeNum,(DEVMODEA *)local_94);
      if (BVar2 == 0) break;
      if (((((0x9f < (int)local_28) && ((int)local_28 < 0x2711)) && (99 < (int)local_24)) &&
          ((int)local_24 < 0x2711)) &&
         (((iVar3 = DAT_004372f0, pDVar1 = DAT_004372f4, local_2c == 8 || (local_2c == 0x10)) ||
          ((local_2c == 0x18 || (local_2c == 0x20)))))) {
        for (; (0 < iVar3 &&
               (((*pDVar1 != local_28 || (pDVar1[1] != local_24)) || (pDVar1[2] != local_2c))));
            pDVar1 = pDVar1 + 4) {
          iVar3 = iVar3 + -1;
        }
        if (iVar3 == 0) {
          *pDVar1 = local_28;
          pDVar1[1] = local_24;
          pDVar1[2] = local_2c;
          DAT_004372f0 = DAT_004372f0 + 1;
        }
      }
      iModeNum = iModeNum + 1;
    }
    FUN_0040aa50((int)DAT_004372f4,DAT_004372f0);
  }
  return;
}



/******************************************************************************/
/* TARGET 0040ac10  FUN_0040ac10 */
/******************************************************************************/

int __cdecl FUN_0040ac10(int param_1,int param_2,int param_3)

{
  int iVar1;
  int iVar2;
  int iVar3;
  int iVar4;
  int *piVar5;
  int local_4;
  
  if (DAT_004372f0 < 1) {
    return -1;
  }
  if (param_1 == 0) {
    if (param_2 == 0) {
      param_1 = *(int *)(*DAT_004371f0 + 4) << 5;
      param_2 = *(int *)(*DAT_004371f0 + 8) << 5;
    }
    else {
      param_1 = (*(int *)(*DAT_004371f0 + 4) * param_2) / *(int *)(*DAT_004371f0 + 8);
    }
  }
  if (param_2 == 0) {
    param_2 = (*(int *)(*DAT_004371f0 + 8) * param_1) / *(int *)(*DAT_004371f0 + 4);
  }
  iVar4 = DAT_004372f0 + -1;
  piVar5 = (int *)(iVar4 * 0x10 + DAT_004372f4);
  iVar3 = param_1;
  if (*piVar5 < param_1) {
    iVar3 = *piVar5;
  }
  if (piVar5[1] < param_2) {
    param_2 = piVar5[1];
  }
  param_1 = 1000000;
  local_4 = -1;
  for (; -1 < iVar4; iVar4 = iVar4 + -1) {
    if (((iVar3 <= *piVar5) && (param_2 <= piVar5[1])) &&
       ((iVar1 = piVar5[2], iVar1 == param_3 || (param_3 == 0)))) {
      iVar2 = ((piVar5[1] - iVar3) - param_2) + *piVar5;
      if (param_3 == 0) {
        if (iVar1 == 8) {
          iVar2 = iVar2 + 3;
        }
        else if (iVar1 == 0x10) {
          iVar2 = iVar2 + 2;
        }
        else if (iVar1 == 0x18) {
          iVar2 = iVar2 + 1;
        }
      }
      if (iVar2 < param_1) {
        param_1 = iVar2;
        local_4 = iVar4;
      }
    }
    piVar5 = piVar5 + -4;
  }
  return local_4;
}



/******************************************************************************/
/* TARGET 0040ad10  FUN_0040ad10 */
/******************************************************************************/

void FUN_0040ad10(void)

{
  int local_10;
  int local_c;
  int local_8;
  int local_4;
  
  DAT_004372e8 = 1;
  ShowCursor(0);
  if (DAT_004372ea != '\0') {
    ChangeDisplaySettingsA((DEVMODEA *)0x0,0);
  }
  DAT_00437739 = 1;
  SetWindowLongA(DAT_00437308,-0x14,DAT_00436778);
  SetWindowLongA(DAT_00437308,-0x10,DAT_0043677c | 0x10000000);
  if (DAT_004372ea != '\0') {
    DAT_004372ea = '\0';
    FUN_004092b0();
    if ((*(int *)(DAT_00437634 + 4) != 0) && (DAT_004372ec != 0)) {
      DAT_00437314 = 1;
    }
    FUN_0040a610(&local_10);
    DAT_00437314 = 0;
    SetWindowPos(DAT_00437308,(HWND)0xfffffffe,local_10,local_c,local_8 - local_10,local_4 - local_c
                 ,0x160);
    if (DAT_004372ec != 0) {
      ShowWindow(DAT_00437308,3);
    }
  }
  ShowCursor(1);
  DAT_004372e8 = 0;
  FUN_0040b090(DAT_00437238);
  FUN_00418a80(DAT_00437238);
  FUN_00418c50();
  return;
}



/******************************************************************************/
/* TARGET 0040ae30  FUN_0040ae30 */
/******************************************************************************/

uint FUN_0040ae30(void)

{
  DWORD *pDVar1;
  bool bVar2;
  int iVar3;
  LONG LVar4;
  uint uVar5;
  undefined4 uVar6;
  int iVar7;
  int iVar8;
  int iVar9;
  undefined4 *puVar10;
  undefined4 local_94 [9];
  WORD local_70;
  DWORD local_6c;
  DWORD local_2c;
  DWORD local_28;
  DWORD local_24;
  
  if (DAT_004372ea != '\0') {
    FUN_0040ad10();
  }
  ShowCursor(0);
  FUN_0040a750();
  DAT_00437739 = 0;
  FUN_0040b230('\0');
  if (DAT_004372ea == '\0') {
    DAT_004372ec = IsZoomed(DAT_00437308);
  }
  SetWindowLongA(DAT_00437308,-0x14,0x10000);
  SetWindowLongA(DAT_00437308,-0x10,-0x70000000);
  FUN_0040aaf0();
  FUN_00418c50();
  DAT_004372e8 = 1;
  iVar3 = FUN_0040ac10(DAT_004372fc,DAT_00437300,DAT_00437304);
  if (iVar3 < 0) {
    iVar3 = FUN_0040ac10(DAT_004372fc,DAT_00437300,0);
  }
  bVar2 = true;
  if (-1 < iVar3) {
    iVar8 = iVar3 << 4;
    do {
      pDVar1 = (DWORD *)(DAT_004372f4 + iVar8);
      puVar10 = local_94;
      for (iVar7 = 0x25; iVar7 != 0; iVar7 = iVar7 + -1) {
        *puVar10 = 0;
        puVar10 = puVar10 + 1;
      }
      local_70 = 0x94;
      local_2c = pDVar1[2];
      local_28 = *pDVar1;
      local_24 = pDVar1[1];
      local_6c = 0x1c0000;
      LVar4 = ChangeDisplaySettingsA((DEVMODEA *)local_94,4);
      if (LVar4 == 0) {
        DAT_0043676c = *pDVar1;
        DAT_00436770 = pDVar1[1];
        DAT_00436774 = pDVar1[2];
        DAT_00436fd0 = *pDVar1;
        DAT_00437070 = pDVar1[1];
        DAT_00437220 = pDVar1[2];
        DAT_004370fc = DAT_00436fd0;
        DAT_00437250 = DAT_00437070;
        SetWindowPos(DAT_00437308,(HWND)0xffffffff,0,0,DAT_00436fd0,DAT_00437070,0x160);
        ShowCursor(1);
        DAT_004372e8 = 0;
        DAT_004372ea = 1;
        FUN_0040b090(DAT_00437238);
        uVar6 = FUN_00418a80(DAT_00437238);
        DAT_00437739 = 1;
        return CONCAT31((int3)((uint)uVar6 >> 8),1);
      }
      if (bVar2) {
        iVar7 = iVar3 + 1;
        iVar9 = iVar8 + 0x10;
        if (((DAT_004372f0 <= iVar7) || (*(DWORD *)(DAT_004372f4 + iVar9) != *pDVar1)) ||
           (*(DWORD *)(DAT_004372f4 + 4 + iVar9) != pDVar1[1])) {
          iVar7 = iVar3 + -1;
          iVar9 = iVar8 + -0x10;
          bVar2 = false;
        }
      }
      else {
        iVar7 = iVar3 + -1;
        iVar9 = iVar8 + -0x10;
      }
      iVar3 = iVar7;
      iVar8 = iVar9;
    } while (-1 < iVar7);
  }
  ShowCursor(1);
  DAT_004372e8 = 0;
  DAT_00437739 = 1;
  uVar5 = FUN_0040ad10();
  return uVar5 & 0xffffff00;
}



/******************************************************************************/
/* TARGET 0040b060  FUN_0040b060 */
/******************************************************************************/

uint FUN_0040b060(void)

{
  DWORD *pDVar1;
  bool bVar2;
  int iVar3;
  LONG LVar4;
  uint uVar5;
  undefined4 uVar6;
  int iVar7;
  int iVar8;
  int iVar9;
  undefined4 *puVar10;
  undefined4 auStack_94 [9];
  WORD WStack_70;
  DWORD DStack_6c;
  DWORD DStack_2c;
  DWORD DStack_28;
  DWORD DStack_24;
  
  if (DAT_004372ea != '\0') {
    FUN_0040ad10();
  }
  ShowCursor(0);
  FUN_0040a750();
  DAT_00437739 = 0;
  FUN_0040b230('\0');
  if (DAT_004372ea == '\0') {
    DAT_004372ec = IsZoomed(DAT_00437308);
  }
  SetWindowLongA(DAT_00437308,-0x14,0x10000);
  SetWindowLongA(DAT_00437308,-0x10,-0x70000000);
  FUN_0040aaf0();
  FUN_00418c50();
  DAT_004372e8 = 1;
  iVar3 = FUN_0040ac10(DAT_004372fc,DAT_00437300,DAT_00437304);
  if (iVar3 < 0) {
    iVar3 = FUN_0040ac10(DAT_004372fc,DAT_00437300,0);
  }
  bVar2 = true;
  if (-1 < iVar3) {
    iVar8 = iVar3 << 4;
    do {
      pDVar1 = (DWORD *)(DAT_004372f4 + iVar8);
      puVar10 = auStack_94;
      for (iVar7 = 0x25; iVar7 != 0; iVar7 = iVar7 + -1) {
        *puVar10 = 0;
        puVar10 = puVar10 + 1;
      }
      WStack_70 = 0x94;
      DStack_2c = pDVar1[2];
      DStack_28 = *pDVar1;
      DStack_24 = pDVar1[1];
      DStack_6c = 0x1c0000;
      LVar4 = ChangeDisplaySettingsA((DEVMODEA *)auStack_94,4);
      if (LVar4 == 0) {
        DAT_0043676c = *pDVar1;
        DAT_00436770 = pDVar1[1];
        DAT_00436774 = pDVar1[2];
        DAT_00436fd0 = *pDVar1;
        DAT_00437070 = pDVar1[1];
        DAT_00437220 = pDVar1[2];
        DAT_004370fc = DAT_00436fd0;
        DAT_00437250 = DAT_00437070;
        SetWindowPos(DAT_00437308,(HWND)0xffffffff,0,0,DAT_00436fd0,DAT_00437070,0x160);
        ShowCursor(1);
        DAT_004372e8 = 0;
        DAT_004372ea = 1;
        FUN_0040b090(DAT_00437238);
        uVar6 = FUN_00418a80(DAT_00437238);
        DAT_00437739 = 1;
        return CONCAT31((int3)((uint)uVar6 >> 8),1);
      }
      if (bVar2) {
        iVar7 = iVar3 + 1;
        iVar9 = iVar8 + 0x10;
        if (((DAT_004372f0 <= iVar7) || (*(DWORD *)(DAT_004372f4 + iVar9) != *pDVar1)) ||
           (*(DWORD *)(DAT_004372f4 + 4 + iVar9) != pDVar1[1])) {
          iVar7 = iVar3 + -1;
          iVar9 = iVar8 + -0x10;
          bVar2 = false;
        }
      }
      else {
        iVar7 = iVar3 + -1;
        iVar9 = iVar8 + -0x10;
      }
      iVar3 = iVar7;
      iVar8 = iVar9;
    } while (-1 < iVar7);
  }
  ShowCursor(1);
  DAT_004372e8 = 0;
  DAT_00437739 = 1;
  uVar5 = FUN_0040ad10();
  return uVar5 & 0xffffff00;
}



/******************************************************************************/
/* TARGET 0040b070  FUN_0040b070 */
/******************************************************************************/

void __cdecl FUN_0040b070(char param_1)

{
  if (param_1 == DAT_004372ea) {
    return;
  }
  if (param_1 != '\0') {
    FUN_0040b060();
    return;
  }
  FUN_0040ad10();
  return;
}



/******************************************************************************/
/* TARGET 0040b090  FUN_0040b090 */
/******************************************************************************/

void __cdecl FUN_0040b090(undefined4 *param_1)

{
  BOOL BVar1;
  tagRECT local_20;
  tagRECT local_10;
  
  if ((param_1[2] == 0) || (param_1[2] == 1)) {
    GetWindowRect((HWND)*param_1,&local_20);
    param_1[9] = local_20.left;
    param_1[10] = local_20.top;
    param_1[0xb] = local_20.right - local_20.left;
    param_1[0xc] = local_20.bottom - local_20.top;
  }
  if (param_1 != DAT_00437238) {
    GetClientRect((HWND)*param_1,&local_20);
    param_1[0xd] = local_20.right - local_20.left;
    param_1[0xe] = local_20.bottom - local_20.top;
    return;
  }
  if (DAT_004372ea == '\0') {
    BVar1 = IsZoomed(DAT_00437308);
    if (BVar1 == 0) {
      DAT_00437290 = (local_20.right + local_20.left) / 2;
      DAT_004372a8 = (local_20.top + local_20.bottom) / 2;
    }
    GetClientRect((HWND)*param_1,(LPRECT)&lpRect_00437298);
    if (DAT_00437314 != '\0') {
      GetWindowRect(DAT_00437310,&local_10);
      DAT_004372a4 = DAT_004372a4 + (local_10.top - local_10.bottom);
    }
    DAT_0043731c = DAT_004372a0 - (int)lpRect_00437298;
    DAT_00437320 = DAT_004372a4 - DAT_0043729c;
    param_1[0xd] = DAT_0043731c;
    param_1[0xe] = DAT_00437320;
    return;
  }
  DAT_0043731c = DAT_00436fd0;
  DAT_00437320 = DAT_00437070;
  param_1[0xd] = DAT_00436fd0;
  param_1[0xe] = DAT_00437320;
  return;
}



/******************************************************************************/
/* TARGET 0040b1f0  FUN_0040b1f0 */
/******************************************************************************/

void __cdecl FUN_0040b1f0(int *param_1)

{
  undefined4 uVar1;
  
  uVar1 = FUN_00408190(param_1,&DAT_004372d8);
  if (((char)uVar1 != '\0') && (DAT_00437310 != (HWND)0x0)) {
    FUN_00407cc0(&DAT_004372d8,param_1);
    FUN_00406e90(&DAT_004372d8,DAT_00437310);
  }
  return;
}



/******************************************************************************/
/* TARGET 0040b230  FUN_0040b230 */
/******************************************************************************/

void __cdecl FUN_0040b230(char param_1)

{
  tagRECT local_20;
  tagRECT local_10;
  
  if (param_1 != DAT_00437314) {
    DAT_00437314 = param_1;
    GetWindowRect(DAT_00437308,&local_20);
    GetWindowRect(DAT_00437310,&local_10);
    if (param_1 != '\0') {
      local_20.bottom = local_20.bottom + (local_10.bottom - local_10.top);
      MoveWindow(DAT_00437308,local_20.left,local_20.top,local_20.right - local_20.left,
                 local_20.bottom - local_20.top,1);
      ShowWindow(DAT_00437310,5);
      FUN_00418a80(DAT_00437238);
      return;
    }
    local_20.bottom = local_20.bottom + (local_10.top - local_10.bottom);
    ShowWindow(DAT_00437310,0);
    MoveWindow(DAT_00437308,local_20.left,local_20.top,local_20.right - local_20.left,
               local_20.bottom - local_20.top,1);
    FUN_00418a80(DAT_00437238);
  }
  return;
}



/******************************************************************************/
/* TARGET 0040b320  FUN_0040b320 */
/******************************************************************************/

void FUN_0040b320(void)

{
  if (DAT_004377e8 != '\0') {
    SetConsoleTitleA((LPCSTR)(DAT_004372e0 + 0xc));
  }
  return;
}



/******************************************************************************/
/* TARGET 0040b340  FUN_0040b340 */
/******************************************************************************/

void __cdecl FUN_0040b340(int *param_1)

{
  undefined4 uVar1;
  
  uVar1 = FUN_00408190(param_1,&DAT_004372e0);
  if ((char)uVar1 != '\0') {
    FUN_00407cc0(&DAT_004372e0,param_1);
    FUN_00406e90(&DAT_004372e0,DAT_00437308);
    FUN_00407cc0((undefined4 *)(DAT_00437238 + 0x14),&DAT_004372e0);
    *(undefined1 *)(DAT_00437238 + 0x45) = 1;
    FUN_0040b320();
  }
  return;
}



/******************************************************************************/
/* TARGET 0040b3a0  FUN_0040b3a0 */
/******************************************************************************/

int __cdecl FUN_0040b3a0(int param_1,uint param_2)

{
  if ((param_2 & 0x1000000) == 0) {
    switch(param_1) {
    case 0xc:
      return 0x65;
    case 0xd:
      return 0xd;
    case 0x10:
      goto switchD_0040b3bd_caseD_10;
    case 0x11:
      return 0x11;
    case 0x12:
      return 0x12;
    case 0x21:
      return 0x69;
    case 0x22:
      return 99;
    case 0x23:
      return 0x61;
    case 0x24:
      return 0x67;
    case 0x25:
      return 100;
    case 0x26:
      return 0x68;
    case 0x27:
      return 0x66;
    case 0x28:
      return 0x62;
    case 0x2d:
      return 0x60;
    case 0x2e:
      return 0x6e;
    }
  }
  else {
    switch(param_1) {
    case 0xd:
      return 0xad;
    case 0x10:
switchD_0040b3bd_caseD_10:
      return (-(uint)((param_2 & 0xff0000) != 0x360000) & 0xffffff6f) + 0xa1;
    case 0x11:
      return 0xa3;
    case 0x12:
      return 0xa5;
    }
  }
  return param_1;
}



/******************************************************************************/
/* TARGET 0040b4f0  FUN_0040b4f0 */
/******************************************************************************/

undefined4 __cdecl FUN_0040b4f0(undefined4 *param_1)

{
  uint uVar1;
  SHORT SVar2;
  uint uVar3;
  int iVar4;
  
  uVar3 = param_1[1];
  uVar1 = param_1[3];
  iVar4 = param_1[2];
  if (uVar3 < 0x101) {
    if (uVar3 != 0x100) {
      switch(uVar3) {
      case 0xa1:
      case 0xa3:
      case 0xa4:
      case 0xa6:
        break;
      case 0xa2:
        DAT_00437325 = 0;
        break;
      case 0xa5:
        DAT_00437328 = 0;
        break;
      default:
        goto switchD_0040b526_default;
      }
      param_1._2_2_ = (short)(uVar1 >> 0x10);
      DAT_00436794 = (uint)param_1._2_2_;
      lpPoint_00436790 = (LPPOINT)(int)(short)uVar1;
      lpPoint_00436798 = lpPoint_00436790;
      DAT_0043679c = DAT_00436794;
      ScreenToClient(*(HWND *)(DAT_00437238 + DAT_004377ec * 0xac),(LPPOINT)&lpPoint_00436798);
      DAT_0043732b = 1;
      return 0;
    }
LAB_0040b626:
    uVar3 = FUN_0040b3a0(iVar4,uVar1);
    if (DAT_00437748 != '\0') {
      DAT_00437748 = 0;
      return 0;
    }
    switch(uVar3) {
    case 0x11:
      DAT_00437788 = DAT_004374cd;
      break;
    case 0x13:
      DAT_00437748 = 1;
      return 0;
    case 0x14:
      if (DAT_00437795 == '\0') {
        SVar2 = GetKeyState(0x14);
        DAT_00437791 = (byte)SVar2 & 1;
      }
      break;
    case 0x2d:
      if (DAT_00437797 == '\0') {
        SVar2 = GetKeyState(0x2d);
        DAT_00437793 = (byte)SVar2 & 1;
      }
      break;
    case 0x90:
      if (DAT_00437794 == '\0') {
        SVar2 = GetKeyState(0x90);
        DAT_00437790 = (byte)SVar2 & 1;
      }
      break;
    case 0x91:
      if (DAT_00437796 == '\0') {
        SVar2 = GetKeyState(0x91);
        DAT_00437792 = (byte)SVar2 & 1;
      }
      break;
    case 0xa5:
      if (DAT_00437778 != DAT_0043777c) {
        iVar4 = DAT_00437778 + -1;
        if (iVar4 < 0) {
          iVar4 = 0x13;
        }
        if (((*(int *)(&DAT_00437464 + iVar4 * 4) == 0x11) &&
            (DAT_00437778 = iVar4, DAT_00437788 == '\0')) && (DAT_004374cd != '\0')) {
          DAT_004374cd = '\0';
          DAT_0043778c = DAT_0043778c + -1;
        }
      }
    }
    if ((uVar3 < 0x100) && (*(char *)((int)&DAT_004374bc + uVar3) == '\0')) {
      *(undefined1 *)((int)&DAT_004374bc + uVar3) = 1;
      DAT_0043778c = DAT_0043778c + 1;
    }
    *(uint *)(&DAT_00437464 + DAT_00437778 * 4) = uVar3;
    DAT_00437778 = DAT_00437778 + 1;
    if (0x13 < DAT_00437778) {
      DAT_00437778 = 0;
    }
    if ((DAT_00437778 == DAT_0043777c) && (DAT_0043777c = DAT_0043777c + 1, 0x13 < DAT_0043777c)) {
      DAT_0043777c = 0;
    }
    if ((uVar3 == 0x12) || (uVar3 == 0x79)) {
      return 1;
    }
  }
  else {
    if (0x200 < uVar3) {
      switch(uVar3) {
      case 0x202:
      case 0x205:
        break;
      case 0x203:
        DAT_00437327 = 1;
      case 0x201:
        DAT_00437326 = 1;
        break;
      case 0x206:
        DAT_0043732a = 1;
      case 0x204:
        DAT_00437329 = 1;
        break;
      default:
        goto switchD_0040b526_default;
      }
      goto switchD_0040b87f_caseD_202;
    }
    if (uVar3 != 0x200) {
      switch(uVar3) {
      case 0x101:
      case 0x105:
        uVar3 = FUN_0040b3a0(iVar4,uVar1);
        if ((uVar3 < 0x100) && (*(char *)((int)&DAT_004374bc + uVar3) != '\0')) {
          *(undefined1 *)((int)&DAT_004374bc + uVar3) = 0;
          DAT_0043778c = DAT_0043778c + -1;
        }
        if (uVar3 == 0x10) {
          if (DAT_0043755d == '\0') {
            return 0;
          }
          SVar2 = GetAsyncKeyState(0x10);
          if (SVar2 < 0) {
            return 0;
          }
          DAT_0043755d = 0;
          DAT_0043778c = DAT_0043778c + -1;
          return 0;
        }
        if (uVar3 != 0xa1) {
          if ((uVar3 != 0x12) && (uVar3 != 0x79)) {
            return 0;
          }
          return 1;
        }
        if (DAT_004374cc == '\0') {
          return 0;
        }
        SVar2 = GetAsyncKeyState(0x10);
        if (SVar2 < 0) {
          return 0;
        }
        DAT_004374cc = 0;
        DAT_0043778c = DAT_0043778c + -1;
        return 0;
      case 0x102:
      case 0x106:
        *(int *)(&DAT_004373c8 + DAT_00437780 * 4) = (int)(char)iVar4;
        DAT_00437780 = DAT_00437780 + 1;
        if (0x13 < DAT_00437780) {
          DAT_00437780 = 0;
        }
        if (DAT_00437780 != DAT_00437784) {
          return 0;
        }
        if (DAT_00437784 + 1 < 0x14) {
          DAT_00437784 = DAT_00437784 + 1;
          return 0;
        }
        DAT_00437784 = 0;
        return 0;
      default:
        return 0;
      case 0x104:
        if (iVar4 == 0xd) {
          FUN_0040b070(DAT_004372ea == '\0');
          return 1;
        }
      }
      goto LAB_0040b626;
    }
switchD_0040b87f_caseD_202:
    DAT_00437325 = *(byte *)(param_1 + 2) & 1;
    DAT_00437328 = (byte)((uint)param_1[2] >> 1) & 1;
    lpPoint_00436790 = (LPPOINT)(uVar1 & 0xffff);
    DAT_00436794 = uVar1 >> 0x10;
    ClientToScreen((HWND)*param_1,(LPPOINT)&lpPoint_00436790);
    DAT_0043679c = DAT_00436794;
    lpPoint_00436798 = lpPoint_00436790;
    ScreenToClient(*(HWND *)(DAT_00437238 + DAT_004377ec * 0xac),(LPPOINT)&lpPoint_00436798);
    DAT_0043732b = 1;
  }
switchD_0040b526_default:
  return 0;
}



/******************************************************************************/
/* TARGET 0040ba30  FUN_0040ba30 */
/******************************************************************************/

/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

undefined4 __cdecl FUN_0040ba30(int param_1)

{
  undefined4 *puVar1;
  int iVar2;
  SHORT SVar3;
  LRESULT LVar4;
  int iVar5;
  int local_c;
  int local_8;
  char *local_4;
  
  if (((*(int *)(param_1 + 4) == 0x104) && (DAT_004377ea != '\0')) &&
     ((*(int *)(param_1 + 8) == 0x12 || (*(int *)(param_1 + 8) == 0x79)))) {
    return 1;
  }
  if (*(int *)(param_1 + 4) == 0x100) {
    switch(*(undefined4 *)(param_1 + 8)) {
    case 9:
      SVar3 = GetAsyncKeyState(0x10);
      if (SVar3 < 0) {
        FUN_004167c0();
        return 1;
      }
      if ((((DAT_00437244 <= DAT_004377f0) || (*(char *)(DAT_0043723c + DAT_004377f0) == '\0')) ||
          (iVar2 = DAT_00437238 + DAT_004377f0 * 0xac, *(int *)(iVar2 + 8) != 0x15)) ||
         (*(char *)(iVar2 + 0x43) != '\0')) {
        FUN_004166c0();
        return 1;
      }
      break;
    case 0xd:
      if ((DAT_004377f0 < DAT_00437244) && (*(char *)(DAT_0043723c + DAT_004377f0) != '\0')) {
        puVar1 = (undefined4 *)(DAT_00437238 + DAT_004377f0 * 0xac);
        switch(*(undefined4 *)(DAT_00437238 + 8 + DAT_004377f0 * 0xac)) {
        case 2:
        case 3:
        case 4:
        case 6:
          SendMessageA((HWND)*puVar1,0x100,0x20,0);
          SendMessageA((HWND)*puVar1,0x101,0x20,0);
          return 1;
        case 0xb:
        case 0x14:
        case 0x15:
          if (*(char *)((int)puVar1 + 0x43) == '\0') {
            return 0;
          }
        }
      }
      iVar2 = *(int *)(DAT_00437238 + 0x10 + DAT_004377ec * 0xac);
      while (iVar2 != DAT_004377ec) {
        iVar5 = DAT_00437238 + iVar2 * 0xac;
        if ((*(int *)(DAT_00437238 + 8 + iVar2 * 0xac) == 3) && (*(char *)(iVar5 + 0x43) == '\0')) {
          iVar5 = iVar2 * 0xac;
          DAT_004377f0 = iVar2;
          SetFocus(*(HWND *)(iVar5 + DAT_00437238));
          SendMessageA(*(HWND *)(iVar5 + DAT_00437238),0x100,0x20,0);
          SendMessageA(*(HWND *)(iVar5 + DAT_00437238),0x101,0x20,0);
          return 1;
        }
        iVar2 = *(int *)(iVar5 + 0x10);
      }
      break;
    case 0x1b:
      if ((((DAT_00436914 < DAT_00437244) && (*(char *)(DAT_0043723c + DAT_00436914) != '\0')) &&
          (iVar2 = DAT_00437238 + DAT_00436914 * 0xac, *(char *)(iVar2 + 0x43) == '\0')) &&
         (((((iVar5 = *(int *)(iVar2 + 8), iVar5 == 0 || (iVar5 == 1)) ||
            ((iVar5 == 2 || ((iVar5 == 3 || (iVar5 == 4)))))) || (iVar5 == 6)) ||
          (((iVar5 == 0x11 || (iVar5 == 0x12)) || (iVar5 == 0x13)))))) {
        *(undefined1 *)(iVar2 + 0x44) = 1;
        return 1;
      }
      break;
    case 0x26:
      if (DAT_00437244 <= DAT_004377f0) {
        return 0;
      }
      if ((*(char *)(DAT_0043723c + DAT_004377f0) != '\0') &&
         (*(int *)(DAT_00437238 + 8 + DAT_004377f0 * 0xac) == 10)) {
        return 1;
      }
    case 0x25:
      if ((DAT_004377f0 < DAT_00437244) && (*(char *)(DAT_0043723c + DAT_004377f0) != '\0')) {
        switch(*(undefined4 *)(DAT_00437238 + 8 + DAT_004377f0 * 0xac)) {
        case 2:
        case 3:
        case 4:
        case 6:
        case 8:
        case 9:
          FUN_00416ad0();
          return 1;
        }
      }
      break;
    case 0x28:
      if (DAT_00437244 <= DAT_004377f0) {
        return 0;
      }
      if ((*(char *)(DAT_0043723c + DAT_004377f0) != '\0') &&
         (*(int *)(DAT_00437238 + 8 + DAT_004377f0 * 0xac) == 10)) {
        return 1;
      }
    case 0x27:
      if ((DAT_004377f0 < DAT_00437244) && (*(char *)(DAT_0043723c + DAT_004377f0) != '\0')) {
        switch(*(undefined4 *)(DAT_00437238 + 8 + DAT_004377f0 * 0xac)) {
        case 2:
        case 3:
        case 4:
        case 6:
        case 8:
        case 9:
          FUN_004168f0();
          return 1;
        }
      }
      break;
    case 0x46:
      if ((DAT_004377f0 < DAT_00437244) && (*(char *)(DAT_0043723c + DAT_004377f0) != '\0')) {
        iVar2 = *(int *)(DAT_00437238 + 8 + DAT_004377f0 * 0xac);
        if (((0x13 < iVar2) &&
            (((iVar2 < 0x16 && (*(char *)(DAT_00437238 + DAT_004377f0 * 0xac + 0x43) == '\0')) &&
             (DAT_00437338 == (HWND)0x0)))) &&
           ((SVar3 = GetAsyncKeyState(0x11), SVar3 < 0 &&
            (SVar3 = GetAsyncKeyState(0x12), -1 < SVar3)))) {
          if (DAT_00437330 == (char *)0x0) {
            DAT_00437330 = FUN_0040d3a0(0x80);
            *DAT_00437330 = '\0';
          }
          if (DAT_0043733c == 0) {
            DAT_0043733c = RegisterWindowMessageA(s_commdlg_FindReplace_004367a0);
          }
          param_1_004372b0 = (LPFINDREPLACEA)0x28;
          _DAT_004372b4 = DAT_00437308;
          DAT_004372bc = 0x4000;
          if (DAT_00437334 != '\0') {
            DAT_004372bc = 0x4004;
          }
          if (DAT_00437335 != '\0') {
            DAT_004372bc = DAT_004372bc | 2;
          }
          DAT_004372c0 = DAT_00437330;
          _DAT_004372c8 = 0x80;
          DAT_004372cc = DAT_004377f0;
          DAT_00437338 = FindTextA((LPFINDREPLACEA)&param_1_004372b0);
          return 1;
        }
      }
      break;
    case 0x72:
      if ((DAT_004377f0 < DAT_00437244) && (*(char *)(DAT_0043723c + DAT_004377f0) != '\0')) {
        puVar1 = (undefined4 *)(DAT_00437238 + DAT_004377f0 * 0xac);
        iVar2 = *(int *)(DAT_00437238 + 8 + DAT_004377f0 * 0xac);
        if (((0x13 < iVar2) &&
            (((iVar2 < 0x16 && (*(char *)((int)puVar1 + 0x43) == '\0')) &&
             (SVar3 = GetAsyncKeyState(0x11), -1 < SVar3)))) &&
           ((SVar3 = GetAsyncKeyState(0x10), -1 < SVar3 &&
            (SVar3 = GetAsyncKeyState(0x12), -1 < SVar3)))) {
          if ((DAT_00437330 != (char *)0x0) && (*DAT_00437330 != '\0')) {
            SendMessageA((HWND)*puVar1,0x434,0,(LPARAM)&local_c);
            local_4 = DAT_00437330;
            local_c = local_c + 1;
            local_8 = 0xffffffff;
            LVar4 = SendMessageA((HWND)*puVar1,0x438,DAT_004372bc & 6,(LPARAM)&local_c);
            if (-1 < LVar4) {
              local_c = LVar4;
              local_8 = lstrlenA(DAT_00437330);
              local_8 = local_8 + LVar4;
              SendMessageA((HWND)*puVar1,0x437,0,(LPARAM)&local_c);
              SendMessageA((HWND)*puVar1,0xb7,0,0);
            }
          }
          return 1;
        }
      }
    }
  }
  return 0;
}



/******************************************************************************/
/* TARGET 0040c150  FUN_0040c150 */
/******************************************************************************/

void __cdecl FUN_0040c150(undefined4 *param_1)

{
  undefined4 uVar1;
  CHAR local_18 [24];
  
  if ((DAT_004377eb == '\0') && (DAT_004377ec == 0)) {
    FUN_0040b4f0(param_1);
    return;
  }
  if (param_1[1] == 0x203) {
    GetClassNameA((HWND)*param_1,local_18,0x14);
    uVar1 = FUN_00408130((int *)&DAT_00437424,local_18);
    if ((char)uVar1 != '\0') {
      param_1[1] = 0x201;
    }
  }
  FUN_0040b4f0(param_1);
  FUN_0040ba30((int)param_1);
  return;
}



/******************************************************************************/
/* TARGET 0040c1d0  FUN_0040c1d0 */
/******************************************************************************/

void FUN_0040c1d0(void)

{
  HWND pHVar1;
  BOOL BVar2;
  HWND hWnd;
  uint uVar3;
  int iVar4;
  
  pHVar1 = DAT_00437280;
  if ((DAT_00437308 != (HWND)0x0) &&
     (BVar2 = IsWindow(DAT_00437308), pHVar1 = DAT_00437280, BVar2 != 0)) {
    iVar4 = 100;
    hWnd = DAT_00437308;
    while ((hWnd = GetWindow(hWnd,2), pHVar1 = DAT_00437280, hWnd != (HWND)0x0 &&
           ((uVar3 = GetWindowLongA(hWnd,-0x10), uVar3 == 0 ||
            (pHVar1 = hWnd, (uVar3 & 0xd8cf0000) != 0x10cf0000))))) {
      iVar4 = iVar4 + -1;
      if (iVar4 < 1) {
        return;
      }
    }
  }
  DAT_00437280 = pHVar1;
  return;
}



/******************************************************************************/
/* TARGET 0040d2f0  FUN_0040d2f0 */
/******************************************************************************/

uint FUN_0040d2f0(void)

{
  uint uVar1;
  
  if (DAT_00437344 != (HANDLE)0x0) {
    return CONCAT31((int3)((uint)DAT_00437344 >> 8),1);
  }
  DAT_00437344 = HeapCreate(1,0x1000,0);
  if (DAT_00437344 == (HANDLE)0x0) {
    return 0;
  }
  DAT_00437340 = HeapAlloc(DAT_00437344,9,0x1000);
  if (DAT_00437340 == (LPVOID)0x0) {
    return 0;
  }
  uVar1 = FUN_0040d870();
  DAT_00437348 = (char)uVar1;
  return uVar1;
}



/******************************************************************************/
/* TARGET 0040d340  FUN_0040d340 */
/******************************************************************************/

void FUN_0040d340(void)

{
  DAT_00437348 = 0;
  if (DAT_00437344 != (HANDLE)0x0) {
    HeapDestroy(DAT_00437344);
    DAT_00437344 = (HANDLE)0x0;
  }
  return;
}



/******************************************************************************/
/* TARGET 0040d370  FUN_0040d370 */
/******************************************************************************/

void FUN_0040d370(void)

{
  MessageBoxA((HWND)0x0,(&PTR_s_Sorry__this_program_will_be_term_004361d4)[DAT_004361a4 * 8],
              (&PTR_s_Insufficient_Memory_004361d0)[DAT_004361a4 * 8],0x10);
  FUN_004099e0(0xfd);
  return;
}



/******************************************************************************/
/* TARGET 0040d3a0  FUN_0040d3a0 */
/******************************************************************************/

LPVOID __fastcall FUN_0040d3a0(int param_1)

{
  uint *puVar1;
  uint uVar2;
  uint *puVar3;
  LPVOID pvVar4;
  
  if (param_1 < 1) {
    param_1 = 1;
  }
  else if (0x1000 < param_1) goto LAB_0040d3dc;
  puVar3 = (uint *)&DAT_004367c0;
  uVar2 = DAT_004367c8;
  while ((int)uVar2 < param_1) {
    puVar1 = puVar3 + 5;
    puVar3 = puVar3 + 3;
    uVar2 = *puVar1;
  }
  pvVar4 = (LPVOID)FUN_0040d610(puVar3);
  if (pvVar4 != (LPVOID)0x0) {
    return pvVar4;
  }
LAB_0040d3dc:
  pvVar4 = HeapAlloc(DAT_00437344,1,param_1 + 0xffU & 0xffffff00);
  if (pvVar4 == (LPVOID)0x0) {
    FUN_0040d370();
  }
  return pvVar4;
}



/******************************************************************************/
/* TARGET 0040d410  FUN_0040d410 */
/******************************************************************************/

void __fastcall FUN_0040d410(int *param_1)

{
  int *piVar1;
  int iVar2;
  
  if (param_1 != (int *)0x0) {
    if (*(char *)(((uint)param_1 >> 0x14) + DAT_00437340) == '\0') {
      HeapFree(DAT_00437344,1,param_1);
      return;
    }
    iVar2 = ((uint)param_1 >> 8 & 0xff0) + ((uint)param_1 & 0xfff00000);
    if ((0 < *(int *)(iVar2 + 0xc)) &&
       (piVar1 = *(int **)(iVar2 + 8), ((uint)param_1 & piVar1[2] - 1U) == 0)) {
      FUN_0040d670(piVar1,param_1);
    }
  }
  return;
}



/******************************************************************************/
/* TARGET 0040d470  FUN_0040d470 */
/******************************************************************************/

int * __fastcall FUN_0040d470(int *param_1,uint param_2)

{
  int *piVar1;
  int iVar2;
  uint uVar3;
  uint uVar4;
  int *piVar5;
  int *piVar6;
  
  if (param_1 == (int *)0x0) {
    if (0 < (int)param_2) {
      piVar1 = FUN_0040d3a0(param_2);
      return piVar1;
    }
    return (int *)0x0;
  }
  if ((int)param_2 < 1) {
    FUN_0040d410(param_1);
    return (int *)0x0;
  }
  if (*(char *)(((uint)param_1 >> 0x14) + DAT_00437340) == '\0') {
    if (0x800 < (int)param_2) {
      piVar1 = HeapReAlloc(DAT_00437344,1,param_1,param_2 + 0xff & 0xffffff00);
      if (piVar1 == (int *)0x0) {
        FUN_0040d370();
      }
      return piVar1;
    }
    uVar4 = HeapSize(DAT_00437344,1,param_1);
    if (uVar4 != 0xffffffff) {
      piVar1 = FUN_0040d3a0(param_2);
      if (piVar1 != (int *)0x0) {
        piVar5 = param_1;
        piVar6 = piVar1;
        if ((int)param_2 < (int)uVar4) {
          for (uVar3 = param_2 >> 2; uVar4 = param_2, uVar3 != 0; uVar3 = uVar3 - 1) {
            *piVar6 = *piVar5;
            piVar5 = piVar5 + 1;
            piVar6 = piVar6 + 1;
          }
        }
        else {
          for (uVar3 = uVar4 >> 2; uVar3 != 0; uVar3 = uVar3 - 1) {
            *piVar6 = *piVar5;
            piVar5 = piVar5 + 1;
            piVar6 = piVar6 + 1;
          }
        }
        for (uVar4 = uVar4 & 3; uVar4 != 0; uVar4 = uVar4 - 1) {
          *(char *)piVar6 = (char)*piVar5;
          piVar5 = (int *)((int)piVar5 + 1);
          piVar6 = (int *)((int)piVar6 + 1);
        }
        HeapFree(DAT_00437344,1,param_1);
      }
      return piVar1;
    }
    FUN_0040d370();
  }
  else {
    iVar2 = ((uint)param_1 >> 8 & 0xff0) + ((uint)param_1 & 0xfff00000);
    if ((0 < *(int *)(iVar2 + 0xc)) &&
       (uVar4 = *(uint *)(*(int *)(iVar2 + 8) + 8), ((uint)param_1 & uVar4 - 1) == 0)) {
      if (((8 < (int)param_2) || (8 < (int)uVar4)) &&
         (((int)uVar4 < (int)param_2 ||
          ((int)param_2 <= (int)(uVar4 + ((int)uVar4 >> 0x1f & 3U)) >> 2)))) {
        piVar1 = FUN_0040d3a0(param_2);
        if (piVar1 != (int *)0x0) {
          if ((int)uVar4 <= (int)param_2) {
            piVar5 = param_1;
            piVar6 = piVar1;
            for (uVar3 = uVar4 >> 2; uVar3 != 0; uVar3 = uVar3 - 1) {
              *piVar6 = *piVar5;
              piVar5 = piVar5 + 1;
              piVar6 = piVar6 + 1;
            }
            for (uVar4 = uVar4 & 3; uVar4 != 0; uVar4 = uVar4 - 1) {
              *(char *)piVar6 = (char)*piVar5;
              piVar5 = (int *)((int)piVar5 + 1);
              piVar6 = (int *)((int)piVar6 + 1);
            }
            FUN_0040d410(param_1);
            return piVar1;
          }
          piVar5 = param_1;
          piVar6 = piVar1;
          for (uVar4 = param_2 >> 2; uVar4 != 0; uVar4 = uVar4 - 1) {
            *piVar6 = *piVar5;
            piVar5 = piVar5 + 1;
            piVar6 = piVar6 + 1;
          }
          for (uVar4 = param_2 & 3; uVar4 != 0; uVar4 = uVar4 - 1) {
            *(char *)piVar6 = (char)*piVar5;
            piVar5 = (int *)((int)piVar5 + 1);
            piVar6 = (int *)((int)piVar6 + 1);
          }
          FUN_0040d410(param_1);
        }
        return piVar1;
      }
      return param_1;
    }
  }
  return (int *)0x0;
}



/******************************************************************************/
/* TARGET 0040d610  FUN_0040d610 */
/******************************************************************************/

uint __cdecl FUN_0040d610(uint *param_1)

{
  uint *puVar1;
  uint uVar2;
  
  if (*param_1 == 0) {
    uVar2 = FUN_0040d6d0((int *)param_1);
    if ((char)uVar2 == '\0') {
      return 0;
    }
  }
  puVar1 = (uint *)*param_1;
  uVar2 = ((uint)puVar1 >> 8 & 0xff0) + ((uint)puVar1 & 0xfff00000);
  *(int *)(uVar2 + 0xc) = *(int *)(uVar2 + 0xc) + 1;
  if (uVar2 == param_1[1]) {
    param_1[1] = 0;
  }
  uVar2 = *puVar1;
  *param_1 = uVar2;
  if (uVar2 != 0) {
    *(undefined4 *)(uVar2 + 4) = 0;
  }
  return (uint)puVar1;
}



/******************************************************************************/
/* TARGET 0040d670  FUN_0040d670 */
/******************************************************************************/

void __cdecl FUN_0040d670(int *param_1,int *param_2)

{
  int iVar1;
  int iVar2;
  
  iVar2 = ((uint)param_2 >> 8 & 0xff0) + ((uint)param_2 & 0xfff00000);
  param_2[1] = 0;
  iVar1 = *param_1;
  *param_2 = iVar1;
  if (iVar1 != 0) {
    *(int **)(iVar1 + 4) = param_2;
  }
  *param_1 = (int)param_2;
  iVar1 = *(int *)(iVar2 + 0xc) + -1;
  *(int *)(iVar2 + 0xc) = iVar1;
  if (iVar1 == 0) {
    if (param_1[1] != 0) {
      FUN_0040d7a0(param_1);
    }
    param_1[1] = iVar2;
  }
  return;
}



/******************************************************************************/
/* TARGET 0040d6d0  FUN_0040d6d0 */
/******************************************************************************/

uint __cdecl FUN_0040d6d0(int *param_1)

{
  int iVar1;
  int *piVar2;
  uint uVar3;
  int *lpAddress;
  LPVOID pvVar4;
  int iVar5;
  int *piVar6;
  int *piVar7;
  int *piVar8;
  
  if ((DAT_00437350 == (int *)0x0) && (uVar3 = FUN_0040d870(), (char)uVar3 == '\0')) {
    return uVar3;
  }
  piVar2 = DAT_00437350;
  piVar7 = (int *)((uint)DAT_00437350 & 0xfff00000);
  lpAddress = piVar7 + ((uint)DAT_00437350 & 0xfffff) * 0x40;
  pvVar4 = VirtualAlloc(lpAddress,0x1000,0x1000,4);
  if (pvVar4 != (LPVOID)0x0) {
    *piVar7 = *piVar7 + 1;
    if (piVar7 == DAT_0043734c) {
      DAT_0043734c = (int *)0x0;
    }
    DAT_00437350 = (int *)*piVar2;
    if (DAT_00437350 != (int *)0x0) {
      *(undefined4 *)((int)DAT_00437350 + 4) = 0;
    }
    iVar1 = param_1[2];
    piVar6 = (int *)0x0;
    iVar5 = (int)(0x1000 / (longlong)iVar1);
    piVar7 = piVar6;
    piVar8 = lpAddress;
    if (0 < iVar5) {
      do {
        piVar6 = piVar8;
        piVar8 = (int *)((int)piVar6 + iVar1);
        iVar5 = iVar5 + -1;
        piVar6[1] = (int)piVar7;
        *piVar6 = (int)piVar8;
        piVar7 = piVar6;
      } while (iVar5 != 0);
    }
    *piVar6 = *param_1;
    *param_1 = (int)lpAddress;
    piVar2[2] = (int)param_1;
    piVar2[3] = 0;
    param_1[1] = (int)piVar2;
    return CONCAT31((int3)((uint)piVar2 >> 8),1);
  }
  return 0;
}



/******************************************************************************/
/* TARGET 0040d7a0  FUN_0040d7a0 */
/******************************************************************************/

void __cdecl FUN_0040d7a0(int *param_1)

{
  uint *puVar1;
  int iVar2;
  int *piVar3;
  int iVar4;
  int *piVar5;
  int *piVar6;
  int local_4;
  
  puVar1 = (uint *)param_1[1];
  piVar6 = DAT_0043734c;
  if (puVar1 != (uint *)0x0) {
    iVar2 = param_1[2];
    local_4 = (int)(0x1000 / (longlong)iVar2);
    piVar5 = (int *)((uint)puVar1 & 0xfff00000);
    param_1[1] = 0;
    piVar6 = piVar5 + ((uint)puVar1 & 0xfffff) * 0x40;
    if (0 < local_4) {
      do {
        piVar3 = (int *)piVar6[1];
        iVar4 = *piVar6;
        if (piVar3 == (int *)0x0) {
          *param_1 = iVar4;
        }
        else {
          *piVar3 = iVar4;
        }
        if (iVar4 != 0) {
          *(int **)(iVar4 + 4) = piVar3;
        }
        local_4 = local_4 + -1;
        piVar6 = (int *)((int)piVar6 + iVar2);
      } while (local_4 != 0);
    }
    VirtualFree(piVar5 + ((uint)puVar1 & 0xfffff) * 0x40,0x1000,0x4000);
    puVar1[1] = 0;
    *puVar1 = (uint)DAT_00437350;
    if (DAT_00437350 != (uint *)0x0) {
      *(uint **)((int)DAT_00437350 + 4) = puVar1;
    }
    iVar2 = *piVar5;
    DAT_00437350 = puVar1;
    *piVar5 = iVar2 + -1;
    piVar6 = DAT_0043734c;
    if ((iVar2 + -1 == 0) && (piVar6 = piVar5, DAT_0043734c != (int *)0x0)) {
      FUN_0040d940();
    }
  }
  DAT_0043734c = piVar6;
  return;
}



/******************************************************************************/
/* TARGET 0040d870  FUN_0040d870 */
/******************************************************************************/

uint FUN_0040d870(void)

{
  char *pcVar1;
  undefined4 *puVar2;
  undefined4 *lpAddress;
  uint uVar3;
  undefined4 *puVar4;
  LPVOID pvVar5;
  undefined4 *puVar6;
  int iVar7;
  
  iVar7 = 0x77f;
  while( true ) {
    pvVar5 = (LPVOID)(DAT_004367b8 << 0x14);
    pcVar1 = (char *)(DAT_00437340 + DAT_004367b8);
    DAT_004367b8 = DAT_004367b8 + 1;
    if (0x786 < DAT_004367b8) {
      DAT_004367b8 = 8;
    }
    if ((*pcVar1 == '\0') &&
       (lpAddress = VirtualAlloc(pvVar5,0x100000,0x2000,4), lpAddress != (undefined4 *)0x0)) break;
    iVar7 = iVar7 + -1;
    if (iVar7 < 1) {
      return DAT_004367b8 & 0xffffff00;
    }
  }
  pvVar5 = VirtualAlloc(lpAddress,0x1000,0x1000,4);
  if (pvVar5 != (LPVOID)0x0) {
    *pcVar1 = '\x01';
    DAT_0043734c = lpAddress;
    *lpAddress = 0;
    iVar7 = 0xff;
    puVar4 = (undefined4 *)0x0;
    puVar2 = lpAddress + 4;
    do {
      puVar6 = puVar2;
      iVar7 = iVar7 + -1;
      puVar6[1] = puVar4;
      *puVar6 = puVar6 + 4;
      puVar4 = puVar6;
      puVar2 = puVar6 + 4;
    } while (iVar7 != 0);
    *puVar6 = DAT_00437350;
    DAT_00437350 = lpAddress + 4;
    return CONCAT31((int3)((uint)puVar6 >> 8),1);
  }
  uVar3 = VirtualFree(lpAddress,0,0x8000);
  return uVar3 & 0xffffff00;
}



/******************************************************************************/
/* TARGET 0040d940  FUN_0040d940 */
/******************************************************************************/

void FUN_0040d940(void)

{
  int *piVar1;
  int iVar2;
  int *piVar3;
  int *lpAddress;
  int iVar4;
  int iVar5;
  
  lpAddress = DAT_0043734c;
  if (DAT_0043734c != (int *)0x0) {
    DAT_0043734c = (int *)0x0;
    iVar5 = 0xff;
    piVar3 = lpAddress;
    do {
      piVar1 = (int *)piVar3[5];
      iVar2 = piVar3[4];
      iVar4 = iVar2;
      if (piVar1 != (int *)0x0) {
        *piVar1 = iVar2;
        iVar4 = DAT_00437350;
      }
      DAT_00437350 = iVar4;
      if (iVar2 != 0) {
        *(int **)(iVar2 + 4) = piVar1;
      }
      iVar5 = iVar5 + -1;
      piVar3 = piVar3 + 4;
    } while (iVar5 != 0);
    *(undefined1 *)(((uint)lpAddress >> 0x14) + DAT_00437340) = 0;
    VirtualFree(lpAddress,0x1000,0x4000);
    VirtualFree(lpAddress,0,0x8000);
  }
  return;
}



/******************************************************************************/
/* TARGET 0040d9b0  FUN_0040d9b0 */
/******************************************************************************/

int __cdecl FUN_0040d9b0(int param_1)

{
  return (param_1 != 0) - 1;
}



/******************************************************************************/
/* TARGET 0040d9c0  FUN_0040d9c0 */
/******************************************************************************/

longlong FUN_0040d9c0(void)

{
  float10 in_ST0;
  
  return (longlong)ROUND(in_ST0);
}



/******************************************************************************/
/* TARGET 0040d9f0  FUN_0040d9f0 */
/******************************************************************************/

undefined1 __cdecl FUN_0040d9f0(undefined *param_1,int param_2,int param_3,undefined *param_4)

{
  int *piVar1;
  int iVar2;
  char cVar3;
  int iVar4;
  undefined4 *puVar5;
  undefined1 uVar6;
  byte *pbVar7;
  int iVar8;
  int local_20;
  int local_1c;
  int local_14;
  int local_10;
  int local_8;
  
  local_8 = FUN_0040e421(param_3,-1);
  pbVar7 = (byte *)(param_2 * 0x20 + DAT_0043739c);
  iVar8 = param_2 * 0x20 + DAT_004373a0;
  FUN_00401a10(&local_14);
  FUN_00401a10(&local_20);
  if ((*pbVar7 & 1) != 0) {
    iVar4 = 1;
    do {
      param_2 = param_2 + iVar4;
      iVar8 = iVar8 + iVar4 * 0x20;
      for (pbVar7 = pbVar7 + iVar4 * 0x20;
          (iVar4 = DAT_004376d8, *(int *)(pbVar7 + 0x1c) == 1 && ((*pbVar7 & 1) != 0));
          pbVar7 = pbVar7 + 0x20) {
        FUN_004019e0(&local_14,param_2);
        param_2 = param_2 + 1;
        iVar8 = iVar8 + 0x20;
      }
      cVar3 = (*(code *)param_1)();
      iVar2 = local_1c;
      if (cVar3 != '\0') {
        piVar1 = (int *)(local_8 * 0x10 + 4 + DAT_004376d4);
        *piVar1 = *piVar1 + 1;
        FUN_004019e0(&local_20,iVar4);
        for (; -1 < iVar2; iVar2 = iVar2 + -1) {
          iVar4 = *(int *)(local_20 + iVar2 * 4);
          *(int *)(iVar4 * 0x10 + 0xc + DAT_004376d4) = DAT_004376d8 - iVar4;
        }
      }
      while ((0 < local_10 && ((*pbVar7 & 2) == 0))) {
        param_2 = *(int *)(local_14 + -4 + local_10 * 4);
        FUN_00401c50((int)&local_14,1);
        iVar8 = param_2 * 0x20 + DAT_004373a0;
        pbVar7 = (byte *)(param_2 * 0x20 + DAT_0043739c);
      }
      iVar4 = *(int *)(iVar8 + 4);
    } while ((*pbVar7 & 2) != 0);
  }
  puVar5 = (undefined4 *)(DAT_004376d4 + local_8 * 0x10);
  if ((int)puVar5[1] < 0) {
    if (param_4 != &DAT_0041e0f0) {
      uVar6 = 0;
      DAT_004376d8 = local_8;
      goto LAB_0040db40;
    }
    *puVar5 = FUN_00409240;
  }
  puVar5 = (undefined4 *)(local_8 * 0x10 + DAT_004376d4);
  if (puVar5[1] == 0) {
    *puVar5 = param_4;
  }
  uVar6 = 1;
LAB_0040db40:
  thunk_FUN_00401880(&local_20);
  thunk_FUN_00401880(&local_14);
  return uVar6;
}



/******************************************************************************/
/* TARGET 0040db61  FUN_0040db61 */
/******************************************************************************/

/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

uint __cdecl FUN_0040db61(int param_1,int param_2)

{
  int *piVar1;
  int iVar2;
  char cVar3;
  int *in_EAX;
  int iVar4;
  int iVar5;
  int iVar6;
  int iVar7;
  int iVar8;
  byte *pbVar9;
  undefined1 *puVar10;
  int local_3c;
  int *local_34;
  int local_30;
  int local_2c;
  int local_28;
  int local_24;
  int local_20;
  int local_1c;
  int local_18;
  int local_14;
  int local_10;
  int *local_c;
  int local_8;
  
  local_34 = (int *)0x0;
  if (-1 < param_1) {
    iVar5 = DAT_0043739c + param_1 * 0x20;
    in_EAX = *(int **)(iVar5 + 8);
    iVar5 = *(int *)(iVar5 + 4);
    if (iVar5 == 3) {
      if ((((in_EAX < DAT_00437394) &&
           (in_EAX = (int *)((int)in_EAX * 0x20),
           *(int *)((int)(in_EAX + 3) + (int)DAT_004373a8) == 4)) &&
          (in_EAX = *(int **)((int)in_EAX + DAT_0043738c + 8), in_EAX < DAT_004373a4)) &&
         (param_2 == 0x4e4f)) {
        iVar5 = FUN_0040e421(0x41bca0,(int)in_EAX);
        goto LAB_0040e321;
      }
      goto LAB_0040dca9;
    }
    if (((iVar5 != 2) || (DAT_00437398 <= in_EAX)) ||
       (in_EAX = (int *)((int)in_EAX * 0x20), *(int *)((int)in_EAX + DAT_004373ac + 0xc) != 3))
    goto LAB_0040dca9;
    local_34 = *(int **)((int)in_EAX + DAT_00437390 + 8);
  }
  local_c = local_34;
  if (((DAT_00437394 <= local_34) ||
      (iVar5 = (int)local_34 * 0x20, in_EAX = DAT_004373a8, DAT_004373a8[(int)local_34 * 8 + 3] != 4
      )) || (piVar1 = *(int **)(iVar5 + 8 + DAT_0043738c), DAT_004373a4 <= piVar1)) {
LAB_0040dca9:
    return (uint)in_EAX & 0xffffff00;
  }
  iVar6 = -1;
  if (param_2 != 0x4e4f) {
    if ((*(byte *)(DAT_004373a8 + (int)local_34 * 8) & 1) != 0) {
      iVar6 = (int)local_34 + 1;
      while (DAT_004373a8[iVar6 * 8 + 7] != 0x36) {
        if ((*(byte *)(DAT_004373a8 + iVar6 * 8) & 2) == 0) goto LAB_0040dca9;
        iVar6 = iVar6 + *(int *)(iVar6 * 0x20 + 4 + DAT_0043738c);
      }
      local_8 = *(int *)(iVar6 * 0x20 + 4 + DAT_0043738c);
      if (0 < local_8) {
        in_EAX = DAT_004373a8 + iVar6 * 8 + 7;
        do {
          if (*in_EAX == param_2 + -20000) {
            iVar6 = *(int *)(iVar6 * 0x20 + 0x10 + DAT_0043738c);
            if (iVar6 != -1) goto LAB_0040dcc2;
            break;
          }
          iVar6 = iVar6 + 1;
          in_EAX = in_EAX + 8;
          local_8 = local_8 + -1;
        } while (0 < local_8);
      }
    }
    goto LAB_0040dca9;
  }
LAB_0040dcc2:
  if (param_2 < 0x4e51) {
    if (param_2 == 0x4e50) {
      puVar10 = &LAB_00427df0;
      goto LAB_0040dd60;
    }
    if (param_2 == 0x4e4b) {
      puVar10 = &LAB_00428dc0;
      goto LAB_0040dd60;
    }
    if (param_2 == 0x4e4c) {
      puVar10 = &LAB_004257f0;
      goto LAB_0040dd60;
    }
    if (param_2 == 0x4e4d) {
      puVar10 = &LAB_0042e610;
      goto LAB_0040dd60;
    }
    if (param_2 == 0x4e4e) {
      puVar10 = &LAB_004286e0;
      goto LAB_0040dd60;
    }
    in_EAX = (int *)(param_2 + -0x4e4f);
    if (in_EAX != (int *)0x0) goto LAB_0040dca9;
    FUN_0040e421(0x41bc30,(int)piVar1);
  }
  else {
    if (param_2 == 0x4e51) {
      puVar10 = &LAB_0042ea00;
    }
    else if (param_2 == 0x4e53) {
      puVar10 = &LAB_0042ec30;
    }
    else if (param_2 == 0x4e5f) {
      puVar10 = &LAB_00425be0;
    }
    else {
      in_EAX = (int *)(param_2 + -0x4f16);
      if (in_EAX != (int *)0x0) goto LAB_0040dca9;
      puVar10 = &LAB_0042c4e0;
    }
LAB_0040dd60:
    FUN_0040e434((int)puVar10,(int)piVar1,iVar6);
  }
  local_10 = 0;
  local_14 = 0;
  local_18 = 0;
  local_1c = 0;
  local_20 = 0;
  local_24 = 0;
  local_28 = 0;
  local_2c = 0;
  local_30 = 0;
  local_34 = (int *)0x0;
  iVar6 = FUN_0040e421(0x41e120,-1);
  local_3c = *(int *)(iVar5 + 4 + DAT_0043738c);
  local_8 = iVar5;
  if (0 < local_3c) {
    do {
      iVar8 = 1;
      iVar5 = *(int *)(DAT_0043738c + local_8 + 0xc);
      iVar2 = *(int *)(DAT_0043738c + local_8 + 8);
      if (-1 < iVar5) {
        iVar8 = *(int *)(iVar5 * 0x10 + 4 + DAT_00437108);
      }
      iVar7 = -1;
      if (((-1 < param_1) && (iVar8 == 1)) && ((*(byte *)(param_1 * 0x20 + DAT_0043739c) & 1) != 0))
      {
        iVar7 = param_1 + 1;
        while( true ) {
          iVar4 = iVar7 * 0x20;
          pbVar9 = (byte *)(DAT_0043739c + iVar4);
          if (((*(int **)(pbVar9 + 8) == local_c) && (1 < *(int *)(iVar4 + 4 + DAT_004373a0))) &&
             (*(int *)(pbVar9 + 4) == 3)) goto LAB_0040de49;
          if ((*pbVar9 & 2) == 0) break;
          iVar7 = iVar7 + *(int *)(iVar4 + 4 + DAT_004373a0);
        }
        iVar7 = -1;
      }
LAB_0040de49:
      iVar4 = *(int *)(local_8 + 0x1c + (int)DAT_004373a8);
      if (iVar4 < 0x32) {
        if (iVar4 == 0x31) {
          if ((iVar7 < 0) || (cVar3 = FUN_00413e14(iVar7,0x41bf20), cVar3 == '\0')) {
            if (iVar8 == 1) {
              FUN_0040e421(0x41bee0,iVar2);
            }
            else {
              FUN_0040e434(0x41bf00,iVar2,iVar8);
            }
          }
          local_28 = local_28 + iVar8;
          _DAT_0043737c = _DAT_0043737c + iVar8;
        }
        else if (iVar4 == 0x2b) {
          if ((iVar7 < 0) || (cVar3 = FUN_004134b2(iVar7,0x41bd70), cVar3 == '\0')) {
            if (iVar8 == 1) {
              FUN_0040e421(0x41bd30,iVar2);
            }
            else {
              FUN_0040e434(0x41bd50,iVar2,iVar8);
            }
          }
          local_10 = local_10 + iVar8;
          _DAT_00437360 = _DAT_00437360 + iVar8;
        }
        else if (iVar4 == 0x2c) {
          if ((iVar7 < 0) || (cVar3 = FUN_00410c54(iVar7,0x41be80), cVar3 == '\0')) {
            if (iVar8 == 1) {
              FUN_0040e421(0x41be40,iVar2);
            }
            else {
              FUN_0040e434(0x41be60,iVar2,iVar8);
            }
          }
          local_1c = local_1c + iVar8;
          _DAT_00437368 = _DAT_00437368 + iVar8;
        }
        else if (iVar4 == 0x2d) {
          if ((iVar7 < 0) || (cVar3 = FUN_00413c2f(iVar7,0x41c100), cVar3 == '\0')) {
            if (iVar8 == 1) {
              FUN_0040e421(0x41c0c0,iVar2);
            }
            else {
              FUN_0040e434(0x41c0e0,iVar2,iVar8);
            }
          }
          local_2c = local_2c + iVar8;
          _DAT_00437378 = _DAT_00437378 + iVar8;
        }
        else if (iVar4 == 0x2e) {
          if ((iVar7 < 0) || (cVar3 = FUN_00411c82(iVar7,0x41c240), cVar3 == '\0')) {
            if (iVar8 == 1) {
              FUN_0040e421(0x41c200,iVar2);
            }
            else {
              FUN_0040e434(0x41c220,iVar2,iVar8);
            }
          }
          local_30 = local_30 + iVar8;
          _DAT_00437370 = _DAT_00437370 + iVar8;
        }
        else {
          if (iVar4 != 0x30) goto LAB_0040e142;
          if ((iVar7 < 0) || (cVar3 = FUN_00411a9c(iVar7,0x41bfc0), cVar3 == '\0')) {
            if (iVar8 == 1) {
              FUN_0040e421(0x41bf80,iVar2);
            }
            else {
              FUN_0040e434(0x41bfa0,iVar2,iVar8);
            }
          }
          local_20 = local_20 + iVar8;
          _DAT_0043736c = _DAT_0043736c + iVar8;
        }
LAB_0040e12e:
        piVar1 = (int *)(iVar6 * 0x10 + 4 + DAT_004376d4);
        *piVar1 = *piVar1 + 1;
      }
      else {
        if (iVar4 == 0x33) {
          if ((iVar7 < 0) || (cVar3 = FUN_00414426(iVar7,0x41c060), cVar3 == '\0')) {
            if (iVar8 == 1) {
              FUN_0040e421(0x41c020,iVar2);
            }
            else {
              FUN_0040e434(0x41c040,iVar2,iVar8);
            }
          }
          local_14 = local_14 + iVar8;
          _DAT_00437380 = _DAT_00437380 + iVar8;
          goto LAB_0040e12e;
        }
        if (iVar4 == 0x38) {
          FUN_0040e421(0x41bcf0,iVar5);
          local_34 = (int *)((int)local_34 + 1);
          _DAT_00437384 = _DAT_00437384 + 1;
          goto LAB_0040e12e;
        }
        if (iVar4 == 0x3f) {
          if ((iVar7 < 0) || (cVar3 = FUN_004117c0(iVar7,0x41be00), cVar3 == '\0')) {
            if (iVar8 == 1) {
              FUN_0040e421(0x41bdc0,iVar2);
            }
            else {
              FUN_0040e434(0x41bde0,iVar2,iVar8);
            }
          }
          local_18 = local_18 + iVar8;
          _DAT_00437364 = _DAT_00437364 + iVar8;
          goto LAB_0040e12e;
        }
        if (iVar4 == 0xf6) {
          if ((iVar7 < 0) || (cVar3 = FUN_0041392a(iVar7,0x41c1a0), cVar3 == '\0')) {
            if (iVar8 == 1) {
              FUN_0040e421(0x41c160,iVar2);
            }
            else {
              FUN_0040e434(0x41c180,iVar2,iVar8);
            }
          }
          local_24 = local_24 + iVar8;
          _DAT_00437374 = _DAT_00437374 + iVar8;
          goto LAB_0040e12e;
        }
      }
LAB_0040e142:
      local_c = (int *)((int)local_c + 1);
      local_3c = local_3c + -1;
      local_8 = local_8 + 0x20;
    } while (local_3c != 0);
  }
  iVar6 = FUN_0040e421(0x41e120,-1);
  iVar5 = iVar6;
  if (0 < local_10) {
    FUN_0040e421(0x41bda0,local_10);
    iVar5 = DAT_004376d4;
    piVar1 = (int *)(iVar6 * 0x10 + 4 + DAT_004376d4);
    *piVar1 = *piVar1 + 1;
    _DAT_00437360 = _DAT_00437360 - local_10;
    iVar5 = iVar6 * 0x10 + 4 + iVar5;
  }
  if (0 < local_14) {
    FUN_0040e421(0x41c0a0,local_14);
    iVar5 = DAT_004376d4;
    piVar1 = (int *)(iVar6 * 0x10 + 4 + DAT_004376d4);
    *piVar1 = *piVar1 + 1;
    _DAT_00437380 = _DAT_00437380 - local_14;
    iVar5 = iVar6 * 0x10 + 4 + iVar5;
  }
  if (0 < local_18) {
    FUN_0040e421(0x41be20,local_18);
    iVar5 = DAT_004376d4;
    piVar1 = (int *)(iVar6 * 0x10 + 4 + DAT_004376d4);
    *piVar1 = *piVar1 + 1;
    _DAT_00437364 = _DAT_00437364 - local_18;
    iVar5 = iVar6 * 0x10 + 4 + iVar5;
  }
  if (0 < local_1c) {
    FUN_0040e421(0x41bec0,local_1c);
    iVar5 = DAT_004376d4;
    piVar1 = (int *)(iVar6 * 0x10 + 4 + DAT_004376d4);
    *piVar1 = *piVar1 + 1;
    _DAT_00437368 = _DAT_00437368 - local_1c;
    iVar5 = iVar6 * 0x10 + 4 + iVar5;
  }
  if (0 < local_20) {
    FUN_0040e421(0x41c000,local_20);
    iVar5 = DAT_004376d4;
    piVar1 = (int *)(iVar6 * 0x10 + 4 + DAT_004376d4);
    *piVar1 = *piVar1 + 1;
    _DAT_0043736c = _DAT_0043736c - local_20;
    iVar5 = iVar6 * 0x10 + 4 + iVar5;
  }
  if (0 < local_24) {
    FUN_0040e421(0x41c1e0,local_24);
    iVar5 = DAT_004376d4;
    piVar1 = (int *)(iVar6 * 0x10 + 4 + DAT_004376d4);
    *piVar1 = *piVar1 + 1;
    _DAT_00437374 = _DAT_00437374 - local_24;
    iVar5 = iVar6 * 0x10 + 4 + iVar5;
  }
  if (0 < local_28) {
    FUN_0040e421(0x41bf60,local_28);
    iVar5 = DAT_004376d4;
    piVar1 = (int *)(iVar6 * 0x10 + 4 + DAT_004376d4);
    *piVar1 = *piVar1 + 1;
    _DAT_0043737c = _DAT_0043737c - local_28;
    iVar5 = iVar6 * 0x10 + 4 + iVar5;
  }
  if (0 < local_2c) {
    FUN_0040e421(0x41c140,local_2c);
    iVar5 = DAT_004376d4;
    piVar1 = (int *)(iVar6 * 0x10 + 4 + DAT_004376d4);
    *piVar1 = *piVar1 + 1;
    _DAT_00437378 = _DAT_00437378 - local_2c;
    iVar5 = iVar6 * 0x10 + 4 + iVar5;
  }
  if (0 < local_30) {
    FUN_0040e421(0x41c280,local_30);
    iVar5 = DAT_004376d4;
    piVar1 = (int *)(iVar6 * 0x10 + 4 + DAT_004376d4);
    *piVar1 = *piVar1 + 1;
    _DAT_00437370 = _DAT_00437370 - local_30;
    iVar5 = iVar6 * 0x10 + 4 + iVar5;
  }
  if (0 < (int)local_34) {
    FUN_0040e421(0x41bd10,(int)local_34);
    iVar5 = DAT_004376d4;
    piVar1 = (int *)(iVar6 * 0x10 + 4 + DAT_004376d4);
    *piVar1 = *piVar1 + 1;
    _DAT_00437384 = _DAT_00437384 - (int)local_34;
    iVar5 = iVar6 * 0x10 + 4 + iVar5;
  }
LAB_0040e321:
  return CONCAT31((int3)((uint)iVar5 >> 8),1);
}



/******************************************************************************/
/* TARGET 0040de20  FUN_0040de20 */
/******************************************************************************/

/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

undefined4 __fastcall FUN_0040de20(int param_1,int param_2)

{
  int *piVar1;
  int iVar2;
  char cVar3;
  int iVar4;
  int in_EAX;
  int iVar5;
  int unaff_EBX;
  int unaff_EBP;
  int unaff_ESI;
  byte *unaff_EDI;
  
  do {
    if ((1 < *(int *)(in_EAX + 4 + unaff_EBX)) && (*(int *)(unaff_EDI + 4) == 3)) {
      iVar4 = *(int *)(unaff_EBP + -0x34);
      goto LAB_0040de49;
    }
    do {
      if ((*unaff_EDI & 2) == 0) {
        iVar4 = *(int *)(unaff_EBP + -0x34);
        param_1 = *(int *)(unaff_EBP + -0x3c);
LAB_0040de49:
        do {
          iVar2 = *(int *)(*(int *)(unaff_EBP + -4) + 0x1c + DAT_004373a8);
          if (iVar2 < 0x32) {
            if (iVar2 == 0x31) {
              if ((param_1 < 0) || (cVar3 = FUN_00413e14(param_1,0x41bf20), cVar3 == '\0')) {
                if (unaff_ESI == 1) {
                  FUN_0040e421(0x41bee0,iVar4);
                }
                else {
                  FUN_0040e434(0x41bf00,iVar4,unaff_ESI);
                }
              }
              *(int *)(unaff_EBP + -0x24) = *(int *)(unaff_EBP + -0x24) + unaff_ESI;
              _DAT_0043737c = _DAT_0043737c + unaff_ESI;
            }
            else if (iVar2 == 0x2b) {
              if ((param_1 < 0) || (cVar3 = FUN_004134b2(param_1,0x41bd70), cVar3 == '\0')) {
                if (unaff_ESI == 1) {
                  FUN_0040e421(0x41bd30,iVar4);
                }
                else {
                  FUN_0040e434(0x41bd50,iVar4,unaff_ESI);
                }
              }
              *(int *)(unaff_EBP + -0xc) = *(int *)(unaff_EBP + -0xc) + unaff_ESI;
              _DAT_00437360 = _DAT_00437360 + unaff_ESI;
            }
            else if (iVar2 == 0x2c) {
              if ((param_1 < 0) || (cVar3 = FUN_00410c54(param_1,0x41be80), cVar3 == '\0')) {
                if (unaff_ESI == 1) {
                  FUN_0040e421(0x41be40,iVar4);
                }
                else {
                  FUN_0040e434(0x41be60,iVar4,unaff_ESI);
                }
              }
              *(int *)(unaff_EBP + -0x18) = *(int *)(unaff_EBP + -0x18) + unaff_ESI;
              _DAT_00437368 = _DAT_00437368 + unaff_ESI;
            }
            else if (iVar2 == 0x2d) {
              if ((param_1 < 0) || (cVar3 = FUN_00413c2f(param_1,0x41c100), cVar3 == '\0')) {
                if (unaff_ESI == 1) {
                  FUN_0040e421(0x41c0c0,iVar4);
                }
                else {
                  FUN_0040e434(0x41c0e0,iVar4,unaff_ESI);
                }
              }
              *(int *)(unaff_EBP + -0x28) = *(int *)(unaff_EBP + -0x28) + unaff_ESI;
              _DAT_00437378 = _DAT_00437378 + unaff_ESI;
            }
            else if (iVar2 == 0x2e) {
              if ((param_1 < 0) || (cVar3 = FUN_00411c82(param_1,0x41c240), cVar3 == '\0')) {
                if (unaff_ESI == 1) {
                  FUN_0040e421(0x41c200,iVar4);
                }
                else {
                  FUN_0040e434(0x41c220,iVar4,unaff_ESI);
                }
              }
              *(int *)(unaff_EBP + -0x2c) = *(int *)(unaff_EBP + -0x2c) + unaff_ESI;
              _DAT_00437370 = _DAT_00437370 + unaff_ESI;
            }
            else {
              if (iVar2 != 0x30) goto LAB_0040e142;
              if ((param_1 < 0) || (cVar3 = FUN_00411a9c(param_1,0x41bfc0), cVar3 == '\0')) {
                if (unaff_ESI == 1) {
                  FUN_0040e421(0x41bf80,iVar4);
                }
                else {
                  FUN_0040e434(0x41bfa0,iVar4,unaff_ESI);
                }
              }
              *(int *)(unaff_EBP + -0x1c) = *(int *)(unaff_EBP + -0x1c) + unaff_ESI;
              _DAT_0043736c = _DAT_0043736c + unaff_ESI;
            }
LAB_0040e12e:
            piVar1 = (int *)(*(int *)(unaff_EBP + 0xc) * 0x10 + 4 + DAT_004376d4);
            *piVar1 = *piVar1 + 1;
          }
          else {
            if (iVar2 == 0x33) {
              if ((param_1 < 0) || (cVar3 = FUN_00414426(param_1,0x41c060), cVar3 == '\0')) {
                if (unaff_ESI == 1) {
                  FUN_0040e421(0x41c020,iVar4);
                }
                else {
                  FUN_0040e434(0x41c040,iVar4,unaff_ESI);
                }
              }
              *(int *)(unaff_EBP + -0x10) = *(int *)(unaff_EBP + -0x10) + unaff_ESI;
              _DAT_00437380 = _DAT_00437380 + unaff_ESI;
              goto LAB_0040e12e;
            }
            if (iVar2 == 0x38) {
              FUN_0040e421(0x41bcf0,param_2);
              *(int *)(unaff_EBP + -0x30) = *(int *)(unaff_EBP + -0x30) + 1;
              _DAT_00437384 = _DAT_00437384 + 1;
              goto LAB_0040e12e;
            }
            if (iVar2 == 0x3f) {
              if ((param_1 < 0) || (cVar3 = FUN_004117c0(param_1,0x41be00), cVar3 == '\0')) {
                if (unaff_ESI == 1) {
                  FUN_0040e421(0x41bdc0,iVar4);
                }
                else {
                  FUN_0040e434(0x41bde0,iVar4,unaff_ESI);
                }
              }
              *(int *)(unaff_EBP + -0x14) = *(int *)(unaff_EBP + -0x14) + unaff_ESI;
              _DAT_00437364 = _DAT_00437364 + unaff_ESI;
              goto LAB_0040e12e;
            }
            if (iVar2 == 0xf6) {
              if ((param_1 < 0) || (cVar3 = FUN_0041392a(param_1,0x41c1a0), cVar3 == '\0')) {
                if (unaff_ESI == 1) {
                  FUN_0040e421(0x41c160,iVar4);
                }
                else {
                  FUN_0040e434(0x41c180,iVar4,unaff_ESI);
                }
              }
              *(int *)(unaff_EBP + -0x20) = *(int *)(unaff_EBP + -0x20) + unaff_ESI;
              _DAT_00437374 = _DAT_00437374 + unaff_ESI;
              goto LAB_0040e12e;
            }
          }
LAB_0040e142:
          *(int *)(unaff_EBP + -8) = *(int *)(unaff_EBP + -8) + 1;
          *(int *)(unaff_EBP + -4) = *(int *)(unaff_EBP + -4) + 0x20;
          piVar1 = (int *)(unaff_EBP + -0x38);
          *piVar1 = *piVar1 + -1;
          if (*piVar1 == 0) {
            iVar5 = FUN_0040e421(0x41e120,-1);
            iVar2 = *(int *)(unaff_EBP + -0xc);
            iVar4 = iVar5;
            if (0 < iVar2) {
              FUN_0040e421(0x41bda0,iVar2);
              iVar4 = DAT_004376d4;
              piVar1 = (int *)(iVar5 * 0x10 + 4 + DAT_004376d4);
              *piVar1 = *piVar1 + 1;
              _DAT_00437360 = _DAT_00437360 - iVar2;
              iVar4 = iVar5 * 0x10 + 4 + iVar4;
            }
            iVar2 = *(int *)(unaff_EBP + -0x10);
            if (0 < iVar2) {
              FUN_0040e421(0x41c0a0,iVar2);
              iVar4 = DAT_004376d4;
              piVar1 = (int *)(iVar5 * 0x10 + 4 + DAT_004376d4);
              *piVar1 = *piVar1 + 1;
              _DAT_00437380 = _DAT_00437380 - iVar2;
              iVar4 = iVar5 * 0x10 + 4 + iVar4;
            }
            iVar2 = *(int *)(unaff_EBP + -0x14);
            if (0 < iVar2) {
              FUN_0040e421(0x41be20,iVar2);
              iVar4 = DAT_004376d4;
              piVar1 = (int *)(iVar5 * 0x10 + 4 + DAT_004376d4);
              *piVar1 = *piVar1 + 1;
              _DAT_00437364 = _DAT_00437364 - iVar2;
              iVar4 = iVar5 * 0x10 + 4 + iVar4;
            }
            iVar2 = *(int *)(unaff_EBP + -0x18);
            if (0 < iVar2) {
              FUN_0040e421(0x41bec0,iVar2);
              iVar4 = DAT_004376d4;
              piVar1 = (int *)(iVar5 * 0x10 + 4 + DAT_004376d4);
              *piVar1 = *piVar1 + 1;
              _DAT_00437368 = _DAT_00437368 - iVar2;
              iVar4 = iVar5 * 0x10 + 4 + iVar4;
            }
            iVar2 = *(int *)(unaff_EBP + -0x1c);
            if (0 < iVar2) {
              FUN_0040e421(0x41c000,iVar2);
              iVar4 = DAT_004376d4;
              piVar1 = (int *)(iVar5 * 0x10 + 4 + DAT_004376d4);
              *piVar1 = *piVar1 + 1;
              _DAT_0043736c = _DAT_0043736c - iVar2;
              iVar4 = iVar5 * 0x10 + 4 + iVar4;
            }
            iVar2 = *(int *)(unaff_EBP + -0x20);
            if (0 < iVar2) {
              FUN_0040e421(0x41c1e0,iVar2);
              iVar4 = DAT_004376d4;
              piVar1 = (int *)(iVar5 * 0x10 + 4 + DAT_004376d4);
              *piVar1 = *piVar1 + 1;
              _DAT_00437374 = _DAT_00437374 - iVar2;
              iVar4 = iVar5 * 0x10 + 4 + iVar4;
            }
            iVar2 = *(int *)(unaff_EBP + -0x24);
            if (0 < iVar2) {
              FUN_0040e421(0x41bf60,iVar2);
              iVar4 = DAT_004376d4;
              piVar1 = (int *)(iVar5 * 0x10 + 4 + DAT_004376d4);
              *piVar1 = *piVar1 + 1;
              _DAT_0043737c = _DAT_0043737c - iVar2;
              iVar4 = iVar5 * 0x10 + 4 + iVar4;
            }
            iVar2 = *(int *)(unaff_EBP + -0x28);
            if (0 < iVar2) {
              FUN_0040e421(0x41c140,iVar2);
              iVar4 = DAT_004376d4;
              piVar1 = (int *)(iVar5 * 0x10 + 4 + DAT_004376d4);
              *piVar1 = *piVar1 + 1;
              _DAT_00437378 = _DAT_00437378 - iVar2;
              iVar4 = iVar5 * 0x10 + 4 + iVar4;
            }
            iVar2 = *(int *)(unaff_EBP + -0x2c);
            if (0 < iVar2) {
              FUN_0040e421(0x41c280,iVar2);
              iVar4 = DAT_004376d4;
              piVar1 = (int *)(iVar5 * 0x10 + 4 + DAT_004376d4);
              *piVar1 = *piVar1 + 1;
              _DAT_00437370 = _DAT_00437370 - iVar2;
              iVar4 = iVar5 * 0x10 + 4 + iVar4;
            }
            iVar2 = *(int *)(unaff_EBP + -0x30);
            if (0 < iVar2) {
              FUN_0040e421(0x41bd10,iVar2);
              iVar4 = DAT_004376d4;
              piVar1 = (int *)(iVar5 * 0x10 + 4 + DAT_004376d4);
              *piVar1 = *piVar1 + 1;
              _DAT_00437384 = _DAT_00437384 - iVar2;
              iVar4 = iVar5 * 0x10 + 4 + iVar4;
            }
            return CONCAT31((int3)((uint)iVar4 >> 8),1);
          }
          iVar4 = DAT_0043738c + *(int *)(unaff_EBP + -4);
          unaff_ESI = 1;
          param_2 = *(int *)(iVar4 + 0xc);
          iVar4 = *(int *)(iVar4 + 8);
          *(int *)(unaff_EBP + -0x34) = iVar4;
          if (-1 < param_2) {
            unaff_ESI = *(int *)(param_2 * 0x10 + 4 + DAT_00437108);
          }
          param_1 = -1;
          *(undefined4 *)(unaff_EBP + -0x3c) = 0xffffffff;
        } while (((*(int *)(unaff_EBP + 8) < 0) || (unaff_ESI != 1)) ||
                ((*(byte *)(*(int *)(unaff_EBP + 8) * 0x20 + DAT_0043739c) & 1) == 0));
        param_1 = *(int *)(unaff_EBP + 8) + 1;
      }
      else {
        param_1 = param_1 + *(int *)(in_EAX + 4 + DAT_004373a0);
      }
      in_EAX = param_1 * 0x20;
      unaff_EDI = (byte *)(DAT_0043739c + in_EAX);
      unaff_EBX = DAT_004373a0;
    } while (*(int *)(unaff_EDI + 8) != *(int *)(unaff_EBP + -8));
  } while( true );
}



/******************************************************************************/
/* TARGET 0040e328  FUN_0040e328 */
/******************************************************************************/

void FUN_0040e328(void)

{
  undefined1 *puVar1;
  undefined4 uVar2;
  undefined4 *puVar3;
  int iVar4;
  
  iVar4 = 0;
  if (0 < DAT_004373a4) {
    do {
      *(int *)(iVar4 * 0x20 + 0x18 + DAT_004373a0) = DAT_004376d8;
      FUN_0040d9f0(&LAB_0040e908,iVar4,0x41e120,&DAT_0041e0f0);
      iVar4 = iVar4 + *(int *)(iVar4 * 0x20 + 4 + DAT_004373a0);
    } while (iVar4 < DAT_004373a4);
  }
  DAT_004376d0 = DAT_004376d8;
  uVar2 = FUN_0040db61(-1,0x4e4f);
  if ((char)uVar2 == '\0') {
    DAT_004376d0 = 0;
  }
  puVar3 = DAT_004376d4;
  iVar4 = DAT_004376d8;
  if (0 < DAT_004376d8) {
    do {
      puVar1 = (undefined1 *)*puVar3;
      if ((((((puVar1 == &LAB_0041bca0) || (puVar1 == &LAB_0041bc30)) || (puVar1 == &LAB_00428dc0))
           || ((puVar1 == &LAB_0042ec30 || (puVar1 == &LAB_00425be0)))) ||
          ((puVar1 == &LAB_004257f0 || ((puVar1 == &LAB_00427df0 || (puVar1 == &LAB_0042c4e0))))))
         || ((puVar1 == &LAB_0042ea00 || ((puVar1 == &LAB_0042e610 || (puVar1 == &LAB_004286e0))))))
      {
        puVar3[1] = *(undefined4 *)(puVar3[1] * 0x20 + 0x18 + DAT_004373a0);
      }
      iVar4 = iVar4 + -1;
      puVar3 = puVar3 + 4;
    } while (iVar4 != 0);
  }
  return;
}



/******************************************************************************/
/* TARGET 0040e410  FUN_0040e410 */
/******************************************************************************/

void __cdecl FUN_0040e410(int param_1)

{
  FUN_0040e434(param_1,0,-1);
  return;
}



/******************************************************************************/
/* TARGET 0040e421  FUN_0040e421 */
/******************************************************************************/

void __cdecl FUN_0040e421(int param_1,int param_2)

{
  FUN_0040e434(param_1,param_2,-1);
  return;
}



/******************************************************************************/
/* TARGET 0040e434  FUN_0040e434 */
/******************************************************************************/

int __cdecl FUN_0040e434(int param_1,int param_2,int param_3)

{
  int *piVar1;
  
  if (DAT_004376dc <= DAT_004376d8) {
    DAT_004376dc = DAT_004376dc + 0x100;
    DAT_004376d4 = FUN_0040d470(DAT_004376d4,DAT_004376dc * 0x10);
  }
  piVar1 = DAT_004376d4 + DAT_004376d8 * 4;
  DAT_004376d8 = DAT_004376d8 + 1;
  piVar1[3] = 0;
  *piVar1 = param_1;
  piVar1[1] = param_2;
  piVar1[2] = param_3;
  return DAT_004376d8 + -1;
}



/******************************************************************************/
/* TARGET 0040e494  FUN_0040e494 */
/******************************************************************************/

uint __cdecl FUN_0040e494(int param_1)

{
  uint uVar1;
  int *piVar2;
  char cVar3;
  undefined4 uVar4;
  int iVar5;
  int iVar6;
  int iVar7;
  int iVar8;
  byte *pbVar9;
  int local_3c;
  int local_38;
  int local_30;
  int local_2c;
  uint local_24;
  byte *local_20;
  int local_1c;
  int local_18;
  int local_14;
  int local_10;
  undefined4 local_c;
  uint local_8;
  
  iVar8 = param_1 * 0x20;
  pbVar9 = (byte *)(iVar8 + DAT_0043739c);
  iVar6 = iVar8 + DAT_004373a0;
  local_8 = DAT_004373a0;
  if ((*(byte *)(iVar8 + DAT_0043739c) & 1) != 0) {
    local_8 = FUN_0040e421(0x41b6c0,0);
    iVar7 = 1;
    local_10 = param_1;
    local_18 = iVar6;
    do {
      local_10 = local_10 + iVar7;
      pbVar9 = pbVar9 + iVar7 * 0x20;
      local_18 = local_18 + iVar7 * 0x20;
      if ((*(int *)(pbVar9 + 0x1c) == 0xc) && ((*pbVar9 & 1) != 0)) {
        uVar1 = local_10 + 1;
        cVar3 = FUN_00411d37(uVar1);
        if (cVar3 != '\0') {
          local_c = 6;
LAB_0040e59e:
          FUN_00401a10(&local_3c);
          pbVar9 = (byte *)(iVar8 + DAT_0043739c);
          iVar7 = DAT_004373a0 + iVar8;
          local_14 = 0;
          iVar6 = 1;
          local_10 = param_1;
          while( true ) {
            local_10 = local_10 + iVar6;
            pbVar9 = pbVar9 + iVar6 * 0x20;
            iVar7 = iVar7 + iVar6 * 0x20;
            local_18 = iVar7;
            if ((*(int *)(pbVar9 + 0x1c) == 0xd) && ((*pbVar9 & 1) != 0)) break;
LAB_0040e7c8:
            iVar6 = *(int *)(iVar7 + 4);
            if ((*pbVar9 & 2) == 0) {
              FUN_00401a10(&local_30);
              FUN_004019e0(&local_30,DAT_004376d8);
              FUN_004109bd(param_1,0x4e2f);
              local_10 = param_1;
              iVar6 = 1;
              pbVar9 = (byte *)(iVar8 + DAT_0043739c);
              iVar8 = iVar8 + DAT_004373a0;
              local_14 = 0;
              do {
                uVar1 = DAT_004376d8;
                local_10 = local_10 + iVar6;
                pbVar9 = pbVar9 + iVar6 * 0x20;
                iVar8 = iVar8 + iVar6 * 0x20;
                if ((*(int *)(pbVar9 + 0x1c) == 0xd) && ((*pbVar9 & 1) != 0)) {
                  local_14 = local_14 + -1;
                  cVar3 = FUN_0040d9f0(&LAB_0040e908,local_10,0x41e120,&DAT_0041e0f0);
                  if (cVar3 == '\0') {
                    FUN_0040e410(0x409240);
                  }
                  FUN_004019e0(&local_30,uVar1);
                  iVar6 = local_38;
                  while (iVar6 = iVar6 + -1, -1 < iVar6) {
                    iVar7 = *(int *)(local_3c + iVar6 * 4);
                    piVar2 = (int *)(iVar7 * 0x10 + 0xc + DAT_004376d4);
                    if (*piVar2 == local_14) {
                      *piVar2 = uVar1 - iVar7;
                    }
                  }
                }
                iVar6 = *(int *)(iVar8 + 4);
              } while ((*pbVar9 & 2) != 0);
              while (local_2c = local_2c + -1, -1 < local_2c) {
                iVar6 = *(int *)(local_30 + local_2c * 4);
                *(uint *)(iVar6 * 0x10 + 0xc + DAT_004376d4) = DAT_004376d8 - iVar6;
              }
              thunk_FUN_00401880(&local_30);
              uVar4 = thunk_FUN_00401880(&local_3c);
              return CONCAT31((int3)((uint)uVar4 >> 8),1);
            }
          }
          local_14 = local_14 + -1;
          local_20 = pbVar9 + 0x20;
          local_1c = iVar7 + 0x20;
          iVar6 = local_10 + 1;
          do {
            uVar1 = DAT_004376d8;
            if ((*(int *)(local_20 + 0x1c) == 0xe) && ((*local_20 & 1) != 0)) {
              local_24 = iVar6 + 1;
              switch(local_c) {
              case 6:
                cVar3 = FUN_00411d37(local_24);
                break;
              case 7:
                cVar3 = FUN_00413e87(local_24);
                break;
              case 8:
                cVar3 = FUN_00410d31(local_24);
                break;
              case 9:
                uVar4 = FUN_00410a52(local_24);
                cVar3 = (char)uVar4;
                break;
              case 10:
                uVar4 = FUN_004118c0(local_24);
                cVar3 = (char)uVar4;
                break;
              case 0xb:
                uVar4 = FUN_00413593(local_24);
                cVar3 = (char)uVar4;
                break;
              case 0xc:
                uVar4 = FUN_00413d0c(local_24);
                cVar3 = (char)uVar4;
                break;
              case 0xd:
                cVar3 = FUN_00413a07(local_24);
                break;
              case 0xe:
                uVar4 = FUN_00411b79(local_24);
                cVar3 = (char)uVar4;
                break;
              default:
                goto LAB_0040e79e;
              }
              if (cVar3 != '\0') {
                piVar2 = (int *)(local_8 * 0x10 + 4 + DAT_004376d4);
                *piVar2 = *piVar2 + 1;
                FUN_004019e0(&local_3c,uVar1);
                *(int *)(uVar1 * 0x10 + 0xc + DAT_004376d4) = local_14;
              }
LAB_0040e79e:
              iVar6 = local_24 - 1;
              iVar7 = local_18;
            }
            if ((*local_20 & 2) == 0) goto LAB_0040e7c8;
            iVar6 = iVar6 + *(int *)(local_1c + 4);
            iVar5 = *(int *)(local_1c + 4) * 0x20;
            local_20 = local_20 + iVar5;
            local_1c = local_1c + iVar5;
          } while( true );
        }
        cVar3 = FUN_00410d31(uVar1);
        if (cVar3 != '\0') {
          local_c = 8;
          *(undefined1 **)(local_8 * 0x10 + DAT_004376d4) = &LAB_0041b740;
          goto LAB_0040e59e;
        }
        uVar4 = FUN_00410a52(uVar1);
        if ((char)uVar4 != '\0') {
          local_c = 9;
          *(undefined1 **)(local_8 * 0x10 + DAT_004376d4) = &LAB_0041b7b0;
          goto LAB_0040e59e;
        }
        uVar4 = FUN_004118c0(uVar1);
        if ((char)uVar4 != '\0') {
          local_c = 10;
          *(undefined1 **)(local_8 * 0x10 + DAT_004376d4) = &LAB_0041b900;
          goto LAB_0040e59e;
        }
        uVar4 = FUN_00413d0c(uVar1);
        if ((char)uVar4 != '\0') {
          local_c = 0xc;
          *(undefined1 **)(local_8 * 0x10 + DAT_004376d4) = &LAB_0041b850;
          goto LAB_0040e59e;
        }
        uVar4 = FUN_00411b79(uVar1);
        if ((char)uVar4 != '\0') {
          local_c = 0xe;
          *(undefined1 **)(local_8 * 0x10 + DAT_004376d4) = &LAB_0041b9a0;
          goto LAB_0040e59e;
        }
        uVar4 = FUN_00413593(uVar1);
        if ((char)uVar4 != '\0') {
          local_c = 0xb;
          *(undefined1 **)(local_8 * 0x10 + DAT_004376d4) = &LAB_0041bb90;
          goto LAB_0040e59e;
        }
        cVar3 = FUN_00413a07(uVar1);
        if (cVar3 != '\0') {
          local_c = 0xd;
          *(undefined1 **)(local_8 * 0x10 + DAT_004376d4) = &LAB_0041baf0;
          goto LAB_0040e59e;
        }
        cVar3 = FUN_00413e87(uVar1);
        if (cVar3 != '\0') {
          local_c = 7;
          *(undefined1 **)(local_8 * 0x10 + DAT_004376d4) = &LAB_0041ba40;
          goto LAB_0040e59e;
        }
      }
      iVar7 = *(int *)(local_18 + 4);
    } while ((*pbVar9 & 2) != 0);
    DAT_004376d8 = local_8;
  }
  return local_8 & 0xffffff00;
}



/******************************************************************************/
/* TARGET 0040f990  FUN_0040f990 */
/******************************************************************************/

undefined1 FUN_0040f990(void)

{
  int unaff_ESI;
  
  FUN_00413525(unaff_ESI,0x4f73,0);
  FUN_00413525(unaff_ESI,0x4f74,0x3ff0000000000000);
  return 1;
}



/******************************************************************************/
/* TARGET 004109bd  FUN_004109bd */
/******************************************************************************/

void __cdecl FUN_004109bd(int param_1,int param_2)

{
  int iVar1;
  char cVar2;
  int iVar3;
  byte *pbVar4;
  int iVar5;
  
  iVar1 = DAT_004376d8;
  iVar3 = param_1 * 0x20;
  pbVar4 = (byte *)(iVar3 + DAT_0043739c);
  iVar5 = iVar3 + DAT_004373a0;
  if ((*(byte *)(iVar3 + DAT_0043739c) & 1) != 0) {
    iVar3 = 1;
    do {
      param_1 = param_1 + iVar3;
      pbVar4 = pbVar4 + iVar3 * 0x20;
      iVar5 = iVar5 + iVar3 * 0x20;
      if ((*(int *)(pbVar4 + 0x1c) == param_2 + -20000) && ((*pbVar4 & 1) != 0)) {
        cVar2 = FUN_0040d9f0(&LAB_0040e908,param_1,0x41e120,&DAT_0041e0f0);
        if (cVar2 != '\0') goto LAB_00410a39;
      }
      iVar3 = *(int *)(iVar5 + 4);
    } while ((*pbVar4 & 2) != 0);
  }
  FUN_0040e410(0x409240);
LAB_00410a39:
  *(int *)(iVar1 * 0x10 + 0xc + DAT_004376d4) = DAT_004376d8 - iVar1;
  return;
}



/******************************************************************************/
/* TARGET 00410a52  FUN_00410a52 */
/******************************************************************************/

/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

uint __fastcall FUN_00410a52(uint param_1)

{
  uint in_EAX;
  undefined4 uVar1;
  uint uVar2;
  int iVar3;
  byte *pbVar4;
  undefined1 *puVar5;
  code *pcVar6;
  
  if (DAT_004373a4 <= param_1) {
LAB_00410a5e:
    return in_EAX & 0xffffff00;
  }
  pbVar4 = (byte *)(param_1 * 0x20 + DAT_0043739c);
  in_EAX = *(uint *)(pbVar4 + 8);
  if ((*pbVar4 & 0x90) != 0) goto LAB_00410a5e;
  iVar3 = *(int *)(pbVar4 + 0x1c);
  if (iVar3 + 20000 < 0x4fa2) {
    if (iVar3 + 20000 == 0x4fa1) {
      pcVar6 = (code *)&LAB_00425a60;
    }
    else {
      if ((iVar3 == 0) || (iVar3 == 0x2c)) {
        if (*(int *)(pbVar4 + 4) == 2) {
          if (DAT_00437398 <= in_EAX) goto LAB_00410a5e;
          in_EAX = in_EAX * 0x20 + DAT_00437390;
          uVar2 = *(uint *)(in_EAX + 8);
          if (DAT_0043722c <= uVar2) goto LAB_00410a5e;
          iVar3 = *(int *)(in_EAX + 0xc);
          if (-1 < iVar3) {
            puVar5 = &LAB_004258c0;
            goto LAB_00410b33;
          }
          puVar5 = &LAB_004258a0;
        }
        else {
          if (((*(int *)(pbVar4 + 4) != 3) || (DAT_00437394 <= in_EAX)) ||
             (in_EAX = in_EAX * 0x20 + DAT_0043738c, DAT_0043722c <= *(uint *)(in_EAX + 8)))
          goto LAB_00410a5e;
          if (-1 < *(int *)(in_EAX + 0xc)) {
            iVar3 = *(int *)(in_EAX + 0x14) + _DAT_00437384;
            uVar2 = *(int *)(in_EAX + 0x10) + _DAT_00437368;
            puVar5 = &LAB_00425950;
LAB_00410b33:
            iVar3 = FUN_0040e434((int)puVar5,uVar2,iVar3);
            goto LAB_00410c4f;
          }
          uVar2 = *(int *)(in_EAX + 0x10) + _DAT_00437368;
          puVar5 = &LAB_00425920;
        }
        iVar3 = FUN_0040e421((int)puVar5,uVar2);
        goto LAB_00410c4f;
      }
      if (iVar3 == 0x2f) {
        uVar1 = FUN_0040db61(param_1,0x4e4c);
        return uVar1;
      }
      if (iVar3 == 0x4c) {
        pcVar6 = (code *)&LAB_004259c0;
      }
      else if (iVar3 == 0x50) {
        pcVar6 = (code *)&LAB_00425a10;
      }
      else {
        if (iVar3 != 0xf9) goto LAB_00410a5e;
        pcVar6 = (code *)&LAB_00425890;
      }
    }
  }
  else if (iVar3 == 0x182) {
    pcVar6 = (code *)&LAB_00425ab0;
  }
  else {
    if (iVar3 == 0x18c) {
      FUN_0040e410(0x4256a0);
      FUN_00413525(param_1,0x4fa7,0);
      iVar3 = 0x4fa8;
LAB_00410c08:
      iVar3 = FUN_00413525(param_1,iVar3,0);
      goto LAB_00410c4f;
    }
    if (iVar3 == 0x1dd) {
      pcVar6 = FUN_00425bc0;
    }
    else {
      if (iVar3 == 0x22a) {
        FUN_0040e410(0x425b00);
        FUN_00411b0f(param_1,0x5049);
        FUN_00413525(param_1,0x5047,0);
        iVar3 = 0x5048;
        goto LAB_00410c08;
      }
      if (iVar3 != 0x276) goto LAB_00410a5e;
      pcVar6 = (code *)&LAB_00425b80;
    }
  }
  iVar3 = FUN_0040e410((int)pcVar6);
LAB_00410c4f:
  return CONCAT31((int3)((uint)iVar3 >> 8),1);
}



/******************************************************************************/
/* TARGET 00410c54  FUN_00410c54 */
/******************************************************************************/

void __cdecl FUN_00410c54(int param_1,int param_2)

{
  FUN_00410c80(param_1,param_2,0,-1);
  return;
}



/******************************************************************************/
/* TARGET 00410c69  FUN_00410c69 */
/******************************************************************************/

void __cdecl FUN_00410c69(int param_1,int param_2,int param_3)

{
  FUN_00410c80(param_1,param_2,param_3,-1);
  return;
}



/******************************************************************************/
/* TARGET 00410c80  FUN_00410c80 */
/******************************************************************************/

undefined4 __cdecl FUN_00410c80(int param_1,int param_2,int param_3,int param_4)

{
  int iVar1;
  
  iVar1 = FUN_0040e434(param_2,param_3,param_4);
  if (*(int *)(param_1 * 0x20 + 4 + DAT_004373a0) != 1) {
    param_1 = FUN_00410a52(param_1 + 1);
    if ((char)param_1 != '\0') {
      return CONCAT31((int3)((uint)param_1 >> 8),1);
    }
  }
  DAT_004376d8 = iVar1;
  return param_1 & 0xffffff00;
}



/******************************************************************************/
/* TARGET 00410cc7  FUN_00410cc7 */
/******************************************************************************/

void __cdecl FUN_00410cc7(int param_1,int param_2)

{
  int iVar1;
  undefined4 uVar2;
  byte *pbVar3;
  int iVar4;
  
  pbVar3 = (byte *)(param_1 * 0x20 + DAT_0043739c);
  iVar4 = param_1 * 0x20 + DAT_004373a0;
  if ((*pbVar3 & 1) != 0) {
    iVar1 = 1;
    do {
      param_1 = param_1 + iVar1;
      pbVar3 = pbVar3 + iVar1 * 0x20;
      iVar4 = iVar4 + iVar1 * 0x20;
      if (((*(int *)(pbVar3 + 0x1c) == param_2 + -20000) && ((*pbVar3 & 1) != 0)) &&
         (uVar2 = FUN_00410a52(param_1 + 1), (char)uVar2 != '\0')) {
        return;
      }
      iVar1 = *(int *)(iVar4 + 4);
    } while ((*pbVar3 & 2) != 0);
  }
  FUN_0040e410(0x425890);
  return;
}



/******************************************************************************/
/* TARGET 00410d31  FUN_00410d31 */
/******************************************************************************/

/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

undefined1 __fastcall FUN_00410d31(uint param_1)

{
  char cVar1;
  undefined1 uVar2;
  undefined4 uVar3;
  int iVar4;
  uint uVar5;
  int iVar6;
  byte *pbVar7;
  code *pcVar8;
  undefined1 *puVar9;
  code *pcVar10;
  undefined *puVar12;
  undefined8 uVar11;
  
  if (DAT_004373a4 <= param_1) {
LAB_0041174f:
    return 0;
  }
  pbVar7 = (byte *)(param_1 * 0x20 + DAT_0043739c);
  uVar5 = *(uint *)(pbVar7 + 8);
  if ((*pbVar7 & 0x90) != 0) {
    return 0;
  }
  iVar4 = *(int *)(pbVar7 + 0x1c);
  iVar6 = iVar4 + 20000;
  if (0x4e4f < iVar6) {
    if (0x4fe8 < iVar6) {
      if (iVar6 < 0x508e) {
        if (iVar6 == 0x508d) {
          puVar9 = &LAB_00427850;
          goto LAB_00411747;
        }
        if (iVar6 < 0x5052) {
          if (iVar6 == 0x5051) {
            puVar9 = &LAB_004275e0;
          }
          else {
            if (iVar6 < 0x501e) {
              if (iVar6 == 0x501d) {
                puVar9 = &LAB_00427520;
              }
              else if (iVar4 == 0x1c9) {
                puVar9 = &LAB_004274c0;
              }
              else if (iVar4 == 0x1ca) {
                puVar9 = &LAB_004274d0;
              }
              else if (iVar4 == 0x1cb) {
                puVar9 = &LAB_004274e0;
              }
              else if (iVar4 == 0x1cc) {
                puVar9 = &LAB_004274f0;
              }
              else {
                if (iVar4 != 0x1cd) {
                  return 0;
                }
                puVar9 = &LAB_00427500;
              }
              goto LAB_00411747;
            }
            if (iVar4 == 0x211) {
              puVar9 = &LAB_004270a0;
              goto LAB_00411747;
            }
            if (iVar4 == 0x214) {
              uVar2 = FUN_00413c2f(param_1,0x427010);
              return uVar2;
            }
            if (iVar4 == 0x22e) {
              puVar9 = &LAB_004275b0;
            }
            else if (iVar4 == 0x22f) {
              puVar9 = &LAB_004275c0;
            }
            else {
              if (iVar4 != 0x230) {
                return 0;
              }
              puVar9 = &LAB_004275d0;
            }
          }
        }
        else {
          if (0x506f < iVar6) {
            if (iVar4 == 0x259) {
              puVar9 = &LAB_004276d0;
            }
            else if (iVar4 == 0x25a) {
              puVar9 = &LAB_00427710;
            }
            else if (iVar4 == 0x25c) {
              puVar9 = &LAB_00427750;
            }
            else if (iVar4 == 0x263) {
              puVar9 = &LAB_00427790;
            }
            else {
              if (iVar4 != 0x26c) {
                return 0;
              }
              puVar9 = &LAB_00427810;
            }
            goto LAB_00411747;
          }
          if (iVar6 == 0x506f) {
            puVar9 = &LAB_004276a0;
LAB_0041151f:
            cVar1 = FUN_004134b2(param_1,(int)puVar9);
            if (cVar1 != '\0') {
              return 1;
            }
            FUN_0040e410((int)puVar9);
            FUN_00411cf5(0);
            return 1;
          }
          if (iVar4 != 0x232) {
            if (iVar4 == 0x240) {
              puVar9 = &LAB_00427600;
              goto LAB_00411747;
            }
            if (iVar4 == 0x24c) {
              puVar9 = &LAB_00427610;
            }
            else if (iVar4 == 0x24d) {
              puVar9 = &LAB_00427640;
            }
            else {
              if (iVar4 != 0x24e) {
                return 0;
              }
              puVar9 = &LAB_00427670;
            }
            goto LAB_0041151f;
          }
          puVar9 = &LAB_004275f0;
        }
        FUN_0040e410((int)puVar9);
        FUN_00411b0f(param_1,0x5049);
        FUN_00413525(param_1,0x5047,0);
        uVar11 = 0;
        iVar4 = 0x5048;
LAB_0041150c:
        FUN_00413525(param_1,iVar4,uVar11);
        return 1;
      }
      if (0x50e2 < iVar6) {
        if (iVar6 < 0x5125) {
          if (iVar6 == 0x5124) {
            puVar9 = &LAB_00427ab0;
          }
          else if (iVar4 == 0x2d9) {
            puVar9 = &LAB_00427530;
          }
          else {
            if (iVar4 == 0x2e4) {
              puVar9 = &LAB_00426e20;
LAB_004116e4:
              uVar2 = FUN_004134b2(param_1,(int)puVar9);
              return uVar2;
            }
            if (iVar4 == 0x2ed) {
              puVar9 = &LAB_00427a20;
            }
            else if (iVar4 == 0x302) {
              puVar9 = &LAB_00427a60;
            }
            else {
              if (iVar4 != 0x303) {
                return 0;
              }
              puVar9 = &LAB_00427aa0;
            }
          }
        }
        else if (iVar4 == 0x305) {
          puVar9 = &LAB_00427ae0;
        }
        else if (iVar4 == 0x31b) {
          puVar9 = &LAB_00427b10;
        }
        else if (iVar4 == 0x375) {
          puVar9 = &LAB_00427b20;
        }
        else {
          if (iVar4 != 0x37a) {
            if (iVar4 != 0x3bb) {
              return 0;
            }
            uVar2 = FUN_0041392a(param_1,0x427b30);
            return uVar2;
          }
          puVar9 = &LAB_00427510;
        }
        goto LAB_00411747;
      }
      if (iVar6 == 0x50e2) {
        puVar9 = &LAB_00427950;
        goto LAB_00411747;
      }
      if (iVar6 < 0x50a6) {
        if (iVar6 != 0x50a5) {
          if (iVar4 == 0x274) {
            puVar9 = &LAB_004277d0;
          }
          else if (iVar4 == 0x27e) {
            puVar9 = &LAB_00427990;
          }
          else {
            if (iVar4 != 0x281) {
              if (iVar4 == 0x283) {
                puVar12 = &LAB_004264f0;
                pcVar10 = (code *)&LAB_00426530;
                pcVar8 = FUN_004118c0;
              }
              else {
                if (iVar4 != 0x284) {
                  return 0;
                }
                puVar12 = &LAB_004265e0;
                pcVar10 = (code *)&LAB_00426620;
                pcVar8 = FUN_00413593;
              }
              goto LAB_00410d95;
            }
            puVar9 = &LAB_00427050;
          }
          goto LAB_00411747;
        }
        pcVar10 = (code *)&LAB_00426710;
        puVar12 = &LAB_004266d0;
        pcVar8 = FUN_00413d0c;
      }
      else if (iVar4 == 0x286) {
        pcVar10 = (code *)&LAB_00426800;
        puVar12 = &LAB_004267c0;
        pcVar8 = FUN_00413a07;
      }
      else {
        if (iVar4 != 0x287) {
          if (iVar4 == 0x2bf) {
            puVar9 = &LAB_00427890;
          }
          else if (iVar4 == 0x2c0) {
            puVar9 = &LAB_004278d0;
          }
          else {
            if (iVar4 != 0x2c1) {
              return 0;
            }
            puVar9 = &LAB_00427910;
          }
          goto LAB_00411747;
        }
        pcVar10 = (code *)&LAB_004268f0;
        puVar12 = &LAB_004268b0;
        pcVar8 = FUN_00411b79;
      }
      goto LAB_00410d95;
    }
    if (iVar6 == 0x4fe8) {
      puVar9 = &LAB_004274b0;
      goto LAB_00411747;
    }
    if (0x4f33 < iVar6) {
      if (0x4fbd < iVar6) {
        if (iVar6 < 0x4fda) {
          if (iVar6 == 0x4fd9) {
            puVar9 = &LAB_00427210;
LAB_004113a4:
            uVar2 = FUN_00414426(param_1,(int)puVar9);
            return uVar2;
          }
          if (iVar4 == 0x19e) {
            puVar9 = &LAB_00427060;
          }
          else if (iVar4 == 0x1ad) {
            puVar9 = &LAB_00427080;
          }
          else {
            if (iVar4 != 0x1ae) {
              if (iVar4 == 0x1b7) {
                puVar9 = &LAB_004270c0;
              }
              else {
                if (iVar4 != 0x1b8) {
                  return 0;
                }
                puVar9 = &LAB_004271b0;
              }
              goto LAB_004113a4;
            }
            puVar9 = &LAB_00427090;
          }
        }
        else {
          if (iVar4 == 0x1ba) {
            puVar9 = &LAB_00427280;
            goto LAB_004113a4;
          }
          if (iVar4 == 0x1c2) {
            puVar9 = &LAB_004273b0;
          }
          else if (iVar4 == 0x1c3) {
            puVar9 = &LAB_00427400;
          }
          else if (iVar4 == 0x1c6) {
            puVar9 = &LAB_00427490;
          }
          else {
            if (iVar4 != 0x1c7) {
              return 0;
            }
            puVar9 = &LAB_004274a0;
          }
        }
        goto LAB_00411747;
      }
      if (iVar6 == 0x4fbd) {
        puVar9 = &LAB_00427070;
        goto LAB_00411747;
      }
      if (0x4f86 < iVar6) {
        if (iVar4 == 0x167) {
          puVar9 = &LAB_00426d40;
          goto LAB_00411747;
        }
        if (iVar4 == 0x168) {
          puVar9 = &LAB_00426d50;
          goto LAB_00411747;
        }
        if (iVar4 == 0x169) {
          puVar9 = &LAB_00426d60;
          goto LAB_00411747;
        }
        if (iVar4 != 0x16a) {
          if (iVar4 != 0x17f) {
            return 0;
          }
          cVar1 = FUN_00413c2f(param_1,0x426f50);
          if (cVar1 != '\0') {
            return 1;
          }
          puVar9 = &LAB_00426f30;
          goto LAB_00411747;
        }
        FUN_0040e410(0x426d70);
        FUN_00413525(param_1,0x4f8b,0);
        FUN_00413525(param_1,0x4f8c,0);
        FUN_00413525(param_1,0x4f8d,0x413e848000000000);
        uVar11 = 0x413e848000000000;
        iVar4 = 0x4f8e;
        goto LAB_0041150c;
      }
      if (iVar6 == 0x4f86) {
        puVar9 = &LAB_00426d30;
        goto LAB_00411747;
      }
      if (iVar4 != 0x120) {
        if (iVar4 == 0x162) {
          puVar9 = &LAB_00426cd0;
        }
        else if (iVar4 == 0x163) {
          puVar9 = &LAB_00426ce0;
        }
        else if (iVar4 == 0x164) {
          puVar9 = &LAB_00426cf0;
        }
        else {
          if (iVar4 != 0x165) {
            return 0;
          }
          puVar9 = &LAB_00426d00;
        }
        goto LAB_00411747;
      }
      puVar12 = &LAB_00426a90;
      pcVar10 = (code *)&LAB_00426ad0;
LAB_00411224:
      pcVar8 = FUN_00413e87;
      goto LAB_00410d95;
    }
    if (iVar6 == 0x4f33) {
      puVar9 = &LAB_00426c80;
      goto LAB_00411747;
    }
    if (iVar6 < 0x4f14) {
      if (iVar6 == 0x4f13) {
        puVar9 = &LAB_004279e0;
        goto LAB_00411747;
      }
      if (iVar6 < 0x4e9d) {
        if (iVar6 == 0x4e9c) {
          puVar9 = &LAB_00426c90;
          goto LAB_004116e4;
        }
        if (iVar4 != 0x3f) {
          if (iVar4 == 0x41) {
            puVar9 = &LAB_00425c70;
          }
          else if (iVar4 == 0x42) {
            puVar9 = &LAB_00425c80;
          }
          else if (iVar4 == 0x48) {
            puVar9 = &LAB_00426b90;
          }
          else {
            if (iVar4 != 0x4a) {
              return 0;
            }
            puVar9 = &LAB_00426ba0;
          }
          goto LAB_00411747;
        }
        if (*(int *)(pbVar7 + 4) == 2) {
          if (DAT_00437398 <= uVar5) {
            return 0;
          }
          iVar4 = uVar5 * 0x20 + DAT_00437390;
          uVar5 = *(uint *)(iVar4 + 8);
          if (DAT_004371cc <= uVar5) {
            return 0;
          }
          iVar6 = *(int *)(iVar4 + 0xc);
          if (-1 < iVar6) {
            puVar9 = &LAB_00425cb0;
            goto LAB_0041114b;
          }
          puVar9 = &LAB_00425c90;
        }
        else {
          if (*(int *)(pbVar7 + 4) != 3) {
            return 0;
          }
          if (DAT_00437394 <= uVar5) {
            return 0;
          }
          iVar4 = uVar5 * 0x20 + DAT_0043738c;
          if (DAT_004371cc <= *(uint *)(iVar4 + 8)) {
            return 0;
          }
          if (-1 < *(int *)(iVar4 + 0xc)) {
            iVar6 = *(int *)(iVar4 + 0x14) + _DAT_00437384;
            uVar5 = *(int *)(iVar4 + 0x10) + _DAT_00437364;
            puVar9 = &LAB_00425d30;
            goto LAB_0041114b;
          }
          uVar5 = *(int *)(iVar4 + 0x10) + _DAT_00437364;
          puVar9 = &LAB_00425d10;
        }
        goto LAB_00411127;
      }
      if (iVar4 == 0xeb) {
        puVar9 = &LAB_00426d10;
        goto LAB_00411747;
      }
      if (iVar4 == 0xec) {
        puVar9 = &LAB_00426d20;
        goto LAB_00411747;
      }
      if (iVar4 != 0xef) {
        if (iVar4 == 0xf0) {
          puVar12 = &LAB_004264f0;
          pcVar10 = (code *)&LAB_00426530;
          pcVar8 = FUN_00410a52;
          goto LAB_00410d95;
        }
        if (iVar4 != 0xf2) {
          return 0;
        }
        puVar9 = &LAB_004279a0;
        goto LAB_00411747;
      }
      puVar12 = &LAB_004269a0;
      pcVar10 = (code *)&LAB_004269e0;
      goto LAB_00411224;
    }
    switch(iVar4) {
    case 0xfd:
      if (*(int *)(pbVar7 + 4) == 2) {
        if (DAT_00437398 <= uVar5) {
          return 0;
        }
        iVar4 = uVar5 * 0x20 + DAT_00437390;
        uVar5 = *(uint *)(iVar4 + 8);
        if (DAT_00437084 <= uVar5) {
          return 0;
        }
        iVar6 = *(int *)(iVar4 + 0xc);
        if (-1 < iVar6) {
          puVar9 = &LAB_00425dd0;
LAB_0041114b:
          FUN_0040e434((int)puVar9,uVar5,iVar6);
          return 1;
        }
        puVar9 = &LAB_00425da0;
      }
      else {
        if (*(int *)(pbVar7 + 4) != 3) {
          return 0;
        }
        if (DAT_00437394 <= uVar5) {
          return 0;
        }
        iVar4 = uVar5 * 0x20 + DAT_0043738c;
        if (DAT_00437084 <= *(uint *)(iVar4 + 8)) {
          return 0;
        }
        if (-1 < *(int *)(iVar4 + 0xc)) {
          iVar6 = *(int *)(iVar4 + 0x14) + _DAT_00437384;
          uVar5 = *(int *)(iVar4 + 0x10) + _DAT_0043737c;
          puVar9 = &LAB_00425e60;
          goto LAB_0041114b;
        }
        uVar5 = *(int *)(iVar4 + 0x10) + _DAT_0043737c;
        puVar9 = &LAB_00425e30;
      }
      goto LAB_00411127;
    case 0xfe:
      if (*(int *)(pbVar7 + 4) == 2) {
        if (DAT_00437398 <= uVar5) {
          return 0;
        }
        iVar4 = uVar5 * 0x20 + DAT_00437390;
        uVar5 = *(uint *)(iVar4 + 8);
        if (DAT_00437084 <= uVar5) {
          return 0;
        }
        iVar6 = *(int *)(iVar4 + 0xc);
        if (-1 < iVar6) {
          puVar9 = &LAB_00425ef0;
          goto LAB_0041114b;
        }
        puVar9 = &LAB_00425ed0;
      }
      else {
        if (*(int *)(pbVar7 + 4) != 3) {
          return 0;
        }
        if (DAT_00437394 <= uVar5) {
          return 0;
        }
        iVar4 = uVar5 * 0x20 + DAT_0043738c;
        if (DAT_00437084 <= *(uint *)(iVar4 + 8)) {
          return 0;
        }
        if (-1 < *(int *)(iVar4 + 0xc)) {
          iVar6 = *(int *)(iVar4 + 0x14) + _DAT_00437384;
          uVar5 = *(int *)(iVar4 + 0x10) + _DAT_0043737c;
          puVar9 = &LAB_00425f80;
          goto LAB_0041114b;
        }
        uVar5 = *(int *)(iVar4 + 0x10) + _DAT_0043737c;
        puVar9 = &LAB_00425f50;
      }
LAB_00411127:
      FUN_0040e421((int)puVar9,uVar5);
      return 1;
    default:
      goto LAB_0041174f;
    case 0x10a:
      puVar9 = &LAB_00426bd0;
      break;
    case 0x10b:
      puVar9 = &LAB_00426c40;
      break;
    case 0x10c:
      puVar9 = &LAB_00426be0;
      break;
    case 0x10d:
      puVar9 = &LAB_00426c50;
      break;
    case 0x10e:
      puVar9 = &LAB_00426bf0;
      break;
    case 0x10f:
      puVar9 = &LAB_00426c60;
      break;
    case 0x110:
      puVar9 = &LAB_00426c00;
      break;
    case 0x111:
      puVar9 = &LAB_00426c70;
      break;
    case 0x112:
      puVar9 = &LAB_00426c10;
    }
LAB_00411747:
    FUN_0040e410((int)puVar9);
    return 1;
  }
  if (iVar6 == 0x4e4f) {
    uVar3 = FUN_0040db61(param_1,0x4e5f);
    return (char)uVar3;
  }
  switch(iVar4) {
  case 0x1d:
    pcVar10 = (code *)&LAB_00426020;
    puVar12 = &LAB_00425ff0;
    break;
  case 0x1e:
    pcVar10 = FUN_004260c0;
    puVar12 = &LAB_00426090;
    break;
  case 0x1f:
    pcVar10 = FUN_00426160;
    puVar12 = &LAB_00426130;
    break;
  case 0x20:
    pcVar10 = FUN_00426210;
    puVar12 = &LAB_004261e0;
    break;
  case 0x21:
    puVar12 = &LAB_00426290;
    pcVar10 = FUN_004262c0;
    break;
  case 0x22:
    puVar12 = &LAB_00426340;
    pcVar10 = FUN_00426370;
    break;
  case 0x23:
    pcVar10 = (code *)&LAB_004263f0;
    puVar12 = &LAB_004303c0;
    goto LAB_00410e00;
  case 0x24:
    puVar12 = &DAT_004118b0;
    pcVar10 = (code *)&LAB_00426440;
    goto LAB_00410e00;
  case 0x25:
    puVar12 = &DAT_004118b0;
    pcVar10 = (code *)&LAB_00426490;
LAB_00410e00:
    pcVar8 = FUN_00410d31;
    goto LAB_00410d95;
  case 0x26:
    uVar2 = FUN_004117c0(param_1,0x4264d0);
    return uVar2;
  default:
    goto LAB_0041174f;
  }
  pcVar8 = FUN_00411d37;
LAB_00410d95:
  uVar2 = FUN_0040d9f0(pcVar8,param_1,(int)pcVar10,puVar12);
  return uVar2;
}



/******************************************************************************/
/* TARGET 004117c0  FUN_004117c0 */
/******************************************************************************/

void __cdecl FUN_004117c0(int param_1,int param_2)

{
  FUN_004117ec(param_1,param_2,0,-1);
  return;
}



/******************************************************************************/
/* TARGET 004117d5  FUN_004117d5 */
/******************************************************************************/

void __cdecl FUN_004117d5(int param_1,int param_2,int param_3)

{
  FUN_004117ec(param_1,param_2,param_3,-1);
  return;
}



/******************************************************************************/
/* TARGET 004117ec  FUN_004117ec */
/******************************************************************************/

undefined4 __cdecl FUN_004117ec(int param_1,int param_2,int param_3,int param_4)

{
  char cVar1;
  int iVar2;
  undefined3 extraout_var;
  
  iVar2 = FUN_0040e434(param_2,param_3,param_4);
  if (*(int *)(param_1 * 0x20 + 4 + DAT_004373a0) != 1) {
    cVar1 = FUN_00410d31(param_1 + 1);
    param_1 = CONCAT31(extraout_var,cVar1);
    if (cVar1 != '\0') {
      return CONCAT31(extraout_var,1);
    }
  }
  DAT_004376d8 = iVar2;
  return param_1 & 0xffffff00;
}



/******************************************************************************/
/* TARGET 00411833  FUN_00411833 */
/******************************************************************************/

void __cdecl FUN_00411833(int param_1,int param_2,char param_3)

{
  char cVar1;
  int iVar2;
  byte *pbVar3;
  int iVar4;
  undefined1 *puVar5;
  
  pbVar3 = (byte *)(param_1 * 0x20 + DAT_0043739c);
  iVar4 = param_1 * 0x20 + DAT_004373a0;
  if ((*pbVar3 & 1) != 0) {
    iVar2 = 1;
    do {
      param_1 = param_1 + iVar2;
      pbVar3 = pbVar3 + iVar2 * 0x20;
      iVar4 = iVar4 + iVar2 * 0x20;
      if (((*(int *)(pbVar3 + 0x1c) == param_2 + -20000) && ((*pbVar3 & 1) != 0)) &&
         (cVar1 = FUN_00410d31(param_1 + 1), cVar1 != '\0')) {
        return;
      }
      iVar2 = *(int *)(iVar4 + 4);
    } while ((*pbVar3 & 2) != 0);
  }
  if (param_3 == '\0') {
    puVar5 = &LAB_00425c80;
  }
  else {
    puVar5 = &LAB_00425c70;
  }
  FUN_0040e410((int)puVar5);
  return;
}



/******************************************************************************/
/* TARGET 004118c0  FUN_004118c0 */
/******************************************************************************/

/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

uint __fastcall FUN_004118c0(uint param_1)

{
  uint in_EAX;
  uint uVar1;
  undefined4 uVar2;
  byte *pbVar3;
  int iVar4;
  undefined1 *puVar5;
  undefined8 uVar6;
  
  if (DAT_004373a4 <= param_1) {
LAB_004118cb:
    return in_EAX & 0xffffff00;
  }
  pbVar3 = (byte *)(param_1 * 0x20 + DAT_0043739c);
  in_EAX = *(uint *)(pbVar3 + 8);
  if ((*pbVar3 & 0x90) != 0) goto LAB_004118cb;
  iVar4 = *(int *)(pbVar3 + 0x1c);
  if (iVar4 == 0x2f) {
    uVar2 = FUN_0040db61(param_1,0x4e50);
    return uVar2;
  }
  if (iVar4 != 0x30) {
    if (iVar4 == 0x233) {
      FUN_0040e410(0x427fc0);
      FUN_00411b0f(param_1,0x5049);
      FUN_00413525(param_1,0x5047,0);
      FUN_00413525(param_1,0x5048,0);
      FUN_00411b0f(param_1,0x5054);
      FUN_00413525(param_1,0x5055,0);
      FUN_00413525(param_1,0x5056,0);
      FUN_00413525(param_1,0x5057,0x413e848000000000);
      uVar6 = 0x413e848000000000;
      iVar4 = 0x5058;
    }
    else {
      if (iVar4 != 0x2ea) goto LAB_004118cb;
      FUN_0040e410(0x428190);
      FUN_00413525(param_1,0x510b,0);
      uVar6 = 0;
      iVar4 = 0x510c;
    }
    iVar4 = FUN_00413525(param_1,iVar4,uVar6);
    goto LAB_00411a2a;
  }
  if (*(int *)(pbVar3 + 4) == 2) {
    if (DAT_00437398 <= in_EAX) goto LAB_004118cb;
    in_EAX = in_EAX * 0x20 + DAT_00437390;
    uVar1 = *(uint *)(in_EAX + 8);
    if (DAT_004371f4 <= uVar1) goto LAB_004118cb;
    iVar4 = *(int *)(in_EAX + 0xc);
    if (-1 < iVar4) {
      puVar5 = &LAB_00427ec0;
      goto LAB_00411a22;
    }
    puVar5 = &LAB_00427ea0;
  }
  else {
    if (((*(int *)(pbVar3 + 4) != 3) || (DAT_00437394 <= in_EAX)) ||
       (in_EAX = in_EAX * 0x20 + DAT_0043738c, DAT_004371f4 <= *(uint *)(in_EAX + 8)))
    goto LAB_004118cb;
    if (-1 < *(int *)(in_EAX + 0xc)) {
      iVar4 = *(int *)(in_EAX + 0x14) + _DAT_00437384;
      uVar1 = *(int *)(in_EAX + 0x10) + _DAT_0043736c;
      puVar5 = &LAB_00427f50;
LAB_00411a22:
      iVar4 = FUN_0040e434((int)puVar5,uVar1,iVar4);
      goto LAB_00411a2a;
    }
    uVar1 = *(int *)(in_EAX + 0x10) + _DAT_0043736c;
    puVar5 = &LAB_00427f20;
  }
  iVar4 = FUN_0040e421((int)puVar5,uVar1);
LAB_00411a2a:
  return CONCAT31((int3)((uint)iVar4 >> 8),1);
}



/******************************************************************************/
/* TARGET 00411a9c  FUN_00411a9c */
/******************************************************************************/

void __cdecl FUN_00411a9c(int param_1,int param_2)

{
  FUN_00411ac8(param_1,param_2,0,-1);
  return;
}



/******************************************************************************/
/* TARGET 00411ab1  FUN_00411ab1 */
/******************************************************************************/

void __cdecl FUN_00411ab1(int param_1,int param_2,int param_3)

{
  FUN_00411ac8(param_1,param_2,param_3,-1);
  return;
}



/******************************************************************************/
/* TARGET 00411ac8  FUN_00411ac8 */
/******************************************************************************/

undefined4 __cdecl FUN_00411ac8(int param_1,int param_2,int param_3,int param_4)

{
  int iVar1;
  
  iVar1 = FUN_0040e434(param_2,param_3,param_4);
  if (*(int *)(param_1 * 0x20 + 4 + DAT_004373a0) != 1) {
    param_1 = FUN_004118c0(param_1 + 1);
    if ((char)param_1 != '\0') {
      return CONCAT31((int3)((uint)param_1 >> 8),1);
    }
  }
  DAT_004376d8 = iVar1;
  return param_1 & 0xffffff00;
}



/******************************************************************************/
/* TARGET 00411b0f  FUN_00411b0f */
/******************************************************************************/

void __cdecl FUN_00411b0f(int param_1,int param_2)

{
  int iVar1;
  undefined4 uVar2;
  byte *pbVar3;
  int iVar4;
  
  pbVar3 = (byte *)(param_1 * 0x20 + DAT_0043739c);
  iVar4 = param_1 * 0x20 + DAT_004373a0;
  if ((*pbVar3 & 1) != 0) {
    iVar1 = 1;
    do {
      param_1 = param_1 + iVar1;
      pbVar3 = pbVar3 + iVar1 * 0x20;
      iVar4 = iVar4 + iVar1 * 0x20;
      if (((*(int *)(pbVar3 + 0x1c) == param_2 + -20000) && ((*pbVar3 & 1) != 0)) &&
         (uVar2 = FUN_004118c0(param_1 + 1), (char)uVar2 != '\0')) {
        return;
      }
      iVar1 = *(int *)(iVar4 + 4);
    } while ((*pbVar3 & 2) != 0);
  }
  FUN_0040e410(0x427e90);
  return;
}



/******************************************************************************/
/* TARGET 00411b79  FUN_00411b79 */
/******************************************************************************/

/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

uint __fastcall FUN_00411b79(uint param_1)

{
  uint in_EAX;
  int iVar1;
  undefined4 uVar2;
  uint uVar3;
  byte *pbVar4;
  undefined1 *puVar5;
  
  if (DAT_004373a4 <= param_1) {
LAB_00411c7d:
    return in_EAX & 0xffffff00;
  }
  pbVar4 = (byte *)(param_1 * 0x20 + DAT_0043739c);
  in_EAX = *(uint *)(pbVar4 + 8);
  if ((*pbVar4 & 0x90) != 0) goto LAB_00411c7d;
  iVar1 = *(int *)(pbVar4 + 0x1c);
  if (iVar1 != 0x2e) {
    if (iVar1 == 0x2f) {
      uVar2 = FUN_0040db61(param_1,0x4e4e);
      return uVar2;
    }
    if (iVar1 != 0x1e0) goto LAB_00411c7d;
    iVar1 = FUN_0040e410(0x4288a0);
    goto LAB_00411c26;
  }
  if (*(int *)(pbVar4 + 4) == 2) {
    if (DAT_00437398 <= in_EAX) goto LAB_00411c7d;
    in_EAX = in_EAX * 0x20 + DAT_00437390;
    uVar3 = *(uint *)(in_EAX + 8);
    if (DAT_00437124 <= uVar3) goto LAB_00411c7d;
    iVar1 = *(int *)(in_EAX + 0xc);
    if (-1 < iVar1) {
      puVar5 = &LAB_004287a0;
      goto LAB_00411c1e;
    }
    puVar5 = &LAB_00428780;
  }
  else {
    if (((*(int *)(pbVar4 + 4) != 3) || (DAT_00437394 <= in_EAX)) ||
       (in_EAX = in_EAX * 0x20 + DAT_0043738c, DAT_00437124 <= *(uint *)(in_EAX + 8)))
    goto LAB_00411c7d;
    if (-1 < *(int *)(in_EAX + 0xc)) {
      iVar1 = *(int *)(in_EAX + 0x14) + _DAT_00437384;
      uVar3 = *(int *)(in_EAX + 0x10) + _DAT_00437370;
      puVar5 = &LAB_00428830;
LAB_00411c1e:
      iVar1 = FUN_0040e434((int)puVar5,uVar3,iVar1);
      goto LAB_00411c26;
    }
    uVar3 = *(int *)(in_EAX + 0x10) + _DAT_00437370;
    puVar5 = &LAB_00428800;
  }
  iVar1 = FUN_0040e421((int)puVar5,uVar3);
LAB_00411c26:
  return CONCAT31((int3)((uint)iVar1 >> 8),1);
}



/******************************************************************************/
/* TARGET 00411c82  FUN_00411c82 */
/******************************************************************************/

void __cdecl FUN_00411c82(int param_1,int param_2)

{
  FUN_00411cae(param_1,param_2,0,-1);
  return;
}



/******************************************************************************/
/* TARGET 00411c97  FUN_00411c97 */
/******************************************************************************/

void __cdecl FUN_00411c97(int param_1,int param_2,int param_3)

{
  FUN_00411cae(param_1,param_2,param_3,-1);
  return;
}



/******************************************************************************/
/* TARGET 00411cae  FUN_00411cae */
/******************************************************************************/

undefined4 __cdecl FUN_00411cae(int param_1,int param_2,int param_3,int param_4)

{
  int iVar1;
  
  iVar1 = FUN_0040e434(param_2,param_3,param_4);
  if (*(int *)(param_1 * 0x20 + 4 + DAT_004373a0) != 1) {
    param_1 = FUN_00411b79(param_1 + 1);
    if ((char)param_1 != '\0') {
      return CONCAT31((int3)((uint)param_1 >> 8),1);
    }
  }
  DAT_004376d8 = iVar1;
  return param_1 & 0xffffff00;
}



/******************************************************************************/
/* TARGET 00411cf5  FUN_00411cf5 */
/******************************************************************************/

void __cdecl FUN_00411cf5(undefined8 param_1)

{
  int iVar1;
  
  iVar1 = FUN_0040e410(0x428e50);
  *(undefined8 *)(iVar1 * 0x10 + 4 + DAT_004376d4) = param_1;
  return;
}



/******************************************************************************/
/* TARGET 00411d12  FUN_00411d12 */
/******************************************************************************/

/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

void __fastcall FUN_00411d12(undefined1 param_1)

{
  int iVar1;
  
  _DAT_00437388 = CONCAT31(DAT_00437388_1,param_1);
  iVar1 = FUN_0040e410(0x428e50);
  *(double *)(iVar1 * 0x10 + 4 + DAT_004376d4) = (double)_DAT_00437388;
  return;
}



/******************************************************************************/
/* TARGET 00411d37  FUN_00411d37 */
/******************************************************************************/

/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

undefined1 __fastcall FUN_00411d37(uint param_1)

{
  int iVar1;
  char cVar2;
  undefined1 uVar3;
  int iVar4;
  undefined4 uVar5;
  uint uVar6;
  code *pcVar7;
  uint uVar8;
  float10 fVar9;
  int iVar10;
  undefined1 *puVar11;
  code *pcVar13;
  undefined8 uVar12;
  
  if (DAT_004373a4 <= param_1) {
    return 0;
  }
  iVar4 = param_1 * 0x20;
  iVar10 = iVar4 + DAT_0043739c;
  uVar6 = *(uint *)(iVar10 + 8);
  if ((*(byte *)(iVar4 + DAT_0043739c) & 0x90) != 0) {
    return 0;
  }
  iVar1 = *(int *)(iVar10 + 0x1c);
  switch(iVar1) {
  case 0x10:
    fVar9 = FUN_00414640(iVar10,iVar4 + DAT_004373a0);
    goto LAB_00411d98;
  case 0x11:
  case 0x71:
  case 0x15d:
    goto switchD_00411d8a_caseD_11;
  case 0x12:
    uVar3 = 1;
    goto LAB_00411dab;
  case 0x13:
    uVar3 = 2;
    goto LAB_00411dab;
  case 0x14:
    uVar3 = 3;
    goto LAB_00411dab;
  case 0x15:
    uVar3 = 4;
    goto LAB_00411dab;
  case 0x16:
    uVar3 = 5;
    goto LAB_00411dab;
  case 0x17:
    uVar3 = 6;
    goto LAB_00411dab;
  case 0x18:
    uVar3 = 7;
    goto LAB_00411dab;
  case 0x19:
    uVar3 = 8;
    goto LAB_00411dab;
  case 0x1a:
    uVar3 = 9;
    goto LAB_00411dab;
  default:
    if (99 < iVar1 - 0x86U) {
      return 0;
    }
    uVar3 = (&DAT_004367ce)[iVar1];
    goto LAB_00411dab;
  case 0x27:
    pcVar7 = FUN_004299d0;
    pcVar13 = pcVar7;
    goto LAB_00411ddd;
  case 0x28:
    pcVar7 = FUN_00429a40;
    pcVar13 = (code *)&LAB_00429a20;
    goto LAB_00411ddd;
  case 0x29:
    pcVar7 = FUN_00429a90;
    pcVar13 = pcVar7;
    goto LAB_00411ddd;
  case 0x2a:
    pcVar7 = FUN_00429b00;
    pcVar13 = (code *)&LAB_00429ae0;
    goto LAB_00411ddd;
  case 0x2b:
    if (*(int *)(iVar10 + 4) == 2) {
      if (DAT_00437398 <= uVar6) {
        return 0;
      }
      iVar10 = uVar6 * 0x20 + DAT_00437390;
      uVar6 = *(uint *)(iVar10 + 8);
      if (DAT_00437134 <= uVar6) {
        return 0;
      }
      uVar8 = *(uint *)(iVar10 + 0xc);
      if ((int)uVar8 < 0) {
        puVar11 = &LAB_00428e60;
        goto LAB_00411e48;
      }
      puVar11 = &LAB_00428e80;
    }
    else {
      if (*(int *)(iVar10 + 4) != 3) {
        return 0;
      }
      if (DAT_00437394 <= uVar6) {
        return 0;
      }
      iVar10 = uVar6 * 0x20 + DAT_0043738c;
      if (DAT_00437134 <= *(uint *)(iVar10 + 8)) {
        return 0;
      }
      if (*(int *)(iVar10 + 0xc) < 0) {
        uVar6 = *(int *)(iVar10 + 0x10) + _DAT_00437360;
        puVar11 = &LAB_00428ee0;
LAB_00411e48:
        FUN_0040e421((int)puVar11,uVar6);
        return 1;
      }
      uVar8 = *(int *)(iVar10 + 0x14) + _DAT_00437384;
      uVar6 = *(int *)(iVar10 + 0x10) + _DAT_00437360;
      puVar11 = &LAB_00428f00;
    }
    goto LAB_00411e59;
  case 0x2f:
    uVar5 = FUN_0040db61(param_1,0x4e4b);
    return (char)uVar5;
  case 0x4d:
    pcVar13 = (code *)&LAB_00429590;
    break;
  case 0x4e:
    pcVar13 = (code *)&LAB_004295b0;
    break;
  case 0x4f:
    pcVar13 = (code *)&LAB_004295d0;
    break;
  case 0x51:
    pcVar13 = (code *)&LAB_004295a0;
    break;
  case 0x52:
    pcVar13 = (code *)&LAB_004295c0;
    break;
  case 0x53:
    pcVar13 = (code *)&LAB_004295e0;
    break;
  case 0x59:
    pcVar7 = FUN_00429c20;
    pcVar13 = pcVar7;
    goto LAB_00411ddd;
  case 0x5a:
    puVar11 = &LAB_004296f0;
    goto LAB_00412c8d;
  case 0x5b:
    puVar11 = &LAB_00429710;
    goto LAB_00412c8d;
  case 0x5c:
    puVar11 = &LAB_00429730;
    goto LAB_00412c8d;
  case 0x5d:
    puVar11 = &LAB_00429750;
    goto LAB_00412c8d;
  case 0x5e:
    puVar11 = &LAB_00429770;
    goto LAB_00412c8d;
  case 0x5f:
    puVar11 = &LAB_00429790;
    goto LAB_00412c8d;
  case 0x60:
    puVar11 = &LAB_004297b0;
    goto LAB_00412c8d;
  case 0x61:
    puVar11 = &LAB_004297d0;
    goto LAB_00412c8d;
  case 0x62:
    fVar9 = (float10)3.141592653589793;
    goto LAB_00411d98;
  case 99:
    puVar11 = &LAB_004297f0;
    goto LAB_00412c8d;
  case 100:
    puVar11 = &LAB_00429810;
    goto LAB_00412c8d;
  case 0x65:
    puVar11 = &LAB_00429840;
    goto LAB_00412c8d;
  case 0x66:
    puVar11 = &LAB_00429860;
    goto LAB_00412c8d;
  case 0x67:
    puVar11 = &LAB_00429880;
    goto LAB_00412c8d;
  case 0x68:
    cVar2 = FUN_004134b2(param_1,0x4298e0);
    if (cVar2 != '\0') {
      return 1;
    }
    pcVar13 = (code *)&LAB_00429910;
    break;
  case 0x69:
    fVar9 = (float10)2.718281828459045;
    goto LAB_00411d98;
  case 0x6a:
    puVar11 = &LAB_00429920;
    goto LAB_00412c8d;
  case 0x6b:
    puVar11 = &LAB_00429940;
    goto LAB_00412c8d;
  case 0x6c:
    puVar11 = &LAB_00429960;
    goto LAB_00412c8d;
  case 0x6d:
    puVar11 = &LAB_00429980;
    goto LAB_00412c8d;
  case 0x6e:
    puVar11 = &LAB_004299a0;
    goto LAB_00412c8d;
  case 0x6f:
    pcVar7 = (code *)&LAB_00429c90;
    pcVar13 = pcVar7;
    goto LAB_00411ddd;
  case 0x72:
    fVar9 = (float10)0.7853981633974483;
    goto LAB_00411d98;
  case 0x73:
    fVar9 = (float10)1.5707963267948966;
    goto LAB_00411d98;
  case 0x74:
    fVar9 = (float10)2.356194490192345;
    goto LAB_00411d98;
  case 0x75:
    fVar9 = (float10)3.141592653589793;
    goto LAB_00411d98;
  case 0x76:
    fVar9 = (float10)3.9269908169872414;
    goto LAB_00411d98;
  case 0x77:
    fVar9 = (float10)4.71238898038469;
    goto LAB_00411d98;
  case 0x78:
    fVar9 = (float10)5.497787143782138;
    goto LAB_00411d98;
  case 0x7d:
    pcVar13 = (code *)&LAB_0042ab30;
    break;
  case 0xed:
    pcVar13 = (code *)&LAB_0042a200;
    break;
  case 0xee:
    pcVar13 = (code *)&LAB_0042a210;
    break;
  case 0xf5:
    pcVar13 = (code *)&LAB_0042ad90;
    break;
  case 0xfa:
    if (*(int *)(iVar10 + 4) == 2) {
      if (DAT_00437398 <= uVar6) {
        return 0;
      }
      iVar10 = uVar6 * 0x20 + DAT_00437390;
      uVar6 = *(uint *)(iVar10 + 8);
      if (DAT_00437084 <= uVar6) {
        return 0;
      }
      uVar8 = *(uint *)(iVar10 + 0xc);
      if ((int)uVar8 < 0) {
        puVar11 = &LAB_00428ff0;
        goto LAB_00411e48;
      }
      puVar11 = &LAB_00429010;
    }
    else {
      if (*(int *)(iVar10 + 4) != 3) {
        return 0;
      }
      if (DAT_00437394 <= uVar6) {
        return 0;
      }
      iVar10 = uVar6 * 0x20 + DAT_0043738c;
      if (DAT_00437084 <= *(uint *)(iVar10 + 8)) {
        return 0;
      }
      if (*(int *)(iVar10 + 0xc) < 0) {
        uVar6 = *(int *)(iVar10 + 0x10) + _DAT_0043737c;
        puVar11 = &LAB_00429070;
        goto LAB_00411e48;
      }
      uVar8 = *(int *)(iVar10 + 0x14) + _DAT_00437384;
      uVar6 = *(int *)(iVar10 + 0x10) + _DAT_0043737c;
      puVar11 = &LAB_004290a0;
    }
    goto LAB_00411e59;
  case 0xfb:
    if (*(int *)(iVar10 + 4) == 2) {
      if (DAT_00437398 <= uVar6) {
        return 0;
      }
      iVar10 = uVar6 * 0x20 + DAT_00437390;
      uVar6 = *(uint *)(iVar10 + 8);
      if (DAT_00437084 <= uVar6) {
        return 0;
      }
      uVar8 = *(uint *)(iVar10 + 0xc);
      if ((int)uVar8 < 0) {
        puVar11 = &LAB_00429110;
        goto LAB_00411e48;
      }
      puVar11 = &LAB_00429130;
    }
    else {
      if (*(int *)(iVar10 + 4) != 3) {
        return 0;
      }
      if (DAT_00437394 <= uVar6) {
        return 0;
      }
      iVar10 = uVar6 * 0x20 + DAT_0043738c;
      if (DAT_00437084 <= *(uint *)(iVar10 + 8)) {
        return 0;
      }
      if (*(int *)(iVar10 + 0xc) < 0) {
        uVar6 = *(int *)(iVar10 + 0x10) + _DAT_0043737c;
        puVar11 = &LAB_00429190;
        goto LAB_00411e48;
      }
      uVar8 = *(int *)(iVar10 + 0x14) + _DAT_00437384;
      uVar6 = *(int *)(iVar10 + 0x10) + _DAT_0043737c;
      puVar11 = &LAB_004291c0;
    }
    goto LAB_00411e59;
  case 0xfc:
    if (*(int *)(iVar10 + 4) == 2) {
      if (DAT_00437398 <= uVar6) {
        return 0;
      }
      iVar10 = uVar6 * 0x20 + DAT_00437390;
      uVar6 = *(uint *)(iVar10 + 8);
      if (DAT_00437084 <= uVar6) {
        return 0;
      }
      uVar8 = *(uint *)(iVar10 + 0xc);
      if ((int)uVar8 < 0) {
        puVar11 = &LAB_00429230;
        goto LAB_00411e48;
      }
      puVar11 = &LAB_00429250;
    }
    else {
      if (*(int *)(iVar10 + 4) != 3) {
        return 0;
      }
      if (DAT_00437394 <= uVar6) {
        return 0;
      }
      iVar10 = uVar6 * 0x20 + DAT_0043738c;
      if (DAT_00437084 <= *(uint *)(iVar10 + 8)) {
        return 0;
      }
      if (*(int *)(iVar10 + 0xc) < 0) {
        uVar6 = *(int *)(iVar10 + 0x10) + _DAT_0043737c;
        puVar11 = &LAB_004292b0;
        goto LAB_00411e48;
      }
      uVar8 = *(int *)(iVar10 + 0x14) + _DAT_00437384;
      uVar6 = *(int *)(iVar10 + 0x10) + _DAT_0043737c;
      puVar11 = &LAB_004292e0;
    }
    goto LAB_00411e59;
  case 0xff:
    if (*(int *)(iVar10 + 4) == 2) {
      if (DAT_00437398 <= uVar6) {
        return 0;
      }
      iVar10 = uVar6 * 0x20 + DAT_00437390;
    }
    else {
      if (*(int *)(iVar10 + 4) != 3) {
        return 0;
      }
      if (DAT_00437394 <= uVar6) {
        return 0;
      }
      iVar10 = uVar6 * 0x20 + DAT_0043738c;
    }
    if (DAT_0043710c <= *(uint *)(iVar10 + 0xc)) {
      return 0;
    }
    fVar9 = (float10)*(int *)(*(uint *)(iVar10 + 0xc) * 0x10 + 4 + DAT_00437108);
    goto LAB_00411d98;
  case 0x100:
    if (*(int *)(iVar10 + 4) == 2) {
      if (DAT_00437398 <= uVar6) {
        return 0;
      }
      uVar8 = *(uint *)(uVar6 * 0x20 + DAT_00437390 + 0xc);
      if (DAT_0043710c <= uVar8) {
        return 0;
      }
      uVar6 = 0;
      puVar11 = &LAB_00428f70;
    }
    else {
      if (*(int *)(iVar10 + 4) != 3) {
        return 0;
      }
      if (DAT_00437394 <= uVar6) {
        return 0;
      }
      iVar10 = uVar6 * 0x20 + DAT_0043738c;
      if (DAT_0043710c <= *(uint *)(iVar10 + 0xc)) {
        return 0;
      }
      uVar8 = *(uint *)(iVar10 + 0x14);
      uVar6 = 0;
      puVar11 = &LAB_00428f90;
    }
    goto LAB_00411e59;
  case 0x101:
    if (*(int *)(iVar10 + 4) == 2) {
      if (DAT_00437398 <= uVar6) {
        return 0;
      }
      uVar8 = *(uint *)(uVar6 * 0x20 + DAT_00437390 + 0xc);
      if (DAT_0043710c <= uVar8) {
        return 0;
      }
      uVar6 = 0;
      puVar11 = &LAB_00428fb0;
    }
    else {
      if (*(int *)(iVar10 + 4) != 3) {
        return 0;
      }
      if (DAT_00437394 <= uVar6) {
        return 0;
      }
      iVar10 = uVar6 * 0x20 + DAT_0043738c;
      if (DAT_0043710c <= *(uint *)(iVar10 + 0xc)) {
        return 0;
      }
      uVar8 = *(uint *)(iVar10 + 0x14);
      uVar6 = 0;
      puVar11 = &LAB_00428fd0;
    }
    goto LAB_00411e59;
  case 0x104:
    pcVar13 = (code *)&LAB_00429620;
    break;
  case 0x105:
    pcVar13 = (code *)&LAB_00429680;
    break;
  case 0x106:
    pcVar13 = (code *)&LAB_00429630;
    break;
  case 0x107:
    pcVar13 = (code *)&LAB_00429690;
    break;
  case 0x108:
    pcVar13 = (code *)&LAB_00429640;
    break;
  case 0x109:
    pcVar13 = (code *)&LAB_004296a0;
    break;
  case 0x11c:
    puVar11 = &LAB_0042a9b0;
    goto LAB_00412d33;
  case 0x11e:
    puVar11 = &LAB_0042a9f0;
    goto LAB_00412d33;
  case 0x123:
    FUN_0040e410(0x42aa30);
    FUN_00414499(param_1,0x4f45);
    FUN_00414499(param_1,0x4f44);
    return 1;
  case 0x128:
    puVar11 = &LAB_0042aaa0;
    goto LAB_00412d33;
  case 0x12d:
    uVar6 = 0xd4;
    if (*(uint *)(iVar10 + 0x14) < DAT_0043722c) {
      FUN_004010e0((int *)(DAT_00437228 + *(uint *)(iVar10 + 0x14) * 4));
      uVar6 = (uint)*(byte *)(*(int *)(*(int *)(DAT_00437228 + *(int *)(iVar10 + 0x14) * 4) + 0x14)
                             + 0x210);
    }
    fVar9 = (float10)*(uint *)(DAT_0043715c + uVar6 * 4);
    goto LAB_00411d98;
  case 0x159:
    FUN_0040e410(0x429d00);
    FUN_00413525(param_1,0x4f4f,0x416fffffe0000000);
    uVar12 = 0x3ff0000000000000;
    iVar10 = 0x4f7a;
    goto LAB_00412d1c;
  case 0x15b:
    pcVar13 = (code *)&LAB_0042ab70;
    break;
  case 0x15e:
    uVar3 = 0x5c;
    goto LAB_00411dab;
  case 0x15f:
    uVar3 = 0xa1;
    goto LAB_00411dab;
  case 0x160:
    uVar3 = 0xa3;
    goto LAB_00411dab;
  case 0x161:
    uVar3 = 0xa5;
    goto LAB_00411dab;
  case 0x17c:
    puVar11 = &LAB_0042aae0;
    goto LAB_00412d33;
  case 0x18d:
    pcVar13 = (code *)&LAB_0042c120;
    break;
  case 0x19f:
    pcVar13 = (code *)&LAB_0042a840;
    break;
  case 0x1a0:
    pcVar13 = (code *)&LAB_0042a830;
    break;
  case 0x1a1:
    FUN_0040e410(0x429db0);
    FUN_00413525(param_1,0x4fc2,0);
    FUN_00413525(param_1,0x4fc3,0);
    FUN_00413525(param_1,0x4fc4,0);
    uVar12 = 0x3ff0000000000000;
    iVar10 = 0x51c0;
    goto LAB_00412d1c;
  case 0x1a5:
    FUN_0040e410(0x429e00);
    FUN_00413525(param_1,0x4fc6,0);
    uVar12 = 0;
    iVar10 = 0x4fc7;
    goto LAB_00412d1c;
  case 0x1a8:
    puVar11 = &LAB_00429ce0;
    goto LAB_00412c8d;
  case 0x1af:
    pcVar13 = (code *)&LAB_0042a790;
    break;
  case 0x1b0:
    pcVar13 = (code *)&LAB_0042a7b0;
    break;
  case 0x1b1:
    pcVar13 = (code *)&LAB_0042a7c0;
    break;
  case 0x1b2:
    pcVar13 = (code *)&LAB_0042a7e0;
    break;
  case 0x1b3:
    pcVar13 = (code *)&LAB_0042a7f0;
    break;
  case 0x1b4:
    pcVar13 = (code *)&LAB_0042a810;
    break;
  case 0x1bc:
    pcVar13 = (code *)&LAB_0042a360;
    break;
  case 0x1bd:
    pcVar13 = (code *)&LAB_0042a370;
    break;
  case 0x1bf:
    pcVar13 = (code *)&LAB_0042a380;
    break;
  case 0x1ce:
    pcVar13 = (code *)&LAB_0042a3f0;
    break;
  case 0x1cf:
    pcVar13 = (code *)&LAB_0042a440;
    break;
  case 0x1d0:
    pcVar13 = (code *)&LAB_0042a490;
    break;
  case 0x1d2:
    pcVar13 = (code *)&LAB_0042a580;
    break;
  case 0x1d3:
    pcVar13 = (code *)&LAB_0042a5a0;
    break;
  case 0x1d4:
    pcVar13 = (code *)&LAB_0042a5c0;
    break;
  case 0x1d5:
    pcVar13 = (code *)&LAB_0042a5f0;
    break;
  case 0x1d6:
    pcVar13 = (code *)&LAB_0042a690;
    break;
  case 0x1d7:
    pcVar13 = (code *)&LAB_0042a6c0;
    break;
  case 0x1d8:
    pcVar13 = (code *)&LAB_0042a700;
    break;
  case 0x1d9:
    pcVar13 = (code *)&LAB_0042a730;
    break;
  case 0x1e1:
    pcVar13 = (code *)&LAB_0042a4e0;
    break;
  case 0x1e2:
    pcVar13 = (code *)&LAB_0042a4f0;
    break;
  case 0x1e4:
    pcVar13 = (code *)&LAB_00429f00;
    break;
  case 0x1e5:
    puVar11 = &LAB_00429f30;
    goto LAB_00412c8d;
  case 0x1e6:
    puVar11 = &LAB_00429f50;
    goto LAB_00412c8d;
  case 0x1e7:
    FUN_0040e410(0x429f80);
    FUN_00413525(param_1,0x5008,0x4099040000000000);
    FUN_00413525(param_1,0x5009,0x3ff0000000000000);
    FUN_00413525(param_1,0x500a,0x3ff0000000000000);
    FUN_00413525(param_1,0x500b,0);
    FUN_00413525(param_1,0x500c,0);
    FUN_00413525(param_1,0x500d,0);
    uVar12 = 0;
    iVar10 = 0x500e;
    goto LAB_00412d1c;
  case 0x1ef:
    puVar11 = &LAB_0042a100;
    goto LAB_00412c8d;
  case 0x1f0:
    puVar11 = &LAB_0042a120;
    goto LAB_00412c8d;
  case 0x1f1:
    puVar11 = &LAB_0042a140;
    goto LAB_00412c8d;
  case 0x1f2:
    puVar11 = &LAB_0042a160;
    goto LAB_00412c8d;
  case 499:
    puVar11 = &LAB_0042a180;
    goto LAB_00412c8d;
  case 500:
    puVar11 = &LAB_0042a1a0;
    goto LAB_00412c8d;
  case 0x1f5:
    puVar11 = &LAB_0042a1c0;
    goto LAB_00412c8d;
  case 0x1f6:
    puVar11 = &LAB_0042a1e0;
    goto LAB_00412c8d;
  case 0x1fc:
    pcVar13 = (code *)&LAB_0042a500;
    break;
  case 0x1fe:
    pcVar13 = (code *)&LAB_0042a550;
    break;
  case 0x1ff:
    pcVar13 = (code *)&LAB_0042a560;
    break;
  case 0x202:
    pcVar13 = (code *)&LAB_0042a620;
    break;
  case 0x203:
    pcVar13 = (code *)&LAB_0042a660;
    break;
  case 0x205:
    FUN_0040e410(0x42a220);
    FUN_00414499(param_1,0x5027);
    FUN_00414499(param_1,0x5026);
    FUN_00413525(param_1,0x5028,0);
    FUN_00413525(param_1,0x5029,0);
    uVar12 = 0x3ff0000000000000;
    iVar10 = 0x502a;
    goto LAB_00412d1c;
  case 0x212:
    puVar11 = &LAB_0042a850;
    goto LAB_0041298d;
  case 0x213:
    puVar11 = &LAB_0042a8a0;
    goto LAB_0041298d;
  case 0x215:
    puVar11 = &LAB_0042a8e0;
LAB_0041298d:
    uVar3 = FUN_00413c2f(param_1,(int)puVar11);
    return uVar3;
  case 0x225:
    cVar2 = FUN_00411a9c(param_1,0x42abf0);
    if (cVar2 != '\0') {
      return 1;
    }
    pcVar13 = (code *)&LAB_0042ac30;
    break;
  case 0x226:
    cVar2 = FUN_00411a9c(param_1,0x42ac40);
    if (cVar2 != '\0') {
      return 1;
    }
    pcVar13 = (code *)&LAB_0042ac80;
    break;
  case 0x22b:
    pcVar13 = FUN_0042ad20;
    goto LAB_004129e5;
  case 0x22c:
    pcVar13 = (code *)&LAB_0042ad30;
    goto LAB_004129e5;
  case 0x22d:
    pcVar13 = (code *)&LAB_0042ad40;
LAB_004129e5:
    FUN_0040e410((int)pcVar13);
    FUN_00411b0f(param_1,0x5049);
    FUN_00413525(param_1,0x5047,0);
    uVar12 = 0;
    iVar10 = 0x5048;
    goto LAB_00412d1c;
  case 0x23c:
    pcVar13 = (code *)&LAB_0042ad50;
    break;
  case 0x23d:
    pcVar13 = FUN_0042ad60;
    break;
  case 0x23e:
    pcVar13 = (code *)&LAB_0042ad70;
    break;
  case 0x23f:
    pcVar13 = (code *)&LAB_0042ad80;
    break;
  case 0x247:
    puVar11 = &LAB_0042adb0;
    goto LAB_00412d33;
  case 0x249:
    puVar11 = &LAB_0042ae10;
    goto LAB_00412a76;
  case 0x24a:
    puVar11 = &LAB_0042ae40;
    goto LAB_00412a76;
  case 0x24b:
    puVar11 = &LAB_0042ae70;
LAB_00412a76:
    cVar2 = FUN_004134b2(param_1,(int)puVar11);
    if (cVar2 != '\0') {
      return 1;
    }
    FUN_0040e410((int)puVar11);
switchD_00411d8a_caseD_11:
    uVar3 = 0;
LAB_00411dab:
    FUN_00411d12(uVar3);
    return 1;
  case 0x251:
    pcVar13 = (code *)&LAB_0042aea0;
    break;
  case 0x253:
    pcVar13 = (code *)&LAB_0042aeb0;
    break;
  case 0x254:
    pcVar13 = (code *)&LAB_0042bc50;
    break;
  case 0x255:
    pcVar13 = (code *)&LAB_0042bca0;
    break;
  case 0x256:
    pcVar13 = (code *)&LAB_0042bd30;
    break;
  case 599:
    pcVar13 = (code *)&LAB_0042bdd0;
    break;
  case 0x25b:
    pcVar13 = (code *)&LAB_0042aef0;
    break;
  case 0x25d:
    pcVar13 = (code *)&LAB_0042af90;
    break;
  case 0x25e:
    pcVar13 = (code *)&LAB_0042b620;
    break;
  case 0x25f:
    pcVar13 = (code *)&LAB_0042b020;
    break;
  case 0x261:
    pcVar13 = (code *)&LAB_0042b650;
    break;
  case 0x264:
    pcVar13 = (code *)&LAB_0042bfb0;
    break;
  case 0x265:
    pcVar13 = (code *)&LAB_0042af30;
    break;
  case 0x266:
    pcVar13 = (code *)&LAB_0042af60;
    break;
  case 0x267:
    pcVar13 = (code *)&LAB_0042b080;
    break;
  case 0x268:
    pcVar13 = (code *)&LAB_0042b6f0;
    break;
  case 0x269:
    pcVar13 = (code *)&LAB_0042bb60;
    break;
  case 0x26a:
    pcVar13 = (code *)&LAB_0042b750;
    break;
  case 0x26b:
    pcVar13 = (code *)&LAB_0042b780;
    break;
  case 0x26e:
    pcVar13 = (code *)&LAB_0042b050;
    break;
  case 0x272:
    pcVar13 = (code *)&LAB_0042b720;
    break;
  case 0x273:
    pcVar13 = (code *)&LAB_0042aff0;
    break;
  case 0x275:
    pcVar13 = (code *)&LAB_0042aed0;
    break;
  case 0x277:
    pcVar13 = (code *)&LAB_0042bbf0;
    break;
  case 0x279:
    fVar9 = (float10)6.283185307179586;
    goto LAB_00411d98;
  case 0x27a:
    fVar9 = (float10)0.03125;
    goto LAB_00411d98;
  case 0x27b:
    fVar9 = (float10)-1.0;
    goto LAB_00411d98;
  case 0x27c:
    if (*(int *)(iVar10 + 4) == 2) {
      if (DAT_00437398 <= uVar6) {
        return 0;
      }
      iVar10 = uVar6 * 0x20 + DAT_00437390;
      uVar6 = *(uint *)(iVar10 + 8);
      if (DAT_00437084 <= uVar6) {
        return 0;
      }
      uVar8 = *(uint *)(iVar10 + 0xc);
      if ((int)uVar8 < 0) {
        puVar11 = &LAB_00429350;
        goto LAB_00411e48;
      }
      puVar11 = &LAB_00429370;
    }
    else {
      if (*(int *)(iVar10 + 4) != 3) {
        return 0;
      }
      if (DAT_00437394 <= uVar6) {
        return 0;
      }
      iVar10 = uVar6 * 0x20 + DAT_0043738c;
      if (DAT_00437084 <= *(uint *)(iVar10 + 8)) {
        return 0;
      }
      if (*(int *)(iVar10 + 0xc) < 0) {
        uVar6 = *(int *)(iVar10 + 0x10) + _DAT_0043737c;
        puVar11 = &LAB_004293d0;
        goto LAB_00411e48;
      }
      uVar8 = *(int *)(iVar10 + 0x14) + _DAT_00437384;
      uVar6 = *(int *)(iVar10 + 0x10) + _DAT_0043737c;
      puVar11 = &LAB_00429400;
    }
    goto LAB_00411e59;
  case 0x27d:
    if (*(int *)(iVar10 + 4) == 2) {
      if (DAT_00437398 <= uVar6) {
        return 0;
      }
      iVar10 = uVar6 * 0x20 + DAT_00437390;
      uVar6 = *(uint *)(iVar10 + 8);
      if (DAT_00437084 <= uVar6) {
        return 0;
      }
      uVar8 = *(uint *)(iVar10 + 0xc);
      if ((int)uVar8 < 0) {
        puVar11 = &LAB_00429470;
        goto LAB_00411e48;
      }
      puVar11 = &LAB_00429490;
    }
    else {
      if (*(int *)(iVar10 + 4) != 3) {
        return 0;
      }
      if (DAT_00437394 <= uVar6) {
        return 0;
      }
      iVar10 = uVar6 * 0x20 + DAT_0043738c;
      if (DAT_00437084 <= *(uint *)(iVar10 + 8)) {
        return 0;
      }
      if (*(int *)(iVar10 + 0xc) < 0) {
        uVar6 = *(int *)(iVar10 + 0x10) + _DAT_0043737c;
        puVar11 = &LAB_004294f0;
        goto LAB_00411e48;
      }
      uVar8 = *(int *)(iVar10 + 0x14) + _DAT_00437384;
      uVar6 = *(int *)(iVar10 + 0x10) + _DAT_0043737c;
      puVar11 = &LAB_00429520;
    }
LAB_00411e59:
    FUN_0040e434((int)puVar11,uVar6,uVar8);
    return 1;
  case 0x280:
    pcVar13 = (code *)&LAB_0042a980;
    break;
  case 0x2ab:
    puVar11 = &LAB_004296b0;
    goto LAB_00412c8d;
  case 0x2ac:
    puVar11 = &LAB_004296d0;
    goto LAB_00412c8d;
  case 0x2ad:
    pcVar13 = (code *)&LAB_0042bb90;
    break;
  case 0x2ae:
    pcVar13 = (code *)&LAB_0042af20;
    break;
  case 0x2af:
    puVar11 = &LAB_00429e60;
    goto LAB_00412c46;
  case 0x2b0:
    puVar11 = &LAB_00429eb0;
LAB_00412c46:
    uVar3 = FUN_0041392a(param_1,(int)puVar11);
    return uVar3;
  case 699:
    pcVar13 = (code *)&LAB_0042bc20;
    break;
  case 0x2bd:
    pcVar13 = (code *)&LAB_0042b6d0;
    break;
  case 0x2be:
    pcVar13 = (code *)&LAB_0042be70;
    break;
  case 0x2c3:
    pcVar13 = (code *)&LAB_0042beb0;
    break;
  case 0x2c4:
    pcVar13 = (code *)&LAB_0042bef0;
    break;
  case 0x2c5:
    pcVar13 = (code *)&LAB_0042bbc0;
    break;
  case 0x2c6:
    pcVar13 = (code *)&LAB_0042bf30;
    break;
  case 0x2c7:
    pcVar13 = (code *)&LAB_0042bf70;
    break;
  case 0x2ca:
    pcVar13 = (code *)&LAB_0042a990;
    break;
  case 0x2dd:
    pcVar7 = (code *)&LAB_0042bfc0;
    pcVar13 = pcVar7;
    goto LAB_00411ddd;
  case 0x2de:
    pcVar7 = (code *)&LAB_0042c000;
    pcVar13 = pcVar7;
    goto LAB_00411ddd;
  case 0x2df:
    pcVar7 = (code *)&LAB_0042c040;
    pcVar13 = pcVar7;
LAB_00411ddd:
    uVar3 = FUN_0040d9f0(FUN_00411d37,param_1,(int)pcVar7,pcVar13);
    return uVar3;
  case 0x2e0:
    puVar11 = &LAB_0042c080;
    goto LAB_00412c8d;
  case 0x2e1:
    fVar9 = (float10)4294967295.0;
LAB_00411d98:
    FUN_00411cf5((double)fVar9);
    return 1;
  case 0x2e2:
    puVar11 = &LAB_0042c0a0;
    goto LAB_00412c8d;
  case 0x2e3:
    puVar11 = &LAB_0042c0d0;
LAB_00412c8d:
    uVar3 = FUN_004134b2(param_1,(int)puVar11);
    return uVar3;
  case 0x2e5:
    pcVar13 = (code *)&LAB_0042bd80;
    break;
  case 0x2e6:
    pcVar13 = (code *)&LAB_0042be20;
    break;
  case 0x2e7:
    pcVar13 = (code *)&LAB_0042c100;
    break;
  case 0x301:
    pcVar13 = (code *)&LAB_0042b6e0;
    break;
  case 0x306:
    pcVar13 = (code *)&LAB_0042b100;
    break;
  case 0x307:
    pcVar13 = (code *)&LAB_0042b180;
    break;
  case 0x308:
    pcVar13 = (code *)&LAB_0042b1b0;
    break;
  case 0x309:
    pcVar13 = (code *)&LAB_0042b290;
    break;
  case 0x376:
    puVar11 = &LAB_0042c140;
    goto LAB_00412cf9;
  case 0x377:
    puVar11 = &LAB_0042c180;
LAB_00412cf9:
    FUN_0040e410((int)puVar11);
    FUN_00413525(param_1,0x5198,0);
    uVar12 = 0;
    iVar10 = 0x5199;
LAB_00412d1c:
    FUN_00413525(param_1,iVar10,uVar12);
    return 1;
  case 0x37c:
    pcVar13 = (code *)&LAB_0042c1d0;
    break;
  case 0x3ad:
    pcVar13 = (code *)&LAB_0042b4e0;
    break;
  case 0x3ae:
    pcVar13 = (code *)&LAB_0042afc0;
    break;
  case 0x3af:
    puVar11 = &LAB_0042b830;
LAB_00412d33:
    uVar3 = FUN_00414426(param_1,(int)puVar11);
    return uVar3;
  case 0x3b0:
    pcVar13 = (code *)&LAB_0042ba60;
    break;
  case 0x3b2:
    pcVar13 = (code *)&LAB_0042baf0;
    break;
  case 0x3b3:
    pcVar13 = (code *)&LAB_0042b230;
    break;
  case 0x3b4:
    pcVar13 = (code *)&LAB_0042b260;
    break;
  case 0x3f4:
    pcVar13 = (code *)&LAB_0042b7b0;
  }
  FUN_0040e410((int)pcVar13);
  return 1;
}



/******************************************************************************/
/* TARGET 004134b2  FUN_004134b2 */
/******************************************************************************/

void __cdecl FUN_004134b2(int param_1,int param_2)

{
  FUN_004134de(param_1,param_2,0,-1);
  return;
}



/******************************************************************************/
/* TARGET 004134c7  FUN_004134c7 */
/******************************************************************************/

void __cdecl FUN_004134c7(int param_1,int param_2,int param_3)

{
  FUN_004134de(param_1,param_2,param_3,-1);
  return;
}



/******************************************************************************/
/* TARGET 004134de  FUN_004134de */
/******************************************************************************/

undefined4 __cdecl FUN_004134de(int param_1,int param_2,int param_3,int param_4)

{
  char cVar1;
  int iVar2;
  undefined3 extraout_var;
  
  iVar2 = FUN_0040e434(param_2,param_3,param_4);
  if (*(int *)(param_1 * 0x20 + 4 + DAT_004373a0) != 1) {
    cVar1 = FUN_00411d37(param_1 + 1);
    param_1 = CONCAT31(extraout_var,cVar1);
    if (cVar1 != '\0') {
      return CONCAT31(extraout_var,1);
    }
  }
  DAT_004376d8 = iVar2;
  return param_1 & 0xffffff00;
}



/******************************************************************************/
/* TARGET 00413525  FUN_00413525 */
/******************************************************************************/

void __cdecl FUN_00413525(int param_1,int param_2,undefined8 param_3)

{
  char cVar1;
  int iVar2;
  byte *pbVar3;
  int iVar4;
  
  pbVar3 = (byte *)(param_1 * 0x20 + DAT_0043739c);
  iVar4 = param_1 * 0x20 + DAT_004373a0;
  if ((*pbVar3 & 1) != 0) {
    iVar2 = 1;
    do {
      param_1 = param_1 + iVar2;
      pbVar3 = pbVar3 + iVar2 * 0x20;
      iVar4 = iVar4 + iVar2 * 0x20;
      if (((*(int *)(pbVar3 + 0x1c) == param_2 + -20000) && ((*pbVar3 & 1) != 0)) &&
         (cVar1 = FUN_00411d37(param_1 + 1), cVar1 != '\0')) {
        return;
      }
      iVar2 = *(int *)(iVar4 + 4);
    } while ((*pbVar3 & 2) != 0);
  }
  FUN_00411cf5(param_3);
  return;
}



/******************************************************************************/
/* TARGET 00413593  FUN_00413593 */
/******************************************************************************/

/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

uint __fastcall FUN_00413593(uint param_1)

{
  uint in_EAX;
  undefined4 uVar1;
  uint uVar2;
  byte *pbVar3;
  int iVar4;
  undefined1 *puVar5;
  undefined8 uVar6;
  code *pcVar7;
  
  if (DAT_004373a4 <= param_1) {
LAB_0041359f:
    return in_EAX & 0xffffff00;
  }
  pbVar3 = (byte *)(param_1 * 0x20 + DAT_0043739c);
  in_EAX = *(uint *)(pbVar3 + 8);
  if ((*pbVar3 & 0x90) != 0) goto LAB_0041359f;
  iVar4 = *(int *)(pbVar3 + 0x1c);
  if (iVar4 + 20000 < 0x50dd) {
    if (iVar4 + 20000 == 0x50dc) {
      pcVar7 = (code *)&LAB_0042c9f0;
    }
    else {
      if (iVar4 == 0x2f) {
        uVar1 = FUN_0040db61(param_1,0x4f16);
        return uVar1;
      }
      if (iVar4 == 0xf6) {
        if (*(int *)(pbVar3 + 4) == 2) {
          if (DAT_00437398 <= in_EAX) goto LAB_0041359f;
          in_EAX = in_EAX * 0x20 + DAT_00437390;
          uVar2 = *(uint *)(in_EAX + 8);
          if (DAT_00437214 <= uVar2) goto LAB_0041359f;
          iVar4 = *(int *)(in_EAX + 0xc);
          if (-1 < iVar4) {
            puVar5 = &LAB_0042c5b0;
            goto LAB_00413776;
          }
          puVar5 = &LAB_0042c590;
        }
        else {
          if (((*(int *)(pbVar3 + 4) != 3) || (DAT_00437394 <= in_EAX)) ||
             (in_EAX = in_EAX * 0x20 + DAT_0043738c, DAT_00437214 <= *(uint *)(in_EAX + 8)))
          goto LAB_0041359f;
          if (-1 < *(int *)(in_EAX + 0xc)) {
            iVar4 = *(int *)(in_EAX + 0x14) + _DAT_00437384;
            uVar2 = *(int *)(in_EAX + 0x10) + _DAT_00437374;
            puVar5 = &LAB_0042c640;
LAB_00413776:
            iVar4 = FUN_0040e434((int)puVar5,uVar2,iVar4);
            goto LAB_00413925;
          }
          uVar2 = *(int *)(in_EAX + 0x10) + _DAT_00437374;
          puVar5 = &LAB_0042c610;
        }
        iVar4 = FUN_0040e421((int)puVar5,uVar2);
        goto LAB_00413925;
      }
      if (iVar4 == 0x18b) {
        FUN_0040e410(0x42c2b0);
        FUN_00413525(param_1,0x4fa7,0);
        FUN_00413525(param_1,0x4fa8,0);
        FUN_00413525(param_1,0x4fa9,0x413e848000000000);
        uVar6 = 0x413e848000000000;
        iVar4 = 0x4faa;
        goto LAB_004136c1;
      }
      if (iVar4 != 0x1de) {
        if (iVar4 == 0x2b1) {
          puVar5 = &LAB_0042c6d0;
LAB_0041364f:
          uVar1 = FUN_0041392a(param_1,(int)puVar5);
          return uVar1;
        }
        if (iVar4 == 0x2b2) {
          puVar5 = &LAB_0042c6f0;
          goto LAB_0041364f;
        }
        if (iVar4 != 0x2b4) goto LAB_0041359f;
        FUN_0040e410(0x42c710);
        FUN_0041399d(param_1,0x50d5);
        FUN_00413525(param_1,0x50d6,0x413e848000000000);
        uVar6 = 0x413e848000000000;
        iVar4 = 0x50d7;
        goto LAB_004138c9;
      }
      pcVar7 = FUN_0042c6b0;
    }
    iVar4 = FUN_0040e410((int)pcVar7);
  }
  else {
    if (iVar4 == 0x2d2) {
      FUN_0040e410(0x42c910);
      FUN_0041399d(param_1,0x50f3);
      FUN_00413525(param_1,0x50f4,0x3ff0000000000000);
      iVar4 = FUN_00411833(param_1,0x50d9,'\0');
      goto LAB_00413925;
    }
    if (iVar4 == 0x2d5) {
      FUN_0040e410(0x42c970);
      FUN_0041399d(param_1,0x50f6);
      uVar6 = 0;
      iVar4 = 0x50f7;
LAB_004138c9:
      FUN_00413525(param_1,iVar4,uVar6);
      FUN_00411833(param_1,0x50d8,'\0');
      iVar4 = FUN_00411833(param_1,0x50d9,'\x01');
      goto LAB_00413925;
    }
    if (iVar4 == 0x2da) {
      uVar1 = FUN_00411a9c(param_1,0x42ca30);
      return uVar1;
    }
    if (iVar4 == 0x2db) {
      uVar1 = FUN_00410c54(param_1,0x42ca70);
      return uVar1;
    }
    if (iVar4 == 0x2fd) {
      FUN_0040e410(0x42cab0);
      FUN_0041399d(param_1,0x511e);
      iVar4 = FUN_0041399d(param_1,0x511f);
      goto LAB_00413925;
    }
    if (iVar4 == 0x3b5) {
      FUN_0040e410(0x42cb00);
      FUN_0041399d(param_1,0x511e);
      FUN_00413525(param_1,0x51d6,0x416fffffe0000000);
      uVar6 = 0;
      iVar4 = 0x51d7;
    }
    else {
      if (iVar4 != 0x3b8) goto LAB_0041359f;
      FUN_0040e410(0x42cb40);
      FUN_0041399d(param_1,0x511e);
      FUN_00413525(param_1,0x51d9,0x416fffffe0000000);
      uVar6 = 0;
      iVar4 = 0x51da;
    }
LAB_004136c1:
    iVar4 = FUN_00413525(param_1,iVar4,uVar6);
  }
LAB_00413925:
  return CONCAT31((int3)((uint)iVar4 >> 8),1);
}



/******************************************************************************/
/* TARGET 0041392a  FUN_0041392a */
/******************************************************************************/

void __cdecl FUN_0041392a(int param_1,int param_2)

{
  FUN_00413956(param_1,param_2,0,-1);
  return;
}



/******************************************************************************/
/* TARGET 0041393f  FUN_0041393f */
/******************************************************************************/

void __cdecl FUN_0041393f(int param_1,int param_2,int param_3)

{
  FUN_00413956(param_1,param_2,param_3,-1);
  return;
}



/******************************************************************************/
/* TARGET 00413956  FUN_00413956 */
/******************************************************************************/

undefined4 __cdecl FUN_00413956(int param_1,int param_2,int param_3,int param_4)

{
  int iVar1;
  
  iVar1 = FUN_0040e434(param_2,param_3,param_4);
  if (*(int *)(param_1 * 0x20 + 4 + DAT_004373a0) != 1) {
    param_1 = FUN_00413593(param_1 + 1);
    if ((char)param_1 != '\0') {
      return CONCAT31((int3)((uint)param_1 >> 8),1);
    }
  }
  DAT_004376d8 = iVar1;
  return param_1 & 0xffffff00;
}



/******************************************************************************/
/* TARGET 0041399d  FUN_0041399d */
/******************************************************************************/

void __cdecl FUN_0041399d(int param_1,int param_2)

{
  int iVar1;
  undefined4 uVar2;
  byte *pbVar3;
  int iVar4;
  
  pbVar3 = (byte *)(param_1 * 0x20 + DAT_0043739c);
  iVar4 = param_1 * 0x20 + DAT_004373a0;
  if ((*pbVar3 & 1) != 0) {
    iVar1 = 1;
    do {
      param_1 = param_1 + iVar1;
      pbVar3 = pbVar3 + iVar1 * 0x20;
      iVar4 = iVar4 + iVar1 * 0x20;
      if (((*(int *)(pbVar3 + 0x1c) == param_2 + -20000) && ((*pbVar3 & 1) != 0)) &&
         (uVar2 = FUN_00413593(param_1 + 1), (char)uVar2 != '\0')) {
        return;
      }
      iVar1 = *(int *)(iVar4 + 4);
    } while ((*pbVar3 & 2) != 0);
  }
  FUN_0040e410(0x42c580);
  return;
}



/******************************************************************************/
/* TARGET 00413a07  FUN_00413a07 */
/******************************************************************************/

/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

undefined1 __fastcall FUN_00413a07(uint param_1)

{
  undefined1 uVar1;
  undefined4 uVar2;
  int iVar3;
  uint uVar4;
  byte *pbVar5;
  int iVar6;
  undefined1 *puVar7;
  
  if (DAT_004373a4 <= param_1) {
    return 0;
  }
  pbVar5 = (byte *)(param_1 * 0x20 + DAT_0043739c);
  uVar4 = *(uint *)(pbVar5 + 8);
  if ((*pbVar5 & 0x90) != 0) {
    return 0;
  }
  iVar3 = *(int *)(pbVar5 + 0x1c);
  iVar6 = iVar3 + 20000;
  if (iVar6 < 0x503b) {
    if (iVar6 == 0x503a) {
      puVar7 = &LAB_0042e860;
    }
    else {
      if (iVar3 == 0x2d) {
        if (*(int *)(pbVar5 + 4) == 2) {
          if (DAT_00437398 <= uVar4) {
            return 0;
          }
          iVar3 = uVar4 * 0x20 + DAT_00437390;
          uVar4 = *(uint *)(iVar3 + 8);
          if (DAT_00437204 <= uVar4) {
            return 0;
          }
          iVar6 = *(int *)(iVar3 + 0xc);
          if (-1 < iVar6) {
            puVar7 = &LAB_0042e6e0;
LAB_00413af5:
            FUN_0040e434((int)puVar7,uVar4,iVar6);
            return 1;
          }
          puVar7 = &LAB_0042e6c0;
        }
        else {
          if (*(int *)(pbVar5 + 4) != 3) {
            return 0;
          }
          if (DAT_00437394 <= uVar4) {
            return 0;
          }
          iVar3 = uVar4 * 0x20 + DAT_0043738c;
          if (DAT_00437204 <= *(uint *)(iVar3 + 8)) {
            return 0;
          }
          if (-1 < *(int *)(iVar3 + 0xc)) {
            iVar6 = *(int *)(iVar3 + 0x14) + _DAT_00437384;
            uVar4 = *(int *)(iVar3 + 0x10) + _DAT_00437378;
            puVar7 = &LAB_0042e770;
            goto LAB_00413af5;
          }
          uVar4 = *(int *)(iVar3 + 0x10) + _DAT_00437378;
          puVar7 = &LAB_0042e740;
        }
        FUN_0040e421((int)puVar7,uVar4);
        return 1;
      }
      if (iVar3 == 0x2f) {
        uVar2 = FUN_0040db61(param_1,0x4e4d);
        return (char)uVar2;
      }
      if (iVar3 == 0x1df) {
        FUN_0040e410(0x42e9c0);
        return 1;
      }
      if (iVar3 == 0x216) {
        puVar7 = &LAB_0042e7e0;
      }
      else if (iVar3 == 0x217) {
        puVar7 = &LAB_0042e800;
      }
      else if (iVar6 == 0x5038) {
        puVar7 = &LAB_0042e820;
      }
      else {
        if (iVar6 != 0x5039) {
          return 0;
        }
        puVar7 = &LAB_0042e840;
      }
    }
  }
  else if (iVar3 == 0x21b) {
    puVar7 = &LAB_0042e880;
  }
  else {
    if (iVar3 != 0x21c) {
      if (iVar3 == 0x21d) {
        uVar1 = FUN_0040d9f0(FUN_00413a07,param_1,0x42e8c0,&LAB_004303c0);
        return uVar1;
      }
      if (iVar3 == 0x21e) {
        FUN_0040e410(0x42e930);
        FUN_00413ca2(param_1,0x503f);
        iVar3 = 0x5040;
      }
      else {
        if (iVar3 != 0x221) {
          if (iVar3 != 0x2d8) {
            return 0;
          }
          puVar7 = &LAB_0042e9e0;
          goto LAB_00413c24;
        }
        FUN_0040e410(0x42e970);
        FUN_00413525(param_1,0x5042,0x408f400000000000);
        iVar3 = 0x5043;
      }
      FUN_00413525(param_1,iVar3,0x3ff0000000000000);
      return 1;
    }
    puVar7 = &LAB_0042e8a0;
  }
LAB_00413c24:
  uVar1 = FUN_00413c2f(param_1,(int)puVar7);
  return uVar1;
}



/******************************************************************************/
/* TARGET 00413c2f  FUN_00413c2f */
/******************************************************************************/

void __cdecl FUN_00413c2f(int param_1,int param_2)

{
  FUN_00413c5b(param_1,param_2,0,-1);
  return;
}



/******************************************************************************/
/* TARGET 00413c44  FUN_00413c44 */
/******************************************************************************/

void __cdecl FUN_00413c44(int param_1,int param_2,int param_3)

{
  FUN_00413c5b(param_1,param_2,param_3,-1);
  return;
}



/******************************************************************************/
/* TARGET 00413c5b  FUN_00413c5b */
/******************************************************************************/

undefined4 __cdecl FUN_00413c5b(int param_1,int param_2,int param_3,int param_4)

{
  char cVar1;
  int iVar2;
  undefined3 extraout_var;
  
  iVar2 = FUN_0040e434(param_2,param_3,param_4);
  if (*(int *)(param_1 * 0x20 + 4 + DAT_004373a0) != 1) {
    cVar1 = FUN_00413a07(param_1 + 1);
    param_1 = CONCAT31(extraout_var,cVar1);
    if (cVar1 != '\0') {
      return CONCAT31(extraout_var,1);
    }
  }
  DAT_004376d8 = iVar2;
  return param_1 & 0xffffff00;
}



/******************************************************************************/
/* TARGET 00413ca2  FUN_00413ca2 */
/******************************************************************************/

void __cdecl FUN_00413ca2(int param_1,int param_2)

{
  char cVar1;
  int iVar2;
  byte *pbVar3;
  int iVar4;
  
  pbVar3 = (byte *)(param_1 * 0x20 + DAT_0043739c);
  iVar4 = param_1 * 0x20 + DAT_004373a0;
  if ((*pbVar3 & 1) != 0) {
    iVar2 = 1;
    do {
      param_1 = param_1 + iVar2;
      pbVar3 = pbVar3 + iVar2 * 0x20;
      iVar4 = iVar4 + iVar2 * 0x20;
      if (((*(int *)(pbVar3 + 0x1c) == param_2 + -20000) && ((*pbVar3 & 1) != 0)) &&
         (cVar1 = FUN_00413a07(param_1 + 1), cVar1 != '\0')) {
        return;
      }
      iVar2 = *(int *)(iVar4 + 4);
    } while ((*pbVar3 & 2) != 0);
  }
  FUN_0040e410(0x42e6b0);
  return;
}



/******************************************************************************/
/* TARGET 00413d0c  FUN_00413d0c */
/******************************************************************************/

/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

uint __fastcall FUN_00413d0c(uint param_1)

{
  uint in_EAX;
  int iVar1;
  uint uVar2;
  undefined4 uVar3;
  byte *pbVar4;
  undefined1 *puVar5;
  
  if (DAT_004373a4 <= param_1) {
LAB_00413d15:
    return in_EAX & 0xffffff00;
  }
  pbVar4 = (byte *)(param_1 * 0x20 + DAT_0043739c);
  in_EAX = *(uint *)(pbVar4 + 8);
  if ((*pbVar4 & 0x90) != 0) goto LAB_00413d15;
  iVar1 = *(int *)(pbVar4 + 0x1c);
  if (iVar1 == 0x2f) {
    uVar3 = FUN_0040db61(param_1,0x4e51);
    return uVar3;
  }
  if (iVar1 != 0x31) {
    if (iVar1 != 0x278) goto LAB_00413d15;
    iVar1 = FUN_0040e410(0x42ebc0);
    goto LAB_00413da2;
  }
  if (*(int *)(pbVar4 + 4) == 2) {
    if (DAT_00437398 <= in_EAX) goto LAB_00413d15;
    in_EAX = in_EAX * 0x20 + DAT_00437390;
    uVar2 = *(uint *)(in_EAX + 8);
    if (DAT_00437084 <= uVar2) goto LAB_00413d15;
    iVar1 = *(int *)(in_EAX + 0xc);
    if (-1 < iVar1) {
      puVar5 = &LAB_0042eac0;
      goto LAB_00413d9a;
    }
    puVar5 = &LAB_0042eaa0;
  }
  else {
    if (((*(int *)(pbVar4 + 4) != 3) || (DAT_00437394 <= in_EAX)) ||
       (in_EAX = in_EAX * 0x20 + DAT_0043738c, DAT_00437084 <= *(uint *)(in_EAX + 8)))
    goto LAB_00413d15;
    if (-1 < *(int *)(in_EAX + 0xc)) {
      iVar1 = *(int *)(in_EAX + 0x14) + _DAT_00437384;
      uVar2 = *(int *)(in_EAX + 0x10) + _DAT_0043737c;
      puVar5 = &LAB_0042eb50;
LAB_00413d9a:
      iVar1 = FUN_0040e434((int)puVar5,uVar2,iVar1);
      goto LAB_00413da2;
    }
    uVar2 = *(int *)(in_EAX + 0x10) + _DAT_0043737c;
    puVar5 = &LAB_0042eb20;
  }
  iVar1 = FUN_0040e421((int)puVar5,uVar2);
LAB_00413da2:
  return CONCAT31((int3)((uint)iVar1 >> 8),1);
}



/******************************************************************************/
/* TARGET 00413e14  FUN_00413e14 */
/******************************************************************************/

void __cdecl FUN_00413e14(int param_1,int param_2)

{
  FUN_00413e40(param_1,param_2,0,-1);
  return;
}



/******************************************************************************/
/* TARGET 00413e29  FUN_00413e29 */
/******************************************************************************/

void __cdecl FUN_00413e29(int param_1,int param_2,int param_3)

{
  FUN_00413e40(param_1,param_2,param_3,-1);
  return;
}



/******************************************************************************/
/* TARGET 00413e40  FUN_00413e40 */
/******************************************************************************/

undefined4 __cdecl FUN_00413e40(int param_1,int param_2,int param_3,int param_4)

{
  int iVar1;
  
  iVar1 = FUN_0040e434(param_2,param_3,param_4);
  if (*(int *)(param_1 * 0x20 + 4 + DAT_004373a0) != 1) {
    param_1 = FUN_00413d0c(param_1 + 1);
    if ((char)param_1 != '\0') {
      return CONCAT31((int3)((uint)param_1 >> 8),1);
    }
  }
  DAT_004376d8 = iVar1;
  return param_1 & 0xffffff00;
}



/******************************************************************************/
/* TARGET 00413e87  FUN_00413e87 */
/******************************************************************************/

/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

undefined1 __fastcall FUN_00413e87(uint param_1)

{
  undefined1 uVar1;
  char cVar2;
  int iVar3;
  uint uVar4;
  undefined4 uVar5;
  int iVar6;
  byte *pbVar7;
  undefined1 *puVar8;
  undefined8 uVar9;
  code *pcVar10;
  
  if (DAT_004373a4 <= param_1) {
LAB_004143e5:
    return 0;
  }
  pbVar7 = (byte *)(param_1 * 0x20 + DAT_0043739c);
  uVar4 = *(uint *)(pbVar7 + 8);
  if ((*pbVar7 & 0x90) != 0) {
    return 0;
  }
  iVar6 = *(int *)(pbVar7 + 0x1c);
  iVar3 = iVar6 + 20000;
  if (0x4ffc < iVar3) {
    if (iVar3 < 0x5063) {
      if (iVar3 != 0x5062) {
        switch(iVar6) {
        case 0x1f7:
          pcVar10 = FUN_0042ef30;
          break;
        case 0x1f8:
          pcVar10 = FUN_0042ef80;
          break;
        case 0x1f9:
          pcVar10 = FUN_0042efd0;
          break;
        case 0x1fa:
          pcVar10 = FUN_0042f020;
          break;
        case 0x1fb:
          pcVar10 = FUN_0042f070;
          break;
        default:
          goto LAB_004143e5;
        case 0x200:
          pcVar10 = FUN_0042ee70;
          break;
        case 0x201:
          pcVar10 = FUN_0042eeb0;
          break;
        case 0x20b:
          pcVar10 = (code *)&LAB_0042ed20;
          goto LAB_004143dd;
        case 0x20c:
          FUN_0040e410(0x42fa20);
          FUN_00414499(param_1,0x5027);
          FUN_00414499(param_1,0x502d);
          FUN_00414499(param_1,0x502e);
          FUN_00414499(param_1,0x502f);
          FUN_00414499(param_1,0x5030);
          return 1;
        }
LAB_00414307:
        uVar1 = FUN_004134b2(param_1,(int)pcVar10);
        return uVar1;
      }
      pcVar10 = (code *)&LAB_00430420;
    }
    else if (iVar3 < 0x50ee) {
      if (iVar3 == 0x50ed) {
        pcVar10 = (code *)&LAB_0042ecc0;
      }
      else {
        if (iVar6 == 0x244) {
          pcVar10 = (code *)&LAB_00430440;
          goto LAB_00414307;
        }
        if (iVar6 == 0x245) {
          pcVar10 = (code *)&LAB_00430510;
        }
        else if (iVar6 == 600) {
          pcVar10 = (code *)&LAB_004307b0;
        }
        else {
          if (iVar6 != 0x282) {
            if (iVar6 == 0x2cb) {
              puVar8 = &LAB_004301b0;
            }
            else {
              if (iVar6 != 0x2cc) {
                return 0;
              }
              puVar8 = &LAB_004301c0;
            }
            FUN_0040e410((int)puVar8);
            FUN_00414499(param_1,0x5027);
            FUN_00414499(param_1,0x50f1);
            FUN_00414499(param_1,0x50ef);
            FUN_00414499(param_1,0x50f0);
            return 1;
          }
          cVar2 = FUN_00414426(param_1,0x42f570);
          if (cVar2 != '\0') {
            return 1;
          }
          pcVar10 = FUN_0042f550;
        }
      }
    }
    else if (iVar6 == 0x2ce) {
      pcVar10 = (code *)&LAB_0042ecc0;
    }
    else if (iVar6 == 0x2e8) {
      pcVar10 = (code *)&LAB_00430810;
    }
    else if (iVar6 == 0x2e9) {
      pcVar10 = (code *)&LAB_00430870;
    }
    else if (iVar6 == 0x2ef) {
      pcVar10 = FUN_0042f610;
    }
    else {
      if (iVar6 != 0x31a) {
        if (iVar6 != 0x3a8) {
          return 0;
        }
        FUN_0040e410(0x430340);
        FUN_00413525(param_1,0x51c9,0);
        FUN_00413525(param_1,0x51ca,0);
        FUN_00413525(param_1,0x51cb,0xbff0000000000000);
        uVar9 = 0xbff0000000000000;
        iVar6 = 0x51cc;
        goto LAB_004143a6;
      }
      pcVar10 = (code *)&LAB_004308c0;
    }
LAB_004143dd:
    FUN_0040e410((int)pcVar10);
    return 1;
  }
  if (iVar3 == 0x4ffc) {
    pcVar10 = (code *)&LAB_0042f340;
    goto LAB_004143dd;
  }
  if (0x4f42 < iVar3) {
    if (iVar3 < 0x4fdc) {
      if (iVar3 == 0x4fdb) {
        pcVar10 = (code *)&LAB_0042f0e0;
      }
      else if (iVar6 == 0x126) {
        pcVar10 = (code *)&LAB_0042ec10;
      }
      else if (iVar6 == 0x127) {
        pcVar10 = (code *)&LAB_0042ec20;
      }
      else {
        if (iVar6 == 0x129) {
          pcVar10 = FUN_0042eed0;
          goto LAB_00414307;
        }
        if (iVar6 != 0x15c) {
          if (iVar6 != 0x17d) {
            return 0;
          }
          FUN_0040e410(0x4302e0);
          uVar9 = 0;
          iVar6 = 0x4f9e;
          goto LAB_004143a6;
        }
        pcVar10 = FUN_0042f6e0;
      }
    }
    else if (iVar6 == 0x1be) {
      pcVar10 = (code *)&LAB_0042f0f0;
    }
    else if (iVar6 == 0x1c0) {
      pcVar10 = (code *)&LAB_0042f130;
    }
    else if (iVar6 == 0x1c1) {
      pcVar10 = (code *)&LAB_0042f140;
    }
    else if (iVar6 == 0x1da) {
      pcVar10 = (code *)&LAB_0042f150;
    }
    else {
      if (iVar6 != 0x1db) {
        return 0;
      }
      pcVar10 = (code *)&LAB_0042f200;
    }
    goto LAB_004143dd;
  }
  if (iVar3 == 0x4f42) {
    puVar8 = &LAB_0042ef10;
LAB_004140a5:
    uVar1 = FUN_00414426(param_1,(int)puVar8);
    return uVar1;
  }
  if (0x4f35 < iVar3) {
    if (iVar6 == 0x117) {
      FUN_0040e410(0x430200);
      uVar9 = 0;
      iVar6 = 0x4f38;
    }
    else {
      if (iVar6 != 0x119) {
        if (iVar6 == 0x11d) {
          uVar1 = FUN_0040d9f0(FUN_00413e87,param_1,0x4303d0,&LAB_004303c0);
          return uVar1;
        }
        if (iVar6 == 0x11f) {
          pcVar10 = (code *)&LAB_0042ee40;
          goto LAB_00414307;
        }
        if (iVar6 != 0x121) {
          return 0;
        }
        puVar8 = &LAB_0042eef0;
        goto LAB_004140a5;
      }
      FUN_0040e410(0x430270);
      FUN_00413525(param_1,0x4f3a,0);
      uVar9 = 0x3ff0000000000000;
      iVar6 = 0x4f3b;
    }
LAB_004143a6:
    FUN_00413525(param_1,iVar6,uVar9);
    FUN_00414499(param_1,0x4f44);
    return 1;
  }
  if (iVar3 == 0x4f35) {
    FUN_0040e410(0x4301d0);
    uVar9 = 0x3ff0000000000000;
    iVar6 = 0x4f36;
    goto LAB_004143a6;
  }
  if (iVar6 == 0x2f) {
    uVar5 = FUN_0040db61(param_1,0x4e53);
    return (char)uVar5;
  }
  if (iVar6 == 0x33) {
    if (*(int *)(pbVar7 + 4) != 2) {
      if (*(int *)(pbVar7 + 4) != 3) {
        return 0;
      }
      if (DAT_00437394 <= uVar4) {
        return 0;
      }
      iVar3 = uVar4 * 0x20 + DAT_0043738c;
      if (DAT_004371e4 <= *(uint *)(iVar3 + 8)) {
        return 0;
      }
      if (-1 < *(int *)(iVar3 + 0xc)) {
        iVar6 = *(int *)(iVar3 + 0x14) + _DAT_00437384;
        uVar4 = *(int *)(iVar3 + 0x10) + _DAT_00437380;
        puVar8 = &LAB_0042edd0;
LAB_00413fd6:
        FUN_0040e434((int)puVar8,uVar4,iVar6);
        return 1;
      }
      uVar4 = *(int *)(iVar3 + 0x10) + _DAT_00437380;
      puVar8 = &LAB_0042edb0;
      goto LAB_00413fb2;
    }
    if (DAT_00437398 <= uVar4) {
      return 0;
    }
    iVar6 = uVar4 * 0x20 + DAT_00437390;
    uVar4 = *(uint *)(iVar6 + 8);
    if (DAT_004371e4 <= uVar4) {
      return 0;
    }
    iVar6 = *(int *)(iVar6 + 0xc);
    if (-1 < iVar6) {
      puVar8 = &LAB_0042ed50;
      goto LAB_00413fd6;
    }
  }
  else {
    if (iVar6 != 0x40) {
      if (iVar6 == 0x7e) {
        pcVar10 = (code *)&LAB_0042f760;
      }
      else {
        if (iVar6 != 0xf4) {
          return 0;
        }
        pcVar10 = (code *)&LAB_00430430;
      }
      goto LAB_004143dd;
    }
    uVar4 = FUN_004082c0(&DAT_004371e0,*(uint *)(pbVar7 + 0x18));
  }
  puVar8 = &LAB_0042ed30;
LAB_00413fb2:
  FUN_0040e421((int)puVar8,uVar4);
  return 1;
}



/******************************************************************************/
/* TARGET 00414426  FUN_00414426 */
/******************************************************************************/

void __cdecl FUN_00414426(int param_1,int param_2)

{
  FUN_00414452(param_1,param_2,0,-1);
  return;
}



/******************************************************************************/
/* TARGET 0041443b  FUN_0041443b */
/******************************************************************************/

void __cdecl FUN_0041443b(int param_1,int param_2,int param_3)

{
  FUN_00414452(param_1,param_2,param_3,-1);
  return;
}



/******************************************************************************/
/* TARGET 00414452  FUN_00414452 */
/******************************************************************************/

undefined4 __cdecl FUN_00414452(int param_1,int param_2,int param_3,int param_4)

{
  char cVar1;
  int iVar2;
  undefined3 extraout_var;
  
  iVar2 = FUN_0040e434(param_2,param_3,param_4);
  if (*(int *)(param_1 * 0x20 + 4 + DAT_004373a0) != 1) {
    cVar1 = FUN_00413e87(param_1 + 1);
    param_1 = CONCAT31(extraout_var,cVar1);
    if (cVar1 != '\0') {
      return CONCAT31(extraout_var,1);
    }
  }
  DAT_004376d8 = iVar2;
  return param_1 & 0xffffff00;
}



/******************************************************************************/
/* TARGET 00414499  FUN_00414499 */
/******************************************************************************/

void __cdecl FUN_00414499(int param_1,int param_2)

{
  char cVar1;
  int iVar2;
  byte *pbVar3;
  int iVar4;
  
  pbVar3 = (byte *)(param_1 * 0x20 + DAT_0043739c);
  iVar4 = param_1 * 0x20 + DAT_004373a0;
  if ((*pbVar3 & 1) != 0) {
    iVar2 = 1;
    do {
      param_1 = param_1 + iVar2;
      pbVar3 = pbVar3 + iVar2 * 0x20;
      iVar4 = iVar4 + iVar2 * 0x20;
      if (((*(int *)(pbVar3 + 0x1c) == param_2 + -20000) && ((*pbVar3 & 1) != 0)) &&
         (cVar1 = FUN_00413e87(param_1 + 1), cVar1 != '\0')) {
        return;
      }
      iVar2 = *(int *)(iVar4 + 4);
    } while ((*pbVar3 & 2) != 0);
  }
  FUN_0040e410(0x42ecc0);
  return;
}



/******************************************************************************/
/* TARGET 00414510  FUN_00414510 */
/******************************************************************************/

int __cdecl FUN_00414510(int param_1)

{
  int iVar1;
  int iVar2;
  int *piVar3;
  
  iVar2 = *(int *)(DAT_00437254 + 8) + DAT_00437254;
  piVar3 = (int *)(DAT_00437254 + 0x10);
  if (0 < param_1) {
    do {
      iVar1 = *piVar3;
      piVar3 = piVar3 + 8;
      iVar2 = iVar2 + iVar1;
      param_1 = param_1 + -1;
    } while (param_1 != 0);
  }
  return iVar2;
}



/******************************************************************************/
/* TARGET 00414540  FUN_00414540 */
/******************************************************************************/

void __cdecl FUN_00414540(uint *param_1,undefined4 *param_2,int param_3)

{
  char cVar1;
  undefined4 uVar2;
  int iVar3;
  int iVar4;
  int iVar5;
  undefined4 *puVar6;
  int local_24 [3];
  undefined4 *local_18 [3];
  int local_c [3];
  
  if (0 < param_3) {
    FUN_00401810(local_18,param_3);
    *local_18[0] = 0xffffffff;
    FUN_00401a20(local_24,param_3);
    FUN_00401810(local_c,param_3);
    iVar4 = 0;
    iVar5 = 0;
    puVar6 = param_2;
    do {
      uVar2 = local_18[0][iVar4];
      puVar6[1] = 1;
      *puVar6 = uVar2;
      puVar6[2] = param_1[4];
      puVar6[3] = 0xffffffff;
      puVar6[4] = 0xffffffff;
      puVar6[5] = 0xffffffff;
      puVar6[6] = 0xffffffff;
      *(byte *)(iVar4 + local_24[0]) = (byte)(*param_1 >> 1) & 1;
      if ((*param_1 & 1) == 0) {
        cVar1 = *(char *)(iVar4 + local_24[0]);
        while ((cVar1 == '\0' && (0 < iVar4))) {
          iVar4 = iVar4 + -1;
          iVar3 = *(int *)(local_c[0] + iVar4 * 4);
          param_2[iVar3 * 8 + 1] = (iVar5 - iVar3) + 1;
          cVar1 = *(char *)(iVar4 + local_24[0]);
        }
      }
      else {
        iVar4 = iVar4 + 1;
        *(int *)(local_c[0] + -4 + iVar4 * 4) = iVar5;
        local_18[0][iVar4] = iVar5;
      }
      iVar5 = iVar5 + 1;
      param_1 = param_1 + 8;
      puVar6 = puVar6 + 8;
      param_3 = param_3 + -1;
    } while (param_3 != 0);
    thunk_FUN_00401880(local_c);
    thunk_FUN_00401880(local_24);
    thunk_FUN_00401880(local_18);
  }
  return;
}



/******************************************************************************/
/* TARGET 00414640  FUN_00414640 */
/******************************************************************************/

float10 __cdecl FUN_00414640(int param_1,int param_2)

{
  uint uVar1;
  int iVar2;
  undefined4 *puVar3;
  undefined4 uVar4;
  undefined1 uVar5;
  int iVar6;
  float10 fVar7;
  
  iVar6 = param_1;
  uVar1 = *(uint *)(param_1 + 0x18);
  FUN_004064c0(&param_1);
  iVar2 = *(int *)(param_2 + 4) + -1;
  if (0 < iVar2) {
    do {
      if ((*(byte *)(iVar6 + 0x20) & 0x90) == 0) {
        switch(*(undefined4 *)(iVar6 + 0x3c)) {
        case 10:
          uVar5 = 0x2d;
          break;
        default:
          goto switchD_00414679_caseD_b;
        case 0x11:
          uVar5 = 0x30;
          break;
        case 0x12:
          uVar5 = 0x31;
          break;
        case 0x13:
          uVar5 = 0x32;
          break;
        case 0x14:
          uVar5 = 0x33;
          break;
        case 0x15:
          uVar5 = 0x34;
          break;
        case 0x16:
          uVar5 = 0x35;
          break;
        case 0x17:
          uVar5 = 0x36;
          break;
        case 0x18:
          uVar5 = 0x37;
          break;
        case 0x19:
          uVar5 = 0x38;
          break;
        case 0x1a:
          uVar5 = 0x39;
          break;
        case 0x1b:
          uVar5 = 0x2e;
          break;
        case 0x1c:
          uVar5 = 0x45;
        }
        FUN_00407ea0(&param_1,uVar5);
      }
switchD_00414679_caseD_b:
      iVar2 = iVar2 + -1;
      iVar6 = iVar6 + 0x20;
    } while (iVar2 != 0);
  }
  if (*(int *)(param_1 + 4) == 0) {
    puVar3 = FUN_00408220(&DAT_004371e0,uVar1);
    FUN_00407cc0(&param_1,puVar3);
  }
  uVar4 = FUN_00408170(&param_1,'-');
  if ((char)uVar4 != '\0') {
    FUN_00407ea0(&param_1,0x31);
  }
  fVar7 = FUN_00407930((char *)(param_1 + 0xc));
  FUN_00406610(&param_1);
  return (float10)(double)fVar7;
}



/******************************************************************************/
/* TARGET 00414770  FUN_00414770 */
/******************************************************************************/

void __cdecl FUN_00414770(byte *param_1,int param_2,int param_3,char param_4)

{
  byte *pbVar1;
  uint uVar2;
  int *piVar3;
  int iVar4;
  uint uVar5;
  byte *pbVar6;
  byte *pbVar7;
  int *piVar8;
  byte *pbVar9;
  int iVar10;
  int *piVar11;
  uint *puVar12;
  uint *puVar13;
  float10 fVar14;
  longlong lVar15;
  ulonglong uVar16;
  int local_18;
  int local_10;
  
  if (0 < param_3) {
    local_10 = param_3;
    piVar11 = (int *)(param_2 + 4);
    pbVar6 = param_1;
    do {
      if (((*(int *)(pbVar6 + 0x1c) == 0x38) && (piVar11[2] < 0)) && ((*pbVar6 & 0x90) == 0)) {
        uVar2 = FUN_00401c70(&DAT_00437108);
        piVar11[2] = uVar2;
        piVar3 = (int *)(uVar2 * 0x10 + DAT_00437108);
        iVar10 = 1;
        iVar4 = *piVar11;
        piVar8 = piVar11 + -1;
        pbVar9 = pbVar6;
        do {
          iVar4 = iVar4 + -1;
          if (iVar4 < 1) goto LAB_00414865;
          pbVar7 = pbVar9 + 0x20;
          piVar8 = piVar8 + 8;
          pbVar1 = pbVar9 + 0x3c;
          pbVar9 = pbVar7;
        } while (*(int *)pbVar1 != 0xff);
        FUN_00414640((int)pbVar7,(int)piVar8);
        lVar15 = FUN_0040d9c0();
        iVar10 = (int)lVar15;
        piVar3[1] = iVar10;
LAB_00414865:
        local_18 = *piVar11 + -1;
        if (0 < local_18) {
          pbVar9 = param_1 + (int)(piVar11 + -1) + (0x1c - param_2);
          puVar12 = (uint *)(piVar11 + 1);
          do {
            puVar13 = puVar12 + 8;
            pbVar9 = pbVar9 + 0x20;
            uVar5 = *puVar13;
            puVar12[9] = uVar2;
            switch(*(undefined4 *)pbVar9) {
            case 0x2b:
              if ((1 < iVar10) && (param_4 != '\0')) {
                uVar5 = FUN_00404720(&DAT_00437130,uVar5,iVar10);
LAB_00414a3f:
                *puVar13 = uVar5;
              }
              break;
            case 0x2c:
              if ((1 < iVar10) && (param_4 != '\0')) {
                uVar5 = FUN_00401750(&DAT_00437228,uVar5,iVar10);
                goto LAB_00414a3f;
              }
              break;
            case 0x2d:
              if ((1 < iVar10) && (param_4 != '\0')) {
                uVar5 = FUN_00405850(&DAT_00437200,uVar5,iVar10);
                goto LAB_00414a3f;
              }
              break;
            case 0x2e:
              if ((1 < iVar10) && (param_4 != '\0')) {
                uVar5 = FUN_00402460(&DAT_00437120,uVar5,iVar10);
                goto LAB_00414a3f;
              }
              break;
            case 0x30:
              if ((1 < iVar10) && (param_4 != '\0')) {
                uVar5 = FUN_00402230(&DAT_004371f0,uVar5,iVar10);
                goto LAB_00414a3f;
              }
              break;
            case 0x31:
              if ((1 < iVar10) && (param_4 != '\0')) {
                uVar5 = FUN_004063e0(&DAT_00437080,uVar5,iVar10);
                goto LAB_00414a3f;
              }
              break;
            case 0x33:
              if ((1 < iVar10) && (param_4 != '\0')) {
                uVar5 = FUN_00408310(&DAT_004371e0,uVar5,iVar10);
                goto LAB_00414a3f;
              }
              break;
            case 0x3f:
              if ((1 < iVar10) && (param_4 != '\0')) {
                uVar5 = FUN_00401b50(&DAT_004371c8,uVar5,iVar10);
                goto LAB_00414a3f;
              }
              break;
            case 0xf6:
              if ((1 < iVar10) && (param_4 != '\0')) {
                uVar5 = FUN_004044d0(&DAT_00437210,uVar5,iVar10);
                goto LAB_00414a3f;
              }
              break;
            case 0x100:
              fVar14 = FUN_004045f0(&DAT_00437130,uVar5);
              if (fVar14 < (float10)0.0) {
                uVar16 = FUN_0040d9c0();
                *piVar3 = (int)((longlong)
                                ((ulonglong)(uint)((int)uVar16 >> 0x1f) << 0x20 |
                                uVar16 & 0xffffffff) % (longlong)iVar10);
              }
              else {
                uVar16 = FUN_0040d9c0();
                *piVar3 = (int)((longlong)
                                ((ulonglong)(uint)((int)uVar16 >> 0x1f) << 0x20 |
                                uVar16 & 0xffffffff) % (longlong)iVar10);
              }
              if (*piVar3 < 0) {
                *piVar3 = *piVar3 + iVar10;
              }
              break;
            case 0x101:
              fVar14 = FUN_004045f0(&DAT_00437130,uVar5);
              iVar4 = FUN_0040a250((double)fVar14);
              piVar3[2] = iVar4;
            }
            local_18 = local_18 + -1;
            puVar12 = puVar13;
          } while (local_18 != 0);
        }
      }
      pbVar6 = pbVar6 + 0x20;
      piVar11 = piVar11 + 8;
      local_10 = local_10 + -1;
    } while (local_10 != 0);
  }
  return;
}



/******************************************************************************/
/* TARGET 00414b90  FUN_00414b90 */
/******************************************************************************/

void FUN_00414b90(void)

{
  int iVar1;
  int iVar2;
  int iVar3;
  int iVar4;
  int iVar5;
  undefined4 uVar6;
  int iVar7;
  int iVar8;
  int local_28;
  int local_24;
  int local_20;
  int local_1c;
  int local_18;
  int local_14;
  int local_10;
  int local_c;
  int local_8;
  int local_4;
  
  local_28 = 0;
  iVar1 = DAT_0043738c;
  iVar7 = DAT_004373a8;
  if (0 < DAT_00437394) {
    do {
      local_4 = *(int *)(iVar1 + 4);
      local_28 = local_28 + local_4;
      iVar4 = 0;
      iVar5 = 0;
      iVar7 = iVar7 + local_4 * 0x20;
      iVar1 = iVar1 + local_4 * 0x20;
      local_24 = 0;
      local_20 = 0;
      local_1c = 0;
      local_18 = 0;
      local_14 = 0;
      local_10 = 0;
      local_c = 0;
      local_8 = 0;
      if (0 < local_4) {
        local_28 = local_28 - local_4;
        iVar2 = iVar1;
        iVar8 = iVar7;
        do {
          iVar7 = iVar8 + -0x20;
          iVar1 = iVar2 + -0x20;
          if (*(int *)(iVar8 + -4) == 0x38) {
            local_24 = local_24 + 1;
            *(int *)(iVar2 + -0xc) = local_24;
          }
          if (-1 < *(int *)(iVar2 + -0x18)) {
            iVar3 = 1;
            if (-1 < *(int *)(iVar2 + -0x14)) {
              iVar3 = *(int *)(*(int *)(iVar2 + -0x14) * 0x10 + 4 + DAT_00437108);
            }
            switch(*(undefined4 *)(iVar8 + -4)) {
            case 0x2b:
              local_20 = local_20 + iVar3;
              *(int *)(iVar2 + -0x10) = local_20;
              break;
            case 0x2c:
              local_14 = local_14 + iVar3;
              *(int *)(iVar2 + -0x10) = local_14;
              break;
            case 0x2d:
              iVar4 = iVar4 + iVar3;
              *(int *)(iVar2 + -0x10) = iVar4;
              break;
            case 0x2e:
              iVar5 = iVar5 + iVar3;
              *(int *)(iVar2 + -0x10) = iVar5;
              break;
            case 0x30:
              local_10 = local_10 + iVar3;
              *(int *)(iVar2 + -0x10) = local_10;
              break;
            case 0x31:
              local_8 = local_8 + iVar3;
              *(int *)(iVar2 + -0x10) = local_8;
              break;
            case 0x33:
              local_1c = local_1c + iVar3;
              *(int *)(iVar2 + -0x10) = local_1c;
              break;
            case 0x3f:
              local_18 = local_18 + iVar3;
              *(int *)(iVar2 + -0x10) = local_18;
              break;
            case 0xf6:
              local_c = local_c + iVar3;
              *(int *)(iVar2 + -0x10) = local_c;
            }
          }
          local_4 = local_4 + -1;
          iVar2 = iVar1;
          iVar8 = iVar7;
        } while (local_4 != 0);
      }
      iVar4 = *(int *)(iVar1 + 4);
      iVar5 = 0;
      uVar6 = 0xffffffff;
      if (0 < iVar4) {
        local_28 = local_28 + iVar4;
        do {
          if (*(int *)(iVar7 + 0x1c) == 0x38) {
            iVar5 = *(int *)(iVar1 + 4);
            uVar6 = *(undefined4 *)(iVar1 + 0x14);
          }
          if (0 < iVar5) {
            *(undefined4 *)(iVar1 + 0x14) = uVar6;
            iVar5 = iVar5 + -1;
          }
          iVar7 = iVar7 + 0x20;
          iVar1 = iVar1 + 0x20;
          iVar4 = iVar4 + -1;
        } while (iVar4 != 0);
      }
    } while (local_28 < DAT_00437394);
  }
  return;
}



/******************************************************************************/
/* TARGET 00414e30  FUN_00414e30 */
/******************************************************************************/

void __cdecl FUN_00414e30(int param_1,int *param_2,int param_3)

{
  int *piVar1;
  int iVar2;
  int iVar3;
  int iVar4;
  int iVar5;
  int iVar6;
  
  iVar2 = -1;
  iVar3 = -1;
  iVar5 = -1;
  iVar6 = -1;
  iVar4 = -1;
  if (0 < param_3) {
    piVar1 = param_2 + 2;
    param_2 = (int *)(param_1 + 0x1c);
    do {
      if (*param_2 == 0x31) {
        iVar3 = *piVar1;
        iVar5 = piVar1[2];
        iVar6 = piVar1[1];
        iVar4 = piVar1[3];
        iVar2 = piVar1[-1] + -1;
      }
      if (-1 < iVar2) {
        *piVar1 = iVar3;
        piVar1[1] = iVar6;
        piVar1[2] = iVar5;
        piVar1[3] = iVar4;
        iVar2 = iVar2 + -1;
      }
      piVar1 = piVar1 + 8;
      param_2 = param_2 + 8;
      param_3 = param_3 + -1;
    } while (param_3 != 0);
  }
  return;
}



/******************************************************************************/
/* TARGET 00414eb0  FUN_00414eb0 */
/******************************************************************************/

void * __cdecl FUN_00414eb0(void *param_1)

{
  uint uVar1;
  undefined4 *puVar2;
  int *piVar3;
  int *piVar4;
  uint uVar5;
  uint *puVar6;
  int local_4;
  
  puVar6 = (uint *)(&DAT_00437160)[DAT_004361a4];
  if ((((puVar6 == (uint *)0x0) || (*puVar6 == 0)) &&
      ((puVar6 = (uint *)(&DAT_00437160)[DAT_0043725c], puVar6 == (uint *)0x0 || (*puVar6 == 0))))
     && ((DAT_00437174 == (uint *)0x0 || (puVar6 = DAT_00437174, *DAT_00437174 == 0)))) {
    puVar2 = &DAT_00437160;
    do {
      puVar6 = (uint *)*puVar2;
      if ((puVar6 != (uint *)0x0) && (*puVar6 != 0)) break;
      puVar2 = puVar2 + 1;
    } while ((int)puVar2 < 0x4371c0);
  }
  FUN_004064c0(&local_4);
  if (puVar6 != (uint *)0x0) {
    uVar1 = *puVar6;
    FUN_00406610(&local_4);
    if (DAT_00437284 == '\0') {
      FUN_00406650(&local_4,(LPCSTR)(puVar6 + 1),uVar1);
    }
    else {
      piVar3 = FUN_0040d3a0(uVar1 + 0x10);
      if (0 < (int)uVar1) {
        piVar4 = piVar3;
        uVar5 = uVar1;
        do {
          *(char *)piVar4 = '{' - *(char *)(((int)(puVar6 + 1) - (int)piVar3) + (int)piVar4);
          piVar4 = (int *)((int)piVar4 + 1);
          uVar5 = uVar5 - 1;
        } while (uVar5 != 0);
      }
      FUN_00406650(&local_4,(LPCSTR)piVar3,uVar1);
      FUN_0040d410(piVar3);
    }
  }
  piVar3 = &DAT_00437160;
  do {
    piVar4 = (int *)*piVar3;
    if (piVar4 != (int *)0x0) {
      *piVar3 = *piVar4 + 4 + (int)piVar4;
    }
    piVar3 = piVar3 + 1;
  } while ((int)piVar3 < 0x4371c0);
  *(int *)(local_4 + 8) = DAT_00437264;
  DAT_00437264 = DAT_00437264 + 1;
  FUN_00401020(param_1,&local_4);
  FUN_00406610(&local_4);
  return param_1;
}



/******************************************************************************/
/* TARGET 00414fd0  FUN_00414fd0 */
/******************************************************************************/

void FUN_00414fd0(void)

{
  ushort uVar1;
  ushort uVar2;
  undefined4 uVar3;
  uint uVar4;
  uint uVar5;
  undefined8 *puVar6;
  int *piVar7;
  undefined4 *puVar8;
  char *pcVar9;
  uint *puVar10;
  int *piVar11;
  undefined4 *puVar12;
  int iVar13;
  int iVar14;
  int iVar15;
  int local_78;
  int local_74;
  int local_70 [27];
  
  puVar6 = (undefined8 *)FUN_00414510(6);
  iVar14 = *(int *)(DAT_00437254 + 0xd4);
  if (0 < iVar14) {
    do {
      FUN_004046a0(&DAT_00437130,*puVar6);
      puVar6 = puVar6 + 1;
      iVar14 = iVar14 + -1;
    } while (iVar14 != 0);
  }
  piVar7 = (int *)FUN_00414510(7);
  iVar15 = DAT_00437254;
  iVar14 = *(int *)(DAT_00437254 + 0x104);
  if (0 < iVar14) {
    do {
      iVar13 = 0;
      piVar11 = &DAT_004361b8;
      do {
        if (*piVar11 == *piVar7) {
          (&DAT_004361c4)[iVar13 * 8] = piVar7 + 2;
          break;
        }
        piVar11 = piVar11 + 8;
        iVar13 = iVar13 + 1;
      } while ((int)piVar11 < 0x4364b8);
      iVar13 = *(int *)(iVar15 + 0xf4);
      piVar7 = piVar7 + 2;
      if (0 < iVar13) {
        do {
          iVar13 = iVar13 + -1;
          piVar7 = (int *)((int)piVar7 + *piVar7 + 4);
        } while (iVar13 != 0);
      }
      iVar14 = iVar14 + -1;
    } while (iVar14 != 0);
  }
  puVar12 = &DAT_00437160;
  puVar8 = &DAT_004361c4;
  do {
    uVar3 = *puVar8;
    puVar8 = puVar8 + 8;
    *puVar12 = uVar3;
    puVar12 = puVar12 + 1;
  } while ((int)puVar8 < 0x4364c4);
  DAT_00437264 = 0;
  iVar14 = *(int *)(iVar15 + 0xf4);
  if (0 < iVar14) {
    do {
      puVar8 = FUN_00414eb0(&local_74);
      FUN_004021b0(&DAT_004371e0,puVar8);
      FUN_00406610(&local_74);
      iVar14 = iVar14 + -1;
    } while (iVar14 != 0);
  }
  pcVar9 = (char *)FUN_00414510(8);
  iVar14 = *(int *)(DAT_00437254 + 0x114);
  if (0 < iVar14) {
    do {
      FUN_00401ae0(&DAT_004371c8,*pcVar9 != '\0');
      pcVar9 = pcVar9 + 1;
      iVar14 = iVar14 + -1;
    } while (iVar14 != 0);
  }
  piVar7 = (int *)FUN_00414510(9);
  iVar14 = *(int *)(DAT_00437254 + 0x134);
  if (0 < iVar14) {
    do {
      piVar11 = FUN_0040d3a0(0x18);
      *piVar11 = 0x40000000;
      piVar11[1] = 4;
      piVar11[2] = 0;
      piVar11[3] = 0;
      piVar11[5] = (int)piVar7;
      FUN_004016d0(&DAT_00437228,piVar11);
      iVar14 = iVar14 + -1;
      piVar7 = (int *)((int)piVar7 + *piVar7 + 4);
    } while (iVar14 != 0);
  }
  if (DAT_0043722c == 0) {
    FUN_004016a0(&DAT_00437228);
  }
  puVar10 = (uint *)FUN_00414510(10);
  iVar14 = *(int *)(DAT_00437254 + 0x154);
  if (0 < *(int *)(DAT_00437254 + 0x154)) {
    do {
      local_74 = iVar14;
      uVar4 = puVar10[1];
      uVar5 = *puVar10;
      FUN_00401da0(&local_78,uVar5,uVar4);
      iVar14 = uVar4 * uVar5;
      puVar10 = puVar10 + 2;
      iVar15 = 0;
      if (0 < iVar14) {
        do {
          iVar13 = local_78 + 0xc;
          piVar7 = (int *)FUN_00401650(&DAT_00437228,*puVar10);
          FUN_004015d0((void *)(iVar13 + iVar15 * 8),piVar7);
          *(uint *)(local_78 + 0x10 + iVar15 * 8) = puVar10[1];
          puVar10 = puVar10 + 2;
          iVar15 = iVar15 + 1;
        } while (iVar15 < iVar14);
      }
      FUN_004021b0(&DAT_004371f0,&local_78);
      FUN_00401ea0(&local_78);
      local_74 = local_74 + -1;
      iVar14 = local_74;
    } while (local_74 != 0);
  }
  if (DAT_004371f4 == 0) {
    FUN_00402160(&DAT_004371f0,0xf,10);
  }
  piVar7 = (int *)FUN_00414510(0xb);
  iVar14 = *(int *)(DAT_00437254 + 0x174);
  if (0 < iVar14) {
    do {
      piVar11 = FUN_0040d3a0(0x18);
      *piVar11 = 0x40000000;
      piVar11[1] = 4;
      piVar11[2] = *piVar7;
      piVar11[3] = piVar7[1];
      piVar11[4] = (int)(piVar7 + 2);
      FUN_004016d0(&DAT_00437210,piVar11);
      iVar14 = iVar14 + -1;
      piVar7 = (int *)((int)piVar7 + piVar7[2] + 0xc);
    } while (iVar14 != 0);
  }
  piVar7 = (int *)FUN_00414510(0xc);
  iVar14 = *(int *)(DAT_00437254 + 0x194);
  if (0 < *(int *)(DAT_00437254 + 0x194)) {
    do {
      local_78 = iVar14;
      iVar14 = piVar7[1];
      local_74 = *piVar7;
      uVar1 = *(ushort *)(piVar7 + 3);
      uVar2 = *(ushort *)((int)piVar7 + 0xe);
      FUN_00405a10(local_70,local_74,iVar14);
      *(int *)(local_70[0] + 0xc) = piVar7[2];
      if (local_74 < *(int *)(local_70[0] + 0xc)) {
        *(int *)(local_70[0] + 0xc) = local_74;
      }
      iVar14 = iVar14 * local_74;
      *(int *)(local_70[0] + 0x10) = piVar7[4];
      piVar11 = piVar7 + 8;
      *(int *)(local_70[0] + 0x14) = piVar7[5];
      *(undefined8 *)(local_70[0] + 0x18) = *(undefined8 *)(piVar7 + 6);
      if (0 < iVar14) {
        iVar15 = 0x20;
        local_74 = iVar14;
        do {
          piVar7 = FUN_0040d3a0(0x18);
          *piVar7 = 0x40000000;
          piVar7[1] = 4;
          piVar7[2] = (uint)uVar1;
          piVar7[3] = (uint)uVar2;
          piVar7[4] = (int)piVar11;
          FUN_00404280((void *)(local_70[0] + iVar15),piVar7);
          iVar15 = iVar15 + 4;
          local_74 = local_74 + -1;
          piVar11 = (int *)((int)piVar11 + *piVar11 + 4);
        } while (local_74 != 0);
      }
      FUN_00406340(&DAT_00437080,local_70);
      FUN_00405c00(local_70);
      piVar7 = piVar11;
      iVar14 = local_78 + -1;
    } while (local_78 + -1 != 0);
    local_78 = 0;
  }
  if (DAT_00437084 == 0) {
    FUN_00406310(&DAT_00437080);
  }
  if (DAT_00437084 == 1) {
    FUN_00406310(&DAT_00437080);
  }
  piVar7 = (int *)FUN_00414510(0xd);
  iVar14 = *(int *)(DAT_00437254 + 0x1b4);
  if (0 < iVar14) {
    do {
      piVar11 = FUN_0040d3a0(0x20);
      *piVar11 = 0x40000000;
      iVar15 = *piVar7;
      piVar11[1] = iVar15;
      piVar11[2] = piVar7[1];
      piVar11[3] = (uint)*(ushort *)(piVar7 + 2);
      *(ushort *)(piVar11 + 4) = (ushort)*(byte *)((int)piVar7 + 10);
      *(ushort *)((int)piVar11 + 0x12) = (ushort)*(byte *)((int)piVar7 + 0xb);
      piVar11[7] = (int)(piVar7 + 3);
      if (piVar11[3] == 1) {
        piVar11[6] = 0;
      }
      else {
        piVar11[6] = *(ushort *)(piVar7 + 7) + 0x12;
      }
      FUN_004016d0(&DAT_00437200,piVar11);
      iVar14 = iVar14 + -1;
      piVar7 = (int *)((int)piVar7 + iVar15 + 0xc);
    } while (iVar14 != 0);
  }
  piVar7 = (int *)FUN_00414510(0xe);
  iVar14 = *(int *)(DAT_00437254 + 0x1d4);
  if (0 < iVar14) {
    do {
      piVar11 = FUN_0040d3a0(0x10);
      *piVar11 = 0x40000000;
      iVar15 = *piVar7;
      piVar11[1] = iVar15;
      piVar11[3] = (int)(piVar7 + 1);
      FUN_004016d0(&DAT_00437120,piVar11);
      piVar7 = (int *)((int)(piVar7 + 1) + iVar15);
      iVar14 = iVar14 + -1;
    } while (iVar14 != 0);
  }
  DAT_00437398 = *(int *)(DAT_00437254 + 0x54);
  DAT_00437390 = FUN_0040d3a0(DAT_00437398 << 5);
  DAT_004373ac = (uint *)FUN_00414510(2);
  FUN_00414540(DAT_004373ac,DAT_00437390,DAT_00437398);
  DAT_00437114 = DAT_004371e4;
  FUN_00414770((byte *)DAT_004373ac,(int)DAT_00437390,DAT_00437398,'\x01');
  DAT_004371d4 = DAT_004371e4;
  FUN_00414e30((int)DAT_004373ac,DAT_00437390,DAT_00437398);
  DAT_00437394 = *(int *)(DAT_00437254 + 0x74);
  DAT_0043738c = FUN_0040d3a0(DAT_00437394 << 5);
  DAT_004373a8 = (uint *)FUN_00414510(3);
  FUN_00414540(DAT_004373a8,DAT_0043738c,DAT_00437394);
  FUN_00414770((byte *)DAT_004373a8,(int)DAT_0043738c,DAT_00437394,'\0');
  FUN_00414b90();
  FUN_00414e30((int)DAT_004373a8,DAT_0043738c,DAT_00437394);
  DAT_004373a4 = *(int *)(DAT_00437254 + 0x94);
  DAT_004373a0 = FUN_0040d3a0(DAT_004373a4 << 5);
  DAT_0043739c = (uint *)FUN_00414510(4);
  FUN_00414540(DAT_0043739c,DAT_004373a0,DAT_004373a4);
  return;
}



/******************************************************************************/
/* TARGET 004155b0  FUN_004155b0 */
/******************************************************************************/

void FUN_004155b0(void)

{
  FUN_004064c0((undefined4 *)&DAT_004373c4);
  return;
}



/******************************************************************************/
/* TARGET 004155c0  FUN_004155c0 */
/******************************************************************************/

void FUN_004155c0(void)

{
  FUN_0040d9b0(0x4155d0);
  return;
}



/******************************************************************************/
/* TARGET 004155f0  FUN_004155f0 */
/******************************************************************************/

void FUN_004155f0(void)

{
  FUN_004064c0(&DAT_00437634);
  return;
}



/******************************************************************************/
/* TARGET 00415600  FUN_00415600 */
/******************************************************************************/

void FUN_00415600(void)

{
  FUN_0040d9b0(0x415610);
  return;
}



/******************************************************************************/
/* TARGET 00415630  FUN_00415630 */
/******************************************************************************/

void FUN_00415630(void)

{
  FUN_00401a10(&DAT_00437428);
  return;
}



/******************************************************************************/
/* TARGET 00415640  FUN_00415640 */
/******************************************************************************/

void FUN_00415640(void)

{
  FUN_0040d9b0(0x415650);
  return;
}



/******************************************************************************/
/* TARGET 00415670  FUN_00415670 */
/******************************************************************************/

void FUN_00415670(void)

{
  FUN_00401a10(&DAT_004375d0);
  return;
}



/******************************************************************************/
/* TARGET 00415680  FUN_00415680 */
/******************************************************************************/

void FUN_00415680(void)

{
  FUN_0040d9b0(0x415690);
  return;
}



/******************************************************************************/
/* TARGET 004156b0  FUN_004156b0 */
/******************************************************************************/

void FUN_004156b0(void)

{
  FUN_00401a10(&DAT_004376c0);
  return;
}



/******************************************************************************/
/* TARGET 004156c0  FUN_004156c0 */
/******************************************************************************/

void FUN_004156c0(void)

{
  FUN_0040d9b0(0x4156d0);
  return;
}



/******************************************************************************/
/* TARGET 004156f0  FUN_004156f0 */
/******************************************************************************/

void FUN_004156f0(void)

{
  FUN_00401a10(&DAT_00437610);
  return;
}



/******************************************************************************/
/* TARGET 00415700  FUN_00415700 */
/******************************************************************************/

void FUN_00415700(void)

{
  FUN_0040d9b0(0x415710);
  return;
}



/******************************************************************************/
/* TARGET 00415730  FUN_00415730 */
/******************************************************************************/

void FUN_00415730(void)

{
  FUN_00401a10(&DAT_004373b8);
  return;
}



/******************************************************************************/
/* TARGET 00415740  FUN_00415740 */
/******************************************************************************/

void FUN_00415740(void)

{
  FUN_0040d9b0(0x415750);
  return;
}



/******************************************************************************/
/* TARGET 00415770  FUN_00415770 */
/******************************************************************************/

void FUN_00415770(void)

{
  FUN_00401a10(&DAT_00437458);
  return;
}



/******************************************************************************/
/* TARGET 00415780  FUN_00415780 */
/******************************************************************************/

void FUN_00415780(void)

{
  FUN_0040d9b0(0x415790);
  return;
}



/******************************************************************************/
/* TARGET 004157b0  FUN_004157b0 */
/******************************************************************************/

void FUN_004157b0(void)

{
  FUN_004064c0(&DAT_00437448);
  return;
}



/******************************************************************************/
/* TARGET 004157c0  FUN_004157c0 */
/******************************************************************************/

void FUN_004157c0(void)

{
  FUN_0040d9b0(0x4157d0);
  return;
}



/******************************************************************************/
/* TARGET 004157f0  FUN_004157f0 */
/******************************************************************************/

void FUN_004157f0(void)

{
  FUN_004064c0(&DAT_004375bc);
  return;
}



/******************************************************************************/
/* TARGET 00415800  FUN_00415800 */
/******************************************************************************/

void FUN_00415800(void)

{
  FUN_0040d9b0(0x415810);
  return;
}



/******************************************************************************/
/* TARGET 00415830  FUN_00415830 */
/******************************************************************************/

void FUN_00415830(void)

{
  FUN_004064c0(&DAT_004375cc);
  return;
}



/******************************************************************************/
/* TARGET 00415840  FUN_00415840 */
/******************************************************************************/

void FUN_00415840(void)

{
  FUN_0040d9b0(0x415850);
  return;
}



/******************************************************************************/
/* TARGET 00415870  FUN_00415870 */
/******************************************************************************/

void FUN_00415870(void)

{
  FUN_004064c0(&DAT_004374b8);
  return;
}



/******************************************************************************/
/* TARGET 00415880  FUN_00415880 */
/******************************************************************************/

void FUN_00415880(void)

{
  FUN_0040d9b0(0x415890);
  return;
}



/******************************************************************************/
/* TARGET 004158b0  FUN_004158b0 */
/******************************************************************************/

void FUN_004158b0(void)

{
  FUN_004064c0(&DAT_00437444);
  return;
}



/******************************************************************************/
/* TARGET 004158c0  FUN_004158c0 */
/******************************************************************************/

void FUN_004158c0(void)

{
  FUN_0040d9b0(0x4158d0);
  return;
}



/******************************************************************************/
/* TARGET 004158f0  FUN_004158f0 */
/******************************************************************************/

void FUN_004158f0(void)

{
  FUN_00406530(&DAT_00437424,s_Button_0043691c,0xffffffff);
  return;
}



/******************************************************************************/
/* TARGET 00415910  FUN_00415910 */
/******************************************************************************/

void FUN_00415910(void)

{
  FUN_0040d9b0(0x415920);
  return;
}



/******************************************************************************/
/* TARGET 00415940  FUN_00415940 */
/******************************************************************************/

void FUN_00415940(void)

{
  FUN_00406530(&DAT_004375c8,&DAT_00436924,0xffffffff);
  return;
}



/******************************************************************************/
/* TARGET 00415960  FUN_00415960 */
/******************************************************************************/

void FUN_00415960(void)

{
  FUN_0040d9b0(0x415970);
  return;
}



/******************************************************************************/
/* TARGET 00415990  FUN_00415990 */
/******************************************************************************/

void FUN_00415990(void)

{
  FUN_00406530(&DAT_00437418,s_RichEdit_0043692c,0xffffffff);
  return;
}



/******************************************************************************/
/* TARGET 004159b0  FUN_004159b0 */
/******************************************************************************/

void FUN_004159b0(void)

{
  FUN_0040d9b0(0x4159c0);
  return;
}



/******************************************************************************/
/* TARGET 004159e0  FUN_004159e0 */
/******************************************************************************/

void FUN_004159e0(void)

{
  FUN_00406530(&DAT_0043762c,s_Listbox_00436938,0xffffffff);
  return;
}



/******************************************************************************/
/* TARGET 00415a00  FUN_00415a00 */
/******************************************************************************/

void FUN_00415a00(void)

{
  FUN_0040d9b0(0x415a10);
  return;
}



/******************************************************************************/
/* TARGET 00415a30  FUN_00415a30 */
/******************************************************************************/

void FUN_00415a30(void)

{
  FUN_00406530(&DAT_0043744c,s_Combobox_00436940,0xffffffff);
  return;
}



/******************************************************************************/
/* TARGET 00415a50  FUN_00415a50 */
/******************************************************************************/

void FUN_00415a50(void)

{
  FUN_0040d9b0(0x415a60);
  return;
}



/******************************************************************************/
/* TARGET 00415a80  FUN_00415a80 */
/******************************************************************************/

void FUN_00415a80(void)

{
  FUN_00406530(&DAT_00437640,s_Static_0043694c,0xffffffff);
  return;
}



/******************************************************************************/
/* TARGET 00415aa0  FUN_00415aa0 */
/******************************************************************************/

void FUN_00415aa0(void)

{
  FUN_0040d9b0(0x415ab0);
  return;
}



/******************************************************************************/
/* TARGET 00415ad0  FUN_00415ad0 */
/******************************************************************************/

void FUN_00415ad0(void)

{
  FUN_00406530(&DAT_00437454,s_SysTabControl32_00436954,0xffffffff);
  return;
}



/******************************************************************************/
/* TARGET 00415af0  FUN_00415af0 */
/******************************************************************************/

void FUN_00415af0(void)

{
  FUN_0040d9b0(0x415b00);
  return;
}



/******************************************************************************/
/* TARGET 00415b20  FUN_00415b20 */
/******************************************************************************/

void FUN_00415b20(void)

{
  FUN_00406530(&DAT_00437668,s_Impact_00436964,0xffffffff);
  return;
}



/******************************************************************************/
/* TARGET 00415b40  FUN_00415b40 */
/******************************************************************************/

void FUN_00415b40(void)

{
  FUN_0040d9b0(0x415b50);
  return;
}



/******************************************************************************/
/* TARGET 00415b70  FUN_00415b70 */
/******************************************************************************/

void FUN_00415b70(void)

{
  FUN_004064c0(&DAT_00437438);
  return;
}



/******************************************************************************/
/* TARGET 00415b80  FUN_00415b80 */
/******************************************************************************/

void FUN_00415b80(void)

{
  FUN_0040d9b0(0x415b90);
  return;
}



/******************************************************************************/
/* TARGET 00415ba0  FUN_00415ba0 */
/******************************************************************************/

void __cdecl FUN_00415ba0(char param_1)

{
  if (param_1 != DAT_004377eb) {
    DAT_004377eb = param_1;
    InvalidateRect(DAT_00437308,(RECT *)0x0,1);
    UpdateWindow(DAT_00437308);
  }
  return;
}



/******************************************************************************/
/* TARGET 00415be0  FUN_00415be0 */
/******************************************************************************/

void __cdecl FUN_00415be0(undefined4 param_1,uint param_2)

{
  undefined4 *puVar1;
  undefined4 *puVar2;
  HWND hWnd;
  
  DAT_00436910 = FUN_004085b0(&DAT_00437238);
  puVar1 = (undefined4 *)(DAT_00437238 + DAT_00436910 * 0xac);
  puVar1[1] = DAT_004377ec;
  puVar1[2] = param_1;
  puVar1[0x19] = DAT_004373b0;
  puVar1[0x1a] = DAT_004375c4;
  puVar1[0x1b] = DAT_004375c0;
  *(undefined1 *)((int)puVar1 + 0x3d) = 1;
  *(undefined1 *)(puVar1 + 0xf) = 1;
  *(undefined1 *)((int)puVar1 + 0x3e) = 0;
  *(undefined1 *)(puVar1 + 0x10) = 1;
  *(undefined1 *)((int)puVar1 + 0x3f) = 0;
  puVar2 = (undefined4 *)(DAT_00437238 + DAT_004377ec * 0xac);
  puVar1[9] = *(undefined4 *)(DAT_00437238 + 0x24 + DAT_004377ec * 0xac);
  puVar1[10] = puVar2[10];
  puVar1[0xb] = puVar2[0xb];
  puVar1[0xc] = puVar2[0xc];
  *(undefined1 *)((int)puVar2 + 0x43) = 1;
  if (0x3f < (int)puVar1[0xb]) {
    puVar1[9] = puVar1[9] + 0x10;
    puVar1[0xb] = puVar1[0xb] + -0x20;
  }
  if (0x3f < (int)puVar1[0xc]) {
    puVar1[10] = puVar1[10] + 0x10;
    puVar1[0xc] = puVar1[0xc] + -0x20;
  }
  hWnd = CreateWindowExA(0x10001,s_PeterProgClass_00436780,(LPCSTR)0x0,param_2 | 0x6c00000,puVar1[9]
                         ,puVar1[10],puVar1[0xb],puVar1[0xc],(HWND)*puVar2,(HMENU)0x0,DAT_00437268,
                         (LPVOID)0x0);
  *puVar1 = hWnd;
  SetWindowLongA(hWnd,0,DAT_00436910);
  DAT_004377ec = DAT_00436910;
  DAT_004377f0 = DAT_00436910;
  DAT_00437324 = 0;
  FUN_0040b090(puVar1);
  SetFocus((HWND)*puVar1);
  EnableWindow((HWND)*puVar2,0);
  return;
}



/******************************************************************************/
/* TARGET 00415d40  FUN_00415d40 */
/******************************************************************************/

HFONT __cdecl
FUN_00415d40(char param_1,byte param_2,byte param_3,byte param_4,char param_5,char param_6,
            int param_7,undefined4 param_8,undefined4 param_9,undefined4 param_10,
            undefined4 param_11)

{
  char *pcVar1;
  HGDIOBJ ho;
  double dVar2;
  DWORD DVar3;
  undefined4 uVar4;
  int iVar5;
  int local_18;
  int local_14;
  DWORD local_10;
  HFONT local_c;
  int local_8;
  int local_4;
  
  local_10 = DAT_004361ac;
  if (DAT_004361ac == DAT_004361a0) {
    local_10 = 1;
  }
  DVar3 = local_10;
  if (param_7 < 0) {
    param_7 = -param_7;
  }
  iVar5 = 0;
  do {
    pcVar1 = (char *)(iVar5 + DAT_004377f4);
    if (*(int *)(iVar5 + 0x1c + DAT_004377f4) == 0) break;
    if ((((((*pcVar1 == param_1) && (pcVar1[1] == param_2)) && (pcVar1[2] == param_3)) &&
         ((pcVar1[3] == param_4 && (pcVar1[4] == param_5)))) &&
        ((pcVar1[5] == param_6 &&
         ((*(int *)(pcVar1 + 8) == param_7 &&
          (*(double *)(pcVar1 + 0xc) == (double)CONCAT44(param_9,param_8))))))) &&
       ((*(double *)(pcVar1 + 0x14) == (double)CONCAT44(param_11,param_10) &&
        (*(DWORD *)(pcVar1 + 0x20) == DVar3)))) {
      if ((param_6 == '\0') || (param_5 == '\0')) {
LAB_00415e58:
        *(int *)(pcVar1 + 0x28) = *(int *)(pcVar1 + 0x28) + 1;
        return *(HFONT *)(pcVar1 + 0x1c);
      }
      uVar4 = FUN_00408100((int *)(pcVar1 + 0x24),(int *)&DAT_00437668);
      if ((char)uVar4 != '\0') goto LAB_00415e58;
    }
    iVar5 = iVar5 + 0x2c;
  } while (iVar5 < 0xb00);
  local_14 = param_7;
  if (param_7 < 1) {
    local_14 = 0x10;
  }
  FUN_004064c0(&local_18);
  if (param_6 == '\0') {
    if (param_5 == '\0') {
      FUN_00407cf0(&local_18,s_Arial_0043696c);
      dVar2 = 0.4;
    }
    else {
      FUN_00407cf0(&local_18,s_Times_New_Roman_00436974);
      dVar2 = 0.37;
    }
  }
  else {
    if (param_5 == '\0') {
      FUN_00407cf0(&local_18,s_Courier_New_00436984);
      dVar2 = 0.58;
    }
    else {
      FUN_00407cc0(&local_18,(undefined4 *)&DAT_00437668);
      dVar2 = 0.6;
    }
    if (param_2 != 0) {
      dVar2 = dVar2 * 0.9;
    }
  }
  if (param_1 != '\0') {
    if (param_6 == '\0') {
      dVar2 = dVar2 * 1.06;
    }
    else {
      dVar2 = dVar2 * 0.9;
    }
  }
  local_8 = FUN_0040a250(ABS((double)CONCAT44(param_9,param_8)) * (double)local_14 * dVar2 - 0.1);
  iVar5 = FUN_0040a250(((double)CONCAT44(param_11,param_10) / 3.141592653589793) * 1800.0);
  iVar5 = iVar5 % 0xe10;
  local_4 = (-(uint)(param_1 != '\0') & 300) + 400;
  local_c = CreateFontA(local_14,local_8,iVar5,iVar5,local_4,(uint)param_2,(uint)param_3,
                        (uint)param_4,local_10,0,0,0,0,(LPCSTR)(local_18 + 0xc));
  if (local_c == (HFONT)0x0) {
    local_c = CreateFontA(local_14,local_8,iVar5,iVar5,local_4,(uint)param_2,(uint)param_3,
                          (uint)param_4,1,0,0,0,0,(LPCSTR)(local_18 + 0xc));
    if ((local_c == (HFONT)0x0) && (local_c = DAT_004377f8, DAT_004377f8 == (HFONT)0x0)) {
      FUN_00406610(&local_18);
      return (HFONT)0x0;
    }
  }
  iVar5 = 0x3c;
  do {
    if (*(int *)(DAT_004377f4 + 0x28 + DAT_00436918 * 0x2c) == 0) break;
    DAT_00436918 = DAT_00436918 + 1;
    if (0x3f < DAT_00436918) {
      DAT_00436918 = 4;
    }
    iVar5 = iVar5 + -1;
  } while (0 < iVar5);
  ho = *(HGDIOBJ *)(DAT_004377f4 + 0x1c + DAT_00436918 * 0x2c);
  pcVar1 = (char *)(DAT_004377f4 + DAT_00436918 * 0x2c);
  if (ho != (HGDIOBJ)0x0) {
    DeleteObject(ho);
  }
  *pcVar1 = param_1;
  pcVar1[1] = param_2;
  pcVar1[2] = param_3;
  pcVar1[3] = param_4;
  pcVar1[4] = param_5;
  pcVar1[5] = param_6;
  *(int *)(pcVar1 + 8) = param_7;
  *(undefined4 *)(pcVar1 + 0xc) = param_8;
  *(undefined4 *)(pcVar1 + 0x10) = param_9;
  *(undefined4 *)(pcVar1 + 0x14) = param_10;
  *(undefined4 *)(pcVar1 + 0x18) = param_11;
  *(HFONT *)(pcVar1 + 0x1c) = local_c;
  *(DWORD *)(pcVar1 + 0x20) = local_10;
  FUN_00407cc0((undefined4 *)(pcVar1 + 0x24),(undefined4 *)&DAT_00437668);
  pcVar1[0x28] = '\x01';
  pcVar1[0x29] = '\0';
  pcVar1[0x2a] = '\0';
  pcVar1[0x2b] = '\0';
  DAT_00436918 = DAT_00436918 + 1;
  if (0x3f < DAT_00436918) {
    DAT_00436918 = 4;
  }
  FUN_00406610(&local_18);
  return local_c;
}



/******************************************************************************/
/* TARGET 004160d0  FUN_004160d0 */
/******************************************************************************/

void __cdecl FUN_004160d0(int param_1)

{
  int *piVar1;
  int iVar2;
  
  if (param_1 != 0) {
    iVar2 = 0;
    piVar1 = (int *)(DAT_004377f4 + 0x1c);
    while (*piVar1 != 0) {
      if ((*piVar1 == param_1) && (0 < piVar1[3])) {
        piVar1[3] = piVar1[3] + -1;
        return;
      }
      iVar2 = iVar2 + 1;
      piVar1 = piVar1 + 0xb;
      if (0x3f < iVar2) {
        return;
      }
    }
  }
  return;
}



/******************************************************************************/
/* TARGET 00416110  FUN_00416110 */
/******************************************************************************/

void __cdecl FUN_00416110(undefined4 *param_1)

{
  int iVar1;
  HFONT wParam;
  
  if ((param_1[2] != 0x12) && (param_1[2] != 0x13)) {
    iVar1 = param_1[0x1c];
    wParam = FUN_00415d40(*(char *)(param_1 + 0x12),*(byte *)((int)param_1 + 0x49),
                          *(byte *)((int)param_1 + 0x4a),*(byte *)((int)param_1 + 0x4b),
                          *(char *)(param_1 + 0x13),*(char *)((int)param_1 + 0x4d),param_1[0x14],
                          param_1[0x15],param_1[0x16],param_1[0x17],param_1[0x18]);
    param_1[0x1c] = wParam;
    SendMessageA((HWND)*param_1,0x30,(WPARAM)wParam,1);
    FUN_004160d0(iVar1);
  }
  return;
}



/******************************************************************************/
/* TARGET 00416180  FUN_00416180 */
/******************************************************************************/

void __cdecl
FUN_00416180(int param_1,int *param_2,int param_3,int param_4,uint param_5,uint param_6)

{
  undefined4 *puVar1;
  undefined4 *puVar2;
  HWND hwnd;
  int iVar3;
  int *piVar4;
  SCROLLINFO local_b8;
  undefined4 local_9c;
  undefined4 local_98;
  undefined2 local_82;
  int local_80 [32];
  
  DAT_00436910 = (HMENU)FUN_004085b0(&DAT_00437238);
  puVar1 = (undefined4 *)(DAT_00437238 + (int)DAT_00436910 * 0xac);
  if (DAT_004377ec == 0) {
    FUN_00415ba0('\x01');
  }
  puVar2 = (undefined4 *)(DAT_00437238 + DAT_004377ec * 0xac);
  puVar1[3] = *(undefined4 *)(DAT_00437238 + 0xc + DAT_004377ec * 0xac);
  puVar1[4] = DAT_004377ec;
  puVar2[3] = DAT_00436910;
  *(HMENU *)(DAT_00437238 + 0x10 + puVar1[3] * 0xac) = DAT_00436910;
  puVar1[1] = DAT_004377ec;
  puVar1[2] = param_1;
  puVar1[9] = (puVar2[0xd] - param_3) / 2;
  iVar3 = puVar2[0xe];
  puVar1[0xb] = param_3;
  puVar1[0xc] = param_4;
  puVar1[10] = (iVar3 - param_4) / 2;
  *(undefined1 *)(puVar1 + 0xf) = 0;
  *(undefined1 *)((int)puVar1 + 0x3e) = 0;
  *(byte *)((int)puVar1 + 0x41) = (byte)(param_5 >> 0x10) & 1;
  *(undefined1 *)(puVar1 + 0x10) = 1;
  *(byte *)((int)puVar1 + 0x3d) = (byte)(param_6 >> 9) & 1;
  *(undefined1 *)((int)puVar1 + 0x3f) = 0;
  switch(param_1) {
  case 0xc:
  case 0x11:
  case 0x12:
  case 0x13:
  case 0x16:
  case 0x17:
  case 0x18:
  default:
    puVar1[0x19] = DAT_004373b0;
    puVar1[0x1a] = DAT_004375c4;
    puVar1[0x1b] = DAT_004375c0;
    break;
  case 0x19:
    *(byte *)(puVar1 + 0x1d) = ~(byte)(param_5 >> 0xe) & 1;
  case 10:
  case 0xb:
  case 0xd:
  case 0xe:
  case 0xf:
  case 0x10:
  case 0x14:
  case 0x15:
    puVar1[0x19] = DAT_0043763c;
    puVar1[0x1a] = DAT_00437434;
    puVar1[0x1b] = DAT_00437450;
  }
  hwnd = CreateWindowExA(param_6,(LPCSTR)(*param_2 + 0xc),(LPCSTR)0x0,param_5 | 0x40000000,puVar1[9]
                         ,puVar1[10],param_3,param_4,(HWND)*puVar2,DAT_00436910,DAT_00437268,
                         (LPVOID)0x0);
  *puVar1 = hwnd;
  if (hwnd != (HWND)0x0) {
    switch(param_1) {
    case 0xb:
      SendMessageA(hwnd,0xc5,0,0);
      break;
    case 0x15:
      SendMessageA(hwnd,0x459,1,0);
      local_9c = 0x9c;
      local_98 = 0x10;
      local_82 = 0x20;
      iVar3 = 0;
      piVar4 = local_80;
      do {
        *piVar4 = iVar3;
        iVar3 = iVar3 + 0x3c0;
        piVar4 = piVar4 + 1;
      } while (iVar3 < 0x7800);
      SendMessageA(hwnd,0x447,0,(LPARAM)&local_9c);
      SendMessageA(hwnd,0x459,1,0);
    case 0x14:
      SendMessageA(hwnd,0x435,0,0x10000000);
      SendMessageA(hwnd,0x445,0,1);
      break;
    case 0x17:
    case 0x18:
      SendMessageA(hwnd,0x414,10,0);
      SendMessageA(hwnd,0x415,0,10);
      SendMessageA(hwnd,0x406,1,0x640000);
      if (param_1 == 0x18) {
        SendMessageA(hwnd,0x405,1,100);
      }
      break;
    case 0x1a:
    case 0x1b:
      local_b8.cbSize = 0x1c;
      local_b8.fMask = 7;
      local_b8.nMin = 0;
      local_b8.nMax = 10000;
      local_b8.nPage = 1000;
      local_b8.nPos = 0;
      SetScrollInfo(hwnd,2,&local_b8,1);
    }
  }
  FUN_00416110(puVar1);
  FUN_0040b090(puVar1);
  if (DAT_004377f0 == DAT_004377ec) {
    FUN_004166c0();
  }
  return;
}



/******************************************************************************/
/* TARGET 004164e0  FUN_004164e0 */
/******************************************************************************/

void __cdecl FUN_004164e0(uint param_1)

{
  undefined4 *puVar1;
  uint uVar2;
  int iVar3;
  int iVar4;
  uint uVar5;
  
  if (param_1 != 0) {
    if (DAT_00436910 == param_1) {
      DAT_00436910 = 0xffffffff;
    }
    if ((param_1 < DAT_00437244) && (*(char *)(DAT_0043723c + param_1) != '\0')) {
      puVar1 = (undefined4 *)(DAT_00437238 + param_1 * 0xac);
      iVar3 = *(int *)(DAT_00437238 + 8 + param_1 * 0xac);
      if ((iVar3 == 0) || (iVar3 == 1)) {
        uVar5 = DAT_00437244 - 1;
        iVar3 = DAT_00437238;
        if (-1 < (int)uVar5) {
          iVar4 = uVar5 * 0xac;
          uVar2 = DAT_00437244;
          do {
            if (((uVar5 < uVar2) && (*(char *)(DAT_0043723c + uVar5) != '\0')) &&
               (*(uint *)(iVar4 + 4 + iVar3) == param_1)) {
              FUN_004164e0(uVar5);
              uVar2 = DAT_00437244;
              iVar3 = DAT_00437238;
            }
            uVar5 = uVar5 - 1;
            iVar4 = iVar4 + -0xac;
          } while (-1 < (int)uVar5);
        }
        EnableWindow(*(HWND *)(iVar3 + puVar1[1] * 0xac),1);
        DestroyWindow((HWND)*puVar1);
        DAT_004377ec = puVar1[1];
        DAT_004377f0 = DAT_004377ec;
        *(undefined1 *)(DAT_00437238 + 0x43 + DAT_004377ec * 0xac) = 0;
        SetFocus(*(HWND *)(DAT_00437238 + DAT_004377ec * 0xac));
        DAT_00437324 = 0;
      }
      else {
        DestroyWindow((HWND)*puVar1);
        if (param_1 == DAT_004377f0) {
          FUN_004166c0();
        }
        *(undefined4 *)(DAT_00437238 + 0x10 + puVar1[3] * 0xac) = puVar1[4];
        *(undefined4 *)(DAT_00437238 + 0xc + puVar1[4] * 0xac) = puVar1[3];
        if ((puVar1[1] == 0) && (puVar1[4] == puVar1[3])) {
          FUN_00415ba0('\0');
        }
      }
      FUN_004084c0(&DAT_00437238,param_1);
      if (DAT_00437240 == 1) {
        SetFocus(DAT_00437308);
      }
    }
  }
  return;
}



/******************************************************************************/
/* TARGET 004166c0  FUN_004166c0 */
/******************************************************************************/

void FUN_004166c0(void)

{
  int iVar1;
  uint uVar2;
  int iVar3;
  uint uVar4;
  
  if ((DAT_00437244 <= DAT_004377f0) || (*(char *)(DAT_0043723c + DAT_004377f0) == '\0')) {
    DAT_004377f0 = DAT_004377ec;
  }
  uVar2 = *(uint *)(DAT_00437238 + 0x10 + DAT_004377f0 * 0xac);
  while ((uVar2 != DAT_004377f0 &&
         (((iVar3 = DAT_00437238 + uVar2 * 0xac,
           *(char *)(DAT_00437238 + 0x41 + uVar2 * 0xac) == '\0' ||
           (*(char *)(iVar3 + 0x42) == '\0')) ||
          (((*(char *)(iVar3 + 0x43) != '\0' &&
            (((iVar1 = *(int *)(iVar3 + 8), iVar1 != 10 && (iVar1 != 0xb)) && (iVar1 != 0x14)))) &&
           (iVar1 != 0x15))))))) {
    uVar2 = *(uint *)(iVar3 + 0x10);
  }
  uVar4 = uVar2;
  if (*(int *)(DAT_00437238 + 8 + uVar2 * 0xac) == 9) {
    do {
      iVar3 = DAT_00437238 + uVar4 * 0xac;
      if ((*(char *)(iVar3 + 0x46) != '\0') && (*(char *)(iVar3 + 0x43) == '\0')) {
        uVar2 = uVar4;
      }
      uVar4 = *(uint *)(iVar3 + 0x10);
    } while (*(int *)(DAT_00437238 + 8 + *(uint *)(iVar3 + 0x10) * 0xac) == 8);
  }
  DAT_004377f0 = uVar2;
  SetFocus(*(HWND *)(DAT_00437238 + uVar2 * 0xac));
  return;
}



/******************************************************************************/
/* TARGET 004167c0  FUN_004167c0 */
/******************************************************************************/

void FUN_004167c0(void)

{
  int iVar1;
  uint uVar2;
  int iVar3;
  uint uVar4;
  
  if ((DAT_00437244 <= DAT_004377f0) || (*(char *)(DAT_0043723c + DAT_004377f0) == '\0')) {
    DAT_004377f0 = DAT_004377ec;
  }
  iVar3 = *(int *)(DAT_00437238 + 8 + DAT_004377f0 * 0xac);
  uVar2 = DAT_004377f0;
  while (iVar3 == 8) {
    uVar2 = *(uint *)(DAT_00437238 + uVar2 * 0xac + 0xc);
    iVar3 = *(int *)(DAT_00437238 + 8 + uVar2 * 0xac);
  }
  uVar2 = *(uint *)(DAT_00437238 + 0xc + uVar2 * 0xac);
  while ((uVar2 != DAT_004377f0 &&
         (((iVar3 = DAT_00437238 + uVar2 * 0xac,
           *(char *)(DAT_00437238 + 0x41 + uVar2 * 0xac) == '\0' ||
           (*(char *)(iVar3 + 0x42) == '\0')) ||
          (((*(char *)(iVar3 + 0x43) != '\0' &&
            (((iVar1 = *(int *)(iVar3 + 8), iVar1 != 10 && (iVar1 != 0xb)) && (iVar1 != 0x14)))) &&
           (iVar1 != 0x15))))))) {
    uVar2 = *(uint *)(iVar3 + 0xc);
  }
  uVar4 = uVar2;
  if (*(int *)(DAT_00437238 + 8 + uVar2 * 0xac) == 9) {
    do {
      iVar3 = DAT_00437238 + uVar4 * 0xac;
      if ((*(char *)(iVar3 + 0x46) != '\0') && (*(char *)(iVar3 + 0x43) == '\0')) {
        uVar2 = uVar4;
      }
      uVar4 = *(uint *)(iVar3 + 0x10);
    } while (*(int *)(DAT_00437238 + 8 + *(uint *)(iVar3 + 0x10) * 0xac) == 8);
  }
  DAT_004377f0 = uVar2;
  SetFocus(*(HWND *)(DAT_00437238 + uVar2 * 0xac));
  return;
}



/******************************************************************************/
/* TARGET 004168f0  FUN_004168f0 */
/******************************************************************************/

void FUN_004168f0(void)

{
  int iVar1;
  int iVar2;
  uint uVar3;
  int iVar4;
  
  if ((DAT_004377f0 < DAT_00437244) && (*(char *)(DAT_0043723c + DAT_004377f0) != '\0')) {
    iVar4 = DAT_00437238 + DAT_004377f0 * 0xac;
    switch(*(undefined4 *)(DAT_00437238 + 8 + DAT_004377f0 * 0xac)) {
    case 2:
    case 3:
    case 4:
    case 6:
      do {
        uVar3 = *(uint *)(iVar4 + 0x10);
        iVar4 = DAT_00437238 + uVar3 * 0xac;
        iVar1 = *(int *)(DAT_00437238 + 8 + uVar3 * 0xac);
        if ((((iVar1 != 2) && (iVar1 != 4)) && (iVar1 != 6)) && (iVar1 != 3)) {
          do {
            do {
              iVar1 = *(int *)(iVar4 + 0xc);
              iVar4 = DAT_00437238 + iVar1 * 0xac;
              iVar2 = *(int *)(DAT_00437238 + 8 + iVar1 * 0xac);
            } while (iVar2 == 2);
          } while (((iVar2 == 4) || (iVar2 == 6)) || (iVar2 == 3));
          uVar3 = *(uint *)(DAT_00437238 + 0x10 + iVar1 * 0xac);
        }
      } while ((uVar3 != DAT_004377f0) &&
              (iVar4 = DAT_00437238 + uVar3 * 0xac,
              *(char *)(DAT_00437238 + 0x43 + uVar3 * 0xac) != '\0'));
      DAT_004377f0 = uVar3;
      SetFocus(*(HWND *)(DAT_00437238 + uVar3 * 0xac));
      break;
    case 8:
    case 9:
      do {
        uVar3 = *(uint *)(iVar4 + 0x10);
        if (*(int *)(DAT_00437238 + 8 + uVar3 * 0xac) != 8) {
          do {
            uVar3 = *(uint *)(DAT_00437238 + uVar3 * 0xac + 0xc);
          } while (*(int *)(DAT_00437238 + 8 + uVar3 * 0xac) == 8);
          if (*(int *)(DAT_00437238 + 8 + uVar3 * 0xac) != 9) {
            uVar3 = *(uint *)(DAT_00437238 + uVar3 * 0xac + 0x10);
          }
        }
      } while ((uVar3 != DAT_004377f0) &&
              (iVar4 = DAT_00437238 + uVar3 * 0xac,
              *(char *)(DAT_00437238 + 0x43 + uVar3 * 0xac) != '\0'));
      FUN_00416d20(uVar3);
      DAT_004377f0 = uVar3;
      SetFocus(*(HWND *)(DAT_00437238 + uVar3 * 0xac));
      return;
    }
  }
  return;
}



/******************************************************************************/
/* TARGET 00416ad0  FUN_00416ad0 */
/******************************************************************************/

void FUN_00416ad0(void)

{
  int iVar1;
  int iVar2;
  uint uVar3;
  int iVar4;
  
  if ((DAT_004377f0 < DAT_00437244) && (*(char *)(DAT_0043723c + DAT_004377f0) != '\0')) {
    iVar2 = DAT_00437238 + DAT_004377f0 * 0xac;
    switch(*(undefined4 *)(DAT_00437238 + 8 + DAT_004377f0 * 0xac)) {
    case 2:
    case 3:
    case 4:
    case 6:
      do {
        uVar3 = *(uint *)(iVar2 + 0xc);
        iVar4 = *(int *)(DAT_00437238 + 8 + uVar3 * 0xac);
        iVar2 = DAT_00437238 + uVar3 * 0xac;
        if ((((iVar4 != 2) && (iVar4 != 4)) && (iVar4 != 6)) && (iVar4 != 3)) {
          do {
            do {
              iVar4 = *(int *)(iVar2 + 0x10);
              iVar1 = *(int *)(DAT_00437238 + 8 + iVar4 * 0xac);
              iVar2 = DAT_00437238 + iVar4 * 0xac;
            } while (iVar1 == 2);
          } while (((iVar1 == 4) || (iVar1 == 6)) || (iVar1 == 3));
          uVar3 = *(uint *)(DAT_00437238 + 0xc + iVar4 * 0xac);
        }
      } while ((uVar3 != DAT_004377f0) &&
              (iVar2 = DAT_00437238 + uVar3 * 0xac,
              *(char *)(DAT_00437238 + 0x43 + uVar3 * 0xac) != '\0'));
      DAT_004377f0 = uVar3;
      SetFocus(*(HWND *)(DAT_00437238 + uVar3 * 0xac));
      break;
    case 9:
      do {
        iVar4 = *(int *)(iVar2 + 0x10);
        iVar2 = DAT_00437238 + iVar4 * 0xac;
      } while (*(int *)(DAT_00437238 + 8 + iVar4 * 0xac) == 8);
      uVar3 = *(uint *)(DAT_00437238 + 0xc + iVar4 * 0xac);
      iVar4 = uVar3 * 0xac;
      iVar2 = iVar4 + DAT_00437238;
      if (*(char *)(iVar4 + 0x43 + DAT_00437238) == '\0') {
        FUN_00416d20(uVar3);
        DAT_004377f0 = uVar3;
        SetFocus(*(HWND *)(iVar4 + DAT_00437238));
        return;
      }
    case 8:
      do {
        uVar3 = *(uint *)(iVar2 + 0xc);
        iVar2 = *(int *)(DAT_00437238 + 8 + uVar3 * 0xac);
        if ((iVar2 != 8) && (iVar2 != 9)) {
          do {
            uVar3 = *(uint *)(DAT_00437238 + uVar3 * 0xac + 0x10);
          } while (*(int *)(DAT_00437238 + 8 + uVar3 * 0xac) == 8);
          uVar3 = *(uint *)(DAT_00437238 + 0xc + uVar3 * 0xac);
        }
      } while ((uVar3 != DAT_004377f0) &&
              (iVar2 = DAT_00437238 + uVar3 * 0xac,
              *(char *)(DAT_00437238 + 0x43 + uVar3 * 0xac) != '\0'));
      FUN_00416d20(uVar3);
      DAT_004377f0 = uVar3;
      SetFocus(*(HWND *)(DAT_00437238 + uVar3 * 0xac));
      return;
    }
  }
  return;
}



/******************************************************************************/
/* TARGET 00416d20  FUN_00416d20 */
/******************************************************************************/

void __cdecl FUN_00416d20(uint param_1)

{
  int *piVar1;
  undefined4 *puVar2;
  int iVar3;
  int iVar4;
  
  if ((param_1 < DAT_00437244) && (*(char *)(DAT_0043723c + param_1) != '\0')) {
    iVar4 = param_1 * 0xac;
    DAT_0043732c = 1;
    puVar2 = (undefined4 *)(iVar4 + DAT_00437238);
    iVar3 = *(int *)(iVar4 + 8 + DAT_00437238);
    if ((iVar3 == 8) || (iVar3 == 9)) {
      *(undefined1 *)((int)puVar2 + 0x46) = 1;
      *(undefined1 *)((int)puVar2 + 0x47) = 0;
      SendMessageA((HWND)*puVar2,0xf1,1,0);
      iVar3 = puVar2[2];
      while (iVar3 == 8) {
        piVar1 = puVar2 + 3;
        puVar2 = (undefined4 *)(DAT_00437238 + *piVar1 * 0xac);
        iVar3 = *(int *)(DAT_00437238 + 8 + *piVar1 * 0xac);
        if ((iVar3 == 8) || (iVar3 == 9)) {
          *(undefined1 *)((int)puVar2 + 0x46) = 0;
          *(undefined1 *)((int)puVar2 + 0x47) = 0;
          SendMessageA((HWND)*puVar2,0xf1,0,0);
        }
        iVar3 = puVar2[2];
      }
      iVar3 = *(int *)(iVar4 + 0x10 + DAT_00437238);
      puVar2 = (undefined4 *)(DAT_00437238 + iVar3 * 0xac);
      iVar3 = *(int *)(DAT_00437238 + 8 + iVar3 * 0xac);
      while (iVar3 == 8) {
        *(undefined1 *)((int)puVar2 + 0x46) = 0;
        *(undefined1 *)((int)puVar2 + 0x47) = 0;
        SendMessageA((HWND)*puVar2,0xf1,0,0);
        piVar1 = puVar2 + 4;
        puVar2 = (undefined4 *)(DAT_00437238 + *piVar1 * 0xac);
        iVar3 = *(int *)(DAT_00437238 + 8 + *piVar1 * 0xac);
      }
    }
    DAT_0043732c = 0;
  }
  return;
}



/******************************************************************************/
/* TARGET 00416e50  FUN_00416e50 */
/******************************************************************************/

void __cdecl FUN_00416e50(UINT_PTR param_1)

{
  MMRESULT MVar1;
  int iVar2;
  int iVar3;
  joyinfo_tag local_1ac;
  tagJOYCAPSA local_19c;
  
  if ((&DAT_004376cc)[param_1] == '\0') {
    iVar2 = *(int *)(&DAT_0043761c + param_1 * 4);
    (&DAT_004376cc)[param_1] = 1;
    if (iVar2 < 0) {
      MVar1 = joyGetDevCapsA(param_1,&local_19c,0x194);
      if ((MVar1 == 0) && (MVar1 = joyGetPos(param_1,&local_1ac), MVar1 == 0)) {
        iVar2 = (local_19c.wXmax - local_19c.wXmin) + 1;
        if (iVar2 < 3) {
          *(undefined4 *)(&DAT_00437690 + param_1 * 8) = 0;
          *(undefined4 *)(&DAT_00437694 + param_1 * 8) = 0;
        }
        else {
          iVar3 = (int)(iVar2 + (iVar2 >> 0x1f & 0x1ffU)) >> 9;
          if ((int)local_1ac.wXpos < (int)local_19c.wXmin) {
            local_1ac.wXpos = local_19c.wXmin;
          }
          if ((int)local_19c.wXmax < (int)local_1ac.wXpos) {
            local_1ac.wXpos = local_19c.wXmax;
          }
          if ((iVar3 < (int)(local_1ac.wXpos - *(int *)(&DAT_004375e0 + param_1 * 4))) ||
             ((int)(local_1ac.wXpos - *(int *)(&DAT_004375e0 + param_1 * 4)) < -iVar3)) {
            *(UINT *)(&DAT_004375e0 + param_1 * 4) = local_1ac.wXpos;
            iVar2 = FUN_0040a250(((double)(int)(((local_1ac.wXpos * 2 - local_19c.wXmin) -
                                                local_19c.wXmax) + -1) / (double)iVar2) * 1000.0);
            *(double *)(&DAT_00437690 + param_1 * 8) = (double)iVar2 * 0.001;
          }
        }
        iVar2 = (local_19c.wYmax - local_19c.wYmin) + 1;
        if (iVar2 < 3) {
          *(undefined4 *)(&DAT_00437670 + param_1 * 8) = 0;
          *(undefined4 *)(&DAT_00437674 + param_1 * 8) = 0;
        }
        else {
          iVar3 = (int)(iVar2 + (iVar2 >> 0x1f & 0x1ffU)) >> 9;
          if ((int)local_1ac.wYpos < (int)local_19c.wYmin) {
            local_1ac.wYpos = local_19c.wYmin;
          }
          if ((int)local_19c.wYmax < (int)local_1ac.wYpos) {
            local_1ac.wYpos = local_19c.wYmax;
          }
          if ((iVar3 < (int)(local_1ac.wYpos - *(int *)(&DAT_004375f0 + param_1 * 4))) ||
             ((int)(local_1ac.wYpos - *(int *)(&DAT_004375f0 + param_1 * 4)) < -iVar3)) {
            *(UINT *)(&DAT_004375f0 + param_1 * 4) = local_1ac.wYpos;
            iVar2 = FUN_0040a250(((double)(int)(local_19c.wYmin + local_1ac.wYpos * -2 + 1 +
                                               local_19c.wYmax) / (double)iVar2) * 1000.0);
            *(double *)(&DAT_00437670 + param_1 * 8) = (double)iVar2 * 0.001;
          }
        }
        iVar2 = (local_19c.wZmax - local_19c.wZmin) + 1;
        if (iVar2 < 3) {
          *(undefined4 *)(&DAT_00437648 + param_1 * 8) = 0;
          *(undefined4 *)(&DAT_0043764c + param_1 * 8) = 0;
        }
        else {
          iVar3 = (int)(iVar2 + (iVar2 >> 0x1f & 0x1ffU)) >> 9;
          if ((int)local_1ac.wZpos < (int)local_19c.wZmin) {
            local_1ac.wZpos = local_19c.wZmin;
          }
          if ((int)local_19c.wZmax < (int)local_1ac.wZpos) {
            local_1ac.wZpos = local_19c.wZmax;
          }
          if ((iVar3 < (int)(local_1ac.wZpos - *(int *)(&DAT_00437600 + param_1 * 4))) ||
             ((int)(local_1ac.wZpos - *(int *)(&DAT_00437600 + param_1 * 4)) < -iVar3)) {
            *(UINT *)(&DAT_00437600 + param_1 * 4) = local_1ac.wZpos;
            iVar2 = FUN_0040a250(((double)(int)(((local_1ac.wZpos * 2 - local_19c.wZmin) -
                                                local_19c.wZmax) + -1) / (double)iVar2) * 1000.0);
            *(double *)(&DAT_00437648 + param_1 * 8) = (double)iVar2 * 0.001;
          }
        }
        (&DAT_004376b4)[param_1] = (byte)local_1ac.wButtons & 1;
        (&DAT_004376b0)[param_1] = (byte)(local_1ac.wButtons >> 1) & 1;
        (&DAT_004376bc)[param_1] = (byte)(local_1ac.wButtons >> 2) & 1;
        (&DAT_004376b8)[param_1] = (byte)(local_1ac.wButtons >> 3) & 1;
        return;
      }
      *(undefined4 *)(&DAT_00437690 + param_1 * 8) = 0;
      *(undefined4 *)(&DAT_00437670 + param_1 * 8) = 0;
      *(undefined4 *)(&DAT_00437648 + param_1 * 8) = 0;
      *(undefined4 *)(&DAT_00437694 + param_1 * 8) = 0;
      *(undefined4 *)(&DAT_00437674 + param_1 * 8) = 0;
      *(undefined4 *)(&DAT_0043764c + param_1 * 8) = 0;
      (&DAT_004376b4)[param_1] = 0;
      (&DAT_004376b0)[param_1] = 0;
      (&DAT_004376bc)[param_1] = 0;
      (&DAT_004376b8)[param_1] = 0;
      *(undefined4 *)(&DAT_0043761c + param_1 * 4) = 0x5a;
    }
  }
  return;
}



/******************************************************************************/
/* TARGET 00417120  FUN_00417120 */
/******************************************************************************/

void __cdecl FUN_00417120(char param_1)

{
  BOOL BVar1;
  
  if (DAT_004377e8 != param_1) {
    DAT_004377e8 = param_1;
    if (param_1 == '\0') {
      FUN_0040a750();
      return;
    }
    if (DAT_0043730c != '\0') {
      DAT_0043730c = '\0';
      ShowWindow(DAT_00437308,0);
    }
    if ((DAT_00436904 == (HANDLE)0xffffffff) || (DAT_00436904 == (HANDLE)0x0)) {
      DAT_00436904 = GetStdHandle(0xfffffff6);
    }
    if ((DAT_00436908 == (HANDLE)0xffffffff) || (DAT_00436908 == (HANDLE)0x0)) {
      DAT_00436908 = GetStdHandle(0xfffffff5);
    }
    if ((DAT_0043690c == (HANDLE)0xffffffff) || (DAT_0043690c == (HANDLE)0x0)) {
      DAT_0043690c = GetStdHandle(0xfffffff4);
    }
    if ((((DAT_00436904 == (HANDLE)0xffffffff) || (DAT_00436908 == (HANDLE)0xffffffff)) ||
        (DAT_0043690c == (HANDLE)0xffffffff)) ||
       (((DAT_00436904 == (HANDLE)0x0 || (DAT_00436908 == (HANDLE)0x0)) ||
        (DAT_0043690c == (HANDLE)0x0)))) {
      BVar1 = AllocConsole();
      if (BVar1 != 0) {
        DAT_004377e9 = 1;
      }
      DAT_00436904 = GetStdHandle(0xfffffff6);
      DAT_00436908 = GetStdHandle(0xfffffff5);
      DAT_0043690c = GetStdHandle(0xfffffff4);
    }
    FUN_0040b320();
  }
  return;
}



/******************************************************************************/
/* TARGET 00417220  FUN_00417220 */
/******************************************************************************/

void __cdecl FUN_00417220(int *param_1)

{
  DWORD cchDstLength;
  int *piVar1;
  int *lpszDst;
  
  piVar1 = param_1;
  if (DAT_004377e8 != '\0') {
    cchDstLength = *(DWORD *)(*param_1 + 4);
    lpszDst = FUN_0040d3a0(cchDstLength + 1);
    CharToOemBuffA((LPCSTR)(*piVar1 + 0xc),(LPSTR)lpszDst,cchDstLength);
    WriteFile(DAT_00436908,lpszDst,cchDstLength,(LPDWORD)&param_1,(LPOVERLAPPED)0x0);
    FUN_0040d410(lpszDst);
  }
  return;
}



/******************************************************************************/
/* TARGET 00417270  FUN_00417270 */
/******************************************************************************/

void __cdecl FUN_00417270(int *param_1)

{
  DWORD cchDstLength;
  int *piVar1;
  int *lpszDst;
  
  piVar1 = param_1;
  if (DAT_004377e8 != '\0') {
    cchDstLength = *(DWORD *)(*param_1 + 4);
    lpszDst = FUN_0040d3a0(cchDstLength + 1);
    CharToOemBuffA((LPCSTR)(*piVar1 + 0xc),(LPSTR)lpszDst,cchDstLength);
    WriteFile(DAT_0043690c,lpszDst,cchDstLength,(LPDWORD)&param_1,(LPOVERLAPPED)0x0);
    FUN_0040d410(lpszDst);
  }
  return;
}



/******************************************************************************/
/* TARGET 004172c0  FUN_004172c0 */
/******************************************************************************/

void __cdecl FUN_004172c0(int *param_1)

{
  char cVar1;
  int *lpszSrc;
  int *lpszDst;
  int iVar2;
  int iVar3;
  DWORD local_4;
  
  if (DAT_004377e8 == '\0') {
    FUN_00406ad0(param_1);
  }
  else {
    local_4 = 0;
    lpszSrc = FUN_0040d3a0(0x2000);
    ReadFile(DAT_00436904,lpszSrc,0x1fff,&local_4,(LPOVERLAPPED)0x0);
    lpszDst = FUN_0040d3a0(local_4 + 1);
    OemToCharBuffA((LPCSTR)lpszSrc,(LPSTR)lpszDst,local_4);
    FUN_00406610(param_1);
    FUN_00406650(param_1,(LPCSTR)lpszDst,local_4);
    FUN_0040d410(lpszDst);
    FUN_0040d410(lpszSrc);
    iVar3 = *param_1;
    iVar2 = *(int *)(iVar3 + 4);
    if (iVar2 != 0) {
      while ((cVar1 = *(char *)(iVar2 + 0xb + iVar3), cVar1 == '\r' || (cVar1 == '\n'))) {
        FUN_00406c00(param_1,iVar2 - 1,0x7fffffff);
        iVar3 = *param_1;
        iVar2 = *(int *)(iVar3 + 4);
        if (iVar2 == 0) {
          return;
        }
      }
    }
  }
  return;
}



/******************************************************************************/
/* TARGET 00417380  FUN_00417380 */
/******************************************************************************/

void __cdecl FUN_00417380(int param_1)

{
  undefined4 uVar1;
  undefined1 local_18 [4];
  undefined4 local_14;
  undefined1 local_c [4];
  int local_8;
  
  uVar1 = FUN_00417870();
  if ((char)uVar1 != '\0') {
    if (0 < DAT_004368f4) {
      for (; param_1 < 1; param_1 = param_1 + DAT_004368f4) {
      }
      for (; DAT_004368f4 < param_1; param_1 = param_1 - DAT_004368f4) {
      }
    }
    local_14 = 10;
    mciSendCommandA(DAT_00437760,0x80d,0x402,(DWORD_PTR)local_18);
    local_8 = param_1;
    mciSendCommandA(DAT_00437760,0x806,4,(DWORD_PTR)local_c);
    DAT_00437764 = 0;
  }
  return;
}



/******************************************************************************/
/* TARGET 00417400  FUN_00417400 */
/******************************************************************************/

void __cdecl FUN_00417400(int param_1)

{
  undefined4 uVar1;
  undefined1 local_18 [4];
  int local_14;
  undefined1 local_c [4];
  undefined4 local_8;
  
  uVar1 = FUN_00417870();
  if ((char)uVar1 != '\0') {
    if (0 < DAT_004368f4) {
      for (; param_1 < 1; param_1 = param_1 + DAT_004368f4) {
      }
      for (; DAT_004368f4 < param_1; param_1 = param_1 - DAT_004368f4) {
      }
    }
    local_8 = 10;
    mciSendCommandA(DAT_00437760,0x80d,0x402,(DWORD_PTR)local_c);
    local_14 = param_1;
    if (DAT_00437774 != '\0') {
      mciSendCommandA(DAT_00437760,0x806,4,(DWORD_PTR)local_18);
      DAT_00437764 = 0;
      return;
    }
    mciSendCommandA(DAT_00437760,0x807,10,(DWORD_PTR)local_18);
    DAT_00437764 = 0;
  }
  return;
}



/******************************************************************************/
/* TARGET 004174c0  FUN_004174c0 */
/******************************************************************************/

void FUN_004174c0(void)

{
  undefined4 uVar1;
  undefined1 local_14 [4];
  undefined4 local_10;
  undefined1 local_c [4];
  undefined4 local_8;
  
  uVar1 = FUN_00417870();
  if (((char)uVar1 != '\0') && ((DAT_00437774 != '\0' || (DAT_00437775 != '\0')))) {
    mciSendCommandA(DAT_00437760,0x808,2,0);
    local_8 = 0;
    mciSendCommandA(DAT_00437760,0x80d,0x402,(DWORD_PTR)local_c);
    local_10 = DAT_004368ec;
    mciSendCommandA(DAT_00437760,0x807,10,(DWORD_PTR)local_14);
    DAT_00437764 = 0;
  }
  return;
}



/******************************************************************************/
/* TARGET 00417550  FUN_00417550 */
/******************************************************************************/

void __cdecl FUN_00417550(char param_1)

{
  undefined4 uVar1;
  
  uVar1 = FUN_00417810();
  if ((char)uVar1 != '\0') {
    mciSendCommandA(DAT_00437760,0x80d,(-(uint)(param_1 != '\0') & 0xffffff00) + 0x200,0);
  }
  return;
}



/******************************************************************************/
/* TARGET 00417580  FUN_00417580 */
/******************************************************************************/

void FUN_00417580(void)

{
  undefined4 uVar1;
  
  uVar1 = FUN_00417870();
  if ((char)uVar1 != '\0') {
    if (DAT_00437774 != '\0') {
      mciSendCommandA(DAT_00437760,0x809,2,0);
      DAT_00437764 = 0;
      return;
    }
    if (DAT_00437775 != '\0') {
      mciSendCommandA(DAT_00437760,0x806,0,0);
      DAT_00437764 = 0;
    }
  }
  return;
}



/******************************************************************************/
/* TARGET 004175e0  FUN_004175e0 */
/******************************************************************************/

void __cdecl FUN_004175e0(int param_1)

{
  undefined4 uVar1;
  UINT uMsg;
  DWORD_PTR dwParam1;
  undefined1 local_18 [4];
  int local_14;
  undefined1 local_c [4];
  undefined4 local_8;
  
  uVar1 = FUN_00417870();
  if ((char)uVar1 != '\0') {
    local_8 = 0;
    mciSendCommandA(DAT_00437760,0x80d,0x402,(DWORD_PTR)local_c);
    if (0 < DAT_004368f0) {
      for (; param_1 < 0; param_1 = param_1 + DAT_004368f0) {
      }
      param_1 = param_1 % DAT_004368f0;
    }
    if (DAT_00437774 == '\0') {
      dwParam1 = 10;
      uMsg = 0x807;
    }
    else {
      dwParam1 = 4;
      uMsg = 0x806;
    }
    local_14 = DAT_004368ec + param_1;
    mciSendCommandA(DAT_00437760,uMsg,dwParam1,(DWORD_PTR)local_18);
    DAT_00437764 = 0;
  }
  return;
}



/******************************************************************************/
/* TARGET 00417690  FUN_00417690 */
/******************************************************************************/

void __cdecl FUN_00417690(int param_1)

{
  uint uVar1;
  undefined4 uVar2;
  uint uVar3;
  UINT uMsg;
  DWORD_PTR dwParam1;
  undefined1 local_18 [4];
  uint local_14;
  undefined1 local_c [4];
  undefined4 local_8;
  
  uVar2 = FUN_00417870();
  if ((char)uVar2 != '\0') {
    local_8 = 10;
    mciSendCommandA(DAT_00437760,0x80d,0x402,(DWORD_PTR)local_c);
    if (DAT_004368fc <= param_1) {
      param_1 = DAT_004368fc + -1;
    }
    if (param_1 < 0) {
      param_1 = 0;
    }
    uVar1 = ((param_1 % 1000) * 0x4b + 500) / 1000;
    uVar3 = (param_1 / 1000) % 0x3c;
    if (DAT_00437774 == '\0') {
      local_14 = (((uVar1 & 0xffff) << 8 | uVar3 & 0xff) << 8 | param_1 / 60000 & 0xffffU) << 8 |
                 DAT_004368f8 & 0xff;
      dwParam1 = 10;
      uMsg = 0x807;
    }
    else {
      local_14 = (((uVar1 & 0xffff) << 8 | uVar3 & 0xff) << 8 | param_1 / 60000 & 0xffffU) << 8 |
                 DAT_004368f8 & 0xff;
      dwParam1 = 4;
      uMsg = 0x806;
    }
    mciSendCommandA(DAT_00437760,uMsg,dwParam1,(DWORD_PTR)local_18);
    DAT_00437764 = 0;
  }
  return;
}



/******************************************************************************/
/* TARGET 004177e0  FUN_004177e0 */
/******************************************************************************/

void FUN_004177e0(void)

{
  if (DAT_00437760 != 0) {
    mciSendCommandA(DAT_00437760,0x804,2,0);
    DAT_00437760 = 0;
  }
  DAT_00437768 = 0;
  return;
}



/******************************************************************************/
/* TARGET 00417810  FUN_00417810 */
/******************************************************************************/

uint FUN_00417810(void)

{
  MCIERROR MVar1;
  int iVar2;
  undefined1 local_14 [4];
  int local_10;
  char *local_c;
  
  iVar2 = DAT_00437760;
  if (DAT_00437760 == 0) {
    if (0 < (int)DAT_004368e8) {
      return DAT_004368e8 & 0xffffff00;
    }
    local_c = s_cdaudio_00436990;
    MVar1 = mciSendCommandA(0,0x803,0x2102,(DWORD_PTR)local_14);
    if (MVar1 != 0) {
      DAT_004368e8 = 0x36;
      return MVar1 & 0xffffff00;
    }
    DAT_00437760 = local_10;
    iVar2 = 0;
  }
  return CONCAT31((int3)((uint)iVar2 >> 8),1);
}



/******************************************************************************/
/* TARGET 00417870  FUN_00417870 */
/******************************************************************************/

undefined4 FUN_00417870(void)

{
  undefined4 uVar1;
  MCIERROR MVar2;
  uint uVar3;
  int iVar4;
  uint uVar5;
  undefined1 local_1c [4];
  undefined4 local_18;
  undefined1 local_10 [4];
  uint local_c;
  undefined4 local_8;
  uint local_4;
  
  uVar3 = DAT_00437764;
  if (0 < (int)DAT_00437764) goto LAB_00417c8c;
  if (DAT_00437768 == '\0') {
    DAT_004368ec = 2000;
    DAT_004368f0 = 3600000;
    DAT_004368f4 = 1;
    DAT_004368f8 = 1;
    DAT_004368fc = 3600000;
  }
  DAT_0043776c = 0;
  DAT_00437770 = 0;
  DAT_00437774 = 0;
  DAT_00437775 = 0;
  uVar1 = FUN_00417810();
  if ((char)uVar1 == '\0') {
    return uVar1;
  }
  DAT_00437764 = 0x12;
  local_18 = 0;
  mciSendCommandA(DAT_00437760,0x80d,0x402,(DWORD_PTR)local_1c);
  local_8 = 2;
  local_c = DAT_004368ec;
  MVar2 = mciSendCommandA(DAT_00437760,0x814,0x102,(DWORD_PTR)local_10);
  local_c = local_c - DAT_004368ec;
  if ((int)local_c < 0) {
    local_c = 0;
  }
  if (MVar2 == 0) {
    DAT_0043776c = local_c;
  }
  local_8 = 4;
  MVar2 = mciSendCommandA(DAT_00437760,0x814,0x102,(DWORD_PTR)local_10);
  if (MVar2 == 0) {
    switch(local_c) {
    case 0x20c:
    case 0x212:
      DAT_004368f0 = 3600000;
      DAT_004368fc = 3600000;
      DAT_004368ec = 2000;
      DAT_00437768 = 0;
      DAT_004368f4 = 1;
      DAT_004368f8 = 1;
      DAT_0043776c = 0;
      DAT_00437770 = 0;
      DAT_00437774 = 0;
      DAT_00437775 = 0;
      return 0;
    default:
      if (800 < (int)DAT_0043776c) goto switchD_0041798d_caseD_211;
      break;
    case 0x20e:
      DAT_00437774 = 1;
      break;
    case 0x211:
switchD_0041798d_caseD_211:
      DAT_00437775 = 1;
    }
  }
  if (DAT_00437768 == '\0') {
    DAT_00437768 = '\x01';
    local_8 = 2;
    MVar2 = mciSendCommandA(DAT_00437760,0x814,0x302,(DWORD_PTR)local_10);
    if ((MVar2 == 0) && (0 < (int)local_c)) {
      iVar4 = DAT_0043776c + DAT_004368ec;
      DAT_004368ec = local_c;
      if (86400000 < (int)local_c) {
        DAT_004368ec = 86400000;
      }
      DAT_0043776c = iVar4 - DAT_004368ec;
      if ((int)DAT_0043776c < 0) {
        DAT_0043776c = 0;
      }
    }
    local_8 = 1;
    MVar2 = mciSendCommandA(DAT_00437760,0x814,0x102,(DWORD_PTR)local_10);
    if (((MVar2 == 0) && (0 < (int)local_c)) && (DAT_004368f0 = local_c, 86400000 < (int)local_c)) {
      DAT_004368f0 = 86400000;
    }
    local_8 = 3;
    MVar2 = mciSendCommandA(DAT_00437760,0x814,0x102,(DWORD_PTR)local_10);
    if (((MVar2 == 0) && (0 < (int)local_c)) && (DAT_004368f4 = local_c, 999 < (int)local_c)) {
      DAT_004368f4 = 999;
    }
    DAT_004368f8 = 0;
  }
  local_18 = 10;
  mciSendCommandA(DAT_00437760,0x80d,0x402,(DWORD_PTR)local_1c);
  local_c = 0;
  local_8 = 2;
  MVar2 = mciSendCommandA(DAT_00437760,0x814,0x102,(DWORD_PTR)local_10);
  uVar3 = DAT_00437770;
  if (MVar2 == 0) {
    DAT_00437770 = ((local_c >> 0x18) * 1000 + 0x25) / 0x4b +
                   ((local_c >> 0x10 & 0xff) + (local_c >> 8 & 0xff) * 0x3c) * 1000;
  }
  if ((int)DAT_00437770 < 0) {
    DAT_00437770 = 0;
  }
  uVar5 = local_c & 0xff;
  if ((uVar5 == 0) || ((int)DAT_004368f4 < (int)uVar5)) {
    uVar5 = 1;
  }
  if ((((uVar5 == DAT_004368f8 + 1) && (1 < uVar5)) &&
      ((int)(DAT_004368fc - 10000) < (int)DAT_00437770)) &&
     ((5000 < (int)DAT_00437770 && ((int)(uVar3 - 4000) < (int)DAT_00437770)))) {
    uVar5 = uVar5 - 1;
  }
  if (uVar5 != DAT_004368f8) {
    local_18 = 0;
    DAT_004368f8 = uVar5;
    mciSendCommandA(DAT_00437760,0x80d,0x402,(DWORD_PTR)local_1c);
    local_4 = DAT_004368f8;
    local_8 = 1;
    MVar2 = mciSendCommandA(DAT_00437760,0x814,0x112,(DWORD_PTR)local_10);
    if ((MVar2 == 0) && (0 < (int)local_c)) {
      DAT_004368fc = local_c;
    }
  }
  if ((int)DAT_004368f0 < (int)DAT_004368fc) {
    DAT_004368fc = DAT_004368f0;
  }
  if ((int)DAT_004368fc < (int)DAT_00437770) {
    DAT_00437770 = DAT_004368fc;
  }
  uVar3 = DAT_004368fc;
  if ((int)DAT_004368f0 < (int)DAT_0043776c) {
    DAT_0043776c = DAT_004368f0;
  }
LAB_00417c8c:
  return CONCAT31((int3)(uVar3 >> 8),1);
}



/******************************************************************************/
/* TARGET 00417cc0  FUN_00417cc0 */
/******************************************************************************/

void FUN_00417cc0(void)

{
  DAT_004368e8 = DAT_004368e8 + -1;
  DAT_00437764 = DAT_00437764 + -1;
  if (DAT_00437764 == -0x1e) {
    FUN_004177e0();
  }
  if (((DAT_00437760 != 0) && (DAT_00437774 != '\0')) && (1 < DAT_00437764)) {
    DAT_0043776c = DAT_0043776c + 0x37;
    if (DAT_004368f0 < DAT_0043776c) {
      DAT_0043776c = DAT_004368f0;
    }
    DAT_00437770 = DAT_00437770 + 0x37;
    if (DAT_004368fc < DAT_00437770) {
      DAT_00437770 = DAT_004368fc;
    }
  }
  return;
}



/******************************************************************************/
/* TARGET 00417d40  FUN_00417d40 */
/******************************************************************************/

/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

void FUN_00417d40(void)

{
  int iVar1;
  BOOL BVar2;
  DWORD local_10;
  DWORD local_c;
  DWORD local_8;
  DWORD local_4;
  
  if ((DAT_00437288 == (code *)0x0) ||
     (iVar1 = (*DAT_00437288)(0,&DAT_004377e0,&DAT_004377d0,&DAT_004377d8), iVar1 == 0)) {
    BVar2 = GetDiskFreeSpaceA((LPCSTR)0x0,&local_4,&local_8,&local_c,&local_10);
    if (BVar2 == 0) {
      local_8 = 0;
      local_c = 0;
      local_10 = 0;
      local_4 = 0;
    }
    _DAT_004377d8 = local_4 * local_8 * local_c;
    _DAT_004377d0 = local_4 * local_8 * local_10;
    _DAT_004377d4 = 0;
    _DAT_004377dc = 0;
    _DAT_004377e4 = 0;
    _DAT_004377e0 = _DAT_004377d8;
  }
  return;
}



/******************************************************************************/
/* TARGET 00417de0  FUN_00417de0 */
/******************************************************************************/

uint FUN_00417de0(void)

{
  HANDLE pvVar1;
  
  DAT_0043779c = 10;
  pvVar1 = DAT_004377a4;
  if (DAT_004377a4 == (HANDLE)0x0) {
    if (*(int *)(DAT_00437448 + 4) == 0) {
      DAT_00437798 = 1;
      return DAT_00437448 & 0xffffff00;
    }
    DAT_004377a4 = CreateFileA((LPCSTR)(DAT_00437448 + 0xc),0x80000000,3,(LPSECURITY_ATTRIBUTES)0x0,
                               3,0x80,(HANDLE)0x0);
    if (DAT_004377a4 == (HANDLE)0xffffffff) {
      DAT_004377a4 = (HANDLE)0x0;
      DAT_00437798 = 1;
      return 0xffffff00;
    }
    pvVar1 = DAT_004377ac;
    if (DAT_004377ac == (HANDLE)0x0) {
      pvVar1 = FUN_0040d3a0(0xf000);
      DAT_004377ac = pvVar1;
    }
  }
  return CONCAT31((int3)((uint)pvVar1 >> 8),1);
}



/******************************************************************************/
/* TARGET 00417e60  FUN_00417e60 */
/******************************************************************************/

uint FUN_00417e60(void)

{
  HANDLE pvVar1;
  
  if (DAT_004377c8 == 0) {
    DAT_004377c4 = DAT_004377bc;
  }
  DAT_0043779c = 10;
  pvVar1 = DAT_004377b8;
  if (DAT_004377b8 == (HANDLE)0x0) {
    if (*(int *)(DAT_004375bc + 4) == 0) {
      DAT_00437798 = 1;
      return DAT_004375bc & 0xffffff00;
    }
    DAT_004377b8 = CreateFileA((LPCSTR)(DAT_004375bc + 0xc),0x40000000,1,(LPSECURITY_ATTRIBUTES)0x0,
                               4,0x80,(HANDLE)0x0);
    if (DAT_004377b8 == (HANDLE)0xffffffff) {
      DAT_004377b8 = (HANDLE)0x0;
      DAT_00437798 = 1;
      return 0xffffff00;
    }
    pvVar1 = DAT_004377c0;
    if (DAT_004377c0 == (HANDLE)0x0) {
      pvVar1 = FUN_0040d3a0(0xf000);
      DAT_004377c0 = pvVar1;
    }
  }
  return CONCAT31((int3)((uint)pvVar1 >> 8),1);
}



/******************************************************************************/
/* TARGET 00417f00  FUN_00417f00 */
/******************************************************************************/

undefined1 FUN_00417f00(void)

{
  undefined4 uVar1;
  DWORD DVar2;
  BOOL BVar3;
  DWORD local_4;
  
  if (DAT_004377c8 == 0) {
    DAT_004377c4 = DAT_004377bc;
    return 1;
  }
  local_4 = 0;
  uVar1 = FUN_00417e60();
  if (((((char)uVar1 != '\0') &&
       (DVar2 = SetFilePointer(DAT_004377b8,DAT_004377c4,(PLONG)0x0,0), DVar2 != 0xffffffff)) &&
      (BVar3 = WriteFile(DAT_004377b8,DAT_004377c0,DAT_004377c8,&local_4,(LPOVERLAPPED)0x0),
      BVar3 != 0)) && (local_4 == DAT_004377c8)) {
    DAT_004377c4 = DAT_004377bc;
    DAT_004377c8 = 0;
    return 1;
  }
  DAT_00437798 = 1;
  DAT_004377c8 = 0;
  DAT_004377c4 = DAT_004377bc;
  return 0;
}



/******************************************************************************/
/* TARGET 00417fb0  FUN_00417fb0 */
/******************************************************************************/

void __fastcall FUN_00417fb0(undefined1 *param_1,int param_2)

{
  if (0 < param_2) {
    do {
      FUN_00418010(*param_1);
      param_1 = param_1 + 1;
      param_2 = param_2 + -1;
    } while (param_2 != 0);
  }
  return;
}



/******************************************************************************/
/* TARGET 00417fd0  FUN_00417fd0 */
/******************************************************************************/

void __cdecl FUN_00417fd0(uint param_1)

{
  FUN_00417ff0(param_1);
  FUN_00417ff0(param_1 >> 0x10);
  return;
}



/******************************************************************************/
/* TARGET 00417ff0  FUN_00417ff0 */
/******************************************************************************/

void __cdecl FUN_00417ff0(undefined4 param_1)

{
  FUN_00418010((char)param_1);
  FUN_00418010((char)((uint)param_1 >> 8));
  return;
}



/******************************************************************************/
/* TARGET 00418010  FUN_00418010 */
/******************************************************************************/

void __cdecl FUN_00418010(undefined1 param_1)

{
  char cVar1;
  undefined4 uVar2;
  uint uVar3;
  
  uVar2 = FUN_00417e60();
  if ((char)uVar2 != '\0') {
    uVar3 = DAT_004377bc - DAT_004377c4;
    if ((DAT_004377c8 < uVar3) || (0xefff < (int)uVar3)) {
      cVar1 = FUN_00417f00();
      if (cVar1 != '\0') {
        DAT_004377bc = DAT_004377bc + 1;
        *DAT_004377c0 = param_1;
        DAT_004377c8 = 1;
      }
    }
    else {
      DAT_004377bc = DAT_004377bc + 1;
      DAT_004377c0[uVar3] = param_1;
      if ((int)DAT_004377c8 < (int)(uVar3 + 1)) {
        DAT_004377c8 = uVar3 + 1;
        return;
      }
    }
  }
  return;
}



/******************************************************************************/
/* TARGET 00418090  FUN_00418090 */
/******************************************************************************/

int FUN_00418090(void)

{
  uint uVar1;
  uint uVar2;
  
  uVar1 = FUN_004180c0();
  uVar2 = FUN_004180c0();
  return (uVar2 & 0xff) * 0x100 + (uVar1 & 0xff);
}



/******************************************************************************/
/* TARGET 004180c0  FUN_004180c0 */
/******************************************************************************/

uint FUN_004180c0(void)

{
  uint uVar1;
  DWORD DVar2;
  BOOL BVar3;
  DWORD local_4;
  
  uVar1 = FUN_00417de0();
  if ((char)uVar1 == '\0') goto LAB_0041819d;
  uVar1 = DAT_004377a8 - DAT_004377b0;
  if (uVar1 < DAT_004377b4) {
    DAT_004377a8 = DAT_004377a8 + 1;
    return CONCAT31((int3)(uVar1 >> 8),*(undefined1 *)((int)DAT_004377ac + uVar1));
  }
  DAT_004377b0 = DAT_004377a8 + -0x3c00;
  DAT_004377b4 = 0;
  if (DAT_004377b0 < 0) {
    DAT_004377b0 = 0;
  }
  local_4 = 0;
  DVar2 = SetFilePointer(DAT_004377a4,DAT_004377b0,(PLONG)0x0,0);
  if (DVar2 == 0xffffffff) {
LAB_0041815d:
    DAT_00437798 = 1;
  }
  else {
    BVar3 = ReadFile(DAT_004377a4,DAT_004377ac,0xf000,&local_4,(LPOVERLAPPED)0x0);
    if (BVar3 == 0) goto LAB_0041815d;
  }
  DAT_004377b4 = local_4;
  uVar1 = DAT_004377a8 - DAT_004377b0;
  DAT_004377a8 = DAT_004377a8 + 1;
  if (uVar1 < local_4) {
    return CONCAT31((int3)(uVar1 >> 8),*(undefined1 *)((int)DAT_004377ac + uVar1));
  }
  DAT_00437798 = 1;
LAB_0041819d:
  return uVar1 & 0xffffff00;
}



/******************************************************************************/
/* TARGET 004181b0  FUN_004181b0 */
/******************************************************************************/

void __cdecl FUN_004181b0(undefined4 *param_1,DWORD param_2)

{
  undefined4 uVar1;
  DWORD DVar2;
  BOOL BVar3;
  uint uVar4;
  DWORD DVar5;
  uint uVar6;
  uint uVar7;
  undefined4 *puVar8;
  undefined4 *puVar9;
  DWORD local_4;
  
  DVar2 = param_2;
  uVar1 = FUN_00417de0();
  if ((char)uVar1 == '\0') {
    return;
  }
  if (0 < (int)param_2) {
    local_4 = 0;
    if (0xefff < (int)param_2) {
      DVar2 = SetFilePointer(DAT_004377a4,DAT_004377a8,(PLONG)0x0,0);
      if ((DVar2 != 0xffffffff) &&
         (BVar3 = ReadFile(DAT_004377a4,param_1,param_2,&local_4,(LPOVERLAPPED)0x0), BVar3 != 0)) {
        DAT_004377a8 = DAT_004377a8 + param_2;
        return;
      }
      DAT_00437798 = 1;
      return;
    }
    param_2 = 4;
    do {
      uVar7 = DAT_004377a8 - DAT_004377b0;
      if (uVar7 < DAT_004377b4) {
        uVar4 = DAT_004377b4 - uVar7;
        if ((int)DVar2 < (int)(DAT_004377b4 - uVar7)) {
          uVar4 = DVar2;
        }
        puVar8 = (undefined4 *)((int)DAT_004377ac + uVar7);
        puVar9 = param_1;
        for (uVar6 = uVar4 >> 2; uVar6 != 0; uVar6 = uVar6 - 1) {
          *puVar9 = *puVar8;
          puVar8 = puVar8 + 1;
          puVar9 = puVar9 + 1;
        }
        for (uVar7 = uVar4 & 3; uVar7 != 0; uVar7 = uVar7 - 1) {
          *(undefined1 *)puVar9 = *(undefined1 *)puVar8;
          puVar8 = (undefined4 *)((int)puVar8 + 1);
          puVar9 = (undefined4 *)((int)puVar9 + 1);
        }
        DAT_004377a8 = DAT_004377a8 + uVar4;
        DVar2 = DVar2 - uVar4;
        if (DVar2 == 0) {
          return;
        }
        param_1 = (undefined4 *)((int)param_1 + uVar4);
      }
      DAT_004377b4 = 0;
      DAT_004377b0 = DAT_004377a8 + -0x3c00;
      if (DAT_004377b0 < 0) {
        DAT_004377b0 = 0;
      }
      DVar5 = SetFilePointer(DAT_004377a4,DAT_004377b0,(PLONG)0x0,0);
      if ((DVar5 == 0xffffffff) ||
         (BVar3 = ReadFile(DAT_004377a4,DAT_004377ac,0xf000,&local_4,(LPOVERLAPPED)0x0), BVar3 == 0)
         ) {
        DAT_00437798 = 1;
      }
      DAT_004377b4 = local_4;
      if (local_4 == 0) {
        return;
      }
      param_2 = param_2 - 1;
      if ((int)param_2 < 1) {
        return;
      }
    } while( true );
  }
  DAT_004377a8 = DAT_004377a8 + param_2;
  return;
}



/******************************************************************************/
/* TARGET 00418330  FUN_00418330 */
/******************************************************************************/

void FUN_00418330(void)

{
  BOOL BVar1;
  
  if (DAT_004377a4 != (HANDLE)0x0) {
    BVar1 = CloseHandle(DAT_004377a4);
    if (BVar1 == 0) {
      DAT_00437798 = 1;
    }
    DAT_004377a4 = (HANDLE)0x0;
    DAT_004377b4 = 0;
  }
  if (DAT_004377b8 != (HANDLE)0x0) {
    FUN_00417f00();
    BVar1 = CloseHandle(DAT_004377b8);
    if (BVar1 == 0) {
      DAT_00437798 = 1;
    }
    DAT_004377b8 = (HANDLE)0x0;
  }
  return;
}



/******************************************************************************/
/* TARGET 00418390  FUN_00418390 */
/******************************************************************************/

void FUN_00418390(int param_1)

{
  int iVar1;
  undefined4 *puVar2;
  int *piVar3;
  DWORD DVar4;
  uint uVar5;
  char *pcVar6;
  int local_40c;
  undefined4 local_408;
  LPSTR local_404;
  CHAR local_400 [1024];
  
  iVar1 = FUN_00406d30(&param_1);
  if ((char)iVar1 == '\\') {
    FUN_00406c00(&param_1,*(int *)(param_1 + 4) - 1,0x7fffffff);
  }
  iVar1 = FUN_00406890(&param_1,'\\');
  uVar5 = iVar1 + 1;
  if (uVar5 == 0) {
    iVar1 = FUN_00406890(&param_1,':');
    uVar5 = iVar1 + 1;
  }
  puVar2 = FUN_00406b70(&param_1,&local_40c,*(int *)(param_1 + 4) - uVar5);
  FUN_00407cc0(&DAT_004374b8,puVar2);
  FUN_00406610(&local_40c);
  pcVar6 = s_ALIASES_INI_00436998;
  piVar3 = FUN_00406b40(&param_1,&local_408,uVar5);
  piVar3 = FUN_00407f80(&local_40c,piVar3,pcVar6);
  FUN_00407cc0(&DAT_004375cc,piVar3);
  FUN_00406610(&local_40c);
  FUN_00406610(&local_408);
  local_400[0] = '\0';
  DVar4 = GetFullPathNameA((LPCSTR)(DAT_004375cc + 0xc),0x3ff,local_400,&local_404);
  if ((0 < (int)DVar4) && ((int)DVar4 < 0x400)) {
    FUN_00406610(&DAT_004375cc);
    FUN_00406650(&DAT_004375cc,local_400,DVar4);
  }
  FUN_00406610(&param_1);
  return;
}



/******************************************************************************/
/* TARGET 004184c0  FUN_004184c0 */
/******************************************************************************/

void __fastcall FUN_004184c0(int param_1)

{
  int local_4;
  
  local_4 = param_1;
  FUN_004064c0(&local_4);
  FUN_004070d0(&local_4,(&DAT_004361b8)[param_1 * 8]);
  FUN_00407cf0(&DAT_00437444,s_LANGID_004369a4);
  FUN_00407dc0(&DAT_00437444,&local_4);
  FUN_00406610(&local_4);
  return;
}



/******************************************************************************/
/* TARGET 00418510  FUN_00418510 */
/******************************************************************************/

/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

void FUN_00418510(void)

{
  bool bVar1;
  int iVar2;
  int iVar3;
  int local_c;
  
  if ((DAT_004368bc == DAT_004376fc) && (DAT_004368c0 == DAT_00437700)) {
    DAT_0043770c = '\0';
  }
  else {
    DAT_0043770c = '\x01';
  }
  if ((DAT_004368bc * 2 == DAT_004376fc) && (DAT_004368c0 * 2 == DAT_00437700)) {
    DAT_0043770d = '\x01';
  }
  else {
    DAT_0043770d = '\0';
  }
  if (DAT_0043770c != '\0') {
    iVar2 = DAT_00437730 * DAT_004368c0;
    if (DAT_0043770d != '\0') {
      iVar2 = iVar2 * 4;
    }
    bVar1 = DAT_00437714 < iVar2;
    DAT_00437714 = iVar2;
    if (bVar1) {
      FUN_0040d410(DAT_00437710);
      DAT_00437710 = FUN_0040d3a0(DAT_00437714);
    }
    FUN_0040d410(DAT_00437718);
    DAT_00437718 = FUN_0040d3a0(DAT_004376fc * 4);
    local_c = 0;
    if (0 < DAT_004376fc) {
      do {
        iVar2 = FUN_0040a2d0((double)local_c * _DAT_004368c8);
        if (DAT_004368bc <= iVar2) {
          iVar2 = DAT_004368bc + -1;
        }
        iVar3 = local_c + 1;
        DAT_00437718[local_c] = iVar2;
        local_c = iVar3;
      } while (iVar3 < DAT_004376fc);
    }
    FUN_0040d410(DAT_0043771c);
    DAT_0043771c = FUN_0040d3a0(DAT_00437700 * 4);
    local_c = 0;
    if (0 < DAT_00437700) {
      do {
        iVar2 = FUN_0040a2d0((double)local_c * _DAT_004368c8);
        if (DAT_004368c0 <= iVar2) {
          iVar2 = DAT_004368c0 + -1;
        }
        iVar3 = local_c + 1;
        DAT_0043771c[local_c] = iVar2;
        local_c = iVar3;
      } while (iVar3 < DAT_00437700);
    }
    FUN_0040d410(DAT_00437720);
    DAT_00437720 = FUN_0040d3a0(DAT_004368bc * 4);
    local_c = 0;
    if (0 < DAT_004368bc) {
      do {
        iVar2 = FUN_0040a2d0((double)local_c / _DAT_004368c8);
        if (DAT_004376fc <= iVar2) {
          iVar2 = DAT_004376fc + -1;
        }
        iVar3 = local_c + 1;
        DAT_00437720[local_c] = iVar2;
        local_c = iVar3;
      } while (iVar3 < DAT_004368bc);
    }
    FUN_0040d410(DAT_00437724);
    DAT_00437724 = FUN_0040d3a0(DAT_004368c0 * 4);
    local_c = 0;
    if (0 < DAT_004368c0) {
      do {
        iVar2 = FUN_0040a2d0((double)local_c / _DAT_004368c8);
        if (DAT_00437700 <= iVar2) {
          iVar2 = DAT_00437700 + -1;
        }
        DAT_00437724[local_c] = ((DAT_00437700 - iVar2) + -1) * DAT_00437704;
        local_c = local_c + 1;
      } while (local_c < DAT_004368c0);
    }
  }
  return;
}



/******************************************************************************/
/* TARGET 00418770  FUN_00418770 */
/******************************************************************************/

void FUN_00418770(void)

{
  int iVar1;
  uint uVar2;
  int iVar3;
  int iVar4;
  int *piVar5;
  
  iVar1 = DAT_00437700;
  iVar4 = DAT_004376fc;
  DAT_004376f4 = *(int *)(*DAT_004371f0 + 4);
  iVar3 = DAT_00437704 * DAT_00437700;
  DAT_004376fc = DAT_004376f4 * 0x20;
  DAT_00437708 = DAT_004376f4 << 10;
  DAT_004376f8 = *(int *)(*DAT_004371f0 + 8);
  DAT_00437700 = DAT_004376f8 * 0x20;
  uVar2 = DAT_004376fc * DAT_00437700;
  DAT_00437704 = DAT_004376fc;
  if (uVar2 - iVar3 != 0 && iVar3 <= (int)uVar2) {
    FUN_0040d410(DAT_004376e4);
    FUN_0040d410(DAT_004376e8);
    FUN_0040d410(DAT_004376ec);
    FUN_0040d410(DAT_00437644);
    DAT_004376e4 = FUN_0040d3a0(uVar2);
    DAT_004376e8 = FUN_0040d3a0(uVar2);
    DAT_004376ec = FUN_0040d3a0(uVar2);
    DAT_00437644 = FUN_0040d3a0(uVar2);
  }
  if ((iVar4 != DAT_004376fc) || (iVar1 != DAT_00437700)) {
    piVar5 = DAT_004376e4;
    for (uVar2 = uVar2 >> 2; uVar2 != 0; uVar2 = uVar2 - 1) {
      *piVar5 = -0x20202021;
      piVar5 = piVar5 + 1;
    }
    for (iVar4 = 0; iVar4 != 0; iVar4 = iVar4 + -1) {
      *(undefined1 *)piVar5 = 0xdf;
      piVar5 = (int *)((int)piVar5 + 1);
    }
    FUN_00418510();
  }
  DAT_00437728 = 0;
  DAT_0043772c = 0;
  FUN_00418c50();
  return;
}



/******************************************************************************/
/* TARGET 00418890  FUN_00418890 */
/******************************************************************************/

void __cdecl FUN_00418890(int *param_1,undefined4 param_2)

{
  double dVar1;
  int iVar2;
  int iVar3;
  longlong lVar4;
  tagRECT local_30;
  tagRECT local_20;
  tagRECT local_10;
  
  if ((DAT_004377eb == '\0') || (DAT_004377ea != '\0')) {
    GetWindowRect(DAT_00437308,&local_20);
    GetClientRect(DAT_00437308,&local_30);
    if (DAT_00437314 != '\0') {
      GetWindowRect(DAT_00437310,&local_10);
      local_30.bottom = local_30.bottom + (local_10.top - local_10.bottom);
    }
    iVar2 = (((param_1[2] - *param_1) - local_30.left) - local_20.right) + local_30.right +
            local_20.left;
    iVar3 = (((param_1[3] - local_30.top) - local_20.bottom) - param_1[1]) + local_20.top +
            local_30.bottom;
    dVar1 = ((double)iVar2 / (double)DAT_004376fc + (double)iVar3 / (double)DAT_00437700) * 0.5;
    if (DAT_004372ea == '\0') {
      FUN_0040a250(dVar1 * 32.0);
    }
    else {
      FUN_0040a250(dVar1 * 4.0);
    }
    lVar4 = FUN_0040d9c0();
    iVar2 = iVar2 - (int)lVar4;
    lVar4 = FUN_0040d9c0();
    iVar3 = iVar3 - (int)lVar4;
    if (iVar2 != 0) {
      switch(param_2) {
      case 1:
      case 3:
      case 4:
      case 7:
        *param_1 = *param_1 + iVar2;
        break;
      case 2:
      case 5:
      case 6:
      case 8:
        param_1[2] = param_1[2] - iVar2;
      }
    }
    if (iVar3 != 0) {
      switch(param_2) {
      case 1:
      case 3:
      case 4:
      case 5:
        param_1[1] = param_1[1] + iVar3;
        return;
      case 2:
      case 6:
      case 7:
      case 8:
        param_1[3] = param_1[3] - iVar3;
      }
    }
  }
  return;
}



/******************************************************************************/
/* TARGET 00418a80  FUN_00418a80 */
/******************************************************************************/

/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

void __fastcall FUN_00418a80(undefined4 *param_1)

{
  double dVar1;
  int iVar2;
  int iVar3;
  char cVar4;
  BOOL BVar5;
  longlong lVar6;
  
  if ((param_1 == DAT_00437238) && (DAT_004372ea == '\0')) {
    SendMessageA(DAT_00437310,5,0,0);
  }
  FUN_0040b090(param_1);
  cVar4 = DAT_004372ea;
  if (param_1 == DAT_00437238) {
    _DAT_004368c8 = (double)(DAT_0043731c + 4) / (double)DAT_004376fc;
    dVar1 = (double)(DAT_00437320 + 4) / (double)DAT_00437700;
    if (dVar1 < _DAT_004368c8) {
      _DAT_004368c8 = dVar1;
    }
    if (DAT_004372ea == '\0') {
      lVar6 = FUN_0040d9c0();
      _DAT_004368c8 = (double)(int)lVar6 * 0.03125;
    }
    else {
      lVar6 = FUN_0040d9c0();
      _DAT_004368c8 = (double)(int)lVar6 * 0.25;
    }
    if (_DAT_004368c8 < 0.03125) {
      _DAT_004368c8 = 0.03125;
    }
    if (((cVar4 == '\0') && (BVar5 = IsZoomed(DAT_00437308), BVar5 == 0)) &&
       (BVar5 = IsIconic(DAT_00437308), BVar5 == 0)) {
      _DAT_004368d0 = DAT_004368c8;
      _DAT_004368d4 = DAT_004368cc;
    }
    iVar3 = DAT_004368c0;
    iVar2 = DAT_004368bc;
    DAT_004368bc = FUN_0040a250((double)DAT_004376fc * _DAT_004368c8);
    DAT_00437730 = DAT_004368bc + 3U & 0xfffffffc;
    DAT_004368c0 = FUN_0040a250((double)DAT_00437700 * _DAT_004368c8);
    DAT_00437728 = (DAT_0043731c - DAT_004368bc) / 2;
    DAT_0043772c = (DAT_00437320 - DAT_004368c0) / 2;
    if ((iVar2 != DAT_004368bc) || (iVar3 != DAT_004368c0)) {
      FUN_00418510();
    }
  }
  FUN_0041aa00(param_1);
  return;
}



/******************************************************************************/
/* TARGET 00418c50  FUN_00418c50 */
/******************************************************************************/

void FUN_00418c50(void)

{
  uint uVar1;
  uint uVar2;
  undefined4 *puVar3;
  
  uVar1 = DAT_004376f4 * DAT_004376f8;
  puVar3 = DAT_00437644;
  for (uVar2 = uVar1 >> 2; uVar2 != 0; uVar2 = uVar2 - 1) {
    *puVar3 = 0x1010101;
    puVar3 = puVar3 + 1;
  }
  for (uVar1 = uVar1 & 3; uVar1 != 0; uVar1 = uVar1 - 1) {
    *(undefined1 *)puVar3 = 1;
    puVar3 = (undefined4 *)((int)puVar3 + 1);
  }
  return;
}



/******************************************************************************/
/* TARGET 00418c80  FUN_00418c80 */
/******************************************************************************/

void __fastcall FUN_00418c80(int param_1,int param_2,int param_3,int param_4)

{
  FUN_00418cd0((int)(param_1 + (param_1 >> 0x1f & 0x1fU)) >> 5,
               (int)(param_2 + (param_2 >> 0x1f & 0x1fU)) >> 5,
               (int)(param_3 + (param_3 >> 0x1f & 0x1fU)) >> 5,
               (int)(param_4 + (param_4 >> 0x1f & 0x1fU)) >> 5);
  return;
}



/******************************************************************************/
/* TARGET 00418cd0  FUN_00418cd0 */
/******************************************************************************/

void __fastcall FUN_00418cd0(int param_1,int param_2,int param_3,int param_4)

{
  int iVar1;
  int iVar2;
  uint uVar3;
  uint uVar4;
  undefined4 *puVar5;
  undefined4 *puVar6;
  
  iVar1 = DAT_004376f4;
  if (param_1 < 0) {
    param_1 = 0;
  }
  iVar2 = param_3 + 1;
  if (DAT_004376f4 < param_3 + 1) {
    iVar2 = DAT_004376f4;
  }
  uVar4 = iVar2 - param_1;
  if (0 < (int)uVar4) {
    if (param_2 < 0) {
      param_2 = 0;
    }
    iVar2 = param_4 + 1;
    if (DAT_004376f8 < param_4 + 1) {
      iVar2 = DAT_004376f8;
    }
    param_3 = iVar2 - param_2;
    puVar5 = (undefined4 *)(DAT_004376f4 * param_2 + DAT_00437644 + param_1);
    if (0 < param_3) {
      do {
        puVar6 = puVar5;
        for (uVar3 = uVar4 >> 2; uVar3 != 0; uVar3 = uVar3 - 1) {
          *puVar6 = 0x1010101;
          puVar6 = puVar6 + 1;
        }
        puVar5 = (undefined4 *)((int)puVar5 + iVar1);
        for (uVar3 = uVar4 & 3; uVar3 != 0; uVar3 = uVar3 - 1) {
          *(undefined1 *)puVar6 = 1;
          puVar6 = (undefined4 *)((int)puVar6 + 1);
        }
        param_3 = param_3 + -1;
      } while (param_3 != 0);
    }
  }
  return;
}



/******************************************************************************/
/* TARGET 00418d50  FUN_00418d50 */
/******************************************************************************/

void __cdecl FUN_00418d50(uint param_1)

{
  int *piVar1;
  bool bVar2;
  bool bVar3;
  uint uVar4;
  byte bVar5;
  undefined1 uVar6;
  int iVar7;
  int iVar8;
  int iVar9;
  uint uVar10;
  byte *pbVar11;
  uint uVar12;
  int iVar13;
  byte *pbVar14;
  int iVar15;
  undefined4 *puVar16;
  byte *pbVar17;
  undefined4 *puVar18;
  int local_28;
  int local_24;
  int local_1c;
  int local_18;
  int local_14;
  byte *local_10;
  int local_8;
  
  piVar1 = (int *)(DAT_00437080 + param_1 * 0x68);
  if ((char)piVar1[1] != '\0') {
    iVar13 = DAT_0043773c;
    if (DAT_0043773c < 0) {
      iVar13 = 0;
    }
    if (DAT_004376fc < iVar13) {
      iVar13 = DAT_004376fc;
    }
    local_24 = DAT_00437740;
    if (DAT_00437740 < 0) {
      local_24 = 0;
    }
    if (DAT_00437700 < local_24) {
      local_24 = DAT_00437700;
    }
    local_18 = DAT_004368d8;
    if (DAT_004368d8 < 0) {
      local_18 = 0;
    }
    if (DAT_004376fc < local_18) {
      local_18 = DAT_004376fc;
    }
    local_14 = DAT_004368dc;
    if (DAT_004368dc < 0) {
      local_14 = 0;
    }
    if (DAT_00437700 < local_14) {
      local_14 = DAT_00437700;
    }
    iVar8 = iVar13;
    if (local_18 < iVar13) {
      iVar8 = local_18;
      local_18 = iVar13;
    }
    iVar13 = local_24;
    if (local_14 < local_24) {
      iVar13 = local_14;
      local_14 = local_24;
    }
    local_24 = iVar13;
    if ((iVar8 < local_18) && (local_24 < local_14)) {
      if ((piVar1[4] < 1) &&
         (((*(char *)((int)piVar1 + 5) == '\0' && (*(char *)((int)piVar1 + 7) == '\0')) &&
          ((uint)piVar1[0x16] < *(uint *)(*piVar1 + 4))))) {
        piVar1[6] = piVar1[0x16];
        piVar1[0x16] = -1;
      }
      iVar7 = FUN_00405cf0(piVar1);
      local_1c = piVar1[2];
      pbVar11 = *(byte **)(iVar7 + 0x10);
      uVar10 = *(uint *)(iVar7 + 8);
      iVar13 = *(int *)(iVar7 + 0xc);
      local_10 = pbVar11;
      param_1 = uVar10;
      if (local_1c < iVar8) {
        param_1 = (local_1c - iVar8) + uVar10;
        local_10 = pbVar11 + (iVar8 - local_1c);
        local_1c = iVar8;
      }
      iVar8 = param_1 + local_1c;
      local_8 = iVar8;
      if (local_18 < iVar8) {
        local_8 = local_18;
        param_1 = param_1 + (local_18 - iVar8);
      }
      uVar4 = param_1;
      if (0 < (int)param_1) {
        iVar8 = DAT_00437700 - piVar1[3];
        local_28 = iVar13;
        if (DAT_00437700 - local_24 < iVar8) {
          local_28 = iVar13 + ((DAT_00437700 - iVar8) - local_24);
          local_10 = local_10 + ((iVar8 - DAT_00437700) + local_24) * uVar10;
          iVar8 = DAT_00437700 - local_24;
        }
        local_24 = iVar8 - local_28;
        if (local_24 < DAT_00437700 - local_14) {
          local_28 = local_28 + (local_24 - DAT_00437700) + local_14;
          local_24 = DAT_00437700 - local_14;
        }
        if (0 < local_28) {
          if (*(int *)(iVar7 + 4) == 3) {
            bVar3 = false;
            bVar2 = false;
            for (iVar13 = iVar13 * uVar10; 0 < iVar13; iVar13 = iVar13 + -1) {
              if (*pbVar11 == 0) {
                bVar3 = true;
                if (bVar2) break;
              }
              else {
                if (*pbVar11 == 1) {
                  bVar2 = true;
                  bVar3 = bVar2;
                  break;
                }
                bVar2 = true;
                if (bVar3) break;
              }
              pbVar11 = pbVar11 + 1;
            }
            uVar12 = 2;
            if (bVar2) {
              uVar12 = (uint)bVar3;
            }
            *(uint *)(iVar7 + 4) = uVar12;
          }
          iVar13 = DAT_00437704;
          pbVar11 = (byte *)((DAT_00437700 - iVar8) * DAT_00437704 + DAT_004376e8 + local_1c);
          iVar9 = local_28;
          if (*(int *)(iVar7 + 4) == 0) {
            do {
              pbVar14 = local_10;
              pbVar17 = pbVar11;
              for (uVar12 = param_1 >> 2; uVar12 != 0; uVar12 = uVar12 - 1) {
                *(undefined4 *)pbVar17 = *(undefined4 *)pbVar14;
                pbVar14 = pbVar14 + 4;
                pbVar17 = pbVar17 + 4;
              }
              for (uVar12 = param_1 & 3; uVar12 != 0; uVar12 = uVar12 - 1) {
                *pbVar17 = *pbVar14;
                pbVar14 = pbVar14 + 1;
                pbVar17 = pbVar17 + 1;
              }
              local_10 = local_10 + uVar10;
              pbVar11 = pbVar11 + iVar13;
              iVar9 = iVar9 + -1;
              iVar15 = DAT_00437700;
            } while (iVar9 != 0);
          }
          else {
            iVar15 = DAT_00437700;
            if (*(int *)(iVar7 + 4) == 1) {
              iVar7 = DAT_00437704 - param_1;
              iVar13 = local_28;
              uVar12 = param_1;
              do {
                do {
                  bVar5 = *local_10;
                  if (bVar5 != 0) {
                    if (bVar5 == 1) {
                      bVar5 = *(byte *)((uint)*pbVar11 + DAT_00437074);
                    }
                    *pbVar11 = bVar5;
                    iVar15 = DAT_00437700;
                  }
                  local_10 = local_10 + 1;
                  pbVar11 = pbVar11 + 1;
                  uVar12 = uVar12 - 1;
                } while (uVar12 != 0);
                pbVar11 = pbVar11 + iVar7;
                local_10 = local_10 + (uVar10 - param_1);
                iVar13 = iVar13 + -1;
                uVar12 = param_1;
              } while (iVar13 != 0);
            }
          }
          if ((((char)piVar1[0x17] != '\0') && (2 < (int)param_1)) && (4 < local_28)) {
            if (0.0 < *(double *)(piVar1 + 0x18)) {
              if (*(double *)(piVar1 + 0x18) < 1.0) {
                local_10 = (byte *)FUN_0040a250((double)(int)param_1 * *(double *)(piVar1 + 0x18));
                iVar15 = DAT_00437700;
              }
              else {
                local_10 = (byte *)param_1;
              }
            }
            else {
              local_10 = (byte *)0x0;
            }
            puVar16 = (undefined4 *)((iVar15 - iVar8) * DAT_00437704 + DAT_004376e8 + local_1c);
            puVar18 = puVar16;
            for (uVar10 = param_1 >> 2; uVar10 != 0; uVar10 = uVar10 - 1) {
              *puVar18 = 0xd4d4d4d4;
              puVar18 = puVar18 + 1;
            }
            for (uVar10 = param_1 & 3; uVar10 != 0; uVar10 = uVar10 - 1) {
              *(undefined1 *)puVar18 = 0xd4;
              puVar18 = (undefined4 *)((int)puVar18 + 1);
            }
            local_28 = local_28 + -4;
            puVar16 = (undefined4 *)((int)puVar16 + DAT_00437704);
            if (0 < local_28) {
              do {
                *(undefined1 *)puVar16 = 0xd4;
                *(undefined1 *)((param_1 - 1) + (int)puVar16) = 0xd4;
                puVar16 = (undefined4 *)((int)puVar16 + DAT_00437704);
                local_28 = local_28 + -1;
              } while (local_28 != 0);
            }
            if (*(double *)(piVar1 + 0x18) < 0.5) {
              uVar6 = 0x38;
              if (*(double *)(piVar1 + 0x18) < 0.25) {
                uVar6 = 2;
              }
            }
            else {
              uVar6 = 0x50;
            }
            param_1 = 3;
            do {
              puVar18 = puVar16;
              for (uVar10 = (uint)local_10 >> 2; uVar10 != 0; uVar10 = uVar10 - 1) {
                *puVar18 = CONCAT22(CONCAT11(uVar6,uVar6),CONCAT11(uVar6,uVar6));
                puVar18 = puVar18 + 1;
              }
              for (uVar10 = (uint)local_10 & 3; uVar10 != 0; uVar10 = uVar10 - 1) {
                *(undefined1 *)puVar18 = uVar6;
                puVar18 = (undefined4 *)((int)puVar18 + 1);
              }
              puVar18 = (undefined4 *)((int)puVar16 + (int)local_10);
              for (uVar10 = uVar4 - (int)local_10 >> 2; uVar10 != 0; uVar10 = uVar10 - 1) {
                *puVar18 = 0xdfdfdfdf;
                puVar18 = puVar18 + 1;
              }
              for (uVar10 = uVar4 - (int)local_10 & 3; uVar10 != 0; uVar10 = uVar10 - 1) {
                *(undefined1 *)puVar18 = 0xdf;
                puVar18 = (undefined4 *)((int)puVar18 + 1);
              }
              puVar16 = (undefined4 *)((int)puVar16 + DAT_00437704);
              param_1 = param_1 - 1;
            } while (param_1 != 0);
          }
          if (local_1c < DAT_00437638) {
            DAT_00437638 = local_1c;
          }
          if (DAT_004375dc < local_8) {
            DAT_004375dc = local_8;
          }
          if (local_24 < DAT_0043743c) {
            DAT_0043743c = local_24;
          }
          if (DAT_00437440 < iVar8) {
            DAT_00437440 = iVar8;
          }
        }
      }
    }
  }
  return;
}



/******************************************************************************/
/* TARGET 00419250  FUN_00419250 */
/******************************************************************************/

void __fastcall FUN_00419250(int param_1)

{
  int *piVar1;
  
  piVar1 = (int *)(DAT_00437080 + param_1 * 0x68);
  if (*(char *)(DAT_00437080 + 4 + param_1 * 0x68) != '\0') {
    FUN_00418c80(piVar1[2],piVar1[3],*(int *)(*(int *)(*piVar1 + 0x20) + 8) + piVar1[2],
                 *(int *)(*(int *)(*piVar1 + 0x20) + 0xc) + piVar1[3]);
  }
  return;
}



/******************************************************************************/
/* TARGET 00419290  FUN_00419290 */
/******************************************************************************/

void __fastcall FUN_00419290(int param_1)

{
  int iVar1;
  int iVar2;
  int iVar3;
  int *piVar4;
  double *pdVar5;
  uint uVar6;
  
  piVar4 = (int *)(DAT_00437080 + param_1 * 0x68);
  if (*(char *)(DAT_00437080 + 6 + param_1 * 0x68) == '\0') {
    iVar1 = piVar4[0xe];
    *(undefined1 *)((int)piVar4 + 6) = 1;
    iVar2 = *(int *)(*piVar4 + 0x14);
    iVar3 = piVar4[0xf];
    piVar4 = (int *)(DAT_004373b8 + -4 + DAT_004373bc * 4);
    uVar6 = DAT_004373bc;
    for (pdVar5 = (double *)(DAT_00437458 + -8 + DAT_004373bc * 8);
        ((0 < (int)uVar6 && (*piVar4 <= iVar2)) &&
        ((*piVar4 != iVar2 || ((double)CONCAT44(iVar3,iVar1) < *pdVar5)))); pdVar5 = pdVar5 + -1) {
      piVar4 = piVar4 + -1;
      uVar6 = uVar6 - 1;
    }
    FUN_004018e0(&DAT_004373b8,uVar6,iVar2);
    FUN_00404610(&DAT_00437458,uVar6,CONCAT44(iVar3,iVar1));
    FUN_004018e0(&DAT_00437610,uVar6,param_1);
  }
  return;
}



/******************************************************************************/
/* TARGET 00419350  FUN_00419350 */
/******************************************************************************/

void __fastcall FUN_00419350(int param_1)

{
  uint uVar1;
  int *piVar2;
  
  if (*(char *)(DAT_00437080 + 7 + param_1 * 0x68) != '\0') {
    *(undefined1 *)(DAT_00437080 + param_1 * 0x68 + 7) = 0;
    uVar1 = DAT_004376c4 - 1;
    piVar2 = (int *)(DAT_004376c0 + uVar1 * 4);
    for (; -1 < (int)uVar1; uVar1 = uVar1 - 1) {
      if (*piVar2 == param_1) {
        FUN_004019a0(&DAT_004376c0,uVar1);
      }
      piVar2 = piVar2 + -1;
    }
  }
  return;
}



/******************************************************************************/
/* TARGET 004193a0  FUN_004193a0 */
/******************************************************************************/

int __fastcall FUN_004193a0(int param_1)

{
  int *piVar1;
  char cVar2;
  int iVar3;
  int iVar4;
  
  piVar1 = (int *)(DAT_00437080 + param_1 * 0x68);
  cVar2 = *(char *)(DAT_00437080 + 7 + param_1 * 0x68);
  iVar3 = CONCAT31((int3)((uint)DAT_00437080 >> 8),cVar2);
  if (cVar2 == '\0') {
    iVar3 = 1;
    if (1 < *(int *)(*piVar1 + 0xc)) {
      *(undefined1 *)((int)piVar1 + 7) = 1;
      FUN_004019e0(&DAT_004376c0,param_1);
      iVar3 = piVar1[4];
      if (iVar3 < 1) {
        iVar4 = *(int *)(*piVar1 + 0x10) + 0x16;
        iVar3 = iVar4 * 0x94f2095;
        piVar1[4] = iVar4 / 0x37;
      }
    }
  }
  return iVar3;
}



/******************************************************************************/
/* TARGET 00419400  FUN_00419400 */
/******************************************************************************/

void FUN_00419400(void)

{
  int *piVar1;
  uint uVar2;
  int iVar3;
  
  iVar3 = DAT_00437614;
  while (iVar3 = iVar3 + -1, -1 < iVar3) {
    uVar2 = *(uint *)(DAT_00437610 + iVar3 * 4);
    piVar1 = (int *)(DAT_00437080 + uVar2 * 0x68);
    if (-1 < *(int *)(*piVar1 + 0x14)) {
      *(undefined1 *)((int)piVar1 + 6) = 0;
      FUN_00418d50(uVar2);
    }
  }
  FUN_00401c50(0x437610,DAT_00437614);
  FUN_00401c50(0x4373b8,DAT_004373bc);
  FUN_00401c50(0x437458,DAT_0043745c);
  return;
}



/******************************************************************************/
/* TARGET 00419480  FUN_00419480 */
/******************************************************************************/

void FUN_00419480(void)

{
  int *piVar1;
  uint uVar2;
  int iVar3;
  
  iVar3 = DAT_00437614;
  while (iVar3 = iVar3 + -1, -1 < iVar3) {
    uVar2 = *(uint *)(DAT_00437610 + iVar3 * 4);
    piVar1 = (int *)(DAT_00437080 + uVar2 * 0x68);
    if (*(int *)(*piVar1 + 0x14) < 0) {
      *(undefined1 *)((int)piVar1 + 6) = 0;
      FUN_00418d50(uVar2);
    }
  }
  return;
}



/******************************************************************************/
/* TARGET 004194d0  FUN_004194d0 */
/******************************************************************************/

void __cdecl FUN_004194d0(int param_1,int param_2,int param_3,int param_4,int param_5)

{
  int iVar1;
  double dVar2;
  double dVar3;
  double dVar4;
  int iVar5;
  int iVar6;
  int *piVar7;
  int iVar8;
  int *piVar9;
  uint uVar10;
  float10 fVar11;
  int local_2c;
  
  piVar9 = (int *)(DAT_00437080 + param_1 * 0x68);
  piVar9[8] = param_2;
  piVar9[10] = param_4;
  piVar9[9] = param_3;
  piVar9[0xb] = param_5;
  iVar5 = FUN_0040a250((double)CONCAT44(param_3,param_2) * 32.0);
  iVar6 = FUN_0040a250((double)CONCAT44(param_5,param_4) * 32.0);
  if ((char)piVar9[1] == '\0') {
    piVar9[0xc] = param_2;
    piVar9[0xd] = param_3;
    piVar9[0xe] = param_4;
    piVar9[0xf] = param_5;
    piVar9[2] = iVar5;
    piVar9[3] = iVar6;
    return;
  }
  if ((iVar5 != piVar9[2]) || (iVar6 != piVar9[3])) {
    FUN_00419350(param_1);
    dVar2 = (double)CONCAT44(param_3,param_2) - *(double *)(piVar9 + 0xc);
    dVar3 = (double)CONCAT44(param_5,param_4) - *(double *)(piVar9 + 0xe);
    dVar4 = 6.283185307179586 / (double)*(int *)(*piVar9 + 8);
    fVar11 = (float10)fpatan((float10)dVar3,(float10)dVar2);
    iVar8 = FUN_0040a250((double)(fVar11 / (float10)dVar4));
    iVar1 = *(int *)(*piVar9 + 8);
    for (; iVar1 <= iVar8; iVar8 = iVar8 - iVar1) {
    }
    for (; iVar8 < 0; iVar8 = iVar8 + iVar1) {
    }
    piVar9[7] = iVar8;
    *(double *)(piVar9 + 0x14) = (double)iVar8 * dVar4;
    if (*(char *)((int)piVar9 + 5) == '\0') {
      *(undefined1 *)((int)piVar9 + 5) = 1;
      piVar9[4] = 1;
      FUN_004019e0(&DAT_004375d0,param_1);
    }
    iVar1 = *piVar9;
    iVar8 = *(int *)(iVar1 + 0xc);
    if ((piVar9[6] < iVar8) && (iVar8 < *(int *)(iVar1 + 4))) {
      piVar9[6] = iVar8 + -1;
    }
    local_2c = FUN_0040a250(SQRT(dVar2 * dVar2 + dVar3 * dVar3) * *(double *)(iVar1 + 0x18));
    piVar9[5] = local_2c;
    if ((local_2c == 0) && (local_2c = 1, *(double *)(*piVar9 + 0x18) == 0.0)) {
      FUN_00419250(param_1);
      piVar9[0xc] = param_2;
      piVar9[0xd] = param_3;
      piVar9[0xe] = param_4;
      piVar9[5] = -1;
      piVar9[0xf] = param_5;
      piVar9[2] = iVar5;
      piVar9[3] = iVar6;
      *(undefined1 *)((int)piVar9 + 5) = 0;
      uVar10 = DAT_004375d4 - 1;
      if (-1 < (int)uVar10) {
        piVar9 = (int *)(DAT_004375d0 + uVar10 * 4);
        while (*piVar9 != param_1) {
          uVar10 = uVar10 - 1;
          piVar9 = piVar9 + -1;
          if ((int)uVar10 < 0) {
            FUN_00419290(param_1);
            FUN_004193a0(param_1);
            return;
          }
        }
        FUN_004019a0(&DAT_004375d0,uVar10);
      }
      FUN_00419290(param_1);
      FUN_004193a0(param_1);
      return;
    }
    *(double *)(piVar9 + 0x10) = dVar2 / (double)local_2c;
    *(double *)(piVar9 + 0x12) = dVar3 / (double)local_2c;
    return;
  }
  FUN_00419250(param_1);
  piVar9[0xc] = param_2;
  piVar9[0xe] = param_4;
  piVar9[0xf] = param_5;
  piVar9[0xd] = param_3;
  if (*(char *)((int)piVar9 + 5) != '\0') {
    piVar9[5] = -1;
    *(undefined1 *)((int)piVar9 + 5) = 0;
    uVar10 = DAT_004375d4 - 1;
    if (-1 < (int)uVar10) {
      piVar7 = (int *)(DAT_004375d0 + uVar10 * 4);
      do {
        if (*piVar7 == param_1) {
          FUN_004019a0(&DAT_004375d0,uVar10);
          break;
        }
        uVar10 = uVar10 - 1;
        piVar7 = piVar7 + -1;
      } while (-1 < (int)uVar10);
    }
  }
  if (*(int *)(*piVar9 + 0xc) == 1) {
    piVar9[6] = 0;
  }
  FUN_00419290(param_1);
  FUN_004193a0(param_1);
  return;
}



/******************************************************************************/
/* TARGET 004197a0  FUN_004197a0 */
/******************************************************************************/

void __cdecl FUN_004197a0(int param_1,double param_2)

{
  int iVar1;
  int iVar2;
  int iVar3;
  
  iVar2 = *(int *)(*(int *)(DAT_00437080 + param_1 * 0x68) + 8);
  iVar1 = DAT_00437080 + param_1 * 0x68;
  for (iVar3 = FUN_0040a250(param_2 / (6.283185307179586 / (double)iVar2)); iVar2 <= iVar3;
      iVar3 = iVar3 - iVar2) {
  }
  for (; iVar3 < 0; iVar3 = iVar3 + iVar2) {
  }
  if (*(int *)(iVar1 + 0x1c) != iVar3) {
    *(int *)(iVar1 + 0x1c) = iVar3;
    *(double *)(iVar1 + 0x50) = (double)iVar3 * (6.283185307179586 / (double)iVar2);
    FUN_00419250(param_1);
  }
  return;
}



/******************************************************************************/
/* TARGET 00419830  FUN_00419830 */
/******************************************************************************/

void __cdecl FUN_00419830(int param_1,char param_2)

{
  int *piVar1;
  int iVar2;
  int *piVar3;
  int iVar4;
  uint uVar5;
  
  piVar1 = (int *)(DAT_00437080 + param_1 * 0x68);
  if (*(char *)(DAT_00437080 + 4 + param_1 * 0x68) != param_2) {
    if (param_2 != '\0') {
      *(undefined1 *)(piVar1 + 1) = 1;
      FUN_004019e0(&DAT_00437428,param_1);
      FUN_004193a0(param_1);
      FUN_00419250(param_1);
      return;
    }
    FUN_00419250(param_1);
    *(undefined1 *)(piVar1 + 1) = 0;
    uVar5 = DAT_0043742c - 1;
    if (-1 < (int)uVar5) {
      piVar3 = (int *)(DAT_00437428 + uVar5 * 4);
      do {
        if (*piVar3 == param_1) {
          FUN_004019a0(&DAT_00437428,uVar5);
          break;
        }
        uVar5 = uVar5 - 1;
        piVar3 = piVar3 + -1;
      } while (-1 < (int)uVar5);
    }
    FUN_00419350(param_1);
    if (*(char *)((int)piVar1 + 5) != '\0') {
      *(double *)(piVar1 + 0xc) = *(double *)(piVar1 + 8);
      piVar1[5] = -1;
      iVar2 = FUN_0040a250(*(double *)(piVar1 + 8) * 32.0);
      *(double *)(piVar1 + 0xe) = *(double *)(piVar1 + 10);
      piVar1[2] = iVar2;
      iVar2 = FUN_0040a250(*(double *)(piVar1 + 10) * 32.0);
      piVar1[3] = iVar2;
      *(undefined1 *)((int)piVar1 + 5) = 0;
      uVar5 = DAT_004375d4 - 1;
      if (-1 < (int)uVar5) {
        piVar3 = (int *)(DAT_004375d0 + uVar5 * 4);
        do {
          if (*piVar3 == param_1) {
            FUN_004019a0(&DAT_004375d0,uVar5);
            break;
          }
          uVar5 = uVar5 - 1;
          piVar3 = piVar3 + -1;
        } while (-1 < (int)uVar5);
      }
    }
    iVar2 = *(int *)(*piVar1 + 0xc);
    if (iVar2 <= piVar1[6]) {
      do {
        iVar4 = piVar1[6] - iVar2;
        piVar1[6] = iVar4;
        iVar2 = *(int *)(*piVar1 + 0xc);
      } while (iVar2 <= iVar4);
    }
  }
  return;
}



/******************************************************************************/
/* TARGET 00419950  FUN_00419950 */
/******************************************************************************/

void __cdecl FUN_00419950(int param_1,int *param_2)

{
  int *this;
  int iVar1;
  
  iVar1 = *(int *)(DAT_00437080 + param_1 * 0x68);
  this = (int *)(DAT_00437080 + param_1 * 0x68);
  if (*param_2 != iVar1) {
    if ((char)this[1] != '\0') {
      if ((1 < *(int *)(iVar1 + 0xc)) && (*(int *)(*param_2 + 0xc) == 1)) {
        FUN_00419350(param_1);
      }
      FUN_00419250(param_1);
    }
    iVar1 = this[6];
    if (iVar1 < *(int *)(*this + 0xc)) {
      if (*(int *)(*param_2 + 0xc) <= iVar1) {
        this[6] = 0;
      }
    }
    else {
      iVar1 = iVar1 + (*(int *)(*param_2 + 0xc) - *(int *)(*this + 0xc));
      this[6] = iVar1;
      if (*(int *)(*param_2 + 4) <= iVar1) {
        this[6] = *(int *)(*param_2 + 0xc);
      }
    }
    FUN_00406220(this,param_2);
    if (*(int *)(*this + 4) <= this[6]) {
      this[6] = 0;
    }
    FUN_004197a0(param_1,*(double *)(this + 0x14));
    if ((char)this[1] != '\0') {
      FUN_004193a0(param_1);
    }
  }
  return;
}



/******************************************************************************/
/* TARGET 00419a10  FUN_00419a10 */
/******************************************************************************/

void __cdecl FUN_00419a10(int param_1,int param_2)

{
  int *piVar1;
  ushort uVar2;
  undefined1 uVar3;
  bool bVar4;
  int iVar5;
  byte bVar6;
  byte bVar7;
  int iVar8;
  uint uVar9;
  ushort *puVar10;
  int iVar11;
  int iVar12;
  byte *pbVar13;
  ushort *puVar14;
  int local_8;
  
  piVar1 = (int *)(*DAT_004371f0 + 0xc + (*(int *)(*DAT_004371f0 + 4) * param_2 + param_1) * 8);
  FUN_004010e0(piVar1);
  iVar11 = DAT_00437704;
  iVar5 = DAT_00437074;
  iVar12 = *piVar1;
  puVar10 = *(ushort **)(iVar12 + 0x14);
  pbVar13 = (byte *)(param_1 * 0x20 + DAT_004376e8 + DAT_00437708 * param_2);
  iVar8 = *(int *)(iVar12 + 4);
  if (iVar8 == 0) {
    iVar12 = 0x20;
    do {
      *(undefined4 *)pbVar13 = *(undefined4 *)puVar10;
      *(undefined4 *)(pbVar13 + 4) = *(undefined4 *)(puVar10 + 2);
      *(undefined4 *)(pbVar13 + 8) = *(undefined4 *)(puVar10 + 4);
      *(undefined4 *)(pbVar13 + 0xc) = *(undefined4 *)(puVar10 + 6);
      *(undefined4 *)(pbVar13 + 0x10) = *(undefined4 *)(puVar10 + 8);
      *(undefined4 *)(pbVar13 + 0x14) = *(undefined4 *)(puVar10 + 10);
      puVar14 = puVar10 + 0xe;
      *(undefined4 *)(pbVar13 + 0x18) = *(undefined4 *)(puVar10 + 0xc);
      puVar10 = puVar10 + 0x10;
      *(undefined4 *)(pbVar13 + 0x1c) = *(undefined4 *)puVar14;
      pbVar13 = pbVar13 + iVar11;
      iVar12 = iVar12 + -1;
    } while (iVar12 != 0);
  }
  else {
    if (iVar8 == 1) {
      iVar12 = DAT_00437704 + -0x20;
      iVar8 = 0x20;
      do {
        iVar11 = 0x10;
        puVar14 = puVar10;
        do {
          puVar10 = puVar14 + 1;
          uVar2 = *puVar14;
          uVar9 = (uint)uVar2;
          if ((char)uVar2 != '\0') {
            if ((char)uVar2 == '\x01') {
              uVar3 = (undefined1)(uVar2 >> 8);
              uVar9 = (uint)CONCAT11(uVar3,*(undefined1 *)
                                            (iVar5 + (CONCAT11(uVar3,*pbVar13) & 0xff)));
            }
            *pbVar13 = (byte)uVar9;
          }
          bVar7 = (byte)(uVar9 >> 8);
          if (bVar7 != 0) {
            if (bVar7 == 1) {
              bVar7 = *(byte *)(iVar5 + (uint)pbVar13[1]);
            }
            pbVar13[1] = bVar7;
          }
          pbVar13 = pbVar13 + 2;
          iVar11 = iVar11 + -1;
          puVar14 = puVar10;
        } while (iVar11 != 0);
        pbVar13 = pbVar13 + iVar12;
        iVar8 = iVar8 + -1;
      } while (iVar8 != 0);
      return;
    }
    if (iVar8 != 2) {
      bVar7 = 0;
      bVar4 = false;
      iVar8 = DAT_00437704 + -0x20;
      local_8 = 0x20;
      do {
        param_1 = 0x20;
        do {
          bVar6 = (byte)*puVar10;
          if (bVar6 == 0) {
            bVar7 = 1;
          }
          else {
            if (bVar6 == 1) {
              bVar6 = *(byte *)((uint)*pbVar13 + DAT_00437074);
              bVar7 = 1;
            }
            *pbVar13 = bVar6;
            bVar4 = true;
          }
          puVar10 = (ushort *)((int)puVar10 + 1);
          pbVar13 = pbVar13 + 1;
          param_1 = param_1 + -1;
        } while (param_1 != 0);
        pbVar13 = pbVar13 + iVar8;
        local_8 = local_8 + -1;
      } while (local_8 != 0);
      uVar9 = 2;
      if (bVar4) {
        uVar9 = (uint)bVar7;
      }
      *(uint *)(iVar12 + 4) = uVar9;
      return;
    }
  }
  return;
}



/******************************************************************************/
/* TARGET 00419b60  FUN_00419b60 */
/******************************************************************************/

void __cdecl FUN_00419b60(int param_1,int param_2)

{
  int *piVar1;
  int iVar2;
  int iVar3;
  undefined4 *puVar4;
  undefined4 *puVar5;
  
  iVar2 = DAT_00437704;
  iVar3 = DAT_00437708 * param_2 + param_1 * 0x20;
  puVar4 = (undefined4 *)(DAT_004376e4 + iVar3);
  puVar5 = (undefined4 *)(DAT_004376e8 + iVar3);
  piVar1 = (int *)(*DAT_004371f0 + 0xc + (*(int *)(*DAT_004371f0 + 4) * param_2 + param_1) * 8);
  FUN_004010e0(piVar1);
  if (*(int *)(*piVar1 + 4) != 0) {
    iVar3 = 0x20;
    do {
      *puVar5 = *puVar4;
      puVar5[1] = puVar4[1];
      puVar5[2] = puVar4[2];
      puVar5[3] = puVar4[3];
      puVar5[4] = puVar4[4];
      puVar5[5] = puVar4[5];
      puVar5[6] = puVar4[6];
      puVar5[7] = puVar4[7];
      puVar5 = (undefined4 *)((int)puVar5 + iVar2);
      puVar4 = (undefined4 *)((int)puVar4 + iVar2);
      iVar3 = iVar3 + -1;
    } while (iVar3 != 0);
  }
  return;
}



/******************************************************************************/
/* TARGET 00419bf0  FUN_00419bf0 */
/******************************************************************************/

void FUN_00419bf0(void)

{
  int iVar1;
  int iVar2;
  char *pcVar3;
  
  pcVar3 = (char *)(DAT_004376f8 * DAT_004376f4 + -1 + DAT_00437644);
  iVar2 = DAT_004376f8;
  while (iVar2 = iVar2 + -1, iVar1 = DAT_004376f4, -1 < iVar2) {
    while (iVar1 = iVar1 + -1, -1 < iVar1) {
      if (*pcVar3 != '\0') {
        *pcVar3 = '\0';
        FUN_00419a10(iVar1,iVar2);
      }
      pcVar3 = pcVar3 + -1;
    }
  }
  return;
}



/******************************************************************************/
/* TARGET 00419c40  FUN_00419c40 */
/******************************************************************************/

void FUN_00419c40(void)

{
  int iVar1;
  int iVar2;
  char *pcVar3;
  
  pcVar3 = (char *)(DAT_004376f8 * DAT_004376f4 + -1 + DAT_00437644);
  iVar2 = DAT_004376f8;
  while (iVar2 = iVar2 + -1, iVar1 = DAT_004376f4, -1 < iVar2) {
    while (iVar1 = iVar1 + -1, -1 < iVar1) {
      if (*pcVar3 != '\0') {
        FUN_00419b60(iVar1,iVar2);
      }
      pcVar3 = pcVar3 + -1;
    }
  }
  return;
}



/******************************************************************************/
/* TARGET 00419c90  FUN_00419c90 */
/******************************************************************************/

void __cdecl FUN_00419c90(int param_1,int param_2)

{
  int *piVar1;
  int iVar2;
  int iVar3;
  int iVar4;
  int iVar5;
  int iVar6;
  int iVar7;
  int iVar8;
  int iVar9;
  int iVar10;
  
  iVar9 = DAT_00437700 + param_2 * -0x20;
  iVar7 = param_1 * 0x20;
  if (iVar7 < DAT_00437638) {
    DAT_00437638 = iVar7;
  }
  if (DAT_004375dc < iVar7 + 0x20) {
    DAT_004375dc = iVar7 + 0x20;
  }
  if (DAT_00437440 < iVar9) {
    DAT_00437440 = iVar9;
  }
  iVar3 = DAT_0043742c;
  if (iVar9 + -0x20 < DAT_0043743c) {
    DAT_0043743c = iVar9 + -0x20;
  }
  while (iVar3 = iVar3 + -1, -1 < iVar3) {
    iVar4 = *(int *)(DAT_00437428 + iVar3 * 4);
    piVar1 = (int *)(DAT_00437080 + iVar4 * 0x68);
    if ((((piVar1[2] < iVar7 + 0x20) && (iVar7 < *(int *)(*(int *)(*piVar1 + 0x20) + 8) + piVar1[2])
         ) && (piVar1[3] < DAT_00437700 - (iVar9 + -0x20))) &&
       ((DAT_00437700 - iVar9 < *(int *)(*(int *)(*piVar1 + 0x20) + 0xc) + piVar1[3] &&
        (*(char *)((int)piVar1 + 6) == '\0')))) {
      FUN_00419290(iVar4);
      iVar4 = piVar1[2];
      param_1 = (int)(iVar4 + (iVar4 >> 0x1f & 0x1fU)) >> 5;
      if (param_1 < 0) {
        param_1 = 0;
      }
      iVar4 = *(int *)(*(int *)(*piVar1 + 0x20) + 8) + iVar4;
      iVar4 = ((int)(iVar4 + (iVar4 >> 0x1f & 0x1fU)) >> 5) + 1;
      if (DAT_004376f4 < iVar4) {
        iVar4 = DAT_004376f4;
      }
      if (param_1 < iVar4) {
        iVar5 = piVar1[3];
        iVar10 = (int)(iVar5 + (iVar5 >> 0x1f & 0x1fU)) >> 5;
        if (iVar10 < 0) {
          iVar10 = 0;
        }
        iVar5 = *(int *)(*(int *)(*piVar1 + 0x20) + 0xc) + iVar5;
        iVar8 = ((int)(iVar5 + (iVar5 >> 0x1f & 0x1fU)) >> 5) + 1;
        iVar5 = DAT_004376f4;
        if (DAT_004376f8 < iVar8) {
          iVar8 = DAT_004376f8;
        }
        for (; iVar2 = param_1, iVar10 < iVar8; iVar10 = iVar10 + 1) {
          for (; iVar2 < iVar4; iVar2 = iVar2 + 1) {
            iVar6 = iVar5 * iVar10 + DAT_00437644;
            if (*(char *)(iVar6 + iVar2) == '\0') {
              *(undefined1 *)(iVar6 + iVar2) = 1;
              FUN_00419c90(iVar2,iVar10);
              iVar5 = DAT_004376f4;
            }
          }
        }
      }
    }
  }
  return;
}



/******************************************************************************/
/* TARGET 00419e60  FUN_00419e60 */
/******************************************************************************/

void FUN_00419e60(void)

{
  int iVar1;
  int iVar2;
  char *pcVar3;
  
  pcVar3 = (char *)(DAT_004376f8 * DAT_004376f4 + -1 + DAT_00437644);
  iVar2 = DAT_004376f8;
  while (iVar2 = iVar2 + -1, iVar1 = DAT_004376f4, -1 < iVar2) {
    while (iVar1 = iVar1 + -1, -1 < iVar1) {
      if (*pcVar3 != '\0') {
        FUN_00419c90(iVar1,iVar2);
      }
      pcVar3 = pcVar3 + -1;
    }
  }
  return;
}



/******************************************************************************/
/* TARGET 00419eb0  FUN_00419eb0 */
/******************************************************************************/

void __cdecl FUN_00419eb0(int param_1,int param_2,int param_3,int param_4)

{
  int iVar1;
  BITMAPINFO *pBVar2;
  BITMAPINFO local_2c;
  
  if ((0 < param_3) && (0 < param_4)) {
    if (DAT_0043770d == '\0') {
      (DAT_00437118->bmiHeader).biHeight = param_4;
      pBVar2 = DAT_00437118;
    }
    else {
      pBVar2 = &local_2c;
      for (iVar1 = 0xb; iVar1 != 0; iVar1 = iVar1 + -1) {
        (pBVar2->bmiHeader).biSize = 0;
        pBVar2 = (BITMAPINFO *)&(pBVar2->bmiHeader).biWidth;
      }
      local_2c.bmiHeader.biSize = 0x28;
      local_2c.bmiHeader.biWidth = (DAT_00437118->bmiHeader).biWidth;
      local_2c.bmiHeader.biHeight = param_4;
      local_2c.bmiHeader.biPlanes = 1;
      local_2c.bmiHeader.biBitCount = 0x20;
      local_2c.bmiHeader.biCompression = 0;
      pBVar2 = &local_2c;
    }
    StretchDIBits(DAT_004377fc,param_1,param_2,param_3,param_4,param_1 - DAT_00437804,0,param_3,
                  param_4,(void *)((((DAT_00437808 - param_2) - param_4) + DAT_0043780c) *
                                   DAT_00437810 + DAT_00437800),pBVar2,0,0xcc0020);
  }
  return;
}



/******************************************************************************/
/* TARGET 00419f90  FUN_00419f90 */
/******************************************************************************/

void __cdecl FUN_00419f90(int param_1,int param_2,int param_3,int param_4)

{
  undefined4 *puVar1;
  HWND hWnd;
  int iVar2;
  int iVar3;
  int iVar4;
  int iVar5;
  int iVar6;
  undefined1 local_10 [12];
  int local_4;
  
  if (DAT_004377eb == '\0') {
    FUN_00419eb0(param_1,param_2,param_3,param_4);
    return;
  }
  if ((0 < param_3) && (0 < param_4)) {
    DAT_00437814 = DAT_00437814 + 1;
    if ((int)DAT_00437814 < (int)DAT_00437244) {
      puVar1 = (undefined4 *)(DAT_00437238 + DAT_00437814 * 0xac);
      if ((((DAT_00437814 < DAT_00437244) && (*(char *)(DAT_0043723c + DAT_00437814) != '\0')) &&
          (puVar1[1] == 0)) &&
         ((iVar4 = puVar1[2], iVar4 != 0xc && (*(char *)((int)puVar1 + 0x42) != '\0')))) {
        if (((iVar4 == 0xf) || ((iVar4 == 0x10 || (iVar4 == 0)))) ||
           (iVar2 = puVar1[0xb] + puVar1[9], iVar3 = puVar1[10], iVar5 = puVar1[0xc] + puVar1[10],
           iVar6 = puVar1[9], iVar4 == 1)) {
          GetWindowRect((HWND)*puVar1,(LPRECT)local_10);
          hWnd = *(HWND *)(DAT_00437238 + puVar1[1] * 0xac);
          ScreenToClient(hWnd,(LPPOINT)local_10);
          ScreenToClient(hWnd,(LPPOINT)(local_10 + 8));
          iVar2 = local_10._8_4_;
          iVar3 = local_10._4_4_;
          iVar5 = local_4;
          iVar6 = local_10._0_4_;
        }
        iVar4 = param_4 + param_2;
        if ((((iVar6 < param_3 + param_1) && (param_1 < iVar2)) && (param_2 < iVar5)) &&
           (iVar3 < iVar4)) {
          FUN_00419f90(param_1,param_2,param_3,iVar3 - param_2);
          FUN_00419f90(param_1,iVar5,param_3,iVar4 - iVar5);
          if (param_2 < iVar3) {
            param_2 = iVar3;
          }
          if (iVar5 < iVar4) {
            iVar4 = iVar5;
          }
          FUN_00419f90(param_1,param_2,iVar6 - param_1,iVar4 - param_2);
          FUN_00419f90(iVar2,param_2,(param_3 + param_1) - iVar2,iVar4 - param_2);
          DAT_00437814 = DAT_00437814 - 1;
          return;
        }
      }
      FUN_00419f90(param_1,param_2,param_3,param_4);
    }
    else {
      FUN_00419eb0(param_1,param_2,param_3,param_4);
    }
    DAT_00437814 = DAT_00437814 - 1;
  }
  return;
}



/******************************************************************************/
/* TARGET 0041a1b0  FUN_0041a1b0 */
/******************************************************************************/

void FUN_0041a1b0(void)

{
  int *piVar1;
  byte *pbVar2;
  byte *pbVar3;
  byte *pbVar4;
  byte bVar5;
  byte bVar6;
  byte bVar7;
  byte bVar8;
  byte bVar9;
  byte bVar10;
  byte bVar11;
  byte bVar12;
  int iVar13;
  char *pcVar14;
  int iVar15;
  HPALETTE hPal;
  undefined1 *puVar16;
  uint uVar17;
  byte *pbVar18;
  uint uVar19;
  undefined1 *puVar20;
  int iVar21;
  int local_28;
  int local_24;
  uint local_20;
  int local_1c;
  uint local_18;
  int local_10;
  
  if (DAT_004377e8 != '\0') {
    if (DAT_00437738 != '\0') {
      DAT_00437738 = '\0';
      pcVar14 = FUN_00406860((int *)&DAT_004373c4,'\r');
      if (-1 < (int)pcVar14) {
        FUN_00406c00(&DAT_004373c4,(uint)pcVar14,0x7fffffff);
      }
      FUN_0040b340((int *)&DAT_004373c4);
    }
    DAT_004368e4 = 4;
    return;
  }
  if (DAT_0043730c != '\0') {
    if ((DAT_004377eb == '\0') || (DAT_004377ea != '\0')) {
      FUN_00419e60();
      FUN_00419c40();
      FUN_00419480();
      FUN_00419bf0();
      FUN_00419400();
    }
    if (DAT_00437738 != '\0') {
      DAT_00437738 = '\0';
      pcVar14 = FUN_00406860((int *)&DAT_004373c4,'\r');
      if (-1 < (int)pcVar14) {
        FUN_00406c00(&DAT_004373c4,(uint)pcVar14,0x7fffffff);
      }
      FUN_0040b340((int *)&DAT_004373c4);
    }
    if (DAT_00437739 != '\0') {
      DAT_00437739 = '\0';
      pcVar14 = FUN_00406860(&DAT_00437634,'\r');
      if (-1 < (int)pcVar14) {
        FUN_00406c00(&DAT_00437634,(uint)pcVar14,0x7fffffff);
      }
      if ((*(int *)(DAT_00437634 + 4) == 0) || (DAT_004372ea != '\0')) {
        FUN_0040b230('\0');
      }
      FUN_0040b1f0(&DAT_00437634);
      if ((*(int *)(DAT_00437634 + 4) != 0) && (DAT_004372ea == '\0')) {
        FUN_0040b230('\x01');
      }
    }
    if ((((int)DAT_00437638 < DAT_004375dc) && (DAT_0043743c < DAT_00437440)) &&
       ((DAT_004377eb == '\0' || (DAT_004377ea != '\0')))) {
      uVar17 = DAT_004375dc - DAT_00437638;
      iVar15 = DAT_00437440 - DAT_0043743c;
      DAT_004377fc = GetDC(DAT_00437308);
      hPal = SelectPalette(DAT_004377fc,DAT_00437274,0);
      RealizePalette(DAT_004377fc);
      SetStretchBltMode(DAT_004377fc,3);
      DAT_00437800 = DAT_004376e8;
      DAT_00437804 = DAT_00437728;
      DAT_00437808 = DAT_0043772c;
      DAT_0043780c = DAT_00437700;
      DAT_00437810 = DAT_004376fc;
      uVar19 = DAT_004376fc;
      local_24 = DAT_0043743c;
      local_20 = DAT_00437638;
      if (DAT_0043770c != '\0') {
        local_20 = 0;
        if (0 < (int)DAT_00437638) {
          local_20 = *(uint *)(DAT_00437718 + -4 + DAT_00437638 * 4);
        }
        local_24 = 0;
        if (0 < DAT_0043743c) {
          local_24 = *(int *)(DAT_0043771c + -4 + DAT_0043743c * 4);
        }
        iVar15 = DAT_004368bc;
        if (DAT_004375dc < (int)(DAT_004376fc - 1)) {
          iVar15 = *(int *)(DAT_00437718 + 4 + DAT_004375dc * 4);
        }
        uVar19 = iVar15 - local_20;
        iVar15 = DAT_004368c0;
        if (DAT_00437440 < DAT_00437700 + -1) {
          iVar15 = *(int *)(DAT_0043771c + 4 + DAT_00437440 * 4);
        }
        iVar15 = iVar15 - local_24;
        if ((0 < (int)uVar19) && (0 < iVar15)) {
          if (DAT_0043770d == '\0') {
            DAT_00437810 = uVar19 + 3 & 0xfffffffc;
          }
          else {
            DAT_00437810 = uVar19 * 4;
          }
          puVar20 = (undefined1 *)((iVar15 + -1) * DAT_00437810 + DAT_00437710);
          if (0 < iVar15) {
            local_1c = local_24 * 4;
            local_10 = iVar15;
            do {
              iVar21 = *(int *)(local_1c + DAT_00437724) + DAT_004376e8;
              local_28 = local_20 * 4;
              puVar16 = puVar20;
              local_18 = uVar19;
              if (DAT_0043770d == '\0') {
                do {
                  piVar1 = (int *)(local_28 + DAT_00437720);
                  local_28 = local_28 + 4;
                  *puVar16 = *(undefined1 *)(*piVar1 + iVar21);
                  local_18 = local_18 - 1;
                  puVar16 = puVar16 + 1;
                } while (local_18 != 0);
              }
              else {
                do {
                  iVar13 = *(int *)(local_28 + DAT_00437720);
                  bVar5 = *(byte *)(DAT_00437118 + 0x2a + (uint)*(byte *)(iVar13 + iVar21) * 4);
                  pbVar2 = (byte *)(DAT_00437118 + 0x28 + (uint)*(byte *)(iVar13 + iVar21) * 4);
                  bVar6 = pbVar2[1];
                  uVar17 = (uint)*(byte *)(iVar21 + 1 + iVar13);
                  bVar7 = *(byte *)(DAT_00437118 + 0x2a + uVar17 * 4);
                  pbVar3 = (byte *)(DAT_00437118 + 0x28 + uVar17 * 4);
                  bVar8 = pbVar3[1];
                  pbVar18 = (byte *)((iVar13 - DAT_004376fc) + iVar21);
                  uVar17 = (uint)*pbVar18;
                  bVar9 = *(byte *)(DAT_00437118 + 0x2a + uVar17 * 4);
                  pbVar4 = (byte *)(DAT_00437118 + 0x28 + uVar17 * 4);
                  bVar10 = pbVar4[1];
                  uVar17 = (uint)pbVar18[1];
                  bVar11 = *(byte *)(DAT_00437118 + 0x2a + uVar17 * 4);
                  pbVar18 = (byte *)(DAT_00437118 + 0x28 + uVar17 * 4);
                  bVar12 = pbVar18[1];
                  *puVar16 = (char)((int)((uint)*pbVar18 +
                                         (uint)*pbVar2 + (uint)*pbVar3 + (uint)*pbVar4) >> 2);
                  puVar16[1] = (char)((int)((uint)bVar6 + (uint)bVar8 + (uint)bVar10 + (uint)bVar12)
                                     >> 2);
                  puVar16[2] = (char)((int)((uint)bVar5 + (uint)bVar7 + (uint)bVar9 + (uint)bVar11)
                                     >> 2);
                  local_28 = local_28 + 4;
                  puVar16[3] = 0;
                  puVar16 = puVar16 + 4;
                  local_18 = local_18 - 1;
                } while (local_18 != 0);
              }
              puVar20 = puVar20 + -DAT_00437810;
              local_1c = local_1c + 4;
              local_10 = local_10 + -1;
            } while (local_10 != 0);
          }
        }
        DAT_00437800 = DAT_00437710;
        DAT_00437804 = DAT_00437728 + local_20;
        DAT_00437808 = DAT_0043772c + local_24;
        uVar17 = uVar19;
        DAT_0043780c = iVar15;
      }
      *(uint *)(DAT_00437118 + 4) = uVar19;
      DAT_00437814 = 0;
      FUN_00419f90(DAT_00437728 + local_20,DAT_0043772c + local_24,uVar17,iVar15);
      if (DAT_004377fc != (HDC)0x0) {
        if (hPal != (HPALETTE)0x0) {
          SelectPalette(DAT_004377fc,hPal,0);
        }
        ReleaseDC(DAT_00437308,DAT_004377fc);
      }
      DAT_00437638 = DAT_004376fc;
      DAT_0043743c = DAT_00437700;
      DAT_004375dc = 0;
      DAT_00437440 = 0;
    }
    DAT_004368e4 = 4;
    return;
  }
  FUN_0040a750();
  return;
}



/******************************************************************************/
/* TARGET 0041a6f0  FUN_0041a6f0 */
/******************************************************************************/

void __fastcall FUN_0041a6f0(undefined4 *param_1,int param_2)

{
  HWND hWnd;
  undefined4 *puVar1;
  uint uVar2;
  tagPAINTSTRUCT local_40;
  
  BeginPaint((HWND)*param_1,&local_40);
  EndPaint((HWND)*param_1,&local_40);
  FUN_0041aa00(param_1);
  if ((DAT_004377eb != '\0') || (param_1 != DAT_00437238)) {
    uVar2 = DAT_00437244 - 1;
    puVar1 = DAT_00437238 + uVar2 * 0x2b;
    for (; -1 < (int)uVar2; uVar2 = uVar2 - 1) {
      if ((((uVar2 < DAT_00437244) && (*(char *)(DAT_0043723c + uVar2) != '\0')) &&
          (puVar1[2] == 0xc)) && (puVar1[1] == param_2)) {
        hWnd = (HWND)*puVar1;
        InvalidateRect(hWnd,(RECT *)0x0,0);
        UpdateWindow(hWnd);
      }
      puVar1 = puVar1 + -0x2b;
    }
  }
  return;
}



/******************************************************************************/
/* TARGET 0041a7a0  FUN_0041a7a0 */
/******************************************************************************/

void __cdecl FUN_0041a7a0(RECT *param_1)

{
  if ((param_1->left < param_1->right) && (param_1->top < param_1->bottom)) {
    FillRect(DAT_00437818,param_1,DAT_0043781c);
  }
  return;
}



/******************************************************************************/
/* TARGET 0041a7d0  FUN_0041a7d0 */
/******************************************************************************/

void __cdecl FUN_0041a7d0(RECT *param_1)

{
  undefined4 *puVar1;
  int iVar2;
  HWND hWnd;
  RECT local_20;
  undefined1 local_10 [12];
  int local_4;
  
  if (DAT_004377eb == '\0') {
    FUN_0041a7a0(param_1);
  }
  if ((param_1->left < param_1->right) && (param_1->top < param_1->bottom)) {
    DAT_00437820 = DAT_00437820 + 1;
    if ((int)DAT_00437820 < (int)DAT_00437244) {
      puVar1 = (undefined4 *)(DAT_00437238 + DAT_00437820 * 0xac);
      if ((((DAT_00437820 < DAT_00437244) && (*(char *)(DAT_0043723c + DAT_00437820) != '\0')) &&
          (puVar1[1] == 0)) &&
         ((iVar2 = puVar1[2], iVar2 != 0xc && (*(char *)((int)puVar1 + 0x42) != '\0')))) {
        local_10._4_4_ = puVar1[10];
        local_10._0_4_ = puVar1[9];
        local_4 = puVar1[0xc] + local_10._4_4_;
        local_10._8_4_ = puVar1[0xb] + local_10._0_4_;
        if (((iVar2 == 0xf) || ((iVar2 == 0x10 || (iVar2 == 0)))) || (iVar2 == 1)) {
          GetWindowRect((HWND)*puVar1,(LPRECT)local_10);
          hWnd = *(HWND *)(DAT_00437238 + puVar1[1] * 0xac);
          ScreenToClient(hWnd,(LPPOINT)local_10);
          ScreenToClient(hWnd,(LPPOINT)(local_10 + 8));
        }
        if (((((int)local_10._0_4_ < param_1->right) && (param_1->left < (int)local_10._8_4_)) &&
            (param_1->top < local_4)) && ((int)local_10._4_4_ < param_1->bottom)) {
          local_20.left = param_1->left;
          local_20.top = param_1->top;
          local_20.right = param_1->right;
          local_20.bottom = local_10._4_4_;
          FUN_0041a7d0(&local_20);
          local_20.bottom = param_1->bottom;
          local_20.top = local_4;
          FUN_0041a7d0(&local_20);
          local_20.left = param_1->left;
          local_20.top = param_1->top;
          local_20.bottom = param_1->bottom;
          if (param_1->top < (int)local_10._4_4_) {
            local_20.top = local_10._4_4_;
          }
          if (local_4 < param_1->bottom) {
            local_20.bottom = local_4;
          }
          local_20.right = local_10._0_4_;
          FUN_0041a7d0(&local_20);
          local_20.right = param_1->right;
          local_20.left = local_10._8_4_;
          FUN_0041a7d0(&local_20);
          DAT_00437820 = DAT_00437820 - 1;
          return;
        }
      }
      FUN_0041a7d0(param_1);
    }
    else {
      FUN_0041a7a0(param_1);
    }
    DAT_00437820 = DAT_00437820 - 1;
  }
  return;
}



/******************************************************************************/
/* TARGET 0041aa00  FUN_0041aa00 */
/******************************************************************************/

void __fastcall FUN_0041aa00(undefined4 *param_1)

{
  bool bVar1;
  HGDIOBJ pvVar2;
  int *piVar3;
  uint uVar4;
  RECT local_10;
  
  if (((param_1 != DAT_00437238) || (DAT_0043730c != '\0')) &&
     ((DAT_004376f0 == '\0' || (DAT_004372ea == '\0')))) {
    bVar1 = true;
    DAT_00437818 = GetDC((HWND)*param_1);
    if (((param_1 == DAT_00437238) && (DAT_004372ea != '\0')) &&
       ((DAT_004377eb == '\0' || (DAT_004377ea != '\0')))) {
      DAT_0043781c = GetStockObject(4);
    }
    else {
      SetTextColor(DAT_00437818,param_1[0x19]);
      SetBkColor(DAT_00437818,param_1[0x1a]);
      DAT_0043781c = (HGDIOBJ)param_1[0x1b];
      bVar1 = false;
      if (((*(char *)((int)param_1 + 0x3f) != '\0') && (*(char *)((int)param_1 + 0x3d) == '\0')) &&
         (*(char *)(param_1 + 0xf) == '\0')) {
        DAT_0043781c = GetStockObject(4);
        bVar1 = true;
      }
    }
    local_10.right = param_1[0xd];
    local_10.left = 0;
    local_10.top = 0;
    DAT_00437820 = 0;
    if (((DAT_004377eb == '\0') || (DAT_004377ea != '\0')) && (param_1 == DAT_00437238)) {
      local_10.bottom = DAT_0043772c;
      FUN_0041a7d0(&local_10);
      local_10.top = DAT_004368c0 + DAT_0043772c;
      local_10.bottom = DAT_00437320;
      FUN_0041a7d0(&local_10);
      local_10.bottom = local_10.top;
      local_10.top = 0;
      local_10.right = DAT_00437728;
      FUN_0041a7d0(&local_10);
      local_10.left = DAT_004368bc + DAT_00437728;
      local_10.right = DAT_0043731c;
      FUN_0041a7d0(&local_10);
      pvVar2 = DAT_0043781c;
      if (DAT_004377eb != '\0') {
        DAT_0043781c = (HGDIOBJ)param_1[0x1b];
        uVar4 = DAT_00437244 - 1;
        if (-1 < (int)uVar4) {
          piVar3 = DAT_00437238 + uVar4 * 0x2b + 1;
          do {
            if (((uVar4 < DAT_00437244) && (*(char *)(DAT_0043723c + uVar4) != '\0')) &&
               ((piVar3[1] == 0xc && (*piVar3 == 0)))) {
              local_10.left = piVar3[8];
              local_10.top = piVar3[9];
              local_10.right = piVar3[10] + local_10.left;
              local_10.bottom = piVar3[0xb] + local_10.top;
              FUN_0041a7d0(&local_10);
            }
            piVar3 = piVar3 + -0x2b;
            uVar4 = uVar4 - 1;
          } while (-1 < (int)uVar4);
        }
      }
    }
    else {
      local_10.bottom = param_1[0xe];
      FUN_0041a7d0(&local_10);
      pvVar2 = DAT_0043781c;
    }
    DAT_0043781c = pvVar2;
    if (bVar1) {
      DeleteObject(DAT_0043781c);
    }
    ReleaseDC((HWND)*param_1,DAT_00437818);
    DAT_00437440 = DAT_00437700;
    DAT_00437638 = 0;
    DAT_0043743c = 0;
    DAT_004375dc = DAT_004376fc;
    if (DAT_00437644 != 0) {
      FUN_0041a1b0();
    }
  }
  return;
}



/******************************************************************************/
/* TARGET 0041aca0  FUN_0041aca0 */
/******************************************************************************/

uint __cdecl FUN_0041aca0(int param_1)

{
  int iVar1;
  uint uVar2;
  uint uVar3;
  int iVar4;
  
  iVar1 = *(int *)(DAT_00437080 + param_1 * 0x68);
  iVar4 = DAT_00437080 + param_1 * 0x68;
  uVar3 = *(uint *)(DAT_00437080 + 0x58 + param_1 * 0x68);
  uVar2 = *(uint *)(iVar1 + 4);
  if (uVar2 <= uVar3) {
    uVar3 = *(uint *)(iVar4 + 0x18);
    if (*(char *)(iVar4 + 5) == '\0') {
      iVar4 = *(int *)(iVar1 + 0xc);
      if (iVar4 < 2) {
        return uVar3;
      }
    }
    else {
      if (0 < *(int *)(iVar4 + 0x14)) {
        if ((int)(uVar3 + 1) < (int)uVar2) {
          return uVar3 + 1;
        }
        if ((int)*(uint *)(iVar1 + 0xc) < (int)uVar2) {
          return *(uint *)(iVar1 + 0xc);
        }
        return 0;
      }
      iVar4 = *(int *)(iVar1 + 0xc);
      if (iVar4 <= (int)uVar3) {
        return (int)((uVar3 - iVar4) + 1) % iVar4;
      }
    }
    uVar3 = (int)(uVar3 + 1) % iVar4;
  }
  return uVar3;
}



/******************************************************************************/
/* TARGET 0041ad10  FUN_0041ad10 */
/******************************************************************************/

void FUN_0041ad10(void)

{
  double dVar1;
  uint uVar2;
  int *piVar3;
  int iVar4;
  int iVar5;
  int iVar6;
  
  DAT_0043732b = 0;
  iVar5 = 3;
  piVar3 = &DAT_00437628;
  do {
    iVar6 = *piVar3;
    (&DAT_004376cc)[iVar5] = 0;
    iVar5 = iVar5 + -1;
    *piVar3 = iVar6 + -1;
    piVar3 = piVar3 + -1;
  } while (0x43761b < (int)piVar3);
  FUN_0042e1c0();
  FUN_00428600();
  FUN_00417cc0();
  if ((0 < DAT_0043779c) && (DAT_0043779c = DAT_0043779c + -1, DAT_0043779c == 0)) {
    FUN_00418330();
  }
  uVar2 = DAT_004375d4;
  if (DAT_00437748 == '\0') {
    while (uVar2 = uVar2 - 1, iVar5 = DAT_004376c4, -1 < (int)uVar2) {
      iVar5 = *(int *)(DAT_004375d0 + uVar2 * 4);
      piVar3 = (int *)(DAT_00437080 + iVar5 * 0x68);
      iVar6 = *(int *)(DAT_00437080 + 0x10 + iVar5 * 0x68) + -1;
      piVar3[4] = iVar6;
      if (iVar6 < 1) {
        FUN_00419250(iVar5);
        iVar6 = piVar3[5];
        piVar3[5] = iVar6 + -1;
        if (iVar6 + -1 < 0) {
          *(double *)(piVar3 + 0xc) = *(double *)(piVar3 + 8);
          iVar6 = FUN_0040a250(*(double *)(piVar3 + 8) * 32.0);
          *(double *)(piVar3 + 0xe) = *(double *)(piVar3 + 10);
          piVar3[2] = iVar6;
          iVar4 = FUN_0040a250(*(double *)(piVar3 + 10) * 32.0);
          iVar6 = *piVar3;
          piVar3[3] = iVar4;
          if ((uint)piVar3[0x16] < *(uint *)(iVar6 + 4)) {
            piVar3[6] = piVar3[0x16];
            piVar3[0x16] = -1;
          }
          else {
            if (*(int *)(iVar6 + 0xc) <= piVar3[6]) {
              piVar3[6] = piVar3[6] - *(int *)(iVar6 + 0xc);
            }
            piVar3[6] = (piVar3[6] + 1) % *(int *)(iVar6 + 0xc);
          }
          if (1 < *(int *)(iVar6 + 0xc)) {
            FUN_004019e0(&DAT_004376c0,iVar5);
          }
          FUN_004019a0(&DAT_004375d0,uVar2);
          *(undefined1 *)((int)piVar3 + 5) = 0;
        }
        else {
          dVar1 = *(double *)(piVar3 + 0xc);
          *(double *)(piVar3 + 0xc) = *(double *)(piVar3 + 0x10) + dVar1;
          iVar6 = FUN_0040a250((*(double *)(piVar3 + 0x10) + dVar1) * 32.0);
          dVar1 = *(double *)(piVar3 + 0xe);
          piVar3[2] = iVar6;
          *(double *)(piVar3 + 0xe) = *(double *)(piVar3 + 0x12) + dVar1;
          iVar4 = FUN_0040a250((*(double *)(piVar3 + 0x12) + dVar1) * 32.0);
          iVar6 = *piVar3;
          piVar3[3] = iVar4;
          piVar3[4] = (*(int *)(iVar6 + 0x10) + 0x16) / 0x37;
          if ((uint)piVar3[0x16] < *(uint *)(iVar6 + 4)) {
            piVar3[6] = piVar3[0x16];
            piVar3[0x16] = -1;
          }
          else {
            iVar4 = piVar3[6];
            piVar3[6] = iVar4 + 1;
            if ((*(int *)(iVar6 + 4) <= iVar4 + 1) &&
               (iVar4 = *(int *)(iVar6 + 0xc), piVar3[6] = iVar4, *(int *)(iVar6 + 4) <= iVar4)) {
              piVar3[6] = 0;
            }
          }
        }
        FUN_00419290(iVar5);
      }
    }
joined_r0x0041aef2:
    iVar5 = iVar5 + -1;
    if (-1 < iVar5) {
      iVar6 = *(int *)(DAT_004376c0 + iVar5 * 4);
      piVar3 = (int *)(DAT_00437080 + iVar6 * 0x68);
      if (*(char *)(DAT_00437080 + 7 + iVar6 * 0x68) != '\0') goto LAB_0041af35;
      *(undefined1 *)((int)piVar3 + 7) = 1;
      iVar6 = *(int *)(*piVar3 + 0x10);
      goto LAB_0041af7e;
    }
    DAT_004368e4 = DAT_004368e4 + -1;
    if (DAT_004368e4 < 1) {
      FUN_0041a1b0();
    }
  }
  return;
LAB_0041af35:
  iVar4 = piVar3[4];
  piVar3[4] = iVar4 + -1;
  if (iVar4 + -1 < 1) {
    FUN_00419250(iVar6);
    iVar6 = *piVar3;
    if ((uint)piVar3[0x16] < *(uint *)(iVar6 + 4)) {
      piVar3[6] = piVar3[0x16];
      piVar3[0x16] = -1;
    }
    else {
      piVar3[6] = (piVar3[6] + 1) % *(int *)(iVar6 + 0xc);
    }
    iVar6 = *(int *)(iVar6 + 0x10);
LAB_0041af7e:
    piVar3[4] = (iVar6 + 0x16) / 0x37;
  }
  goto joined_r0x0041aef2;
}



/******************************************************************************/
/* TARGET 0041afa0  FUN_0041afa0 */
/******************************************************************************/

void __cdecl FUN_0041afa0(int param_1,char param_2)

{
  byte bVar1;
  byte local_100 [256];
  
  GetKeyboardState(local_100);
  bVar1 = local_100[param_1];
  local_100[param_1] = bVar1 & 0xfe;
  if (param_2 != '\0') {
    local_100[param_1] = bVar1 & 0xfe | 1;
  }
  SetKeyboardState(local_100);
  return;
}



/******************************************************************************/
/* TARGET 0041aff0  FUN_0041aff0 */
/******************************************************************************/

void FUN_0041aff0(void)

{
  tagMSG local_1c;
  
  PeekMessageA(&local_1c,(HWND)0x0,0x113,0x113,0);
  return;
}



/******************************************************************************/
/* TARGET 0041b010  FUN_0041b010 */
/******************************************************************************/

/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

void FUN_0041b010(void)

{
  if (DAT_0043732b == '\0') {
    GetCursorPos((LPPOINT)&lpPoint_00436790);
    DAT_0043679c = DAT_00436794;
    lpPoint_00436798 = lpPoint_00436790;
    ScreenToClient(*(HWND *)(DAT_00437238 + DAT_004377ec * 0xac),(LPPOINT)&lpPoint_00436798);
    DAT_0043732b = '\x01';
  }
  if (((DAT_004377eb == '\0') || (DAT_004377ea != '\0')) && (DAT_004377ec == 0)) {
    _DAT_00437750 = ((double)((int)lpPoint_00436798 - DAT_00437728) / _DAT_004368c8) * 0.03125;
    _DAT_00437758 =
         ((double)((DAT_0043772c - DAT_0043679c) + -1 + DAT_004368c0) / _DAT_004368c8) * 0.03125;
    return;
  }
  _DAT_00437750 = (double)(int)lpPoint_00436798 * 0.03125;
  _DAT_00437758 =
       (double)((*(int *)(DAT_00437238 + 0x38 + DAT_004377ec * 0xac) - DAT_0043679c) + -1) * 0.03125
  ;
  return;
}



/******************************************************************************/
/* TARGET 0041b130  FUN_0041b130 */
/******************************************************************************/

void __cdecl FUN_0041b130(char param_1)

{
  BOOL BVar1;
  int iVar2;
  tagMSG local_1c;
  
  if (DAT_00437794 != '\0') {
    DAT_00437794 = '\0';
    FUN_0041afa0(0x90,DAT_00437790);
  }
  if (DAT_00437795 != '\0') {
    DAT_00437795 = '\0';
    FUN_0041afa0(0x14,DAT_00437791);
  }
  if (DAT_00437796 != '\0') {
    DAT_00437796 = '\0';
    FUN_0041afa0(0x91,DAT_00437792);
  }
  if (DAT_00437797 != '\0') {
    DAT_00437797 = '\0';
    FUN_0041afa0(0x2d,DAT_00437793);
  }
  if (param_1 != '\0') {
    FUN_0041ad10();
    FUN_0041a1b0();
  }
  while( true ) {
    while( true ) {
      if (param_1 == '\0') {
        BVar1 = PeekMessageA(&local_1c,(HWND)0x0,0,0,1);
        if (BVar1 == 0) {
          FUN_0041b010();
          FUN_00409ad0();
          return;
        }
      }
      else {
        GetMessageA(&local_1c,(HWND)0x0,0,0);
      }
      if ((DAT_00437338 == (HWND)0x0) ||
         (BVar1 = IsDialogMessageA(DAT_00437338,&local_1c), BVar1 == 0)) break;
      local_1c.message = 0xffffffff;
    }
    if (local_1c.message == 0x113) {
      if (param_1 == '\0') {
        FUN_0041ad10();
      }
      param_1 = '\0';
      DAT_004368e0 = 0x32;
    }
    if (local_1c.message == 0x12) break;
    if ((local_1c.message != 0xffffffff) && (iVar2 = FUN_0040c150(&local_1c.hwnd), iVar2 == 0)) {
      TranslateMessage(&local_1c);
      DispatchMessageA(&local_1c);
    }
  }
  DAT_0043741c = DAT_0043741c | 1;
  return;
}



/******************************************************************************/
/* TARGET 0041b2b0  FUN_0041b2b0 */
/******************************************************************************/

void __fastcall FUN_0041b2b0(int param_1)

{
  while (((0 < param_1 || (DAT_00437748 != '\0')) && (DAT_0043741c == 0))) {
    FUN_0041b130('\x01');
    param_1 = param_1 + -1;
  }
  return;
}



/******************************************************************************/
/* TARGET 0041b2e0  FUN_0041b2e0 */
/******************************************************************************/

/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

void FUN_0041b2e0(void)

{
  HFONT pHVar1;
  LPVOID pvVar2;
  BOOL BVar3;
  int iVar4;
  int iVar5;
  undefined4 *puVar6;
  undefined4 *puVar7;
  int *piVar8;
  
  DAT_004377f4 = FUN_0040d3a0(0xb00);
  piVar8 = DAT_004377f4;
  for (iVar4 = 0x2c0; iVar4 != 0; iVar4 = iVar4 + -1) {
    *piVar8 = 0;
    piVar8 = piVar8 + 1;
  }
  iVar4 = 0;
  do {
    FUN_00406630((undefined4 *)(iVar4 + 0x24 + (int)DAT_004377f4));
    iVar5 = iVar4 + 0x2c;
    *(undefined4 *)(iVar4 + 0x20 + (int)DAT_004377f4) = 1;
    iVar4 = iVar5;
  } while (iVar5 < 0xb00);
  DAT_004377f8 = CreateFontA(0x10,6,0,0,700,0,0,0,1,0,0,0,0,s_Arial_0043696c);
  if (DAT_004377f8 == (HFONT)0x0) {
    DAT_004377f8 = GetStockObject(0xd);
  }
  *(undefined1 *)(DAT_004377f4 + 0x16) = 1;
  DAT_004377f4[0x1d] = (int)DAT_004377f8;
  DAT_004377f4[0x20] = 0x40000000;
  pHVar1 = CreateFontA(0xe,5,0,0,400,0,0,0,1,0,0,0,0,s_Arial_0043696c);
  DAT_004377f4[7] = (int)pHVar1;
  if (DAT_004377f4[7] == 0) {
    DAT_004377f4[7] = (int)DAT_004377f8;
  }
  DAT_004377f4[10] = 0x40000000;
  pHVar1 = CreateFontA(0xd,10,0,0,400,0,0,0,1,0,0,0,0,s_Courier_New_00436984);
  DAT_004377f4[0x12] = (int)pHVar1;
  if (DAT_004377f4[0x12] == 0) {
    DAT_004377f4[0x12] = (int)DAT_004377f8;
  }
  *(undefined1 *)((int)DAT_004377f4 + 0x31) = 1;
  DAT_004377f4[0x15] = 0x40000000;
  pHVar1 = CreateFontA(0x10,8,0,0,700,0,0,0,1,0,0,0,0,s_Courier_New_00436984);
  DAT_004377f4[0x28] = (int)pHVar1;
  if (DAT_004377f4[0x28] == 0) {
    DAT_004377f4[0x28] = (int)DAT_004377f8;
  }
  *(undefined1 *)(DAT_004377f4 + 0x21) = 1;
  *(undefined1 *)((int)DAT_004377f4 + 0x89) = 1;
  DAT_004377f4[0x2b] = 0x40000000;
  FUN_00418770();
  puVar7 = &DAT_00437914;
  puVar6 = &DAT_004378c0;
  do {
    *puVar6 = 1;
    pvVar2 = FUN_0040d3a0(0x4000);
    *puVar7 = pvVar2;
    puVar6 = puVar6 + 8;
    puVar7 = puVar7 + 1;
  } while ((int)puVar6 < 0x437920);
  DAT_00437910 = FUN_0040d3a0(0x10000);
  piVar8 = DAT_00437910;
  for (iVar4 = 0x4000; iVar4 != 0; iVar4 = iVar4 + -1) {
    *piVar8 = 0;
    piVar8 = piVar8 + 1;
  }
  iVar4 = 0;
  do {
    FUN_00404820((undefined4 *)(iVar4 + 0x2c + (int)DAT_00437910));
    iVar4 = iVar4 + 0x40;
  } while (iVar4 < 0x10000);
  _DAT_00437600 = 0x80200000;
  _DAT_00437604 = 0x80200000;
  _DAT_004376cc = 0;
  _DAT_00437608 = 0x80200000;
  _DAT_0043760c = 0x80200000;
  _DAT_004375f0 = 0x80200000;
  _DAT_004375e0 = 0x80200000;
  _DAT_0043761c = 0xffffffff;
  _DAT_004375f4 = 0x80200000;
  _DAT_004375e4 = 0x80200000;
  _DAT_00437620 = 0xffffffff;
  _DAT_004375f8 = 0x80200000;
  _DAT_004375e8 = 0x80200000;
  DAT_00437624 = 0xffffffff;
  _DAT_004375fc = 0x80200000;
  _DAT_004375ec = 0x80200000;
  DAT_00437628 = 0xffffffff;
  FUN_00419830(0,'\x01');
  FUN_00418c50();
  DAT_00437744 = SetTimer(DAT_00437308,0x21f,DAT_00437100,(TIMERPROC)0x0);
  puVar6 = (undefined4 *)(DAT_004376d0 * 0x10 + DAT_004376d4);
  DAT_004376e0 = puVar6;
  if (0 < DAT_004376d8) {
    DAT_004376e0 = puVar6 + 4;
    (*(code *)*puVar6)();
  }
  FUN_00418330();
  FUN_0042dc50();
  FUN_00428580();
  FUN_0042cbc0();
  FUN_0040b070('\0');
  if (DAT_004377e9 != '\0') {
    FreeConsole();
  }
  BVar3 = IsWindow(DAT_00437308);
  if (BVar3 != 0) {
    SendMessageA(DAT_00437308,0x10,0,0);
  }
  KillTimer(DAT_00437308,DAT_00437744);
  DeleteObject(DAT_004375c0);
  DeleteObject(DAT_00437450);
  DeleteObject(DAT_00437420);
  iVar4 = 0;
  do {
    FUN_00404840((int *)(iVar4 + 0x2c + (int)DAT_00437910));
    iVar4 = iVar4 + 0x40;
  } while (iVar4 < 0x10000);
  FUN_0040d410(DAT_00437910);
  iVar4 = 0;
  do {
    FUN_00406610((undefined4 *)(iVar4 + 0x24 + (int)DAT_004377f4));
    pHVar1 = *(HFONT *)(iVar4 + 0x1c + (int)DAT_004377f4);
    if ((pHVar1 != (HFONT)0x0) && (pHVar1 != DAT_004377f8)) {
      DeleteObject(pHVar1);
    }
    iVar4 = iVar4 + 0x2c;
  } while (iVar4 < 0xb00);
  DeleteObject(DAT_004377f8);
  FUN_0040d410(DAT_004377f4);
  return;
}



/******************************************************************************/
/* TARGET 0041c140  FUN_0041c140 */
/******************************************************************************/

void FUN_0041c140(void)

{
  FUN_004057d0(&DAT_00437200,*(int *)(DAT_004376e0 + -0xc));
  return;
}



/******************************************************************************/
/* TARGET 0041df60  FUN_0041df60 */
/******************************************************************************/

void FUN_0041df60(void)

{
  code *pcVar1;
  char cVar2;
  int iVar3;
  char unaff_BL;
  int unaff_ESI;
  undefined4 *unaff_EDI;
  
  do {
    FUN_0041b2b0(1);
    if (DAT_00437748 != '\0') goto LAB_0041df57;
    do {
      do {
        do {
          do {
            if (unaff_ESI != DAT_004368e4) {
              if (unaff_BL != '\0') {
                DAT_004368e4 = 0;
                FUN_0041a1b0();
              }
              unaff_BL = '\x01';
              unaff_ESI = DAT_004368e4;
            }
            DAT_004376e0 = unaff_EDI;
            cVar2 = (*(code *)unaff_EDI[-4])();
            if (cVar2 == '\0') {
              DAT_004376e0 = DAT_004376e0 + DAT_004376e0[3] * 4;
              return;
            }
            pcVar1 = (code *)*DAT_004376e0;
            DAT_004376e0 = DAT_004376e0 + 4;
            (*pcVar1)();
            if (DAT_0043741c != 0) {
              DAT_0043741c = DAT_0043741c & 0xfffffffb;
              return;
            }
            DAT_004368e0 = DAT_004368e0 + -1;
          } while (0 < DAT_004368e0);
          DAT_004368e0 = 0x32;
          iVar3 = FUN_0041aff0();
        } while (iVar3 == 0);
        FUN_0041b130('\0');
      } while (DAT_00437748 == '\0');
LAB_0041df57:
    } while (DAT_0043741c != 0);
  } while( true );
}



/******************************************************************************/
/* TARGET 0041e410  FUN_0041e410 */
/******************************************************************************/

void __fastcall FUN_0041e410(uint param_1)

{
  code *pcVar1;
  char cVar2;
  DWORD DVar3;
  BOOL BVar4;
  uint uVar5;
  
  FUN_00418330();
  pcVar1 = (code *)*DAT_004376e0;
  DAT_004376e0 = DAT_004376e0 + 4;
  cVar2 = (*pcVar1)();
  if ((*(int *)(DAT_004375bc + 4) != 0) &&
     (DVar3 = GetFileAttributesA((LPCSTR)(DAT_004375bc + 0xc)), DVar3 != 0xffffffff)) {
    uVar5 = DVar3 | param_1;
    if (cVar2 == '\0') {
      uVar5 = uVar5 ^ param_1;
    }
    if ((DVar3 != uVar5) &&
       (BVar4 = SetFileAttributesA((LPCSTR)(DAT_004375bc + 0xc),uVar5 & 0xfffff7ef), BVar4 != 0)) {
      return;
    }
  }
  DAT_00437798 = 1;
  return;
}



/******************************************************************************/
/* TARGET 0041e8c0  FUN_0041e8c0 */
/******************************************************************************/

int __fastcall FUN_0041e8c0(int param_1)

{
  code *pcVar1;
  LPWSTR pWVar2;
  undefined4 extraout_ECX;
  undefined4 uVar3;
  undefined4 extraout_ECX_00;
  int iVar4;
  int iVar5;
  int iVar6;
  LPWSTR pWVar7;
  int local_4;
  
  local_4 = param_1;
  FUN_004064c0(&local_4);
  pcVar1 = (code *)*DAT_004376e0;
  DAT_004376e0 = DAT_004376e0 + 4;
  (*pcVar1)();
  iVar5 = *(int *)(local_4 + 4);
  iVar6 = iVar5;
  if (param_1 < iVar5) {
    iVar6 = param_1;
  }
  iVar4 = 0;
  if (DAT_004377a0 == '\0') {
    if (0 < iVar6) {
      do {
        FUN_00418010(*(undefined1 *)(iVar4 + 0xc + local_4));
        iVar4 = iVar4 + 1;
        iVar6 = iVar6 + -1;
      } while (iVar6 != 0);
    }
    FUN_00406610(&local_4);
    return iVar4;
  }
  pWVar2 = FUN_0040d3a0(iVar5 * 2 + 2);
  FUN_00406760(&local_4,pWVar2);
  uVar3 = extraout_ECX;
  iVar5 = iVar6;
  pWVar7 = pWVar2;
  if (0 < iVar6) {
    do {
      FUN_00417ff0(CONCAT22((short)((uint)uVar3 >> 0x10),*pWVar7));
      iVar5 = iVar5 + -1;
      uVar3 = extraout_ECX_00;
      iVar4 = iVar6;
      pWVar7 = pWVar7 + 1;
    } while (iVar5 != 0);
  }
  FUN_0040d410((int *)pWVar2);
  FUN_00406610(&local_4);
  return iVar4;
}



/******************************************************************************/
/* TARGET 0041ed40  FUN_0041ed40 */
/******************************************************************************/

void FUN_0041ed40(void)

{
  int iVar1;
  
  iVar1 = *(int *)(DAT_00437080 + 0x14);
  while ((0 < iVar1 && (DAT_0043741c == 0))) {
    FUN_0041b2b0(1);
    iVar1 = *(int *)(DAT_00437080 + 0x14);
  }
  return;
}



/******************************************************************************/
/* TARGET 0041ed70  FUN_0041ed70 */
/******************************************************************************/

void FUN_0041ed70(void)

{
  int iVar1;
  
  iVar1 = *(int *)(DAT_00437080 + 0x7c);
  while ((0 < iVar1 && (DAT_0043741c == 0))) {
    FUN_0041b2b0(1);
    iVar1 = *(int *)(DAT_00437080 + 0x7c);
  }
  return;
}



/******************************************************************************/
/* TARGET 0041ee50  FUN_0041ee50 */
/******************************************************************************/

void FUN_0041ee50(void)

{
  FUN_0041ed70();
  FUN_004197a0(1,*(double *)(DAT_00437080 + 0xb8) + 1.5707963267948966);
  return;
}



/******************************************************************************/
/* TARGET 0041f3a0  FUN_0041f3a0 */
/******************************************************************************/

void __fastcall FUN_0041f3a0(uint param_1,byte param_2)

{
  int iVar1;
  int iVar2;
  
  iVar1 = FUN_004288c0();
  iVar2 = FUN_00428ba0();
  if (iVar2 != 0) {
    *(uint *)(iVar2 + 4) = iVar1 << (param_2 & 0x1f) & param_1 | ~param_1 & *(uint *)(iVar2 + 4);
  }
  return;
}



/******************************************************************************/
/* TARGET 0041f400  FUN_0041f400 */
/******************************************************************************/

void __fastcall FUN_0041f400(uint param_1,byte param_2)

{
  int iVar1;
  int iVar2;
  
  iVar1 = FUN_004288c0();
  iVar2 = FUN_00428bf0();
  if (iVar2 != 0) {
    *(uint *)(iVar2 + 4) = iVar1 << (param_2 & 0x1f) & param_1 | ~param_1 & *(uint *)(iVar2 + 4);
  }
  return;
}



/******************************************************************************/
/* TARGET 0041f560  FUN_0041f560 */
/******************************************************************************/

void FUN_0041f560(void)

{
  code *pcVar1;
  undefined1 uVar2;
  int iVar3;
  float10 fVar4;
  int iVar5;
  undefined4 uVar6;
  undefined4 uVar7;
  int iVar8;
  undefined4 uVar9;
  undefined4 uVar10;
  undefined4 uVar11;
  undefined4 uVar12;
  int local_28;
  undefined4 uStack_24;
  undefined8 uStack_20;
  undefined8 uStack_18;
  undefined8 uStack_10;
  
  FUN_00404800(&local_28);
  pcVar1 = (code *)*DAT_004376e0;
  DAT_004376e0 = DAT_004376e0 + 4;
  (*pcVar1)();
  pcVar1 = (code *)*DAT_004376e0;
  DAT_004376e0 = DAT_004376e0 + 4;
  fVar4 = (float10)(*pcVar1)();
  uStack_10 = (double)fVar4;
  pcVar1 = (code *)*DAT_004376e0;
  DAT_004376e0 = DAT_004376e0 + 4;
  fVar4 = (float10)(*pcVar1)();
  uStack_18 = (double)fVar4;
  pcVar1 = (code *)*DAT_004376e0;
  DAT_004376e0 = DAT_004376e0 + 4;
  fVar4 = (float10)(*pcVar1)();
  uStack_20 = (double)fVar4;
  iVar3 = FUN_004288c0();
  pcVar1 = (code *)*DAT_004376e0;
  DAT_004376e0 = DAT_004376e0 + 4;
  uVar2 = (*pcVar1)();
  uStack_24 = CONCAT31(uStack_24._1_3_,uVar2);
  iVar5 = uStack_10._4_4_;
  uVar6 = uStack_24;
  uVar7 = (undefined4)uStack_10;
  iVar8 = uStack_10._4_4_;
  uVar9 = (undefined4)uStack_18;
  uVar10 = uStack_18._4_4_;
  uVar11 = (undefined4)uStack_20;
  uVar12 = uStack_20._4_4_;
  FUN_00401020(&stack0xffffffac,&local_28);
  FUN_0042cf20(iVar5,iVar3,(char)uVar6,(double)CONCAT44(iVar8,uVar7),uVar9,uVar10,
               (double)CONCAT44(uVar12,uVar11));
  FUN_00404840(&local_28);
  return;
}



/******************************************************************************/
/* TARGET 0041f730  FUN_0041f730 */
/******************************************************************************/

void __fastcall FUN_0041f730(uint param_1,uint param_2)

{
  if ((param_1 < DAT_004376fc) && (param_2 < DAT_00437700)) {
    *(undefined1 *)(DAT_00437704 * param_2 + DAT_004376e4 + param_1) = DAT_00437824;
    *(undefined1 *)
     (((int)(param_1 + ((int)param_1 >> 0x1f & 0x1fU)) >> 5) +
     DAT_00437644 + ((int)(param_2 + ((int)param_2 >> 0x1f & 0x1fU)) >> 5) * DAT_004376f4) = 1;
  }
  return;
}



/******************************************************************************/
/* TARGET 0041f790  FUN_0041f790 */
/******************************************************************************/

void __fastcall FUN_0041f790(uint param_1,uint param_2)

{
  if ((param_1 < DAT_004376fc) && (param_2 < DAT_00437700)) {
    *(undefined1 *)(DAT_00437704 * param_2 + DAT_004376e4 + param_1) = DAT_00437824;
  }
  return;
}



/******************************************************************************/
/* TARGET 0041f7c0  FUN_0041f7c0 */
/******************************************************************************/

void __fastcall FUN_0041f7c0(uint param_1,uint param_2)

{
  uint uVar1;
  uint uVar2;
  int iVar3;
  undefined1 *puVar4;
  int iVar5;
  int iVar6;
  uint uVar7;
  int iVar8;
  int iVar9;
  int iVar10;
  uint uVar11;
  int iVar12;
  uint local_1c;
  int local_14;
  
  switch(DAT_004369ac) {
  case 0:
    return;
  case 1:
    FUN_0041f730(param_1,param_2);
    return;
  case 2:
    FUN_0041f730(param_1,param_2);
    FUN_0041f730(param_1 + 1,param_2);
    FUN_0041f730(param_1,param_2 + 1);
    FUN_0041f730(param_1 + 1,param_2 + 1);
    return;
  case 3:
    uVar7 = param_2 - 1;
    uVar1 = param_1 - 1;
    FUN_0041f730(uVar1,uVar7);
    FUN_0041f730(param_1,uVar7);
    FUN_0041f730(param_1 + 1,uVar7);
    FUN_0041f730(uVar1,param_2);
    FUN_0041f730(param_1,param_2);
    FUN_0041f730(param_1 + 1,param_2);
    uVar7 = param_2 + 1;
    FUN_0041f730(uVar1,uVar7);
    FUN_0041f730(param_1,uVar7);
    FUN_0041f730(param_1 + 1,uVar7);
    return;
  case 4:
    FUN_0041f730(param_1,param_2 - 1);
    uVar7 = param_1 + 1;
    FUN_0041f730(uVar7,param_2 - 1);
    FUN_0041f730(param_1 - 1,param_2);
    FUN_0041f730(param_1,param_2);
    FUN_0041f730(uVar7,param_2);
    FUN_0041f730(param_1 + 2,param_2);
    uVar1 = param_2 + 1;
    FUN_0041f730(param_1 - 1,uVar1);
    FUN_0041f730(param_1,uVar1);
    FUN_0041f730(uVar7,uVar1);
    FUN_0041f730(param_1 + 2,uVar1);
    FUN_0041f730(param_1,param_2 + 2);
    FUN_0041f730(uVar7,param_2 + 2);
    return;
  case 5:
    uVar7 = param_1 - 1;
    FUN_0041f730(uVar7,param_2 - 2);
    FUN_0041f730(param_1,param_2 - 2);
    uVar1 = param_1 + 1;
    FUN_0041f730(uVar1,param_2 - 2);
    FUN_0041f730(param_1 - 2,param_2 - 1);
    FUN_0041f730(uVar7,param_2 - 1);
    FUN_0041f730(param_1,param_2 - 1);
    FUN_0041f730(uVar1,param_2 - 1);
    FUN_0041f730(param_1 + 2,param_2 - 1);
    FUN_0041f730(param_1 - 2,param_2);
    FUN_0041f730(uVar7,param_2);
    FUN_0041f730(param_1,param_2);
    FUN_0041f730(uVar1,param_2);
    FUN_0041f730(param_1 + 2,param_2);
    FUN_0041f730(param_1 - 2,param_2 + 1);
    FUN_0041f730(uVar7,param_2 + 1);
    FUN_0041f730(param_1,param_2 + 1);
    FUN_0041f730(uVar1,param_2 + 1);
    FUN_0041f730(param_1 + 2,param_2 + 1);
    uVar11 = param_2 + 2;
    FUN_0041f730(uVar7,uVar11);
    FUN_0041f730(param_1,uVar11);
    FUN_0041f730(uVar1,uVar11);
    return;
  case 6:
    uVar7 = param_1 - 1;
    FUN_0041f730(uVar7,param_2 - 2);
    FUN_0041f730(param_1,param_2 - 2);
    uVar1 = param_1 + 1;
    FUN_0041f730(uVar1,param_2 - 2);
    uVar11 = param_1 + 2;
    FUN_0041f730(uVar11,param_2 - 2);
    FUN_0041f730(param_1 - 2,param_2 - 1);
    FUN_0041f730(uVar7,param_2 - 1);
    FUN_0041f730(param_1,param_2 - 1);
    FUN_0041f730(uVar1,param_2 - 1);
    FUN_0041f730(uVar11,param_2 - 1);
    FUN_0041f730(param_1 + 3,param_2 - 1);
    FUN_0041f730(param_1 - 2,param_2);
    FUN_0041f730(uVar7,param_2);
    FUN_0041f730(param_1,param_2);
    FUN_0041f730(uVar1,param_2);
    FUN_0041f730(uVar11,param_2);
    FUN_0041f730(param_1 + 3,param_2);
    FUN_0041f730(param_1 - 2,param_2 + 1);
    FUN_0041f730(uVar7,param_2 + 1);
    FUN_0041f730(param_1,param_2 + 1);
    FUN_0041f730(uVar1,param_2 + 1);
    FUN_0041f730(uVar11,param_2 + 1);
    FUN_0041f730(param_1 + 3,param_2 + 1);
    FUN_0041f730(param_1 - 2,param_2 + 2);
    FUN_0041f730(uVar7,param_2 + 2);
    FUN_0041f730(param_1,param_2 + 2);
    FUN_0041f730(uVar1,param_2 + 2);
    FUN_0041f730(uVar11,param_2 + 2);
    FUN_0041f730(param_1 + 3,param_2 + 2);
    uVar11 = param_2 + 3;
    FUN_0041f730(uVar7,uVar11);
    FUN_0041f730(param_1,uVar11);
    break;
  case 7:
    uVar7 = param_1 - 1;
    FUN_0041f730(uVar7,param_2 - 3);
    FUN_0041f730(param_1,param_2 - 3);
    uVar1 = param_1 + 1;
    FUN_0041f730(uVar1,param_2 - 3);
    FUN_0041f730(param_1 - 2,param_2 - 2);
    FUN_0041f730(uVar7,param_2 - 2);
    FUN_0041f730(param_1,param_2 - 2);
    FUN_0041f730(uVar1,param_2 - 2);
    FUN_0041f730(param_1 + 2,param_2 - 2);
    FUN_0041f730(param_1 - 3,param_2 - 1);
    FUN_0041f730(param_1 - 2,param_2 - 1);
    FUN_0041f730(uVar7,param_2 - 1);
    FUN_0041f730(param_1,param_2 - 1);
    FUN_0041f730(uVar1,param_2 - 1);
    FUN_0041f730(param_1 + 2,param_2 - 1);
    FUN_0041f730(param_1 + 3,param_2 - 1);
    FUN_0041f730(param_1 - 3,param_2);
    FUN_0041f730(param_1 - 2,param_2);
    FUN_0041f730(uVar7,param_2);
    FUN_0041f730(param_1,param_2);
    FUN_0041f730(uVar1,param_2);
    FUN_0041f730(param_1 + 2,param_2);
    FUN_0041f730(param_1 + 3,param_2);
    FUN_0041f730(param_1 - 3,param_2 + 1);
    FUN_0041f730(param_1 - 2,param_2 + 1);
    FUN_0041f730(uVar7,param_2 + 1);
    FUN_0041f730(param_1,param_2 + 1);
    FUN_0041f730(uVar1,param_2 + 1);
    FUN_0041f730(param_1 + 2,param_2 + 1);
    FUN_0041f730(param_1 + 3,param_2 + 1);
    FUN_0041f730(param_1 - 2,param_2 + 2);
    FUN_0041f730(uVar7,param_2 + 2);
    FUN_0041f730(param_1,param_2 + 2);
    FUN_0041f730(uVar1,param_2 + 2);
    FUN_0041f730(param_1 + 2,param_2 + 2);
    uVar11 = param_2 + 3;
    FUN_0041f730(uVar7,uVar11);
    FUN_0041f730(param_1,uVar11);
    FUN_0041f730(uVar1,uVar11);
    return;
  case 8:
    uVar7 = param_1 - 1;
    FUN_0041f730(uVar7,param_2 - 3);
    FUN_0041f730(param_1,param_2 - 3);
    uVar1 = param_1 + 1;
    FUN_0041f730(uVar1,param_2 - 3);
    uVar11 = param_1 + 2;
    FUN_0041f730(uVar11,param_2 - 3);
    FUN_0041f730(param_1 - 2,param_2 - 2);
    FUN_0041f730(uVar7,param_2 - 2);
    FUN_0041f730(param_1,param_2 - 2);
    FUN_0041f730(uVar1,param_2 - 2);
    FUN_0041f730(uVar11,param_2 - 2);
    FUN_0041f730(param_1 + 3,param_2 - 2);
    FUN_0041f730(param_1 - 3,param_2 - 1);
    FUN_0041f730(param_1 - 2,param_2 - 1);
    FUN_0041f730(uVar7,param_2 - 1);
    FUN_0041f730(param_1,param_2 - 1);
    FUN_0041f730(uVar1,param_2 - 1);
    FUN_0041f730(uVar11,param_2 - 1);
    FUN_0041f730(param_1 + 3,param_2 - 1);
    FUN_0041f730(param_1 + 4,param_2 - 1);
    FUN_0041f730(param_1 - 3,param_2);
    FUN_0041f730(param_1 - 2,param_2);
    FUN_0041f730(uVar7,param_2);
    FUN_0041f730(param_1,param_2);
    FUN_0041f730(uVar1,param_2);
    FUN_0041f730(uVar11,param_2);
    FUN_0041f730(param_1 + 3,param_2);
    FUN_0041f730(param_1 + 4,param_2);
    FUN_0041f730(param_1 - 3,param_2 + 1);
    FUN_0041f730(param_1 - 2,param_2 + 1);
    FUN_0041f730(uVar7,param_2 + 1);
    FUN_0041f730(param_1,param_2 + 1);
    FUN_0041f730(uVar1,param_2 + 1);
    FUN_0041f730(uVar11,param_2 + 1);
    FUN_0041f730(param_1 + 3,param_2 + 1);
    FUN_0041f730(param_1 + 4,param_2 + 1);
    FUN_0041f730(param_1 - 3,param_2 + 2);
    FUN_0041f730(param_1 - 2,param_2 + 2);
    FUN_0041f730(uVar7,param_2 + 2);
    FUN_0041f730(param_1,param_2 + 2);
    FUN_0041f730(uVar1,param_2 + 2);
    FUN_0041f730(uVar11,param_2 + 2);
    FUN_0041f730(param_1 + 3,param_2 + 2);
    FUN_0041f730(param_1 + 4,param_2 + 2);
    FUN_0041f730(param_1 - 2,param_2 + 3);
    FUN_0041f730(uVar7,param_2 + 3);
    FUN_0041f730(param_1,param_2 + 3);
    FUN_0041f730(uVar1,param_2 + 3);
    FUN_0041f730(uVar11,param_2 + 3);
    FUN_0041f730(param_1 + 3,param_2 + 3);
    uVar11 = param_2 + 4;
    FUN_0041f730(uVar7,uVar11);
    FUN_0041f730(param_1,uVar11);
    break;
  case 9:
    uVar7 = param_1 - 2;
    FUN_0041f730(uVar7,param_2 - 4);
    uVar1 = param_1 - 1;
    FUN_0041f730(uVar1,param_2 - 4);
    FUN_0041f730(param_1,param_2 - 4);
    uVar11 = param_1 + 1;
    FUN_0041f730(uVar11,param_2 - 4);
    uVar2 = param_1 + 2;
    FUN_0041f730(uVar2,param_2 - 4);
    FUN_0041f730(param_1 - 3,param_2 - 3);
    FUN_0041f730(uVar7,param_2 - 3);
    FUN_0041f730(uVar1,param_2 - 3);
    FUN_0041f730(param_1,param_2 - 3);
    FUN_0041f730(uVar11,param_2 - 3);
    FUN_0041f730(uVar2,param_2 - 3);
    FUN_0041f730(param_1 + 3,param_2 - 3);
    FUN_0041f730(param_1 - 4,param_2 - 2);
    FUN_0041f730(param_1 - 3,param_2 - 2);
    FUN_0041f730(uVar7,param_2 - 2);
    FUN_0041f730(uVar1,param_2 - 2);
    FUN_0041f730(param_1,param_2 - 2);
    FUN_0041f730(uVar11,param_2 - 2);
    FUN_0041f730(uVar2,param_2 - 2);
    FUN_0041f730(param_1 + 3,param_2 - 2);
    FUN_0041f730(param_1 + 4,param_2 - 2);
    FUN_0041f730(param_1 - 4,param_2 - 1);
    FUN_0041f730(param_1 - 3,param_2 - 1);
    FUN_0041f730(uVar7,param_2 - 1);
    FUN_0041f730(uVar1,param_2 - 1);
    FUN_0041f730(param_1,param_2 - 1);
    FUN_0041f730(uVar11,param_2 - 1);
    FUN_0041f730(uVar2,param_2 - 1);
    FUN_0041f730(param_1 + 3,param_2 - 1);
    FUN_0041f730(param_1 + 4,param_2 - 1);
    FUN_0041f730(param_1 - 4,param_2);
    FUN_0041f730(param_1 - 3,param_2);
    FUN_0041f730(uVar7,param_2);
    FUN_0041f730(uVar1,param_2);
    FUN_0041f730(param_1,param_2);
    FUN_0041f730(uVar11,param_2);
    FUN_0041f730(uVar2,param_2);
    FUN_0041f730(param_1 + 3,param_2);
    FUN_0041f730(param_1 + 4,param_2);
    FUN_0041f730(param_1 - 4,param_2 + 1);
    FUN_0041f730(param_1 - 3,param_2 + 1);
    FUN_0041f730(uVar7,param_2 + 1);
    FUN_0041f730(uVar1,param_2 + 1);
    FUN_0041f730(param_1,param_2 + 1);
    FUN_0041f730(uVar11,param_2 + 1);
    FUN_0041f730(uVar2,param_2 + 1);
    FUN_0041f730(param_1 + 3,param_2 + 1);
    FUN_0041f730(param_1 + 4,param_2 + 1);
    FUN_0041f730(param_1 - 4,param_2 + 2);
    FUN_0041f730(param_1 - 3,param_2 + 2);
    FUN_0041f730(uVar7,param_2 + 2);
    FUN_0041f730(uVar1,param_2 + 2);
    FUN_0041f730(param_1,param_2 + 2);
    FUN_0041f730(uVar11,param_2 + 2);
    FUN_0041f730(uVar2,param_2 + 2);
    FUN_0041f730(param_1 + 3,param_2 + 2);
    FUN_0041f730(param_1 + 4,param_2 + 2);
    FUN_0041f730(param_1 - 3,param_2 + 3);
    FUN_0041f730(uVar7,param_2 + 3);
    FUN_0041f730(uVar1,param_2 + 3);
    FUN_0041f730(param_1,param_2 + 3);
    FUN_0041f730(uVar11,param_2 + 3);
    FUN_0041f730(uVar2,param_2 + 3);
    FUN_0041f730(param_1 + 3,param_2 + 3);
    uVar11 = param_2 + 4;
    FUN_0041f730(uVar7,uVar11);
    FUN_0041f730(uVar1,uVar11);
    FUN_0041f730(param_1,uVar11);
    break;
  default:
    iVar8 = DAT_004369ac;
    if (20000 < DAT_004369ac) {
      iVar8 = 20000;
    }
    iVar5 = (iVar8 + -1) / 2;
    iVar10 = param_1 - iVar5;
    if (iVar10 < 0) {
      iVar10 = 0;
    }
    iVar9 = iVar8 / 2 + 1 + param_1;
    if (DAT_004376fc < iVar9) {
      iVar9 = DAT_004376fc;
    }
    local_1c = param_2 - iVar5;
    if ((int)local_1c < 0) {
      local_1c = 0;
    }
    iVar5 = iVar8 / 2 + 1 + param_2;
    if (DAT_00437700 < iVar5) {
      iVar5 = DAT_00437700;
    }
    FUN_00418c80(iVar10,local_1c,iVar9,iVar5);
    if (iVar5 <= (int)local_1c) {
      return;
    }
    uVar7 = local_1c;
    local_1c = local_1c * 2;
    do {
      iVar3 = local_1c + param_2 * -2;
      puVar4 = (undefined1 *)(DAT_00437704 * uVar7 + DAT_004376e4 + iVar10);
      if (iVar10 < iVar9) {
        iVar12 = iVar10 * 2;
        local_14 = iVar9 - iVar10;
        do {
          iVar6 = iVar12 + param_1 * -2;
          if (iVar6 * iVar6 + iVar3 * iVar3 <= iVar8 * iVar8) {
            *puVar4 = DAT_00437824;
          }
          puVar4 = puVar4 + 1;
          iVar12 = iVar12 + 2;
          local_14 = local_14 + -1;
        } while (local_14 != 0);
      }
      uVar7 = uVar7 + 1;
      local_1c = local_1c + 2;
    } while ((int)uVar7 < iVar5);
    return;
  }
  local_1c = param_1 + 2;
  FUN_0041f730(param_1 + 1,uVar11);
  FUN_0041f730(local_1c,uVar11);
  return;
}



/******************************************************************************/
/* TARGET 004208b0  FUN_004208b0 */
/******************************************************************************/

void __fastcall FUN_004208b0(int param_1,int param_2,int param_3)

{
  undefined1 uVar1;
  uint uVar2;
  uint uVar3;
  undefined2 uVar4;
  int iVar5;
  undefined4 *puVar6;
  
  if ((-1 < param_2) && (param_1 < DAT_004376fc)) {
    if (param_1 < 0) {
      param_1 = 0;
    }
    if (DAT_004376fc <= param_2) {
      param_2 = DAT_004376fc + -1;
    }
    uVar3 = (param_2 - param_1) + 1;
    iVar5 = param_3 - (DAT_004369ac + -1) / 2;
    if (0 < DAT_004369ac) {
      param_3 = DAT_004369ac;
      do {
        uVar1 = DAT_00437824;
        if ((-1 < iVar5) && (iVar5 < DAT_00437700)) {
          uVar4 = CONCAT11(DAT_00437824,DAT_00437824);
          puVar6 = (undefined4 *)(DAT_00437704 * iVar5 + DAT_004376e4 + param_1);
          for (uVar2 = uVar3 >> 2; uVar2 != 0; uVar2 = uVar2 - 1) {
            *puVar6 = CONCAT22(uVar4,uVar4);
            puVar6 = puVar6 + 1;
          }
          for (uVar2 = uVar3 & 3; uVar2 != 0; uVar2 = uVar2 - 1) {
            *(undefined1 *)puVar6 = uVar1;
            puVar6 = (undefined4 *)((int)puVar6 + 1);
          }
        }
        iVar5 = iVar5 + 1;
        param_3 = param_3 + -1;
      } while (param_3 != 0);
    }
  }
  return;
}



/******************************************************************************/
/* TARGET 00420960  FUN_00420960 */
/******************************************************************************/

void __fastcall FUN_00420960(int param_1,int param_2,int param_3)

{
  int iVar1;
  undefined1 *puVar2;
  int iVar3;
  int iVar4;
  int iVar5;
  
  iVar1 = DAT_00437704;
  if ((-1 < param_3) && (param_2 < DAT_00437700)) {
    if (param_2 < 0) {
      param_2 = 0;
    }
    iVar4 = param_3;
    if (DAT_00437700 <= param_3) {
      iVar4 = DAT_00437700 + -1;
    }
    iVar5 = param_1 - (DAT_004369ac + -1) / 2;
    if (0 < DAT_004369ac) {
      param_3 = DAT_004369ac;
      do {
        if (((-1 < iVar5) && (iVar5 < DAT_004376fc)) &&
           (puVar2 = (undefined1 *)(iVar1 * param_2 + DAT_004376e4 + iVar5), param_2 <= iVar4)) {
          iVar3 = (iVar4 - param_2) + 1;
          do {
            *puVar2 = DAT_00437824;
            puVar2 = puVar2 + iVar1;
            iVar3 = iVar3 + -1;
          } while (iVar3 != 0);
        }
        iVar5 = iVar5 + 1;
        param_3 = param_3 + -1;
      } while (param_3 != 0);
    }
  }
  return;
}



/******************************************************************************/
/* TARGET 00420bb0  FUN_00420bb0 */
/******************************************************************************/

void __fastcall FUN_00420bb0(undefined1 *param_1,int param_2,int param_3)

{
  int iVar1;
  undefined1 uVar2;
  char cVar3;
  int iVar4;
  int iVar5;
  char *pcVar6;
  undefined1 *puVar7;
  char *pcVar8;
  
  cVar3 = DAT_0043783c;
  uVar2 = DAT_00437824;
  iVar1 = DAT_00437704;
  iVar4 = DAT_004376fc + -1;
  *param_1 = DAT_00437824;
  puVar7 = param_1;
  iVar5 = param_2;
  while ((0 < iVar5 && (puVar7[-1] == cVar3))) {
    iVar5 = iVar5 + -1;
    puVar7 = puVar7 + -1;
    *puVar7 = uVar2;
  }
  while ((param_2 < iVar4 && (param_1[1] == cVar3))) {
    param_2 = param_2 + 1;
    param_1 = param_1 + 1;
    *param_1 = uVar2;
  }
  FUN_00418c80(iVar5,param_3,param_2,param_3);
  if (0 < param_3) {
    pcVar6 = puVar7 + -iVar1;
    if (iVar5 <= param_2) {
      pcVar8 = pcVar6 + iVar5 + (iVar1 - (int)puVar7);
      do {
        if (*pcVar6 == cVar3) {
          FUN_00420bb0(pcVar6,(int)pcVar8,param_3 + -1);
        }
        pcVar6 = pcVar6 + 1;
        pcVar8 = pcVar8 + 1;
      } while ((int)pcVar8 <= param_2);
    }
  }
  if (param_3 < DAT_00437700 + -1) {
    pcVar6 = puVar7 + iVar1;
    if (iVar5 <= param_2) {
      pcVar8 = pcVar6 + iVar5 + (-iVar1 - (int)puVar7);
      do {
        if (*pcVar6 == cVar3) {
          FUN_00420bb0(pcVar6,(int)pcVar8,param_3 + 1);
        }
        pcVar6 = pcVar6 + 1;
        pcVar8 = pcVar8 + 1;
      } while ((int)pcVar8 <= param_2);
    }
  }
  return;
}



/******************************************************************************/
/* TARGET 00420ce0  FUN_00420ce0 */
/******************************************************************************/

void FUN_00420ce0(void)

{
  bool bVar1;
  uint uVar2;
  uint uVar3;
  char *pcVar4;
  
  bVar1 = FUN_00428ad0();
  DAT_00437824 = bVar1;
  uVar2 = FUN_00428920();
  uVar3 = FUN_00428920();
  if ((uVar2 < DAT_004376fc) && (uVar3 < DAT_00437700)) {
    pcVar4 = (char *)(DAT_00437704 * uVar3 + DAT_004376e4 + uVar2);
    DAT_0043783c = *pcVar4;
    if ((bool)DAT_0043783c != bVar1) {
      FUN_00420bb0(pcVar4,uVar2,uVar3);
    }
  }
  return;
}



/******************************************************************************/
/* TARGET 00420d40  FUN_00420d40 */
/******************************************************************************/

void FUN_00420d40(void)

{
  code *pcVar1;
  int iVar2;
  int iVar3;
  int iVar4;
  int iVar5;
  int iVar6;
  int iVar7;
  uint uVar8;
  uint uVar9;
  uint uVar10;
  float10 fVar11;
  longlong lVar12;
  ulonglong uStack_30;
  double dStack_20;
  double dStack_18;
  
  DAT_00437824 = FUN_00428ad0();
  pcVar1 = (code *)*DAT_004376e0;
  DAT_004376e0 = DAT_004376e0 + 4;
  fVar11 = (float10)(*pcVar1)();
  dStack_20 = (double)(fVar11 - (float10)0.4);
  iVar2 = FUN_00428920();
  iVar3 = FUN_00428920();
  pcVar1 = (code *)*DAT_004376e0;
  DAT_004376e0 = DAT_004376e0 + 4;
  (*pcVar1)();
  lVar12 = FUN_0040d9c0();
  dStack_18 = (double)(int)lVar12 * 0.5 - dStack_20 * 0.5;
  if (dStack_18 < 0.5) {
    dStack_20 = (dStack_18 - 0.5) + dStack_20;
    dStack_18 = 0.5;
  }
  iVar4 = FUN_0040a250((double)iVar3 + dStack_18 + dStack_20);
  iVar5 = FUN_0040a250((double)iVar2 + dStack_18 + dStack_20);
  iVar6 = FUN_0040a250(((double)iVar3 - dStack_18) - dStack_20);
  iVar7 = FUN_0040a250(((double)iVar2 - dStack_18) - dStack_20);
  FUN_00418c80(iVar7,iVar6,iVar5,iVar4);
  for (; 0.0 < dStack_20; dStack_20 = dStack_20 - 0.7) {
    uStack_30 = FUN_0040d9c0();
    iVar4 = (int)uStack_30;
    uStack_30 = uStack_30 & 0xffffffff;
    if (-1 < iVar4) {
      uVar10 = iVar4 + iVar3;
      uVar9 = iVar3 - iVar4;
      iVar4 = iVar2 - iVar3;
      do {
        lVar12 = FUN_0040d9c0();
        iVar5 = (int)lVar12;
        FUN_0041f790(iVar4 + uVar9,iVar3 + iVar5);
        FUN_0041f790(iVar4 + uVar10,iVar3 + iVar5);
        uVar8 = iVar3 + -iVar5;
        FUN_0041f790(iVar4 + uVar9,uVar8);
        FUN_0041f790(iVar4 + uVar10,uVar8);
        uVar8 = -iVar5 + iVar2;
        FUN_0041f790(uVar8,uVar10);
        FUN_0041f790(iVar5 + iVar2,uVar10);
        FUN_0041f790(uVar8,uVar9);
        FUN_0041f790(iVar5 + iVar2,uVar9);
        uVar8 = (int)uStack_30 - 1;
        uVar10 = uVar10 - 1;
        uVar9 = uVar9 + 1;
        uStack_30 = (ulonglong)uVar8;
      } while (-1 < (int)uVar8);
    }
  }
  return;
}



/******************************************************************************/
/* TARGET 00420db0  FUN_00420db0 */
/******************************************************************************/

void FUN_00420db0(void)

{
  int iVar1;
  int iVar2;
  int iVar3;
  int iVar4;
  uint uVar5;
  int unaff_EBP;
  uint uVar6;
  uint uVar7;
  float10 in_ST0;
  float10 fVar8;
  longlong lVar9;
  int in_stack_00000018;
  int in_stack_0000001c;
  int iStack00000020;
  undefined4 uStack00000024;
  uint uStack00000028;
  undefined4 uStack0000002c;
  double in_stack_00000030;
  double dStack00000038;
  double dStack00000040;
  
  fVar8 = in_ST0 * (float10)0.5 - (float10)in_stack_00000030 * (float10)0.5;
  if (fVar8 < (float10)0.5) {
    in_stack_00000030 = (double)((fVar8 - (float10)0.5) + (float10)in_stack_00000030);
    fVar8 = (float10)0.5;
  }
  dStack00000038 = (double)fVar8;
  _uStack00000028 = (double)in_stack_0000001c;
  _iStack00000020 = (double)in_stack_00000018;
  iVar1 = FUN_0040a250((double)((float10)in_stack_0000001c + fVar8 + (float10)in_stack_00000030));
  iVar2 = FUN_0040a250(_iStack00000020 + dStack00000038 + in_stack_00000030);
  iVar3 = FUN_0040a250((_uStack00000028 - dStack00000038) - in_stack_00000030);
  iVar4 = FUN_0040a250((_iStack00000020 - dStack00000038) - in_stack_00000030);
  FUN_00418c80(iVar4,iVar3,iVar2,iVar1);
  for (; 0.0 < in_stack_00000030; in_stack_00000030 = in_stack_00000030 - 0.7) {
    dStack00000040 = dStack00000038 * dStack00000038;
    lVar9 = FUN_0040d9c0();
    iVar1 = (int)lVar9;
    _iStack00000020 = (double)CONCAT44(uStack00000024,iVar1);
    if (-1 < iVar1) {
      uVar7 = iVar1 + unaff_EBP;
      uVar6 = unaff_EBP - iVar1;
      iVar1 = in_stack_00000018 - unaff_EBP;
      do {
        lVar9 = FUN_0040d9c0();
        iVar2 = (int)lVar9;
        FUN_0041f790(iVar1 + uVar6,unaff_EBP + iVar2);
        FUN_0041f790(iVar1 + uVar7,unaff_EBP + iVar2);
        uVar5 = in_stack_0000001c + -iVar2;
        _uStack00000028 = (double)CONCAT44(uStack0000002c,uVar5);
        FUN_0041f790(iVar1 + uVar6,uVar5);
        FUN_0041f790(iVar1 + uVar7,uStack00000028);
        uVar5 = -iVar2 + in_stack_00000018;
        FUN_0041f790(uVar5,uVar7);
        FUN_0041f790(iVar2 + in_stack_00000018,uVar7);
        FUN_0041f790(uVar5,uVar6);
        FUN_0041f790(iVar2 + in_stack_00000018,uVar6);
        iVar2 = iStack00000020 + -1;
        uVar7 = uVar7 - 1;
        uVar6 = uVar6 + 1;
        _iStack00000020 = (double)CONCAT44(uStack00000024,iVar2);
        unaff_EBP = in_stack_0000001c;
      } while (-1 < iVar2);
    }
    dStack00000038 = dStack00000038 + 0.7;
  }
  return;
}



/******************************************************************************/
/* TARGET 004214a0  FUN_004214a0 */
/******************************************************************************/

void FUN_004214a0(void)

{
  char cVar1;
  bool bVar2;
  undefined1 uVar3;
  int iVar4;
  int iVar5;
  HBITMAP h;
  HDC hdc;
  undefined4 *puVar6;
  BOOL BVar7;
  uint uVar8;
  uint uVar9;
  int iVar10;
  code *pcVar11;
  int *piVar12;
  float10 fVar13;
  longlong lVar14;
  int iStack_90;
  int local_8c;
  HFONT pHStack_88;
  int iStack_84;
  HGDIOBJ pvStack_80;
  int iStack_7c;
  char cStack_78;
  undefined3 uStack_77;
  int iStack_74;
  tagSIZE tStack_70;
  int iStack_64;
  char cStack_60;
  undefined3 uStack_5f;
  byte bStack_5c;
  undefined3 uStack_5b;
  byte bStack_58;
  undefined3 uStack_57;
  HBITMAP pHStack_54;
  undefined8 uStack_50;
  HGDIOBJ pvStack_44;
  HDC pHStack_40;
  int iStack_3c;
  tagBITMAPINFO tStack_38;
  
  FUN_004064c0(&local_8c);
  pcVar11 = (code *)*DAT_004376e0;
  DAT_004376e0 = DAT_004376e0 + 4;
  (*pcVar11)();
  iStack_64 = FUN_004068b0(&local_8c);
  iStack_7c = 0;
  bVar2 = FUN_00428ad0();
  iVar4 = FUN_00428920();
  iVar5 = FUN_00428920();
  iVar5 = DAT_00437700 - iVar5;
  pcVar11 = (code *)*DAT_004376e0;
  DAT_004376e0 = DAT_004376e0 + 4;
  fVar13 = (float10)(*pcVar11)();
  uStack_50 = (double)fVar13;
  pcVar11 = (code *)*DAT_004376e0;
  DAT_004376e0 = DAT_004376e0 + 4;
  (*pcVar11)();
  lVar14 = FUN_0040d9c0();
  iStack_74 = (int)lVar14;
  iStack_90 = iStack_74;
  if (iStack_74 == 0) {
    iStack_90 = 0x10;
  }
  pcVar11 = (code *)*DAT_004376e0;
  DAT_004376e0 = DAT_004376e0 + 4;
  fVar13 = (float10)(*pcVar11)();
  tStack_70 = (tagSIZE)(double)ABS(fVar13);
  fcos((float10)uStack_50);
  lVar14 = FUN_0040d9c0();
  fsin((float10)uStack_50);
  iVar5 = iVar5 - (int)lVar14;
  lVar14 = FUN_0040d9c0();
  iStack_3c = iVar4 - (int)lVar14;
  pcVar11 = (code *)*DAT_004376e0;
  DAT_004376e0 = DAT_004376e0 + 4;
  uVar3 = (*pcVar11)();
  pvStack_80 = (HGDIOBJ)CONCAT31(pvStack_80._1_3_,uVar3);
  pcVar11 = (code *)*DAT_004376e0;
  DAT_004376e0 = DAT_004376e0 + 4;
  uVar3 = (*pcVar11)();
  pHStack_88 = (HFONT)CONCAT31(pHStack_88._1_3_,uVar3);
  pcVar11 = (code *)*DAT_004376e0;
  DAT_004376e0 = DAT_004376e0 + 4;
  uVar3 = (*pcVar11)();
  _bStack_58 = CONCAT31(uStack_57,uVar3);
  pcVar11 = (code *)*DAT_004376e0;
  DAT_004376e0 = DAT_004376e0 + 4;
  uVar3 = (*pcVar11)();
  _bStack_5c = CONCAT31(uStack_5b,uVar3);
  pcVar11 = (code *)*DAT_004376e0;
  DAT_004376e0 = DAT_004376e0 + 4;
  uVar3 = (*pcVar11)();
  _cStack_60 = CONCAT31(uStack_5f,uVar3);
  pcVar11 = (code *)*DAT_004376e0;
  DAT_004376e0 = DAT_004376e0 + 4;
  uVar3 = (*pcVar11)();
  _cStack_78 = CONCAT31(uStack_77,uVar3);
  iVar4 = (int)((DAT_004376fc + 0xfU & 0xfffffff0) + ((int)(DAT_004376fc + 0xfU) >> 0x1f & 7U)) >> 3
  ;
  DAT_004376ec = FUN_0040d470(DAT_004376ec,DAT_00437700 * iVar4);
  uVar8 = DAT_00437700 * iVar4;
  piVar12 = DAT_004376ec;
  for (uVar9 = uVar8 >> 2; uVar9 != 0; uVar9 = uVar9 - 1) {
    *piVar12 = -1;
    piVar12 = piVar12 + 1;
  }
  for (uVar8 = uVar8 & 3; uVar8 != 0; uVar8 = uVar8 - 1) {
    *(undefined1 *)piVar12 = 0xff;
    piVar12 = (int *)((int)piVar12 + 1);
  }
  h = CreateBitmap(DAT_004376fc,DAT_00437700,1,1,DAT_004376ec);
  pHStack_54 = h;
  if (h != (HBITMAP)0x0) {
    pHStack_40 = GetDC(DAT_00437308);
    if (pHStack_40 != (HDC)0x0) {
      hdc = CreateCompatibleDC(pHStack_40);
      pcVar11 = SelectObject_exref;
      if (hdc != (HDC)0x0) {
        pvStack_44 = SelectObject(hdc,h);
        if ((((iStack_90 == 0x10) && (uStack_50 == 0.0)) && ((byte)pHStack_88 == 0)) &&
           (((bStack_58 == 0 && (bStack_5c == 0)) &&
            ((cStack_60 == '\0' && ((double)tStack_70 == 1.0)))))) {
          if ((char)pvStack_80 == '\0') {
            if (cStack_78 == '\0') {
              iStack_90 = 0xd;
              iVar5 = iVar5 + 3;
            }
            else {
              iStack_90 = 10;
              iVar5 = iVar5 + 6;
            }
          }
          else if (cStack_78 != '\0') {
            iStack_90 = 0xf;
            iVar5 = iVar5 + 1;
          }
        }
        pHStack_88 = FUN_00415d40((char)pvStack_80,(byte)pHStack_88,bStack_58,bStack_5c,cStack_60,
                                  cStack_78,iStack_74,tStack_70.cx,tStack_70.cy,
                                  (undefined4)uStack_50,uStack_50._4_4_);
        pvStack_80 = SelectObject(hdc,pHStack_88);
        FUN_004064c0(&iStack_84);
        if (0 < iStack_64) {
          do {
            puVar6 = FUN_004068f0(&local_8c,&iStack_74,iStack_7c);
            FUN_00407cc0(&iStack_84,puVar6);
            FUN_00406610(&iStack_74);
            iVar10 = 0;
            if (0 < DAT_00437734) {
              tStack_70 = (tagSIZE)((ulonglong)tStack_70 & 0xffffffff00000000);
              BVar7 = GetTextExtentPoint32A
                                (hdc,(LPCSTR)(iStack_84 + 0xc),*(int *)(iStack_84 + 4),&tStack_70);
              if (BVar7 != 0) {
                iVar10 = (DAT_00437734 - tStack_70.cx) / 2;
                if (iVar10 < 0) {
                  iVar10 = 0;
                }
              }
            }
            TextOutA(hdc,iVar10 + iStack_3c,iVar5,(LPCSTR)(iStack_84 + 0xc),*(int *)(iStack_84 + 4))
            ;
            iStack_7c = iStack_7c + 1;
            iVar5 = iVar5 + iStack_90;
            pcVar11 = SelectObject_exref;
          } while (iStack_7c < iStack_64);
        }
        (*pcVar11)(hdc,pvStack_80);
        FUN_004160d0(iStack_90);
        (*pcVar11)(hdc,uStack_50._4_4_);
        tStack_38.bmiHeader.biWidth = DAT_004376fc;
        tStack_38.bmiHeader.biPlanes = 1;
        tStack_38.bmiHeader.biBitCount = 1;
        tStack_38.bmiHeader.biCompression = 0;
        tStack_38.bmiHeader.biSizeImage = 0;
        tStack_38.bmiHeader.biXPelsPerMeter = 0;
        tStack_38.bmiHeader.biYPelsPerMeter = 0;
        tStack_38.bmiHeader.biClrUsed = 0;
        tStack_38.bmiHeader.biClrImportant = 0;
        tStack_38.bmiHeader.biSize = 0x28;
        tStack_38.bmiHeader.biHeight = DAT_00437700;
        GetDIBits(hdc,pHStack_54,0,DAT_00437700,DAT_004376ec,&tStack_38,0);
        iVar4 = DAT_00437700 * iVar4;
        iVar5 = DAT_004376e4;
        piVar12 = DAT_004376ec;
        if (-1 < iVar4 + -1) {
          do {
            cVar1 = (char)*piVar12;
            if (-1 < cVar1) {
              *(bool *)iVar5 = bVar2;
            }
            if (-1 < (char)(cVar1 << 1)) {
              *(bool *)(iVar5 + 1) = bVar2;
            }
            if (-1 < (char)(cVar1 << 2)) {
              *(bool *)(iVar5 + 2) = bVar2;
            }
            if (-1 < (char)(cVar1 << 3)) {
              *(bool *)(iVar5 + 3) = bVar2;
            }
            if (-1 < (char)(cVar1 << 4)) {
              *(bool *)(iVar5 + 4) = bVar2;
            }
            if (-1 < (char)(cVar1 << 5)) {
              *(bool *)(iVar5 + 5) = bVar2;
            }
            if (-1 < (char)(cVar1 << 6)) {
              *(bool *)(iVar5 + 6) = bVar2;
            }
            if (-1 < (char)(cVar1 << 7)) {
              *(bool *)(iVar5 + 7) = bVar2;
            }
            iVar4 = iVar4 + -1;
            iVar5 = iVar5 + 8;
            piVar12 = (int *)((int)piVar12 + 1);
          } while (iVar4 != 0);
        }
        FUN_00418cd0(0,0,DAT_004376f4 + -1,DAT_004376f8 + -1);
        DeleteDC(hdc);
        FUN_00406610(&iStack_84);
        h = pHStack_54;
      }
      ReleaseDC((HWND)0x0,pHStack_40);
    }
    DeleteObject(h);
  }
  FUN_00406610(&local_8c);
  return;
}



/******************************************************************************/
/* TARGET 00422120  FUN_00422120 */
/******************************************************************************/

void FUN_00422120(void)

{
  code *pcVar1;
  int iVar2;
  double *pdVar3;
  int iVar4;
  float10 fVar5;
  
  pcVar1 = (code *)*DAT_004376e0;
  DAT_004376e0 = DAT_004376e0 + 4;
  fVar5 = (float10)(*pcVar1)();
  if (fVar5 != (float10)0.0) {
    if (-1 < DAT_00437084 + -1) {
      pdVar3 = (double *)(DAT_00437080 + 0x30);
      iVar4 = DAT_00437084;
      do {
        pdVar3[-2] = pdVar3[-2] + (double)fVar5;
        *pdVar3 = *pdVar3 + (double)fVar5;
        iVar2 = FUN_0040a250(*pdVar3 * 32.0);
        *(int *)(pdVar3 + -5) = iVar2;
        pdVar3 = pdVar3 + 0xd;
        iVar4 = iVar4 + -1;
      } while (iVar4 != 0);
    }
    FUN_00418c50();
  }
  return;
}



/******************************************************************************/
/* TARGET 004221a0  FUN_004221a0 */
/******************************************************************************/

void FUN_004221a0(void)

{
  code *pcVar1;
  int iVar2;
  double *pdVar3;
  int iVar4;
  float10 fVar5;
  
  pcVar1 = (code *)*DAT_004376e0;
  DAT_004376e0 = DAT_004376e0 + 4;
  fVar5 = (float10)(*pcVar1)();
  if (fVar5 != (float10)0.0) {
    if (-1 < DAT_00437084 + -1) {
      pdVar3 = (double *)(DAT_00437080 + 0x38);
      iVar4 = DAT_00437084;
      do {
        pdVar3[-2] = pdVar3[-2] + (double)fVar5;
        *pdVar3 = *pdVar3 + (double)fVar5;
        iVar2 = FUN_0040a250(*pdVar3 * 32.0);
        *(int *)((int)pdVar3 + -0x2c) = iVar2;
        pdVar3 = pdVar3 + 0xd;
        iVar4 = iVar4 + -1;
      } while (iVar4 != 0);
    }
    FUN_00418c50();
  }
  return;
}



/******************************************************************************/
/* TARGET 00422510  FUN_00422510 */
/******************************************************************************/

void FUN_00422510(void)

{
  FUN_004064c0(&DAT_0043782c);
  return;
}



/******************************************************************************/
/* TARGET 00422520  FUN_00422520 */
/******************************************************************************/

void FUN_00422520(void)

{
  FUN_0040d9b0(0x422530);
  return;
}



/******************************************************************************/
/* TARGET 00422550  FUN_00422550 */
/******************************************************************************/

void FUN_00422550(void)

{
  FUN_00406530(&DAT_00437828,s___RTF_004369b8,0xffffffff);
  return;
}



/******************************************************************************/
/* TARGET 00422570  FUN_00422570 */
/******************************************************************************/

void FUN_00422570(void)

{
  FUN_0040d9b0(0x422580);
  return;
}



/******************************************************************************/
/* TARGET 00422600  FUN_00422600 */
/******************************************************************************/

void __cdecl FUN_00422600(undefined4 *param_1,int param_2)

{
  int iVar1;
  WPARAM wParam;
  int *piVar2;
  int iVar3;
  WPARAM WVar4;
  int iVar5;
  WPARAM *pWVar6;
  WPARAM local_28 [5];
  undefined4 local_14;
  
  if (param_2 < 10000000) {
    wParam = param_1[0x22];
    while ((int)wParam < param_2) {
      iVar3 = param_1[0x21];
      WVar4 = wParam + 1;
      iVar5 = iVar3 * WVar4;
      iVar1 = param_1[0x25];
      param_1[0x22] = WVar4;
      if (iVar1 < iVar5) {
        param_1[0x25] = iVar1 * 2;
        piVar2 = FUN_0040d470((int *)param_1[0x23],iVar1 << 3);
        param_1[0x23] = piVar2;
      }
      for (iVar3 = iVar3 * wParam; iVar3 < iVar5; iVar3 = iVar3 + 1) {
        FUN_00406630((undefined4 *)(param_1[0x23] + iVar3 * 4));
      }
      pWVar6 = local_28;
      for (iVar3 = 10; iVar3 != 0; iVar3 = iVar3 + -1) {
        *pWVar6 = 0;
        pWVar6 = pWVar6 + 1;
      }
      local_28[2] = 0;
      local_28[0] = 0x801;
      local_14 = 0xffffffff;
      local_28[1] = wParam;
      SendMessageA((HWND)*param_1,0x1007,wParam,(LPARAM)local_28);
      wParam = WVar4;
    }
  }
  return;
}



/******************************************************************************/
/* TARGET 00422b60  FUN_00422b60 */
/******************************************************************************/

void __fastcall FUN_00422b60(undefined4 *param_1)

{
  SetWindowPos((HWND)*param_1,(HWND)0x0,param_1[9],param_1[10],param_1[0xb],param_1[0xc],0x314);
  if ((param_1[2] == 0) || (param_1[2] == 1)) {
    FUN_0040b090(param_1);
  }
  return;
}



/******************************************************************************/
/* TARGET 00422df0  FUN_00422df0 */
/******************************************************************************/

/* WARNING (jumptable): Unable to track spacebase fully for stack */

void FUN_00422df0(void)

{
  undefined4 *puVar1;
  LPARAM lParam;
  WPARAM WVar2;
  WPARAM WVar3;
  LRESULT LVar4;
  LRESULT LVar5;
  uint wParam;
  int iVar6;
  code *pcVar7;
  float10 fVar8;
  undefined4 uVar9;
  undefined4 uVar10;
  int *piVar11;
  int *piVar12;
  BOOL bRedraw;
  WPARAM aWStack_48 [2];
  undefined8 uStack_40;
  int iStack_38;
  int iStack_34;
  undefined1 auStack_30 [12];
  undefined4 uStack_24;
  undefined4 uStack_20;
  
  pcVar7 = (code *)*DAT_004376e0;
  DAT_004376e0 = DAT_004376e0 + 4;
  fVar8 = (float10)(*pcVar7)();
  pcVar7 = SendMessageA_exref;
  uStack_40 = (double)fVar8;
  DAT_0043732c = 1;
  if (DAT_00437244 <= DAT_00436910) {
    DAT_0043732c = 0;
    return;
  }
  if (*(char *)(DAT_0043723c + DAT_00436910) == '\0') {
    DAT_0043732c = 0;
    return;
  }
  puVar1 = (undefined4 *)(DAT_00437238 + DAT_00436910 * 0xac);
  switch(*(undefined4 *)(DAT_00437238 + 8 + DAT_00436910 * 0xac)) {
  case 10:
    piVar11 = (int *)FUN_0040a250(uStack_40);
    uVar9 = *puVar1;
    uVar10 = 0xb1;
    pcVar7 = SendMessageA_exref;
    piVar12 = piVar11;
    goto LAB_00423151;
  case 0xb:
    SendMessageA((HWND)*puVar1,0xb0,(WPARAM)aWStack_48,0);
    WVar2 = SendMessageA((HWND)*puVar1,0xc9,aWStack_48[0],0);
    LVar4 = SendMessageA((HWND)*puVar1,0xbb,WVar2,0);
    WVar2 = FUN_0040a250(uStack_40);
    LVar5 = SendMessageA((HWND)*puVar1,0xbb,WVar2,0);
    WVar2 = LVar5 + (aWStack_48[0] - LVar4);
    SendMessageA((HWND)*puVar1,0xb1,WVar2,WVar2);
    SendMessageA((HWND)*puVar1,0xb7,0,0);
    DAT_0043732c = 0;
    return;
  case 0xd:
    WVar2 = FUN_0040a250(uStack_40);
    WVar3 = SendMessageA((HWND)*puVar1,0x188,0,0);
    if (WVar2 != WVar3) {
      SendMessageA((HWND)*puVar1,0x186,WVar2,0);
      DAT_0043732c = 0;
      return;
    }
    break;
  case 0xe:
  case 0xf:
  case 0x10:
    WVar2 = FUN_0040a250(uStack_40);
    WVar3 = SendMessageA((HWND)*puVar1,0x147,0,0);
    if (WVar2 != WVar3) {
      SendMessageA((HWND)*puVar1,0x14e,WVar2,0);
      DAT_0043732c = 0;
      return;
    }
    break;
  case 0x14:
  case 0x15:
    SendMessageA((HWND)*puVar1,0x434,0,(LPARAM)aWStack_48);
    WVar2 = SendMessageA((HWND)*puVar1,0xc9,aWStack_48[0],0);
    LVar4 = SendMessageA((HWND)*puVar1,0xbb,WVar2,0);
    WVar2 = FUN_0040a250(uStack_40);
    LVar5 = SendMessageA((HWND)*puVar1,0xbb,WVar2,0);
    iStack_38 = LVar5 + (aWStack_48[0] - LVar4);
    uVar9 = *puVar1;
    piVar11 = (int *)0x0;
    uVar10 = 0x437;
    piVar12 = &iStack_38;
    iStack_34 = iStack_38;
LAB_00423151:
    (*pcVar7)(uVar9,uVar10,piVar11,piVar12);
    (*pcVar7)(*puVar1,0xb7,0,0);
    DAT_0043732c = 0;
    return;
  case 0x16:
    WVar2 = FUN_0040a250(uStack_40 * 100.0);
    if ((int)WVar2 < 0) {
      WVar2 = 0;
    }
    else if (100 < (int)WVar2) {
      WVar2 = 100;
    }
    SendMessageA((HWND)*puVar1,0x402,WVar2,0);
    DAT_0043732c = 0;
    return;
  case 0x17:
    lParam = FUN_0040a250(uStack_40 * 100.0);
    if (lParam < 0) {
      lParam = 0;
    }
    else if (100 < lParam) {
      lParam = 100;
    }
    SendMessageA((HWND)*puVar1,0x405,1,lParam);
    DAT_0043732c = 0;
    return;
  case 0x18:
    iVar6 = FUN_0040a250(uStack_40 * 100.0);
    if (iVar6 < 0) {
      iVar6 = 0;
    }
    else if (100 < iVar6) {
      iVar6 = 100;
    }
    SendMessageA((HWND)*puVar1,0x405,1,100 - iVar6);
    DAT_0043732c = 0;
    return;
  case 0x19:
    wParam = FUN_0040a250(uStack_40);
    if ((wParam != puVar1[0x1f]) ||
       (((uint)puVar1[0x1e] < (uint)puVar1[0x21] && (wParam != puVar1[0x20])))) {
      puVar1[0x1f] = wParam;
      *(undefined1 *)((int)puVar1 + 0x45) = 0;
      if ((uint)puVar1[0x1e] < (uint)puVar1[0x21]) {
        puVar1[0x20] = wParam;
        FUN_00422600(puVar1,wParam + 1);
        uStack_20 = 2;
        uStack_24 = 2;
        if (DAT_00436768 != '\0') {
          uStack_20 = 3;
          uStack_24 = 3;
        }
        if ((uint)puVar1[0x22] <= wParam) {
          uStack_24 = 0;
          SendMessageA((HWND)*puVar1,0x102b,0xffffffff,(LPARAM)auStack_30);
          DAT_0043732c = 0;
          return;
        }
        SendMessageA((HWND)*puVar1,0x102b,wParam,(LPARAM)auStack_30);
        if (*(char *)((int)puVar1 + 0x42) != '\0') {
          SendMessageA((HWND)*puVar1,0x1013,wParam,0);
          DAT_0043732c = 0;
          return;
        }
      }
    }
    break;
  case 0x1a:
  case 0x1b:
    if (0.0 <= uStack_40) {
      if (1.0 < uStack_40) {
        uStack_40 = 1.0;
      }
    }
    else {
      uStack_40 = 0.0;
    }
    if (uStack_40 != *(double *)(puVar1 + 0x29)) {
      bRedraw = 1;
      puVar1[0x29] = (undefined4)uStack_40;
      puVar1[0x2a] = uStack_40._4_4_;
      iVar6 = FUN_0040a250((double)(int)puVar1[0x26] * uStack_40);
      SetScrollPos((HWND)*puVar1,2,iVar6,bRedraw);
    }
    break;
  case 0x1c:
    WVar2 = FUN_0040a250(uStack_40);
    WVar3 = SendMessageA((HWND)*puVar1,0x130b,0,0);
    if (WVar2 != WVar3) {
      SendMessageA((HWND)*puVar1,0x130c,WVar2,0);
      DAT_0043732c = 0;
      return;
    }
  }
  DAT_0043732c = 0;
  return;
}



/******************************************************************************/
/* TARGET 00423350  FUN_00423350 */
/******************************************************************************/

/* WARNING (jumptable): Unable to track spacebase fully for stack */

void FUN_00423350(void)

{
  undefined4 *puVar1;
  code *pcVar2;
  double dVar3;
  WPARAM WVar4;
  LRESULT LVar5;
  int iVar6;
  float10 fVar7;
  WPARAM WStack_38;
  WPARAM WStack_34;
  undefined8 uStack_30;
  SCROLLINFO SStack_24;
  
  pcVar2 = (code *)*DAT_004376e0;
  DAT_004376e0 = DAT_004376e0 + 4;
  fVar7 = (float10)(*pcVar2)();
  uStack_30 = (double)fVar7;
  DAT_0043732c = 1;
  if ((DAT_00436910 < DAT_00437244) && (*(char *)(DAT_0043723c + DAT_00436910) != '\0')) {
    puVar1 = (undefined4 *)(DAT_00437238 + DAT_00436910 * 0xac);
    switch(*(undefined4 *)(DAT_00437238 + 8 + DAT_00436910 * 0xac)) {
    case 0xb:
      SendMessageA((HWND)*puVar1,0xb0,(WPARAM)&WStack_38,0);
      WVar4 = SendMessageA((HWND)*puVar1,0xc9,WStack_38,0);
      LVar5 = SendMessageA((HWND)*puVar1,0xbb,WVar4,0);
      iVar6 = FUN_0040a250(uStack_30);
      SendMessageA((HWND)*puVar1,0xb1,iVar6 + LVar5,iVar6 + LVar5);
      SendMessageA((HWND)*puVar1,0xb7,0,0);
      DAT_0043732c = 0;
      return;
    case 0x14:
    case 0x15:
      SendMessageA((HWND)*puVar1,0x434,0,(LPARAM)&WStack_38);
      WVar4 = SendMessageA((HWND)*puVar1,0xc9,WStack_38,0);
      LVar5 = SendMessageA((HWND)*puVar1,0xbb,WVar4,0);
      iVar6 = FUN_0040a250(uStack_30);
      WStack_38 = iVar6 + LVar5;
      WStack_34 = WStack_38;
      SendMessageA((HWND)*puVar1,0x437,0,(LPARAM)&WStack_38);
      SendMessageA((HWND)*puVar1,0xb7,0,0);
      DAT_0043732c = 0;
      return;
    case 0x19:
      iVar6 = FUN_0040a250(uStack_30);
      if (iVar6 != puVar1[0x1e]) {
        puVar1[0x1e] = iVar6;
        *(undefined1 *)((int)puVar1 + 0x45) = 0;
        DAT_0043732c = 0;
        return;
      }
      break;
    case 0x1a:
    case 0x1b:
      if (0.0001 <= uStack_30) {
        if (1.0 < uStack_30) {
          uStack_30 = 1.0;
        }
      }
      else {
        uStack_30 = 0.0001;
      }
      if (uStack_30 != *(double *)(puVar1 + 0x27)) {
        dVar3 = uStack_30 * 10000.0;
        puVar1[0x27] = (undefined4)uStack_30;
        puVar1[0x28] = uStack_30._4_4_;
        uStack_30 = dVar3;
        iVar6 = FUN_0040a250(dVar3);
        puVar1[0x26] = 10000 - iVar6;
        SStack_24.cbSize = 0x1c;
        SStack_24.fMask = 6;
        SStack_24.nPage = FUN_0040a250(dVar3);
        SStack_24.nPos = FUN_0040a250((double)(int)puVar1[0x26] * *(double *)(puVar1 + 0x29));
        SetScrollInfo((HWND)*puVar1,2,&SStack_24,1);
      }
    }
  }
  DAT_0043732c = 0;
  return;
}



/******************************************************************************/
/* TARGET 00423610  FUN_00423610 */
/******************************************************************************/

void __cdecl FUN_00423610(undefined4 *param_1)

{
  char cVar1;
  bool bVar2;
  uint uVar3;
  uint uVar4;
  uint uVar5;
  HWND hWnd;
  UINT uFlags;
  int local_10;
  int local_c;
  int local_8;
  int local_4;
  
  if ((param_1[2] == 0) || (param_1[2] == 1)) {
    bVar2 = true;
  }
  else {
    bVar2 = false;
  }
  uVar3 = GetWindowLongA((HWND)*param_1,-0x10);
  uVar3 = uVar3 & 0xff38ffff;
  uVar4 = GetWindowLongA((HWND)*param_1,-0x14);
  cVar1 = *(char *)((int)param_1 + 0x3e);
  uVar4 = uVar4 & 0xfffdfc7e;
  uVar5 = uVar4;
  if (bVar2) {
    if (cVar1 != '\0') {
      uVar3 = uVar3 | 0x30000;
    }
    if (*(char *)((int)param_1 + 0x3d) == '\0') {
      if (*(char *)(param_1 + 0xf) == '\0') goto LAB_00423715;
      uVar5 = uVar4 | 0x20000;
    }
    else {
      uVar5 = uVar3 | 0x800000;
      if (DAT_00436910 == 0) {
        uVar5 = uVar3 | 0x820000;
      }
      uVar3 = uVar5;
      if (cVar1 == '\0') {
        uVar5 = uVar4 | 1;
      }
      else {
        uVar3 = uVar3 | 0x40000;
        uVar5 = uVar4 | 0x100;
      }
    }
    if (*(char *)(param_1 + 0xf) != '\0') {
      uVar3 = uVar3 | 0xc00000;
    }
  }
  else if (cVar1 == '\0') {
    if (*(char *)((int)param_1 + 0x3d) == '\0') {
      if (*(char *)(param_1 + 0xf) != '\0') {
        uVar5 = uVar4 | 0x20000;
      }
    }
    else {
      uVar3 = uVar3 | 0x800000;
      uVar5 = uVar4 | 0x200;
      if (*(char *)(param_1 + 0xf) != '\0') {
        uVar5 = uVar4 | 0x201;
      }
    }
  }
  else if (*(char *)((int)param_1 + 0x3d) == '\0') {
    if (*(char *)(param_1 + 0xf) == '\0') {
      uVar3 = uVar3 | 0x800000;
    }
    else {
      uVar5 = uVar4 | 1;
    }
  }
  else {
    uVar3 = uVar3 | 0x800000;
    uVar5 = uVar4 | 0x20000;
    if (*(char *)(param_1 + 0xf) != '\0') {
      uVar5 = uVar4 | 0x20200;
    }
  }
LAB_00423715:
  SetWindowLongA((HWND)*param_1,-0x14,uVar5);
  SetWindowLongA((HWND)*param_1,-0x10,uVar3);
  if (DAT_00436910 == 0) {
    DAT_00436778 = uVar5;
    DAT_0043677c = uVar3;
    FUN_0040a610(&local_10);
    local_4 = local_4 - local_c;
    uFlags = 0x334;
    local_8 = local_8 - local_10;
    hWnd = (HWND)*param_1;
  }
  else {
    hWnd = (HWND)*param_1;
    uFlags = 0x337;
    local_4 = 0;
    local_8 = 0;
    local_c = 0;
    local_10 = 0;
  }
  SetWindowPos(hWnd,(HWND)0x0,local_10,local_c,local_8,local_4,uFlags);
  FUN_0040b090(param_1);
  return;
}



/******************************************************************************/
/* TARGET 00423aa0  FUN_00423aa0 */
/******************************************************************************/

void FUN_00423aa0(void)

{
  undefined4 *puVar1;
  uint wParam;
  bool bVar2;
  undefined1 local_28 [12];
  undefined4 local_1c;
  undefined4 local_18;
  
  if (((DAT_00436910 < DAT_00437244) && (*(char *)(DAT_0043723c + DAT_00436910) != '\0')) &&
     (DAT_00436910 != 0)) {
    puVar1 = (undefined4 *)(DAT_00437238 + DAT_00436910 * 0xac);
    bVar2 = *(char *)(DAT_00437238 + 0x42 + DAT_00436910 * 0xac) == '\0';
    *(bool *)((int)puVar1 + 0x42) = bVar2;
    ShowWindow((HWND)*puVar1,-(uint)bVar2 & 5);
    if (((*(char *)((int)puVar1 + 0x42) != '\0') && (puVar1[2] == 0x19)) &&
       (wParam = puVar1[0x20], wParam < (uint)puVar1[0x22])) {
      local_18 = 2;
      local_1c = 2;
      if (DAT_00436768 != '\0') {
        local_18 = 3;
        local_1c = 3;
      }
      SendMessageA((HWND)*puVar1,0x102b,wParam,(LPARAM)local_28);
      SendMessageA((HWND)*puVar1,0x1013,wParam,0);
    }
  }
  return;
}



/******************************************************************************/
/* TARGET 00423bc0  FUN_00423bc0 */
/******************************************************************************/

void FUN_00423bc0(void)

{
  undefined4 *puVar1;
  int iVar2;
  uint uVar3;
  uint dwNewLong;
  bool bVar4;
  
  if ((DAT_00436910 < DAT_00437244) && (*(char *)(DAT_0043723c + DAT_00436910) != '\0')) {
    puVar1 = (undefined4 *)(DAT_00437238 + DAT_00436910 * 0xac);
    iVar2 = *(int *)(DAT_00437238 + 8 + DAT_00436910 * 0xac);
    if ((iVar2 != 0) && (iVar2 != 1)) {
      bVar4 = *(char *)((int)puVar1 + 0x43) == '\0';
      *(bool *)((int)puVar1 + 0x43) = bVar4;
      if ((((iVar2 != 10) && (iVar2 != 0xb)) && (iVar2 != 0x14)) && (iVar2 != 0x15)) {
        if (iVar2 == 0x19) {
          uVar3 = GetWindowLongA((HWND)*puVar1,-0x10);
          dwNewLong = uVar3 ^ 0x2000;
          if (*(char *)(puVar1 + 0x1d) != '\0') {
            *(undefined1 *)(puVar1 + 0x1d) = 0;
            dwNewLong = CONCAT22((short)(uVar3 >> 0x10),CONCAT11((char)(dwNewLong >> 8),(char)uVar3)
                                ) & 0xffffbfff | 0x8000;
          }
          SetWindowLongA((HWND)*puVar1,-0x10,dwNewLong);
          return;
        }
        EnableWindow((HWND)*puVar1,(uint)!bVar4);
        return;
      }
      SendMessageA((HWND)*puVar1,0xcf,(uint)bVar4,0);
    }
  }
  return;
}



/******************************************************************************/
/* TARGET 00423ce0  FUN_00423ce0 */
/******************************************************************************/

void FUN_00423ce0(void)

{
  undefined4 *puVar1;
  bool bVar2;
  
  if ((DAT_00436910 < DAT_00437244) && (*(char *)(DAT_0043723c + DAT_00436910) != '\0')) {
    puVar1 = (undefined4 *)(DAT_00437238 + DAT_00436910 * 0xac);
    switch(puVar1[2]) {
    case 8:
    case 9:
      if (*(char *)((int)puVar1 + 0x46) == '\0') {
        FUN_00416d20(DAT_00436910);
        return;
      }
    case 4:
    case 5:
    case 6:
    case 7:
      DAT_0043732c = 1;
      bVar2 = *(char *)((int)puVar1 + 0x46) == '\0';
      *(bool *)((int)puVar1 + 0x46) = bVar2;
      *(undefined1 *)((int)puVar1 + 0x47) = 0;
      SendMessageA((HWND)*puVar1,0xf1,(uint)bVar2,0);
      DAT_0043732c = 0;
      return;
    case 0x12:
    case 0x13:
      *(undefined1 *)((int)puVar1 + 0x47) = 0;
      *(bool *)((int)puVar1 + 0x46) = *(char *)((int)puVar1 + 0x46) == '\0';
    }
  }
  return;
}



/******************************************************************************/
/* TARGET 00423e00  FUN_00423e00 */
/******************************************************************************/

void FUN_00423e00(void)

{
  undefined4 *puVar1;
  bool bVar2;
  
  if ((DAT_00436910 < DAT_00437244) && (*(char *)(DAT_0043723c + DAT_00436910) != '\0')) {
    puVar1 = (undefined4 *)(DAT_00437238 + DAT_00436910 * 0xac);
    switch(puVar1[2]) {
    case 4:
    case 6:
    case 7:
      DAT_0043732c = 1;
      bVar2 = *(char *)((int)puVar1 + 0x47) == '\0';
      *(bool *)((int)puVar1 + 0x47) = bVar2;
      *(undefined1 *)((int)puVar1 + 0x46) = 0;
      SendMessageA((HWND)*puVar1,0xf1,-(uint)bVar2 & 2,0);
      DAT_0043732c = 0;
      return;
    case 0x12:
    case 0x13:
      *(undefined1 *)((int)puVar1 + 0x46) = 0;
      *(bool *)((int)puVar1 + 0x47) = *(char *)((int)puVar1 + 0x47) == '\0';
    }
  }
  return;
}



/******************************************************************************/
/* TARGET 00423f70  FUN_00423f70 */
/******************************************************************************/

void FUN_00423f70(void)

{
  undefined4 *puVar1;
  
  if ((DAT_00436910 < DAT_00437244) && (*(char *)(DAT_0043723c + DAT_00436910) != '\0')) {
    puVar1 = (undefined4 *)(DAT_00437238 + DAT_00436910 * 0xac);
    *(bool *)(puVar1 + 0x12) = *(char *)(DAT_00437238 + 0x48 + DAT_00436910 * 0xac) == '\0';
    FUN_00416110(puVar1);
  }
  return;
}



/******************************************************************************/
/* TARGET 00424010  FUN_00424010 */
/******************************************************************************/

void FUN_00424010(void)

{
  undefined4 *puVar1;
  
  if ((DAT_00436910 < DAT_00437244) && (*(char *)(DAT_0043723c + DAT_00436910) != '\0')) {
    puVar1 = (undefined4 *)(DAT_00437238 + DAT_00436910 * 0xac);
    *(bool *)((int)puVar1 + 0x4d) = *(char *)(DAT_00437238 + 0x4d + DAT_00436910 * 0xac) == '\0';
    FUN_00416110(puVar1);
  }
  return;
}



/******************************************************************************/
/* TARGET 00424100  FUN_00424100 */
/******************************************************************************/

void FUN_00424100(void)

{
  undefined4 *puVar1;
  
  if ((DAT_00436910 < DAT_00437244) && (*(char *)(DAT_0043723c + DAT_00436910) != '\0')) {
    puVar1 = (undefined4 *)(DAT_00437238 + DAT_00436910 * 0xac);
    *(bool *)((int)puVar1 + 0x49) = *(char *)(DAT_00437238 + 0x49 + DAT_00436910 * 0xac) == '\0';
    FUN_00416110(puVar1);
  }
  return;
}



/******************************************************************************/
/* TARGET 004241a0  FUN_004241a0 */
/******************************************************************************/

void FUN_004241a0(void)

{
  undefined4 *puVar1;
  
  if ((DAT_00436910 < DAT_00437244) && (*(char *)(DAT_0043723c + DAT_00436910) != '\0')) {
    puVar1 = (undefined4 *)(DAT_00437238 + DAT_00436910 * 0xac);
    *(bool *)((int)puVar1 + 0x4a) = *(char *)(DAT_00437238 + 0x4a + DAT_00436910 * 0xac) == '\0';
    FUN_00416110(puVar1);
  }
  return;
}



/******************************************************************************/
/* TARGET 00424240  FUN_00424240 */
/******************************************************************************/

void FUN_00424240(void)

{
  undefined4 *puVar1;
  
  if ((DAT_00436910 < DAT_00437244) && (*(char *)(DAT_0043723c + DAT_00436910) != '\0')) {
    puVar1 = (undefined4 *)(DAT_00437238 + DAT_00436910 * 0xac);
    *(bool *)((int)puVar1 + 0x4b) = *(char *)(DAT_00437238 + 0x4b + DAT_00436910 * 0xac) == '\0';
    FUN_00416110(puVar1);
  }
  return;
}



/******************************************************************************/
/* TARGET 004242e0  FUN_004242e0 */
/******************************************************************************/

void FUN_004242e0(void)

{
  undefined4 *puVar1;
  
  if ((DAT_00436910 < DAT_00437244) && (*(char *)(DAT_0043723c + DAT_00436910) != '\0')) {
    puVar1 = (undefined4 *)(DAT_00437238 + DAT_00436910 * 0xac);
    *(bool *)(puVar1 + 0x13) = *(char *)(DAT_00437238 + 0x4c + DAT_00436910 * 0xac) == '\0';
    FUN_00416110(puVar1);
  }
  return;
}



/******************************************************************************/
/* TARGET 00424db0  FUN_00424db0 */
/******************************************************************************/

/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

undefined4 __cdecl FUN_00424db0(int param_1,int param_2)

{
  int iVar1;
  int iVar2;
  int iVar3;
  int *piVar4;
  
  if ((((param_1 < DAT_00437728) || (DAT_004368bc + DAT_00437728 <= param_1)) ||
      (param_2 <= DAT_0043772c)) || (DAT_004368c0 + DAT_0043772c < param_2)) {
    if (DAT_004372ea == '\0') {
      return 0;
    }
    if (param_1 < DAT_00437728) {
      param_1 = DAT_00437728;
    }
    if (DAT_004368bc + DAT_00437728 <= param_1) {
      param_1 = DAT_004368bc + DAT_00437728 + -1;
    }
    if (param_2 <= DAT_0043772c) {
      param_2 = DAT_0043772c + 1;
    }
    if (DAT_004368c0 + DAT_0043772c < param_2) {
      param_2 = DAT_004368c0 + DAT_0043772c;
    }
  }
  iVar1 = FUN_0040a250((double)(param_1 - DAT_00437728) / _DAT_004368c8);
  iVar2 = FUN_0040a250((double)((DAT_004368c0 - param_2) + DAT_0043772c) / _DAT_004368c8);
  iVar3 = DAT_00437834 + -1;
  piVar4 = (int *)(DAT_00437830 + iVar3 * 0x18);
  while( true ) {
    if (iVar3 < 0) {
      if (DAT_004372ea == '\0') {
        return 0;
      }
      SetCursor(DAT_004372e4);
      return 1;
    }
    if (((*piVar4 <= iVar1) && (iVar1 < piVar4[2])) && ((piVar4[1] <= iVar2 && (iVar2 < piVar4[3])))
       ) break;
    piVar4 = piVar4 + -6;
    iVar3 = iVar3 + -1;
  }
  if ((HCURSOR)piVar4[4] != DAT_0043610c) {
    SetCursor((HCURSOR)piVar4[4]);
    return 1;
  }
  if (DAT_004372ea == '\0') {
    return 0;
  }
  SetCursor(DAT_004372e4);
  return 1;
}



/******************************************************************************/
/* TARGET 00425410  FUN_00425410 */
/******************************************************************************/

void FUN_00425410(void)

{
  code *pcVar1;
  int iVar2;
  char *pcVar3;
  undefined4 *puVar4;
  int *piVar5;
  uint uVar6;
  int iVar7;
  float10 fVar8;
  int local_14;
  double dStack_10;
  
  FUN_004064c0(&local_14);
  pcVar1 = (code *)*DAT_004376e0;
  DAT_004376e0 = DAT_004376e0 + 4;
  (*pcVar1)();
  FUN_00406b20(&local_14);
  fVar8 = FUN_00407930((char *)(local_14 + 0xc));
  dStack_10 = (double)fVar8;
  if (fVar8 < (float10)0.0) {
    dStack_10 = -dStack_10;
  }
  if (dStack_10 < 160.0) {
    dStack_10 = dStack_10 * 32.0;
  }
  if (10000.0 < dStack_10) {
    dStack_10 = 10000.0;
  }
  iVar2 = FUN_0040a250(dStack_10);
  pcVar3 = FUN_00406860(&local_14,'*');
  if ((int)pcVar3 < 0) {
    pcVar3 = FUN_00406860(&local_14,'x');
  }
  iVar7 = 0;
  if (-1 < (int)pcVar3) {
    puVar4 = FUN_00406bb0(&local_14,&dStack_10,(uint)(pcVar3 + 1),0x7fffffff);
    FUN_00407cc0(&local_14,puVar4);
    FUN_00406610((undefined4 *)&dStack_10);
    fVar8 = FUN_00407930((char *)(local_14 + 0xc));
    if (fVar8 < (float10)0.0) {
      fVar8 = -fVar8;
    }
    if (fVar8 < (float10)100.0) {
      fVar8 = fVar8 * (float10)32.0;
    }
    dStack_10 = (double)fVar8;
    if ((float10)10000.0 < fVar8) {
      dStack_10 = 10000.0;
    }
    iVar7 = FUN_0040a250(dStack_10);
  }
  pcVar3 = FUN_00406860(&local_14,'/');
  if ((int)pcVar3 < 0) {
    pcVar3 = FUN_00406860(&local_14,'\\');
  }
  uVar6 = 0;
  if (-1 < (int)pcVar3) {
    piVar5 = FUN_00406bb0(&local_14,&dStack_10,(uint)(pcVar3 + 1),0x7fffffff);
    uVar6 = FUN_00407180((char *)(*piVar5 + 0xc));
    FUN_00406610((undefined4 *)&dStack_10);
    if ((int)uVar6 < 0) {
      uVar6 = -uVar6;
    }
    uVar6 = uVar6 + 4 & 0xfffffff8;
    if (0x20 < (int)uVar6) {
      uVar6 = 0x20;
    }
  }
  if ((((DAT_004372ea == '\0') || (iVar2 != DAT_004372fc)) || (iVar7 != DAT_00437300)) ||
     (uVar6 != DAT_00437304)) {
    DAT_004372fc = iVar2;
    DAT_00437300 = iVar7;
    DAT_00437304 = uVar6;
    FUN_0040ae30();
  }
  FUN_00406610(&local_14);
  return;
}



/******************************************************************************/
/* TARGET 00425bc0  FUN_00425bc0 */
/******************************************************************************/

void __fastcall FUN_00425bc0(int *param_1)

{
  FUN_00401130(param_1);
  FUN_00409240();
  return;
}



/******************************************************************************/
/* TARGET 004260c0  FUN_004260c0 */
/******************************************************************************/

undefined4 FUN_004260c0(void)

{
  code *pcVar1;
  float10 fVar2;
  undefined4 *puVar3;
  undefined4 *puVar4;
  undefined2 extraout_var;
  int iVar5;
  float10 extraout_ST0;
  float10 fVar6;
  double dStack_10;
  
  iVar5 = DAT_004376e0[-3];
  pcVar1 = (code *)*DAT_004376e0;
  DAT_004376e0 = DAT_004376e0 + 4;
  puVar4 = (undefined4 *)(*pcVar1)();
  fVar6 = extraout_ST0;
  puVar3 = DAT_004376e0;
  while( true ) {
    if (iVar5 < 1) {
      DAT_004376e0 = puVar3;
      return CONCAT31((int3)((uint)puVar4 >> 8),1);
    }
    dStack_10 = (double)fVar6;
    DAT_004376e0 = puVar3 + 4;
    fVar6 = (float10)(*(code *)*puVar3)();
    fVar2 = (float10)dStack_10;
    puVar4 = (undefined4 *)
             CONCAT22(extraout_var,
                      (ushort)(fVar6 < fVar2) << 8 | (ushort)(NAN(fVar6) || NAN(fVar2)) << 10 |
                      (ushort)(fVar6 == fVar2) << 0xe);
    if ((fVar6 == fVar2) != 0) break;
    iVar5 = iVar5 + -1;
    puVar3 = DAT_004376e0;
  }
  if (1 < iVar5) {
    puVar4 = DAT_004376e0 + DAT_004376e0[3] * 4;
    DAT_004376e0 = puVar4;
  }
  return (uint)puVar4 & 0xffffff00;
}



/******************************************************************************/
/* TARGET 00426160  FUN_00426160 */
/******************************************************************************/

undefined4 FUN_00426160(void)

{
  code *pcVar1;
  undefined4 *puVar2;
  undefined4 *puVar3;
  undefined2 extraout_var;
  int iVar4;
  float10 extraout_ST0;
  float10 fVar5;
  float10 fVar6;
  double dStack_10;
  
  iVar4 = DAT_004376e0[-3];
  pcVar1 = (code *)*DAT_004376e0;
  DAT_004376e0 = DAT_004376e0 + 4;
  puVar3 = (undefined4 *)(*pcVar1)();
  fVar5 = extraout_ST0;
  puVar2 = DAT_004376e0;
  while( true ) {
    if (iVar4 < 1) {
      DAT_004376e0 = puVar2;
      return CONCAT31((int3)((uint)puVar3 >> 8),1);
    }
    dStack_10 = (double)fVar5;
    DAT_004376e0 = puVar2 + 4;
    fVar5 = (float10)(*(code *)*puVar2)();
    fVar6 = (float10)dStack_10;
    puVar3 = (undefined4 *)
             CONCAT22(extraout_var,
                      (ushort)(fVar6 < fVar5) << 8 | (ushort)(NAN(fVar6) || NAN(fVar5)) << 10 |
                      (ushort)(fVar6 == fVar5) << 0xe);
    if (fVar6 < fVar5) break;
    iVar4 = iVar4 + -1;
    puVar2 = DAT_004376e0;
  }
  if (1 < iVar4) {
    puVar3 = DAT_004376e0 + DAT_004376e0[3] * 4;
    DAT_004376e0 = puVar3;
  }
  return (uint)puVar3 & 0xffffff00;
}



/******************************************************************************/
/* TARGET 00426210  FUN_00426210 */
/******************************************************************************/

undefined4 FUN_00426210(void)

{
  code *pcVar1;
  undefined4 *puVar2;
  undefined4 *puVar3;
  undefined2 extraout_var;
  int iVar4;
  float10 extraout_ST0;
  float10 fVar5;
  float10 fVar6;
  double dStack_10;
  
  iVar4 = DAT_004376e0[-3];
  pcVar1 = (code *)*DAT_004376e0;
  DAT_004376e0 = DAT_004376e0 + 4;
  puVar3 = (undefined4 *)(*pcVar1)();
  fVar5 = extraout_ST0;
  puVar2 = DAT_004376e0;
  while( true ) {
    if (iVar4 < 1) {
      DAT_004376e0 = puVar2;
      return CONCAT31((int3)((uint)puVar3 >> 8),1);
    }
    dStack_10 = (double)fVar5;
    DAT_004376e0 = puVar2 + 4;
    fVar5 = (float10)(*(code *)*puVar2)();
    fVar6 = (float10)dStack_10;
    puVar3 = (undefined4 *)
             CONCAT22(extraout_var,
                      (ushort)(fVar6 < fVar5) << 8 | (ushort)(NAN(fVar6) || NAN(fVar5)) << 10 |
                      (ushort)(fVar6 == fVar5) << 0xe);
    if (fVar6 >= fVar5 && (fVar6 == fVar5) == 0) break;
    iVar4 = iVar4 + -1;
    puVar2 = DAT_004376e0;
  }
  if (1 < iVar4) {
    puVar3 = DAT_004376e0 + DAT_004376e0[3] * 4;
    DAT_004376e0 = puVar3;
  }
  return (uint)puVar3 & 0xffffff00;
}



/******************************************************************************/
/* TARGET 004262c0  FUN_004262c0 */
/******************************************************************************/

undefined4 FUN_004262c0(void)

{
  code *pcVar1;
  undefined4 *puVar2;
  undefined4 *puVar3;
  undefined2 extraout_var;
  int iVar4;
  float10 extraout_ST0;
  float10 fVar5;
  float10 fVar6;
  double dStack_10;
  
  iVar4 = DAT_004376e0[-3];
  pcVar1 = (code *)*DAT_004376e0;
  DAT_004376e0 = DAT_004376e0 + 4;
  puVar3 = (undefined4 *)(*pcVar1)();
  fVar5 = extraout_ST0;
  puVar2 = DAT_004376e0;
  while( true ) {
    if (iVar4 < 1) {
      DAT_004376e0 = puVar2;
      return CONCAT31((int3)((uint)puVar3 >> 8),1);
    }
    dStack_10 = (double)fVar5;
    DAT_004376e0 = puVar2 + 4;
    fVar5 = (float10)(*(code *)*puVar2)();
    fVar6 = (float10)dStack_10;
    puVar3 = (undefined4 *)
             CONCAT22(extraout_var,
                      (ushort)(fVar6 < fVar5) << 8 | (ushort)(NAN(fVar6) || NAN(fVar5)) << 10 |
                      (ushort)(fVar6 == fVar5) << 0xe);
    if (fVar6 < fVar5 || (fVar6 == fVar5) != 0) break;
    iVar4 = iVar4 + -1;
    puVar2 = DAT_004376e0;
  }
  if (1 < iVar4) {
    puVar3 = DAT_004376e0 + DAT_004376e0[3] * 4;
    DAT_004376e0 = puVar3;
  }
  return (uint)puVar3 & 0xffffff00;
}



/******************************************************************************/
/* TARGET 00426370  FUN_00426370 */
/******************************************************************************/

undefined4 FUN_00426370(void)

{
  code *pcVar1;
  undefined4 *puVar2;
  undefined4 *puVar3;
  undefined2 extraout_var;
  int iVar4;
  float10 extraout_ST0;
  float10 fVar5;
  float10 fVar6;
  double dStack_10;
  
  iVar4 = DAT_004376e0[-3];
  pcVar1 = (code *)*DAT_004376e0;
  DAT_004376e0 = DAT_004376e0 + 4;
  puVar3 = (undefined4 *)(*pcVar1)();
  fVar5 = extraout_ST0;
  puVar2 = DAT_004376e0;
  while( true ) {
    if (iVar4 < 1) {
      DAT_004376e0 = puVar2;
      return CONCAT31((int3)((uint)puVar3 >> 8),1);
    }
    dStack_10 = (double)fVar5;
    DAT_004376e0 = puVar2 + 4;
    fVar5 = (float10)(*(code *)*puVar2)();
    fVar6 = (float10)dStack_10;
    puVar3 = (undefined4 *)
             CONCAT22(extraout_var,
                      (ushort)(fVar6 < fVar5) << 8 | (ushort)(NAN(fVar6) || NAN(fVar5)) << 10 |
                      (ushort)(fVar6 == fVar5) << 0xe);
    if (fVar6 >= fVar5) break;
    iVar4 = iVar4 + -1;
    puVar2 = DAT_004376e0;
  }
  if (1 < iVar4) {
    puVar3 = DAT_004376e0 + DAT_004376e0[3] * 4;
    DAT_004376e0 = puVar3;
  }
  return (uint)puVar3 & 0xffffff00;
}



/******************************************************************************/
/* TARGET 00426bb0  FUN_00426bb0 */
/******************************************************************************/

bool __fastcall FUN_00426bb0(uint param_1)

{
  int iVar1;
  
  iVar1 = FUN_00428ba0();
  if (iVar1 != 0) {
    return (*(uint *)(iVar1 + 4) & param_1) != 0;
  }
  return false;
}



/******************************************************************************/
/* TARGET 00426c20  FUN_00426c20 */
/******************************************************************************/

bool __fastcall FUN_00426c20(uint param_1)

{
  int iVar1;
  
  iVar1 = FUN_00428bf0();
  if (iVar1 != 0) {
    return (*(uint *)(iVar1 + 4) & param_1) != 0;
  }
  return false;
}



/******************************************************************************/
/* TARGET 00427450  FUN_00427450 */
/******************************************************************************/

uint __fastcall FUN_00427450(uint param_1)

{
  uint uVar1;
  
  FUN_00418330();
  uVar1 = DAT_00437448;
  if (*(int *)(DAT_00437448 + 4) != 0) {
    uVar1 = GetFileAttributesA((LPCSTR)(DAT_00437448 + 0xc));
    if (uVar1 != 0xffffffff) {
      return (uint)((uVar1 & param_1) != 0);
    }
  }
  DAT_00437798 = 1;
  return uVar1 & 0xffffff00;
}



/******************************************************************************/
/* TARGET 00428220  FUN_00428220 */
/******************************************************************************/

void FUN_00428220(void)

{
  FUN_004064c0(&DAT_00437844);
  return;
}



/******************************************************************************/
/* TARGET 00428230  FUN_00428230 */
/******************************************************************************/

void FUN_00428230(void)

{
  FUN_0040d9b0(0x428240);
  return;
}



/******************************************************************************/
/* TARGET 00428250  FUN_00428250 */
/******************************************************************************/

void __cdecl FUN_00428250(int param_1,char param_2)

{
  char cVar1;
  HANDLE hFile;
  BOOL BVar2;
  MCIERROR MVar3;
  DWORD local_34;
  undefined1 local_30 [4];
  undefined4 local_2c;
  undefined1 local_24 [4];
  int local_20;
  undefined4 local_1c;
  undefined1 local_14 [4];
  MCIDEVICEID local_10;
  char *local_c;
  int local_8;
  
  if (DAT_004369c8 < 0) {
    FUN_00428580();
    FUN_00406d50(&DAT_00437844);
    hFile = CreateFileA((LPCSTR)(DAT_00437844 + 0xc),0x40000000,0,(LPSECURITY_ATTRIBUTES)0x0,2,0x100
                        ,(HANDLE)0x0);
    if (hFile != (HANDLE)0xffffffff) {
      BVar2 = WriteFile(hFile,*(LPCVOID *)(param_1 + 0xc),*(DWORD *)(param_1 + 4),&local_34,
                        (LPOVERLAPPED)0x0);
      CloseHandle(hFile);
      if ((BVar2 != 0) && (local_34 == *(DWORD *)(param_1 + 4))) {
        local_8 = DAT_00437844 + 0xc;
        local_c = s_sequencer_004369cc;
        MVar3 = mciSendCommandA(0,0x803,0x2200,(DWORD_PTR)local_14);
        if (MVar3 == 0) {
          DAT_00437848 = local_10;
          local_2c = 0;
          mciSendCommandA(local_10,0x80d,0x400,(DWORD_PTR)local_30);
          local_1c = 1;
          local_20 = 0;
          mciSendCommandA(DAT_00437848,0x814,0x100,(DWORD_PTR)local_24);
          cVar1 = DAT_0043784d;
          DAT_004369c0 = local_20;
          if (local_20 < 1) {
            DAT_004369c0 = 1;
          }
          else if (86400000 < local_20) {
            DAT_004369c0 = 86400000;
          }
          DAT_0043784c = 1;
          DAT_0043784d = '\x01';
          DAT_0043784e = param_2;
          DAT_004369c4 = 0x48;
          param_2 = cVar1;
          if (0 < DAT_00437850) {
            FUN_00428460(DAT_00437850);
          }
          if (param_2 == '\0') {
            FUN_004284f0();
            FUN_00402330(&param_1);
            return;
          }
          goto LAB_004283fd;
        }
      }
      DeleteFileA((LPCSTR)(DAT_00437844 + 0xc));
    }
    FUN_00406ad0(&DAT_00437844);
    DAT_004369c8 = 0x5a;
  }
LAB_004283fd:
  FUN_00402330(&param_1);
  return;
}



/******************************************************************************/
/* TARGET 00428410  FUN_00428410 */
/******************************************************************************/

void FUN_00428410(void)

{
  DAT_004369c4 = 0x48;
  DAT_004369c8 = 0xffffffff;
  if (DAT_0043784c == '\0') {
    return;
  }
  if (DAT_0043784e != '\0') {
    DAT_0043784d = 1;
    FUN_00428460(0);
    FUN_004284f0();
    return;
  }
  FUN_00428580();
  return;
}



/******************************************************************************/
/* TARGET 00428460  FUN_00428460 */
/******************************************************************************/

void __cdecl FUN_00428460(int param_1)

{
  undefined1 local_8 [4];
  int local_4;
  
  if (param_1 < 0) {
    param_1 = 0;
  }
  if (DAT_004369c0 <= param_1) {
    param_1 = DAT_004369c0 + -1;
  }
  DAT_004369c4 = 0x48;
  DAT_00437850 = param_1;
  if (DAT_0043784c != '\0') {
    local_4 = param_1;
    if (DAT_0043784d != '\0') {
      mciSendCommandA(DAT_00437848,0x807,10,(DWORD_PTR)local_8);
      return;
    }
    FUN_004284f0();
    mciSendCommandA(DAT_00437848,0x807,10,(DWORD_PTR)local_8);
    FUN_004284f0();
  }
  return;
}



/******************************************************************************/
/* TARGET 004284f0  FUN_004284f0 */
/******************************************************************************/

void FUN_004284f0(void)

{
  MCIERROR MVar1;
  undefined4 local_c [3];
  
  DAT_004369c4 = 0x48;
  DAT_0043784d = DAT_0043784d == '\0';
  if (DAT_0043784c != '\0') {
    DAT_004369c8 = 0xffffffff;
    if ((bool)DAT_0043784d) {
      mciSendCommandA(DAT_00437848,0x809,2,0);
      return;
    }
    local_c[0] = DAT_00437308;
    MVar1 = mciSendCommandA(DAT_00437848,0x806,1,(DWORD_PTR)local_c);
    if (MVar1 != 0) {
      DAT_0043784d = 1;
      DAT_004369c8 = 0x5a;
    }
  }
  return;
}



/******************************************************************************/
/* TARGET 00428580  FUN_00428580 */
/******************************************************************************/

void FUN_00428580(void)

{
  DAT_0043784c = 0;
  DAT_004369c8 = 0xffffffff;
  if (DAT_00437848 != 0) {
    mciSendCommandA(DAT_00437848,0x808,2,0);
    mciSendCommandA(DAT_00437848,0x804,2,0);
    DAT_00437848 = 0;
    DAT_004369c0 = 86400000;
    DAT_00437850 = 0;
  }
  if (*(int *)(DAT_00437844 + 4) != 0) {
    DeleteFileA((LPCSTR)(DAT_00437844 + 0xc));
    FUN_00406ad0(&DAT_00437844);
    return;
  }
  return;
}



/******************************************************************************/
/* TARGET 00428600  FUN_00428600 */
/******************************************************************************/

void FUN_00428600(void)

{
  undefined1 local_10 [4];
  int local_c;
  undefined4 local_8;
  
  DAT_004369c8 = DAT_004369c8 + -1;
  if (DAT_0043784f != '\0') {
    DAT_0043784f = '\0';
    FUN_00428410();
  }
  if (DAT_0043784c != '\0') {
    local_c = DAT_00437850;
    local_8 = 2;
    mciSendCommandA(DAT_00437848,0x814,0x100,(DWORD_PTR)local_10);
    if (local_c < 0) {
      local_c = 0;
    }
    if (DAT_004369c0 < local_c) {
      local_c = DAT_004369c0;
    }
    if (((DAT_0043784d == '\0') && (DAT_004369c0 + -0x14 < local_c)) && (local_c == DAT_00437850)) {
      DAT_004369c4 = DAT_004369c4 + -1;
      if (DAT_004369c4 < 0) {
        FUN_00428410();
      }
    }
    else {
      DAT_004369c4 = 0x48;
      DAT_00437850 = local_c;
    }
    if ((DAT_004369c8 == 0) && (DAT_0043784d != '\0')) {
      FUN_004284f0();
    }
  }
  return;
}



/******************************************************************************/
/* TARGET 004288a0  FUN_004288a0 */
/******************************************************************************/

void __fastcall FUN_004288a0(int *param_1)

{
  FUN_00402350(param_1);
  FUN_00409240();
  return;
}



/******************************************************************************/
/* TARGET 004288c0  FUN_004288c0 */
/******************************************************************************/

int FUN_004288c0(void)

{
  code *pcVar1;
  float10 fVar2;
  
  pcVar1 = (code *)*DAT_004376e0;
  DAT_004376e0 = DAT_004376e0 + 4;
  fVar2 = (float10)(*pcVar1)();
  return (int)ROUND((double)fVar2);
}



/******************************************************************************/
/* TARGET 004288f0  FUN_004288f0 */
/******************************************************************************/

undefined4 FUN_004288f0(void)

{
  code *pcVar1;
  float10 fVar2;
  undefined4 local_14;
  
  pcVar1 = (code *)*DAT_004376e0;
  DAT_004376e0 = DAT_004376e0 + 4;
  fVar2 = (float10)(*pcVar1)();
  local_14 = (undefined4)(longlong)ROUND((double)fVar2);
  return local_14;
}



/******************************************************************************/
/* TARGET 00428920  FUN_00428920 */
/******************************************************************************/

int FUN_00428920(void)

{
  code *pcVar1;
  float10 fVar2;
  
  pcVar1 = (code *)*DAT_004376e0;
  DAT_004376e0 = DAT_004376e0 + 4;
  fVar2 = (float10)(*pcVar1)();
  return (int)ROUND((double)(fVar2 * (float10)32.0));
}



/******************************************************************************/
/* TARGET 00428950  FUN_00428950 */
/******************************************************************************/

int FUN_00428950(void)

{
  code *pcVar1;
  float10 fVar2;
  
  pcVar1 = (code *)*DAT_004376e0;
  DAT_004376e0 = DAT_004376e0 + 4;
  fVar2 = (float10)(*pcVar1)();
  return (int)ROUND((double)(fVar2 * (float10)1000.0));
}



/******************************************************************************/
/* TARGET 00428980  FUN_00428980 */
/******************************************************************************/

int FUN_00428980(void)

{
  code *pcVar1;
  float10 fVar2;
  
  pcVar1 = (code *)*DAT_004376e0;
  DAT_004376e0 = DAT_004376e0 + 4;
  fVar2 = (float10)(*pcVar1)();
  return (int)ROUND((double)(fVar2 * (float10)64.0));
}



/******************************************************************************/
/* TARGET 004289b0  FUN_004289b0 */
/******************************************************************************/

int FUN_004289b0(void)

{
  code *pcVar1;
  float10 fVar2;
  
  pcVar1 = (code *)*DAT_004376e0;
  DAT_004376e0 = DAT_004376e0 + 4;
  fVar2 = (float10)(*pcVar1)();
  return (int)ROUND((double)(fVar2 * (float10)18.20648));
}



/******************************************************************************/
/* TARGET 004289e0  FUN_004289e0 */
/******************************************************************************/

char FUN_004289e0(void)

{
  uint uVar1;
  code *pcVar2;
  float10 fVar3;
  
  pcVar2 = (code *)*DAT_004376e0;
  DAT_004376e0 = DAT_004376e0 + 4;
  fVar3 = (float10)(*pcVar2)();
  uVar1 = (uint)ROUND((double)(fVar3 * (float10)255.0));
  if (0xff < uVar1) {
    return ((int)uVar1 < 0) + -1;
  }
  return (char)uVar1;
}



/******************************************************************************/
/* TARGET 00428a30  FUN_00428a30 */
/******************************************************************************/

longlong FUN_00428a30(void)

{
  code *pcVar1;
  float10 fVar2;
  
  pcVar1 = (code *)*DAT_004376e0;
  DAT_004376e0 = DAT_004376e0 + 4;
  fVar2 = (float10)(*pcVar1)();
  if ((longlong)ROUND((double)(fVar2 * (float10)10000000.0)) < 0) {
    return 0;
  }
  return (longlong)ROUND((double)(fVar2 * (float10)10000000.0));
}



/******************************************************************************/
/* TARGET 00428a70  FUN_00428a70 */
/******************************************************************************/

void FUN_00428a70(void)

{
  FILETIME local_8;
  
  local_8 = (FILETIME)FUN_00428a30();
  FileTimeToSystemTime(&local_8,(LPSYSTEMTIME)&lpSystemTime_00437860);
  return;
}



/******************************************************************************/
/* TARGET 00428aa0  FUN_00428aa0 */
/******************************************************************************/

_FILETIME FUN_00428aa0(void)

{
  FILETIME local_10;
  _FILETIME local_8;
  
  local_10 = (FILETIME)FUN_00428a30();
  LocalFileTimeToFileTime(&local_10,&local_8);
  return local_8;
}



/******************************************************************************/
/* TARGET 00428ad0  FUN_00428ad0 */
/******************************************************************************/

bool FUN_00428ad0(void)

{
  uint uVar1;
  
  uVar1 = FUN_004288f0();
  if (0x5fffffff < uVar1) {
    return uVar1 < 0x80000000;
  }
  return (bool)*(undefined1 *)
                ((((uVar1 >> 2 & 0x3f0000 | uVar1 & 0xfc00) >> 2 | uVar1 & 0xfc) >> 2) +
                DAT_00437150);
}



/******************************************************************************/
/* TARGET 00428b30  FUN_00428b30 */
/******************************************************************************/

undefined4 __fastcall FUN_00428b30(uint *param_1,uint *param_2)

{
  int iVar1;
  
  iVar1 = DAT_00437080;
  *param_1 = (int)ROUND(*(double *)(DAT_00437080 + 0x20));
  *param_2 = (int)ROUND(*(double *)(iVar1 + 0x28));
  if ((*param_1 < DAT_004376f4) && (*param_2 < DAT_004376f8)) {
    return 1;
  }
  return 0;
}



/******************************************************************************/
/* TARGET 00428b60  FUN_00428b60 */
/******************************************************************************/

undefined4 __fastcall FUN_00428b60(uint *param_1,uint *param_2)

{
  int iVar1;
  
  iVar1 = DAT_00437080;
  *param_1 = (int)ROUND(*(double *)(DAT_00437080 + 0x88));
  *param_2 = (int)ROUND(*(double *)(iVar1 + 0x90));
  if ((*param_1 < DAT_004376f4) && (*param_2 < DAT_004376f8)) {
    return 1;
  }
  return 0;
}



/******************************************************************************/
/* TARGET 00428ba0  FUN_00428ba0 */
/******************************************************************************/

int FUN_00428ba0(void)

{
  if (((uint)(int)ROUND(*(double *)(DAT_00437080 + 0x20)) < DAT_004376f4) &&
     ((uint)(int)ROUND(*(double *)(DAT_00437080 + 0x28)) < DAT_004376f8)) {
    return *DAT_004371f0 + 0xc +
           (*(int *)(*DAT_004371f0 + 4) * (int)ROUND(*(double *)(DAT_00437080 + 0x28)) +
           (int)ROUND(*(double *)(DAT_00437080 + 0x20))) * 8;
  }
  return 0;
}



/******************************************************************************/
/* TARGET 00428bf0  FUN_00428bf0 */
/******************************************************************************/

int FUN_00428bf0(void)

{
  if (((uint)(int)ROUND(*(double *)(DAT_00437080 + 0x88)) < DAT_004376f4) &&
     ((uint)(int)ROUND(*(double *)(DAT_00437080 + 0x90)) < DAT_004376f8)) {
    return *DAT_004371f0 + 0xc +
           (*(int *)(*DAT_004371f0 + 4) * (int)ROUND(*(double *)(DAT_00437080 + 0x90)) +
           (int)ROUND(*(double *)(DAT_00437080 + 0x88))) * 8;
  }
  return 0;
}



/******************************************************************************/
/* TARGET 00428c40  FUN_00428c40 */
/******************************************************************************/

void FUN_00428c40(void)

{
  return;
}



/******************************************************************************/
/* TARGET 00428c50  FUN_00428c50 */
/******************************************************************************/

undefined4 __fastcall FUN_00428c50(uint *param_1,uint *param_2)

{
  int *piVar1;
  uint uVar2;
  
  piVar1 = DAT_00437080;
  *param_1 = (int)ROUND(*(double *)(DAT_00437080 + 8));
  *param_2 = (int)ROUND(*(double *)(piVar1 + 10));
  switch((DAT_00437080[7] << 4) / *(int *)(*DAT_00437080 + 8)) {
  case 1:
  case 2:
  case 3:
    *param_1 = *param_1 + 1;
  case 4:
    *param_2 = *param_2 + 1;
    break;
  case 5:
  case 6:
  case 7:
    *param_2 = *param_2 + 1;
  case 8:
    uVar2 = *param_1 - 1;
LAB_00428ca1:
    *param_1 = uVar2;
    break;
  case 9:
  case 10:
  case 0xb:
    *param_1 = *param_1 - 1;
  case 0xc:
    *param_2 = *param_2 - 1;
    break;
  case 0xd:
  case 0xe:
  case 0xf:
    *param_2 = *param_2 - 1;
  case 0:
    uVar2 = *param_1 + 1;
    goto LAB_00428ca1;
  }
  if ((*param_1 < DAT_004376f4) && (*param_2 < DAT_004376f8)) {
    return 1;
  }
  return 0;
}



/******************************************************************************/
/* TARGET 00428d00  FUN_00428d00 */
/******************************************************************************/

undefined4 __fastcall FUN_00428d00(uint *param_1,uint *param_2)

{
  int iVar1;
  uint uVar2;
  
  iVar1 = DAT_00437080;
  *param_1 = (int)ROUND(*(double *)(DAT_00437080 + 0x88));
  *param_2 = (int)ROUND(*(double *)(iVar1 + 0x90));
  switch((*(int *)(DAT_00437080 + 0x84) << 4) / *(int *)(*(int *)(DAT_00437080 + 0x68) + 8)) {
  case 1:
  case 2:
  case 3:
    *param_1 = *param_1 + 1;
  case 4:
    *param_2 = *param_2 + 1;
    break;
  case 5:
  case 6:
  case 7:
    *param_2 = *param_2 + 1;
  case 8:
    uVar2 = *param_1 - 1;
LAB_00428d5b:
    *param_1 = uVar2;
    break;
  case 9:
  case 10:
  case 0xb:
    *param_1 = *param_1 - 1;
  case 0xc:
    *param_2 = *param_2 - 1;
    break;
  case 0xd:
  case 0xe:
  case 0xf:
    *param_2 = *param_2 - 1;
  case 0:
    uVar2 = *param_1 + 1;
    goto LAB_00428d5b;
  }
  if ((*param_1 < DAT_004376f4) && (*param_2 < DAT_004376f8)) {
    return 1;
  }
  return 0;
}



/******************************************************************************/
/* TARGET 004299d0  FUN_004299d0 */
/******************************************************************************/

void FUN_004299d0(void)

{
  code *pcVar1;
  int iVar2;
  
  iVar2 = DAT_004376e0[-3];
  pcVar1 = (code *)*DAT_004376e0;
  DAT_004376e0 = DAT_004376e0 + 4;
  (*pcVar1)();
  if (0 < iVar2) {
    do {
      pcVar1 = (code *)*DAT_004376e0;
      DAT_004376e0 = DAT_004376e0 + 4;
      (*pcVar1)();
      iVar2 = iVar2 + -1;
    } while (iVar2 != 0);
  }
  return;
}



/******************************************************************************/
/* TARGET 00429a40  FUN_00429a40 */
/******************************************************************************/

void FUN_00429a40(void)

{
  code *pcVar1;
  int iVar2;
  
  iVar2 = DAT_004376e0[-3];
  pcVar1 = (code *)*DAT_004376e0;
  DAT_004376e0 = DAT_004376e0 + 4;
  (*pcVar1)();
  if (0 < iVar2) {
    do {
      pcVar1 = (code *)*DAT_004376e0;
      DAT_004376e0 = DAT_004376e0 + 4;
      (*pcVar1)();
      iVar2 = iVar2 + -1;
    } while (iVar2 != 0);
  }
  return;
}



/******************************************************************************/
/* TARGET 00429a90  FUN_00429a90 */
/******************************************************************************/

void FUN_00429a90(void)

{
  code *pcVar1;
  int iVar2;
  
  iVar2 = DAT_004376e0[-3];
  pcVar1 = (code *)*DAT_004376e0;
  DAT_004376e0 = DAT_004376e0 + 4;
  (*pcVar1)();
  if (0 < iVar2) {
    do {
      pcVar1 = (code *)*DAT_004376e0;
      DAT_004376e0 = DAT_004376e0 + 4;
      (*pcVar1)();
      iVar2 = iVar2 + -1;
    } while (iVar2 != 0);
  }
  return;
}



/******************************************************************************/
/* TARGET 00429b00  FUN_00429b00 */
/******************************************************************************/

void FUN_00429b00(void)

{
  code *pcVar1;
  int iVar2;
  float10 fVar3;
  double dStack_10;
  
  iVar2 = DAT_004376e0[-3];
  pcVar1 = (code *)*DAT_004376e0;
  DAT_004376e0 = DAT_004376e0 + 4;
  fVar3 = (float10)(*pcVar1)();
  if (0 < iVar2) {
    do {
      dStack_10 = (double)fVar3;
      pcVar1 = (code *)*DAT_004376e0;
      DAT_004376e0 = DAT_004376e0 + 4;
      fVar3 = (float10)(*pcVar1)();
      if ((float10)dStack_10 == fVar3) {
        fVar3 = (float10)1.0;
      }
      else {
        fVar3 = (float10)dStack_10 / fVar3;
      }
      iVar2 = iVar2 + -1;
    } while (iVar2 != 0);
  }
  return;
}



/******************************************************************************/
/* TARGET 00429b60  FUN_00429b60 */
/******************************************************************************/

float10 __cdecl FUN_00429b60(double param_1,undefined4 param_2,undefined4 param_3)

{
  bool bVar1;
  float10 fVar2;
  
  if (0.0 < (double)CONCAT44(param_3,param_2)) {
    bVar1 = NAN(param_1);
    if (0.0 <= param_1) {
      do {
        param_1 = param_1 - (param_1 / (double)CONCAT44(param_3,param_2)) *
                            (double)CONCAT44(param_3,param_2);
      } while (bVar1);
      fVar2 = (float10)param_1;
    }
    else {
      fVar2 = FUN_00429b60(-param_1,param_2,param_3);
      fVar2 = (float10)(double)CONCAT44(param_3,param_2) - fVar2;
      if (fVar2 == (float10)(double)CONCAT44(param_3,param_2)) {
        return (float10)0.0;
      }
    }
    return fVar2;
  }
  if ((double)CONCAT44(param_3,param_2) == 0.0) {
    return (float10)0.0;
  }
  fVar2 = FUN_00429b60(-param_1,SUB84(-(double)CONCAT44(param_3,param_2),0),
                       (int)((ulonglong)-(double)CONCAT44(param_3,param_2) >> 0x20));
  return -fVar2;
}



/******************************************************************************/
/* TARGET 00429c20  FUN_00429c20 */
/******************************************************************************/

float10 FUN_00429c20(void)

{
  code *pcVar1;
  int iVar2;
  float10 fVar3;
  double dStack_18;
  undefined4 uStack_10;
  undefined4 uStack_c;
  
  iVar2 = DAT_004376e0[-3];
  pcVar1 = (code *)*DAT_004376e0;
  DAT_004376e0 = DAT_004376e0 + 4;
  fVar3 = (float10)(*pcVar1)();
  dStack_18 = (double)fVar3;
  if (0 < iVar2) {
    do {
      pcVar1 = (code *)*DAT_004376e0;
      DAT_004376e0 = DAT_004376e0 + 4;
      fVar3 = (float10)(*pcVar1)();
      uStack_c = (undefined4)((ulonglong)(double)fVar3 >> 0x20);
      uStack_10 = SUB84((double)fVar3,0);
      fVar3 = FUN_00429b60(dStack_18,uStack_10,uStack_c);
      dStack_18 = (double)fVar3;
      iVar2 = iVar2 + -1;
    } while (iVar2 != 0);
  }
  return (float10)dStack_18;
}



/******************************************************************************/
/* TARGET 00429d00  FUN_00429d00 */
/******************************************************************************/

float10 FUN_00429d00(void)

{
  uint uVar1;
  code *pcVar2;
  bool bVar3;
  undefined3 extraout_var;
  uint uVar4;
  uint uVar5;
  int iVar6;
  float10 fVar7;
  
  bVar3 = FUN_00428ad0();
  iVar6 = CONCAT31(extraout_var,bVar3);
  if ((iVar6 == 0) || (iVar6 == 1)) {
    iVar6 = 0xdf;
  }
  uVar5 = 7;
  iVar6 = ((iVar6 + -2) / 6) * 6 + 2;
  if (0xd3 < iVar6) {
    iVar6 = 0xd4;
    uVar5 = 0xc;
  }
  pcVar2 = (code *)*DAT_004376e0;
  DAT_004376e0 = DAT_004376e0 + 4;
  fVar7 = (float10)(*pcVar2)();
  uVar1 = (uint)ROUND((double)(fVar7 * (float10)(int)(uVar5 - 1)));
  uVar4 = uVar1;
  if (((uVar1 < uVar5) || (uVar4 = uVar5 - 1, -1 < (int)uVar1)) && (uVar4 != 0)) {
    return (float10)*(uint *)(DAT_0043715c + -4 + ((uVar5 - uVar4) + iVar6) * 4);
  }
  return (float10)0.0;
}



/******************************************************************************/
/* TARGET 0042a220  FUN_0042a220 */
/******************************************************************************/

float10 FUN_0042a220(void)

{
  code *pcVar1;
  uint uVar2;
  uint uVar3;
  int iVar4;
  char *pcVar5;
  int iVar6;
  int local_c;
  int iStack_8;
  int iStack_4;
  
  FUN_004064c0(&local_c);
  pcVar1 = (code *)*DAT_004376e0;
  DAT_004376e0 = DAT_004376e0 + 4;
  (*pcVar1)();
  FUN_004064c0(&iStack_8);
  pcVar1 = (code *)*DAT_004376e0;
  DAT_004376e0 = DAT_004376e0 + 4;
  (*pcVar1)();
  uVar2 = FUN_004288c0();
  uVar3 = FUN_004288c0();
  iVar4 = FUN_004288c0();
  pcVar5 = FUN_00406860(&local_c,'\r');
  if (-1 < (int)pcVar5) {
    FUN_00406c00(&local_c,(uint)pcVar5,0x7fffffff);
  }
  if (4 < uVar2) {
    uVar2 = 0;
  }
  if (5 < uVar3) {
    uVar3 = 0;
  }
  if (iVar4 < 1) {
    iVar4 = 1;
  }
  if (uVar3 == 0) {
    iVar6 = 1;
  }
  else if (((int)uVar3 < 2) || (3 < (int)uVar3)) {
    iVar6 = 2;
  }
  else {
    iVar6 = 3;
  }
  if (iVar6 < iVar4) {
    iVar4 = iVar6;
  }
  FUN_0041a1b0();
  DAT_004376f0 = 1;
  iStack_4 = MessageBoxA((HWND)DAT_00437238[DAT_004377ec * 0x2b],(LPCSTR)(iStack_8 + 0xc),
                         (LPCSTR)(local_c + 0xc),((iVar4 + 0xffffff) * 0x10 + uVar2) * 0x10 + uVar3)
  ;
  DAT_004376f0 = 0;
  if (DAT_004372ea != '\0') {
    FUN_0041aa00(DAT_00437238);
  }
  FUN_00406610(&iStack_8);
  FUN_00406610(&local_c);
  return (float10)iStack_4;
}



/******************************************************************************/
/* TARGET 0042a3b0  FUN_0042a3b0 */
/******************************************************************************/

undefined4 __cdecl FUN_0042a3b0(LPWIN32_FIND_DATAA param_1)

{
  HANDLE hFindFile;
  BOOL BVar1;
  
  FUN_00418330();
  hFindFile = DAT_00437448;
  if (*(int *)((int)DAT_00437448 + 4) != 0) {
    hFindFile = FindFirstFileA((LPCSTR)((int)DAT_00437448 + 0xc),param_1);
    if (hFindFile != (HANDLE)0xffffffff) {
      BVar1 = FindClose(hFindFile);
      return CONCAT31((int3)((uint)BVar1 >> 8),1);
    }
  }
  DAT_00437798 = 1;
  return (uint)hFindFile & 0xffffff00;
}



/******************************************************************************/
/* TARGET 0042a400  FUN_0042a400 */
/******************************************************************************/

float10 __cdecl FUN_0042a400(_FILETIME param_1)

{
  char in_AL;
  BOOL BVar1;
  
  if (in_AL != '\0') {
    BVar1 = FileTimeToLocalFileTime((FILETIME *)&stack0x00000010,&param_1);
    if (BVar1 != 0) {
      return (float10)(longlong)param_1 * (float10)1e-07;
    }
  }
  return (float10)0.0;
}



/******************************************************************************/
/* TARGET 0042ac90  FUN_0042ac90 */
/******************************************************************************/

float10 __fastcall FUN_0042ac90(uint param_1,byte param_2)

{
  code *pcVar1;
  uint uVar2;
  uint uVar3;
  int local_c;
  double dStack_8;
  
  FUN_00401d90(&local_c);
  pcVar1 = (code *)*DAT_004376e0;
  DAT_004376e0 = DAT_004376e0 + 4;
  (*pcVar1)();
  uVar2 = FUN_004288c0();
  uVar3 = FUN_004288c0();
  if ((uVar2 < *(uint *)(local_c + 4)) && (uVar3 < *(uint *)(local_c + 8))) {
    dStack_8 = (double)((int)(*(uint *)(local_c + 0x10 +
                                       (*(uint *)(local_c + 4) * uVar3 + uVar2) * 8) & param_1) >>
                       (param_2 & 0x1f));
    FUN_00401ea0(&local_c);
    return (float10)dStack_8;
  }
  FUN_00401ea0(&local_c);
  return (float10)0.0;
}



/******************************************************************************/
/* TARGET 0042ad20  FUN_0042ad20 */
/******************************************************************************/

void FUN_0042ad20(void)

{
  FUN_0042ac90(0x3ff,0);
  return;
}



/******************************************************************************/
/* TARGET 0042ad60  FUN_0042ad60 */
/******************************************************************************/

float10 FUN_0042ad60(void)

{
  return (float10)DAT_00437740 * (float10)0.03125;
}



/******************************************************************************/
/* TARGET 0042b0c0  FUN_0042b0c0 */
/******************************************************************************/

void FUN_0042b0c0(void)

{
  FUN_00406530(&DAT_00437878,s_msctls_progress32_004369d8,0xffffffff);
  return;
}



/******************************************************************************/
/* TARGET 0042b0e0  FUN_0042b0e0 */
/******************************************************************************/

void FUN_0042b0e0(void)

{
  FUN_0040d9b0(0x42b0f0);
  return;
}



/******************************************************************************/
/* TARGET 0042b140  FUN_0042b140 */
/******************************************************************************/

void FUN_0042b140(void)

{
  FUN_00406530(&DAT_00437870,s_msctls_trackbar32_004369ec,0xffffffff);
  return;
}



/******************************************************************************/
/* TARGET 0042b160  FUN_0042b160 */
/******************************************************************************/

void FUN_0042b160(void)

{
  FUN_0040d9b0(0x42b170);
  return;
}



/******************************************************************************/
/* TARGET 0042b1f0  FUN_0042b1f0 */
/******************************************************************************/

void FUN_0042b1f0(void)

{
  FUN_00406530(&DAT_00437858,s_SCROLLBAR_00436a00,0xffffffff);
  return;
}



/******************************************************************************/
/* TARGET 0042b210  FUN_0042b210 */
/******************************************************************************/

void FUN_0042b210(void)

{
  FUN_0040d9b0(0x42b220);
  return;
}



/******************************************************************************/
/* TARGET 0042b680  FUN_0042b680 */
/******************************************************************************/

float10 __cdecl FUN_0042b680(int param_1,uint param_2)

{
  if (DAT_0043787c == (HMODULE)0x0) {
    DAT_0043787c = LoadLibraryA(s_RICHED32_DLL_00436a0c);
  }
  FUN_00416180(param_1,(int *)&DAT_00437418,0xa0,0x49,param_2,0x200);
  return (float10)DAT_00436910;
}



/******************************************************************************/
/* TARGET 0042b7f0  FUN_0042b7f0 */
/******************************************************************************/

void FUN_0042b7f0(void)

{
  FUN_00406530(&DAT_00437874,s_SysListView32_00436a1c,0xffffffff);
  return;
}



/******************************************************************************/
/* TARGET 0042b810  FUN_0042b810 */
/******************************************************************************/

void FUN_0042b810(void)

{
  FUN_0040d9b0(0x42b820);
  return;
}



/******************************************************************************/
/* TARGET 0042c6b0  FUN_0042c6b0 */
/******************************************************************************/

void __fastcall FUN_0042c6b0(int *param_1)

{
  FUN_00402680(param_1);
  FUN_00404250();
  return;
}



/******************************************************************************/
/* TARGET 0042cb90  FUN_0042cb90 */
/******************************************************************************/

void FUN_0042cb90(void)

{
  FUN_00404800(&DAT_004378a8);
  return;
}



/******************************************************************************/
/* TARGET 0042cba0  FUN_0042cba0 */
/******************************************************************************/

void FUN_0042cba0(void)

{
  FUN_0040d9b0(0x42cbb0);
  return;
}



/******************************************************************************/
/* TARGET 0042cbc0  FUN_0042cbc0 */
/******************************************************************************/

void FUN_0042cbc0(void)

{
  if (DAT_00437954 != (int *)0x0) {
    (**(code **)(*DAT_00437954 + 8))(DAT_00437954);
    DAT_00437954 = (int *)0x0;
  }
  if (DAT_00437950 != (HMODULE)0x0) {
    FreeLibrary(DAT_00437950);
    DAT_00437950 = (HMODULE)0x0;
  }
  if (DAT_00437920 != (int *)0x0) {
    FUN_0040d410(DAT_00437920);
    DAT_00437920 = (int *)0x0;
  }
  DAT_00437948 = 0;
  return;
}



/******************************************************************************/
/* TARGET 0042cc10  FUN_0042cc10 */
/******************************************************************************/

/* WARNING: Type propagation algorithm not settling */
/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

undefined4 FUN_0042cc10(void)

{
  int iVar1;
  int iVar2;
  undefined4 *puVar3;
  int *piVar4;
  undefined8 uVar5;
  int *piStack_7c;
  int *piStack_78;
  int *piStack_74;
  int aiStack_70 [3];
  undefined2 uStack_64;
  undefined2 uStack_62;
  undefined4 uStack_60;
  undefined4 uStack_5c;
  undefined2 uStack_58;
  undefined2 uStack_56;
  undefined2 uStack_54;
  undefined4 uStack_50;
  undefined4 uStack_4c;
  undefined4 uStack_48;
  undefined4 uStack_44;
  undefined2 *puStack_40;
  undefined4 auStack_2c [10];
  
  if (DAT_00437944 != 0) {
    return DAT_00437948;
  }
  DAT_00437944 = 1;
  DAT_00437950 = LoadLibraryA(s_DSOUND_DLL_00436a5c);
  if (DAT_00437950 == (HMODULE)0x0) {
    return DAT_00437948;
  }
  _DAT_0043794c = GetProcAddress(DAT_00437950,s_DirectSoundCreate_00436a48);
  if ((((_DAT_0043794c == (FARPROC)0x0) || (iVar1 = (*_DAT_0043794c)(0,&DAT_00437954,0), iVar1 != 0)
       ) || (DAT_00437954 == (int *)0x0)) ||
     (iVar1 = (**(code **)(*DAT_00437954 + 0x18))(DAT_00437954,DAT_00437308,2), iVar1 != 0))
  goto LAB_0042cf04;
  puVar3 = auStack_2c;
  for (iVar1 = 9; iVar1 != 0; iVar1 = iVar1 + -1) {
    *puVar3 = 0;
    puVar3 = puVar3 + 1;
  }
  auStack_2c[0] = 0x24;
  auStack_2c[1] = 0x4001;
  piStack_74 = (int *)0x0;
  iVar1 = (**(code **)(*DAT_00437954 + 0xc))(DAT_00437954,auStack_2c,&piStack_74,0);
  if ((iVar1 != 0) || (piStack_74 == (int *)0x0)) {
    auStack_2c[1] = 1;
    iVar1 = (**(code **)(*DAT_00437954 + 0xc))(DAT_00437954,auStack_2c,&piStack_74,0);
    if ((iVar1 != 0) || (piStack_74 == (int *)0x0)) goto LAB_0042cf04;
  }
  uStack_64 = 1;
  uStack_62 = 2;
  uStack_60 = 0x5622;
  uStack_5c = 0x15888;
  uStack_58 = 4;
  uStack_56 = 0x10;
  uStack_54 = 0;
  iVar1 = (**(code **)(*piStack_74 + 0x38))(piStack_74,&uStack_64);
  (**(code **)(*piStack_7c + 8))(piStack_7c);
  if (iVar1 != 0) goto LAB_0042cf04;
  puStack_40 = &uStack_64;
  uStack_4c = DAT_00436a44;
  uStack_64 = 1;
  uStack_62 = 2;
  uStack_60 = 0x5622;
  uStack_58 = 4;
  uStack_5c = 0x15888;
  uStack_56 = 0x10;
  uStack_54 = 0;
  uStack_50 = 0x24;
  uStack_48 = 65000;
  uStack_44 = 0;
  piStack_78 = (int *)0x0;
  iVar1 = (**(code **)(*DAT_00437954 + 0xc))(DAT_00437954,&uStack_50,&piStack_78,0);
  if (iVar1 == 0) {
    if (piStack_78 == (int *)0x0) goto LAB_0042cddd;
  }
  else {
    piStack_78 = (int *)0x0;
LAB_0042cddd:
    DAT_00436a44 = 0x100e0;
    uStack_4c = 0x100e0;
    iVar1 = (**(code **)(*DAT_00437954 + 0xc))(DAT_00437954,&uStack_50,&piStack_78,0);
    if (iVar1 == 0) {
      if (piStack_78 != (int *)0x0) goto LAB_0042ce4b;
    }
    else {
      piStack_78 = (int *)0x0;
    }
    DAT_00436a44 = 0xa0;
    uStack_4c = 0xa0;
    iVar1 = (**(code **)(*DAT_00437954 + 0xc))(DAT_00437954,&uStack_50,&piStack_78,0);
    if ((iVar1 != 0) || (piStack_78 == (int *)0x0)) goto LAB_0042cf04;
  }
LAB_0042ce4b:
  uVar5 = 0;
  piVar4 = aiStack_70;
  aiStack_70[1] = 0;
  aiStack_70[0] = 0;
  iVar1 = (**(code **)(*piStack_78 + 0x2c))(piStack_78,0,65000,aiStack_70 + 1,piVar4,0,0,0);
  if (iVar1 == 0) {
    (**(code **)(*piVar4 + 0x4c))(piVar4,(int)((ulonglong)uVar5 >> 0x20),(int)uVar5,0,0);
  }
  (**(code **)(*piVar4 + 8))(piVar4);
  if (iVar1 == 0) {
    DAT_00437920 = FUN_0040d3a0(0x7d2);
    *DAT_00437920 = 0xd8f0;
    aiStack_70[2] = 1;
    do {
      iVar1 = aiStack_70[2];
      iVar2 = FUN_0040a250((double)aiStack_70[2] * 0.001 * 0.3010299956639812 * 2000.0);
      DAT_00437920[iVar1] = (short)iVar2;
      aiStack_70[2] = iVar1 + 1;
    } while (aiStack_70[2] < 0x3e9);
    DAT_00437948 = 1;
    return 1;
  }
LAB_0042cf04:
  FUN_0042cbc0();
  return DAT_00437948;
}



/******************************************************************************/
/* TARGET 0042cf20  FUN_0042cf20 */
/******************************************************************************/

/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

void __cdecl
FUN_0042cf20(int param_1,int param_2,char param_3,double param_4,undefined4 param_5,
            undefined4 param_6,double param_7)

{
  MMRESULT MVar1;
  int iVar2;
  int iVar3;
  undefined4 *puVar4;
  uint uVar5;
  undefined4 unaff_EBX;
  undefined4 *unaff_ESI;
  int *piVar6;
  int *piVar7;
  uint unaff_EDI;
  int iVar8;
  undefined4 *puVar9;
  uint *puVar10;
  int *piVar11;
  short sVar12;
  int local_7c;
  int *local_78;
  int local_74;
  undefined4 local_70;
  undefined4 local_6c;
  int local_68;
  uint local_64;
  undefined8 local_60;
  undefined8 local_58;
  int *local_4c;
  undefined8 local_48;
  WAVEFORMATEX WStack_40;
  undefined4 uStack_2c;
  undefined4 uStack_28;
  undefined4 uStack_24;
  undefined4 uStack_20;
  WAVEFORMATEX *pWStack_1c;
  
  FUN_0042cc10();
  if (*(int *)(param_1 + 4) < 1) goto LAB_0042d793;
  if ((param_2 < 1) || (100000 < param_2)) {
    param_2 = 0x40000000;
  }
  iVar2 = param_2;
  if (((DAT_00436a30 == '\0') || (*(int *)(param_1 + 0xc) != 1)) &&
     (FUN_0042dc50(), *(int *)(param_1 + 0xc) != 1)) {
    if (0 < DAT_00436a2c) goto LAB_0042d793;
    DAT_00436a30 = '\0';
    FUN_00405750(&DAT_004378a8,&param_1);
    DAT_00436a38 = 0x400;
    _DAT_00436a3c = ((int)*(short *)(param_1 + 0x10) * *(int *)(param_1 + 8)) / 2;
    if ((0x4f < *(int *)(param_1 + 0xc)) && (*(int *)(param_1 + 0xc) < 0x60)) {
      _DAT_00436a3c = *(int *)(*(int *)(param_1 + 0x1c) + 8);
      DAT_00436a38 = (uint)*(ushort *)(*(int *)(param_1 + 0x1c) + 0x18);
    }
    if (_DAT_00436a3c < 3) {
      _DAT_00436a3c = 2;
    }
    if (DAT_00436a38 < 2) {
      DAT_00436a38 = 2;
    }
    DAT_00436a40 = ((DAT_00436a38 + 0x3fff) / DAT_00436a38) * DAT_00436a38;
    MVar1 = waveOutOpen((LPHWAVEOUT)&phwo_00437924,0xffffffff,*(LPCWAVEFORMATEX *)(param_1 + 0x1c),0
                        ,0,0);
    if (MVar1 == 0) {
      _DAT_00437938 = 0;
      _DAT_0043793c = 0;
      DAT_0043792c = *(int *)(param_1 + 0x1c) + *(int *)(param_1 + 0x18);
      DAT_00437930 = *(int *)(param_1 + 4) - *(int *)(param_1 + 0x18);
      DAT_00436a34 = iVar2;
      if (DAT_00437930 < 0) {
        DAT_00437930 = 0;
        DAT_00436a34 = 0;
        FUN_00404840(&param_1);
        return;
      }
      goto LAB_0042d793;
    }
  }
  else {
    DAT_00436a30 = '\x01';
    FUN_00405750(&DAT_004378a8,&param_1);
    FUN_0042dd10('\0');
    if (-1.0 <= (double)CONCAT44(param_6,param_5)) {
      if (1.0 < (double)CONCAT44(param_6,param_5)) {
        param_5 = 0;
        param_6 = 0x3ff00000;
      }
    }
    else {
      param_5 = 0;
      param_6 = 0xbff00000;
    }
    local_58 = 1.0;
    if ((double)CONCAT44(param_6,param_5) <= 0.0) {
      local_48 = (double)CONCAT44(param_6,param_5) + 1.0;
    }
    else {
      local_58 = 1.0 - (double)CONCAT44(param_6,param_5);
      local_48 = 1.0;
    }
    param_4 = ABS(param_4);
    if (1.0 < param_4) {
      param_4 = 1.0;
    }
    local_58 = local_58 * param_4;
    local_48 = local_48 * param_4;
    local_64 = ((int)((int)*(short *)(param_1 + 0x12) +
                     ((int)*(short *)(param_1 + 0x12) >> 0x1f & 7U)) >> 3) *
               (int)*(short *)(param_1 + 0x10) * *(int *)(param_1 + 8);
    local_60 = (double)(int)local_64 * ABS(param_7) * 4.5351473922902495e-05;
    if ((double)*(int *)(param_1 + 4) <= local_60) {
      local_60 = (double)*(int *)(param_1 + 4);
    }
    local_74 = FUN_0040a250(ABS(param_7) * 22050.0);
    if (local_74 < 100) {
      local_74 = 100;
    }
    else if (100000 < local_74) {
      local_74 = 100000;
    }
    local_6c = 0;
    local_70 = 0;
    if (DAT_00437948 != 0) {
      iVar2 = FUN_0040a250(param_4 * 1000.0);
      local_6c = CONCAT22(local_6c._2_2_,*(undefined2 *)(DAT_00437920 + iVar2 * 2));
      if ((double)CONCAT44(param_6,param_5) <= 0.0) {
        iVar2 = FUN_0040a250(((double)CONCAT44(param_6,param_5) + 1.0) * 1000.0);
        local_70 = CONCAT22(local_70._2_2_,*(undefined2 *)(DAT_00437920 + iVar2 * 2));
      }
      else {
        iVar2 = FUN_0040a250((1.0 - (double)CONCAT44(param_6,param_5)) * 1000.0);
        local_70 = CONCAT22((short)((uint)iVar2 >> 0x10),-*(short *)(DAT_00437920 + iVar2 * 2));
      }
    }
    iVar2 = 0;
    local_7c = 0x400;
    local_78 = DAT_00437928;
    local_68 = 0x40000000;
    iVar8 = 0;
    piVar6 = DAT_00437910;
    do {
      if ((int)local_78 < 1) {
        if ((0 < local_7c) && (0 < DAT_00437910[iVar2 * 0x10])) {
          iVar2 = 0x400 - local_7c;
        }
        break;
      }
      if (((0 < *piVar6) && (local_78 = (int *)((int)local_78 + -1), piVar6[0xb] == param_1)) &&
         ((short)piVar6[0xf] == DAT_00437942)) {
        piVar7 = (int *)piVar6[0xc];
        if (param_3 != '\0') {
          piVar6[6] = 0;
          piVar6[7] = 0;
          if (piVar7 == (int *)0x0) goto LAB_0042d3d2;
          (**(code **)(*piVar7 + 0x34))(piVar7,0);
        }
        if (piVar7 != (int *)0x0) {
          if (local_74 != piVar6[0xd]) {
            (**(code **)(*piVar7 + 0x44))(piVar7,local_74);
          }
          if ((short)local_6c != (short)piVar6[0xe]) {
            (**(code **)(*piVar7 + 0x3c))(piVar7,(int)(short)local_6c);
          }
          if ((short)local_70 != *(short *)((int)piVar6 + 0x3a)) {
            (**(code **)(*piVar7 + 0x40))(piVar7,(int)(short)local_70);
          }
          local_64 = 0;
          (**(code **)(*piVar7 + 0x24))(piVar7,&local_64);
          if ((local_64 & 1) == 0) {
            (**(code **)(*piVar7 + 0x30))(piVar7,0,0,param_2 == 0x40000000);
          }
        }
LAB_0042d3d2:
        piVar6[2] = (int)(int *)local_58;
        piVar6[3] = local_58._4_4_;
        piVar6[4] = (int)local_48;
        piVar6[5] = local_48._4_4_;
        piVar6[8] = (int)local_60;
        piVar6[9] = local_60._4_4_;
        piVar6[10] = param_2;
        piVar6[0xd] = local_74;
        *(short *)(piVar6 + 0xe) = (short)local_6c;
        *(short *)((int)piVar6 + 0x3a) = (short)local_70;
        FUN_00404840(&param_1);
        return;
      }
      if (*piVar6 == 0) {
        if (0 < local_68) {
          local_68 = 0;
          iVar2 = iVar8;
        }
      }
      else {
        iVar3 = FUN_0040a250(*(double *)(piVar6 + 6));
        if (*piVar6 - iVar3 < local_68) {
          iVar2 = iVar8;
          local_68 = *piVar6 - iVar3;
        }
      }
      piVar6 = piVar6 + 0x10;
      local_7c = local_7c + -1;
      iVar8 = iVar8 + 1;
    } while (iVar8 < 0x400);
    piVar6 = DAT_00437910 + iVar2 * 0x10;
    if (*piVar6 == 0) {
      DAT_00437928 = (int *)((int)DAT_00437928 + 1);
    }
    piVar7 = piVar6 + 0xc;
    local_4c = piVar7;
    if ((int *)piVar6[0xc] != (int *)0x0) {
      (**(code **)(*(int *)piVar6[0xc] + 8))();
      *piVar7 = 0;
    }
    *piVar6 = *(int *)(param_1 + 4);
    iVar2 = *(int *)(param_1 + 0x1c);
    piVar6[2] = (int)(int *)local_58;
    piVar6[3] = local_58._4_4_;
    piVar6[1] = iVar2;
    piVar6[8] = (int)local_60;
    piVar6[4] = (int)local_48;
    piVar6[5] = local_48._4_4_;
    piVar6[6] = 0;
    piVar6[7] = 0;
    piVar6[9] = local_60._4_4_;
    piVar6[10] = param_2;
    FUN_00405750(piVar6 + 0xb,&param_1);
    piVar6[0xd] = local_74;
    *(short *)(piVar6 + 0xe) = (short)local_6c;
    *(short *)((int)piVar6 + 0x3a) = (short)local_70;
    *(short *)(piVar6 + 0xf) = DAT_00437942;
    if (DAT_00437948 != 0) {
      piVar7 = (int *)(param_1 + 0x14);
      local_58 = (double)CONCAT44(local_58._4_4_,piVar7);
      piVar11 = (int *)*piVar7;
      if (piVar11 != (int *)0x0) {
        local_64 = 0;
        (**(code **)(*piVar11 + 0x24))(piVar11);
        if ((local_64 & 2) != 0) {
          (**(code **)(*(int *)*piVar7 + 8))();
          *piVar7 = 0;
        }
      }
      if (*piVar7 == 0) {
        FUN_00401020(&local_7c,&param_1);
        FUN_00404d90(&local_7c);
        FUN_00404aa0(&local_7c);
        FUN_00404b30(&local_7c);
        FUN_00404fb0(&local_7c,0x5622);
        WStack_40.wFormatTag = 1;
        WStack_40.nChannels = 2;
        WStack_40.nSamplesPerSec = 0x5622;
        WStack_40.nBlockAlign = 4;
        WStack_40.nAvgBytesPerSec = 0x15888;
        WStack_40.wBitsPerSample = 0x10;
        WStack_40.cbSize = 0;
        uStack_2c = 0x24;
        uStack_28 = DAT_00436a44;
        uStack_24 = *(undefined4 *)(local_7c + 4);
        pWStack_1c = &WStack_40;
        uStack_20 = 0;
        local_78 = (int *)0x0;
        iVar2 = (**(code **)(*DAT_00437954 + 0xc))(DAT_00437954,&uStack_2c,&local_78);
        if (iVar2 == 0) {
          if (local_78 != (int *)0x0) {
            local_64 = 0;
            local_68 = 0;
            local_60 = (double)CONCAT44(local_60._4_4_,*(undefined4 *)(local_7c + 4));
            piVar11 = &local_68;
            puVar10 = &local_64;
            iVar2 = (**(code **)(*local_78 + 0x2c))
                              (local_78,0,*(undefined4 *)(local_7c + 4),puVar10,piVar11,0,0);
            if (iVar2 != 0) {
              (**(code **)(*piVar11 + 8))(piVar11);
              goto LAB_0042d687;
            }
            if ((int)unaff_EDI < 0) {
              unaff_EDI = 0;
            }
            if ((int)puVar10[1] < (int)unaff_EDI) {
              unaff_EDI = puVar10[1];
            }
            puVar4 = (undefined4 *)puVar10[7];
            puVar9 = unaff_ESI;
            for (uVar5 = unaff_EDI >> 2; uVar5 != 0; uVar5 = uVar5 - 1) {
              *puVar9 = *puVar4;
              puVar4 = puVar4 + 1;
              puVar9 = puVar9 + 1;
            }
            for (uVar5 = unaff_EDI & 3; uVar5 != 0; uVar5 = uVar5 - 1) {
              *(undefined1 *)puVar9 = *(undefined1 *)puVar4;
              puVar4 = (undefined4 *)((int)puVar4 + 1);
              puVar9 = (undefined4 *)((int)puVar9 + 1);
            }
            (**(code **)(*piVar11 + 0x4c))(piVar11,unaff_ESI,unaff_EDI,0,0);
            piVar7 = (int *)local_58;
          }
        }
        else {
LAB_0042d687:
          local_78 = (int *)0x0;
        }
        *piVar7 = (int)local_78;
        FUN_00404840(&local_7c);
      }
      piVar11 = local_4c;
      if (*piVar7 != 0) {
        sVar12 = (short)local_4c;
        iVar2 = (**(code **)(*DAT_00437954 + 0x14))(DAT_00437954,*piVar7,local_4c);
        if (iVar2 != 0) {
          *piVar11 = *piVar7;
          *piVar7 = 0;
        }
        piVar11 = (int *)*piVar11;
        (**(code **)(*piVar11 + 0x44))(piVar11,unaff_EBX);
        (**(code **)(*piVar11 + 0x3c))(piVar11,(int)(short)unaff_EBX);
        (**(code **)(*piVar11 + 0x40))(piVar11,(int)sVar12);
        (**(code **)(*piVar11 + 0x34))(piVar11,0);
        (**(code **)(*piVar11 + 0x30))(piVar11,0,0,param_2 == 0x40000000);
        FUN_00404840(&param_1);
        return;
      }
    }
    if ((phwo_00437924 != (LPHWAVEOUT)0x0) || (0 < DAT_00436a2c)) goto LAB_0042d793;
    puVar4 = &DAT_00437900;
    do {
      *puVar4 = 1;
      puVar4 = puVar4 + -8;
    } while (0x4378bf < (int)puVar4);
    WStack_40.wFormatTag = 1;
    WStack_40.nChannels = 2;
    WStack_40.nSamplesPerSec = 0x5622;
    WStack_40.nAvgBytesPerSec = 0x15888;
    WStack_40.nBlockAlign = 4;
    WStack_40.wBitsPerSample = 0x10;
    WStack_40.cbSize = 0;
    MVar1 = waveOutOpen((LPHWAVEOUT)&phwo_00437924,0xffffffff,&WStack_40,0,0,0);
    if (MVar1 == 0) goto LAB_0042d793;
    *piVar6 = 0;
    DAT_00437928 = (int *)0x0;
  }
  phwo_00437924 = (LPHWAVEOUT)0x0;
  DAT_00436a2c = 0x24;
LAB_0042d793:
  FUN_00404840(&param_1);
  return;
}



/******************************************************************************/
/* TARGET 0042d7b0  FUN_0042d7b0 */
/******************************************************************************/

void __cdecl FUN_0042d7b0(int param_1)

{
  int *piVar1;
  int iVar2;
  int iVar3;
  int *piVar4;
  
  if (DAT_00436a30 == '\0') {
    if (DAT_004378a8 == param_1) {
      FUN_0042dc50();
      FUN_00404840(&param_1);
      return;
    }
  }
  else {
    iVar2 = 0x400;
    iVar3 = DAT_00437928;
    piVar4 = DAT_00437910;
    while (0 < iVar3) {
      if (((0 < *piVar4) && (iVar3 = iVar3 + -1, piVar4[0xb] == param_1)) &&
         ((short)piVar4[0xf] == DAT_00437942)) {
        *piVar4 = 0;
        FUN_00404990(piVar4 + 0xb);
        DAT_00437928 = DAT_00437928 + -1;
        piVar1 = (int *)piVar4[0xc];
        if (piVar1 != (int *)0x0) {
          (**(code **)(*piVar1 + 0x48))(piVar1);
          (**(code **)(*piVar1 + 8))(piVar1);
          piVar4[0xc] = 0;
        }
        break;
      }
      piVar4 = piVar4 + 0x10;
      iVar2 = iVar2 + -1;
      if (iVar2 < 1) {
        FUN_00404840(&param_1);
        return;
      }
    }
  }
  FUN_00404840(&param_1);
  return;
}



/******************************************************************************/
/* TARGET 0042d870  FUN_0042d870 */
/******************************************************************************/

/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

void __cdecl FUN_0042d870(double param_1)

{
  double dVar1;
  double dVar2;
  int iVar3;
  MMRESULT MVar4;
  uint uVar5;
  int iVar6;
  byte *pbVar7;
  int *piVar8;
  
  if (DAT_00437940 == '\0') {
    if (param_1 < 0.0) {
      param_1 = 0.0;
    }
    if (DAT_00436a30 == '\0') {
      if ((phwo_00437924 != (LPHWAVEOUT)0x0) &&
         ((*(int *)(DAT_004378a8 + 0xc) == 2 || (*(int *)(DAT_004378a8 + 0xc) == 0x55)))) {
        dVar1 = (double)(*(int *)(DAT_004378a8 + 4) - *(int *)(DAT_004378a8 + 0x18)) /
                (double)_DAT_00436a3c;
        if (dVar1 < param_1) {
          param_1 = dVar1;
        }
        iVar3 = FUN_0040a250((double)(DAT_00436a38 / 2) + (double)_DAT_00436a3c * param_1);
        iVar3 = (iVar3 / DAT_00436a38) * DAT_00436a38;
        if (iVar3 < 0) {
          iVar3 = 0;
        }
        iVar6 = *(int *)(DAT_004378a8 + 4) - *(int *)(DAT_004378a8 + 0x18);
        if (iVar6 < iVar3) {
          iVar3 = iVar6;
        }
        _DAT_00437938 = (double)iVar3 / (double)_DAT_00436a3c;
        DAT_0043792c = *(int *)(DAT_004378a8 + 0x1c) + *(int *)(DAT_004378a8 + 0x18) + iVar3;
        DAT_00437930 = (*(int *)(DAT_004378a8 + 4) - *(int *)(DAT_004378a8 + 0x18)) - iVar3;
        if (DAT_00437930 < 0) {
          DAT_00437930 = 0;
          DAT_00436a34 = 0;
        }
        waveOutReset((HWAVEOUT)phwo_00437924);
        pbVar7 = (byte *)&DAT_00437900;
        do {
          if ((*pbVar7 & 2) != 0) {
            waveOutUnprepareHeader((HWAVEOUT)phwo_00437924,(LPWAVEHDR)(pbVar7 + -0x10),0x20);
          }
          pbVar7[0] = 1;
          pbVar7[1] = 0;
          pbVar7[2] = 0;
          pbVar7[3] = 0;
          pbVar7 = pbVar7 + -0x20;
        } while (0x4378bf < (int)pbVar7);
        waveOutClose((HWAVEOUT)phwo_00437924);
        MVar4 = waveOutOpen((LPHWAVEOUT)&phwo_00437924,0xffffffff,
                            *(LPCWAVEFORMATEX *)(DAT_004378a8 + 0x1c),0,0,0);
        if (MVar4 != 0) {
          phwo_00437924 = (LPHWAVEOUT)0x0;
          return;
        }
      }
    }
    else {
      iVar6 = 0x400;
      iVar3 = DAT_00437928;
      piVar8 = DAT_00437910;
      while (0 < iVar3) {
        if (((0 < *piVar8) && (iVar3 = iVar3 + -1, piVar8[0xb] == DAT_004378a8)) &&
           ((short)piVar8[0xf] == DAT_00437942)) {
          dVar2 = (double)(((int)((int)*(short *)(DAT_004378a8 + 0x12) +
                                 ((int)*(short *)(DAT_004378a8 + 0x12) >> 0x1f & 7U)) >> 3) *
                           (int)*(short *)(DAT_004378a8 + 0x10) * *(int *)(DAT_004378a8 + 8));
          dVar1 = (double)*(int *)(DAT_004378a8 + 4) / dVar2;
          if (dVar1 < param_1) {
            param_1 = dVar1;
          }
          uVar5 = FUN_0040a250(dVar2 * param_1);
          if ((int)*(uint *)(DAT_004378a8 + 4) < (int)uVar5) {
            uVar5 = *(uint *)(DAT_004378a8 + 4);
          }
          *(double *)(piVar8 + 6) =
               (double)(int)(~(((int)((int)*(short *)(DAT_004378a8 + 0x12) +
                                     ((int)*(short *)(DAT_004378a8 + 0x12) >> 0x1f & 7U)) >> 3) *
                               (int)*(short *)(DAT_004378a8 + 0x10) - 1U) & uVar5);
          if (piVar8[0xc] == 0) {
            return;
          }
          uVar5 = FUN_0040a250(param_1 * 88200.0);
          (**(code **)(*(int *)piVar8[0xc] + 0x34))((int *)piVar8[0xc],uVar5 & 0xfffffffc);
          return;
        }
        piVar8 = piVar8 + 0x10;
        iVar6 = iVar6 + -1;
        if (iVar6 < 1) {
          return;
        }
      }
    }
  }
  return;
}



/******************************************************************************/
/* TARGET 0042db10  FUN_0042db10 */
/******************************************************************************/

/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

float10 FUN_0042db10(void)

{
  int *piVar1;
  int *piVar2;
  int iVar3;
  int iVar4;
  int unaff_EDI;
  int local_14 [2];
  mmtime_tag local_c;
  
  if (DAT_00436a30 == '\0') {
    if (phwo_00437924 != (LPHWAVEOUT)0x0) {
      local_c.wType = 2;
      local_c.u.ms = 0;
      waveOutGetPosition((HWAVEOUT)phwo_00437924,&local_c,0xc);
      return (float10)local_c.u._0_4_ / (float10)*(int *)(DAT_004378a8 + 8) + (float10)_DAT_00437938
      ;
    }
  }
  else {
    iVar3 = 0x400;
    piVar2 = DAT_00437910;
    iVar4 = DAT_00437928;
    do {
      if (iVar4 < 1) break;
      if (((0 < *piVar2) && (iVar4 = iVar4 + -1, piVar2[0xb] == DAT_004378a8)) &&
         ((short)piVar2[0xf] == DAT_00437942)) {
        piVar1 = (int *)piVar2[0xc];
        if (piVar1 != (int *)0x0) {
          local_14[0] = 0;
          (**(code **)(*piVar1 + 0x10))(piVar1,local_14,0);
          return (float10)unaff_EDI * (float10)1.1337868480725624e-05;
        }
        local_14[0] = FUN_0040a250(*(double *)(piVar2 + 6));
        if (local_14[0] < 0) {
          local_14[0] = 0;
        }
        if (*(int *)(DAT_004378a8 + 4) < local_14[0]) {
          local_14[0] = *(int *)(DAT_004378a8 + 4);
        }
        return (float10)local_14[0] /
               (float10)(((int)((int)*(short *)(DAT_004378a8 + 0x12) +
                               ((int)*(short *)(DAT_004378a8 + 0x12) >> 0x1f & 7U)) >> 3) *
                         (int)*(short *)(DAT_004378a8 + 0x10) * *(int *)(DAT_004378a8 + 8));
      }
      piVar2 = piVar2 + 0x10;
      iVar3 = iVar3 + -1;
    } while (0 < iVar3);
  }
  return (float10)0.0;
}



/******************************************************************************/
/* TARGET 0042dc50  FUN_0042dc50 */
/******************************************************************************/

void FUN_0042dc50(void)

{
  int *piVar1;
  byte *pbVar2;
  undefined4 *puVar3;
  int iVar4;
  
  if (phwo_00437924 != (LPHWAVEOUT)0x0) {
    waveOutReset((HWAVEOUT)phwo_00437924);
    pbVar2 = (byte *)&DAT_00437900;
    do {
      if ((*pbVar2 & 2) != 0) {
        waveOutUnprepareHeader((HWAVEOUT)phwo_00437924,(LPWAVEHDR)(pbVar2 + -0x10),0x20);
      }
      pbVar2[0] = 1;
      pbVar2[1] = 0;
      pbVar2[2] = 0;
      pbVar2[3] = 0;
      pbVar2 = pbVar2 + -0x20;
    } while (0x4378bf < (int)pbVar2);
    waveOutClose((HWAVEOUT)phwo_00437924);
    phwo_00437924 = (LPHWAVEOUT)0x0;
  }
  iVar4 = 0x400;
  puVar3 = DAT_00437910;
  do {
    *puVar3 = 0;
    FUN_00404990(puVar3 + 0xb);
    piVar1 = (int *)puVar3[0xc];
    if (piVar1 != (int *)0x0) {
      (**(code **)(*piVar1 + 0x48))(piVar1);
      (**(code **)(*(int *)puVar3[0xc] + 8))((int *)puVar3[0xc]);
      puVar3[0xc] = 0;
    }
    puVar3 = puVar3 + 0x10;
    iVar4 = iVar4 + -1;
  } while (iVar4 != 0);
  FUN_00404990(&DAT_004378a8);
  DAT_00437928 = 0;
  DAT_00437930 = 0;
  DAT_00436a34 = 0;
  DAT_00437940 = 0;
  return;
}



/******************************************************************************/
/* TARGET 0042dd10  FUN_0042dd10 */
/******************************************************************************/

void __cdecl FUN_0042dd10(char param_1)

{
  if ((phwo_00437924 != (LPHWAVEOUT)0x0) && (param_1 != DAT_00437940)) {
    DAT_00437940 = param_1;
    if (param_1 != '\0') {
      waveOutPause((HWAVEOUT)phwo_00437924);
      return;
    }
    waveOutRestart((HWAVEOUT)phwo_00437924);
  }
  return;
}



/******************************************************************************/
/* TARGET 0042dd40  FUN_0042dd40 */
/******************************************************************************/

int __fastcall FUN_0042dd40(uint *param_1,short *param_2,int param_3)

{
  double *pdVar1;
  uint uVar2;
  double dVar3;
  double dVar4;
  double dVar5;
  double dVar6;
  double dVar7;
  double dVar8;
  double dVar9;
  double dVar10;
  double dVar11;
  double dVar12;
  double dVar13;
  double dVar14;
  uint uVar15;
  int iVar16;
  short *psVar17;
  uint uVar18;
  byte bVar19;
  int local_40;
  undefined8 local_28;
  
  local_40 = 0;
  uVar2 = param_1[1];
  pdVar1 = (double *)(param_1 + 2);
  dVar12 = *pdVar1;
  dVar9 = *pdVar1;
  dVar3 = *pdVar1;
  dVar4 = *pdVar1;
  pdVar1 = (double *)(param_1 + 4);
  dVar13 = *pdVar1;
  dVar10 = *pdVar1;
  dVar7 = *pdVar1;
  dVar5 = *pdVar1;
  uVar18 = *param_1;
  local_28 = *(double *)(param_1 + 6);
  pdVar1 = (double *)(param_1 + 8);
  dVar14 = *pdVar1;
  dVar11 = *pdVar1;
  dVar8 = *pdVar1;
  dVar6 = *pdVar1;
  bVar19 = *(short *)(param_1[0xb] + 0x12) == 0x10;
  if (*(short *)(param_1[0xb] + 0x10) == 2) {
    bVar19 = bVar19 | 2;
  }
  switch(bVar19) {
  case 0:
    while ((0 < param_3 && (uVar15 = FUN_0040a250(local_28), uVar15 < uVar18))) {
      dVar3 = (double)((int)(char)(*(char *)(uVar15 + uVar2) + -0x80) << 8);
      iVar16 = FUN_0040a250(dVar3 * dVar4);
      iVar16 = iVar16 + *param_2;
      if (iVar16 < 0x8000) {
        if (iVar16 < -0x7fff) {
          iVar16 = -0x7fff;
        }
      }
      else {
        iVar16 = 0x7fff;
      }
      *param_2 = (short)iVar16;
      iVar16 = FUN_0040a250(dVar3 * dVar5);
      iVar16 = iVar16 + param_2[1];
      if (iVar16 < 0x8000) {
        if (iVar16 < -0x7fff) {
          iVar16 = -0x7fff;
        }
      }
      else {
        iVar16 = 0x7fff;
      }
      param_2[1] = (short)iVar16;
      local_28 = dVar6 + local_28;
      param_2 = param_2 + 2;
      local_40 = local_40 + 1;
      param_3 = param_3 + -1;
    }
    break;
  case 1:
    if (0 < (int)(uVar18 - 1)) {
      for (; 0 < param_3; param_3 = param_3 + -1) {
        uVar15 = FUN_0040a250(local_28);
        uVar15 = uVar15 & 0xfffffffe;
        if (uVar18 - 1 <= uVar15) break;
        iVar16 = FUN_0040a250((double)(int)*(short *)(uVar15 + uVar2) * dVar9);
        iVar16 = iVar16 + *param_2;
        if (iVar16 < 0x8000) {
          if (iVar16 < -0x7fff) {
            iVar16 = -0x7fff;
          }
        }
        else {
          iVar16 = 0x7fff;
        }
        *param_2 = (short)iVar16;
        iVar16 = FUN_0040a250((double)(int)*(short *)(uVar15 + uVar2) * dVar10);
        iVar16 = iVar16 + param_2[1];
        if (iVar16 < 0x8000) {
          if (iVar16 < -0x7fff) {
            iVar16 = -0x7fff;
          }
        }
        else {
          iVar16 = 0x7fff;
        }
        param_2[1] = (short)iVar16;
        local_28 = dVar11 + local_28;
        param_2 = param_2 + 2;
        local_40 = local_40 + 1;
      }
    }
    break;
  case 2:
    for (; 0 < param_3; param_3 = param_3 + -1) {
      uVar15 = FUN_0040a250(local_28);
      uVar15 = uVar15 & 0xfffffffe;
      if (uVar15 < uVar18) {
        iVar16 = FUN_0040a250((double)((int)(char)(*(char *)(uVar15 + uVar2) + -0x80) << 8) * dVar3)
        ;
        iVar16 = iVar16 + *param_2;
        if (iVar16 < 0x8000) {
          if (iVar16 < -0x7fff) {
            iVar16 = -0x7fff;
          }
        }
        else {
          iVar16 = 0x7fff;
        }
        *param_2 = (short)iVar16;
      }
      psVar17 = param_2 + 1;
      if ((uVar15 | 1) < uVar18) {
        iVar16 = FUN_0040a250((double)((int)(char)(*(char *)((uVar15 | 1) + uVar2) + -0x80) << 8) *
                              dVar7);
        iVar16 = iVar16 + *psVar17;
        if (iVar16 < 0x8000) {
          if (iVar16 < -0x7fff) {
            iVar16 = -0x7fff;
          }
          *psVar17 = (short)iVar16;
        }
        else {
          *psVar17 = 0x7fff;
        }
      }
      else if (uVar18 <= uVar15) break;
      local_28 = dVar8 + local_28;
      param_2 = param_2 + 2;
      local_40 = local_40 + 1;
    }
    break;
  case 3:
    uVar18 = uVar18 - 1;
    if (0 < (int)uVar18) {
      for (; 0 < param_3; param_3 = param_3 + -1) {
        uVar15 = FUN_0040a250(local_28);
        uVar15 = uVar15 & 0xfffffffc;
        if (uVar15 < uVar18) {
          iVar16 = FUN_0040a250((double)(int)*(short *)(uVar15 + uVar2) * dVar12);
          iVar16 = iVar16 + *param_2;
          if (iVar16 < 0x8000) {
            if (iVar16 < -0x7fff) {
              iVar16 = -0x7fff;
            }
          }
          else {
            iVar16 = 0x7fff;
          }
          *param_2 = (short)iVar16;
        }
        psVar17 = param_2 + 1;
        if (uVar15 + 2 < uVar18) {
          iVar16 = FUN_0040a250((double)(int)*(short *)(uVar15 + 2 + uVar2) * dVar13);
          iVar16 = iVar16 + *psVar17;
          if (iVar16 < 0x8000) {
            if (iVar16 < -0x7fff) {
              iVar16 = -0x7fff;
            }
            *psVar17 = (short)iVar16;
          }
          else {
            *psVar17 = 0x7fff;
          }
        }
        else if (uVar18 <= uVar15) break;
        local_28 = dVar14 + local_28;
        param_2 = param_2 + 2;
        local_40 = local_40 + 1;
      }
    }
  }
  param_1[6] = (uint)local_28;
  param_1[7] = local_28._4_4_;
  return local_40;
}



/******************************************************************************/
/* TARGET 0042e1c0  FUN_0042e1c0 */
/******************************************************************************/

/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

void FUN_0042e1c0(void)

{
  LPWAVEHDR pwh;
  int *piVar1;
  uint uVar2;
  bool bVar3;
  undefined4 *puVar4;
  byte *pbVar5;
  MMRESULT MVar6;
  uint uVar7;
  int iVar8;
  short *psVar9;
  uint *puVar10;
  uint *puVar11;
  int iVar12;
  uint local_18;
  int iStack_14;
  undefined4 *puStack_10;
  short *psStack_c;
  
  DAT_00436a2c = DAT_00436a2c + -1;
  if (DAT_00437940 == '\0') {
    if (DAT_00436a30 == '\0') {
      if (phwo_00437924 != (LPHWAVEOUT)0x0) {
        if (((int)DAT_00437930 < 1) && (DAT_00436a34 < 1)) {
          bVar3 = true;
        }
        else {
          bVar3 = false;
        }
        pbVar5 = (byte *)&DAT_00437900;
        do {
          if ((*pbVar5 & 1) == 0) goto LAB_0042e243;
          pbVar5 = pbVar5 + -0x20;
        } while (0x4378bf < (int)pbVar5);
        if (bVar3) {
          FUN_0042dc50();
          return;
        }
LAB_0042e243:
        puVar10 = &DAT_00437900;
        uVar7 = DAT_00437930;
        while ((0 < (int)uVar7 || (0 < DAT_00436a34))) {
          if ((*puVar10 & 1) != 0) {
            if ((*puVar10 & 2) != 0) {
              waveOutUnprepareHeader((HWAVEOUT)phwo_00437924,(LPWAVEHDR)(puVar10 + -4),0x20);
            }
            pwh = (LPWAVEHDR)(puVar10 + -4);
            pwh->lpData = DAT_0043792c;
            uVar7 = DAT_00437930;
            if ((int)DAT_00436a40 < (int)DAT_00437930) {
              uVar7 = DAT_00436a40;
            }
            DAT_00437930 = DAT_00437930 - uVar7;
            DAT_0043792c = DAT_0043792c + uVar7;
            puVar10[-3] = uVar7;
            puVar10[-2] = uVar7;
            puVar10[-1] = 0;
            *puVar10 = 0xc;
            puVar10[1] = 1;
            puVar10[2] = 0;
            puVar10[3] = 0;
            MVar6 = waveOutPrepareHeader((HWAVEOUT)phwo_00437924,pwh,0x20);
            if ((MVar6 != 0) || (MVar6 = waveOutWrite((HWAVEOUT)phwo_00437924,pwh,0x20), MVar6 != 0)
               ) {
              *puVar10 = *puVar10 | 1;
            }
            uVar7 = DAT_00437930;
            if (((int)DAT_00437930 < 1) && (DAT_00436a34 = DAT_00436a34 + -1, 0 < DAT_00436a34)) {
              DAT_0043792c = (LPSTR)(*(int *)(DAT_004378a8 + 0x1c) + *(int *)(DAT_004378a8 + 0x18));
              _DAT_00437938 = 0;
              uVar7 = *(int *)(DAT_004378a8 + 4) - *(int *)(DAT_004378a8 + 0x18);
              _DAT_0043793c = 0;
              DAT_00437930 = uVar7;
            }
          }
          puVar10 = puVar10 + -8;
          if ((int)puVar10 < 0x4378c0) {
            return;
          }
        }
      }
    }
    else {
      if (DAT_00437948 != 0) {
        iVar8 = 0x400;
        uVar7 = DAT_00437928;
        puVar10 = DAT_00437910;
        do {
          if ((int)uVar7 < 1) break;
          if (0 < (int)*puVar10) {
            piVar1 = (int *)puVar10[0xc];
            uVar7 = uVar7 - 1;
            if (piVar1 != (int *)0x0) {
              local_18 = 0;
              (**(code **)(*piVar1 + 0x24))(piVar1,&local_18);
              if ((local_18 & 1) == 0) {
                if (((local_18 & 2) == 0) && (uVar2 = puVar10[10], 1 < (int)uVar2)) {
                  if (uVar2 != 0x40000000) {
                    puVar10[10] = uVar2 - 1;
                    (**(code **)(*piVar1 + 0x34))(piVar1,0);
                    (**(code **)(*piVar1 + 0x30))(piVar1,0,0,0);
                  }
                }
                else {
                  (**(code **)(*piVar1 + 0x48))(piVar1);
                  DAT_00437928 = DAT_00437928 - 1;
                  *puVar10 = 0;
                  (**(code **)(*piVar1 + 8))(piVar1);
                  puVar10[0xc] = 0;
                }
              }
            }
          }
          puVar10 = puVar10 + 0x10;
          iVar8 = iVar8 + -1;
        } while (0 < iVar8);
        if (phwo_00437924 == (LPHWAVEOUT)0x0) {
          return;
        }
      }
      if ((int)DAT_00437928 < 1) {
        if (phwo_00437924 != (LPHWAVEOUT)0x0) {
          pbVar5 = (byte *)&DAT_00437900;
          while ((*pbVar5 & 1) != 0) {
            pbVar5 = pbVar5 + -0x20;
            if ((int)pbVar5 < 0x4378c0) {
              FUN_0042dc50();
              return;
            }
          }
        }
      }
      else {
        puVar10 = &DAT_004378c0;
        puStack_10 = &DAT_00437914;
        do {
          puVar4 = puStack_10;
          if ((int)DAT_00437928 < 1) {
            return;
          }
          if ((*puVar10 & 1) != 0) {
            if ((*puVar10 & 2) != 0) {
              waveOutUnprepareHeader((HWAVEOUT)phwo_00437924,(LPWAVEHDR)(puVar10 + -4),0x20);
            }
            psStack_c = (short *)*puVar4;
            puVar10[-3] = 0x4000;
            puVar10[-2] = 0x4000;
            puVar10[-4] = (uint)psStack_c;
            puVar10[-1] = 0;
            *puVar10 = 0;
            puVar10[1] = 0;
            puVar10[2] = 0;
            puVar10[3] = 0;
            psVar9 = psStack_c;
            for (iVar8 = 0x1000; iVar8 != 0; iVar8 = iVar8 + -1) {
              psVar9[0] = 0;
              psVar9[1] = 0;
              psVar9 = psVar9 + 2;
            }
            local_18 = DAT_00437928;
            iStack_14 = 0x400;
            puVar11 = DAT_00437910;
            do {
              psVar9 = psStack_c;
              if (((int)local_18 < 1) || (DAT_00437748 != '\0')) break;
              if (0 < (int)*puVar11) {
                local_18 = local_18 - 1;
                iVar8 = FUN_0042dd40(puVar11,psStack_c,0x1000);
                iVar12 = 0x1000 - iVar8;
                psVar9 = psVar9 + iVar8 * 2;
                uVar7 = FUN_0040a250(*(double *)(puVar11 + 6));
                if (*puVar11 <= uVar7) {
                  do {
                    uVar7 = puVar11[10];
                    puVar11[10] = uVar7 - 1;
                    if ((int)(uVar7 - 1) < 1) {
                      DAT_00437928 = DAT_00437928 - 1;
                      FUN_00404990((int *)(puVar11 + 0xb));
                      piVar1 = (int *)puVar11[0xc];
                      *puVar11 = 0;
                      if (piVar1 != (int *)0x0) {
                        (**(code **)(*piVar1 + 0x48))(piVar1);
                        (**(code **)(*piVar1 + 8))(piVar1);
                        puVar11[0xc] = 0;
                      }
                      break;
                    }
                    puVar11[6] = 0;
                    puVar11[7] = 0;
                    if (iVar12 < 1) break;
                    iVar8 = FUN_0042dd40(puVar11,psVar9,iVar12);
                    iVar12 = iVar12 - iVar8;
                    psVar9 = psVar9 + iVar8 * 2;
                    uVar7 = FUN_0040a250(*(double *)(puVar11 + 6));
                  } while (*puVar11 <= uVar7);
                }
              }
              puVar11 = puVar11 + 0x10;
              iStack_14 = iStack_14 + -1;
            } while (0 < iStack_14);
            waveOutPrepareHeader((HWAVEOUT)phwo_00437924,(LPWAVEHDR)(puVar10 + -4),0x20);
            waveOutWrite((HWAVEOUT)phwo_00437924,(LPWAVEHDR)(puVar10 + -4),0x20);
          }
          puStack_10 = puStack_10 + 1;
          puVar10 = puVar10 + 8;
        } while ((int)puStack_10 < 0x437920);
      }
    }
  }
  return;
}



/******************************************************************************/
/* TARGET 0042e9c0  FUN_0042e9c0 */
/******************************************************************************/

void __fastcall FUN_0042e9c0(int *param_1)

{
  FUN_00404990(param_1);
  FUN_00409240();
  return;
}



/******************************************************************************/
/* TARGET 0042ebc0  FUN_0042ebc0 */
/******************************************************************************/

void __fastcall FUN_0042ebc0(int *param_1)

{
  FUN_00405d10(param_1);
  FUN_00405d60(param_1);
  return;
}



/******************************************************************************/
/* TARGET 0042ebe0  FUN_0042ebe0 */
/******************************************************************************/

void __fastcall FUN_0042ebe0(int *param_1)

{
  code *pcVar1;
  
  pcVar1 = (code *)*DAT_004376e0;
  DAT_004376e0 = DAT_004376e0 + 4;
  (*pcVar1)();
  FUN_00406c70(param_1);
  FUN_00406cc0(param_1);
  return;
}



/******************************************************************************/
/* TARGET 0042ece0  FUN_0042ece0 */
/******************************************************************************/

void FUN_0042ece0(void)

{
  FUN_00406530(&DAT_0043795c,&DAT_00436a68,2);
  return;
}



/******************************************************************************/
/* TARGET 0042ed00  FUN_0042ed00 */
/******************************************************************************/

void FUN_0042ed00(void)

{
  FUN_0040d9b0(0x42ed10);
  return;
}



/******************************************************************************/
/* TARGET 0042ee70  FUN_0042ee70 */
/******************************************************************************/

void __fastcall FUN_0042ee70(int *param_1)

{
  int iVar1;
  
  FUN_00406ad0(param_1);
  iVar1 = FUN_004288c0();
  if (iVar1 < 0) {
    FUN_00407200(param_1,0);
    return;
  }
  if (99 < iVar1) {
    iVar1 = 99;
  }
  FUN_00407200(param_1,(byte)iVar1);
  return;
}



/******************************************************************************/
/* TARGET 0042eeb0  FUN_0042eeb0 */
/******************************************************************************/

void __fastcall FUN_0042eeb0(void *param_1)

{
  uint uVar1;
  
  uVar1 = FUN_004288f0();
  FUN_00407390(param_1,uVar1);
  return;
}



/******************************************************************************/
/* TARGET 0042eed0  FUN_0042eed0 */
/******************************************************************************/

void __fastcall FUN_0042eed0(int *param_1)

{
  int iVar1;
  
  iVar1 = FUN_004288c0();
  FUN_00407d60(param_1,(char)iVar1);
  return;
}



/******************************************************************************/
/* TARGET 0042ef30  FUN_0042ef30 */
/******************************************************************************/

void __fastcall FUN_0042ef30(int *param_1)

{
  FUN_00428a70();
  FUN_00406ad0(param_1);
  FUN_004072d0(param_1,DAT_00437864._2_1_);
  FUN_00407ea0(param_1,0x2e);
  FUN_00407200(param_1,lpSystemTime_00437860._2_1_);
  FUN_00407ea0(param_1,0x2e);
  FUN_00407280(param_1,(ushort)lpSystemTime_00437860);
  return;
}



/******************************************************************************/
/* TARGET 0042ef80  FUN_0042ef80 */
/******************************************************************************/

void __fastcall FUN_0042ef80(int *param_1)

{
  FUN_00428a70();
  FUN_00406ad0(param_1);
  FUN_004072d0(param_1,lpSystemTime_00437860._2_1_);
  FUN_00407ea0(param_1,0x2f);
  FUN_00407200(param_1,DAT_00437864._2_1_);
  FUN_00407ea0(param_1,0x2f);
  FUN_00407280(param_1,(ushort)lpSystemTime_00437860);
  return;
}



/******************************************************************************/
/* TARGET 0042efd0  FUN_0042efd0 */
/******************************************************************************/

void __fastcall FUN_0042efd0(int *param_1)

{
  FUN_00428a70();
  FUN_00406ad0(param_1);
  FUN_00407280(param_1,(ushort)lpSystemTime_00437860);
  FUN_00407ea0(param_1,0x2d);
  FUN_00407200(param_1,lpSystemTime_00437860._2_1_);
  FUN_00407ea0(param_1,0x2d);
  FUN_00407200(param_1,DAT_00437864._2_1_);
  return;
}



/******************************************************************************/
/* TARGET 0042f020  FUN_0042f020 */
/******************************************************************************/

void __fastcall FUN_0042f020(int *param_1)

{
  FUN_00428a70();
  FUN_00406ad0(param_1);
  FUN_004072d0(param_1,(byte)DAT_00437868);
  FUN_00407ea0(param_1,0x3a);
  FUN_00407200(param_1,DAT_00437868._2_1_);
  FUN_00407ea0(param_1,0x3a);
  FUN_00407200(param_1,(byte)DAT_0043786c);
  return;
}



/******************************************************************************/
/* TARGET 0042f070  FUN_0042f070 */
/******************************************************************************/

void __fastcall FUN_0042f070(int *param_1)

{
  undefined1 uVar1;
  byte bVar2;
  
  FUN_00428a70();
  bVar2 = (byte)DAT_00437868;
  if ('\v' < (char)(byte)DAT_00437868) {
    bVar2 = (byte)DAT_00437868 - 0xc;
  }
  if (bVar2 == 0) {
    bVar2 = 0xc;
  }
  FUN_00406ad0(param_1);
  FUN_004072d0(param_1,bVar2);
  FUN_00407ea0(param_1,0x3a);
  FUN_00407200(param_1,DAT_00437868._2_1_);
  FUN_00407ea0(param_1,0x3a);
  FUN_00407200(param_1,(byte)DAT_0043786c);
  uVar1 = 0x70;
  if ((ushort)DAT_00437868 < 0xc) {
    uVar1 = 0x61;
  }
  FUN_00407ea0(param_1,uVar1);
  return;
}



/******************************************************************************/
/* TARGET 0042f400  FUN_0042f400 */
/******************************************************************************/

void __cdecl FUN_0042f400(int *param_1)

{
  char *pcVar1;
  undefined4 *puVar2;
  HANDLE hFindFile;
  BOOL BVar3;
  int local_150;
  int local_14c;
  undefined4 local_148;
  undefined4 local_144;
  _WIN32_FIND_DATAA local_140;
  
  FUN_00401020(&local_150,param_1);
  FUN_00406c70(&local_150);
  FUN_00406cc0(&local_150);
  if (*(int *)(local_150 + 4) == 0) {
    FUN_00407cf0(&local_150,&DAT_00436a6c);
  }
  FUN_00406ad0(param_1);
  FUN_004064c0(&local_14c);
  do {
    pcVar1 = FUN_00406860(&local_150,';');
    if ((int)pcVar1 < 0) {
      pcVar1 = *(char **)(local_150 + 4);
    }
    puVar2 = FUN_00406b40(&local_150,&local_148,(uint)pcVar1);
    FUN_00407cc0(&local_14c,puVar2);
    FUN_00406610(&local_148);
    FUN_00406c70(&local_14c);
    FUN_00406cc0(&local_14c);
    if (*(int *)(local_14c + 4) != 0) {
      hFindFile = FindFirstFileA((LPCSTR)(local_14c + 0xc),&local_140);
      if (hFindFile != (HANDLE)0xffffffff) {
        do {
          FUN_00407e30(param_1,local_140.cFileName);
          FUN_00407ea0(param_1,0xd);
          FUN_00407ea0(param_1,10);
          BVar3 = FindNextFileA(hFindFile,&local_140);
        } while (BVar3 != 0);
        FindClose(hFindFile);
      }
    }
    puVar2 = FUN_00406bb0(&local_150,&local_144,(uint)(pcVar1 + 1),0x7fffffff);
    FUN_00407cc0(&local_150,puVar2);
    FUN_00406610(&local_144);
  } while (*(int *)(local_150 + 4) != 0);
  FUN_00406610(&local_14c);
  FUN_00406610(&local_150);
  return;
}



/******************************************************************************/
/* TARGET 0042f550  FUN_0042f550 */
/******************************************************************************/

void __fastcall FUN_0042f550(int *param_1)

{
  FUN_00406ad0(param_1);
  FUN_0042f400(param_1);
  return;
}



/******************************************************************************/
/* TARGET 0042f590  FUN_0042f590 */
/******************************************************************************/

undefined4 __fastcall FUN_0042f590(undefined4 *param_1,int param_2)

{
  DWORD DVar1;
  undefined4 uVar2;
  CHAR local_400 [1024];
  
  FUN_004184c0(param_2);
  local_400[0] = '\0';
  DVar1 = GetPrivateProfileStringA
                    ((LPCSTR)(DAT_00437444 + 0xc),(LPCSTR)(DAT_004374b8 + 0xc),
                     (LPCSTR)(DAT_00437078 + 0xc),local_400,0x3ff,(LPCSTR)(DAT_004375cc + 0xc));
  if (0 < (int)DVar1) {
    FUN_00406610(param_1);
    uVar2 = FUN_00406650(param_1,local_400,DVar1);
    return CONCAT31((int3)((uint)uVar2 >> 8),1);
  }
  return DVar1 & 0xffffff00;
}



/******************************************************************************/
/* TARGET 0042f610  FUN_0042f610 */
/******************************************************************************/

void __fastcall FUN_0042f610(int *param_1)

{
  uint uVar1;
  DWORD DVar2;
  undefined4 uVar3;
  int iVar4;
  
  FUN_00406ad0(param_1);
  iVar4 = *(int *)(DAT_00437448 + 4);
  if (iVar4 == 0) {
    DAT_00437798 = 1;
    return;
  }
  FUN_00401020(&stack0xfffffff4,&DAT_00437448);
  FUN_00418390(iVar4);
  FUN_00407cc0(param_1,&DAT_004374b8);
  uVar1 = FUN_00406890(param_1,'.');
  if (-1 < (int)uVar1) {
    FUN_00406c00(param_1,uVar1,0x7fffffff);
  }
  DVar2 = GetFileAttributesA((LPCSTR)(DAT_004375cc + 0xc));
  if ((((DVar2 != 0xffffffff) && (uVar3 = FUN_0042f590(param_1,DAT_004361a4), (char)uVar3 == '\0'))
      && (uVar3 = FUN_0042f590(param_1,DAT_0043619c), (char)uVar3 == '\0')) &&
     (uVar3 = FUN_0042f590(param_1,5), (char)uVar3 == '\0')) {
    iVar4 = 0;
    do {
      if (((iVar4 != DAT_004361a4) && (iVar4 != DAT_0043619c)) &&
         ((iVar4 != 5 && (uVar3 = FUN_0042f590(param_1,iVar4), (char)uVar3 != '\0')))) {
        return;
      }
      iVar4 = iVar4 + 1;
    } while (iVar4 < 0x18);
  }
  return;
}



/******************************************************************************/
/* TARGET 0042f6e0  FUN_0042f6e0 */
/******************************************************************************/

void __fastcall FUN_0042f6e0(int *param_1)

{
  FUN_00406ad0(param_1);
  while (DAT_0043741c == 0) {
    if (DAT_00437784 != DAT_00437780) goto LAB_0042f72a;
    if (DAT_004377e8 != '\0') break;
    FUN_0041b2b0(1);
  }
  if (DAT_00437784 != DAT_00437780) {
LAB_0042f72a:
    FUN_00407d60(param_1,(&DAT_004373c8)[DAT_00437784 * 4]);
    DAT_00437784 = DAT_00437784 + 1;
    if (0x13 < DAT_00437784) {
      DAT_00437784 = 0;
    }
  }
  return;
}



/******************************************************************************/
/* TARGET 0042f7b0  FUN_0042f7b0 */
/******************************************************************************/

void FUN_0042f7b0(void)

{
  FUN_004064c0((undefined4 *)&DAT_00437958);
  return;
}



/******************************************************************************/
/* TARGET 0042f7c0  FUN_0042f7c0 */
/******************************************************************************/

void FUN_0042f7c0(void)

{
  FUN_0040d9b0(0x42f7d0);
  return;
}



/******************************************************************************/
/* TARGET 0042f7f0  FUN_0042f7f0 */
/******************************************************************************/

void FUN_0042f7f0(void)

{
  FUN_004064c0((undefined4 *)&DAT_0043796c);
  return;
}



/******************************************************************************/
/* TARGET 0042f800  FUN_0042f800 */
/******************************************************************************/

void FUN_0042f800(void)

{
  FUN_0040d9b0(0x42f810);
  return;
}



/******************************************************************************/
/* TARGET 0042f830  FUN_0042f830 */
/******************************************************************************/

void FUN_0042f830(void)

{
  FUN_004064c0((undefined4 *)&DAT_00437970);
  return;
}



/******************************************************************************/
/* TARGET 0042f840  FUN_0042f840 */
/******************************************************************************/

void FUN_0042f840(void)

{
  FUN_0040d9b0(0x42f850);
  return;
}



/******************************************************************************/
/* TARGET 0042f870  FUN_0042f870 */
/******************************************************************************/

void FUN_0042f870(void)

{
  FUN_004064c0((undefined4 *)&DAT_00437968);
  return;
}



/******************************************************************************/
/* TARGET 0042f880  FUN_0042f880 */
/******************************************************************************/

void FUN_0042f880(void)

{
  FUN_0040d9b0(0x42f890);
  return;
}



/******************************************************************************/
/* TARGET 0042f8b0  FUN_0042f8b0 */
/******************************************************************************/

void FUN_0042f8b0(void)

{
  FUN_004064c0((undefined4 *)&DAT_00437960);
  return;
}



/******************************************************************************/
/* TARGET 0042f8c0  FUN_0042f8c0 */
/******************************************************************************/

void FUN_0042f8c0(void)

{
  FUN_0040d9b0(0x42f8d0);
  return;
}



/******************************************************************************/
/* TARGET 004301d0  FUN_004301d0 */
/******************************************************************************/

void __fastcall FUN_004301d0(void *param_1)

{
  code *pcVar1;
  uint uVar2;
  
  uVar2 = FUN_004288c0();
  pcVar1 = (code *)*DAT_004376e0;
  DAT_004376e0 = DAT_004376e0 + 4;
  (*pcVar1)();
  FUN_00406c00(param_1,uVar2,0x7fffffff);
  return;
}



/******************************************************************************/
/* TARGET 004302e0  FUN_004302e0 */
/******************************************************************************/

void __fastcall FUN_004302e0(undefined4 *param_1)

{
  code *pcVar1;
  int iVar2;
  undefined4 *puVar3;
  int local_8;
  undefined4 uStack_4;
  
  iVar2 = FUN_004288c0();
  FUN_004064c0(&local_8);
  pcVar1 = (code *)*DAT_004376e0;
  DAT_004376e0 = DAT_004376e0 + 4;
  (*pcVar1)();
  puVar3 = FUN_004068f0(&local_8,&uStack_4,iVar2);
  FUN_00407cc0(param_1,puVar3);
  FUN_00406610(&uStack_4);
  FUN_00406610(&local_8);
  return;
}



/******************************************************************************/
/* TARGET 00430350  FUN_00430350 */
/******************************************************************************/

void FUN_00430350(void)

{
  code *pcVar1;
  int iVar2;
  int iVar3;
  undefined4 *puVar4;
  undefined4 *unaff_ESI;
  int unaff_EDI;
  int iStack00000014;
  
  iVar2 = FUN_004288c0();
  iVar3 = FUN_004288c0();
  iStack00000014 = FUN_004288c0();
  FUN_004064c0((undefined4 *)&stack0x00000010);
  pcVar1 = (code *)*DAT_004376e0;
  DAT_004376e0 = DAT_004376e0 + 4;
  (*pcVar1)();
  puVar4 = FUN_00406950(&stack0x00000010,&stack0x00000014,unaff_EDI,iVar2,iVar3,iStack00000014);
  FUN_00407cc0(unaff_ESI,puVar4);
  FUN_00406610(&stack0x00000014);
  FUN_00406610((undefined4 *)&stack0x00000010);
  return;
}



/******************************************************************************/
/* TARGET 00430530  FUN_00430530 */
/******************************************************************************/

void FUN_00430530(void)

{
  FUN_004064c0((undefined4 *)&DAT_00437964);
  return;
}



/******************************************************************************/
/* TARGET 00430540  FUN_00430540 */
/******************************************************************************/

void FUN_00430540(void)

{
  FUN_0040d9b0(0x430550);
  return;
}



/******************************************************************************/
/* TARGET 00430580  FUN_00430580 */
/******************************************************************************/

void FUN_00430580(void)

{
  undefined4 *puVar1;
  WPARAM WVar2;
  uint uVar3;
  int *piVar4;
  undefined1 local_c [8];
  undefined1 *local_4;
  
  if (((DAT_00436910 < DAT_00437244) && (*(char *)(DAT_0043723c + DAT_00436910) != '\0')) &&
     (puVar1 = (undefined4 *)(DAT_00437238 + DAT_00436910 * 0xac),
     *(char *)(DAT_00437238 + 0x45 + DAT_00436910 * 0xac) == '\0')) {
    switch(puVar1[2]) {
    case 0xd:
      FUN_00406ad0(puVar1 + 5);
      WVar2 = SendMessageA((HWND)*puVar1,0x188,0,0);
      if ((-1 < (int)WVar2) && (uVar3 = SendMessageA((HWND)*puVar1,0x18a,WVar2,0), 0 < (int)uVar3))
      {
        piVar4 = FUN_0040d3a0(uVar3 + 1);
        SendMessageA((HWND)*puVar1,0x189,WVar2,(LPARAM)piVar4);
        FUN_00406610(puVar1 + 5);
        FUN_00406650(puVar1 + 5,(LPCSTR)piVar4,uVar3);
        FUN_0040d410(piVar4);
        *(undefined1 *)((int)puVar1 + 0x45) = 1;
        return;
      }
      break;
    default:
      FUN_00406e30(puVar1 + 5,(HWND)*puVar1);
      break;
    case 0xf:
      FUN_00406ad0(puVar1 + 5);
      WVar2 = SendMessageA((HWND)*puVar1,0x147,0,0);
      if ((-1 < (int)WVar2) && (uVar3 = SendMessageA((HWND)*puVar1,0x149,WVar2,0), 0 < (int)uVar3))
      {
        piVar4 = FUN_0040d3a0(uVar3 + 1);
        SendMessageA((HWND)*puVar1,0x148,WVar2,(LPARAM)piVar4);
        FUN_00406610(puVar1 + 5);
        FUN_00406650(puVar1 + 5,(LPCSTR)piVar4,uVar3);
        FUN_0040d410(piVar4);
        *(undefined1 *)((int)puVar1 + 0x45) = 1;
        return;
      }
      break;
    case 0x14:
    case 0x15:
      FUN_00406ad0((undefined4 *)&DAT_00437964);
      local_4 = &LAB_00430560;
      SendMessageA((HWND)*puVar1,0x44a,(puVar1[2] == 0x14) + 1,(LPARAM)local_c);
      FUN_00407cc0(puVar1 + 5,(undefined4 *)&DAT_00437964);
      *(undefined1 *)((int)puVar1 + 0x45) = 1;
      return;
    case 0x19:
      FUN_00406ad0(puVar1 + 5);
      if (((uint)puVar1[0x1e] < (uint)puVar1[0x21]) && ((uint)puVar1[0x1f] < (uint)puVar1[0x22])) {
        FUN_00407cc0(puVar1 + 5,
                     (undefined4 *)(puVar1[0x23] + (puVar1[0x1f] * puVar1[0x21] + puVar1[0x1e]) * 4)
                    );
        *(undefined1 *)((int)puVar1 + 0x45) = 1;
        return;
      }
    }
    *(undefined1 *)((int)puVar1 + 0x45) = 1;
  }
  return;
}



/******************************************************************************/
/* TARGET 004309e0  MSACM32.DLL::acmStreamClose */
/******************************************************************************/

void acmStreamClose(void)

{
                    /* WARNING: Could not recover jumptable at 0x004309e0. Too many branches */
                    /* WARNING: Treating indirect jump as call */
  acmStreamClose();
  return;
}



/******************************************************************************/
/* TARGET 004309e6  MSACM32.DLL::acmStreamUnprepareHeader */
/******************************************************************************/

void acmStreamUnprepareHeader(void)

{
                    /* WARNING: Could not recover jumptable at 0x004309e6. Too many branches */
                    /* WARNING: Treating indirect jump as call */
  acmStreamUnprepareHeader();
  return;
}



/******************************************************************************/
/* TARGET 004309ec  MSACM32.DLL::acmStreamConvert */
/******************************************************************************/

void acmStreamConvert(void)

{
                    /* WARNING: Could not recover jumptable at 0x004309ec. Too many branches */
                    /* WARNING: Treating indirect jump as call */
  acmStreamConvert();
  return;
}



/******************************************************************************/
/* TARGET 004309f2  MSACM32.DLL::acmStreamPrepareHeader */
/******************************************************************************/

void acmStreamPrepareHeader(void)

{
                    /* WARNING: Could not recover jumptable at 0x004309f2. Too many branches */
                    /* WARNING: Treating indirect jump as call */
  acmStreamPrepareHeader();
  return;
}



/******************************************************************************/
/* TARGET 004309f8  MSACM32.DLL::acmStreamSize */
/******************************************************************************/

void acmStreamSize(void)

{
                    /* WARNING: Could not recover jumptable at 0x004309f8. Too many branches */
                    /* WARNING: Treating indirect jump as call */
  acmStreamSize();
  return;
}



/******************************************************************************/
/* TARGET 004309fe  MSACM32.DLL::acmStreamOpen */
/******************************************************************************/

void acmStreamOpen(void)

{
                    /* WARNING: Could not recover jumptable at 0x004309fe. Too many branches */
                    /* WARNING: Treating indirect jump as call */
  acmStreamOpen();
  return;
}



/******************************************************************************/
/* TARGET 00430a04  MSACM32.DLL::acmFormatSuggest */
/******************************************************************************/

void acmFormatSuggest(void)

{
                    /* WARNING: Could not recover jumptable at 0x00430a04. Too many branches */
                    /* WARNING: Treating indirect jump as call */
  acmFormatSuggest();
  return;
}



/******************************************************************************/
/* TARGET 00430a0a  COMDLG32.DLL::FindTextA */
/******************************************************************************/

HWND FindTextA(LPFINDREPLACEA param_1)

{
  HWND pHVar1;
  
                    /* WARNING: Could not recover jumptable at 0x00430a0a. Too many branches */
                    /* WARNING: Treating indirect jump as call */
  pHVar1 = FindTextA(param_1);
  return pHVar1;
}



/******************************************************************************/
/* TARGET 00430a10  COMDLG32.DLL::PrintDlgA */
/******************************************************************************/

BOOL PrintDlgA(LPPRINTDLGA pPD)

{
  BOOL BVar1;
  
                    /* WARNING: Could not recover jumptable at 0x00430a10. Too many branches */
                    /* WARNING: Treating indirect jump as call */
  BVar1 = PrintDlgA(pPD);
  return BVar1;
}



/******************************************************************************/
/* TARGET 00430a16  COMDLG32.DLL::GetOpenFileNameA */
/******************************************************************************/

BOOL GetOpenFileNameA(LPOPENFILENAMEA param_1)

{
  BOOL BVar1;
  
                    /* WARNING: Could not recover jumptable at 0x00430a16. Too many branches */
                    /* WARNING: Treating indirect jump as call */
  BVar1 = GetOpenFileNameA(param_1);
  return BVar1;
}



/******************************************************************************/
/* TARGET 00430a1c  COMDLG32.DLL::GetSaveFileNameA */
/******************************************************************************/

BOOL GetSaveFileNameA(LPOPENFILENAMEA param_1)

{
  BOOL BVar1;
  
                    /* WARNING: Could not recover jumptable at 0x00430a1c. Too many branches */
                    /* WARNING: Treating indirect jump as call */
  BVar1 = GetSaveFileNameA(param_1);
  return BVar1;
}



/******************************************************************************/
/* TARGET 00430a3a  FUN_00430a3a */
/******************************************************************************/

void __fastcall FUN_00430a3a(undefined4 param_1)

{
  __cintrindisp2(param_1,0x436a80);
  return;
}



/******************************************************************************/
/* TARGET 00430a92  FUN_00430a92 */
/******************************************************************************/

void __fastcall FUN_00430a92(undefined4 param_1)

{
  __cintrindisp1(param_1,0x436c60);
  return;
}



/******************************************************************************/
/* TARGET 00430a9c  FUN_00430a9c */
/******************************************************************************/

void FUN_00430a9c(void)

{
  undefined4 in_ECX;
  
  __cintrindisp1(in_ECX,0x436c80);
  return;
}



/******************************************************************************/
/* TARGET 00430ae2  FUN_00430ae2 */
/******************************************************************************/

void __fastcall FUN_00430ae2(undefined4 param_1)

{
  __cintrindisp2(param_1,0x436d54);
  return;
}



/******************************************************************************/
/* TARGET 00430b10  __cintrindisp2 */
/******************************************************************************/

/* Library Function - Single Match
    __cintrindisp2
   
   Libraries: Visual Studio 1998, Visual Studio 2003, Visual Studio 2019 */

void __fastcall __cintrindisp2(undefined4 param_1,int param_2)

{
  __trandisp2(param_1,param_2);
  DAT_00437988 = 1;
  FUN_00430bc5();
  return;
}



/******************************************************************************/
/* TARGET 00430b4e  __cintrindisp1 */
/******************************************************************************/

/* Library Function - Single Match
    __cintrindisp1
   
   Libraries: Visual Studio 1998, Visual Studio 2003, Visual Studio 2019 */

void __fastcall __cintrindisp1(undefined4 param_1,int param_2)

{
  __trandisp1(param_1,param_2);
  DAT_00437988 = 1;
  FUN_00430bc5();
  return;
}



/******************************************************************************/
/* TARGET 00430b84  __ctrandisp2 */
/******************************************************************************/

/* Library Function - Single Match
    __ctrandisp2
   
   Libraries: Visual Studio 1998, Visual Studio 2003, Visual Studio 2019 */

void __cdecl __ctrandisp2(uint param_1,int param_2,uint param_3,int param_4)

{
  undefined4 extraout_ECX;
  int extraout_EDX;
  
  __fload(param_1,param_2);
  __fload(param_3,param_4);
  __trandisp2(extraout_ECX,extraout_EDX);
  FUN_00430bbe();
  return;
}



/******************************************************************************/
/* TARGET 00430bbe  FUN_00430bbe */
/******************************************************************************/

/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

void FUN_00430bbe(void)

{
  char cVar1;
  int unaff_EBP;
  ushort in_FPUStatusWord;
  float10 in_ST0;
  
  DAT_00437988 = '\0';
  if (DAT_00437354 != 0) {
    DAT_00437988 = 0;
    return;
  }
  _DAT_00437980 = (double)in_ST0;
  cVar1 = *(char *)(unaff_EBP + -0x90);
  if (cVar1 != '\0') {
    if ((cVar1 != -1) && (cVar1 != -2)) {
      if (cVar1 == '\0') {
        DAT_00437988 = 0;
        return;
      }
      *(int *)(unaff_EBP + -0x8e) = (int)cVar1;
      goto LAB_00430c93;
    }
    if (((ulonglong)_DAT_00437980 & 0x7ff0000000000000) == 0) {
      *(undefined4 *)(unaff_EBP + -0x8e) = 4;
      in_ST0 = (float10)fscale(in_ST0,(float10)1536.0);
      if (ABS(in_ST0) < (float10)2.2250738585072014e-308) {
        in_ST0 = in_ST0 * (float10)0.0;
      }
      goto LAB_00430c93;
    }
    if ((DAT_00437986 & 0x7ff0) == 0x7ff0) {
      *(undefined4 *)(unaff_EBP + -0x8e) = 3;
      in_ST0 = (float10)fscale(in_ST0,(float10)-1536.0);
      if ((float10)1.7976931348623157e+308 < ABS(in_ST0)) {
        in_ST0 = in_ST0 * (float10)INFINITY;
      }
      goto LAB_00430c93;
    }
  }
  if ((*(ushort *)(unaff_EBP + -0xa4) & 0x20) != 0) {
    DAT_00437988 = 0;
    return;
  }
  if ((in_FPUStatusWord & 0x20) == 0) {
    DAT_00437988 = 0;
    return;
  }
  *(undefined4 *)(unaff_EBP + -0x8e) = 8;
LAB_00430c93:
  *(int *)(unaff_EBP + -0x8a) = *(int *)(unaff_EBP + -0x94) + 1;
  if (DAT_00437988 == '\0') {
    *(undefined4 *)(unaff_EBP + -0x86) = *(undefined4 *)(unaff_EBP + 8);
    *(undefined4 *)(unaff_EBP + -0x82) = *(undefined4 *)(unaff_EBP + 0xc);
    if (*(char *)(*(int *)(unaff_EBP + -0x94) + 0xd) != '\x01') {
      *(undefined4 *)(unaff_EBP + -0x7e) = *(undefined4 *)(unaff_EBP + 0x10);
      *(undefined4 *)(unaff_EBP + -0x7a) = *(undefined4 *)(unaff_EBP + 0x14);
    }
  }
  *(double *)(unaff_EBP + -0x76) = (double)in_ST0;
  __87except((int)*(char *)(*(int *)(unaff_EBP + -0x94) + 0xe),(int *)(unaff_EBP + -0x8e),
             (ushort *)(unaff_EBP + -0xa4));
  return;
}



/******************************************************************************/
/* TARGET 00430bc5  FUN_00430bc5 */
/******************************************************************************/

/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

void FUN_00430bc5(void)

{
  char cVar1;
  int unaff_EBP;
  ushort in_FPUStatusWord;
  float10 in_ST0;
  
  if (DAT_00437354 != 0) {
    return;
  }
  _DAT_00437980 = (double)in_ST0;
  cVar1 = *(char *)(unaff_EBP + -0x90);
  if (cVar1 != '\0') {
    if ((cVar1 != -1) && (cVar1 != -2)) {
      if (cVar1 == '\0') {
        return;
      }
      *(int *)(unaff_EBP + -0x8e) = (int)cVar1;
      goto LAB_00430c93;
    }
    if (((ulonglong)_DAT_00437980 & 0x7ff0000000000000) == 0) {
      *(undefined4 *)(unaff_EBP + -0x8e) = 4;
      in_ST0 = (float10)fscale(in_ST0,(float10)1536.0);
      if (ABS(in_ST0) < (float10)2.2250738585072014e-308) {
        in_ST0 = in_ST0 * (float10)0.0;
      }
      goto LAB_00430c93;
    }
    if ((DAT_00437986 & 0x7ff0) == 0x7ff0) {
      *(undefined4 *)(unaff_EBP + -0x8e) = 3;
      in_ST0 = (float10)fscale(in_ST0,(float10)-1536.0);
      if ((float10)1.7976931348623157e+308 < ABS(in_ST0)) {
        in_ST0 = in_ST0 * (float10)INFINITY;
      }
      goto LAB_00430c93;
    }
  }
  if ((*(ushort *)(unaff_EBP + -0xa4) & 0x20) != 0) {
    return;
  }
  if ((in_FPUStatusWord & 0x20) == 0) {
    return;
  }
  *(undefined4 *)(unaff_EBP + -0x8e) = 8;
LAB_00430c93:
  *(int *)(unaff_EBP + -0x8a) = *(int *)(unaff_EBP + -0x94) + 1;
  if (DAT_00437988 == '\0') {
    *(undefined4 *)(unaff_EBP + -0x86) = *(undefined4 *)(unaff_EBP + 8);
    *(undefined4 *)(unaff_EBP + -0x82) = *(undefined4 *)(unaff_EBP + 0xc);
    if (*(char *)(*(int *)(unaff_EBP + -0x94) + 0xd) != '\x01') {
      *(undefined4 *)(unaff_EBP + -0x7e) = *(undefined4 *)(unaff_EBP + 0x10);
      *(undefined4 *)(unaff_EBP + -0x7a) = *(undefined4 *)(unaff_EBP + 0x14);
    }
  }
  *(double *)(unaff_EBP + -0x76) = (double)in_ST0;
  __87except((int)*(char *)(*(int *)(unaff_EBP + -0x94) + 0xe),(int *)(unaff_EBP + -0x8e),
             (ushort *)(unaff_EBP + -0xa4));
  return;
}



/******************************************************************************/
/* TARGET 00430cf5  __ctrandisp1 */
/******************************************************************************/

/* Library Function - Single Match
    __ctrandisp1
   
   Libraries: Visual Studio 1998, Visual Studio 2003, Visual Studio 2019 */

void __cdecl __ctrandisp1(uint param_1,int param_2)

{
  undefined4 extraout_ECX;
  int extraout_EDX;
  
  __fload(param_1,param_2);
  __trandisp1(extraout_ECX,extraout_EDX);
  FUN_00430bbe();
  return;
}



/******************************************************************************/
/* TARGET 00430d21  __fload */
/******************************************************************************/

/* Library Function - Single Match
    __fload
   
   Libraries: Visual Studio 1998, Visual Studio 2003, Visual Studio 2019 */

float10 __cdecl __fload(uint param_1,int param_2)

{
  float10 fVar1;
  
  if ((param_2._2_2_ & 0x7ff0) == 0x7ff0) {
    fVar1 = (float10)CONCAT28(param_2._2_2_ | 0x7fff,
                              CONCAT44(param_2 << 0xb | param_1 >> 0x15,param_1));
  }
  else {
    fVar1 = (float10)(double)CONCAT26(param_2._2_2_,CONCAT24((undefined2)param_2,param_1));
  }
  return fVar1;
}



/******************************************************************************/
/* TARGET 00430d60  __trandisp1 */
/******************************************************************************/

/* Library Function - Single Match
    __trandisp1
   
   Libraries: Visual Studio 1998, Visual Studio 2003, Visual Studio 2019 */

void __fastcall __trandisp1(undefined4 param_1,int param_2)

{
  float10 fVar1;
  byte bVar2;
  undefined2 uVar3;
  int unaff_EBP;
  float10 in_ST0;
  
  if (*(char *)(param_2 + 0xe) == '\x05') {
    uVar3 = (undefined2)
            CONCAT31((uint3)((byte)((ushort)*(undefined2 *)(unaff_EBP + -0xa4) >> 8) & 0xfe | 2),
                     0x3f);
  }
  else {
    uVar3 = 0x133f;
  }
  *(undefined2 *)(unaff_EBP + -0xa2) = uVar3;
  fVar1 = (float10)0;
  *(int *)(unaff_EBP + -0x94) = param_2;
  *(ushort *)(unaff_EBP + -0xa0) =
       (ushort)NAN(in_ST0) << 8 | (ushort)(in_ST0 < fVar1) << 9 | (ushort)(in_ST0 != fVar1) << 10 |
       (ushort)(in_ST0 == fVar1) << 0xe;
  *(undefined1 *)(unaff_EBP + -0x90) = 0;
  bVar2 = (char)(*(char *)(unaff_EBP + -0x9f) << 1) >> 1;
                    /* WARNING: Could not recover jumptable at 0x00430dc5. Too many branches */
                    /* WARNING: Treating indirect jump as call */
  (**(code **)(param_2 + (char)(&DAT_00436aed)[(byte)((bVar2 & 7) << 1 | (char)bVar2 < '\0')] + 0x10
              ))();
  return;
}



/******************************************************************************/
/* TARGET 00430dc7  __trandisp2 */
/******************************************************************************/

/* Library Function - Single Match
    __trandisp2
   
   Libraries: Visual Studio 1998, Visual Studio 2003, Visual Studio 2019 */

void __fastcall __trandisp2(undefined4 param_1,int param_2)

{
  float10 fVar1;
  char cVar2;
  byte bVar3;
  undefined2 uVar4;
  int unaff_EBP;
  float10 in_ST0;
  float10 in_ST1;
  
  if (*(char *)(param_2 + 0xe) == '\x05') {
    uVar4 = (undefined2)
            CONCAT31((uint3)((byte)((ushort)*(undefined2 *)(unaff_EBP + -0xa4) >> 8) & 0xfe | 2),
                     0x3f);
  }
  else {
    uVar4 = 0x133f;
  }
  *(undefined2 *)(unaff_EBP + -0xa2) = uVar4;
  fVar1 = (float10)0;
  *(int *)(unaff_EBP + -0x94) = param_2;
  *(ushort *)(unaff_EBP + -0xa0) =
       (ushort)NAN(in_ST0) << 8 | (ushort)(in_ST0 < fVar1) << 9 | (ushort)(in_ST0 != fVar1) << 10 |
       (ushort)(in_ST0 == fVar1) << 0xe;
  *(undefined1 *)(unaff_EBP + -0x90) = 0;
  fVar1 = (float10)0;
  *(ushort *)(unaff_EBP + -0xa0) =
       (ushort)NAN(in_ST1) << 8 | (ushort)(in_ST1 < fVar1) << 9 | (ushort)(in_ST1 != fVar1) << 10 |
       (ushort)(in_ST1 == fVar1) << 0xe;
  bVar3 = (char)(*(char *)(unaff_EBP + -0x9f) << 1) >> 1;
  cVar2 = (char)(*(char *)(unaff_EBP + -0x9f) << 1) >> 1;
                    /* WARNING: Could not recover jumptable at 0x00430e51. Too many branches */
                    /* WARNING: Treating indirect jump as call */
  (**(code **)(param_2 + (char)((&DAT_00436aed)[(byte)(cVar2 << 1 | cVar2 < '\0') & 0xf] |
                               (&DAT_00436aed)[(byte)((bVar3 & 7) << 1 | (char)bVar3 < '\0')] << 2)
              + 0x10))();
  return;
}



/******************************************************************************/
/* TARGET 00430e6b  FUN_00430e6b */
/******************************************************************************/

float10 FUN_00430e6b(void)

{
  return (float10)1;
}



/******************************************************************************/
/* TARGET 00430f06  FUN_00430f06 */
/******************************************************************************/

/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

undefined1  [10] FUN_00430f06(void)

{
  int unaff_EBP;
  undefined1 auVar1 [10];
  
  auVar1 = _DAT_00436ad0;
  if (*(char *)(unaff_EBP + -0x90) < '\x01') {
    *(undefined1 *)(unaff_EBP + -0x90) = 1;
  }
  return auVar1;
}



/******************************************************************************/
/* TARGET 00430f23  FUN_00430f23 */
/******************************************************************************/

void FUN_00430f23(void)

{
  return;
}



/******************************************************************************/
/* TARGET 00431736  FUN_00431736 */
/******************************************************************************/

/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

undefined4 __cdecl FUN_00431736(undefined4 param_1,uint param_2,ushort param_3)

{
  undefined4 in_EAX;
  int iVar1;
  float10 fVar2;
  float10 fVar3;
  undefined4 in_stack_0000001c;
  undefined2 in_stack_00000020;
  undefined2 in_stack_00000022;
  ushort in_stack_00000024;
  
  if ((((((CONCAT22(param_3,param_2._2_2_) ^ 0x700) & 0x700) == 0) &&
       ((&DAT_00436b1c)[(param_2._2_2_ & 0x7800) >> 0xb] != '\0')) && ((param_3 & 0x7fff) != 0x7fff)
      ) && ((((in_stack_00000024 & 0x7fff) != 0 && ((in_stack_00000024 & 0x7fff) != 0x7fff)) &&
            (((CONCAT22(in_stack_00000022,in_stack_00000020) & 0x7fffffff) == 0 &&
             ((param_2 & 0x7fffffff) == 0)))))) {
    if ((ushort)((param_3 & 0x7fff) + 0x3f) < (in_stack_00000024 & 0x7fff)) {
      iVar1 = ((in_stack_00000024 & 0x7fff) - (param_3 & 0x7fff) & 0x3f | 0x20) + 1;
      fVar3 = ABS((float10)CONCAT28(in_stack_00000024 & 0x7fff | param_3 & 0x8000,
                                    CONCAT26(param_2._2_2_,CONCAT24((undefined2)param_2,param_1))));
      fVar2 = ABS((float10)CONCAT28(in_stack_00000024,
                                    CONCAT26(in_stack_00000022,
                                             CONCAT24(in_stack_00000020,in_stack_0000001c))));
      do {
        if (fVar3 <= fVar2) {
          fVar2 = fVar2 - fVar3;
        }
        fVar3 = fVar3 * (float10)_DAT_00436b4c;
        iVar1 = iVar1 + -1;
      } while (iVar1 != 0);
    }
    else {
      while (-1 < (int)((in_stack_00000024 & 0x7fff) - ((param_3 & 0x7fff) + 10))) {
        fVar2 = (float10)CONCAT28(in_stack_00000024,
                                  CONCAT26(in_stack_00000022,
                                           CONCAT24(in_stack_00000020,in_stack_0000001c)));
        fVar3 = (float10)CONCAT28((in_stack_00000024 & 0x7fff) -
                                  ((in_stack_00000024 & 0x7fff) - param_3 & 7 | 4) |
                                  param_3 & 0x8000,
                                  CONCAT26(param_2._2_2_,CONCAT24((undefined2)param_2,param_1)));
        fVar2 = fVar2 - (fVar2 / fVar3) * fVar3;
        in_stack_0000001c = SUB104(fVar2,0);
        in_stack_00000020 = (undefined2)((unkuint10)fVar2 >> 0x20);
        in_stack_00000022 = (undefined2)((unkuint10)fVar2 >> 0x30);
        in_stack_00000024 = (ushort)((unkuint10)fVar2 >> 0x40);
      }
    }
  }
  return in_EAX;
}



/******************************************************************************/
/* TARGET 0043193c  FUN_0043193c */
/******************************************************************************/

/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

float10 FUN_0043193c(void)

{
  float10 in_ST0;
  float10 extraout_ST0;
  float10 extraout_ST0_00;
  float10 in_ST1;
  uint uVar2;
  float10 fVar1;
  
  uVar2 = (uint)((unkuint10)in_ST1 >> 0x20);
  if (((uint)((unkuint10)in_ST1 >> 0x30) & 0x7fff0000) != 0) {
    FUN_00431736(SUB104(in_ST1,0),uVar2,(ushort)((unkuint10)in_ST1 >> 0x40));
    return extraout_ST0;
  }
  if (SUB104(in_ST1,0) != 0 || uVar2 != 0) {
    fVar1 = in_ST1 * (float10)_DAT_00436b34;
    FUN_00431736(SUB104(fVar1,0),(uint)((unkuint10)fVar1 >> 0x20),(ushort)((unkuint10)fVar1 >> 0x40)
                );
    return extraout_ST0_00;
  }
  return in_ST0 - (in_ST0 / in_ST1) * in_ST1;
}



/******************************************************************************/
/* TARGET 00431b80  FUN_00431b80 */
/******************************************************************************/

undefined4 __cdecl FUN_00431b80(undefined4 param_1,undefined4 param_2)

{
  char *in_EAX;
  
  *in_EAX = *in_EAX + (char)in_EAX;
  return param_2;
}



/******************************************************************************/
/* TARGET 00431cfc  FUN_00431cfc */
/******************************************************************************/

undefined1  [10] FUN_00431cfc(void)

{
  float10 fVar1;
  int unaff_EBP;
  float10 in_ST0;
  undefined1 auVar2 [10];
  float10 fVar3;
  
  fVar3 = ((float10)1 + ABS(in_ST0)) * ((float10)1 - ABS(in_ST0));
  fVar1 = (float10)0;
  *(ushort *)(unaff_EBP + -0xa0) =
       (ushort)(fVar3 < fVar1) << 8 | (ushort)(NAN(fVar3) || NAN(fVar1)) << 10 |
       (ushort)(fVar3 == fVar1) << 0xe;
  if ((*(byte *)(unaff_EBP + -0x9f) & 1) == 0) {
    return (undefined1  [10])SQRT(fVar3);
  }
  auVar2 = FUN_00430f06();
  return auVar2;
}



/******************************************************************************/
/* TARGET 00431d2c  FUN_00431d2c */
/******************************************************************************/

/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

undefined1  [10] FUN_00431d2c(void)

{
  return _DAT_00436ada;
}



/******************************************************************************/
/* TARGET 00431f11  FUN_00431f11 */
/******************************************************************************/

/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

undefined4 FUN_00431f11(void)

{
  undefined4 uVar1;
  float10 in_ST0;
  
  if (ROUND(in_ST0) == in_ST0) {
    if (ROUND(in_ST0 * (float10)_DAT_00436d42) == in_ST0 * (float10)_DAT_00436d42) {
      uVar1 = 2;
    }
    else {
      uVar1 = 1;
    }
  }
  else {
    uVar1 = 0;
  }
  return uVar1;
}



/******************************************************************************/
/* TARGET 00431f80  __87except */
/******************************************************************************/

/* Library Function - Single Match
    __87except
   
   Library: Visual Studio 1998 Release */

void __cdecl __87except(int param_1,int *param_2,ushort *param_3)

{
  bool bVar1;
  undefined3 extraout_var;
  int iVar2;
  uint uVar3;
  uint local_5c;
  uint local_58 [10];
  int local_30;
  int local_2c;
  uint local_20;
  
  local_5c = (uint)*param_3;
  switch(*param_2) {
  case 1:
  case 5:
    uVar3 = 8;
    break;
  case 2:
    uVar3 = 4;
    break;
  case 3:
    uVar3 = 0x11;
    break;
  case 4:
    uVar3 = 0x12;
    break;
  case 7:
    *param_2 = 1;
  default:
    uVar3 = 0;
    break;
  case 8:
    uVar3 = 0x10;
  }
  if (uVar3 != 0) {
    bVar1 = __handle_exc(uVar3,(double *)(param_2 + 6),local_5c);
    if (CONCAT31(extraout_var,bVar1) == 0) {
      if (((param_1 == 0x10) || (param_1 == 0x16)) || (param_1 == 0x1d)) {
        local_2c = param_2[5];
        local_20 = local_20 & 0xffffffe3 | 3;
        local_30 = param_2[4];
      }
      else {
        local_20 = local_20 & 0xfffffffe;
      }
      __raise_exc(local_58,&local_5c,uVar3,param_1,(uint *)(param_2 + 2),(uint *)(param_2 + 6));
    }
  }
  __ctrlfp();
  iVar2 = 0;
  if ((*param_2 != 8) && (DAT_00436ee0 == 0)) {
    iVar2 = FUN_004329d0();
  }
  if (iVar2 == 0) {
    __set_errno(*param_2);
  }
  return;
}



/******************************************************************************/
/* TARGET 004320a0  FUN_004320a0 */
/******************************************************************************/

undefined4 __cdecl
FUN_004320a0(int param_1,int param_2,int param_3,uint param_4,undefined4 *param_5)

{
  double dVar1;
  int iVar2;
  undefined8 local_8;
  
  dVar1 = ABS((double)CONCAT44(param_2,param_1));
  if ((param_4 == 0x7ff00000) && (param_3 == 0)) {
    if (1.0 < dVar1) {
      param_5[1] = DAT_00436f0c;
      *param_5 = DAT_00436f08;
      return 0;
    }
    if (dVar1 < 1.0) {
      *param_5 = 0;
      param_5[1] = 0;
      return 0;
    }
    param_5[1] = DAT_00436f14;
    *param_5 = DAT_00436f10;
    return 1;
  }
  if ((param_4 == 0xfff00000) && (param_3 == 0)) {
    if (1.0 < dVar1) {
      *param_5 = 0;
      param_5[1] = 0;
      return 0;
    }
    if (dVar1 < 1.0) {
      param_5[1] = DAT_00436f0c;
      *param_5 = DAT_00436f08;
      return 0;
    }
    param_5[1] = DAT_00436f14;
    *param_5 = DAT_00436f10;
    return 1;
  }
  if ((param_2 != 0x7ff00000) || (param_1 != 0)) {
    if ((param_2 == -0x100000) && (param_1 == 0)) {
      iVar2 = FUN_004322f0(param_3,param_4);
      if (0.0 < (double)CONCAT44(param_4,param_3)) {
        if (iVar2 == 1) {
          local_8 = -(double)CONCAT44(DAT_00436f0c,DAT_00436f08);
        }
        else {
          local_8 = (double)CONCAT44(DAT_00436f0c,DAT_00436f08);
        }
        param_5[1] = local_8._4_4_;
        *param_5 = (undefined4)local_8;
        return 0;
      }
      if ((double)CONCAT44(param_4,param_3) < 0.0) {
        if (iVar2 == 1) {
          local_8._0_4_ = DAT_00436f28;
          local_8._4_4_ = DAT_00436f2c;
        }
        else {
          local_8._0_4_ = 0;
          local_8._4_4_ = 0;
        }
        param_5[1] = local_8._4_4_;
        *param_5 = (undefined4)local_8;
        return 0;
      }
      *param_5 = 0;
      param_5[1] = 0x3ff00000;
    }
    return 0;
  }
  if (0.0 < (double)CONCAT44(param_4,param_3)) {
    param_5[1] = DAT_00436f0c;
    *param_5 = DAT_00436f08;
    return 0;
  }
  *param_5 = 0;
  if ((double)CONCAT44(param_4,param_3) < 0.0) {
    param_5[1] = 0;
    return 0;
  }
  param_5[1] = 0x3ff00000;
  return 0;
}



/******************************************************************************/
/* TARGET 004322f0  FUN_004322f0 */
/******************************************************************************/

undefined4 __cdecl FUN_004322f0(int param_1,uint param_2)

{
  double dVar1;
  uint uVar2;
  float10 fVar3;
  
  uVar2 = FUN_00432c80(param_1,param_2);
  if ((uVar2 & 0x90) != 0) {
    return 0;
  }
  fVar3 = FUN_00432c60((double)CONCAT44(param_2,param_1));
  if (fVar3 == (float10)(double)CONCAT44(param_2,param_1)) {
    dVar1 = (double)CONCAT44(param_2,param_1) * 0.5;
    fVar3 = FUN_00432c60(dVar1);
    if (fVar3 == (float10)dVar1) {
      return 2;
    }
    return 1;
  }
  return 0;
}



/******************************************************************************/
/* TARGET 00432370  __raise_exc */
/******************************************************************************/

/* Library Function - Single Match
    __raise_exc
   
   Library: Visual Studio 1998 Release */

void __cdecl
__raise_exc(uint *param_1,uint *param_2,uint param_3,int param_4,uint *param_5,uint *param_6)

{
  uint *puVar1;
  uint *puVar2;
  uint uVar3;
  uint *puVar4;
  DWORD local_4;
  
  puVar1 = param_2;
  param_1[1] = 0;
  param_1[2] = 0;
  param_1[3] = 0;
  if ((param_3 & 0x10) != 0) {
    local_4 = 0xc000008f;
    param_1[1] = param_1[1] | 1;
  }
  if ((param_3 & 2) != 0) {
    local_4 = 0xc0000093;
    param_1[1] = param_1[1] | 2;
  }
  if ((param_3 & 1) != 0) {
    local_4 = 0xc0000091;
    param_1[1] = param_1[1] | 4;
  }
  if ((param_3 & 4) != 0) {
    local_4 = 0xc000008e;
    param_1[1] = param_1[1] | 8;
  }
  if ((param_3 & 8) != 0) {
    local_4 = 0xc0000090;
    param_1[1] = param_1[1] | 0x10;
  }
  uVar3 = param_1[2];
  param_1[2] = ((~*param_2 & 1) << 4 ^ uVar3) & 0x10 ^ uVar3;
  uVar3 = param_1[2];
  param_1[2] = ((uint)((*param_2 & 4) == 0) << 3 ^ uVar3) & 8 ^ uVar3;
  uVar3 = param_1[2];
  param_1[2] = ((uint)((*param_2 & 8) == 0) << 2 ^ uVar3) & 4 ^ uVar3;
  uVar3 = param_1[2];
  param_1[2] = ((uint)((*param_2 & 0x10) == 0) * 2 ^ uVar3) & 2 ^ uVar3;
  uVar3 = param_1[2];
  param_1[2] = ((*param_2 & 0x20) == 0 ^ uVar3) & 1 ^ uVar3;
  uVar3 = __statfp();
  puVar2 = param_6;
  if ((uVar3 & 1) != 0) {
    param_1[3] = param_1[3] | 0x10;
  }
  if ((uVar3 & 4) != 0) {
    param_1[3] = param_1[3] | 8;
  }
  if ((uVar3 & 8) != 0) {
    param_1[3] = param_1[3] | 4;
  }
  if ((uVar3 & 0x10) != 0) {
    param_1[3] = param_1[3] | 2;
  }
  if ((uVar3 & 0x20) != 0) {
    param_1[3] = param_1[3] | 1;
  }
  uVar3 = *puVar1 & 0xc00;
  if (uVar3 < 0x401) {
    if (uVar3 == 0x400) {
      *param_1 = *param_1 & 0xfffffffd | 1;
    }
    else if (uVar3 == 0) {
      *param_1 = *param_1 & 0xfffffffc;
    }
  }
  else if (uVar3 == 0x800) {
    *param_1 = *param_1 & 0xfffffffe | 2;
  }
  else if (uVar3 == 0xc00) {
    *param_1 = *param_1 | 3;
  }
  uVar3 = *puVar1 & 0x300;
  if (uVar3 == 0) {
    *param_1 = *param_1 & 0xffffffeb | 8;
  }
  else if (uVar3 == 0x200) {
    *param_1 = *param_1 & 0xffffffe7 | 4;
  }
  else if (uVar3 == 0x300) {
    *param_1 = *param_1 & 0xffffffe3;
  }
  *param_1 = (param_4 << 5 ^ *param_1) & 0x1ffe0 ^ *param_1;
  param_1[8] = param_1[8] | 1;
  param_1[8] = param_1[8] & 0xffffffe3 | 2;
  param_1[5] = param_5[1];
  param_1[4] = *param_5;
  param_1[0x14] = param_1[0x14] | 1;
  param_1[0x14] = param_1[0x14] & 0xffffffe3 | 2;
  param_1[0x11] = param_6[1];
  param_1[0x10] = *param_6;
  __clrfp();
  RaiseException(local_4,0,1,(ULONG_PTR *)&param_1);
  puVar4 = param_1 + 2;
  if ((*puVar4 & 0x10) != 0) {
    *puVar1 = *puVar1 & 0xfffffffe;
  }
  if ((*puVar4 & 8) != 0) {
    *puVar1 = *puVar1 & 0xfffffffb;
  }
  if ((*puVar4 & 4) != 0) {
    *puVar1 = *puVar1 & 0xfffffff7;
  }
  if ((*puVar4 & 2) != 0) {
    *puVar1 = *puVar1 & 0xffffffef;
  }
  if ((*puVar4 & 1) != 0) {
    *puVar1 = *puVar1 & 0xffffffdf;
  }
  switch(*param_1 & 3) {
  case 0:
    *puVar1 = *puVar1 & 0xfffff3ff;
    break;
  case 1:
    *puVar1 = *puVar1 & 0xfffff7ff | 0x400;
    break;
  case 2:
    *puVar1 = *puVar1 & 0xfffffbff | 0x800;
    break;
  case 3:
    *puVar1 = *puVar1 | 0xc00;
  }
  uVar3 = (*param_1 & 0x1c) >> 2;
  if (uVar3 == 0) {
    *puVar1 = *puVar1 & 0xfffff3ff | 0x300;
  }
  else if (uVar3 == 1) {
    *puVar1 = *puVar1 & 0xfffff3ff | 0x200;
  }
  else if (uVar3 == 2) {
    *puVar1 = *puVar1 & 0xfffff3ff;
  }
  puVar2[1] = param_1[0x11];
  *puVar2 = param_1[0x10];
  return;
}



/******************************************************************************/
/* TARGET 004326e0  __handle_exc */
/******************************************************************************/

/* Library Function - Single Match
    __handle_exc
   
   Library: Visual Studio 1998 Release */

bool __cdecl __handle_exc(uint param_1,double *param_2,uint param_3)

{
  ulonglong uVar1;
  uint uVar2;
  bool bVar3;
  float10 fVar4;
  undefined8 local_c;
  int local_4;
  
  uVar2 = param_1 & 0x1f;
  if (((param_1 & 8) == 0) || ((param_3 & 1) == 0)) {
    if (((param_1 & 4) == 0) || ((param_3 & 4) == 0)) {
      if (((param_1 & 1) == 0) || ((param_3 & 8) == 0)) {
        if (((param_1 & 2) != 0) && ((param_3 & 0x10) != 0)) {
          bVar3 = (param_1 & 0x10) != 0;
          if (((ulonglong)*param_2 & 0x7fffffff00000000) == 0 && *(int *)param_2 == 0) {
            bVar3 = true;
          }
          else {
            fVar4 = __decomp(*(uint *)param_2,*(uint *)((int)param_2 + 4),&local_4);
            local_4 = local_4 + -0x600;
            if (local_4 < -0x432) {
              bVar3 = true;
              local_c = 0.0;
            }
            else {
              local_c = (double)(ulonglong)
                                (SUB87((double)fVar4,0) & 0xfffffffffffff | 0x10000000000000);
              if (local_4 < -0x3fd) {
                local_4 = -0x3fd - local_4;
                do {
                  if ((((ulonglong)local_c & 1) != 0) && (!bVar3)) {
                    bVar3 = true;
                  }
                  uVar2 = (uint)local_c >> 1;
                  uVar1 = (ulonglong)local_c & 0x100000000;
                  local_c._0_4_ = uVar2;
                  if (uVar1 != 0) {
                    local_c._0_4_ = uVar2 | 0x80000000;
                  }
                  local_c = (double)CONCAT44(local_c._4_4_ >> 1,(uint)local_c);
                  local_4 = local_4 + -1;
                } while (local_4 != 0);
              }
              if ((double)fVar4 < 0.0) {
                local_c = -local_c;
              }
            }
            *(uint *)((int)param_2 + 4) = local_c._4_4_;
            *(uint *)param_2 = (uint)local_c;
          }
          if (bVar3) {
            FUN_00432a60();
          }
          uVar2 = param_1 & 0x1d;
        }
      }
      else {
        FUN_00432a60();
        uVar2 = param_3 & 0xc00;
        if (uVar2 < 0x401) {
          if (uVar2 == 0x400) {
            if (*param_2 <= 0.0) {
              uVar2 = param_1 & 0x1e;
              *param_2 = -(double)CONCAT44(DAT_00436f0c,DAT_00436f08);
            }
            else {
              uVar2 = param_1 & 0x1e;
              *(undefined4 *)((int)param_2 + 4) = DAT_00436f1c;
              *(undefined4 *)param_2 = DAT_00436f18;
            }
          }
          else if (uVar2 == 0) {
            if (*param_2 <= 0.0) {
              uVar2 = param_1 & 0x1e;
              *param_2 = -(double)CONCAT44(DAT_00436f0c,DAT_00436f08);
            }
            else {
              uVar2 = param_1 & 0x1e;
              *(undefined4 *)((int)param_2 + 4) = DAT_00436f0c;
              *(undefined4 *)param_2 = DAT_00436f08;
            }
          }
          else {
            uVar2 = param_1 & 0x1e;
          }
        }
        else if (uVar2 == 0x800) {
          if (*param_2 <= 0.0) {
            uVar2 = param_1 & 0x1e;
            *param_2 = -(double)CONCAT44(DAT_00436f1c,DAT_00436f18);
          }
          else {
            uVar2 = param_1 & 0x1e;
            *(undefined4 *)((int)param_2 + 4) = DAT_00436f0c;
            *(undefined4 *)param_2 = DAT_00436f08;
          }
        }
        else if (uVar2 == 0xc00) {
          if (*param_2 <= 0.0) {
            uVar2 = param_1 & 0x1e;
            *param_2 = -(double)CONCAT44(DAT_00436f1c,DAT_00436f18);
          }
          else {
            uVar2 = param_1 & 0x1e;
            *(undefined4 *)((int)param_2 + 4) = DAT_00436f1c;
            *(undefined4 *)param_2 = DAT_00436f18;
          }
        }
        else {
          uVar2 = param_1 & 0x1e;
        }
      }
    }
    else {
      uVar2 = param_1 & 0x1b;
      FUN_00432a60();
    }
  }
  else {
    uVar2 = param_1 & 0x17;
    FUN_00432a60();
  }
  if (((param_1 & 0x10) != 0) && ((param_3 & 0x20) != 0)) {
    uVar2 = uVar2 & 0xffffffef;
    FUN_00432a60();
  }
  return uVar2 == 0;
}



/******************************************************************************/
/* TARGET 004329a0  __set_errno */
/******************************************************************************/

/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */
/* Library Function - Single Match
    __set_errno
   
   Library: Visual Studio 1998 Release */

errno_t __cdecl __set_errno(int _Value)

{
  if (_Value == 1) {
    _DAT_00437358 = 0x21;
    return _Value;
  }
  if (1 < _Value) {
    if (3 < _Value) {
      return _Value;
    }
    _DAT_00437358 = 0x22;
  }
  return _Value;
}



/******************************************************************************/
/* TARGET 004329d0  FUN_004329d0 */
/******************************************************************************/

undefined4 FUN_004329d0(void)

{
  return 0;
}



/******************************************************************************/
/* TARGET 004329e0  __statfp */
/******************************************************************************/

/* Library Function - Single Match
    __statfp
   
   Library: Visual Studio 1998 Release */

int __statfp(void)

{
  short in_FPUStatusWord;
  
  return (int)in_FPUStatusWord;
}



/******************************************************************************/
/* TARGET 00432a00  __clrfp */
/******************************************************************************/

/* Library Function - Single Match
    __clrfp
   
   Library: Visual Studio 1998 Release */

int __clrfp(void)

{
  short in_FPUStatusWord;
  
  return (int)in_FPUStatusWord;
}



/******************************************************************************/
/* TARGET 00432a20  __ctrlfp */
/******************************************************************************/

/* Library Function - Single Match
    __ctrlfp
   
   Library: Visual Studio 1998 Release */

int __ctrlfp(void)

{
  short in_FPUControlWord;
  
  return (int)in_FPUControlWord;
}



/******************************************************************************/
/* TARGET 00432a60  FUN_00432a60 */
/******************************************************************************/

/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

void FUN_00432a60(void)

{
  return;
}



/******************************************************************************/
/* TARGET 00432ac0  __set_exp */
/******************************************************************************/

/* Library Function - Single Match
    __set_exp
   
   Library: Visual Studio 1998 Release */

float10 __cdecl __set_exp(undefined4 param_1,undefined4 param_2,short param_3)

{
  undefined2 uStack_4;
  
  uStack_4 = (undefined2)param_2;
  return (float10)(double)CONCAT26((param_3 + 0x3fe) * 0x10 | param_2._2_2_ & 0x800f,
                                   CONCAT24(uStack_4,param_1));
}



/******************************************************************************/
/* TARGET 00432b00  FUN_00432b00 */
/******************************************************************************/

undefined4 __cdecl FUN_00432b00(int param_1,uint param_2)

{
  if ((param_2 == 0x7ff00000) && (param_1 == 0)) {
    return 1;
  }
  if ((param_2 == 0xfff00000) && (param_1 == 0)) {
    return 2;
  }
  if ((param_2._2_2_ & 0x7ff8) == 0x7ff8) {
    return 3;
  }
  if (((param_2._2_2_ & 0x7ff8) == 0x7ff0) && (((param_2 & 0x7ffff) != 0 || (param_1 != 0)))) {
    return 4;
  }
  return 0;
}



/******************************************************************************/
/* TARGET 00432b70  __decomp */
/******************************************************************************/

/* Library Function - Single Match
    __decomp
   
   Library: Visual Studio 1998 Release */

float10 __cdecl __decomp(uint param_1,uint param_2,int *param_3)

{
  ushort uVar1;
  int iVar2;
  double dVar3;
  byte bVar4;
  int iVar5;
  float10 fVar6;
  double local_8;
  
  if ((param_2 & 0x7fffffff) == 0 && param_1 == 0) {
    iVar5 = 0;
    local_8 = 0.0;
  }
  else if (((param_2 & 0x7ff00000) == 0) && (((param_2 & 0xfffff) != 0 || (param_1 != 0)))) {
    dVar3 = (double)CONCAT17(param_2._3_1_,CONCAT16(param_2._2_1_,CONCAT24((ushort)param_2,param_1))
                            );
    iVar5 = -0x3fd;
    if ((param_2 & 0x100000) == 0) {
      do {
        bVar4 = param_2._2_1_;
        iVar2 = CONCAT13(param_2._3_1_,CONCAT12(param_2._2_1_,(ushort)param_2)) << 1;
        param_2._0_2_ = (ushort)iVar2;
        param_2._2_1_ = (byte)((uint)iVar2 >> 0x10);
        param_2._3_1_ = (byte)((uint)iVar2 >> 0x18);
        if ((param_1 & 0x80000000) != 0) {
          param_2._0_2_ = (ushort)param_2 | 1;
        }
        iVar5 = iVar5 + -1;
        param_1 = param_1 << 1;
      } while ((bVar4 & 8) == 0);
    }
    uVar1 = CONCAT11(param_2._3_1_,param_2._2_1_) & 0xffef;
    param_2._2_1_ = (byte)uVar1;
    param_2._3_1_ = (byte)(uVar1 >> 8);
    if (dVar3 < 0.0) {
      param_2._3_1_ = param_2._3_1_ | 0x80;
    }
    fVar6 = __set_exp(param_1,CONCAT13(param_2._3_1_,CONCAT12(param_2._2_1_,(ushort)param_2)),0);
    local_8 = (double)fVar6;
  }
  else {
    iVar5 = (short)(((ushort)(param_2 >> 0x10) & 0x7ff0) >> 4) + -0x3fe;
    fVar6 = __set_exp(param_1,param_2,0);
    local_8 = (double)fVar6;
  }
  *param_3 = iVar5;
  return (float10)local_8;
}



/******************************************************************************/
/* TARGET 00432c60  FUN_00432c60 */
/******************************************************************************/

float10 __cdecl FUN_00432c60(double param_1)

{
  return (float10)ROUND(param_1);
}



/******************************************************************************/
/* TARGET 00432c80  FUN_00432c80 */
/******************************************************************************/

int __cdecl FUN_00432c80(int param_1,uint param_2)

{
  int iVar1;
  
  if ((param_2._2_2_ & 0x7ff0) != 0x7ff0) {
    if ((param_2 & 0x7fffffff) == 0 && param_1 == 0) {
      return (-(uint)((param_2 & 0x80000000) == 0) & 0x20) + 0x20;
    }
    if (((param_2 & 0x7ff00000) == 0) && (((param_2 & 0xfffff) != 0 || (param_1 != 0)))) {
      return (-(uint)((param_2 & 0x80000000) == 0) & 0x70) + 0x10;
    }
    return (-(uint)((param_2 & 0x80000000) == 0) & 0xf8) + 8;
  }
  iVar1 = FUN_00432b00(param_1,param_2);
  if (iVar1 == 1) {
    return 0x200;
  }
  if (iVar1 != 2) {
    if (iVar1 != 3) {
      return 1;
    }
    return 2;
  }
  return 4;
}



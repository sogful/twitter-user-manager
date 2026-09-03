/* Decompiler output for key RVAs — Ghidra MachinariumExportAnalysis */

/******************************************************************************/
/* TARGET 00430450 */
/******************************************************************************/
/* no function at 00430450 */

/******************************************************************************/
/* TARGET 0043c860 */
/******************************************************************************/
/* no function at 0043c860 */

/******************************************************************************/
/* TARGET 0043cb90 */
/******************************************************************************/
/* no function at 0043cb90 */

/******************************************************************************/
/* TARGET 0043cc70 */
/******************************************************************************/
/* no function at 0043cc70 */

/******************************************************************************/
/* TARGET 0043cd00 */
/******************************************************************************/
/* no function at 0043cd00 */

/******************************************************************************/
/* TARGET 0043cfa0 */
/******************************************************************************/
/* no function at 0043cfa0 */

/******************************************************************************/
/* TARGET 0043ce00 */
/******************************************************************************/
/* no function at 0043ce00 */

/******************************************************************************/
/* TARGET 00436d80 */
/******************************************************************************/
/* no function at 00436d80 */

/******************************************************************************/
/* TARGET 00436cd0 */
/******************************************************************************/
/* no function at 00436cd0 */

/******************************************************************************/
/* TARGET 00548370 */
/******************************************************************************/
/* no function at 00548370 */

/******************************************************************************/
/* TARGET 00428c40 */
/******************************************************************************/

void FUN_00428c40(void)

{
  return;
}



/******************************************************************************/
/* TARGET 0042ad20 */
/******************************************************************************/

void FUN_0042ad20(void)

{
  FUN_0042ac90();
  return;
}



/******************************************************************************/
/* TARGET 004304c0 */
/******************************************************************************/
/* no function at 004304c0 */

/******************************************************************************/
/* TARGET 0042a530 */
/******************************************************************************/
/* no function at 0042a530 */

/******************************************************************************/
/* TARGET 0042a480 */
/******************************************************************************/
/* no function at 0042a480 */

/******************************************************************************/
/* TARGET 0042a400 */
/******************************************************************************/

float10 FUN_0042a400(_FILETIME param_1)

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
/* TARGET 00430240 */
/******************************************************************************/
/* no function at 00430240 */

/******************************************************************************/
/* TARGET 004302e0 */
/******************************************************************************/

void FUN_004302e0(void)

{
  code *pcVar1;
  int iVar2;
  undefined4 *puVar3;
  undefined4 *in_ECX;
  int iStack_8;
  undefined4 uStack_4;
  
  iVar2 = FUN_004288c0();
  FUN_004064c0(&iStack_8);
  pcVar1 = (code *)*DAT_004376e0;
  DAT_004376e0 = DAT_004376e0 + 4;
  (*pcVar1)();
  puVar3 = FUN_004068f0(&iStack_8,&uStack_4,iVar2);
  FUN_00407cc0(in_ECX,puVar3);
  FUN_00406610(&uStack_4);
  FUN_00406610(&iStack_8);
  return;
}



/******************************************************************************/
/* TARGET 00430350 */
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
/* TARGET 004303e0 */
/******************************************************************************/
/* no function at 004303e0 */

/******************************************************************************/
/* TARGET 0042ad60 */
/******************************************************************************/

float10 FUN_0042ad60(void)

{
  return (float10)DAT_00437740 * (float10)0.03125;
}



/******************************************************************************/
/* TARGET 0042a3c0 */
/******************************************************************************/
/* no function at 0042a3c0 */

/******************************************************************************/
/* TARGET 00430570 */
/******************************************************************************/
/* no function at 00430570 */

/******************************************************************************/
/* TARGET 00404830 */
/******************************************************************************/
/* no function at 00404830 */

/******************************************************************************/
/* TARGET 004304c0 */
/******************************************************************************/
/* no function at 004304c0 */

/******************************************************************************/
/* TARGET 0040de20 */
/******************************************************************************/

/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

undefined4 FUN_0040de20(void)

{
  int *piVar1;
  char cVar2;
  int iVar3;
  int in_EAX;
  int iVar4;
  int in_ECX;
  int in_EDX;
  int unaff_EBX;
  int unaff_EBP;
  int unaff_ESI;
  byte *unaff_EDI;
  
  do {
    if ((1 < *(int *)(in_EAX + 4 + unaff_EBX)) && (*(int *)(unaff_EDI + 4) == 3)) {
      iVar3 = *(int *)(unaff_EBP + -0x34);
      goto LAB_0040de49;
    }
    do {
      if ((*unaff_EDI & 2) == 0) {
        iVar3 = *(int *)(unaff_EBP + -0x34);
        in_ECX = *(int *)(unaff_EBP + -0x3c);
LAB_0040de49:
        do {
          iVar4 = *(int *)(*(int *)(unaff_EBP + -4) + 0x1c + DAT_004373a8);
          if (iVar4 < 0x32) {
            if (iVar4 == 0x31) {
              if ((in_ECX < 0) || (cVar2 = FUN_00413e14(in_ECX,0x41bf20), cVar2 == '\0')) {
                if (unaff_ESI == 1) {
                  FUN_0040e421(0x41bee0,iVar3);
                }
                else {
                  FUN_0040e434(0x41bf00,iVar3,unaff_ESI);
                }
              }
              *(int *)(unaff_EBP + -0x24) = *(int *)(unaff_EBP + -0x24) + unaff_ESI;
              _DAT_0043737c = _DAT_0043737c + unaff_ESI;
            }
            else if (iVar4 == 0x2b) {
              if ((in_ECX < 0) || (cVar2 = FUN_004134b2(in_ECX,0x41bd70), cVar2 == '\0')) {
                if (unaff_ESI == 1) {
                  FUN_0040e421(0x41bd30,iVar3);
                }
                else {
                  FUN_0040e434(0x41bd50,iVar3,unaff_ESI);
                }
              }
              *(int *)(unaff_EBP + -0xc) = *(int *)(unaff_EBP + -0xc) + unaff_ESI;
              _DAT_00437360 = _DAT_00437360 + unaff_ESI;
            }
            else if (iVar4 == 0x2c) {
              if ((in_ECX < 0) || (cVar2 = FUN_00410c54(in_ECX,0x41be80), cVar2 == '\0')) {
                if (unaff_ESI == 1) {
                  FUN_0040e421(0x41be40,iVar3);
                }
                else {
                  FUN_0040e434(0x41be60,iVar3,unaff_ESI);
                }
              }
              *(int *)(unaff_EBP + -0x18) = *(int *)(unaff_EBP + -0x18) + unaff_ESI;
              _DAT_00437368 = _DAT_00437368 + unaff_ESI;
            }
            else if (iVar4 == 0x2d) {
              if ((in_ECX < 0) || (cVar2 = FUN_00413c2f(in_ECX,0x41c100), cVar2 == '\0')) {
                if (unaff_ESI == 1) {
                  FUN_0040e421(0x41c0c0,iVar3);
                }
                else {
                  FUN_0040e434(0x41c0e0,iVar3,unaff_ESI);
                }
              }
              *(int *)(unaff_EBP + -0x28) = *(int *)(unaff_EBP + -0x28) + unaff_ESI;
              _DAT_00437378 = _DAT_00437378 + unaff_ESI;
            }
            else if (iVar4 == 0x2e) {
              if ((in_ECX < 0) || (cVar2 = FUN_00411c82(in_ECX,0x41c240), cVar2 == '\0')) {
                if (unaff_ESI == 1) {
                  FUN_0040e421(0x41c200,iVar3);
                }
                else {
                  FUN_0040e434(0x41c220,iVar3,unaff_ESI);
                }
              }
              *(int *)(unaff_EBP + -0x2c) = *(int *)(unaff_EBP + -0x2c) + unaff_ESI;
              _DAT_00437370 = _DAT_00437370 + unaff_ESI;
            }
            else {
              if (iVar4 != 0x30) goto LAB_0040e142;
              if ((in_ECX < 0) || (cVar2 = FUN_00411a9c(in_ECX,0x41bfc0), cVar2 == '\0')) {
                if (unaff_ESI == 1) {
                  FUN_0040e421(0x41bf80,iVar3);
                }
                else {
                  FUN_0040e434(0x41bfa0,iVar3,unaff_ESI);
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
            if (iVar4 == 0x33) {
              if ((in_ECX < 0) || (cVar2 = FUN_00414426(in_ECX,0x41c060), cVar2 == '\0')) {
                if (unaff_ESI == 1) {
                  FUN_0040e421(0x41c020,iVar3);
                }
                else {
                  FUN_0040e434(0x41c040,iVar3,unaff_ESI);
                }
              }
              *(int *)(unaff_EBP + -0x10) = *(int *)(unaff_EBP + -0x10) + unaff_ESI;
              _DAT_00437380 = _DAT_00437380 + unaff_ESI;
              goto LAB_0040e12e;
            }
            if (iVar4 == 0x38) {
              FUN_0040e421(0x41bcf0,in_EDX);
              *(int *)(unaff_EBP + -0x30) = *(int *)(unaff_EBP + -0x30) + 1;
              _DAT_00437384 = _DAT_00437384 + 1;
              goto LAB_0040e12e;
            }
            if (iVar4 == 0x3f) {
              if ((in_ECX < 0) || (cVar2 = FUN_004117c0(in_ECX,0x41be00), cVar2 == '\0')) {
                if (unaff_ESI == 1) {
                  FUN_0040e421(0x41bdc0,iVar3);
                }
                else {
                  FUN_0040e434(0x41bde0,iVar3,unaff_ESI);
                }
              }
              *(int *)(unaff_EBP + -0x14) = *(int *)(unaff_EBP + -0x14) + unaff_ESI;
              _DAT_00437364 = _DAT_00437364 + unaff_ESI;
              goto LAB_0040e12e;
            }
            if (iVar4 == 0xf6) {
              if ((in_ECX < 0) || (cVar2 = FUN_0041392a(in_ECX,0x41c1a0), cVar2 == '\0')) {
                if (unaff_ESI == 1) {
                  FUN_0040e421(0x41c160,iVar3);
                }
                else {
                  FUN_0040e434(0x41c180,iVar3,unaff_ESI);
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
            iVar4 = FUN_0040e421(0x41e120,-1);
            iVar3 = *(int *)(unaff_EBP + -0xc);
            if (0 < iVar3) {
              FUN_0040e421(0x41bda0,iVar3);
              piVar1 = (int *)(iVar4 * 0x10 + 4 + DAT_004376d4);
              *piVar1 = *piVar1 + 1;
              _DAT_00437360 = _DAT_00437360 - iVar3;
            }
            iVar3 = *(int *)(unaff_EBP + -0x10);
            if (0 < iVar3) {
              FUN_0040e421(0x41c0a0,iVar3);
              piVar1 = (int *)(iVar4 * 0x10 + 4 + DAT_004376d4);
              *piVar1 = *piVar1 + 1;
              _DAT_00437380 = _DAT_00437380 - iVar3;
            }
            iVar3 = *(int *)(unaff_EBP + -0x14);
            if (0 < iVar3) {
              FUN_0040e421(0x41be20,iVar3);
              piVar1 = (int *)(iVar4 * 0x10 + 4 + DAT_004376d4);
              *piVar1 = *piVar1 + 1;
              _DAT_00437364 = _DAT_00437364 - iVar3;
            }
            iVar3 = *(int *)(unaff_EBP + -0x18);
            if (0 < iVar3) {
              FUN_0040e421(0x41bec0,iVar3);
              piVar1 = (int *)(iVar4 * 0x10 + 4 + DAT_004376d4);
              *piVar1 = *piVar1 + 1;
              _DAT_00437368 = _DAT_00437368 - iVar3;
            }
            iVar3 = *(int *)(unaff_EBP + -0x1c);
            if (0 < iVar3) {
              FUN_0040e421(0x41c000,iVar3);
              piVar1 = (int *)(iVar4 * 0x10 + 4 + DAT_004376d4);
              *piVar1 = *piVar1 + 1;
              _DAT_0043736c = _DAT_0043736c - iVar3;
            }
            iVar3 = *(int *)(unaff_EBP + -0x20);
            if (0 < iVar3) {
              FUN_0040e421(0x41c1e0,iVar3);
              piVar1 = (int *)(iVar4 * 0x10 + 4 + DAT_004376d4);
              *piVar1 = *piVar1 + 1;
              _DAT_00437374 = _DAT_00437374 - iVar3;
            }
            iVar3 = *(int *)(unaff_EBP + -0x24);
            if (0 < iVar3) {
              FUN_0040e421(0x41bf60,iVar3);
              piVar1 = (int *)(iVar4 * 0x10 + 4 + DAT_004376d4);
              *piVar1 = *piVar1 + 1;
              _DAT_0043737c = _DAT_0043737c - iVar3;
            }
            iVar3 = *(int *)(unaff_EBP + -0x28);
            if (0 < iVar3) {
              FUN_0040e421(0x41c140,iVar3);
              piVar1 = (int *)(iVar4 * 0x10 + 4 + DAT_004376d4);
              *piVar1 = *piVar1 + 1;
              _DAT_00437378 = _DAT_00437378 - iVar3;
            }
            iVar3 = *(int *)(unaff_EBP + -0x2c);
            if (0 < iVar3) {
              FUN_0040e421(0x41c280,iVar3);
              piVar1 = (int *)(iVar4 * 0x10 + 4 + DAT_004376d4);
              *piVar1 = *piVar1 + 1;
              _DAT_00437370 = _DAT_00437370 - iVar3;
            }
            iVar3 = *(int *)(unaff_EBP + -0x30);
            if (0 < iVar3) {
              FUN_0040e421(0x41bd10,iVar3);
              piVar1 = (int *)(iVar4 * 0x10 + 4 + DAT_004376d4);
              *piVar1 = *piVar1 + 1;
              _DAT_00437384 = _DAT_00437384 - iVar3;
            }
            return 1;
          }
          iVar3 = DAT_0043738c + *(int *)(unaff_EBP + -4);
          unaff_ESI = 1;
          in_EDX = *(int *)(iVar3 + 0xc);
          iVar3 = *(int *)(iVar3 + 8);
          *(int *)(unaff_EBP + -0x34) = iVar3;
          if (-1 < in_EDX) {
            unaff_ESI = *(int *)(in_EDX * 0x10 + 4 + DAT_00437108);
          }
          in_ECX = -1;
          *(undefined4 *)(unaff_EBP + -0x3c) = 0xffffffff;
        } while (((*(int *)(unaff_EBP + 8) < 0) || (unaff_ESI != 1)) ||
                ((*(byte *)(*(int *)(unaff_EBP + 8) * 0x20 + DAT_0043739c) & 1) == 0));
        in_ECX = *(int *)(unaff_EBP + 8) + 1;
      }
      else {
        in_ECX = in_ECX + *(int *)(in_EAX + 4 + DAT_004373a0);
      }
      in_EAX = in_ECX * 0x20;
      unaff_EDI = (byte *)(DAT_0043739c + in_EAX);
      unaff_EBX = DAT_004373a0;
    } while (*(int *)(unaff_EDI + 8) != *(int *)(unaff_EBP + -8));
  } while( true );
}



/******************************************************************************/
/* TARGET 0041c660 */
/******************************************************************************/
/* no function at 0041c660 */

/******************************************************************************/
/* TARGET 00419c90 */
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
/* TARGET 0041df60 */
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
/* TARGET 0041c140 */
/******************************************************************************/

void FUN_0041c140(void)

{
  FUN_004057d0(&DAT_00437200,*(int *)(DAT_004376e0 + -0xc));
  return;
}



/******************************************************************************/
/* TARGET 00418160 */
/******************************************************************************/
/* no function at 00418160 */

/******************************************************************************/
/* TARGET 004419c0 */
/******************************************************************************/
/* no function at 004419c0 */

/******************************************************************************/
/* TARGET 00447440 */
/******************************************************************************/
/* no function at 00447440 */

/******************************************************************************/
/* TARGET 00441e70 */
/******************************************************************************/
/* no function at 00441e70 */

/******************************************************************************/
/* TARGET 0044e9f0 */
/******************************************************************************/
/* no function at 0044e9f0 */

/******************************************************************************/
/* TARGET 00431b80 */
/******************************************************************************/

undefined4 FUN_00431b80(undefined4 param_1,undefined4 param_2)

{
  char *in_EAX;
  
  *in_EAX = *in_EAX + (char)in_EAX;
  return param_2;
}



/******************************************************************************/
/* TARGET 00420db0 */
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
/* TARGET 00414980 */
/******************************************************************************/
/* no function at 00414980 */

/******************************************************************************/
/* TARGET 00444d90 */
/******************************************************************************/
/* no function at 00444d90 */

/******************************************************************************/
/* TARGET 0043d310 */
/******************************************************************************/
/* no function at 0043d310 */

/******************************************************************************/
/* TARGET 0041ee50 */
/******************************************************************************/

void FUN_0041ee50(void)

{
  FUN_0041ed70();
  FUN_004197a0(1,*(double *)(DAT_00437080 + 0xb8) + 1.5707963267948966);
  return;
}



/******************************************************************************/
/* TARGET 00437db0 */
/******************************************************************************/
/* no function at 00437db0 */

/******************************************************************************/
/* TARGET 004459e0 */
/******************************************************************************/
/* no function at 004459e0 */

/******************************************************************************/
/* TARGET 0040f990 */
/******************************************************************************/

undefined1 FUN_0040f990(void)

{
  int unaff_ESI;
  
  FUN_00413525(unaff_ESI,0x4f73,0);
  FUN_00413525(unaff_ESI,0x4f74,0x3ff0000000000000);
  return 1;
}



/******************************************************************************/
/* TARGET 00446310 */
/******************************************************************************/
/* no function at 00446310 */

/******************************************************************************/
/* TARGET 00445ee0 */
/******************************************************************************/
/* no function at 00445ee0 */

/******************************************************************************/
/* TARGET 004300d0 */
/******************************************************************************/
/* no function at 004300d0 */

// app/_repository/data/FattyAcids.constants.ts

/* =========================
 * 脂肪酸 (Fatty Acids)
 * ========================= */
export const FA_ELEMENTS = {
  FA_OM3: {
    DisplayName: "Omega-3",
    Standard_Unit: "mg",
    isAIRequired: true,
    isVisible: true,
    DefaultTarget: 1000,
    DefaultHalfLife_hr: 16,
    Category: "FattyAcids"
  },
  FA_OM6: {
    DisplayName: "Omega-6",
    Standard_Unit: "mg",
    isAIRequired: true,
    isVisible: true,
    DefaultTarget: 12000,
    DefaultHalfLife_hr: 20,
    Category: "FattyAcids"
  },
} as const;
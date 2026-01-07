// app/_repository/data/FattyAcids.constants.ts

/* =========================
 * 脂肪酸 (Fatty Acids)
 * ========================= */
export const FA_ELEMENTS = {
  FA_OM3: {
    element: {
      DisplayName_zh: "Omega-3 脂肪酸",
      DisplayName_en: "Omega-3",
      Name_en: "n-3 Fatty Acids",
      Standard_Unit: "mg",
      Category: "FattyAcids",
      isAIRequired: true,
      isVisible: true,
    },
    model: {
      DefaultTarget: 1000,
      DefaultHalfLife_hr: 16,
    },
  },
  FA_OM6: {
    element: {
      DisplayName_zh: "Omega-6 脂肪酸",
      DisplayName_en: "Omega-6",
      Name_en: "n-6 Fatty Acids",
      Standard_Unit: "mg",
      Category: "FattyAcids",
      isAIRequired: true,
      isVisible: true,
    },
    model: {
      DefaultTarget: 12000,
      DefaultHalfLife_hr: 20,
    },
  },
} as const;
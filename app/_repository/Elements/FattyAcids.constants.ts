/**
 * Fatty Acids Element Bundles
 * ==================================================
 * 對齊 FD1.registry.ts → FattyAcids interface
 *
 * 規則（你定的）：
 * - DisplayName_en：短名 / 縮寫（UI 顯示）
 * - FullName_en：英文全名（正式）
 * - Category 固定 "FattyAcids"
 */

export const FA_ELEMENTS = {
  /* =========================
   * 核心脂肪分類
   * ========================= */

  FA_SAT: {
    element: {
      DisplayName_zh: "飽和脂肪酸",
      DisplayName_en: "SFA",
      FullName_en: "Saturated Fatty Acids",
      Standard_Unit: "g",
      Category: "FattyAcids",
      isAIRequired: true,
      isVisible: true,
    },
    model: { DefaultTarget: 20, DefaultHalfLife_hr: 24 },
  },

  FA_MUFA: {
    element: {
      DisplayName_zh: "單元不飽和脂肪酸",
      DisplayName_en: "MUFA",
      FullName_en: "Monounsaturated Fatty Acids",
      Standard_Unit: "g",
      Category: "FattyAcids",
      isAIRequired: false,
      isVisible: true,
    },
    model: { DefaultTarget: 30, DefaultHalfLife_hr: 24 },
  },

  FA_PUFA: {
    element: {
      DisplayName_zh: "多元不飽和脂肪酸",
      DisplayName_en: "PUFA",
      FullName_en: "Polyunsaturated Fatty Acids",
      Standard_Unit: "g",
      Category: "FattyAcids",
      isAIRequired: false,
      isVisible: true,
    },
    model: { DefaultTarget: 20, DefaultHalfLife_hr: 24 },
  },

  FA_TFA: {
    element: {
      DisplayName_zh: "反式脂肪酸",
      DisplayName_en: "TFA",
      FullName_en: "Trans Fatty Acids",
      Standard_Unit: "g",
      Category: "FattyAcids",
      isAIRequired: true,
      isVisible: true,
    },
    model: { DefaultTarget: 0, DefaultHalfLife_hr: 48 },
  },

  FA_CHO: {
    element: {
      DisplayName_zh: "膽固醇",
      DisplayName_en: "Chol",
      FullName_en: "Cholesterol",
      Standard_Unit: "mg",
      Category: "FattyAcids",
      isAIRequired: true,
      isVisible: true,
    },
    model: { DefaultTarget: 300, DefaultHalfLife_hr: 24 },
  },

  /* =========================
   * Omega-3（抗發炎軸）
   * ========================= */

  FA_OM3: {
    element: {
      DisplayName_zh: "Omega-3 脂肪酸（總量）",
      DisplayName_en: "Omega-3",
      FullName_en: "n-3 Fatty Acids",
      Standard_Unit: "mg",
      Category: "FattyAcids",
      isAIRequired: true,
      isVisible: true,
    },
    model: { 
      DefaultTarget: 1000,
      DefaultHalfLife_hr: 16
    },
  },

  FA_ALA: {
    element: {
      DisplayName_zh: "α-亞麻酸",
      DisplayName_en: "ALA",
      FullName_en: "Alpha-Linolenic Acid",
      Standard_Unit: "mg",
      Category: "FattyAcids",
      isAIRequired: false,
      isVisible: true,
    },
    model: { DefaultTarget: 1200,
      DefaultHalfLife_hr: 12
    },
  },

  FA_EPA: {
    element: {
      DisplayName_zh: "二十碳五烯酸",
      DisplayName_en: "EPA",
      FullName_en: "Eicosapentaenoic Acid",
      Standard_Unit: "mg",
      Category: "FattyAcids",
      isAIRequired: true,
      isVisible: true,
    },
    model: { DefaultTarget: 500,
      DefaultHalfLife_hr: 18
    },
  },

  FA_DHA: {
    element: {
      DisplayName_zh: "二十二碳六烯酸",
      DisplayName_en: "DHA",
      FullName_en: "Docosahexaenoic Acid",
      Standard_Unit: "mg",
      Category: "FattyAcids",
      isAIRequired: true,
      isVisible: true,
    },
    model: { DefaultTarget: 500,
      DefaultHalfLife_hr: 24
    },
  },

  /* =========================
   * Omega-6（促 / 抗發炎平衡）
   * ========================= */

  FA_OM6: {
    element: {
      DisplayName_zh: "Omega-6 脂肪酸（總量）",
      DisplayName_en: "Omega-6",
      FullName_en: "n-6 Fatty Acids",
      Standard_Unit: "mg",
      Category: "FattyAcids",
      isAIRequired: true,
      isVisible: true,
    },
    model: { DefaultTarget: 12000,
      DefaultHalfLife_hr: 20
    },
  },

  FA_LA: {
    element: {
      DisplayName_zh: "亞麻油酸",
      DisplayName_en: "LA",
      FullName_en: "Linoleic Acid",
      Standard_Unit: "mg",
      Category: "FattyAcids",
      isAIRequired: false,
      isVisible: true,
    },
    model: { DefaultTarget: 10000, DefaultHalfLife_hr: 18 },
  },

  FA_GLA: {
    element: {
      DisplayName_zh: "γ-次亞麻油酸",
      DisplayName_en: "GLA",
      FullName_en: "Gamma-Linolenic Acid",
      Standard_Unit: "mg",
      Category: "FattyAcids",
      isAIRequired: false,
      isVisible: true,
    },
    model: { DefaultTarget: 300, DefaultHalfLife_hr: 12 },
  },

  FA_DGLA: {
    element: {
      DisplayName_zh: "二高 γ-亞麻油酸",
      DisplayName_en: "DGLA",
      FullName_en: "Dihomo-Gamma-Linolenic Acid",
      Standard_Unit: "mg",
      Category: "FattyAcids",
      isAIRequired: false,
      isVisible: true,
    },
    model: { DefaultTarget: 200, DefaultHalfLife_hr: 14 },
  },

  FA_AA: {
    element: {
      DisplayName_zh: "花生四烯酸",
      DisplayName_en: "AA",
      FullName_en: "Arachidonic Acid",
      Standard_Unit: "mg",
      Category: "FattyAcids",
      isAIRequired: true,
      isVisible: true,
    },
    model: { DefaultTarget: 500, DefaultHalfLife_hr: 20 },
  },

  /* =========================
   * Omega-9
   * ========================= */

  FA_OM9: {
    element: {
      DisplayName_zh: "Omega-9 脂肪酸",
      DisplayName_en: "Omega-9",
      FullName_en: "Omega-9 Fatty Acids",
      Standard_Unit: "mg",
      Category: "FattyAcids",
      isAIRequired: false,
      isVisible: true,
    },
    model: { DefaultTarget: 8000, DefaultHalfLife_hr: 24 },
  },
} as const;
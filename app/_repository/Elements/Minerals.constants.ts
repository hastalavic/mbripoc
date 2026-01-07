// app/_repository/data/Minerals.constants.ts

/* BVT 系統中央元素清單 (SSOT) */

/* =========================
 * 礦物質 (Minerals)
 * ========================= */
export const MIN_ELEMENTS = {
  MIN_K: {
    element: {
      DisplayName_zh: "鉀",
      DisplayName_en: "Potassium",
      Name_en: "Potassium",
      Standard_Unit: "mg",
      Category: "Minerals",
      isAIRequired: true,
      isVisible: true,
    },
    model: {
      DefaultTarget: 3500,
      DefaultHalfLife_hr: 6,
    },
  },
  MIN_SE: {
    element: {
      DisplayName_zh: "硒",
      DisplayName_en: "Selenium",
      Name_en: "Selenium",
      Standard_Unit: "mcg",
      Category: "Minerals",
      isAIRequired: true,
      isVisible: true,
    },
    model: {
      DefaultTarget: 55,
      DefaultHalfLife_hr: 24,
    },
  },
  MIN_MG: {
    element: {
      DisplayName_zh: "鎂",
      DisplayName_en: "Magnesium",
      Name_en: "Magnesium",
      Standard_Unit: "mg",
      Category: "Minerals",
      isAIRequired: true,
      isVisible: true,
    },
    model: {
      DefaultTarget: 320,
      DefaultHalfLife_hr: 12,
    },
  },
  MIN_ZN: {
    element: {
      DisplayName_zh: "鋅",
      DisplayName_en: "Zinc",
      Name_en: "Zinc",
      Standard_Unit: "mg",
      Category: "Minerals",
      isAIRequired: true,
      isVisible: true,
    },
    model: {
      DefaultTarget: 10,
      DefaultHalfLife_hr: 12,
    },
  },
} as const;
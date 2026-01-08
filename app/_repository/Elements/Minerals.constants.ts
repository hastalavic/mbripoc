// app/_repository/data/Minerals.constants.ts

/**
 * Minerals Constants Module
 * ==================================================
 * 系統角色：
 * - SSOT（Single Source of Truth）的一部分
 * - 定義「礦物質是什麼」
 *
 * 原則：
 * - Key 必須 100% 對齊 FD1.registry.ts → interface Minerals
 * - 不承擔計算、不 import 型別、不含邏輯
 * - 僅提供 element（顯示 / AI / 分類）與 model（生理參數）
 */

/* ==================================================
 * Minerals Element Bundles
 * ================================================== */
export const MIN_ELEMENTS = {
  /* =========================
   * Macrominerals
   * ========================= */

  MIN_NA: {
    element: {
      DisplayName_zh: "鈉",
      DisplayName_en: "Sodium",
      FullName_en: "Sodium",
      Standard_Unit: "mg",
      Category: "Minerals",
      isAIRequired: true,
      isVisible: true,
    },
    model: {
      DefaultTarget: 2300,
      DefaultHalfLife_hr: 8,
    },
  },

  MIN_K: {
    element: {
      DisplayName_zh: "鉀",
      DisplayName_en: "Potassium",
      FullName_en: "Potassium",
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

  MIN_CA: {
    element: {
      DisplayName_zh: "鈣",
      DisplayName_en: "Calcium",
      FullName_en: "Calcium",
      Standard_Unit: "mg",
      Category: "Minerals",
      isAIRequired: true,
      isVisible: true,
    },
    model: {
      DefaultTarget: 1000,
      DefaultHalfLife_hr: 24,
    },
  },

  MIN_MG: {
    element: {
      DisplayName_zh: "鎂",
      DisplayName_en: "Magnesium",
      FullName_en: "Magnesium",
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

  MIN_P: {
    element: {
      DisplayName_zh: "磷",
      DisplayName_en: "Phosphorus",
      FullName_en: "Phosphorus",
      Standard_Unit: "mg",
      Category: "Minerals",
      isAIRequired: true,
      isVisible: true,
    },
    model: {
      DefaultTarget: 700,
      DefaultHalfLife_hr: 24,
    },
  },

  MIN_CL: {
    element: {
      DisplayName_zh: "氯",
      DisplayName_en: "Chloride",
      FullName_en: "Chloride",
      Standard_Unit: "mg",
      Category: "Minerals",
      isAIRequired: true,
      isVisible: true,
    },
    model: {
      DefaultTarget: 2300,
      DefaultHalfLife_hr: 8,
    },
  },

  MIN_S: {
    element: {
      DisplayName_zh: "硫",
      DisplayName_en: "Sulfur",
      FullName_en: "Sulfur",
      Standard_Unit: "mg",
      Category: "Minerals",
      isAIRequired: false,
      isVisible: false,
    },
    model: {
      DefaultTarget: null,
      DefaultHalfLife_hr: null,
    },
  },

  /* =========================
   * Trace Minerals
   * ========================= */

  MIN_FE: {
    element: {
      DisplayName_zh: "鐵",
      DisplayName_en: "Iron",
      FullName_en: "Iron",
      Standard_Unit: "mg",
      Category: "Minerals",
      isAIRequired: true,
      isVisible: true,
    },
    model: {
      DefaultTarget: 18,
      DefaultHalfLife_hr: 48,
    },
  },

  MIN_ZN: {
    element: {
      DisplayName_zh: "鋅",
      DisplayName_en: "Zinc",
      FullName_en: "Zinc",
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

  MIN_SE: {
    element: {
      DisplayName_zh: "硒",
      DisplayName_en: "Selenium",
      FullName_en: "Selenium",
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

  MIN_CU: {
    element: {
      DisplayName_zh: "銅",
      DisplayName_en: "Copper",
      FullName_en: "Copper",
      Standard_Unit: "mg",
      Category: "Minerals",
      isAIRequired: true,
      isVisible: true,
    },
    model: {
      DefaultTarget: 0.9,
      DefaultHalfLife_hr: 24,
    },
  },

  MIN_MN: {
    element: {
      DisplayName_zh: "錳",
      DisplayName_en: "Manganese",
      FullName_en: "Manganese",
      Standard_Unit: "mg",
      Category: "Minerals",
      isAIRequired: true,
      isVisible: true,
    },
    model: {
      DefaultTarget: 2.3,
      DefaultHalfLife_hr: 24,
    },
  },

  MIN_I: {
    element: {
      DisplayName_zh: "碘",
      DisplayName_en: "Iodine",
      FullName_en: "Iodine",
      Standard_Unit: "mcg",
      Category: "Minerals",
      isAIRequired: true,
      isVisible: true,
    },
    model: {
      DefaultTarget: 150,
      DefaultHalfLife_hr: 24,
    },
  },

  MIN_F: {
    element: {
      DisplayName_zh: "氟",
      DisplayName_en: "Fluoride",
      FullName_en: "Fluoride",
      Standard_Unit: "mg",
      Category: "Minerals",
      isAIRequired: false,
      isVisible: false,
    },
    model: {
      DefaultTarget: null,
      DefaultHalfLife_hr: null,
    },
  },

  MIN_CR: {
    element: {
      DisplayName_zh: "鉻",
      DisplayName_en: "Chromium",
      FullName_en: "Chromium",
      Standard_Unit: "mcg",
      Category: "Minerals",
      isAIRequired: true,
      isVisible: true,
    },
    model: {
      DefaultTarget: 35,
      DefaultHalfLife_hr: 24,
    },
  },

  MIN_MO: {
    element: {
      DisplayName_zh: "鉬",
      DisplayName_en: "Molybdenum",
      FullName_en: "Molybdenum",
      Standard_Unit: "mcg",
      Category: "Minerals",
      isAIRequired: true,
      isVisible: true,
    },
    model: {
      DefaultTarget: 45,
      DefaultHalfLife_hr: 24,
    },
  },

  MIN_CO: {
    element: {
      DisplayName_zh: "鈷",
      DisplayName_en: "Cobalt",
      FullName_en: "Cobalt",
      Standard_Unit: "mcg",
      Category: "Minerals",
      isAIRequired: false,
      isVisible: false,
    },
    model: {
      DefaultTarget: null,
      DefaultHalfLife_hr: null,
    },
  },
} as const;
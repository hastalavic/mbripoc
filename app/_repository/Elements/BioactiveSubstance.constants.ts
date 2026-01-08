/**
 * Bioactive Substances Element Bundles
 * ==================================================
 * 對齊 FD1.registry.ts 中的 Bioactives interface
 *
 * 原則：
 * - Key 必須與 FoodNutrientState / Bioactives 完全一致
 * - Category 必須等於 "Bioactives"
 * - element：描述層（給 ElementKnowledgeBase / UI / AI）
 * - model：動態模型參數（給未來 PSP / BDR / DBSG）
 */

export const BIOACTIVE_ELEMENTS = {
  PHY_CUR: {
    element: {
      DisplayName_zh: "薑黃素",
      DisplayName_en: "Curcumin",
      FullName_en: "Curcumin",
      Standard_Unit: "mg",
      Category: "Bioactives",
      isAIRequired: true,
      isVisible: true,
    },
    model: {
      /** 建議每日目標劑量 */
      DefaultTarget: 200,

      /** 半衰期（小時） */
      DefaultHalfLife_hr: 8,
    },
  },

  PHY_TP: {
    element: {
      DisplayName_zh: "茶多酚",
      DisplayName_en: "Tea Polyphenols",
      FullName_en: "Tea Polyphenols",
      Standard_Unit: "mg",
      Category: "Bioactives",
      isAIRequired: true,
      isVisible: true,
    },
    model: {
      DefaultTarget: 300,
      DefaultHalfLife_hr: 6,
    },
  },

  PHY_ANT_TOTAL: {
    element: {
      DisplayName_zh: "總花青素",
      DisplayName_en: "Total Anthocyanins",
      FullName_en: "Anthocyanins",
      Standard_Unit: "mg",
      Category: "Bioactives",
      isAIRequired: true,
      isVisible: true,
    },
    model: {
      DefaultTarget: 150,
      DefaultHalfLife_hr: 6,
    },
  },

  PHY_CYANIDIN: {
    element: {
      DisplayName_zh: "矢車菊素",
      DisplayName_en: "Cyanidin",
      FullName_en: "Cyanidin",
      Standard_Unit: "mg",
      Category: "Bioactives",
      isAIRequired: false,
      isVisible: true,
    },
    model: {
      DefaultTarget: 50,
      DefaultHalfLife_hr: 4,
    },
  },
} as const;
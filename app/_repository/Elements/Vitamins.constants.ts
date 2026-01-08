// app/_repository/data/Vitamins.constants.ts

/**
 * Vitamins Element Bundles
 * ==================================================
 * 每一個維生素以「Element + Model」形式定義
 * - element：靜態、不可爭議的元素描述（給 ElementKnowledgeBase 使用）
 * - model：未來參與各種生理 / 緩解 / 動態模型的參數
 */

export const VIT_ELEMENTS = {
  VIT_A: {
    element: {
      DisplayName_zh: "維生素 A",
      DisplayName_en: "Vitamin A",
      FullName_en: "Retinol / Vitamin A",
      Standard_Unit: "mcg RAE",
      isAIRequired: true,
      isVisible: true,
      Category: "Vitamins",
    },
    model: {
      DefaultTarget: 700,
      DefaultHalfLife_hr: 24,
    },
  },

  VIT_B1: {
    element: {
      DisplayName_zh: "維生素 B1",
      DisplayName_en: "Vitamin B1",
      FullName_en: "Thiamine",
      Standard_Unit: "mg",
      isAIRequired: true,
      isVisible: true,
      Category: "Vitamins",
    },
    model: {
      DefaultTarget: 1.2,
      DefaultHalfLife_hr: 6,
    },
  },

  VIT_B2: {
    element: {
      DisplayName_zh: "維生素 B2",
      DisplayName_en: "Vitamin B2",
      FullName_en: "Riboflavin",
      Standard_Unit: "mg",
      isAIRequired: true,
      isVisible: true,
      Category: "Vitamins",
    },
    model: {
      DefaultTarget: 1.3,
      DefaultHalfLife_hr: 6,
    },
  },

  VIT_B6: {
    element: {
      DisplayName_zh: "維生素 B6",
      DisplayName_en: "Vitamin B6",
      FullName_en: "Pyridoxine",
      Standard_Unit: "mg",
      isAIRequired: true,
      isVisible: true,
      Category: "Vitamins",
    },
    model: {
      DefaultTarget: 1.6,
      DefaultHalfLife_hr: 6,
    },
  },

  VIT_C: {
    element: {
      DisplayName_zh: "維生素 C",
      DisplayName_en: "Vitamin C",
      FullName_en: "Ascorbic Acid",
      Standard_Unit: "mg",
      isAIRequired: true,
      isVisible: true,
      Category: "Vitamins",
    },
    model: {
      DefaultTarget: 100,
      DefaultHalfLife_hr: 4,
    },
  },

  VIT_E: {
    element: {
      DisplayName_zh: "維生素 E",
      DisplayName_en: "Vitamin E",
      FullName_en: "Alpha-Tocopherol",
      Standard_Unit: "mg",
      isAIRequired: true,
      isVisible: true,
      Category: "Vitamins",
    },
    model: {
      DefaultTarget: 15,
      DefaultHalfLife_hr: 24,
    },
  },

  VIT_LK_CHOL: {
    element: {
      DisplayName_zh: "膽鹼",
      DisplayName_en: "Choline",
      FullName_en: "Choline",
      Standard_Unit: "mg",
      isAIRequired: true,
      isVisible: true,
      Category: "Vitamins",
    },
    model: {
      DefaultTarget: 450,
      DefaultHalfLife_hr: 12,
    },
  },
} as const;
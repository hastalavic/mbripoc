// app/_repository/data/Macronutrients.constants.ts

/**
 * Macronutrients Constants Module
 *
 * 純資料定義：
 * - 不 import 任何型別
 * - 不承擔全域一致性責任
 * - 僅描述「巨量營養素是什麼」
 *
 * 命名與 FD1.registry / ElementKnowledgeBase 對齊
 */

export const MACRO_ELEMENTS = {
  NU_KCAL: {
    element: {
      DisplayName_zh: "熱量",
      DisplayName_en: "Calories",
      FullName_en: "Energy",
      Standard_Unit: "kcal",
      Category: "Macronutrients",
      isAIRequired: true,
      isVisible: true,
    },
    model: {
      DefaultTarget: 2000,
      DefaultHalfLife_hr: null,
    },
  },

  NU_CARB: {
    element: {
      DisplayName_zh: "總碳水化合物",
      DisplayName_en: "Carb",
      FullName_en: "Total Carbohydrates",
      Standard_Unit: "g",
      Category: "Macronutrients",
      isAIRequired: true,
      isVisible: true,
    },
    model: {
      DefaultTarget: 250,
      DefaultHalfLife_hr: 2,
    },
  },

  NU_PRO: {
    element: {
      DisplayName_zh: "總蛋白質",
      DisplayName_en: "Protein",
      FullName_en: "Total Protein",
      Standard_Unit: "g",
      Category: "Macronutrients",
      isAIRequired: true,
      isVisible: true,
    },
    model: {
      DefaultTarget: 60,
      DefaultHalfLife_hr: 3,
    },
  },

  NU_FAT: {
    element: {
      DisplayName_zh: "總脂肪",
      DisplayName_en: "Fat",
      FullName_en: "Total Fat",
      Standard_Unit: "g",
      Category: "Macronutrients",
      isAIRequired: true,
      isVisible: true,
    },
    model: {
      DefaultTarget: 65,
      DefaultHalfLife_hr: 6,
    },
  },

  NU_FBR: {
    element: {
      DisplayName_zh: "膳食纖維",
      DisplayName_en: "Fiber",
      FullName_en: "Dietary Fiber",
      Standard_Unit: "g",
      Category: "Macronutrients",
      isAIRequired: true,
      isVisible: true,
    },
    model: {
      DefaultTarget: 25,
      DefaultHalfLife_hr: null,
    },
  },

  NU_WATER: {
    element: {
      DisplayName_zh: "水分",
      DisplayName_en: "Water",
      FullName_en: "Water / Moisture",
      Standard_Unit: "g",
      Category: "Macronutrients",
      isAIRequired: true,
      isVisible: true,
    },
    model: {
      DefaultTarget: 2000,
      DefaultHalfLife_hr: 2,
    },
  },

  NU_SUGAR: {
    element: {
      DisplayName_zh: "總糖分",
      DisplayName_en: "Sugars",
      FullName_en: "Total Sugars",
      Standard_Unit: "g",
      Category: "Macronutrients",
      isAIRequired: true,
      isVisible: true,
    },
    model: {
      DefaultTarget: 25,
      DefaultHalfLife_hr: 1,
    },
  },
} as const;
// app/_repository/data/Macronutrients.constants.ts

/**
 * Macronutrients Constants Module
 *
 * 純資料定義：
 * - 不 import 任何型別
 * - 不承擔全域一致性責任
 * - 僅描述「巨量營養素是什麼」
 */

// app/_repository/data/Macronutrients.constants.ts

/**
 * Macronutrients Element Bundles
 * ==================================================
 * 依照 MBF 標準格式統一：{ element, model }
 */
export const MACRO_ELEMENTS = {
  NU_KCAL: {
    element: {
      DisplayName_zh: "熱量",
      DisplayName_en: "Calories",
      Name_en: "Energy",
      Standard_Unit: "kcal",
      Category: "Macro",
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
      DisplayName_en: "Carbohydrates",
      Name_en: "Total Carbohydrates",
      Standard_Unit: "g",
      Category: "Macro",
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
      Name_en: "Total Protein",
      Standard_Unit: "g",
      Category: "Macro",
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
      Name_en: "Total Fat",
      Standard_Unit: "g",
      Category: "Macro",
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
      Name_en: "Dietary Fiber",
      Standard_Unit: "g",
      Category: "Macro",
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
      Name_en: "Water / Moisture",
      Standard_Unit: "g",
      Category: "Macro",
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
      Name_en: "Total Sugars",
      Standard_Unit: "g",
      Category: "Macro",
      isAIRequired: true,
      isVisible: true,
    },
    model: {
      DefaultTarget: 25,
      DefaultHalfLife_hr: 1,
    },
  },
  // 鈉通常歸類在礦物質，但若你習慣放在這裡，我們對齊 Key 命名法
  NU_NA: {
    element: {
      DisplayName_zh: "鈉含量",
      DisplayName_en: "Sodium",
      Name_en: "Sodium",
      Standard_Unit: "mg",
      Category: "Macro",
      isAIRequired: true,
      isVisible: true,
    },
    model: {
      DefaultTarget: 2300,
      DefaultHalfLife_hr: 8,
    },
  },
} as const;
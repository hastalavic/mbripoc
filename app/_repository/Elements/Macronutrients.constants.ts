// app/_repository/data/Macronutrients.constants.ts

/**
 * Macronutrients Constants Module
 *
 * 純資料定義：
 * - 不 import 任何型別
 * - 不承擔全域一致性責任
 * - 僅描述「巨量營養素是什麼」
 */

export const MACRO_ELEMENTS = {
  NU_KCAL: {
    DisplayName: "熱量",
    Standard_Unit: "kcal",
    isAIRequired: true,
    isVisible: true,
    DefaultTarget: 2000,
    DefaultHalfLife_hr: null,
    Category: "Macro",
  },
  NU_CARB: {
    DisplayName: "總碳水化合物",
    Standard_Unit: "g",
    isAIRequired: true,
    isVisible: true,
    DefaultTarget: 250,
    DefaultHalfLife_hr: 2,
    Category: "Macro",
  },
  NU_PRO: {
    DisplayName: "總蛋白質",
    Standard_Unit: "g",
    isAIRequired: true,
    isVisible: true,
    DefaultTarget: 60,
    DefaultHalfLife_hr: 3,
    Category: "Macro",
  },
  NU_FAT: {
    DisplayName: "總脂肪",
    Standard_Unit: "g",
    isAIRequired: true,
    isVisible: true,
    DefaultTarget: 65,
    DefaultHalfLife_hr: 6,
    Category: "Macro",
  },
  NU_FBR: {
    DisplayName: "膳食纖維",
    Standard_Unit: "g",
    isAIRequired: true,
    isVisible: true,
    DefaultTarget: 25,
    DefaultHalfLife_hr: null,
    Category: "Macro",
  },
  NU_WATER: {
    DisplayName: "水分",
    Standard_Unit: "g",
    isAIRequired: true,
    isVisible: true,
    DefaultTarget: 2000,
    DefaultHalfLife_hr: 2,
    Category: "Macro",
  },
  NU_SUGAR: {
    DisplayName: "糖分",
    Standard_Unit: "g",
    isAIRequired: true,
    isVisible: true,
    DefaultTarget: 25,
    DefaultHalfLife_hr: 1,
    Category: "Macro",
  },
  SODIUM: {
    DisplayName: "鈉含量",
    Standard_Unit: "mg",
    isAIRequired: true,
    isVisible: true,
    DefaultTarget: 2300,
    DefaultHalfLife_hr: 8,
    Category: "Macro",
  },
} as const;
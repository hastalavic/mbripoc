// app/_repository/data/Vitamins.constants.ts

/**
 * Vitamins Element Bundles
 * ==================================================
 * 結構說明：
 * - element: UI 顯示與 AI 分析用
 * - model: 代謝模型參數 (目標量與半衰期參考自一般生理指標)
 */

export const VIT_ELEMENTS = {
  /* --- 維生素 A --- */
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
    model: { DefaultTarget: 700, DefaultHalfLife_hr: 24 * 30 }, // 脂溶性，儲存時間長
  },

  /* --- 維生素 B 群 (Water-Soluble) --- */
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
    model: { DefaultTarget: 1.2, DefaultHalfLife_hr: 6 },
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
    model: { DefaultTarget: 1.3, DefaultHalfLife_hr: 6 },
  },
  VIT_B3: {
    element: {
      DisplayName_zh: "維生素 B3",
      DisplayName_en: "Vitamin B3",
      FullName_en: "Niacin",
      Standard_Unit: "mg",
      isAIRequired: true,
      isVisible: true,
      Category: "Vitamins",
    },
    model: { DefaultTarget: 15, DefaultHalfLife_hr: 4 }, // 過量可能干擾尿酸排泄
  },
  VIT_B5: {
    element: {
      DisplayName_zh: "維生素 B5",
      DisplayName_en: "Vitamin B5",
      FullName_en: "Pantothenic Acid",
      Standard_Unit: "mg",
      isAIRequired: true,
      isVisible: true,
      Category: "Vitamins",
    },
    model: { DefaultTarget: 5, DefaultHalfLife_hr: 12 },
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
    model: { DefaultTarget: 1.6, DefaultHalfLife_hr: 6 },
  },
  VIT_B7: {
    element: {
      DisplayName_zh: "維生素 B7",
      DisplayName_en: "Vitamin B7",
      FullName_en: "Biotin",
      Standard_Unit: "mcg",
      isAIRequired: true,
      isVisible: true,
      Category: "Vitamins",
    },
    model: { DefaultTarget: 30, DefaultHalfLife_hr: 24 },
  },
  VIT_B9: {
    element: {
      DisplayName_zh: "維生素 B9",
      DisplayName_en: "Vitamin B9",
      FullName_en: "Folic Acid",
      Standard_Unit: "mcg",
      isAIRequired: true,
      isVisible: true,
      Category: "Vitamins",
    },
    model: { DefaultTarget: 400, DefaultHalfLife_hr: 12 },
  },
  VIT_B12: {
    element: {
      DisplayName_zh: "維生素 B12",
      DisplayName_en: "Vitamin B12",
      FullName_en: "Cobalamin",
      Standard_Unit: "mcg",
      isAIRequired: true,
      isVisible: true,
      Category: "Vitamins",
    },
    model: { DefaultTarget: 2.4, DefaultHalfLife_hr: 24 * 100 }, // 肝臟可長期儲存
  },

  /* --- 維生素 C --- */
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
    model: { DefaultTarget: 100, DefaultHalfLife_hr: 4 },
  },

  /* --- 維生素 D, E --- */
  VIT_D: {
    element: {
      DisplayName_zh: "維生素 D",
      DisplayName_en: "Vitamin D",
      FullName_en: "Cholecalciferol",
      Standard_Unit: "mcg",
      isAIRequired: true,
      isVisible: true,
      Category: "Vitamins",
    },
    model: { DefaultTarget: 15, DefaultHalfLife_hr: 24 * 15 },
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
    model: { DefaultTarget: 15, DefaultHalfLife_hr: 24 * 2 },
  },

  /* --- 維生素 K 系列 --- */
  VIT_K: {
    element: {
      DisplayName_zh: "維生素 K",
      DisplayName_en: "Vitamin K",
      FullName_en: "Total Vitamin K",
      Standard_Unit: "mcg",
      isAIRequired: true,
      isVisible: true,
      Category: "Vitamins",
    },
    model: { DefaultTarget: 100, DefaultHalfLife_hr: 12 },
  },
  VIT_K1: {
    element: {
      DisplayName_zh: "維生素 K1",
      DisplayName_en: "Vitamin K1",
      FullName_en: "Phylloquinone",
      Standard_Unit: "mcg",
      isAIRequired: true,
      isVisible: true,
      Category: "Vitamins",
    },
    model: { DefaultTarget: 90, DefaultHalfLife_hr: 4 }, // 主要作用於凝血
  },
  VIT_K2: {
    element: {
      DisplayName_zh: "維生素 K2",
      DisplayName_en: "Vitamin K2",
      FullName_en: "Menaquinone",
      Standard_Unit: "mcg",
      isAIRequired: true,
      isVisible: true,
      Category: "Vitamins",
    },
    model: { DefaultTarget: 10, DefaultHalfLife_hr: 24 * 3 }, // 作用於骨骼與血管
  },

  /* --- 膽鹼 --- */
  VIT_LK_CHOL: {
    element: {
      DisplayName_zh: "膽鹼",
      DisplayName_en: "Choline",
      FullName_en: "Choline / Lecithin",
      Standard_Unit: "mg",
      isAIRequired: true,
      isVisible: true,
      Category: "Vitamins",
    },
    model: { DefaultTarget: 450, DefaultHalfLife_hr: 12 },
  },
} as const;
// app/_repository/data/ElementBase.constants.ts

/* BVT 系統中央元素清單 (SSOT) */

export interface ElementDefinition {
  DisplayName: string;
  Standard_Unit: string;
  isAIRequired: boolean;
  isVisible: boolean;
  DefaultTarget: number;
  DefaultHalfLife_hr: number | null;
  Category: string;
}

/* =========================
 * 1. Macronutrients
 * ========================= */
export const MACRO_ELEMENTS = {
  NU_KCAL: {
    DisplayName: "熱量",
    Standard_Unit: "kcal",
    isAIRequired: true,
    isVisible: true,
    DefaultTarget: 2000,
    DefaultHalfLife_hr: null,
    Category: "Macro"
  },
  NU_CARB: {
    DisplayName: "總碳水化合物",
    Standard_Unit: "g",
    isAIRequired: true,
    isVisible: true,
    DefaultTarget: 250,
    DefaultHalfLife_hr: 2,
    Category: "Macro"
  },
  NU_PRO: {
    DisplayName: "總蛋白質",
    Standard_Unit: "g",
    isAIRequired: true,
    isVisible: true,
    DefaultTarget: 60,
    DefaultHalfLife_hr: 3,
    Category: "Macro"
  },
  NU_FAT: {
    DisplayName: "總脂肪",
    Standard_Unit: "g",
    isAIRequired: true,
    isVisible: true,
    DefaultTarget: 65,
    DefaultHalfLife_hr: 6,
    Category: "Macro"
  },
  NU_FBR: {
    DisplayName: "膳食纖維",
    Standard_Unit: "g",
    isAIRequired: true,
    isVisible: true,
    DefaultTarget: 25,
    DefaultHalfLife_hr: null,
    Category: "Macro"
  },
  NU_WATER: {
    DisplayName: "水分",
    Standard_Unit: "g",
    isAIRequired: true,
    isVisible: true,
    DefaultTarget: 2000,
    DefaultHalfLife_hr: 2,
    Category: "Macro"
  },
  NU_sugar: {
    DisplayName: "糖分",
    Standard_Unit: "g",
    isAIRequired: true,
    isVisible: true,
    DefaultTarget: 25,
    DefaultHalfLife_hr: 1,
    Category: "Macro"
  },
  sodium: {
    DisplayName: "鈉含量",
    Standard_Unit: "mg",
    isAIRequired: true,
    isVisible: true,
    DefaultTarget: 2300,
    DefaultHalfLife_hr: 8,
    Category: "Macro"
  }
} satisfies Record<string, ElementDefinition>;

/* =========================
 * 2. Vitamins
 * ========================= */
export const VIT_ELEMENTS = {
  VIT_A:   {
    DisplayName: "維生素 A",
    Standard_Unit: "mcg RAE",
    isAIRequired: true,
    isVisible: true,
    DefaultTarget: 700,
    DefaultHalfLife_hr: 24,
    Category: "Vitamins"
  },
  VIT_B1:  {
    DisplayName: "維生素 B1",
    Standard_Unit: "mg",
    isAIRequired: true,
    isVisible: true,
    DefaultTarget: 1.2,
    DefaultHalfLife_hr: 6,
    Category: "Vitamins"
  },
  VIT_B2:  {
    DisplayName: "維生素 B2",
    Standard_Unit: "mg",
    isAIRequired: true,
    isVisible: true,
    DefaultTarget: 1.3,
    DefaultHalfLife_hr: 6,
    Category: "Vitamins"
  },
  VIT_B6:  {
    DisplayName: "維生素 B6",
    Standard_Unit: "mg",
    isAIRequired: true,
    isVisible: true,
    DefaultTarget: 1.6,
    DefaultHalfLife_hr: 6,
    Category: "Vitamins"
  },
  VIT_C:   {
    DisplayName: "維生素 C",
    Standard_Unit: "mg",
    isAIRequired: true,
    isVisible: true,
    DefaultTarget: 100,
    DefaultHalfLife_hr: 4,
    Category: "Vitamins"
  },
  VIT_E:   {
    DisplayName: "維生素 E",
    Standard_Unit: "mg",
    isAIRequired: true,
    isVisible: true,
    DefaultTarget: 15,
    DefaultHalfLife_hr: 24,
    Category: "Vitamins"
  },
  VIT_LK_CHOL: {
    DisplayName: "膽鹼",
    Standard_Unit: "mg",
    isAIRequired: true,
    isVisible: true,
    DefaultTarget: 450,
    DefaultHalfLife_hr: 12,
    Category: "Vitamins"
  },
} satisfies Record<string, ElementDefinition>;
/* =========================
 * 3. 脂肪酸 (Fatty Acids)
 * ========================= */
export const FA_ELEMENTS = {
  FA_OM3: {
    DisplayName: "Omega-3",
    Standard_Unit: "mg",
    isAIRequired: true,
    isVisible: true,
    DefaultTarget: 1000,
    DefaultHalfLife_hr: 16,
    Category: "FattyAcids"
  },
  FA_OM6: {
    DisplayName: "Omega-6",
    Standard_Unit: "mg",
    isAIRequired: true,
    isVisible: true,
    DefaultTarget: 12000,
    DefaultHalfLife_hr: 20,
    Category: "FattyAcids"
  },
} satisfies Record<string, ElementDefinition>;
/* =========================
 * 4. 礦物質 (Minerals)
 * ========================= */
export const MIN_ELEMENTS = {
  MIN_K:  {
    DisplayName: "鉀",
    Standard_Unit: "mg",
    isAIRequired: true,
    isVisible: true,
    DefaultTarget: 3500,
    DefaultHalfLife_hr: 6,
    Category: "Minerals"
  },
  MIN_SE: {
    DisplayName: "硒",
    Standard_Unit: "mcg",
    isAIRequired: true,
    isVisible: true,
    DefaultTarget: 55,
    DefaultHalfLife_hr: 24,
    Category: "Minerals"
  },
  MIN_MG: {
    DisplayName: "鎂",
    Standard_Unit: "mg",
    isAIRequired: true,
    isVisible: true,
    DefaultTarget: 320,
    DefaultHalfLife_hr: 12,
    Category: "Minerals"
  },
  MIN_ZN: {
    DisplayName: "鋅",
    Standard_Unit: "mg",
    isAIRequired: true,
    isVisible: true,
    DefaultTarget: 10,
    DefaultHalfLife_hr: 12,
    Category: "Minerals"
  },
} satisfies Record<string, ElementDefinition>;
  // === 5. 氨基酸與植化素 (Amino Acids & Phytochemicals) ===
export const AA_ELEMENTS = {  
  AA_GLY:    { 
    DisplayName: "甘胺酸", 
    Standard_Unit: "mg", 
    isAIRequired: true, 
    isVisible: true, 
    DefaultTarget: 3000, 
    DefaultHalfLife_hr: 4, 
    Category: "Bioactives" 
  },
  AA_D_NAC:  { 
    DisplayName: "N-乙醯半胱胺酸", 
    Standard_Unit: "mg", 
    isAIRequired: true, 
    isVisible: true, 
    DefaultTarget: 600, 
    DefaultHalfLife_hr: 6, 
    Category: "Bioactives" 
  },
} satisfies Record<string, ElementDefinition>;
export const PHY_ELEMENTS = {  

  PHY_CUR:   { 
    DisplayName: "薑黃素", 
    Standard_Unit: "mg", 
    isAIRequired: true, 
    isVisible: true, 
    DefaultTarget: 200, 
    DefaultHalfLife_hr: 8, 
    Category: "Bioactives" 
  },
} satisfies Record<string, ElementDefinition>;
  // === 6. 代謝負擔因子 (Metabolic Burden Factors - MBF) ===
export const MBF_ELEMENTS = {    
  MBF_AGEs: { 
    DisplayName: "糖化終產物", 
    Standard_Unit: "kU", 
    isAIRequired: true, 
    isVisible: true, 
    DefaultTarget: 15000, 
    DefaultHalfLife_hr: 24, 
    Category: "Burden" },
  MBF_ACR:  { 
    DisplayName: "丙烯醯胺", 
    Standard_Unit: "mcg", 
    isAIRequired: true, 
    isVisible: true, 
    DefaultTarget: 50, 
    DefaultHalfLife_hr: 12, 
    Category: "Burden" 
  },
  MBF_PAHs: { 
    DisplayName: "多環芳香烴", 
    Standard_Unit: "ng", 
    isAIRequired: true, 
    isVisible: true, 
    DefaultTarget: 100, 
    DefaultHalfLife_hr: 18, 
    Category: "Burden" 
  },
  MBF_FUR:  { 
    DisplayName: "呋喃", 
    Standard_Unit: "mcg", 
    isAIRequired: true, 
    isVisible: true, 
    DefaultTarget: 20, 
    DefaultHalfLife_hr: 6, 
    Category: "Burden" 
  },
  MBF_PUR:  { 
    DisplayName: "普林", 
    Standard_Unit: "mg", 
    isAIRequired: true, 
    isVisible: true, 
    DefaultTarget: 400, 
    DefaultHalfLife_hr: 8, 
    Category: "Burden" 
  }
} satisfies Record<string, ElementDefinition>;
/* =========================
 * Unified SSOT (Single Source of Truth)
 * ========================= */
export const ElementKnowledgeBase = {
  ...MACRO_ELEMENTS,
  ...VIT_ELEMENTS,
  ...FA_ELEMENTS,
  ...MIN_ELEMENTS,
  ...AA_ELEMENTS,
  ...PHY_ELEMENTS,
  ...MBF_ELEMENTS,
} as const;

export type ElementKey = keyof typeof ElementKnowledgeBase;

export default ElementKnowledgeBase;
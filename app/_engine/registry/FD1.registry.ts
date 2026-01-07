// app/_engine/registry/FD1.registry.ts

/* ==================================================
 * FD1 – Metabolic State Definition (Read Model)
 * ================================================== */

export interface MBRIRegistryState {
  /** 個人基本資料 */
  individual?: IndividualState;

  /** 營養與攝取狀態 (已對齊 ElementKey) */
  nutrients?: NutrientState;

  /** 代謝負擔因子 (已對齊 MBFKey) */
  mbf?: MBFState;

  /** 生理 / 系統層狀態 */
  physio?: PhysioState;

  /** 狀態時間戳 */
  timestamp?: number;
}

/* ==================================================
 * Individual State
 * ================================================== */
export interface IndividualState {
  bmi?: number;
  age?: number;
  heightCm?: number;
  bodyWeight?: number;
  bodyFatRatio?: number;
  sex?: string;
  stressLoad?: number;
  activityIndex?: number;
  sleepQualityIndex?: number;
  liverFunctionIndex?: number;
  kidneyFunctionIndex?: number;
}

/* ==================================================
 * Physio State
 * ================================================== */
export interface PhysioState {
  insulinLoad?: number;
  pancreaticStress?: number;
  hepaticStress?: number;
}

/* ==================================================
 * Nutrient State
 * ================================================== */
export interface NutrientState {
  /* === Macronutrients === */
  NU_KCAL?: number;
  NU_CARB?: number;
  NU_FAT?: number;
  NU_PRO?: number;
  NU_FBR?: number;
  NU_WATER?: number;
  NU_SUGAR?: number; 
  NU_NA?: number;    

  /* === Fatty Acids === */
  FA_OM3?: number;
  FA_OM6?: number;

  /* === Vitamins === */
  VIT_A?: number;
  VIT_B1?: number;
  VIT_B2?: number;
  VIT_B6?: number;
  VIT_C?: number;
  VIT_E?: number;
  VIT_LK_CHOL?: number;

  /* === Minerals === */
  MIN_K?: number;
  MIN_MG?: number;
  MIN_ZN?: number;
  MIN_SE?: number;

  /* === Amino Acids / Precursors === */
  AA_GLY?: number;
  AA_D_NAC?: number;
  
  /* === Bioactives === */
  PHY_CUR?: number;  
}

/* ==================================================
 * MBF State
 * ================================================== */
export interface MBFState {
  /** Oxidized Lipids (對齊 MBF_OXL) */
  MBF_OXL?: number;

  /** Advanced Glycation End-products (對齊 MBF_AGEs) */
  MBF_AGEs?: number;

  /** Acrylamide (對齊 MBF_ACR) */
  MBF_ACR?: number;

  /** Polycyclic Aromatic Hydrocarbons (對齊 MBF_PAHs) */
  MBF_PAHs?: number;

  /** Furan (對齊 MBF_FUR) */
  MBF_FUR?: number;

  /** Purines (對齊 MBF_PUR) */
  MBF_PUR?: number;
}

/* ==================================================
 * Empty State
 * ================================================== */
export const EMPTY_MBRI_REGISTRY_STATE: MBRIRegistryState = {};
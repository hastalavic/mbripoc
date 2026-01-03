// app/_engine/registry/FD1registry.state.ts

/* ==================================================
 * FD1 – Metabolic State Definition (Read Model)
 * ==================================================
 *
 * 核心定位：
 * - FD1 是「代謝狀態快照（snapshot / read model）」
 * - 描述：系統此刻「已知、可被調用」的所有代謝相關結果
 *
 * 設計原則：
 * - ❌ 不做任何計算
 * - ❌ 不 import *.compute.ts
 * - ❌ 不轉換、不推導
 * - ✅ 僅作為結果的集中描述與取用入口
 *
 * 說人話版本：
 * 👉「這裡列出：系統現在 *可能* 有哪些值，可以被誰拿去用」
 */

/* ==================================================
 * MBF State
 * --------------------------------------------------
 * 代謝負擔因子（計算結果）
 * ================================================== */
export interface MBFState {
  /** Oxidized Lipids */
  oxl?: number;

  /** Advanced Glycation End-products */
  ages?: number;

  /** Acrylamide */
  acr?: number;

  /** Polycyclic Aromatic Hydrocarbons */
  pahs?: number;

  /** Furan */
  fur?: number;

  /** Purines */
  pur?: number;
}

/* ==================================================
 * Nutrient State
 * --------------------------------------------------
 * 實際攝取後的營養狀態（來自 ActualIntake）
 * ================================================== */
export interface NutrientState {
  // === Macronutrients ===
  kcal?: number;
  carb?: number;
  fat?: number;
  protein?: number;
  fiber?: number;
  water?: number;

  // === Fatty Acids ===
  omega3?: number;
  omega6?: number;

  // === Vitamins ===
  vitA?: number;
  vitB1?: number;
  vitB2?: number;
  vitB6?: number;
  vitC?: number;
  vitE?: number;
  choline?: number;

  // === Minerals ===
  potassium?: number;
  magnesium?: number;
  zinc?: number;
  selenium?: number;

  // === Amino Acids / Precursors ===
  glycine?: number;
  nac?: number;
}

/* ==================================================
 * Physiological / System State
 * --------------------------------------------------
 * 生理與系統層狀態（BDR / BMF 會用）
 * ================================================== */
export interface PhysioState {
  /** 體重（kg） */
  bodyWeight?: number;

  /** 胰島素負荷（預留） */
  insulinLoad?: number;

  /** 胰臟系統壓力指標（預留） */
  pancreaticStress?: number;

  /** 其他器官或系統壓力（預留） */
  hepaticStress?: number;
}

/* ==================================================
 * Metabolic State (FD1)
 * --------------------------------------------------
 * 系統代謝狀態的唯一總表
 * ================================================== */
export interface MetabolicState {
  /** 營養與攝取狀態 */
  nutrients?: NutrientState;

  /** 代謝負擔因子 */
  mbf?: MBFState;

  /** 生理 / 系統層狀態 */
  physio?: PhysioState;

  /** 狀態時間戳（optional） */
  timestamp?: number;
}

/* ==================================================
 * Empty State
 * --------------------------------------------------
 * 初始化或占位用
 * ================================================== */
export const EMPTY_METABOLIC_STATE: MetabolicState = {};
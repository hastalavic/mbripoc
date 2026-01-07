// app/_engine/registry/FD1Schema.ts

import type {
  MBRIRegistryState,
  IndividualState,
  NutrientState,
  MBFState,
  PhysioState,
} from "./FD1.registry";

/* ==================================================
 * FD1 Schema
 * ==================================================
 *
 * 核心定位：
 * - FD1「設計規格（Schema）」
 * - 描述：系統 *設計上* 預期會出現在 FD1 Registry 的欄位
 *
 * 用途：
 * - FD1 Inspector：顯示「已接通 / 尚未接通」
 * - 開發防呆：避免兩週後不知道哪些線該接
 * - 文件即規格（Schema as Code）
 *
 * 原則：
 * - ❌ 不代表 runtime 一定存在
 * - ❌ 不做任何計算
 * - ❌ 不推測資料來源
 * - ✅ 只描述「設計上應該要有」
 */

/* ==================================================
 * Schema 基本型別
 * ================================================== */
export type FD1SchemaShape<T extends object> = readonly (keyof T)[];

/* ==================================================
 * FD1 Schema 定義
 * ================================================== */
export const FD1_SCHEMA = {
  /* -------------------------------------
   * Individual
   * ------------------------------------- */
  individual: [
    "bmi",
    "age",
    "heightCm",
    "bodyWeight",
    "bodyFatRatio",
    "sex",
    "stressLoad",
    "activityIndex",
    "sleepQualityIndex",
    "liverFunctionIndex",
    "kidneyFunctionIndex",
  ] as const satisfies FD1SchemaShape<IndividualState>,

  /* -------------------------------------
   * Nutrients
   * ------------------------------------- */
  nutrients: [
    "kcal",
    "carb",
    "fat",
    "protein",
    "fiber",
    "water",
    "omega3",
    "omega6",
    "vitA",
    "vitB1",
    "vitB2",
    "vitB6",
    "vitC",
    "vitE",
    "choline",
    "potassium",
    "magnesium",
    "zinc",
    "selenium",
    "glycine",
    "nac",
  ] as const satisfies FD1SchemaShape<NutrientState>,

  /* -------------------------------------
   * MBF
   * ------------------------------------- */
  mbf: ["oxl", "ages", "acr", "pahs", "fur", "pur"] as const satisfies FD1SchemaShape<MBFState>,

  /* -------------------------------------
   * Physio
   * ------------------------------------- */
  physio: [
    "insulinLoad",
    "pancreaticStress",
    "hepaticStress",
  ] as const satisfies FD1SchemaShape<PhysioState>,
} satisfies Partial<Record<keyof MBRIRegistryState, readonly string[]>>;

/* ==================================================
 * 型別輔助（給 Inspector / Tooling 用）
 * ================================================== */
export type FD1Schema = typeof FD1_SCHEMA;
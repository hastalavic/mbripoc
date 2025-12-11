/**
 * PSP_types.ts
 * 個體生理狀態參數 (Physiological State Parameters, PSP)
 * 定義：NRR（需求量）、UL（上限）、MBFST（負面因子安全線）、BDRST（風險安全線）
 * 所有計算邏輯會在 PSP_compute.ts 中實作
 */

/* --------------------------
   基礎類型：PSP Unit 結構
--------------------------- */
export interface PSPUnit {
  /** 營養素每日需求量（個體化） */
  NRR: number;

  /** 營養素可承受上限（個體化） */
  UL: number;

  /** MBF 安全閾值（Type I, II, III 溢出判定使用） */
  MBFST: number;

  /** BDR 安全閾值（衍生風險曲線使用） */
  BDRST: number;
}

/* --------------------------
   PSP 主模型：用元素名稱作 Key
   例如 PSP["Vit_C"] 會是一組 NRR / UL / MBFST / BDRST
--------------------------- */
export interface PSPModel {
  [elementKey: string]: PSPUnit;
}

/* --------------------------
   生理輸入參數（由使用者提供）
   PSP_compute.ts 會根據這些參數調整 PSPModel
--------------------------- */
export interface PSPInputProfile {
  age: number;        // 年齡
  sex: "male" | "female"; 
  weightKg: number;   // 體重
  heightCm: number;   // 身高
  activityLevel: "low" | "moderate" | "high";
  stressLevel: "low" | "normal" | "high";
  kidneyFunction: "normal" | "reduced";
  liverFunction: "normal" | "reduced";
}

/* --------------------------
   PSP 計算結果 → 主輸出
--------------------------- */
export interface PSPResult {
  profile: PSPInputProfile;
  parameters: PSPModel;
}

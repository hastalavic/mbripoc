// app/_engine/tasks/BMI.task.ts

/**
 * BMI 計算任務（Task）
 * ==================================================
 * 職責：
 * - 驗證輸入是否足以計算 BMI
 * - 呼叫純計算層 BMI.compute
 * - 回傳「有語意的結果」或「有語意的失敗原因」
 *
 * 原則：
 * - ❌ 不知道 FD1 / Registry
 * - ❌ 不知道誰會用
 * - ✅ 只對「BMI 計算」負責
 */

import { computeBMI } from "@/app/_engine/computes/personalize/BMI.compute";

/* ==================================================
 * Input
 * ================================================== */
export interface ComputeBMITaskInput {
  heightCm?: number;
  weightKg?: number;
}

/* ==================================================
 * Output（語意化 + 可偵錯）
 * ================================================== */
export interface BMITaskResult {
  /** 結果類型識別（給上游路由 / inspector 用） */
  kind: "BMI";

  /** BMI 數值（kg/m²） */
  value: number;
}

export interface BMITaskError {
  /** 失敗類型（仍然是「BMI 任務」的輸出） */
  kind: "BMI_ERROR";

  /** 失敗原因 */
  reason: "MISSING_INPUT" | "CALCULATION_FAILED";

  /** 可選：更細的訊息（方便 debug，不影響功能） */
  message?: string;
}

export type ComputeBMITaskOutput = BMITaskResult | BMITaskError;

/* ==================================================
 * Task Runner
 * ================================================== */
export function runComputeBMITask(
  input: ComputeBMITaskInput
): ComputeBMITaskOutput {
  // --- 缺少輸入：非錯誤，只是「無法計算」的明確原因 ---
  if (typeof input.heightCm !== "number" || typeof input.weightKg !== "number") {
    const missing: string[] = [];
    if (typeof input.heightCm !== "number") missing.push("heightCm");
    if (typeof input.weightKg !== "number") missing.push("weightKg");

    return {
      kind: "BMI_ERROR",
      reason: "MISSING_INPUT",
      message: `Missing or invalid input: ${missing.join(", ")}`,
    };
  }

  // --- 計算 ---
  const bmi = computeBMI(input.heightCm, input.weightKg);

  // --- 計算失敗：公式回傳 null / 非 number ---
  if (typeof bmi !== "number" || !Number.isFinite(bmi)) {
    return {
      kind: "BMI_ERROR",
      reason: "CALCULATION_FAILED",
      message: "BMI.compute returned non-number or non-finite result",
    };
  }

  return {
    kind: "BMI",
    value: bmi,
  };
}
// app/_engine/computes/tasks/ActualIntakeScaler.task.ts

/**
 * Actual Intake Scaling – Task
 * ==================================================
 * 職責：
 * - 執行「實際攝取量換算」這個動作
 * - 遍歷所有元素
 * - 套用已定義好的縮放公式
 *
 * 原則：
 * - ❌ 不定義公式（交給 compute）
 * - ❌ 不知道 FD / registry
 * - ✅ 將 input 轉成「可用結果」
 */

import { ElementKnowledgeBase } from "@/app/_repository/ElementBase.constants";
import { scalePer100ByWeight } from "../computes/ActualIntakeScaler.compute";

/* ==================================================
 * Element Key
 * ================================================== */
type ElementKey = keyof typeof ElementKnowledgeBase;

/* ==================================================
 * Output Vector
 * ================================================== */
export type NutrientVector = {
  [K in ElementKey]?: number;
};

/* ==================================================
 * Input Meta
 * ================================================== */
export interface ActualIntakeMeta {
  /** 實際攝取重量（g / ml） */
  actualWeight: number;
}

/* ==================================================
 * Task Output（語意化）
 * ================================================== */
export interface ActualIntakeTaskResult {
  kind: "ACTUAL_INTAKE";
  payload: NutrientVector;
}

export type ActualIntakeTaskOutput = ActualIntakeTaskResult | undefined;

/* ==================================================
 * Task Runner
 * ================================================== */
export function runActualIntakeScalerTask(
  basePer100: Record<string, unknown>,
  meta: ActualIntakeMeta
): ActualIntakeTaskOutput {
  if (!Number.isFinite(meta.actualWeight) || meta.actualWeight < 0) {
    return undefined;
  }

  const result: NutrientVector = {};

  Object.keys(ElementKnowledgeBase).forEach((key) => {
    const k = key as ElementKey;
    const baseValue = basePer100[k];

    result[k] =
      typeof baseValue === "number"
        ? scalePer100ByWeight(baseValue, meta.actualWeight)
        : 0;
  });

  return {
    kind: "ACTUAL_INTAKE",
    payload: result,
  };
}
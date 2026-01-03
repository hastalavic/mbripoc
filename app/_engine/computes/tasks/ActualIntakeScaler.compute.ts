// app/_engine/computes/tasks/ActualIntakeScaler.compute.ts

/* --------------------------------------------------
* 功能：
* 將「每 100g / 100ml 的元素數值向量」
* 依據實際攝取量（g / ml）轉換為實際攝取後的元素總量

* 類型：
* 純計算（deterministic, stateless）
-------------------------------------------------- */

import { ElementKnowledgeBase } from "@/app/_repository/ElementBase.constants";

// 元素 key 來源定義
type ElementKey = keyof typeof ElementKnowledgeBase;

/**
 * NutrientVector
 * --------------------------------------------------
 * 以元素為 key 的數值向量（單位依 ElementKnowledgeBase 定義）
 */
export type NutrientVector = {
  [K in ElementKey]?: number;
};

/**
 * ActualIntakeMeta
 * --------------------------------------------------
 * 實際攝取資訊（已正規化為 g / ml）
 */
export type ActualIntakeMeta = {
  actualWeight: number;
};

/**
 * scaleActualIntake
 * --------------------------------------------------
 * 將 per-100 單位的元素向量，轉換為實際攝取量對應的元素總量
 */
export function scaleActualIntake(
  basePer100: Record<string, unknown>,
  meta: ActualIntakeMeta
): NutrientVector {
  if (!Number.isFinite(meta.actualWeight) || meta.actualWeight < 0) {
    throw new Error("Invalid actualWeight for intake scaling");
  }

  const factor = meta.actualWeight / 100;
  const result: NutrientVector = {};

  Object.keys(ElementKnowledgeBase).forEach((key) => {
    const k = key as ElementKey;
    const value = basePer100[k];
    result[k] = typeof value === "number" ? value * factor : 0;
  });

  return result;
}
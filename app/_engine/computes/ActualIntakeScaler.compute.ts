// app/_engine/computes/ActualIntakeScaler.compute.ts

/**
 * Actual Intake Scaling – Compute
 * ==================================================
 * 職責：
 * - 定義「per 100 單位 → 實際攝取量」的純數學公式
 *
 * 原則：
 * - ✅ 純計算（deterministic）
 * - ✅ 無狀態、無副作用
 * - ❌ 不知道元素、不知道 task、不知道 FD
 */

/**
 * scalePer100ByWeight
 * --------------------------------------------------
 * @param basePer100  每 100g / 100ml 的基準數值
 * @param weight      實際攝取重量（g / ml）
 */
export function scalePer100ByWeight(
  basePer100: number,
  weight: number
): number {
  if (!Number.isFinite(basePer100) || !Number.isFinite(weight)) {
    return 0;
  }

  return (basePer100 * weight) / 100;
}
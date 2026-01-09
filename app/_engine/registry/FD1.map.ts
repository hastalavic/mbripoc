// app/_engine/registry/FD1.map.ts

import type {
  FoodNutrientState,
  MBFState,
} from "./FD1.registry";

/* ==================================================
 * FD1 Aggregation Contract
 * ==================================================
 *
 * 核心定位：
 * - FD1 registry 與 task / engine 之間的「唯一聯通層」
 * - 定義：哪些結果 shape「有資格」接進 FD1
 *
 * ❌ 不計算
 * ❌ 不組裝
 * ❌ 不保證 runtime state 存在
 *
 * ✅ 只描述「接線可能性」
 */

/* ==================================================
 * Opaque / Placeholder State
 * ==================================================
 *
 * 說明：
 * - FD1 不關心 Individual / Physio 的內部結構
 * - 僅保留「存在可能性」與「資料可被接線」的資格
 * - 真正的型別約束應發生在更高層（PSP / Homeostasis）
 */

export type FD1IndividualLikeState = Record<string, unknown>;
export type FD1PhysioLikeState = Record<string, unknown>;

/* ==================================================
 * Aggregatable Result Shape
 * ================================================== */
export interface FD1Aggregation {
  /** 個體相關結果（不解構、不假設結構） */
  individual?: Partial<FD1IndividualLikeState>;

  /** 食物營養 Read Model */
  nutrients?: Partial<FoodNutrientState>;

  /** 代謝負擔因子 Read Model */
  mbf?: Partial<MBFState>;

  /** 生理系統相關結果（不解構、不假設結構） */
  physio?: Partial<FD1PhysioLikeState>;
}
// app/_engine/registry/FD1.map.ts

import type {
  IndividualState,
  NutrientState,
  MBFState,
  PhysioState,
} from "./FD1.registry";

/* ==================================================
 * FD1 Aggregation Contract
 * ==================================================
 *
 * 核心定位：
 * - FD1 registry 與 task 之間的「唯一聯通層」
 * - 定義：哪些結果 shape「有資格」接進 FD1
 *
 * ❌ 不計算
 * ❌ 不組裝
 * ❌ 不保證一定有值
 *
 * ✅ 只描述「接線可能性」
 */

/* ==================================================
 * Aggregatable Result Shape
 * ================================================== */
export interface FD1Aggregation {
  individual?: Partial<IndividualState>;
  nutrients?: Partial<NutrientState>;
  mbf?: Partial<MBFState>;
  physio?: Partial<PhysioState>;
}


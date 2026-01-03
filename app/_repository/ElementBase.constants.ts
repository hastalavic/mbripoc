// app/_repository/ElementBase.constants.ts

/**
 * Element Registry (SSOT)
 * ==================================================
 * 系統中「所有元素」的唯一出口（含 MBF）
 *
 * 職責：
 * - 定義「有哪些元素存在」
 * - 定義元素的基本、靜態、不可爭議屬性
 *
 * ❌ 不負責：
 * - 生理模型
 * - 計算參數
 * - 半衰期推算
 * - 緩解 / 風險邏輯
 */

import { MACRO_ELEMENTS } from "./Elements/Macronutrients.constants";
import { VIT_ELEMENTS } from "./Elements/Vitamins.constants";
import { FA_ELEMENTS } from "./Elements/FattyAcids.constants";
import { MIN_ELEMENTS } from "./Elements/Minerals.constants";
import { AA_ELEMENTS } from "./Elements/AminoAcids.constants";
import { PHY_ELEMENTS } from "./Elements/BioactiveSubstance.constants";
import { MBF_BASE } from "./Elements/MBFBase.constants";

/**
 * ElementDefinition
 * --------------------------------------------------
 * 元素的「最小不可變描述」
 */
export interface ElementDefinition {
  /** 顯示名稱（UI / Schema 用） */
  DisplayName: string;

  /** 標準單位（Schema / 計算一致性） */
  Standard_Unit: string;

  /** 是否由 LLM 提供 */
  isAIRequired: boolean;

  /** 是否在 UI 顯示 */
  isVisible: boolean;

  /** 分類用途（Macro / Vitamins / Burden / etc.） */
  Category: string;
}

/**
 * extractElementLayer
 * --------------------------------------------------
 * 將不同來源的定義「統一抽取為 ElementDefinition」
 *
 * 規則：
 * - 若本身就是 ElementDefinition → 直接使用
 * - 若為 { element, model } 結構 → 只取 element
 */
function extractElementLayer(
  source: Record<string, any>
): Record<string, ElementDefinition> {
  return Object.fromEntries(
    Object.entries(source).map(([key, value]) => [
      key,
      value.element ?? value,
    ])
  );
}

/**
 * ElementKnowledgeBase
 * --------------------------------------------------
 * 全系統元素清單（Single Source of Truth）
 */
export const ElementKnowledgeBase = {
  ...extractElementLayer(MACRO_ELEMENTS),
  ...extractElementLayer(VIT_ELEMENTS),
  ...extractElementLayer(FA_ELEMENTS),
  ...extractElementLayer(MIN_ELEMENTS),
  ...extractElementLayer(AA_ELEMENTS),
  ...extractElementLayer(PHY_ELEMENTS),
  ...extractElementLayer(MBF_BASE),
} as const satisfies Record<string, ElementDefinition>;

export type ElementKey = keyof typeof ElementKnowledgeBase;
export default ElementKnowledgeBase;
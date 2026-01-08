// app/_repository/ElementBase.constants.ts

/**
 * Element Registry (SSOT)
 * ==================================================
 * 系統中「所有元素」的唯一出口（含 MBF）
 */

import { MACRO_ELEMENTS } from "./Elements/Macronutrients.constants";
import { VIT_ELEMENTS } from "./Elements/Vitamins.constants";
import { FA_ELEMENTS } from "./Elements/FattyAcids.constants";
import { MIN_ELEMENTS } from "./Elements/Minerals.constants";
import { AA_ELEMENTS } from "./Elements/AminoAcids.constants";
import { BIOACTIVE_ELEMENTS } from "./Elements/BioactiveSubstance.constants";
import { MBF_BASE } from "./Elements/MBFBase.constants";

/**
 * ElementDefinition
 * --------------------------------------------------
 * 元素的「最小不可變描述」
 * 完全對齊 MBF_BASE 標準格式
 */
export interface ElementDefinition {
  /** 中文顯示名稱（UI / 中文報告用） */
  DisplayName_zh: string;

  /** 英文顯示名稱（UI 用，可縮寫如 AGEs） */
  DisplayName_en: string;

  /** 英文完整名稱（學術 / 專用） */
  FullName_en: string;

  /** 標準單位（Schema / 計算一致性） */
  Standard_Unit: string;

  /** 分類用途（Macro / Vitamins / MBF / Bioactives 等） */
  Category: string;

  /** 是否由 LLM 提供 */
  isAIRequired: boolean;

  /** 是否在 UI 顯示 */
  isVisible: boolean;
}

/**
 * extractElementLayer
 * --------------------------------------------------
 * 統一抽取邏輯
 * * 由於我們已經統一了底層格式為 { element, model }，
 * 這裡的邏輯變得非常穩定且透明。
 */
function extractElementLayer(
  source: Record<string, { element: any }>
): Record<string, ElementDefinition> {
  return Object.fromEntries(
    Object.entries(source).map(([key, value]) => [
      key,
      value.element, // 直接取 element 即可，結構已統一
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
  ...extractElementLayer(BIOACTIVE_ELEMENTS),
  ...extractElementLayer(MBF_BASE),
} as const satisfies Record<string, ElementDefinition>;

/** 導出 Key 型別，供全系統（如 Adapter, Widget）使用 */
export type ElementKey = keyof typeof ElementKnowledgeBase;

export default ElementKnowledgeBase;
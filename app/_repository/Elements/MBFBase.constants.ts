// app/_repository/Elements/MBFBase.constants.ts

/* =========================================
 * Metabolic Burden Factors (MBF) – SSOT
 * =========================================
 *
 * 核心定位：
 * - MBF 是「代謝負擔物件」
 * - element：用於 ElementRegistry / Schema / UI
 * - model：用於 L1 / L2 / L3 計算
 *
 * ❌ 不包含：
 * - 生成語意因子
 * - 校正選項
 */

/* =========================
 * MBF Key（全系統唯一）
 * ========================= */
export type MBFKey =
  | "MBF_AGEs"
  | "MBF_ACR"
  | "MBF_PAHs"
  | "MBF_FUR"
  | "MBF_PUR"
  | "MBF_OXL";

/* =========================
 * Element Layer
 * ========================= */
export interface MBFElementMeta {
  /** 中文顯示名稱（UI / 中文報告用） */
  DisplayName_zh: string;

  /**
   * 英文顯示名稱（UI 用）
   * ✅ 你可自訂：可縮寫（AGEs / PAHs / OXL），也可寫全名
   */
  DisplayName_en: string;

  /** 英文完整名稱（學術 / 專利用，永遠全名） */
  Name_en: string;

  /** 標準單位 */
  Standard_Unit: string;

  Category: "MBF";
  isAIRequired: boolean;
  isVisible: boolean;
}

/* =========================
 * Model Layer
 * ========================= */
export interface MBFModelParams {
  l1_halfLife_hr: number;
  l2_recovery_hr: number;
  capacity_reference: number;
}

/* =========================
 * MBF Definition（完整）
 * ========================= */
export interface MBFDefinition {
  element: MBFElementMeta;
  model: MBFModelParams;
}

/* =========================
 * MBF Base Table
 * ========================= */
export const MBF_BASE: Record<MBFKey, MBFDefinition> = {
  MBF_AGEs: {
    element: {
      DisplayName_zh: "糖化終產物",
      DisplayName_en: "AGEs",
      Name_en: "Advanced Glycation End-products",
      Standard_Unit: "kU",
      Category: "MBF",
      isAIRequired: true,
      isVisible: true,
    },
    model: {
      l1_halfLife_hr: 24,
      l2_recovery_hr: 24,
      capacity_reference: 15000,
    },
  },

  MBF_ACR: {
    element: {
      DisplayName_zh: "丙烯醯胺",
      DisplayName_en: "Acrylamide",
      Name_en: "Acrylamide",
      Standard_Unit: "mcg",
      Category: "MBF",
      isAIRequired: true,
      isVisible: true,
    },
    model: {
      l1_halfLife_hr: 12,
      l2_recovery_hr: 24,
      capacity_reference: 50,
    },
  },

  MBF_PAHs: {
    element: {
      DisplayName_zh: "多環芳香烴",
      DisplayName_en: "PAHs",
      Name_en: "Polycyclic Aromatic Hydrocarbons",
      Standard_Unit: "ng",
      Category: "MBF",
      isAIRequired: true,
      isVisible: true,
    },
    model: {
      l1_halfLife_hr: 18,
      l2_recovery_hr: 24,
      capacity_reference: 100,
    },
  },

  MBF_FUR: {
    element: {
      DisplayName_zh: "呋喃",
      DisplayName_en: "Furan",
      Name_en: "Furan",
      Standard_Unit: "mcg",
      Category: "MBF",
      isAIRequired: true,
      isVisible: true,
    },
    model: {
      l1_halfLife_hr: 6,
      l2_recovery_hr: 24,
      capacity_reference: 20,
    },
  },

  MBF_PUR: {
    element: {
      DisplayName_zh: "普林",
      DisplayName_en: "Purines",
      Name_en: "Purines",
      Standard_Unit: "mg",
      Category: "MBF",
      isAIRequired: true,
      isVisible: true,
    },
    model: {
      l1_halfLife_hr: 8,
      l2_recovery_hr: 24,
      capacity_reference: 400,
    },
  },

  MBF_OXL: {
    element: {
      DisplayName_zh: "氧化脂質",
      DisplayName_en: "OXL",
      Name_en: "Oxidized Lipids",
      Standard_Unit: "OxL-U",
      Category: "MBF",
      isAIRequired: true,
      isVisible: true,
    },
    model: {
      l1_halfLife_hr: 7,
      l2_recovery_hr: 24,
      capacity_reference: 6900,
    },
  },
} as const;

export default MBF_BASE;
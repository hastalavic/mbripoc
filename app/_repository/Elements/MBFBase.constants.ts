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
  | "MBF_OXL"
  | "MBF_FRU"   // 新增：游離果糖
  | "MBF_TFA";  // 新增：反式脂肪

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
  FullName_en: string;

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
      FullName_en: "Advanced Glycation End-products",
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
      FullName_en: "Acrylamide",
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
      FullName_en: "Polycyclic Aromatic Hydrocarbons",
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
      FullName_en: "Furan",
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
      FullName_en: "Purines",
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
      FullName_en: "Oxidized Lipids",
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

  MBF_FRU: {
    element: {
      DisplayName_zh: "游離果糖",
      DisplayName_en: "Fructose",
      FullName_en: "Free Fructose (Surge)",
      Standard_Unit: "g",
      Category: "MBF",
      isAIRequired: true,
      isVisible: true,
    },
    model: {
      l1_halfLife_hr: 4,      // 肝臟處理速度快，但代謝壓力瞬時爆發
      l2_recovery_hr: 24,     // 代謝後的尿酸與脂肪酸壓力需一天恢復
      capacity_reference: 25, // 每日肝臟緩衝閾值約 25g
    },
  },

  MBF_TFA: {
    element: {
      DisplayName_zh: "反式脂肪",
      DisplayName_en: "Trans Fats",
      FullName_en: "Trans Fatty Acids",
      Standard_Unit: "g",
      Category: "MBF",
      isAIRequired: true,
      isVisible: true,
    },
    model: {
      l1_halfLife_hr: 72,     // 極難代謝，會嵌入細胞膜
      l2_recovery_hr: 168,    // 系統修復期長達一週 (168hr)
      capacity_reference: 2,  // 攝取量應趨近於 0，閾值設極低
    },
  },
  
} as const;

export default MBF_BASE;
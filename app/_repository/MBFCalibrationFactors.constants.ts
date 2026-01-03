// app/_repository/MBFCalibrationFactors.constants.ts

// app/_repository/mbf/MBFCalibrationFactors.ts

/**
 * MBF Calibration Factors (SSOT)
 * ==================================================
 * 用途：
 * - 定義「影響 MBF 生成路徑的語意校正因子」
 * - 不包含任何數值、不涉及任何模型
 * - 可被多個 MBF 共用
 *
 * ⚠️ 注意：
 * - 這不是 Element
 * - 這不是 Model
 * - 這是「生成條件的語意描述」
 */

export const MBF_CALIBRATION_FACTORS = {
  FoodCategory: [
    "anml_L",     // 動物脂肪（高）
    "anml_S",     // 動物脂肪（低）
    "fish",       // 魚類
    "seafood",    // 海鮮
    "proc_NP",    // 非加工植物
    "proc_P",     // 加工植物
    "unknown",    // 未知
  ] as const,

  CookingMethod: [
    "raw",        // 生食
    "steam",      // 蒸
    "stew",       // 燉
    "stir",       // 炒
    "roast",      // 烤
    "fry",        // 炸
    "unknown",    // 未知
  ] as const,
};

export type MBFFoodCategory =
  typeof MBF_CALIBRATION_FACTORS.FoodCategory[number];

export type MBFCookingMethod =
  typeof MBF_CALIBRATION_FACTORS.CookingMethod[number];
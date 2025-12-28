// app/_engine/computes/MBF/results/MBFresults.ts

import type { IntakeAnalysis } from "@/app/_ai/types/IntakeAnalysisSchema.type";
import type { NutrientVector } from "@/app/_engine/computes/tasks/ActualIntakeScaler.compute";
import { computeOXL } from "@/app/_engine/computes/MBF/OXL.compute";

/**
 * MBFResults
 * ==================================================
 * 所有「代謝負擔因子（MBF）」的統一輸出結構
 *
 * ⚠️ 注意：
 * - 目前除了 OXL，其餘仍為 passthrough（來自 actualIntake）
 * - 未來任何 MBF 的模型調整，都只會發生在這一層
 */
export type MBFResults = {
  oxl: number;
  ages: number;
  acr: number;
  pahs: number;
  fur: number;
  pur: number;
};

/**
 * buildMBFResults
 * ==================================================
 * 職責：
 * - 接收「已計算完成的實際攝取量 actualIntake」
 * - 接收「語意分析結果 analysis」
 * - 統一計算 / 組裝所有 MBF 結果
 *
 * 設計原則：
 * - ❌ 不進行營養素縮放（那是 ActualIntakeScaler 的責任）
 * - ❌ 不推導 serving_weight
 * - ❌ 不修改 analysis
 * - ✅ MBF 的唯一出口
 */
export function buildMBFResults(
  analysis: IntakeAnalysis,
  actualIntake: NutrientVector
): MBFResults {
  return {
    // =========================
    // 計算型 MBF
    // =========================
    oxl: computeOXL(
      actualIntake.NU_FAT ?? 0,        // fat mass（已是實際攝取量）
      analysis.fac_mbf_oxl_fc,         // 食物分類因子（語意）
      analysis.fac_mbf_oxl_ts          // 加熱壓力因子（語意）
    ),

    // =========================
    // Passthrough MBF（暫時）
    // ⚠️ 之後若改模型，只改這裡
    // =========================
    ages: actualIntake.MBF_AGEs ?? 0,
    acr:  actualIntake.MBF_ACR  ?? 0,
    pahs: actualIntake.MBF_PAHs ?? 0,
    fur:  actualIntake.MBF_FUR  ?? 0,
    pur:  actualIntake.MBF_PUR  ?? 0,
  };
}
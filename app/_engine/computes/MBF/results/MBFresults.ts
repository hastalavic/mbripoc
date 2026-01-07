// app/_engine/computes/MBF/results/MBFresults.ts

import type { IntakeAnalysis } from "@/app/_ai/types/IntakeAnalysisSchema.type";
import type { NutrientVector } from "@/app/_engine/tasks/ActualIntakeScaler.task";
import { computeOXL } from "@/app/_engine/computes/MBF/OXL.compute";
import type {
  MBFFoodCategory,
  MBFCookingMethod,
} from "@/app/_repository/MBFCalibrationFactors.constants";

/**
 * MBFResults
 * ==================================================
 * 所有「代謝負擔因子（MBF）」的統一輸出結構
 * ✨ 已校正：完全對齊 MBFKey 與 Registry
 */
export type MBFResults = {
  MBF_OXL: number;
  MBF_AGEs: number;
  MBF_ACR: number;
  MBF_PAHs: number;
  MBF_FUR: number;
  MBF_PUR: number;
};

/**
 * buildMBFResults
 * ==================================================
 * MBF 的唯一出口
 */
export function buildMBFResults(
  analysis: IntakeAnalysis,
  actualIntake: NutrientVector
): MBFResults {
  return {
    // ==========================================
    // 計算型 MBF (由實際攝取 + AI 係數算出)
    // ==========================================
    MBF_OXL: computeOXL(
      actualIntake.NU_FAT ?? 0,
      analysis.fac_mbf_oxl_fc as MBFFoodCategory | undefined,
      analysis.fac_mbf_oxl_ts as MBFCookingMethod | undefined
    ),

    // ==========================================
    // Passthrough MBF (由 Task 直接提取，已具備 MBF_ 前綴)
    // ==========================================
    MBF_AGEs: actualIntake.MBF_AGEs ?? 0,
    MBF_ACR: actualIntake.MBF_ACR ?? 0,
    MBF_PAHs: actualIntake.MBF_PAHs ?? 0,
    MBF_FUR: actualIntake.MBF_FUR ?? 0,
    MBF_PUR: actualIntake.MBF_PUR ?? 0,
  };
}
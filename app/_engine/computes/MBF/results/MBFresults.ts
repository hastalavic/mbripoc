// app/_engine/computes/MBF/results/MBFresults.ts

import type { IntakeAnalysis } from "@/app/_ai/types/IntakeAnalysisSchema.type";
import type { NutrientVector } from "@/app/_engine/computes/tasks/ActualIntakeScaler.compute";
import { computeOXL } from "@/app/_engine/computes/MBF/OXL.compute";
import type {
  MBFFoodCategory,
  MBFCookingMethod,
} from "@/app/_repository/MBFCalibrationFactors.constants";

/**
 * MBFResults
 * ==================================================
 * 所有「代謝負擔因子（MBF）」的統一輸出結構
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
 * MBF 的唯一出口
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
      actualIntake.NU_FAT ?? 0,
      analysis.fac_mbf_oxl_fc as MBFFoodCategory | undefined,
      analysis.fac_mbf_oxl_ts as MBFCookingMethod | undefined
    ),

    // =========================
    // Passthrough MBF
    // =========================
    ages: actualIntake.MBF_AGEs ?? 0,
    acr: actualIntake.MBF_ACR ?? 0,
    pahs: actualIntake.MBF_PAHs ?? 0,
    fur: actualIntake.MBF_FUR ?? 0,
    pur: actualIntake.MBF_PUR ?? 0,
  };
}
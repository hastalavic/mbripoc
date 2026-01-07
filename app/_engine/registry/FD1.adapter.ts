// app/_engine/registry/FD1.adapter.ts

/**
 * FD1 Adapter
 * ==================================================
 * 角色定位：
 * - 實際接線工人（唯一會改 FD1 的地方）
 * - 負責：
 *   1. 執行 task
 *   2. 將 task 結果轉成 FD1Aggregation
 *   3. patch 進 FD1.registry
 */

import type { FD1Aggregation } from "./FD1.map";
import type { MBRIRegistryState } from "./FD1.registry";

/* ===============================
 * 引入 BMI task
 * =============================== */
import {
  runComputeBMITask,
  ComputeBMITaskInput,
  ComputeBMITaskOutput,
} from "../tasks/BMI.task";

/* ==================================================
 * Registry Port
 * ================================================== */
export interface FD1RegistryPort {
  get(): MBRIRegistryState;
  patch(patch: FD1Aggregation): void;
}

/* ==================================================
 * BMI → FD1 Adapter
 * ==================================================
 * 職責：
 * - 將 BMI.task 的「成功結果」
 *   接通到 FD1.individual.bmi
 */
export function runBMIToFD1Adapter(
  input: ComputeBMITaskInput,
  registry: FD1RegistryPort
): void {
  // 1️⃣ 執行 BMI task
  const result: ComputeBMITaskOutput = runComputeBMITask(input);

  // 2️⃣ 若 task 無結果或失敗，直接不接線
  if (!result || result.kind !== "BMI") {
    return;
  }

  // 3️⃣ 轉成 FD1Aggregation patch
  const patch: FD1Aggregation = {
    individual: {
      bmi: result.value,
    },
  };

  // 4️⃣ 寫入 FD1 registry
  registry.patch(patch);
}

/* ==================================================
 * Actual Intake → FD1 Adapter
 * ================================================== */
import {
  runActualIntakeScalerTask,
  ActualIntakeMeta,
  ActualIntakeTaskOutput,
} from "../tasks/ActualIntakeScaler.task";

export function runActualIntakeToFD1Adapter(
  basePer100: Record<string, unknown>,
  meta: ActualIntakeMeta,
  registry: FD1RegistryPort
): void {
  const result: ActualIntakeTaskOutput =
    runActualIntakeScalerTask(basePer100, meta);

  if (!result || result.kind !== "ACTUAL_INTAKE") {
    return;
  }

  const patch: FD1Aggregation = {
    nutrients: result.payload,
  };

  registry.patch(patch);
}

/* ===============================
 * 引入 MBF 結果組裝器
 * =============================== */
import { buildMBFResults } from "../computes/MBF/results/MBFresults";
import type { MBFResults } from "../computes/MBF/results/MBFresults";

import type { IntakeAnalysis } from "@/app/_ai/types/IntakeAnalysisSchema.type";
import type { NutrientVector } from "../tasks/ActualIntakeScaler.task";

/* ==================================================
 * MBF → FD1 Adapter
 * ==================================================
 * 角色定位：
 * - FDc（實際接線工人）
 *
 * 職責：
 * 1. 呼叫 MBF 結果組裝器（buildMBFResults）
 * 2. 將結果轉為 FD1Aggregation
 * 3. patch 進 FD1.registry
 *
 * 原則：
 * - ❌ 不計算 MBF 公式
 * - ❌ 不拆解 MBF 結構
 * - ❌ 不判斷業務語意
 * - ✅ 只負責「焊接」
 */
export function runMBFToFD1Adapter(
  analysis: IntakeAnalysis,
  actualIntake: NutrientVector,
  registry: FD1RegistryPort
): void {
  // 1️⃣ 組裝 MBF 結果（FDa → FDb）
  const mbfResults: MBFResults = buildMBFResults(
    analysis,
    actualIntake
  );

  // 2️⃣ 防呆：理論上不會是空，但保護未來改動
  if (!mbfResults || Object.keys(mbfResults).length === 0) {
    return;
  }

  // 3️⃣ 轉成 FD1 可接受的 patch
  const patch: FD1Aggregation = {
    mbf: mbfResults,
  };

  // 4️⃣ 寫入 FD1 Registry（唯一 side-effect）
  registry.patch(patch);
}
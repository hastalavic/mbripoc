// app/_engine/computes/StartPointInternalState.compute.ts

/**
 * 根據 RequirementAggregator.compute 的輸出
 * 以 RI * 0.7 推估「初始體內存量」。
 */

import { ProfileFormState } from "@/app/(Pages)/PSP/utils/PSPForm.types";
import { computeTotalRequirement } from "@/app/_engine/computes/personalize/RequirementAggregator.compute";

export interface ElementInternalState {
  elementId: string;
  unit: string;
  currentAmount: number;
  source: "estimated_from_profile";
}

export type InitialInternalStateMap = Record<string, ElementInternalState>;

export function computeInitialInternalState(
  profile: ProfileFormState
): InitialInternalStateMap {
  const { macros, micros } = computeTotalRequirement (profile);

  const result: InitialInternalStateMap = {};

  // ----------------------------
  // 微量營養素 micros
  // ----------------------------
  Object.entries(micros).forEach(([elementId, info]) => {
    if (info.RI == null || info.RI <= 0) return;

    result[elementId] = {
      elementId,
      unit: info.unit,
      currentAmount: info.RI * 0.7,
      source: "estimated_from_profile",
    };
  });

  // ----------------------------
  // 巨量營養素 macros
  // 你是否希望巨量也建立初始存量？
  // 若需要，我加上：
  // ----------------------------

  result["protein"] = {
    elementId: "protein",
    unit: "g",
    currentAmount: macros.protein * 0.7,
    source: "estimated_from_profile",
  };

  result["fat"] = {
    elementId: "fat",
    unit: "g",
    currentAmount: macros.fat * 0.7,
    source: "estimated_from_profile",
  };

  result["carbs"] = {
    elementId: "carbs",
    unit: "g",
    currentAmount: macros.carbs * 0.7,
    source: "estimated_from_profile",
  };

  result["hydration"] = {
    elementId: "hydration",
    unit: "ml",
    currentAmount: macros.hydration * 0.7,
    source: "estimated_from_profile",
  };

  return result;
}
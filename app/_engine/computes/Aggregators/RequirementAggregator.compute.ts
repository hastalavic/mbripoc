

// TotalRequirementEngine.ts
// ---------------------------------------------------------
// 整合巨量營養素 + 微量營養素（維生素與礦物質）
// 產生「一日完整營養需求矩陣 RI」。
// ---------------------------------------------------------

import { ProfileFormState } from "@/app/(FeaturePages)/PSP/utils/PSPForm.types";
import { computeBaseRequirement } from "../Core/MicroNutriNeedEngine.compute";
import { computeMacronutrientRequirements } from "../Core/MacroNutriNeedEngine.compute";

export interface TotalRequirementOutput {
  macros: {
    protein: number;
    fat: number;
    carbs: number;
    hydration: number;
  };

  micros: Record<
    string,
    {
      RI: number | null;
      UL: number | null;
      unit: string;
      baseRule: string;
      baseValue: number | null;
      sexFactorApplied: number;
      ageFactorApplied: number;
      reproductiveFactorApplied: number;
      weightUsed: number | null;
      leanMassUsed: number | null;
    }
  >;
}

// ---------------------------------------------------------
// 提取 ProfileFormState 中 TDEE、體重等參數
// ---------------------------------------------------------
function deriveMacroInputs(profile: ProfileFormState) {
  const weightKg =
    profile.weightKg === "" ? 60 : Number(profile.weightKg); // 預設 60kg

  const tdee =
    profile.tdee === undefined || profile.tdee === null || profile.tdee === ""
      ? 2000
      : Number(profile.tdee); // 預設 TDEE 2000 kcal/day

  let reproductiveStatus: "none" | "pregnant" | "lactating" = "none";
  if (
    profile.reproductiveStatus === "pregnant_1" ||
    profile.reproductiveStatus === "pregnant_2" ||
    profile.reproductiveStatus === "pregnant_3"
  ) {
    reproductiveStatus = "pregnant";
  } else if (profile.reproductiveStatus === "lactating") {
    reproductiveStatus = "lactating";
  }

  return { weightKg, tdee, reproductiveStatus };
}

// ---------------------------------------------------------
// 主整合引擎
// ---------------------------------------------------------
export function computeTotalRequirement(
  profile: ProfileFormState
): TotalRequirementOutput {
  // ① 微量營養素（維生素 + 礦物質）
  const micros = computeBaseRequirement(profile);

  // ② 巨量營養素（蛋白質 / 脂肪 / 碳水 / 水分）
  const macroInputs = deriveMacroInputs(profile);
  const macros = computeMacronutrientRequirements(macroInputs);

  // 組合輸出
  return {
    macros,
    micros,
  };
}
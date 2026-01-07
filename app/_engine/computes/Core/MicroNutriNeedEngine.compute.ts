// 基本營養需求引擎（Base Requirement Engine）
// 根據 ProfileFormState（生理狀態）產生每種營養素的基礎建議攝取量 RI 與安全上限 UL。
// 計算結果透明化，供 PSP 層與未來 FSDSM 使用。
// 基本營養需求引擎（Base Requirement Engine）
// 根據 ProfileFormState（生理狀態）產生每種「維生素與礦物質」的基礎建議攝取量 RI。
// 本引擎專注於生命週期常數（依年齡 / 性別 / 懷孕 / 哺乳），
// 巨量營養素由 MacronutrientRequirementEngine 負責計算。

import { ProfileFormState } from "@/app/(pages)/PSP/utils/PSPForm.types";
import {
  LifespanMicroNutriNeeds,
  AgeRangeRequirement,
} from "@/app/_engine/data/LifespanMicroNutriNeed.data";

// --- 計算輸出結構 ---
export interface BaseRequirementOutput {
  RI: number | null;
  UL: number | null; // 目前暫無 UL 資料，預設為 null
  unit: string;

  baseRule: "fixed" | "perKg" | "perLeanKg" | "none";
  baseValue: number | null;

  sexFactorApplied: number;
  ageFactorApplied: number;
  reproductiveFactorApplied: number;

  weightUsed: number | null;
  leanMassUsed: number | null;
}

// 目前的營養素 Key 直接來自 LifespanMicroNutriNeeds
export type NutrientKey = keyof typeof LifespanMicroNutriNeeds;

// --- 單位定義（先針對現有維生素與礦物質） ---
const NutrientUnits: Record<NutrientKey, string> = {
  Vit_C: "mg",
  Vit_A: "mcg RAE",
  Vit_B_Group: "mg",
  Vit_D: "IU",
  Vit_E: "mg",
  Vit_K: "mcg",

  Min_Sodium: "mg",
  Min_Potassium: "mg",
  Min_Magnesium: "mg",
  Min_Iron: "mg",
  Min_Zinc: "mg",
  Min_Selenium: "mcg",
};

// --- Helper: 從 Profile 取得可用年齡 ---
function getNumericAge(age: number | ""): number {
  if (age === "" || age <= 0) return 30; // 預設當作成人
  return age;
}

// --- Helper: 懷孕 / 哺乳狀態簡化 ---
type ReproductiveStage = "none" | "pregnant" | "lactating";

function mapReproductiveStage(
  status: ProfileFormState["reproductiveStatus"]
): ReproductiveStage {
  if (
    status === "pregnant_1" ||
    status === "pregnant_2" ||
    status === "pregnant_3"
  ) {
    return "pregnant";
  }
  if (status === "lactating") return "lactating";
  return "none";
}

// --- Helper: 在 AgeRangeRequirement 中找到對應年齡 ---
function findAgeRow(
  rows: AgeRangeRequirement[],
  age: number
): AgeRangeRequirement | null {
  if (!rows || rows.length === 0) return null;

  const matched = rows.find((row) => age >= row.minAge && age <= row.maxAge);
  if (matched) return matched;

  // 若未命中，預設使用最後一筆（通常為成人區間）
  return rows[rows.length - 1] ?? null;
}

// --- Helper: 依性別與生理狀態從 row 中取出 RI 值 ---
function pickRIFromRow(
  row: AgeRangeRequirement,
  sex: "male" | "female",
  stage: ReproductiveStage
): number | null {
  if (sex === "male") {
    return row.male ?? null;
  }

  // female
  if (stage === "lactating" && row.lactating != null) {
    return row.lactating;
  }
  if (stage === "pregnant" && row.pregnant != null) {
    return row.pregnant;
  }
  return row.female ?? null;
}

// --- 主引擎：輸出全部營養素的 RI ---
// 不含巨量營養素；巨量營養素由 MacronutrientRequirementEngine 計算。
export function computeMicroNutriRequirement(
  profile: ProfileFormState
): Record<NutrientKey, BaseRequirementOutput> {
  const age = getNumericAge(profile.age);
  const sex: "male" | "female" = profile.sex === "female" ? "female" : "male";
  const stage = mapReproductiveStage(profile.reproductiveStatus);

  const result = {} as Record<NutrientKey, BaseRequirementOutput>;

  (Object.keys(LifespanMicroNutriNeeds) as NutrientKey[]).forEach(
    (key) => {
      const rows = LifespanMicroNutriNeeds[key];
      const unit = NutrientUnits[key] ?? "";

      const row = findAgeRow(rows, age);
      let ri: number | null = null;

      if (row) {
        ri = pickRIFromRow(row, sex, stage);
      }

      result[key] = {
        RI: ri,
        UL: null, // UL 尚未建立，預留欄位

        unit,

        baseRule: "fixed",
        baseValue: ri,

        sexFactorApplied: 1.0,
        ageFactorApplied: 1.0,
        reproductiveFactorApplied: 1.0,

        weightUsed: null,
        leanMassUsed: null,
      };
    }
  );

  return result;
}

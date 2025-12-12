// FatacidNeedEngine.compute.ts
// ---------------------------------------------------------
// Omega-3 / Omega-6 / Omega-9 三桶制需求量計算引擎（POC版）
// 不拆 ALA / EPA / DHA，只看總桶
// ---------------------------------------------------------

import { ProfileFormState } from "@/app/(FeaturePages)/PSP/utils/PSPForm.types";

export interface OmegaBucket {
  RI: number;          // 建議攝取量 mg/day
  UL: number | null;   // 上限（沒有就 null）
  unit: "mg";
  // 只是方便除錯：佔總脂肪比例（非必須）
  ratioOfTotalFat: number;
}

export interface FatacidRequirement {
  omega3: OmegaBucket;
  omega6: OmegaBucket;
  omega9: OmegaBucket;
}

// -----------------------------
// 如果沒有從 Macro 引擎拿到 fat，就自己估一個
// -----------------------------
const DEFAULT_TDEE = 2000;
const DEFAULT_FAT_ENERGY_RATIO = 0.3; // 30% 熱量來自脂肪

function estimateFatFromProfile(profile: ProfileFormState): number {
  const tdeeRaw = profile.tdee;
  const tdee =
    tdeeRaw === "" || tdeeRaw == null ? DEFAULT_TDEE : Number(tdeeRaw);

  // g/day
  return (tdee * DEFAULT_FAT_ENERGY_RATIO) / 9;
}

/**
 * 計算 Omega-3 / 6 / 9 需求量
 * @param profile 生理狀態（拿 TDEE, 體重用）
 * @param fatTotalG 可選，如果你已經有 MacroNeedEngine 算好的總脂肪(g/day)，可以傳進來覆蓋
 */
export function computeFatacidRequirement(
  profile: ProfileFormState,
  fatTotalGOverride?: number
): FatacidRequirement {
  // 1) 總脂肪 g/day
  const fatTotalG =
    typeof fatTotalGOverride === "number"
      ? fatTotalGOverride
      : estimateFatFromProfile(profile);

  // 2) 假設 70% 是不飽和脂肪，拿來分配 Omega-3/6/9
  const unsatRatio = 0.7;
  const unsatTotalG = fatTotalG * unsatRatio;

  // 3) 在不飽和脂肪中分配三桶
  const omega3Ratio = 0.10; // 10% 給 Omega-3
  const omega6Ratio = 0.40; // 40% 給 Omega-6
  const omega9Ratio = 0.50; // 50% 給 Omega-9

  const omega3_mg = unsatTotalG * omega3Ratio * 1000;
  const omega6_mg = unsatTotalG * omega6Ratio * 1000;
  const omega9_mg = unsatTotalG * omega9Ratio * 1000;

  return {
    omega3: {
      RI: Math.round(omega3_mg),
      UL: 3000, // POC 寬鬆上限
      unit: "mg",
      ratioOfTotalFat: omega3Ratio * unsatRatio,
    },
    omega6: {
      RI: Math.round(omega6_mg),
      UL: 10000,
      unit: "mg",
      ratioOfTotalFat: omega6Ratio * unsatRatio,
    },
    omega9: {
      RI: Math.round(omega9_mg),
      UL: null, // 不設正式上限，只做追蹤
      unit: "mg",
      ratioOfTotalFat: omega9Ratio * unsatRatio,
    },
  };
}
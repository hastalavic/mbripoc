// MacronutrientRequirementEngine.ts
// 此引擎負責依據體重、TDEE、懷孕/哺乳等生理狀態
// 動態推算三大巨量營養素需求量（蛋白質、脂肪、碳水化合物）。
// 本檔案屬於「動態需求層」，不屬於生命週期固定表格。

export interface MacroRequirementInput {
  weightKg: number;
  tdee: number;  // Total Daily Energy Expenditure
  reproductiveStatus: "none" | "pregnant" | "lactating";
}

export interface MacroRequirementOutput {
  protein: number;   // g/day
  fat: number;       // g/day
  carbs: number;     // g/day
  hydration: number;  // ml/day
}

// ============================================================
// 核心運算:
//  Protein = 0.8 × 體重(kg) (+25g 懷孕/哺乳)
//  Fat     = 30% TDEE / 9 kcal
//  Carbs   = age-independent minimum glucose requirement
// ============================================================

export function computeMacronutrientRequirements(
  input: MacroRequirementInput
): MacroRequirementOutput {
  const { weightKg, tdee, reproductiveStatus } = input;

  // ------------------------------
  // 1️⃣ 蛋白質需求
  // ------------------------------
  let protein = 0.8 * weightKg;

  if (reproductiveStatus === "pregnant") {
    protein += 25;
  } else if (reproductiveStatus === "lactating") {
    protein += 25;
  }

  // ------------------------------
  // 2️⃣ 脂肪需求（AMDR：20–35%，採用預設 30%）
  // ------------------------------
  const fat = (tdee * 0.30) / 9; // 1g fat = 9 kcal

  // ------------------------------
  // 3️⃣ 碳水需求（固定最低葡萄糖需求）
  // ------------------------------
  let carbs = 130;

  if (reproductiveStatus === "pregnant") {
    carbs = 175;
  } else if (reproductiveStatus === "lactating") {
    carbs = 210;
  }

  // ------------------------------
  // 4️⃣ 水分需求（Hydration）
  // 基礎：32 ml × kg
  // 懷孕：+300 ml
  // 哺乳：+700 ml
  // ------------------------------
  let hydration = weightKg * 32;

  if (reproductiveStatus === "pregnant") {
    hydration += 300;
  } else if (reproductiveStatus === "lactating") {
    hydration += 700;
  }

  return {
    protein,
    fat,
    carbs,
    hydration,
  };
}
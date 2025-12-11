// 生命週期營養需求表（Lifespan Nutrition Requirements）
// 此檔案專門存放「依年齡、性別、懷孕/哺乳狀態」所決定的每日營養素需求量（RI）。
// 所有內容皆為「科學常數」：不含運算邏輯；運算邏輯應由 BaseRequirementEngine.ts 讀取本表後執行。

export interface AgeRangeRequirement {
  minAge: number;        // 含
  maxAge: number;        // 含
  male: number | null;   // mg / μg / IU —— 依營養素決定
  female: number | null; 
  pregnant?: number | null;
  lactating?: number | null;
}

export interface NutrientRequirementTable {
  [nutrientKey: string]: AgeRangeRequirement[];
}

export const LifespanNutritionRequirements: NutrientRequirementTable = {
  // ============================================================
  // ★ 維生素需求（Vitamins）
  // * 完整生命週期需求表（符合 NIH / IOM RDA）
  // 單位：mg/day
  // ============================================================

  Vit_A: [
      { minAge: 1, maxAge: 3, male: 300, female: 300 },
  { minAge: 4, maxAge: 8, male: 400, female: 400 },
  { minAge: 9, maxAge: 13, male: 600, female: 600 },
  { minAge: 14, maxAge: 18, male: 900, female: 700 },
  { minAge: 19, maxAge: 200, male: 900, female: 700, pregnant: 770, lactating: 1300 },
  ],
  Vit_B_Group: [
     { minAge: 1, maxAge: 3, male: 5, female: 5 },
  { minAge: 4, maxAge: 8, male: 6, female: 6 },
  { minAge: 9, maxAge: 13, male: 9, female: 9 },
  { minAge: 14, maxAge: 18, male: 12, female: 10 },
  { minAge: 19, maxAge: 200, male: 12, female: 10, pregnant: 12, lactating: 12 },
  ],
  Vit_C: [
    { minAge: 1, maxAge: 3, male: 15, female: 15 },     // 幼童
    { minAge: 4, maxAge: 8, male: 25, female: 25 },     // 幼童第二階段
    { minAge: 9, maxAge: 13, male: 45, female: 45 },    // 青少年
    { minAge: 14, maxAge: 18, male: 75, female: 65 },   // 青少年後期
    { minAge: 19, maxAge: 200, male: 90, female: 75, pregnant: 85, lactating: 120 }, // 成人 + 懷孕 + 哺乳
  ],
  Vit_D: [
    {minAge: 1, maxAge: 200, male: 600, female: 600, pregnant: 600, lactating: 600 },
  ],
  Vit_E: [
    { minAge: 1, maxAge: 3, male: 6, female: 6 },
  { minAge: 4, maxAge: 8, male: 7, female: 7 },
  { minAge: 9, maxAge: 13, male: 11, female: 11 },
  { minAge: 14, maxAge: 200, male: 15, female: 15, pregnant: 15, lactating: 19 },
  ],
  Vit_K: [
     { minAge: 1, maxAge: 3, male: 30, female: 30 },
  { minAge: 4, maxAge: 8, male: 55, female: 55 },
  { minAge: 9, maxAge: 13, male: 60, female: 60 },
  { minAge: 14, maxAge: 18, male: 75, female: 75 },
  { minAge: 19, maxAge: 200, male: 120, female: 90, pregnant: 90, lactating: 90 },
  ],

  // ============================================================
  // ★ 礦物質需求（Minerals）
  // ============================================================

  // ------------------------------------------------------------
  // Min_Sodium —— 鈉（mg/day）
  // ------------------------------------------------------------
  Min_Sodium: [
    { minAge: 1, maxAge: 3, male: 1000, female: 1000 },
    { minAge: 4, maxAge: 8, male: 1200, female: 1200 },
    { minAge: 9, maxAge: 13, male: 1500, female: 1500 },
    { minAge: 14, maxAge: 200, male: 1500, female: 1500, pregnant: 1500, lactating: 1500 },
  ],

  // ------------------------------------------------------------
  // Min_Potassium —— 鉀（mg/day）
  // ------------------------------------------------------------
  Min_Potassium: [
    { minAge: 1, maxAge: 3, male: 2000, female: 2000 },
    { minAge: 4, maxAge: 8, male: 2300, female: 2300 },
    { minAge: 9, maxAge: 13, male: 2500, female: 2500 },
    { minAge: 14, maxAge: 18, male: 3000, female: 2300 },
    { minAge: 19, maxAge: 200, male: 3400, female: 2600, pregnant: 2900, lactating: 2800 },
  ],

  // ------------------------------------------------------------
  // Min_Magnesium —— 鎂（mg/day）
  // ------------------------------------------------------------
  Min_Magnesium: [
    { minAge: 1, maxAge: 3, male: 80, female: 80 },
    { minAge: 4, maxAge: 8, male: 130, female: 130 },
    { minAge: 9, maxAge: 13, male: 240, female: 240 },
    { minAge: 14, maxAge: 18, male: 410, female: 360 },
    { minAge: 19, maxAge: 30, male: 400, female: 310, pregnant: 350, lactating: 310 },
    { minAge: 31, maxAge: 200, male: 420, female: 320, pregnant: 360, lactating: 320 },
  ],

  // ------------------------------------------------------------
  // Min_Iron —— 鐵（mg/day）
  // ------------------------------------------------------------
  Min_Iron: [
    { minAge: 1, maxAge: 3, male: 7, female: 7 },
    { minAge: 4, maxAge: 8, male: 10, female: 10 },
    { minAge: 9, maxAge: 13, male: 8, female: 8 },
    { minAge: 14, maxAge: 18, male: 11, female: 15 },
    { minAge: 19, maxAge: 50, male: 8, female: 18, pregnant: 27, lactating: 9 },
    { minAge: 51, maxAge: 200, male: 8, female: 8 },
  ],

  // ------------------------------------------------------------
  // Min_Zinc —— 鋅（mg/day）
  // ------------------------------------------------------------
  Min_Zinc: [
    { minAge: 1, maxAge: 3, male: 3, female: 3 },
    { minAge: 4, maxAge: 8, male: 5, female: 5 },
    { minAge: 9, maxAge: 13, male: 8, female: 8 },
    { minAge: 14, maxAge: 18, male: 11, female: 9 },
    { minAge: 19, maxAge: 200, male: 11, female: 8, pregnant: 11, lactating: 12 },
  ],

  // ------------------------------------------------------------
  // Min_Selenium —— 硒（µg/day）
  // ------------------------------------------------------------
  Min_Selenium: [
    { minAge: 1, maxAge: 3, male: 20, female: 20 },
    { minAge: 4, maxAge: 8, male: 30, female: 30 },
    { minAge: 9, maxAge: 13, male: 40, female: 40 },
    { minAge: 14, maxAge: 200, male: 55, female: 55, pregnant: 60, lactating: 70 },
  ],
};

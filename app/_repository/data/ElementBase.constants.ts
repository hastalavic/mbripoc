// positive  → 正面效益（有需求量與上限；不足或過量都可能影響代謝）

const ElementKnowledgeBase = {
  Serving_Base: {
    DisplayName: "基準份量",
    Standard_Unit: "g",
    HalfLife_hr: null,
    EffectType: "neutral"
  },

  Moisture: {
    DisplayName: "水分",
    Standard_Unit: "%",
    HalfLife_hr: null,
    EffectType: "neutral"
  },

  Calories: {
    DisplayName: "熱量",
    Standard_Unit: "kcal",
    HalfLife_hr: null,
    EffectType: "neutral"
  },

  Carbs_Total: {
    DisplayName: "總碳水化合物",
    Standard_Unit: "g",
    HalfLife_hr: 2,
    EffectType: "positive"
  },

  Protein_Total: {
    DisplayName: "總蛋白質",
    Standard_Unit: "g",
    HalfLife_hr: 3,
    EffectType: "positive"
  },

  Fat_Total: {
    DisplayName: "總脂肪",
    Standard_Unit: "g",
    HalfLife_hr: 6,
    EffectType: "positive"
  },

  Fat_Trans: {
    DisplayName: "反式脂肪",
    Standard_Unit: "g",
    HalfLife_hr: 20,
    EffectType: "negative"
  },

  Fat_Omega3: {
    DisplayName: "Omega3",
    Standard_Unit: "mg",
    HalfLife_hr: 16,
    EffectType: "positive"
  },

  Fat_Omega6: {
    DisplayName: "Omega6",
    Standard_Unit: "mg",
    HalfLife_hr: 20,
    EffectType: "positive"
  },

  Vit_A: {
    DisplayName: "維生素 A",
    Standard_Unit: "mcg RAE",
    HalfLife_hr: 24,
    EffectType: "positive"
  },

  Vit_B_Total: {
    DisplayName: "維生素 B 群",
    Standard_Unit: "mg",
    HalfLife_hr: 6,
    EffectType: "positive"
  },

  Vit_C: {
    DisplayName: "維生素 C",
    Standard_Unit: "mg",
    HalfLife_hr: 4,
    EffectType: "positive"
  },

  Vit_D: {
    DisplayName: "維生素 D",
    Standard_Unit: "IU",
    HalfLife_hr: 48,
    EffectType: "positive"
  },

  Vit_E: {
    DisplayName: "維生素 E",
    Standard_Unit: "mg",
    HalfLife_hr: 24,
    EffectType: "positive"
  },

  Vit_K: {
    DisplayName: "維生素 K",
    Standard_Unit: "mcg",
    HalfLife_hr: 12,
    EffectType: "positive"
  },

  Min_Sodium: {
    DisplayName: "鈉",
    Standard_Unit: "mg",
    HalfLife_hr: 8,
    EffectType: "negative"
  },

  Min_Potassium: {
    DisplayName: "鉀",
    Standard_Unit: "mg",
    HalfLife_hr: 6,
    EffectType: "positive"
  },

  Min_Magnesium: {
    DisplayName: "鎂",
    Standard_Unit: "mg",
    HalfLife_hr: 12,
    EffectType: "positive"
  },

  Min_Selenium: {
    DisplayName: "硒",
    Standard_Unit: "mcg",
    HalfLife_hr: 24,
    EffectType: "positive"
  },

  Min_Iron: {
    DisplayName: "鐵",
    Standard_Unit: "mg",
    HalfLife_hr: 12,
    EffectType: "positive"
  },

  Min_Chromium: {
    DisplayName: "鉻",
    Standard_Unit: "mcg",
    HalfLife_hr: 8,
    EffectType: "positive"
  },

  Neg_ACR: {
    DisplayName: "丙烯醯胺",
    Standard_Unit: "ug",
    HalfLife_hr: 12,
    EffectType: "negative"
  },

  Neg_AGEs: {
    DisplayName: "糖化終產物 (AGEs)",
    Standard_Unit: "AU",
    HalfLife_hr: 24,
    EffectType: "negative"
  },

  Neg_Purines: {
    DisplayName: "普林",
    Standard_Unit: "mg",
    HalfLife_hr: 8,
    EffectType: "negative"
  },

  AA_Leucine: {
    DisplayName: "白胺酸",
    Standard_Unit: "mg",
    HalfLife_hr: 3,
    EffectType: "positive"
  },

  Reg_Caffeine: {
    DisplayName: "咖啡因",
    Standard_Unit: "mg",
    HalfLife_hr: 5,
    EffectType: "regulator"
  }
};

export default ElementKnowledgeBase;
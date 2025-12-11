// app/_repository/data/MBFReliefRecipes.ts

export type ReliefHelper = {
  kind: "nutrient" | "behavior";
  key: string;           // ex: "Vit_C" / "hydration"
  weight: number;        // 0~1
  role: string;          // 描述用
};

export type MBFReliefRecipe = {
  mbfKey: string;        // ex: "Neg_ACR"
  label: string;         
  description: string;   
  maxReduction: number;  // 0~1 理論最大緩解量
  helpers: ReliefHelper[];
};

export const MBFReliefRecipes: MBFReliefRecipe[] = [
  {
    mbfKey: "Neg_ACR",
    label: "丙烯醯胺負擔",
    description: "高溫油炸毒素，主由抗氧化與解毒系統處理。",
    maxReduction: 0.6,
    helpers: [
      { kind: "nutrient", key: "Vit_C", weight: 0.35, role: "抗氧化" },
      { kind: "nutrient", key: "Min_Selenium", weight: 0.25, role: "解毒輔因子" },
      { kind: "nutrient", key: "Vit_E", weight: 0.2, role: "脂溶性抗氧化" },
      { kind: "behavior", key: "sleep_quality", weight: 0.2, role: "肝臟修復期" }
    ]
  },
  {
    mbfKey: "Neg_AGEs",
    label: "糖化終產物（AGEs）",
    description: "慢性炎症與老化來源。",
    maxReduction: 0.5,
    helpers: [
      { kind: "nutrient", key: "Vit_C", weight: 0.2, role: "抑制糖化" },
      { kind: "nutrient", key: "Min_Magnesium", weight: 0.2, role: "代謝酵素" },
      { kind: "behavior", key: "activity_level", weight: 0.2, role: "增加糖利用" },
      { kind: "behavior", key: "cooking_style_shift", weight: 0.15, role: "降低糖化產生" }
    ]
  }
];

export function getReliefRecipe(mbfKey: string) {
  return MBFReliefRecipes.find(r => r.mbfKey === mbfKey);
}
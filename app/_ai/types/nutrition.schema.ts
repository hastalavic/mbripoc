// 營養分析 JSON Schema
export const nutritionAnalysisSchema = {
  type: "object",
  required: ["foodName", "nutrients", "servingSize"],
  properties: {
    foodName: { type: "string" },
    description: { type: "string" },
    servingSize: { type: "string" },
    nutrients: {
      type: "object",
      required: ["calories", "protein", "carbs", "fat"],
      properties: {
        calories: { type: "number" },
        protein: { type: "number" },
        carbs: { type: "number" },
        fat: { type: "number" },
        fiber: { type: "number" },
        sugar: { type: "number" },
        sodium: { type: "number" },
        cholesterol: { type: "number" },
        saturatedFat: { type: "number" },
        transFat: { type: "number" }
      }
    },
    dbsg: {
      type: "object",
      properties: {
        digestibility: { type: "number", minimum: 0, maximum: 100 },
        bioavailability: { type: "number", minimum: 0, maximum: 100 },
        satiety: { type: "number", minimum: 0, maximum: 100 },
        glycemicIndex: { type: "number", minimum: 0, maximum: 100 }
      }
    },
    healthTags: { type: "array", items: { type: "string" } },
    warnings: { type: "array", items: { type: "string" } }
  }
} as const;

export type NutritionAnalysis = {
  foodName: string;
  description: string;
  servingSize: string;
  nutrients: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    fiber?: number;
    sugar?: number;
    sodium?: number;
    cholesterol?: number;
    saturatedFat?: number;
    transFat?: number;
  };
  dbsg?: {
    digestibility: number;
    bioavailability: number;
    satiety: number;
    glycemicIndex: number;
  };
  healthTags?: string[];
  warnings?: string[];
};
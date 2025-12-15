import { z } from 'zod';

// 1. 定義 Nutrients Schema
const NutrientsSchema = z.object({
  calories: z.number().describe("總熱量（大卡）").default(0),
  protein: z.number().describe("蛋白質（克）").default(0),
  carbs: z.number().describe("碳水化合物（克）").default(0),
  fat: z.number().describe("脂肪（克）").default(0),
  // 將所有額外的欄位明確設為可選 (optional)
  fiber: z.number().optional().describe("膳食纖維（克）"),
  sugar: z.number().optional().describe("糖分（克）"),
  sodium: z.number().optional().describe("鈉含量（毫克）"),
  // ... 其他可選欄位
});

// 2. 定義 DBSG Schema
const DBSGSchema = z.object({
  digestibility: z.number().min(0).max(100).describe("消化率 (%)"),
  bioavailability: z.number().min(0).max(100).describe("生物利用率 (%)"),
  satiety: z.number().min(0).max(100).describe("飽足感 (%)"),
  glycemicIndex: z.number().min(0).max(100).describe("升糖指數 (GI)")
}).optional(); // 整個 DBSG 物件是可選的

// 3. 定義頂層 Nutrition Analysis Schema
export const NutritionAnalysisSchema = z.object({
  foodName: z.string().describe("食物的標準名稱"),
  // 保持描述為可選
  description: z.string().optional().describe("對食物或分析的簡短描述"), 
  servingSize: z.string().describe("食物的份量描述 (e.g., 100g, 1碗)"),
  // Nutrients 是必填欄位 (因為它沒有 .optional())
  nutrients: NutrientsSchema, 
  dbsg: DBSGSchema, // 整個 DBSG 物件是可選的
  healthTags: z.array(z.string()).optional(),
  warnings: z.array(z.string()).optional(),
}).describe("食物的完整營養分析結構");

// 4. 自動推導 TypeScript 型別
export type NutritionAnalysis = z.infer<typeof NutritionAnalysisSchema>;

// 5. 導出 JSON Schema 供 LLM API 使用 (如果需要)
// import { zodToJsonSchema } from 'zod-to-json-schema';
// export const NutritionAnalysisJsonSchema = zodToJsonSchema(NutritionAnalysisSchema, "NutritionAnalysisSchema");
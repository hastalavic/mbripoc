// app/_ai/types/IntakeAnalysisSchema.type.ts

import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";
import { ElementKnowledgeBase } from "@/app/_repository/ElementBase.module_registry";

/**
 * IntakeAnalysisSchema
 * ==================================================
 * 職責：
 * - 定義「LLM 分析後」的完整輸出結構
 * - 所有元素（含 MBF）一律來自 ElementKnowledgeBase
 *
 * 核心原則：
 * 1) 單層 JSON（flat）
 * 2) 僅信任 ElementKnowledgeBase（唯一出口）
 * 3) isAIRequired === true → 必須出現在 schema
 */

// --------------------------------------------------
// 1) Enums
// --------------------------------------------------
export const IntakeTypeEnum = z.enum([
  "food",
  "beverage",
  "supplement",
  "ingredient",
  "composite",
]);

export const IntakeStateEnum = z.enum([
  "normal",
  "undercooked",
  "overcooked",
  "charred",
]);

export const FAC_OXL_FoodCategoryEnum = z.enum([
  "anml_L",
  "anml_S",
  "fish",
  "seafood",
  "proc_NP",
  "proc_P",
  "fruit_veg",
  "unknown",
]);

export const FAC_OXL_TemperatureStressEnum = z.enum([
  "raw",
  "steam",
  "stew",
  "stir",
  "roast",
  "fry",
  "unknown",
]);

// --------------------------------------------------
// 2) Element Fields（唯一來源：ElementKnowledgeBase）
// --------------------------------------------------
const elementFields: Record<string, z.ZodTypeAny> = {};

Object.entries(ElementKnowledgeBase).forEach(([key, cfg]) => {
  if (!cfg.isAIRequired) return;

  elementFields[key] = z
    .number()
    .default(0)
    .describe(`${cfg.DisplayName_zh} (${cfg.Standard_Unit})`);
});

// --------------------------------------------------
// 3) Basic Information（語意擷取）
// --------------------------------------------------
const basicFields = {
  intake_name: z.string().describe("food name"),
  intake_brand: z
    .string()
    .default("")
    .describe("brand or vendor, empty if unknown"),

  intake_components: z
    .array(z.string())
    .max(10)
    .default([])
    .describe("structural and ingredient components (e.g., meat, batter, sauce)"),

  intake_count: z
    .number()
    .default(1)
    .describe("numeric quantity (e.g., if '2 servings', count = 2)"),

  original_unit: z
    .string()
    .default("份")
    .describe('extracted unit label (e.g., "份", "個", "碗")'),

  weight_per_unit: z
    .number()
    .default(100)
    .describe(
      "The weight/volume of a SINGLE unit (g or ml). If user says '100g 2份', this is 100."
    ),

  serving_weight: z
    .number()
    .default(100)
    .describe(
      "The TOTAL weight/volume consumed (weight_per_unit * intake_count). If user says '100g 2份', this MUST be 200."
    ),

  intake_type: IntakeTypeEnum.default("food"),
  intake_state: IntakeStateEnum.default("normal"),
} as const;

// --------------------------------------------------
// 4) OXL 語意因子（語意輸入，不是規則來源）
// --------------------------------------------------
const oxlFactorFields = {
  fac_mbf_oxl_fc: z
    .string()
    .default("unknown")
    .describe("OXL food category (semantic factor)"),

  fac_mbf_oxl_ts: z
    .string()
    .default("unknown")
    .describe("OXL temperature stress (semantic factor)"),
} as const;

// --------------------------------------------------
// 5) Unknown 欄位
// --------------------------------------------------
const unknownFields = {
  _unknown: z
    .array(z.string())
    .optional()
    .describe("fields that cannot be reasonably estimated"),
} as const;

// --------------------------------------------------
// 6) Final Schema（flat, strict）
// --------------------------------------------------
export const IntakeAnalysisSchema = z
  .object({
    ...basicFields,
    ...elementFields,
    ...oxlFactorFields,
    ...unknownFields,
  })
  .strict()
  .describe("Flat intake analysis output schema (BVT)");

// --------------------------------------------------
// Types & JSON Schema
// --------------------------------------------------
export type IntakeAnalysis = z.infer<typeof IntakeAnalysisSchema>;

const RawSchema = zodToJsonSchema(
  IntakeAnalysisSchema,
  "IntakeAnalysisSchema"
);

const { $schema, $ref, definitions, ...CleanedSchema } = RawSchema as any;
export const IntakeAnalysisJsonSchema = CleanedSchema;
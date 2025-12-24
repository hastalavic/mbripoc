// app/_ai/types/IntakeAnalysisSchema.type.ts

import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";
import { ElementKnowledgeBase } from "@/app/_repository/data/ElementBase.constants";

/**
 * IntakeAnalysisSchema
 * 職責：定義「LLM分析後」的完整輸出結構（BASIC + 元素數值 + OXL因子 + _unknown）
 * 設計原則：
 * 1) 單層 JSON（flat）— 不做 nutrients: {} / detailedMetrics: {} 這種嵌套
 * 2) 所有 ElementKnowledgeBase.isAIRequired=true 的 key 都會自動生成 zod 欄位（number, default 0）
 * 3) enum 欄位嚴格限制值域（避免亂填造成後端爆炸）
 */

// ---- 1) Enums ----
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

// ---- 2) 動態萃取元素欄位（全部扁平展開）----
const elementFields: Record<string, z.ZodTypeAny> = {};

Object.entries(ElementKnowledgeBase).forEach(([key, cfg]) => {
  if (!cfg.isAIRequired) return;

  // 所有元素欄位統一 number，default 0（unknown 或不存在都用 0，unknown 名單另列）
  elementFields[key] = z
    .number()
    .default(0)
    .describe(`${cfg.DisplayName} (${cfg.Standard_Unit})`);
});

// ---- 3) Basic Information（語意擷取 + serving_weight 規則）----
const basicFields = {
  intake_name: z.string().describe("food name"),
  intake_brand: z.string().default("").describe("brand or vendor, empty if unknown"),

  // semantic only
  intake_components: z
    .array(z.string())
    .max(5)
    .default([])
    .describe("semantic components only, max length = 5"),

  // semantic capture only (NOT used to infer serving_weight)
  intake_count: z.number().default(1).describe("numeric quantity, default = 1"),
  original_unit: z.string().default("份").describe('extracted unit label, default = "份"'),

  // user-described only; not inferred from count/components
  serving_weight: z
    .number()
    .default(100)
    .describe("user-described serving weight for ONE meal; g for non-beverage, ml for beverage; default=100"),

  intake_type: IntakeTypeEnum.default("food").describe("intake type enum"),
  intake_state: IntakeStateEnum.default("normal").describe("intake state enum"),
} as const;

// ---- 4) OXL 因子（供後端計算 oxl 量用）----
const oxlFactorFields = {
  fac_mbf_oxl_fc: FAC_OXL_FoodCategoryEnum.default("unknown").describe("OXL food category factor"),
  fac_mbf_oxl_ts: FAC_OXL_TemperatureStressEnum.default("unknown").describe("OXL temperature stress factor"),
} as const;

// ---- 5) Unknown 欄位清單（唯一允許 array）----
const unknownFields = {
  _unknown: z.array(z.string()).optional().describe("list of fields that cannot be reasonably estimated"),
} as const;

// ---- 6) 組合成最終 Schema（flat）----
export const IntakeAnalysisSchema = z
  .object({
    ...basicFields,
    ...elementFields,
    ...oxlFactorFields,
    ...unknownFields,
  })
  .strict()
  .describe("Flat intake analysis output schema (BVT)");

// TS type
export type IntakeAnalysis = z.infer<typeof IntakeAnalysisSchema>;

// JSON Schema 給 Provider 用
const RawSchema = zodToJsonSchema(IntakeAnalysisSchema, "IntakeAnalysisSchema");
const { $schema, $ref, definitions, ...CleanedSchema } = RawSchema as any;
export const IntakeAnalysisJsonSchema = CleanedSchema;
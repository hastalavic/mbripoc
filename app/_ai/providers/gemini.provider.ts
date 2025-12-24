// app/_ai/providers/gemini.provider.ts

import {
  LLMProvider,
  LLMRequest,
  LLMResponse,
  LLMProviderConfig,
} from '../types/llm.types';

import {
  IntakeAnalysisSchema,
  type IntakeAnalysis,
} from '../types/IntakeAnalysisSchema.type';

import { z } from 'zod';

export class GeminiProvider implements LLMProvider {
  name = 'gemini';
  private config: LLMProviderConfig;

  constructor(config: LLMProviderConfig) {
    this.config = config;
    if (!this.validateConfig(config)) {
      throw new Error('GeminiProvider configuration is incomplete.');
    }
  }

  validateConfig(config: LLMProviderConfig): boolean {
    if (!config.model) {
      config.model = 'gemini-2.5-flash';
    }
    return Boolean(config.apiKey && config.model);
  }

  // --------------------------------------------------
  // Low-level Gemini call
  // --------------------------------------------------
  async call(request: LLMRequest): Promise<LLMResponse> {
    const startTime = Date.now();

    const baseURL =
      this.config.baseURL ??
      'https://generativelanguage.googleapis.com/v1';
    const model = this.config.model;

    const body = {
      contents: [
        {
          role: 'user',
          parts: [{ text: request.prompt }],
        },
      ],
      generationConfig: {
        temperature:
          request.temperature ?? this.config.temperature ?? 0.1,
        maxOutputTokens:
          request.maxTokens ?? this.config.maxTokens ?? 4096,
      },
    };

    const response = await fetch(
      `${baseURL}/models/${model}:generateContent?key=${this.config.apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      }
    );

    const data = await response.json();
    const latency = Date.now() - startTime;

    if (!response.ok) {
      throw new Error(
        `Gemini API error ${response.status}: ${
          data?.error?.message ?? response.statusText
        }`
      );
    }

    let content = '';
    if (data?.candidates?.[0]?.content?.parts?.[0]?.text) {
      content = data.candidates[0].content.parts[0].text;
    }

    return {
      content,
      model,
      latency,
      provider: this.name,
    };
  }

  // --------------------------------------------------
  // Intake Analysis (BVT / flat schema)
  // --------------------------------------------------
async analyzeFood(inputText: string): Promise<IntakeAnalysis> {    /**
     * ⚠️ BVT 核心約束
     * - flat JSON ONLY
     * - 僅允許 schema 定義的 keys
     * - 不確定數值 → 0
     * - 被歸零者 → 列入 _unknown
     */
    const prompt = `
YOUR ROLE
	You are a professional nutrition and dietary exposure analysis engine.
	
TASK
	Analyze the designated intake and output nutritional composition and dietary exposure
	based on food science databases, peer-reviewed food chemistry literature, and logical estimation.

GLOBAL RULES
	Output JSON ONLY. Must start with { and end with }.
	No markdown, no comments, no explanations, no extra text.
	If any required field is missing, the output is invalid.
	Values in // are unit references only. DO NOT include these characters or unit strings in the output keys or values.

BASIC INFORMATION
Rules
	serving_weight: estimate user-described amount only.
		MUST NOT scale any other values.
		MUST NOT affect any per-100g / per-100ml values.
		MUST NOT be inferred from intake_components or intake_count.  
		If weight cannot be estimated, set serving_weight = 100.
	intake_type: If = "beverage", serving_weight unit = ml, otherwise g.
		multiple components (bento, ramen set, combo) → "composite"
		otherwise → "food"
	intake_state: default = "normal"
	intake_components:
    extracted semantic components only.
    NOT used for nutrient or MBF calculation.
    Max length = 5. Order does not imply proportion.
	intake_count and original_unit are for semantic capture only.
		They MUST NOT be used to infer or adjust serving_weight or nutrients.
	original_unit:
    Output ONLY if explicitly stated by user. Otherwise output empty string "".
    	
Keys
	intake_name : string // food name
	intake_brand : string // brand or vendor, empty if unknown
	intake_components: array<string> // semantic components only, max length = 5.
	intake_count : number // numeric quantity
	original_unit : string // extracted unit label
	serving_weight : number // Sum of all items' weights for ONE meal(g).
	intake_type : enum // ["food","beverage","supplement","ingredient","composite"]
	intake_state : enum // ["normal","undercooked","overcooked","charred"]
	
ELEMENTS
Rules
	Output must be a single-level JSON object. No nesting. No arrays except _unknown.
	All numeric values represent exposure per 100g (solid) or 100ml (liquid).
	All fields defined below MUST be output, except _unknown (omit if empty).
	All nutrient and MBF fields MUST be numbers. Use 0 if unknown.
	Inherent absence → output 0, do NOT add to _unknown
	Cannot reasonably estimate → output 0 AND add field name to _unknown
	If no unknown fields exist, omit _unknown entirely
	
Keys
MACRONUTRIENTS (per 100g / 100ml)
	NU_CARB : // Carbohydrates (g)
	NU_FBR : // Dietary Fiber (g)
	NU_FAT : // Total Fat (g)
	NU_PRO : // Protein (g)
	NU_WATER : // Water Content (g)
	
VITAMINS (per 100g / 100ml)
	VIT_A : // Vitamin A, (mcg) RAE
	VIT_B1 : // Vitamin B1 (Thiamine) (mg)
	VIT_B2 : // Vitamin B2 (Riboflavin) (mg)
	VIT_B6 : // Vitamin B6 (Pyridoxine) (mg)
	VIT_C : // Vitamin C (Ascorbic Acid) (mg)
	VIT_E : // Vitamin E  (mg)α-TE
	VIT_LK_CHOL : // Choline (mg)

FATTY ACIDS (per 100g / 100ml)
FA_OM3 : // Total Omega-3 Fatty Acids (mg)
FA_OM6 : // Total Omega-6 Fatty Acids (mg)

MINERALS (per 100g / 100ml)
MIN_K : // Potassium (mg)
MIN_SE : // Selenium (mcg)
MIN_MG : // Magnesium (mg)
MIN_ZN : // Zinc (mg)

AMINO ACIDS & PRECURSORS (per 100g / 100ml)
AA_GLY : // Glycine (mg)
AA_D_NAC : // N-Acetyl-Cysteine (NAC) (mg)

PHYTOCHEMICALS (per 100g / 100ml)
PHY_CUR : // Curcumin (mg)

METABOLIC BURDEN FACTORS (per 100g / 100ml)
MBF_AGEs : // Advanced Glycation End-products (kU)
MBF_ACR  : // Acrylamide (mcg)
MBF_PAHs : // Polycyclic Aromatic Hydrocarbons (ng)
MBF_FUR  : // Furan (mcg)
MBF_PUR  : // Purines (mg)

OXIDATION FACTORS (per 100g / 100ml)
Rules
Enum fields MUST use one of the listed values only. No new values allowed.

fac_mbf_oxl_fc : enum
["anml_L","anml_S","fish","seafood","proc_NP","proc_P","unknown"]
// anml_L  = pork, beef, lamb
// anml_S  = poultry, small animals
// proc_NP = non-pre-fried processed foods
// proc_P  = pre-fried processed foods
fac_mbf_oxl_ts : enum
["raw","steam","stew","stir","roast","fry","unknown"]

UNKNOWN FIELD LIST
_unknown : array<string>

USER INPUT
{{INPUT_TEXT}}

Return JSON now.
`

  .replace('{{INPUT_TEXT}}', inputText)
  .trim();

    const request: LLMRequest = {
      prompt,
      temperature: 0.1,
      maxTokens: 4096,
    };

    const response = await this.call(request);

    try {
      let jsonText = response.content.trim();

      // 清理 Gemini 常見 markdown 包裹
      jsonText = jsonText
        .replace(/^```json/i, '')
        .replace(/^```/i, '')
        .replace(/```$/i, '')
        .trim();

      const raw = JSON.parse(jsonText);

      // 🔒 唯一真理：Schema 驗證
      const validated = IntakeAnalysisSchema.parse(raw);

      console.log('✅ IntakeAnalysis OK:', validated.intake_name);

      return validated;
    } catch (err) {
      console.error('❌ Gemini analyzeFood failed');
      console.error('RAW RESPONSE:', response.content);

      if (err instanceof z.ZodError) {
        throw new Error(
          `Schema validation failed: ${err.issues
            .map((i) => i.path.join('.'))
            .join(', ')}`
        );
      }

      if (err instanceof SyntaxError) {
        throw new Error('Gemini returned invalid JSON');
      }

      throw err;
    }
  }
}
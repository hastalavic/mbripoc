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

    // 1. 改成 v1beta
    const baseURL =
      this.config.baseURL ??
      'https://generativelanguage.googleapis.com/v1beta'; 

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
        // 2. 確定使用小駝峰 responseMimeType
        ...({ responseMimeType: "application/json" } as any),
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
    weight_per_unit:
      - The weight or volume of a SINGLE unit or portion (g/ml).
      - If user says "100g 2份", weight_per_unit = 100.
      - If user says "500ml milk", weight_per_unit = 500.
      - If weight is not explicitly stated, estimate based on food type (e.g., 1 apple ≈ 150).

    serving_weight: 
      - The TOTAL weight/volume of the entire intake.
      - MUST be calculated as: (weight_per_unit * intake_count).
      - If user input is "100g 2份", serving_weight MUST be 200.
      - MUST NOT scale any other per-100g / per-100ml nutrient values.
      - If weight cannot be estimated at all, default serving_weight to 100.

    intake_type:
      - If = "beverage", units = ml, otherwise g.
      - multiple components (bento, ramen set, combo) → "composite"
      - otherwise → "food"

    intake_state:
      - default = "normal"
    
    intake_components:
      - Extracted structural and ingredient components ONLY (e.g., meat, skin, batter, sauce, vegetable, bone-in).
      - MUST NOT include "cooking methods" (e.g., use "chicken", NOT "fried chicken").
      - SHOULD include structural elements affecting nutrition (e.g., ["chicken", "batter", "skin"]).
      - Max length = 30. Order does not imply proportion.

    original_unit:
      - If a discrete count unit (個, 份, 塊, 隻, 片, 條) is stated, use it.
      - Weight units (g, ml) MUST NOT be used as original_unit.
      - If no discrete unit is stated but weight is given, use "份".

INFORMATION
  Keys
    intake_name : string // food name
    intake_brand : string // brand or vendor, empty if unknown
    intake_components : array<string> // structural components only, max length 30.
    intake_count : number // numeric quantity
    original_unit : string // extracted unit label (e.g., "份", "個")
    weight_per_unit : number // weight of a single unit (g or ml)
    serving_weight : number // TOTAL weight (weight_per_unit * intake_count)
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
	
MACRONUTRIENTS (per 100g / 100ml)
  Keys
    NU_KCAL : // Energy (kcal)
    NU_CARB : // Carbohydrates (g)
    NU_FBR : // Dietary Fiber (g)
    NU_FAT : // Total Fat (g)
    NU_PRO : // Protein (g)
    NU_WATER : // Water Content (g)
    NU_SUGAR : // Total Sugars (g)

FATTY ACIDS (per 100g / 100ml)
  Keys
    // --- Basic & Structure (g) ---
    FA_SAT   : // Saturated Fatty Acids (g)
    FA_MUFA  : // Monounsaturated Fatty Acids (g)
    FA_PUFA  : // Polyunsaturated Fatty Acids (g)
    FA_TFA   : // Trans Fatty Acids (g)
    FA_CHO   : // Cholesterol (mg)
    FA_MCT   : // Medium-Chain Triglycerides (g)

    // --- Omega-3 (Anti-inflammatory) (mg) ---
    FA_OM3   : // Total Omega-3 Fatty Acids (mg)
    FA_ALA   : // Alpha-Linolenic Acid (mg)
    FA_EPA   : // Eicosapentaenoic Acid (mg)
    FA_DHA   : // Docosahexaenoic Acid (mg)

    // --- Omega-6 (Pro-inflammatory/Balance) (mg) ---
    FA_OM6   : // Total Omega-6 Fatty Acids (mg)
    FA_LA    : // Linoleic Acid (mg)
    FA_GLA   : // Gamma-Linolenic Acid (mg)
    FA_DGLA  : // Dihomo-Gamma-Linolenic Acid (mg)
    FA_AA    : // Arachidonic Acid (mg)

    // --- Omega-9 (mg) ---
    FA_OM9   : // Omega-9 Fatty Acids (mg)

VITAMINS (per 100g / 100ml)
  Keys
    VIT_A : // Vitamin A (mcg RAE)
    VIT_B1 : // Vitamin B1 (Thiamine) (mg)
    VIT_B2 : // Vitamin B2 (Riboflavin) (mg)
    VIT_B3 : // Vitamin B3 (Niacin) (mg)
    VIT_B5 : // Vitamin B5 (Pantothenic acid) (mg)
    VIT_B6 : // Vitamin B6 (Pyridoxine) (mg)
    VIT_B7 : // Vitamin B7 (Biotin) (mcg)
    VIT_B9 : // Vitamin B9 (Folate) (mcg DFE)
    VIT_B12 : // Vitamin B12 (Cobalamin) (mcg)
    VIT_C : // Vitamin C (Ascorbic Acid) (mg)
    VIT_D : // Vitamin D (mcg)
    VIT_E : // Vitamin E (mg α-TE)
    VIT_K : // Total Vitamin K (mcg)

    VIT_LK_CHOL : // Choline (mg)

MINERALS (per 100g / 100ml)
  Keys
    MIN_K  : // Potassium (mg)
    MIN_CL : // Chloride (mg)
    MIN_NA : // Sodium (mg)
    MIN_CA : // Calcium (mg)
    MIN_P  : // Phosphorus (mg)
    MIN_MG : // Magnesium (mg)
    MIN_S  : // Sulfur (mg)
    MIN_FE : // Iron (mg)
    MIN_ZN : // Zinc (mg)
    MIN_F  : // Fluoride (mg)
    MIN_MN : // Manganese (mg)
    MIN_CU : // Copper (mg)
    MIN_I  : // Iodine (mcg)
    MIN_SE : // Selenium (mcg)
    MIN_MO : // Molybdenum (mcg)
    MIN_CR : // Chromium (mcg)
    MIN_CO : // Cobalt (mcg)

AMINO ACIDS & PRECURSORS (per 100g / 100ml)
  Keys
    AA_GLY : // Glycine (mg)
    AA_D_NAC : // N-Acetyl-Cysteine (NAC) (mg)

BIOACTIVES (per 100g / 100ml)
  Keys
    PHY_ANT_TOTAL : // Total Anthocyanins (mg)

METABOLIC BURDEN FACTORS (per 100g / 100ml)
  Rules
    MBF_FRU calculation logic: Count ONLY free fructose from added sugars (sucrose, HFCS), honey, and fruit juices. For Whole Fruits (intact fiber matrix), set MBF_FRU = 0 to distinguish metabolic pathways.
  Keys
    MBF_AGEs : // Advanced Glycation End-products (kU)
    MBF_ACR  : // Acrylamide (mcg)
    MBF_PAHs : // Polycyclic Aromatic Hydrocarbons (ng)
    MBF_FUR  : // Furan (mcg)
    MBF_PUR  : // Purines (mg)
    MBF_FRU  : // Free Fructose (g)


OXIDATION FACTORS (per 100g / 100ml)
  Rules
    Enum fields MUST use one of the listed values only. No new values allowed.
  keys
    fac_mbf_oxl_fc : enum
      ["anml_L","anml_S","fish","seafood","proc_NP","proc_P","fruit_veg","unknown"]
        // anml_L  = pork, beef, lamb
        // anml_S  = poultry, small animals
        // proc_NP = non-pre-fried processed foods
        // proc_P  = pre-fried processed foods
        // fruit_veg = fruits and vegetables
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
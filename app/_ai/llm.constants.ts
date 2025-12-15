export const LLM_PROVIDERS = {
  DEEPSEEK: 'deepseek',
  OPENAI: 'openai',
  GEMINI: 'gemini',
} as const;

export const DEFAULT_MODELS = {
  [LLM_PROVIDERS.DEEPSEEK]: 'deepseek-chat',
  [LLM_PROVIDERS.OPENAI]: 'gpt-4o-mini',
  [LLM_PROVIDERS.GEMINI]: 'gemini-1.5-flash',
} as const;

export const NUTRITION_ANALYSIS_PROMPT = `你是一個專業營養師。請分析以下食物的營養成分。

食物描述: {foodDescription}

請以 JSON 格式返回分析結果，包含以下欄位：
1. foodName: 食物名稱
2. description: 簡短描述
3. servingSize: 建議份量
4. nutrients: 營養成分（每份）
   - calories: 熱量（大卡）
   - protein: 蛋白質（克）
   - carbs: 碳水化合物（克）
   - fat: 脂肪（克）
   - fiber: 膳食纖維（克）
   - sugar: 糖（克）
   - sodium: 鈉（毫克）
5. dbsg: 食物特性評分（0-100）
   - digestibility: 消化性
   - bioavailability: 生物利用率
   - satiety: 飽足感
   - glycemicIndex: 升糖指數
6. healthTags: 健康標籤（陣列）
7. warnings: 注意事項（陣列）

請確保所有數字都是合理的估計值，並以 JSON 格式直接返回。`;

export const SYSTEM_PROMPT = `你是一個嚴謹的營養分析專家。你的任務是根據常見的營養資料庫和科學數據，提供準確的食物營養分析。如果資訊不足，請基於相似食物進行合理估計，並在描述中說明。絕對不要返回無效或誇大的數值。`;
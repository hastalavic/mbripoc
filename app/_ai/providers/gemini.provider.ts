import {
  LLMProvider,
  LLMRequest,
  LLMResponse,
  LLMProviderConfig
} from '../types/llm.types';

// 從專門的 nutrition schema 檔案導入
import { NutritionAnalysisSchema } from '../types/nutrition.schema';

export class GeminiProvider implements LLMProvider {
  name = 'gemini';
  private config: LLMProviderConfig;

  constructor(config: LLMProviderConfig) {
    this.config = config;
    if (!this.validateConfig(config)) {
        throw new Error("GeminiProvider configuration is incomplete.");
    }
  }

  validateConfig(config: LLMProviderConfig): boolean {
    // 檢查模型名稱，並提供一個預設值以避免在調用時出錯
    if (!config.model) {
        config.model = 'gemini-2.5-flash'; // 建議預設為 flash
    }
    return !!config.apiKey && !!config.model;
  }

  async call(request: LLMRequest): Promise<LLMResponse> {
    const startTime = Date.now();
    
    try {
      // 1. 建議使用穩定版 v1
      const baseURL = this.config.baseURL || 'https://generativelanguage.googleapis.com/v1'; 
      // 2. 使用配置的模型名稱，此名稱應已更新為 gemini-2.5-flash
      const model = this.config.model; 

      const response = await fetch(`${baseURL}/models/${model}:generateContent?key=${this.config.apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              // 4. 將使用者提示作為唯一內容
              role: "user",
              parts: [{ text: request.prompt }]
            }
          ],
          config: {
            // 4. 系統提示應放在 config 參數中 (Gemini 推薦做法)
            systemInstruction: request.systemPrompt, 
            
            // 3. 啟用 JSON 輸出模式
            responseMimeType: "application/json",
            
            // 3. 傳遞結構化 Schema (假設您在 llm.types 中導入了 NutritionAnalysisSchema)
            responseSchema: NutritionAnalysisSchema, 

            // 其他配置
            temperature: request.temperature ?? this.config.temperature ?? 0.2,
            maxOutputTokens: request.maxTokens ?? this.config.maxTokens ?? 2048, // 增加 MaxTokens
          }
        }),
      });

      const data = await response.json();

      // 5. 增強錯誤處理，捕獲 API 返回的詳細錯誤
      if (!response.ok) {
         // 嘗試從 JSON 數據中提取錯誤訊息
         const apiErrorMessage = data.error?.message || response.statusText;
         throw new Error(`Gemini API error (${response.status}): ${apiErrorMessage}`);
      }
      
      const latency = Date.now() - startTime;
      const content = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
      
      return {
        content,
        model: model,
        latency,
        provider: this.name,
      };
    } catch (error) {
      // 在拋出錯誤前，可以在這裡加入 Sentry 追蹤 (如果已部署)
      throw new Error(`Gemini call failed: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
}
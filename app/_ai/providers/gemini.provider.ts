import {
  LLMProvider,
  LLMRequest,
  LLMResponse,
  LLMProviderConfig
} from '../types/llm.types'; // 核心介面

import { NutritionAnalysisSchema, type NutritionAnalysis } from '../types/nutrition.schema';
// 🎯 導入 JSON Schema 物件，用於傳遞給 Gemini API (前提是已在 schema 檔案中導出)
import { NutritionAnalysisJsonSchema } from '../types/nutrition.schema'; 
import { z } from 'zod';

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
    if (!config.model) {
      config.model = 'gemini-1.5-flash'; 
    }
    return !!config.apiKey && !!config.model;
  }

  async call(request: LLMRequest): Promise<LLMResponse> {
    const startTime = Date.now();
    
    try {
      const baseURL = this.config.baseURL || 'https://generativelanguage.googleapis.com/v1';
      const model = this.config.model;

      // 構建請求體
      const body: any = {
        contents: [
          {
            role: "user",
            parts: [{ text: request.prompt }] // 用戶提示
          }
        ],
        // config 物件用於配置 LLM 行為
        config: {
            temperature: request.temperature ?? this.config.temperature ?? 0.1,
            maxOutputTokens: request.maxTokens ?? this.config.maxTokens ?? 2048,
        }
      };

      // 處理系統提示 (System Instruction)
      if (request.systemPrompt) {
        // 修正：Gemini API 建議 systemInstruction 直接是字串
        body.config.systemInstruction = request.systemPrompt; 
      }

      // 處理 JSON 結構化輸出配置
      if (request.responseMimeType === 'application/json') {
        body.config.responseMimeType = 'application/json';
        
        if (request.responseSchema) {
          body.config.responseSchema = request.responseSchema;
        }
      }
      
      const response = await fetch(
        `${baseURL}/models/${model}:generateContent?key=${this.config.apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        }
      );

      const data = await response.json();

      // 增強錯誤處理
      if (!response.ok) {
         const apiErrorMessage = data.error?.message || response.statusText;
         throw new Error(`Gemini API error (${response.status}): ${apiErrorMessage}`);
      }
      
      const latency = Date.now() - startTime;
      const content = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
      
      // ⚠️ 注意：這裡缺少 usage 數據的解析，但為保持簡潔暫時省略
      
      return {
        content,
        model: model,
        latency,
        provider: this.name,
      };
    } catch (error) {
      throw new Error(`Gemini call failed: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * 專為營養分析設計的便捷方法：利用原生 JSON 輸出功能
   */
  async analyzeFood(foodName: string): Promise<NutritionAnalysis> {
    // 簡化系統提示：主要指示 AI 角色和數據返回格式
    const systemPrompt = `你是一個專業的營養分析師。請分析「${foodName}」的營養成分。

重要規則：
1. 只返回符合指定格式的 JSON，不要有任何其他文字、解釋或 markdown 格式
2. 數字字段必須是數字，不是字符串
3. 如果某些信息不可用，可以省略可選字段
4. 確保所有必填字段都存在`;

    // 🎯 優化：直接使用導入的 JSON Schema 物件
    const responseSchema = NutritionAnalysisJsonSchema;

    const request: LLMRequest = {
      prompt: `請分析「${foodName}」的營養成分並返回符合要求的 JSON 數據。`,
      systemPrompt: systemPrompt,
      temperature: 0.1, 
      maxTokens: 2048,
      responseMimeType: 'application/json',
      responseSchema: responseSchema // 傳遞 JSON Schema
    };
    
    const response = await this.call(request);
    
    try {
      let jsonText = response.content.trim();
      
      // 安全檢查：移除可能的 markdown 代碼塊
      jsonText = jsonText.replace(/^```json\s*/i, '').replace(/\s*```$/, '');
      jsonText = jsonText.trim();
      
      // 解析 JSON
      const rawData = JSON.parse(jsonText);
      
      // 雙重檢查：使用 Zod Schema 驗證數據結構
      const validatedData = NutritionAnalysisSchema.parse(rawData);
      
      return validatedData;
      
    } catch (error) {
      console.error('❌ 解析或驗證 Gemini 回應失敗:');
      console.error('原始回應:', response.content);
      console.error('錯誤:', error);
      
      if (error instanceof z.ZodError) {
        throw new Error(`AI 返回的數據格式無效 (Zod 錯誤): ${error.issues.map(e => e.message).join(', ')}`);
      }
      
      throw new Error(`無法解析 AI 回應為 JSON: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
}
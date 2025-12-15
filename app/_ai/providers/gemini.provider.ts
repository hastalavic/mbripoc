// app/_ai/providers/gemini.provider.ts

import {
  LLMProvider,
  LLMRequest,
  LLMResponse,
  LLMProviderConfig
} from '../types/llm.types';

import { NutritionAnalysisSchema, type NutritionAnalysis } from '../types/nutrition.schema';
import { NutritionAnalysisJsonSchema } from '../types/nutrition.schema'; 
import { z } from 'zod';

interface CustomLLMResponse extends LLMResponse {}


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
      // 使用最新的穩定模型
      config.model = 'gemini-2.5-flash'; 
    }
    return !!config.apiKey && !!config.model;
  }

  async call(request: LLMRequest): Promise<CustomLLMResponse> {
    const startTime = Date.now();
    
    try {
      // 使用 /v1
      const baseURL = this.config.baseURL || 'https://generativelanguage.googleapis.com/v1'; 
      const model = this.config.model;
      const temperature = request.temperature ?? this.config.temperature ?? 0.1;
      const maxOutputTokens = request.maxTokens ?? this.config.maxTokens ?? 2048;

      // --- 構建 generationConfig (包含所有配置) ---
      const generationConfig: any = {
          // 1. 生成參數
          temperature: temperature,
          maxOutputTokens: maxOutputTokens,
          
          // ✨ 核心修正：將 JSON 輸出配置放回 generationConfig 內部
          ...(request.responseMimeType === 'application/json' && {
              responseMimeType: 'application/json',
          }),
          ...(request.responseSchema && {
              responseSchema: request.responseSchema, 
          }),
      };
      
      // 構建請求體 Body
      const body: any = {
        contents: [
          {
            role: "user",
            parts: [{ text: request.prompt }] // 用戶提示 (已包含指令)
          }
        ],
        // ✨ 將 generationConfig 放在頂層 (這是 v1/v1beta 最標準的結構)
        generationConfig: generationConfig,
        // 沒有 config 和 systemInstruction
      };
      
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
         console.error('Sent Body:', JSON.stringify(body, null, 2));
         throw new Error(`Gemini API error (${response.status}): ${apiErrorMessage}`);
      }
      
      const latency = Date.now() - startTime;
      
      let content = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
      
      // 處理可能存在的 JSON 輸出被包裝的問題
      if (!content && data.candidates?.[0]?.content?.parts?.[0]?.data?.text) {
          content = data.candidates[0].content.parts[0].data.text;
      }
      
      // 返回 LLMResponse
      return {
        content,
        model: model,
        latency,
        provider: this.name,
      };
    } catch (error) {
      // 確保將底層錯誤訊息傳播出去
      throw new Error(`Gemini call failed: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * 專為營養分析設計的便捷方法：利用原生 JSON 輸出功能
   */
  async analyzeFood(foodName: string): Promise<NutritionAnalysis> {
    // 簡化系統提示：主要指示 AI 角色和數據返回格式
    const rawSystemPrompt = `
      你是一個專業的營養分析師。
      重要規則：1. 只返回符合指定格式的 JSON，不要有任何其他文字、解釋或 markdown 格式。2. 數字字段必須是數字。3. 如果信息不可用，可以省略可選字段。4. 確保所有必填字段都存在。
      請分析「${foodName}」的營養成分並返回符合要求的 JSON 數據。
    `;

    // 核心修正：將所有空白字符替換為單一空格，作為指令前綴
    const fullPrompt = rawSystemPrompt.replace(/\s+/g, ' ').trim();

    // 🎯 優化：直接使用導入的 JSON Schema 物件
    const responseSchema = NutritionAnalysisJsonSchema;

    const request: LLMRequest = {
      prompt: fullPrompt, // 使用合併的提示
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
      
      // 🎉 如果到這一步，表示 Gemini 請求、結構化輸出和 Zod 驗證全部成功！
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
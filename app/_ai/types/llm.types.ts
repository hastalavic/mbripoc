// app/_ai/types/llm.types.ts

// -----------------------------------------------------------------
// 1. 配置與請求介面
// -----------------------------------------------------------------

export interface LLMProviderConfig {
  apiKey: string;
  baseURL?: string;
  model: string;
  temperature?: number;
  maxTokens?: number;
}

export interface LLMRequest {
  prompt: string;
  systemPrompt?: string;
  temperature?: number;
  maxTokens?: number;
  // 新增 JSON 相關選項 (已保留)
  responseMimeType?: 'text/plain' | 'application/json';
  responseSchema?: any; // JSON Schema 物件
}

// -----------------------------------------------------------------
// 2. 回應與元數據介面
// -----------------------------------------------------------------

/**
 * AI 服務實際使用量數據
 */
export interface LLMUsage {
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
  // 未來可擴展：
  // completionTime?: number; 
  // totalCost?: number; 
}

/**
 * AI 服務回應的元數據 (Metadata)
 */
export interface LLMResponseMetadata {
    provider: 'gemini' | 'mock-simulator';
    model: string;
    latency: number;
    tokens: number; // 👈 確保加入這行！
    validated: boolean;
    timestamp: string;
    source: string;
    // ...
}

/**
 * 原始 LLM 服務回應
 */
export interface LLMResponse {
  content: string; // 原始文本或 JSON 字串
  model: string;
  latency: number;
  provider: string;
  usage?: LLMUsage;
}

// -----------------------------------------------------------------
// 3. Provider 抽象介面
// -----------------------------------------------------------------

export interface LLMProvider {
  name: string;
  call: (request: LLMRequest) => Promise<LLMResponse>;
  validateConfig: (config: LLMProviderConfig) => boolean;
}
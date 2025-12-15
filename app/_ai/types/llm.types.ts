
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
  jsonMode?: boolean;
}

export interface LLMResponse {
  content: string;
  model: string;
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
  latency: number;
  provider: string;
}

export interface LLMProvider {
  name: string;
  call: (request: LLMRequest) => Promise<LLMResponse>;
  validateConfig: (config: LLMProviderConfig) => boolean;
}
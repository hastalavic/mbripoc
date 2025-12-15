import { LLMProvider, LLMRequest, LLMResponse, LLMProviderConfig } from './types/llm.types';
import { DeepSeekProvider } from './providers/deepseek.provider';
import { OpenAIProvider } from './providers/openai.provider';
import { GeminiProvider } from './providers/gemini.provider';
import { LLM_PROVIDERS, DEFAULT_MODELS } from './llm.constants';

export class LLMOrchestrator {
  private providers: Map<string, LLMProvider> = new Map();
  private defaultProvider: string = LLM_PROVIDERS.DEEPSEEK;
  private fallbackOrder: string[] = [
    LLM_PROVIDERS.GEMINI,  // 先試 Gemini（免費）
    LLM_PROVIDERS.DEEPSEEK,
    LLM_PROVIDERS.OPENAI,
  ];

  constructor() {
    this.initializeProviders();
  }

  private initializeProviders() {
    // 從環境變數讀取配置
    const deepseekConfig: LLMProviderConfig = {
      apiKey: process.env.DEEPSEEK_API_KEY || '',
      model: process.env.DEEPSEEK_MODEL || DEFAULT_MODELS[LLM_PROVIDERS.DEEPSEEK],
      temperature: 0.2,
      maxTokens: 1000,
    };

    const openaiConfig: LLMProviderConfig = {
      apiKey: process.env.OPENAI_API_KEY || '',
      model: process.env.OPENAI_MODEL || DEFAULT_MODELS[LLM_PROVIDERS.OPENAI],
      temperature: 0.2,
      maxTokens: 1000,
    };

    const geminiConfig: LLMProviderConfig = {
      apiKey: process.env.GEMINI_API_KEY || '',
      model: process.env.GEMINI_MODEL || DEFAULT_MODELS[LLM_PROVIDERS.GEMINI],
      temperature: 0.2,
      maxTokens: 1000,
    };

    // 只註冊有 API key 的 provider
    if (deepseekConfig.apiKey) {
      this.providers.set(LLM_PROVIDERS.DEEPSEEK, new DeepSeekProvider(deepseekConfig));
    }

    if (openaiConfig.apiKey) {
      this.providers.set(LLM_PROVIDERS.OPENAI, new OpenAIProvider(openaiConfig));
    }

    if (geminiConfig.apiKey) {
      this.providers.set(LLM_PROVIDERS.GEMINI, new GeminiProvider(geminiConfig));
    }
  }

  async analyzeNutrition(foodDescription: string): Promise<LLMResponse> {
    const request: LLMRequest = {
      prompt: foodDescription,
      systemPrompt: `你是一個專業營養師。請分析食物的營養成分並返回 JSON 格式。`,
      jsonMode: true,
      temperature: 0.2,
      maxTokens: 1000,
    };

    // 嘗試主要 provider
    for (const providerName of this.fallbackOrder) {
      const provider = this.providers.get(providerName);
      if (provider) {
        try {
          console.log(`Trying ${providerName}...`);
          const response = await provider.call(request);
          
          // 驗證 JSON 格式
          try {
            JSON.parse(response.content);
            console.log(`✅ Success with ${providerName}`);
            return response;
          } catch (jsonError) {
            console.warn(`${providerName} returned invalid JSON, trying next provider...`);
            continue;
          }
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : String(error);
          console.warn(`${providerName} failed: ${errorMessage}, trying next...`);
          continue;
        }
      }
    }

    throw new Error('All LLM providers failed');
  }

  async callWithProvider(providerName: string, request: LLMRequest): Promise<LLMResponse> {
    const provider = this.providers.get(providerName);
    if (!provider) {
      throw new Error(`Provider ${providerName} not available`);
    }
    return provider.call(request);
  }

  getAvailableProviders(): string[] {
    return Array.from(this.providers.keys());
  }

  setFallbackOrder(order: string[]): void {
    this.fallbackOrder = order;
  }

  setDefaultProvider(providerName: string): void {
    if (this.providers.has(providerName)) {
      this.defaultProvider = providerName;
    } else {
      throw new Error(`Provider ${providerName} not available`);
    }
  }
}

// 單例模式導出
export const llmOrchestrator = new LLMOrchestrator();
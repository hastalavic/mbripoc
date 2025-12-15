import { LLMProvider, LLMRequest, LLMResponse, LLMProviderConfig } from '../types/llm.types';

export class GeminiProvider implements LLMProvider {
  name = 'gemini';
  private config: LLMProviderConfig;

  constructor(config: LLMProviderConfig) {
    this.config = config;
  }

  validateConfig(config: LLMProviderConfig): boolean {
    return !!config.apiKey && !!config.model;
  }

  async call(request: LLMRequest): Promise<LLMResponse> {
    const startTime = Date.now();
    
    try {
      const baseURL = this.config.baseURL || 'https://generativelanguage.googleapis.com/v1beta';
      
      const response = await fetch(`${baseURL}/models/${this.config.model}:generateContent?key=${this.config.apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                { text: request.systemPrompt || '' },
                { text: request.prompt }
              ]
            }
          ],
          generationConfig: {
            temperature: request.temperature ?? this.config.temperature ?? 0.2,
            maxOutputTokens: request.maxTokens ?? this.config.maxTokens ?? 1000,
          }
        }),
      });

      if (!response.ok) {
        throw new Error(`Gemini API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      const latency = Date.now() - startTime;
      const content = data.candidates?.[0]?.content?.parts?.[0]?.text || '';

      return {
        content,
        model: this.config.model,
        latency,
        provider: this.name,
      };
    } catch (error) {
      throw new Error(`Gemini call failed: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
}
import { LLMProvider, LLMRequest, LLMResponse, LLMProviderConfig } from '../types/llm.types';

export class OpenAIProvider implements LLMProvider {
  name = 'openai';
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
      const baseURL = this.config.baseURL || 'https://api.openai.com/v1';
      
      const response = await fetch(`${baseURL}/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: this.config.model,
          messages: [
            { role: 'system', content: request.systemPrompt || '' },
            { role: 'user', content: request.prompt }
          ],
          temperature: request.temperature ?? this.config.temperature ?? 0.2,
          max_tokens: request.maxTokens ?? this.config.maxTokens ?? 1000,
          response_format: request.jsonMode ? { type: 'json_object' } : undefined
        }),
      });

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      const latency = Date.now() - startTime;

      return {
        content: data.choices[0].message.content,
        model: data.model,
        usage: {
          promptTokens: data.usage?.prompt_tokens || 0,
          completionTokens: data.usage?.completion_tokens || 0,
          totalTokens: data.usage?.total_tokens || 0,
        },
        latency,
        provider: this.name,
      };
    } catch (error) {
      throw new Error(`OpenAI call failed: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
}
// app/_ai/LLMOrchestrator.service.ts

import { z } from 'zod';
import { NutritionAnalysisSchema, type NutritionAnalysis } from './types/nutrition.schema';
import { LLMResponseMetadata } from './types/llm.types';
import { GeminiProvider } from './providers/gemini.provider';

// -----------------------------------------------------------------
// 1. 內部工具函數：生成模擬數據
// -----------------------------------------------------------------

/**
 * 根據食物名稱生成模擬的營養分析結果。
 * * ✨ 修正：加上 export 關鍵字，使其能夠在 route.ts 中被調用。
 */
export function getMockAnalysis(foodName: string): NutritionAnalysis {
    const lowerInput = foodName.toLowerCase();
    let mock: NutritionAnalysis;

    // 模擬不同的食物數據
    if (lowerInput.includes('蘋果')) {
        mock = {
            foodName: '紅富士蘋果 (中型)',
            description: '富含膳食纖維的健康水果，是天然糖分來源。',
            servingSize: '182g (約1顆)',
            nutrients: {
                calories: 95,
                protein: 0.5,
                carbs: 25.1,
                fat: 0.3,
                fiber: 4.4,
                sugar: 19.0,
                sodium: 2, // 毫克
            },
            dbsg: {
                digestibility: 90,
                bioavailability: 85,
                satiety: 65,
                glycemicIndex: 36,
            },
            healthTags: ['高纖維', '低GI', '抗氧化'],
            warnings: [],
        };
    } else if (lowerInput.includes('雞腿便當')) {
        mock = {
            foodName: '台式滷雞腿飯便當',
            description: '經典台式便當，主食白飯，搭配滷製雞腿、滷蛋及三樣配菜。',
            servingSize: '一份 (約450g)',
            nutrients: {
                calories: 850,
                protein: 50.0,
                carbs: 95.0,
                fat: 32.0,
                fiber: 5.0,
                sugar: 10.0,
                sodium: 1200,
            },
            dbsg: {
                digestibility: 92,
                bioavailability: 88,
                satiety: 80,
                glycemicIndex: 75, // GI 較高
            },
            healthTags: ['高蛋白', '高熱量'],
            warnings: ['鈉含量高', '滷汁脂肪含量高'],
        };
    } else {
        // 預設返回一個通用結果
        mock = {
            foodName: foodName,
            description: '無法找到精確數據，此為通用模擬結果。',
            servingSize: '100g',
            nutrients: {
                calories: 200,
                protein: 10.0,
                carbs: 25.0,
                fat: 8.0,
            },
        };
    }

    // 在返回前，使用 Zod 進行一次結構驗證，確保模擬數據本身是合法的
    return NutritionAnalysisSchema.parse(mock);
}

// -----------------------------------------------------------------
// 2. 核心服務接口與協調器
// -----------------------------------------------------------------

interface AnalyzeFoodParams {
    foodName: string;
    userContext?: string;
}

interface UnifiedAnalysisResponse {
    analysis: NutritionAnalysis;
    metadata: LLMResponseMetadata;
}

/**
 * LLM 協調器：處理 AI 分析的智能路由和 Fallback 降級。
 */
export async function analyzeFoodUnified(params: AnalyzeFoodParams): Promise<UnifiedAnalysisResponse> {
    const { foodName, userContext } = params;

    // 1. 檢查 Gemini API Key 並優先嘗試真實 AI 服務
    const geminiKey = process.env.GEMINI_API_KEY;

    if (geminiKey) {
        console.log('🚀 [Orchestrator] 嘗試使用 Gemini AI 服務...');

        try {
            // 創建 GeminiProvider 實例 (未來可以在這裡加入 DeepSeek/OpenAI 的實例)
            const geminiProvider = new GeminiProvider({
                apiKey: geminiKey,
                model: 'gemini-1.5-flash',
                temperature: 0.1,
                maxTokens: 2048,
            });

            // 調用服務商的專門分析方法
            const analysis = await geminiProvider.analyzeFood(foodName);

            console.log('✅ [Orchestrator] Gemini AI 分析成功。');
            return {
                analysis: analysis,
                metadata: {
                    provider: 'gemini',
                    model: 'gemini-1.5-flash',
                    latency: 0, // 可以在 provider 中獲取
                    tokens: 0, // 可以在 provider 中獲取
                    validated: true,
                    timestamp: new Date().toISOString(),
                    source: 'real-ai',
                }
            };
        } catch (aiError) {
            // AI 服務失敗時，記錄錯誤並執行 Fallback
            console.error('❌ [Orchestrator] Gemini AI 服務失敗，原因:', (aiError as Error).message);
        }
    }

    // 2. Fallback 降級：使用模擬數據
    console.log('⚠️ [Orchestrator] 執行 Fallback 降級，使用模擬數據。');

    try {
        const mockAnalysis = getMockAnalysis(foodName);
        
        // 模擬處理延遲
        await new Promise(resolve => setTimeout(resolve, 500)); 

        return {
            analysis: mockAnalysis,
            metadata: {
                provider: 'mock-simulator',
                model: 'nutrition-db-v1',
                latency: 500,
                tokens: 0,
                validated: true,
                timestamp: new Date().toISOString(),
                source: 'mock-fallback',
            }
        };
    } catch (mockError) {
        // 如果模擬數據本身都有問題 (Zod 驗證失敗)
        console.error('❌ [Orchestrator] 模擬數據生成失敗:', mockError);
        throw new Error('無法完成營養分析，所有服務都失敗。');
    }
}
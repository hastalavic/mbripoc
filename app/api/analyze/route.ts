import { NextResponse } from 'next/server';
import { z } from 'zod';
import { NutritionAnalysisSchema, type NutritionAnalysis } from '@/app/_ai/types/nutrition.schema';
import { GeminiProvider } from '@/app/_ai/providers/gemini.provider';

// 定義請求體驗證 Schema
const AnalyzeRequestSchema = z.object({
  food: z.string().min(1, '食物名稱不能為空').max(200),
  text: z.string().optional(),
});

// 處理 GET 請求 - 健康檢查端點
export async function GET(request: Request) {
  console.log('🔧 === 環境變數檢查開始 ===');
  
  // 專注檢查 GEMINI_API_KEY
  const geminiKey = process.env.GEMINI_API_KEY;
  const hasGeminiKey = !!geminiKey;
  
  console.log('GEMINI_API_KEY 存在?', hasGeminiKey);
  console.log('GEMINI_API_KEY 前10位:', geminiKey ? geminiKey.substring(0, 10) + '...' : '無');
  
  console.log('DEEPSEEK_API_KEY 存在?', !!process.env.DEEPSEEK_API_KEY);
  console.log('OPENAI_API_KEY 存在?', !!process.env.OPENAI_API_KEY);
  
  return NextResponse.json({ 
    status: 'ok',
    endpoint: '/api/analyze',
    message: 'Nutrition Analysis API is working',
    timestamp: new Date().toISOString(),
    envCheck: {
      // 只顯示 GEMINI_API_KEY
      gemini: hasGeminiKey,
      geminiKeyPreview: geminiKey ? geminiKey.substring(0, 5) + '...' : 'none',
      
      // 其他服務
      deepseek: !!process.env.DEEPSEEK_API_KEY,
      deepseekKeyPreview: process.env.DEEPSEEK_API_KEY ? 
                         process.env.DEEPSEEK_API_KEY.substring(0, 5) + '...' : 'none',
      openai: !!process.env.OPENAI_API_KEY,
      openaiKeyPreview: process.env.OPENAI_API_KEY ? 
                       process.env.OPENAI_API_KEY.substring(0, 5) + '...' : 'none'
    }
  });
}

// 處理 POST 請求 - 食物分析端點
export async function POST(request: Request) {
  try {
    const rawBody = await request.json();
    const validatedRequest = AnalyzeRequestSchema.parse(rawBody);
    const foodInput = validatedRequest.food;
    
    console.log(`🔍 收到食物分析請求: "${foodInput}"`);
    
    // 檢查 Gemini API Key
    const geminiKey = process.env.GEMINI_API_KEY;
    
    if (geminiKey) {
      console.log('🚀 使用 Gemini AI 分析食物...');
      
      try {
        // 導入 GeminiProvider
    
        
        // 創建 GeminiProvider 實例
        const geminiProvider = new GeminiProvider({ 
          apiKey: geminiKey, 
          model: 'gemini-1.5-flash',
          temperature: 0.1,
          maxTokens: 2048
        });
        
        // 調用真實的 Gemini API
        const aiResponse = await geminiProvider.analyzeFood(foodInput);
        
        // 使用 Zod 驗證 AI 回應
        const validatedAnalysis = NutritionAnalysisSchema.parse(aiResponse);
        
        console.log('✅ Gemini AI 分析成功');
        
        // 返回真實的 AI 分析結果
        return NextResponse.json({ 
          status: 'success',
          message: '營養分析完成（Gemini AI）',
          data: {
            foodInput,
            analysis: validatedAnalysis,
            metadata: {
              provider: 'gemini',
              model: 'gemini-1.5-flash',
              validated: true,
              timestamp: new Date().toISOString(),
              source: 'real-ai'
            }
          }
        });
        
      } catch (aiError) {
        console.error('❌ Gemini AI 服務失敗:', aiError);
        console.log('⚠️ 降級到模擬數據');
        // 繼續執行下面的模擬數據代碼
      }
    } else {
      console.log('⚠️ 沒有 Gemini API Key，使用模擬數據');
    }
    
    // =========== 降級：模擬數據方案 ===========
    console.log('⚠️ 使用模擬數據（降級方案）');
    
    // 根據輸入的關鍵詞返回不同的模擬數據
    let mockData: any;
    const lowerInput = foodInput.toLowerCase();
    
    // ... 保持你現有的所有模擬數據判斷邏輯不變 ...
    // [你的蘋果、雞腿便當、沙拉等模擬數據代碼]
    
    // 使用 Zod 驗證模擬數據的結構
    const validatedAnalysis = NutritionAnalysisSchema.parse(mockData);
    
    // 模擬AI處理延遲（500毫秒）
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // 返回模擬數據
    return NextResponse.json({ 
      status: 'success',
      message: '營養分析完成（模擬數據）',
      data: {
        foodInput,
        analysis: validatedAnalysis,
        metadata: {
          provider: 'mock-simulator',
          model: 'nutrition-db-v1',
          latency: '500ms',
          tokens: 0,
          validated: true,
          timestamp: new Date().toISOString()
        }
      }
    });
    // =========== 結束：模擬數據方案 ===========
    
  } catch (error) {
    console.error('❌ API 錯誤:', error);
    
    // 處理不同類型的錯誤
    if (error instanceof z.ZodError) {
      // 明確指定 ZodError 類型
      const zodError = error as z.ZodError;
      return NextResponse.json(
        { 
          error: '數據格式驗證失敗',
          details: zodError.issues.map(issue => `${issue.path.join('.')}: ${issue.message}`)
        },
        { status: 400 }
      );
    }
    
    // 其他錯誤（如請求體解析錯誤）
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { 
        error: '無法處理請求',
        details: errorMessage
      },
      { status: 400 }
    );
  }
}
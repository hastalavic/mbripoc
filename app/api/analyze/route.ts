import { NextResponse } from 'next/server';
import { z } from 'zod';
import { NutritionAnalysisSchema, type NutritionAnalysis } from '@/app/_ai/types/nutrition.schema';

// 定義請求體驗證 Schema
const AnalyzeRequestSchema = z.object({
  food: z.string().min(1, '食物名稱不能為空').max(200),
  text: z.string().optional(),
});

// 處理 GET 請求 - 健康檢查端點
export async function GET(request: Request) {
  console.log('🔧 === 環境變數檢查開始 ===');
  console.log('DEEPSEEK_API_KEY 存在?', !!process.env.DEEPSEEK_API_KEY);
  console.log('DEEPSEEK_API_KEY 前10位:', process.env.DEEPSEEK_API_KEY?.substring(0, 10) + '...');
  console.log('OPENAI_API_KEY 存在?', !!process.env.OPENAI_API_KEY);
  
  return NextResponse.json({ 
    status: 'ok',
    endpoint: '/api/analyze',
    message: 'Nutrition Analysis API is working',
    timestamp: new Date().toISOString(),
    envCheck: {
      deepseek: !!process.env.DEEPSEEK_API_KEY,
      deepseekKeyPreview: process.env.DEEPSEEK_API_KEY?.substring(0, 5) + '...',
      openai: !!process.env.OPENAI_API_KEY
    }
  });
}

// 處理 POST 請求 - 食物分析端點
export async function POST(request: Request) {
  try {
    // 驗證請求體格式
    const rawBody = await request.json();
    const validatedRequest = AnalyzeRequestSchema.parse(rawBody);
    const foodInput = validatedRequest.food;
    
    console.log(`🔍 收到食物: "${foodInput}"`);
    
    // =========== 開始：模擬數據方案 ===========
    console.log('⚠️ AI 服務暫時有問題，使用模擬數據');
    
    // 根據輸入的關鍵詞返回不同的模擬數據
    let mockData: NutritionAnalysis;
    const lowerInput = foodInput.toLowerCase();
    
    // 1. 蘋果
    if (lowerInput.includes('蘋果') || lowerInput.includes('apple')) {
      mockData = {
        foodName: "蘋果",
        description: "新鮮蘋果，富含膳食纖維和維生素C",
        servingSize: "1顆（約150克）",
        nutrients: {
          calories: 95,
          protein: 0.5,
          carbs: 25,
          fat: 0.3,
          fiber: 4.4,
          sugar: 19,
          sodium: 2,
        },
        dbsg: {
          digestibility: 92,
          bioavailability: 88,
          satiety: 65,
          glycemicIndex: 36
        },
        healthTags: ["低熱量", "高纖維", "維生素C豐富", "抗氧化"],
        warnings: []
      };
    } 
    // 2. 雞腿便當
    else if (lowerInput.includes('雞腿') || lowerInput.includes('便當') || lowerInput.includes('饭')) {
      mockData = {
        foodName: "雞腿便當",
        description: "炸雞腿配白飯和配菜",
        servingSize: "1份",
        nutrients: {
          calories: 650,
          protein: 35,
          carbs: 75,
          fat: 25,
          fiber: 4,
          sugar: 8,
          sodium: 850,
        },
        dbsg: {
          digestibility: 78,
          bioavailability: 72,
          satiety: 85,
          glycemicIndex: 70
        },
        healthTags: ["高蛋白", "均衡餐點"],
        warnings: ["鈉含量偏高", "油炸食物"]
      };
    } 
    // 3. 沙拉
    else if (lowerInput.includes('沙拉') || lowerInput.includes('salad')) {
      mockData = {
        foodName: "雞肉沙拉",
        description: "雞胸肉配生菜沙拉",
        servingSize: "1份",
        nutrients: {
          calories: 320,
          protein: 28,
          carbs: 12,
          fat: 18,
          fiber: 5,
          sugar: 6,
          sodium: 420,
        },
        dbsg: {
          digestibility: 85,
          bioavailability: 82,
          satiety: 75,
          glycemicIndex: 25
        },
        healthTags: ["低醣", "高蛋白", "適合減重"],
        warnings: []
      };
    }
    // 4. 咖啡
    else if (lowerInput.includes('咖啡') || lowerInput.includes('coffee')) {
      mockData = {
        foodName: "黑咖啡",
        description: "無糖無奶的黑咖啡",
        servingSize: "1杯（240毫升）",
        nutrients: {
          calories: 2,
          protein: 0.3,
          carbs: 0,
          fat: 0,
          fiber: 0,
          sugar: 0,
          sodium: 5,
        },
        dbsg: {
          digestibility: 95,
          bioavailability: 90,
          satiety: 30,
          glycemicIndex: 0
        },
        healthTags: ["零熱量", "提神醒腦", "富含抗氧化劑"],
        warnings: ["咖啡因敏感者需注意"]
      };
    }
    // 5. 豚骨拉麵
    else if (lowerInput.includes('豚骨拉麵') || lowerInput.includes('拉麵') || lowerInput.includes('ramen')) {
      mockData = {
        foodName: "豚骨拉麵",
        description: "日式豚骨湯拉麵，含叉燒、溏心蛋、筍乾等配料",
        servingSize: "1碗（約600克）",
        nutrients: {
          calories: 450,
          protein: 18,
          carbs: 60,
          fat: 15,
          fiber: 3,
          sugar: 5,
          sodium: 1200,
        },
        dbsg: {
          digestibility: 85,
          bioavailability: 75,
          satiety: 80,
          glycemicIndex: 65
        },
        healthTags: ["高鈉", "均衡主食"],
        warnings: ["鈉含量極高", "建議減少湯量攝取"]
      };
    }
    // 6. 默認數據（未匹配到上述關鍵詞）
    else {
      mockData = {
        foodName: foodInput,
        description: "營養分析數據",
        servingSize: "1份",
        nutrients: {
          calories: 350,
          protein: 15,
          carbs: 45,
          fat: 12,
          fiber: 3,
          sugar: 5,
          sodium: 400,
        },
        dbsg: {
          digestibility: 80,
          bioavailability: 75,
          satiety: 70,
          glycemicIndex: 60
        },
        healthTags: ["均衡營養"],
        warnings: []
      };
    }
    
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
    // 處理不同類型的錯誤
    console.error('❌ API 錯誤:', error);
    
    if (error instanceof z.ZodError) {
      // Zod 驗證錯誤
      return NextResponse.json(
        { 
          error: '數據格式驗證失敗',
          details: error.issues.map(issue => `${issue.path.join('.')}: ${issue.message}`)
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
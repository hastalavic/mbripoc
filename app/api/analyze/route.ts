import { NextResponse } from 'next/server';
import { llmOrchestrator } from '@/app/_ai/LLMOrchestrator.service';

export async function GET(request: Request) {
  // 添加這行來檢查環境變數
  console.log('🔧 === 環境變數檢查開始 ===');
  console.log('DEEPSEEK_API_KEY 存在?', !!process.env.DEEPSEEK_API_KEY);
  console.log('DEEPSEEK_API_KEY 前10位:', process.env.DEEPSEEK_API_KEY?.substring(0, 10) + '...');
  console.log('OPENAI_API_KEY 存在?', !!process.env.OPENAI_API_KEY);
  
  // 檢查 LLMOrchestrator 狀態
  console.log('🔄 LLMOrchestrator 狀態:');
  const providers = llmOrchestrator.getAvailableProviders();
  console.log('可用 Providers:', providers);
  
  return NextResponse.json({ 
    status: 'ok',
    endpoint: '/api/analyze',
    message: 'Nutrition Analysis API is working',
    timestamp: new Date().toISOString(),
    availableProviders: providers,
    envCheck: {
      deepseek: !!process.env.DEEPSEEK_API_KEY,
      deepseekKeyPreview: process.env.DEEPSEEK_API_KEY?.substring(0, 5) + '...',
      openai: !!process.env.OPENAI_API_KEY
    }
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const foodInput = body.food || body.text || '';
    
    console.log(`🔍 收到食物: "${foodInput}"`);
    
    // =========== 开始：模拟数据方案 ===========
    console.log('⚠️ AI 服务暂时有问题，使用模拟数据');
    
    // 根据输入的关键词返回不同的模拟数据
    let mockData;
    const lowerInput = foodInput.toLowerCase();
    
    // 1. 苹果
    if (lowerInput.includes('蘋果') || lowerInput.includes('apple')) {
      mockData = {
        foodName: "蘋果",
        description: "新鲜苹果，富含膳食纤维和维生素C",
        servingSize: "1颗（约150克）",
        nutrients: {
          calories: 95,
          protein: 0.5,
          carbs: 25,
          fat: 0.3,
          fiber: 4.4,
          sugar: 19,
          sodium: 2,
          cholesterol: 0,
          saturatedFat: 0.1,
          transFat: 0
        },
        dbsg: {
          digestibility: 92,
          bioavailability: 88,
          satiety: 65,
          glycemicIndex: 36
        },
        healthTags: ["低热量", "高纤维", "维生素C丰富", "抗氧化"],
        warnings: []
      };
    } 
    // 2. 鸡腿便当
    else if (lowerInput.includes('雞腿') || lowerInput.includes('便當') || lowerInput.includes('饭')) {
      mockData = {
        foodName: "鸡腿便当",
        description: "炸鸡腿配白饭和配菜",
        servingSize: "1份",
        nutrients: {
          calories: 650,
          protein: 35,
          carbs: 75,
          fat: 25,
          fiber: 4,
          sugar: 8,
          sodium: 850,
          cholesterol: 95,
          saturatedFat: 7,
          transFat: 0.5
        },
        dbsg: {
          digestibility: 78,
          bioavailability: 72,
          satiety: 85,
          glycemicIndex: 70
        },
        healthTags: ["高蛋白", "均衡餐点"],
        warnings: ["钠含量偏高", "油炸食物"]
      };
    } 
    // 3. 沙拉
    else if (lowerInput.includes('沙拉') || lowerInput.includes('salad')) {
      mockData = {
        foodName: "鸡肉沙拉",
        description: "鸡胸肉配生菜沙拉",
        servingSize: "1份",
        nutrients: {
          calories: 320,
          protein: 28,
          carbs: 12,
          fat: 18,
          fiber: 5,
          sugar: 6,
          sodium: 420,
          cholesterol: 65,
          saturatedFat: 3.5,
          transFat: 0.1
        },
        dbsg: {
          digestibility: 85,
          bioavailability: 82,
          satiety: 75,
          glycemicIndex: 25
        },
        healthTags: ["低醣", "高蛋白", "适合减重"],
        warnings: []
      };
    }
    // 4. 咖啡
    else if (lowerInput.includes('咖啡') || lowerInput.includes('coffee')) {
      mockData = {
        foodName: "黑咖啡",
        description: "无糖无奶的黑咖啡",
        servingSize: "1杯（240毫升）",
        nutrients: {
          calories: 2,
          protein: 0.3,
          carbs: 0,
          fat: 0,
          fiber: 0,
          sugar: 0,
          sodium: 5,
          cholesterol: 0,
          saturatedFat: 0,
          transFat: 0
        },
        dbsg: {
          digestibility: 95,
          bioavailability: 90,
          satiety: 30,
          glycemicIndex: 0
        },
        healthTags: ["零热量", "提神醒脑", "富含抗氧化剂"],
        warnings: ["咖啡因敏感者需注意"]
      };
    }
    // 5. 默认数据（未匹配到上述关键词）
    else {
      mockData = {
        foodName: foodInput,
        description: "营养分析数据",
        servingSize: "1份",
        nutrients: {
          calories: 350,
          protein: 15,
          carbs: 45,
          fat: 12,
          fiber: 3,
          sugar: 5,
          sodium: 400,
          cholesterol: 30,
          saturatedFat: 4,
          transFat: 0.2
        },
        dbsg: {
          digestibility: 80,
          bioavailability: 75,
          satiety: 70,
          glycemicIndex: 60
        },
        healthTags: ["均衡营养"],
        warnings: []
      };
    }
    
    // 模拟AI处理延迟（500毫秒）
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // 返回模拟数据
    return NextResponse.json({ 
      status: 'success',
      message: '营养分析完成（模拟数据）',
      data: {
        foodInput,
        analysis: mockData,
        metadata: {
          provider: 'mock-simulator',
          model: 'nutrition-db-v1',
          latency: '500ms',
          tokens: 0
        }
      }
    });
    // =========== 结束：模拟数据方案 ===========
    
  } catch (error) {
    // 处理请求体解析等错误
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error('❌ API 请求解析错误:', errorMessage);
    
    return NextResponse.json(
      { 
        error: '无法处理请求',
        details: errorMessage
      },
      { status: 400 }
    );
  }
}
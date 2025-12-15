import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  return NextResponse.json({ 
    status: 'ok',
    endpoint: '/api/analyze',
    message: 'Nutrition Analysis API is working',
    timestamp: new Date().toISOString()
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    return NextResponse.json({ 
      status: 'success',
      message: 'Nutrition analysis request received',
      data: {
        foodInput: body.food || body.text || 'No food specified',
        // TODO: 這裡會是實際的分析結果
        nutrients: {},
        chartData: {}
      }
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid JSON payload' },
      { status: 400 }
    );
  }
}
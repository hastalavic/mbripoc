// app/api/analyze/route.ts

/**
 * 這個 API 是整個 BVT / Intake pipeline 的「入口」
 *
 * 職責只有一個：
 * - 接收使用者輸入的自然語言食物描述
 * - 呼叫 LLM（Gemini）產生 IntakeAnalysis
 * - 回傳「已通過 Schema 驗證」的結果
 *
 * ⚠️ 本檔案不負責：
 * - 快取（cache）
 * - mock / fallback
 * - 營養換算（per100 → actual）
 * - 事件儲存（IntakeEvent）
 * - 圖表 / DBSG
 */

import { NextResponse } from "next/server";
import { z } from "zod";

/**
 * IntakeAnalysisSchema
 * ----------------------------
 * 這是「LLM 輸出結構的唯一真理」
 *
 * 所有 AI 回傳資料：
 * - 一定要過這個 schema
 * - 不可有額外欄位
 * - 不可缺欄位
 *
 * ⚠️ API 層只做驗證，不做轉換
 */
import {
  IntakeAnalysisSchema,
  type IntakeAnalysis,
} from "@/app/_ai/types/IntakeAnalysisSchema.type";

/**
 * GeminiProvider
 * ----------------------------
 * 封裝單一 LLM Provider（Gemini）
 *
 * 職責：
 * - 接 prompt
 * - 呼叫 Gemini API
 * - 回傳「未驗證」的原始結果
 *
 * ⚠️ 驗證不在 provider 做
 */
import { GeminiProvider } from "@/app/_ai/providers/gemini.provider";


// ======================================================
// 1️⃣ Request Body 驗證
// ======================================================

/**
 * AnalyzeRequestSchema
 * ----------------------------
 * 驗證前端送進來的 request body
 *
 * 規則：
 * - 至少要有 food
 * - food 是「完整使用者輸入」，不是 foodName
 *
 * ⚠️ 不在這裡拆語意、不做 NLP
 */
const AnalyzeRequestSchema = z.object({
  food: z.string().min(1, "food is required").max(500),
});


// ======================================================
// 2️⃣ GET /api/analyze
// ======================================================

/**
 * GET 用途：
 * - 健康檢查
 * - 確認 API 是否存活
 * - 確認 AI provider 是否已設定
 *
 * ⚠️ 絕不回傳任何分析結果
 */
export async function GET() {
  const hasGeminiKey = !!process.env.GEMINI_API_KEY;

  return NextResponse.json({
    status: "ok",
    endpoint: "/api/analyze",
    ai: {
      provider: "gemini",
      enabled: hasGeminiKey,
    },
    timestamp: new Date().toISOString(),
  });
}


// ======================================================
// 3️⃣ POST /api/analyze
// ======================================================

/**
 * POST 是核心邏輯
 *
 * Pipeline：
 * 1. 驗證 request body
 * 2. 檢查環境變數（GEMINI_API_KEY）
 * 3. 呼叫 Gemini
 * 4. 用 IntakeAnalysisSchema 驗證輸出
 * 5. 回傳結果
 *
 * ⚠️ 設計原則：
 * - 失敗就失敗，不 fallback
 * - 不產生假資料
 */
export async function POST(request: Request) {
  try {
    // --------------------------------------------------
    // 3-1️⃣ 解析 & 驗證 request body
    // --------------------------------------------------
    const body = await request.json();
    const { food } = AnalyzeRequestSchema.parse(body);

    // --------------------------------------------------
    // 3-2️⃣ 檢查 Gemini API Key
    // --------------------------------------------------
    const geminiKey = process.env.GEMINI_API_KEY;

    if (!geminiKey) {
      // ⚠️ 這是「系統設定錯誤」，不是使用者錯誤
      return NextResponse.json(
        {
          error: "AI service not configured",
          detail: "GEMINI_API_KEY is missing",
        },
        { status: 500 }
      );
    }

    // --------------------------------------------------
    // 3-3️⃣ 建立 GeminiProvider
    // --------------------------------------------------
    const provider = new GeminiProvider({
      apiKey: geminiKey,
      model: "gemini-2.5-flash",
      temperature: 0.1,
      maxTokens: 4096,
    });

    let analysis: IntakeAnalysis;

    // --------------------------------------------------
    // 3-4️⃣ 呼叫 Gemini 進行分析
    // --------------------------------------------------
    try {
      /**
       * analyzeFood 接收的是「完整自然語言輸入」
       * 例如：
       * - "雞腿便當一個，飯少一點"
       * - "黑咖啡一杯，不加糖"
       */
      analysis = await provider.analyzeFood(food);
    } catch (err) {
      /**
       * ⚠️ AI 層錯誤：
       * - API 掛了
       * - Prompt 爆掉
       * - Gemini 回傳非 JSON
       */
      console.error("❌ Gemini analyzeFood failed:", err);

      return NextResponse.json(
        {
          error: "AI analysis failed",
          detail:
            err instanceof Error ? err.message : "Unknown AI error",
        },
        { status: 502 }
      );
    }

    // --------------------------------------------------
    // 3-5️⃣ Schema 驗證（防禦性）
    // --------------------------------------------------
    /**
     * 即使 GeminiProvider 內部已 parse，
     * API 層仍再次驗證，確保：
     * - 未來 provider 行為改變不會污染系統
     */
    const validated = IntakeAnalysisSchema.parse(analysis);

    // --------------------------------------------------
    // 3-6️⃣ 回傳成功結果
    // --------------------------------------------------
    return NextResponse.json({
      status: "success",
      data: {
        analysis: validated,
        metadata: {
          provider: "gemini",
          model: "gemini-2.5-flash",
          timestamp: new Date().toISOString(),
        },
      },
    });
  } catch (err) {
    // --------------------------------------------------
    // 4️⃣ 統一錯誤處理
    // --------------------------------------------------
    console.error("❌ /api/analyze error:", err);

    // ---- Zod 驗證錯誤（使用者輸入問題）
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: "Invalid request",
          details: err.issues.map((i) => ({
            path: i.path.join("."),
            message: i.message,
          })),
        },
        { status: 400 }
      );
    }

    // ---- 其他未預期錯誤（系統錯誤）
    return NextResponse.json(
      {
        error: "Unhandled server error",
        detail:
          err instanceof Error ? err.message : String(err),
      },
      { status: 500 }
    );
  }
}
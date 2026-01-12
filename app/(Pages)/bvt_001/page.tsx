// app/(pages)/bvt_001/page.tsx
"use client";

import posthog from 'posthog-js'

import React, { useMemo, useState, useEffect } from "react";

// 🔹 Types
import type { IntakeAnalysis } from "@/app/_ai/types/IntakeAnalysisSchema.type";

// 🔹 Task
import {
  runActualIntakeScalerTask,
} from "@/app/_engine/tasks/ActualIntakeScaler.task";

// 🔹 Compute
import { buildMBFResults } from "@/app/_engine/computes/MBF/results/MBFresults";

// 🔹 FD1
import {
  EMPTY_MBRI_REGISTRY_STATE,
  type RegistryState_Food,
} from "@/app/_engine/registry/FD1.registry";

// 🔹 Widget
import ActualIntakeResultWidget from "@/app/design/widgets/ActualIntakeResult.widget";

export default function Bvt001Page() {
  /* ==================================================
   * 🧪 DEBUG SWITCH
   * ================================================== */
  const DEBUG = false;

  const [text, setText] = useState("");
  const [submitted, setSubmitted] = useState<{
    status: string;
    data?: { analysis: IntakeAnalysis };
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // 🔹 UX 計時器 State
  const [elapsed, setElapsed] = useState(0);
  const ESTIMATED_TIME = 15; // 預計分析秒數

  const trimmed = useMemo(() => text.trim(), [text]);
  const maxChars = 500;
  const canSubmit = trimmed.length > 0;

  // 🔹 計時器邏輯
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (loading) {
      interval = setInterval(() => {
        setElapsed((prev) => prev + 1);
      }, 1000);
    } else {
      setElapsed(0);
    }
    return () => clearInterval(interval);
  }, [loading]);

  async function handleSubmit() {
    if (!canSubmit || loading) return;

    // 🎯 追蹤點 1：使用者點擊按鈕
    posthog.capture('bvt_analysis_started', {
      input_text_length: trimmed.length,
      estimated_wait_time: ESTIMATED_TIME
    });

    setLoading(true);
    setError(null);
    setSubmitted(null);

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ food: trimmed }),
      });

      const data = await res.json();

      if (!res.ok) {
        const errorMsg = data?.error ?? "API_ERROR";
        setError(errorMsg);

        // 🎯 追蹤點 2：API 回傳錯誤
        posthog.capture('bvt_analysis_failed', {
          error_type: errorMsg,
          input_text_length: trimmed.length
        });
        return;
      }

      setSubmitted(data);

      // 🎯 追蹤點 3：分析成功
      posthog.capture('bvt_analysis_success', {
        actual_elapsed_seconds: elapsed, // 記錄實際花費秒數
        food_category: data.data?.analysis?.category || 'unknown'
      });

    } catch (err) {
      setError("NETWORK_ERROR");
      
      // 🎯 建議修改：將真正的錯誤對象傳給 PostHog，方便 Debug
      posthog.capture('bvt_analysis_error', {
        message: "NETWORK_ERROR",
        raw_error: err instanceof Error ? err.message : String(err)
      });
    } finally {
      setLoading(false);
    }
  }

  /* ==================================================
   * 1️⃣ AI Analysis Layer
   * ================================================== */
  const analysis = useMemo(() => {
    if (submitted?.status === "success") {
      return submitted.data?.analysis ?? null;
    }
    return null;
  }, [submitted]);

  /* ==================================================
   * 2️⃣ Actual Intake Layer
   * ================================================== */
  const actualIntake = useMemo(() => {
    if (!analysis) return null;

    const result = runActualIntakeScalerTask(analysis, {
      actualWeight: analysis.serving_weight,
    });

    const taskResult = result as any;

    if (taskResult?.kind === "ACTUAL_INTAKE") {
      return taskResult.payload;
    }

    return null;
  }, [analysis]);

  /* ==================================================
   * 3️⃣ MBF Layer
   * ================================================== */
  const mbfResults = useMemo(() => {
    if (!analysis || !actualIntake) return null;
    return buildMBFResults(analysis, actualIntake);
  }, [analysis, actualIntake]);

  /* ==================================================
   * 🔑 FD1 SNAPSHOT
   * ================================================== */
  const fd1 = useMemo<RegistryState_Food | null>(() => {
    if (!analysis || !actualIntake || !mbfResults) return null;

    return {
      ...EMPTY_MBRI_REGISTRY_STATE,
      nutrients: actualIntake,
      mbf: mbfResults,
      timestamp: Date.now(),
    };
  }, [analysis, actualIntake, mbfResults]);

  /* ==================================================
   * Render
   * ================================================== */
  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "40px 20px",
        background: "#fcfcfc",
      }}
    >
      <section style={{ width: "100%", maxWidth: 760, margin: "0 auto" }}>
        <header style={{ marginBottom: 24 }}>
          <h1 style={{ fontSize: 26, fontWeight: 800 }}>
            Enbryt AI食物分析工具
          </h1>
          <p style={{ color: "#666", marginTop: 4 }}>
            輸入食物，即時獲取營養素、代謝負擔成分等詳細分析結果。
          </p>
        </header>

        <div
          style={{
            background: "#fff",
            borderRadius: 16,
            padding: 24,
            border: "1px solid #eee",
            position: "relative",
            overflow: "hidden"
          }}
        >
          {/* 🔹 進度條效果 */}
          {loading && (
            <div style={{
              position: "absolute",
              top: 0,
              left: 0,
              height: 4,
              background: "#1a73e8",
              transition: "width 1s linear",
              width: `${Math.min((elapsed / ESTIMATED_TIME) * 100, 98)}%`
            }} />
          )}

          <textarea
            value={text}
            onChange={(e) =>
              e.target.value.length <= maxChars && setText(e.target.value)
            }
            placeholder="請輸入食物描述、份量（例如：烤牛肉串 2串，每串60克）..."
            rows={4}
            style={{
              width: "100%",
              padding: 16,
              fontSize: 16,
              borderRadius: 12,
              border: "1px solid #ddd",
              outline: "none",
              transition: "border-color 0.2s",
            }}
          />

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 16,
            }}
          >
            <div>
              <span style={{ fontSize: 13, color: "#999" }}>
                {text.length}/{maxChars}
              </span>
              {loading && (
                <span style={{ marginLeft: 12, fontSize: 13, color: "#1a73e8", fontWeight: 500 }}>
                  {elapsed >= ESTIMATED_TIME 
                    ? "✨ 即將完成..." 
                    : `🚀 預計還需 ${ESTIMATED_TIME - elapsed} 秒`}
                </span>
              )}
            </div>

            <button
              onClick={handleSubmit}
              disabled={!canSubmit || loading}
              style={{
                padding: "12px 28px",
                borderRadius: 30,
                border: "none",
                background: canSubmit ? "#1a73e8" : "#ccc",
                color: "#fff",
                fontWeight: 600,
                cursor: canSubmit ? "pointer" : "not-allowed",
                transition: "all 0.2s",
                boxShadow: canSubmit && !loading ? "0 4px 12px rgba(26,115,232,0.2)" : "none"
              }}
            >
              {loading ? `分析中 ${elapsed}s` : "開始分析"}
            </button>
          </div>

          {error && (
            <div style={{ marginTop: 16, padding: 12, background: "#fff5f5", borderRadius: 8, color: "#c53030", fontSize: 14 }}>
              ⚠️ {error}
            </div>
          )}

          {/* ===== 正式結果 ===== */}
          {analysis && fd1 && (
            <div style={{ marginTop: 32 }}>
              <ActualIntakeResultWidget
                analysis={analysis}
                fd1={fd1}
              />
            </div>
          )}

          {/* ==================================================
           * 🧪 DEBUG ZONE
           * ================================================== */}
          {DEBUG && (
            <div style={{ marginTop: 40, borderTop: "2px dashed #eee", paddingTop: 20 }}>
              <h3 style={{ fontSize: 14, color: "#aaa", marginBottom: 12 }}>🧪 ENGINEER DEBUG CONSOLE</h3>
              <details style={{ cursor: "pointer", marginBottom: 8 }}>
                <summary style={{ fontSize: 13, color: "#666" }}>AI Analysis</summary>
                <pre style={{ background: "#f4f4f4", padding: 12, fontSize: 12, overflow: "auto" }}>{JSON.stringify(analysis, null, 2)}</pre>
              </details>
              <details style={{ cursor: "pointer", marginBottom: 8 }}>
                <summary style={{ fontSize: 13, color: "#666" }}>Actual Intake</summary>
                <pre style={{ background: "#f4f4f4", padding: 12, fontSize: 12, overflow: "auto" }}>{JSON.stringify(actualIntake, null, 2)}</pre>
              </details>
              <details style={{ cursor: "pointer" }}>
                <summary style={{ fontSize: 13, color: "#666" }}>FD1 Snapshot</summary>
                <pre style={{ background: "#f4f4f4", padding: 12, fontSize: 12, overflow: "auto" }}>{JSON.stringify(fd1, null, 2)}</pre>
              </details>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
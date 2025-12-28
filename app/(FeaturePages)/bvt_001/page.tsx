"use client";

import React, { useMemo, useState } from "react";

// 🔹 計算核心（page 只負責「呼叫」）
import { scaleActualIntake } from "@/app/_engine/computes/tasks/ActualIntakeScaler.compute";

// 🔹 顯示計算結果的 widget
import ActualIntakeResultWidget from "@/app/components/widgets/ActualIntakeResult.widget";

import { buildMBFResults } from "@/app/_engine/computes/MBF/results/MBFresults";

export default function Bvt001Page() {
  const [text, setText] = useState("");
  const [submitted, setSubmitted] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const trimmed = useMemo(() => text.trim(), [text]);
  const maxChars = 500;
  const canSubmit = trimmed.length > 0;

  // =========================
  // 送出分析請求
  // =========================
  async function handleSubmit() {
    if (!canSubmit || loading) return;

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
        setError(data?.error ?? "API_ERROR");
        return;
      }

      setSubmitted(data);
    } catch {
      setError("NETWORK_ERROR");
    } finally {
      setLoading(false);
    }
  }

  // =========================
  // 取出 AI 分析結果（語意 + per100）
  // =========================
  const analysis = useMemo(() => {
    if (!submitted) return null;
    if (submitted.status !== "success") return null;
    return submitted.data?.analysis ?? null;
  }, [submitted]);

  // =========================
  // 觸發計算核心 → 實際攝取量
  // =========================
  const actualIntake = useMemo(() => {
    if (!analysis) return null;

    return scaleActualIntake(analysis, {
      actualWeight: analysis.serving_weight,
    });
  }, [analysis]);

  // =========================
  // 觸發 MBF 結果組裝
  // =========================
  const mbfResults = useMemo(() => {
    if (!analysis || !actualIntake) return null;

    return buildMBFResults(analysis, actualIntake);
  }, [analysis, actualIntake]);


  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "32px 20px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <section style={{ width: "100%", maxWidth: 760 }}>
        {/* ===== Header ===== */}
        <header style={{ marginBottom: 18 }}>
          <h1 style={{ fontSize: 22, fontWeight: 700, margin: 0 }}>
            營養分析器（BVT）
          </h1>
          <p style={{ marginTop: 8, opacity: 0.8 }}>
            請描述你吃的食物，系統將回傳結構化營養分析
          </p>
        </header>

        {/* ===== Input ===== */}
        <div
          style={{
            border: "1px solid rgba(0,0,0,0.12)",
            borderRadius: 12,
            padding: 16,
          }}
        >
          <textarea
            value={text}
            onChange={(e) =>
              e.target.value.length <= maxChars && setText(e.target.value)
            }
            placeholder="例如：雞腿便當一個、蘋果一顆、黑咖啡一杯"
            rows={5}
            style={{
              width: "100%",
              resize: "vertical",
              borderRadius: 10,
              border: "1px solid rgba(0,0,0,0.18)",
              padding: 12,
              fontSize: 15,
            }}
          />

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 12,
            }}
          >
            <span style={{ fontSize: 12, opacity: 0.6 }}>
              {text.length}/{maxChars}
            </span>

            <button
              onClick={handleSubmit}
              disabled={!canSubmit || loading}
              style={{
                padding: "10px 14px",
                borderRadius: 10,
                border: "none",
                background: canSubmit ? "#111" : "#999",
                color: "#fff",
                cursor: canSubmit ? "pointer" : "not-allowed",
              }}
            >
              {loading ? "分析中…" : "分析"}
            </button>
          </div>

          {error && (
            <div style={{ marginTop: 10, color: "crimson" }}>
              發生錯誤：{error}
            </div>
          )}

          {/* ===== Result ===== */}
          {analysis && actualIntake && mbfResults && (
            <div style={{ marginTop: 24 }}>
              {/* --- 基本資訊（語意） --- */}
              <div
                style={{
                  padding: 16,
                  borderRadius: 12,
                  border: "1px solid rgba(0,0,0,0.12)",
                  marginBottom: 16,
                }}
              >
                <h3 style={{ marginTop: 0 }}>分析對象</h3>
                <div><b>名稱：</b>{analysis.intake_name}</div>
                <div><b>重量：</b>{analysis.serving_weight} g / ml</div>
                <div><b>類型：</b>{analysis.intake_type}</div>
                <div><b>狀態：</b>{analysis.intake_state}</div>
              </div>

              {/* --- 實際攝取量 + MBF --- */}
              <ActualIntakeResultWidget
                analysis={analysis}
                actualIntake={actualIntake}
                mbf={mbfResults}
              />

              {/* --- Debug：原始 AI Analysis --- */}
              <details style={{ marginTop: 16 }}>
                <summary>查看原始 JSON（Debug）</summary>
                <pre style={{ fontSize: 12, opacity: 0.7 }}>
                  {JSON.stringify(analysis, null, 2)}
                </pre>
              </details>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
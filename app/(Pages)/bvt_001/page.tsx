"use client";

import React, { useMemo, useState } from "react";

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
   * 🧪 DEBUG SWITCH（唯一總開關）
   * ================================================== */
  const DEBUG = false; // ← 要看 debug 改成 true

  const [text, setText] = useState("");
  const [submitted, setSubmitted] = useState<{
    status: string;
    data?: { analysis: IntakeAnalysis };
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const trimmed = useMemo(() => text.trim(), [text]);
  const maxChars = 500;
  const canSubmit = trimmed.length > 0;

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
   * 🔑 FD1 SNAPSHOT（自動焊接）
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
            Enbryt 食物分析系統 v1.0
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
          }}
        >
          <textarea
            value={text}
            onChange={(e) =>
              e.target.value.length <= maxChars && setText(e.target.value)
            }
            placeholder="請輸入食物名稱與份量（例如：烤牛肉 100g 2份）..."
            rows={4}
            style={{
              width: "100%",
              padding: 16,
              fontSize: 16,
              borderRadius: 12,
              border: "1px solid #ddd",
            }}
          />

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 16,
            }}
          >
            <span style={{ fontSize: 13, color: "#999" }}>
              {text.length}/{maxChars}
            </span>

            <button
              onClick={handleSubmit}
              disabled={!canSubmit || loading}
              style={{
                padding: "12px 28px",
                borderRadius: 30,
                border: "none",
                background: canSubmit ? "#1a73e8" : "#ccc",
                color: "#fff",
                cursor: canSubmit ? "pointer" : "not-allowed",
              }}
            >
              {loading ? "計算中..." : "開始分析"}
            </button>
          </div>

          {error && (
            <div style={{ marginTop: 16, color: "#c53030" }}>
              ⚠️ {error}
            </div>
          )}

          {/* ===== 正式結果（給使用者） ===== */}
          {analysis && fd1 && (
            <div style={{ marginTop: 32 }}>
              <ActualIntakeResultWidget
                analysis={analysis}
                fd1={fd1}
              />
            </div>
          )}

          {/* ==================================================
           * 🧪 DEBUG ZONE（工程師專用）
           * ================================================== */}
          {DEBUG && (
            <>
              <details style={{ marginTop: 32 }}>
                <summary>🧪 Debug：AI Analysis</summary>
                <pre>{JSON.stringify(analysis, null, 2)}</pre>
              </details>

              <details>
                <summary>🧪 Debug：Actual Intake</summary>
                <pre>{JSON.stringify(actualIntake, null, 2)}</pre>
              </details>

              <details>
                <summary>🧪 Debug：MBF Results</summary>
                <pre>{JSON.stringify(mbfResults, null, 2)}</pre>
              </details>

              <details>
                <summary>🧪 Debug：FD1 Snapshot</summary>
                <pre>{JSON.stringify(fd1, null, 2)}</pre>
              </details>
            </>
          )}
        </div>
      </section>
    </main>
  );
}
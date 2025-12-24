"use client";

import React, { useMemo, useState } from "react";

export default function Bvt001Page() {
  const [text, setText] = useState("");
  const [submitted, setSubmitted] = useState<any | null>(null);
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

  /**
   * 解析 API 回傳的 analysis（flat 結構）
   */
  const analysis = useMemo(() => {
    if (!submitted) return null;
    if (submitted.status !== "success") return null;
    return submitted.data?.analysis ?? null;
  }, [submitted]);

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
            onChange={(e) => e.target.value.length <= maxChars && setText(e.target.value)}
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
          {analysis && (
            <div
              style={{
                marginTop: 24,
                padding: 20,
                borderRadius: 12,
                background: "rgba(0,128,0,0.05)",
                border: "1px solid rgba(0,128,0,0.2)",
              }}
            >
              <h3 style={{ marginTop: 0 }}>分析結果</h3>

              {/* 基本資訊 */}
              <div style={{ marginBottom: 12 }}>
                <div><b>名稱：</b>{analysis.intake_name}</div>
                <div><b>重量：</b>{analysis.serving_weight} g / ml</div>
                <div><b>類型：</b>{analysis.intake_type}</div>
                <div><b>狀態：</b>{analysis.intake_state}</div>
              </div>

              {/* 巨量營養素 */}
              <h4>巨量營養素（per 100）</h4>
              <ul>
                <li>碳水：{analysis.NU_CARB} g</li>
                <li>蛋白質：{analysis.NU_PRO} g</li>
                <li>脂肪：{analysis.NU_FAT} g</li>
                <li>纖維：{analysis.NU_FBR} g</li>
                <li>水分：{analysis.NU_WATER} g</li>
              </ul>

              {/* 維生素 */}
              <h4>維生素</h4>
              <ul>
                <li>Vit A：{analysis.VIT_A} mcg</li>
                <li>Vit B1：{analysis.VIT_B1} mg</li>
                <li>Vit B2：{analysis.VIT_B2} mg</li>
                <li>Vit B6：{analysis.VIT_B6} mg</li>
                <li>Vit C：{analysis.VIT_C} mg</li>
                <li>Vit E：{analysis.VIT_E} mg</li>
                <li>Choline：{analysis.VIT_LK_CHOL} mg</li>
              </ul>

              {/* MBF */}
              <h4>代謝負擔因子（MBF）</h4>
              <ul>
                <li>AGEs：{analysis.MBF_AGEs}</li>
                <li>Acrylamide：{analysis.MBF_ACR}</li>
                <li>PAHs：{analysis.MBF_PAHs}</li>
                <li>Furan：{analysis.MBF_FUR}</li>
                <li>Purines：{analysis.MBF_PUR}</li>
              </ul>

              {/* Unknown */}
              {analysis._unknown?.length > 0 && (
                <>
                  <h4>無法估算欄位</h4>
                  <ul>
                    {analysis._unknown.map((k: string) => (
                      <li key={k}>{k}</li>
                    ))}
                  </ul>
                </>
              )}

              {/* Raw JSON */}
              <details style={{ marginTop: 16 }}>
                <summary>查看原始 JSON</summary>
                <pre style={{ fontSize: 12 }}>
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
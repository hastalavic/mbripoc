"use client";

import React, { useMemo, useState } from "react";

export default function Bvt001Page() {
  const [text, setText] = useState("");
  const [submitted, setSubmitted] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const trimmed = useMemo(() => text.trim(), [text]);
  const charCount = text.length;
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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ food: trimmed }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data?.error ?? "API_ERROR");
        return;
      }

      setSubmitted(JSON.stringify(data, null, 2));
    } catch (err) {
      setError("NETWORK_ERROR");
    } finally {
      setLoading(false);
    }
  }

  // 解析 submitted JSON 並提取營養數據
  const parsedResult = useMemo(() => {
    if (!submitted) return null;
    try {
      const data = JSON.parse(submitted);
      if (data.status === 'success' && data.data) {
        return data;
      }
    } catch (e) {
      return null;
    }
    return null;
  }, [submitted]);

  const nutrientCardStyle = {
    padding: "12px",
    borderRadius: 8,
    background: "white",
    border: "1px solid #e0e0e0",
    textAlign: "center" as const,
  };

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
        <header style={{ marginBottom: 18 }}>
          <h1 style={{ fontSize: 22, fontWeight: 700, margin: 0 }}>營養分析器</h1>
          <p style={{ margin: "8px 0 0", opacity: 0.8, lineHeight: 1.5 }}>
            請描述你吃的食物，系統會為你分析營養成分
          </p>
        </header>

        <div
          style={{
            border: "1px solid rgba(0,0,0,0.12)",
            borderRadius: 12,
            padding: 16,
          }}
        >
          <label
            htmlFor="bvt-free-text"
            style={{ display: "block", fontWeight: 600, marginBottom: 10 }}
          >
            食物描述
          </label>

          <textarea
            id="bvt-free-text"
            value={text}
            onChange={(e) => {
              const v = e.target.value;
              if (v.length <= maxChars) setText(v);
            }}
            placeholder="例如：雞腿便當一個，飯少一點；一顆蘋果；鮭魚沙拉一份..."
            rows={5}
            style={{
              width: "100%",
              resize: "vertical",
              borderRadius: 10,
              border: "1px solid rgba(0,0,0,0.18)",
              padding: "12px 12px",
              fontSize: 15,
              lineHeight: 1.5,
              outline: "none",
            }}
            onKeyDown={(e) => {
              // Cmd/Ctrl + Enter 快速送出
              if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
                e.preventDefault();
                handleSubmit();
              }
            }}
          />

          {/* 快速範例按鈕 */}
          <div style={{ display: "flex", gap: 10, marginTop: 8, flexWrap: "wrap" }}>
            <button
              type="button"
              onClick={() => setText("雞腿便當一個，飯少一點")}
              style={{
                padding: "6px 10px",
                fontSize: 12,
                borderRadius: 6,
                border: "1px solid rgba(0,0,0,0.12)",
                background: "transparent",
                cursor: "pointer",
              }}
            >
              雞腿便當
            </button>
            <button
              type="button"
              onClick={() => setText("一顆蘋果")}
              style={{
                padding: "6px 10px",
                fontSize: 12,
                borderRadius: 6,
                border: "1px solid rgba(0,0,0,0.12)",
                background: "transparent",
                cursor: "pointer",
              }}
            >
              蘋果
            </button>
            <button
              type="button"
              onClick={() => setText("鮭魚沙拉一份")}
              style={{
                padding: "6px 10px",
                fontSize: 12,
                borderRadius: 6,
                border: "1px solid rgba(0,0,0,0.12)",
                background: "transparent",
                cursor: "pointer",
              }}
            >
              沙拉
            </button>
            <button
              type="button"
              onClick={() => setText("黑咖啡一杯")}
              style={{
                padding: "6px 10px",
                fontSize: 12,
                borderRadius: 6,
                border: "1px solid rgba(0,0,0,0.12)",
                background: "transparent",
                cursor: "pointer",
              }}
            >
              咖啡
            </button>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 10,
              gap: 12,
            }}
          >
            <span style={{ fontSize: 12, opacity: 0.7 }}>
              {charCount}/{maxChars}
            </span>

            <div style={{ display: "flex", gap: 10 }}>
              <button
                type="button"
                onClick={() => setText("")}
                disabled={text.length === 0}
                style={{
                  padding: "10px 12px",
                  borderRadius: 10,
                  border: "1px solid rgba(0,0,0,0.18)",
                  background: "transparent",
                  cursor: text.length === 0 ? "not-allowed" : "pointer",
                }}
              >
                清空
              </button>

              <button
                type="button"
                onClick={handleSubmit}
                disabled={!canSubmit}
                style={{
                  padding: "10px 14px",
                  borderRadius: 10,
                  border: "1px solid rgba(0,0,0,0.18)",
                  background: canSubmit ? "rgba(0,0,0,0.92)" : "rgba(0,0,0,0.25)",
                  color: "white",
                  cursor: canSubmit ? "pointer" : "not-allowed",
                }}
              >
                {loading ? "分析中…" : "分析營養（⌘/Ctrl + Enter）"}
              </button>
            </div>
          </div>
          
          {error && (
            <div style={{ marginTop: 10, color: "crimson", fontSize: 13 }}>
              發生錯誤：{error}
            </div>
          )}

          {/* 營養分析結果顯示區 */}
          {parsedResult && (
            <div
              style={{
                marginTop: 24,
                padding: 20,
                borderRadius: 12,
                background: "rgba(0, 128, 0, 0.05)",
                border: "1px solid rgba(0, 128, 0, 0.2)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
                <h3 style={{ margin: 0, color: "#2e7d32", flex: 1 }}>
                  🍎 營養分析結果
                </h3>
                <span style={{
                  fontSize: 12,
                  padding: "4px 8px",
                  background: "rgba(0, 128, 0, 0.1)",
                  borderRadius: 12,
                  color: "#2e7d32"
                }}>
                  {parsedResult.data.metadata.provider}
                </span>
              </div>
              
              {/* 食物基本資訊 */}
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontWeight: 700, fontSize: 18 }}>
                  {parsedResult.data.analysis.foodName}
                </div>
                <div style={{ color: "#666", marginTop: 4 }}>
                  {parsedResult.data.analysis.description}
                </div>
                <div style={{ fontSize: 14, marginTop: 4, color: "#888" }}>
                  份量：{parsedResult.data.analysis.servingSize}
                </div>
              </div>
              
              {/* 主要營養素卡片 */}
              <div style={{ 
                display: "grid", 
                gridTemplateColumns: "1fr 1fr", 
                gap: 12,
                marginBottom: 20 
              }}>
                <div style={nutrientCardStyle}>
                  <div style={{ fontSize: 12, opacity: 0.7 }}>熱量</div>
                  <div style={{ fontSize: 24, fontWeight: 700 }}>
                    {parsedResult.data.analysis.nutrients.calories}
                  </div>
                  <div style={{ fontSize: 12 }}>大卡</div>
                </div>
                
                <div style={nutrientCardStyle}>
                  <div style={{ fontSize: 12, opacity: 0.7 }}>蛋白質</div>
                  <div style={{ fontSize: 24, fontWeight: 700 }}>
                    {parsedResult.data.analysis.nutrients.protein}
                  </div>
                  <div style={{ fontSize: 12 }}>克</div>
                </div>
                
                <div style={nutrientCardStyle}>
                  <div style={{ fontSize: 12, opacity: 0.7 }}>碳水化合物</div>
                  <div style={{ fontSize: 24, fontWeight: 700 }}>
                    {parsedResult.data.analysis.nutrients.carbs}
                  </div>
                  <div style={{ fontSize: 12 }}>克</div>
                </div>
                
                <div style={nutrientCardStyle}>
                  <div style={{ fontSize: 12, opacity: 0.7 }}>脂肪</div>
                  <div style={{ fontSize: 24, fontWeight: 700 }}>
                    {parsedResult.data.analysis.nutrients.fat}
                  </div>
                  <div style={{ fontSize: 12 }}>克</div>
                </div>
              </div>
              
              {/* 其他營養素 */}
              <div style={{ 
                display: "grid", 
                gridTemplateColumns: "1fr 1fr", 
                gap: 8,
                marginBottom: 20,
                fontSize: 13
              }}>
                <div>膳食纖維：{parsedResult.data.analysis.nutrients.fiber || 0} 克</div>
                <div>糖：{parsedResult.data.analysis.nutrients.sugar || 0} 克</div>
                <div>鈉：{parsedResult.data.analysis.nutrients.sodium || 0} 毫克</div>
                <div>飽和脂肪：{parsedResult.data.analysis.nutrients.saturatedFat || 0} 克</div>
              </div>
              
              {/* 健康標籤 */}
              {parsedResult.data.analysis.healthTags && parsedResult.data.analysis.healthTags.length > 0 && (
                <div style={{ marginBottom: 16 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>
                    健康標籤
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {parsedResult.data.analysis.healthTags.map((tag: string, index: number) => (
                      <span key={index} style={{
                        padding: "4px 8px",
                        background: "rgba(0, 128, 0, 0.1)",
                        borderRadius: 12,
                        fontSize: 12,
                        color: "#2e7d32"
                      }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {/* 注意事項 */}
              {parsedResult.data.analysis.warnings && parsedResult.data.analysis.warnings.length > 0 && (
                <div style={{ 
                  background: "rgba(255, 165, 0, 0.1)", 
                  padding: 12, 
                  borderRadius: 8,
                  fontSize: 13,
                  border: "1px solid rgba(255, 165, 0, 0.3)",
                  marginBottom: 16
                }}>
                  <div style={{ fontWeight: 600, marginBottom: 8, color: "#ff8c00" }}>
                    ⚠️ 注意事項
                  </div>
                  <ul style={{ margin: 0, paddingLeft: 16 }}>
                    {parsedResult.data.analysis.warnings.map((warning: string, index: number) => (
                      <li key={index}>{warning}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              {/* DBSG 資訊 */}
              {parsedResult.data.analysis.dbsg && (
                <div style={{ 
                  background: "rgba(0, 0, 0, 0.02)", 
                  padding: 12, 
                  borderRadius: 8,
                  fontSize: 13,
                  marginBottom: 16
                }}>
                  <div style={{ fontWeight: 600, marginBottom: 8 }}>食物特性評分 (0-100)</div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                    <div>消化性：{parsedResult.data.analysis.dbsg.digestibility}</div>
                    <div>生物利用率：{parsedResult.data.analysis.dbsg.bioavailability}</div>
                    <div>飽足感：{parsedResult.data.analysis.dbsg.satiety}</div>
                    <div>升糖指數：{parsedResult.data.analysis.dbsg.glycemicIndex}</div>
                  </div>
                </div>
              )}
              
              {/* 原始 JSON 資料（可折疊） */}
              <details>
                <summary style={{ 
                  cursor: "pointer", 
                  fontSize: 14, 
                  color: "#666",
                  padding: "8px 0"
                }}>
                  查看完整 JSON 資料
                </summary>
                <pre style={{ 
                  whiteSpace: "pre-wrap", 
                  fontSize: 12,
                  background: "rgba(0,0,0,0.02)",
                  padding: 12,
                  borderRadius: 8,
                  marginTop: 8,
                  maxHeight: "300px",
                  overflow: "auto"
                }}>
                  {submitted}
                </pre>
              </details>
            </div>
          )}

          {/* 舊的顯示區域（如果沒有解析成功） */}
          {submitted && !parsedResult && (
            <div
              style={{
                marginTop: 16,
                padding: 14,
                borderRadius: 12,
                background: "rgba(0,0,0,0.04)",
              }}
            >
              <div style={{ fontWeight: 700, marginBottom: 6 }}>原始回應</div>
              <pre
                style={{
                  whiteSpace: "pre-wrap",
                  lineHeight: 1.6,
                  fontSize: 13,
                }}
              >
                {submitted}
              </pre>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
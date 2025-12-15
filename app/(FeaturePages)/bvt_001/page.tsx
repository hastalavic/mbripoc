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
      const res = await fetch("/api/bvt/parse", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: trimmed }),
      });

      const data = await res.json();

      if (!res.ok || !data.ok) {
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
          <h1 style={{ fontSize: 22, fontWeight: 700, margin: 0 }}>BVT 001</h1>
          <p style={{ margin: "8px 0 0", opacity: 0.8, lineHeight: 1.5 }}>
            請用一句話或一段話描述：你吃了什麼／補充了什麼／目前有什麼狀態。
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
            任意描述輸入
          </label>

          <textarea
            id="bvt-free-text"
            value={text}
            onChange={(e) => {
              const v = e.target.value;
              if (v.length <= maxChars) setText(v);
            }}
            placeholder="例如：雞腿便當一個，飯少一點；另外吃了維他命C 100mg。"
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
                {loading ? "送出中…" : "送出（⌘/Ctrl + Enter）"}
              </button>
            </div>
          </div>
          {error && (
            <div style={{ marginTop: 10, color: "crimson", fontSize: 13 }}>
              發生錯誤：{error}
            </div>
          )}

          {submitted && (
            <div
              style={{
                marginTop: 16,
                padding: 14,
                borderRadius: 12,
                background: "rgba(0,0,0,0.04)",
              }}
            >
              <div style={{ fontWeight: 700, marginBottom: 6 }}>你剛剛送出的內容</div>
              <pre
                style={{
                  whiteSpace: "pre-wrap",
                  lineHeight: 1.6,
                  fontSize: 13,
                }}
              >
                {submitted}
              </pre>
              <div style={{ marginTop: 10, fontSize: 12, opacity: 0.75 }}>
                下一步：把這段文字送到你的 Backend / GitHub Models 做結構化解析，再把結果回填到下方。
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

// app/design/widgets/ActualIntakeResult.widget.tsx

"use client";

import React from "react";
import type { IntakeAnalysis } from "@/app/_ai/types/IntakeAnalysisSchema.type";
import type { RegistryState_Food } from "@/app/_engine/registry/FD1.registry";

/* 🔑 Element Knowledge Base & Types */
import { ElementKnowledgeBase, ElementDefinition } from "@/app/_repository/ElementBase.constants";

/* ==================================================
 * Props
 * ================================================== */
type Props = {
  analysis: IntakeAnalysis;
  fd1: RegistryState_Food | null;
};

/* ==================================================
 * fmt
 * ================================================== */
function fmt(value?: number, maxDigits = 2) {
  if (typeof value !== "number") return "0";
  // 處理 JavaScript 浮點數精度問題
  const rounded = Number(Math.round(Number(value + 'e' + maxDigits)) + 'e-' + maxDigits);
  return String(rounded);
}

/* ==================================================
 * Styles
 * ================================================== */
const blockStyle: React.CSSProperties = { marginTop: 22 };
const titleStyle: React.CSSProperties = {
  fontWeight: 700,
  marginBottom: 8,
  color: "#333",
};

/* ==================================================
 * Category Renderer（核心）
 * ================================================== */
function renderCategory(
  title: string,
  categoryName: string,
  // 使用索引簽名解決介面不匹配問題
  values: { [key: string]: number | undefined } 
) {
  // ✨ 修正點 1：將 ElementKnowledgeBase 轉為陣列進行處理
  // 並且明確宣告 meta 為 ElementDefinition
  const entries = Object.entries(ElementKnowledgeBase).filter(
    ([_, meta]) => {
      const m = meta as ElementDefinition;
      return m.isVisible && m.Category === categoryName;
    }
  );

  if (entries.length === 0) return null;

  // 檢查是否有任何一個項目有值，若全空則不顯示標題
  const hasValue = entries.some(([key]) => values[key] !== undefined && values[key] !== null);
  if (!hasValue) return null;

  return (
    <div style={blockStyle}>
      <h4 style={titleStyle}>{title}</h4>
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {entries.map(([key, meta]) => {
          const m = meta as ElementDefinition;
          const value = values[key];
          
          if (value === undefined || value === null) return null;

          return (
            <li key={key} style={{ marginBottom: 4, fontSize: "0.9rem" }}>
              <span style={{ color: "#4CAF50", marginRight: 6 }}>•</span>
              <span>{m.DisplayName_zh}</span>
              {m.DisplayName_en && (
                <small style={{ color: "#999", marginLeft: 4 }}>({m.DisplayName_en})</small>
              )}
              ：<b style={{ color: "#333" }}>{fmt(value)}</b> 
              <span style={{ fontSize: "0.8rem", color: "#666", marginLeft: 4 }}>{m.Standard_Unit}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/* ==================================================
 * Component
 * ================================================== */
export default function ActualIntakeResultWidget({
  analysis,
  fd1,
}: Props) {
  if (!analysis || !fd1) return null;

  // ✨ 修正點 2：取得各分層數據，並加上型別斷言以符合 renderCategory 的索引簽名要求
  const nutrients = (fd1.nutrients || {}) as { [key: string]: number | undefined };
  const mbf = (fd1.mbf || {}) as { [key: string]: number | undefined };

  const components = Array.isArray(analysis.intake_components)
    ? analysis.intake_components.filter(Boolean)
    : [];

  return (
    <section
      style={{
        marginTop: 24,
        padding: 24,
        borderRadius: 16,
        background: "#fff",
        border: "1px solid #eaeaea",
        boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
      }}
    >
      <h3 style={{ marginTop: 0, color: "#2E7D32", borderBottom: "2px solid #E8F5E9", paddingBottom: 12 }}>
        📊 營養組成分析
      </h3>

      {/* ===== 基本資訊 ===== */}
      <div style={{ ...blockStyle, marginTop: 12, background: "#F9F9F9", padding: 12, borderRadius: 8 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
          <div><b>品名：</b>{analysis.intake_name}</div>
          <div><b>份量：</b>{analysis.serving_weight} g/ml</div>
          <div><b>類型：</b>{analysis.intake_type}</div>
          <div><b>狀態：</b>{analysis.intake_state}</div>
        </div>
      </div>

      {/* ===== 組成（標籤化顯示） ===== */}
      {components.length > 0 && (
        <div style={blockStyle}>
          <h4 style={titleStyle}>組成成分</h4>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {components.map((c) => (
              <span key={c} style={{ background: "#E8F5E9", color: "#2E7D32", padding: "4px 12px", borderRadius: 16, fontSize: "0.8rem", fontWeight: 500 }}>
                {c}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* ===== 營養數據自動化分組 ===== */}
      {/* ⚠️ Category 字串必須與各 .constants.ts 中的定義完全一致 */}
      {renderCategory("大型營養素", "Macro", nutrients)}
      {renderCategory("脂肪酸組成", "FattyAcids", nutrients)}
      {renderCategory("維生素", "Vitamins", nutrients)}
      {renderCategory("礦物質", "Minerals", nutrients)}
      {renderCategory("機能性成分 / 胺基酸", "Bioactives", nutrients)}
      
      {/* ===== 代謝負擔 (MBF) ===== */}
      {renderCategory("代謝負擔因子 (MBF)", "MBF", mbf)}

      {/* ===== 未知 / 無法估算 ===== */}
      {analysis._unknown && analysis._unknown.length > 0 && (
        <div style={{ ...blockStyle, borderTop: "1px dashed #FFCDD2", marginTop: 24, paddingTop: 16 }}>
          <h4 style={{ ...titleStyle, color: "#C62828" }}>⚠️ AI 無法確定的項目</h4>
          <div style={{ color: "#D32F2F", fontSize: "0.85rem", opacity: 0.8 }}>
            以下項目因資料不足或烹飪法複雜，AI 建議僅供參考或無法估算：
            <div style={{ marginTop: 8 }}>{analysis._unknown.join("、")}</div>
          </div>
        </div>
      )}
    </section>
  );
}
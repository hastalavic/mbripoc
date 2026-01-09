"use client";

import React, { useState } from "react";
import type { IntakeAnalysis } from "@/app/_ai/types/IntakeAnalysisSchema.type";
import type { RegistryState_Food } from "@/app/_engine/registry/FD1.registry";
import { ElementKnowledgeBase, ElementDefinition } from "@/app/_repository/ElementBase.constants";

/* ==================================================
 * Props & Types
 * ================================================== */
type Props = {
  analysis: IntakeAnalysis;
  fd1: RegistryState_Food | null;
};

/* ==================================================
 * Category Renderer (小數 1 位隱形對齊版)
 * ================================================== */
function renderSubCategory(categoryName: string, values: { [key: string]: number | undefined }) {
  // 1. 強制類型斷言，消除 ElementKnowledgeBase 的紅蚯蚓
  const entries = (Object.entries(ElementKnowledgeBase) as [string, ElementDefinition][]).filter(
    ([_, meta]) => meta.isVisible && meta.Category === categoryName
  );

  const validEntries = entries.filter(([key]) => {
    const val = values[key];
    return val !== undefined && val !== null && val >= 0.01;
  });

  if (validEntries.length === 0) return null;

  return (
    <div key={categoryName} style={{ marginTop: 12 }}>
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {validEntries.map(([key, meta]) => {
          const value = values[key] ?? 0;

          // 2. 現場處理數字拆解，避免外部函式型別推斷問題
          const formattedValue = Number(value.toFixed(1)); 
          const parts = formattedValue.toString().split(".");
          const integerPart = Number(parts[0]).toLocaleString(); // 加上千分位
          const decimalPart = parts[1] || "";

          return (
            <li key={key} style={{ 
              marginBottom: 10, 
              fontSize: "0.85rem", 
              display: "flex", 
              alignItems: "baseline", 
              justifyContent: "space-between" 
            }}>
              {/* 左側：名稱區 */}
              <div style={{ display: "flex", flex: 1, paddingRight: 8 }}>
                <span style={{ color: "#4CAF50", marginRight: 8 }}>•</span>
                <span style={{ color: "#444" }}>
                  {meta.DisplayName_zh}
                  <small style={{ color: "#999", marginLeft: 6 }}>{meta.DisplayName_en}</small>
                </span>
              </div>

              {/* 右側：數字與單位 (小數1位隱形對齊) */}
              <div style={{ display: "flex", alignItems: "baseline", flexShrink: 0 }}>
                <div style={{ 
                  display: "flex", 
                  justifyContent: "flex-end", 
                  minWidth: "75px", 
                  fontFamily: "monospace", 
                  fontVariantNumeric: "tabular-nums" 
                }}>
                  <b style={{ color: "#222", fontSize: "0.95rem" }}>{integerPart}</b>
                  <div style={{ width: "14px", textAlign: "left", color: "#222", fontSize: "0.95rem" }}>
                    {decimalPart ? `.${decimalPart}` : ""}
                  </div>
                </div>
                
                <span style={{ 
                  fontSize: "0.75rem", 
                  color: "#777", 
                  marginLeft: 8,
                  width: "50px", 
                  textAlign: "left"
                }}>
                  {meta.Standard_Unit}
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/* ==================================================
 * Main Component
 * ================================================== */
export default function ActualIntakeResultWidget({ analysis, fd1 }: Props) {
  if (!analysis || !fd1) return null;

  const nutrients = (fd1.nutrients || {}) as { [key: string]: number | undefined };
  const mbf = (fd1.mbf || {}) as { [key: string]: number | undefined };

  // ✨ 升級版 Accordion 組件
  const Accordion = ({ title, emoji, children, defaultOpen = false, activeColor = "#2E7D32" }: any) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
      <div style={{ 
        border: "1px solid #eee",
        borderRadius: "12px",
        marginBottom: "12px",
        overflow: "hidden",
        background: "#fff",
        borderColor: isOpen ? activeColor : "#eee",
        transition: "border-color 0.3s ease"
      }}>
        {/* 標題欄 */}
        <div
          onClick={() => setIsOpen(!isOpen)}
          style={{
            padding: "16px",
            cursor: "pointer",
            fontWeight: "bold",
            background: isOpen ? `${activeColor}10` : "#fcfcfc",
            color: isOpen ? activeColor : "#333",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            transition: "all 0.3s ease",
          }}
        >
          <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontSize: "1.2rem" }}>{emoji}</span>
            {title}
          </span>
          
          {/* 旋轉箭頭 */}
          <div style={{
            width: "24px",
            height: "24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "50%",
            background: isOpen ? activeColor : "#eee",
            color: isOpen ? "#fff" : "#999",
            transition: "all 0.3s ease",
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
          }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
        </div>

        {/* 內容區 */}
        <div style={{
          padding: "0 16px 16px 16px",
          borderTop: "1px solid #f9f9f9",
          display: isOpen ? "block" : "none",
          animation: "fadeIn 0.3s ease",
        }}>
          {children}
        </div>
      </div>
    );
  };

  return (
    <section style={{ marginTop: 24, padding: "0 10px" }}>
      <style>{`@keyframes fadeIn { from { opacity: 0; transform: translateY(-5px); } to { opacity: 1; transform: translateY(0); } }`}</style>

      <h3 style={{ color: "#2E7D32", paddingLeft: 14, marginBottom: 16 }}>📊 營養分析報告</h3>

      <Accordion title="營養概覽" emoji="🥗" defaultOpen={true} activeColor="#2E7D32">
        {renderSubCategory("Macronutrients", nutrients)}
        <div style={{ fontSize: "0.75rem", color: "#999", marginTop: 8, borderTop: "1px dashed #eee", paddingTop: 8 }}>
          💡 包含能量、蛋白質、總脂肪與碳水
        </div>
      </Accordion>

      <Accordion title="營養細節" emoji="🔍" activeColor="#0288D1">
        <h5 style={{ color: "#666", marginBottom: 0, marginTop: 15 }}>油脂分析</h5>
        {renderSubCategory("FattyAcids", nutrients)}
        <h5 style={{ color: "#666", marginBottom: 0, marginTop: 15 }}>微量元素</h5>
        {renderSubCategory("Vitamins", nutrients)}
        {renderSubCategory("Minerals", nutrients)}
        <h5 style={{ color: "#666", marginBottom: 0, marginTop: 15 }}>其他生物活性</h5>
        {renderSubCategory("AminoAcids", nutrients)}
        {renderSubCategory("Bioactives", nutrients)}
      </Accordion>

      <Accordion title="代謝負擔 (MBF)" emoji="⚠️" activeColor="#D32F2F">
        <p style={{ fontSize: "0.8rem", color: "#d32f2f", marginBottom: 10 }}>
          偵測影響身體發炎與代謝壓力的因子：
        </p>
        {renderSubCategory("MBF", mbf)}
      </Accordion>

      {analysis._unknown && analysis._unknown.length > 0 && (
        <div style={{ padding: "16px", borderRadius: "12px", background: "#FFF5F5", border: "1px solid #FED7D7", marginTop: 20 }}>
          <h4 style={{ margin: 0, color: "#C62828", fontSize: "0.9rem" }}>⚠️ 無法確定的項目</h4>
          <p style={{ color: "#D32F2F", fontSize: "0.8rem", marginTop: 4 }}>
            {analysis._unknown.join("、")}
          </p>
        </div>
      )}
    </section>
  );
}
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
 * Category Renderer
 * ================================================== */
function renderSubCategory(categoryName: string, values: { [key: string]: number | undefined }) {
  const entries = (Object.entries(ElementKnowledgeBase) as [string, ElementDefinition][]).filter(
    ([_, meta]) => meta.isVisible && meta.Category === categoryName
  );

  const validEntries = entries.filter(([key]) => (values[key] ?? 0) >= 0.01);

  if (validEntries.length === 0) return null;

  return (
    <div key={categoryName} style={{ marginTop: 12 }}>
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {validEntries.map(([key, meta]) => {
          const value = values[key] ?? 0;
          const formattedValue = Number(value.toFixed(1)); 
          const parts = formattedValue.toString().split(".");
          const integerPart = Number(parts[0]).toLocaleString(); 
          const decimalPart = parts[1] || "";

          return (
            <li key={key} style={{ 
              marginBottom: 10, 
              fontSize: "0.85rem", 
              display: "flex", 
              alignItems: "baseline", 
              justifyContent: "space-between" 
            }}>
              <div style={{ display: "flex", flex: 1, paddingRight: 8 }}>
                <span style={{ color: "#4CAF50", marginRight: 8 }}>•</span>
                <span style={{ color: "#444" }}>
                  {meta.DisplayName_zh}
                  <small style={{ color: "#999", marginLeft: 6 }}>{meta.DisplayName_en}</small>
                </span>
              </div>

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
          }}
        >
          <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontSize: "1.2rem" }}>{emoji}</span>
            {title}
          </span>
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

      {/* 📋 整合版基本資訊看板 */}
      <div style={{ 
        background: "#f8fafc", 
        borderRadius: "16px", 
        padding: "24px", 
        marginBottom: "24px",
        border: "1px solid #e2e8f0",
        boxShadow: "0 2px 4px rgba(0,0,0,0.02)"
      }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
          <div style={{ gridColumn: "1 / -1", borderBottom: "1px solid #e2e8f0", paddingBottom: "12px" }}>
            <p style={{ margin: 0, fontSize: "0.8rem", color: "#64748b", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.025em" }}>分析攝取物</p>
            <h2 style={{ fontSize: "1.75rem", color: "#1e293b", margin: "4px 0 0 0", fontWeight: 800 }}>
              {analysis.intake_name}
            </h2>
          </div>
          
          <div>
            <p style={{ margin: 0, fontSize: "0.8rem", color: "#64748b", fontWeight: 600 }}>品牌或來源</p>
            <p style={{ margin: "4px 0 0 0", color: "#334155", fontWeight: 700 }}>{analysis.intake_brand || "未知"}</p>
          </div>

          <div>
            <p style={{ margin: 0, fontSize: "0.8rem", color: "#64748b", fontWeight: 600 }}>攝取數量</p>
            <p style={{ margin: "4px 0 0 0", color: "#334155", fontWeight: 700 }}>{analysis.intake_count} {analysis.original_unit}</p>
          </div>

          <div style={{ gridColumn: "1 / -1", background: "#fff", padding: "12px 16px", borderRadius: "10px", border: "1px solid #edf2f7" }}>
            <p style={{ margin: 0, fontSize: "0.8rem", color: "#64748b", fontWeight: 600 }}>總份量</p>
            <p style={{ margin: "2px 0 0 0", color: "#1a73e8", fontSize: "1.4rem", fontWeight: 900 }}>
              {analysis.serving_weight} <span style={{ fontSize: "0.9rem", fontWeight: 600 }}>g / ml</span>
            </p>
          </div>

          {/* ✨ 組成物標籤 (已移至此處) */}
          {analysis.intake_components && analysis.intake_components.length > 0 && (
            <div style={{ gridColumn: "1 / -1", marginTop: "4px" }}>
              <p style={{ margin: "0 0 8px 0", fontSize: "0.8rem", color: "#64748b", fontWeight: 600 }}>🍱 食材組成明細</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {analysis.intake_components.map((compName, idx) => (
                  <span key={idx} style={{ 
                    background: "#e2e8f0", 
                    color: "#475569", 
                    padding: "4px 10px", 
                    borderRadius: "6px", 
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    border: "1px solid #cbd5e1"
                  }}>
                    {compName}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <h3 style={{ color: "#2E7D32", paddingLeft: 14, marginBottom: 16 }}>📊 營養分析報告</h3>

      {/* 🥗 1. 營養概覽 (已移除標籤，標籤已上移) */}
      <Accordion title="營養概覽" emoji="🥗" defaultOpen={true} activeColor="#2E7D32">
        {renderSubCategory("Macronutrients", nutrients)}
      </Accordion>

      {/* 🔍 2. 營養細節 */}
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

      {/* ⚠️ 3. 代謝負擔 */}
      <Accordion title="代謝負擔 (MBF)" emoji="⚠️" activeColor="#D32F2F">
        <p style={{ fontSize: "0.8rem", color: "#d32f2f", marginBottom: 10 }}>偵測影響身體發炎與代謝壓力的因子：</p>
        {renderSubCategory("MBF", mbf)}
      </Accordion>

      {/* ❌ 4. 無法確定項目 */}
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
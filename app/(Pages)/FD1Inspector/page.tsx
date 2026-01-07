"use client";

import { useMemo, useState } from "react";

import { FD1_SCHEMA } from "@/app/_engine/registry/FD1.schema";
import {
  EMPTY_MBRI_REGISTRY_STATE,
  type MBRIRegistryState,
} from "@/app/_engine/registry/FD1.registry";

// 🧪 Inspector 專用：模擬 task / compute
import { runComputeBMITask } from "@/app/_engine/tasks/BMI.task";
import { runActualIntakeScalerTask } from "@/app/_engine/tasks/ActualIntakeScaler.task";
import { buildMBFResults } from "@/app/_engine/computes/MBF/results/MBFresults";

/**
 * FD1 Inspector
 * ==================================================
 * 定位：
 * - ❌ 不是真實資料流
 * - ❌ 不與 BVT / Page 同步
 * - ✅ 用「假動作」驗證：
 *     哪些 task 一旦被執行，理論上可以接進 FD1
 *
 * 這是一個「離線驗線器（Offline Wiring Tester）」
 */
export default function FD1InspectorPage() {
  /* ==================================================
   * 🧪 Simulation Toggle（Inspector 專用）
   * ================================================== */
  const [enableSimulation, setEnableSimulation] = useState(false);

  /* ==================================================
   * 🧪 模擬接線快照（只在開啟時存在）
   * ================================================== */
  const fd1: MBRIRegistryState = useMemo(() => {
    if (!enableSimulation) {
      return EMPTY_MBRI_REGISTRY_STATE;
    }

    // --- BMI ---
    const bmiTaskOutput = runComputeBMITask({
      heightCm: 175,
      weightKg: 70,
    });

    // --- Nutrients ---
    const nutrientTaskOutput = runActualIntakeScalerTask(
      { vitC: 100, protein: 20, fat: 15, kcal: 250 },
      { actualWeight: 150 }
    );

    const nutrientVector =
      nutrientTaskOutput?.kind === "ACTUAL_INTAKE"
        ? nutrientTaskOutput.payload
        : {};

    // --- MBF ---
    const mbfPayload = buildMBFResults(
      { fac_mbf_oxl_fc: "processed", fac_mbf_oxl_ts: "frying" } as any,
      nutrientVector
    );

    return {
      ...EMPTY_MBRI_REGISTRY_STATE,

      individual: {
        bmi: bmiTaskOutput?.kind === "BMI" ? bmiTaskOutput.value : undefined,
      },

      nutrients:
        nutrientTaskOutput?.kind === "ACTUAL_INTAKE"
          ? nutrientTaskOutput.payload
          : undefined,

      mbf: mbfPayload,
    };
  }, [enableSimulation]);

  /* ==================================================
   * 📊 Render
   * ================================================== */
  return (
    <div
      style={{
        padding: "28px 16px",
        display: "flex",
        justifyContent: "center",
        fontFamily: "monospace",
      }}
    >
      <div style={{ width: "100%", maxWidth: 720 }}>
        {/* ===== Header ===== */}
        <header style={{ marginBottom: 16 }}>
          <h2
            style={{
              margin: 0,
              paddingBottom: 6,
              borderBottom: "2px solid #333",
            }}
          >
            🔍 FD1 Registry Inspector
          </h2>

          <div style={{ fontSize: 12, opacity: 0.7, marginTop: 6 }}>
            Offline wiring tester · 不代表實際系統狀態
          </div>
        </header>

        {/* ===== Simulation Toggle ===== */}
        <label
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 20,
            fontSize: 13,
            cursor: "pointer",
          }}
        >
          <input
            type="checkbox"
            checked={enableSimulation}
            onChange={(e) => setEnableSimulation(e.target.checked)}
          />
          🧪 啟用模擬接線（Inspector 專用）
        </label>

        {/* ===== Scopes ===== */}
        {Object.entries(FD1_SCHEMA).map(([scope, keys]) => {
          const scopeKey = scope as keyof MBRIRegistryState;
          const scopeValue = fd1[scopeKey];

          return (
            <section
              key={scope}
              style={{
                marginBottom: 20,
                padding: 14,
                backgroundColor: "#fafafa",
                borderRadius: 10,
                border: "1px solid #e5e5e5",
              }}
            >
              <h3
                style={{
                  margin: "0 0 10px 0",
                  fontSize: 13,
                  letterSpacing: 0.6,
                  textTransform: "uppercase",
                }}
              >
                {scope}
              </h3>

              {!scopeValue ? (
                <div
                  style={{
                    color: "#e67e22",
                    fontSize: 12,
                    marginBottom: 6,
                    fontWeight: 600,
                  }}
                >
                  ⚠️ scope 未建立（未接線）
                </div>
              ) : (
                <div
                  style={{
                    color: "#27ae60",
                    fontSize: 12,
                    marginBottom: 6,
                  }}
                >
                  ✅ scope 已建立
                </div>
              )}

              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {keys.map((key) => {
                  const value = scopeValue
                    ? (scopeValue as any)[key]
                    : undefined;

                  const isWired = value !== undefined;

                  return (
                    <li
                      key={key}
                      style={{
                        padding: "6px 0",
                        borderBottom: "1px solid #eee",
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: 12,
                      }}
                    >
                      <span style={{ color: isWired ? "#333" : "#aaa" }}>
                        {key}
                      </span>

                      {isWired ? (
                        <span style={{ color: "#27ae60", fontWeight: 600 }}>
                          ✅{" "}
                          {typeof value === "number"
                            ? value.toFixed(2)
                            : String(value)}
                        </span>
                      ) : (
                        <span style={{ color: "#e74c3c" }}>
                          ❌ 尚未聯通
                        </span>
                      )}
                    </li>
                  );
                })}
              </ul>
            </section>
          );
        })}
      </div>
    </div>
  );
}
// app/components/widgets/ActualIntakeResult.widget.tsx

"use client";

import React from "react";
import type { IntakeAnalysis } from "@/app/_ai/types/IntakeAnalysisSchema.type";
import type { NutrientVector } from "@/app/_engine/computes/tasks/ActualIntakeScaler.compute";
import type { MBFResults } from "@/app/_engine/computes/MBF/results/MBFresults";
import MBF_BASE from "@/app/_repository/Elements/MBFBase.constants";
import type { MBFKey } from "@/app/_repository/Elements/MBFBase.constants";


type Props = {
  analysis: IntakeAnalysis;
  actualIntake: NutrientVector;
  mbf: MBFResults;
};

/**
 * fmt
 * ==================================================
 * 顯示層格式化：
 * - 最多小數第 2 位
 * - 整數不補 .00
 */
function fmt(value?: number, maxDigits = 2) {
  if (typeof value !== "number") return "0";
  const rounded = Number(value.toFixed(maxDigits));
  return Number.isInteger(rounded) ? String(rounded) : String(rounded);
}

/**
 * 區塊樣式
 */
const blockStyle: React.CSSProperties = {
  marginTop: 22,
};

const titleStyle: React.CSSProperties = {
  fontWeight: 700,
  marginBottom: 8,
};

export default function ActualIntakeResultWidget({
  analysis,
  actualIntake,
  mbf,
}: Props) {
  if (!analysis || !actualIntake || !mbf) return null;

  const components = Array.isArray(analysis.intake_components)
    ? analysis.intake_components.filter(Boolean)
    : [];

  const oxlFc = (analysis as any).fac_mbf_oxl_fc;
  const oxlTs = (analysis as any).fac_mbf_oxl_ts;

  return (
    <section
      style={{
        marginTop: 24,
        padding: 20,
        borderRadius: 12,
        background: "rgba(0,128,0,0.05)",
        border: "1px solid rgba(0,128,0,0.2)",
      }}
    >
      <h3 style={{ marginTop: 0 }}>分析結果（實際攝取量）</h3>

      {/* ===== 基本資訊 ===== */}
      <div style={{ ...blockStyle, marginTop: 12 }}>
        <div><b>名稱：</b>{analysis.intake_name}</div>
        <div><b>實際份量：</b>{analysis.serving_weight} g / ml</div>
        <div><b>類型：</b>{analysis.intake_type}</div>
        <div><b>狀態：</b>{analysis.intake_state}</div>
      </div>

      {/* ===== 組成（語意） ===== */}
      {components.length > 0 && (
        <div style={blockStyle}>
          <h4 style={titleStyle}>組成（語意拆解）</h4>
          <ul>
            {components.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>
      )}

      {/* ===== 巨量營養素 ===== */}
      <div style={blockStyle}>
        <h4 style={titleStyle}>巨量營養素</h4>
        <ul>
          <li>熱量：{fmt(actualIntake.NU_KCAL)} kcal</li>
          <li>碳水：{fmt(actualIntake.NU_CARB)} g</li>
          <li>蛋白質：{fmt(actualIntake.NU_PRO)} g</li>
          <li>脂肪：{fmt(actualIntake.NU_FAT)} g</li>
          <li>膳食纖維：{fmt(actualIntake.NU_FBR)} g</li>
          <li>水分：{fmt(actualIntake.NU_WATER)} g</li>
        </ul>
      </div>

      {/* ===== 脂肪酸 ===== */}
      <div style={blockStyle}>
        <h4 style={titleStyle}>脂肪酸</h4>
        <ul>
          <li>Omega-3：{fmt(actualIntake.FA_OM3)} mg</li>
          <li>Omega-6：{fmt(actualIntake.FA_OM6)} mg</li>
        </ul>
      </div>

      {/* ===== 維生素 ===== */}
      <div style={blockStyle}>
        <h4 style={titleStyle}>維生素</h4>
        <ul>
          <li>維生素 A：{fmt(actualIntake.VIT_A)} mcg</li>
          <li>維生素 B1：{fmt(actualIntake.VIT_B1)} mg</li>
          <li>維生素 B2：{fmt(actualIntake.VIT_B2)} mg</li>
          <li>維生素 B6：{fmt(actualIntake.VIT_B6)} mg</li>
          <li>維生素 C：{fmt(actualIntake.VIT_C)} mg</li>
          <li>維生素 E：{fmt(actualIntake.VIT_E)} mg</li>
          <li>膽鹼（Choline）：{fmt(actualIntake.VIT_LK_CHOL)} mg</li>
        </ul>
      </div>

      {/* ===== 礦物質 ===== */}
      <div style={blockStyle}>
        <h4 style={titleStyle}>礦物質</h4>
        <ul>
          <li>鉀：{fmt(actualIntake.MIN_K)} mg</li>
          <li>鎂：{fmt(actualIntake.MIN_MG)} mg</li>
          <li>鋅：{fmt(actualIntake.MIN_ZN)} mg</li>
          <li>硒：{fmt(actualIntake.MIN_SE)} μg</li>
        </ul>
      </div>

      {/* ===== 胺基酸 ===== */}
      <div style={blockStyle}>
        <h4 style={titleStyle}>胺基酸</h4>
        <ul>
          <li>甘胺酸（Glycine）：{fmt(actualIntake.AA_GLY)} mg</li>
          <li>NAC（D）：{fmt(actualIntake.AA_D_NAC)} mg</li>
        </ul>
      </div>

      {/* ===== MBF（含 OXL） ===== */}
      <div style={blockStyle}>
        <h4 style={titleStyle}>代謝負擔因子（MBF）</h4>
        <ul>
          {(Object.keys(MBF_BASE) as MBFKey[]).map((key) => {
            const meta = MBF_BASE[key].element;

            // OXL 是計算型，其餘為 passthrough
            const value =
              key === "MBF_OXL"
                ? mbf.oxl
                : (actualIntake as any)[key] ?? 0;

            const label = meta.DisplayName_en
              ? `${meta.DisplayName_zh}（${meta.DisplayName_en}）`
              : meta.DisplayName_zh;

            return (
              <li key={key}>
                {label}：{fmt(value, 0)} {meta.Standard_Unit}
              </li>
            );
          })}
        </ul>
      </div>

      {/* ===== Unknown ===== */}
      {analysis._unknown && analysis._unknown.length > 0 && (
        <div style={blockStyle}>
          <h4 style={titleStyle}>無法合理估算的欄位</h4>
          <ul>
            {analysis._unknown.map((k) => (
              <li key={k}>{k}</li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
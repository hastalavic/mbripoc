// app/%28pages%29/PSP/components/PSPDisplayBlock.component.tsx

"use client";

import React from "react";
import { ProfileFormState } from "@/app/(pages)/PSP/utils/PSPForm.types";
import { computeTotalRequirement } from "@/app/_engine/computes/personalize/RequirementAggregator.compute";

interface PSPSummaryAndDebugProps {
  form: ProfileFormState;
  bmi: number | null;
}

export default function PSPSummaryAndDebug({ form, bmi }: PSPSummaryAndDebugProps) {
  const totalReq = computeTotalRequirement(form);
  const { macros, micros } = totalReq;

  const scoreToText = (value: string | number) => {
    if (value === "") return "尚未填寫";
    const num = Number(value);
    const table = ["很差", "不太好", "正常", "還不錯", "很好"];
    return table[num - 1] ?? "尚未填寫";
  };

  const canCompute = form.weightKg !== "" && form.age !== "" && form.sex !== "";

  return (
    <section className="space-y-4">
      <div className="rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white/70 dark:bg-zinc-900/60 p-4 space-y-2">
        <h2 className="text-lg font-semibold">PSP 摘要（預覽）</h2>
        <p className="text-xs text-zinc-500">
          這裡先只是「個人檔案的摘要」。之後會把這些參數丟進 PSP_compute，算出 NRR / UL / MBFST / BDRST。
        </p>
        <div className="mt-2 space-y-1 text-base">
          <div>
            <span className="text-zinc-500 mr-2">對象：</span>
            <span>
              {form.nickname
                ? `${form.nickname}（${
                    form.sex === "male"
                      ? "男"
                      : form.sex === "female"
                      ? "女"
                      : "其他"
                  }）`
                : form.sex === "male"
                ? "未命名個體（男）"
                : form.sex === "female"
                ? "未命名個體（女）"
                : "未命名個體"}
            </span>
          </div>

          <div>
            <span className="text-zinc-500 mr-2">年齡：</span>
            <span>{form.age ? `${form.age} 歲` : "尚未填寫"}</span>
          </div>

          <div>
            <span className="text-zinc-500 mr-2">身高 / 體重：</span>
            <span>
              {form.heightCm && form.weightKg
                ? `${form.heightCm} cm / ${form.weightKg} kg`
                : "尚未完整填寫"}
            </span>
          </div>

          <div>
            <span className="text-zinc-500 mr-2">BMI：</span>
            <span>{bmi ?? "—"}</span>
          </div>

          <div>
            <span className="text-zinc-500 mr-2">生殖狀態：</span>
            <span>
              {form.reproductiveStatus === ""
                ? "尚未填寫"
                : form.reproductiveStatus === "none"
                ? "非懷孕／非哺乳"
                : form.reproductiveStatus === "pregnant_1"
                ? "懷孕（1–12 週）"
                : form.reproductiveStatus === "pregnant_2"
                ? "懷孕（13–27 週）"
                : form.reproductiveStatus === "pregnant_3"
                ? "懷孕（28 週後）"
                : "哺乳期"}
            </span>
          </div>

          <div>
            <span className="text-zinc-500 mr-2">活動量：</span>
            <span>
              {scoreToText(form.activityScore)}
            </span>
          </div>

          <div>
            <span className="text-zinc-500 mr-2">睡眠品質：</span>
            <span>
              {scoreToText(form.sleepQuality)}
            </span>
          </div>

          <div>
            <span className="text-zinc-500 mr-2">主觀壓力：</span>
            <span>
              {scoreToText(form.stressLevel)}
            </span>
          </div>

          <div className="mt-1 text-base text-zinc-500">
            器官健康狀態：
            <div className="mt-1 text-base">
              腎功能：{scoreToText(form.kidneyScore)}
            </div>
            <div className="text-base">
              肝功能：{scoreToText(form.liverScore)}
            </div>
          </div>
          {!canCompute ? (
            <div className="mt-4 pt-3 border-t border-zinc-300 dark:border-zinc-700">
              <h3 className="text-lg font-semibold mb-2">每日營養需求（RI）</h3>
              <p className="text-zinc-500 text-sm">請先完成「性別、年齡、體重」資料填寫。</p>
            </div>
          ) : (
            <div className="mt-4 pt-3 border-t border-zinc-300 dark:border-zinc-700">
              <h3 className="text-lg font-semibold mb-2">每日營養需求（RI）</h3>

              <div className="space-y-1 text-base">
                <div>
                  <span className="text-zinc-500 mr-2">蛋白質：</span>
                  <span>{macros.protein.toFixed(1)} g</span>
                </div>

                <div>
                  <span className="text-zinc-500 mr-2">脂肪：</span>
                  <span>{macros.fat.toFixed(1)} g</span>
                </div>

                <div>
                  <span className="text-zinc-500 mr-2">碳水化合物：</span>
                  <span>{macros.carbs.toFixed(1)} g</span>
                </div>

                <div>
                  <span className="text-zinc-500 mr-2">水分：</span>
                  <span>{macros.hydration.toFixed(0)} ml</span>
                </div>
              </div>

              <div className="mt-3">
                <h4 className="text-md font-semibold mb-1">微量營養素：</h4>
                <ul className="text-sm space-y-1">
                  {Object.entries(micros).map(([key, val]) => (
                    <li key={key}>
                      <span className="text-zinc-500 mr-2">{key}：</span>
                      <span>
                        {val.RI ?? "—"} {val.unit}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
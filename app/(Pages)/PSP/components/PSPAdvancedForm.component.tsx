// app/%28pages%29/PSP/components/PSPAdvancedForm.component.tsx

"use client";

import React from "react";
import SelectField from "@/app/components/ui/Fields/SelectField";
import { ProfileFormState } from "../utils/PSPForm.types";

interface PSPFormProps {
  form: ProfileFormState;
  update: (key: keyof ProfileFormState, value: any) => void;
}

export default function PSPForm({ form, update }: PSPFormProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold">進階生理狀態設定</h2>

      {/* 活動量（五階制） */}
      <SelectField
        label="日常活動量（1–5）"
        value={form.activityScore}
        onChange={(v) =>
          update(
            "activityScore",
            v === "" ? "" : Number(v)
          )
        }
        options={[
          { label: "（未選擇）", value: "" },
          { label: "1 很差", value: 1 },
          { label: "2 不太好", value: 2 },
          { label: "3 正常", value: 3 },
          { label: "4 還不錯", value: 4 },
          { label: "5 優異", value: 5 },
        ]}
      />

      {/* 睡眠品質（五階制） */}
      <SelectField
        label="睡眠品質（1–5）"
        value={form.sleepQuality}
        onChange={(v) =>
          update(
            "sleepQuality",
            v === "" ? "" : Number(v)
          )
        }
        options={[
          { label: "（未選擇）", value: "" },
          { label: "1 很差", value: 1 },
          { label: "2 不太好", value: 2 },
          { label: "3 普通", value: 3 },
          { label: "4 還不錯", value: 4 },
          { label: "5 很好", value: 5 },
        ]}
      />

      {/* 主觀壓力（五階制） */}
      <SelectField
        label="主觀壓力等級（1–5）"
        value={form.stressLevel}
        onChange={(v) =>
          update(
            "stressLevel",
            v === "" ? "" : Number(v)
          )
        }
        options={[
          { label: "（未選擇）", value: "" },
          { label: "1 很差", value: 1 },
          { label: "2 不太好", value: 2 },
          { label: "3 正常", value: 3 },
          { label: "4 還不錯", value: 4 },
          { label: "5 優異", value: 5 },
        ]}
      />

      {/* 器官狀態 */}
      <SelectField
        label="腎功能健康（1–5）"
        value={form.kidneyScore}
        onChange={(v) =>
          update(
            "kidneyScore",
            v === "" ? "" : Number(v)
          )
        }
        options={[
          { label: "（未選擇）", value: "" },
          { label: "1 很差", value: 1 },
          { label: "2 不太好", value: 2 },
          { label: "3 普通", value: 3 },
          { label: "4 還不錯", value: 4 },
          { label: "5 優異", value: 5 },
        ]}
      />

      <SelectField
        label="肝功能健康（1–5）"
        value={form.liverScore}
        onChange={(v) =>
          update(
            "liverScore",
            v === "" ? "" : Number(v)
          )
        }
        options={[
          { label: "（未選擇）", value: "" },
          { label: "1 很差", value: 1 },
          { label: "2 不太好", value: 2 },
          { label: "3 普通", value: 3 },
          { label: "4 還不錯", value: 4 },
          { label: "5 優異", value: 5 },
        ]}
      />
    </div>
  );
}

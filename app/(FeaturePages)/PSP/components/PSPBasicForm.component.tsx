"use client";

import React from "react";
// 匯入所有 Fields (請確認路徑是否正確，這裡使用您 Page 中假設的路徑)
import InputField from "@/app/components/ui/Fields/InputField";
import NumberField from "@/app/components/ui/Fields/NumberField";
import SelectField from "@/app/components/ui/Fields/SelectField";

import { ProfileFormState, Sex } from "@/app/(FeaturePages)/PSP/utils/PSPForm.types";

// 定義組件需要的屬性 (form 狀態、更新函式、重置函式)
interface ProfileSettingsFormProps {
  form: ProfileFormState;
  update: <K extends keyof ProfileFormState>(key: K, value: ProfileFormState[K]) => void;
  resetProfile: () => void;
  updateNumber: (key: keyof ProfileFormState, raw: string) => void;
}

export default function ProfileSettingsForm({
  form,
  update,
  resetProfile,
  updateNumber,
}: ProfileSettingsFormProps) {
  // Auto-set reproductiveStatus when male (must be in useEffect to avoid setState during render)
  const isMale = form.sex === "male";

  React.useEffect(() => {
    if (form.sex === "male" && form.reproductiveStatus !== "none") {
      update("reproductiveStatus", "none");
    }
  }, [form.sex]);
  // 將 BioSetupPage 中 左側 <section> 裡的內容貼到這裡
  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">基本資料</h2>
        {/* 重置按鈕暫時隱藏 */}
        {false && (
          <button
            type="button"
            onClick={resetProfile}
            className="text-xs px-3 py-1 rounded-full border border-zinc-300 hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
          >
            重置為預設
          </button>
        )}
      </div>

      <div className="space-y-4">
        {/* 暱稱 */}
        <InputField
          label="暱稱 / 代號（選填）"
          value={form.nickname}
          onChange={(v) => update("nickname", v)} // <-- 使用傳入的 update
          placeholder="例如：Javi、Case A-01 ..."
        />

        {/* 年齡 & 性別 */}
        <div className="grid grid-cols-2 gap-4">
          <NumberField
            label="年齡（歲）"
            value={form.age}
            // ⚠️ 這裡使用 updateNumber 處理數字輸入
            onChange={(raw) => updateNumber("age", String(raw))} 
            min={0}
            max={120}
          />
          <SelectField
            label="生理性別"
            value={form.sex}
            onChange={(v) => update("sex", v as Sex)}
            options={[
              { value: "", label: "" },
              { value: "male", label: "男性" },
              { value: "female", label: "女性" },
            ]}
          />
        </div>

        {/* 身高 / 體重 */}
        <div className="grid grid-cols-2 gap-4">
          <NumberField
            label="身高（cm）"
            value={form.heightCm}
            onChange={(raw) => updateNumber("heightCm", String(raw))} // <-- 使用 updateNumber
            min={0}
            max={250}
          />
          <NumberField
            label="體重（kg）"
            value={form.weightKg}
            onChange={(raw) => updateNumber("weightKg", String(raw))} // <-- 使用 updateNumber
            min={0}
            max={300}
          />
        </div>

        {/* 生殖狀態 / 體脂率 */}
        <div className="grid grid-cols-2 gap-4">
          <SelectField
            label="懷孕 / 哺乳"
            value={form.reproductiveStatus}
            onChange={(v) =>
              update(
                "reproductiveStatus",
                v as ProfileFormState["reproductiveStatus"]
              )
            }
            options={[
              { value: "", label: "" },
              { value: "none", label: "非懷孕／非哺乳" },
              { value: "pregnant_1", label: "懷孕（1–12 週）" },
              { value: "pregnant_2", label: "懷孕（13–27 週）" },
              { value: "pregnant_3", label: "懷孕（28 週後）" },
              { value: "lactating", label: "哺乳期" },
            ]}
            disabled={isMale}
          />
          <NumberField
            label="體脂率（%）"
            value={form.bodyFatPercentage}
            onChange={(raw) => updateNumber("bodyFatPercentage", String(raw))}
            min={0}
            max={60}
            step={0.1}
          />
        </div>
      </div>
    </section>
  );
}
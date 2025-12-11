"use client";

import MBRI, { ProfileFormState, defaultProfile } from "@/app/Barrel";
import { useState } from "react";

export default function BioSetupPage() {
  const [form, setForm] = useState<ProfileFormState>(defaultProfile);
  const [pspTimestamp, setPspTimestamp] = useState<string>("");

  MBRI.usePSPLocalStorage(form, setForm, defaultProfile);

  const { update, updateNumber, resetProfile } = MBRI.usePSPForm(form, setForm);

  const bmi = MBRI.computeBMI(form.heightCm, form.weightKg);

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 py-4">

        <MBRI.PageTitleBlock
          title="PSP 個人體質設定"
          description="這裡只負責定義你的身體基本參數。系統會以此作為 PSP 個體化計算的輸入來源（之後會丟入 PSP_compute）。"
        />

        <div className="grid grid-cols-1 md:grid-cols-[35%_65%] gap-8">

          {/* 左欄：基本資料 + PSPForm */}
          <div className="space-y-6">
            <MBRI.DateTimePicker
              label="生理狀態記錄時間"
              value={pspTimestamp}
              onChange={setPspTimestamp}
            />
            <MBRI.ProfileSettingsForm
              form={form}
              update={update}
              updateNumber={updateNumber}
              resetProfile={resetProfile}
            />
            <MBRI.PSPForm
              form={form}
              update={update}
            />
            <MBRI.ButtonSavePSP
              form={form}
              timestamp={pspTimestamp}
            />
          </div>

          {/* 右欄：Debug + Summary */}
          <div className="space-y-6">
            <MBRI.MBRIDebugPanel form={form} />
            <MBRI.PSPSummaryAndDebug form={form} bmi={bmi} />
          </div>

        </div>
      </main>
      <MBRI.Spacing size={50} />
    </div>
  );
}
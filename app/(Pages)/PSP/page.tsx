// app/(Pages)/PSP/page.tsx

"use client";

import MBRI, { ProfileFormState, defaultProfile } from "@/app/Barrel";
import { useState } from "react";
import ButtonStartPointStateGenerator from "@/app/(Pages)/PSP/components/ButtonStartPointStateGenerator.component";

export default function BioSetupPage() {
  const [form, setForm] = useState<ProfileFormState>(defaultProfile);
  const [pspTimestamp, setPspTimestamp] = useState<string>("");
  const [startPointTimestamp, setStartPointTimestamp] = useState<string>("");

  /** * 1. 處理本地儲存邏輯 
   * 從中解構出 updateOfficialSnapshot，用來在按下儲存鈕時更新正式快照
   */
  const { 
    updateOfficialSnapshot, 
    reset: resetLocalStorage 
  } = MBRI.usePSPLocalStorage(form, setForm, defaultProfile);

  /** * 2. 處理表單更新邏輯 
   */
  const { update, updateNumber, resetProfile } = MBRI.usePSPForm(form, setForm);

  /** * 3. 計算即時 BMI 預覽 
   */
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
            
            {/* 生理狀態儲存區塊 */}
            <div className="border border-zinc-300 rounded-lg p-4 space-y-4">
              <MBRI.DateTimePicker
                label="生理狀態記錄時間"
                value={pspTimestamp}
                onChange={setPspTimestamp}
              />
              {/* 關鍵修正：傳入 onSaved 回呼。
                這會讓按鈕在完成資料庫寫入後，同步執行 localStorage 的正式快照更新。
              */}
              <MBRI.ButtonSavePSP
                form={form}
                timestamp={pspTimestamp}
                onSaved={() => {
                  updateOfficialSnapshot();
                  alert("✅ 生理基準已正式更新！DBSG 繪圖基準已同步。");
                }}
              />
            </div>

            {/* 初始存量生成區塊 */}
            <div className="space-y-4 border border-zinc-300 rounded-lg p-4">
              <MBRI.DateTimePicker
                label="初始存量時間"
                value={startPointTimestamp}
                onChange={setStartPointTimestamp}
              />
              <ButtonStartPointStateGenerator
                form={form}
                timestamp={startPointTimestamp}
              />
            </div>
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
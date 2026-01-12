"use client";

import MBRI, { ProfileFormState, defaultProfile } from "@/app/Barrel";
import { useState } from "react";
import ButtonStartPointStateGenerator from "@/app/(Pages)/PSP/components/ButtonStartPointStateGenerator.component";
import useStartPointHistory from "@/app/(Pages)/PSP/hooks/useStartPointHistory.hook";

export default function BioSetupPage() {
  const [form, setForm] = useState<ProfileFormState>(defaultProfile);
  const [pspTimestamp, setPspTimestamp] = useState<string>("");
  const [startPointTimestamp, setStartPointTimestamp] = useState<string>("");

  // ⭐ 新增：控制區塊展開/收合的狀態
  const [isPspFormOpen, setIsPspFormOpen] = useState(false);
  const [isMonitorOpen, setIsMonitorOpen] = useState(true); // 數據監控預設展開

  const { updateOfficialSnapshot } = MBRI.usePSPLocalStorage(form, setForm, defaultProfile);
  const { history } = useStartPointHistory();
  const { update, updateNumber, resetProfile } = MBRI.usePSPForm(form, setForm);
  const bmi = MBRI.computeBMI(form.heightCm, form.weightKg);

  const hasNoT0 = history.length === 0;
  const isDev = process.env.NODE_ENV === "development";

  // 樣式定義
  const cardStyle: React.CSSProperties = {
    background: "#ffffff", borderRadius: "16px", padding: "24px", 
    marginBottom: "20px", border: "1px solid #e2e8f0", boxShadow: "0 2px 4px rgba(0,0,0,0.02)"
  };
  const sectionLabelStyle: React.CSSProperties = {
    fontSize: "0.8rem", color: "#64748b", fontWeight: 600, 
    textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "12px",
    display: "flex", alignItems: "center", gap: "8px",
    cursor: "pointer", // 滑鼠移上去顯示手指
    userSelect: "none"  // 防止快速點擊時選取到文字
  };

  return (
    <div className="min-h-screen" style={{ background: "#fcfcfc" }}>
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div style={{ marginBottom: "32px" }}>
          <h1 style={{ fontSize: "1.8rem", color: "#1e293b", fontWeight: 800 }}>👤 PSP 個人體質設定</h1>
          <p style={{ color: "#64748b", marginTop: "8px" }}>系統會以此作為個體化計算的輸入來源。</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[40%_60%] gap-8">
          <div className="space-y-6">
            <div style={cardStyle}>
              <div style={sectionLabelStyle}>🧬 基本生理參數</div>
              <MBRI.ProfileSettingsForm form={form} update={update} updateNumber={updateNumber} resetProfile={resetProfile} />
            </div>

            {/* 🛠️ PSP 進階模型：加入點擊切換邏輯 */}
            <div style={cardStyle}>
              <div 
                style={sectionLabelStyle} 
                onClick={() => setIsPspFormOpen(!isPspFormOpen)}
              >
                <span>{isPspFormOpen ? "▼" : "▶"} ⚙️ PSP 進階模型參數</span>
                <span style={{ fontSize: "0.7rem", color: "#94a3b8", fontWeight: 400 }}>{isPspFormOpen ? "(點擊收合)" : "(點擊設定詳細參數)"}</span>
              </div>
              {isPspFormOpen && (
                <div style={{ marginTop: "16px", borderTop: "1px solid #f1f5f9", paddingTop: "16px" }}>
                  <MBRI.PSPForm form={form} update={update} />
                </div>
              )}
            </div>
            
            {/* --- 核心邏輯切換區 --- */}
            {hasNoT0 ? (
              <div style={{ ...cardStyle, border: "2px solid #2E7D32", background: "#f0fdf4" }}>
                <div style={{ ...sectionLabelStyle, color: "#166534", cursor: "default" }}>✨ 第一步：建立初始標定 (T0)</div>
                <p style={{ fontSize: "0.85rem", color: "#166534", marginBottom: "16px" }}>尚未建立生理基準。請先設定「初始存量時間」。</p>
                <div style={{ background: "#fff", padding: "16px", borderRadius: "12px", border: "1px solid #dcfce7", marginBottom: "16px" }}>
                  <MBRI.DateTimePicker label="初始存量標定時間" value={startPointTimestamp} onChange={setStartPointTimestamp} />
                </div>
                <ButtonStartPointStateGenerator form={form} timestamp={startPointTimestamp} />
              </div>
            ) : (
              <div style={{ ...cardStyle, background: "#f8fafc", borderColor: "#cbd5e1" }}>
                <div style={{ ...sectionLabelStyle, cursor: "default" }}>🔄 生理狀態定期更新 (Tn)</div>
                <p style={{ fontSize: "0.85rem", color: "#64748b", marginBottom: "16px" }}>初始基準已建立。若數據有變動，請儲存正式快照。</p>
                <div style={{ background: "#fff", padding: "16px", borderRadius: "12px", border: "1px solid #edf2f7", marginBottom: "16px" }}>
                  <MBRI.DateTimePicker label="生理狀態記錄時間" value={pspTimestamp} onChange={setPspTimestamp} />
                </div>
                <MBRI.ButtonSavePSP
                  form={form}
                  timestamp={pspTimestamp}
                  onSaved={() => {
                    updateOfficialSnapshot();
                    alert("✅ 生理基準已正式更新！");
                  }}
                />
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div style={{ ...cardStyle, background: "linear-gradient(135deg, #2E7D32 0%, #1B5E20 100%)", color: "#fff", border: "none" }}>
              <div style={{ ...sectionLabelStyle, color: "rgba(255,255,255,0.7)", cursor: "default" }}>📊 即時狀態</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: "12px" }}>
                <span style={{ fontSize: "2.8rem", fontWeight: 900 }}>{bmi}</span>
                <span style={{ fontSize: "1.1rem", opacity: 0.9 }}>BMI</span>
              </div>
            </div>

            {/* 🔍 數據監控：同樣加入收合功能 */}
            <div style={cardStyle}>
              <div 
                style={sectionLabelStyle} 
                onClick={() => setIsMonitorOpen(!isMonitorOpen)}
              >
                <span>{isMonitorOpen ? "▼" : "▶"} 🔍 數據監控</span>
              </div>
              {isMonitorOpen && (
                <div style={{ marginTop: "16px", borderTop: "1px solid #f1f5f9", paddingTop: "16px" }}>
                  <MBRI.PSPSummaryAndDebug form={form} bmi={bmi} />
                </div>
              )}
            </div>

            {isDev && (
              <div style={{ opacity: 0.5, border: "1px dashed #94a3b8", padding: "16px", borderRadius: "16px" }}>
                <div style={{ ...sectionLabelStyle, cursor: "default" }}>🛠️ 核心面板 (Debug Only)</div>
                <MBRI.MBRIDebugPanel form={form} />
              </div>
            )}
          </div>
        </div>
      </main>
      <MBRI.Spacing size={50} />
    </div>
  );
}
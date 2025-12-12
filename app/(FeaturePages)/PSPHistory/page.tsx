"use client";

import { useEffect, useState } from "react";
import { LogPhysioDynamic, resetPhysioLog } from "@/app/_repository/PSPRecorder.db";

export default function PSPHistoryPage() {
  const [logs, setLogs] = useState<any[]>([]);

  // -----------------------------
  // 讀取 localStorage 的紀錄
  // -----------------------------
  useEffect(() => {
    const stored = localStorage.getItem("psp_physio_log_v1");

    if (stored) {
      try {
        setLogs(JSON.parse(stored));
      } catch (e) {
        console.error("無法解析歷史紀錄");
      }
    }
  }, []);

  const [startPoints, setStartPoints] = useState<any[]>([]);
  useEffect(() => {
    const stored = localStorage.getItem("psp_startpoint_history_v1");
    if (stored) {
      try { setStartPoints(JSON.parse(stored)); } catch {}
    }
  }, []);

  // -----------------------------
  // UTC → 本地時間（台北）
  // -----------------------------
  const formatDate = (ts: string) => {
    const d = new Date(ts);
    return d.toLocaleString("zh-TW", {
      hour12: false,
      timeZone: "Asia/Taipei",
    });
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">生理狀態紀錄</h1>

      {logs.length === 0 && (
        <p className="text-zinc-500">目前沒有任何生理紀錄。</p>
      )}

      <h2 className="text-xl font-semibold mt-8">初始存量紀錄</h2>
      {startPoints.length === 0 && (
        <p className="text-zinc-500">目前沒有任何初始存量紀錄。</p>
      )}
      <div className="space-y-4">
        {startPoints.map((sp, index) => (
          <div key={sp.id || index} className="border border-zinc-300 dark:border-zinc-700 rounded-lg p-4">
            <div className="text-sm text-zinc-500 mb-2">
              {formatDate(sp.timestamp)}
            </div>
            <pre className="text-xs whitespace-pre-wrap">
              {JSON.stringify(sp, null, 2)}
            </pre>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        {logs.map((entry, index) => {
          const p = entry.pspState ?? {}; // 👈 保護層，避免 undefined

          return (
            <div
              key={entry.id || index}
              className="border border-zinc-300 dark:border-zinc-700 rounded-lg p-4"
            >
              <div className="text-sm text-zinc-500 mb-2">
                {formatDate(entry.timestamp)}
              </div>

              <div className="space-y-1">
                <p>
                  <span className="font-medium">性別：</span>
                  {p.sex ?? "未填寫"}
                </p>

                <p>
                  <span className="font-medium">年齡：</span>
                  {p.age ?? "未填寫"}
                </p>

                <p>
                  <span className="font-medium">身高：</span>
                  {p.heightCm ?? "-"} cm
                </p>

                <p>
                  <span className="font-medium">體重：</span>
                  {p.weightKg ?? "-"} kg
                </p>

                <p>
                  <span className="font-medium">BMI：</span>
                  {p.bmiValue ?? "未計算"}
                </p>

                <p>
                  <span className="font-medium">腎功能：</span>
                  {p.kidneyScore ?? "-"}
                </p>

                <p>
                  <span className="font-medium">肝功能：</span>
                  {p.liverScore ?? "-"}
                </p>

                <p>
                  <span className="font-medium">睡眠品質：</span>
                  {p.sleepQuality ?? "-"}
                </p>

                <p>
                  <span className="font-medium">活動量：</span>
                  {p.activityScore ?? "-"}
                </p>

                <p>
                  <span className="font-medium">壓力等級：</span>
                  {p.stressLevel ?? "-"}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {logs.length > 0 && (
        <button
          onClick={() => {
            resetPhysioLog();
            setLogs([]);
          }}
          className="mt-6 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
        >
          清空所有紀錄
        </button>
      )}
    </div>
  );
}
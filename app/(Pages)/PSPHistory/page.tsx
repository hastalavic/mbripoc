"use client";

import { useEffect, useState } from "react";
import { resetPhysioLog } from "@/app/_repository/PSPRecorder.db";
import { ProfileFormState } from "@/app/(pages)/PSP/utils/PSPForm.types";

export default function PSPHistoryPage() {
  const [logs, setLogs] = useState<any[]>([]);
  const [startPoints, setStartPoints] = useState<any[]>([]);

  // -----------------------------
  // 讀取紀錄與初始化
  // -----------------------------
  useEffect(() => {
    const storedLogs = localStorage.getItem("psp_physio_log_v1");
    const storedSP = localStorage.getItem("psp_startpoint_history_v1");

    if (storedLogs) {
      try {
        const parsedLogs = JSON.parse(storedLogs);
        // 讓最新的紀錄排在最上面
        setLogs(parsedLogs.reverse());
      } catch (e) {
        console.error("無法解析生理紀錄");
      }
    }

    if (storedSP) {
      try {
        setStartPoints(JSON.parse(storedSP));
      } catch (e) {
        console.error("無法解析初始存量紀錄");
      }
    }
  }, []);

  const formatDate = (ts: string) => {
    const d = new Date(ts);
    return d.toLocaleString("zh-TW", {
      hour12: false,
      timeZone: "Asia/Taipei",
    });
  };

  const scoreToText = (val: any) => {
    if (val === "" || val === undefined) return "-";
    const table: Record<number, string> = {
      1: "很差",
      2: "不太好",
      3: "正常",
      4: "還不錯",
      5: "優異",
    };
    return table[Number(val)] ?? "-";
  };

  const handleResetAll = () => {
    if (confirm("🚨 警告：這將永久刪除所有生理狀態歷史紀錄與初始存量標定。確定要清空嗎？")) {
      resetPhysioLog(); // 呼叫你 DB 層的重置
      localStorage.removeItem("psp_startpoint_history_v1"); // 同步清除起點紀錄
      setLogs([]);
      setStartPoints([]);
      alert("已成功清空所有數據。");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-10">
      {/* 頁首標題與功能按鈕 */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">生理狀態紀錄</h1>
          <p className="text-zinc-500 mt-1">追蹤你的生物基準隨時間的演變軌跡</p>
        </div>
        
        {logs.length > 0 && (
          <button
            onClick={handleResetAll}
            className="px-4 py-2 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white border border-red-200 rounded-lg transition-all text-sm font-medium flex items-center gap-2 shadow-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
            清空所有歷史紀錄
          </button>
        )}
      </div>

      {/* 初始存量標定 (T0) */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold flex items-center gap-2 text-blue-600 dark:text-blue-400">
          <span className="flex h-2 w-2 rounded-full bg-blue-600"></span>
          初始存量標定 (T0 Genesis)
        </h2>
        {startPoints.length === 0 ? (
          <div className="p-8 border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-xl text-center">
            <p className="text-zinc-400 text-sm">尚未建立初始生理存量快照</p>
          </div>
        ) : (
          startPoints.map((sp, idx) => (
            <div key={sp.id || idx} className="bg-blue-50/40 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 rounded-xl p-5">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-mono font-bold text-blue-500 bg-blue-100 dark:bg-blue-900/50 px-2 py-1 rounded">
                  {formatDate(sp.timestamp)}
                </span>
                <span className="text-xs text-blue-400 uppercase tracking-widest font-bold">Initial Snapshot</span>
              </div>
              <p className="text-sm text-blue-700/80 dark:text-blue-300/80 leading-relaxed">
                系統已根據此時間點的生理狀態，完成了 250+ 項微量營養素與代謝物的初始水位標定。這將作為你所有 K 線模擬的「零時」參考。
              </p>
            </div>
          ))
        )}
      </section>

      {/* 生理狀態變化日誌 (Tn) */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
          <span className="flex h-2 w-2 rounded-full bg-emerald-600"></span>
          生理參數變化日誌 (Tn Logs)
        </h2>
        {logs.length === 0 ? (
          <div className="p-8 border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-xl text-center">
            <p className="text-zinc-400 text-sm">尚無任何生理變化記錄</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {logs.map((entry, index) => {
              const p: ProfileFormState = entry.pspState ?? {};
              return (
                <div 
                  key={entry.id || index} 
                  className="group border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 hover:border-emerald-300 dark:hover:border-emerald-700 transition-all hover:shadow-sm bg-white dark:bg-zinc-950"
                >
                  <div className="flex justify-between items-center mb-5">
                    <span className="text-sm font-bold text-zinc-600 dark:text-zinc-400">{formatDate(entry.timestamp)}</span>
                    <div className="h-px flex-1 mx-4 bg-zinc-100 dark:bg-zinc-900"></div>
                    <span className="text-[10px] font-black uppercase text-zinc-300 dark:text-zinc-700">Update Event</span>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                    <div className="space-y-1">
                      <p className="text-[10px] uppercase tracking-wider text-zinc-400 font-bold">體徵指標</p>
                      <p className="text-sm font-medium">{p.sex === 'male' ? '男性' : '女性'} / {p.age}歲</p>
                      <p className="text-sm font-medium">{p.weightKg} kg / {p.heightCm} cm</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] uppercase tracking-wider text-zinc-400 font-bold">代謝過濾</p>
                      <p className="text-sm font-medium">腎：{scoreToText(p.kidneyScore)}</p>
                      <p className="text-sm font-medium">肝：{scoreToText(p.liverScore)}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] uppercase tracking-wider text-zinc-400 font-bold">修復效能</p>
                      <p className="text-sm font-medium">睡眠：{scoreToText(p.sleepQuality)}</p>
                      <p className="text-sm font-medium">壓力：{scoreToText(p.stressLevel)}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] uppercase tracking-wider text-zinc-400 font-bold">活動負荷</p>
                      <p className="text-sm font-medium">等級：{scoreToText(p.activityScore)}</p>
                    </div>
                    <div className="space-y-1 text-right">
                      <p className="text-[10px] uppercase tracking-wider text-zinc-400 font-bold">BMI 紀錄</p>
                      <p className="text-lg font-black text-zinc-800 dark:text-zinc-200">
                        {p.weightKg && p.heightCm ? (Number(p.weightKg) / Math.pow(Number(p.heightCm)/100, 2)).toFixed(1) : '-'}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
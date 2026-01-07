// app/%28pages%29/PSP/hooks/useStartPointHistory.hook.ts

"use client";

import { v4 as uuid } from "uuid";
import { useState, useEffect } from "react";

/** 本地儲存 key */
const STORAGE_KEY = "psp_startpoint_history_v1";

export interface StartPointSnapshot {
  id: string;
  timestamp: string;
  psp: any;            // 當時的生理狀態
  initialStore: any;   // 初始營養存量
}

export default function useStartPointHistory(): {
  history: StartPointSnapshot[];
  addSnapshot: (snap: StartPointSnapshot) => void;
  reset: () => void;
} {
  const [history, setHistory] = useState<StartPointSnapshot[]>([]);

  /** 初始化：從 localStorage 載入 */
  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;

    try {
      setHistory(JSON.parse(raw));
    } catch (e) {
      console.error("Bad StartPoint history JSON:", e);
    }
  }, []);

  /** 寫回 localStorage */
  const save = (list: StartPointSnapshot[]) => {
    setHistory(list);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  };

  /** 新增或覆蓋最後一筆 snapshot（只保留 1 筆）*/
  const addSnapshot = (snap: StartPointSnapshot) => {
    const next = [snap]; // 只保留一筆
    save(next);
  };

  /** 清除歷史 */
  const reset = () => {
    save([]);
  };

  return {
    history,
    addSnapshot,
    reset,
  };
}
// app/_repository/IntakeDataCapture.repo.ts

import type { IntakeAnalysis } from '@/app/_ai/types/IntakeAnalysisSchema.type';

const STORAGE_KEY = 'bvt_intake_history';
const MAX_LOGS = 500; // BVT 先設上限，避免炸裂

type StoredIntakeLog = IntakeAnalysis & {
  id: string;
  createdAt: string; // ISO
  // 你也可以加：provider/model/promptVersion/latency 等
};

const isBrowser = () => typeof window !== 'undefined' && !!window.localStorage;

const safeUUID = () => {
  try {
    // @ts-ignore
    return crypto?.randomUUID?.() ?? `id_${Date.now()}_${Math.random().toString(16).slice(2)}`;
  } catch {
    return `id_${Date.now()}_${Math.random().toString(16).slice(2)}`;
  }
};

const safeParseArray = (raw: string | null): StoredIntakeLog[] => {
  if (!raw) return [];
  try {
    const v = JSON.parse(raw);
    return Array.isArray(v) ? (v as StoredIntakeLog[]) : [];
  } catch {
    return [];
  }
};

export const IntakeDataRepository = {
  saveLog(data: IntakeAnalysis): StoredIntakeLog | null {
    if (!isBrowser()) return null;

    const existing = safeParseArray(localStorage.getItem(STORAGE_KEY));

    const newEntry: StoredIntakeLog = {
      ...data,
      id: safeUUID(),
      createdAt: new Date().toISOString(),
    };

    const updated = [newEntry, ...existing].slice(0, MAX_LOGS);

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return newEntry;
    } catch (error) {
      console.error('紀錄員儲存失敗:', error);
      return null;
    }
  },

  getAllLogs(): StoredIntakeLog[] {
    if (!isBrowser()) return [];
    return safeParseArray(localStorage.getItem(STORAGE_KEY));
  },

  deleteLog(id: string): void {
    if (!isBrowser()) return;
    const logs = this.getAllLogs();
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(logs.filter((x) => x.id !== id))
    );
  },

  clearAll(): void {
    if (!isBrowser()) return;
    localStorage.removeItem(STORAGE_KEY);
  },
};
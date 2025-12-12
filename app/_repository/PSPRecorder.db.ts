// LogPhysioDynamic.ts
// -------------------------------------------------------
// 用於儲存「生理狀態紀錄」的資料結構。
// 每一筆紀錄代表在特定時間點的 PSP 狀態快照。
// -------------------------------------------------------

import { ProfileFormState } from "@/app/(FeaturePages)/PSP/utils/PSPForm.types";
import { v4 as uuid } from "uuid";

// ★ 單筆生理狀態紀錄
export interface PhysioLogEntry {
  id: string;                // UUID
  timestamp: string;         // UTC ISO 時間
  pspState: ProfileFormState; // 當下完整 PSP 生理狀態快照
}

// ★ 本地儲存 key
const STORAGE_KEY = "psp_physio_log_v1";

// ★ 初始化：從 localStorage 載入
function loadInitialLog(): PhysioLogEntry[] {
  if (typeof window === "undefined") return []; // SSR 保護

  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return [];

  try {
    return JSON.parse(saved) as PhysioLogEntry[];
  } catch (err) {
    console.warn("⚠️ 無法解析 psp_physio_log_v1，已清空重建");
    localStorage.removeItem(STORAGE_KEY);
    return [];
  }
}

// ★ 寫回 localStorage
function saveLog(log: PhysioLogEntry[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(log));
  } catch (err) {
    console.error("❌ 無法寫入 localStorage：", err);
  }
}

// ★ 真正的動態紀錄陣列（持久化）
const _physioLog: PhysioLogEntry[] = loadInitialLog();

export function LogPhysioDynamic(pspState: ProfileFormState, timestamp: string) {
  const entry: PhysioLogEntry = { id: uuid(), timestamp, pspState };
  _physioLog.push(entry);
  saveLog(_physioLog);
}

// ★ 封裝 push（確保自動儲存）
export function addPhysioLog(entry: PhysioLogEntry) {
  _physioLog.push(entry);
  saveLog(_physioLog);
}

// ★ 清除所有紀錄
export function resetPhysioLog() {
  _physioLog.length = 0;
  localStorage.removeItem(STORAGE_KEY);
}

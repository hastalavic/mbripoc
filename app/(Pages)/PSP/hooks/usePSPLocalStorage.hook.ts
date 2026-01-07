// app/(pages)/PSP/hooks/usePSPLocalStorage.hook.ts

// 此 Hook 用於管理 PSP 表單的本地儲存（localStorage），負責載入、儲存與重置資料。
// 已實作「草稿 (Draft)」與「正式基準 (Official Snapshot)」分離機制。
// 未來若擴充版本控制、加密、雲端同步等功能，應在此集中處理。

"use client";

import { useEffect, useState } from "react";
// 引入型別以確保資料結構一致性
import { ProfileFormState } from "../utils/PSPForm.types";

/** 草稿 Key：用於即時儲存使用者輸入中的狀態，防止重新整理遺失資料 */
const DRAFT_KEY = "psp_profile_v1";
/** 正式基準 Key：用於 DBSG 繪圖引擎讀取的「已確認」生理指標基準 */
const OFFICIAL_KEY = "psp_official_snapshot";

export default function usePSPLocalStorage(
  form: ProfileFormState,
  setForm: (v: ProfileFormState) => void,
  defaultProfile: ProfileFormState
) {
  const [initialized, setInitialized] = useState(false);

  // 1. 初始化：組件掛載時從 localStorage 載入「草稿」
  useEffect(() => {
    const saved = localStorage.getItem(DRAFT_KEY);
    if (saved) {
      try {
        setForm(JSON.parse(saved));
      } catch (err) {
        console.warn("❌ [PSP Storage] 無法解析草稿資料，可能格式已變動");
      }
    }
    setInitialized(true);
  }, [setForm]);

  // 2. 自動儲存「草稿」：只要 form 有變動就寫入 DRAFT_KEY
  useEffect(() => {
    if (!initialized) return;
    localStorage.setItem(DRAFT_KEY, JSON.stringify(form));
  }, [initialized, form]);

  /** * 3. 手動更新「正式基準」
   * 此函數應由儲存按鈕觸發。只有按下的那一刻，當前的 form 才會被標記為正式生理基準。
   */
  const updateOfficialSnapshot = () => {
    localStorage.setItem(OFFICIAL_KEY, JSON.stringify(form));
    console.log("🚀 [System] 正式生理基準 (OFFICIAL_KEY) 已更新同步");
  };

  /** * 4. 重置處理：同時清除草稿與正式基準，並將狀態恢復為預設值
   */
  const reset = () => {
    const fallback = defaultProfile ?? {};
    setForm(fallback);
    localStorage.removeItem(DRAFT_KEY);
    localStorage.removeItem(OFFICIAL_KEY);
    console.log("♻️ [System] 生理儲存資料已全面清除並重置");
  };

  return { 
    reset, 
    updateOfficialSnapshot 
  };
}
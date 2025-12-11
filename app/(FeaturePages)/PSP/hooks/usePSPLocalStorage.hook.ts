// 此 Hook 用於管理 PSP 表單的本地儲存（localStorage），負責載入、儲存與重置資料。
// 未來若擴充版本控制、加密、雲端同步等功能，應在此集中處理。
import { useEffect, useState } from "react";

const STORAGE_KEY = "psp_profile_v1";

export default function usePSPLocalStorage(
  form: any,
  setForm: (v: any) => void,
  defaultProfile?: any
) {
  const [initialized, setInitialized] = useState(false);

  // Load once on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setForm(JSON.parse(saved));
      } catch (err) {
        console.warn("Failed to parse PSP profile");
      }
    }
    setInitialized(true);
  }, [setForm]);

  // Save every update
  useEffect(() => {
    if (!initialized) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(form));
  }, [initialized, form]);

  // Expose a reset handler
  const reset = () => {
    const fallback = defaultProfile ?? {};
    setForm(fallback);
    localStorage.removeItem(STORAGE_KEY);
  };

  return { reset };
}
// app/%28pages%29/PSP/hooks/usePSPForm.hook.ts

// 此 Hook 為 PSP（生理設定表單）的中央更新控制器，統一管理所有欄位的更新邏輯。
// 未來若加入驗證、自動推算或欄位變動觸發（side effects），應在此集中處理。

import { ProfileFormState, defaultProfile } from "../utils/PSPForm.types";
import usePSPLocalStorage from "./usePSPLocalStorage.hook"; 

export default function usePSPForm(
  form: ProfileFormState,
  setForm: React.Dispatch<React.SetStateAction<ProfileFormState>>
) {
  const { reset } = usePSPLocalStorage(form, setForm, defaultProfile);

  const update = (key: keyof ProfileFormState, value: any) => {
    setForm(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const updateNumber = (key: keyof ProfileFormState, raw: string) => {
    const numberValue = raw === "" ? "" : Number(raw);
    setForm(prev => ({
      ...prev,
      [key]: numberValue,
    }));
  };

  const resetProfile = () => reset();

  return {
    update,
    updateNumber,
    resetProfile,
  };
}
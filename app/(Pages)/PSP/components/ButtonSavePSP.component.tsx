// app/(Pages)/PSP/components/ButtonSavePSP.component.tsx

"use client";

import Button from "@/app/design/ui/Button";
import { addPhysioLog } from "@/app/_repository/PSPRecorder.db";
import { v4 as uuid } from "uuid";
// 引入型別定義
import { ProfileFormState } from "@/app/(Pages)/PSP/utils/PSPForm.types";

interface ButtonSavePSPProps {
  form: ProfileFormState; // 型別由 any 改為 ProfileFormState
  timestamp: string;
  onSaved?: () => void;
}

export default function ButtonSavePSP({ form, timestamp, onSaved }: ButtonSavePSPProps) {
  const handleSave = () => {
    // 保留你的 Debug Log
    console.log(">>> 按鈕事件已觸發");

    // 執行儲存
    addPhysioLog({
      id: uuid(),
      timestamp: timestamp,
      pspState: form,
    });

    console.log("✔ 生理狀態已儲存（已寫入資料庫/localStorage）");

    // 如果有傳入 onSaved（例如更新 Official Snapshot），則執行它
    if (onSaved) {
      onSaved();
    }
  };

  return (
    <Button
      variant="primary"
      className="w-full mt-4"
      onClick={handleSave}
    >
      儲存生理狀態
    </Button>
  );
}

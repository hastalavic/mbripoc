"use client";

import Button from "@/app/_components/ui/Button";
import { addPhysioLog } from "@/app/_repository/PSPRecorder.db";
import { v4 as uuid } from "uuid";

interface ButtonSavePSPProps {
  form: any;
  timestamp: string;
  onSaved?: () => void;
}

export default function ButtonSavePSP({ form, timestamp, onSaved }: ButtonSavePSPProps) {
  const handleSave = () => {
    console.log(">>> 按鈕事件已觸發");
    addPhysioLog({
      id: uuid(),
      timestamp: timestamp,
      pspState: form,
    });

    console.log("✔ 生理狀態已儲存（已寫入 localStorage）");

    if (onSaved) onSaved();
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

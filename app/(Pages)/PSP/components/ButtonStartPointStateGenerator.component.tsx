// app/(Pages)/PSP/components/ButtonStartPointStateGenerator.component.tsx

"use client";

import Button from "@/app/design/ui/Button";
import { v4 as uuid } from "uuid";
import { computeInitialInternalState } from "@/app/_engine/computes/personalize/StartPointInternalState.compute";
import useStartPointHistory from "@/app/(Pages)/PSP/hooks/useStartPointHistory.hook";
import { ProfileFormState } from "@/app/(Pages)/PSP/utils/PSPForm.types";
import { LogPhysioDynamic } from "@/app/_repository/PSPRecorder.db";

interface ButtonStartPointProps {
  form: ProfileFormState;
  timestamp: string | null;
}

export default function ButtonStartPointStateGenerator({
  form,
  timestamp,
}: ButtonStartPointProps) {
  const { addSnapshot } = useStartPointHistory();

  const handleGenerate = () => {
    console.log("▶ [StartPoint] 按鈕被點擊", { timestamp, form });

    if (!timestamp) {
      console.warn("❗ 無法生成：timestamp 為空");
      alert("請先選擇時間！");
      return;
    }

    console.log("▶ 記錄生理狀態 LogPhysioDynamic...");
    try {
      LogPhysioDynamic(form, timestamp);
      console.log("✔ 生理狀態已記錄");
    } catch (err) {
      console.error("💥 LogPhysioDynamic 發生錯誤", err);
    }

    try {
      console.log("▶ 呼叫 computeInitialInternalState...");
      const initialStore = computeInitialInternalState(form);
      console.log("✔ initialStore 計算完成", initialStore);

      const snapshot = {
        id: uuid(),
        timestamp,
        psp: { ...form }, // 深拷貝避免 mutation
        initialStore,
      };

      console.log("▶ 準備呼叫 addSnapshot", snapshot);
      addSnapshot(snapshot);
      console.log("✔ 已呼叫 addSnapshot");

      alert("✅ 初始營養存量已生成並儲存（暫時 debug 用）");
    } catch (e) {
      console.error("💥 handleGenerate 發生錯誤", e);
    }
  };

  return (
    <Button
      variant="primary"
      className="w-full mt-4"
      onClick={handleGenerate}
    >
      生成初始營養存量
    </Button>
  );
}
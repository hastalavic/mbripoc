"use client";

import { useState } from "react";
import FoodSelectionPanel from "@/app/design/widgets/FoodSelectionPanel";

export default function AddIntakePage() {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");


  return (
    <div className="min-h-screen w-full bg-white dark:bg-black flex max-w-6xl mx-auto">

      {/* 區域 1：3 */}
      <div className="flex-[3] p-6 border-r border-zinc-200 dark:border-zinc-800">
        <FoodSelectionPanel />
      </div>

      {/* 區域 2：3 */}
      <div className="flex-[3] p-6 border-r border-zinc-200 dark:border-zinc-800">
        {/* 區域 2：顯示攝取物全元素表 */}
      </div>

      {/* 區域 3：4 */}
      <div className="flex-[4] p-6">
        {/* 區域 3：
            - 組成食物清單
            - 觀看加總全元素表
            - 決定是否加入已攝取清單 */}
      </div>

    </div>
  );
}
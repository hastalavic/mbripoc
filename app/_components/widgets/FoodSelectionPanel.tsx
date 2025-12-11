"use client";

import { useState } from "react";

export default function FoodSelectionPanel() {
  const [activeTab, setActiveTab] = useState<"recent" | "combos" | "all">("recent");

  return (
    <div className="w-full h-full flex flex-col">

      {/* Tabs */}
      <div className="flex border-b border-zinc-300 dark:border-zinc-700 mb-4">
        <button
          className={`px-4 py-2 text-sm ${
            activeTab === "recent"
              ? "font-semibold border-b-2 border-black dark:border-white"
              : "text-zinc-500"
          }`}
          onClick={() => setActiveTab("recent")}
        >
          近期
        </button>

        <button
          className={`px-4 py-2 text-sm ${
            activeTab === "combos"
              ? "font-semibold border-b-2 border-black dark:border-white"
              : "text-zinc-500"
          }`}
          onClick={() => setActiveTab("combos")}
        >
          組合
        </button>

        <button
          className={`px-4 py-2 text-sm ${
            activeTab === "all"
              ? "font-semibold border-b-2 border-black dark:border-white"
              : "text-zinc-500"
          }`}
          onClick={() => setActiveTab("all")}
        >
          全部
        </button>
      </div>

      {/* List Box */}
      <div className="flex-1 rounded-lg border border-zinc-300 dark:border-zinc-700 p-4 overflow-auto">
        {/* 暫時放 placeholder，等你下一步指示再補列表內容 */}
        <div className="text-zinc-500 text-sm">
          （此區顯示 {activeTab === "recent" ? "近期" : activeTab === "combos" ? "組合" : "全部"} 食物項目…）
        </div>
      </div>

    </div>
  );
}

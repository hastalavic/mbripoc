"use client";

import MonitorChart from "@/app/design/graphs/MonitorChart";
import NutrientGauge from "@/app/design/graphs/NutrientGauge";

export default function Home() {
  return (
    <div className="w-full p-6">
      <div className="max-w-6xl mx-auto flex gap-6 overflow-hidden">
        {/* 左側 60% */}
        <div className="flex-[6] bg-white/50 dark:bg-zinc-900/40 rounded-xl p-4 overflow-y-auto h-[calc(100vh-180px)] [&::-webkit-scrollbar]:hidden">
          <MonitorChart
            title="Nutrient Monitor"
            color="#16a34a"
            background="rgba(22,163,74,0.15)"
          />

          <MonitorChart
            title="Burden Monitor"
            color="#ea580c"
            background="rgba(234,88,12,0.15)"
          />

          <NutrientGauge />
        </div>

        {/* 右側 40% */}
        <div className="flex-[4] bg-white/50 dark:bg-zinc-900/40 rounded-xl p-4">
          {/* TODO: 之後放右側內容 */}
        </div>
      </div>
    </div>
  );
}

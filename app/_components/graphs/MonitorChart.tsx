"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

type MonitorChartProps = {
  title: string;
  color?: string;
  background?: string;
  timelineMode?: "1d" | "1h" | "10m" | "1m";
  onModeChange?: (mode: string) => void;
  data?: any;
  fakeNow?: Date;
};

/* -------------------------------------------------------------------------- */
/* 🧠 建立 labels：-50 → +50（0 是「現在」）                                   */
/* -------------------------------------------------------------------------- */
function buildCenteredLabels(count: number) {
  const half = Math.floor(count / 2);

  return Array.from({ length: count }, (_, i) => {
    const t = i - half;
    return t === 0 ? "NOW" : ""; // 只顯示現在
  });
}

/* -------------------------------------------------------------------------- */
/* 🎨 主組件：MonitorChart  (專心負責畫 100 格圖表)                            */
/* -------------------------------------------------------------------------- */
export default function MonitorChart({
  title,
  color = "#16a34a",
  background = "rgba(22,163,74,0.15)",
  timelineMode = "10m",
  onModeChange,
  data = [],
}: MonitorChartProps) {
  const COUNT = 100; // 永遠 100 格
  const labels = buildCenteredLabels(COUNT);

  const safeData = {
    labels,
    datasets: [
      {
        label: title,
        data: data.map((p: any) => p.value),
        borderColor: color,
        backgroundColor: background,
        tension: 0.25,
        pointRadius: 2,
      },
      // 🟥 中央線（現在）
      {
        label: "NOW",
        data: Array(COUNT).fill(null).map((_, i) => (i === 50 ? Math.max(...data.map((d:any)=>d.value)) : null)),
        borderColor: "red",
        pointBackgroundColor: "red",
        pointRadius: 4,
        showLine: false,
      }
    ],
  };

  const safeOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: {
        grid: { display: true, drawBorder: false, color: "rgba(0,0,0,0.1)" },
        ticks: { autoSkip: false, maxRotation: 0, minRotation: 0 },
      },
      y: { display: false },
    },
  };

  return (
    <section className="w-full mb-8 space-y-4">
      {/* Title */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">{title}</h2>
        <span className="text-sm text-zinc-500">Centered at NOW</span>
      </div>

      {/* Timeline buttons */}
      <div className="flex gap-2">
        {[
          { label: "1日", value: "1d" },
          { label: "1小時", value: "1h" },
          { label: "10分鐘", value: "10m" },
          { label: "1分鐘", value: "1m" },
        ].map((m) => (
          <button
            key={m.value}
            onClick={() => onModeChange?.(m.value)}
            className={`px-3 py-1 rounded-full border text-sm ${
              timelineMode === m.value
                ? "bg-black text-white"
                : "bg-white hover:bg-zinc-200"
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      {/* Chart */}
      <div className="w-full h-56 rounded-2xl bg-zinc-200/60 px-2 py-2">
        <Line data={safeData} options={safeOptions} />
      </div>
    </section>
  );
}
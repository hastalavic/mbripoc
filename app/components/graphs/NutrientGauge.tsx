"use client";

export default function NutrientGauge() {
  const items = [
    { label: "蛋白質 Protein", color: "bg-blue-500" },
    { label: "脂肪 Fat", color: "bg-red-500" },
    { label: "碳水 Carbs", color: "bg-yellow-500" },
    { label: "維生素 Vitamins", color: "bg-green-500" },
    { label: "礦物質 Minerals", color: "bg-purple-500" },
  ];

  return (
    <section className="w-full mb-8 space-y-4">
      <h2 className="text-lg font-semibold">Daily Nutrient Gauge</h2>

      {items.map((item, idx) => (
        <div key={idx} className="space-y-1">
          <div className="flex justify-between">
            <span>{item.label}</span>
            <span className="text-zinc-500 text-sm">示意</span>
          </div>

          <div className="w-full h-4 bg-zinc-300 rounded-full overflow-hidden">
            <div
              className={`${item.color} h-full`}
              style={{ width: "50%" }}
            />
          </div>
        </div>
      ))}
    </section>
  );
}

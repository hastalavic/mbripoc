"use client";

export default function IntakeList({ items, label }) {
  return (
    <section className="w-full mt-4 mb-10">
      <h2 className="text-xl font-semibold mb-4">已攝取清單（{label}）</h2>

      <div className="rounded-xl border p-4 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300">
        {items.length === 0 ? (
          <p>此日期尚無紀錄。</p>
        ) : (
          <ul className="space-y-3">
            {items.map((item, idx) => (
              <li
                key={idx}
                className="flex justify-between border-b pb-2 last:border-b-0"
              >
                <span>{item.name}</span>
                <span className="text-zinc-500">{item.amount}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

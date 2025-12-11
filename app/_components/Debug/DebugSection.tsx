interface DebugSectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

import { useState } from "react";

export default function DebugSection({
  title,
  description,
  children,
}: DebugSectionProps) {
  const [open, setOpen] = useState(true);
  return (
    <section className="rounded-xl bg-zinc-950 text-zinc-100 p-3 space-y-2">
      <div
        className="flex items-center justify-between mb-2 cursor-pointer select-none"
        onClick={() => setOpen(!open)}
      >
        <h3 className="text-sm font-semibold">{title}</h3>
        {description && (
          <span className="text-[10px] text-zinc-400">{description}</span>
        )}
      </div>
      {open && <div>{children}</div>}
    </section>
  );
}
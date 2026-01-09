"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "首頁" },
    { href: "/PSP", label: "生理狀態設置" },    
    // { href: "/MBRMonitor", label: "代謝監視器" },
    // { href: "/intake_entry", label: "攝取預覽" },
    // { href: "/AllElementsPage", label: "元素導覽" },
    // { href: "/IntakesPage", label: "攝取物列表" },
    { href: "/bvt_001", label: "BVT" },

  ];

  return (
    <nav className="w-full border-none bg-white/80 dark:bg-zinc-900/80 backdrop-blur">
      <div className="max-w-6xl mx-auto flex items-center gap-6 px-4 py-3">

        {links.map((l) => {
          const isActive = pathname === l.href;

          return (
            <Link
              key={l.href}
              href={l.href}
              className={`
                text-sm font-medium transition 
                ${isActive
                  ? "text-black dark:text-white underline underline-offset-4"
                  : "text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white"}
              `}
            >
              {l.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
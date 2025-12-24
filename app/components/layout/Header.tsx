import NavBarPages from "@/app/components/widgets/NavBarPages";

export default function Header() {
  return (
    <header className="w-full py-3 shadow-md bg-white dark:bg-black z-40">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4">
        {/* 左側：Logo / 標題 */}
        <h1 className="text-2xl font-semibold">MBRI</h1>

        {/* 右側：導覽列 */}
        <NavBarPages />
      </div>
    </header>
  );
}
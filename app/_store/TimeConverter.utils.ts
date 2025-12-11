// Time.ts
// ------------------------------------------------------
// 本檔案負責處理所有「UTC ↔ 本地時間（台北）」的轉換。
// MBRI 系統會使用 UTC 存儲所有事件，但 UI 一律顯示本地時間。
// 這個工具層確保無論從哪裡取出 timestamp，顯示永遠一致。
// ------------------------------------------------------

// ⭐ 1. 將 ISO UTC 時間轉為本地時間的 {date, time} 格式
export function toLocalDateTime(iso: string) {
  if (!iso) return { date: "", time: "" };

  const d = new Date(iso);

  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");

  const hours = String(d.getHours()).padStart(2, "0");
  const minutes = String(d.getMinutes()).padStart(2, "0");

  return {
    date: `${year}-${month}-${day}`,
    time: `${hours}:${minutes}`,
  };
}

// ⭐ 2. 將 ISO UTC 時間格式化成完整本地字串（UI 顯示用）
export function formatLocal(iso: string) {
  if (!iso) return "";
  return new Date(iso).toLocaleString("zh-TW", {
    timeZone: "Asia/Taipei",
    hour12: false,
  });
}

// ⭐ 3. 將本地 date + time → 轉為 UTC ISO（用於儲存）
export function localToISO(date: string, time: string) {
  if (!date || !time) return "";

  const [yy, mm, dd] = date.split("-").map(Number);
  const [hh, mi] = time.split(":").map(Number);

  // 用本地時間建立 Date，再自動轉成 UTC ISO
  const d = new Date(yy, mm - 1, dd, hh, mi, 0);
  return d.toISOString();
}

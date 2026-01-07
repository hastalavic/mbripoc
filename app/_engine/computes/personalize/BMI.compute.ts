// app/(pages)/PSP/utils/computeBMI.ts
/**
 * 計算 BMI 指數
 * @param heightCm 身高（cm）
 * @param weightKg 體重（kg）
 * @returns BMI 或 null
 */

export function computeBMI(heightCm: number | "", weightKg: number | "") {
  if (!heightCm || !weightKg) return null;

  const hM = Number(heightCm) / 100;
  if (hM <= 0) return null;

  return Number((Number(weightKg) / (hM * hM)).toFixed(1));
}
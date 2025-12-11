export function computeBMI(heightCm: number | "", weightKg: number | "") {
  if (!heightCm || !weightKg) return null;

  const hM = Number(heightCm) / 100;
  if (hM <= 0) return null;

  return Number((Number(weightKg) / (hM * hM)).toFixed(1));
}
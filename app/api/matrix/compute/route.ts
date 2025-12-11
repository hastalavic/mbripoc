
import { demoFoods } from "../../../demo/demoFoods";

export async function GET() {
  return Response.json({
    ok: true,
    msg: "MBRI Compute API Ready (GET not used, just for testing)",
  });
}

export async function POST(req: Request) {
  const { foodId } = await req.json();
  const food = demoFoods[foodId];

  if (!food) {
    return Response.json({ error: "Food not found" }, { status: 404 });
  }

  // 計算 MBF（POC 用假公式）
  const mbf = food.mbfBase * food.cmemg * food.icmm;

  // 假的 BDR
  const bdr = mbf * 0.3;

  // 偽 FSDSM 恢復曲線
  const recovery = [
    { t: 0, value: bdr },
    { t: 2, value: bdr * 0.75 },
    { t: 5, value: bdr * 0.55 },
    { t: 9, value: bdr * 0.3 },
    { t: 14, value: bdr * 0.1 },
  ];

  return Response.json({
    ok: true,
    foodName: food.name,
    mbf,
    bdr,
    recovery,
  });
}
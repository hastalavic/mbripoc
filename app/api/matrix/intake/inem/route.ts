

export async function GET() {
  return Response.json({
    ok: true,
    matrix: "INEM",
    desc: "Intake Nutrition Extraction Matrix (empty shell)",
  });
}
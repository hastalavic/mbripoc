

export async function GET() {
  return Response.json({
    ok: true,
    matrix: "ICMM",
    desc: "Intake Component Metabolic Matrix (empty shell)",
  });
}
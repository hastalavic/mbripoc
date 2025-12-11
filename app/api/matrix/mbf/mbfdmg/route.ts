

export async function GET() {
  return Response.json({
    ok: true,
    matrix: "MBFDMG",
    desc: "Metabolic Burden Damage Matrix (empty shell)",
  });
}
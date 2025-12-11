

export async function GET() {
  return Response.json({
    ok: true,
    matrix: "PEBM",
    desc: "Positive Environmental Burden Matrix (empty shell)",
  });
}
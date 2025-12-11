

export async function GET() {
  return Response.json({
    ok: true,
    matrix: "NEBM",
    desc: "Negative Environmental Burden Matrix (empty shell)",
  });
}
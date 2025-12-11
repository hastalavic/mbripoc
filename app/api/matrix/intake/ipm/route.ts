

export async function GET() {
  return Response.json({
    ok: true,
    matrix: "IPM",
    desc: "Intake Process Matrix (empty shell)",
  });
}


export async function GET() {
  return Response.json({
    ok: true,
    matrix: "IIM",
    desc: "Intake Item Matrix (empty shell)",
  });
}
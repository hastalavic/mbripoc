

export async function GET() {
  return Response.json({
    ok: true,
    matrix: "IPEM",
    desc: "Intake Process Effect Matrix (empty shell)",
  });
}


export async function POST(req: Request) {
  const payload = await req.json();

  return Response.json({
    ok: true,
    msg: "Validation Layer API (empty shell)",
    received: payload,
  });
}

export async function GET() {
  return Response.json({
    ok: true,
    msg: "Validation API Ready",
  });
}
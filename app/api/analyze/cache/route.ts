// app/api/analyze/cache/route.ts

import { NextResponse } from "next/server";

/**
 * ⚠️ Cache API (stub)
 * ----------------------------
 * This endpoint is currently a placeholder.
 * Real cache logic (KV / memory) is NOT implemented yet.
 */

export async function GET(request: Request) {
  const url = new URL(request.url);
  const key = url.searchParams.get("key");

  return NextResponse.json({
    status: "ok",
    cache: "stub",
    action: "get",
    key,
    value: null,
    note: "Cache not implemented yet",
  });
}

export async function POST(request: Request) {
  const body = await request.json();
  const { key } = body ?? {};

  return NextResponse.json({
    status: "ok",
    cache: "stub",
    action: "set",
    key,
    note: "Cache not implemented yet",
  });
}

export async function DELETE(request: Request) {
  const url = new URL(request.url);
  const key = url.searchParams.get("key");

  return NextResponse.json({
    status: "ok",
    cache: "stub",
    action: "delete",
    key,
    note: "Cache not implemented yet",
  });
}
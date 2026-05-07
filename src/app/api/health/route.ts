import { NextResponse } from "next/server";

/** Healthcheck para balanceadores (Railway, Kubernetes, etc.). */
export function GET() {
  return NextResponse.json(
    { ok: true, service: "aion-site", ts: new Date().toISOString() },
    {
      status: 200,
      headers: { "Cache-Control": "no-store" },
    },
  );
}

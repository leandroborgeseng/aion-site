import {
  parseContactPayload,
  validateContactPayload,
} from "@/lib/contact-validate";
import { saveContactSubmission } from "@/lib/contact-storage";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false as const, error: "invalid_json" },
      { status: 400 },
    );
  }

  const parsed = parseContactPayload(json);
  if (!parsed) {
    return NextResponse.json(
      { ok: false as const, error: "invalid_payload" },
      { status: 400 },
    );
  }

  const { ok, issues } = validateContactPayload(parsed);
  if (!ok) {
    return NextResponse.json(
      { ok: false as const, issues },
      { status: 422 },
    );
  }

  try {
    await saveContactSubmission(parsed);
  } catch (err) {
    console.error("[contact] falha ao gravar contacts.json", err);
    return NextResponse.json(
      { ok: false as const, error: "persist_failed" },
      { status: 503 },
    );
  }

  return NextResponse.json({ ok: true as const });
}

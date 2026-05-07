import { timingSafeEqual } from "crypto";
import { NextResponse } from "next/server";

/**
 * Autenticação por segredo de ambiente. Sem `CONTACT_ADMIN_SECRET`, a rota
 * responde 404 para não revelar que existe painel admin.
 */
export function assertAdminAuthorized(request: Request): NextResponse | null {
  const secret = process.env.CONTACT_ADMIN_SECRET?.trim();
  if (!secret) {
    return new NextResponse(null, { status: 404 });
  }

  const auth = request.headers.get("authorization");
  const m = auth?.match(/^Bearer\s+(.+)$/i);
  const token = m?.[1]?.trim() ?? null;

  if (!token || !timingSafeEqualString(token, secret)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  return null;
}

function timingSafeEqualString(a: string, b: string): boolean {
  const bufA = Buffer.from(a, "utf8");
  const bufB = Buffer.from(b, "utf8");
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}

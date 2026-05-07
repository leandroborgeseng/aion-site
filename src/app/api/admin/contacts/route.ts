import { assertAdminAuthorized } from "@/lib/admin-auth";
import { readAllContacts } from "@/lib/contact-storage";
import { storedContactsToCsv } from "@/lib/contacts-csv";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

/** Listagem (JSON) ou export CSV dos pedidos de contacto. Protegido por CONTACT_ADMIN_SECRET (Bearer). */
export async function GET(request: Request) {
  const denied = assertAdminAuthorized(request);
  if (denied) return denied;

  const { searchParams } = new URL(request.url);
  const format = searchParams.get("format")?.toLowerCase();

  try {
    const rows = await readAllContacts();

    if (format === "csv") {
      const csv = storedContactsToCsv(rows);
      const stamp = new Date().toISOString().slice(0, 10);
      return new NextResponse(`\uFEFF${csv}`, {
        status: 200,
        headers: {
          "Content-Type": "text/csv; charset=utf-8",
          "Content-Disposition": `attachment; filename="aion-contacts-${stamp}.csv"`,
          "Cache-Control": "no-store, must-revalidate",
        },
      });
    }

    return NextResponse.json(rows, {
      status: 200,
      headers: { "Cache-Control": "no-store, must-revalidate" },
    });
  } catch (e) {
    console.error("[admin/contacts]", e);
    return NextResponse.json(
      { error: "read_failed" },
      { status: 500 },
    );
  }
}

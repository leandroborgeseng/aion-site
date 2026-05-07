import type { StoredContact } from "@/lib/contact-storage";

const COLUMNS: (keyof StoredContact)[] = [
  "id",
  "createdAt",
  "locale",
  "fullName",
  "email",
  "phone",
  "documentType",
  "document",
  "companyName",
  "cep",
  "street",
  "number",
  "complement",
  "neighborhood",
  "city",
  "state",
  "message",
];

function csvCell(value: string): string {
  if (/[",\n\r]/.test(value)) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

export function storedContactsToCsv(rows: StoredContact[]): string {
  const header = COLUMNS.join(",");
  const lines = rows.map((row) =>
    COLUMNS.map((key) => csvCell(String(row[key] ?? ""))).join(","),
  );
  return [header, ...lines].join("\n");
}

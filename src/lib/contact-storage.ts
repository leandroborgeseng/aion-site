import { randomUUID } from "crypto";
import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import type { ContactPayload } from "@/lib/contact-validate";

export type StoredContact = ContactPayload & {
  id: string;
  createdAt: string;
};

/** Fila em memória evita corrupção do JSON com vários POST em paralelo no mesmo processo. */
let writeLock: Promise<unknown> = Promise.resolve();

function resolveContactsFilePath(): string {
  const raw = process.env.CONTACT_STORAGE_PATH?.trim();
  if (!raw) {
    return path.join(
      /* turbopackIgnore: true */ process.cwd(),
      "data",
      "contacts.json",
    );
  }
  return path.isAbsolute(raw)
    ? raw
    : path.join(/* turbopackIgnore: true */ process.cwd(), raw);
}

async function readList(filePath: string): Promise<StoredContact[]> {
  let list: StoredContact[] = [];
  try {
    const raw = await readFile(filePath, "utf-8");
    const parsed = JSON.parse(raw) as unknown;
    if (Array.isArray(parsed)) {
      list = parsed as StoredContact[];
    }
  } catch (e: unknown) {
    const code = (e as NodeJS.ErrnoException).code;
    if (code === "ENOENT") return [];
    if (e instanceof SyntaxError) {
      console.error("[contact-storage] contacts.json está corrompido — corrija o ficheiro manualmente.");
      throw e;
    }
    throw e;
  }
  return list;
}

/** Lista todos os contactos gravados (leitura para admin/export). */
export async function readAllContacts(): Promise<StoredContact[]> {
  return readList(resolveContactsFilePath());
}

async function persistAppend(record: StoredContact): Promise<void> {
  const filePath = resolveContactsFilePath();
  await mkdir(path.dirname(filePath), { recursive: true });
  const list = await readList(filePath);
  list.push(record);
  await writeFile(filePath, JSON.stringify(list, null, 2), "utf-8");
}

/** Grava o contacto no ficheiro JSON (array). Em ambientes serverless o disco pode ser efémero. */
export function saveContactSubmission(payload: ContactPayload): Promise<void> {
  const record: StoredContact = {
    ...payload,
    id: randomUUID(),
    createdAt: new Date().toISOString(),
  };

  const task = writeLock.then(() => persistAppend(record));
  writeLock = task.catch(() => {
    /* mantém a fila mesmo após falha */
  });
  return task;
}

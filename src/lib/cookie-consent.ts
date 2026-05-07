/** Armazenamento no browser para preferência de cookies de medição. */
export const CONSENT_STORAGE_KEY = "aion_cookie_consent_v1";

export type ConsentPayload = {
  analytics: boolean;
  updatedAt: string;
};

export function parseStoredConsent(raw: string | null): ConsentPayload | null {
  if (!raw) return null;
  try {
    const p = JSON.parse(raw) as ConsentPayload;
    if (typeof p.analytics === "boolean") return p;
    return null;
  } catch {
    return null;
  }
}

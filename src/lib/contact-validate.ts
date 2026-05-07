import { BR_STATE_CODES } from "@/lib/br-states";
import {
  isValidCNPJ,
  isValidCPF,
  isValidBrazilPhone,
  isValidEmail,
} from "@/lib/br-documents";
import { normalizeCepDigits } from "@/lib/viacep";

export type ContactLocale = "pt" | "en" | "es";

export type ContactPayload = {
  locale: ContactLocale;
  fullName: string;
  email: string;
  phone: string;
  documentType: "cpf" | "cnpj";
  document: string;
  companyName: string;
  cep: string;
  street: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
  message: string;
};

export type ContactFieldId =
  | "fullName"
  | "email"
  | "phone"
  | "document"
  | "companyName"
  | "cep"
  | "street"
  | "number"
  | "neighborhood"
  | "city"
  | "state"
  | "message";

export type ContactIssueCode =
  | "required"
  | "emailInvalid"
  | "phoneInvalid"
  | "cpfInvalid"
  | "cnpjInvalid"
  | "companyRequired"
  | "cepInvalid"
  | "stateInvalid"
  | "messageRequired";

export type ContactIssues = Partial<Record<ContactFieldId, ContactIssueCode>>;

function str(v: unknown): string {
  return typeof v === "string" ? v.trim() : "";
}

export function parseContactPayload(
  body: unknown,
): ContactPayload | null {
  if (!body || typeof body !== "object") return null;
  const o = body as Record<string, unknown>;
  const locale = o.locale;
  if (locale !== "pt" && locale !== "en" && locale !== "es") return null;

  const documentType = o.documentType;
  if (documentType !== "cpf" && documentType !== "cnpj") return null;

  return {
    locale,
    fullName: str(o.fullName),
    email: str(o.email),
    phone: str(o.phone),
    documentType,
    document: str(o.document),
    companyName: str(o.companyName),
    cep: str(o.cep),
    street: str(o.street),
    number: str(o.number),
    complement: str(o.complement),
    neighborhood: str(o.neighborhood),
    city: str(o.city),
    state: str(o.state).toUpperCase(),
    message: str(o.message),
  };
}

export function validateContactPayload(p: ContactPayload): {
  ok: boolean;
  issues: ContactIssues;
} {
  const issues: ContactIssues = {};

  if (!p.fullName) issues.fullName = "required";
  if (!p.email) issues.email = "required";
  else if (!isValidEmail(p.email)) issues.email = "emailInvalid";

  if (!p.phone) issues.phone = "required";
  else if (!isValidBrazilPhone(p.phone)) issues.phone = "phoneInvalid";

  if (!p.document) issues.document = "required";
  else if (p.documentType === "cpf") {
    if (!isValidCPF(p.document)) issues.document = "cpfInvalid";
  } else if (!isValidCNPJ(p.document)) {
    issues.document = "cnpjInvalid";
  }

  if (p.documentType === "cnpj" && !p.companyName) {
    issues.companyName = "companyRequired";
  }

  const cepD = normalizeCepDigits(p.cep);
  if (!p.cep) issues.cep = "required";
  else if (cepD.length !== 8) issues.cep = "cepInvalid";

  if (!p.street) issues.street = "required";
  if (!p.number) issues.number = "required";
  if (!p.neighborhood) issues.neighborhood = "required";
  if (!p.city) issues.city = "required";

  if (!p.state) issues.state = "required";
  else if (
    !(BR_STATE_CODES as readonly string[]).includes(p.state.toUpperCase())
  ) {
    issues.state = "stateInvalid";
  }

  if (!p.message) issues.message = "messageRequired";

  return { ok: Object.keys(issues).length === 0, issues };
}

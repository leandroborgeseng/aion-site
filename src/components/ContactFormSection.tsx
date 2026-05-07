"use client";

import type {
  ContactFieldId,
  ContactIssueCode,
  ContactIssues,
  ContactPayload,
} from "@/lib/contact-validate";
import { validateContactPayload } from "@/lib/contact-validate";
import { BR_STATE_CODES } from "@/lib/br-states";
import {
  formatCEPInput,
  formatCNPJInput,
  formatCPFInput,
  formatPhoneBRInput,
} from "@/lib/br-documents";
import { fetchViaCep, normalizeCepDigits } from "@/lib/viacep";
import Link from "next/link";
import { useCallback, useState } from "react";

export type ContactFormDict = {
  h1: string;
  lead: string;
  backHome: string;
  form: {
    fullNameLabel: string;
    fullNamePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    phoneLabel: string;
    phonePlaceholder: string;
    documentTypeLabel: string;
    documentTypeCpf: string;
    documentTypeCnpj: string;
    documentLabel: string;
    documentPlaceholderCpf: string;
    documentPlaceholderCnpj: string;
    companyNameLabel: string;
    companyNamePlaceholder: string;
    cepLabel: string;
    cepPlaceholder: string;
    cepHint: string;
    streetLabel: string;
    streetPlaceholder: string;
    numberLabel: string;
    numberPlaceholder: string;
    complementLabel: string;
    complementPlaceholder: string;
    neighborhoodLabel: string;
    neighborhoodPlaceholder: string;
    cityLabel: string;
    cityPlaceholder: string;
    stateLabel: string;
    statePlaceholder: string;
    messageLabel: string;
    messagePlaceholder: string;
    submitLabel: string;
    submittingLabel: string;
    lookupCepLabel: string;
  };
  validation: Record<ContactIssueCode, string>;
  feedback: {
    successTitle: string;
    successBody: string;
    errorGeneric: string;
    cepLoading: string;
    cepNotFound: string;
  };
};

const baseInput =
  "block w-full rounded-md border border-[#C9D4E0] bg-white px-3 py-2.5 text-[15px] text-black outline-none ring-[#0067AF] transition-[border-color,box-shadow] placeholder:text-[#94A3B8] focus:border-[#0067AF] focus:ring-2 focus:ring-offset-0";
const errorInput =
  "border-red-500 ring-2 ring-red-500/80 focus:border-red-500 focus:ring-red-500/80";

function mapIssuesToMessages(
  issues: ContactIssues,
  v: ContactFormDict["validation"],
): Partial<Record<ContactFieldId, string>> {
  const out: Partial<Record<ContactFieldId, string>> = {};
  (Object.entries(issues) as [ContactFieldId, ContactIssueCode][]).forEach(
    ([key, code]) => {
      if (code && v[code]) out[key] = v[code];
    },
  );
  return out;
}

function emptyForm(): Omit<ContactPayload, "locale"> {
  return {
    fullName: "",
    email: "",
    phone: "",
    documentType: "cpf",
    document: "",
    companyName: "",
    cep: "",
    street: "",
    number: "",
    complement: "",
    neighborhood: "",
    city: "",
    state: "",
    message: "",
  };
}

export function ContactFormSection({
  dict,
  homeHref,
  lang,
}: {
  dict: ContactFormDict;
  homeHref: string;
  lang: "pt" | "en" | "es";
}) {
  const [values, setValues] = useState(emptyForm);
  const [errors, setErrors] = useState<
    Partial<Record<ContactFieldId, string>>
  >({});
  const [cepLoading, setCepLoading] = useState(false);
  const [cepNotFound, setCepNotFound] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const setField = useCallback(
    <K extends keyof typeof values>(key: K, value: (typeof values)[K]) => {
      setValues((prev) => ({ ...prev, [key]: value }));
      setErrors((prev) => {
        if (!prev[key as ContactFieldId]) return prev;
        const next = { ...prev };
        delete next[key as ContactFieldId];
        return next;
      });
      if (key === "cep") setCepNotFound(false);
    },
    [],
  );

  const lookupCep = useCallback(async () => {
    const d = normalizeCepDigits(values.cep);
    if (d.length !== 8) {
      setErrors((prev) => ({
        ...prev,
        cep: dict.validation.cepInvalid,
      }));
      return;
    }
    setCepLoading(true);
    setCepNotFound(false);
    setErrors((prev) => {
      const n = { ...prev };
      delete n.cep;
      return n;
    });
    try {
      const r = await fetchViaCep(d);
      if (!r) {
        setCepNotFound(true);
        return;
      }
      setValues((prev) => ({
        ...prev,
        street: r.logradouro || prev.street,
        neighborhood: r.bairro || prev.neighborhood,
        city: r.localidade || prev.city,
        state: (r.uf || prev.state).toUpperCase(),
        complement:
          prev.complement ||
          (r.complemento?.trim() ? r.complemento.trim() : prev.complement),
      }));
    } finally {
      setCepLoading(false);
    }
  }, [dict.validation.cepInvalid, values.cep]);

  const onDocumentTypeChange = (t: "cpf" | "cnpj") => {
    setField("documentType", t);
    setField("document", "");
    if (t === "cpf") setField("companyName", "");
    setErrors((prev) => {
      const n = { ...prev };
      delete n.document;
      delete n.companyName;
      return n;
    });
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    const payload: ContactPayload = { ...values, locale: lang };
    const local = validateContactPayload(payload);
    if (!local.ok) {
      setErrors(mapIssuesToMessages(local.issues, dict.validation));
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json()) as
        | { ok: true }
        | { ok: false; issues?: ContactIssues; error?: string };

      if (res.ok && data && "ok" in data && data.ok) {
        setDone(true);
        return;
      }
      if (res.status === 422 && data && "issues" in data && data.issues) {
        setErrors(mapIssuesToMessages(data.issues, dict.validation));
        return;
      }
      setFormError(dict.feedback.errorGeneric);
    } catch {
      setFormError(dict.feedback.errorGeneric);
    } finally {
      setSubmitting(false);
    }
  };

  const inClass = (field: ContactFieldId) =>
    `${baseInput} ${errors[field] ? errorInput : ""}`;

  if (done) {
    return (
      <section className="min-h-[45vh] bg-[#F5F7FA] py-12 md:py-16">
        <div className="mx-auto max-w-[720px] px-4 text-[#2F2E2E]">
          <p className="mb-8">
            <Link
              href={homeHref}
              className="text-[13px] font-semibold uppercase tracking-wide text-[#0067AF] underline-offset-4 hover:underline"
            >
              ← {dict.backHome}
            </Link>
          </p>
          <div className="rounded-lg border border-[#E2E8EF] bg-white p-8 shadow-sm">
            <h1 className="mb-3 text-2xl font-bold text-black md:text-3xl">
              {dict.feedback.successTitle}
            </h1>
            <p className="text-[15px] leading-relaxed text-[#555]">
              {dict.feedback.successBody}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-[45vh] bg-[#F5F7FA] py-12 md:py-16">
      <div className="mx-auto max-w-[720px] px-4 text-[#2F2E2E]">
        <p className="mb-8">
          <Link
            href={homeHref}
            className="text-[13px] font-semibold uppercase tracking-wide text-[#0067AF] underline-offset-4 hover:underline"
          >
            ← {dict.backHome}
          </Link>
        </p>
        <h1 className="mb-3 text-[28px] font-bold leading-tight text-black md:text-4xl">
          {dict.h1}
        </h1>
        <p className="mb-8 text-[15px] leading-relaxed text-[#555]">
          {dict.lead}
        </p>

        <form
          onSubmit={onSubmit}
          noValidate
          className="rounded-lg border border-[#E2E8EF] bg-white p-6 shadow-sm md:p-8"
        >
          {formError ? (
            <p
              className="mb-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-[14px] text-red-800"
              role="alert"
            >
              {formError}
            </p>
          ) : null}

          <div className="grid gap-5 md:grid-cols-2">
            <div className="md:col-span-2 space-y-1.5">
              <label htmlFor="cf-fullName" className="text-[13px] font-semibold text-black">
                {dict.form.fullNameLabel}
              </label>
              <input
                id="cf-fullName"
                autoComplete="name"
                value={values.fullName}
                onChange={(e) => setField("fullName", e.target.value)}
                className={inClass("fullName")}
                placeholder={dict.form.fullNamePlaceholder}
                aria-invalid={Boolean(errors.fullName)}
              />
              {errors.fullName ? (
                <p className="text-[13px] text-red-600">{errors.fullName}</p>
              ) : null}
            </div>

            <div className="space-y-1.5">
              <label htmlFor="cf-email" className="text-[13px] font-semibold text-black">
                {dict.form.emailLabel}
              </label>
              <input
                id="cf-email"
                type="email"
                autoComplete="email"
                inputMode="email"
                value={values.email}
                onChange={(e) => setField("email", e.target.value)}
                className={inClass("email")}
                placeholder={dict.form.emailPlaceholder}
                aria-invalid={Boolean(errors.email)}
              />
              {errors.email ? (
                <p className="text-[13px] text-red-600">{errors.email}</p>
              ) : null}
            </div>

            <div className="space-y-1.5">
              <label htmlFor="cf-phone" className="text-[13px] font-semibold text-black">
                {dict.form.phoneLabel}
              </label>
              <input
                id="cf-phone"
                type="tel"
                autoComplete="tel"
                inputMode="numeric"
                value={values.phone}
                onChange={(e) =>
                  setField("phone", formatPhoneBRInput(e.target.value))
                }
                className={inClass("phone")}
                placeholder={dict.form.phonePlaceholder}
                aria-invalid={Boolean(errors.phone)}
              />
              {errors.phone ? (
                <p className="text-[13px] text-red-600">{errors.phone}</p>
              ) : null}
            </div>

            <div className="md:col-span-2 space-y-2">
              <span className="block text-[13px] font-semibold text-black">
                {dict.form.documentTypeLabel}
              </span>
              <div className="flex flex-wrap gap-4">
                <label className="inline-flex cursor-pointer items-center gap-2 text-[14px]">
                  <input
                    type="radio"
                    name="docType"
                    checked={values.documentType === "cpf"}
                    onChange={() => onDocumentTypeChange("cpf")}
                    className="size-4 accent-[#0067AF]"
                  />
                  {dict.form.documentTypeCpf}
                </label>
                <label className="inline-flex cursor-pointer items-center gap-2 text-[14px]">
                  <input
                    type="radio"
                    name="docType"
                    checked={values.documentType === "cnpj"}
                    onChange={() => onDocumentTypeChange("cnpj")}
                    className="size-4 accent-[#0067AF]"
                  />
                  {dict.form.documentTypeCnpj}
                </label>
              </div>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="cf-document" className="text-[13px] font-semibold text-black">
                {dict.form.documentLabel}
              </label>
              <input
                id="cf-document"
                inputMode="numeric"
                autoComplete="off"
                value={values.document}
                onChange={(e) =>
                  setField(
                    "document",
                    values.documentType === "cpf"
                      ? formatCPFInput(e.target.value)
                      : formatCNPJInput(e.target.value),
                  )
                }
                className={inClass("document")}
                placeholder={
                  values.documentType === "cpf"
                    ? dict.form.documentPlaceholderCpf
                    : dict.form.documentPlaceholderCnpj
                }
                aria-invalid={Boolean(errors.document)}
              />
              {errors.document ? (
                <p className="text-[13px] text-red-600">{errors.document}</p>
              ) : null}
            </div>

            {values.documentType === "cnpj" ? (
              <div className="space-y-1.5">
                <label htmlFor="cf-company" className="text-[13px] font-semibold text-black">
                  {dict.form.companyNameLabel}
                </label>
                <input
                  id="cf-company"
                  value={values.companyName}
                  onChange={(e) => setField("companyName", e.target.value)}
                  className={inClass("companyName")}
                  placeholder={dict.form.companyNamePlaceholder}
                  aria-invalid={Boolean(errors.companyName)}
                />
                {errors.companyName ? (
                  <p className="text-[13px] text-red-600">
                    {errors.companyName}
                  </p>
                ) : null}
              </div>
            ) : null}

            <div className="space-y-1.5 md:col-span-2">
              <label htmlFor="cf-cep" className="text-[13px] font-semibold text-black">
                {dict.form.cepLabel}
              </label>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start">
                <input
                  id="cf-cep"
                  inputMode="numeric"
                  autoComplete="postal-code"
                  value={values.cep}
                  onChange={(e) =>
                    setField("cep", formatCEPInput(e.target.value))
                  }
                  onBlur={() => {
                    const d = normalizeCepDigits(values.cep);
                    if (d.length === 8) void lookupCep();
                  }}
                  className={`${inClass("cep")} sm:max-w-[160px]`}
                  placeholder={dict.form.cepPlaceholder}
                  aria-invalid={Boolean(errors.cep) || cepNotFound}
                />
                <button
                  type="button"
                  onClick={() => void lookupCep()}
                  disabled={cepLoading}
                  className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-md border border-[#0067AF] bg-white px-4 text-[13px] font-semibold text-[#0067AF] hover:bg-[#0067AF]/5 disabled:opacity-60"
                >
                  {cepLoading ? dict.feedback.cepLoading : dict.form.lookupCepLabel}
                </button>
              </div>
              <p className="text-[12px] text-[#666]">{dict.form.cepHint}</p>
              {cepNotFound ? (
                <p className="text-[13px] text-amber-700">
                  {dict.feedback.cepNotFound}
                </p>
              ) : null}
              {errors.cep ? (
                <p className="text-[13px] text-red-600">{errors.cep}</p>
              ) : null}
            </div>

            <div className="md:col-span-2 space-y-1.5">
              <label htmlFor="cf-street" className="text-[13px] font-semibold text-black">
                {dict.form.streetLabel}
              </label>
              <input
                id="cf-street"
                autoComplete="street-address"
                value={values.street}
                onChange={(e) => setField("street", e.target.value)}
                className={inClass("street")}
                placeholder={dict.form.streetPlaceholder}
                aria-invalid={Boolean(errors.street)}
              />
              {errors.street ? (
                <p className="text-[13px] text-red-600">{errors.street}</p>
              ) : null}
            </div>

            <div className="space-y-1.5">
              <label htmlFor="cf-number" className="text-[13px] font-semibold text-black">
                {dict.form.numberLabel}
              </label>
              <input
                id="cf-number"
                autoComplete="off"
                value={values.number}
                onChange={(e) => setField("number", e.target.value)}
                className={inClass("number")}
                placeholder={dict.form.numberPlaceholder}
                aria-invalid={Boolean(errors.number)}
              />
              {errors.number ? (
                <p className="text-[13px] text-red-600">{errors.number}</p>
              ) : null}
            </div>

            <div className="space-y-1.5">
              <label htmlFor="cf-complement" className="text-[13px] font-semibold text-black">
                {dict.form.complementLabel}
              </label>
              <input
                id="cf-complement"
                autoComplete="off"
                value={values.complement}
                onChange={(e) => setField("complement", e.target.value)}
                className={baseInput}
                placeholder={dict.form.complementPlaceholder}
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="cf-neighborhood" className="text-[13px] font-semibold text-black">
                {dict.form.neighborhoodLabel}
              </label>
              <input
                id="cf-neighborhood"
                autoComplete="off"
                value={values.neighborhood}
                onChange={(e) => setField("neighborhood", e.target.value)}
                className={inClass("neighborhood")}
                placeholder={dict.form.neighborhoodPlaceholder}
                aria-invalid={Boolean(errors.neighborhood)}
              />
              {errors.neighborhood ? (
                <p className="text-[13px] text-red-600">
                  {errors.neighborhood}
                </p>
              ) : null}
            </div>

            <div className="space-y-1.5">
              <label htmlFor="cf-city" className="text-[13px] font-semibold text-black">
                {dict.form.cityLabel}
              </label>
              <input
                id="cf-city"
                autoComplete="address-level2"
                value={values.city}
                onChange={(e) => setField("city", e.target.value)}
                className={inClass("city")}
                placeholder={dict.form.cityPlaceholder}
                aria-invalid={Boolean(errors.city)}
              />
              {errors.city ? (
                <p className="text-[13px] text-red-600">{errors.city}</p>
              ) : null}
            </div>

            <div className="space-y-1.5">
              <label htmlFor="cf-state" className="text-[13px] font-semibold text-black">
                {dict.form.stateLabel}
              </label>
              <select
                id="cf-state"
                autoComplete="address-level1"
                value={values.state}
                onChange={(e) => setField("state", e.target.value)}
                className={inClass("state")}
                aria-invalid={Boolean(errors.state)}
              >
                <option value="">{dict.form.statePlaceholder}</option>
                {BR_STATE_CODES.map((uf) => (
                  <option key={uf} value={uf}>
                    {uf}
                  </option>
                ))}
              </select>
              {errors.state ? (
                <p className="text-[13px] text-red-600">{errors.state}</p>
              ) : null}
            </div>

            <div className="md:col-span-2 space-y-1.5">
              <label htmlFor="cf-message" className="text-[13px] font-semibold text-black">
                {dict.form.messageLabel}
              </label>
              <textarea
                id="cf-message"
                rows={5}
                value={values.message}
                onChange={(e) => setField("message", e.target.value)}
                className={`${inClass("message")} resize-y min-h-[120px]`}
                placeholder={dict.form.messagePlaceholder}
                aria-invalid={Boolean(errors.message)}
              />
              {errors.message ? (
                <p className="text-[13px] text-red-600">{errors.message}</p>
              ) : null}
            </div>
          </div>

          <div className="mt-8">
            <button
              type="submit"
              disabled={submitting}
              className="flex w-full min-h-[48px] items-center justify-center rounded-md bg-[#0067AF] px-4 text-[15px] font-semibold text-white transition-colors hover:bg-[#005a99] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0067AF] disabled:opacity-60"
            >
              {submitting ? dict.form.submittingLabel : dict.form.submitLabel}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

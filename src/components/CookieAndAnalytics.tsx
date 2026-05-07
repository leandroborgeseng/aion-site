"use client";

import {
  CONSENT_STORAGE_KEY,
  parseStoredConsent,
  type ConsentPayload,
} from "@/lib/cookie-consent";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Script from "next/script";
import { useCallback, useEffect, useMemo, useState } from "react";

const PLAUSIBLE_DOMAIN = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN?.trim();
const PLAUSIBLE_SRC_DEFAULT = "https://plausible.io/js/script.js";
const PLAUSIBLE_SRC =
  process.env.NEXT_PUBLIC_PLAUSIBLE_SCRIPT_SRC?.trim() || PLAUSIBLE_SRC_DEFAULT;

/** Banner só aparece se existir medição opcional (Plausible) configurada. */
const ANALYTICS_OFFERED = Boolean(PLAUSIBLE_DOMAIN);

const COPY = {
  pt: {
    title: "Cookies e privacidade",
    text: "Usamos cookies essenciais para o funcionamento do site. Com o seu consentimento, podemos usar ferramentas de medição anónima (Plausible) para melhorar o conteúdo.",
    privacy: "Política de privacidade",
    privacyHref: "/pt/politica-de-privacidade",
    accept: "Aceitar medição",
    reject: "Só essenciais",
  },
  en: {
    title: "Cookies & privacy",
    text: "We use essential cookies for the site to work. With your consent, we may load privacy-focused, anonymous analytics (Plausible) to improve the content.",
    privacy: "Privacy policy",
    privacyHref: "/en/privacy-policy",
    accept: "Accept analytics",
    reject: "Essential only",
  },
  es: {
    title: "Cookies y privacidad",
    text: "Usamos cookies esenciales para el funcionamiento del sitio. Con su consentimiento, podemos cargar analítica anónima (Plausible) para mejorar el contenido.",
    privacy: "Política de privacidad",
    privacyHref: "/es/politica-de-privacidad",
    accept: "Aceptar medición",
    reject: "Solo esenciales",
  },
} as const;

type LocaleKey = keyof typeof COPY;

function detectLocale(pathname: string | null): LocaleKey {
  if (!pathname) return "pt";
  if (pathname.startsWith("/en")) return "en";
  if (pathname.startsWith("/es")) return "es";
  return "pt";
}

export function CookieAndAnalytics() {
  const pathname = usePathname();
  const t = useMemo(
    () => COPY[detectLocale(pathname)],
    [pathname],
  );

  const [bannerOpen, setBannerOpen] = useState(false);
  const [allowPlausible, setAllowPlausible] = useState(false);

  const persist = useCallback((payload: ConsentPayload) => {
    try {
      localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(payload));
    } catch {
      /* private mode / blocked storage */
    }
    setBannerOpen(false);
    setAllowPlausible(payload.analytics);
    window.dispatchEvent(new CustomEvent("aion-consent-updated"));
  }, []);

  useEffect(() => {
    if (!ANALYTICS_OFFERED) return;

    const id = requestAnimationFrame(() => {
      try {
        const raw = localStorage.getItem(CONSENT_STORAGE_KEY);
        const stored = parseStoredConsent(raw);
        if (stored === null) {
          setBannerOpen(true);
          setAllowPlausible(false);
          return;
        }
        setBannerOpen(false);
        setAllowPlausible(stored.analytics);
      } catch {
        setBannerOpen(true);
        setAllowPlausible(false);
      }
    });

    return () => cancelAnimationFrame(id);
  }, []);

  const onAccept = () =>
    persist({
      analytics: true,
      updatedAt: new Date().toISOString(),
    });

  const onReject = () =>
    persist({
      analytics: false,
      updatedAt: new Date().toISOString(),
    });

  const showScript =
    Boolean(PLAUSIBLE_DOMAIN) && allowPlausible && PLAUSIBLE_DOMAIN;

  return (
    <>
      {showScript ? (
        <Script
          id="plausible-analytics"
          defer
          src={PLAUSIBLE_SRC}
          data-domain={PLAUSIBLE_DOMAIN}
          strategy="afterInteractive"
        />
      ) : null}

      {ANALYTICS_OFFERED && bannerOpen ? (
        <div
          role="dialog"
          aria-labelledby="cookie-banner-title"
          aria-live="polite"
          className="fixed inset-x-0 bottom-0 z-[100] border-t border-gray-200 bg-white/95 p-4 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] backdrop-blur-sm md:p-5"
        >
          <div className="mx-auto flex max-w-[1200px] flex-col gap-4 md:flex-row md:items-center md:justify-between md:gap-8">
            <div className="min-w-0 flex-1 text-[14px] leading-relaxed text-[#2F2E2E]">
              <p
                id="cookie-banner-title"
                className="mb-1.5 font-semibold text-black"
              >
                {t.title}
              </p>
              <p className="mb-2">{t.text}</p>
              <Link
                href={t.privacyHref}
                className="text-[13px] font-medium text-[#0067AF] underline-offset-2 hover:underline"
              >
                {t.privacy}
              </Link>
            </div>
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row sm:items-center">
              <button
                type="button"
                onClick={onReject}
                className="min-h-11 rounded-lg border border-gray-300 px-5 text-[13px] font-semibold text-[#2F2E2E] hover:bg-gray-50"
              >
                {t.reject}
              </button>
              <button
                type="button"
                onClick={onAccept}
                className="min-h-11 rounded-lg bg-[#0067AF] px-5 text-[13px] font-semibold text-white hover:bg-[#005a99]"
              >
                {t.accept}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

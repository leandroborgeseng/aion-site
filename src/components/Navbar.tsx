"use client";

import Image from "next/image";
import { CONTACT_PAGE_PATH } from "@/lib/contact-routes";
import { siteImages } from "@/lib/site-images";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface NavbarProps {
  dict: {
    clinicalEngineering: string;
    assetManagement: string;
    contact: string;
  };
  lang: "pt" | "en" | "es";
}

const LANGS = [
  { code: "pt" as const, label: "PT" },
  { code: "en" as const, label: "EN" },
  { code: "es" as const, label: "ES" },
] as const;

const navToggleLabel = {
  pt: { open: "Abrir menu", close: "Fechar menu" },
  en: { open: "Open menu", close: "Close menu" },
  es: { open: "Abrir menú", close: "Cerrar menú" },
} as const;

const mobileNavAria = {
  pt: "Navegação principal",
  en: "Main navigation",
  es: "Navegación principal",
} as const;

export function Navbar({ dict, lang }: NavbarProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const t = navToggleLabel[lang];
  const panelId = "site-mobile-nav";

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      setMobileOpen(false);
    });
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  const desktopLink =
    "text-[12px] uppercase tracking-[0.06em] font-semibold text-[#2F2E2E] hover:text-[#0067AF] transition-colors";

  const mobileLink =
    "flex min-h-11 items-center border-b border-gray-100 py-3 text-[15px] font-semibold uppercase tracking-[0.08em] text-[#2F2E2E] hover:text-[#0067AF]";
  const closeMobile = () => setMobileOpen(false);

  return (
    <header className="aion-navbar sticky top-0 z-50 border-b border-gray-100 bg-white">
      <div className="mx-auto flex min-h-[72px] max-w-[1200px] items-center justify-between gap-2 px-4 sm:px-6 md:h-[80px]">
        <Link href={`/${lang}`} className="shrink-0 py-2">
          <Image
            src={siteImages.headerLogo}
            alt="Aion Engenharia"
            width={980}
            height={230}
            sizes="(max-width: 380px) 132px, (max-width: 640px) 160px, (max-width: 1024px) 210px, 238px"
            className="aion-header-logo"
            priority
          />
        </Link>

        <nav
          className="hidden items-center gap-6 lg:flex"
          aria-label={mobileNavAria[lang]}
        >
          <Link
            href={`/${lang}#engenharia-clinica`}
            className={desktopLink}
          >
            {dict.clinicalEngineering}
          </Link>
          <Link href={`/${lang}#gestao-ativos`} className={desktopLink}>
            {dict.assetManagement}
          </Link>
          <Link href={CONTACT_PAGE_PATH[lang]} className={desktopLink}>
            {dict.contact}
          </Link>
        </nav>

        <div className="flex items-center gap-1 sm:gap-2">
          <div className="flex items-center gap-1">
            {LANGS.map((l) => (
              <Link
                key={l.code}
                href={`/${l.code}`}
                className={`inline-flex min-h-11 min-w-7 sm:min-w-9 items-center justify-center rounded-full text-[12px] transition-colors ${
                  lang === l.code
                    ? "bg-[#edf4f7] text-[#0067AF]"
                    : "text-[#2F2E2E] hover:border-[#0067AF] hover:text-[#0067AF]"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </div>

          <button
            type="button"
            className="inline-flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded-md border text-[#2F2E2E] hover:bg-gray-50 lg:hidden"
            aria-expanded={mobileOpen}
            aria-controls={panelId}
            onClick={() => setMobileOpen((o) => !o)}
          >
            {mobileOpen ? (
              <X className="size-6" aria-hidden strokeWidth={2} />
            ) : (
              <Menu className="size-6" aria-hidden strokeWidth={2} />
            )}
            <span className="sr-only">{mobileOpen ? t.close : t.open}</span>
          </button>
        </div>
      </div>

      {mobileOpen ? (
        <>
          <button
            type="button"
            tabIndex={-1}
            className="fixed inset-x-0 bottom-0 top-[72px] z-40 bg-black/35 lg:hidden"
            aria-hidden
            onClick={closeMobile}
          />
          <div
            id={panelId}
            className="absolute left-0 right-0 top-full z-50 border-t border-gray-200 bg-white px-4 pb-6 pt-2 shadow-lg lg:hidden"
          >
            <nav aria-label={mobileNavAria[lang]} className="flex flex-col">
              <Link
                href={`/${lang}#engenharia-clinica`}
                className={mobileLink}
                onClick={closeMobile}
              >
                {dict.clinicalEngineering}
              </Link>
              <Link
                href={`/${lang}#gestao-ativos`}
                className={mobileLink}
                onClick={closeMobile}
              >
                {dict.assetManagement}
              </Link>
              <Link
                href={CONTACT_PAGE_PATH[lang]}
                className={`${mobileLink} border-b-0`}
                onClick={closeMobile}
              >
                {dict.contact}
              </Link>
            </nav>
          </div>
        </>
      ) : null}
    </header>
  );
}

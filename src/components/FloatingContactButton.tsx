"use client";

import dictEn from "@/content/aion-en.json";
import dictEs from "@/content/aion-es.json";
import dictPt from "@/content/aion-pt.json";
import { CONTACT_PAGE_PATH, isContactPagePath } from "@/lib/contact-routes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MessageCircle } from "lucide-react";

const LABELS = {
  pt: dictPt.floatingContact.label,
  en: dictEn.floatingContact.label,
  es: dictEs.floatingContact.label,
} as const;

function localeFromPath(pathname: string): keyof typeof CONTACT_PAGE_PATH {
  const first = pathname.split("/").filter(Boolean)[0];
  if (first === "en") return "en";
  if (first === "es") return "es";
  return "pt";
}

export function FloatingContactButton() {
  const pathname = usePathname() || "/";
  if (isContactPagePath(pathname)) {
    return null;
  }

  const lang = localeFromPath(pathname);
  const href = CONTACT_PAGE_PATH[lang];
  const label = LABELS[lang];

  return (
    <Link
      href={href}
      className="fixed bottom-28 right-[max(1rem,env(safe-area-inset-right))] z-[110] flex min-h-12 max-w-[calc(100vw-2rem)] items-center gap-2 rounded-full bg-[#0067AF] px-4 py-3 text-[14px] font-semibold text-white shadow-lg shadow-[#0067AF]/25 transition-colors hover:bg-[#005a99] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0067AF] sm:bottom-10 sm:right-8 sm:px-5 sm:text-[14px]"
    >
      <MessageCircle className="size-5 shrink-0" aria-hidden strokeWidth={2} />
      <span className="leading-tight">{label}</span>
    </Link>
  );
}

import type { Metadata } from "next";

export const defaultSiteUrl = "https://www.aion.eng.br";

export function getSiteUrl(): string {
  return (
    process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/$/, "") ||
    defaultSiteUrl
  );
}

export type SiteLocaleCode = "pt" | "en" | "es";

const META: Record<
  SiteLocaleCode,
  {
    title: string;
    description: string;
    ogLocale: string;
  }
> = {
  pt: {
    title:
      "AION Engenharia – Engenharia Clínica, Hospitalar e Automação | São Paulo",
    description:
      "Soluções em engenharia clínica, gestão de ativos, engenharia hospitalar e automação hospitalar para hospitais e clínicas. Conformidade, segurança e eficiência.",
    ogLocale: "pt_BR",
  },
  en: {
    title: "AION Engenharia – Clinical & Hospital Engineering | Brazil",
    description:
      "Clinical engineering, asset management, hospital engineering and automation for hospitals and clinics — focused on efficiency, safety and regulatory compliance.",
    ogLocale: "en_US",
  },
  es: {
    title: "AION Engenharia – Ingeniería Clínica y Hospitalaria | Brasil",
    description:
      "Ingeniería clínica, gestión de activos clínicos, ingeniería hospitalaria y automatización para hospitales y clínicas, con cumplimiento y seguridad.",
    ogLocale: "es_BR",
  },
};

export function buildLocaleMetadata(locale: SiteLocaleCode): Metadata {
  const base = getSiteUrl();
  const m = META[locale];
  const path = `/${locale}`;

  return {
    title: m.title,
    description: m.description,
    alternates: {
      canonical: path,
      languages: {
        "pt-BR": "/pt",
        en: "/en",
        es: "/es",
      },
    },
    openGraph: {
      type: "website",
      locale: m.ogLocale,
      url: `${base}${path}`,
      siteName: "AION Engenharia",
      title: m.title,
      description: m.description,
    },
    twitter: {
      card: "summary_large_image",
      title: m.title,
      description: m.description,
    },
  };
}

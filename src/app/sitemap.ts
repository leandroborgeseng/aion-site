import { getSiteUrl } from "@/lib/seo";
import type { MetadataRoute } from "next";

const LEGAL_PAGES: { path: string; priority: number }[] = [
  { path: "/pt/politica-de-privacidade", priority: 0.35 },
  { path: "/en/privacy-policy", priority: 0.35 },
  { path: "/es/politica-de-privacidad", priority: 0.35 },
];

const PORTAL_PAGES: { path: string }[] = [
  { path: "/pt/portal" },
  { path: "/en/portal" },
  { path: "/es/portal" },
];

const CONTACT_PAGES: { path: string }[] = [
  { path: "/pt/fale-conosco" },
  { path: "/en/contact" },
  { path: "/es/contacto" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const now = new Date();

  const home = (["pt", "en", "es"] as const).map((loc) => ({
    url: `${base}/${loc}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: loc === "pt" ? 1 : 0.9,
  }));

  const legal = LEGAL_PAGES.map(({ path, priority }) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: "yearly" as const,
    priority,
  }));

  const portal = PORTAL_PAGES.map(({ path }) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  const contact = CONTACT_PAGES.map(({ path }) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.55,
  }));

  return [...home, ...legal, ...portal, ...contact];
}

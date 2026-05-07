import { getSiteUrl } from "@/lib/seo";
import type { MetadataRoute } from "next";

const LEGAL_PAGES: { path: string; priority: number }[] = [
  { path: "/pt/politica-de-privacidade", priority: 0.35 },
  { path: "/en/privacy-policy", priority: 0.35 },
  { path: "/es/politica-de-privacidad", priority: 0.35 },
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

  return [...home, ...legal];
}

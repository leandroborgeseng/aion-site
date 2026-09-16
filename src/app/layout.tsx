import { getSiteUrl } from "@/lib/seo";
import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: "AION Engenharia",
  description:
    "Engenharia clínica e hospitalar, gestão de ativos e automação para instituições de saúde.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/apple-touch-icon.png", type: "image/png", sizes: "180x180" }],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const h = await headers();
  const htmlLang =
    (h.get("x-pathname-html-lang") ?? "pt-BR").trim() || "pt-BR";

  return (
    <html lang={htmlLang} className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

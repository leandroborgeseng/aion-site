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
      { url: "/aion-favicon-v2.ico", type: "image/x-icon", sizes: "16x16 24x24 32x32 48x48 64x64 128x128 256x256" },
      { url: "/aion-icon-v2.png", type: "image/png", sizes: "512x512" },
    ],
    shortcut: "/aion-favicon-v2.ico",
    apple: [{ url: "/aion-apple-touch-v2.png", type: "image/png", sizes: "180x180" }],
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

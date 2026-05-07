import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { PrivacyArticle } from "@/components/PrivacyArticle";
import { TopBar } from "@/components/TopBar";
import dictSite from "@/content/aion-es.json";
import doc from "@/content/privacy-doc-es.json";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: doc.title,
  description: `${doc.updatedNote} — Texto modelo.`,
  robots: { index: true, follow: true },
};

export default function PagePrivacyEs() {
  return (
    <main className="min-h-screen">
      <TopBar dict={dictSite.topbar} />
      <Navbar dict={dictSite.nav} lang="es" />
      <PrivacyArticle dict={doc} homeHref="/es" homeLabel="Inicio" />
      <Footer dict={dictSite.footer} />
    </main>
  );
}

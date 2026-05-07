import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { PrivacyArticle } from "@/components/PrivacyArticle";
import { TopBar } from "@/components/TopBar";
import dictSite from "@/content/aion-pt.json";
import doc from "@/content/privacy-doc-pt.json";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: doc.title,
  description: `${doc.updatedNote} — Modelo para revisão.`,
  robots: { index: true, follow: true },
};

export default function PagePrivacyPt() {
  return (
    <main className="min-h-screen">
      <TopBar dict={dictSite.topbar} lang="pt" />
      <Navbar dict={dictSite.nav} lang="pt" />
      <PrivacyArticle dict={doc} homeHref="/pt" homeLabel="Início" />
      <Footer dict={dictSite.footer} />
    </main>
  );
}

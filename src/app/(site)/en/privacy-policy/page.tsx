import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { PrivacyArticle } from "@/components/PrivacyArticle";
import { TopBar } from "@/components/TopBar";
import dictSite from "@/content/aion-en.json";
import doc from "@/content/privacy-doc-en.json";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: doc.title,
  description: `${doc.updatedNote} — Model privacy policy.`,
  robots: { index: true, follow: true },
};

export default function PagePrivacyEn() {
  return (
    <main className="min-h-screen">
      <TopBar dict={dictSite.topbar} />
      <Navbar dict={dictSite.nav} lang="en" />
      <PrivacyArticle
        dict={doc}
        homeHref="/en"
        homeLabel="Home"
      />
      <Footer dict={dictSite.footer} />
    </main>
  );
}

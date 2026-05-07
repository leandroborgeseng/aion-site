import { ContactFormSection, type ContactFormDict } from "@/components/ContactFormSection";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { TopBar } from "@/components/TopBar";
import dict from "@/content/aion-en.json";
import type { Metadata } from "next";

const p = dict.contactPage;

export const metadata: Metadata = {
  title: p.browserTitle,
  description: p.metaDescription,
  robots: { index: true, follow: true },
};

export default function PageContactEn() {
  return (
    <main className="min-h-screen flex flex-col">
      <TopBar dict={dict.topbar} lang="en" />
      <Navbar dict={dict.nav} lang="en" />
      <div className="flex-1">
        <ContactFormSection dict={p as ContactFormDict} homeHref="/en" lang="en" />
      </div>
      <Footer dict={dict.footer} />
    </main>
  );
}

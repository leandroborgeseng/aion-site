import { ContactFormSection, type ContactFormDict } from "@/components/ContactFormSection";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { TopBar } from "@/components/TopBar";
import dict from "@/content/aion-pt.json";
import type { Metadata } from "next";

const p = dict.contactPage;

export const metadata: Metadata = {
  title: p.browserTitle,
  description: p.metaDescription,
  robots: { index: true, follow: true },
};

export default function PageFaleConoscoPt() {
  return (
    <main className="min-h-screen flex flex-col">
      <TopBar dict={dict.topbar} lang="pt" />
      <Navbar dict={dict.nav} lang="pt" />
      <div className="flex-1">
        <ContactFormSection dict={p as ContactFormDict} homeHref="/pt" lang="pt" />
      </div>
      <Footer dict={dict.footer} />
    </main>
  );
}

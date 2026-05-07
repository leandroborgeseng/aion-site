import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { PortalLoginSection } from "@/components/PortalLoginSection";
import { TopBar } from "@/components/TopBar";
import dict from "@/content/aion-en.json";
import { portalFormDict } from "@/lib/portal-login-dict";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: dict.portalLogin.browserTitle,
  description: dict.portalLogin.metaDescription,
  robots: { index: true, follow: true },
};

export default function PagePortalEn() {
  return (
    <main className="min-h-screen flex flex-col">
      <TopBar dict={dict.topbar} lang="en" />
      <Navbar dict={dict.nav} lang="en" />
      <div className="flex-1">
        <PortalLoginSection dict={portalFormDict(dict.portalLogin)} homeHref="/en" />
      </div>
      <Footer dict={dict.footer} />
    </main>
  );
}

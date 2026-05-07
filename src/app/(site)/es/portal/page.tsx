import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { PortalLoginSection } from "@/components/PortalLoginSection";
import { TopBar } from "@/components/TopBar";
import dict from "@/content/aion-es.json";
import { portalFormDict } from "@/lib/portal-login-dict";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: dict.portalLogin.browserTitle,
  description: dict.portalLogin.metaDescription,
  robots: { index: true, follow: true },
};

export default function PagePortalEs() {
  return (
    <main className="min-h-screen flex flex-col">
      <TopBar dict={dict.topbar} lang="es" />
      <Navbar dict={dict.nav} lang="es" />
      <div className="flex-1">
        <PortalLoginSection dict={portalFormDict(dict.portalLogin)} homeHref="/es" />
      </div>
      <Footer dict={dict.footer} />
    </main>
  );
}

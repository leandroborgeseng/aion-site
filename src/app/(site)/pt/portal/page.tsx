import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { PortalLoginSection } from "@/components/PortalLoginSection";
import { TopBar } from "@/components/TopBar";
import dict from "@/content/aion-pt.json";
import { portalFormDict } from "@/lib/portal-login-dict";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: dict.portalLogin.browserTitle,
  description: dict.portalLogin.metaDescription,
  robots: { index: true, follow: true },
};

export default function PagePortalPt() {
  return (
    <main className="min-h-screen flex flex-col">
      <TopBar dict={dict.topbar} lang="pt" />
      <Navbar dict={dict.nav} lang="pt" />
      <div className="flex-1">
        <PortalLoginSection dict={portalFormDict(dict.portalLogin)} homeHref="/pt" />
      </div>
      <Footer dict={dict.footer} />
    </main>
  );
}

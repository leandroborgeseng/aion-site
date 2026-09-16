import { CookieAndAnalytics } from "@/components/CookieAndAnalytics";
import { FloatingContactButton } from "@/components/FloatingContactButton";
import { JsonLdLocalBusiness } from "@/components/JsonLdLocalBusiness";
import { Manrope, Sora } from "next/font/google";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
});

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${manrope.variable} ${sora.variable} ${manrope.className}`}>
      <JsonLdLocalBusiness />
      {children}
      <FloatingContactButton />
      <CookieAndAnalytics />
    </div>
  );
}

import { CookieAndAnalytics } from "@/components/CookieAndAnalytics";
import { JsonLdLocalBusiness } from "@/components/JsonLdLocalBusiness";
import { Raleway } from "next/font/google";

const raleway = Raleway({
  subsets: ["latin"],
  variable: "--font-raleway",
  display: "swap",
});

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${raleway.variable} ${raleway.className}`}>
      <JsonLdLocalBusiness />
      {children}
      <CookieAndAnalytics />
    </div>
  );
}

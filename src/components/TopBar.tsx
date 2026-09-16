import Link from "next/link";
import { ArrowUpRight, Phone } from "lucide-react";
interface TopBarProps {
  dict: {
    address1: string;
    address2: string;
    phone: string;
    portalLink: string;
    portalUrl?: string;
  };
  lang: "pt" | "en" | "es";
}
export function TopBar({ dict, lang }: TopBarProps) {
  return (
    <div className="aion-topbar">
      <div className="aion-container">
        <span className="topbar-location">São Paulo · Franca</span>
        <div>
          <a href="tel:+551630300445">
            <Phone size={12} aria-hidden />
            {dict.phone}
          </a>
          <Link href={`/${lang}/portal`}>
            {dict.portalLink}
            <ArrowUpRight size={13} aria-hidden />
          </Link>
        </div>
      </div>
    </div>
  );
}

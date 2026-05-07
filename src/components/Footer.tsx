import { MapPin } from "lucide-react";
import Link from "next/link";

interface FooterProps {
  dict: {
    copyright: string;
    address: string;
    privacyLabel?: string;
    privacyHref?: string;
  };
}

export function Footer({ dict }: FooterProps) {
  const hasPrivacy =
    typeof dict.privacyHref === "string" &&
    dict.privacyHref.length > 0 &&
    typeof dict.privacyLabel === "string" &&
    dict.privacyLabel.length > 0;

  return (
    <footer id="contato" className="bg-[#0067AF] text-white py-8">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-6 text-center md:text-left">
        <div>
          <p className="text-[14px] font-semibold">{dict.copyright}</p>
          <p className="mt-2 text-[13px] text-white/80 flex justify-center md:justify-start gap-2 leading-snug">
            <MapPin size={18} className="mt-0.5 shrink-0 opacity-90" aria-hidden />
            <span>{dict.address}</span>
          </p>
          {hasPrivacy ? (
            <div className="mt-4">
              <Link
                href={dict.privacyHref!}
                className="inline-flex min-h-11 items-center px-2 text-[14px] text-white underline-offset-2 hover:underline"
              >
                {dict.privacyLabel}
              </Link>
            </div>
          ) : null}
        </div>
        <nav
          className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2"
          aria-label="Social links"
        >
          <a
            href="https://www.instagram.com/aion.engenharia/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center px-2 text-[14px] text-white/80 hover:text-white transition-colors underline-offset-2 hover:underline"
          >
            Instagram
          </a>
          <a
            href="https://twitter.com/AionEngenharia"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center px-2 text-[14px] text-white/80 hover:text-white transition-colors underline-offset-2 hover:underline"
          >
            Twitter
          </a>
          <a
            href="https://www.facebook.com/aionengenharia/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center px-2 text-[14px] text-white/80 hover:text-white transition-colors underline-offset-2 hover:underline"
          >
            Facebook
          </a>
        </nav>
      </div>
    </footer>
  );
}

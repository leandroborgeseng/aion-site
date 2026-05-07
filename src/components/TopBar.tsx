import Image from "next/image";
import { siteImages } from "@/lib/site-images";
import { MapPin, Phone, Plus } from "lucide-react";

interface TopBarProps {
  dict: {
    address1: string;
    address2: string;
    phone: string;
    portalLink: string;
    portalUrl: string;
  };
}

const PHONE_HREF = "tel:+551630300445";

export function TopBar({ dict }: TopBarProps) {
  return (
    <div className="bg-[#0067AF] text-white">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-start lg:justify-between lg:gap-6">
        <div className="flex min-w-0 items-start gap-2 lg:max-w-xl">
          <MapPin size={16} className="mt-0.5 shrink-0 opacity-95" aria-hidden />
          <div className="text-[13px] leading-relaxed space-y-1">
            <div>{dict.address1}</div>
            <div>{dict.address2}</div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-x-8 gap-y-3 lg:flex-nowrap lg:justify-end">
          <a
            href={PHONE_HREF}
            className="inline-flex min-h-11 shrink-0 items-center gap-2 text-[14px] font-medium hover:underline"
          >
            <Phone size={16} aria-hidden strokeWidth={2} />
            <span>{dict.phone}</span>
          </a>
          <a
            href={dict.portalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 shrink-0 items-center gap-1.5 text-[14px] hover:underline"
          >
            <Plus size={16} aria-hidden strokeWidth={2} />
            {dict.portalLink}
          </a>
          <div className="flex items-center gap-1 sm:gap-2">
            <a
              href="https://www.instagram.com/aion.engenharia/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded-md hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <Image
                src={siteImages.social.instagram}
                alt="Instagram"
                width={22}
                height={22}
                sizes="22px"
              />
            </a>
            <a
              href="https://twitter.com/AionEngenharia"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded-md hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <Image
                src={siteImages.social.twitter}
                alt="Twitter"
                width={22}
                height={22}
                sizes="22px"
              />
            </a>
            <a
              href="https://www.facebook.com/aionengenharia/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded-md hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <Image
                src={siteImages.social.facebook}
                alt="Facebook"
                width={22}
                height={22}
                sizes="22px"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

import Image from "next/image";
import { siteImages } from "@/lib/site-images";

interface SectionAutomacaoProps {
  dict: {
    heading: string;
    subtitle: string;
    body: string;
    ctaTitle: string;
    ctaBody: string;
  };
}

export function SectionAutomacao({ dict }: SectionAutomacaoProps) {
  return (
    <>
      <section id="automacao-hospitalar" className="bg-[#0067AF] py-16">
        <div className="max-w-[1200px] mx-auto px-6">
          <h2
            className="text-[28px] font-normal text-white mb-4"
            style={{ fontFamily: "Raleway, sans-serif" }}
          >
            &gt; {dict.heading}
          </h2>
          <p className="font-bold text-[18px] text-white mb-6">{dict.subtitle}</p>
          <p className="text-[15px] text-white/90 leading-relaxed whitespace-pre-line">
            {dict.body}
          </p>
        </div>
      </section>

      {/* Automatize CTA section */}
      <section className="bg-white">
        <div className="flex flex-col md:flex-row min-h-[400px]">
          <div className="relative md:w-[40%] min-h-[300px]">
            <Image
              src={siteImages.automacaoCta}
              alt="Hospital automation"
              fill
              sizes="(max-width:767px) 100vw, 40vw"
              className="object-cover"
            />
          </div>
          <div className="bg-[#FFB81F] md:w-[60%] p-12 flex flex-col justify-center">
            <h3
              className="mb-6 text-2xl font-bold leading-tight text-black sm:text-3xl md:text-[38px]"
              style={{ fontFamily: "Raleway, sans-serif" }}
            >
              {dict.ctaTitle}
            </h3>
            <p className="text-[15px] text-[#2F2E2E] leading-relaxed">
              {dict.ctaBody}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

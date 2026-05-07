import Image from "next/image";
import { siteImages } from "@/lib/site-images";

interface SectionEngHospitalarProps {
  dict: {
    heading: string;
    subtitle: string;
    body: string;
    together: string;
    togetherSubtitle?: string;
    togetherBody: string;
    readMore: string;
  };
}

export function SectionEngHospitalar({ dict }: SectionEngHospitalarProps) {
  return (
    <>
      <section id="engenharia-hospitalar" className="bg-[#0067AF] py-16">
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

      {/* Juntos section */}
      <section className="bg-white">
        <div className="flex flex-col md:flex-row min-h-[400px]">
          <div className="bg-[#FFB81F] md:w-[60%] p-12 flex flex-col justify-center">
            <h3
              className="mb-2 text-4xl font-bold leading-tight text-black sm:text-5xl md:text-[56px]"
              style={{ fontFamily: "Raleway, sans-serif" }}
            >
              {dict.together}
            </h3>
            {dict.togetherSubtitle && (
              <p className="font-bold text-[16px] text-black mb-6">{dict.togetherSubtitle}</p>
            )}
            <p className="text-[15px] text-[#2F2E2E] leading-relaxed whitespace-pre-line mb-6">
              {dict.togetherBody}
            </p>
            <a
              href="#contato"
              className="inline-flex min-h-11 items-center text-[14px] font-bold text-[#0067AF] underline"
            >
              {dict.readMore}
            </a>
          </div>
          <div className="relative md:w-[40%] min-h-[300px]">
            <Image
              src={siteImages.hospitalarTogether}
              alt="Hospital Engineering"
              fill
              sizes="(max-width:767px) 100vw, 40vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>
    </>
  );
}

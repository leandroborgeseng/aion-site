import Image from "next/image";
import { siteImages } from "@/lib/site-images";

interface SectionEngClinicaProps {
  dict: {
    heading: string;
    intro1: string;
    intro2: string;
    intro3: string;
    cta: string;
    detailIntro: string;
    items: Array<{ title: string; desc: string }>;
  };
}

const CTA_IMAGE = siteImages.clinicaCta;
const ITEM_IMAGES = [...siteImages.clinicaPilares];

export function SectionEngClinica({ dict }: SectionEngClinicaProps) {
  return (
    <>
      {/* Blue intro */}
      <section id="engenharia-clinica" className="bg-[#0067AF] py-16">
        <div className="max-w-[1200px] mx-auto px-6">
          <h2
            className="text-[28px] font-normal text-white mb-8"
            style={{ fontFamily: "Raleway, sans-serif" }}
          >
            &gt; {dict.heading}
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <p className="text-[15px] text-white font-bold leading-relaxed">
                {dict.intro1}
              </p>
              <p className="text-[15px] text-white/90 leading-relaxed">
                {dict.intro2}
              </p>
            </div>
            <div>
              <p className="text-[15px] text-white/90 leading-relaxed">
                {dict.intro3}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* White detail */}
      <section className="bg-white">
        {/* "Saiba mais..." CTA: image left + yellow right */}
        <div className="flex flex-col md:flex-row min-h-[400px]">
          <div className="relative md:w-[50%] min-h-[300px]">
            <Image
              src={CTA_IMAGE}
              alt="Engenharia Clínica"
              fill
              sizes="(max-width:767px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="bg-[#FFB81F] md:w-[50%] p-12 flex flex-col justify-center">
            <h3
              className="mb-6 text-4xl font-bold leading-tight text-black sm:text-5xl md:text-[56px]"
              style={{ fontFamily: "Raleway, sans-serif" }}
            >
              {dict.cta}
            </h3>
            <p className="text-[15px] text-[#2F2E2E] leading-relaxed whitespace-pre-line">
              {dict.detailIntro}
            </p>
          </div>
        </div>

        {/* 2-column grid of service items */}
        <div className="max-w-[1200px] mx-auto w-full grid grid-cols-1 md:grid-cols-2">
          {dict.items.map((item, i) => (
            <div key={i} className="flex flex-col">
              <div className="relative w-full h-[280px]">
                <Image
                  src={ITEM_IMAGES[i] ?? ITEM_IMAGES[0]}
                  alt={item.title}
                  fill
                  sizes="(max-width:767px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="bg-[#FFB81F] p-8 flex flex-col justify-center">
                <h3 className="font-bold text-[18px] text-black mb-4">
                  {item.title}
                </h3>
                <p className="text-[15px] text-[#2F2E2E] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

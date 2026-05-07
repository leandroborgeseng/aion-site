import Image from "next/image";
import { siteImages } from "@/lib/site-images";

interface ServicesGridProps {
  dict: {
    label: string;
    intro: string;
    s1: string;
    s2: string;
    s3: string;
    s4: string;
  };
  lang: string;
}

const SERVICE_IMAGES = [...siteImages.servicesGrid];

const SERVICE_ANCHORS = [
  "#engenharia-clinica",
  "#gestao-ativos",
  "#engenharia-hospitalar",
  "#automacao-hospitalar",
];

export function ServicesGrid({ dict, lang }: ServicesGridProps) {
  const labels = [dict.s1, dict.s2, dict.s3, dict.s4];

  return (
    <section className="bg-white">
      {/* Heading + intro */}
      <div className="max-w-[1200px] mx-auto px-6 pt-12 pb-8">
        <h2
          className="mb-4 text-4xl font-bold leading-tight text-black sm:text-5xl md:text-[56px]"
          style={{ fontFamily: "Arial, sans-serif" }}
        >
          {dict.label}
        </h2>
        <p className="text-[16px] text-[#2F2E2E] max-w-3xl leading-relaxed">
          {dict.intro}
        </p>
      </div>

      {/* Blue cards grid */}
      <div className="bg-[#0067AF] py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 max-w-[1440px] mx-auto gap-6 px-4 sm:px-6 lg:px-10">
          {labels.map((label, i) => (
            <a
              key={i}
              href={`/${lang}${SERVICE_ANCHORS[i]}`}
              className="block group"
            >
              <div className="relative w-full" style={{ aspectRatio: "282/253" }}>
                <Image
                  src={SERVICE_IMAGES[i]}
                  alt={label}
                  fill
                  sizes="(max-width:768px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="bg-[#FFB81F] px-4 py-4">
                <span className="text-[16px] font-bold text-black underline">{label}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

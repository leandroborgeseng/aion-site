"use client";

import Image from "next/image";
import { siteImages } from "@/lib/site-images";
import { useEffect, useState } from "react";

const SLIDES = siteImages.heroSlides;

interface HeroProps {
  dict: {
    card1Title: string;
    card1Desc: string;
    card2Title: string;
    card2Desc: string;
    card3Title: string;
    card3Desc: string;
    cta: string;
  };
  lang: string;
}

export function HeroSection({ dict, lang }: HeroProps) {
  const [current, setCurrent] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setCurrent((c) => (c + 1) % SLIDES.length);
        setFading(false);
      }, 800);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const cards = [
    { title: dict.card1Title, desc: dict.card1Desc },
    { title: dict.card2Title, desc: dict.card2Desc },
    { title: dict.card3Title, desc: dict.card3Desc },
  ];

  return (
    <section className="relative min-h-[65vh] md:min-h-[75vh] flex flex-col justify-end bg-[#0067AF]">
      {/* Slide images — crossfade */}
      {SLIDES.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt={`Hero slide ${i + 1}`}
          fill
          sizes="100vw"
          className="object-cover transition-opacity duration-[800ms]"
          style={{ opacity: i === current && !fading ? 1 : 0, zIndex: 0 }}
          priority={i === 0}
        />
      ))}

      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-[#0067AF]/20" style={{ zIndex: 1 }} />

      {/* Cards */}
      <div className="relative z-10 max-w-[1200px] mx-auto w-full px-6 grid grid-cols-1 md:grid-cols-3 gap-0">
        {cards.map((card, i) => (
          <div key={i} className="bg-[rgba(0,103,175,0.8)] p-8 flex flex-col min-h-[220px] md:min-h-[280px]">
            <h2
              className="text-[28px] font-normal text-white leading-tight mb-4"
              style={{ fontFamily: "Raleway, sans-serif" }}
            >
              {card.title}
            </h2>
            <p className="text-[14px] text-white/90 flex-1 mb-6">{card.desc}</p>
            <a
              href={`/${lang}#engenharia-clinica`}
              className="inline-block bg-[#FFB81F] text-black font-bold text-[13px] px-6 py-3 uppercase hover:bg-[#e5a01a] transition-colors self-start"
            >
              {dict.cta}
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}

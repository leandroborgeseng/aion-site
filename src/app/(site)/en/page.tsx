import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/HeroSection";
import { Navbar } from "@/components/Navbar";
import { SectionAutomacao } from "@/components/SectionAutomacao";
import { SectionEngClinica } from "@/components/SectionEngClinica";
import { SectionEngHospitalar } from "@/components/SectionEngHospitalar";
import { SectionGestaoAtivos } from "@/components/SectionGestaoAtivos";
import { ServicesGrid } from "@/components/ServicesGrid";
import { TopBar } from "@/components/TopBar";
import dict from "@/content/aion-en.json";

export default function PageEn() {
  return (
    <main>
      <TopBar dict={dict.topbar} />
      <Navbar dict={dict.nav} lang="en" />
      <HeroSection dict={dict.hero} lang="en" />
      <ServicesGrid dict={dict.services} lang="en" />
      <SectionEngClinica dict={dict.engClinica} />
      <SectionGestaoAtivos dict={dict.gestaoAtivos} />
      <SectionEngHospitalar dict={dict.engHospitalar} />
      <SectionAutomacao dict={dict.automacao} />
      <Footer dict={dict.footer} />
    </main>
  );
}


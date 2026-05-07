import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/HeroSection";
import { Navbar } from "@/components/Navbar";
import { SectionAutomacao } from "@/components/SectionAutomacao";
import { SectionEngClinica } from "@/components/SectionEngClinica";
import { SectionEngHospitalar } from "@/components/SectionEngHospitalar";
import { SectionGestaoAtivos } from "@/components/SectionGestaoAtivos";
import { ServicesGrid } from "@/components/ServicesGrid";
import { TopBar } from "@/components/TopBar";
import dict from "@/content/aion-pt.json";

export default function PagePt() {
  return (
    <main>
      <TopBar dict={dict.topbar} lang="pt" />
      <Navbar dict={dict.nav} lang="pt" />
      <HeroSection dict={dict.hero} lang="pt" />
      <ServicesGrid dict={dict.services} lang="pt" />
      <SectionEngClinica dict={dict.engClinica} />
      <SectionGestaoAtivos dict={dict.gestaoAtivos} />
      <SectionEngHospitalar dict={dict.engHospitalar} />
      <SectionAutomacao dict={dict.automacao} />
      <Footer dict={dict.footer} />
    </main>
  );
}


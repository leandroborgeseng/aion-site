import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowUpRight,
  ArrowRight,
  Activity,
  ShieldCheck,
  ScanLine,
  Workflow,
  Plus,
  MapPin,
  Check,
} from "lucide-react";
import { Navbar } from "./Navbar";
import { TopBar } from "./TopBar";
import { Footer } from "./Footer";
import { CONTACT_PAGE_PATH } from "@/lib/contact-routes";
import { homeCopy } from "@/content/home-copy";
import type pt from "@/content/aion-pt.json";
import type { ReactNode } from "react";
const anchors = [
  "engenharia-clinica",
  "gestao-ativos",
  "engenharia-hospitalar",
  "automacao-hospitalar",
];
const photos = [
  "/images/services/clinica.jpg",
  "/images/hero/slide-3.jpg",
  "/images/services/hospitalar.jpg",
  "/images/services/automacao-grid.jpg",
];
const icons = [Activity, ScanLine, ShieldCheck, Workflow];
const editorial = {
  pt: {
    title: "Engenharia clínica.",
    accent: "Tecnologia para cuidar.",
    areas: "Quatro especialidades. Uma visão integrada.",
    portfolio: "Conheça nossa atuação completa",
    care: "A tecnologia precisa funcionar. O cuidado não pode esperar.",
    work: "Como cuidamos da sua tecnologia",
    scope: "Gestão técnica, próxima da sua instituição",
    clinical: "O papel da engenharia clínica",
    assets: "Controle, economia e liberdade de escolha.",
    overview: "Uma visão completa dos seus equipamentos",
    model: "Como funciona nosso modelo de gestão",
    freedom: "Seu patrimônio. Suas escolhas.",
    freedomBody:
      "Você mantém a liberdade de contratar os prestadores de sua confiança. A Aion organiza as informações e acompanha o que precisa ser feito.",
    hospital: "Do projeto ao início da operação",
    automation: "Duas frentes. Uma operação mais conectada.",
    approach: "Nossa abordagem em automação",
    office: "NOSSA SEDE EM FRANCA",
    officeTitle: "Perto de você. Prontos para o próximo desafio.",
    officeLead:
      "A Aion está no High Business Franca. Um ponto de encontro para conversar sobre as necessidades da sua instituição e planejar os próximos passos.",
    directions: "Como chegar",
    visit: "Agende uma conversa",
    expand: "Explore os tópicos abaixo para conhecer cada serviço.",
    cold: "Cadeia do frio e IoT",
    infrastructure: "Infraestrutura hospitalar",
    photoCredit: "Fotografia do edifício",
    city: "Franca / São Paulo",
  },
  en: {
    title: "Clinical engineering.",
    accent: "Technology for care.",
    areas: "Four specialties. One integrated vision.",
    portfolio: "Explore our full scope",
    care: "Technology must work. Care cannot wait.",
    work: "How we care for your technology",
    scope: "Technical management, close to your institution",
    clinical: "The role of clinical engineering",
    assets: "Control, savings and freedom of choice.",
    overview: "A complete view of your equipment",
    model: "How our management model works",
    freedom: "Your assets. Your choices.",
    freedomBody:
      "Choose the providers you trust. Aion organizes the information and tracks the work your equipment needs.",
    hospital: "From design to operation",
    automation: "Two approaches. A more connected operation.",
    approach: "Our approach to automation",
    office: "OUR FRANCA OFFICE",
    officeTitle: "Close to you. Ready for the next challenge.",
    officeLead:
      "Aion is located at High Business Franca. A place to discuss your institution's needs and plan the next steps.",
    directions: "Get directions",
    visit: "Schedule a conversation",
    expand: "Explore the topics below to learn about each service.",
    cold: "Cold chain and IoT",
    infrastructure: "Hospital infrastructure",
    photoCredit: "Building photograph",
    city: "Franca / São Paulo",
  },
  es: {
    title: "Ingeniería clínica.",
    accent: "Tecnología para cuidar.",
    areas: "Cuatro especialidades. Una visión integrada.",
    portfolio: "Conozca nuestra actuación completa",
    care: "La tecnología debe funcionar. El cuidado no puede esperar.",
    work: "Cómo cuidamos su tecnología",
    scope: "Gestión técnica, cerca de su institución",
    clinical: "El papel de la ingeniería clínica",
    assets: "Control, ahorro y libertad de elección.",
    overview: "Una visión completa de sus equipos",
    model: "Cómo funciona nuestro modelo de gestión",
    freedom: "Sus activos. Sus decisiones.",
    freedomBody:
      "Mantenga la libertad de contratar proveedores de confianza. Aion organiza la información y acompaña las necesidades de sus equipos.",
    hospital: "Del proyecto a la operación",
    automation: "Dos frentes. Una operación más conectada.",
    approach: "Nuestro enfoque de automatización",
    office: "NUESTRA SEDE EN FRANCA",
    officeTitle: "Cerca de usted. Listos para el próximo desafío.",
    officeLead:
      "Aion está en High Business Franca. Un lugar para hablar de las necesidades de su institución y planificar los próximos pasos.",
    directions: "Cómo llegar",
    visit: "Agende una conversación",
    expand: "Explore los temas para conocer cada servicio.",
    cold: "Cadena de frío e IoT",
    infrastructure: "Infraestructura hospitalaria",
    photoCredit: "Fotografía del edificio",
    city: "Franca / São Paulo",
  },
};
function Panel({
  title,
  children,
  number,
  open = false,
}: {
  title: string;
  children: ReactNode;
  number?: string;
  open?: boolean;
}) {
  return (
    <details className="service-panel" open={open}>
      <summary>
        {number && <span className="detail-number">{number}</span>}
        <span>{title.replace(/^\+\s*/, "")}</span>
        <Plus size={20} aria-hidden="true" />
      </summary>
      <div className="panel-body">{children}</div>
    </details>
  );
}
function Paragraphs({ text }: { text: string }) {
  return (
    <>
      {text.split(/\n\s*\n/).map((p, i) => (
        <p key={i}>{p}</p>
      ))}
    </>
  );
}
export function HomePage({
  dict,
  lang,
}: {
  dict: typeof pt;
  lang: "pt" | "en" | "es";
}) {
  const t = homeCopy[lang],
    e = editorial[lang],
    contact = CONTACT_PAGE_PATH[lang];
  const labels = [
    dict.services.s1,
    dict.services.s2,
    dict.services.s3,
    dict.services.s4,
  ];
  return (
    <div className="aion-home">
      <a className="skip-link" href="#main-content">
        {t.skip}
      </a>
      <TopBar dict={dict.topbar} lang={lang} />
      <Navbar dict={dict.nav} lang={lang} />
      <main id="main-content">
        <section className="aion-hero">
          <div className="hero-grid aion-container">
            <div className="hero-content">
              <p className="eyebrow">
                <span className="status-dot" />
                {t.eyebrow}
              </p>
              <h1>
                {e.title}
                <br />
                <span>{e.accent}</span>
              </h1>
              <p className="hero-lead">{t.lead}</p>
              <div className="hero-actions">
                <Link href={contact} className="aion-button">
                  {t.cta}
                  <ArrowUpRight size={20} />
                </Link>
                <a href="#solucoes" className="hero-explore">
                  {t.explore}
                  <ArrowDown size={18} />
                </a>
              </div>
              <div className="hero-caption">
                <span />
                {t.caption}
              </div>
            </div>
            <div className="hero-visual">
              <div className="technical-ring" aria-hidden="true" />
              <div className="hero-photo">
                <Image
                  src="/images/services/clinica.jpg"
                  alt={dict.services.s1}
                  fill
                  priority
                  sizes="(max-width:760px) 100vw, 46vw"
                />
              </div>
              <div className="hero-photo-note">
                <Activity size={26} />
                <span>
                  {dict.hero.card1Title}
                  <br />
                  <strong>{dict.hero.card2Title}</strong>
                </span>
                <span className="note-cross" aria-hidden="true">
                  +
                </span>
              </div>
              <span className="hero-photo-index" aria-hidden="true">
                AION / 01
              </span>
            </div>
          </div>
        </section>
        <div className="focus-strip">
          <div className="aion-container">
            {t.focus.map((x, i) => {
              const Icon = icons[i];
              return (
                <span key={x}>
                  <Icon size={22} />
                  {x}
                </span>
              );
            })}
          </div>
        </div>
        <section id="solucoes" className="aion-section solutions">
          <div className="aion-container">
            <div className="section-heading">
              <div>
                <p className="eyebrow">{t.label}</p>
                <h2>{e.areas}</h2>
              </div>
              <p>{t.sub}</p>
            </div>
            <div className="solution-grid">
              {labels.map((label, i) => {
                const Icon = icons[i];
                return (
                  <a
                    href={`#${anchors[i]}`}
                    className={`solution-card solution-${i}`}
                    key={label}
                  >
                    <div className="solution-card-copy">
                      <div className="solution-top">
                        <Icon size={25} />
                        <span>0{i + 1}</span>
                      </div>
                      <h3>{label}</h3>
                      <p>{t.descriptions[i]}</p>
                      <span className="solution-link">
                        {t.more}
                        <ArrowUpRight size={19} />
                      </span>
                    </div>
                    <div className="solution-image">
                      <Image
                        src={photos[i]}
                        alt=""
                        fill
                        sizes="(max-width:760px) 35vw, 220px"
                      />
                    </div>
                  </a>
                );
              })}
            </div>
            <div className="portfolio-intro">
              <Panel title={e.portfolio}>
                <Paragraphs text={dict.services.intro} />
              </Panel>
            </div>
          </div>
        </section>
        <section className="aion-section clinical" id="engenharia-clinica">
          <div className="aion-container">
            <div className="editorial-grid">
              <div className="clinical-photo">
                <Image
                  src="/images/sections/clinica-cta.jpeg"
                  alt={dict.services.s1}
                  fill
                  sizes="(max-width:760px) 100vw, 44vw"
                />
                <div className="photo-label">
                  <span>01</span>
                  {dict.engClinica.heading}
                </div>
              </div>
              <div className="editorial-copy">
                <p className="eyebrow">01 / {dict.engClinica.heading}</p>
                <h2>{e.care}</h2>
                <p>{t.clinicalLead}</p>
                <Link href={contact} className="text-link">
                  {t.cta}
                  <ArrowUpRight size={20} />
                </Link>
              </div>
            </div>
            <div className="clinical-deliveries">
              {[
                { title: dict.hero.card1Title, desc: dict.hero.card1Desc },
                { title: dict.hero.card2Title, desc: dict.hero.card2Desc },
                { title: dict.hero.card3Title, desc: dict.hero.card3Desc },
              ].map((x, i) => (
                <Panel title={x.title} number={`0${i + 1}`} key={x.title}>
                  <p>{x.desc}</p>
                </Panel>
              ))}
            </div>
            <div className="expertise">
              <div className="expertise-heading">
                <p className="eyebrow">{e.work}</p>
                <p>{e.expand}</p>
              </div>
              <div className="expertise-grid">
                <Panel title={e.scope}>
                  <Paragraphs text={dict.engClinica.intro1} />
                  <Paragraphs text={dict.engClinica.intro2} />
                  <Paragraphs text={dict.engClinica.intro3} />
                </Panel>
                <Panel title={e.clinical}>
                  <Paragraphs text={dict.engClinica.detailIntro} />
                </Panel>
                {dict.engClinica.items.map((x, i) => (
                  <Panel key={x.title} title={x.title} number={`0${i + 1}`}>
                    <Paragraphs text={x.desc} />
                  </Panel>
                ))}
              </div>
            </div>
          </div>
        </section>
        <section className="aion-section assets" id="gestao-ativos">
          <div className="aion-container">
            <div className="editorial-grid">
              <div className="editorial-copy">
                <p className="eyebrow">02 / {dict.gestaoAtivos.heading}</p>
                <h2>{e.assets}</h2>
                <p>{t.assetLead}</p>
                <ul className="asset-points">
                  {t.assetPoints.map((x) => (
                    <li key={x}>
                      <Check size={18} />
                      {x}
                    </li>
                  ))}
                </ul>
                <div className="freedom-note">
                  <ScanLine size={28} />
                  <div>
                    <h3>{e.freedom}</h3>
                    <p>{e.freedomBody}</p>
                  </div>
                </div>
                <Link href={contact} className="text-link">
                  {t.cta}
                  <ArrowUpRight size={20} />
                </Link>
              </div>
              <div className="asset-details">
                <Panel title={e.overview}>
                  <Paragraphs text={dict.gestaoAtivos.intro} />
                </Panel>
                <Panel title={e.model}>
                  <Paragraphs text={dict.gestaoAtivos.detail} />
                </Panel>
                {dict.gestaoAtivos.items.map((x, i) => (
                  <Panel key={x.title} title={x.title} number={`0${i + 1}`}>
                    <Paragraphs text={x.desc} />
                  </Panel>
                ))}
              </div>
            </div>
          </div>
        </section>
        <section className="aion-section hospital" id="engenharia-hospitalar">
          <div className="aion-container">
            <div className="wide-feature-photo">
              <Image
                src="/images/services/hospitalar.jpg"
                alt={dict.engHospitalar.heading}
                fill
                sizes="100vw"
              />
              <div className="feature-photo-tag">
                03 / {dict.engHospitalar.heading}
              </div>
            </div>
            <div className="feature-content-grid">
              <div>
                <p className="eyebrow">{e.hospital}</p>
                <h2>{t.hospital}</h2>
                <p className="section-lead">{t.hospitalLead}</p>
              </div>
              <div>
                <Panel title={dict.engHospitalar.subtitle} open>
                  <Paragraphs text={dict.engHospitalar.body} />
                </Panel>
                <Panel
                  title={
                    dict.engHospitalar.togetherSubtitle ||
                    dict.engHospitalar.together
                  }
                >
                  <Paragraphs text={dict.engHospitalar.togetherBody} />
                </Panel>
                <Link href={contact} className="text-link">
                  {t.cta}
                  <ArrowUpRight size={20} />
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section className="aion-section automation" id="automacao-hospitalar">
          <div className="aion-container">
            <div className="editorial-grid">
              <div className="editorial-copy">
                <p className="eyebrow">04 / {dict.automacao.heading}</p>
                <h2>{e.automation}</h2>
                <p>{t.automationLead}</p>
                <div className="automation-tags">
                  <span>
                    <Activity size={19} />
                    {e.cold}
                  </span>
                  <span>
                    <Workflow size={19} />
                    {e.infrastructure}
                  </span>
                </div>
              </div>
              <div className="automation-photo">
                <Image
                  src="/images/services/automacao-grid.jpg"
                  alt={e.cold}
                  fill
                  sizes="(max-width:760px) 100vw, 45vw"
                />
                <span className="automation-photo-label">IoT / AION</span>
              </div>
            </div>
            <div className="automation-details">
              <Panel title={dict.automacao.subtitle}>
                <Paragraphs text={dict.automacao.body} />
              </Panel>
              <Panel title={dict.automacao.ctaTitle}>
                <Paragraphs text={dict.automacao.ctaBody} />
              </Panel>
            </div>
          </div>
        </section>
        <section className="aion-section office" id="sede">
          <div className="aion-container office-grid">
            <div className="office-photo">
              <Image
                src="/images/office/high-business-franca.jpg"
                alt="High Business Franca"
                fill
                sizes="(max-width:760px) 100vw, 50vw"
              />
              <span className="office-photo-label">
                HIGH BUSINESS
                <br />
                <strong>FRANCA</strong>
              </span>
            </div>
            <div className="office-copy">
              <p className="eyebrow">{e.office}</p>
              <h2>{e.officeTitle}</h2>
              <p>{e.officeLead}</p>
              <div className="office-address">
                <MapPin size={24} />
                <div>
                  <strong>High Business Franca</strong>
                  <p>{dict.topbar.address2}</p>
                </div>
              </div>
              <div className="office-actions">
                <Link href={contact} className="aion-button">
                  {e.visit}
                  <ArrowUpRight size={20} />
                </Link>
                <a
                  className="text-link"
                  href="https://www.google.com/maps/search/?api=1&query=High+Business+Franca+Av+Ismael+Alonso+y+Alonso+1219"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {e.directions}
                  <ArrowUpRight size={18} />
                </a>
              </div>
              <a
                className="photo-credit"
                href="https://www.agnelloimoveis.com.br/lancamentos/Edificio-High-Business-Franca-1586"
                target="_blank"
                rel="noopener noreferrer"
              >
                {e.photoCredit}: Agnello Imóveis
              </a>
            </div>
          </div>
        </section>
        <section className="contact-band">
          <div className="aion-container">
            <div>
              <p className="eyebrow">AION ENGENHARIA</p>
              <h2>{t.closing}</h2>
              <p>{t.closingLead}</p>
            </div>
            <Link href={contact} className="aion-button">
              {t.cta}
              <ArrowRight size={22} />
            </Link>
          </div>
        </section>
      </main>
      <Footer dict={dict.footer} />
    </div>
  );
}

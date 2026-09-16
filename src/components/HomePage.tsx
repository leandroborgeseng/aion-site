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
  Check,
  Plus,
} from "lucide-react";
import { Navbar } from "./Navbar";
import { TopBar } from "./TopBar";
import { Footer } from "./Footer";
import { CONTACT_PAGE_PATH } from "@/lib/contact-routes";
import type pt from "@/content/aion-pt.json";

const copy = {
  pt: {
    eyebrow: "ENGENHARIA A SERVIÇO DA VIDA",
    title: "Tecnologia que cuida.",
    accent: "Engenharia que conecta.",
    lead: "Cuidamos da tecnologia e da infraestrutura para que sua instituição se concentre no que mais importa: as pessoas.",
    cta: "Converse com um especialista",
    explore: "Explore nossas soluções",
    caption: "Precisão técnica. Cuidado em cada detalhe.",
    label: "UMA VISÃO INTEGRADA",
    heading: "Da tecnologia ao cuidado.",
    sub: "Soluções que se conectam à realidade da sua instituição, do equipamento à infraestrutura.",
    more: "Conheça a solução",
    descriptions: [
      "Segurança e disponibilidade para o seu parque de equipamentos médicos.",
      "Informação e planejamento para decisões mais inteligentes.",
      "Projetos funcionais, da concepção ao início da operação.",
      "Monitoramento e controle para uma operação conectada.",
    ],
    clinical: "Mais confiança em cada atendimento.",
    clinicalLead:
      "Manutenção, calibração e gestão técnica integradas à rotina da sua instituição. Uma atuação próxima para cuidar de todo o ciclo de vida da tecnologia em saúde.",
    pillars: "ESPECIALIDADES",
    assets: "Seu parque tecnológico. Uma visão completa.",
    assetLead:
      "Saiba o que sua instituição possui, acompanhe o histórico dos equipamentos e planeje os próximos investimentos com critérios técnicos.",
    assetPoints: [
      "Inventário e rastreabilidade",
      "Planejamento de manutenção",
      "Gestão do ciclo de vida",
      "Liberdade para escolher prestadores",
    ],
    hospital: "Espaços pensados para cuidar.",
    hospitalLead:
      "Projetos arquitetônicos, planejamento técnico e apoio às aprovações sanitárias. Acompanhamos sua instituição do projeto à operação.",
    automation: "Conecte sua operação. Antecipe necessidades.",
    automationLead:
      "Da cadeia do frio à climatização hospitalar: supervisão remota, registros de temperatura e alertas para apoiar sua equipe na rotina.",
    details: "Veja os detalhes",
    closing: "Vamos cuidar do próximo passo?",
    closingLead:
      "Conte o que sua instituição precisa. Juntos, encontramos a solução técnica adequada à sua realidade.",
    places: "São Paulo · Franca",
    focus: [
      "Segurança assistencial",
      "Eficiência operacional",
      "Gestão de tecnologia",
    ],
    skip: "Ir para o conteúdo",
  },
  en: {
    eyebrow: "ENGINEERING IN THE SERVICE OF LIFE",
    title: "Technology that cares.",
    accent: "Engineering that connects.",
    lead: "We take care of technology and infrastructure so your institution can focus on what matters most: people.",
    cta: "Talk to a specialist",
    explore: "Explore our solutions",
    caption: "Technical precision. Care in every detail.",
    label: "AN INTEGRATED APPROACH",
    heading: "From technology to care.",
    sub: "Solutions tailored to your institution, from medical equipment to infrastructure.",
    more: "Explore the solution",
    descriptions: [
      "Safety and availability for your medical equipment.",
      "Information and planning for smarter decisions.",
      "Functional projects, from planning to operation.",
      "Monitoring and control for a connected operation.",
    ],
    clinical: "More confidence in every interaction.",
    clinicalLead:
      "Maintenance, calibration and technical management integrated into your institution's routine. Dedicated support throughout the healthcare technology lifecycle.",
    pillars: "EXPERTISE",
    assets: "Your technology assets. A complete picture.",
    assetLead:
      "Know your inventory, track equipment history and plan investments using technical criteria.",
    assetPoints: [
      "Inventory and traceability",
      "Maintenance planning",
      "Lifecycle management",
      "Freedom to choose providers",
    ],
    hospital: "Spaces designed for care.",
    hospitalLead:
      "Architectural projects, technical planning and support for health authority approvals. From design to operation.",
    automation: "Connect your operation. Anticipate needs.",
    automationLead:
      "From cold chain to hospital climate control: remote supervision, temperature records and alerts to support your team.",
    details: "View details",
    closing: "Ready for the next step?",
    closingLead:
      "Tell us what your institution needs. Together, we will find the right technical solution.",
    places: "São Paulo · Franca",
    focus: [
      "Patient safety",
      "Operational efficiency",
      "Technology management",
    ],
    skip: "Skip to content",
  },
  es: {
    eyebrow: "INGENIERÍA AL SERVICIO DE LA VIDA",
    title: "Tecnología que cuida.",
    accent: "Ingeniería que conecta.",
    lead: "Cuidamos la tecnología y la infraestructura para que su institución se concentre en lo más importante: las personas.",
    cta: "Hable con un especialista",
    explore: "Explore nuestras soluciones",
    caption: "Precisión técnica. Cuidado en cada detalle.",
    label: "UNA VISIÓN INTEGRADA",
    heading: "De la tecnología al cuidado.",
    sub: "Soluciones para la realidad de su institución, desde los equipos hasta la infraestructura.",
    more: "Conozca la solución",
    descriptions: [
      "Seguridad y disponibilidad para sus equipos médicos.",
      "Información y planificación para mejores decisiones.",
      "Proyectos funcionales, del diseño a la operación.",
      "Supervisión y control para una operación conectada.",
    ],
    clinical: "Más confianza en cada atención.",
    clinicalLead:
      "Mantenimiento, calibración y gestión técnica integrados a la rutina de su institución. Apoyo durante todo el ciclo de vida de la tecnología sanitaria.",
    pillars: "ESPECIALIDADES",
    assets: "Sus activos tecnológicos. Una visión completa.",
    assetLead:
      "Conozca su inventario, siga el historial de los equipos y planifique inversiones con criterios técnicos.",
    assetPoints: [
      "Inventario y trazabilidad",
      "Planificación del mantenimiento",
      "Gestión del ciclo de vida",
      "Libertad para elegir proveedores",
    ],
    hospital: "Espacios pensados para cuidar.",
    hospitalLead:
      "Proyectos arquitectónicos, planificación técnica y apoyo a las aprobaciones sanitarias. Del proyecto a la operación.",
    automation: "Conecte su operación. Anticipe necesidades.",
    automationLead:
      "De la cadena de frío a la climatización hospitalaria: supervisión remota, registros de temperatura y alertas para apoyar a su equipo.",
    details: "Ver detalles",
    closing: "¿Damos el próximo paso?",
    closingLead:
      "Cuéntenos qué necesita su institución. Juntos encontraremos la solución técnica adecuada.",
    places: "São Paulo · Franca",
    focus: [
      "Seguridad asistencial",
      "Eficiencia operativa",
      "Gestión tecnológica",
    ],
    skip: "Ir al contenido",
  },
};
const anchors = [
  "engenharia-clinica",
  "gestao-ativos",
  "engenharia-hospitalar",
  "automacao-hospitalar",
];
const icons = [Activity, ScanLine, ShieldCheck, Workflow];

export function HomePage({
  dict,
  lang,
}: {
  dict: typeof pt;
  lang: "pt" | "en" | "es";
}) {
  const t = copy[lang];
  const contact = CONTACT_PAGE_PATH[lang];
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
          <div className="hero-photo">
            <Image
              src="/images/hero/slide-1.jpeg"
              alt=""
              fill
              priority
              sizes="(max-width: 760px) 100vw, 65vw"
            />
          </div>
          <div className="aion-container hero-content">
            <p className="eyebrow">
              <span className="status-dot" />
              {t.eyebrow}
            </p>
            <h1>
              {t.title}
              <br />
              <span>{t.accent}</span>
            </h1>
            <p className="hero-lead">{t.lead}</p>
            <div className="hero-actions">
              <Link className="aion-button" href={contact}>
                {t.cta}
                <ArrowUpRight size={18} />
              </Link>
              <a className="hero-explore" href="#solucoes">
                {t.explore}
                <ArrowDown size={16} />
              </a>
            </div>
            <div className="hero-caption">
              <span className="caption-line" />
              {t.caption}
            </div>
          </div>
          <div className="hero-index" aria-hidden="true">
            AION / ENGENHARIA
          </div>
        </section>
        <div className="focus-strip">
          <div className="aion-container">
            {t.focus.map((item, i) => {
              const Icon = icons[i];
              return (
                <span key={item}>
                  <Icon size={20} strokeWidth={1.5} />
                  {item}
                </span>
              );
            })}
          </div>
        </div>
        <section className="aion-section solutions" id="solucoes">
          <div className="aion-container">
            <div className="section-heading">
              <div>
                <p className="eyebrow">{t.label}</p>
                <h2>{t.heading}</h2>
              </div>
              <p>{t.sub}</p>
            </div>
            <div className="solution-grid">
              {labels.map((label, i) => {
                const Icon = icons[i];
                return (
                  <a
                    href={`#${anchors[i]}`}
                    key={label}
                    className="solution-card"
                  >
                    <div className="solution-top">
                      <Icon size={29} strokeWidth={1.4} />
                      <span>0{i + 1}</span>
                    </div>
                    <h3>{label}</h3>
                    <p>{t.descriptions[i]}</p>
                    <span className="solution-link">
                      {t.more}
                      <ArrowUpRight size={18} />
                    </span>
                  </a>
                );
              })}
            </div>
          </div>
        </section>
        <section className="aion-section clinical" id="engenharia-clinica">
          <div className="aion-container">
            <div className="editorial-grid">
              <div className="clinical-photo">
                <Image
                  src="/images/services/clinica.jpg"
                  alt={dict.services.s1}
                  fill
                  sizes="(max-width:760px) 100vw, 45vw"
                />
                <div className="photo-label">
                  <Activity size={22} />
                  <span>{dict.services.s1}</span>
                </div>
              </div>
              <div className="editorial-copy">
                <p className="eyebrow">01 / {dict.engClinica.heading}</p>
                <h2>{t.clinical}</h2>
                <p>{t.clinicalLead}</p>
                <div className="clinical-tags">
                  {[
                    dict.hero.card1Title,
                    dict.hero.card2Title,
                    dict.hero.card3Title,
                  ].map((x) => (
                    <span key={x}>
                      <Check size={17} />
                      {x}
                    </span>
                  ))}
                </div>
                <Link className="text-link" href={contact}>
                  {t.cta}
                  <ArrowUpRight size={18} />
                </Link>
              </div>
            </div>
            <div className="expertise">
              <p className="eyebrow">{t.pillars}</p>
              <div className="expertise-grid">
                {dict.engClinica.items.map((item, i) => (
                  <details key={item.title}>
                    <summary>
                      <span className="detail-number">0{i + 1}</span>
                      {item.title}
                      <Plus size={18} />
                    </summary>
                    <p>{item.desc}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>
        <section className="aion-section assets" id="gestao-ativos">
          <div className="aion-container editorial-grid">
            <div className="editorial-copy">
              <p className="eyebrow">02 / {dict.gestaoAtivos.heading}</p>
              <h2>{t.assets}</h2>
              <p>{t.assetLead}</p>
              <ul className="asset-points">
                {t.assetPoints.map((x) => (
                  <li key={x}>
                    <Check size={18} />
                    {x}
                  </li>
                ))}
              </ul>
              <Link className="aion-button" href={contact}>
                {t.cta}
                <ArrowUpRight size={18} />
              </Link>
            </div>
            <div className="asset-details">
              {dict.gestaoAtivos.items.map((item, i) => (
                <details key={item.title} open={i === 0}>
                  <summary>
                    <span className="detail-number">0{i + 1}</span>
                    {item.title.replace(/^\+\s*/, "")}
                    <Plus size={18} />
                  </summary>
                  <p>{item.desc}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
        <section className="aion-section">
          <div className="aion-container twin-grid">
            {[
              {
                id: anchors[2],
                label: dict.engHospitalar.heading,
                title: t.hospital,
                lead: t.hospitalLead,
                image: "/images/services/hospitalar.jpg",
                body: dict.engHospitalar.body,
              },
              {
                id: anchors[3],
                label: dict.automacao.heading,
                title: t.automation,
                lead: t.automationLead,
                image: "/images/services/automacao-grid.jpg",
                body: dict.automacao.body,
              },
            ].map((s, i) => (
              <article className="feature-card" key={s.id} id={s.id}>
                <div className={`feature-image feature-image-${i}`}>
                  <Image
                    src={s.image}
                    alt={s.label}
                    fill
                    sizes="(max-width:760px) 100vw, 45vw"
                  />
                </div>
                <div className="feature-copy">
                  <p className="eyebrow">
                    0{i + 3} / {s.label}
                  </p>
                  <h2>{s.title}</h2>
                  <p>{s.lead}</p>
                  <details>
                    <summary>
                      {t.details}
                      <Plus size={18} />
                    </summary>
                    <p>{s.body}</p>
                  </details>
                </div>
              </article>
            ))}
          </div>
        </section>
        <section className="contact-band" id="conversa">
          <div className="aion-container">
            <div>
              <p className="eyebrow">AION ENGENHARIA</p>
              <h2>{t.closing}</h2>
              <p>{t.closingLead}</p>
            </div>
            <Link className="aion-button" href={contact}>
              {t.cta}
              <ArrowRight size={18} />
            </Link>
          </div>
        </section>
      </main>
      <Footer dict={dict.footer} />
    </div>
  );
}

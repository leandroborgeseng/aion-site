import { getSiteUrl } from "@/lib/seo";
import { siteImages } from "@/lib/site-images";

/** Dados alinhados ao rodapé PT (endereço principal Paulista). */
const ld = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "AION Engenharia",
  url: getSiteUrl(),
  image: `${getSiteUrl()}${siteImages.logo}`,
  telephone: "+551630300445",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Avenida Paulista, 1636, Conj. 1504",
    addressLocality: "São Paulo",
    addressRegion: "SP",
    postalCode: "01310-200",
    addressCountry: "BR",
  },
} as const;

export function JsonLdLocalBusiness() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
    />
  );
}

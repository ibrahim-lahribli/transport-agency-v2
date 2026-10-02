import type { Service } from "@/schemas/service";
import { getServiceDisplayPrice } from "@/seo/price";
import { formatIsoDuration } from "@/seo/duration";
import { SITE_URL, getContact } from "../../config/site";

export interface JsonLd {
  "@context": "https://schema.org";
  "@type": string | string[];
  [key: string]: unknown;
}

function JsonLdScript({ data, id }: { data: JsonLd; id: string }) {
  return (
    <script
      id={id}
      type="application/ld+json"
      // Structured data stays in the server-rendered DOM.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function TravelAgencyJsonLd() {
  const contact = getContact();
  const data: JsonLd = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: contact.tradingName,
    legalName: contact.legalName,
    url: SITE_URL,
    email: contact.email,
    telephone: contact.whatsapp,
    image: `${SITE_URL}/opengraph-image`,
    address: {
      "@type": "PostalAddress",
      streetAddress: contact.address,
      addressLocality: "Agadir",
      addressRegion: "Souss-Massa",
      addressCountry: "MA",
    },
    areaServed: [
      { "@type": "City", name: "Agadir" },
      { "@type": "City", name: "Taghazout" },
      { "@type": "AdministrativeArea", name: "Souss-Massa" },
    ],
    knowsLanguage: ["en", "fr", "ar"],
  };
  return <JsonLdScript data={data} id="ld-agency" />;
}

export interface BreadcrumbEntry {
  name: string;
  url: string;
}

export function BreadcrumbJsonLd({ items }: { items: BreadcrumbEntry[] }) {
  const data: JsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
  return <JsonLdScript data={data} id="ld-breadcrumb" />;
}

export function TouristTripJsonLd({
  service,
  canonicalUrl,
}: {
  service: Service;
  canonicalUrl: string;
}) {
  const price = getServiceDisplayPrice(service);
  const duration = formatIsoDuration(service.durationHours ?? service.activityHours);

  const data: JsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: service.title,
    description: service.summary,
    url: canonicalUrl,
    provider: { "@type": "TravelAgency", name: getContact().tradingName, url: SITE_URL },
    itinerary: (service.itinerary ?? []).map((step) => ({ "@type": "ListItem", name: step })),
    offers: {
      "@type": "Offer",
      price: price.amount,
      priceCurrency: price.currency,
      availability: "https://schema.org/InStock",
      url: canonicalUrl,
    },
    ...(duration ? { duration } : {}),
  };

  return <JsonLdScript data={data} id="ld-trip" />;
}

export function ArticleJsonLd({
  headline,
  description,
  url,
  datePublished,
  locale,
}: {
  headline: string;
  description: string;
  url: string;
  datePublished: string;
  locale: string;
}) {
  const contact = getContact();
  const data: JsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    inLanguage: locale,
    datePublished,
    dateModified: datePublished,
    mainEntityOfPage: url,
    author: { "@type": "Organization", name: contact.tradingName, url: SITE_URL },
    publisher: { "@type": "Organization", name: contact.tradingName, url: SITE_URL },
  };
  return <JsonLdScript data={data} id="ld-article" />;
}

export function FAQPageJsonLd({ items }: { items?: { q: string; a: string }[] }) {
  if (!items || items.length === 0) return null;
  const data: JsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
  return <JsonLdScript data={data} id="ld-faq" />;
}

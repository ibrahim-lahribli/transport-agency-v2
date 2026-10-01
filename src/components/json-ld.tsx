import React from "react";
import { businessProfile } from "../../config/business";
import type { FAQItem, Service } from "@/schemas/service";
import { getServiceDisplayPrice } from "@/seo/price";
import { formatIsoDuration } from "@/seo/duration";
import { SITE_URL } from "@/seo/metadata";

export function TravelAgencyJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "@id": `${SITE_URL}/#agency`,
    name: businessProfile.tradingName || businessProfile.legalName,
    legalName: businessProfile.legalName,
    url: SITE_URL,
    telephone: businessProfile.whatsapp,
    email: businessProfile.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: businessProfile.address,
      addressLocality: "Agadir",
      addressRegion: "Souss-Massa",
      addressCountry: "MA",
    },
    priceRange: "€€",
    currenciesAccepted: "EUR, MAD",
    identifier: [
      {
        "@type": "PropertyValue",
        name: "ICE",
        value: businessProfile.ice,
      },
      {
        "@type": "PropertyValue",
        name: "Licence",
        value: businessProfile.licence,
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function BreadcrumbJsonLd({ items }: { items: BreadcrumbItem[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function TouristTripJsonLd({
  service,
  canonicalUrl,
}: {
  service: Service;
  canonicalUrl: string;
}) {
  const displayPrice = getServiceDisplayPrice(service);
  const duration = formatIsoDuration(service.durationHours || service.activityHours);

  const schema = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: service.title,
    description: service.summary,
    url: canonicalUrl,
    touristType: "Tourists",
    // Transfers and other untimed services have no duration; omit it rather
    // than publishing a fabricated "PT1H".
    ...(duration ? { duration } : {}),
    provider: {
      "@type": "TravelAgency",
      name: businessProfile.tradingName || businessProfile.legalName,
      url: SITE_URL,
    },
    offers: {
      "@type": "Offer",
      price: displayPrice.amount,
      priceCurrency: displayPrice.currency,
      availability: "https://schema.org/InStock",
      url: canonicalUrl,
      validFrom: "2026-01-01",
    },
    ...(service.itinerary && service.itinerary.length > 0
      ? {
          itinerary: {
            "@type": "ItemList",
            itemListElement: service.itinerary.map((step, idx) => ({
              "@type": "ListItem",
              position: idx + 1,
              name: step,
            })),
          },
        }
      : {}),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function FAQPageJsonLd({ items }: { items?: FAQItem[] }) {
  if (!items || items.length === 0) return null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

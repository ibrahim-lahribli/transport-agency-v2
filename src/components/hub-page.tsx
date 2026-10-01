import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getServicesByCategory, hubToCategory, type HubKey } from "@/seo/content";
import { getServiceDisplayPrice } from "@/seo/price";
import { buildPageMetadata, SITE_URL } from "@/seo/metadata";
import { BreadcrumbJsonLd } from "@/components/json-ld";

interface HubConfig {
  title: { en: string; fr: string };
  seoTitle: { en: string; fr: string };
  seoDescription: { en: string; fr: string };
  intro: { en: string; fr: string };
  badge: { en: string; fr: string };
}

const HUB_CONFIGS: Record<HubKey, HubConfig> = {
  excursions: {
    title: {
      en: "Excursions from Agadir",
      fr: "Excursions au départ d'Agadir",
    },
    seoTitle: {
      en: "Excursions from Agadir: Day Trips & Guided Tours",
      fr: "Excursions au départ d'Agadir : Journées & Visites Guidées",
    },
    seoDescription: {
      en: "Discover guided day trips from Agadir to Paradise Valley, Massa & Tiznit, Taroudant, Essaouira and Marrakech. Professional drivers and licensed local guides.",
      fr: "Découvrez nos excursions guidées au départ d'Agadir : Vallée du Paradis, Massa, Essaouira, Marrakech. Chauffeurs professionnels et guides locaux.",
    },
    intro: {
      en: "Explore southern Morocco beyond the beach. All day excursions include air-conditioned vehicle transport, hotel pickup and drop-off in Agadir, and experienced local driver-guides.",
      fr: "Partez à la découverte des paysages du sud marocain. Toutes nos excursions incluent le transport climatisé, la prise en charge à votre hôtel à Agadir et un chauffeur-guide d'expérience.",
    },
    badge: {
      en: "Guided Day Trips",
      fr: "Circuits & Journées Guidées",
    },
  },
  activities: {
    title: {
      en: "Activities & Adventures in Agadir",
      fr: "Activités & Aventures à Agadir",
    },
    seoTitle: {
      en: "Agadir Activities & Outdoor Adventures",
      fr: "Activités à Agadir : Bateau, Quad, Dromadaire",
    },
    seoDescription: {
      en: "Experience top outdoor activities in Agadir: Atlantic boat cruises with fish barbecue, sand dune quad biking, camel rides, horse riding and fantasia dinner shows.",
      fr: "Les meilleures activités à Agadir : sorties en bateau avec barbecue de poisson, quad dans les dunes côtières, balades en dromadaire et soirées fantasia.",
    },
    intro: {
      en: "From the Atlantic ocean to the Souss valley sand dunes, make your holiday unforgettable with our curated half-day outdoor and cultural experiences.",
      fr: "De l'océan Atlantique aux dunes de sable du Souss, vivez des moments uniques grâce à notre sélection d'activités de plein air et de soirées traditionnelles.",
    },
    badge: {
      en: "Outdoor & Cultural Experiences",
      fr: "Plein Air & Expériences",
    },
  },
  transfers: {
    title: {
      en: "Private Transfers & Tourist Transport",
      fr: "Transferts privés & Transport touristique",
    },
    seoTitle: {
      en: "Agadir Private Transfers: Airport & Intercity Transport",
      fr: "Transferts Privés Agadir : Aéroport & Transport Touristique",
    },
    seoDescription: {
      en: "Reliable, private airport transfers between Agadir-Al Massira Airport, Taghazout and Agadir hotels. Also offering intercity tourist transport with private driver.",
      fr: "Transferts privés fiables depuis l'aéroport Agadir-Al Massira vers Agadir et Taghazout. Transport touristique interurbain et mise à disposition.",
    },
    intro: {
      en: "Punctual, private airport shuttles and day hire vehicles with licensed professional drivers. Fixed prices per vehicle with flight tracking and direct terminal greeting.",
      fr: "Navettes aéroport privées et véhicules avec chauffeur agréé à la journée. Tarifs fixes par véhicule avec suivi des vols et accueil dans le terminal.",
    },
    badge: {
      en: "Private Chauffeur Service",
      fr: "Chauffeur Privé & Navettes",
    },
  },
};

export function generateHubMetadata(hub: HubKey, locale: string): Metadata {
  const config = HUB_CONFIGS[hub];
  const isFr = locale === "fr";

  return buildPageMetadata({
    title: isFr ? config.seoTitle.fr : config.seoTitle.en,
    description: isFr ? config.seoDescription.fr : config.seoDescription.en,
    locale,
    pathname: `/${locale}/${hub}`,
    enPath: `/en/${hub}`,
    frPath: `/fr/${hub}`,
  });
}

export function HubPageView({ hub, locale }: { hub: HubKey; locale: string }) {
  const category = hubToCategory(hub);
  if (!category) notFound();

  const config = HUB_CONFIGS[hub];
  const isFr = locale === "fr";
  const services = getServicesByCategory(category, locale);

  const breadcrumbs = [
    {
      name: isFr ? "Accueil" : "Home",
      url: `${SITE_URL}/${locale}`,
    },
    {
      name: isFr ? config.title.fr : config.title.en,
      url: `${SITE_URL}/${locale}/${hub}`,
    },
  ];

  return (
    <div className="mx-auto max-w-5xl ps-4 pe-4 py-10 sm:py-16">
      <BreadcrumbJsonLd items={breadcrumbs} />

      {/* Breadcrumb nav */}
      <nav aria-label="Breadcrumb" className="mb-6 text-xs text-ink-muted">
        <ol className="flex items-center gap-2">
          <li>
            <Link href={`/${locale}`} className="hover:text-ink inline-block py-1">
              {isFr ? "Accueil" : "Home"}
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="font-semibold text-ink py-1" aria-current="page">
            {isFr ? config.title.fr : config.title.en}
          </li>
        </ol>
      </nav>

      <header className="mb-12 text-start">
        <p className="text-xs font-bold uppercase tracking-wider text-accent-strong mb-2">
          {isFr ? config.badge.fr : config.badge.en}
        </p>
        {/* eslint-disable-next-line react/no-unknown-property */}
        <h1
          className="text-balance text-4xl font-extrabold tracking-tight text-ink sm:text-5xl"
          // @ts-expect-error fetchpriority is a valid HTML attribute for LCP hinting
          fetchpriority="high"
        >
          {isFr ? config.title.fr : config.title.en}
        </h1>
        <p className="mt-4 max-w-3xl text-sm text-ink-muted sm:text-base">
          {isFr ? config.intro.fr : config.intro.en}
        </p>
      </header>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => {
          const price = getServiceDisplayPrice(service);
          return (
            <article
              key={service.id}
              className="flex flex-col justify-between rounded-lg border border-line bg-surface p-6 hover:border-accent transition-colors shadow-xs"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-ink-muted mb-2">
                  <span className="font-bold text-accent-strong uppercase">
                    {service.durationHours
                      ? `${service.durationHours} ${isFr ? "h" : "hours"}`
                      : isFr ? "Service" : "Transfer"}
                  </span>
                  <span>{service.languages.join(", ")}</span>
                </div>

                <h2 className="text-lg font-bold text-ink hover:text-accent transition-colors">
                  <Link href={`/${locale}/${service.slug}`} className="inline-block py-1">
                    {service.title}
                  </Link>
                </h2>

                <p className="mt-3 text-xs text-ink-muted line-clamp-4 leading-relaxed">
                  {service.summary}
                </p>

                {service.highlights && service.highlights.length > 0 && (
                  <ul className="mt-4 space-y-1 text-xs text-ink">
                    {service.highlights.slice(0, 3).map((h, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-accent-strong font-bold" aria-hidden="true">•</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-line flex items-center justify-between">
                <div>
                  <span className="text-xs text-ink-muted block">
                    {isFr ? "À partir de" : "From"}
                  </span>
                  <span className="text-sm font-bold text-accent-strong">
                    {price.formatted[locale as "en" | "fr"]}
                  </span>
                </div>
                <Link
                  href={`/${locale}/${service.slug}`}
                  className="rounded-md bg-surface-muted ps-3.5 pe-3.5 py-2 text-xs font-semibold text-ink hover:bg-accent-strong hover:text-white transition-colors inline-flex items-center min-h-[36px]"
                >
                  {isFr ? "Voir l'offre →" : "View tour →"}
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

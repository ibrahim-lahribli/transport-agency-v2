import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LOCALES } from "@/i18n/locales";
import { getServicesByCategory } from "@/seo/content";
import { getServiceDisplayPrice } from "@/seo/price";
import { buildPageMetadata, SITE_URL } from "@/seo/metadata";
import { BreadcrumbJsonLd } from "@/components/json-ld";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isFr = locale === "fr";

  return buildPageMetadata({
    title: isFr
      ? "Excursions, activités et transferts à Agadir | Agence locale"
      : "Agadir Tours, Excursions & Transfers | Local Travel Agency",
    description: isFr
      ? "Réservez vos sorties en bateau, excursions dans le Souss, quad sur les dunes et transferts aéroport avec notre agence locale agréée à Agadir."
      : "Book authentic Agadir boat cruises, desert excursions, quad biking and reliable private airport transfers with our licensed local agency.",
    locale,
    pathname: `/${locale}`,
    enPath: "/en",
    frPath: "/fr",
  });
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!LOCALES.includes(locale as any)) {
    notFound();
  }

  const isFr = locale === "fr";
  const excursions = getServicesByCategory("excursion", locale);
  const activities = getServicesByCategory("activity", locale);
  const transfers = getServicesByCategory("transfer", locale);

  const breadcrumbs = [
    {
      name: isFr ? "Accueil" : "Home",
      url: `${SITE_URL}/${locale}`,
    },
  ];

  return (
    <div className="mx-auto max-w-5xl ps-4 pe-4 py-10 sm:py-16">
      <BreadcrumbJsonLd items={breadcrumbs} />

      {/* Hero Section */}
      <section className="mb-14 text-start">
        <p className="text-xs font-bold uppercase tracking-wider text-accent mb-2">
          {isFr ? "Agence de transport et tourisme à Agadir" : "Local Souss-Massa Tour Operator"}
        </p>
        <h1 className="text-balance text-3xl font-extrabold tracking-tight text-ink sm:text-5xl">
          {isFr
            ? "Tours, excursions et transferts à Agadir"
            : "Agadir tours, excursions and transfers"}
        </h1>
        <p className="mt-4 max-w-2xl text-base text-ink-muted sm:text-lg">
          {isFr
            ? "Découvrez le meilleur du sud marocain avec des chauffeurs professionnels et guides locaux expérimentés. Réservation directe, tarifs transparents en euros et dirhams."
            : "Discover the best of southern Morocco with professional drivers and experienced local guides. Direct booking, transparent pricing in EUR and dirhams."}
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href={`/${locale}/excursions`}
            className="rounded-md bg-accent ps-4 pe-4 py-2.5 text-sm font-semibold text-on-accent hover:bg-accent-strong transition-colors"
          >
            {isFr ? "Explorer les excursions" : "Browse Excursions"}
          </Link>
          <Link
            href={`/${locale}/activities`}
            className="rounded-md border border-line bg-surface ps-4 pe-4 py-2.5 text-sm font-semibold text-ink hover:border-ink transition-colors"
          >
            {isFr ? "Toutes les activités" : "All Activities"}
          </Link>
          <Link
            href={`/${locale}/transfers`}
            className="rounded-md border border-line bg-surface ps-4 pe-4 py-2.5 text-sm font-semibold text-ink hover:border-ink transition-colors"
          >
            {isFr ? "Transferts privés" : "Private Transfers"}
          </Link>
        </div>
      </section>

      {/* Excursions Hub Preview */}
      <section className="mb-14">
        <div className="flex items-baseline justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-ink">
              {isFr ? "Excursions au départ d'Agadir" : "Excursions from Agadir"}
            </h2>
            <p className="text-sm text-ink-muted mt-1">
              {isFr
                ? "Journées et demi-journées vers la Vallée du Paradis, Massa, Essaouira et Marrakech."
                : "Full-day and half-day trips to Paradise Valley, Massa, Essaouira and Marrakech."}
            </p>
          </div>
          <Link
            href={`/${locale}/excursions`}
            className="text-xs font-semibold text-accent hover:underline shrink-0 ms-4"
          >
            {isFr ? "Tout voir →" : "View all →"}
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {excursions.slice(0, 3).map((service) => {
            const price = getServiceDisplayPrice(service);
            return (
              <article
                key={service.id}
                className="flex flex-col justify-between rounded-lg border border-line bg-surface p-5 hover:border-accent/50 transition-colors shadow-xs"
              >
                <div>
                  <p className="text-xs font-medium uppercase text-accent mb-1">
                    {service.durationHours
                      ? `${service.durationHours} ${isFr ? "heures" : "hours"}`
                      : isFr ? "Journée" : "Day trip"}
                  </p>
                  <h3 className="text-base font-bold text-ink hover:text-accent transition-colors">
                    <Link href={`/${locale}/${service.slug}`}>
                      {service.title}
                    </Link>
                  </h3>
                  <p className="mt-2 text-xs text-ink-muted line-clamp-3">
                    {service.summary}
                  </p>
                </div>
                <div className="mt-4 pt-4 border-t border-line flex items-center justify-between">
                  <span className="text-xs font-semibold text-ink">
                    {isFr ? "À partir de " : "From "}
                    <span className="text-accent">{price.formatted[locale as "en" | "fr"]}</span>
                  </span>
                  <Link
                    href={`/${locale}/${service.slug}`}
                    className="text-xs font-semibold text-ink hover:text-accent"
                  >
                    {isFr ? "Détails →" : "Details →"}
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Activities Hub Preview */}
      <section className="mb-14">
        <div className="flex items-baseline justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-ink">
              {isFr ? "Activités et loisirs en plein air" : "Activities & Outdoor Adventures"}
            </h2>
            <p className="text-sm text-ink-muted mt-1">
              {isFr
                ? "Balades en mer, quad, buggy, équitation et soirées marocaines traditionnelles."
                : "Boat cruises, quad biking, dune adventures, horseback riding and cultural shows."}
            </p>
          </div>
          <Link
            href={`/${locale}/activities`}
            className="text-xs font-semibold text-accent hover:underline shrink-0 ms-4"
          >
            {isFr ? "Tout voir →" : "View all →"}
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {activities.slice(0, 3).map((service) => {
            const price = getServiceDisplayPrice(service);
            return (
              <article
                key={service.id}
                className="flex flex-col justify-between rounded-lg border border-line bg-surface p-5 hover:border-accent/50 transition-colors shadow-xs"
              >
                <div>
                  <p className="text-xs font-medium uppercase text-accent mb-1">
                    {service.durationHours
                      ? `${service.durationHours} ${isFr ? "heures" : "hours"}`
                      : isFr ? "Activité" : "Activity"}
                  </p>
                  <h3 className="text-base font-bold text-ink hover:text-accent transition-colors">
                    <Link href={`/${locale}/${service.slug}`}>
                      {service.title}
                    </Link>
                  </h3>
                  <p className="mt-2 text-xs text-ink-muted line-clamp-3">
                    {service.summary}
                  </p>
                </div>
                <div className="mt-4 pt-4 border-t border-line flex items-center justify-between">
                  <span className="text-xs font-semibold text-ink">
                    {isFr ? "À partir de " : "From "}
                    <span className="text-accent">{price.formatted[locale as "en" | "fr"]}</span>
                  </span>
                  <Link
                    href={`/${locale}/${service.slug}`}
                    className="text-xs font-semibold text-ink hover:text-accent"
                  >
                    {isFr ? "Détails →" : "Details →"}
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Transfers Hub Preview */}
      <section className="mb-14">
        <div className="flex items-baseline justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-ink">
              {isFr ? "Transferts et transport touristique" : "Transfers & Tourist Transport"}
            </h2>
            <p className="text-sm text-ink-muted mt-1">
              {isFr
                ? "Navettes privées aéroport Agadir-Al Massira, Taghazout et mise à disposition à la journée."
                : "Private airport transfers to Agadir hotels, Taghazout, and dedicated day hire drivers."}
            </p>
          </div>
          <Link
            href={`/${locale}/transfers`}
            className="text-xs font-semibold text-accent hover:underline shrink-0 ms-4"
          >
            {isFr ? "Tout voir →" : "View all →"}
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {transfers.map((service) => {
            const price = getServiceDisplayPrice(service);
            return (
              <article
                key={service.id}
                className="flex flex-col justify-between rounded-lg border border-line bg-surface p-5 hover:border-accent/50 transition-colors shadow-xs"
              >
                <div>
                  <p className="text-xs font-medium uppercase text-accent mb-1">
                    {isFr ? "Véhicule privé avec chauffeur" : "Private vehicle & driver"}
                  </p>
                  <h3 className="text-base font-bold text-ink hover:text-accent transition-colors">
                    <Link href={`/${locale}/${service.slug}`}>
                      {service.title}
                    </Link>
                  </h3>
                  <p className="mt-2 text-xs text-ink-muted line-clamp-3">
                    {service.summary}
                  </p>
                </div>
                <div className="mt-4 pt-4 border-t border-line flex items-center justify-between">
                  <span className="text-xs font-semibold text-ink">
                    {isFr ? "À partir de " : "From "}
                    <span className="text-accent">{price.formatted[locale as "en" | "fr"]}</span>
                  </span>
                  <Link
                    href={`/${locale}/${service.slug}`}
                    className="text-xs font-semibold text-ink hover:text-accent"
                  >
                    {isFr ? "Détails →" : "Details →"}
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Trust & Guarantee Section */}
      <section className="rounded-xl border border-line bg-surface-muted/50 p-6 sm:p-8">
        <h2 className="text-xl font-bold text-ink mb-4">
          {isFr ? "Pourquoi réserver avec notre agence locale ?" : "Why Book with Our Local Agency?"}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm text-ink-muted">
          <div>
            <p className="font-semibold text-ink mb-1">
              {isFr ? "Agrément et sécurité" : "Licensed & Insured"}
            </p>
            <p className="text-xs">
              {isFr
                ? "Agence marocaine agréée avec assurances transport de passagers à jour."
                : "Officially registered Moroccan transport operator with full commercial passenger insurance."}
            </p>
          </div>
          <div>
            <p className="font-semibold text-ink mb-1">
              {isFr ? "Tarifs clairs & sans surprise" : "Fixed, Transparent Pricing"}
            </p>
            <p className="text-xs">
              {isFr
                ? "Prix affichés en euros et dirhams, sans frais cachés ni arrêts commerciaux imposés."
                : "No hidden charges, fuel and tolls included, with clear indicative MAD exchange rates."}
            </p>
          </div>
          <div>
            <p className="font-semibold text-ink mb-1">
              {isFr ? "Assistance WhatsApp 7j/7" : "7/7 WhatsApp Support"}
            </p>
            <p className="text-xs">
              {isFr
                ? "Confirmation rapide et assistance directe avant et pendant votre séjour."
                : "Prompt confirmation and continuous direct communication for all your requests."}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

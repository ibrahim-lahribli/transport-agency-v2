import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { LOCALES, isAppLocale } from "@/i18n/locales";
import { Link } from "@/i18n/routing";
import {
  getServiceBySlug,
  getServices,
  getReciprocalSlugs,
  categoryToHub,
  getRelatedServices,
  type HubKey,
} from "@/seo/content";
import { getServiceDisplayPrice } from "@/seo/price";
import { buildPageMetadata, SITE_URL } from "@/seo/metadata";
import { BreadcrumbJsonLd, FAQPageJsonLd, TouristTripJsonLd } from "@/components/json-ld";

const HUB_HREF: Record<HubKey, "/excursions" | "/activities" | "/transfers"> = {
  excursions: "/excursions",
  activities: "/activities",
  transfers: "/transfers",
};

export function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of LOCALES) {
    for (const service of getServices(locale)) {
      params.push({ locale, slug: service.slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isAppLocale(locale)) return { title: "Not Found" };

  const service = getServiceBySlug(slug, locale);
  if (!service) {
    return { title: "Service Not Found" };
  }

  const reciprocal = getReciprocalSlugs(service.id);

  return buildPageMetadata({
    title: service.seo.title,
    description: service.seo.description,
    locale,
    pathname: `/${locale}/${service.slug}`,
    enPath: `/en/${reciprocal.enSlug}`,
    frPath: `/fr/${reciprocal.frSlug}`,
  });
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;

  if (!isAppLocale(locale)) {
    notFound();
  }
  setRequestLocale(locale);

  const service = getServiceBySlug(slug, locale);
  if (!service) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: "product" });
  const tc = await getTranslations({ locale, namespace: "common" });
  const tHubs = await getTranslations({ locale, namespace: "hubs" });

  const hub = categoryToHub(service.category);
  const hubHref = HUB_HREF[hub];
  const displayPrice = getServiceDisplayPrice(service);
  const related = getRelatedServices(service.id, service.category, locale, 3);
  const canonicalUrl = `${SITE_URL}/${locale}/${service.slug}`;
  const hubName = tHubs(`${hub}.title`);
  const bookHref = { pathname: "/book" as const, query: { service: service.id } };

  const breadcrumbs = [
    { name: tc("home"), url: `${SITE_URL}/${locale}` },
    { name: hubName, url: `${SITE_URL}/${locale}/${hub}` },
    { name: service.title, url: canonicalUrl },
  ];

  return (
    <article className="mx-auto max-w-4xl ps-4 pe-4 py-8 sm:py-14">
      {/* Structured Data */}
      <BreadcrumbJsonLd items={breadcrumbs} />
      <TouristTripJsonLd service={service} canonicalUrl={canonicalUrl} />
      <FAQPageJsonLd items={service.faq} />

      {/* Breadcrumb Navigation */}
      <nav aria-label={t("breadcrumbAria")} className="mb-6 text-xs text-ink-muted">
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link href="/" className="hover:text-ink inline-block py-1">
              {tc("home")}
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href={hubHref} className="hover:text-ink inline-block py-1">
              {hubName}
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="font-semibold text-ink line-clamp-1 py-1" aria-current="page">
            {service.title}
          </li>
        </ol>
      </nav>

      {/* Primary Header */}
      <header className="mb-10 text-start">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="rounded bg-surface-muted border border-line ps-2.5 pe-2.5 py-1 text-xs font-bold text-accent-strong uppercase">
            {hubName}
          </span>
          {service.primaryKeyword && (
            <span className="text-xs text-ink-muted font-medium">• {service.primaryKeyword}</span>
          )}
        </div>

        <h1 className="text-balance text-2xl font-extrabold tracking-tight text-ink sm:text-4xl">
          {service.title}
        </h1>

        <p className="mt-4 text-base text-ink-muted leading-relaxed sm:text-lg">
          {service.summary}
        </p>
      </header>

      {/* Quick-Facts Block */}
      <section
        aria-label={t("quickFactsAria")}
        className="rounded-xl border border-line bg-surface p-6 mb-12 shadow-xs"
      >
        <h2 className="text-base font-bold text-ink mb-4 pb-2 border-b border-line">
          {t("quickFactsTitle")}
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 text-start">
          {/* Duration */}
          <div>
            <span className="text-xs font-medium text-ink-muted block">{t("duration")}</span>
            <span className="text-sm font-bold text-ink mt-0.5 block">
              {service.durationHours
                ? `${service.durationHours} ${tc("hoursLabel")}`
                : service.activityHours
                  ? `${service.activityHours} ${tc("hoursLabel")}`
                  : t("variable")}
            </span>
          </div>

          {/* Pickup Window */}
          <div>
            <span className="text-xs font-medium text-ink-muted block">{t("pickup")}</span>
            <span className="text-sm font-bold text-ink mt-0.5 block line-clamp-2">
              {service.pickupWindow || t("defaultPickup")}
            </span>
          </div>

          {/* From-Price with Unit */}
          <div>
            <span className="text-xs font-medium text-ink-muted block">{t("fromPrice")}</span>
            <span
              data-testid="quick-facts-price"
              className="text-sm font-bold text-accent-strong mt-0.5 block"
            >
              {displayPrice.formatted[locale]}
            </span>
          </div>

          {/* Minimum Group */}
          <div>
            <span className="text-xs font-medium text-ink-muted block">{t("minGroup")}</span>
            <span className="text-sm font-bold text-ink mt-0.5 block">
              {service.capacity?.min
                ? `${service.capacity.min} ${service.capacity.min > 1 ? tc("guests") : tc("guest")}`
                : `1 ${tc("guest")}`}
            </span>
          </div>

          {/* Languages */}
          <div className="col-span-2 sm:col-span-1">
            <span className="text-xs font-medium text-ink-muted block">{t("languages")}</span>
            <span className="text-sm font-bold text-ink mt-0.5 block">
              {service.languages.join(", ")}
            </span>
          </div>
        </div>

        {/* Action button inside quick facts */}
        <div className="mt-6 pt-4 border-t border-line flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-xs text-ink-muted">{t("pickupNote")}</p>
          <Link
            href={bookHref}
            className="rounded-md bg-accent ps-5 pe-5 py-2.5 text-sm font-semibold text-on-accent hover:bg-accent-strong transition-colors shrink-0 inline-flex items-center min-h-[40px]"
          >
            {t("bookThis")}
          </Link>
        </div>
      </section>

      {/* Itinerary / Program */}
      {(service.itinerary || (service.route && "legs" in service.route) || service.routes) && (
        <section className="mb-12">
          <h2 className="text-xl font-bold text-ink mb-4">{t("itinerary")}</h2>

          {service.itinerary && service.itinerary.length > 0 && (
            <ol className="relative border-s border-line ms-3 space-y-6">
              {service.itinerary.map((step, idx) => (
                <li key={idx} className="ms-6">
                  <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-accent-strong text-xs font-bold text-on-accent">
                    {idx + 1}
                  </span>
                  <p className="text-sm text-ink leading-relaxed font-medium">{step}</p>
                </li>
              ))}
            </ol>
          )}

          {service.routes && service.routes.length > 0 && (
            <div className="space-y-3">
              {service.routes.map((r, i) => (
                <div key={i} className="rounded-lg border border-line bg-surface p-4 text-xs">
                  <p className="font-bold text-sm text-ink mb-1">
                    {r.from} → {r.to}
                  </p>
                  <p className="text-ink-muted mb-2">
                    {t("estimatedTravel")} {r.minutes} min
                    {r.distanceKm ? ` (${r.distanceKm} km)` : ""}
                  </p>
                  <div className="flex gap-4 pt-2 border-t border-line text-ink font-semibold">
                    <span>Sedan: {r.prices.sedan} €</span>
                    <span>Van: {r.prices.van} €</span>
                    <span>Minibus: {r.prices.minibus} €</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* Included & Not Included Block */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-ink mb-4">{t("includedTitle")}</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Included */}
          <div className="rounded-lg border border-line bg-surface p-5">
            <h3 className="text-sm font-bold uppercase tracking-wider text-ink mb-3 flex items-center gap-2">
              <span className="text-accent-strong font-bold">✓</span>
              {t("whatsIncluded")}
            </h3>
            <ul className="space-y-2 text-xs text-ink-muted">
              {service.includedExtra && service.includedExtra.length > 0 ? (
                service.includedExtra.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-accent-strong font-bold">✓</span>
                    <span>{item}</span>
                  </li>
                ))
              ) : (
                <>
                  <li className="flex items-start gap-2">
                    <span className="text-accent-strong font-bold">✓</span>
                    <span>{t("includedDefault1")}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent-strong font-bold">✓</span>
                    <span>{t("includedDefault2")}</span>
                  </li>
                </>
              )}
            </ul>
          </div>

          {/* Not Included */}
          <div className="rounded-lg border border-line bg-surface p-5">
            <h3 className="text-sm font-bold uppercase tracking-wider text-ink mb-3 flex items-center gap-2">
              <span className="text-ink-muted">✕</span>
              {t("notIncluded")}
            </h3>
            <ul className="space-y-2 text-xs text-ink-muted">
              {service.notIncluded && service.notIncluded.length > 0 ? (
                service.notIncluded.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-ink-muted font-bold">✕</span>
                    <span>{item}</span>
                  </li>
                ))
              ) : (
                <>
                  <li className="flex items-start gap-2">
                    <span className="text-ink-muted font-bold">✕</span>
                    <span>{t("notIncludedDefault1")}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-ink-muted font-bold">✕</span>
                    <span>{t("notIncludedDefault2")}</span>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </section>

      {/* Good to Know */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-ink mb-4">{t("goodToKnow")}</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          {/* Cancellation Policy */}
          <div className="rounded-lg border border-line bg-surface p-4">
            <p className="font-bold text-ink mb-1">{t("cancellation")}</p>
            <p className="text-ink-muted">
              {service.cancellationPolicy === "transfer"
                ? t("transferCancellation")
                : t("excursionCancellation")}
            </p>
          </div>

          {/* What to bring */}
          {service.bring && service.bring.length > 0 && (
            <div className="rounded-lg border border-line bg-surface p-4">
              <p className="font-bold text-ink mb-1">{t("bring")}</p>
              <p className="text-ink-muted">{service.bring.join(", ")}</p>
            </div>
          )}

          {/* Restrictions */}
          {service.restrictions && service.restrictions.length > 0 && (
            <div className="rounded-lg border border-line bg-surface p-4">
              <p className="font-bold text-ink mb-1">{t("restrictions")}</p>
              <p className="text-ink-muted">{service.restrictions.join(". ")}</p>
            </div>
          )}

          {/* Suitable for */}
          {service.suitableFor && service.suitableFor.length > 0 && (
            <div className="rounded-lg border border-line bg-surface p-4">
              <p className="font-bold text-ink mb-1">{t("suitableFor")}</p>
              <p className="text-ink-muted">{service.suitableFor.join(", ")}</p>
            </div>
          )}

          {/* Seasonal Notes */}
          {service.seasonalNotes && (
            <div className="rounded-lg border border-line bg-surface p-4 col-span-1 sm:col-span-2">
              <p className="font-bold text-ink mb-1">{t("seasonal")}</p>
              <p className="text-ink-muted">
                {Array.isArray(service.seasonalNotes)
                  ? service.seasonalNotes.join(" ")
                  : service.seasonalNotes}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* FAQ Block (Accordions stay in DOM via native <details>) */}
      {service.faq && service.faq.length > 0 && (
        <section className="mb-14">
          <h2 className="text-xl font-bold text-ink mb-4">{t("faq")}</h2>

          <div className="divide-y divide-line border-y border-line">
            {service.faq.map((item, idx) => (
              <details key={idx} className="group py-4 text-start transition-all">
                <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-semibold text-ink hover:text-accent focus:outline-hidden py-1">
                  <span>{item.q}</span>
                  <span
                    className="ms-2 font-bold text-accent-strong transition-transform group-open:rotate-180"
                    aria-hidden="true"
                  >
                    ▼
                  </span>
                </summary>
                <div className="mt-3 text-xs leading-relaxed text-ink-muted">
                  <p>{item.a}</p>
                </div>
              </details>
            ))}
          </div>
        </section>
      )}

      {/* CTA Box */}
      <section className="rounded-xl bg-accent-strong p-8 text-on-accent text-center mb-14">
        <h2 className="text-2xl font-extrabold text-white mb-2">{t("readyTitle")}</h2>
        <p className="text-sm font-medium text-white max-w-xl mx-auto mb-6">{t("readyBody")}</p>
        <Link
          href={bookHref}
          className="inline-flex items-center justify-center rounded-md bg-white ps-6 pe-6 py-3 text-sm font-bold text-ink hover:bg-surface-muted transition-colors min-h-[44px]"
        >
          {t("requestBooking")}
        </Link>
      </section>

      {/* Related Services */}
      {related.length > 0 && (
        <section>
          <h2 className="text-xl font-bold text-ink mb-6">{t("related")}</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {related.map((rel) => {
              const relPrice = getServiceDisplayPrice(rel);
              const relHref = { pathname: "/[slug]" as const, params: { slug: rel.slug } };
              return (
                <article
                  key={rel.id}
                  className="flex flex-col justify-between rounded-lg border border-line bg-surface p-5 hover:border-accent transition-colors"
                >
                  <div>
                    <span className="text-xs uppercase text-accent-strong font-bold">
                      {rel.durationHours
                        ? `${rel.durationHours} ${tc("hoursLabel")}`
                        : tc("serviceItem")}
                    </span>
                    <h3 className="text-base font-bold text-ink mt-1 hover:text-accent">
                      <Link href={relHref} className="inline-block py-1">
                        {rel.title}
                      </Link>
                    </h3>
                    <p className="mt-2 text-xs text-ink-muted line-clamp-3">{rel.summary}</p>
                  </div>
                  <div className="mt-4 pt-4 border-t border-line flex items-center justify-between text-xs">
                    <span className="font-bold text-accent-strong">
                      {relPrice.formatted[locale]}
                    </span>
                    <Link
                      href={relHref}
                      className="font-semibold text-accent-strong hover:underline inline-block py-2 ps-2"
                    >
                      {tc("view")}
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      )}
    </article>
  );
}

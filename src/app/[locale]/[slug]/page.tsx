import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";

import {
  categoryToHub,
  getReciprocalSlugs,
  getRelatedServices,
  getServiceBySlug,
  getServices,
  type HubKey,
} from "@/catalogue";
import { isAppLocale, locales } from "@/i18n/locales";
import { Link } from "@/i18n/routing";
import { buildPageMetadata, SITE_URL } from "@/seo/metadata";
import { getServiceDisplayPrice } from "@/seo/price";
import { BreadcrumbJsonLd, FAQPageJsonLd, TouristTripJsonLd } from "@/components/json-ld";

const HUB_HREF: Record<HubKey, "/excursions" | "/activities" | "/transfers"> = {
  excursions: "/excursions",
  activities: "/activities",
  transfers: "/transfers",
};

export function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of locales) {
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
  if (!isAppLocale(locale)) return {};

  const service = getServiceBySlug(slug, locale);
  if (!service) return { title: "Not found" };

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
  if (!isAppLocale(locale)) notFound();
  setRequestLocale(locale);

  const service = getServiceBySlug(slug, locale);
  if (!service) notFound();

  const t = await getTranslations({ locale, namespace: "product" });
  const tc = await getTranslations({ locale, namespace: "common" });
  const tHubs = await getTranslations({ locale, namespace: "hubs" });

  const hub = categoryToHub(service.category);
  const hubHref = HUB_HREF[hub];
  const hubName = tHubs(`${hub}.title`);
  const displayPrice = getServiceDisplayPrice(service);
  const related = getRelatedServices(service.id, service.category, locale, 3);
  const canonicalUrl = `${SITE_URL}/${locale}/${service.slug}`;

  const breadcrumbs = [
    { name: tc("home"), url: `${SITE_URL}/${locale}` },
    { name: hubName, url: `${SITE_URL}/${locale}/${hub}` },
    { name: service.title, url: canonicalUrl },
  ];

  const duration = service.durationHours ?? service.activityHours;
  const bookHref = { pathname: "/book" as const, query: { service: service.id } };

  return (
    <article className="mx-auto max-w-4xl px-4 py-8 sm:py-14">
      <BreadcrumbJsonLd items={breadcrumbs} />
      <TouristTripJsonLd service={service} canonicalUrl={canonicalUrl} />
      <FAQPageJsonLd items={service.faq} />

      <nav aria-label={t("breadcrumbAria")} className="mb-6 text-xs text-ink-muted">
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link href="/" className="inline-block py-1 hover:text-ink">
              {tc("home")}
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href={hubHref} className="inline-block py-1 hover:text-ink">
              {hubName}
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="line-clamp-1 py-1 font-semibold text-ink" aria-current="page">
            {service.title}
          </li>
        </ol>
      </nav>

      <header className="mb-10 text-start">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span className="rounded border border-line bg-surface-muted px-2.5 py-1 text-xs font-bold uppercase text-accent-strong">
            {hubName}
          </span>
          <span className="text-xs font-medium text-ink-muted">• {service.primaryKeyword}</span>
        </div>
        <h1 className="text-2xl font-extrabold tracking-tight text-ink text-balance sm:text-4xl">
          {service.title}
        </h1>
        <p className="mt-4 text-base leading-relaxed text-ink-muted sm:text-lg">{service.summary}</p>
      </header>

      <section
        aria-label={t("quickFactsAria")}
        className="mb-12 rounded-xl border border-line bg-surface p-6"
      >
        <h2 className="mb-4 border-b border-line pb-2 text-base font-bold text-ink">
          {t("quickFactsTitle")}
        </h2>
        <dl className="grid grid-cols-2 gap-4 text-start sm:grid-cols-3 md:grid-cols-5">
          <div>
            <dt className="block text-xs font-medium text-ink-muted">{t("duration")}</dt>
            <dd className="mt-0.5 block text-sm font-bold text-ink">
              {duration ? `${duration} ${tc("hoursLabel")}` : t("variable")}
            </dd>
          </div>
          <div>
            <dt className="block text-xs font-medium text-ink-muted">{t("pickup")}</dt>
            <dd className="mt-0.5 line-clamp-2 block text-sm font-bold text-ink">
              {service.pickupWindow || service.availability || t("defaultPickup")}
            </dd>
          </div>
          <div>
            <dt className="block text-xs font-medium text-ink-muted">{t("fromPrice")}</dt>
            <dd
              data-testid="quick-facts-price"
              className="mt-0.5 block text-sm font-bold text-accent-strong"
            >
              {displayPrice.formatted[locale]}
            </dd>
          </div>
          <div>
            <dt className="block text-xs font-medium text-ink-muted">{t("minGroup")}</dt>
            <dd className="mt-0.5 block text-sm font-bold text-ink">
              {service.capacity?.min
                ? `${service.capacity.min} ${service.capacity.min > 1 ? tc("guests") : tc("guest")}`
                : `1 ${tc("guest")}`}
            </dd>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <dt className="block text-xs font-medium text-ink-muted">{t("languages")}</dt>
            <dd className="mt-0.5 block text-sm font-bold text-ink">
              {service.languages.join(", ")}
            </dd>
          </div>
        </dl>
        <div className="mt-6 flex flex-col items-start justify-between gap-4 border-t border-line pt-4 sm:flex-row sm:items-center">
          <p className="text-xs text-ink-muted">{t("pickupNote")}</p>
          <Link
            href={bookHref}
            className="inline-flex min-h-[44px] shrink-0 items-center rounded-md bg-accent px-5 py-2.5 text-sm font-semibold text-on-accent hover:bg-accent-strong"
          >
            {t("bookThis")}
          </Link>
        </div>
      </section>

      {(service.itinerary ||
        (service.route && "legs" in service.route) ||
        (service.routes && service.routes.length > 0)) && (
        <section className="mb-12">
          <h2 className="mb-4 text-xl font-bold text-ink">{t("itinerary")}</h2>

          {service.itinerary && service.itinerary.length > 0 && (
            <ol className="relative ms-3 space-y-6 border-s border-line">
              {service.itinerary.map((step, index) => (
                <li key={index} className="ms-6">
                  <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-accent-strong text-xs font-bold text-on-accent">
                    {index + 1}
                  </span>
                  <p className="text-sm font-medium leading-relaxed text-ink">{step}</p>
                </li>
              ))}
            </ol>
          )}

          {service.routes && service.routes.length > 0 && (
            <div className="space-y-3">
              {service.routes.map((route, index) => (
                <div key={index} className="rounded-lg border border-line bg-surface p-4 text-xs">
                  <p className="mb-1 text-sm font-bold text-ink">
                    {route.from} → {route.to}
                  </p>
                  <p className="mb-2 text-ink-muted">
                    {t("estimatedTravel")} {route.minutes} min
                    {route.distanceKm ? ` (${route.distanceKm} km)` : ""}
                  </p>
                  <div className="flex gap-4 border-t border-line pt-2 font-semibold text-ink">
                    <span>Sedan: {route.prices.sedan} €</span>
                    <span>Van: {route.prices.van} €</span>
                    <span>Minibus: {route.prices.minibus} €</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      <section className="mb-12">
        <h2 className="mb-4 text-xl font-bold text-ink">{t("includedTitle")}</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-lg border border-line bg-surface p-5">
            <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-ink">
              {t("whatsIncluded")}
            </h3>
            <ul className="space-y-2 text-xs text-ink-muted">
              {(service.includedExtra && service.includedExtra.length > 0
                ? service.includedExtra
                : [t("includedDefault1"), t("includedDefault2")]
              ).map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="font-bold text-accent-strong">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-lg border border-line bg-surface p-5">
            <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-ink">
              {t("notIncluded")}
            </h3>
            <ul className="space-y-2 text-xs text-ink-muted">
              {(service.notIncluded && service.notIncluded.length > 0
                ? service.notIncluded
                : [t("notIncludedDefault1"), t("notIncludedDefault2")]
              ).map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="font-bold text-ink-muted">✕</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="mb-4 text-xl font-bold text-ink">{t("goodToKnow")}</h2>
        <div className="grid grid-cols-1 gap-4 text-xs sm:grid-cols-2">
          <div className="rounded-lg border border-line bg-surface p-4">
            <p className="mb-1 font-bold text-ink">{t("cancellation")}</p>
            <p className="text-ink-muted">
              {service.cancellationPolicy === "transfer"
                ? t("transferCancellation")
                : t("excursionCancellation")}
            </p>
          </div>
          {service.bring && service.bring.length > 0 && (
            <div className="rounded-lg border border-line bg-surface p-4">
              <p className="mb-1 font-bold text-ink">{t("bring")}</p>
              <p className="text-ink-muted">{service.bring.join(", ")}</p>
            </div>
          )}
          {service.restrictions && service.restrictions.length > 0 && (
            <div className="rounded-lg border border-line bg-surface p-4">
              <p className="mb-1 font-bold text-ink">{t("restrictions")}</p>
              <p className="text-ink-muted">{service.restrictions.join(". ")}</p>
            </div>
          )}
          {service.suitableFor && service.suitableFor.length > 0 && (
            <div className="rounded-lg border border-line bg-surface p-4">
              <p className="mb-1 font-bold text-ink">{t("suitableFor")}</p>
              <p className="text-ink-muted">{service.suitableFor.join(", ")}</p>
            </div>
          )}
          {service.seasonalNotes && (
            <div className="rounded-lg border border-line bg-surface p-4 sm:col-span-2">
              <p className="mb-1 font-bold text-ink">{t("seasonal")}</p>
              <p className="text-ink-muted">
                {Array.isArray(service.seasonalNotes)
                  ? service.seasonalNotes.join(" ")
                  : service.seasonalNotes}
              </p>
            </div>
          )}
        </div>
      </section>

      {service.faq && service.faq.length > 0 && (
        <section className="mb-14">
          <h2 className="mb-4 text-xl font-bold text-ink">{t("faq")}</h2>
          <div className="divide-y divide-line border-y border-line">
            {service.faq.map((item, index) => (
              <details key={index} className="group py-4 text-start">
                <summary className="flex cursor-pointer list-none items-center justify-between py-1 text-sm font-semibold text-ink hover:text-accent">
                  <span>{item.q}</span>
                  <span aria-hidden="true" className="ms-2 font-bold text-accent-strong">
                    ▾
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

      <section className="mb-14 rounded-xl bg-accent-strong p-8 text-center text-on-accent">
        <h2 className="mb-2 text-2xl font-extrabold text-on-accent">{t("readyTitle")}</h2>
        <p className="mx-auto mb-6 max-w-xl text-sm font-medium text-on-accent">{t("readyBody")}</p>
        <Link
          href={bookHref}
          className="inline-flex min-h-[44px] items-center justify-center rounded-md bg-surface px-6 py-3 text-sm font-bold text-ink hover:bg-surface-muted"
        >
          {t("requestBooking")}
        </Link>
      </section>

      {related.length > 0 && (
        <section>
          <h2 className="mb-6 text-xl font-bold text-ink">{t("related")}</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {related.map((item) => {
              const itemPrice = getServiceDisplayPrice(item);
              return (
                <article
                  key={item.id}
                  className="flex flex-col justify-between rounded-lg border border-line bg-surface p-5 transition-colors hover:border-accent"
                >
                  <div>
                    <span className="text-xs font-bold uppercase text-accent-strong">
                      {item.durationHours ? `${item.durationHours} ${tc("hoursLabel")}` : tc("serviceItem")}
                    </span>
                    <h3 className="mt-1 text-base font-bold text-ink">
                      <Link
                        href={{ pathname: "/[slug]", params: { slug: item.slug } }}
                        className="hover:text-accent-strong"
                      >
                        {item.title}
                      </Link>
                    </h3>
                    <p className="mt-2 line-clamp-3 text-xs text-ink-muted">{item.summary}</p>
                  </div>
                  <div className="mt-4 flex items-center justify-between border-t border-line pt-4 text-xs">
                    <span className="font-bold text-accent-strong">
                      {itemPrice.formatted[locale]}
                    </span>
                    <Link
                      href={{ pathname: "/[slug]", params: { slug: item.slug } }}
                      className="font-semibold text-accent-strong hover:underline"
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

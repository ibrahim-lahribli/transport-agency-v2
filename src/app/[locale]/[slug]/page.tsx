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
import { getServiceImage } from "@/content/images";
import { getContact } from "../../../../config/site";
import { BreadcrumbJsonLd, FAQPageJsonLd, TouristTripJsonLd } from "@/components/json-ld";
import { Accordion, buttonClass, Eyebrow, Tag } from "@/components/ui";
import { ServiceCard } from "@/components/service-card";

const HUB_HREF: Record<HubKey, "/excursions" | "/activities" | "/transfers"> = {
  excursions: "/excursions",
  activities: "/activities",
  transfers: "/transfers",
};

/**
 * Joins sentence-like fragments into one paragraph. Catalogue entries already
 * carry their own final punctuation, so joining with a period renders
 * "sentence.. sentence"; this preserves an existing terminator and only adds one
 * when a fragment is missing it.
 */
function joinSentences(parts: string[]): string {
  return parts
    .map((part) => part.trim())
    .filter(Boolean)
    .map((part) => (/[.!?]$/.test(part) ? part : `${part}.`))
    .join(" ");
}

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
  const tb = await getTranslations({ locale, namespace: "book" });

  const hub = categoryToHub(service.category);
  const hubHref = HUB_HREF[hub];
  const hubName = tHubs(`${hub}.title`);
  const displayPrice = getServiceDisplayPrice(service);
  const related = getRelatedServices(service.id, service.category, locale, 3);
  const canonicalUrl = `${SITE_URL}/${locale}/${service.slug}`;
  const whatsappHref = `https://wa.me/${getContact().whatsappDigits}`;

  const breadcrumbs = [
    { name: tc("home"), url: `${SITE_URL}/${locale}` },
    { name: hubName, url: `${SITE_URL}/${locale}/${hub}` },
    { name: service.title, url: canonicalUrl },
  ];

  const duration = service.durationHours ?? service.activityHours;
  const bookHref = { pathname: "/book" as const, query: { service: service.id } };

  // The design's gallery: one large photo + two supporting shots, all from the
  // service's local image slots (with artwork fallbacks for transfers etc.).
  const gallery = [
    { src: getServiceImage(service.id, "gallery"), alt: service.title },
    { src: getServiceImage(`${service.id}-b`, "gallery"), alt: "" },
    { src: getServiceImage(`${service.id}-c`, "gallery"), alt: "" },
  ];

  // Booking-card trust lines: type-correct cancellation wording only.
  const cancellationLine =
    service.cancellationPolicy === "transfer"
      ? t("transferCancellation")
      : t("excursionCancellation");

  // Fact tiles fed ONLY by fields that actually exist on `Service` — missing
  // data drops the tile, never renders placeholder text (sprint rule).
  const factTiles: { label: string; value: string }[] = [];
  if (duration) {
    factTiles.push({ label: t("duration"), value: `${duration} ${tc("hoursLabel")}` });
  }
  factTiles.push({
    label: t("fromPrice"),
    value: displayPrice.formatted[locale as "en" | "fr"],
  });
  const pickupText = service.pickupWindow ?? service.availability ?? t("defaultPickup");
  factTiles.push({ label: t("pickup"), value: pickupText });
  if (service.capacity) {
    factTiles.push({
      label: t("minGroup"),
      value: `${service.capacity.min} ${tc("guests")}`,
    });
  }
  factTiles.push({ label: t("languages"), value: service.languages.join(", ") });

  const accordions: { title: string; body: React.ReactNode }[] = [];
  if (service.itinerary && service.itinerary.length > 0) {
    accordions.push({ title: t("itinerary"), body: <ItineraryList steps={service.itinerary} /> });
  }
  if (service.route && "legs" in service.route && service.route.legs.length > 0) {
    accordions.push({
      title: t("itinerary"),
      body: (
        <ol className="space-y-1">
          {service.route.legs.map((leg, index) => (
            <li key={index}>
              {leg.from} → {leg.to}
              {leg.notes ? ` — ${leg.notes}` : ""}
            </li>
          ))}
        </ol>
      ),
    });
  }
  // Sprint-4 review D3: the transfer routes section was silently dropped in
  // the re-skin. Restore it as an accordion section, prices straight from the
  // catalogue object — never literals (only for routes that carry prices).
  const transferRoutes =
    service.category === "transfer" &&
    service.routes &&
    service.routes.length > 0
      ? service.routes.filter((r) => Object.values(r.prices).some((p) => p > 0))
      : [];
  if (transferRoutes.length > 0) {
    accordions.push({
      title: t("routesPrices"),
      body: (
        <div className="grid gap-4">
          {transferRoutes.map((route, index) => (
            <div key={index} className="rounded-md border border-line bg-surface p-4">
              <p className="font-semibold text-ink">
                {route.from} → {route.to}
              </p>
              <p className="text-sm text-ink-muted">
                {route.distanceKm !== undefined ? `${route.distanceKm} km · ` : ""}
                {route.minutes === 0 || route.minutes
                  ? `${route.minutes} min`
                  : ""}
              </p>
              <table className="mt-3 w-full max-w-[26rem] text-sm">
                <tbody>
                  {(
                    [
                      ["sedan", tb("vehicleSedan")],
                      ["van", tb("vehicleVan")],
                      ["minibus", tb("vehicleMinibus")],
                    ] as const
                  )
                    .filter(([vehicle]) => (route.prices[vehicle] ?? 0) > 0)
                    .map(([vehicle, vehicleLabel]) => (
                      <tr key={vehicle} className="border-t border-line">
                        <th scope="row" className="py-1.5 text-start font-normal text-ink-muted">
                          {vehicleLabel}
                        </th>
                        <td className="py-1.5 text-end font-semibold text-ink">
                          {route.prices[vehicle]} €
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      ),
    });
  }
  if ((service.includedExtra && service.includedExtra.length > 0) || service.notIncluded) {
    accordions.push({
      title: t("includedTitle"),
      body: <IncludedLists service={service} t={t} />,
    });
  }
  if (service.faq && service.faq.length > 0) {
    accordions.push({
      title: t("faq"),
      body: (
        <dl className="space-y-3">
          {service.faq.map((item, index) => (
            <div key={index}>
              <dt className="font-semibold text-ink">{item.q}</dt>
              <dd className="mt-1">{item.a}</dd>
            </div>
          ))}
        </dl>
      ),
    });
  }

  return (
    <article>
      <BreadcrumbJsonLd items={breadcrumbs} />
      <TouristTripJsonLd service={service} canonicalUrl={canonicalUrl} />
      <FAQPageJsonLd items={service.faq} />

      <nav aria-label={t("breadcrumbAria")} className="shell flex min-h-16 items-center gap-2 text-sm text-ink-muted">
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link href="/" className="inline-block py-1 underline hover:text-ink">
              {tc("home")}
            </Link>
          </li>
          <li aria-hidden="true">→</li>
          <li>
            <Link href={hubHref} className="inline-block py-1 underline hover:text-ink">
              {hubName}
            </Link>
          </li>
          <li aria-hidden="true">→</li>
          <li className="line-clamp-1 py-1" aria-current="page">
            {service.title}
          </li>
        </ol>
      </nav>

      <div className="shell grid items-start gap-8 pb-14 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <div>
          {/* Gallery: 2fr/1fr grid — main portrait spans two rows. */}
          <div className="grid auto-rows-[7rem] grid-cols-3 gap-3 sm:h-[34rem] sm:auto-rows-auto sm:grid-cols-[2fr_1fr] sm:grid-rows-2">
            <div className="relative col-span-3 row-span-1 overflow-hidden rounded-md sm:col-span-1 sm:row-span-2">
              {/* eslint-disable-next-line @next/next/no-img-element -- static placeholder photos */}
              <img src={gallery[0].src} alt={gallery[0].alt} className="h-full w-full object-cover" />
            </div>
            {gallery.slice(1).map((shot, index) => (
              <div key={index} className="hidden overflow-hidden rounded-md sm:block">
                {/* eslint-disable-next-line @next/next/no-img-element -- static placeholder photos */}
                <img src={shot.src} alt={shot.alt} className="h-full w-full object-cover" />
              </div>
            ))}
          </div>

          <header className="max-w-[48rem] py-8">
            <Tag>{hubName}</Tag>
            <h1 className="my-4 text-2xl md:text-[clamp(2rem,5vw,4.5rem)] md:leading-[1.05]">
              {service.title}
            </h1>
            <p className="text-lg text-ink-muted">{service.summary}</p>
          </header>

          {factTiles.length > 0 && (
            <section
              aria-label={t("quickFactsAria")}
              className="mb-8 grid grid-cols-2 border-y border-line md:grid-cols-4"
            >
              {factTiles.map((tile) => (
                <div key={tile.label} className="flex flex-col border-e border-line px-3 py-5 last:border-e-0 md:[&:nth-child(4)]:border-e-0">
                  <span className="text-sm text-ink-muted">{tile.label}</span>
                  {/* The "from price" tile carries the pinned testid the e2e
                      suite reads; it is the second tile after duration. */}
                  <strong
                    data-testid={tile.label === t("fromPrice") ? "quick-facts-price" : undefined}
                    className="text-sm font-bold text-accent-strong"
                  >
                    {tile.value}
                  </strong>
                </div>
              ))}
            </section>
          )}

          {accordions.length > 0 && (
            <div className="service-accordions">
              <Accordion items={accordions} openFirst />
            </div>
          )}

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link href={bookHref} className={`${buttonClass("primary")} max-sm:w-full lg:hidden`}>
              {t("bookThis")}
            </Link>
            <p className="text-xs text-ink-muted">{t("pickupNote")}</p>
          </div>
        </div>

        {/* Sticky booking card (desktop): price from the shared helper, id-based link. */}
        <aside className="hidden lg:sticky lg:top-6 lg:flex lg:flex-col lg:gap-4 lg:rounded-md lg:bg-surface lg:p-6 lg:shadow-card" data-testid="booking-card">
          <Eyebrow>{tc("from")}</Eyebrow>
          <p className="font-serif text-2xl leading-none text-ink">
            {displayPrice.amount} €{" "}
            <span className="font-sans text-sm font-normal text-ink-muted">
              / {displayPrice.unitLabel[locale as "en" | "fr"]}
            </span>
          </p>
          <Link href={bookHref} className={buttonClass("primary")}>
            {t("requestBooking")}
          </Link>
          <a
            href={whatsappHref}
            className="text-center text-sm font-semibold text-accent-strong underline"
            rel="noopener noreferrer"
            target="_blank"
          >
            {t("whatsappAsk")}
          </a>
          <div className="flex flex-col gap-2 border-t border-line pt-4 text-sm">
            <span className="flex items-center gap-2 text-ink">
              <span aria-hidden="true" className="font-semibold text-olive">✓</span>
              {t("noPaymentNow")}
            </span>
            <span className="flex items-center gap-2 text-ink">
              <span aria-hidden="true" className="font-semibold text-olive">✓</span>
              {cancellationLine}
            </span>
          </div>
        </aside>
      </div>

      {/* Mobile price strip between accordions and related: price + book CTA. */}
      <section className="mx-4 mb-12 rounded-md bg-surface-muted p-5 lg:hidden" data-testid="mobile-price-strip">
        <p className="font-serif text-xl leading-none text-ink">
          {displayPrice.amount} €{" "}
          <span className="font-sans text-sm font-normal text-ink-muted">
            / {displayPrice.unitLabel[locale as "en" | "fr"]}
          </span>
        </p>
        <p className="mt-1 text-xs text-ink-muted">{cancellationLine}</p>
        <Link href={bookHref} className={`${buttonClass("primary")} mt-3 w-full`}>
          {t("bookThis")}
        </Link>
      </section>

      {/* Good to know: restrictions/bring/seasonal are practical facts visitors
          scan before booking, so they render visibly — not inside a collapsed
          accordion. The restrictions element is pinned by the e2e suite. */}
      {(service.restrictions?.length || service.bring?.length || service.seasonalNotes) && (
        <section className="shell mb-12">
          <h2 className="mb-4 text-xl">{t("goodToKnow")}</h2>
          <div className="grid gap-4 text-xs sm:grid-cols-2">
            {service.restrictions && service.restrictions.length > 0 && (
              <div className="rounded-lg border border-line bg-surface p-4">
                <p className="mb-1 font-bold text-ink">{t("restrictions")}</p>
                <p data-testid="restrictions-text" className="text-ink-muted">
                  {joinSentences(service.restrictions)}
                </p>
              </div>
            )}
            {service.bring && service.bring.length > 0 && (
              <div className="rounded-lg border border-line bg-surface p-4">
                <p className="mb-1 font-bold text-ink">{t("bring")}</p>
                <p className="text-ink-muted">{service.bring.join(", ")}</p>
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
      )}

      {related.length > 0 && (
        <section className="bg-surface-muted py-14">
          <div className="shell">
            <Eyebrow>{t("relatedEyebrow")}</Eyebrow>
            <h2 className="mb-10 text-2xl md:text-[clamp(2rem,5vw,4.5rem)] md:leading-[1.05]">
              {t("related")}
            </h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-y-10 lg:grid-cols-3">
              {related.map((item) => (
                <ServiceCard key={item.id} service={item} locale={locale} />
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}

function ItineraryList({ steps }: { steps: string[] }) {
  return (
    <ol className="relative space-y-4 border-s border-line ps-5">
      {steps.map((step, index) => (
        <li key={index} className="relative">
          <span className="absolute -start-[1.65rem] flex size-6 items-center justify-center rounded-full bg-accent text-xs font-bold text-on-accent">
            {index + 1}
          </span>
          <p>{step}</p>
        </li>
      ))}
    </ol>
  );
}

function IncludedLists({
  service,
  t,
}: {
  service: NonNullable<ReturnType<typeof getServiceBySlug>>;
  t: (key: string) => string;
}) {
  const included =
    service.includedExtra && service.includedExtra.length > 0
      ? service.includedExtra
      : [t("includedDefault1"), t("includedDefault2")];
  const notIncluded =
    service.notIncluded && service.notIncluded.length > 0
      ? service.notIncluded
      : [t("notIncludedDefault1"), t("notIncludedDefault2")];
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <ul className="space-y-1">
        {included.map((item, index) => (
          <li key={index} className="flex items-start gap-2">
            <span aria-hidden="true" className="font-bold text-olive">✓</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
      <ul className="space-y-1">
        {notIncluded.map((item, index) => (
          <li key={index} className="flex items-start gap-2">
            <span aria-hidden="true" className="font-bold text-ink-muted">✕</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

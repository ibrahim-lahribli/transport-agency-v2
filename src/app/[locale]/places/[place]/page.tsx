import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { getServiceById } from "@/catalogue";
import { getPlaceBySlug, places } from "@/content/places";
import { isAppLocale, locales } from "@/i18n/locales";
import { buildPageMetadata, SITE_URL } from "@/seo/metadata";
import { BreadcrumbJsonLd } from "@/components/json-ld";
import { ServiceCard } from "@/components/service-card";

export function generateStaticParams() {
  const params: { locale: string; place: string }[] = [];
  for (const locale of locales) {
    for (const place of places) {
      params.push({ locale, place: place.slug[locale] });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; place: string }>;
}): Promise<Metadata> {
  const { locale, place: placeSlug } = await params;
  if (!isAppLocale(locale)) return {};
  const place = getPlaceBySlug(placeSlug);
  if (!place) return { title: "Not found" };
  return buildPageMetadata({
    title: place.seo[locale].title,
    description: place.seo[locale].description,
    locale,
    pathname: `/${locale}/places/${place.slug[locale]}`,
    enPath: `/en/places/${place.slug.en}`,
    frPath: `/fr/places/${place.slug.fr}`,
  });
}

export default async function PlacePage({
  params,
}: {
  params: Promise<{ locale: string; place: string }>;
}) {
  const { locale, place: placeSlug } = await params;
  if (!isAppLocale(locale)) notFound();
  setRequestLocale(locale);

  const place = getPlaceBySlug(placeSlug);
  if (!place) notFound();

  const t = await getTranslations({ locale, namespace: "places" });
  const tc = await getTranslations({ locale, namespace: "common" });

  const services = place.serviceIds
    .map((id) => getServiceById(id, locale))
    .filter((service): service is NonNullable<typeof service> => Boolean(service));

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:py-14">
      <BreadcrumbJsonLd
        items={[
          { name: tc("home"), url: `${SITE_URL}/${locale}` },
          { name: t("title"), url: `${SITE_URL}/${locale}/places` },
          { name: place.name[locale], url: `${SITE_URL}/${locale}/places/${place.slug[locale]}` },
        ]}
      />

      <p className="text-sm font-bold uppercase tracking-wide text-accent-strong">
        {place.name[locale]}
      </p>
      <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
        {place.seo[locale].title}
      </h1>
      <p className="mt-4 max-w-3xl text-base leading-relaxed text-ink-muted">{place.intro[locale]}</p>

      <section className="mt-10">
        <h2 className="text-xl font-bold text-ink">
          {t("related")} {place.name[locale]}
        </h2>
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} locale={locale} />
          ))}
        </div>
      </section>
    </div>
  );
}

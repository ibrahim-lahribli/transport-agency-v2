import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { getServiceById } from "@/catalogue";
import { getPlaceBySlug, places } from "@/content/places";
import { getServiceImage } from "@/content/images";
import { isAppLocale, locales } from "@/i18n/locales";
import { buildPageMetadata, SITE_URL } from "@/seo/metadata";
import { BreadcrumbJsonLd } from "@/components/json-ld";
import { Eyebrow } from "@/components/ui";
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
    <div>
      <BreadcrumbJsonLd
        items={[
          { name: tc("home"), url: `${SITE_URL}/${locale}` },
          { name: t("title"), url: `${SITE_URL}/${locale}/places` },
          { name: place.name[locale], url: `${SITE_URL}/${locale}/places/${place.slug[locale]}` },
        ]}
      />

      {/*
       * Design: directional photo hat over an ink gradient, with the page's
       * single `<h1>` in the overlay, then the plain lede band.
       */}
      <section className="relative">
        {/* eslint-disable-next-line @next/next/no-img-element -- static artwork slots, no optimizer needed */}
        <img
          src={getServiceImage(place.id, "hero")}
          alt=""
          className="h-56 w-full object-cover sm:h-72"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/40 to-transparent"
        />
        <div className="absolute inset-x-0 bottom-0">
          <div className="shell pb-8">
            <Eyebrow tone="light">{t("title")}</Eyebrow>
            <h1 className="max-w-[30ch] text-xl text-canvas sm:text-2xl">
              {place.seo[locale].title}
            </h1>
          </div>
        </div>
      </section>

      <section className="shell pb-12 pt-10 md:pb-16">
        <p className="max-w-[42rem] text-lg text-ink-muted">{place.intro[locale]}</p>
      </section>

      <section className="shell py-12 md:py-16">
        <h2 className="mb-8 text-2xl">
          {t("related")} {place.name[locale]}
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} locale={locale} />
          ))}
        </div>
      </section>
    </div>
  );
}

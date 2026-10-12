import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import { places } from "@/content/places";
import { getServiceImage } from "@/content/images";
import { isAppLocale } from "@/i18n/locales";
import { Link } from "@/i18n/routing";
import { buildPageMetadata, SITE_URL } from "@/seo/metadata";
import { BreadcrumbJsonLd } from "@/components/json-ld";
import { ArrowLink, PageIntro } from "@/components/ui";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isAppLocale(locale)) return {};
  const t = await getTranslations({ locale, namespace: "places" });
  return buildPageMetadata({
    title: t("metaTitle"),
    description: t("metaDescription"),
    locale,
    pathname: `/${locale}/places`,
    enPath: "/en/places",
    frPath: "/fr/places",
  });
}

export default async function PlacesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isAppLocale(locale)) notFound();
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "places" });
  const tc = await getTranslations({ locale, namespace: "common" });

  return (
    <div>
      <BreadcrumbJsonLd
        items={[
          { name: tc("home"), url: `${SITE_URL}/${locale}` },
          { name: t("title"), url: `${SITE_URL}/${locale}/places` },
        ]}
      />
      <PageIntro eyebrow={t("eyebrow")} title={t("title")} body={t("lead")} />

      <section className="shell grid grid-cols-1 gap-8 py-12 md:grid-cols-2 md:py-16">
        {places.map((place) => (
          <article
            key={place.id}
            className="grid min-h-[16rem] grid-cols-1 overflow-hidden rounded-md bg-surface shadow-card sm:grid-cols-2"
          >
            <div className="relative aspect-[3/2] sm:aspect-auto sm:h-full">
              {/* eslint-disable-next-line @next/next/no-img-element -- static artwork slots, no optimizer needed */}
              <img
                src={getServiceImage(place.id, "card")}
                alt=""
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex flex-col items-start justify-center p-6">
              <h2 className="font-serif text-2xl leading-tight text-ink">
                <Link
                  href={{ pathname: "/places/[place]", params: { place: place.slug[locale] } }}
                  className="hover:text-accent-strong"
                >
                  {place.name[locale]}
                </Link>
              </h2>
              <p className="mt-2 line-clamp-3 text-sm text-ink-muted">{place.intro[locale]}</p>
              <ArrowLink href={{ pathname: "/places/[place]", params: { place: place.slug[locale] } }}>
                {t("browse")}
              </ArrowLink>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}

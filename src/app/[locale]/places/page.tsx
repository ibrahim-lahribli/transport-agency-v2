import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import { places } from "@/content/places";
import { isAppLocale } from "@/i18n/locales";
import { Link } from "@/i18n/routing";
import { buildPageMetadata, SITE_URL } from "@/seo/metadata";
import { BreadcrumbJsonLd } from "@/components/json-ld";

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
    <div className="mx-auto max-w-4xl px-4 py-10 sm:py-14">
      <BreadcrumbJsonLd
        items={[
          { name: tc("home"), url: `${SITE_URL}/${locale}` },
          { name: t("title"), url: `${SITE_URL}/${locale}/places` },
        ]}
      />
      <h1 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">{t("title")}</h1>
      <p className="mt-4 max-w-2xl text-base text-ink-muted">{t("lead")}</p>

      <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
        {places.map((place) => (
          <article
            key={place.id}
            className="rounded-lg border border-line bg-surface p-5 transition-colors hover:border-accent"
          >
            <h2 className="text-base font-bold text-ink">
              <Link
                href={{ pathname: "/places/[place]", params: { place: place.slug[locale] } }}
                className="hover:text-accent-strong"
              >
                {place.name[locale]}
              </Link>
            </h2>
            <p className="mt-2 text-sm text-ink-muted">{place.intro[locale]}</p>
            <Link
              href={{ pathname: "/places/[place]", params: { place: place.slug[locale] } }}
              className="mt-3 inline-block text-sm font-semibold text-accent-strong hover:underline"
            >
              {t("browse")}
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}

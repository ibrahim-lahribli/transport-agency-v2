import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { getServiceById } from "@/catalogue";
import { getGuideBySlug, guides } from "@/content/guides";
import { isAppLocale, locales } from "@/i18n/locales";
import { buildPageMetadata, SITE_URL } from "@/seo/metadata";
import { ArticleJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";
import { Eyebrow } from "@/components/ui";
import { ServiceCard } from "@/components/service-card";

export function generateStaticParams() {
  const params: { locale: string; guide: string }[] = [];
  for (const locale of locales) {
    for (const guide of guides) {
      params.push({ locale, guide: guide.slug[locale] });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; guide: string }>;
}): Promise<Metadata> {
  const { locale, guide: guideSlug } = await params;
  if (!isAppLocale(locale)) return {};
  const guide = getGuideBySlug(guideSlug);
  if (!guide) return { title: "Not found" };
  return buildPageMetadata({
    title: guide.title[locale],
    description: guide.description[locale],
    locale,
    pathname: `/${locale}/guides/${guide.slug[locale]}`,
    enPath: `/en/guides/${guide.slug.en}`,
    frPath: `/fr/guides/${guide.slug.fr}`,
  });
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ locale: string; guide: string }>;
}) {
  const { locale, guide: guideSlug } = await params;
  if (!isAppLocale(locale)) notFound();
  setRequestLocale(locale);

  const guide = getGuideBySlug(guideSlug);
  if (!guide) notFound();

  const t = await getTranslations({ locale, namespace: "guides" });
  const tc = await getTranslations({ locale, namespace: "common" });
  const url = `${SITE_URL}/${locale}/guides/${guide.slug[locale]}`;

  const services = guide.serviceIds
    .map((id) => getServiceById(id, locale))
    .filter((service): service is NonNullable<typeof service> => Boolean(service));

  const dateFormatter = new Intl.DateTimeFormat(locale, { dateStyle: "long" });

  return (
    <article>
      <BreadcrumbJsonLd
        items={[
          { name: tc("home"), url: `${SITE_URL}/${locale}` },
          { name: t("title"), url: `${SITE_URL}/${locale}/guides` },
          { name: guide.title[locale], url },
        ]}
      />
      <ArticleJsonLd
        headline={guide.title[locale]}
        description={guide.description[locale]}
        url={url}
        datePublished={guide.date}
        locale={locale}
      />

      {/* Editorial article header: lede in the ink band, single serif H1. */}
      <header className="shell border-b border-line pb-10 pt-12 md:pt-16">
        <Eyebrow>
          {t("featured")} · {guide.readingMinutes} {t("minutes")}
        </Eyebrow>
        <h1 className="max-w-[28ch] text-display">{guide.title[locale]}</h1>
        <p className="mt-4 max-w-[42rem] text-lg text-ink-muted">{guide.description[locale]}</p>
        <p className="mt-6 text-sm text-ink-muted">
          {t("published")} {dateFormatter.format(new Date(guide.date))}
        </p>
      </header>

      <div className="shell py-10 md:py-12">
        <div className="max-w-[46rem]">
          {guide.sections.map((section, index) => (
            <section key={index} className="mb-10">
              <h2 className="mb-3 text-xl">{section.heading[locale]}</h2>
              <div className="space-y-3 text-base leading-relaxed text-ink-muted">
                {section.body[locale].map((paragraph, pIndex) => (
                  <p key={pIndex}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}
        </div>

        {services.length > 0 && (
          <section className="mt-12">
            <h2 className="mb-8 text-2xl">{t("related")}</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => (
                <ServiceCard key={service.id} service={service} locale={locale} />
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  );
}

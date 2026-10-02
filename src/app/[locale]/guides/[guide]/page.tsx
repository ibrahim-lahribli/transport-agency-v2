import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { getServiceById } from "@/catalogue";
import { getGuideBySlug, guides } from "@/content/guides";
import { isAppLocale, locales } from "@/i18n/locales";
import { buildPageMetadata, SITE_URL } from "@/seo/metadata";
import { ArticleJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";
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

  return (
    <article className="mx-auto max-w-3xl px-4 py-10 sm:py-14">
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

      <h1 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
        {guide.title[locale]}
      </h1>
      <p className="mt-4 text-base leading-relaxed text-ink-muted">{guide.description[locale]}</p>
      <p className="mt-3 text-xs text-ink-muted">
        {t("published")} {new Date(guide.date).toLocaleDateString(locale)} · {guide.readingMinutes}{" "}
        {t("minutes")}
      </p>

      <div className="mt-10 space-y-8">
        {guide.sections.map((section, index) => (
          <section key={index}>
            <h2 className="text-xl font-bold text-ink">{section.heading[locale]}</h2>
            <div className="mt-3 space-y-3 text-sm leading-relaxed text-ink-muted">
              {section.body[locale].map((paragraph, pIndex) => (
                <p key={pIndex}>{paragraph}</p>
              ))}
            </div>
          </section>
        ))}
      </div>

      {services.length > 0 && (
        <section className="mt-14">
          <h2 className="mb-6 text-xl font-bold text-ink">{t("related")}</h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} locale={locale} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}

import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import { guides } from "@/content/guides";
import { getServiceImage } from "@/content/images";
import { isAppLocale } from "@/i18n/locales";
import { Link } from "@/i18n/routing";
import { buildPageMetadata, SITE_URL } from "@/seo/metadata";
import { BreadcrumbJsonLd } from "@/components/json-ld";
import { ArrowLink, Eyebrow, PageIntro } from "@/components/ui";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isAppLocale(locale)) return {};
  const t = await getTranslations({ locale, namespace: "guides" });
  return buildPageMetadata({
    title: t("metaTitle"),
    description: t("metaDescription"),
    locale,
    pathname: `/${locale}/guides`,
    enPath: "/en/guides",
    frPath: "/fr/guides",
  });
}

export default async function GuidesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isAppLocale(locale)) notFound();
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "guides" });
  const tc = await getTranslations({ locale, namespace: "common" });

  // Most recently updated guide leads the page; the rest render as rows.
  const sorted = [...guides].sort((a, b) => b.date.localeCompare(a.date));
  const featured = sorted[0];
  const rows = sorted.slice(1);

  const dateFormatter = new Intl.DateTimeFormat(locale, { dateStyle: "long" });

  return (
    <div>
      <BreadcrumbJsonLd
        items={[
          { name: tc("home"), url: `${SITE_URL}/${locale}` },
          { name: t("title"), url: `${SITE_URL}/${locale}/guides` },
        ]}
      />
      <PageIntro eyebrow={t("eyebrow")} title={t("title")} body={t("lead")} />

      <section className="shell py-12 md:py-16">
        {/* Featured guide: newest date, image slot keyed by guide id. */}
        <article className="mb-12 grid grid-cols-1 items-center gap-8 md:grid-cols-[1.2fr_1fr]">
          {/* eslint-disable-next-line @next/next/no-img-element -- static artwork slots, no optimizer needed */}
          <img
            src={getServiceImage(featured.id, "hero")}
            alt=""
            className="aspect-[3/2] w-full rounded-md object-cover shadow-card"
          />
          <div>
            <Eyebrow>
              {t("featured")} · {featured.readingMinutes} {t("minutes")}
            </Eyebrow>
            <h2 className="mb-4 font-serif text-2xl leading-tight text-ink">
              <Link
                href={{ pathname: "/guides/[guide]", params: { guide: featured.slug[locale] } }}
                className="hover:text-accent-strong"
              >
                {featured.title[locale]}
              </Link>
            </h2>
            <p className="mb-6 text-lg text-ink-muted">{featured.description[locale]}</p>
            <ArrowLink href={{ pathname: "/guides/[guide]", params: { guide: featured.slug[locale] } }}>
              {t("read")}
            </ArrowLink>
          </div>
        </article>

        {/* Remaining guides as the design's compact linked rows. */}
        <div className="border-t border-line">
          {rows.map((guide) => (
            <Link
              key={guide.id}
              href={{ pathname: "/guides/[guide]", params: { guide: guide.slug[locale] } }}
              className="group grid min-h-24 grid-cols-[auto_1fr_auto] items-center gap-5 border-b border-line py-5"
            >
              <div>
                <span className="text-sm text-ink-muted">
                  {dateFormatter.format(new Date(guide.date))} · {guide.readingMinutes} {t("minutes")}
                </span>
                <h3 className="mt-1 font-serif text-lg leading-snug text-ink group-hover:text-accent-strong">
                  {guide.title[locale]}
                </h3>
              </div>
              <span aria-hidden="true" className="text-lg text-accent-strong">
                →
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

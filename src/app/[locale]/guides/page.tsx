import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import { guides } from "@/content/guides";
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

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:py-14">
      <BreadcrumbJsonLd
        items={[
          { name: tc("home"), url: `${SITE_URL}/${locale}` },
          { name: t("title"), url: `${SITE_URL}/${locale}/guides` },
        ]}
      />
      <h1 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">{t("title")}</h1>
      <p className="mt-4 max-w-2xl text-base text-ink-muted">{t("lead")}</p>

      <div className="mt-10 space-y-6">
        {guides.map((guide) => (
          <article key={guide.id} className="rounded-lg border border-line bg-surface p-6">
            <h2 className="text-lg font-bold text-ink">
              <Link
                href={{ pathname: "/guides/[guide]", params: { guide: guide.slug[locale] } }}
                className="hover:text-accent-strong"
              >
                {guide.title[locale]}
              </Link>
            </h2>
            <p className="mt-2 text-sm text-ink-muted">{guide.description[locale]}</p>
            <div className="mt-3 flex items-center gap-3 text-xs text-ink-muted">
              <span>
                {t("published")} {new Date(guide.date).toLocaleDateString(locale)}
              </span>
              <span>
                · {guide.readingMinutes} {t("minutes")}
              </span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

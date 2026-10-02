import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

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
  const t = await getTranslations({ locale, namespace: "about" });
  return buildPageMetadata({
    title: t("metaTitle"),
    description: t("metaDescription"),
    locale,
    pathname: `/${locale}/about`,
    enPath: "/en/about",
    frPath: "/fr/about",
  });
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isAppLocale(locale)) notFound();
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "about" });
  const tc = await getTranslations({ locale, namespace: "common" });

  const values = [
    { title: t("value1Title"), body: t("value1Body") },
    { title: t("value2Title"), body: t("value2Body") },
    { title: t("value3Title"), body: t("value3Body") },
  ];

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:py-14">
      <BreadcrumbJsonLd
        items={[
          { name: tc("home"), url: `${SITE_URL}/${locale}` },
          { name: t("title"), url: `${SITE_URL}/${locale}/about` },
        ]}
      />
      <p className="text-sm font-bold uppercase tracking-wide text-accent-strong">{t("kicker")}</p>
      <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
        {t("title")}
      </h1>
      <p className="mt-4 text-base leading-relaxed text-ink-muted sm:text-lg">{t("lead")}</p>

      <div className="mt-8 space-y-4 text-sm leading-relaxed text-ink-muted">
        <p>{t("story1")}</p>
        <p>{t("story2")}</p>
        <p>{t("story3")}</p>
      </div>

      <section className="mt-12">
        <h2 className="text-xl font-bold text-ink">{t("valuesTitle")}</h2>
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {values.map((value) => (
            <div key={value.title} className="rounded-lg border border-line bg-surface p-5">
              <h3 className="text-sm font-bold text-ink">{value.title}</h3>
              <p className="mt-1 text-sm text-ink-muted">{value.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12 rounded-xl bg-accent-strong p-8 text-center">
        <h2 className="text-xl font-extrabold text-on-accent">{t("ctaTitle")}</h2>
        <p className="mx-auto mt-2 max-w-lg text-sm text-on-accent">{t("ctaBody")}</p>
        <Link
          href="/book"
          className="mt-6 inline-flex min-h-[44px] items-center rounded-md bg-surface px-6 py-3 text-sm font-bold text-ink hover:bg-surface-muted"
        >
          {tc("details")}
        </Link>
      </section>
    </div>
  );
}

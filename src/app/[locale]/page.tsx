import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { LOCALES, isAppLocale } from "@/i18n/locales";
import { Link } from "@/i18n/routing";
import { getServicesByCategory } from "@/seo/content";
import { getServiceDisplayPrice } from "@/seo/price";
import { buildPageMetadata, SITE_URL } from "@/seo/metadata";
import { BreadcrumbJsonLd } from "@/components/json-ld";
import type { Service } from "@/schemas/service";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isAppLocale(locale)) return { title: "Not Found" };
  const t = await getTranslations({ locale, namespace: "home" });

  return buildPageMetadata({
    title: t("metaTitle"),
    description: t("metaDescription"),
    locale,
    pathname: `/${locale}`,
    enPath: "/en",
    frPath: "/fr",
  });
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isAppLocale(locale)) {
    notFound();
  }
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "home" });
  const tc = await getTranslations({ locale, namespace: "common" });

  const excursions = getServicesByCategory("excursion", locale);
  const activities = getServicesByCategory("activity", locale);
  const transfers = getServicesByCategory("transfer", locale);

  const breadcrumbs = [{ name: tc("home"), url: `${SITE_URL}/${locale}` }];

  const renderCard = (service: Service, badge: string) => {
    const price = getServiceDisplayPrice(service);
    const slugHref = { pathname: "/[slug]" as const, params: { slug: service.slug } };
    return (
      <article
        key={service.id}
        className="flex flex-col justify-between rounded-lg border border-line bg-surface p-5 hover:border-accent/50 transition-colors shadow-xs"
      >
        <div>
          <p className="text-xs font-medium uppercase text-accent mb-1">
            {service.durationHours
              ? `${service.durationHours} ${tc("hoursLabel")}`
              : badge}
          </p>
          <h3 className="text-base font-bold text-ink hover:text-accent transition-colors">
            <Link href={slugHref}>{service.title}</Link>
          </h3>
          <p className="mt-2 text-xs text-ink-muted line-clamp-3">{service.summary}</p>
        </div>
        <div className="mt-4 pt-4 border-t border-line flex items-center justify-between">
          <span className="text-xs font-semibold text-ink">
            {tc("from")} <span className="text-accent">{price.formatted[locale]}</span>
          </span>
          <Link href={slugHref} className="text-xs font-semibold text-ink hover:text-accent">
            {tc("details")}
          </Link>
        </div>
      </article>
    );
  };

  return (
    <div className="mx-auto max-w-5xl ps-4 pe-4 py-10 sm:py-16">
      <BreadcrumbJsonLd items={breadcrumbs} />

      {/* Hero Section */}
      <section className="mb-14 text-start">
        <p className="text-xs font-bold uppercase tracking-wider text-accent mb-2">
          {t("kicker")}
        </p>
        <h1 className="text-balance text-3xl font-extrabold tracking-tight text-ink sm:text-5xl">
          {t("title")}
        </h1>
        <p className="mt-4 max-w-2xl text-base text-ink-muted sm:text-lg">{t("subtitle")}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/excursions"
            className="rounded-md bg-accent ps-4 pe-4 py-2.5 text-sm font-semibold text-on-accent hover:bg-accent-strong transition-colors"
          >
            {t("browseExcursions")}
          </Link>
          <Link
            href="/activities"
            className="rounded-md border border-line bg-surface ps-4 pe-4 py-2.5 text-sm font-semibold text-ink hover:border-ink transition-colors"
          >
            {t("allActivities")}
          </Link>
          <Link
            href="/transfers"
            className="rounded-md border border-line bg-surface ps-4 pe-4 py-2.5 text-sm font-semibold text-ink hover:border-ink transition-colors"
          >
            {t("privateTransfers")}
          </Link>
        </div>
      </section>

      {/* Excursions Hub Preview */}
      <section className="mb-14">
        <div className="flex items-baseline justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-ink">{t("excursionsTitle")}</h2>
            <p className="text-sm text-ink-muted mt-1">{t("excursionsSubtitle")}</p>
          </div>
          <Link
            href="/excursions"
            className="text-xs font-semibold text-accent hover:underline shrink-0 ms-4"
          >
            {tc("viewAll")}
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {excursions.slice(0, 3).map((s) => renderCard(s, t("dayTrip")))}
        </div>
      </section>

      {/* Activities Hub Preview */}
      <section className="mb-14">
        <div className="flex items-baseline justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-ink">{t("activitiesTitle")}</h2>
            <p className="text-sm text-ink-muted mt-1">{t("activitiesSubtitle")}</p>
          </div>
          <Link
            href="/activities"
            className="text-xs font-semibold text-accent hover:underline shrink-0 ms-4"
          >
            {tc("viewAll")}
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {activities.slice(0, 3).map((s) => renderCard(s, t("activity")))}
        </div>
      </section>

      {/* Transfers Hub Preview */}
      <section className="mb-14">
        <div className="flex items-baseline justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-ink">{t("transfersTitle")}</h2>
            <p className="text-sm text-ink-muted mt-1">{t("transfersSubtitle")}</p>
          </div>
          <Link
            href="/transfers"
            className="text-xs font-semibold text-accent hover:underline shrink-0 ms-4"
          >
            {tc("viewAll")}
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {transfers.map((s) => renderCard(s, t("transferBadge")))}
        </div>
      </section>

      {/* Trust & Guarantee Section */}
      <section className="rounded-xl border border-line bg-surface-muted/50 p-6 sm:p-8">
        <h2 className="text-xl font-bold text-ink mb-4">{t("trustTitle")}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm text-ink-muted">
          <div>
            <p className="font-semibold text-ink mb-1">{t("trust1Title")}</p>
            <p className="text-xs">{t("trust1Body")}</p>
          </div>
          <div>
            <p className="font-semibold text-ink mb-1">{t("trust2Title")}</p>
            <p className="text-xs">{t("trust2Body")}</p>
          </div>
          <div>
            <p className="font-semibold text-ink mb-1">{t("trust3Title")}</p>
            <p className="text-xs">{t("trust3Body")}</p>
          </div>
        </div>
      </section>
    </div>
  );
}

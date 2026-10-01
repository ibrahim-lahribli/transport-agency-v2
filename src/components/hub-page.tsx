import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { isAppLocale } from "@/i18n/locales";
import { Link } from "@/i18n/routing";
import { getServicesByCategory, hubToCategory, type HubKey } from "@/seo/content";
import { getServiceDisplayPrice } from "@/seo/price";
import { buildPageMetadata, SITE_URL } from "@/seo/metadata";
import { BreadcrumbJsonLd } from "@/components/json-ld";

export async function generateHubMetadata(hub: HubKey, locale: string): Promise<Metadata> {
  if (!isAppLocale(locale)) return { title: "Not Found" };
  const t = await getTranslations({ locale, namespace: "hubs" });

  return buildPageMetadata({
    title: t(`${hub}.seoTitle`),
    description: t(`${hub}.seoDescription`),
    locale,
    pathname: `/${locale}/${hub}`,
    enPath: `/en/${hub}`,
    frPath: `/fr/${hub}`,
  });
}

export async function HubPageView({ hub, locale }: { hub: HubKey; locale: string }) {
  const category = hubToCategory(hub);
  if (!category) notFound();
  if (!isAppLocale(locale)) notFound();
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "hubs" });
  const tc = await getTranslations({ locale, namespace: "common" });
  const th = await getTranslations({ locale, namespace: "hub" });

  const services = getServicesByCategory(category, locale);

  const breadcrumbs = [
    { name: tc("home"), url: `${SITE_URL}/${locale}` },
    { name: t(`${hub}.title`), url: `${SITE_URL}/${locale}/${hub}` },
  ];

  return (
    <div className="mx-auto max-w-5xl ps-4 pe-4 py-10 sm:py-16">
      <BreadcrumbJsonLd items={breadcrumbs} />

      {/* Breadcrumb nav */}
      <nav aria-label="Breadcrumb" className="mb-6 text-xs text-ink-muted">
        <ol className="flex items-center gap-2">
          <li>
            <Link href="/" className="hover:text-ink inline-block py-1">
              {tc("home")}
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="font-semibold text-ink py-1" aria-current="page">
            {t(`${hub}.title`)}
          </li>
        </ol>
      </nav>

      <header className="mb-12 text-start">
        <p className="text-xs font-bold uppercase tracking-wider text-accent-strong mb-2">
          {t(`${hub}.badge`)}
        </p>
        <h1
          className="text-balance text-4xl font-extrabold tracking-tight text-ink sm:text-5xl"
          // @ts-expect-error fetchpriority is a valid HTML attribute (LCP hint) not in React's types
          fetchpriority="high"
        >
          {t(`${hub}.title`)}
        </h1>
        <p className="mt-4 max-w-3xl text-sm text-ink-muted sm:text-base">{t(`${hub}.intro`)}</p>
      </header>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => {
          const price = getServiceDisplayPrice(service);
          const slugHref = { pathname: "/[slug]" as const, params: { slug: service.slug } };
          return (
            <article
              key={service.id}
              className="flex flex-col justify-between rounded-lg border border-line bg-surface p-6 hover:border-accent transition-colors shadow-xs"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-ink-muted mb-2">
                  <span className="font-bold text-accent-strong uppercase">
                    {service.durationHours
                      ? `${service.durationHours} ${tc("hoursLabel")}`
                      : th("transfer")}
                  </span>
                  <span>{service.languages.join(", ")}</span>
                </div>

                <h2 className="text-lg font-bold text-ink hover:text-accent transition-colors">
                  <Link href={slugHref} className="inline-block py-1">
                    {service.title}
                  </Link>
                </h2>

                <p className="mt-3 text-xs text-ink-muted line-clamp-4 leading-relaxed">
                  {service.summary}
                </p>

                {service.highlights && service.highlights.length > 0 && (
                  <ul className="mt-4 space-y-1 text-xs text-ink">
                    {service.highlights.slice(0, 3).map((h, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-accent-strong font-bold" aria-hidden="true">
                          •
                        </span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-line flex items-center justify-between">
                <div>
                  <span className="text-xs text-ink-muted block">{th("from")}</span>
                  <span className="text-sm font-bold text-accent-strong">
                    {price.formatted[locale]}
                  </span>
                </div>
                <Link
                  href={slugHref}
                  className="rounded-md bg-surface-muted ps-3.5 pe-3.5 py-2 text-xs font-semibold text-ink hover:bg-accent-strong hover:text-white transition-colors inline-flex items-center min-h-[36px]"
                >
                  {th("viewTour")}
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

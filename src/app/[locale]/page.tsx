import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { getServicesByCategory } from "@/catalogue";
import { buildPageMetadata } from "@/seo/metadata";
import { ServiceCard } from "@/components/service-card";
import { Link } from "@/i18n/routing";
import { isAppLocale } from "@/i18n/locales";

import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isAppLocale(locale)) return {};
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

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isAppLocale(locale)) notFound();
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "home" });
  const tCommon = await getTranslations({ locale, namespace: "common" });

  const sections = [
    {
      key: "excursions",
      category: "excursion" as const,
      href: "/excursions" as const,
      title: t("excursionsTitle"),
      subtitle: t("excursionsSubtitle"),
    },
    {
      key: "activities",
      category: "activity" as const,
      href: "/activities" as const,
      title: t("activitiesTitle"),
      subtitle: t("activitiesSubtitle"),
    },
    {
      key: "transfers",
      category: "transfer" as const,
      href: "/transfers" as const,
      title: t("transfersTitle"),
      subtitle: t("transfersSubtitle"),
    },
  ];

  const trust = [
    { title: t("trust1Title"), body: t("trust1Body") },
    { title: t("trust2Title"), body: t("trust2Body") },
    { title: t("trust3Title"), body: t("trust3Body") },
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:py-16">
      <section className="text-start">
        <p className="text-sm font-bold uppercase tracking-wide text-accent-strong">{t("kicker")}</p>
        <h1 className="mt-3 max-w-3xl text-3xl font-extrabold tracking-tight text-ink text-balance sm:text-5xl">
          {t("title")}
        </h1>
        <p className="mt-4 max-w-2xl text-base text-ink-muted leading-relaxed sm:text-lg">
          {t("subtitle")}
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/excursions"
            className="inline-flex min-h-[44px] items-center rounded-md bg-accent px-5 py-2.5 text-sm font-semibold text-on-accent hover:bg-accent-strong"
          >
            {t("browseExcursions")}
          </Link>
          <Link
            href="/activities"
            className="inline-flex min-h-[44px] items-center rounded-md border border-line px-5 py-2.5 text-sm font-semibold text-ink hover:border-accent hover:text-accent-strong"
          >
            {t("allActivities")}
          </Link>
        </div>
      </section>

      {sections.map((section) => {
        const services = getServicesByCategory(section.category, locale);
        return (
          <section key={section.key} className="mt-14">
            <div className="flex flex-wrap items-end justify-between gap-2">
              <div>
                <h2 className="text-xl font-bold text-ink sm:text-2xl">{section.title}</h2>
                <p className="mt-1 text-sm text-ink-muted">{section.subtitle}</p>
              </div>
              <Link href={section.href} className="text-sm font-semibold text-accent-strong hover:underline">
                {tCommon("viewAll")}
              </Link>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {services.slice(0, 3).map((service) => (
                <ServiceCard key={service.id} service={service} locale={locale} />
              ))}
            </div>
          </section>
        );
      })}

      <section className="mt-16 rounded-xl border border-line bg-surface p-6 sm:p-8">
        <h2 className="text-xl font-bold text-ink sm:text-2xl">{t("trustTitle")}</h2>
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {trust.map((item) => (
            <div key={item.title}>
              <h3 className="text-sm font-bold text-ink">{item.title}</h3>
              <p className="mt-1 text-sm text-ink-muted">{item.body}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

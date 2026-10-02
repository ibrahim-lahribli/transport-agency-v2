import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import { isAppLocale } from "@/i18n/locales";
import { buildPageMetadata } from "@/seo/metadata";
import { HubPage } from "@/components/hub-page";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isAppLocale(locale)) return {};
  const t = await getTranslations({ locale, namespace: "hubs" });
  return buildPageMetadata({
    title: t("excursions.seoTitle"),
    description: t("excursions.seoDescription"),
    locale,
    pathname: `/${locale}/excursions`,
    enPath: "/en/excursions",
    frPath: "/fr/excursions",
  });
}

export default async function ExcursionsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isAppLocale(locale)) notFound();
  setRequestLocale(locale);
  return <HubPage hub="excursions" locale={locale} />;
}

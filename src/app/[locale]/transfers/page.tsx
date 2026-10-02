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
    title: t("transfers.seoTitle"),
    description: t("transfers.seoDescription"),
    locale,
    pathname: `/${locale}/transfers`,
    enPath: "/en/transfers",
    frPath: "/fr/transfers",
  });
}

export default async function TransfersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isAppLocale(locale)) notFound();
  setRequestLocale(locale);
  return <HubPage hub="transfers" locale={locale} />;
}

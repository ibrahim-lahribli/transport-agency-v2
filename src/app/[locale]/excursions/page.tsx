import React from "react";
import type { Metadata } from "next";
import { LOCALES } from "@/i18n/locales";
import { HubPageView, generateHubMetadata } from "@/components/hub-page";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return generateHubMetadata("excursions", locale);
}

export default async function ExcursionsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <HubPageView hub="excursions" locale={locale} />;
}

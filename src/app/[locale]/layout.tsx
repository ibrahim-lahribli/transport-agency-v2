import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";

import { isAppLocale, isRtlLocale, locales } from "@/i18n/locales";
import { getSlugAlternates } from "@/catalogue";
import { SITE_URL } from "@/seo/metadata";
import { TravelAgencyJsonLd } from "@/components/json-ld";
import { Footer, Header } from "@/components/navigation";

import "../globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fbf7f2" },
    { media: "(prefers-color-scheme: dark)", color: "#17130f" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "Agadir Tourisme", template: "%s | Agadir Tourisme" },
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isAppLocale(locale)) {
    notFound();
  }

  // Enables static rendering for this locale across the whole subtree.
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "nav" });
  const messages = await getMessages();
  const dir = isRtlLocale(locale) ? "rtl" : "ltr";
  const slugAlternates = getSlugAlternates();

  return (
    <html lang={locale} dir={dir}>
      <head>
        <TravelAgencyJsonLd />
      </head>
      <body className="flex min-h-screen flex-col bg-canvas text-ink">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:absolute focus:start-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-on-accent"
          >
            {t("skipToContent")}
          </a>
          <Header locale={locale} slugAlternates={slugAlternates} />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer locale={locale} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

export const dynamicParams = false;
export const revalidate = 3600;

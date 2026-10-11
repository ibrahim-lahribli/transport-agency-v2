import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { DM_Sans, Playfair_Display } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";

import { isAppLocale, isRtlLocale, locales } from "@/i18n/locales";
import { getSlugAlternates } from "@/catalogue";
import { SITE_URL } from "@/seo/metadata";
import { TravelAgencyJsonLd } from "@/components/json-ld";
import { Footer, Header } from "@/components/navigation";

import "../globals.css";

const dmSans = DM_Sans({
  subsets: ["latin", "latin-ext"],
  weight: "variable",
  variable: "--font-dm-sans",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin", "latin-ext"],
  weight: "variable",
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#f7f2e8",
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
    <html lang={locale} dir={dir} className={`${dmSans.variable} ${playfair.variable}`}>
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

import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { LOCALES, isAppLocale } from "@/i18n/locales";
import { Link } from "@/i18n/routing";
import { getServices } from "@/seo/content";
import { buildPageMetadata, SITE_URL } from "@/seo/metadata";
import { BreadcrumbJsonLd } from "@/components/json-ld";
import { businessProfile } from "../../../../config/business";

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
  const t = await getTranslations({ locale, namespace: "book" });

  return buildPageMetadata({
    title: t("metaTitle"),
    description: t("metaDescription"),
    locale,
    pathname: `/${locale}/book`,
    enPath: "/en/book",
    frPath: "/fr/book",
    noindex: true,
  });
}

export default async function BookPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ service?: string }>;
}) {
  const { locale } = await params;

  if (!isAppLocale(locale)) {
    notFound();
  }
  setRequestLocale(locale);

  const { service: preselectedServiceId } = await searchParams;
  const t = await getTranslations({ locale, namespace: "book" });
  const tc = await getTranslations({ locale, namespace: "common" });
  const services = getServices(locale);

  const breadcrumbs = [
    { name: tc("home"), url: `${SITE_URL}/${locale}` },
    { name: t("breadcrumb"), url: `${SITE_URL}/${locale}/book` },
  ];

  const inputClass =
    "w-full rounded-md border border-line bg-canvas p-2.5 text-sm text-ink focus:border-accent focus:outline-hidden";
  const labelClass = "block text-xs font-semibold text-ink mb-1.5";

  return (
    <div className="mx-auto max-w-2xl ps-4 pe-4 py-10 sm:py-16">
      <BreadcrumbJsonLd items={breadcrumbs} />

      {/* Breadcrumb nav */}
      <nav aria-label="Breadcrumb" className="mb-6 text-xs text-ink-muted">
        <ol className="flex items-center gap-2">
          <li>
            <Link href="/" className="hover:text-ink">
              {tc("home")}
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="font-semibold text-ink" aria-current="page">
            {t("breadcrumb")}
          </li>
        </ol>
      </nav>

      <header className="mb-8 text-start">
        <h1 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">{t("title")}</h1>
        <p className="mt-3 text-sm text-ink-muted">{t("subtitle")}</p>
      </header>

      {/* WhatsApp Quick Link */}
      <div className="rounded-lg border border-line bg-surface-muted/60 p-4 mb-8 text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <p className="font-semibold text-ink">{t("whatsappTitle")}</p>
          <p className="text-ink-muted">{t("whatsappBody")}</p>
        </div>
        <a
          href={`https://wa.me/${businessProfile.whatsapp.replace(/[^0-9]/g, "")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-md bg-accent ps-3.5 pe-3.5 py-1.5 font-semibold text-on-accent hover:bg-accent-strong transition-colors shrink-0"
        >
          WhatsApp: {businessProfile.whatsapp}
        </a>
      </div>

      {/* Booking Form */}
      <form className="space-y-5 rounded-xl border border-line bg-surface p-6 shadow-xs text-start">
        <div>
          <label htmlFor="service" className={labelClass}>
            {t("serviceLabel")}
          </label>
          <select
            id="service"
            name="service"
            defaultValue={preselectedServiceId || ""}
            className={inputClass}
          >
            <option value="">{t("servicePlaceholder")}</option>
            {services.map((s) => (
              <option key={s.id} value={s.id}>
                {s.title}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="fullName" className={labelClass}>
              {t("nameLabel")}
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              required
              placeholder={t("namePlaceholder")}
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="email" className={labelClass}>
              {t("emailLabel")}
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder="example@mail.com"
              className={inputClass}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="phone" className={labelClass}>
              {t("phoneLabel")}
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              placeholder="+212 600 000 000"
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="date" className={labelClass}>
              {t("dateLabel")}
            </label>
            <input type="date" id="date" name="date" required className={inputClass} />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="adults" className={labelClass}>
              {t("adultsLabel")}
            </label>
            <input
              type="number"
              id="adults"
              name="adults"
              min="1"
              defaultValue="2"
              required
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="children" className={labelClass}>
              {t("childrenLabel")}
            </label>
            <input
              type="number"
              id="children"
              name="children"
              min="0"
              defaultValue="0"
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label htmlFor="hotel" className={labelClass}>
            {t("hotelLabel")}
          </label>
          <input
            type="text"
            id="hotel"
            name="hotel"
            placeholder={t("hotelPlaceholder")}
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="notes" className={labelClass}>
            {t("notesLabel")}
          </label>
          <textarea
            id="notes"
            name="notes"
            rows={3}
            placeholder={t("notesPlaceholder")}
            className={inputClass}
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-md bg-accent py-3 text-sm font-bold text-on-accent hover:bg-accent-strong transition-colors cursor-pointer"
        >
          {t("submit")}
        </button>

        <p className="text-center text-xs text-ink-muted mt-2">{t("paymentNote")}</p>
      </form>
    </div>
  );
}

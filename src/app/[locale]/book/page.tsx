import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { getServices } from "@/catalogue";
import { getContact } from "../../../../config/site";
import { isAppLocale } from "@/i18n/locales";
import { buildPageMetadata } from "@/seo/metadata";
import { submitInquiry } from "@/booking/actions";
import type { BookingServiceOption } from "@/booking/types";
import { BookForm } from "@/components/book-form";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isAppLocale(locale)) return {};
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
  if (!isAppLocale(locale)) notFound();
  setRequestLocale(locale);

  const { service: requestedService } = await searchParams;
  const t = await getTranslations({ locale, namespace: "book" });
  const tc = await getTranslations({ locale, namespace: "common" });
  const contact = getContact();

  const services: BookingServiceOption[] = getServices(locale).map((s) => ({
    id: s.id,
    title: s.title,
    category: s.category,
    price: s.price,
    routes: s.routes,
    vehicles: s.vehicles,
  }));

  const initialServiceId =
    requestedService && services.some((s) => s.id === requestedService)
      ? requestedService
      : undefined;

  const whatsappUrl = `https://wa.me/${contact.whatsappDigits}?text=${encodeURIComponent(
    t("whatsappTitle"),
  )}`;

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:py-14">
      <nav aria-label={t("breadcrumb")} className="mb-6 text-xs text-ink-muted">
        <ol className="flex items-center gap-2">
          <li>
            <a href={`/${locale}`} className="hover:text-ink">
              {tc("home")}
            </a>
          </li>
          <li aria-hidden="true">/</li>
          <li className="font-semibold text-ink" aria-current="page">
            {t("breadcrumb")}
          </li>
        </ol>
      </nav>

      <h1 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">{t("title")}</h1>
      <p className="mt-3 max-w-3xl text-base text-ink-muted">{t("subtitle")}</p>

      <div className="mt-10">
        <BookForm
          locale={locale}
          services={services}
          initialServiceId={initialServiceId}
          whatsappUrl={whatsappUrl}
          action={submitInquiry}
        />
      </div>

      <section className="mt-12 rounded-xl border border-line bg-surface p-6">
        <h2 className="text-base font-bold text-ink">{t("whatsappTitle")}</h2>
        <p className="mt-1 text-sm text-ink-muted">{t("whatsappBody")}</p>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex min-h-[44px] items-center rounded-md border border-line px-5 py-2.5 text-sm font-semibold text-ink hover:border-accent hover:text-accent-strong"
        >
          WhatsApp {contact.whatsapp}
        </a>
      </section>
    </div>
  );
}

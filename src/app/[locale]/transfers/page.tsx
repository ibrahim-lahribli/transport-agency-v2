import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import { getServicesByCategory } from "@/catalogue";
import { isAppLocale } from "@/i18n/locales";
import { buildPageMetadata } from "@/seo/metadata";
import { HubPage } from "@/components/hub-page";
import { TransferTool } from "@/components/transfer-tool";
import type { TransferRouteItem } from "@/schemas/service";

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

/**
 * Widget routes, derived from the catalogue's transfer services: the airport
 * services' legs first, then intercity/tourist-transport routes. Any route the
 * catalogue deduplicates (same from/to) is collapsed to its first occurrence,
 * so the widget counts real routes, not per-service copies.
 */
function collectToolRoutes(locale: string): { routes: TransferRouteItem[]; serviceId: string } {
  const services = getServicesByCategory("transfer", locale);
  const routes: TransferRouteItem[] = [];
  const seen = new Set<string>();

  for (const service of services) {
    for (const route of service.routes ?? []) {
      const key = `${route.from}|${route.to}`;
      if (!seen.has(key)) {
        seen.add(key);
        routes.push(route);
      }
    }
  }

  // The widget's request button books the airport service by default (id, not
  // slug — the booking form selects by id); the visitor picks their route there.
  const anchor = services.find((s) => s.id === "airport-agadir") ?? services[0];
  return { routes, serviceId: anchor?.id ?? "airport-agadir" };
}

export default async function TransfersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isAppLocale(locale)) notFound();
  setRequestLocale(locale);

  const { routes, serviceId } = collectToolRoutes(locale);

  return (
    <>
      <section className="bg-surface-muted" id="transfer-tool" aria-label="Transfer tool">
        <div className="shell py-12 md:py-14">
          <TransferTool routes={routes} bookServiceId={serviceId} />
        </div>
      </section>
      <HubPage hub="transfers" locale={locale} />
    </>
  );
}

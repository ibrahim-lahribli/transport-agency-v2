import type { ReactNode } from "react";
import { render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import { describe, expect, it, vi } from "vitest";

import HomePage from "@/app/[locale]/page";

/**
 * next-intl's client navigation pulls in `next/navigation`, which Vitest does
 * not resolve from inside the pnpm store. Stub the routing module with a plain
 * anchor so the localized links still render.
 */
vi.mock("@/i18n/routing", async () => {
  const ReactModule = await import("react");
  return {
    Link: (props: { href: unknown; children?: ReactNode; [key: string]: unknown }) => {
      const { href, children, ...rest } = props;
      const to =
        typeof href === "string"
          ? href
          : href && typeof href === "object" && "pathname" in href
            ? String((href as { pathname: string }).pathname)
            : "#";
      return ReactModule.createElement("a", { href: to, ...rest }, children);
    },
  };
});

/**
 * The home page is an async server component that uses next-intl's server
 * helpers and locale-aware links. Provide both here: a lightweight
 * getTranslations backed by the real message catalogues, and a provider so the
 * client `Link` components can read the locale.
 */
vi.mock("next-intl/server", () => ({
  setRequestLocale: () => {},
  getTranslations: async ({ locale, namespace }: { locale: string; namespace?: string }) => {
    const loaded =
      locale === "fr"
        ? await import("../../messages/fr.json")
        : await import("../../messages/en.json");
    const all = loaded.default as Record<string, unknown>;
    const base = namespace
      ? (namespace.split(".").reduce<unknown>(
          (acc, key) => (acc && typeof acc === "object" ? (acc as Record<string, unknown>)[key] : undefined),
          all,
        ) as Record<string, unknown> | undefined)
      : all;

    return (key: string) => {
      const value = key
        .split(".")
        .reduce<unknown>(
          (acc, part) =>
            acc && typeof acc === "object" ? (acc as Record<string, unknown>)[part] : undefined,
          base,
        );
      return typeof value === "string" ? value : key;
    };
  },
}));

async function renderHome(locale: "en" | "fr") {
  const messages =
    locale === "fr"
      ? (await import("../../messages/fr.json")).default
      : (await import("../../messages/en.json")).default;

  const ui = await HomePage({ params: Promise.resolve({ locale }) });
  render(
    <NextIntlClientProvider locale={locale} messages={messages}>
      {ui}
    </NextIntlClientProvider>,
  );
}

describe("Localized Home page", () => {
  it("renders a single level-one heading in English", async () => {
    await renderHome("en");

    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(
      screen.getByRole("heading", { level: 1, name: /agadir tours, excursions and transfers/i }),
    ).toBeInTheDocument();
  });

  it("renders a single level-one heading in French", async () => {
    await renderHome("fr");

    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(
      screen.getByRole("heading", { level: 1, name: /tours, excursions et transferts à agadir/i }),
    ).toBeInTheDocument();
  });
});

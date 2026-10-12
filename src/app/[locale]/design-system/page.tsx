import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import { DESIGN_TOKENS, contrastRatio } from "@/content/design-tokens";
import { isAppLocale } from "@/i18n/locales";
import { buildPageMetadata } from "@/seo/metadata";
import { tokenHex } from "@/content/design-tokens";
import {
  Accordion,
  Eyebrow,
  SectionHeading,
  Tag,
  buttonClass,
} from "@/components/ui";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isAppLocale(locale)) return {};

  const t = await getTranslations({ locale, namespace: "designSystem" });
  return buildPageMetadata({
    title: t("metaTitle"),
    description: t("metaDescription"),
    locale,
    pathname: `/${locale}/design-system`,
    enPath: "/en/design-system",
    frPath: "/fr/design-system",
    titleAbsolute: true,
    noindex: true,
  });
}

/**
 * A living component sheet (Sprint 10, Task 13): every token and component
 * state the re-skin ships, rendered at real values — not screenshots — so a
 * drift shows up the moment a token or utility changes. Living and noindex.
 */
export default async function DesignSystemPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isAppLocale(locale)) notFound();
  setRequestLocale(locale);

  const t = await getTranslations("designSystem");

  // Palette from the typed token mirror (pinned to globals.css by test) —
  // never re-typed here. Each swatch shows its WCAG contrast ratio against
  // the pairing the system actually uses: ink text on light surfaces, white
  // on dark ones, and accent on the on-accent (white) button label.
  const TOKEN_MESSAGE_KEY: Record<string, string> = {
    canvas: "canvas",
    surface: "surface",
    "surface-muted": "surfaceMuted",
    ink: "ink",
    "ink-muted": "inkMuted",
    line: "line",
    accent: "accent",
    "accent-strong": "accentStrong",
    "on-accent": "onAccent",
    olive: "olive",
    error: "error",
  };
  // Keep literal Tailwind classes in a static map so the scanner sees them.
  const TOKEN_BG_CLASS: Record<string, string> = {
    canvas: "bg-canvas",
    surface: "bg-surface",
    "surface-muted": "bg-surface-muted",
    ink: "bg-ink",
    "ink-muted": "bg-ink-muted",
    line: "bg-line",
    accent: "bg-accent",
    "accent-strong": "bg-accent-strong",
    "on-accent": "bg-on-accent",
    olive: "bg-olive",
    error: "bg-error",
  };
  const DARK_TOKENS = new Set([
    "ink",
    "ink-muted",
    "accent",
    "accent-strong",
    "olive",
    "error",
  ]);

  const swatches = DESIGN_TOKENS.map((color) => {
    const pairToken =
      color.token === "on-accent"
        ? "accent" // the button's accent fill sits on the white label color
        : DARK_TOKENS.has(color.token)
          ? "white"
          : "ink";
    const pairHex = pairToken === "white" ? "#ffffff" : tokenHex(pairToken);
    return {
      name: t(TOKEN_MESSAGE_KEY[color.token]),
      className: TOKEN_BG_CLASS[color.token],
      value: color.hex,
      contrast: t("contrast", {
        pair: pairToken === "white" ? t("white") : t(TOKEN_MESSAGE_KEY[pairToken]),
        ratio: contrastRatio(color.hex, pairHex),
      }),
    };
  });

  const typeSamples: { label: string; className: string; text: string }[] = [
    { label: "text-display", className: "text-display", text: t("typeDisplay") },
    { label: "text-2xl", className: "text-2xl", text: t("type2xl") },
    { label: "text-xl", className: "text-xl", text: t("typeXl") },
    { label: "text-lg", className: "text-lg", text: t("typeLg") },
    { label: "text-base", className: "text-base", text: t("typeBase") },
    { label: "text-sm", className: "text-sm", text: t("typeSm") },
  ];

  return (
    <main id="main" className="pb-20">
      <div className="shell pt-12 md:pt-16">
        <Eyebrow>{t("eyebrow")}</Eyebrow>
        <h1 className={`mb-4 max-w-[58rem] text-2xl`}>{t("title")}</h1>
        <p className="mb-12 max-w-[42rem] text-lg text-ink-muted">{t("intro")}</p>

        {/* Swatches */}
        <SectionHeading eyebrow={t("swatchesEyebrow")} title={t("swatchesTitle")} />
        <ul className="mb-16 grid grid-cols-2 gap-4 md:grid-cols-5">
          {swatches.map((swatch) => (
            <li key={swatch.name} className="rounded-md border border-line bg-surface p-3">
              <span aria-hidden="true" className={`block h-16 rounded-sm ${swatch.className}`} />
              <span className="mt-2 block text-sm font-semibold text-ink">{swatch.name}</span>
              <span className="block font-mono text-xs text-ink-muted">{swatch.value}</span>
              <span className="mt-1 block text-xs text-ink-muted">{swatch.contrast}</span>
            </li>
          ))}
        </ul>

        {/* Type scale */}
        <SectionHeading eyebrow={t("typeEyebrow")} title={t("typeTitle")} />
        <div className="mb-16 grid gap-6 border-t border-line pt-8">
          {typeSamples.map((sample) => (
            <div key={sample.label} className="border-b border-line pb-6">
              <span className="font-mono text-xs uppercase tracking-wide text-accent-strong">
                {sample.label}
              </span>
              {/* Real Playfair for h-class sizes; DM Sans body serifless jars. */}
              <p className={`${sample.className} font-serif`}>{sample.text}</p>
            </div>
          ))}
          <div className="border-b border-line pb-6">
            <span className="font-mono text-xs uppercase tracking-wide text-accent-strong">
              ink-muted 60–75%
            </span>
            <p className="text-lg text-ink-muted">{t("mutedSample")}</p>
          </div>
        </div>

        {/* Spacing scale */}
        <SectionHeading eyebrow={t("spacingEyebrow")} title={t("spacingTitle")} />
        <ul className="mb-16 grid grid-cols-[minmax(0,1fr)] gap-3 border-t border-line pt-8 text-sm text-ink-muted">
          {[
            [t("space1"), "h-1"],
            [t("space2"), "h-2"],
            [t("space3"), "h-3"],
            [t("space4"), "h-4"],
            [t("space5"), "h-6"],
            [t("space6"), "h-8"],
            [t("space7"), "h-12"],
          ].map(([label, barClass]) => (
            <li key={label} className="flex items-center gap-4">
              <span className="w-32 shrink-0 font-mono text-xs">{label}</span>
              <span aria-hidden="true" className={`block flex-1 bg-accent ${barClass}`} />
            </li>
          ))}
          <li className="flex flex-wrap items-center gap-4">
            <span className="w-32 shrink-0 font-mono text-xs">{t("radius")}</span>
            <span className="flex min-w-0 flex-wrap gap-3">
              <span aria-hidden="true" className="h-8 w-16 rounded-sm border border-line bg-surface" />
              <span aria-hidden="true" className="h-8 w-16 rounded-md border border-line bg-surface" />
              <span aria-hidden="true" className="h-8 w-16 rounded-lg border border-line bg-surface" />
            </span>
          </li>
        </ul>

        {/* Buttons */}
        <SectionHeading eyebrow={t("buttonsEyebrow")} title={t("buttonsTitle")} />
        <div className="mb-16 grid flex-wrap gap-4 border-t border-line pt-8 sm:flex">
          <span className={buttonClass("primary")}>{t("btnPrimary")}</span>
          <span className={buttonClass("secondary")}>{t("btnSecondary")}</span>
          <span className={buttonClass("light")}>{t("btnLight")}</span>
          <span className={`${buttonClass("ghost-light")} bg-ink`}>{t("btnGhost")}</span>
        </div>

        {/* Fields */}
        <SectionHeading eyebrow={t("fieldsEyebrow")} title={t("fieldsTitle")} />
        <div className="mb-16 grid gap-6 border-t border-line pt-8 md:grid-cols-2">
          <label className="flex flex-col gap-2 text-sm font-semibold text-ink">
            {t("fieldDefault")}
            <input
              readOnly
              className="min-h-11 w-full rounded-sm border border-accent/60 bg-surface px-4 py-3 text-sm font-normal text-ink outline-none transition-colors focus:border-accent"
              defaultValue={t("fieldDefaultSample")}
            />
          </label>
          <label className="flex flex-col gap-2 text-sm font-semibold text-ink">
            {t("fieldError")}
            <input
              readOnly
              className="min-h-11 w-full rounded-sm border border-error bg-surface px-4 py-3 text-sm font-normal text-ink outline-none"
              defaultValue={t("fieldErrorSample")}
              aria-invalid="true"
              aria-describedby="ds-field-error"
            />
            <small id="ds-field-error" className="flex items-center gap-1 text-xs font-medium text-error">
              {t("fieldErrorMessage")}
            </small>
          </label>
          <div className="rounded-md bg-surface p-5 shadow-card md:col-span-2">
            <strong className="font-serif text-lg text-ink">{t("cardTitle")}</strong>
            <p className="mt-1 text-sm text-ink-muted">{t("cardBody")}</p>
          </div>
        </div>

        {/* Accordion */}
        <SectionHeading eyebrow={t("accordionEyebrow")} title={t("accordionTitle")} />
        <div className="mb-16">
          <Accordion
            items={[
              { title: t("accordionOpen"), body: t("accordionOpenBody") },
              { title: t("accordionClosed"), body: t("accordionClosedBody") },
            ]}
            openFirst
          />
        </div>

        {/* Tags + list states */}
        <SectionHeading eyebrow={t("tagsEyebrow")} title={t("tagsTitle")} />
        <div className="mb-16 flex flex-wrap items-center gap-3 border-t border-line pt-8">
          <Tag>{t("tagExperience")}</Tag>
          <Tag>{t("tagAdventure")}</Tag>
          <Tag>{t("tagFamily")}</Tag>
        </div>

        {/* Sticky mobile bar demo — described, not live (the real bar is owned
            by the booking form and needs its submit target). */}
        <SectionHeading eyebrow={t("barEyebrow")} title={t("barTitle")} />
        <div className="border-t border-line pt-8 text-sm text-ink-muted">
          <p className="max-w-[42rem]">{t("barBody")}</p>
        </div>
        {/* Static rendering of the bar (visible variant pinned) below 48rem: */}
        <div className="mobile-bar mobile-bar--visible mobile-bar--booking pointer-events-none max-md:!grid grid-cols-2" aria-hidden="true">
          <div>
            <small>{t("barDemoTitle")}</small>
            <strong className="font-serif text-xl">70 €</strong>
            <em>{t("barDemoNote")}</em>
          </div>
          <button type="button" tabIndex={-1}>
            {t("barDemoNote")}
          </button>
        </div>
      </div>
    </main>
  );
}

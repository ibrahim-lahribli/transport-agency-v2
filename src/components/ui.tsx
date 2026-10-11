import type { ComponentProps, ReactNode } from "react";

import { Link } from "@/i18n/routing";

/**
 * Shared design primitives (agency-design-v2). Server components by default —
 * the accordion uses native `<details>`, so no client JS is needed.
 */

type ButtonVariant = "primary" | "secondary" | "light" | "ghost-light";

const BUTTON_BASE =
  "inline-flex min-h-11 items-center justify-center rounded-sm border border-transparent px-6 py-3 text-base font-semibold leading-snug transition-colors";

const BUTTON_VARIANTS: Record<ButtonVariant, string> = {
  primary: "bg-accent text-on-accent hover:bg-accent-strong",
  secondary: "border-ink text-ink hover:bg-ink hover:text-canvas",
  light: "bg-canvas text-ink hover:bg-surface",
  "ghost-light": "border-white/60 text-white hover:bg-white/10",
};

/**
 * Class string for the design's button look. Exported so external anchors
 * (WhatsApp, mailto) match without going through the router `Link`.
 */
export function buttonClass(variant: ButtonVariant = "primary"): string {
  return `${BUTTON_BASE} ${BUTTON_VARIANTS[variant]}`;
}

export function ButtonLink({
  href,
  variant = "primary",
  children,
}: {
  href: ComponentProps<typeof Link>["href"];
  variant?: ButtonVariant;
  children: ReactNode;
}) {
  return (
    <Link href={href} className={buttonClass(variant)}>
      {children}
    </Link>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-accent-strong">
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  body,
}: {
  eyebrow?: string;
  title: string;
  body?: string;
}) {
  return (
    <div className="mb-12 max-w-[44rem]">
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <h2 className="mb-4 text-2xl">{title}</h2>
      {body ? <p className="max-w-[38rem] text-lg text-ink-muted">{body}</p> : null}
    </div>
  );
}

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-surface-muted px-3 py-1 text-xs font-semibold uppercase text-ink">
      {children}
    </span>
  );
}

export function PageIntro({
  eyebrow,
  title,
  body,
  compact = false,
}: {
  eyebrow: string;
  title: string;
  body: string;
  compact?: boolean;
}) {
  return (
    <section className="border-b border-line pb-8 pt-12 md:pt-16">
      <div className="shell">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className={`mb-4 max-w-[58rem] ${compact ? "text-2xl" : "text-display"}`}>{title}</h1>
        <p className="max-w-[42rem] text-lg text-ink-muted">{body}</p>
      </div>
    </section>
  );
}

export function Accordion({
  items,
  openFirst = false,
}: {
  items: { title: ReactNode; body: ReactNode }[];
  openFirst?: boolean;
}) {
  return (
    <div>
      {items.map((item, index) => (
        <details
          key={index}
          className="group border-t border-line last:border-b"
          open={openFirst && index === 0}
        >
          <summary className="flex min-h-14 cursor-pointer items-center justify-between gap-4 rounded-sm py-2 text-lg">
            <span>{item.title}</span>
            <span
              aria-hidden="true"
              className="relative flex size-4 shrink-0 items-center justify-center text-accent-strong transition-transform group-open:rotate-180"
            >
              <span className="absolute h-0.5 w-4 bg-current" />
              <span className="absolute h-0.5 w-4 rotate-90 bg-current transition-opacity group-open:opacity-0" />
            </span>
          </summary>
          <p className="max-w-[42rem] pb-6 pe-12 text-ink-muted">{item.body}</p>
        </details>
      ))}
    </div>
  );
}

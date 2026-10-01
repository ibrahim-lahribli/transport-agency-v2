# Content model

The catalogue is typed source code. There is no CMS; changes are code changes.

## Files

- `content/{en,fr}/<service>.ts` — one file per service, exporting a
  `Service` (see `src/schemas/service.ts`), plus a default export.
- `content/{en,fr}/index.ts` — exports `services` (ordered array),
  `servicesById` and the named services.
- `data/source/*.json` + `data/source/services-report.md` — the original
  source material, consumed only by `scripts/build-content.mjs`. Not read at
  runtime.
- `messages/{en,fr}.json` — UI copy (not service copy).

## A service

| Field                                                                                                              | Notes                                                               |
| ------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------- |
| `id`                                                                                                               | Stable across locales; equal to the filename.                       |
| `category`                                                                                                         | `activity` \| `excursion` \| `transfer` → the hub it appears under. |
| `status`                                                                                                           | `draft` \| `published` \| `archived`. **Only `published` ships.**   |
| `order`                                                                                                            | Unique positive integer; catalogue sort order.                      |
| `slug`                                                                                                             | Localized, human-readable; unique within a locale.                  |
| `title`, `summary`                                                                                                 | Localized.                                                          |
| `seo.title` / `seo.description`                                                                                    | ≤ 60 / ≤ 160 characters.                                            |
| `primaryKeyword`                                                                                                   | Must appear in `seo.title`.                                         |
| `price`                                                                                                            | `currency: "EUR"`, a unit at the top level **or** on every option.  |
| `capacity`, `languages`, `host`, `cancellationPolicy`                                                              | Operational metadata.                                               |
| `itinerary`, `includedExtra`, `notIncluded`, `bring`, `suitableFor`, `restrictions`, `seasonalNotes`, `highlights` | Optional copy arrays/blocks.                                        |
| `faq`                                                                                                              | `{ q, a }[]`; renders `<details>` and `FAQPage` JSON-LD.            |
| `routes` (transfers)                                                                                               | Per-route vehicle prices (`sedan`/`van`/`minibus`).                 |
| `price.options[].isBase`                                                                                           | Marks the bookable base option for the "From" price.                |

## Publish gate

`src/seo/content.ts` filters every read to `status === "published"` and sorts by
`order`. This applies to pages, `generateStaticParams`, metadata, the sitemap,
related services and the locale switcher. To take a service live, set
`status: "published"` in **both** locales.

## Validation

`pnpm validate:data` (`scripts/validate-data.mjs` → `src/validation/`) enforces:

1. No duplicate slugs within a locale.
2. Every EN service has an FR counterpart, with `title`, `slug`, `summary`,
   `seo.title`, `seo.description`, `primaryKeyword`, and `highlights` for
   non-transfers.
3. `seo.title` ≤ 60 and `seo.description` ≤ 160 characters.
4. `primaryKeyword` present in `seo.title`.
5. Known `cancellationPolicy` / `host` / `privateRate` keys.
6. Every price (and transfer extra) declares a unit.
7. The word **"Sahara"** appears nowhere in copy.

The zod schema also enforces the title/description lengths, the primary-keyword
rule and the Sahara rule at type level.

## Adding or changing a service

Follow the [add-service skill](../.agents/skills/add-service/SKILL.md) and finish
with `pnpm validate:data`, `pnpm test` and `pnpm build`.

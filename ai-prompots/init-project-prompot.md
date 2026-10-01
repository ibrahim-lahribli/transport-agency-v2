<role> You are a senior front-end engineer setting up the foundation of a multilingual, SEO-first, MOBILE-FIRST static website for a small tourism company in Agadir, Morocco. You work in small verified steps and you never invent business facts. </role> <goal> Initialize the project so that a developer can start building on a solid, tested foundation. This is a foundation task, not a full build. At the end I must be able to run one command and see every page type rendered in English and French from the provided data, with mobile-first layout, the WhatsApp request flow, SEO plumbing, environment protections </goal> <context> - Audience: foreign tourists in Agadir, mostly on phones (often Android, hotel Wi-Fi or roaming). Requests happen on WhatsApp. There is no online payment. - Launch languages: English and French. Spanish, German, Dutch and Arabic (right-to-left) may come later. - The business has NOT received its travel-agent licence yet. The site is built on a private staging environment and must not be public, indexable or advertised until the launch gate passes. - The provided  files contain DRAFT content written as proposals. Their facts are unconfirmed. They contain placeholders (brand name, WhatsApp number). Do not change any fact in them. - Read allfiles fully before writing code. `site.json` includes content rules, policies, WhatsApp templates and `launchBlockers`. Follow its `contentRules`. - Product files hold three categories: `excursion`, `activity`, `transfer` (15 products total). </context>

<decisions_already_made>

Framework: Astro, static output, TypeScript strict. Check the CURRENT stable Astro version and read its current docs for content collections (Content Layer), i18n routing and the sitemap integration before coding. Do not rely on memory for APIs. Pin versions.
Styling: plain CSS with design tokens (CSS custom properties) and Astro scoped styles. No CSS framework and no UI framework. Client JavaScript is opt-in and tiny.
Package manager: pnpm unless the folder already indicates otherwise.
Hosting-agnostic static output, with a _headers file compatible with Cloudflare Pages and Netlify.
Content stays in the repository (typed collections). No CMS yet.
Languages: en and fr, both with URL prefixes. </decisions_already_made>

<mobile_first_requirements> Treat these as hard, testable constraints, not preferences.

Design and CSS

Design at 360x740 first, then enhance upward with min-width media queries only (around 640px and 960px). No max-width queries except prefers-reduced-motion and prefers-color-scheme.
Single-column layouts by default. Key facts in a 2-column grid. Cards stack. No hover-dependent UI anywhere. Everything works with touch and keyboard.
Touch targets at least 48x48 CSS px with at least 8px spacing. Body text 16 to 18px, line-height about 1.5. Form controls at least 16px so iOS does not zoom.
Use logical CSS properties (margin-inline, padding-block, inset-inline-start) everywhere so right-to-left Arabic can be added later without rewrites.
Use the viewport meta with width=device-width, initial-scale=1 and viewport-fit=cover. Honour env(safe-area-inset-*) for fixed bars.
No horizontal scroll at 320px width. Tables scroll inside their own container.
Palette inspired by the Atlantic coast (deep blue, sand, terracotta accent). All text and interactive states must meet WCAG 2.2 AA contrast. Verify programmatically. Use a system font stack at first (zero font requests). If a web font is added later, self-host, subset, font-display: swap.

Components and interaction 8. A sticky bottom action bar on mobile with the primary WhatsApp action. It respects the bottom safe area, never covers content or the cookie banner (add bottom padding to the page), and becomes a header button from 960px up. 9. Mobile navigation with large tap targets, built with <details> or the native Popover API (no framework). Language switch always visible in the header and linking to the SAME page in the other language. 10. Product pages put price, key facts and the request action in the first screen, then itinerary, inclusions, FAQ. Use <details> for FAQ. All content must be present in the DOM on mobile (Google indexes the mobile version, so never hide content behind mobile-only removal). 11. Forms use native controls: input type=date, numeric inputmode, correct autocomplete values.

Performance budgets (measured on the mobile Lighthouse profile with Slow 4G throttling) 12. LCP at most 2.5s (target 2.0s), CLS at most 0.05, TBT at most 100ms, Lighthouse Performance, Accessibility, Best Practices and SEO each at least 95 on the home page, a hub page and a product page, in both languages. 13. JavaScript per page at most 30 KB gzip excluding analytics (which only loads after consent). CSS at most 25 KB gzip. Zero third-party requests before consent. 14. Images: responsive AVIF/WebP via Astro's image tooling, explicit width and height, sizes for 100vw on mobile, the LCP image with fetchpriority="high" and no lazy loading, everything else lazy. No photos exist yet: generate neutral placeholder images and mark them clearly. 15. prefers-reduced-motion respected. No autoplay video, no carousels, no parallax. </mobile_first_requirements>

<information_architecture> Root / is a tiny, indexable language chooser (used as x-default), with no IP-based redirect and no automatic redirect. Verify in the Astro docs how to keep the root page while using prefixed locales.

Page	EN path	FR path
Home	/en/	/fr/
Excursions hub	/en/excursions/	/fr/excursions/
Activities hub	/en/activities/	/fr/activites/
Transfers hub	/en/transfers/	/fr/transferts/
Product	/en/{category-segment}/{slug.en}/	/fr/{category-segment}/{slug.fr}/
About	/en/about/	/fr/a-propos/
How it works	/en/how-it-works/	/fr/comment-ca-marche/
FAQ	/en/faq/	/fr/faq/
Contact	/en/contact/	/fr/contact/
Terms and cancellation	/en/terms/	/fr/conditions/
Privacy and cookies	/en/privacy/	/fr/confidentialite/
404	/404 (language-aware)	

Product slugs come from each product's slug field. Build a single route-map module that gives, for any page, its URL in each language. It powers the language switcher, hreflang, canonical URLs, the sitemap and tests. </information_architecture>

<data_layer>

Copy the JSON files to src/data/ (keep originals untouched in content-input/). Load them with content collections and validate with Zod schemas. Schemas must accept ALL 15 products and reject malformed data with a readable error. Model these product shapes: price.options with per-option unit, routes for transfers, privateRate referencing site.privateDayRates, cancellationPolicy referencing site.policies, and an optional route object for future research data.
Create a typed getProduct, getProductsByCategory, getSite API. Components never read raw JSON.
Translation-pending mechanism: French fields that are missing must never silently fall back to English in production. In staging, fall back to English but wrap the text in a visible "[translation pending]" marker and log it. In production the publish gate fails. Provide UI strings for navigation, buttons and labels in src/i18n/en.ts and fr.ts. Draft the French strings and note they need native review.
Derive a short unique product code from the id (for example paradise-valley becomes PV). Add a test that codes are unique. </data_layer>

<whatsapp_request_flow>

The primary action on every product is "Request availability", never "Book now".
Progressive enhancement: without JavaScript the button is a plain link https://wa.me/<number>?text=<url-encoded default message>. The number is digits only in international format, no plus sign. Build the message from site.json.whatsappRequestMessage.
With a small script (under 2 KB gzip): a request panel with date, number of guests, hotel and language (transfers also ask for flight number) builds the message, generates the reference code using refFormat, updates the link, and pushes an analytics event ONLY if consent was given. The pre-filled text is visible and editable by the user, so keep it short and readable.
Provide a "copy number" fallback for desktop users without WhatsApp.
Read the number from site.json. While the number is a placeholder, show a visible staging warning. </whatsapp_request_flow>

<seo_and_head>

Every page: unique title (brand appended), meta description, self-referencing canonical, <html lang>, Open Graph and Twitter tags, and hreflang for both languages plus x-default, with absolute URLs and reciprocal links. Add a test that verifies hreflang reciprocity for every page pair.
Structured data as JSON-LD builders with tests: Organization/LocalBusiness on the home page (do NOT use TravelAgency until the licence is confirmed), BreadcrumbList, and Product with Offer on product pages ONLY when price.confirmed is true. Never emit AggregateRating or Review. Check Google's current structured-data documentation for required fields and emit only what can be truthfully supported.
Sitemap through the official sitemap integration with its i18n option (check current docs). robots.txt per environment (see below).
Semantic HTML, one h1 per page, logical heading order, descriptive link text. </seo_and_head>


<consent_and_analytics>

Build a tiny consent module (necessary versus analytics) with a bottom sheet that does not cover the WhatsApp bar. Store the choice in localStorage inside try/catch and work when storage is empty.
GA4 loads only after analytics consent, using PUBLIC_GA_ID. Nothing loads before consent. Draft banner text in both languages, flagged for review. Note in the README that Moroccan CNDP obligations and the legal texts are placeholders that need a lawyer. </consent_and_analytics>

<pages_and_components> Build the following, minimal but real, all rendering from the data:

BaseLayout, Header (mobile nav, language switch), Footer (licence placeholder, contact), StagingBanner, SEOHead, Breadcrumbs.
Hero, ProductCard, CategoryHub, PriceBox (always shows the unit), KeyFacts, Itinerary, IncludedList, FAQ, RequestPanel, StickyRequestBar, ConsentBanner, LanguageChooser.
Pages listed in the information architecture, generated for both languages. Static pages (about, how it works, contact, terms, privacy) use text from site.json where it exists and clearly marked placeholder text elsewhere.
Where content is missing (photos, reviews, licence number), show a neutral marked placeholder. Never fabricate reviews, ratings, counts, years in business or licence numbers. </pages_and_components>

<tooling_and_tests>

ESLint, Prettier, astro check, TypeScript strict. Scripts: dev, build, preview, check, lint, test, test:e2e, lighthouse, gate.
Vitest unit tests: route map and URL uniqueness, hreflang reciprocity, publish gate, product code uniqueness, JSON-LD builders, WhatsApp link builder (including encoding and digits-only number).
Playwright smoke tests at 360x740, 390x844, 768x1024 and 1280x800 for: home, one hub, one product per category, in both languages. Assertions: no horizontal overflow (also at 320 wide), the sticky bar does not cover the last content, language switch lands on the equivalent page, and no third-party network request before consent. Save screenshots.
Lighthouse CI config with the budgets above, mobile profile.
An accessibility check with axe on the same pages. </tooling_and_tests>

<docs_to_produce>

README.md: setup, scripts, environments, how to add a product, how to add a language, how staging protection is configured, how the publish gate works.
STATUS.md: what is done, what is not, decisions taken and why, deviations from this brief, known issues.
AGENTS.md (also usable as CLAUDE.md): short project rules for future sessions: the content rules from site.json, never invent facts, staging versus production, mobile-first rules, the request-not-book wording, and the commands to run before finishing any change. </docs_to_produce>

<working_method>

First read the four JSON files and check the current Astro docs. Then write a plan of 15 lines or fewer and start.
Work in small steps. git init, then commit after each meaningful step with clear messages.
After each step, run the relevant command (build, check, tests) and read the output. Fix problems before moving on. Do not claim something works without running it.
If a requirement conflicts with the current framework's behaviour, choose the closest compliant option, explain it in STATUS.md, and continue. Ask me a question only if you are truly blocked. </working_method>

<definition_of_done>

pnpm install && pnpm dev shows all pages in both languages, and the staging banner.
pnpm build (staging) succeeds. SITE_ENV=production pnpm build FAILS with a clear gate report on the provided data.
All tests pass, the Lighthouse budgets pass on the tested pages, and there is no horizontal scroll at 320px.
View-source of a product page shows complete HTML content, correct canonical, hreflang and JSON-LD.
README, STATUS and AGENTS files exist and are accurate.
Finish with a report: what you built, the commands you ran and their results, screenshots location, deviations, and the three riskiest open items. </definition_of_done>

<do_not>

Do not change any fact, price, policy or flag in the JSON data. Do not set anything to confirmed.
Do not invent copy, photos credits, reviews, ratings, addresses, phone numbers or licence details.

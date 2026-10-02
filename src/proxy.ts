import createMiddleware from "next-intl/middleware";

import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Skip API routes, static files and Next internals. The extensionless
  // metadata routes (`/icon`, `/apple-icon`) are listed explicitly: without them
  // the locale middleware 307-redirects them to `/en/...`, which breaks the
  // favicon for crawlers. The share image is locale-scoped
  // (`/[locale]/opengraph-image`) so it needs no exclusion here.
  matcher: ["/((?!api|_next|_vercel|icon(?:/|$)|apple-icon(?:/|$)|.*\\..*).*)"],
};

import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Match all pathnames except:
  // - `/api`, `/_next`, `/_vercel`
  // - files with extensions (e.g. `sitemap.xml`, `robots.txt`, `favicon.ico`, `.woff2`)
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};

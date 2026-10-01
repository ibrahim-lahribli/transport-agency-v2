import React from "react";
import Link from "next/link";
import { inter } from "./fonts";
import "./globals.css";

export default function RootNotFound() {
  return (
    <html lang="en" className={inter.variable}>
      <body className="flex min-h-screen flex-col items-center justify-center bg-canvas text-ink ps-4 pe-4 text-center">
        <p className="text-sm font-semibold tracking-wide uppercase text-accent">404 Error</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-ink sm:text-4xl">Page Not Found</h1>
        <p className="mt-3 text-base text-ink-muted">
          The page you requested could not be found.
        </p>
        <div className="mt-6">
          <Link
            href="/en"
            className="rounded-md bg-accent ps-4 pe-4 py-2 text-sm font-semibold text-on-accent hover:bg-accent-strong transition-colors"
          >
            Return to Homepage
          </Link>
        </div>
      </body>
    </html>
  );
}

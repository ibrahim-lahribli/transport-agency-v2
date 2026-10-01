#!/usr/bin/env node
/**
 * validate:data — content validation entry point.
 *
 * This is an intentional stub. The real validator will load the catalogue
 * files in /data/source (activities, excursions, transfers) and check them
 * against the shared schema and the business rules from the services report.
 *
 * Until that lands, the script reports that it is a no-op and exits 0 so the
 * CI pipeline can wire it in without failing.
 */
console.log(
  "[validate:data] Stub: no rules implemented yet. The real validator arrives with the content pipeline in /data/source.",
);
process.exit(0);

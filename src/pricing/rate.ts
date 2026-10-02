/**
 * EUR→MAD conversion rate for indicative display only. Read from a public env
 * var so the pure quote engine can run on the client (booking form) without
 * pulling in server-only config.
 */
export const EUR_TO_MAD_RATE = Number.parseFloat(
  process.env.NEXT_PUBLIC_EUR_TO_MAD_RATE ?? "10.8",
);

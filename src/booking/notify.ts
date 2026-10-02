import type { Inquiry } from "./types";

export interface NotifyResult {
  delivered: boolean;
  /** Why delivery was skipped, for logging/diagnostics. */
  reason?: string;
}

/** The resolved selection shown to the operator, plain-text. */
export interface InquirySelection {
  optionLabel?: string;
  vehicle?: string;
  /** A transfer route, rendered as "from → to". */
  routeLabel?: string;
}

function formatMessage(
  inquiry: Inquiry,
  serviceTitle: string,
  selection: InquirySelection,
): string {
  return [
    `New booking inquiry: ${serviceTitle} (${inquiry.serviceId})`,
    `Name: ${inquiry.name}`,
    `Email: ${inquiry.email}`,
    `Phone: ${inquiry.phone}`,
    inquiry.date ? `Date: ${inquiry.date}` : null,
    `Adults: ${inquiry.adults} / Children: ${inquiry.children}`,
    selection.optionLabel ? `Option: ${selection.optionLabel}` : null,
    selection.routeLabel ? `Route: ${selection.routeLabel}` : null,
    selection.vehicle ? `Vehicle: ${selection.vehicle}` : null,
    inquiry.hotel ? `Hotel: ${inquiry.hotel}` : null,
    inquiry.notes ? `Notes: ${inquiry.notes}` : null,
  ]
    .filter(Boolean)
    .join("\n");
}

/**
 * Provider-agnostic notification. Uses Resend when `RESEND_API_KEY` and
 * `BOOKING_NOTIFY_EMAIL` are configured; otherwise logs the inquiry and reports
 * that delivery was skipped, so the form still works in local/CI environments.
 */
export async function notifyInquiry(
  inquiry: Inquiry,
  serviceTitle: string,
  selection: InquirySelection = {},
): Promise<NotifyResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.BOOKING_NOTIFY_EMAIL;
  const text = formatMessage(inquiry, serviceTitle, selection);

  if (!apiKey || !to) {
    console.log(`[booking] inquiry received (no provider configured):\n${text}`);
    return { delivered: false, reason: "no-provider" };
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.BOOKING_FROM_EMAIL ?? "bookings@example.com",
        to,
        subject: `Booking inquiry: ${serviceTitle}`,
        text,
      }),
    });
    if (!response.ok) {
      return { delivered: false, reason: `provider-${response.status}` };
    }
    return { delivered: true };
  } catch (error) {
    return { delivered: false, reason: `network-${(error as Error).message}` };
  }
}

/**
 * Formats a duration in fractional hours into standard ISO 8601 duration
 * (e.g. PT6H, PT4H15M). Returns null when there is no real duration, so callers
 * can omit the property instead of publishing an invented value.
 */
export function formatIsoDuration(hours?: number): string | null {
  if (hours == null || !Number.isFinite(hours) || hours <= 0) return null;

  const totalMinutes = Math.round(hours * 60);
  const wholeHours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (wholeHours === 0) return minutes > 0 ? `PT${minutes}M` : null;
  if (minutes === 0) return `PT${wholeHours}H`;
  return `PT${wholeHours}H${minutes}M`;
}

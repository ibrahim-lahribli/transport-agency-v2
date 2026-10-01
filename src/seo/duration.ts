/**
 * Formats a duration in fractional hours into standard ISO 8601 duration (e.g. PT6H, PT4H15M).
 */
export function formatIsoDuration(hours?: number): string {
  if (!hours || hours <= 0) return "PT1H";
  const wholeHours = Math.floor(hours);
  const minutes = Math.round((hours - wholeHours) * 60);

  if (wholeHours === 0 && minutes > 0) {
    return `PT${minutes}M`;
  }
  if (minutes === 0) {
    return `PT${wholeHours}H`;
  }
  return `PT${wholeHours}H${minutes}M`;
}

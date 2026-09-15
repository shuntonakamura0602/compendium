export function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-US").format(value);
}

/** "2018-05-17" -> "May 17, 2018". Falls back to the raw string if unparsable. */
export function formatDate(iso: string): string {
  const date = new Date(`${iso}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) return iso;
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  }).format(date);
}

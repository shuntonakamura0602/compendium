export const siteName = "Compendium";

/** Public origin, used for absolute URLs in metadata and generated context. */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
).replace(/\/$/, "");

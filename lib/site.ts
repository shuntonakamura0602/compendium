export const siteName = "Compendium";

/**
 * Resolve the public origin used for absolute URLs in metadata, sitemap and
 * generated agent context.
 *
 * Priority: NEXT_PUBLIC_SITE_URL → Vercel's production / deployment host →
 * localhost. Empty values are treated as unset and a missing scheme is
 * assumed to be https, so a bare host name never crashes `new URL()`.
 */
function resolveSiteUrl(): string {
  const candidates = [
    process.env.NEXT_PUBLIC_SITE_URL,
    process.env.VERCEL_PROJECT_PRODUCTION_URL,
    process.env.VERCEL_URL,
  ];

  for (const raw of candidates) {
    const value = raw?.trim();
    if (!value) continue;
    const withScheme = /^https?:\/\//i.test(value) ? value : `https://${value}`;
    try {
      return new URL(withScheme).origin;
    } catch {
      // Fall through to the next candidate.
    }
  }

  return "http://localhost:3000";
}

/** Public origin without a trailing slash. */
export const siteUrl = resolveSiteUrl();

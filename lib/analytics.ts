"use client";

import { track } from "@vercel/analytics";

/**
 * Custom events tracked on top of Vercel Analytics page views (spec §35).
 * Property values must be primitives; Vercel rejects nested objects.
 */

export type OutboundKind =
  | "kaggle"
  | "discussion"
  | "solution"
  | "notebook"
  | "github"
  | "other";

/** Competition slug derived from the current URL, or "" outside a competition page. */
function currentCompetition(): string {
  if (typeof window === "undefined") return "";
  const match = window.location.pathname.match(/^\/competitions\/([^/]+)/);
  return match?.[1] ?? "";
}

export function trackCopyContext(competition: string, characters: number) {
  track("copy_context", { competition, characters });
}

export function trackOutboundClick(kind: OutboundKind, href: string) {
  track("outbound_click", { kind, href, competition: currentCompetition() });
}

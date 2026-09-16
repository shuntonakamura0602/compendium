"use client";

import type { AnchorHTMLAttributes } from "react";
import { trackOutboundClick, type OutboundKind } from "@/lib/analytics";

/**
 * Outbound link. Every click is reported as an `outbound_click` event with
 * its kind (kaggle / discussion / solution / notebook / github) so outbound
 * traffic can be measured per destination type (spec §35).
 */
export default function ExternalLink({
  kind = "other",
  children,
  className = "",
  href,
  onClick,
  ...rest
}: AnchorHTMLAttributes<HTMLAnchorElement> & { kind?: OutboundKind }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`text-accent-strong underline-offset-4 hover:underline ${className}`}
      onClick={(event) => {
        if (href) trackOutboundClick(kind, href);
        onClick?.(event);
      }}
      {...rest}
    >
      {children}
    </a>
  );
}

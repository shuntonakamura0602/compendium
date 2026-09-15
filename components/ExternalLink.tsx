import type { AnchorHTMLAttributes } from "react";

/**
 * Outbound link. Centralized so outbound click tracking (spec §35) can be
 * added in one place later.
 */
export default function ExternalLink({
  children,
  className = "",
  ...rest
}: AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      className={`text-accent-strong underline-offset-4 hover:underline ${className}`}
      {...rest}
    >
      {children}
    </a>
  );
}

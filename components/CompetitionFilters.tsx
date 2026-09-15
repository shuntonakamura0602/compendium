import Link from "next/link";
import type { CompetitionFilter } from "@/lib/competitions";
import {
  categoryLabels,
  categoryValues,
  statusLabels,
  statusValues,
} from "@/lib/labels";

/**
 * Link-based filter chips (spec §14). State lives entirely in the URL so the
 * list page stays a server component and filters are shareable.
 */
export default function CompetitionFilters({
  filter,
}: {
  filter: CompetitionFilter;
}) {
  const hrefFor = (patch: Partial<CompetitionFilter>) => {
    const next = { ...filter, ...patch };
    const params = new URLSearchParams();
    if (next.query) params.set("q", next.query);
    if (next.status) params.set("status", next.status);
    if (next.category) params.set("category", next.category);
    const qs = params.toString();
    return qs ? `/competitions?${qs}` : "/competitions";
  };

  const hasFilter = Boolean(filter.status || filter.category);

  return (
    <div className="flex flex-wrap items-center gap-2">
      <FilterGroup label="Status">
        {statusValues.map((value) => (
          <Chip
            key={value}
            href={hrefFor({ status: filter.status === value ? undefined : value })}
            active={filter.status === value}
          >
            {statusLabels[value]}
          </Chip>
        ))}
      </FilterGroup>

      <span aria-hidden className="hidden h-4 w-px bg-border sm:block" />

      <FilterGroup label="Category">
        {categoryValues.map((value) => (
          <Chip
            key={value}
            href={hrefFor({
              category: filter.category === value ? undefined : value,
            })}
            active={filter.category === value}
          >
            {categoryLabels[value]}
          </Chip>
        ))}
      </FilterGroup>

      {hasFilter && (
        <Link
          href={hrefFor({ status: undefined, category: undefined })}
          className="text-xs text-muted underline-offset-2 hover:underline"
        >
          Clear filters
        </Link>
      )}
    </div>
  );
}

function FilterGroup({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      <span className="sr-only">{label}</span>
      {children}
    </div>
  );
}

function Chip({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      aria-current={active ? "true" : undefined}
      className={`rounded-full px-3 py-1 text-xs font-medium ring-1 transition-colors ${
        active
          ? "bg-foreground text-background ring-foreground"
          : "bg-background text-muted ring-border hover:bg-surface hover:text-foreground"
      }`}
    >
      {children}
    </Link>
  );
}

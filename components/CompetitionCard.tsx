import Link from "next/link";
import type { Competition } from "@/types/competition";
import { categoryLabels, statusLabels, taskTypeLabels } from "@/lib/labels";
import { formatNumber } from "@/lib/format";

export default function CompetitionCard({
  competition,
}: {
  competition: Competition;
}) {
  const year = (competition.endDate ?? competition.startDate).slice(0, 4);

  return (
    <Link
      href={`/competitions/${competition.slug}`}
      className="flex h-full flex-col rounded-lg border border-border bg-background p-5 transition-colors hover:border-accent hover:bg-surface"
    >
      <div className="flex items-start justify-between gap-3">
        <h2 className="text-base font-semibold leading-snug">
          {competition.title}
        </h2>
        <span
          className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${
            competition.status === "active"
              ? "bg-accent/15 text-accent-strong"
              : "bg-surface text-muted ring-1 ring-border"
          }`}
        >
          {statusLabels[competition.status]}
        </span>
      </div>

      <p className="mt-2 line-clamp-2 text-sm text-muted">
        {competition.description}
      </p>

      <ul className="mt-4 flex flex-wrap gap-1.5 text-xs">
        {[
          categoryLabels[competition.category],
          taskTypeLabels[competition.taskType],
          competition.metric,
        ].map((label) => (
          <li
            key={label}
            className="rounded bg-surface px-2 py-0.5 text-foreground/80 ring-1 ring-border"
          >
            {label}
          </li>
        ))}
      </ul>

      <div className="mt-auto flex gap-4 pt-4 text-xs text-muted">
        <span>{year}</span>
        {competition.teamCount !== undefined && (
          <span>{formatNumber(competition.teamCount)} teams</span>
        )}
        {competition.prize && <span>{competition.prize}</span>}
      </div>
    </Link>
  );
}

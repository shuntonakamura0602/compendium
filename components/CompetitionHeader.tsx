import type { Competition } from "@/types/competition";
import ExternalLink from "@/components/ExternalLink";
import { categoryLabels, statusLabels, taskTypeLabels } from "@/lib/labels";
import { formatDate, formatNumber } from "@/lib/format";

export default function CompetitionHeader({
  competition,
}: {
  competition: Competition;
}) {
  const stats: { label: string; value: string }[] = [
    { label: "Metric", value: competition.metric },
    ...(competition.teamCount !== undefined
      ? [{ label: "Teams", value: formatNumber(competition.teamCount) }]
      : []),
    ...(competition.prize ? [{ label: "Prize", value: competition.prize }] : []),
    {
      label: "Timeline",
      value: `${formatDate(competition.startDate)} – ${
        competition.endDate ? formatDate(competition.endDate) : "Ongoing"
      }`,
    },
  ];

  return (
    <header className="py-10">
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span
          className={`rounded-full px-2 py-0.5 font-medium ${
            competition.status === "active"
              ? "bg-accent/15 text-accent-strong"
              : "bg-surface text-muted ring-1 ring-border"
          }`}
        >
          {statusLabels[competition.status]}
        </span>
        <span className="text-muted">
          {categoryLabels[competition.category]} ·{" "}
          {taskTypeLabels[competition.taskType]}
        </span>
      </div>

      <h1 className="mt-3 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
        {competition.title}
      </h1>
      <p className="mt-3 max-w-2xl text-lg text-muted">
        {competition.description}
      </p>

      <ExternalLink
        href={competition.kaggleUrl}
        className="mt-4 inline-block text-sm font-medium"
      >
        Kaggle →
      </ExternalLink>

      <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label}>
            <dt className="text-xs uppercase tracking-wide text-muted">
              {s.label}
            </dt>
            <dd className="mt-1 text-sm font-medium">{s.value}</dd>
          </div>
        ))}
      </dl>
    </header>
  );
}

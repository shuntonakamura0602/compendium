import type { Competition } from "@/types/competition";
import Section from "@/components/Section";

export default function EvaluationSection({
  competition,
}: {
  competition: Competition;
}) {
  return (
    <Section id="evaluation" title="Evaluation">
      <div className="rounded-lg border border-border bg-surface p-5">
        <p className="text-xs uppercase tracking-wide text-muted">
          Evaluation metric
        </p>
        <p className="mt-1 text-2xl font-semibold">{competition.metric}</p>
        {competition.metricDescription && (
          <p className="mt-3 text-[15px] leading-relaxed text-foreground/80">
            {competition.metricDescription}
          </p>
        )}
      </div>
    </Section>
  );
}

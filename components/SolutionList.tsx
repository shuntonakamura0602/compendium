import type { Solution } from "@/types/competition";
import ExternalLink from "@/components/ExternalLink";
import Section from "@/components/Section";
import { sourceAnchorId } from "@/lib/competitions";

/** Top solutions with structured approach details (spec §9). */
export default function SolutionList({ solutions }: { solutions: Solution[] }) {
  const sorted = [...solutions].sort((a, b) => a.rank - b.rank);

  return (
    <Section
      id="solutions"
      title="Top Solutions"
      description="What the winning teams did, structured by model, validation and features."
    >
      {sorted.length === 0 ? (
        <p className="text-sm text-muted">
          No solutions yet. Winning solutions are added after the competition ends.
        </p>
      ) : (
        <ol className="space-y-4">
          {sorted.map((s) => (
            <li
              key={s.id}
              id={sourceAnchorId("solution", s.id)}
              className="rounded-lg border border-border p-5 scroll-mt-28"
            >
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="rounded bg-foreground px-2 py-0.5 text-xs font-semibold text-background">
                  #{s.rank}
                </span>
                <span className="font-semibold">{s.teamName}</span>
                <ExternalLink kind="solution" href={s.url} className="text-sm">
                  {s.title} →
                </ExternalLink>
              </div>

              <p className="mt-3 text-[15px] leading-relaxed text-foreground/85">
                {s.summary}
              </p>

              <dl className="mt-4 grid gap-x-6 gap-y-3 text-sm sm:grid-cols-2">
                {s.models && s.models.length > 0 && (
                  <Detail label="Models">{s.models.join(", ")}</Detail>
                )}
                {s.cvStrategy && (
                  <Detail label="CV strategy">{s.cvStrategy}</Detail>
                )}
                {s.featureEngineering && s.featureEngineering.length > 0 && (
                  <Detail label="Feature engineering">
                    <ul className="list-disc space-y-0.5 pl-5">
                      {s.featureEngineering.map((f) => (
                        <li key={f}>{f}</li>
                      ))}
                    </ul>
                  </Detail>
                )}
                {s.ensemble && <Detail label="Ensemble">{s.ensemble}</Detail>}
              </dl>

              {(s.githubUrl || s.notebookUrl) && (
                <p className="mt-4 flex gap-4 text-sm">
                  {s.githubUrl && (
                    <ExternalLink kind="github" href={s.githubUrl}>
                      GitHub
                    </ExternalLink>
                  )}
                  {s.notebookUrl && (
                    <ExternalLink kind="notebook" href={s.notebookUrl}>
                      Notebook
                    </ExternalLink>
                  )}
                </p>
              )}
            </li>
          ))}
        </ol>
      )}
    </Section>
  );
}

function Detail({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-wide text-muted">{label}</dt>
      <dd className="mt-1 text-foreground/85">{children}</dd>
    </div>
  );
}

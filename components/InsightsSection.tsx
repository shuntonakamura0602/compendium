import type { Competition, Insight } from "@/types/competition";
import Section from "@/components/Section";
import { resolveInsightSource } from "@/lib/competitions";
import { insightTypeLabels, insightTypeValues } from "@/lib/labels";

/**
 * Key Insights grouped by type, each with links back to its sources
 * (spec §8.2–§8.4, §22).
 */
export default function InsightsSection({
  competition,
}: {
  competition: Competition;
}) {
  const groups = insightTypeValues
    .map((type) => ({
      type,
      label: insightTypeLabels[type],
      insights: competition.insights.filter((i) => i.type === type),
    }))
    .filter((g) => g.insights.length > 0);

  return (
    <Section
      id="insights"
      title="Key Insights"
      description="Distilled from discussions and top solutions. Every insight links to its sources."
    >
      {groups.length === 0 ? (
        <p className="text-sm text-muted">No insights yet.</p>
      ) : (
        <div className="space-y-8">
          {groups.map((group) => (
            <div key={group.type}>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-muted">
                {group.label}
              </h3>
              <ul className="mt-3 space-y-3">
                {group.insights.map((insight) => (
                  <li
                    key={insight.id}
                    className="rounded-lg border border-border bg-background p-4"
                  >
                    <h4 className="font-medium">{insight.title}</h4>
                    <InsightBody content={insight.content} />
                    <SourceList competition={competition} insight={insight} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </Section>
  );
}

/** Renders plain-text content; lines starting with "- " become a bullet list. */
function InsightBody({ content }: { content: string }) {
  const blocks: { kind: "p" | "ul"; lines: string[] }[] = [];
  for (const raw of content.split("\n")) {
    const line = raw.trim();
    if (!line) continue;
    const isBullet = line.startsWith("- ");
    const last = blocks[blocks.length - 1];
    if (isBullet && last?.kind === "ul") {
      last.lines.push(line.slice(2));
    } else if (isBullet) {
      blocks.push({ kind: "ul", lines: [line.slice(2)] });
    } else {
      blocks.push({ kind: "p", lines: [line] });
    }
  }

  return (
    <div className="mt-2 space-y-2 text-[15px] leading-relaxed text-foreground/85">
      {blocks.map((block, i) =>
        block.kind === "ul" ? (
          <ul key={i} className="list-disc space-y-1 pl-5">
            {block.lines.map((l) => (
              <li key={l}>{l}</li>
            ))}
          </ul>
        ) : (
          <p key={i}>{block.lines[0]}</p>
        ),
      )}
    </div>
  );
}

function SourceList({
  competition,
  insight,
}: {
  competition: Competition;
  insight: Insight;
}) {
  const sources = insight.sources
    .map((s) => resolveInsightSource(competition, s))
    .filter((s) => s !== undefined);
  if (sources.length === 0) return null;

  return (
    <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs">
      <span className="text-muted">Sources</span>
      {sources.map((s) => (
        <a
          key={`${s.type}-${s.id}`}
          href={`#${s.anchor}`}
          className="rounded bg-surface px-2 py-0.5 text-foreground/80 ring-1 ring-border hover:text-accent-strong"
        >
          {s.title}
        </a>
      ))}
    </div>
  );
}

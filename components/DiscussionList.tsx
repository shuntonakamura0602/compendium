import type { Discussion } from "@/types/competition";
import ExternalLink from "@/components/ExternalLink";
import Section from "@/components/Section";
import { sourceAnchorId } from "@/lib/competitions";
import { formatDate, formatNumber } from "@/lib/format";

/** Important discussions ranked by votes (spec §8.1). */
export default function DiscussionList({
  discussions,
}: {
  discussions: Discussion[];
}) {
  const sorted = [...discussions].sort((a, b) => b.votes - a.votes);

  return (
    <Section
      id="discussions"
      title="Important Discussions"
      description="The threads worth reading first, ranked by votes."
    >
      {sorted.length === 0 ? (
        <p className="text-sm text-muted">No discussions yet.</p>
      ) : (
        <ol className="divide-y divide-border rounded-lg border border-border">
          {sorted.map((d, index) => (
            <li
              key={d.id}
              id={sourceAnchorId("discussion", d.id)}
              className="flex gap-4 p-4 scroll-mt-28"
            >
              <span className="w-6 shrink-0 pt-0.5 text-right text-sm tabular-nums text-muted">
                {index + 1}
              </span>
              <div className="min-w-0 flex-1">
                <h3 className="font-medium leading-snug">
                  <ExternalLink kind="discussion" href={d.url} className="text-foreground">
                    {d.title}
                  </ExternalLink>
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-foreground/80">
                  {d.summary}
                </p>
                <p className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted">
                  <span className="font-medium text-foreground/80">
                    ▲ {formatNumber(d.votes)}
                  </span>
                  {d.commentCount !== undefined && (
                    <span>{formatNumber(d.commentCount)} comments</span>
                  )}
                  <span>{d.author}</span>
                  {d.createdAt && <span>{formatDate(d.createdAt)}</span>}
                </p>
              </div>
            </li>
          ))}
        </ol>
      )}
    </Section>
  );
}

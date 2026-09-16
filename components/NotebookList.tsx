import type { Notebook } from "@/types/competition";
import ExternalLink from "@/components/ExternalLink";
import Section from "@/components/Section";
import { sourceAnchorId } from "@/lib/competitions";
import { formatNumber } from "@/lib/format";
import { notebookCategoryLabels, notebookCategoryValues } from "@/lib/labels";

/** Recommended notebooks grouped by category (spec §10). */
export default function NotebookList({ notebooks }: { notebooks: Notebook[] }) {
  const groups = notebookCategoryValues
    .map((category) => ({
      category,
      label: notebookCategoryLabels[category],
      notebooks: notebooks
        .filter((n) => n.category === category)
        .sort((a, b) => b.votes - a.votes),
    }))
    .filter((g) => g.notebooks.length > 0);

  return (
    <Section
      id="notebooks"
      title="Recommended Notebooks"
      description="Useful public notebooks, grouped by what they are good for."
    >
      {groups.length === 0 ? (
        <p className="text-sm text-muted">No notebooks yet.</p>
      ) : (
        <div className="space-y-6">
          {groups.map((group) => (
            <div key={group.category}>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-muted">
                {group.label}
              </h3>
              <ul className="mt-2 divide-y divide-border rounded-lg border border-border">
                {group.notebooks.map((n) => (
                  <li
                    key={n.id}
                    id={sourceAnchorId("notebook", n.id)}
                    className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 p-3 scroll-mt-28"
                  >
                    <div className="min-w-0">
                      <ExternalLink
                        kind="notebook"
                        href={n.url}
                        className="font-medium text-foreground"
                      >
                        {n.title}
                      </ExternalLink>
                      <p className="mt-0.5 flex flex-wrap gap-x-3 text-xs text-muted">
                        <span>{n.author}</span>
                        <span>▲ {formatNumber(n.votes)}</span>
                        {n.score && <span>Score {n.score}</span>}
                      </p>
                    </div>
                    {n.tags && n.tags.length > 0 && (
                      <ul className="flex flex-wrap gap-1 text-xs">
                        {n.tags.map((t) => (
                          <li
                            key={t}
                            className="rounded bg-surface px-1.5 py-0.5 text-muted ring-1 ring-border"
                          >
                            {t}
                          </li>
                        ))}
                      </ul>
                    )}
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

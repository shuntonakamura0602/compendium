import type {
  Competition,
  Insight,
  InsightSource,
  InsightType,
  NotebookCategory,
} from "@/types/competition";

/**
 * Turns a competition into a Markdown document that can be pasted into an AI
 * coding agent (spec §11, §25 MVP feature 7).
 *
 * Kept free of runtime imports (types only) so it stays a pure function that
 * can run anywhere — tests, scripts, or a future API route.
 */

export interface AgentContextOptions {
  /** Absolute origin used for the "source" line, e.g. https://compendium.dev */
  siteUrl?: string;
}

const insightHeadings: Record<InsightType, string> = {
  cv_strategy: "CV Strategy",
  baseline: "Strong Baseline",
  pitfall: "Common Pitfalls",
  leakage: "Data Leakage",
  metric: "Metric Notes",
  dataset: "Dataset Notes",
  faq: "FAQ",
};

const notebookHeadings: Record<NotebookCategory, string> = {
  baseline: "Baseline",
  eda: "EDA",
  feature_engineering: "Feature Engineering",
  modeling: "Modeling",
  inference: "Inference",
};

const words = (s: string) => s.replaceAll("_", " ");
const num = (n: number) => new Intl.NumberFormat("en-US").format(n);

export function generateAgentContext(
  competition: Competition,
  options: AgentContextOptions = {},
): string {
  const c = competition;
  const out: string[] = [];
  const section = (title: string) => out.push(`## ${title}`, "");
  const sub = (title: string) => out.push(`### ${title}`, "");
  const para = (text: string) => out.push(text, "");
  const bullets = (items: string[]) => out.push(...items.map((i) => `- ${i}`), "");

  // Lookup for insight sources → "title (url)".
  const sourceIndex: Record<InsightSource["type"], Map<string, string>> = {
    discussion: new Map(c.discussions.map((d) => [d.id, `${d.title} (${d.url})`])),
    solution: new Map(c.solutions.map((s) => [s.id, `${s.title} (${s.url})`])),
    notebook: new Map(c.notebooks.map((n) => [n.id, `${n.title} (${n.url})`])),
  };
  const sourcesOf = (insight: Insight) =>
    insight.sources
      .map((s) => sourceIndex[s.type].get(s.id))
      .filter((s): s is string => s !== undefined);

  // --- Header ---------------------------------------------------------------
  out.push(`# ${c.title}`, "");
  para(c.description);
  bullets([
    `Kaggle: ${c.kaggleUrl}`,
    `Status: ${c.status}`,
    `Category: ${words(c.category)}`,
    `Task type: ${words(c.taskType)}`,
    `Timeline: ${c.startDate} to ${c.endDate}`,
    ...(c.teamCount !== undefined ? [`Teams: ${num(c.teamCount)}`] : []),
    ...(c.prize ? [`Prize: ${c.prize}`] : []),
    ...(c.tags.length ? [`Tags: ${c.tags.join(", ")}`] : []),
  ]);

  // --- Goal / Evaluation ----------------------------------------------------
  section("Goal");
  para(c.taskSummary);

  section("Evaluation");
  para(
    c.metricDescription ? `${c.metric} — ${c.metricDescription}` : c.metric,
  );
  if (c.submissionFormat) {
    para(`Submission format: ${c.submissionFormat}`);
  }

  // --- Dataset --------------------------------------------------------------
  section("Dataset");
  if (c.datasets.length === 0) {
    para("No dataset information available.");
  } else {
    bullets(
      c.datasets.map((f) => {
        const meta = [
          f.rows !== undefined ? `${num(f.rows)} rows` : null,
          f.columns !== undefined ? `${num(f.columns)} columns` : null,
          f.size ?? null,
        ].filter(Boolean);
        const head = meta.length ? `\`${f.name}\` (${meta.join(", ")})` : `\`${f.name}\``;
        return f.description ? `${head} — ${f.description}` : head;
      }),
    );
  }

  // --- Rules ----------------------------------------------------------------
  if (c.rules.length > 0) {
    section("Important Rules");
    bullets(c.rules);
  }

  // --- Insights -------------------------------------------------------------
  section("Key Insights");
  if (c.insights.length === 0) {
    para("No insights available yet.");
  }
  for (const type of Object.keys(insightHeadings) as InsightType[]) {
    const group = c.insights.filter((i) => i.type === type);
    if (group.length === 0) continue;
    sub(insightHeadings[type]);
    for (const insight of group) {
      out.push(`**${insight.title}**`, "");
      para(insight.content.trim());
      const sources = sourcesOf(insight);
      if (sources.length) {
        out.push("Sources:");
        bullets(sources);
      }
    }
  }

  // --- Solutions ------------------------------------------------------------
  section("Top Solutions");
  if (c.solutions.length === 0) {
    para("No solutions available yet.");
  }
  for (const s of [...c.solutions].sort((a, b) => a.rank - b.rank)) {
    sub(`#${s.rank} ${s.teamName} — ${s.title}`);
    para(`${s.summary}\n\nLink: ${s.url}`);
    const details = [
      s.models?.length ? `Models: ${s.models.join(", ")}` : null,
      s.cvStrategy ? `CV strategy: ${s.cvStrategy}` : null,
      s.featureEngineering?.length
        ? `Feature engineering: ${s.featureEngineering.join("; ")}`
        : null,
      s.ensemble ? `Ensemble: ${s.ensemble}` : null,
      s.githubUrl ? `GitHub: ${s.githubUrl}` : null,
      s.notebookUrl ? `Notebook: ${s.notebookUrl}` : null,
    ].filter((d): d is string => d !== null);
    if (details.length) bullets(details);
  }

  // --- Discussions ----------------------------------------------------------
  section("Important Discussions");
  if (c.discussions.length === 0) {
    para("No discussions available yet.");
  } else {
    bullets(
      [...c.discussions]
        .sort((a, b) => b.votes - a.votes)
        .map((d) => `${d.title} (${num(d.votes)} votes) — ${d.summary} ${d.url}`),
    );
  }

  // --- Notebooks ------------------------------------------------------------
  section("Recommended Notebooks");
  if (c.notebooks.length === 0) {
    para("No notebooks available yet.");
  } else {
    bullets(
      [...c.notebooks]
        .sort((a, b) => b.votes - a.votes)
        .map((n) => {
          const meta = [
            notebookHeadings[n.category],
            n.author,
            `${num(n.votes)} votes`,
            n.score ? `score ${n.score}` : null,
          ].filter(Boolean);
          return `${n.title} (${meta.join(", ")}) ${n.url}`;
        }),
    );
  }

  // --- Footer ---------------------------------------------------------------
  out.push("---", "");
  const page = `${options.siteUrl ?? ""}/competitions/${c.slug}`;
  out.push(`Generated by Compendium: ${page}`);

  return out.join("\n") + "\n";
}

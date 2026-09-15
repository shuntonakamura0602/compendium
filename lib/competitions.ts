import { competitions } from "@/data/competitions";
import type {
  Competition,
  CompetitionCategory,
  CompetitionStatus,
  InsightSource,
} from "@/types/competition";

/**
 * Data access layer. Pages and components should import from here rather than
 * from `data/` directly so the source can be swapped for a DB/API later.
 */

export function getAllCompetitions(): Competition[] {
  return competitions;
}

export function getCompetitionSlugs(): string[] {
  return competitions.map((c) => c.slug);
}

export function getCompetitionBySlug(slug: string): Competition | undefined {
  return competitions.find((c) => c.slug === slug);
}

export interface CompetitionFilter {
  query?: string;
  status?: CompetitionStatus;
  category?: CompetitionCategory;
}

/**
 * Case-insensitive search over title, tags, metric and task type (spec §13),
 * optionally narrowed by status and category (spec §14).
 */
export function searchCompetitions(filter: CompetitionFilter = {}): Competition[] {
  const query = filter.query?.trim().toLowerCase();

  return competitions.filter((c) => {
    if (filter.status && c.status !== filter.status) return false;
    if (filter.category && c.category !== filter.category) return false;
    if (!query) return true;

    const haystack = [
      c.title,
      c.description,
      c.metric,
      c.taskType.replaceAll("_", " "),
      c.category.replaceAll("_", " "),
      ...c.tags,
    ]
      .join(" ")
      .toLowerCase();

    return haystack.includes(query);
  });
}

export interface ResolvedSource {
  type: InsightSource["type"];
  id: string;
  /** Title of the referenced discussion / solution / notebook. */
  title: string;
  /** Kaggle URL of the referenced item. */
  url: string;
  /** In-page anchor id of the referenced item. */
  anchor: string;
}

/** Id of the DOM element that renders a discussion / solution / notebook. */
export function sourceAnchorId(
  type: InsightSource["type"],
  id: string,
): string {
  return `${type}-${id}`;
}

/**
 * Resolve an insight source to the item it points at (spec §22).
 * Returns undefined when the id does not exist in this competition.
 */
export function resolveInsightSource(
  competition: Competition,
  source: InsightSource,
): ResolvedSource | undefined {
  const base = {
    type: source.type,
    id: source.id,
    anchor: sourceAnchorId(source.type, source.id),
  };
  switch (source.type) {
    case "discussion": {
      const d = competition.discussions.find((x) => x.id === source.id);
      return d && { ...base, title: d.title, url: d.url };
    }
    case "solution": {
      const s = competition.solutions.find((x) => x.id === source.id);
      return s && { ...base, title: s.title, url: s.url };
    }
    case "notebook": {
      const n = competition.notebooks.find((x) => x.id === source.id);
      return n && { ...base, title: n.title, url: n.url };
    }
  }
}

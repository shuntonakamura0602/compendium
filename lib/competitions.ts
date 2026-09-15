import { competitions } from "@/data/competitions";
import type {
  Competition,
  CompetitionCategory,
  CompetitionStatus,
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

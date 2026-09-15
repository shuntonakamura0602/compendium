import type { Metadata } from "next";
import Link from "next/link";
import CompetitionCard from "@/components/CompetitionCard";
import CompetitionFilters from "@/components/CompetitionFilters";
import SearchForm from "@/components/SearchForm";
import { searchCompetitions, type CompetitionFilter } from "@/lib/competitions";
import { isCategory, isStatus } from "@/lib/labels";

export const metadata: Metadata = {
  title: "Competitions",
  description:
    "Browse Kaggle competitions with curated discussions, top solutions, notebooks and agent-ready context.",
};

function first(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export default async function CompetitionsPage({
  searchParams,
}: PageProps<"/competitions">) {
  const params = await searchParams;
  const status = first(params.status);
  const category = first(params.category);

  const filter: CompetitionFilter = {
    query: first(params.q)?.trim() || undefined,
    status: isStatus(status) ? status : undefined,
    category: isCategory(category) ? category : undefined,
  };

  const results = searchCompetitions(filter);

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
      <h1 className="text-2xl font-semibold tracking-tight">Competitions</h1>
      <p className="mt-1 text-sm text-muted">
        Search by name, tag, metric or task type.
      </p>

      <SearchForm defaultValue={filter.query} className="mt-6 max-w-xl" />

      <div className="mt-4">
        <CompetitionFilters filter={filter} />
      </div>

      <p className="mt-6 text-sm text-muted" aria-live="polite">
        {results.length} {results.length === 1 ? "competition" : "competitions"}
        {filter.query && (
          <>
            {" "}
            for <span className="font-medium text-foreground">“{filter.query}”</span>
          </>
        )}
      </p>

      {results.length > 0 ? (
        <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((competition) => (
            <li key={competition.slug}>
              <CompetitionCard competition={competition} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-4 rounded-lg border border-dashed border-border px-6 py-12 text-center">
          <p className="text-sm text-muted">No competitions match your search.</p>
          <Link
            href="/competitions"
            className="mt-3 inline-block text-sm font-medium text-accent-strong underline-offset-4 hover:underline"
          >
            Show all competitions
          </Link>
        </div>
      )}
    </div>
  );
}

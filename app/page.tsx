import Link from "next/link";
import SearchForm from "@/components/SearchForm";

const features = [
  {
    title: "One page per competition",
    body: "Overview, evaluation, dataset, discussions, solutions and notebooks — no more hopping between Kaggle tabs.",
  },
  {
    title: "Discussion intelligence",
    body: "Hundreds of discussions compressed into a handful of key insights: CV strategy, strong baselines, common pitfalls.",
  },
  {
    title: "Agent-ready context",
    body: "Copy a structured Markdown context and hand it to Claude Code, Codex or Cursor in one click.",
  },
] as const;

export default function Home() {
  return (
    <>
      <section className="mx-auto flex w-full max-w-3xl flex-col items-center px-4 pt-20 pb-16 text-center sm:px-6 sm:pt-28">
        <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
          Everything you need to understand a Kaggle competition.
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-muted text-balance">
          Problems, discussions, solutions, notebooks and agent-ready context —
          all in one place.
        </p>
        <SearchForm className="mt-10 max-w-xl" />
        <Link
          href="/competitions"
          className="mt-6 text-sm font-medium text-accent-strong underline-offset-4 hover:underline"
        >
          Explore Competitions →
        </Link>
      </section>

      <section className="border-t border-border bg-surface">
        <div className="mx-auto grid w-full max-w-6xl gap-6 px-4 py-14 sm:grid-cols-3 sm:px-6">
          {features.map((f) => (
            <div key={f.title}>
              <h2 className="text-base font-semibold">{f.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">{f.body}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

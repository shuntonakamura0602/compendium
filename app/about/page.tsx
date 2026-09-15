import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "Compendium collects everything about a Kaggle competition into one page for humans and AI coding agents.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <article className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight">About Compendium</h1>
      <p className="mt-4 text-lg text-muted">
        The knowledge layer for Kaggle competitions.
      </p>

      <div className="mt-10 space-y-10 text-[15px] leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold">Why</h2>
          <p className="mt-3">
            Understanding a single Kaggle competition means reading the
            overview, evaluation, rules, dataset description, hundreds of
            discussions, winning solutions, popular notebooks and the
            leaderboard — all on separate pages. Important threads get buried,
            and the same questions are asked over and over.
          </p>
          <p className="mt-3">
            Compendium brings all of that together on one page per competition
            and reorganizes it into what actually matters: key insights,
            common pitfalls, CV strategy, strong baselines and top solutions.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">For AI coding agents</h2>
          <p className="mt-3">
            A Kaggle URL alone is rarely enough context for Claude Code, Codex
            or Cursor. Every competition page includes a{" "}
            <strong>Copy Context</strong> button that produces a structured
            Markdown summary of the problem, evaluation, data, insights and
            solutions — ready to paste into your agent.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">Sources</h2>
          <p className="mt-3">
            Every insight links back to the Kaggle discussions, solutions or
            notebooks it was derived from, so you can always verify the
            original. Compendium is an independent project and is not
            affiliated with Kaggle.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">Status</h2>
          <p className="mt-3">
            This is an early MVP with a small, hand-curated set of
            competitions. Automatic import and AI-generated summaries are
            planned for later.
          </p>
          <Link
            href="/competitions"
            className="mt-4 inline-block font-medium text-accent-strong underline-offset-4 hover:underline"
          >
            Browse competitions →
          </Link>
        </section>
      </div>
    </article>
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CompetitionHeader from "@/components/CompetitionHeader";
import DatasetSection from "@/components/DatasetSection";
import EvaluationSection from "@/components/EvaluationSection";
import OverviewSection from "@/components/OverviewSection";
import SectionNav, { type SectionNavItem } from "@/components/SectionNav";
import { getCompetitionBySlug, getCompetitionSlugs } from "@/lib/competitions";

const sections: SectionNavItem[] = [
  { id: "overview", label: "Overview" },
  { id: "evaluation", label: "Evaluation" },
  { id: "dataset", label: "Dataset" },
];

export function generateStaticParams() {
  return getCompetitionSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/competitions/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const competition = getCompetitionBySlug(slug);
  if (!competition) return { title: "Competition not found" };

  return {
    title: `${competition.title} Solutions & Discussions`,
    description: `Explore the ${competition.title} Kaggle competition, including important discussions, top solutions, notebooks and AI agent-ready context.`,
  };
}

export default async function CompetitionPage({
  params,
}: PageProps<"/competitions/[slug]">) {
  const { slug } = await params;
  const competition = getCompetitionBySlug(slug);
  if (!competition) notFound();

  return (
    <div className="mx-auto w-full max-w-4xl px-4 sm:px-6">
      <CompetitionHeader competition={competition} />
      <SectionNav items={sections} />
      <OverviewSection competition={competition} />
      <EvaluationSection competition={competition} />
      <DatasetSection files={competition.datasets} />
    </div>
  );
}

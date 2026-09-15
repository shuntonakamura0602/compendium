import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AgentContext from "@/components/AgentContext";
import CompetitionHeader from "@/components/CompetitionHeader";
import DatasetSection from "@/components/DatasetSection";
import DiscussionList from "@/components/DiscussionList";
import EvaluationSection from "@/components/EvaluationSection";
import InsightsSection from "@/components/InsightsSection";
import NotebookList from "@/components/NotebookList";
import OverviewSection from "@/components/OverviewSection";
import SolutionList from "@/components/SolutionList";
import SectionNav, { type SectionNavItem } from "@/components/SectionNav";
import { getCompetitionBySlug, getCompetitionSlugs } from "@/lib/competitions";
import { generateAgentContext } from "@/lib/generateAgentContext";
import { siteUrl } from "@/lib/site";

const sections: SectionNavItem[] = [
  { id: "overview", label: "Overview" },
  { id: "evaluation", label: "Evaluation" },
  { id: "dataset", label: "Dataset" },
  { id: "insights", label: "Insights" },
  { id: "discussions", label: "Discussions" },
  { id: "solutions", label: "Solutions" },
  { id: "notebooks", label: "Notebooks" },
  { id: "agent", label: "Agent" },
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

  const title = `${competition.title} Solutions & Discussions`;
  const description = `Explore the ${competition.title} Kaggle competition, including important discussions, top solutions, notebooks and AI agent-ready context.`;
  const url = `/competitions/${competition.slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { type: "article", title, description, url },
    twitter: { title, description },
  };
}

export default async function CompetitionPage({
  params,
}: PageProps<"/competitions/[slug]">) {
  const { slug } = await params;
  const competition = getCompetitionBySlug(slug);
  if (!competition) notFound();

  const agentContext = generateAgentContext(competition, { siteUrl });

  return (
    <div className="mx-auto w-full max-w-4xl px-4 sm:px-6">
      <CompetitionHeader competition={competition} />
      <SectionNav items={sections} />
      <OverviewSection competition={competition} />
      <EvaluationSection competition={competition} />
      <DatasetSection files={competition.datasets} />
      <InsightsSection competition={competition} />
      <DiscussionList discussions={competition.discussions} />
      <SolutionList solutions={competition.solutions} />
      <NotebookList notebooks={competition.notebooks} />
      <AgentContext markdown={agentContext} />
    </div>
  );
}

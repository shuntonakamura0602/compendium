import type { Competition } from "@/types/competition";
import Section from "@/components/Section";
import { formatDate } from "@/lib/format";

export default function OverviewSection({
  competition,
}: {
  competition: Competition;
}) {
  return (
    <Section id="overview" title="Overview">
      <div className="space-y-8">
        <Block heading="Goal">
          <p className="leading-relaxed">{competition.taskSummary}</p>
        </Block>

        {competition.submissionFormat && (
          <Block heading="Submission format">
            <p className="leading-relaxed">{competition.submissionFormat}</p>
          </Block>
        )}

        <Block heading="Timeline">
          <dl className="grid max-w-md grid-cols-2 gap-4">
            <div>
              <dt className="text-xs text-muted">Start</dt>
              <dd className="mt-0.5">{formatDate(competition.startDate)}</dd>
            </div>
            <div>
              <dt className="text-xs text-muted">Deadline</dt>
              <dd className="mt-0.5">
                {competition.endDate
                  ? formatDate(competition.endDate)
                  : "None (rolling leaderboard)"}
              </dd>
            </div>
          </dl>
        </Block>

        {competition.rules.length > 0 && (
          <Block heading="Rules">
            <ul className="list-disc space-y-1.5 pl-5 leading-relaxed">
              {competition.rules.map((rule) => (
                <li key={rule}>{rule}</li>
              ))}
            </ul>
          </Block>
        )}
      </div>
    </Section>
  );
}

function Block({
  heading,
  children,
}: {
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-muted">{heading}</h3>
      <div className="mt-2 text-[15px]">{children}</div>
    </div>
  );
}

import { ImageResponse } from "next/og";
import { getCompetitionBySlug, getCompetitionSlugs } from "@/lib/competitions";
import { categoryLabels } from "@/lib/labels";
import { siteName } from "@/lib/site";

export const alt = "Competition overview on Compendium";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return getCompetitionSlugs().map((slug) => ({ slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const c = getCompetitionBySlug(slug);
  const title = c?.title ?? "Competition";
  const description = c?.description ?? "";
  const facts = c
    ? [categoryLabels[c.category], c.metric, c.teamCount ? `${c.teamCount.toLocaleString("en-US")} teams` : null].filter(Boolean)
    : [];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "#ffffff",
          color: "#171717",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 30, color: "#6b7280" }}>
          <svg viewBox="0 0 64 64" width="32" height="32">
            <rect width="64" height="64" rx="14" fill="#20beff" />
            <path
              d="M43.5 21.5A15.5 15.5 0 1 0 43.5 42.5"
              fill="none"
              stroke="#ffffff"
              strokeWidth="8"
              strokeLinecap="round"
            />
          </svg>
          {siteName}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 66, fontWeight: 600, lineHeight: 1.1, letterSpacing: -1 }}>
            {title}
          </div>
          <div style={{ marginTop: 28, fontSize: 32, color: "#6b7280", lineHeight: 1.3 }}>
            {description}
          </div>
        </div>
        <div style={{ display: "flex", gap: 16, fontSize: 26 }}>
          {facts.map((f) => (
            <div
              key={f}
              style={{
                padding: "8px 18px",
                borderRadius: 999,
                border: "2px solid #e5e7eb",
                background: "#fafafa",
              }}
            >
              {f}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}

import type { MetadataRoute } from "next";
import { getAllCompetitions } from "@/lib/competitions";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: siteUrl, changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/competitions`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${siteUrl}/about`, changeFrequency: "monthly", priority: 0.5 },
  ];

  const competitionPages: MetadataRoute.Sitemap = getAllCompetitions().map(
    (c) => ({
      url: `${siteUrl}/competitions/${c.slug}`,
      changeFrequency: c.status === "active" ? "weekly" : "monthly",
      priority: 0.8,
    }),
  );

  return [...staticPages, ...competitionPages];
}

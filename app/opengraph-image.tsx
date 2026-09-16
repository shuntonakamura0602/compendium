import { ImageResponse } from "next/og";
import { siteName } from "@/lib/site";

export const alt = "Compendium — the knowledge layer for Kaggle competitions";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 96,
          background: "#ffffff",
          color: "#171717",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <svg viewBox="0 0 64 64" width="44" height="44">
            <rect width="64" height="64" rx="14" fill="#20beff" />
            <path
              d="M43.5 21.5A15.5 15.5 0 1 0 43.5 42.5"
              fill="none"
              stroke="#ffffff"
              strokeWidth="8"
              strokeLinecap="round"
            />
          </svg>
          <div style={{ fontSize: 44, fontWeight: 600 }}>{siteName}</div>
        </div>
        <div
          style={{
            marginTop: 48,
            fontSize: 64,
            fontWeight: 600,
            lineHeight: 1.1,
            letterSpacing: -1,
          }}
        >
          Everything you need to understand a Kaggle competition.
        </div>
        <div style={{ marginTop: 32, fontSize: 30, color: "#6b7280" }}>
          Discussions, solutions, notebooks and agent-ready context — in one place.
        </div>
      </div>
    ),
    size,
  );
}

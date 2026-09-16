import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Same mark as app/icon.svg, rendered opaque for iOS home screens. */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#20beff",
        }}
      >
        <svg viewBox="0 0 64 64" width="180" height="180">
          <path
            d="M43.5 21.5A15.5 15.5 0 1 0 43.5 42.5"
            fill="none"
            stroke="#ffffff"
            strokeWidth="8"
            strokeLinecap="round"
          />
        </svg>
      </div>
    ),
    size,
  );
}

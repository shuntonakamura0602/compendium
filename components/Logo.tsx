/** Compendium mark, identical to app/icon.svg so the header matches the tab icon. */
export default function Logo({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      aria-hidden
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="64" height="64" rx="14" fill="#20beff" />
      <path
        d="M43.5 21.5A15.5 15.5 0 1 0 43.5 42.5"
        fill="none"
        stroke="#ffffff"
        strokeWidth="8"
        strokeLinecap="round"
      />
    </svg>
  );
}

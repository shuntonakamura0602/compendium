import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-4 py-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>Compendium — the knowledge layer for Kaggle competitions.</p>
        <p>
          Not affiliated with Kaggle.{" "}
          <Link href="/about" className="underline-offset-2 hover:underline">
            About
          </Link>
        </p>
      </div>
    </footer>
  );
}

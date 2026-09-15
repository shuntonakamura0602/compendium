import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center px-4 py-24 text-center sm:px-6">
      <p className="text-sm font-medium text-muted">404</p>
      <h1 className="mt-2 text-2xl font-semibold tracking-tight">
        Page not found
      </h1>
      <p className="mt-3 max-w-md text-muted">
        The page you are looking for does not exist, or the competition has not
        been added to Compendium yet.
      </p>
      <Link
        href="/competitions"
        className="mt-6 text-sm font-medium text-accent-strong underline-offset-4 hover:underline"
      >
        Browse competitions →
      </Link>
    </div>
  );
}

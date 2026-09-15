/**
 * Plain GET form so search works without client-side JavaScript.
 * Submits to /competitions?q=... (spec §13, §28).
 */
export default function SearchForm({
  defaultValue = "",
  autoFocus = false,
  className = "",
}: {
  defaultValue?: string;
  autoFocus?: boolean;
  className?: string;
}) {
  return (
    <form
      action="/competitions"
      method="get"
      role="search"
      className={`flex w-full gap-2 ${className}`}
    >
      <label htmlFor="competition-search" className="sr-only">
        Search competitions
      </label>
      <input
        id="competition-search"
        name="q"
        type="search"
        defaultValue={defaultValue}
        autoFocus={autoFocus}
        placeholder="Search competitions..."
        className="h-11 w-full rounded-md border border-border bg-background px-3 text-base shadow-xs outline-none placeholder:text-muted focus:border-accent focus:ring-2 focus:ring-accent/30"
      />
      <button
        type="submit"
        className="h-11 shrink-0 rounded-md bg-foreground px-4 text-sm font-medium text-background transition-colors hover:bg-foreground/85"
      >
        Search
      </button>
    </form>
  );
}

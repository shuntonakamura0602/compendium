export interface SectionNavItem {
  id: string;
  label: string;
}

/** In-page anchor navigation for the competition detail page (spec §24). */
export default function SectionNav({ items }: { items: SectionNavItem[] }) {
  return (
    <nav
      aria-label="Page sections"
      className="sticky top-0 z-10 -mx-4 border-b border-border bg-background/95 backdrop-blur sm:-mx-6"
    >
      <ul className="flex gap-1 overflow-x-auto px-4 py-2 text-sm sm:px-6">
        {items.map((item) => (
          <li key={item.id} className="shrink-0">
            <a
              href={`#${item.id}`}
              className="rounded-md px-3 py-1.5 text-muted transition-colors hover:bg-surface hover:text-foreground"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

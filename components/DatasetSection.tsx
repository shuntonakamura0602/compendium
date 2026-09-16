import type { DatasetFile } from "@/types/competition";
import Section from "@/components/Section";
import { formatNumber } from "@/lib/format";

function fileMeta(f: DatasetFile): string[] {
  return [
    f.rows !== undefined ? `${formatNumber(f.rows)} rows` : null,
    f.columns !== undefined ? `${formatNumber(f.columns)} columns` : null,
    f.size ?? null,
  ].filter((m): m is string => m !== null);
}

export default function DatasetSection({
  files,
  note,
}: {
  files: DatasetFile[];
  note?: string;
}) {
  return (
    <Section
      id="dataset"
      title="Dataset"
      description={`${files.length} ${files.length === 1 ? "file" : "files"}`}
    >
      {note && (
        <p className="mb-4 rounded-md border border-border bg-surface px-4 py-3 text-sm text-foreground/80">
          {note}
        </p>
      )}
      {files.length === 0 ? (
        <p className="text-sm text-muted">No dataset information yet.</p>
      ) : (
        <>
          {/* Mobile: stacked cards */}
          <ul className="divide-y divide-border rounded-lg border border-border sm:hidden">
            {files.map((f) => (
              <li key={f.name} className="p-4">
                <p className="font-mono text-[13px] font-medium break-all">
                  {f.name}
                </p>
                {fileMeta(f).length > 0 && (
                  <p className="mt-1 text-xs text-muted">
                    {fileMeta(f).join(" · ")}
                  </p>
                )}
                {f.description && (
                  <p className="mt-2 text-sm text-foreground/80">
                    {f.description}
                  </p>
                )}
              </li>
            ))}
          </ul>

          {/* Desktop: table */}
          <div className="hidden overflow-x-auto rounded-lg border border-border sm:block">
            <table className="w-full min-w-[640px] text-sm">
              <thead className="bg-surface text-left text-xs uppercase tracking-wide text-muted">
                <tr>
                  <th className="px-4 py-2.5 font-medium">File</th>
                  <th className="px-4 py-2.5 text-right font-medium">Rows</th>
                  <th className="px-4 py-2.5 text-right font-medium">Columns</th>
                  <th className="px-4 py-2.5 text-right font-medium">Size</th>
                  <th className="px-4 py-2.5 font-medium">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {files.map((f) => (
                  <tr key={f.name} className="align-top">
                    <td className="px-4 py-3 font-mono text-[13px] whitespace-nowrap">
                      {f.name}
                    </td>
                    <td className="px-4 py-3 text-right tabular-nums whitespace-nowrap">
                      {f.rows !== undefined ? formatNumber(f.rows) : "—"}
                    </td>
                    <td className="px-4 py-3 text-right tabular-nums whitespace-nowrap">
                      {f.columns !== undefined ? formatNumber(f.columns) : "—"}
                    </td>
                    <td className="px-4 py-3 text-right whitespace-nowrap text-muted">
                      {f.size ?? "—"}
                    </td>
                    <td className="px-4 py-3 text-muted">{f.description ?? ""}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </Section>
  );
}

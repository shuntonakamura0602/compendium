import type { DatasetFile } from "@/types/competition";
import Section from "@/components/Section";
import { formatNumber } from "@/lib/format";

export default function DatasetSection({ files }: { files: DatasetFile[] }) {
  return (
    <Section
      id="dataset"
      title="Dataset"
      description={`${files.length} ${files.length === 1 ? "file" : "files"}`}
    >
      {files.length === 0 ? (
        <p className="text-sm text-muted">No dataset information yet.</p>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-border">
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
      )}
    </Section>
  );
}

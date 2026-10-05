interface DataTableProps {
  columns: string[];
  rows: (string | number)[][];
  caption?: string;
  summary?: string;
  open?: boolean;
}

// Plain table behind a disclosure, so every chart has its numbers one tap away.
export default function DataTable({ columns, rows, caption, summary = "View as table", open = false }: DataTableProps) {
  return (
    <details open={open} className="not-prose group mt-6 rounded-xl border border-gray-100 bg-white">
      <summary className="cursor-pointer select-none px-4 py-3 font-plex text-sm font-semibold text-cobalt">{summary}</summary>
      <div className="overflow-x-auto px-4 pb-4 max-h-[28rem] overflow-y-auto">
        <table className="w-full font-plex text-sm text-left border-collapse">
          {caption && <caption className="text-left text-xs text-muted pb-2">{caption}</caption>}
          <thead className="sticky top-0 bg-white">
            <tr>
              {columns.map((c, i) => (
                <th key={c} className={`py-2 pr-4 font-semibold text-navy border-b border-gray-200 whitespace-nowrap ${i ? "text-right" : ""}`}>{c}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, ri) => (
              <tr key={ri} className="border-b border-gray-50">
                {r.map((c, i) => (
                  <td key={i} className={`py-1.5 pr-4 ${i ? "text-right tabular-nums text-navy" : "text-navy"}`}>
                    {typeof c === "number" ? c.toLocaleString("en-IN") : c}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </details>
  );
}

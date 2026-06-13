interface Source {
  name: string;
  url: string;
  description?: string;
}

interface DataSourcesProps {
  sources: Source[];
}

export default function DataSources({ sources }: DataSourcesProps) {
  return (
    <aside className="mt-12 border-t border-gray-100 pt-8">
      <h3 className="font-plex text-xs font-semibold uppercase tracking-widest text-muted mb-4">
        Data Sources
      </h3>
      <ul className="flex flex-col gap-3">
        {sources.map((source, i) => (
          <li key={i} className="flex flex-col gap-0.5">
            <a
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-plex text-sm font-medium text-cobalt hover:text-navy underline underline-offset-2 transition-colors"
            >
              {source.name}
            </a>
            {source.description && (
              <span className="font-plex text-xs text-muted">{source.description}</span>
            )}
          </li>
        ))}
      </ul>
    </aside>
  );
}

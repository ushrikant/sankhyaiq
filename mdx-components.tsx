import type { MDXComponents } from "mdx/types";
import type { ReactNode } from "react";
import Figure from "@/components/charts/Figure";
import BarChart from "@/components/charts/BarChart";
import LineChart from "@/components/charts/LineChart";
import ColumnChart from "@/components/charts/ColumnChart";
import Pyramid from "@/components/charts/Pyramid";
import Scatter from "@/components/charts/Scatter";
import StatGrid from "@/components/charts/StatGrid";
import ShapeCompare from "@/components/charts/ShapeCompare";
import DataViz from "@/components/DataViz";

function Callout({ children }: { children: ReactNode }) {
  return (
    <aside className="my-8 rounded-r-xl border-l-4 border-cobalt bg-blue-50/60 px-5 py-4 font-plex text-base text-navy leading-relaxed">
      {children}
    </aside>
  );
}

// Story typography and the chart components available inside every .mdx story.
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h2: ({ children }) => <h2 className="font-playfair text-2xl font-bold text-navy mt-12 mb-4">{children}</h2>,
    h3: ({ children }) => <h3 className="font-playfair text-xl font-semibold text-navy mt-8 mb-3">{children}</h3>,
    p: ({ children }) => <p className="font-plex text-base sm:text-[17px] text-navy/85 leading-relaxed mb-5">{children}</p>,
    ul: ({ children }) => <ul className="font-plex text-base text-navy/85 leading-relaxed mb-5 list-disc pl-6 space-y-1.5">{children}</ul>,
    ol: ({ children }) => <ol className="font-plex text-base text-navy/85 leading-relaxed mb-5 list-decimal pl-6 space-y-1.5">{children}</ol>,
    a: ({ children, href }) => (
      <a href={href} className="text-cobalt underline underline-offset-2 hover:text-navy" target={href?.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
        {children}
      </a>
    ),
    strong: ({ children }) => <strong className="font-semibold text-navy">{children}</strong>,
    table: ({ children }) => (
      <div className="not-prose my-8 overflow-x-auto">
        <table className="w-full font-plex text-sm border-collapse">{children}</table>
      </div>
    ),
    th: ({ children }) => <th className="text-left font-semibold text-navy border-b border-gray-200 py-2 pr-4">{children}</th>,
    td: ({ children }) => <td className="text-navy/85 border-b border-gray-100 py-2 pr-4">{children}</td>,
    Figure,
    BarChart,
    LineChart,
    ColumnChart,
    Pyramid,
    Scatter,
    StatGrid,
    ShapeCompare,
    DataViz,
    Callout,
    ...components,
  };
}

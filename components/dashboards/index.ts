import type { ComponentType } from "react";
import WorldRankings from "./WorldRankings";

// slug -> dashboard body. Each body renders KPIs, the main chart and the table.
export const dashboardBodies: Record<string, ComponentType> = {
  "world-rankings": WorldRankings,
};

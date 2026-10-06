import type { ComponentType } from "react";
import IndiaBirds from "./IndiaBirds";
import RepoRate from "./RepoRate";
import DigitalPublicInfrastructure from "./DigitalPublicInfrastructure";
import EvTracker from "./EvTracker";
import WorldRankings from "./WorldRankings";
import JobsPulse from "./JobsPulse";
import MonsoonTracker from "./MonsoonTracker";
import InflationTracker from "./InflationTracker";
import TelecomPulse from "./TelecomPulse";
import IsroLaunches from "./IsroLaunches";
import WildlifeCounts from "./WildlifeCounts";

// slug -> dashboard body. Each body renders KPIs, the main chart and the table.
export const dashboardBodies: Record<string, ComponentType> = {
  "india-birds": IndiaBirds,
  "repo-rate": RepoRate,
  "digital-public-infrastructure": DigitalPublicInfrastructure,
  "ev-tracker": EvTracker,
  "world-rankings": WorldRankings,
  "jobs-pulse": JobsPulse,
  "monsoon-tracker": MonsoonTracker,
  "inflation-tracker": InflationTracker,
  "telecom-pulse": TelecomPulse,
  "isro-launches": IsroLaunches,
  "wildlife-counts": WildlifeCounts,
};

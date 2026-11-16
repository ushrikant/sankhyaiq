import { Gallery, PlateList, type PlateSpec } from "./kit";
import { getSectionBySlug } from "@/lib/sections";
import * as worldAndIndia from "./world-and-india";
import * as peopleAndSociety from "./people-and-society";
import * as mapsAndGeography from "./maps-and-geography";
import * as animalsAndNature from "./animals-and-nature";
import * as autoAndEv from "./auto-and-ev";
import * as moneyAndEconomy from "./money-and-economy";
import * as aiAndTechnology from "./ai-and-technology";
import * as scienceAndSpace from "./science-and-space";

type SectionSet = { meta: { title: string; intro: string }; plates: PlateSpec[] };

const SETS: Record<string, SectionSet> = {
  "world-and-india": worldAndIndia,
  "people-and-society": peopleAndSociety,
  "maps-and-geography": mapsAndGeography,
  "animals-and-nature": animalsAndNature,
  "auto-and-ev": autoAndEv,
  "money-and-economy": moneyAndEconomy,
  "ai-and-technology": aiAndTechnology,
  "science-and-space": scienceAndSpace,
};

export function hasInfographics(slug: string) {
  return slug in SETS;
}

// The ten-plate gallery shown at the top of a section page.
export default function SectionInfographics({ slug }: { slug: string }) {
  const set = SETS[slug];
  const section = getSectionBySlug(slug);
  if (!set || !section) return null;
  return (
    <Gallery
      id="infographics"
      accent={section.accentColor}
      kicker="Ten infographics"
      title={set.meta.title}
      intro={set.meta.intro}
      index={set.plates.map((p, i) => ({ n: i + 1, label: p.topic }))}
    >
      <PlateList id="infographics" plates={set.plates} />
    </Gallery>
  );
}

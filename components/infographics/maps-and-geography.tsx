import { Bars, Columns, Facts, Ladder, Stack, Waffle, type PlateSpec } from "./kit";

export const meta = {
  title: "The shape of the land, in ten charts",
  intro: "Peaks, rivers, borders and oceans measured on one scale so their sizes can be compared.",
};

// Earth's layers as circles drawn to scale. Radii in km from the centre.
const LAYERS = [
  { label: "Crust", thick: "5 to 70 km", r: 6371, fill: "var(--deep)" },
  { label: "Mantle", thick: "2,855 km", r: 6336, fill: "var(--soft)" },
  { label: "Outer core", thick: "2,260 km", r: 3481, fill: "var(--mid)" },
  { label: "Inner core", thick: "1,221 km radius", r: 1221, fill: "var(--hl)" },
];

export const plates: PlateSpec[] = [
  {
    topic: "Summits",
    wide: true,
    title: "The highest point on every continent",
    deck: "Height above sea level of the tallest mountain on each of the seven continents.",
    takeaway: "Kangchenjunga, India's highest peak at 8,586 m, is taller than the highest point of every continent other than Asia.",
    source: "Survey Department of Nepal and China, 2020 (Everest); Encyclopaedia Britannica.",
    visual: (
      <Columns
        shape="peak"
        height={210}
        unit="Metres above sea level"
        items={[
          { label: "Everest", sub: "Asia", value: 8849, display: "8,849", hl: true },
          { label: "Aconcagua", sub: "S. America", value: 6961, display: "6,961" },
          { label: "Denali", sub: "N. America", value: 6190, display: "6,190" },
          { label: "Kilimanjaro", sub: "Africa", value: 5895, display: "5,895" },
          { label: "Elbrus", sub: "Europe", value: 5642, display: "5,642" },
          { label: "Vinson", sub: "Antarctica", value: 4892, display: "4,892" },
          { label: "Kosciuszko", sub: "Australia", value: 2228, display: "2,228" },
        ]}
      />
    ),
  },
  {
    topic: "Rivers of India",
    title: "The Ganga runs 2,525 km",
    deck: "Length of India's longest rivers that flow mainly inside the country.",
    takeaway: "The Indus and the Brahmaputra are longer, but most of their course lies outside India.",
    source: "Central Water Commission; India Water Resources Information System.",
    visual: (
      <Bars
        unit="Kilometres"
        rows={[
          { label: "Ganga", value: 2525, display: "2,525", hl: true },
          { label: "Godavari", value: 1465, display: "1,465" },
          { label: "Krishna", value: 1400, display: "1,400" },
          { label: "Yamuna", value: 1376, display: "1,376" },
          { label: "Narmada", value: 1312, display: "1,312" },
          { label: "Mahanadi", value: 851, display: "851" },
          { label: "Kaveri", value: 800, display: "800" },
        ]}
      />
    ),
  },
  {
    topic: "States",
    title: "Three states make up 29% of India",
    deck: "Area of the six largest states and the smallest one.",
    takeaway: "Rajasthan, Madhya Pradesh and Maharashtra cover 9.58 lakh sq km between them. Goa would fit into Rajasthan 92 times.",
    source: "Census of India 2011, administrative atlas.",
    visual: (
      <Bars
        unit="Thousand sq km"
        rows={[
          { label: "Rajasthan", value: 342.2, display: "342" },
          { label: "Madhya Pradesh", value: 308.3, display: "308" },
          { label: "Maharashtra", value: 307.7, display: "308" },
          { label: "Uttar Pradesh", value: 240.9, display: "241" },
          { label: "Gujarat", value: 196.0, display: "196" },
          { label: "Karnataka", value: 191.8, display: "192" },
          { label: "Goa", sub: "smallest state", value: 3.7, display: "3.7", hl: true },
        ]}
      />
    ),
  },
  {
    topic: "Borders",
    title: "India's longest border is with Bangladesh",
    deck: "Length of India's land border with each of its seven neighbours.",
    takeaway: "India's land borders add up to 15,107 km. The Bangladesh border alone is longer than the distance from Srinagar to Kanyakumari.",
    source: "Ministry of Home Affairs, Department of Border Management.",
    visual: (
      <Bars
        unit="Kilometres"
        rows={[
          { label: "Bangladesh", value: 4096.7, display: "4,097", hl: true },
          { label: "China", value: 3488, display: "3,488" },
          { label: "Pakistan", value: 3323, display: "3,323" },
          { label: "Nepal", value: 1751, display: "1,751" },
          { label: "Myanmar", value: 1643, display: "1,643" },
          { label: "Bhutan", value: 699, display: "699" },
          { label: "Afghanistan", value: 106, display: "106" },
        ]}
      />
    ),
  },
  {
    topic: "Ocean depth",
    title: "Everest would drown in the Mariana Trench",
    deck: "Depth below the sea surface, drawn to scale.",
    takeaway: "Challenger Deep is 10,935 m down. Put Everest in it and the summit would sit 2,086 m under water.",
    source: "NOAA; Guinness World Records (scuba dive).",
    visual: (
      <Ladder
        top="min"
        min={0}
        max={11000}
        height={380}
        capTop="Sea surface"
        items={[
          { label: "Sunlight fades out", value: 200, display: "200 m" },
          { label: "Deepest scuba dive", value: 332, display: "332 m" },
          { label: "No light at all below this", value: 1000, display: "1,000 m" },
          { label: "Average depth of the ocean", value: 3682, display: "3,682 m" },
          { label: "Height of Everest, turned upside down", value: 8849, display: "8,849 m", dim: true },
          { label: "Challenger Deep, Mariana Trench", value: 10935, display: "10,935 m", hl: true },
        ]}
      />
    ),
  },
  {
    topic: "Water",
    wide: true,
    title: "Only 2.5% of Earth's water is fresh",
    deck: "The grid is all the water on Earth. The bar below it splits the fresh part.",
    takeaway: "Most fresh water is frozen or underground. Rivers, lakes and everything else at the surface hold about 1% of it.",
    source: "US Geological Survey, Water Science School, after Shiklomanov (1993).",
    visual: (
      <div className="flex flex-col gap-6">
        <Waffle
          size={200}
          parts={[
            { label: "Salt water", value: 97.5, display: "97.5%", shade: "soft" },
            { label: "Fresh water", value: 2.5, display: "2.5%", shade: "hl" },
          ]}
        />
        <div>
          <p className="font-plex text-[13px] font-semibold text-navy mb-2">Where the fresh water is</p>
          <Stack
            parts={[
              { label: "Glaciers and ice caps", value: 68.7, display: "68.7%", shade: "strong" },
              { label: "Groundwater", value: 30.1, display: "30.1%", shade: "mid" },
              { label: "Surface and other", value: 1.2, display: "1.2%", shade: "hl" },
            ]}
          />
        </div>
      </div>
    ),
  },
  {
    topic: "Continents",
    title: "Asia is 30% of the world's land",
    deck: "The bar is all the land on Earth, split by continent.",
    takeaway: "Asia is larger than North America and South America put together.",
    source: "Encyclopaedia Britannica.",
    visual: (
      <Stack
        height={36}
        parts={[
          { label: "Asia", value: 44.6, display: "44.6" },
          { label: "Africa", value: 30.4, display: "30.4" },
          { label: "North America", value: 24.7, display: "24.7" },
          { label: "South America", value: 17.8, display: "17.8" },
          { label: "Antarctica", value: 14.2, display: "14.2" },
          { label: "Europe", value: 10.2, display: "10.2" },
          { label: "Australia and Oceania", value: 8.5, display: "8.5" },
        ]}
      />
    ),
  },
  {
    topic: "Rivers of the world",
    title: "The Ganga is less than half the length of the Nile",
    deck: "The five longest rivers in the world, with the Ganga for scale.",
    takeaway: "The Nile and the Amazon are about 250 km apart in length. Some surveys put the Amazon first.",
    source: "Encyclopaedia Britannica; Central Water Commission.",
    visual: (
      <Bars
        unit="Kilometres"
        rows={[
          { label: "Nile", value: 6650, display: "6,650" },
          { label: "Amazon", value: 6400, display: "6,400" },
          { label: "Yangtze", value: 6300, display: "6,300" },
          { label: "Mississippi and Missouri", value: 6275, display: "6,275" },
          { label: "Yenisei", value: 5539, display: "5,539" },
          { label: "Ganga", value: 2525, display: "2,525", hl: true },
        ]}
      />
    ),
  },
  {
    topic: "Extent",
    title: "3,214 km from north to south",
    deck: "India measured from end to end on the mainland.",
    takeaway: "India is 281 km longer than it is wide. The Tropic of Cancer crosses eight states.",
    source: "Survey of India; Ministry of Home Affairs.",
    visual: (
      <div className="flex flex-col gap-5">
        <div className="relative mx-auto w-full max-w-[300px] aspect-square">
          <span className="absolute left-1/2 top-[6%] bottom-[6%] w-[4px] -translate-x-1/2 rounded-full bg-[var(--strong)]" />
          <span className="absolute top-1/2 h-[4px] -translate-y-1/2 rounded-full bg-[var(--hl)]" style={{ left: "9.85%", right: "9.85%" }} />
          <span className="absolute left-1/2 top-0 -translate-x-1/2 font-plex text-xs font-semibold text-navy">North</span>
          <span className="absolute left-1/2 bottom-0 -translate-x-1/2 font-plex text-xs font-semibold text-navy">South</span>
          <span className="absolute left-0 top-1/2 -translate-y-[160%] font-plex text-xs font-semibold text-navy">West</span>
          <span className="absolute right-0 top-1/2 -translate-y-[160%] font-plex text-xs font-semibold text-navy">East</span>
          <span className="absolute left-[54%] top-[20%] font-playfair text-xl font-bold text-navy leading-none">3,214 km</span>
          <span className="absolute left-[54%] top-[60%] font-playfair text-xl font-bold text-navy leading-none">2,933 km</span>
        </div>
        <Facts
          cols={3}
          items={[
            { value: "15,107 km", label: "land border" },
            { value: "11,099 km", label: "coastline" },
            { value: "82.5° E", label: "standard meridian", hl: true },
          ]}
        />
      </div>
    ),
  },
  {
    topic: "Inside the Earth",
    title: "The deepest hole ever drilled got 0.2% of the way down",
    deck: "Earth's layers drawn to scale. It is 6,371 km to the centre.",
    takeaway: "The Kola borehole in Russia reached 12.26 km in 1989. It never left the crust.",
    source: "US Geological Survey.",
    visual: (
      <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
        <svg viewBox="0 0 200 200" className="w-full max-w-[210px] h-auto shrink-0" role="img" aria-label="Earth's layers to scale">
          {LAYERS.map((l) => (
            <circle key={l.label} cx={100} cy={100} r={(l.r / 6371) * 98} fill={l.fill} />
          ))}
        </svg>
        <ul className="flex flex-col gap-2 flex-1 min-w-[150px]">
          {LAYERS.map((l) => (
            <li key={l.label} className="flex items-baseline gap-2 font-plex text-[13px] text-navy">
              <span className="w-2.5 h-2.5 rounded-full shrink-0 translate-y-[1px]" style={{ background: l.fill }} />
              <span className="flex-1">{l.label}</span>
              <b className="font-semibold tabular-nums">{l.thick}</b>
            </li>
          ))}
        </ul>
      </div>
    ),
  },
];

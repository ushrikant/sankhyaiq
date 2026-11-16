import { Bars, Big, Columns, Facts, Shapes, Stack, Waffle, type PlateSpec } from "./kit";

export const meta = {
  title: "India in the world, in ten charts",
  intro: "Where India stands on people, money, land and culture when it is placed next to everyone else.",
};

export const plates: PlateSpec[] = [
  {
    topic: "People and land",
    wide: true,
    title: "One in six people on one fortieth of the land",
    deck: "Each grid is the whole world. The amber squares are India's share.",
    takeaway: "India holds 17.8% of the world's people on 2.4% of its land area. That makes it about seven times as crowded as the world average.",
    source: "UN World Population Prospects 2024 (1,451 million of 8,162 million people); Government of India, India at a Glance.",
    visual: (
      <div className="grid grid-cols-2 gap-5">
        <div>
          <Waffle legend={false} size={230} parts={[{ label: "India", value: 17.8, shade: "hl" }, { label: "Rest of the world", value: 82.2, shade: "soft" }]} />
          <p className="font-playfair text-3xl font-bold text-navy mt-3 leading-none">17.8%</p>
          <p className="font-plex text-[13px] text-muted mt-1">of the world&rsquo;s people</p>
        </div>
        <div>
          <Waffle legend={false} size={230} parts={[{ label: "India", value: 2.4, shade: "hl" }, { label: "Rest of the world", value: 97.6, shade: "soft" }]} />
          <p className="font-playfair text-3xl font-bold text-navy mt-3 leading-none">2.4%</p>
          <p className="font-plex text-[13px] text-muted mt-1">of the world&rsquo;s land</p>
        </div>
      </div>
    ),
  },
  {
    topic: "Economy",
    title: "India is the sixth largest economy",
    deck: "Gross domestic product in 2025 at market exchange rates.",
    takeaway: "Four economies sit between 3.9 and 5.1 trillion dollars. The IMF projects India will move up to fourth place in 2027.",
    source: "IMF World Economic Outlook database, October 2026.",
    visual: (
      <Bars
        unit="Trillion US dollars, 2025"
        rows={[
          { label: "United States", value: 30.86, display: "30.86" },
          { label: "China", value: 19.63, display: "19.63" },
          { label: "Germany", value: 5.12, display: "5.12" },
          { label: "Japan", value: 4.45, display: "4.45" },
          { label: "United Kingdom", value: 4.01, display: "4.01" },
          { label: "India", value: 3.91, display: "3.91", hl: true },
          { label: "France", value: 3.38, display: "3.38" },
        ]}
      />
    ),
  },
  {
    topic: "Elections",
    title: "The largest election ever held",
    deck: "The 2024 Lok Sabha election ran for 44 days in seven phases.",
    takeaway: "Two in three registered electors voted. No election anywhere has counted more votes.",
    source: "Election Commission of India, statistical reports on the 2024 general election.",
    visual: (
      <div className="flex flex-col gap-4">
        <Big value="64.64 crore" caption="votes cast in 2024" />
        <Stack
          cols={1}
          height={22}
          parts={[
            { label: "Voted", value: 64.64, display: "64.64 crore", shade: "hl" },
            { label: "Registered but did not vote", value: 33.33, display: "33.33 crore", shade: "soft" },
          ]}
        />
        <Facts
          cols={3}
          items={[
            { value: "97.97 crore", label: "registered electors" },
            { value: "10.52 lakh", label: "polling stations" },
            { value: "543", label: "seats" },
          ]}
        />
      </div>
    ),
  },
  {
    topic: "Time zones",
    title: "One clock for 2,933 km",
    deck: "Number of time zones in use, counting overseas territories.",
    takeaway: "India runs on one time zone set at 82.5 degrees east. The sun rises almost two hours earlier in Arunachal Pradesh than in Gujarat.",
    source: "timeanddate.com; Survey of India.",
    visual: (
      <Columns
        height={150}
        items={[
          { label: "France", value: 12 },
          { label: "Russia", value: 11 },
          { label: "USA", value: 11 },
          { label: "Australia", value: 9 },
          { label: "UK", value: 9 },
          { label: "China", value: 1 },
          { label: "India", value: 1, hl: true },
        ]}
      />
    ),
  },
  {
    topic: "Age",
    title: "Half of India is under 30",
    deck: "Median age in 2026. Half the population is younger than this and half is older.",
    takeaway: "India is 11 years younger than China and 21 years younger than Japan at the median.",
    source: "UN World Population Prospects 2024, medium projection for 1 July 2026.",
    visual: (
      <Bars
        unit="Years"
        rows={[
          { label: "Japan", value: 50.2, display: "50.2" },
          { label: "Germany", value: 45.7, display: "45.7" },
          { label: "China", value: 40.6, display: "40.6" },
          { label: "United States", value: 38.7, display: "38.7" },
          { label: "Brazil", value: 35.3, display: "35.3" },
          { label: "World", value: 31.1, display: "31.1", dim: true },
          { label: "India", value: 29.2, display: "29.2", hl: true },
          { label: "Pakistan", value: 20.8, display: "20.8" },
          { label: "Nigeria", value: 18.3, display: "18.3" },
        ]}
      />
    ),
  },
  {
    topic: "Milk",
    wide: true,
    title: "A quarter of the world's milk comes from India",
    deck: "India has been the largest milk producer since 1998.",
    takeaway: "Output rose from 146 million tonnes in FY2015 to 247.87 million tonnes in FY2025. Each Indian now has 485 grams a day available.",
    source: "Basic Animal Husbandry Statistics 2025, Department of Animal Husbandry and Dairying.",
    visual: (
      <div className="flex flex-col gap-5">
        <Waffle
          parts={[
            { label: "India", value: 25, display: "About 25%", shade: "hl" },
            { label: "Rest of the world", value: 75, display: "About 75%", shade: "soft" },
          ]}
        />
        <Facts
          cols={3}
          items={[
            { value: "247.87 mt", label: "milk produced, FY2025" },
            { value: "485 g", label: "per person per day in India", hl: true },
            { value: "322 g", label: "per person per day, world" },
          ]}
        />
      </div>
    ),
  },
  {
    topic: "Remittances",
    title: "No country receives more money from abroad",
    deck: "Money sent home by people working overseas, 2024 estimate.",
    takeaway: "India received more than Mexico and China put together.",
    source: "World Bank, Migration and Development estimates, December 2024.",
    visual: (
      <Bars
        unit="Billion US dollars"
        rows={[
          { label: "India", value: 129, display: "129", hl: true },
          { label: "Mexico", value: 68, display: "68" },
          { label: "China", value: 48, display: "48" },
          { label: "Philippines", value: 40, display: "40" },
          { label: "Pakistan", value: 33, display: "33" },
        ]}
      />
    ),
  },
  {
    topic: "Heritage",
    title: "India has 45 World Heritage Sites",
    deck: "Sites on the UNESCO World Heritage List, September 2026.",
    takeaway: "India ranks sixth. Italy and China are the only countries with more than 60 sites.",
    source: "UNESCO World Heritage List, as of September 2026.",
    visual: (
      <Columns
        height={150}
        items={[
          { label: "Italy", value: 62 },
          { label: "China", value: 61 },
          { label: "France", value: 56 },
          { label: "Germany", value: 55 },
          { label: "Spain", value: 50 },
          { label: "India", value: 45, hl: true },
        ]}
      />
    ),
  },
  {
    topic: "Languages",
    title: "Hindi is the world's third most spoken language",
    deck: "People who speak each language as a first or second language.",
    takeaway: "Three of the ten most spoken languages come from South Asia: Hindi, Bengali and Urdu.",
    source: "Ethnologue, 2026 edition.",
    visual: (
      <Bars
        unit="Million speakers. Rank in brackets."
        rows={[
          { label: "English (1)", value: 1490, display: "1,490" },
          { label: "Mandarin Chinese (2)", value: 1183, display: "1,183" },
          { label: "Hindi (3)", value: 611, display: "611", hl: true },
          { label: "Spanish (4)", value: 559, display: "559" },
          { label: "Standard Arabic (5)", value: 335, display: "335" },
          { label: "Bengali (7)", value: 274, display: "274", hl: true },
          { label: "Urdu (10)", value: 246, display: "246", hl: true },
        ]}
      />
    ),
  },
  {
    topic: "Area",
    title: "Seventh by area, first by population",
    deck: "Each square is drawn to scale by total area.",
    takeaway: "India is about a third the size of China or the United States and has more people than either.",
    source: "UN Statistics Division, Demographic Yearbook.",
    visual: (
      <Shapes
        shape="square"
        maxPx={118}
        unit="Million sq km"
        items={[
          { label: "Russia", value: 17.1, display: "17.10" },
          { label: "Canada", value: 9.98, display: "9.98" },
          { label: "USA", value: 9.83, display: "9.83" },
          { label: "China", value: 9.6, display: "9.60" },
          { label: "Brazil", value: 8.51, display: "8.51" },
          { label: "Australia", value: 7.69, display: "7.69" },
          { label: "India", value: 3.29, display: "3.29", hl: true },
        ]}
      />
    ),
  },
];

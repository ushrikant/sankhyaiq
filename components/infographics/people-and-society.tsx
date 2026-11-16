import { Bars, Big, Columns, Dots, Facts, Rings, Trend, type PlateSpec } from "./kit";

export const meta = {
  title: "How India lives, in ten charts",
  intro: "Census counts and national surveys on how many we are, how we learn, where we live and what our homes have.",
};

export const plates: PlateSpec[] = [
  {
    topic: "Population",
    wide: true,
    title: "India's population grew five times in 110 years",
    deck: "People counted at each census from 1901 to 2011.",
    takeaway: "1921 is the only census that recorded a fall, after the influenza pandemic of 1918. The 2011 count is the latest completed census.",
    source: "Census of India, 1901 to 2011.",
    visual: (
      <Columns
        height={190}
        unit="Crore people"
        items={[
          { label: "1901", value: 23.8 },
          { label: "1911", value: 25.2, hideValue: true },
          { label: "1921", value: 25.1, hl: true },
          { label: "1931", value: 27.9, hideValue: true },
          { label: "1941", value: 31.9, hideValue: true },
          { label: "1951", value: 36.1 },
          { label: "1961", value: 43.9, hideValue: true },
          { label: "1971", value: 54.8 },
          { label: "1981", value: 68.3, hideValue: true },
          { label: "1991", value: 84.6 },
          { label: "2001", value: 102.9, hideValue: true },
          { label: "2011", value: 121.1 },
        ]}
      />
    ),
  },
  {
    topic: "Literacy",
    title: "Literacy rose from 18% to 73% in 60 years",
    deck: "Share of people aged seven and above who can read and write. Before 1981 the rate was for ages five and above.",
    takeaway: "In 2011, 80.9% of men and 64.6% of women were literate.",
    source: "Census of India, 1951 to 2011.",
    visual: (
      <Trend
        unit="Per cent literate"
        points={[
          { x: "1951", y: 18.3, display: "18.3%" },
          { x: "1961", y: 28.3, show: false },
          { x: "1971", y: 34.5, show: false },
          { x: "1981", y: 43.6, display: "43.6%" },
          { x: "1991", y: 52.2, show: false },
          { x: "2001", y: 64.8, show: false },
          { x: "2011", y: 73.0, display: "73.0%", hl: true },
        ]}
      />
    ),
  },
  {
    topic: "Family size",
    title: "Two children per woman",
    deck: "Total fertility rate in each round of the National Family Health Survey.",
    takeaway: "At 2.0, India's fertility rate is below the replacement level of 2.1.",
    source: "National Family Health Survey, rounds 1 to 5. Years show when each survey ended.",
    visual: (
      <Columns
        height={150}
        unit="Children per woman"
        items={[
          { label: "1993", sub: "NFHS-1", value: 3.4, display: "3.4" },
          { label: "1999", sub: "NFHS-2", value: 2.9, display: "2.9" },
          { label: "2006", sub: "NFHS-3", value: 2.7, display: "2.7" },
          { label: "2016", sub: "NFHS-4", value: 2.2, display: "2.2" },
          { label: "2021", sub: "NFHS-5", value: 2.0, display: "2.0", hl: true },
        ]}
      />
    ),
  },
  {
    topic: "Cities",
    title: "Three in ten Indians live in towns and cities",
    deck: "Of every ten people counted in 2011, three were urban.",
    takeaway: "The urban share was 17.3% in 1951. It took 60 years to reach 31.2%.",
    source: "Census of India, 1951 and 2011.",
    visual: (
      <div className="flex flex-col gap-5">
        <Dots total={10} filled={3} label="Each figure is one tenth of India's population in 2011." />
        <Facts
          cols={3}
          items={[
            { value: "37.7 crore", label: "urban residents, 2011", hl: true },
            { value: "83.3 crore", label: "rural residents, 2011" },
            { value: "7,935", label: "towns" },
          ]}
        />
      </div>
    ),
  },
  {
    topic: "Languages",
    title: "Ten languages cover nine in ten Indians",
    deck: "Share of people by mother tongue, grouped as in the 2011 Census.",
    takeaway: "The Census groups more than 50 mother tongues under Hindi. India has 22 scheduled languages.",
    source: "Census of India 2011, language tables.",
    visual: (
      <Bars
        unit="Per cent of population"
        rows={[
          { label: "Hindi", value: 43.63, display: "43.6%", hl: true },
          { label: "Bengali", value: 8.03, display: "8.0%" },
          { label: "Marathi", value: 6.86, display: "6.9%" },
          { label: "Telugu", value: 6.7, display: "6.7%" },
          { label: "Tamil", value: 5.7, display: "5.7%" },
          { label: "Gujarati", value: 4.58, display: "4.6%" },
          { label: "Urdu", value: 4.19, display: "4.2%" },
          { label: "Kannada", value: 3.61, display: "3.6%" },
          { label: "Odia", value: 3.1, display: "3.1%" },
          { label: "Malayalam", value: 2.88, display: "2.9%" },
        ]}
      />
    ),
  },
  {
    topic: "Homes",
    wide: true,
    title: "Electricity reaches 97% of homes. Clean cooking fuel reaches 59%.",
    deck: "What Indian households had when surveyors visited between 2019 and 2021.",
    takeaway: "Power and drinking water are close to universal. Four in ten households still cook mainly with wood, dung or coal.",
    source: "National Family Health Survey 5 (2019 to 2021), India fact sheet.",
    visual: (
      <Rings
        items={[
          { label: "Electricity", value: 96.8, display: "96.8%" },
          { label: "Improved drinking water source", value: 95.9, display: "95.9%" },
          { label: "Improved sanitation", value: 70.2, display: "70.2%" },
          { label: "Clean cooking fuel", value: 58.6, display: "58.6%", hl: true },
        ]}
      />
    ),
  },
  {
    topic: "Poverty",
    title: "24.8 crore people left poverty in nine years",
    deck: "Share of people who are poor on health, education and living standards together.",
    takeaway: "Multidimensional poverty fell from 29.2% in FY2014 to 11.3% in FY2023, by NITI Aayog's estimate.",
    source: "NITI Aayog, Multidimensional Poverty in India since 2005-06 (2024). FY2014 and FY2023 are projected estimates.",
    visual: (
      <Columns
        height={160}
        unit="Per cent of population in multidimensional poverty"
        items={[
          { label: "FY2006", value: 55.3, display: "55.3%" },
          { label: "FY2014", value: 29.2, display: "29.2%" },
          { label: "FY2016", value: 24.9, display: "24.9%" },
          { label: "FY2021", value: 15.0, display: "15.0%" },
          { label: "FY2023", value: 11.3, display: "11.3%", hl: true },
        ]}
      />
    ),
  },
  {
    topic: "Sex ratio",
    title: "943 women for every 1,000 men",
    deck: "Women per 1,000 men at each census since independence.",
    takeaway: "The ratio fell to 927 in 1991 and rose in the two censuses after that. Kerala had the highest in 2011 at 1,084.",
    source: "Census of India, 1951 to 2011.",
    visual: (
      <Trend
        yMin={900}
        yMax={960}
        unit="Women per 1,000 men. The scale starts at 900."
        points={[
          { x: "1951", y: 946, display: "946" },
          { x: "1961", y: 941, show: false },
          { x: "1971", y: 930, show: false },
          { x: "1981", y: 934, show: false },
          { x: "1991", y: 927, display: "927", hl: true },
          { x: "2001", y: 933, show: false },
          { x: "2011", y: 943, display: "943" },
        ]}
      />
    ),
  },
  {
    topic: "States",
    title: "Uttar Pradesh had more people than Brazil",
    deck: "The most populous states at the 2011 Census.",
    takeaway: "Uttar Pradesh counted 19.98 crore people in 2011. Brazil's census a year earlier counted 19.07 crore.",
    source: "Census of India 2011; IBGE, Brazil Census 2010.",
    visual: (
      <Bars
        unit="Crore people, 2011"
        rows={[
          { label: "Uttar Pradesh", value: 19.98, display: "19.98", hl: true },
          { label: "Maharashtra", value: 11.24, display: "11.24" },
          { label: "Bihar", value: 10.41, display: "10.41" },
          { label: "West Bengal", value: 9.13, display: "9.13" },
          { label: "Andhra Pradesh", sub: "before bifurcation", value: 8.46, display: "8.46" },
          { label: "Madhya Pradesh", value: 7.26, display: "7.26" },
          { label: "Tamil Nadu", value: 7.21, display: "7.21" },
          { label: "Rajasthan", value: 6.85, display: "6.85" },
        ]}
      />
    ),
  },
  {
    topic: "Census",
    title: "The 2011 Census in six numbers",
    deck: "The last full count of India, taken in February 2011.",
    takeaway: "The average household had 4.9 people. Seven in ten Indians lived in a village.",
    source: "Census of India 2011.",
    visual: (
      <div className="flex flex-col gap-4">
        <Big value="121.1 crore" caption="people counted" />
        <Facts
          items={[
            { value: "24.67 crore", label: "households" },
            { value: "4.9", label: "people per household", hl: true },
            { value: "6.41 lakh", label: "villages" },
            { value: "7,935", label: "towns" },
            { value: "640", label: "districts" },
            { value: "68.8%", label: "lived in rural areas" },
          ]}
        />
      </div>
    ),
  },
];

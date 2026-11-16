import { Bars, Columns, Facts, Ladder, Shapes, type PlateSpec } from "./kit";

export const meta = {
  title: "Life on Earth, in ten charts",
  intro: "What living things weigh, how far they dive, how high they fly and how much of it all India holds.",
};

export const plates: PlateSpec[] = [
  {
    topic: "Weight of life",
    wide: true,
    title: "Plants outweigh animals 225 to 1",
    deck: "The mass of every living thing on Earth, measured by the carbon it holds.",
    takeaway: "All animals together hold 2 gigatonnes of carbon. Among mammals, livestock weigh 0.1 Gt, humans 0.06 Gt and every wild mammal combined 0.007 Gt.",
    source: "Bar-On, Phillips and Milo (2018), The biomass distribution on Earth, PNAS.",
    visual: (
      <Bars
        unit="Gigatonnes of carbon"
        rows={[
          { label: "Plants", value: 450, display: "450" },
          { label: "Bacteria", value: 70, display: "70" },
          { label: "Fungi", value: 12, display: "12" },
          { label: "Archaea", value: 7, display: "7" },
          { label: "Protists", value: 4, display: "4" },
          { label: "Animals", value: 2, display: "2", hl: true },
          { label: "Viruses", value: 0.2, display: "0.2" },
        ]}
      />
    ),
  },
  {
    topic: "Wingspans",
    title: "An albatross has wings 3.5 metres across",
    deck: "Typical wingspan of large and familiar birds, tip to tip.",
    takeaway: "The sarus crane of north India is the tallest flying bird. A house sparrow would fit across an albatross about 14 times.",
    source: "Cornell Lab of Ornithology, Birds of the World. Typical adult values.",
    visual: (
      <Bars
        unit="Metres, approximate"
        rows={[
          { label: "Wandering albatross", value: 3.5, display: "3.5" },
          { label: "Andean condor", value: 3.2, display: "3.2" },
          { label: "Sarus crane", value: 2.4, display: "2.4", hl: true },
          { label: "Indian peafowl", value: 1.5, display: "1.5" },
          { label: "House crow", value: 0.8, display: "0.8" },
          { label: "House sparrow", value: 0.24, display: "0.24" },
        ]}
      />
    ),
  },
  {
    topic: "Tall trees",
    title: "The tallest tree is 43 metres taller than Qutub Minar",
    deck: "The three tallest known trees next to two Indian landmarks.",
    takeaway: "Hyperion, a coast redwood in California, stands 115.9 m. The Statue of Unity is still 66 m taller.",
    source: "Guinness World Records; Archaeological Survey of India; Government of Gujarat.",
    visual: (
      <Columns
        height={200}
        unit="Metres"
        items={[
          { label: "Statue of Unity", value: 182, display: "182", dim: true },
          { label: "Hyperion", sub: "coast redwood", value: 115.9, display: "115.9", hl: true },
          { label: "Menara", sub: "yellow meranti", value: 100.8, display: "100.8" },
          { label: "Centurion", sub: "mountain ash", value: 100.5, display: "100.5" },
          { label: "Qutub Minar", value: 72.5, display: "72.5", dim: true },
        ]}
      />
    ),
  },
  {
    topic: "Giants",
    title: "One blue whale weighs as much as 25 elephants",
    deck: "Typical adult weight. Each circle's area matches the animal's weight.",
    takeaway: "A blue whale weighs about 150 tonnes. The largest land animal, the African elephant, weighs about 6.",
    source: "NOAA Fisheries; IUCN species accounts. Typical adult values.",
    visual: (
      <Shapes
        maxPx={150}
        unit="Tonnes, approximate"
        items={[
          { label: "Blue whale", value: 150, display: "150", hl: true },
          { label: "African elephant", value: 6, display: "6" },
          { label: "Asian elephant", value: 4, display: "4" },
          { label: "White rhino", value: 2.3, display: "2.3" },
          { label: "Hippopotamus", value: 1.5, display: "1.5" },
          { label: "Gaur", value: 1, display: "1" },
        ]}
      />
    ),
  },
  {
    topic: "Brains",
    title: "The biggest brain belongs to the sperm whale",
    deck: "Average adult brain weight.",
    takeaway: "A human brain is about 2% of body weight. A sperm whale's brain is about 0.02% of its body.",
    source: "Rounded averages from comparative studies, including Roth and Dicke (2005), Trends in Cognitive Sciences.",
    visual: (
      <Bars
        unit="Kilograms, approximate"
        rows={[
          { label: "Sperm whale", value: 7.8, display: "7.8" },
          { label: "African elephant", value: 4.8, display: "4.8" },
          { label: "Bottlenose dolphin", value: 1.6, display: "1.6" },
          { label: "Human", value: 1.35, display: "1.35", hl: true },
          { label: "Chimpanzee", value: 0.4, display: "0.4" },
          { label: "Dog", value: 0.07, display: "0.07" },
        ]}
      />
    ),
  },
  {
    topic: "Deep divers",
    wide: true,
    title: "A beaked whale dives nearly 3 km on one breath",
    deck: "The deepest recorded dive of each air-breathing animal, drawn to scale.",
    takeaway: "One Cuvier's beaked whale tagged off California reached 2,992 m. Another stayed under for more than two hours.",
    source: "Schorr and others (2014), PLOS ONE; Guinness World Records; AIDA International.",
    visual: (
      <Ladder
        top="min"
        min={0}
        max={3100}
        height={340}
        capTop="Sea surface"
        items={[
          { label: "Human freediver", value: 214, display: "214 m" },
          { label: "Emperor penguin", value: 564, display: "564 m" },
          { label: "Leatherback turtle", value: 1280, display: "1,280 m" },
          { label: "Sperm whale", value: 2250, display: "2,250 m" },
          { label: "Southern elephant seal", value: 2388, display: "2,388 m" },
          { label: "Cuvier's beaked whale", value: 2992, display: "2,992 m", hl: true },
        ]}
      />
    ),
  },
  {
    topic: "Eggs",
    title: "A kiwi lays an egg one fifth of its own weight",
    deck: "Bird eggs drawn to scale by length.",
    takeaway: "An ostrich egg weighs about 1.4 kg, as much as 24 hen's eggs. The smallest bird egg weighs under half a gram.",
    source: "Guinness World Records; New Zealand Department of Conservation; San Diego Zoo.",
    visual: (
      <Shapes
        shape="egg"
        by="width"
        maxPx={170}
        unit="Length in centimetres, approximate"
        items={[
          { label: "Ostrich", value: 15, display: "15 cm" },
          { label: "Kiwi", value: 12, display: "12 cm", hl: true },
          { label: "Hen", value: 5.7, display: "5.7 cm" },
          { label: "Vervain hummingbird", value: 1, display: "1 cm" },
        ]}
      />
    ),
  },
  {
    topic: "High fliers",
    title: "A vulture has flown higher than Everest",
    deck: "The highest recorded flight of each bird, with Everest for scale.",
    takeaway: "A Rüppell's vulture struck an aircraft at 11,300 m over West Africa in 1973. Bar-headed geese cross the Himalaya twice a year.",
    source: "Laybourne (1974), Wilson Bulletin; Hawkes and others (2013), Proceedings of the Royal Society B.",
    visual: (
      <Ladder
        top="max"
        min={0}
        max={12000}
        height={290}
        capBottom="Sea level"
        items={[
          { label: "Rüppell's vulture", value: 11300, display: "11,300 m", hl: true },
          { label: "Common crane", value: 10000, display: "10,000 m" },
          { label: "Summit of Everest", value: 8849, display: "8,849 m", dim: true },
          { label: "Bar-headed goose", value: 7290, display: "7,290 m" },
          { label: "Mallard", value: 6400, display: "6,400 m" },
        ]}
      />
    ),
  },
  {
    topic: "Species",
    title: "Two in three known animal species are insects",
    deck: "Animal species that scientists have described and named so far.",
    takeaway: "About 10.5 lakh insect species have been named. Mammals, the group we belong to, number about 6,700.",
    source: "IUCN Red List, summary statistics table 1a. Rounded.",
    visual: (
      <Bars
        unit="Described species, rounded"
        rows={[
          { label: "Insects", value: 1054000, display: "10,54,000", hl: true },
          { label: "Arachnids", value: 111000, display: "1,11,000" },
          { label: "Molluscs", value: 87000, display: "87,000" },
          { label: "Crustaceans", value: 80000, display: "80,000" },
          { label: "Fishes", value: 37000, display: "37,000" },
          { label: "Reptiles", value: 12000, display: "12,000" },
          { label: "Birds", value: 11000, display: "11,000" },
          { label: "Amphibians", value: 8700, display: "8,700" },
          { label: "Mammals", value: 6700, display: "6,700" },
        ]}
      />
    ),
  },
  {
    topic: "India's share",
    title: "2.4% of the world's land, 7 to 8% of its recorded species",
    deck: "India is one of 17 megadiverse countries.",
    takeaway: "Four of the world's 36 biodiversity hotspots reach into India: the Himalaya, the Western Ghats, Indo-Burma and Sundaland.",
    source: "Ministry of Environment, Forest and Climate Change; Zoological Survey of India, Fauna of India Checklist (2024).",
    visual: (
      <div className="flex flex-col gap-5">
        <Bars
          max={10}
          rows={[
            { label: "Share of world land", value: 2.4, display: "2.4%" },
            { label: "Share of recorded species", value: 7.5, display: "7 to 8%", hl: true },
          ]}
        />
        <Facts
          cols={3}
          items={[
            { value: "1,04,561", label: "animal species recorded in India" },
            { value: "4 of 36", label: "global biodiversity hotspots", hl: true },
            { value: "17", label: "megadiverse countries, India among them" },
          ]}
        />
      </div>
    ),
  },
];

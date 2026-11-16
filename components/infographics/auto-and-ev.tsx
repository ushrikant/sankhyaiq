import { Bars, Columns, Facts, Legend, Timeline, Waffle, type PlateSpec } from "./kit";

export const meta = {
  title: "India on wheels, in ten charts",
  intro: "What India buys, what the world is switching to and the physics that sets the limits.",
};

// Typical stopping distances on a dry road: thinking distance plus braking distance, in metres.
const STOPPING = [
  { kmh: 32, think: 6, brake: 6 },
  { kmh: 48, think: 9, brake: 14 },
  { kmh: 64, think: 12, brake: 24 },
  { kmh: 80, think: 15, brake: 38 },
  { kmh: 97, think: 18, brake: 55 },
  { kmh: 113, think: 21, brake: 75 },
];

export const plates: PlateSpec[] = [
  {
    topic: "Sales",
    wide: true,
    title: "India bought 2.83 crore vehicles in a year",
    deck: "Each square is 1% of the vehicles sold in India in FY2026.",
    takeaway: "Every segment set a record. Two-wheelers were 77 of every 100 vehicles sold.",
    source: "Society of Indian Automobile Manufacturers (SIAM), domestic sales for FY2026.",
    visual: (
      <Waffle
        size={220}
        parts={[
          { label: "Two-wheelers", value: 217.06, display: "217.06 lakh", shade: "strong" },
          { label: "Passenger vehicles", value: 46.43, display: "46.43 lakh", shade: "hl" },
          { label: "Commercial vehicles", value: 10.8, display: "10.80 lakh", shade: "deep" },
          { label: "Three-wheelers", value: 8.36, display: "8.36 lakh", shade: "soft" },
        ]}
      />
    ),
  },
  {
    topic: "Exports",
    title: "66.5 lakh vehicles left India in a year",
    deck: "Vehicles exported from India in FY2026, by type.",
    takeaway: "Exports rose 24% from 53.6 lakh in FY2025. Nearly four in five exported vehicles were two-wheelers.",
    source: "SIAM, exports for FY2026.",
    visual: (
      <Bars
        unit="Lakh units"
        rows={[
          { label: "Two-wheelers", value: 51.8, display: "51.8", hl: true },
          { label: "Passenger vehicles", value: 9.0, display: "9.0" },
          { label: "Three-wheelers", value: 4.6, display: "4.6" },
        ]}
      />
    ),
  },
  {
    topic: "Electric cars",
    title: "One in four new cars sold in 2025 was electric",
    deck: "Electric cars sold worldwide each year, including plug-in hybrids.",
    takeaway: "Sales have grown by about 3.5 million cars every year since 2021. The IEA expects 23 million in 2026.",
    source: "International Energy Agency, Global EV Outlook 2026 and earlier editions. Rounded.",
    visual: (
      <Columns
        height={170}
        unit="Million cars"
        items={[
          { label: "2020", value: 3, display: "3" },
          { label: "2021", value: 6.5, display: "6.5" },
          { label: "2022", value: 10, display: "10" },
          { label: "2023", value: 14, display: "14" },
          { label: "2024", value: 17, display: "17" },
          { label: "2025", value: 20.5, display: "20+", hl: true },
        ]}
      />
    ),
  },
  {
    topic: "Batteries",
    title: "Battery packs cost 93% less than in 2010",
    deck: "Average price of a lithium-ion battery pack, in 2025 dollars.",
    takeaway: "Packs for electric cars averaged 99 dollars per kWh in 2025. Prices were lowest in China at 84 dollars.",
    source: "BloombergNEF, Lithium-Ion Battery Price Survey 2025.",
    visual: (
      <div className="flex flex-col gap-5">
        <Columns
          height={140}
          unit="US dollars per kilowatt-hour, all uses"
          items={[
            { label: "2010", value: 1474, display: "$1,474" },
            { label: "2024", value: 115, display: "$115" },
            { label: "2025", value: 108, display: "$108", hl: true },
          ]}
        />
        <Facts
          cols={3}
          items={[
            { value: "$99", label: "electric car packs, 2025" },
            { value: "$84", label: "average in China", hl: true },
            { value: "$70", label: "grid storage packs" },
          ]}
        />
      </div>
    ),
  },
  {
    topic: "India's EVs",
    title: "Nine in ten electric vehicles in India have two or three wheels",
    deck: "Electric vehicles registered in India in 2025, by type.",
    takeaway: "India registered 23.57 lakh electric vehicles in 2025. Cars and SUVs were 8% of them.",
    source: "Vahan dashboard, Ministry of Road Transport and Highways, calendar year 2025.",
    visual: (
      <Bars
        unit="Vehicles registered"
        rows={[
          { label: "Two-wheelers", value: 1342338, display: "13,42,338", hl: true },
          { label: "Three-wheelers", value: 801387, display: "8,01,387", hl: true },
          { label: "Cars and SUVs", value: 189473, display: "1,89,473" },
          { label: "Goods carriers", value: 11737, display: "11,737" },
          { label: "Buses", value: 4958, display: "4,958" },
        ]}
      />
    ),
  },
  {
    topic: "Efficiency",
    wide: true,
    title: "An electric car turns over 77% of its energy into motion",
    deck: "Share of the energy put into the car that reaches the wheels.",
    takeaway: "A petrol car loses most of its fuel energy as heat. An electric motor has far less to lose.",
    source: "US Department of Energy, fueleconomy.gov.",
    visual: (
      <div className="flex flex-col gap-5">
        <Legend items={[{ label: "Reaches the wheels", shade: "hl" }, { label: "Range for petrol cars", shade: "mid" }, { label: "Lost", shade: "pale" }]} />
        <div>
          <p className="font-plex text-[13px] text-navy mb-1.5">Electric car <b className="font-semibold">over 77%</b></p>
          <div className="flex h-7 rounded-[5px] overflow-hidden bg-[var(--pale)]"><span className="bg-[var(--hl)]" style={{ width: "77%" }} /></div>
        </div>
        <div>
          <p className="font-plex text-[13px] text-navy mb-1.5">Petrol car <b className="font-semibold">12% to 30%</b></p>
          <div className="flex h-7 rounded-[5px] overflow-hidden bg-[var(--pale)]">
            <span className="bg-[var(--hl)]" style={{ width: "12%" }} />
            <span className="bg-[var(--mid)]" style={{ width: "18%" }} />
          </div>
        </div>
      </div>
    ),
  },
  {
    topic: "Energy by weight",
    title: "A kilo of petrol holds 50 times the energy of a kilo of battery",
    deck: "Energy stored in one kilogram of each fuel.",
    takeaway: "This is why battery packs are heavy. An electric motor wastes far less energy, which narrows the gap on the road.",
    source: "US Department of Energy, Alternative Fuels Data Center; International Energy Agency.",
    visual: (
      <Bars
        unit="Kilowatt-hours per kilogram, approximate"
        rows={[
          { label: "Hydrogen", value: 33.3, display: "33.3" },
          { label: "CNG", value: 13.9, display: "13.9" },
          { label: "Petrol", value: 12.9, display: "12.9" },
          { label: "Diesel", value: 12.7, display: "12.7" },
          { label: "Lithium-ion cell", value: 0.25, display: "0.25", hl: true },
        ]}
      />
    ),
  },
  {
    topic: "Speed",
    title: "From Vande Bharat to the sound barrier",
    deck: "Fastest speeds on land, with India's fastest train for scale.",
    takeaway: "Vande Bharat trains carry passengers at up to 160 km/h. ThrustSSC is the only car to have broken the sound barrier.",
    source: "FIA; Guinness World Records; JR Central; SNCF; Indian Railways.",
    visual: (
      <Bars
        unit="Kilometres per hour"
        rows={[
          { label: "ThrustSSC", sub: "land speed record, 1997", value: 1228, display: "1,228" },
          { label: "SCMaglev", sub: "train record, 2015", value: 603, display: "603" },
          { label: "TGV", sub: "wheeled train record, 2007", value: 575, display: "575" },
          { label: "Shinkansen", sub: "service speed", value: 320, display: "320" },
          { label: "Vande Bharat", sub: "service speed", value: 160, display: "160", hl: true },
        ]}
      />
    ),
  },
  {
    topic: "Stopping",
    title: "At 113 km/h a car needs 96 metres to stop",
    deck: "Distance covered while the driver reacts and while the car brakes.",
    takeaway: "Speed goes up 3.5 times from the first row to the last. Stopping distance goes up 8 times.",
    source: "The Highway Code, UK Department for Transport. Typical car on a dry road.",
    visual: (
      <div>
        <Legend items={[{ label: "Thinking distance", shade: "soft" }, { label: "Braking distance", shade: "strong" }]} />
        <ul className="flex flex-col gap-2.5">
          {STOPPING.map((s) => (
            <li key={s.kmh} className="grid grid-cols-[72px_1fr_auto] items-center gap-3" title={`${s.kmh} km/h: ${s.think + s.brake} m`}>
              <p className="font-plex text-[13px] text-navy tabular-nums">{s.kmh} km/h</p>
              <div className="flex gap-[2px] h-3.5">
                <span className="rounded-l-[2px] bg-[var(--soft)]" style={{ width: `${(s.think / 96) * 100}%` }} />
                <span className="rounded-r-[4px] bg-[var(--strong)]" style={{ width: `${(s.brake / 96) * 100}%` }} />
              </div>
              <p className="font-plex text-[13px] font-semibold text-navy tabular-nums min-w-[44px] text-right">{s.think + s.brake} m</p>
            </li>
          ))}
        </ul>
      </div>
    ),
  },
  {
    topic: "Timeline",
    title: "From the first car to the Nexon EV",
    deck: "Dates that shaped the car in India.",
    takeaway: "The Maruti 800 arrived 97 years after the first car. India's first electric car followed 18 years later.",
    source: "Company histories: Mercedes-Benz, Ford, Hindustan Motors, Maruti Suzuki, Tata Motors, Mahindra Reva.",
    visual: (
      <Timeline
        items={[
          { when: "1886", title: "Karl Benz patents the first petrol car" },
          { when: "1908", title: "Ford starts building the Model T" },
          { when: "1957", title: "Hindustan Ambassador goes into production" },
          { when: "1983", title: "Maruti 800 is launched", hl: true },
          { when: "1998", title: "Tata Indica, the first car designed in India" },
          { when: "2001", title: "Reva, India's first electric car", hl: true },
          { when: "2008", title: "Tata Nano is unveiled" },
          { when: "2020", title: "Tata Nexon EV goes on sale" },
        ]}
      />
    ),
  },
];

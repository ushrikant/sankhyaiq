import { Bars, Columns, Facts, Legend, Timeline, Waffle, type PlateSpec } from "./kit";

export const meta = {
  title: "Where the money goes, in ten charts",
  intro: "The Union Budget, the stock market, the rupee and the arithmetic of saving, each on one plate.",
};

// Rs 10,000 invested every month at an assumed 12% a year, compounded monthly. Values in Rs lakh.
const SIP = [
  { years: 10, invested: 12, value: 23.0, display: "Rs 23.0 lakh" },
  { years: 20, invested: 24, value: 98.9, display: "Rs 98.9 lakh" },
  { years: 30, invested: 36, value: 349.5, display: "Rs 3.49 crore" },
];

const UNITS = [
  { indian: "1 lakh", figure: "1,00,000", world: "100 thousand" },
  { indian: "10 lakh", figure: "10,00,000", world: "1 million" },
  { indian: "1 crore", figure: "1,00,00,000", world: "10 million" },
  { indian: "100 crore", figure: "1,00,00,00,000", world: "1 billion" },
  { indian: "1 lakh crore", figure: "10,00,00,00,00,000", world: "1 trillion" },
];

export const plates: PlateSpec[] = [
  {
    topic: "Budget receipts",
    wide: true,
    title: "24 paise of every budget rupee is borrowed",
    deck: "Where each rupee of the Union Budget for FY2027 comes from.",
    takeaway: "The budget is Rs 53.47 lakh crore. Taxes bring in 64 paise of each rupee and borrowing is the largest single source.",
    source: "Union Budget for FY2027, Budget at a Glance.",
    visual: (
      <Bars
        unit="Paise per rupee"
        rows={[
          { label: "Borrowings and other liabilities", value: 24, display: "24", hl: true },
          { label: "Income tax", value: 21, display: "21" },
          { label: "Corporation tax", value: 18, display: "18" },
          { label: "GST and other taxes", value: 15, display: "15" },
          { label: "Non-tax receipts", value: 10, display: "10" },
          { label: "Union excise duties", value: 6, display: "6" },
          { label: "Customs", value: 4, display: "4" },
          { label: "Non-debt capital receipts", value: 2, display: "2" },
        ]}
      />
    ),
  },
  {
    topic: "Budget spending",
    title: "Interest takes 20 paise of every rupee spent",
    deck: "Where each rupee of the Union Budget for FY2027 goes.",
    takeaway: "Transfers to states and interest on past borrowing use 42 paise before any scheme is funded.",
    source: "Union Budget for FY2027, Budget at a Glance.",
    visual: (
      <Bars
        unit="Paise per rupee"
        rows={[
          { label: "States' share of taxes", value: 22, display: "22" },
          { label: "Interest payments", value: 20, display: "20", hl: true },
          { label: "Central sector schemes", value: 17, display: "17" },
          { label: "Defence", value: 11, display: "11" },
          { label: "Pensions and other spending", value: 9, display: "9" },
          { label: "Centrally sponsored schemes", value: 8, display: "8" },
          { label: "Finance Commission transfers", value: 7, display: "7" },
          { label: "Major subsidies", value: 6, display: "6" },
        ]}
      />
    ),
  },
  {
    topic: "Sensex",
    title: "From 1,000 to 80,000 in 34 years",
    deck: "The year the BSE Sensex first touched each level.",
    takeaway: "The first 10,000 points took 27 years from the 1979 base of 100. The move from 70,000 to 80,000 took seven months.",
    source: "BSE Ltd. Levels first touched during trading.",
    visual: (
      <Timeline
        items={[
          { when: "1990", title: "1,000" },
          { when: "2006", title: "10,000" },
          { when: "2007", title: "20,000" },
          { when: "2015", title: "30,000" },
          { when: "2019", title: "40,000" },
          { when: "2021", title: "50,000 in January, 60,000 in September" },
          { when: "2023", title: "70,000" },
          { when: "2024", title: "80,000", hl: true },
        ]}
      />
    ),
  },
  {
    topic: "Rule of 72",
    title: "Divide 72 by the interest rate to see when money doubles",
    deck: "Years for a sum to double at each yearly rate of return.",
    takeaway: "The rule is a shortcut. At 8% the exact answer is 9.01 years.",
    source: "Compound interest arithmetic.",
    visual: (
      <Columns
        height={150}
        unit="Years to double"
        items={[
          { label: "4%", value: 18, display: "18" },
          { label: "6%", value: 12, display: "12" },
          { label: "8%", value: 9, display: "9", hl: true },
          { label: "9%", value: 8, display: "8" },
          { label: "12%", value: 6, display: "6" },
          { label: "18%", value: 4, display: "4" },
        ]}
      />
    ),
  },
  {
    topic: "Inflation",
    title: "At 6% inflation, Rs 1 lakh loses half its value in 12 years",
    deck: "What Rs 1 lakh kept as cash will buy in today's money.",
    takeaway: "After 30 years at 6% inflation, Rs 1 lakh buys what Rs 17,411 buys today.",
    source: "Arithmetic, assuming a constant 6% a year.",
    visual: (
      <Columns
        height={150}
        unit="Rupees, in today's purchasing power"
        items={[
          { label: "Today", value: 100000, display: "1,00,000" },
          { label: "10 years", value: 55839, display: "55,839" },
          { label: "20 years", value: 31180, display: "31,180" },
          { label: "30 years", value: 17411, display: "17,411", hl: true },
        ]}
      />
    ),
  },
  {
    topic: "Demonetisation",
    wide: true,
    title: "86% of India's cash was withdrawn in one night",
    deck: "The grid is the value of all currency in circulation on 8 November 2016.",
    takeaway: "Rs 500 and Rs 1,000 notes worth Rs 15.41 lakh crore stopped being legal tender. Rs 15.31 lakh crore of them came back to banks.",
    source: "Reserve Bank of India, Annual Report 2017-18.",
    visual: (
      <div className="flex flex-col gap-5">
        <Waffle
          parts={[
            { label: "Rs 500 and Rs 1,000 notes", value: 86, display: "86%", shade: "hl" },
            { label: "All other notes and coins", value: 14, display: "14%", shade: "soft" },
          ]}
        />
        <Facts
          cols={3}
          items={[
            { value: "15.41 lakh crore", label: "rupees withdrawn" },
            { value: "15.31 lakh crore", label: "rupees returned" },
            { value: "99.3%", label: "of the notes came back", hl: true },
          ]}
        />
      </div>
    ),
  },
  {
    topic: "Gold",
    title: "The Reserve Bank holds about 881 tonnes of gold",
    deck: "Gold held by central banks, mid 2026.",
    takeaway: "India ranks eighth. The United States holds almost as much as Germany, Italy and France combined.",
    source: "World Gold Council, from IMF International Financial Statistics. Rounded.",
    visual: (
      <Bars
        unit="Tonnes"
        rows={[
          { label: "United States", value: 8133, display: "8,133" },
          { label: "Germany", value: 3350, display: "3,350" },
          { label: "Italy", value: 2452, display: "2,452" },
          { label: "France", value: 2437, display: "2,437" },
          { label: "China", value: 2346, display: "2,346" },
          { label: "Russia", value: 2336, display: "2,336" },
          { label: "Switzerland", value: 1040, display: "1,040" },
          { label: "India", value: 881, display: "881", hl: true },
          { label: "Japan", value: 846, display: "846" },
        ]}
      />
    ),
  },
  {
    topic: "Big numbers",
    title: "One lakh crore is one trillion",
    deck: "How Indian number names line up with the ones used abroad.",
    takeaway: "The FY2027 Union Budget of Rs 53.47 lakh crore is Rs 53.47 trillion.",
    source: "Indian and international numbering systems.",
    visual: (
      <table className="w-full font-plex text-[13px] text-navy">
        <thead>
          <tr className="text-left text-[11px] text-muted">
            <th className="font-medium pb-2">Indian</th>
            <th className="font-medium pb-2 text-right">In figures</th>
            <th className="font-medium pb-2 text-right">International</th>
          </tr>
        </thead>
        <tbody>
          {UNITS.map((u, i) => (
            <tr key={u.indian} className="border-t border-white">
              <td className="py-2.5 font-playfair text-[17px] font-bold">{u.indian}</td>
              <td className="py-2.5 text-right tabular-nums text-muted">{u.figure}</td>
              <td className="py-2.5 text-right font-semibold">
                <span className="inline-block rounded-full px-2.5 py-0.5 text-white" style={{ background: i === UNITS.length - 1 ? "var(--hl)" : "var(--strong)" }}>
                  {u.world}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    ),
  },
  {
    topic: "The rupee",
    title: "Eight dates in the life of the rupee",
    deck: "Changes to India's notes, coins and taxes since independence.",
    takeaway: "High value notes have been withdrawn three times: in 1978, 2016 and 2023.",
    source: "Reserve Bank of India; Ministry of Finance.",
    visual: (
      <Timeline
        items={[
          { when: "1957", title: "Decimal coinage: one rupee becomes 100 paise" },
          { when: "1978", title: "Rs 1,000, Rs 5,000 and Rs 10,000 notes withdrawn", hl: true },
          { when: "1996", title: "Mahatma Gandhi series of notes begins" },
          { when: "2010", title: "The rupee gets its own symbol" },
          { when: "2011", title: "The 25 paise coin is withdrawn" },
          { when: "2016", title: "Rs 500 and Rs 1,000 notes withdrawn", hl: true },
          { when: "2017", title: "GST replaces 17 central and state taxes" },
          { when: "2023", title: "The Rs 2,000 note is withdrawn from circulation", hl: true },
        ]}
      />
    ),
  },
  {
    topic: "Compounding",
    title: "Rs 10,000 a month for 30 years",
    deck: "What a monthly investment grows to at an assumed return of 12% a year.",
    takeaway: "In 30 years you put in Rs 36 lakh and the growth adds about Rs 3.13 crore. The 12% return is assumed. Actual returns vary.",
    source: "Arithmetic, 1% a month compounded monthly. An illustration and not investment advice.",
    visual: (
      <div>
        <Legend items={[{ label: "Amount invested", shade: "soft" }, { label: "Growth", shade: "strong" }]} />
        <div className="flex items-end gap-4">
          {SIP.map((s) => (
            <div key={s.years} className="flex-1 flex flex-col items-center" title={`${s.years} years: Rs ${s.value} lakh`}>
              <p className="font-plex text-xs font-semibold text-navy tabular-nums mb-1">{s.display}</p>
              <div className="w-full max-w-[56px] flex flex-col gap-[2px]">
                <span className="rounded-t-[4px] bg-[var(--strong)]" style={{ height: Math.max(2, Math.round(((s.value - s.invested) / 349.5) * 170)) }} />
                <span className="bg-[var(--soft)]" style={{ height: Math.max(2, Math.round((s.invested / 349.5) * 170)) }} />
              </div>
            </div>
          ))}
        </div>
        <div className="flex gap-4 border-t border-[var(--pale)] pt-1.5">
          {SIP.map((s) => (
            <p key={s.years} className="flex-1 text-center font-plex text-[11.5px] text-navy">
              {s.years} years
              <span className="block text-[10.5px] text-muted">Rs {s.invested} lakh invested</span>
            </p>
          ))}
        </div>
      </div>
    ),
  },
];

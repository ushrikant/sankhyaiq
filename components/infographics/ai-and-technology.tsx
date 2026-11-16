import { Bars, Columns, Facts, Ladder, Timeline, type PlateSpec } from "./kit";

export const meta = {
  title: "How fast technology moves, in ten charts",
  intro: "Chips, storage, networks and AI models, measured against where each of them started.",
};

const APOLLO = [
  { what: "Working memory", then: "4 KB", now: "8 GB", times: "20 lakh times" },
  { what: "Storage", then: "72 KB", now: "128 GB", times: "18 lakh times" },
  { what: "Weight", then: "32 kg", now: "0.2 kg", times: "160 times lighter" },
];

export const plates: PlateSpec[] = [
  {
    topic: "Adoption",
    wide: true,
    title: "ChatGPT reached 100 million users in two months",
    deck: "Time each service took to reach 100 million monthly users.",
    takeaway: "Facebook needed four and a half years. Threads later did it in five days, helped by Instagram's existing users.",
    source: "UBS analysis of Similarweb and Sensor Tower data, reported by Reuters in February 2023.",
    visual: (
      <Bars
        unit="Months to 100 million users"
        rows={[
          { label: "Facebook", value: 54, display: "54" },
          { label: "WhatsApp", value: 42, display: "42" },
          { label: "Instagram", value: 30, display: "30" },
          { label: "TikTok", value: 9, display: "9" },
          { label: "ChatGPT", value: 2, display: "2", hl: true },
        ]}
      />
    ),
  },
  {
    topic: "Transistors",
    title: "From 2,300 transistors to 134 billion",
    deck: "Transistors on one processor chip. Each step up the scale is ten times more.",
    takeaway: "The count has risen about 5.8 crore times in 52 years. That is Moore's Law at work.",
    source: "Intel and Apple product data.",
    visual: (
      <Columns
        log
        floor={300}
        height={180}
        unit="Transistors per chip, log scale"
        items={[
          { label: "1971", sub: "Intel 4004", value: 2300, display: "2,300" },
          { label: "1978", sub: "Intel 8086", value: 29000, display: "29,000" },
          { label: "1989", sub: "Intel 486", value: 1.2e6, display: "12 lakh" },
          { label: "2000", sub: "Pentium 4", value: 42e6, display: "4.2 crore" },
          { label: "2006", sub: "Core 2 Duo", value: 291e6, display: "29 crore" },
          { label: "2020", sub: "Apple M1", value: 16e9, display: "1,600 crore" },
          { label: "2023", sub: "M2 Ultra", value: 134e9, display: "13,400 crore", hl: true },
        ]}
      />
    ),
  },
  {
    topic: "Storage",
    title: "A card the size of a fingernail holds 6.9 lakh floppy disks",
    deck: "Capacity of everyday storage formats. Each step up the scale is ten times more.",
    takeaway: "A 1.44 MB floppy cannot hold one photo from a modern phone. A 1 TB microSD card holds about 2.5 lakh of them.",
    source: "Format specifications: ISO, DVD Forum, Blu-ray Disc Association, SD Association.",
    visual: (
      <Columns
        log
        floor={0.3}
        height={170}
        unit="Capacity, log scale"
        items={[
          { label: "Floppy", sub: "1987", value: 1.44, display: "1.44 MB" },
          { label: "CD", sub: "1982", value: 700, display: "700 MB" },
          { label: "DVD", sub: "1996", value: 4700, display: "4.7 GB" },
          { label: "Blu-ray", sub: "2006", value: 25000, display: "25 GB" },
          { label: "microSD", sub: "2019", value: 1e6, display: "1 TB", hl: true },
        ]}
      />
    ),
  },
  {
    topic: "Moon computer",
    title: "Your phone has 20 lakh times the memory of Apollo's computer",
    deck: "The Apollo Guidance Computer of 1969 next to an ordinary smartphone.",
    takeaway: "The computer that landed people on the Moon ran at about 2 MHz and weighed as much as a ten year old child.",
    source: "NASA; MIT Instrumentation Laboratory.",
    visual: (
      <table className="w-full font-plex text-[13px] text-navy">
        <thead>
          <tr className="text-left text-[11px] text-muted">
            <th className="font-medium pb-2" />
            <th className="font-medium pb-2">Apollo, 1969</th>
            <th className="font-medium pb-2">Phone today</th>
            <th className="font-medium pb-2 text-right">Change</th>
          </tr>
        </thead>
        <tbody>
          {APOLLO.map((r) => (
            <tr key={r.what} className="border-t border-white">
              <td className="py-2.5 pr-2 text-muted">{r.what}</td>
              <td className="py-2.5 pr-2 font-playfair text-[15px] sm:text-[17px] font-bold whitespace-nowrap">{r.then}</td>
              <td className="py-2.5 pr-2 font-playfair text-[15px] sm:text-[17px] font-bold whitespace-nowrap">{r.now}</td>
              <td className="py-2.5 text-right">
                <span className="inline-block rounded-full bg-[var(--hl)] px-2.5 py-0.5 text-[12px] sm:text-[13px] text-white font-semibold whitespace-nowrap">{r.times}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    ),
  },
  {
    topic: "Nanometres",
    title: "Two nanometres is 40,000 times thinner than a hair",
    deck: "Sizes of small things in nanometres. Each step down the scale is ten times smaller.",
    takeaway: "Chip names such as 2 nm are labels for a generation. The actual parts on the chip are larger, yet still far smaller than a virus.",
    source: "US National Human Genome Research Institute; IEEE International Roadmap for Devices and Systems.",
    visual: (
      <Ladder
        log
        top="max"
        min={0.1}
        max={200000}
        height={330}
        items={[
          { label: "Human hair, width", value: 80000, display: "80,000 nm" },
          { label: "Red blood cell", value: 7000, display: "7,000 nm" },
          { label: "Coronavirus", value: 100, display: "100 nm" },
          { label: "Newest chip generation, by name", value: 2, display: "2 nm", hl: true },
          { label: "Silicon atom", value: 0.2, display: "0.2 nm" },
        ]}
      />
    ),
  },
  {
    topic: "AI milestones",
    wide: true,
    title: "Seven decades from Turing's test to ChatGPT",
    deck: "Moments when machines did something people thought was years away.",
    takeaway: "Six of these eight milestones fall after 2010, when large datasets and graphics chips made deep learning practical.",
    source: "Published papers and company announcements: Turing (1950), IBM, Krizhevsky and others (2012), DeepMind, Vaswani and others (2017), OpenAI.",
    visual: (
      <Timeline
        items={[
          { when: "1950", title: "Alan Turing proposes the imitation game" },
          { when: "1997", title: "Deep Blue beats world chess champion Garry Kasparov" },
          { when: "2011", title: "IBM Watson wins the quiz show Jeopardy!" },
          { when: "2012", title: "AlexNet wins ImageNet and deep learning takes off" },
          { when: "2016", title: "AlphaGo beats Lee Sedol at Go" },
          { when: "2017", title: "The Transformer design is published" },
          { when: "2020", title: "AlphaFold 2 predicts protein structures" },
          { when: "2022", title: "ChatGPT is released", hl: true },
        ]}
      />
    ),
  },
  {
    topic: "Model size",
    title: "AI models grew 2,900 times in eight years",
    deck: "Parameters in well known AI models. Each step up the scale is ten times more.",
    takeaway: "AlexNet had 6 crore parameters in 2012. GPT-3 had 17,500 crore in 2020. Makers of later models have mostly stopped publishing the count.",
    source: "Krizhevsky and others (2012); Devlin and others (2018); OpenAI (2019, 2020).",
    visual: (
      <Columns
        log
        floor={6e6}
        height={170}
        unit="Parameters, log scale"
        items={[
          { label: "AlexNet", sub: "2012", value: 60e6, display: "6 crore" },
          { label: "BERT large", sub: "2018", value: 340e6, display: "34 crore" },
          { label: "GPT-2", sub: "2019", value: 1.5e9, display: "150 crore" },
          { label: "GPT-3", sub: "2020", value: 175e9, display: "17,500 crore", hl: true },
        ]}
      />
    ),
  },
  {
    topic: "Electricity",
    title: "Data centres use 1.5% of the world's electricity",
    deck: "Electricity used by data centres worldwide, measured and projected.",
    takeaway: "The IEA expects demand to more than double by 2030, to slightly more than Japan uses today.",
    source: "International Energy Agency, Energy and AI (2025).",
    visual: (
      <div className="flex flex-col gap-5">
        <Columns
          height={140}
          unit="Terawatt-hours a year"
          items={[
            { label: "2024", value: 415, display: "415" },
            { label: "2030", sub: "projected", value: 945, display: "945", hl: true },
          ]}
        />
        <Facts
          items={[
            { value: "1.5%", label: "of world electricity use in 2024" },
            { value: "Just under 3%", label: "projected share in 2030", hl: true },
          ]}
        />
      </div>
    ),
  },
  {
    topic: "Mobile networks",
    title: "A film that took 39 days on 2G takes under 2 seconds on 5G",
    deck: "Time to download a 4 GB film at the top design speed of each generation.",
    takeaway: "These are peak speeds on paper and real networks are slower. From 2G to 5G the top speed rose about 20 lakh times.",
    source: "GSM and ITU specifications: IMT-2000, IMT-Advanced and IMT-2020 peak data rates.",
    visual: (
      <Timeline
        whenWidth={40}
        items={[
          { when: "2G", title: "39 days", text: "Launched 1991. Top speed 9.6 kbps." },
          { when: "3G", title: "4.4 hours", text: "Launched 2001. Top speed 2 Mbps." },
          { when: "4G", title: "32 seconds", text: "Launched 2009. Top speed 1 Gbps." },
          { when: "5G", title: "1.6 seconds", text: "Launched 2019. Top speed 20 Gbps.", hl: true },
        ]}
      />
    ),
  },
  {
    topic: "Internet",
    title: "6 billion people are online. 2.2 billion are not.",
    deck: "Share of people who used the Internet in 2025.",
    takeaway: "Income is the widest gap. In high income countries 94% of people are online. In low income countries 23% are.",
    source: "International Telecommunication Union, Facts and Figures 2025.",
    visual: (
      <Bars
        max={100}
        unit="Per cent using the Internet"
        rows={[
          { label: "World", value: 74, display: "74%" },
          { label: "High income countries", value: 94, display: "94%" },
          { label: "Low income countries", value: 23, display: "23%", hl: true },
          { label: "Urban areas", value: 85, display: "85%" },
          { label: "Rural areas", value: 58, display: "58%" },
          { label: "Men", value: 77, display: "77%" },
          { label: "Women", value: 71, display: "71%" },
        ]}
      />
    ),
  },
];

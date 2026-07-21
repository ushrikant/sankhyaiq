// Ported from "Ten uncommon comparisons from the animal kingdom" field notes.
// Geometry (polar/arc/ekg/spiral helpers) mirrors the original data-story build.

const PAL = [
  "#B23A48", "#C56A1A", "#454B6B", "#8E5A6E", "#5B7A3A",
  "#2E6E6A", "#CE4B2A", "#5E4B8B", "#2B6CA3", "#946BC4",
];

function polar(cx: number, cy: number, r: number, deg: number) {
  const rad = ((deg - 90) * Math.PI) / 180;
  return { x: +(cx + r * Math.cos(rad)).toFixed(2), y: +(cy + r * Math.sin(rad)).toFixed(2) };
}
function arcPath(cx: number, cy: number, r: number, a0: number, a1: number) {
  const s = polar(cx, cy, r, a1);
  const e = polar(cx, cy, r, a0);
  const large = a1 - a0 <= 180 ? 0 : 1;
  return `M ${s.x} ${s.y} A ${r} ${r} 0 ${large} 0 ${e.x} ${e.y}`;
}
function sectorAnnulus(cx: number, cy: number, rOuter: number, rInner: number, a0: number, a1: number) {
  const so = polar(cx, cy, rOuter, a0);
  const eo = polar(cx, cy, rOuter, a1);
  const si = polar(cx, cy, rInner, a1);
  const ei = polar(cx, cy, rInner, a0);
  const large = a1 - a0 <= 180 ? 0 : 1;
  return `M ${so.x} ${so.y} A ${rOuter} ${rOuter} 0 ${large} 1 ${eo.x} ${eo.y} L ${si.x} ${si.y} A ${rInner} ${rInner} 0 ${large} 0 ${ei.x} ${ei.y} Z`;
}
function ekgPath(n: number, margin: number, w: number, y0: number, amp: number) {
  const segw = w / n;
  let x = margin;
  let d = `M ${x} ${y0}`;
  for (let i = 0; i < n; i++) {
    d += ` L ${(x + segw * 0.42).toFixed(1)} ${y0}`;
    d += ` L ${(x + segw * 0.5).toFixed(1)} ${(y0 - amp).toFixed(1)}`;
    d += ` L ${(x + segw * 0.58).toFixed(1)} ${(y0 + amp * 0.4).toFixed(1)}`;
    d += ` L ${(x + segw * 0.66).toFixed(1)} ${y0}`;
    x += segw;
  }
  d += ` L ${(margin + w).toFixed(1)} ${y0}`;
  return d;
}

// ─── Plate 01 — Cardiology ─────────────────────────────────────────────
const beats = [
  { name: "Etruscan shrew", bpm: 800, life: 2, label: "0.8 B" },
  { name: "House mouse", bpm: 550, life: 3, label: "0.9 B" },
  { name: "Domestic cat", bpm: 150, life: 15, label: "1.2 B" },
  { name: "Asian elephant", bpm: 28, life: 65, label: "0.9 B" },
  { name: "Blue whale", bpm: 8, life: 85, label: "0.5 B" },
  { name: "Human", bpm: 70, life: 73, label: "2.7 B", flag: true, tag: "outlier" },
];
const p1 = beats.map((b, i) => {
  const n = Math.min(20, Math.max(2, Math.round(2 + (b.bpm / 800) * 18)));
  return { ...b, sub: `${b.bpm} bpm · ${b.life} yr`, color: PAL[i % PAL.length], path: ekgPath(n, 14, 472, 24, 13) };
});

// ─── Plate 02 — Locomotion ──────────────────────────────────────────────
const speed = [
  { name: "Californian mite", sub: "absolute 0.8 km/h", val: 322, flag: true },
  { name: "Peregrine falcon", sub: "dive 389 km/h", val: 216 },
  { name: "Tiger beetle", sub: "absolute 9 km/h", val: 120 },
  { name: "Cheetah", sub: "absolute 104 km/h", val: 16 },
  { name: "Human sprinter", sub: "absolute 43 km/h", val: 6 },
];
const vMaxSpeed = Math.max(...speed.map((s) => s.val));
const p2 = speed.map((s, i) => {
  const frac = s.val / vMaxSpeed;
  return { ...s, color: PAL[(i + 1) % PAL.length], bg: arcPath(80, 86, 62, -90, 90), fg: arcPath(80, 86, 62, -90, -90 + 180 * frac) };
});

// ─── Plate 03 — Somnology ───────────────────────────────────────────────
const sleep = [
  { name: "Koala", hours: 22 }, { name: "Little brown bat", hours: 19 }, { name: "Python", hours: 18 },
  { name: "Tiger", hours: 15 }, { name: "Human", hours: 8 }, { name: "Cow", hours: 4 },
  { name: "Elephant", hours: 2 }, { name: "Giraffe", hours: 1.9, flag: true },
];
const p3 = sleep.map((s, i) => ({ ...s, color: PAL[(i + 2) % PAL.length], wedge: sectorAnnulus(50, 50, 35, 20, 0, (s.hours / 24) * 360) }));

// ─── Plate 04 — Gestation ───────────────────────────────────────────────
const gestation = [
  { name: "Virginia opossum", days: 13, label: "13 d" },
  { name: "House mouse", days: 20, label: "20 d" },
  { name: "Domestic dog", days: 63, label: "63 d" },
  { name: "Human", days: 280, label: "280 d" },
  { name: "Giraffe", days: 455, label: "455 d" },
  { name: "Black rhino", days: 480, label: "480 d" },
  { name: "African elephant", days: 660, label: "660 d", flag: true },
];
const p4 = gestation.map((g, i) => ({ ...g, color: PAL[(i + 3) % PAL.length], cx: +(20 + (g.days / 660) * 460).toFixed(1) }));

// ─── Plate 05 — Biomechanics ────────────────────────────────────────────
const jump = [
  { name: "Flea", mult: 150, label: "150×", flag: true },
  { name: "Froghopper", mult: 100, label: "100×", sub: "force ~400 g" },
  { name: "Grasshopper", mult: 20, label: "20×" },
  { name: "Bush baby", mult: 10, label: "10×" },
  { name: "Kangaroo", mult: 7, label: "7×" },
  { name: "Human", mult: 5, label: "5×" },
  { name: "Elephant", mult: 0, label: "0×", tag: "grounded" },
];
const p5 = jump.map((j, i) => {
  const color = PAL[(i + 4) % PAL.length];
  if (j.mult === 0) return { ...j, path: "M8 92 L112 92", color };
  const h = 6 + 74 * Math.sqrt(j.mult / 150);
  const cy = +(92 - 2 * h).toFixed(1);
  return { ...j, path: `M8 92 Q60 ${cy} 112 92`, color };
});

// ─── Plate 06 — Longevity spiral ────────────────────────────────────────
const longevity = [
  { name: "Mayfly", label: "1 day", years: 1 / 365 },
  { name: "Housefly", label: "28 days", years: 28 / 365 },
  { name: "Mouse", label: "2.5 yr", years: 2.5 },
  { name: "Dog", label: "13 yr", years: 13 },
  { name: "Human", label: "73 yr", years: 73 },
  { name: "Galapagos tortoise", label: "150 yr", years: 150 },
  { name: "Bowhead whale", label: "200 yr", years: 200 },
  { name: "Greenland shark", label: "400 yr", years: 400 },
  { name: "Ocean quahog", label: "507 yr", years: 507 },
];
const SA = 30, SB = 7.5, THETA_MAX = 2.5 * 2 * Math.PI, MAX_YEARS = 507, STEP = 0.01;
let Ltotal = 0;
{
  let th = 0, r = SA;
  while (th < THETA_MAX) {
    Ltotal += Math.sqrt(r * r + SB * SB) * STEP;
    th += STEP;
    r = SA + SB * th;
  }
}
const PXY = Ltotal / MAX_YEARS;
function pointAtYears(y: number) {
  const target = Math.min(y, MAX_YEARS) * PXY;
  let th = 0, L = 0, r = SA;
  while (th < THETA_MAX + 3) {
    const ds = Math.sqrt(r * r + SB * SB) * STEP;
    if (L + ds >= target) {
      const frac = ds > 0 ? (target - L) / ds : 0;
      th += STEP * frac;
      r = SA + SB * th;
      return { theta: th, r };
    }
    L += ds;
    th += STEP;
    r = SA + SB * th;
  }
  return { theta: th, r };
}
const longevityMarkers = longevity.map((l, i) => {
  const pt = pointAtYears(l.years);
  const p = polar(200, 200, pt.r, (pt.theta * 180) / Math.PI);
  return { ...l, x: p.x, y: p.y, color: PAL[(i + 5) % PAL.length] };
});
const spiralPts: string[] = [];
for (let th = 0; th <= THETA_MAX; th += 0.03) {
  const r = SA + SB * th;
  const p = polar(200, 200, r, (th * 180) / Math.PI);
  spiralPts.push(`${p.x} ${p.y}`);
}
const spiralPath = "M " + spiralPts.join(" L ");
const tickYears = [1, 10, 50, 100, 200, 300, 400, 500].filter((y) => y <= MAX_YEARS);
const longevityTicks = tickYears.map((y) => {
  const pt = pointAtYears(y);
  const deg = (pt.theta * 180) / Math.PI;
  const a = polar(200, 200, pt.r - 9, deg);
  const b = polar(200, 200, pt.r + 9, deg);
  const lp = polar(200, 200, pt.r + 20, deg);
  return { x1: a.x, y1: a.y, x2: b.x, y2: b.y, label: String(y), px: +((lp.x / 400) * 100).toFixed(2), py: +((lp.y / 400) * 100).toFixed(2) };
});
const jTheta = THETA_MAX + 1.15;
const jR = SA + SB * jTheta;
const jP = polar(200, 200, jR, (jTheta * 180) / Math.PI);
const lastMarker = longevityMarkers[longevityMarkers.length - 1];
const jellyPath = `M ${lastMarker.x} ${lastMarker.y} L ${jP.x} ${jP.y}`;

// ─── Plate 07 — Bioacoustics ─────────────────────────────────────────────
const loudness = [
  { name: "Sperm whale", sub: "clicks", db: 230 },
  { name: "Snapping shrimp", sub: "thumb-sized", db: 218, flag: true },
  { name: "Blue whale", sub: "call", db: 188 },
  { name: "Howler monkey", sub: "loudest on land", db: 140 },
  { name: "Kakapo", sub: "booming call", db: 132 },
  { name: "Human shout", db: 90 },
];
const dbMax = Math.max(...loudness.map((l) => l.db));
const p7 = loudness.map((l, i) => {
  const r = 14 + (l.db / dbMax) * 50;
  return { ...l, color: PAL[(i + 6) % PAL.length], r1: +(r * 0.5).toFixed(1), r2: +(r * 0.75).toFixed(1), r3: +r.toFixed(1) };
});

// ─── Plate 08 — Optics (static, true-scale eyeballs) ─────────────────────
const eyes = [
  { name: "Colossal squid", size: "27 cm", cx: 90, cy: 95, r: 75, fill: "rgba(94,75,139,.14)", stroke: "#5E4B8B" },
  { name: "Blue whale", size: "15 cm", cx: 236.5, cy: 128.5, r: 41.5, fill: "rgba(43,108,163,.14)", stroke: "#2B6CA3" },
  { name: "Ostrich", size: "5 cm", cx: 322, cy: 156.5, r: 14, fill: "rgba(91,122,58,.16)", stroke: "#5B7A3A" },
  { name: "Human", size: "2.4 cm", cx: 372.5, cy: 164, r: 6.5, fill: "rgba(206,75,42,.22)", stroke: "#CE4B2A" },
  { name: "Tarsier", size: "1.6 cm", cx: 413.5, cy: 166, r: 4.5, fill: "rgba(142,90,110,.26)", stroke: "#8E5A6E" },
];

// ─── Plate 09 — Navigation ───────────────────────────────────────────────
const migration = [
  { name: "Arctic tern", sub: "~100 g", km: 90000, label: "90,000 km", flag: true },
  { name: "Sooty shearwater", km: 64000, label: "64,000 km" },
  { name: "Leatherback turtle", km: 16000, label: "16,000 km" },
  { name: "Humpback whale", sub: "~30,000 kg", km: 16000, label: "16,000 km" },
  { name: "Caribou", sub: "longest on land", km: 5000, label: "5,000 km" },
  { name: "Monarch butterfly", sub: "over generations", km: 4000, label: "4,000 km" },
];
const kmMax = 90000;
const p9 = migration.map((m, i) => {
  const cx = +(20 + (m.km / kmMax) * 460).toFixed(1);
  const h = 8 + 22 * Math.sqrt(m.km / kmMax);
  const midx = +((20 + cx) / 2).toFixed(1);
  const cy = +(32 - 2 * h).toFixed(1);
  return { ...m, cx, color: PAL[(i + 8) % PAL.length], path: `M20 32 Q${midx} ${cy} ${cx} 32` };
});

// ─── Plate 10 — Hematology (static) ──────────────────────────────────────
const bloodColors = [
  { label: "Red", pigment: "Iron", who: "Most vertebrates", fill: "#B7202B" },
  { label: "Blue", pigment: "Copper", who: "Crab and octopus", fill: "#2C6FB0" },
  { label: "Green", pigment: "Biliverdin", who: "Skinks", fill: "#4E7A2E" },
  { label: "Violet", pigment: "Hemerythrin", who: "Peanut worms", fill: "#6B4A8E" },
  { label: "Clear", pigment: "No pigment", who: "Icefish", fill: "#F0EFE7", outline: true },
];

// ─── Shared plate chrome ─────────────────────────────────────────────────
function Plate({
  n, kicker, title, intro, accent, bg, note, noteLabel, children,
}: {
  n: string; kicker: string; title: string; intro: string; accent: string; bg: string;
  note: string; noteLabel: string; children: React.ReactNode;
}) {
  return (
    <section className="rounded-lg border border-black/5 overflow-hidden shadow-sm mb-6 lg:mb-8">
      <div className="h-1" style={{ background: accent }} />
      <div className="p-6 lg:p-10" style={{ background: bg }}>
        <div className="flex items-center gap-3 mb-5">
          <span
            className="font-plex font-semibold text-xs rounded px-2 py-0.5 border leading-none"
            style={{ color: accent, borderColor: accent }}
          >
            {n}
          </span>
          <span className="font-plex text-[11px] tracking-[0.2em] uppercase text-muted whitespace-nowrap">{kicker}</span>
          <span className="flex-1 h-px bg-black/10" />
        </div>
        <h2 className="font-playfair text-2xl lg:text-3xl font-bold text-navy leading-tight mb-2">{title}</h2>
        <p className="font-plex text-sm lg:text-base text-muted max-w-2xl mb-6">{intro}</p>

        {children}

        <p className="mt-6 pt-4 border-t border-black/10 font-plex text-sm text-navy/80 leading-relaxed">
          <b
            className="inline-block font-plex text-[10.5px] tracking-[0.16em] uppercase font-semibold mr-2"
            style={{ color: accent }}
          >
            {noteLabel}
          </b>
          {note}
        </p>
      </div>
    </section>
  );
}

export default function AnimalComparisons() {
  return (
    <div className="font-plex">
      <header className="mb-10">
        <p className="font-plex text-xs tracking-[0.24em] uppercase text-forest mb-3">SankhyaIQ · Field Notes No. 07</p>
        <h1 className="font-playfair text-3xl lg:text-5xl font-bold text-navy leading-tight max-w-2xl mb-4">
          Ten uncommon comparisons from the <em className="italic text-forest">animal kingdom</em>
        </h1>
        <p className="font-plex text-base lg:text-lg text-muted max-w-2xl mb-5">
          Ten measurements that overturn what size, speed and time seem to promise. Each is plotted against the
          animal&rsquo;s own scale, drawn as a chart built for its story, not a generic bar.
        </p>
        <div className="flex flex-wrap gap-x-6 gap-y-2 font-plex text-[11px] tracking-wide uppercase text-muted border-t border-black/10 pt-4">
          <span>Plates <b className="text-navy font-medium">01 to 10</b></span>
          <span>Species compared <b className="text-navy font-medium">50</b></span>
          <span>Units <b className="text-navy font-medium">bpm · dB · km · cm · years</b></span>
        </div>
      </header>

      {/* PLATE 01 — Cardiology */}
      <Plate
        n="01" kicker="Cardiology" accent="#B23A48" bg="#FBF1F1"
        title="One heart, one billion beats"
        intro="Small hearts race and large hearts idle, yet across mammals the lifetime total keeps landing in the same place. Each trace is a pulse line — denser spikes mean a faster heart — ending in the lifetime total."
        noteLabel="Field note"
        note="A shrew's heart hammers near 800 beats a minute and it lives about two years. A blue whale idles at a resting pulse you could count on one hand and lives past eighty. Multiply rate by lifespan and most mammals settle close to a billion beats. Humans are the odd ones out, pushed by modern medicine to roughly two and a half billion, well past the natural allowance."
      >
        <div>
          {p1.map((b) => (
            <div key={b.name} className="grid grid-cols-[minmax(120px,26%)_1fr_minmax(56px,auto)] items-center gap-4 py-2.5">
              <div>
                <div className="text-sm text-navy" style={{ fontWeight: b.flag ? 700 : 500 }}>
                  {b.name}
                  {b.tag && (
                    <span className="inline-block font-plex text-[9px] tracking-wide uppercase text-white rounded-sm px-1.5 py-0.5 ml-1.5 align-middle" style={{ background: "#B23A48" }}>
                      {b.tag}
                    </span>
                  )}
                </div>
                <div className="font-plex text-[10.5px] text-muted mt-0.5">{b.sub}</div>
              </div>
              <svg viewBox="0 0 500 44" className="w-full h-[30px] block">
                <path d={b.path} fill="none" stroke={b.color} strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div className="font-plex text-sm font-semibold text-navy text-right">{b.label}</div>
            </div>
          ))}
        </div>
        <p className="mt-1 font-plex text-[10.5px] text-muted">Approximate lifetime beats — rate × lifespan. Line frequency mirrors resting pulse.</p>
      </Plate>

      {/* PLATE 02 — Locomotion */}
      <Plate
        n="02" kicker="Locomotion" accent="#C56A1A" bg="#FDF4EA"
        title="Speed is relative"
        intro="The fastest animal on Earth becomes a crawler the moment you measure it against its own body. Each dial reads body lengths travelled every second, not kilometres."
        noteLabel="Field note"
        note="A cheetah covers about sixteen of its own body lengths every second. A dust-sized Californian mite manages more than three hundred, the fastest relative pace ever recorded on land. In plain kilometres the mite barely creeps, yet scaled to a human it would be sprinting faster than sound."
      >
        <div className="flex flex-wrap gap-6 justify-between">
          {p2.map((g) => (
            <div key={g.name} className="flex-1 min-w-[130px] max-w-[170px] text-center">
              <div className="relative">
                <svg viewBox="0 0 160 100" className="w-full h-auto block">
                  <path d={g.bg} fill="none" stroke="rgba(28,43,38,.09)" strokeWidth={12} strokeLinecap="round" />
                  <path d={g.fg} fill="none" stroke={g.color} strokeWidth={12} strokeLinecap="round" />
                </svg>
                <div className="absolute left-1/2 top-[66%] -translate-x-1/2 -translate-y-1/2 text-center">
                  <div className="font-plex font-semibold text-xl text-navy leading-none">{g.val}</div>
                  <div className="font-plex text-[9px] tracking-wide text-muted mt-1">BL / SEC</div>
                </div>
              </div>
              <div className="text-sm mt-1.5 text-navy" style={{ fontWeight: g.flag ? 700 : 500 }}>{g.name}</div>
              <div className="font-plex text-[10px] text-muted mt-0.5">{g.sub}</div>
            </div>
          ))}
        </div>
      </Plate>

      {/* PLATE 03 — Somnology */}
      <Plate
        n="03" kicker="Somnology" accent="#454B6B" bg="#F1F1F5"
        title="A life spent sleeping"
        intro="Rest has little to do with body mass. Each ring is a full 24 hour day; the filled band is time spent asleep."
        noteLabel="Field note"
        note="A koala can sleep twenty two hours a day while a giraffe of far greater bulk gets under two. Stranger still, dolphins and some seabirds rest one brain hemisphere at a time, and the great frigatebird sleeps while still in flight during weeks over open ocean."
      >
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {p3.map((s) => (
            <div key={s.name} className="text-center">
              <div className="relative max-w-[96px] mx-auto">
                <svg viewBox="0 0 100 100" className="w-full h-auto block">
                  <circle cx={50} cy={50} r={35} fill="none" stroke="rgba(28,43,38,.1)" strokeWidth={1} />
                  <circle cx={50} cy={50} r={20} fill="none" stroke="rgba(28,43,38,.1)" strokeWidth={1} />
                  <path d={s.wedge} fill={s.color} opacity={0.88} />
                </svg>
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-plex font-semibold text-[15px] text-navy">
                  {s.hours}
                </div>
              </div>
              <div className="text-xs mt-1.5 text-navy" style={{ fontWeight: s.flag ? 700 : 500 }}>{s.name}</div>
            </div>
          ))}
        </div>
      </Plate>

      {/* PLATE 04 — Gestation */}
      <Plate
        n="04" kicker="Gestation" accent="#8E5A6E" bg="#F8F0F3"
        title="The long wait"
        intro="Carrying time runs from under two weeks to almost two years. Each dot sits on a shared scale from 0 to 660 days."
        noteLabel="Field note"
        note="A Virginia opossum is pregnant for barely thirteen days, then finishes raising its young inside a pouch. An African elephant carries for close to twenty two months. The suspected record belongs to the deep-sea frilled shark, rumoured to gestate for over three years in the cold and the dark."
      >
        <div>
          {p4.map((g) => (
            <div key={g.name} className="grid grid-cols-[minmax(110px,27%)_1fr_minmax(56px,auto)] items-center gap-3 py-2">
              <div className="text-sm text-navy" style={{ fontWeight: g.flag ? 700 : 500 }}>{g.name}</div>
              <svg viewBox="0 0 500 24" className="w-full h-4 block overflow-visible">
                <line x1={0} y1={12} x2={500} y2={12} stroke="#E3DECE" strokeWidth={1} />
                <line x1={0} y1={12} x2={g.cx} y2={12} stroke={g.color} strokeWidth={2} opacity={0.55} />
                <circle cx={g.cx} cy={12} r={6} fill={g.color} />
              </svg>
              <div className="font-plex text-xs font-semibold text-navy text-right">{g.label}</div>
            </div>
          ))}
        </div>
      </Plate>

      {/* PLATE 05 — Biomechanics */}
      <Plate
        n="05" kicker="Biomechanics" accent="#5B7A3A" bg="#F3F6EE"
        title="Small bodies, giant leaps"
        intro="Measured against their own length, insects humble every athlete, and one heavyweight cannot leave the ground at all. Each arc traces a leap, height scaled to body lengths cleared."
        noteLabel="Field note"
        note="A froghopper launches at accelerations near four hundred times gravity, and a flea clears roughly one hundred and fifty times its own length. A human manages about five. The elephant sits at the far end as the only land mammal that can never get all four feet off the ground at once."
      >
        <div className="flex flex-wrap gap-4 justify-between">
          {p5.map((j) => (
            <div key={j.name} className="flex-1 min-w-[80px] max-w-[120px] text-center">
              <svg viewBox="0 0 120 100" className="w-full h-auto block">
                <line x1={4} y1={92} x2={116} y2={92} stroke="rgba(28,43,38,.12)" strokeWidth={1} />
                <path d={j.path} fill="none" stroke={j.color} strokeWidth={2.5} strokeLinecap="round" />
              </svg>
              <div className="font-plex text-sm font-semibold text-navy mt-0.5">{j.label}</div>
              <div className="text-xs text-navy" style={{ fontWeight: j.flag ? 700 : 500 }}>{j.name}</div>
              {j.tag && (
                <span className="inline-block font-plex text-[9px] tracking-wide uppercase text-white rounded-sm px-1.5 py-0.5 mt-1" style={{ background: "#5B7A3A" }}>
                  {j.tag}
                </span>
              )}
              {j.sub && <div className="font-plex text-[9.5px] text-muted mt-1">{j.sub}</div>}
            </div>
          ))}
        </div>
      </Plate>

      {/* PLATE 06 — Longevity spiral */}
      <Plate
        n="06" kicker="Longevity" accent="#2E6E6A" bg="#EEF5F4"
        title="A day, or five centuries"
        intro="Lifespans span five orders of magnitude, so this spiral is wound to true linear scale: arc length from the centre is directly proportional to years lived, coiled so five centuries still fit on the page."
        noteLabel="Field note"
        note="An adult mayfly may live a single day. A Greenland shark can pass four hundred years, and an ocean quahog clam named Ming reached about five hundred and seven. The immortal jellyfish outlasts them all by reverting to an early life stage and beginning again, in principle without any end."
      >
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(240px,400px)_1fr] gap-8 items-center">
          <div className="relative">
            <svg viewBox="0 0 400 400" className="w-full h-auto block">
              <path d={spiralPath} fill="none" stroke="#2E6E6A" strokeWidth={1.8} opacity={0.85} />
              <path d={jellyPath} fill="none" stroke="#C9A227" strokeWidth={1.4} strokeDasharray="3 4" opacity={0.8} />
              {longevityTicks.map((t) => (
                <line key={t.label} x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2} stroke="#8C948B" strokeWidth={1} />
              ))}
              {longevityMarkers.map((m) => (
                <circle key={m.name} cx={m.x} cy={m.y} r={5} fill={m.color} />
              ))}
              <circle cx={jP.x} cy={jP.y} r={7} fill="none" stroke="#C9A227" strokeWidth={2} strokeDasharray="2 3" />
              <text x={jP.x} y={jP.y} dy={4} textAnchor="middle" className="font-plex" fontWeight={600} fontSize={11} fill="#B8863B">
                &#8734;
              </text>
              <circle cx={200} cy={200} r={2.5} fill="#1C2B26" />
            </svg>
            {longevityTicks.map((t) => (
              <div
                key={t.label}
                className="absolute font-plex text-[9px] text-muted whitespace-nowrap -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${t.px}%`, top: `${t.py}%` }}
              >
                {t.label}
              </div>
            ))}
          </div>
          <div>
            <p className="font-plex text-[10.5px] text-muted mb-4">Ticks mark 1, 10, 50, 100, 200, 300, 400, 500 years along the coil.</p>
            <div className="flex flex-col gap-2">
              {longevityMarkers.map((m) => (
                <div key={m.name} className="flex items-baseline gap-2.5">
                  <span className="w-2 h-2 rounded-full flex-none" style={{ background: m.color }} />
                  <span className="text-sm font-medium flex-1 text-navy">{m.name}</span>
                  <span className="font-plex text-xs text-muted">{m.label}</span>
                </div>
              ))}
              <div className="flex items-baseline gap-2.5">
                <span className="w-2 h-2 rounded-full flex-none border-[1.5px] border-dashed" style={{ borderColor: "#C9A227" }} />
                <span className="text-sm font-semibold flex-1" style={{ color: "#B8863B" }}>Immortal jellyfish</span>
                <span className="font-plex text-xs" style={{ color: "#B8863B" }}>&#8734;</span>
              </div>
            </div>
          </div>
        </div>
      </Plate>

      {/* PLATE 07 — Bioacoustics */}
      <Plate
        n="07" kicker="Bioacoustics" accent="#CE4B2A" bg="#FBF0EC"
        title="Louder than a whale"
        intro="The loudest sounds in nature do not always come from the largest animals. Each burst of rings shows peak loudness in decibels — the wider the ripple, the louder the source."
        noteLabel="Field note"
        note="A snapping shrimp no bigger than a thumb fires a collapsing bubble at more than two hundred decibels, briefly heating the water near the temperature of the sun's surface. That single click rivals a sperm whale and outguns every animal on land, including the howler monkey heard five kilometres away."
      >
        <div className="flex flex-wrap gap-4 justify-between">
          {p7.map((l) => (
            <div key={l.name} className="flex-1 min-w-[100px] max-w-[130px] text-center">
              <svg viewBox="0 0 130 130" className="w-full h-auto block">
                <circle cx={65} cy={65} r={l.r3} fill="none" stroke={l.color} strokeWidth={1.4} opacity={0.28} />
                <circle cx={65} cy={65} r={l.r2} fill="none" stroke={l.color} strokeWidth={1.4} opacity={0.5} />
                <circle cx={65} cy={65} r={l.r1} fill="none" stroke={l.color} strokeWidth={1.6} opacity={0.8} />
                <circle cx={65} cy={65} r={4} fill={l.color} />
              </svg>
              <div className="font-plex text-sm font-semibold text-navy">{l.db} dB</div>
              <div className="text-xs text-navy mt-0.5" style={{ fontWeight: l.flag ? 700 : 500 }}>{l.name}</div>
              {l.sub && <div className="font-plex text-[9.5px] text-muted mt-0.5">{l.sub}</div>}
            </div>
          ))}
        </div>
      </Plate>

      {/* PLATE 08 — Optics */}
      <Plate
        n="08" kicker="Optics" accent="#5E4B8B" bg="#F3F0F8"
        title="Eyes the size of dinner plates"
        intro="Drawn to true scale, some eyes dwarf a human head. Each circle below is one eyeball, sized by its real diameter, resting on a shared baseline."
        noteLabel="Field note"
        note="The colossal squid carries eyes about twenty seven centimetres across, the largest of any animal. On land the ostrich wins, with an eyeball larger than its own brain. The tiny tarsier takes the relative crown, each eye as big as its brain and locked in place, so it swivels its whole head to look around."
      >
        <svg viewBox="0 0 470 215" role="img" aria-label="Eyeball diameters drawn to scale" className="w-full h-auto block my-1">
          <line x1={0} y1={170.5} x2={470} y2={170.5} stroke="#E3DECE" strokeWidth={1} />
          {eyes.map((e) => (
            <circle key={e.name} cx={e.cx} cy={e.cy} r={e.r} fill={e.fill} stroke={e.stroke} strokeWidth={1.5} />
          ))}
          {eyes.map((e) => (
            <g key={`${e.name}-label`}>
              <text x={e.cx} y={190} textAnchor="middle" fontSize={10.5} fill="#1C2B26">{e.name}</text>
              <text x={e.cx} y={203} textAnchor="middle" fontSize={10.5} fill="#8C948B">{e.size}</text>
            </g>
          ))}
        </svg>
      </Plate>

      {/* PLATE 09 — Navigation */}
      <Plate
        n="09" kicker="Navigation" accent="#2B6CA3" bg="#EDF3F8"
        title="The longest commutes"
        intro="Distance travelled has nothing to do with body mass. Each flight path arcs higher the farther that animal migrates in a single year."
        noteLabel="Field note"
        note="The Arctic tern chases endless summer from pole to pole and back, up to ninety thousand kilometres a year. Over a thirty year life that is close to three round trips to the Moon. A humpback whale thousands of times heavier covers only a fraction of the same distance."
      >
        <div>
          {p9.map((m) => (
            <div key={m.name} className="grid grid-cols-[minmax(120px,28%)_1fr_minmax(68px,auto)] items-center gap-3 py-2.5">
              <div className="text-sm text-navy" style={{ fontWeight: m.flag ? 700 : 500 }}>
                {m.name}
                {m.sub && <span className="block font-plex text-[10px] text-muted mt-0.5 font-normal">{m.sub}</span>}
              </div>
              <svg viewBox="0 0 500 40" className="w-full h-[26px] block overflow-visible">
                <line x1={20} y1={32} x2={480} y2={32} stroke="rgba(28,43,38,.1)" strokeWidth={1} />
                <path d={m.path} fill="none" stroke={m.color} strokeWidth={2} strokeLinecap="round" />
                <circle cx={m.cx} cy={32} r={4} fill={m.color} />
              </svg>
              <div className="font-plex text-xs font-semibold text-navy text-right">{m.label}</div>
            </div>
          ))}
        </div>
      </Plate>

      {/* PLATE 10 — Hematology */}
      <Plate
        n="10" kicker="Hematology" accent="#A13D5C" bg="#FAF0F3"
        title="When blood runs blue"
        intro="Red is common, not universal. The pigment that carries oxygen changes the colour, and the chemistry, of blood across the animal kingdom."
        noteLabel="Field note"
        note="Horseshoe crabs and octopuses run on copper, which turns their blood blue and works better in cold, low-oxygen water. Some New Guinea skinks carry green blood loaded with a pigment that would poison a human. Antarctic icefish went furthest of all and dropped colour entirely, the only vertebrates alive with no red blood cells."
      >
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-4">
          {bloodColors.map((b) => (
            <div key={b.label} className="text-center">
              <svg viewBox="0 0 60 80" aria-hidden="true" className="w-11 h-auto block mx-auto mb-3">
                <path
                  d="M30 5 C30 5 9 36 9 52 a21 21 0 0 0 42 0 C51 36 30 5 30 5 Z"
                  fill={b.fill}
                  stroke={b.outline ? "#B9B4A6" : undefined}
                  strokeWidth={b.outline ? 1.4 : undefined}
                  strokeDasharray={b.outline ? "3 3" : undefined}
                />
              </svg>
              <div className="font-plex text-[11px] tracking-wide uppercase text-navy font-semibold mb-1">{b.label}</div>
              <div className="text-xs text-muted leading-tight">{b.pigment}<br />{b.who}</div>
            </div>
          ))}
        </div>
      </Plate>
    </div>
  );
}

import { Bars, Columns, Ladder, Shapes, Stack, Timeline, Waffle, type PlateSpec } from "./kit";

export const meta = {
  title: "The universe to scale, in ten charts",
  intro: "Planets, light, heat and time, each drawn against something familiar.",
};

export const plates: PlateSpec[] = [
  {
    topic: "Planets",
    wide: true,
    title: "1,300 Earths would fit inside Jupiter",
    deck: "The eight planets drawn to scale by diameter.",
    takeaway: "Jupiter is 11 times as wide as Earth. Mercury, the smallest planet, is 38% as wide.",
    source: "NASA Planetary Fact Sheet, equatorial diameters.",
    visual: (
      <Shapes
        by="width"
        maxPx={112}
        unit="Diameter in kilometres"
        items={[
          { label: "Mercury", value: 4879, display: "4,879" },
          { label: "Venus", value: 12104, display: "12,104" },
          { label: "Earth", value: 12756, display: "12,756", hl: true },
          { label: "Mars", value: 6792, display: "6,792" },
          { label: "Jupiter", value: 142984, display: "1,42,984" },
          { label: "Saturn", value: 120536, display: "1,20,536" },
          { label: "Uranus", value: 51118, display: "51,118" },
          { label: "Neptune", value: 49528, display: "49,528" },
        ]}
      />
    ),
  },
  {
    topic: "Earth and Moon",
    title: "Every other planet fits between Earth and the Moon",
    deck: "The bar is the average distance to the Moon: 3,84,400 km.",
    takeaway: "Lined up side by side, the seven other planets span 3,80,016 km. That leaves 4,384 km to spare.",
    source: "NASA Planetary Fact Sheet, mean diameters and mean lunar distance.",
    visual: (
      <Stack
        height={36}
        parts={[
          { label: "Jupiter", value: 139822, display: "1,39,822 km", shade: "strong" },
          { label: "Saturn", value: 116464, display: "1,16,464 km", shade: "mid" },
          { label: "Uranus", value: 50724, display: "50,724 km", shade: "deep" },
          { label: "Neptune", value: 49244, display: "49,244 km", shade: "alt" },
          { label: "Venus, Mars and Mercury", value: 23762, display: "23,762 km", shade: "soft" },
          { label: "Space left over", value: 4384, display: "4,384 km", shade: "hl" },
        ]}
      />
    ),
  },
  {
    topic: "Sunlight",
    title: "Sunlight takes 8 minutes 19 seconds to reach Earth",
    deck: "Time light takes to travel from the Sun to each planet.",
    takeaway: "Light reaching Neptune left the Sun more than four hours earlier.",
    source: "NASA Planetary Fact Sheet, average distance from the Sun.",
    visual: (
      <Bars
        rows={[
          { label: "Mercury", value: 3.2, display: "3.2 min" },
          { label: "Venus", value: 6.0, display: "6.0 min" },
          { label: "Earth", value: 8.3, display: "8.3 min", hl: true },
          { label: "Mars", value: 12.7, display: "12.7 min" },
          { label: "Jupiter", value: 43.3, display: "43 min" },
          { label: "Saturn", value: 79.3, display: "1 h 19 min" },
          { label: "Uranus", value: 159.6, display: "2 h 40 min" },
          { label: "Neptune", value: 250.1, display: "4 h 10 min" },
        ]}
      />
    ),
  },
  {
    topic: "Gravity",
    title: "A 60 kg person would weigh 152 kg on Jupiter",
    deck: "What a bathroom scale would read for a person who weighs 60 kg on Earth.",
    takeaway: "Your mass stays the same everywhere. The scale reads differently because each world pulls with a different force.",
    source: "NASA Planetary Fact Sheet, surface gravity.",
    visual: (
      <Columns
        height={170}
        unit="Kilograms on the scale"
        items={[
          { label: "Moon", value: 9.9, display: "10" },
          { label: "Mars", value: 22.6, display: "23" },
          { label: "Venus", value: 54.3, display: "54" },
          { label: "Earth", value: 60, display: "60", hl: true },
          { label: "Saturn", value: 63.9, display: "64" },
          { label: "Neptune", value: 68.2, display: "68" },
          { label: "Jupiter", value: 151.7, display: "152" },
        ]}
      />
    ),
  },
  {
    topic: "Heat",
    title: "Lightning is five times hotter than the surface of the Sun",
    deck: "Temperatures from deep space to the Sun's core. Each step up the scale is ten times hotter in kelvin.",
    takeaway: "A lightning bolt heats the air around it to about 27,700°C. The Sun's surface is about 5,500°C.",
    source: "NASA; US National Weather Service; World Meteorological Organization.",
    visual: (
      <Ladder
        log
        top="max"
        min={0.7}
        max={3e7}
        height={380}
        items={[
          { label: "Core of the Sun", value: 1.57e7, display: "1.5 crore °C" },
          { label: "Lightning bolt", value: 28000, display: "27,700°C", hl: true },
          { label: "Surface of the Sun", value: 5772, display: "5,500°C" },
          { label: "Surface of Venus", value: 737, display: "464°C" },
          { label: "Human body", value: 310, display: "37°C" },
          { label: "Coldest air recorded on Earth", value: 184, display: "−89.2°C" },
          { label: "Liquid nitrogen", value: 77, display: "−196°C" },
          { label: "Boomerang Nebula, coldest known place", value: 1, display: "−272°C" },
        ]}
      />
    ),
  },
  {
    topic: "Atmosphere",
    wide: true,
    title: "Space begins 100 km up",
    deck: "Heights above sea level. Each step up the scale is ten times higher.",
    takeaway: "The Kármán line at 100 km is the accepted edge of space. The International Space Station orbits four times higher.",
    source: "NASA; Fédération Aéronautique Internationale.",
    visual: (
      <Ladder
        log
        top="max"
        min={3}
        max={600}
        height={340}
        items={[
          { label: "International Space Station", value: 408, display: "408 km" },
          { label: "Kármán line, the edge of space", value: 100, display: "100 km", hl: true },
          { label: "Highest parachute jump", value: 41.4, display: "41 km" },
          { label: "Ozone layer", value: 25, display: "25 km" },
          { label: "Cruising passenger jet", value: 11, display: "11 km" },
          { label: "Summit of Everest", value: 8.849, display: "8.8 km" },
        ]}
      />
    ),
  },
  {
    topic: "The body",
    title: "Six elements make up 99% of you",
    deck: "The human body by weight.",
    takeaway: "Oxygen alone is 65% of body weight, most of it locked in water.",
    source: "US National Institutes of Health; standard physiology references.",
    visual: (
      <Bars
        unit="Per cent of body weight"
        rows={[
          { label: "Oxygen", value: 65, display: "65%", hl: true },
          { label: "Carbon", value: 18.5, display: "18.5%" },
          { label: "Hydrogen", value: 9.5, display: "9.5%" },
          { label: "Nitrogen", value: 3.2, display: "3.2%" },
          { label: "Calcium", value: 1.5, display: "1.5%" },
          { label: "Phosphorus", value: 1.0, display: "1.0%" },
          { label: "Everything else", value: 1.3, display: "1.3%", dim: true },
        ]}
      />
    ),
  },
  {
    topic: "Deep time",
    title: "If Earth's history were one day, humans arrive 6 seconds before midnight",
    deck: "4.54 billion years squeezed into 24 hours.",
    takeaway: "On this clock one second is about 52,500 years. All of recorded history fits in the last tenth of a second.",
    source: "International Commission on Stratigraphy; Smithsonian National Museum of Natural History.",
    visual: (
      <Timeline
        whenWidth={76}
        items={[
          { when: "00:00", title: "Earth forms", text: "4.54 billion years ago" },
          { when: "04:26", title: "Earliest signs of life", text: "3.7 billion years ago" },
          { when: "11:19", title: "Oxygen builds up in the air", text: "2.4 billion years ago" },
          { when: "21:09", title: "Animals diversify in the Cambrian", text: "539 million years ago" },
          { when: "22:47", title: "First dinosaurs", text: "230 million years ago" },
          { when: "23:39", title: "Dinosaurs die out", text: "66 million years ago" },
          { when: "23:59:54", title: "Our species appears", text: "3 lakh years ago", hl: true },
        ]}
      />
    ),
  },
  {
    topic: "Speed",
    title: "Light is 1,560 times faster than our fastest spacecraft",
    deck: "Speeds in kilometres per hour. Each step up the scale is ten times faster.",
    takeaway: "Parker Solar Probe reached 6.92 lakh km/h in December 2024. Light covers that distance in 2.3 seconds.",
    source: "NASA.",
    visual: (
      <Columns
        log
        floor={300}
        height={170}
        unit="Kilometres per hour, log scale"
        items={[
          { label: "Sound", sub: "in air", value: 1235, display: "1,235" },
          { label: "Space Station", value: 27600, display: "27,600" },
          { label: "Earth", sub: "around the Sun", value: 107000, display: "1.07 lakh" },
          { label: "Parker probe", value: 692000, display: "6.92 lakh" },
          { label: "Light", value: 1079252849, display: "107.9 crore", hl: true },
        ]}
      />
    ),
  },
  {
    topic: "The universe",
    title: "Everything we can see is 5% of the universe",
    deck: "What the universe is made of. Each square is 1%.",
    takeaway: "Stars, planets, gas and people are all ordinary matter. The other 95% has been measured by its effects but never seen.",
    source: "NASA; Planck Collaboration, 2018 results.",
    visual: (
      <Waffle
        parts={[
          { label: "Dark energy", value: 68, display: "About 68%", shade: "strong" },
          { label: "Dark matter", value: 27, display: "About 27%", shade: "soft" },
          { label: "Ordinary matter", value: 5, display: "About 5%", shade: "hl" },
        ]}
      />
    ),
  },
];

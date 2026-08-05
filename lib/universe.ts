export type UniverseStop = {
  id: number;
  /** Filename inside /public/images/universe */
  image: string;
  caption: string;
  narration: string;
  /** Plain description of what's in the illustration, used as image alt text. */
  visual: string;
  motion: string;
  /** Optional narration clip. Not sourced yet, wired for a future drop-in file. */
  audioSrc?: string;
};

export const universeStops0to5: UniverseStop[] = [
  {
    id: 0,
    image: "stop-00-the-wait.png",
    caption: "Once upon a time...",
    narration:
      "Long, long ago, before Mumbai, before you, before even the stars, there was nothing at all.",
    visual:
      "A single small glowing starburst radiating soft red, yellow and teal light against a deep midnight blue background.",
    motion: "The dot breathes, pulsing softly, waiting for a scroll or a tap.",
  },
  {
    id: 1,
    image: "stop-01-big-bang.png",
    caption: "BOOM! The Big Bang!",
    narration: "That tiny dot went BOOM and the whole universe began!",
    visual:
      "A colourful cartoon burst of pink, orange, yellow and white swirls exploding outward on a soft blue to mint gradient sky.",
    motion: "Explosion animation on scroll, with a soft whoosh sound.",
  },
  {
    id: 2,
    image: "stop-02-first-stars.png",
    caption: "Twinkle, twinkle, first stars",
    narration: "Sparkly little stars began to twinkle in the dark sky.",
    visual:
      "The smiling comet guide floating in a starry night sky, glowing stars and soft colourful clouds of light stretching across the darkness.",
    motion: "Stars appear as the child scrolls, each with a tiny sparkle.",
  },
  {
    id: 3,
    image: "stop-03-galaxies.png",
    caption: "Stars hold hands and swirl",
    narration: "Stars gathered together and made big spinning swirls.",
    visual:
      "A swirling spiral galaxy made entirely of tiny glowing stars in purple, teal, orange and gold, with the smiling comet guide floating beside it.",
    motion: "Slow, gentle rotation.",
  },
  {
    id: 4,
    image: "stop-04-our-sun.png",
    caption: "Hello, Sun!",
    narration: "One warm, bright star became our very own Sun.",
    visual:
      "A big round smiling yellow sun with rosy cheeks and warm golden rays, glowing on a deep blue starry sky, with the comet guide beside it.",
    motion: "Sun rays pulse outward gently.",
  },
  {
    id: 5,
    image: "stop-05-earth-joins.png",
    caption: "Earth starts to dance",
    narration: "Around the Sun, Earth and its friends began to spin.",
    visual:
      "Planet Earth and its smiling planet friends circling a happy sun on gentle dotted orbit paths, with the comet guide floating nearby.",
    motion: "Planets loop around the sun.",
  },
  {
    id: 6,
    image: "stop-06-oceans-appear.png",
    caption: "Earth turns blue and green",
    narration: "Earth cooled down and filled up with big blue oceans.",
    visual:
      "Planet Earth shown half fiery orange and half lush blue and green, wrapped in soft white clouds, with the comet guide floating beside it.",
    motion: "Colour morph as the child scrolls past.",
  },
  {
    id: 7,
    image: "stop-07-tiny-life.png",
    caption: "Tiny wobbly friends wake up",
    narration: "Deep in the ocean, the very first living things began to wiggle.",
    visual:
      "A group of small round wobbly sea creatures with happy faces floating together underwater, sunlight streaming down through the water, with the comet guide nearby.",
    motion: "Gentle floating and wiggling loop.",
  },
  {
    id: 8,
    image: "stop-08-dinosaurs.png",
    caption: "Giant dinosaurs stomp in!",
    narration: "Millions of years later, giant dinosaurs stomped across the land.",
    visual:
      "A friendly green T-Rex, a long necked Brachiosaurus, a small Triceratops and a flying Pterodactyl in a lush jungle with palm trees and a volcano in the distance, with the comet guide beside them.",
    motion: "A stomp with a small screen shake and a footstep sound.",
  },
  {
    id: 9,
    image: "stop-09-big-rock.png",
    caption: "A big rock comes to visit",
    narration:
      "One day a giant rock from space came to visit and the dinosaurs said goodbye.",
    visual:
      "A glowing streak of light crossing a dusky pink sky above the quiet silhouettes of dinosaurs resting on darkened hills, with the comet guide watching from the side.",
    motion: "The streak crosses the sky, the scene fades softly to the next.",
  },
  {
    id: 10,
    image: "stop-10-furry-friends.png",
    caption: "Furry friends fill the Earth",
    narration:
      "After the dinosaurs, cute furry animals like elephants and tigers came out to play.",
    visual:
      "A happy elephant, tiger, deer and woolly mammoth walking together across a sunny green meadow with trees and flowers, with the comet guide beside them.",
    motion: "Animals walk across the screen in a line.",
  },
  {
    id: 11,
    image: "stop-11-first-people.png",
    caption: "Along came people, just like us!",
    narration:
      "Then came people like you and me. They lived in caves and learned to make fire.",
    visual:
      "A cave family, a mother, father and two children, sitting around a warm campfire outside their cave at sunset, with cave paintings of mammoths, bison and horses on the rock walls, and the comet guide floating nearby.",
    motion: "Fire flickers with a warm glow.",
  },
  {
    id: 12,
    image: "stop-12-villages.png",
    caption: "People grow food and build homes",
    narration: "People learned to grow food and build little villages together.",
    visual:
      "A small village of thatched roof huts among green hills, with children and grown-ups tending vegetable patches, a cow and a sheep grazing nearby, under a sunny sky, with the comet guide beside the fields.",
    motion: "Crops sway gently in the breeze.",
  },
  {
    id: 13,
    image: "stop-13-cities.png",
    caption: "Villages grow into big cities",
    narration:
      "Slowly, villages became big cities with tall buildings, cars and aeroplanes.",
    visual:
      "A modern city skyline of tall colourful buildings at sunset, with cars driving on the streets below and an aeroplane flying overhead, the comet guide floating beside the buildings.",
    motion: "Buildings rise as the child scrolls, cars and planes drift by.",
  },
  {
    id: 14,
    image: "stop-14-today-you.png",
    caption: "And here we are, today, with YOU!",
    narration:
      "After a very, very long story, we reach you. You are part of this amazing universe.",
    visual:
      "A child sitting cross legged on a grassy hill at dusk, looking up happily at the smiling comet guide and a sky full of twinkling stars.",
    motion: "Screen brightens, a light confetti or twinkle burst plays.",
  },
];

export type UniverseStop6to8 = {
  id: number;
  /** Filename inside /public/images/universe, e.g. "6to8/stop-01-big-bang.png" */
  image: string;
  caption: string;
  detail: string;
  timeAgo: string;
  /** Placement on the "13.8 billion years squeezed into one year" cosmic calendar. */
  cosmicCalendar: string;
};

export const universeStops6to8: UniverseStop6to8[] = [
  { id: 1, image: "6to8/stop-01-big-bang.png", timeAgo: "13.8 billion years ago", cosmicCalendar: "January 1st, the very first moment", caption: "In the beginning, everything was nothing.", detail: "All the space, time, matter and energy that exist today, every star, every planet, and even you, came from something smaller than a grain of sand. In one tiny flash, it all began." },
  { id: 2, image: "6to8/stop-02-first-stars.png", timeAgo: "13.6 billion years ago", cosmicCalendar: "January 6th", caption: "The dark sky lit its very first candles.", detail: "For hundreds of millions of years there was nothing but darkness. Then huge clouds of gas squeezed together so tightly that they caught fire and became the very first stars." },
  { id: 3, image: "6to8/stop-03-galaxies-form.png", timeAgo: "13.5 billion years ago", cosmicCalendar: "January 9th", caption: "Stars gathered into giant swirling cities.", detail: "Stars are not scattered alone, they gather by the billions into huge spinning shapes called galaxies. Our home galaxy, the Milky Way, has more stars in it than there are grains of sand on every beach on Earth." },
  { id: 4, image: "6to8/stop-04-sun-born.png", timeAgo: "4.6 billion years ago", cosmicCalendar: "August 31st", caption: "Our very own star switched on.", detail: "Nine billion years after the Big Bang, a cloud of gas and dust spun together and lit up, becoming our Sun. It is so big that over a million Earths could fit inside it." },
  { id: 5, image: "6to8/stop-05-earth-forms.png", timeAgo: "4.5 billion years ago", cosmicCalendar: "September 3rd", caption: "A ball of melted rock became our home.", detail: "Leftover dust and rock crashed together again and again until they formed a hot, glowing ball, the very young Earth. It was far too hot for water to exist yet." },
  { id: 6, image: "6to8/stop-06-oceans-form.png", timeAgo: "4 billion years ago", cosmicCalendar: "September 16th", caption: "Rain fell for thousands of years.", detail: "As Earth slowly cooled, thick clouds poured down rain that never seemed to stop, filling giant dips in the rock and creating our very first oceans." },
  { id: 7, image: "6to8/stop-07-first-tiny-life.png", timeAgo: "3.7 billion years ago", cosmicCalendar: "September 24th", caption: "The tiniest living thing you could never see.", detail: "In the warm ocean water, a living cell appeared, so small that a million of them could fit inside a single drop of water. Every living thing on Earth today, including you, is related to it." },
  { id: 8, image: "6to8/stop-08-shelled-creatures.png", timeAgo: "540 million years ago", cosmicCalendar: "December 17th", caption: "The ocean suddenly filled with strange shapes.", detail: "For billions of years life stayed tiny and simple. Then, almost like a switch flipped, thousands of new sea creatures with shells, spikes and legs appeared all at once." },
  { id: 9, image: "6to8/stop-09-fish-appear.png", timeAgo: "480 million years ago", cosmicCalendar: "December 18th", caption: "The first fish began to swim.", detail: "Among the shelled creatures, a new kind of animal appeared with a backbone running down its body, the very first fish. That same backbone is inside you too." },
  { id: 10, image: "6to8/stop-10-fish-crawl-onto-land.png", timeAgo: "375 million years ago", cosmicCalendar: "December 21st", caption: "One brave fish decided to try land.", detail: "A fish with strong stubby fins pulled itself out of the water and took a breath of air for the very first time. Its fins would slowly turn into legs." },
  { id: 11, image: "6to8/stop-11-reptiles-appear.png", timeAgo: "310 million years ago", cosmicCalendar: "December 23rd", caption: "A tougher egg meant no need for water.", detail: "Amphibians still needed wet places to lay their eggs. Reptiles evolved a special egg with a hard shell, so they could finally live far from ponds and rivers." },
  { id: 12, image: "6to8/stop-12-pangaea-complete.png", timeAgo: "300 million years ago", cosmicCalendar: "December 23rd", caption: "Every piece of land was joined as one.", detail: "If you had a map back then, you would not recognise it at all. Every continent was squeezed together into one giant supercontinent called Pangaea." },
  { id: 13, image: "6to8/stop-13-dinosaurs-rule.png", timeAgo: "230 million years ago", cosmicCalendar: "December 25th", caption: "The age of the giant dinosaurs began.", detail: "Dinosaurs ruled Earth for an incredible 165 million years, far longer than humans have existed. Some grew taller than a five storey building." },
  { id: 14, image: "6to8/stop-14-pangaea-splits.png", timeAgo: "200 million years ago onward", cosmicCalendar: "December 25th to 26th", caption: "The one big landmass slowly tore apart.", detail: "Pangaea began cracking into giant pieces that drifted apart, moving at roughly the speed your fingernails grow, into the continents we know today." },
  { id: 15, image: "6to8/stop-15-asteroid-ends-dinosaurs.png", timeAgo: "66 million years ago", cosmicCalendar: "December 29th to 30th", caption: "A visitor from space changed everything.", detail: "A giant rock from space, about the size of a big city, slammed into Earth and changed the climate so much that most dinosaurs could not survive." },
  { id: 16, image: "6to8/stop-16-mammals-spread.png", timeAgo: "66 to 20 million years ago", cosmicCalendar: "December 29th to 31st", caption: "With the giants gone, small furry animals took over.", detail: "Once the dinosaurs disappeared, the small mammals that had been hiding in their shadow finally had space to grow bigger and spread across every continent." },
  { id: 17, image: "6to8/stop-17-ape-ancestors.png", timeAgo: "6 million years ago", cosmicCalendar: "December 31st, about 8 in the evening", caption: "Our earliest relatives climbed down from the trees.", detail: "If all of time were squeezed into a single year, this happens on New Year's Eve. Our earliest ape like ancestors began spending more time on the ground." },
  { id: 18, image: "6to8/stop-18-ice-age-begins.png", timeAgo: "2.6 million years ago", cosmicCalendar: "December 31st, about 10 at night", caption: "Earth wrapped itself in ice.", detail: "Huge sheets of ice, some over a kilometre thick, spread across the land, and enormous woolly mammoths roamed the frozen plains." },
  { id: 19, image: "6to8/stop-19-humans-stand-upright.png", timeAgo: "2 million years ago", cosmicCalendar: "December 31st, about 10:45 at night", caption: "Standing tall and holding the first tools.", detail: "Early humans began walking fully upright on two legs and chipping stones into simple sharp tools, freeing up their hands for the first time." },
  { id: 20, image: "6to8/stop-20-fire-discovered.png", timeAgo: "1 million years ago", cosmicCalendar: "December 31st, about 11:20 at night", caption: "The night finally had a bit of warmth and light.", detail: "Learning to control fire changed everything. It kept early humans warm, lit up the darkness, and let them cook food for the first time." },
  { id: 21, image: "6to8/stop-21-ice-age-ends.png", timeAgo: "11,700 years ago", cosmicCalendar: "December 31st, less than thirty seconds before midnight", caption: "The ice slowly melted away.", detail: "The frozen world warmed, glaciers retreated, and green land spread out where ice sheets had been for thousands of years." },
  { id: 22, image: "6to8/stop-22-farming-villages.png", timeAgo: "10,000 years ago", cosmicCalendar: "December 31st, seconds before midnight", caption: "People stopped wandering and started growing food.", detail: "Instead of following animals to hunt, people began planting seeds and staying in one place, building homes near their fields, the very first villages." },
  { id: 23, image: "6to8/stop-23-wheel-invented.png", timeAgo: "5,500 years ago", cosmicCalendar: "December 31st, seconds before midnight", caption: "Round and round, the wheel changed travel.", detail: "Before the wheel, everything had to be dragged or carried. One simple round shape suddenly made it possible to move heavy loads with far less effort." },
  { id: 24, image: "6to8/stop-24-writing-cities.png", timeAgo: "5,000 years ago", cosmicCalendar: "December 31st, seconds before midnight", caption: "For the first time, thoughts could be written down.", detail: "People began pressing symbols into soft clay to record numbers, stories and trades, so an idea could finally travel or be read long after it was written." },
  { id: 25, image: "6to8/stop-25-today.png", timeAgo: "today", cosmicCalendar: "December 31st, midnight, right now", caption: "And now, here you are.", detail: "Everything you just scrolled through, 13.8 billion years of stars, oceans, dinosaurs and humans, led to this exact moment, you reading this sentence." },
];

export type AgeBand = {
  slug: string;
  label: string;
};

export const ageBands: AgeBand[] = [
  { slug: "0-5", label: "0-5" },
  { slug: "6-8", label: "6-8" },
  { slug: "9-11", label: "9-11" },
  { slug: "12-15", label: "12-15" },
  { slug: "16-20", label: "16-20" },
  { slug: "adult", label: "Adult" },
];

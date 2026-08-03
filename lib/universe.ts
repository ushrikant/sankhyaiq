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

export type AgeBand = {
  slug: string;
  label: string;
  ready: boolean;
};

export const ageBands: AgeBand[] = [
  { slug: "0-5", label: "0-5", ready: true },
  { slug: "6-8", label: "6-8", ready: false },
  { slug: "9-11", label: "9-11", ready: false },
  { slug: "12-15", label: "12-15", ready: false },
  { slug: "16-20", label: "16-20", ready: false },
  { slug: "adult", label: "Adult", ready: false },
];

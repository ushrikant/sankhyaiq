export type UniverseStop = {
  id: number;
  caption: string;
  narration: string;
  visual: string;
  motion: string;
  /** Optional narration clip. Not sourced yet, wired for a future drop-in file. */
  audioSrc?: string;
};

export const universeStops0to5: UniverseStop[] = [
  {
    id: 0,
    caption: "Once upon a time...",
    narration:
      "Long, long ago, before Mumbai, before you, before even the stars, there was nothing at all.",
    visual: "A dark screen with one tiny glowing dot at the centre.",
    motion: "The dot breathes, pulsing softly, waiting for a scroll or a tap.",
  },
  {
    id: 1,
    caption: "BOOM! The Big Bang!",
    narration: "That tiny dot went BOOM and the whole universe began!",
    visual: "A burst of orange, pink and white light filling the screen.",
    motion: "Explosion animation on scroll, with a soft whoosh sound.",
  },
  {
    id: 2,
    caption: "Twinkle, twinkle, first stars",
    narration: "Sparkly little stars began to twinkle in the dark sky.",
    visual: "A deep blue sky, stars popping in one by one.",
    motion: "Stars appear as the child scrolls, each with a tiny sparkle.",
  },
  {
    id: 3,
    caption: "Stars hold hands and swirl",
    narration: "Stars gathered together and made big spinning swirls.",
    visual: "A friendly, colourful spiral galaxy.",
    motion: "Slow, gentle rotation.",
  },
  {
    id: 4,
    caption: "Hello, Sun!",
    narration: "One warm, bright star became our very own Sun.",
    visual: "A big smiling yellow sun.",
    motion: "Sun rays pulse outward gently.",
  },
  {
    id: 5,
    caption: "Earth starts to dance",
    narration: "Around the Sun, Earth and its friends began to spin.",
    visual: "A simple solar system with smiling planets, Earth highlighted.",
    motion: "Planets loop around the sun.",
  },
  {
    id: 6,
    caption: "Earth turns blue and green",
    narration: "Earth cooled down and filled up with big blue oceans.",
    visual: "Earth shifting from fiery red to blue and green.",
    motion: "Colour morph as the child scrolls past.",
  },
  {
    id: 7,
    caption: "Tiny wobbly friends wake up",
    narration: "Deep in the ocean, the very first living things began to wiggle.",
    visual: "Cute wobbly blob creatures floating underwater.",
    motion: "Gentle floating and wiggling loop.",
  },
  {
    id: 8,
    caption: "Giant dinosaurs stomp in!",
    narration: "Millions of years later, giant dinosaurs stomped across the land.",
    visual: "Friendly cartoon dinosaurs in a green landscape.",
    motion: "A stomp with a small screen shake and a footstep sound.",
  },
  {
    id: 9,
    caption: "A big rock comes to visit",
    narration:
      "One day a giant rock from space came to visit and the dinosaurs said goodbye.",
    visual:
      "A soft streak of light in a dusky sky above quiet dinosaur silhouettes, gentle, no impact or destruction shown.",
    motion: "The streak crosses the sky, the scene fades softly to the next.",
  },
  {
    id: 10,
    caption: "Furry friends fill the Earth",
    narration:
      "After the dinosaurs, cute furry animals like elephants and tigers came out to play.",
    visual: "A friendly parade of mammals.",
    motion: "Animals walk across the screen in a line.",
  },
  {
    id: 11,
    caption: "Along came people, just like us!",
    narration:
      "Then came people like you and me. They lived in caves and learned to make fire.",
    visual:
      "A simple cave family around a warm campfire, cave paintings on the wall.",
    motion: "Fire flickers with a warm glow.",
  },
  {
    id: 12,
    caption: "People grow food and build homes",
    narration: "People learned to grow food and build little villages together.",
    visual: "Small huts, fields, farm animals.",
    motion: "Crops sway gently in the breeze.",
  },
  {
    id: 13,
    caption: "Villages grow into big cities",
    narration:
      "Slowly, villages became big cities with tall buildings, cars and aeroplanes.",
    visual: "A skyline rising from small huts to a modern city.",
    motion: "Buildings rise as the child scrolls, cars and planes drift by.",
  },
  {
    id: 14,
    caption: "And here we are, today, with YOU!",
    narration:
      "After a very, very long story, we reach you. You are part of this amazing universe.",
    visual:
      "A child looking up at the stars beside the guide character, today's world glowing softly in the background.",
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

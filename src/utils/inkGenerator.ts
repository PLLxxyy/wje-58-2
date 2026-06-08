import type { InkSpot } from '../types';

function seededRandom(seed: number): () => number {
  let s = seed;
  return function () {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

const getRandomType = (random: () => number): 'dot' | 'smudge' | 'feather' => {
  const rand = random();
  if (rand < 0.6) return 'dot';
  if (rand < 0.85) return 'smudge';
  return 'feather';
};

export const generateInkSpots = (width: number, height: number, density: number, seed: number = Date.now()): InkSpot[] => {
  const random = seededRandom(seed);
  const count = Math.floor(density * 3);
  const spots: InkSpot[] = [];

  for (let i = 0; i < count; i++) {
    spots.push({
      x: random() * width,
      y: random() * height,
      size: 1 + random() * 7,
      opacity: 0.1 + random() * 0.5,
      type: getRandomType(random)
    });
  }

  return spots;
};

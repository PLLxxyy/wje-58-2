import type { RenderedChar } from '../types';

const SIMILAR_CHARS: Record<string, string[]> = {
  'a': ['o', 'e', 'q'],
  'b': ['d', 'p', 'h'],
  'c': ['e', 'o', 'g'],
  'd': ['b', 'p', 'q'],
  'e': ['a', 'o', 'r'],
  'f': ['t', 'r', 'e'],
  'g': ['q', 'c', 'o'],
  'h': ['b', 'n', 'm'],
  'i': ['j', 'l', '1'],
  'j': ['i', 'l', 'k'],
  'k': ['l', 'j', 'h'],
  'l': ['1', 'i', 'j'],
  'm': ['n', 'h', 'w'],
  'n': ['m', 'h', 'r'],
  'o': ['0', 'a', 'e'],
  'p': ['b', 'q', 'r'],
  'q': ['p', 'g', '9'],
  'r': ['t', 'e', 'n'],
  's': ['a', 'd', 'x'],
  't': ['r', 'f'],
  'u': ['y', 'i', 'o'],
  'v': ['u', 'c', 'b'],
  'w': ['v', 'v', 'v'],
  'x': ['z', 's', 'c'],
  'y': ['u', 't', 'h'],
  'z': ['x', 's', 'a'],
  '0': ['o', 'O', 'Q'],
  '1': ['l', 'I', 'i'],
  '2': ['Z', 'z', 'S'],
  '3': ['E', 'e', 'B'],
  '4': ['A', 'a', '9'],
  '5': ['S', 's', '$'],
  '6': ['G', 'b', '8'],
  '7': ['T', 't', '+'],
  '8': ['B', 'g', '6'],
  '9': ['g', 'q', '4'],
  'A': ['a', 'O', 'Q'],
  'B': ['8', 'E', 'D'],
  'C': ['G', 'O', 'Q'],
  'D': ['O', '0', 'Q'],
  'E': ['F', 'T', '3'],
  'F': ['E', 'P', 'T'],
  'G': ['C', 'O', '6'],
  'H': ['N', 'M', 'W'],
  'I': ['1', 'l', 'L'],
  'J': ['I', 'i', 'T'],
  'K': ['K', 'X', 'H'],
  'L': ['I', '1', 'l'],
  'M': ['N', 'W', 'H'],
  'N': ['M', 'H', 'W'],
  'O': ['0', 'Q', 'D'],
  'P': ['F', 'R', 'B'],
  'Q': ['O', '0', 'G'],
  'R': ['P', 'F', 'T'],
  'S': ['$', '5', 'Z'],
  'T': ['T', '7', 'I'],
  'U': ['V', 'Y', 'W'],
  'V': ['U', 'Y', 'W'],
  'W': ['W', 'V', 'U'],
  'X': ['K', 'Y', 'Z'],
  'Y': ['Y', 'U', 'V'],
  'Z': ['Z', '2', '7'],
};

function seededRandom(seed: number): () => number {
  let s = seed;
  return function () {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

function isAlphanumeric(char: string): boolean {
  return /^[a-zA-Z0-9]$/.test(char);
}

export function applyCharacterReplacement(
  text: string,
  errorRate: number,
  misalignment: number,
  ghostIntensity: number,
  seed: number = Date.now()
): RenderedChar[] {
  const random = seededRandom(seed);
  const chars: RenderedChar[] = [];

  for (let i = 0; i < text.length; i++) {
    const originalChar = text[i];
    let char = originalChar;
    let isError = false;

    if (isAlphanumeric(originalChar) && random() * 100 < errorRate) {
      const similar = SIMILAR_CHARS[originalChar];
      if (similar && similar.length > 0) {
        char = similar[Math.floor(random() * similar.length)];
        isError = true;
      }
    }

    const offsetX = (random() - 0.5) * 2 * (misalignment / 100) * 3;
    const offsetY = (random() - 0.5) * 2 * (misalignment / 100) * 2;
    const opacity = 0.85 + random() * 0.15;
    const ghostOffset = ghostIntensity > 0 ? (random() * ghostIntensity) / 100 * 3 : 0;

    chars.push({
      char,
      originalChar,
      isError,
      offsetX,
      offsetY,
      opacity,
      ghostOffset,
    });
  }

  return chars;
}

export interface EffectSettings {
  text: string;
  font: string;
  fontSize: number;
  errorRate: number;
  ghostIntensity: number;
  inkDensity: number;
  misalignment: number;
  paperAge: number;
}

export interface FontOption {
  id: string;
  name: string;
  fontFamily: string;
  importUrl: string;
  description: string;
}

export interface RenderedChar {
  char: string;
  originalChar: string;
  isError: boolean;
  offsetX: number;
  offsetY: number;
  opacity: number;
  ghostOffset: number;
}

export interface InkSpot {
  x: number;
  y: number;
  size: number;
  opacity: number;
  type: 'dot' | 'smudge' | 'feather';
}

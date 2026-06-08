import { useMemo } from 'react';
import type { EffectSettings, InkSpot, RenderedChar } from '../types';
import { applyCharacterReplacement } from '../utils/charReplacement';
import { generateInkSpots } from '../utils/inkGenerator';

interface TypewriterResult {
  renderedChars: RenderedChar[];
  inkSpots: InkSpot[];
  paperStyle: React.CSSProperties;
}

export function useTypewriterEffect(settings: EffectSettings): TypewriterResult {
  const { text, errorRate, misalignment, ghostIntensity, inkDensity, paperAge } = settings;

  const renderedChars = useMemo(() => {
    const seed = text.length + errorRate + misalignment + ghostIntensity;
    return applyCharacterReplacement(text, errorRate, misalignment, ghostIntensity, seed);
  }, [text, errorRate, misalignment, ghostIntensity]);

  const inkSpots = useMemo(() => {
    const seed = text.length + inkDensity + paperAge;
    return generateInkSpots(800, 1000, inkDensity, seed);
  }, [inkDensity, text.length, paperAge]);

  const paperStyle = useMemo((): React.CSSProperties => {
    const baseColor = { r: 245, g: 240, b: 225 };
    const ageFactor = paperAge / 100;

    const r = Math.round(baseColor.r - ageFactor * 25);
    const g = Math.round(baseColor.g - ageFactor * 15);
    const b = Math.round(baseColor.b - ageFactor * 55);

    const backgroundColor = `rgb(${r}, ${g}, ${b})`;
    const brightness = 1 - ageFactor * 0.15;
    const sepia = ageFactor * 0.4;

    return {
      backgroundColor,
      filter: `brightness(${brightness}) sepia(${sepia})`,
      backgroundImage: `
        radial-gradient(ellipse at 20% 30%, rgba(139, 90, 43, ${0.03 + ageFactor * 0.05}) 0%, transparent 50%),
        radial-gradient(ellipse at 80% 70%, rgba(139, 90, 43, ${0.02 + ageFactor * 0.04}) 0%, transparent 50%),
        linear-gradient(180deg, rgba(0,0,0,${0.01 + ageFactor * 0.02}) 0%, transparent 100%)
      `,
    };
  }, [paperAge]);

  return {
    renderedChars,
    inkSpots,
    paperStyle,
  };
}

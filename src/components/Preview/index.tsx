import React, { forwardRef } from 'react';
import PaperBackground from './PaperBackground';
import InkSpots from './InkSpots';
import TypewriterText from './TypewriterText';
import { useSettingsStore } from '../../store/useSettingsStore';
import { useTypewriterEffect } from '../../hooks/useTypewriterEffect';
import { FONTS } from '../../constants/fonts';

const Preview = forwardRef<HTMLDivElement>((_, ref) => {
  const settings = useSettingsStore();
  const { renderedChars, inkSpots, paperStyle } = useTypewriterEffect(settings);

  const selectedFont = FONTS.find(f => f.id === settings.font) || FONTS[0];

  return (
    <div
      ref={ref}
      className="w-full max-w-3xl mx-auto print-content"
      style={{ aspectRatio: '3 / 4' }}
    >
      <PaperBackground paperStyle={paperStyle}>
        <InkSpots spots={inkSpots} />
        <TypewriterText
          chars={renderedChars}
          fontFamily={selectedFont.fontFamily}
          fontSize={settings.fontSize}
          ghostIntensity={settings.ghostIntensity}
        />
      </PaperBackground>
    </div>
  );
});

Preview.displayName = 'Preview';

export default Preview;

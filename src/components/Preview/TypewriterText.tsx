import React from 'react';
import type { RenderedChar } from '../../types';

interface TypewriterTextProps {
  chars: RenderedChar[];
  fontFamily: string;
  fontSize: number;
  ghostIntensity: number;
}

export default function TypewriterText({ chars, fontFamily, fontSize, ghostIntensity }: TypewriterTextProps) {
  const ghostOpacity = ghostIntensity / 100;

  return (
    <div
      className="p-12 md:p-16 leading-relaxed select-none whitespace-pre-wrap break-words"
      style={{
        fontFamily,
        fontSize: `${fontSize}px`,
        lineHeight: `${fontSize * 1.8}px`,
        color: '#3d2b1f',
      }}
    >
      {chars.map((char, index) => {
        const ghostOffset = char.ghostOffset || 0.5;
        const shadowOpacity = ghostOpacity * 0.35;

        return (
          <span
            key={index}
            className={`inline-block relative ${char.isError ? 'text-accent-red' : ''}`}
            style={{
              transform: `translate(${char.offsetX}px, ${char.offsetY}px)`,
              opacity: char.opacity,
              textShadow: `
                ${ghostOffset}px 0 0 rgba(61, 43, 31, ${shadowOpacity * 0.8}),
                ${ghostOffset * 0.5}px 0 0 rgba(61, 43, 31, ${shadowOpacity * 0.5}),
                0 ${ghostOffset * 0.3}px 0 rgba(61, 43, 31, ${shadowOpacity * 0.3})
              `,
              letterSpacing: char.isError ? '1px' : '0.5px',
            }}
          >
            {char.char}
          </span>
        );
      })}
    </div>
  );
}

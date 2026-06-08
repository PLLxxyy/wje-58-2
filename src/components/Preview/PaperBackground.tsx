import React from 'react';

interface PaperBackgroundProps {
  paperStyle: React.CSSProperties;
  children: React.ReactNode;
}

export default function PaperBackground({ paperStyle, children }: PaperBackgroundProps) {
  return (
    <div
      className="relative w-full h-full overflow-hidden rounded-sm shadow-2xl"
      style={paperStyle}
    >
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-30"
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id="paperNoise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="4"
            stitchTiles="stitch"
          />
          <feColorMatrix
            type="matrix"
            values="
              1 0 0 0 0
              0 1 0 0 0
              0 0 1 0 0
              0 0 0 0.15 0
            "
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#paperNoise)" />
      </svg>

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.03) 2%, transparent 5%),
            linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.02) 3%, transparent 7%),
            linear-gradient(90deg, transparent 95%, rgba(0,0,0,0.04) 98%, transparent 100%),
            linear-gradient(180deg, transparent 93%, rgba(0,0,0,0.03) 97%, transparent 100%)
          `,
        }}
      />

      <div
        className="absolute top-0 left-0 w-full h-8 pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, rgba(139,90,43,0.08) 0%, transparent 100%)',
        }}
      />

      <div
        className="absolute left-0 top-0 h-full w-6 pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, rgba(139,90,43,0.06) 0%, transparent 100%)',
        }}
      />

      <div
        className="absolute top-20 left-10 w-40 h-40 pointer-events-none opacity-40"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, transparent 40%, rgba(139,90,43,0.05) 70%, transparent 100%)',
          transform: 'rotate(-15deg)',
        }}
      />

      <div
        className="absolute bottom-32 right-16 w-56 h-56 pointer-events-none opacity-30"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, transparent 40%, rgba(139,90,43,0.04) 70%, transparent 100%)',
          transform: 'rotate(25deg)',
        }}
      />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          boxShadow: 'inset 0 0 100px rgba(0,0,0,0.15)',
        }}
      />

      <div className="relative z-10 w-full h-full">{children}</div>
    </div>
  );
}

import React from 'react';
import type { InkSpot } from '../../types';

interface InkSpotsProps {
  spots: InkSpot[];
}

export default function InkSpots({ spots }: InkSpotsProps) {
  const renderDot = (spot: InkSpot, index: number) => (
    <div
      key={`dot-${index}`}
      className="absolute rounded-full bg-ink"
      style={{
        left: spot.x,
        top: spot.y,
        width: spot.size,
        height: spot.size,
        opacity: spot.opacity,
        filter: 'blur(0.5px)',
      }}
    />
  );

  const renderSmudge = (spot: InkSpot, index: number) => (
    <div
      key={`smudge-${index}`}
      className="absolute bg-ink rounded-full"
      style={{
        left: spot.x - spot.size * 2,
        top: spot.y - spot.size * 0.5,
        width: spot.size * 4,
        height: spot.size * 1.5,
        opacity: spot.opacity * 0.4,
        filter: 'blur(4px)',
        transform: `rotate(${(index * 17) % 30 - 15}deg)`,
      }}
    />
  );

  const renderFeather = (spot: InkSpot, index: number) => (
    <svg
      key={`feather-${index}`}
      className="absolute pointer-events-none"
      style={{
        left: spot.x - spot.size * 3,
        top: spot.y - spot.size * 2,
        width: spot.size * 6,
        height: spot.size * 4,
        opacity: spot.opacity * 0.6,
      }}
      viewBox="0 0 60 40"
    >
      <defs>
        <linearGradient id={`featherGrad-${index}`} x1="0%" y1="50%" x2="100%" y2="50%">
          <stop offset="0%" stopColor="#3d2b1f" stopOpacity="0" />
          <stop offset="30%" stopColor="#3d2b1f" stopOpacity="0.8" />
          <stop offset="70%" stopColor="#3d2b1f" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#3d2b1f" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d={`M5,20 Q${15 + index % 10},${10 + index % 5} ${30},${18 + index % 4} T${55},${20 + index % 6}`}
        stroke={`url(#featherGrad-${index})`}
        strokeWidth={spot.size * 0.8}
        fill="none"
        strokeLinecap="round"
        style={{
          filter: 'blur(0.3px)',
        }}
      />
      <path
        d={`M8,${22 + index % 3} Q${20 + index % 8},${28 + index % 4} ${35},${24 + index % 3} T${52},${26 + index % 5}`}
        stroke={`url(#featherGrad-${index})`}
        strokeWidth={spot.size * 0.4}
        fill="none"
        strokeLinecap="round"
        opacity="0.5"
        style={{
          filter: 'blur(0.5px)',
        }}
      />
    </svg>
  );

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
      {spots.map((spot, index) => {
        switch (spot.type) {
          case 'dot':
            return renderDot(spot, index);
          case 'smudge':
            return renderSmudge(spot, index);
          case 'feather':
            return renderFeather(spot, index);
          default:
            return null;
        }
      })}
    </div>
  );
}

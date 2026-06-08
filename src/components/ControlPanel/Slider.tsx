import type { LucideIcon } from 'lucide-react';

interface SliderProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  icon?: LucideIcon;
}

export function Slider({
  label,
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  icon: Icon,
}: SliderProps) {
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          {Icon && <Icon className="w-4 h-4 text-ink" />}
          <span className="text-sm font-medium text-ink">{label}</span>
        </div>
        <span className="text-sm font-mono text-accent-red bg-paper border border-ink/20 px-2 py-0.5 rounded">
          {value}
        </span>
      </div>
      <div className="relative">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full h-2 bg-ink/10 rounded-full appearance-none cursor-pointer
                     [&::-webkit-slider-thumb]:appearance-none
                     [&::-webkit-slider-thumb]:w-5
                     [&::-webkit-slider-thumb]:h-5
                     [&::-webkit-slider-thumb]:rounded-full
                     [&::-webkit-slider-thumb]:bg-accent-red
                     [&::-webkit-slider-thumb]:border-2
                     [&::-webkit-slider-thumb]:border-paper
                     [&::-webkit-slider-thumb]:shadow-md
                     [&::-webkit-slider-thumb]:cursor-pointer
                     [&::-webkit-slider-thumb]:transition-transform
                     [&::-webkit-slider-thumb]:hover:scale-110
                     [&::-moz-range-thumb]:w-5
                     [&::-moz-range-thumb]:h-5
                     [&::-moz-range-thumb]:rounded-full
                     [&::-moz-range-thumb]:bg-accent-red
                     [&::-moz-range-thumb]:border-2
                     [&::-moz-range-thumb]:border-paper
                     [&::-moz-range-thumb]:shadow-md
                     [&::-moz-range-thumb]:cursor-pointer"
          style={{
            background: `linear-gradient(to right, #8b2500 0%, #8b2500 ${percentage}%, rgba(61, 43, 31, 0.1) ${percentage}%, rgba(61, 43, 31, 0.1) 100%)`,
          }}
        />
      </div>
      <div className="flex justify-between mt-1 text-xs text-ink/50">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
}

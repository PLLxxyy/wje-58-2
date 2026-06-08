import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import type { FontOption } from '../../types';

interface FontSelectorProps {
  value: string;
  onChange: (value: string) => void;
  options: FontOption[];
}

export function FontSelector({ value, onChange, options }: FontSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const selectedFont = options.find((opt) => opt.id === value) || options[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (selectedFont) {
      const existingLink = document.querySelector(`link[data-font="${selectedFont.id}"]`);
      if (!existingLink) {
        const link = document.createElement('link');
        link.href = selectedFont.importUrl;
        link.rel = 'stylesheet';
        link.dataset.font = selectedFont.id;
        document.head.appendChild(link);
      }
    }
  }, [selectedFont]);

  return (
    <div className="w-full" ref={containerRef}>
      <label className="block text-sm font-medium text-ink mb-2">
        字体选择
      </label>
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between px-4 py-3 bg-paper border-2 border-ink/30 rounded-lg
                     hover:border-accent-red transition-colors focus:outline-none focus:ring-2 focus:ring-accent-red/50"
        >
          <span style={{ fontFamily: selectedFont.fontFamily }} className="text-ink text-lg">
            {selectedFont.name}
          </span>
          <ChevronDown
            className={`w-5 h-5 text-ink transition-transform ${isOpen ? 'rotate-180' : ''}`}
          />
        </button>

        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-paper border-2 border-ink/30 rounded-lg shadow-xl max-h-64 overflow-y-auto">
            {options.map((font) => {
              const link = document.querySelector(`link[data-font="${font.id}"]`);
              if (!link) {
                const newLink = document.createElement('link');
                newLink.href = font.importUrl;
                newLink.rel = 'stylesheet';
                newLink.dataset.font = font.id;
                document.head.appendChild(newLink);
              }

              return (
                <button
                  key={font.id}
                  type="button"
                  onClick={() => {
                    onChange(font.id);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-4 py-3 hover:bg-ink/5 transition-colors
                             ${value === font.id ? 'bg-accent-red/10' : ''}`}
                >
                  <div className="text-left">
                    <div
                      style={{ fontFamily: font.fontFamily }}
                      className="text-ink text-lg"
                    >
                      {font.name}
                    </div>
                    <div className="text-xs text-ink/50 mt-0.5">
                      {font.description}
                    </div>
                  </div>
                  {value === font.id && (
                    <Check className="w-5 h-5 text-accent-red flex-shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

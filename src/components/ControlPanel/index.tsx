import { useEffect, useState } from 'react';
import { AlertCircle, Layers, Droplets, Move, Clock, RotateCcw, Type } from 'lucide-react';
import { Slider } from './Slider';
import { FontSelector } from './FontSelector';
import { useSettingsStore } from '../../store/useSettingsStore';
import { FONTS } from '../../constants/fonts';
import { useDebounce } from '../../hooks/useDebounce';

export function ControlPanel() {
  const {
    text,
    font,
    errorRate,
    ghostIntensity,
    inkDensity,
    misalignment,
    paperAge,
    updateSetting,
    resetSettings,
  } = useSettingsStore();

  const [localText, setLocalText] = useState(text);
  const debouncedText = useDebounce(localText, 300);

  useEffect(() => {
    if (debouncedText !== text) {
      updateSetting('text', debouncedText);
    }
  }, [debouncedText, text, updateSetting]);

  const handleReset = () => {
    resetSettings();
    setLocalText(useSettingsStore.getState().text);
  };

  const sliders = [
    {
      key: 'errorRate' as const,
      label: '错字率',
      value: errorRate,
      min: 0,
      max: 50,
      step: 1,
      icon: AlertCircle,
    },
    {
      key: 'ghostIntensity' as const,
      label: '重影强度',
      value: ghostIntensity,
      min: 0,
      max: 50,
      step: 1,
      icon: Layers,
    },
    {
      key: 'inkDensity' as const,
      label: '墨点密度',
      value: inkDensity,
      min: 0,
      max: 100,
      step: 1,
      icon: Droplets,
    },
    {
      key: 'misalignment' as const,
      label: '错位程度',
      value: misalignment,
      min: 0,
      max: 50,
      step: 1,
      icon: Move,
    },
    {
      key: 'paperAge' as const,
      label: '纸张老旧度',
      value: paperAge,
      min: 0,
      max: 100,
      step: 1,
      icon: Clock,
    },
  ];

  return (
    <div className="w-full bg-paper/80 backdrop-blur-sm border-2 border-ink/20 rounded-xl p-6 shadow-lg">
      <div className="space-y-6">
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-ink mb-2">
            <Type className="w-4 h-4" />
            文本内容
          </label>
          <textarea
            value={localText}
            onChange={(e) => setLocalText(e.target.value)}
            className="w-full h-32 px-4 py-3 bg-paper border-2 border-ink/30 rounded-lg
                       focus:outline-none focus:ring-2 focus:ring-accent-red/50 focus:border-accent-red
                       resize-none text-ink placeholder-ink/30 transition-colors"
            placeholder="输入要显示的文本..."
          />
        </div>

        <FontSelector
          value={font}
          onChange={(value) => updateSetting('font', value)}
          options={FONTS}
        />

        <div className="space-y-5">
          {sliders.map((slider) => (
            <Slider
              key={slider.key}
              label={slider.label}
              value={slider.value}
              min={slider.min}
              max={slider.max}
              step={slider.step}
              icon={slider.icon}
              onChange={(value) => updateSetting(slider.key, value)}
            />
          ))}
        </div>

        <button
          onClick={handleReset}
          className="w-full flex items-center justify-center gap-2 px-4 py-3
                     bg-ink text-paper rounded-lg font-medium
                     hover:bg-ink/90 active:bg-ink/80 transition-colors
                     focus:outline-none focus:ring-2 focus:ring-ink/50"
        >
          <RotateCcw className="w-4 h-4" />
          重置为默认值
        </button>
      </div>
    </div>
  );
}

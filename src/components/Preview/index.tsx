import React, { forwardRef, useState, useEffect, useCallback, useRef, useImperativeHandle } from 'react';
import { Play, Pause, Gauge, Square } from 'lucide-react';
import PaperBackground from './PaperBackground';
import InkSpots from './InkSpots';
import TypewriterText from './TypewriterText';
import { useSettingsStore } from '../../store/useSettingsStore';
import { useTypewriterEffect } from '../../hooks/useTypewriterEffect';
import { FONTS } from '../../constants/fonts';

export interface PreviewHandle {
  stopAnimation: () => void;
  getContentElement: () => HTMLDivElement | null;
}

const Preview = forwardRef<PreviewHandle>((_, ref) => {
  const settings = useSettingsStore();
  const { renderedChars, inkSpots, paperStyle } = useTypewriterEffect(settings);
  const [isPlaying, setIsPlaying] = useState(false);
  const [visibleCount, setVisibleCount] = useState(renderedChars.length);
  const currentIndexRef = useRef(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const selectedFont = FONTS.find(f => f.id === settings.font) || FONTS[0];
  const delayPerChar = Math.max(10, 200 - settings.typingSpeed * 1.9);

  const clearAnimationInterval = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const stopAnimation = useCallback(() => {
    setIsPlaying(false);
    clearAnimationInterval();
    currentIndexRef.current = 0;
    setVisibleCount(renderedChars.length);
  }, [renderedChars.length, clearAnimationInterval]);

  useImperativeHandle(ref, () => ({
    stopAnimation,
    getContentElement: () => contentRef.current,
  }), [stopAnimation]);

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setVisibleCount(prev => {
          if (prev >= renderedChars.length) {
            clearAnimationInterval();
            setIsPlaying(false);
            currentIndexRef.current = 0;
            return renderedChars.length;
          }
          currentIndexRef.current = prev + 1;
          return prev + 1;
        });
      }, delayPerChar);
    }
    return clearAnimationInterval;
  }, [isPlaying, delayPerChar, renderedChars.length, clearAnimationInterval]);

  useEffect(() => {
    stopAnimation();
  }, [renderedChars.length, stopAnimation]);

  const handlePlay = useCallback(() => {
    if (currentIndexRef.current >= renderedChars.length) {
      currentIndexRef.current = 0;
      setVisibleCount(0);
    }
    setIsPlaying(true);
  }, [renderedChars.length]);

  const handlePause = useCallback(() => {
    setIsPlaying(false);
    clearAnimationInterval();
  }, [clearAnimationInterval]);

  const handleStop = useCallback(() => {
    stopAnimation();
  }, [stopAnimation]);

  const handleSpeedChange = useCallback((value: number) => {
    settings.updateSetting('typingSpeed', value);
  }, [settings]);

  const speedPercentage = ((settings.typingSpeed - 0) / (100 - 0)) * 100;

  const visibleChars = renderedChars.slice(0, visibleCount);

  return (
    <div className="w-full">
      <div className="mb-4 p-4 bg-paper/80 backdrop-blur-sm border-2 border-ink/20 rounded-xl">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            {!isPlaying ? (
              <button
                onClick={handlePlay}
                className="flex items-center gap-2 px-4 py-2 bg-accent-red text-paper rounded-lg font-medium
                         hover:bg-accent-red/90 active:bg-accent-red/80 transition-colors
                         focus:outline-none focus:ring-2 focus:ring-accent-red/50"
              >
                <Play className="w-4 h-4" />
                {currentIndexRef.current > 0 && currentIndexRef.current < renderedChars.length ? '继续' : '播放动画'}
              </button>
            ) : (
              <button
                onClick={handlePause}
                className="flex items-center gap-2 px-4 py-2 bg-ink text-paper rounded-lg font-medium
                         hover:bg-ink/90 active:bg-ink/80 transition-colors
                         focus:outline-none focus:ring-2 focus:ring-ink/50"
              >
                <Pause className="w-4 h-4" />
                暂停
              </button>
            )}
            <button
              onClick={handleStop}
              className="flex items-center gap-2 px-4 py-2 bg-paper border-2 border-ink/30 text-ink rounded-lg font-medium
                       hover:bg-ink/10 active:bg-ink/20 transition-colors
                       focus:outline-none focus:ring-2 focus:ring-ink/30"
              title="停止"
            >
              <Square className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 min-w-[200px]">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Gauge className="w-4 h-4 text-ink" />
                <span className="text-sm font-medium text-ink">打字速度</span>
              </div>
              <span className="text-sm font-mono text-accent-red bg-paper border border-ink/20 px-2 py-0.5 rounded">
                {settings.typingSpeed}
              </span>
            </div>
            <div className="relative">
              <input
                type="range"
                min={0}
                max={100}
                step={1}
                value={settings.typingSpeed}
                onChange={(e) => handleSpeedChange(Number(e.target.value))}
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
                  background: `linear-gradient(to right, #8b2500 0%, #8b2500 ${speedPercentage}%, rgba(61, 43, 31, 0.1) ${speedPercentage}%, rgba(61, 43, 31, 0.1) 100%)`,
                }}
              />
            </div>
            <div className="flex justify-between mt-1 text-xs text-ink/50">
              <span>慢</span>
              <span>快</span>
            </div>
          </div>
        </div>
      </div>

      <div
        ref={contentRef}
        className="w-full max-w-3xl mx-auto print-content"
        style={{ aspectRatio: '3 / 4' }}
      >
        <PaperBackground paperStyle={paperStyle}>
          <InkSpots spots={inkSpots} />
          <TypewriterText
            chars={visibleChars}
            fontFamily={selectedFont.fontFamily}
            fontSize={settings.fontSize}
            ghostIntensity={settings.ghostIntensity}
            isAnimating={isPlaying}
          />
        </PaperBackground>
      </div>
    </div>
  );
});

Preview.displayName = 'Preview';

export default Preview;

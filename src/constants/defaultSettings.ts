import type { EffectSettings } from '../types';
import { FONTS } from './fonts';

export const DEFAULT_SETTINGS: EffectSettings = {
  text: '亲爱的朋友：\n\n当你读到这封信时，时光已经流逝了许多年。那些泛黄的纸页上，记录着我们曾经的梦想与希望。每一个字符都承载着岁月的痕迹，每一滴墨迹都诉说着过往的故事。\n\n愿你安好，\n旧友\n\n1985年深秋',
  font: FONTS[0].id,
  fontSize: 18,
  errorRate: 8,
  ghostIntensity: 15,
  inkDensity: 25,
  misalignment: 12,
  paperAge: 35,
  typingSpeed: 50,
};

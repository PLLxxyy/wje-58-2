import { create } from 'zustand';
import type { EffectSettings } from '../types';
import { DEFAULT_SETTINGS } from '../constants/defaultSettings';

interface SettingsState extends EffectSettings {
  updateSettings: (settings: Partial<EffectSettings>) => void;
  resetSettings: () => void;
  updateSetting: <K extends keyof EffectSettings>(key: K, value: EffectSettings[K]) => void;
}

export const useSettingsStore = create<SettingsState>((set) => ({
  ...DEFAULT_SETTINGS,
  updateSettings: (settings) => set((state) => ({ ...state, ...settings })),
  resetSettings: () => set({ ...DEFAULT_SETTINGS }),
  updateSetting: (key, value) => set((state) => ({ ...state, [key]: value })),
}));

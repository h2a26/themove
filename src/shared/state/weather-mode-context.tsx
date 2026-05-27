'use client';

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { WeatherMode } from '@/shared/theme/shinkaiWeather';
import { getShinkaiWeatherCssVars } from '@/shared/theme/shinkaiWeather';

type WeatherModeContextValue = {
  mode: WeatherMode;
  toggle: () => void;
  setMode: (mode: WeatherMode) => void;
};

const WeatherModeContext = createContext<WeatherModeContextValue | null>(null);

const STORAGE_KEY = 'themove.weatherMode';

export function WeatherModeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setModeState] = useState<WeatherMode>('sunlit');

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw === 'sunlit' || raw === 'rain') setModeState(raw);
    } catch {
      // ignore
    }
  }, []);

  const setMode = (m: WeatherMode) => setModeState(m);
  const toggle = () => setModeState((prev) => (prev === 'sunlit' ? 'rain' : 'sunlit'));

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, mode);
    } catch {
      // ignore
    }
    const vars = getShinkaiWeatherCssVars(mode);
    for (const [k, v] of Object.entries(vars)) {
      document.documentElement.style.setProperty(k, v);
    }
  }, [mode]);

  const value = useMemo(() => ({ mode, toggle, setMode }), [mode]);

  return <WeatherModeContext.Provider value={value}>{children}</WeatherModeContext.Provider>;
}

export function useWeatherMode() {
  const ctx = useContext(WeatherModeContext);
  if (!ctx) throw new Error('useWeatherMode must be used within WeatherModeProvider');
  return ctx;
}


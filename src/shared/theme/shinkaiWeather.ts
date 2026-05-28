export type WeatherMode = 'sunlit' | 'rain';

export type ShinkaiWeatherTheme = {
  surface: {
    bgFrom: string;
    bgVia: string;
    bgTo: string;
    panel: string;
    panelHover: string;
  };
  text: {
    primary: string;
    secondary: string;
    tertiary: string;
    inverse: string;
  };
  border: {
    subtle: string;
    strong: string;
  };
  stroke: {
    primary: string;
    light: string;
    faint: string;
    wood: string;
  };
  particle: {
    color: string;
    glow: string;
    shimmer: string;
  };
  cord: {
    primary: string;
    highlight: string;
    midtone: string;
    shadow: string;
    lightMote: string;
    warmGlow: string;
  };
  toggleIcon: {
    sunlit: string;
    rain: string;
  };
};

const SUNLIT: ShinkaiWeatherTheme = {
  surface: {
    bgFrom: '#ffffff',
    bgVia: '#f8fafc',
    bgTo: 'rgba(224, 242, 254, 0.60)',
    panel: 'rgba(255, 255, 255, 0.72)',
    panelHover: 'rgba(248, 250, 252, 0.88)',
  },
  text: {
    primary: '#1a1a22',
    secondary: '#64748b',
    tertiary: '#94a3b8',
    inverse: '#fafaf8',
  },
  border: {
    subtle: 'rgba(120, 113, 108, 0.12)',
    strong: 'rgba(120, 113, 108, 0.28)',
  },
  stroke: {
    primary: '#78716c',
    light: '#a8a29e',
    faint: '#d6d3d1',
    wood: '#78716c',
  },
  particle: {
    color: 'rgba(251, 191, 36, 0.35)',
    glow: 'rgba(251, 191, 36, 0.08)',
    shimmer: 'rgba(255, 220, 150, 0.1)',
  },
  cord: {
    primary: '#c53030',
    highlight: '#fc8181',
    midtone: '#e53e3e',
    shadow: '#822727',
    lightMote: 'rgba(252, 129, 129, 0.15)',
    warmGlow: 'rgba(197, 48, 48, 0.08)',
  },
  toggleIcon: {
    sunlit: '#f59e0b',
    rain: '#60a5fa',
  },
};

const RAIN: ShinkaiWeatherTheme = {
  surface: {
    bgFrom: '#f1f5f9',
    bgVia: '#e2e8f0',
    bgTo: 'rgba(203, 213, 225, 0.60)',
    panel: 'rgba(241, 245, 249, 0.72)',
    panelHover: 'rgba(226, 232, 240, 0.88)',
  },
  text: {
    primary: '#1a1a22',
    secondary: '#475569',
    tertiary: '#64748b',
    inverse: '#f1f5f9',
  },
  border: {
    subtle: 'rgba(71, 85, 105, 0.14)',
    strong: 'rgba(71, 85, 105, 0.30)',
  },
  stroke: {
    primary: '#475569',
    light: '#64748b',
    faint: '#94a3b8',
    wood: '#57534e',
  },
  particle: {
    color: 'rgba(148, 163, 184, 0.45)',
    glow: 'rgba(148, 163, 184, 0.08)',
    shimmer: 'rgba(150, 180, 220, 0.08)',
  },
  cord: {
    primary: '#9b2c2c',
    highlight: '#e53e3e',
    midtone: '#c53030',
    shadow: '#63171b',
    lightMote: 'rgba(229, 62, 62, 0.10)',
    warmGlow: 'rgba(155, 44, 44, 0.06)',
  },
  toggleIcon: {
    sunlit: '#f59e0b',
    rain: '#60a5fa',
  },
};

export const SHINKAI_WEATHER_THEME: Record<WeatherMode, ShinkaiWeatherTheme> = {
  sunlit: SUNLIT,
  rain: RAIN,
};

export function getShinkaiWeatherTheme(mode: WeatherMode): ShinkaiWeatherTheme {
  return SHINKAI_WEATHER_THEME[mode];
}

export function getShinkaiWeatherCssVars(mode: WeatherMode): Record<string, string> {
  const t = getShinkaiWeatherTheme(mode);
  return {
    '--mode-bg-from': t.surface.bgFrom,
    '--mode-bg-via': t.surface.bgVia,
    '--mode-bg-to': t.surface.bgTo,
    '--mode-surface': t.surface.panel,
    '--mode-text-primary': t.text.primary,
    '--mode-text-secondary': t.text.secondary,
    '--mode-text-tertiary': t.text.tertiary,
    '--mode-text-inverse': t.text.inverse,
    '--mode-border': t.border.subtle,
    '--mode-border-strong': t.border.strong,
    '--mode-stroke-primary': t.stroke.primary,
    '--mode-stroke-light': t.stroke.light,
    '--mode-stroke-faint': t.stroke.faint,
    '--mode-stroke-wood': t.stroke.wood,
    '--mode-shimmer': t.particle.shimmer,
    '--mode-particle': t.particle.color,
    '--mode-particle-glow': t.particle.glow,
    '--mode-cord': t.cord.primary,
  };
}

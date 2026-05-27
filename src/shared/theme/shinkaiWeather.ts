export type WeatherMode = 'sunlit' | 'rain';

export type ShinkaiWeatherTheme = {
  hero: {
    from: string;
    via: string;
    to: string;
  };
  shimmer: string;
  dustMote: string;
  rainDrops: {
    via: string;
    to: string;
  };
  panelBg: string;
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
  hero: {
    from: '#fffdf8',
    via: '#f8f4e8', // warm ivory
    to: 'rgba(246, 240, 222, 0.72)', // warm beige haze
  },
  shimmer: 'rgba(255, 220, 150, 0.1)',
  dustMote: 'rgba(253, 230, 138, 0.4)', // amber-200/40
  rainDrops: {
    via: 'rgba(148, 163, 184, 0.3)', // slate-400/30
    to: 'rgba(148, 163, 184, 0.1)', // slate-400/10
  },
  panelBg: 'rgba(255, 252, 244, 0.68)',
  cord: {
    primary: '#c53030',
    highlight: '#fc8181',
    midtone: '#e53e3e',
    shadow: '#822727',
    lightMote: 'rgba(252, 129, 129, 0.15)',
    warmGlow: 'rgba(197, 48, 48, 0.08)',
  },
  toggleIcon: {
    sunlit: '#f59e0b', // amber-500
    rain: '#60a5fa', // blue-400
  },
};

const RAIN: ShinkaiWeatherTheme = {
  hero: {
    from: '#eef2f7',
    via: '#dbe4ef', // rainy blue-grey
    to: 'rgba(160, 176, 198, 0.5)', // deeper cool cast
  },
  shimmer: 'rgba(150, 180, 220, 0.08)',
  dustMote: 'rgba(253, 230, 138, 0.0)', // unused; keeps shape
  rainDrops: {
    via: 'rgba(148, 163, 184, 0.3)',
    to: 'rgba(148, 163, 184, 0.1)',
  },
  panelBg: 'rgba(226, 235, 246, 0.56)',
  cord: {
    primary: '#9b2c2c',
    highlight: '#e53e3e',
    midtone: '#c53030',
    shadow: '#63171b',
    lightMote: 'rgba(229, 62, 62, 0.1)',
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
    '--shinkai-hero-from': t.hero.from,
    '--shinkai-hero-via': t.hero.via,
    '--shinkai-hero-to': t.hero.to,
    '--shinkai-shimmer': t.shimmer,
    '--shinkai-dust-mote': t.dustMote,
    '--shinkai-rain-via': t.rainDrops.via,
    '--shinkai-rain-to': t.rainDrops.to,
    '--shinkai-panel-bg': t.panelBg,
  };
}


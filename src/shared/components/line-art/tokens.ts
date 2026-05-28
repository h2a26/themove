import type { FrameMood } from '@/shared/components/frames/types';

export const STROKE_WEIGHT = {
  faint: 0.3,
  light: 0.5,
  medium: 0.8,
  structural: 1.2,
  bold: 1.5,
} as const;

export const SHINKAI_EASE = [0.43, 0.13, 0.23, 0.96] as const;

export function getHeroStrokes(weatherMode: 'sunlit' | 'rain') {
  return {
    primary: weatherMode === 'sunlit' ? '#78716c' : '#475569',
    light:   weatherMode === 'sunlit' ? '#a8a29e' : '#64748b',
    faint:   weatherMode === 'sunlit' ? '#d6d3d1' : '#94a3b8',
    wood:    weatherMode === 'sunlit' ? '#78716c' : '#57534e',
  };
}

export function getFrameStrokes(mood: FrameMood) {
  const heritage =
    mood === 'traditional-golden' ||
    mood === 'paris-morning'      ||
    mood === 'winter-still'       ||
    mood === 'mandalay-warm'      ||
    mood === 'hill-station-calm';

  if (heritage) {
    return {
      primary: mood === 'winter-still'      ? '#94a3b8' : '#78716c',
      light:   mood === 'traditional-golden'? '#a8a29e' : '#94a3b8',
      faint:   '#cbd5e1',
      wood:    '#78716c',
    };
  }

  return {
    primary: mood === 'london-mist' ? '#64748b' : '#475569',
    light:   '#94a3b8',
    faint:   '#cbd5e1',
    wood:    '#64748b',
  };
}

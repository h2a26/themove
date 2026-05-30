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


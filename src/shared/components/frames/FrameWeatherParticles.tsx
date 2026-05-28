'use client';

import { AtmosphereLayer, getAtmosphereVariant } from '@/shared/components/line-art/AtmosphereLayer';
import type { FrameMood } from './types';

type FrameWeatherParticlesProps = {
  mood: FrameMood;
  opacity: number;
};

/** Weather/light layer for Scroll of Spaces Option 3 linger */
export function FrameWeatherParticles({ mood, opacity }: FrameWeatherParticlesProps) {
  return <AtmosphereLayer variant={getAtmosphereVariant(mood)} opacity={opacity} />;
}

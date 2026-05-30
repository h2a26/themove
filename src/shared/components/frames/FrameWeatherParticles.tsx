'use client';

import { AtmosphereLayer } from '@/shared/components/line-art/AtmosphereLayer';
import type { AtmosphereVariant } from '@/shared/components/line-art/AtmosphereLayer';

type FrameWeatherParticlesProps = {
  variant: AtmosphereVariant;
  opacity: number;
};

/** Weather/light layer for Scroll of Spaces Option 3 linger */
export function FrameWeatherParticles({ variant, opacity }: FrameWeatherParticlesProps) {
  return <AtmosphereLayer variant={variant} opacity={opacity} />;
}

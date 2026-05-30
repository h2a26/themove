import type { FrameArchetype, ProjectFrameMetadata } from '@/shared/components/frames/types';
import type { AtmosphereVariant } from '@/shared/components/line-art/AtmosphereLayer';

const ARCHETYPE_ATMOSPHERE: Record<Exclude<FrameArchetype, 'auto'>, AtmosphereVariant> = {
  heritage:           'golden',
  urban:              'blueHour',
  threshold:          'golden',
  'interior-chamber': 'mist',
  garden:             'mist',
  'hospitality-glow': 'golden',
};

export function resolveFrameArchetype(meta: ProjectFrameMetadata): Exclude<FrameArchetype, 'auto'> {
  if (meta.frameArchetype && meta.frameArchetype !== 'auto') return meta.frameArchetype;
  return 'interior-chamber';
}

export function resolveAtmosphereVariant(archetype: Exclude<FrameArchetype, 'auto'>): AtmosphereVariant {
  return ARCHETYPE_ATMOSPHERE[archetype];
}

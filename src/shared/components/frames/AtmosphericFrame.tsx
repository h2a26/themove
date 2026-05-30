'use client';

import type { ComponentType } from 'react';
import { resolveFrameArchetype } from '@/shared/lib/assign-frame-mood';
import { GardenFrame } from './GardenFrame';
import { HeritageFrame } from './HeritageFrame';
import { HospitalityGlowFrame } from './HospitalityGlowFrame';
import { InteriorChamberFrame } from './InteriorChamberFrame';
import { ThresholdFrame } from './ThresholdFrame';
import { UrbanFrame } from './UrbanFrame';
import type { FrameArchetype, ProjectFrameMetadata } from './types';
import type { FrameComponentProps } from './frame-props';

const FRAME_BY_ARCHETYPE: Record<
  Exclude<FrameArchetype, 'auto'>,
  ComponentType<FrameComponentProps>
> = {
  heritage: HeritageFrame,
  urban: UrbanFrame,
  threshold: ThresholdFrame,
  'interior-chamber': InteriorChamberFrame,
  garden: GardenFrame,
  'hospitality-glow': HospitalityGlowFrame,
};

type AtmosphericFrameProps = {
  drawProgress: number;
  useMountAnimation?: boolean;
  className?: string;
  archetype?: FrameArchetype | 'auto';
  meta?: ProjectFrameMetadata;
};

/** Routes metadata → templated frame SVG (6 archetypes) */
export function AtmosphericFrame({
  drawProgress,
  useMountAnimation = false,
  className = '',
  archetype,
  meta,
}: AtmosphericFrameProps) {
  const resolved: Exclude<FrameArchetype, 'auto'> =
    archetype && archetype !== 'auto'
      ? archetype
      : resolveFrameArchetype(meta ?? { title: '' });

  const Frame = FRAME_BY_ARCHETYPE[resolved];

  return (
    <div className={`absolute inset-0 ${className}`}>
      <Frame drawProgress={drawProgress} useMountAnimation={useMountAnimation} />
    </div>
  );
}

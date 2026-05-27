'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { AtmosphericFrame } from '@/shared/components/frames/AtmosphericFrame';
import { assignFrameMood, resolveFrameArchetype } from '@/shared/lib/assign-frame-mood';
import type {
  FrameArchetype,
  FrameMood,
  FrameStyle,
  ProjectCategory,
} from '@/shared/components/frames/types';
import { DETAIL_OPENING_TRANSITION } from '@/shared/lib/frame-transitions';
import { useDrawProgress } from '@/shared/hooks/useDrawProgress';
import { usePrefersReducedMotion } from '@/shared/hooks/usePrefersReducedMotion';

type ProjectOpeningRevealProps = {
  image: string;
  aspect: string;
  caption?: string;
  location?: string;
  style?: FrameStyle;
  category?: ProjectCategory;
  moodTags?: string[];
  frameArchetype?: FrameArchetype | 'auto';
};

type OpeningPhase = 'draw' | 'dissolve' | 'done';

/**
 * Project detail opening — Option 2:
 * facade line art draws once, then fully dissolves into the first photograph.
 */
export function ProjectOpeningReveal({
  image,
  aspect,
  caption,
  location,
  style,
  category,
  moodTags,
  frameArchetype,
}: ProjectOpeningRevealProps) {
  const reducedMotion = usePrefersReducedMotion();
  const [phase, setPhase] = useState<OpeningPhase>(reducedMotion ? 'done' : 'draw');

  const frameMeta = {
    title: caption ?? '',
    location,
    style,
    category,
    moodTags,
    frameArchetype,
    mood: moodTags?.join(' '),
  };
  const mood: FrameMood = assignFrameMood(frameMeta);
  const archetype = resolveFrameArchetype(frameMeta);

  useEffect(() => {
    if (reducedMotion) {
      setPhase('done');
      return;
    }

    const { drawMs, dissolveMs } = DETAIL_OPENING_TRANSITION;
    const t1 = window.setTimeout(() => setPhase('dissolve'), drawMs);
    const t2 = window.setTimeout(() => setPhase('done'), drawMs + dissolveMs);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [reducedMotion]);

  const aspectClass = aspect === 'landscape' ? 'aspect-[16/10]' : 'aspect-[9/13]';
  const drawProgress = useDrawProgress(phase === 'draw', DETAIL_OPENING_TRANSITION.drawMs);
  const showFrame = phase !== 'done' && !reducedMotion;
  const frameOpacity = phase === 'dissolve' ? 0 : 1;
  const photoOpacity = phase === 'done' || reducedMotion ? 1 : phase === 'dissolve' ? 1 : 0;

  return (
    <div className={`relative w-full ${aspectClass}`}>
      <Image
        src={image}
        alt={caption || ''}
        className="h-full w-full object-cover transition-opacity duration-1000 ease-out"
        style={{
          opacity: photoOpacity,
          transitionTimingFunction: 'cubic-bezier(0.43, 0.13, 0.23, 0.96)',
        }}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 75vw, 50vw"
        priority
      />

      {showFrame && (
        <div
          className="absolute inset-0 transition-opacity duration-1000 ease-out"
          style={{
            opacity: frameOpacity,
            transitionTimingFunction: 'cubic-bezier(0.43, 0.13, 0.23, 0.96)',
          }}
        >
          <AtmosphericFrame
            mood={mood}
            archetype={frameArchetype ?? archetype}
            meta={frameMeta}
            drawProgress={drawProgress}
          />
        </div>
      )}

      {caption && (
        <div
          className="absolute inset-0 flex items-center justify-center bg-black/30 px-4 text-center transition-opacity duration-700"
          style={{ opacity: phase === 'done' || phase === 'dissolve' ? 1 : 0.5 }}
        >
          <p
            className="text-sm uppercase font-extrabold tracking-[0.2em] text-white md:text-xl lg:text-2xl"
            style={{ fontFamily: 'var(--font-acaslon-pro)' }}
          >
            {caption}
          </p>
        </div>
      )}
    </div>
  );
}

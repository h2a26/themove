'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { AtmosphericFrame } from '@/shared/components/frames/AtmosphericFrame';
import { FrameWeatherParticles } from '@/shared/components/frames/FrameWeatherParticles';
import { assignFrameMood, resolveFrameArchetype } from '@/shared/lib/assign-frame-mood';
import { SCROLL_TRANSITION } from '@/shared/lib/frame-transitions';
import { useDrawProgress } from '@/shared/hooks/useDrawProgress';
import { usePrefersReducedMotion } from '@/shared/hooks/usePrefersReducedMotion';
import type { ProjectFrameMetadata } from '@/shared/components/frames/types';

type VignettePhase = 'idle' | 'draw' | 'dissolve' | 'linger' | 'reveal' | 'done';

export type SpaceVignetteProps = ProjectFrameMetadata & {
  image: string;
  routeTo: string;
  description?: string;
};

/**
 * Scroll of Spaces vignette — Option 3:
 * architectural lines dissolve; weather lingers; photo reaches full clarity.
 */
export function SpaceVignette({ title, image, routeTo, description, ...meta }: SpaceVignetteProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-15% 0px' });
  const reducedMotion = usePrefersReducedMotion();
  const frameMeta = { title, ...meta, mood: meta.moodTags?.join(' ') };
  const mood = assignFrameMood(frameMeta);
  const archetype = resolveFrameArchetype(frameMeta);

  const [phase, setPhase] = useState<VignettePhase>('idle');
  const drawProgress = useDrawProgress(phase === 'draw', SCROLL_TRANSITION.drawMs);

  useEffect(() => {
    if (!inView) return;

    if (reducedMotion) {
      setPhase('done');
      return;
    }

    const { drawMs, linesDissolveMs, weatherLingerMs, photoRevealMs, weatherFadeMs } =
      SCROLL_TRANSITION;

    setPhase('draw');

    const t1 = window.setTimeout(() => setPhase('dissolve'), drawMs);
    const t2 = window.setTimeout(() => setPhase('linger'), drawMs + linesDissolveMs);
    const t3 = window.setTimeout(
      () => setPhase('reveal'),
      drawMs + linesDissolveMs + weatherLingerMs * 0.5,
    );
    const t4 = window.setTimeout(
      () => setPhase('done'),
      drawMs + linesDissolveMs + weatherLingerMs + photoRevealMs + weatherFadeMs,
    );

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [inView, reducedMotion]);

  const linesOpacity =
    phase === 'dissolve' || phase === 'linger' || phase === 'reveal' || phase === 'done' ? 0 : 1;
  const showLines = (phase === 'draw' || phase === 'dissolve') && !reducedMotion;
  const weatherOpacity =
    phase === 'linger' || phase === 'reveal'
      ? phase === 'reveal'
        ? 0.35
        : 1
      : phase === 'done' || reducedMotion
        ? 0
        : phase === 'dissolve'
          ? 1
          : 0;

  const photoOpacity =
    phase === 'done' || reducedMotion
      ? 1
      : phase === 'reveal' || phase === 'linger'
        ? phase === 'reveal'
          ? 1
          : 0.5
        : 0;

  const textVisible =
    phase === 'draw' ||
    phase === 'dissolve' ||
    phase === 'linger' ||
    phase === 'reveal' ||
    phase === 'done';

  const showDescription =
    description && (phase === 'draw' || phase === 'dissolve' || phase === 'linger');

  return (
    <article ref={ref} className="flex min-h-[92vh] items-center justify-center px-4 py-20 md:py-28">
      <Link href={routeTo} className="group block w-full max-w-4xl">
        <div className="relative mx-auto aspect-[4/5] w-full overflow-hidden rounded-sm bg-white/40 shadow-sm md:aspect-[16/10] md:max-h-[72vh]">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-opacity duration-700 ease-out"
            style={{ opacity: photoOpacity, transitionTimingFunction: 'cubic-bezier(0.43, 0.13, 0.23, 0.96)' }}
            sizes="(max-width: 768px) 100vw, 896px"
          />

          {showLines && (
            <div
              className="absolute inset-0 transition-opacity duration-700 ease-out"
              style={{
                opacity: linesOpacity,
                transitionTimingFunction: 'cubic-bezier(0.43, 0.13, 0.23, 0.96)',
              }}
            >
              <AtmosphericFrame
                mood={mood}
                archetype={meta.frameArchetype ?? archetype}
                meta={frameMeta}
                drawProgress={drawProgress}
              />
            </div>
          )}

          {(weatherOpacity > 0 || phase === 'dissolve') && phase !== 'done' && !reducedMotion && (
            <FrameWeatherParticles mood={mood} opacity={weatherOpacity} />
          )}

          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-deep-black/55 to-transparent px-6 pb-8 pt-20 transition-opacity duration-500"
            style={{ opacity: textVisible ? 1 : 0 }}
          >
            <h2
              className="text-center text-sm uppercase tracking-[0.25em] text-white md:text-base"
              style={{ fontFamily: 'var(--font-euclid)' }}
            >
              {title}
            </h2>
            {showDescription && (
              <p
                className="mt-3 text-center text-xs leading-relaxed tracking-wide text-white/80 md:text-sm max-w-md mx-auto"
                style={{ fontFamily: 'var(--font-allrounder-antiqua)' }}
              >
                {description}
              </p>
            )}
          </div>
        </div>

        <p
          className="mt-6 text-center text-xs uppercase tracking-[0.2em] text-deep-gray opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ fontFamily: 'var(--font-euclid)' }}
        >
          View project
        </p>
      </Link>
    </article>
  );
}

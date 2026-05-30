'use client';

import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { AnimatedPath } from '@/shared/components/line-art/AnimatedPath';
import { STROKE_WEIGHT } from '@/shared/components/line-art/tokens';
import { usePrefersReducedMotion } from '@/shared/hooks/usePrefersReducedMotion';
import type { ProjectCategory } from '@/shared/components/frames/types';
import type { ChapterDefinition } from '@/shared/lib/group-catalogue-by-chapter';

type ChapterInterstitialProps = {
  chapter: ChapterDefinition;
};

const S = {
  primary: 'var(--mode-stroke-primary)',
  light: 'var(--mode-stroke-light)',
  faint: 'var(--mode-stroke-faint)',
  wood: 'var(--mode-stroke-wood)',
} as const;

function ChapterIcon({
  category,
  inView,
  reducedMotion,
}: {
  category: ProjectCategory;
  inView: boolean;
  reducedMotion: boolean;
}) {
  const shouldDraw = inView || reducedMotion;

  // Reserve layout space before section enters viewport
  if (!shouldDraw) {
    return <svg viewBox="0 0 160 120" className="mx-auto h-36 w-48" aria-hidden />;
  }

  // useMountAnimation fires on mount — paths mount only when shouldDraw becomes true
  const mount = !reducedMotion;
  const dp = 1; // drawProgress for static reduced-motion render (ignored when mount=true)

  if (category === 'residential') {
    return (
      <svg viewBox="0 0 160 120" className="mx-auto h-36 w-48" aria-hidden>
        <g fill="none" strokeLinecap="round" strokeLinejoin="round">
          {/* — far layer — */}
          <AnimatedPath
            d="M 0 72 Q 25 54, 48 64 Q 68 42, 95 58 Q 118 46, 140 55 L 160 62"
            stroke={S.faint}
            strokeWidth={STROKE_WEIGHT.faint}
            opacity={0.28}
            useMountAnimation={mount}
            drawProgress={dp}
            duration={0.6}
            delay={0.0}
          />
          <AnimatedPath
            d="M 146 74 L 146 50"
            stroke={S.wood}
            strokeWidth={STROKE_WEIGHT.faint}
            opacity={0.30}
            useMountAnimation={mount}
            drawProgress={dp}
            duration={0.4}
            delay={0.5}
          />
          <AnimatedPath
            d="M 138 59 L 146 48 L 154 59"
            stroke={S.wood}
            strokeWidth={STROKE_WEIGHT.faint}
            opacity={0.30}
            useMountAnimation={mount}
            drawProgress={dp}
            duration={0.4}
            delay={0.65}
          />
          {/* — mid layer — */}
          <AnimatedPath
            d="M 24 74 L 80 46 L 136 74"
            stroke={S.primary}
            strokeWidth={STROKE_WEIGHT.bold}
            opacity={1.0}
            useMountAnimation={mount}
            drawProgress={dp}
            duration={0.55}
            delay={1.0}
          />
          <AnimatedPath
            d="M 30 74 L 30 100 L 130 100 L 130 74"
            stroke={S.primary}
            strokeWidth={STROKE_WEIGHT.medium}
            opacity={1.0}
            useMountAnimation={mount}
            drawProgress={dp}
            duration={0.45}
            delay={1.4}
          />
          <AnimatedPath
            d="M 24 95 L 136 95"
            stroke={S.wood}
            strokeWidth={STROKE_WEIGHT.light}
            opacity={0.78}
            useMountAnimation={mount}
            drawProgress={dp}
            duration={0.35}
            delay={1.7}
          />
          {/* — near layer — */}
          <AnimatedPath
            d="M 38 77 L 38 93 L 56 93 L 56 77 Z"
            stroke={S.light}
            strokeWidth={STROKE_WEIGHT.faint}
            opacity={0.48}
            useMountAnimation={mount}
            drawProgress={dp}
            duration={0.3}
            delay={2.0}
          />
          <AnimatedPath
            d="M 64 77 L 64 93 L 82 93 L 82 77 Z"
            stroke={S.light}
            strokeWidth={STROKE_WEIGHT.faint}
            opacity={0.48}
            useMountAnimation={mount}
            drawProgress={dp}
            duration={0.3}
            delay={2.2}
          />
          <AnimatedPath
            d="M 52 116 Q 80 110, 108 108"
            stroke={S.faint}
            strokeWidth={STROKE_WEIGHT.light}
            opacity={0.45}
            useMountAnimation={mount}
            drawProgress={dp}
            duration={0.3}
            delay={2.45}
          />
          <AnimatedPath
            d="M 13 116 L 13 80"
            stroke={S.wood}
            strokeWidth={STROKE_WEIGHT.medium}
            opacity={0.72}
            useMountAnimation={mount}
            drawProgress={dp}
            duration={0.4}
            delay={2.6}
          />
          <AnimatedPath
            d="M 4 89 L 13 78 L 22 89"
            stroke={S.wood}
            strokeWidth={STROKE_WEIGHT.medium}
            opacity={0.65}
            useMountAnimation={mount}
            drawProgress={dp}
            duration={0.35}
            delay={2.8}
          />
          <AnimatedPath
            d="M 6 97 L 13 88 L 20 97"
            stroke={S.wood}
            strokeWidth={STROKE_WEIGHT.light}
            opacity={0.55}
            useMountAnimation={mount}
            drawProgress={dp}
            duration={0.35}
            delay={3.0}
          />
        </g>
      </svg>
    );
  }

  if (category === 'commercial') {
    return (
      <svg viewBox="0 0 160 120" className="mx-auto h-36 w-48" aria-hidden>
        <g fill="none" strokeLinecap="round" strokeLinejoin="round">
          {/* — far layer — */}
          <AnimatedPath
            d="M 118 80 L 118 30 L 138 30 L 138 80"
            stroke={S.faint}
            strokeWidth={STROKE_WEIGHT.faint}
            opacity={0.25}
            useMountAnimation={mount}
            drawProgress={dp}
            duration={0.55}
            delay={0.0}
          />
          <AnimatedPath
            d="M 0 45 Q 40 48, 80 43 Q 120 38, 160 42"
            stroke={S.faint}
            strokeWidth={STROKE_WEIGHT.faint}
            opacity={0.35}
            useMountAnimation={mount}
            drawProgress={dp}
            duration={0.55}
            delay={0.25}
          />
          <AnimatedPath
            d="M 0 55 Q 40 58, 80 52 Q 120 47, 160 51"
            stroke={S.faint}
            strokeWidth={STROKE_WEIGHT.faint}
            opacity={0.30}
            useMountAnimation={mount}
            drawProgress={dp}
            duration={0.55}
            delay={0.4}
          />
          {/* — mid layer — */}
          <AnimatedPath
            d="M 20 90 L 20 38 L 100 38 L 100 90"
            stroke={S.light}
            strokeWidth={STROKE_WEIGHT.medium}
            opacity={0.65}
            useMountAnimation={mount}
            drawProgress={dp}
            duration={0.6}
            delay={0.6}
          />
          <AnimatedPath
            d="M 28 48 L 28 60 L 42 60 L 42 48 Z"
            stroke={S.light}
            strokeWidth={STROKE_WEIGHT.faint}
            opacity={0.45}
            useMountAnimation={mount}
            drawProgress={dp}
            duration={0.25}
            delay={0.85}
          />
          <AnimatedPath
            d="M 52 48 L 52 60 L 66 60 L 66 48 Z"
            stroke={S.light}
            strokeWidth={STROKE_WEIGHT.faint}
            opacity={0.45}
            useMountAnimation={mount}
            drawProgress={dp}
            duration={0.25}
            delay={1.0}
          />
          <AnimatedPath
            d="M 76 48 L 76 60 L 90 60 L 90 48 Z"
            stroke={S.light}
            strokeWidth={STROKE_WEIGHT.faint}
            opacity={0.45}
            useMountAnimation={mount}
            drawProgress={dp}
            duration={0.25}
            delay={1.15}
          />
          <AnimatedPath
            d="M 20 70 L 100 70"
            stroke={S.faint}
            strokeWidth={STROKE_WEIGHT.faint}
            opacity={0.4}
            useMountAnimation={mount}
            drawProgress={dp}
            duration={0.25}
            delay={1.3}
          />
          {/* — near layer — */}
          <AnimatedPath
            d="M 38 90 L 38 76 L 62 76 L 62 90"
            stroke={S.primary}
            strokeWidth={STROKE_WEIGHT.medium}
            opacity={1.0}
            useMountAnimation={mount}
            drawProgress={dp}
            duration={0.4}
            delay={1.6}
          />
          <AnimatedPath
            d="M 30 76 Q 50 68, 70 76"
            stroke={S.wood}
            strokeWidth={STROKE_WEIGHT.light}
            opacity={0.85}
            useMountAnimation={mount}
            drawProgress={dp}
            duration={0.35}
            delay={1.9}
          />
          <AnimatedPath
            d="M 0 90 Q 80 92, 160 90"
            stroke={S.faint}
            strokeWidth={STROKE_WEIGHT.faint}
            opacity={0.5}
            useMountAnimation={mount}
            drawProgress={dp}
            duration={0.4}
            delay={2.1}
          />
        </g>
      </svg>
    );
  }

  // hospitality
  return (
    <svg viewBox="0 0 160 120" className="mx-auto h-36 w-48" aria-hidden>
      <g fill="none" strokeLinecap="round" strokeLinejoin="round">
        {/* — far layer — */}
        <AnimatedPath
          d="M 90 78 L 90 52 L 150 52 L 150 78"
          stroke={S.faint}
          strokeWidth={STROKE_WEIGHT.faint}
          opacity={0.30}
          useMountAnimation={mount}
          drawProgress={dp}
          duration={0.5}
          delay={0.0}
        />
        <AnimatedPath
          d="M 18 110 Q 20 90, 16 72 Q 14 60, 18 48"
          stroke={S.wood}
          strokeWidth={STROKE_WEIGHT.light}
          opacity={0.38}
          useMountAnimation={mount}
          drawProgress={dp}
          duration={0.5}
          delay={0.25}
        />
        <AnimatedPath
          d="M 8 60 Q 18 44, 28 52 Q 32 42, 18 36 Q 8 48, 8 60"
          stroke={S.wood}
          strokeWidth={STROKE_WEIGHT.faint}
          opacity={0.35}
          useMountAnimation={mount}
          drawProgress={dp}
          duration={0.5}
          delay={0.45}
        />
        {/* — mid layer — */}
        <AnimatedPath
          d="M 36 100 L 36 52 L 120 52 L 120 100"
          stroke={S.primary}
          strokeWidth={STROKE_WEIGHT.medium}
          opacity={1.0}
          useMountAnimation={mount}
          drawProgress={dp}
          duration={0.6}
          delay={0.65}
        />
        <AnimatedPath
          d="M 28 52 Q 78 32, 128 52"
          stroke={S.primary}
          strokeWidth={STROKE_WEIGHT.medium}
          opacity={0.88}
          useMountAnimation={mount}
          drawProgress={dp}
          duration={0.5}
          delay={0.9}
        />
        {/* — near layer — */}
        <AnimatedPath
          d="M 60 52 L 60 64"
          stroke={S.wood}
          strokeWidth={STROKE_WEIGHT.light}
          opacity={1.0}
          useMountAnimation={mount}
          drawProgress={dp}
          duration={0.25}
          delay={1.2}
        />
        <AnimatedPath
          d="M 56 64 Q 60 70, 64 64"
          stroke={S.wood}
          strokeWidth={STROKE_WEIGHT.light}
          opacity={0.9}
          useMountAnimation={mount}
          drawProgress={dp}
          duration={0.25}
          delay={1.35}
        />
        <AnimatedPath
          d="M 96 52 L 96 64"
          stroke={S.wood}
          strokeWidth={STROKE_WEIGHT.light}
          opacity={1.0}
          useMountAnimation={mount}
          drawProgress={dp}
          duration={0.25}
          delay={1.5}
        />
        <AnimatedPath
          d="M 92 64 Q 96 70, 100 64"
          stroke={S.wood}
          strokeWidth={STROKE_WEIGHT.light}
          opacity={0.9}
          useMountAnimation={mount}
          drawProgress={dp}
          duration={0.25}
          delay={1.65}
        />
        <AnimatedPath
          d="M 58 100 L 58 88 L 98 88 L 98 100"
          stroke={S.primary}
          strokeWidth={STROKE_WEIGHT.light}
          opacity={0.85}
          useMountAnimation={mount}
          drawProgress={dp}
          duration={0.35}
          delay={1.85}
        />
        <AnimatedPath
          d="M 48 116 Q 78 108, 108 110"
          stroke={S.faint}
          strokeWidth={STROKE_WEIGHT.faint}
          opacity={0.5}
          useMountAnimation={mount}
          drawProgress={dp}
          duration={0.35}
          delay={2.1}
        />
        <AnimatedPath
          d="M 66 86 Q 64 80, 68 74"
          stroke={S.light}
          strokeWidth={STROKE_WEIGHT.faint}
          opacity={0.28}
          useMountAnimation={mount}
          drawProgress={dp}
          duration={0.4}
          delay={2.35}
        />
        <AnimatedPath
          d="M 90 86 Q 92 78, 88 72"
          stroke={S.light}
          strokeWidth={STROKE_WEIGHT.faint}
          opacity={0.22}
          useMountAnimation={mount}
          drawProgress={dp}
          duration={0.4}
          delay={2.55}
        />
      </g>
    </svg>
  );
}

export function ChapterInterstitial({ chapter }: ChapterInterstitialProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-20% 0px' });
  const reducedMotion = usePrefersReducedMotion();

  return (
    <section
      ref={ref}
      className="flex min-h-[55vh] flex-col items-center justify-center px-6 py-24"
      aria-label={`${chapter.subtitle} chapter`}
    >
      <ChapterIcon category={chapter.categorySlug} inView={inView} reducedMotion={reducedMotion} />
      <p
        className="mt-8 text-center text-[0.65rem] uppercase tracking-[0.35em] text-[var(--mode-text-tertiary)]"
        style={{ fontFamily: 'var(--font-euclid)' }}
      >
        {chapter.subtitle}
      </p>
      <h2
        className="mt-3 text-center text-xl tracking-[0.12em] text-[var(--mode-text-secondary)] md:text-2xl"
        style={{ fontFamily: 'var(--font-acaslon-pro)' }}
      >
        {chapter.title}
      </h2>
    </section>
  );
}

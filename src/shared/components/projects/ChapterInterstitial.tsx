'use client';

import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { AnimatedLine, AnimatedPath } from '@/shared/components/line-art/AnimatedPath';
import { STROKE_WEIGHT } from '@/shared/components/line-art/tokens';
import { useDrawProgress } from '@/shared/hooks/useDrawProgress';
import { usePrefersReducedMotion } from '@/shared/hooks/usePrefersReducedMotion';
import type { ProjectCategory } from '@/shared/components/frames/types';
import type { ChapterDefinition } from '@/shared/lib/group-catalogue-by-chapter';

type ChapterInterstitialProps = {
  chapter: ChapterDefinition;
};

function ChapterIcon({
  category,
  drawProgress,
}: {
  category: ProjectCategory;
  drawProgress: number;
}) {
  const stroke = 'var(--mode-stroke-primary)';

  if (category === 'residential') {
    return (
      <svg viewBox="0 0 80 64" className="mx-auto h-16 w-20" aria-hidden>
        <g fill="none" stroke={stroke} strokeLinecap="round">
          <AnimatedPath
            d="M 10 50 L 40 22 L 70 50 L 70 58 L 10 58 Z"
            stroke={stroke}
            strokeWidth={STROKE_WEIGHT.medium}
            drawProgress={drawProgress}
            delay={0.1}
          />
          <AnimatedPath
            d="M 28 58 L 28 38 L 52 38 L 52 58"
            stroke={stroke}
            strokeWidth={STROKE_WEIGHT.light}
            drawProgress={drawProgress}
            delay={0.35}
          />
        </g>
      </svg>
    );
  }

  if (category === 'commercial') {
    return (
      <svg viewBox="0 0 80 64" className="mx-auto h-16 w-20" aria-hidden>
        <g fill="none" stroke={stroke} strokeLinecap="round">
          <AnimatedPath
            d="M 12 50 L 12 28 L 68 28 L 68 50"
            stroke={stroke}
            strokeWidth={STROKE_WEIGHT.medium}
            drawProgress={drawProgress}
            delay={0.1}
          />
          <AnimatedPath
            d="M 8 28 L 40 16 L 72 28"
            stroke={stroke}
            strokeWidth={STROKE_WEIGHT.medium}
            drawProgress={drawProgress}
            delay={0.25}
          />
          <AnimatedLine
            x1={40}
            y1={36}
            x2={40}
            y2={50}
            stroke={stroke}
            strokeWidth={STROKE_WEIGHT.light}
            drawProgress={drawProgress}
            delay={0.45}
          />
        </g>
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 80 64" className="mx-auto h-16 w-20" aria-hidden>
      <g fill="none" stroke={stroke} strokeLinecap="round">
        <AnimatedPath
          d="M 16 50 L 16 32 Q 40 22, 64 32 L 64 50"
          stroke={stroke}
          strokeWidth={STROKE_WEIGHT.medium}
          drawProgress={drawProgress}
          delay={0.1}
        />
        <AnimatedPath
          d="M 32 38 Q 32 28, 40 24 Q 48 28, 48 38"
          stroke={stroke}
          strokeWidth={STROKE_WEIGHT.light}
          drawProgress={drawProgress}
          delay={0.35}
        />
        <AnimatedLine
          x1={28}
          y1={44}
          x2={52}
          y2={44}
          stroke={stroke}
          strokeWidth={STROKE_WEIGHT.faint}
          drawProgress={drawProgress}
          delay={0.5}
        />
      </g>
    </svg>
  );
}

export function ChapterInterstitial({ chapter }: ChapterInterstitialProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-20% 0px' });
  const reducedMotion = usePrefersReducedMotion();
  const drawProgress = useDrawProgress(inView && !reducedMotion, 1800);

  return (
    <section
      ref={ref}
      className="flex min-h-[55vh] flex-col items-center justify-center px-6 py-24"
      aria-label={`${chapter.subtitle} chapter`}
    >
      <ChapterIcon category={chapter.category} drawProgress={reducedMotion ? 1 : drawProgress} />
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

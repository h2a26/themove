'use client';

import { useEffect, useState } from 'react';

/** Animates 0 → 1 over `durationMs` when `active` is true */
export function useDrawProgress(active: boolean, durationMs: number): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!active) {
      setProgress(0);
      return;
    }

    let start: number | null = null;
    let frame: number;

    const tick = (time: number) => {
      if (start === null) start = time;
      const p = Math.min((time - start) / durationMs, 1);
      setProgress(p);
      if (p < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, durationMs]);

  return progress;
}

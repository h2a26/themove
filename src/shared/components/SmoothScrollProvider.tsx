'use client';

import { ReactNode, useEffect } from 'react';
import Lenis from 'lenis';

type Props = {
  children: ReactNode;
};

export const SmoothScrollProvider = ({ children }: Props) => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // custom ease for luxury smoothness
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
};

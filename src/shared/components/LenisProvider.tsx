'use client'

import React, { ReactNode, useRef, useEffect } from 'react';
import Lenis from 'lenis';
import { usePathname } from 'next/navigation';

type Props = { children: ReactNode };

export const LenisProvider = ({ children }: Props) => {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2, // Slightly softer
      easing: (t: number) => 1 - Math.pow(1 - t, 5), // slightly deeper easing curve
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 1.2, // smoother feeling on touchpads
      wheelMultiplier: 0.9, // make scroll a bit softer on mouse wheels
    });

    lenisRef.current = lenis;

    const raf = (time: number) => {
      lenisRef.current?.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    lenisRef.current?.scrollTo(0, { immediate: true });
  }, [pathname]);

  return <>{children}</>;
};

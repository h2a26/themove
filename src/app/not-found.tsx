'use client';
import Link from 'next/link';
import { MotionWrapper } from '@/shared/components/MotionWrapper';

export default function NotFound() {
  return (
    <MotionWrapper>
      <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4 text-center">
        <h1 className="text-4xl font-light tracking-wide text-deep-black"
            style={{ fontFamily: 'var(--font-acaslon-pro, sans-serif)' }}
        >404 – Page Not Found</h1>

        <Link
          href="/"
          className="mt-8 inline-block px-6 py-2 border border-black text-black hover:bg-black hover:text-light-beige transition-all duration-300 rounded-2xl text-sm uppercase tracking-wider"
          style={{ fontFamily: 'var(--font-acaslon-pro, sans-serif)' }}
        >
          Go Home
        </Link>
      </div>
    </MotionWrapper>
  );
}

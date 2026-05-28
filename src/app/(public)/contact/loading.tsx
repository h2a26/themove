'use client';
import Spinner from '@/shared/components/Spinner';

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center pt-40 text-gray-500 animate-pulse">
      <Spinner className="mb-4" size={48} />
      <p className="text-sm tracking-wide">Loading contact...</p>
    </div>
  );
}

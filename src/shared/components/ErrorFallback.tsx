'use client';

import React, { useEffect } from 'react';

interface ErrorFallbackProps {
  error: Error;
  reset: () => void;
  title?: string;
  message?: string;
  onFullReset?: () => void;
}

const ErrorFallback: React.FC<ErrorFallbackProps> = ({
  error,
  reset,
  title = 'Something went wrong!',
  message,
  onFullReset,
}) => {
  useEffect(() => {
    // Optionally send error to external logging service
    if (error) {
      // Replace with Sentry/LogRocket/etc. if desired
      console.error(error);
    }
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h2 className="text-2xl font-bold text-red-600 mb-4">{title}</h2>
      {message && <p className="mb-2 text-[var(--mode-text-secondary)]">{message}</p>}
      <p className="mb-6 text-[var(--mode-text-secondary)]">{error.message}</p>
      <button
        className="px-6 py-2 bg-deep-earth text-white rounded transition hover:cursor-pointer hover:opacity-90"
        onClick={() => {
          reset();
          onFullReset?.();
        }}
      >
        Try again
      </button>
    </div>
  );
};

export default ErrorFallback;

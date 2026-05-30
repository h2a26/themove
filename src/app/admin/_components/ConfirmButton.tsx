'use client';

import { useState, useTransition } from 'react';
import type { ReactNode } from 'react';

interface Props {
  formAction: (formData: FormData) => Promise<void> | void;
  message: string;
  className?: string;
  children: ReactNode;
}

export function ConfirmButton({ formAction, message, className, children }: Props) {
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();

  function handleConfirm() {
    setOpen(false);
    startTransition(() => formAction(new FormData()));
  }

  return (
    <>
      <button type="button" className={className} onClick={() => setOpen(true)}>
        {children}
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-[2px]"
            onClick={() => setOpen(false)}
          />
          <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-sm px-6 py-5">
            <p className="text-sm text-gray-700 leading-relaxed mb-5">{message}</p>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="px-4 py-1.5 text-sm text-gray-600 hover:text-gray-900 rounded-md hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirm}
                disabled={pending}
                className="px-4 py-1.5 text-sm bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50 transition-colors"
              >
                {pending ? 'Deleting…' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

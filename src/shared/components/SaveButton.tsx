'use client';

import { useState, useTransition } from 'react';
import { Heart } from 'lucide-react';
import { toggleSave } from '@/app/(public)/projects/actions';

interface SaveButtonProps {
  slug: string;
  userId: string | null;
  initialSaved: boolean;
  size?: 'sm' | 'md';
  variant?: 'overlay' | 'inline';
  onSavedChange?: (saved: boolean) => void;
}

export function SaveButton({ slug, userId, initialSaved, size = 'md', variant = 'overlay', onSavedChange }: SaveButtonProps) {
  const [saved, setSaved] = useState(initialSaved);
  const [isPending, startTransition] = useTransition();

  const iconSize = size === 'sm' ? 14 : 16;
  const btnSize  = size === 'sm' ? 'w-8 h-8' : 'w-9 h-9';

  function handleClick(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();

    if (!userId) {
      window.location.href = '/join';
      return;
    }

    const next = !saved;
    setSaved(next);
    onSavedChange?.(next);
    startTransition(async () => {
      try {
        await toggleSave(slug);
      } catch {
        setSaved(!next);
        onSavedChange?.(!next);
      }
    });
  }

  if (variant === 'inline') {
    return (
      <button
        onClick={handleClick}
        disabled={isPending}
        aria-label={saved ? 'Remove from Moodboard' : 'Save to Moodboard'}
        className={`
          flex items-center gap-2 text-[10px] uppercase tracking-[0.28em] transition-colors duration-200 disabled:cursor-wait
          ${saved ? 'text-rose-500' : 'text-[var(--mode-text-primary)]/50 hover:text-[var(--mode-text-primary)]'}
        `}
      >
        <Heart
          size={12}
          strokeWidth={1.8}
          fill={saved ? 'currentColor' : 'none'}
          className={`transition-all duration-150 ${isPending ? 'opacity-40' : ''}`}
        />
        {saved ? 'Saved' : 'Save'}
      </button>
    );
  }

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      aria-label={saved ? 'Remove from Moodboard' : 'Save to Moodboard'}
      title={!userId ? 'Sign in to save' : saved ? 'Remove from Moodboard' : 'Save to Moodboard'}
      className={`
        ${btnSize} flex items-center justify-center rounded-full
        transition-all duration-200 disabled:cursor-wait
        ${saved
          ? 'bg-white/95 text-rose-500 shadow-sm'
          : 'bg-black/25 text-white/70 hover:bg-white/85 hover:text-rose-400 backdrop-blur-sm'
        }
      `}
    >
      <Heart
        size={iconSize}
        strokeWidth={1.8}
        className={`transition-transform duration-150 ${isPending ? 'opacity-40' : 'group-hover:scale-110'}`}
        fill={saved ? 'currentColor' : 'none'}
      />
    </button>
  );
}

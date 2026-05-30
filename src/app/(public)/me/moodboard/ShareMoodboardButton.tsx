'use client';

import { useState, useTransition } from 'react';
import { generateShareLink } from './actions';
import { Link2, Check, Loader2 } from 'lucide-react';

export function ShareMoodboardButton() {
  const [url, setUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [isPending, startTransition] = useTransition();

  function handleShare() {
    startTransition(async () => {
      try {
        const result = await generateShareLink();
        setUrl(result.url);
      } catch {
        // silently ignore — user not authenticated
      }
    });
  }

  function handleCopy() {
    if (!url) return;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  if (url) {
    return (
      <div className="flex items-center gap-2 mt-1">
        <input
          readOnly
          value={url}
          className="flex-1 text-[11px] text-[var(--mode-text-secondary)] bg-[var(--mode-border)]/40 border border-[var(--mode-border)] rounded-lg px-3 py-1.5 truncate focus:outline-none"
        />
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 text-[10px] uppercase tracking-widest text-[var(--mode-text-secondary)] hover:text-[var(--mode-text-primary)] transition-colors px-3 py-1.5 border border-[var(--mode-border)] rounded-lg whitespace-nowrap"
        >
          {copied ? <Check size={11} /> : <Link2 size={11} />}
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={handleShare}
      disabled={isPending}
      className="flex items-center gap-1.5 text-xs text-[var(--mode-text-secondary)] hover:text-[var(--mode-text-primary)] transition-colors disabled:opacity-50"
    >
      {isPending ? <Loader2 size={12} className="animate-spin" /> : <Link2 size={12} />}
      Share Moodboard
    </button>
  );
}

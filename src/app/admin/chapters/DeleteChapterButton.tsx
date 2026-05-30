'use client';

import { deleteChapter } from './actions';

export function DeleteChapterButton({ id, label }: { id: number; label: string }) {
  return (
    <button
      type="submit"
      formAction={deleteChapter.bind(null, id)}
      className="text-xs text-red-400 hover:text-red-600 transition-colors"
      onClick={(e) => {
        if (!confirm(`Delete chapter "${label}"?`)) e.preventDefault();
      }}
    >
      ✕
    </button>
  );
}

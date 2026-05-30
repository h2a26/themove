'use client';

import { deleteCategory } from './actions';

interface Props {
  id: number;
  slug: string;
  projectCount: number;
}

export function DeleteCategoryButton({ id, slug, projectCount }: Props) {
  const disabled = projectCount > 0;
  const title = disabled
    ? `${projectCount} project${projectCount === 1 ? '' : 's'} use this category — reassign them first`
    : `Delete "${slug}"`;

  return (
    <button
      type="submit"
      formAction={deleteCategory.bind(null, id)}
      disabled={disabled}
      title={title}
      className="text-xs text-red-400 hover:text-red-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
      onClick={(e) => {
        if (disabled) { e.preventDefault(); return; }
        if (!confirm(`Delete category "${slug}"? This cannot be undone.`)) e.preventDefault();
      }}
    >
      Delete
    </button>
  );
}

import { NextResponse } from 'next/server';
import { getProjectList, getBooks } from '@/shared/lib/blob-data';

export const dynamic = 'force-dynamic';

export async function GET() {
  const [projects, books] = await Promise.all([getProjectList(), getBooks()]);

  const projectResults = projects.map((p) => ({
    id:       `project-${p.id}`,
    title:    p.title,
    meta:     `${p.category} · ${p.locationCity}`,
    href:     `/projects/${p.slug}`,
    type:     'project' as const,
    category: p.category,
  }));

  const bookResults = books
    .filter((b) => b.published)
    .map((b) => ({
      id:       `book-${b.id}`,
      title:    b.title,
      meta:     b.subtitle ?? 'Book',
      href:     '/books',
      type:     'book' as const,
      category: 'book',
    }));

  return NextResponse.json(
    { projects: projectResults, books: bookResults },
    { headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300' } },
  );
}

import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { getSavedProjects, getCategories } from '@/shared/lib/blob-data';
import { blobMediaUrl } from '@/shared/lib/blob-client';
import type { SavedProjectEntry } from '@/shared/lib/blob-data';
import Image from 'next/image';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import { ShareMoodboardButton } from './ShareMoodboardButton';

export const metadata = { title: 'Moodboard | The Move' };

function stylePortrait(saved: SavedProjectEntry[]) {
  if (saved.length === 0) return null;

  // Category distribution
  const catCounts: Record<string, number> = {};
  for (const p of saved) catCounts[p.category] = (catCounts[p.category] ?? 0) + 1;
  const topCategory = Object.entries(catCounts).sort((a, b) => b[1] - a[1])[0];
  const categoryPct = Math.round((topCategory[1] / saved.length) * 100);

  // Style (traditional vs contemporary)
  const styled = saved.filter((p) => p.style);
  const contemporary = styled.filter((p) => p.style === 'contemporary').length;
  const topStyle =
    styled.length === 0
      ? null
      : contemporary >= styled.length / 2
      ? 'Contemporary'
      : 'Traditional';

  // Top 3 mood tags
  const tagCounts: Record<string, number> = {};
  for (const p of saved) {
    for (const tag of p.moodTags ?? []) {
      tagCounts[tag] = (tagCounts[tag] ?? 0) + 1;
    }
  }
  const topTags = Object.entries(tagCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([tag]) => tag.replace(/-/g, ' '));

  return { topCategory: topCategory[0], categoryPct, topStyle, topTags };
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default async function MoodboardPage() {
  const session = await auth();
  const user = session?.user as { id?: string; name?: string; role?: string } | undefined;

  if (!user?.id || user.role === 'admin') redirect('/join');

  const [saved, categoryList] = await Promise.all([
    getSavedProjects(user.id).catch(() => []),
    getCategories().catch(() => []),
  ]);

  const categoryLabel: Record<string, string> = Object.fromEntries(
    categoryList.map((c) => [c.slug, c.name]),
  );

  const portrait = stylePortrait(saved);

  return (
    <div className="min-h-screen pt-28 pb-24 px-6 md:px-12 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-10">
        <Link
          href="/me"
          className="text-xs uppercase tracking-widest text-[var(--mode-text-tertiary)] hover:text-[var(--mode-text-primary)] transition-colors mb-3 inline-block"
        >
          ← Profile
        </Link>
        <div className="flex items-end justify-between gap-4">
          <div className="flex items-end gap-4">
            <h1
              className="text-3xl font-semibold text-[var(--mode-text-primary)]"
              style={{ fontFamily: 'var(--font-acaslon-pro)' }}
            >
              Moodboard
            </h1>
            {saved.length > 0 && (
              <span className="text-lg text-[var(--mode-text-tertiary)] mb-0.5">
                {saved.length} {saved.length === 1 ? 'project' : 'projects'}
              </span>
            )}
          </div>
          {saved.length > 0 && <ShareMoodboardButton />}
        </div>
      </div>

      {/* Style portrait */}
      {portrait && (
        <div className="mb-10 p-5 border border-[var(--mode-border)] rounded-2xl bg-white/50 backdrop-blur-sm">
          <p className="text-[10px] uppercase tracking-[4px] text-[var(--mode-text-tertiary)] mb-2">
            Your style portrait
          </p>
          <p className="text-sm text-[var(--mode-text-secondary)] leading-relaxed">
            {categoryPct(portrait.categoryPct)}
            {' '}
            <strong className="text-[var(--mode-text-primary)]">
              {categoryLabel[portrait.topCategory] ?? portrait.topCategory}
            </strong>
            {portrait.topStyle && (
              <>
                {' · '}
                <strong className="text-[var(--mode-text-primary)]">{portrait.topStyle}</strong>
              </>
            )}
            {portrait.topTags.length > 0 && (
              <> with <strong className="text-[var(--mode-text-primary)]">{portrait.topTags.join(', ')}</strong> moods.</>
            )}
          </p>
          {portrait.topTags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {portrait.topTags.map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] px-2.5 py-1 rounded-full border border-[var(--mode-border)] text-[var(--mode-text-secondary)]"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Empty state */}
      {saved.length === 0 && (
        <div className="text-center py-24 border border-dashed border-[var(--mode-border)] rounded-2xl">
          <Heart size={28} className="mx-auto mb-4 text-[var(--mode-text-tertiary)]" strokeWidth={1.2} />
          <p className="text-sm text-[var(--mode-text-secondary)] mb-1">Your Moodboard is empty</p>
          <p className="text-xs text-[var(--mode-text-tertiary)] mb-6">
            Hover over any project and tap the heart to save it here.
          </p>
          <Link
            href="/projects"
            className="text-xs uppercase tracking-widest text-[var(--mode-text-primary)] border border-[var(--mode-border)] rounded-lg px-5 py-2.5 hover:bg-[var(--mode-border)] transition-colors"
          >
            Browse projects
          </Link>
        </div>
      )}

      {/* Saved project grid */}
      {saved.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {saved.map((project) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="group block"
            >
              <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-gray-100">
                {project.coverImage ? (
                  <Image
                    src={blobMediaUrl(project.coverImage)}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    unoptimized
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200" />
                )}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent px-4 pb-4 pt-10">
                  <p className="text-xs uppercase tracking-widest text-white/90 truncate">
                    {project.title}
                  </p>
                  <p className="text-[10px] text-white/60 mt-0.5">{project.locationCity}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Consultation CTA */}
      {saved.length >= 3 && (
        <div className="mt-14 p-6 border border-[var(--mode-border)] rounded-2xl bg-white/50 text-center">
          <p
            className="text-lg font-semibold text-[var(--mode-text-primary)] mb-2"
            style={{ fontFamily: 'var(--font-acaslon-pro)' }}
          >
            Ready to bring this to life?
          </p>
          <p className="text-sm text-[var(--mode-text-secondary)] mb-5">
            Book a free 45-minute consultation with Pyae Thiri — your Moodboard will be shared automatically.
          </p>
          <Link
            href="/contact"
            className="inline-block text-xs uppercase tracking-widest text-white bg-[var(--mode-text-primary)] rounded-lg px-6 py-3 hover:opacity-80 transition-opacity"
          >
            Book a Consultation
          </Link>
        </div>
      )}
    </div>
  );
}

function categoryPct(pct: number) {
  if (pct === 100) return 'All';
  if (pct >= 80) return `${pct}%`;
  return 'Mostly';
}

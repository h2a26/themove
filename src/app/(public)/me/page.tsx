import { auth, signOut } from '@/auth';
import { redirect } from 'next/navigation';
import { getSavedProjects } from '@/shared/lib/blob-data';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, ArrowRight } from 'lucide-react';

export const metadata = { title: 'My Profile | The Move' };

export default async function ProfilePage() {
  const session = await auth();
  const user = session?.user as { id?: string; name?: string; email?: string; image?: string; role?: string } | undefined;

  if (!user?.id || user.role === 'admin') redirect('/join');

  const saved = await getSavedProjects(user.id).catch(() => []);

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 max-w-md mx-auto">
      {/* Avatar + name */}
      <div className="flex items-center gap-4 mb-10">
        {user.image ? (
          <Image src={user.image} alt={user.name ?? ''} width={56} height={56} className="rounded-full" />
        ) : (
          <div className="w-14 h-14 rounded-full bg-[var(--mode-border)] flex items-center justify-center text-lg font-medium text-[var(--mode-text-secondary)]">
            {(user.name ?? 'M').charAt(0).toUpperCase()}
          </div>
        )}
        <div>
          <p className="font-semibold text-[var(--mode-text-primary)]">{user.name}</p>
          <p className="text-sm text-[var(--mode-text-secondary)]">{user.email}</p>
        </div>
      </div>

      {/* Moodboard card */}
      <Link
        href="/me/moodboard"
        className="group flex items-center justify-between p-5 border border-[var(--mode-border)] rounded-2xl bg-white/50 backdrop-blur-sm hover:border-[var(--mode-text-tertiary)] hover:shadow-sm transition-all mb-4"
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-rose-50 flex items-center justify-center">
            <Heart size={16} className="text-rose-400" strokeWidth={1.8} />
          </div>
          <div>
            <p className="text-sm font-medium text-[var(--mode-text-primary)]">Moodboard</p>
            <p className="text-xs text-[var(--mode-text-tertiary)]">
              {saved.length === 0
                ? 'No saves yet'
                : `${saved.length} saved ${saved.length === 1 ? 'project' : 'projects'}`}
            </p>
          </div>
        </div>
        <ArrowRight size={15} className="text-[var(--mode-text-tertiary)] group-hover:text-[var(--mode-text-primary)] transition-colors" />
      </Link>

      {/* Browse CTA if empty */}
      {saved.length === 0 && (
        <p className="text-xs text-[var(--mode-text-tertiary)] text-center mb-8">
          Hover over a project card and tap the heart to save it.{' '}
          <Link href="/projects" className="underline hover:text-[var(--mode-text-primary)]">Browse projects →</Link>
        </p>
      )}

      {/* Sign out */}
      <div className="mt-8">
        <form
          action={async () => {
            'use server';
            await signOut({ redirectTo: '/' });
          }}
        >
          <button type="submit" className="text-xs text-[var(--mode-text-tertiary)] hover:text-[var(--mode-text-primary)] transition-colors">
            Sign out
          </button>
        </form>
      </div>
    </div>
  );
}

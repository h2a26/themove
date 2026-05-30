'use server';

import { auth } from '@/auth';
import { getOrCreateMoodboardShare } from '@/shared/lib/blob-data';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://themovearchids.vercel.app';

export async function generateShareLink(): Promise<{ url: string }> {
  const session = await auth();
  const userId = (session?.user as { id?: string; role?: string } | undefined);
  if (!userId?.id || userId.role === 'admin') throw new Error('Not authenticated');

  const token = await getOrCreateMoodboardShare(userId.id);
  return { url: `${SITE_URL}/moodboard/${token}` };
}

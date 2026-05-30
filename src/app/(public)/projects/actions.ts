'use server';

import { auth } from '@/auth';
import { toggleSaveProject as dbToggle } from '@/server/db/queries';
import { revalidatePath } from 'next/cache';

export async function toggleSave(slug: string): Promise<{ saved: boolean }> {
  const session = await auth();
  const userId = (session?.user as { id?: string })?.id;
  if (!userId) throw new Error('Not authenticated');

  const result = await dbToggle(userId, slug);
  revalidatePath('/me/moodboard');
  return result;
}

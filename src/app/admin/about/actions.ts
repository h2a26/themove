'use server';

import { revalidatePath } from 'next/cache';
import { getAbout, putAbout } from '@/shared/lib/blob-data';
import { uploadBlob } from '@/shared/lib/blob-client';
import type { AboutEntry } from '@/shared/types/cms';

export async function updateAboutEntry(id: number, formData: FormData) {
  const entries = await getAbout();
  const idx = entries.findIndex((e) => e.id === id);
  if (idx === -1) throw new Error('Entry not found');

  const imageFile = formData.get('image') as File | null;
  let imagePath = entries[idx].image;
  if (imageFile && imageFile.size > 0) {
    const ext = imageFile.name.split('.').pop() ?? 'jpg';
    const buf = Buffer.from(await imageFile.arrayBuffer());
    imagePath = await uploadBlob(`images/about/entry-${id}.${ext}`, buf, imageFile.type || 'image/jpeg');
  }

  const descRaw = formData.get('description') as string;
  const description = descRaw.split('\n\n').map((p) => p.trim()).filter(Boolean);

  const updated: AboutEntry = {
    ...entries[idx],
    title: formData.get('title') as string,
    image: imagePath,
    bg: (formData.get('bg') as string) || entries[idx].bg,
    position: (formData.get('position') as string) || undefined,
    subtitle: (formData.get('subtitle') as string) || undefined,
    description,
  };

  entries[idx] = updated;
  await putAbout(entries);

  revalidatePath('/about');
  revalidatePath('/admin/about');
}

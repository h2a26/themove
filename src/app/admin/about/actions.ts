'use server';

import { revalidatePath } from 'next/cache';
import { updateAboutEntry as dbUpdateAboutEntry } from '@/shared/lib/blob-data';
import { uploadBlob } from '@/shared/lib/blob-client';

export async function updateAboutEntry(id: number, formData: FormData) {
  const imageFile = formData.get('image') as File | null;
  let imagePath: string | undefined;
  if (imageFile && imageFile.size > 0) {
    const ext = imageFile.name.split('.').pop() ?? 'jpg';
    const buf = Buffer.from(await imageFile.arrayBuffer());
    imagePath = await uploadBlob(
      `images/about/entry-${id}.${ext}`,
      buf,
      imageFile.type || 'image/jpeg',
    );
  }

  const descRaw = formData.get('description') as string;
  const description = descRaw.split('\n\n').map((p) => p.trim()).filter(Boolean);

  await dbUpdateAboutEntry(id, {
    title: formData.get('title') as string,
    image: imagePath,
    bg: (formData.get('bg') as string) || undefined,
    position: (formData.get('position') as string) || undefined,
    subtitle: (formData.get('subtitle') as string) || undefined,
    description,
  });

  revalidatePath('/about');
  revalidatePath('/admin/about');
}

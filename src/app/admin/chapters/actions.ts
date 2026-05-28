'use server';

import { revalidatePath } from 'next/cache';
import { upsertChapter, deleteChapter as dbDeleteChapter } from '@/shared/lib/blob-data';

export async function updateChapter(id: string, formData: FormData) {
  await upsertChapter({
    id,
    title: formData.get('title') as string,
    subtitle: formData.get('subtitle') as string,
    category: formData.get('category') as string,
    sortOrder: parseInt(formData.get('sortOrder') as string, 10) || 0,
  });
  revalidatePath('/projects');
  revalidatePath('/admin/chapters');
}

export async function createChapter(formData: FormData) {
  const id = (formData.get('id') as string).trim().toLowerCase().replace(/\s+/g, '-');
  await upsertChapter({
    id,
    title: formData.get('title') as string,
    subtitle: formData.get('subtitle') as string,
    category: formData.get('category') as string,
    sortOrder: parseInt(formData.get('sortOrder') as string, 10) || 99,
  });
  revalidatePath('/projects');
  revalidatePath('/admin/chapters');
}

export async function deleteChapter(id: string) {
  await dbDeleteChapter(id);
  revalidatePath('/projects');
  revalidatePath('/admin/chapters');
}

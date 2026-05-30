'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { upsertChapter, updateChapterById, deleteChapter as dbDeleteChapter } from '@/shared/lib/blob-data';

export async function updateChapter(id: number, formData: FormData) {
  await updateChapterById(id, {
    title: formData.get('title') as string,
    subtitle: (formData.get('subtitle') as string) ?? '',
    sortOrder: parseInt(formData.get('sortOrder') as string, 10) || 0,
  });
  revalidatePath('/projects');
  revalidatePath('/admin/chapters');
  redirect('/admin/chapters');
}

export async function createChapter(formData: FormData) {
  const categorySlug = (formData.get('categorySlug') as string).trim();
  await upsertChapter({
    categorySlug,
    title: formData.get('title') as string,
    subtitle: (formData.get('subtitle') as string) ?? '',
    sortOrder: 99,
  });
  revalidatePath('/projects');
  revalidatePath('/admin/chapters');
  redirect('/admin/chapters');
}

export async function deleteChapter(id: number) {
  await dbDeleteChapter(id);
  revalidatePath('/projects');
  revalidatePath('/admin/chapters');
}

'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import {
  createCategory as dbCreateCategory,
  updateCategory as dbUpdateCategory,
  deleteCategory as dbDeleteCategory,
} from '@/shared/lib/blob-data';

export async function createCategory(formData: FormData) {
  const slug = (formData.get('slug') as string).trim().toLowerCase().replace(/\s+/g, '-');
  const name = (formData.get('name') as string).trim();
  await dbCreateCategory({ slug, name, sortOrder: 99 });
  revalidatePath('/projects');
  revalidatePath('/admin/categories');
  redirect('/admin/categories');
}

export async function updateCategory(id: number, formData: FormData) {
  const name = (formData.get('name') as string).trim();
  const sortOrder = parseInt(formData.get('sortOrder') as string, 10) || 0;
  await dbUpdateCategory(id, { name, sortOrder });
  revalidatePath('/projects');
  revalidatePath('/admin/categories');
  redirect('/admin/categories');
}

export async function deleteCategory(id: number) {
  try {
    await dbDeleteCategory(id);
  } catch {
    // FK violation means projects still reference this category — safe to ignore here;
    // the UI disables the button when count > 0, so this is a double guard.
    redirect('/admin/categories');
  }
  revalidatePath('/projects');
  revalidatePath('/admin/categories');
  redirect('/admin/categories');
}

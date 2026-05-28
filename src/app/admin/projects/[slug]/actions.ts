'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import {
  updateProject as dbUpdateProject,
  deleteProject as dbDeleteProject,
  addGalleryItem,
  removeGalleryItem,
  getProjectGallery,
} from '@/shared/lib/blob-data';
import { uploadBlob, deleteBlob } from '@/shared/lib/blob-client';

export async function updateProject(slug: string, formData: FormData) {
  const coverFile = formData.get('coverImage') as File | null;

  let coverPathname: string | undefined;
  if (coverFile && coverFile.size > 0) {
    const ext = coverFile.name.split('.').pop() ?? 'jpg';
    const buf = Buffer.from(await coverFile.arrayBuffer());
    coverPathname = await uploadBlob(
      `images/projects/${slug}/cover.${ext}`,
      buf,
      coverFile.type || 'image/jpeg',
    );
  }

  const moodTagsRaw = (formData.get('moodTags') as string) ?? '';
  const moodTags = moodTagsRaw.split(',').map((t) => t.trim()).filter(Boolean);

  await dbUpdateProject(slug, {
    title: formData.get('title') as string,
    coverImage: coverPathname,
    category: formData.get('category') as 'residential' | 'commercial' | 'hospitality',
    locationCity: formData.get('locationCity') as string,
    locationCountry: formData.get('locationCountry') as string,
    location: formData.get('location') as string,
    projectType: formData.get('projectType') as 'interior' | 'architecture' | 'both',
    projectArea: (formData.get('projectArea') as string) || null,
    moodTags,
    style: (formData.get('style') as 'traditional' | 'contemporary') || null,
    frameArchetype: formData.get('frameArchetype') as string,
    oneLine: formData.get('oneLine') as string,
    purpose: formData.get('purpose') as string,
  });

  revalidatePath(`/projects/${slug}`);
  revalidatePath('/projects');
  revalidatePath('/admin/projects');
}

export async function deleteProject(slug: string) {
  await dbDeleteProject(slug);
  revalidatePath('/projects');
  revalidatePath('/admin/projects');
  redirect('/admin/projects');
}

export async function addGalleryImage(slug: string, formData: FormData) {
  const file = formData.get('image') as File | null;
  if (!file || file.size === 0) return;

  const gallery = await getProjectGallery(slug);
  const nextId = gallery.length > 0 ? Math.max(...gallery.map((g) => g.id)) + 1 : 1;
  const ext = file.name.split('.').pop() ?? 'jpg';
  const buf = Buffer.from(await file.arrayBuffer());
  const pathname = await uploadBlob(
    `images/projects/${slug}/gallery-${nextId}.${ext}`,
    buf,
    file.type || 'image/jpeg',
  );

  const aspect = (formData.get('aspect') as string) ?? 'portrait';
  await addGalleryItem(slug, { image: pathname, aspect });

  revalidatePath(`/projects/${slug}`);
  revalidatePath(`/admin/projects/${slug}`);
}

export async function removeGalleryImage(slug: string, imageId: number) {
  const gallery = await getProjectGallery(slug);
  const item = gallery.find((g) => g.id === imageId);
  if (item) {
    try { await deleteBlob(item.image); } catch { /* ignore if already gone */ }
  }
  await removeGalleryItem(imageId);

  revalidatePath(`/projects/${slug}`);
  revalidatePath(`/admin/projects/${slug}`);
}

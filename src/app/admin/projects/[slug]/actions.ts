'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import {
  getProjectList, putProjectList,
  putProjectMeta, getProjectGallery, putProjectGallery,
} from '@/shared/lib/blob-data';
import { uploadBlob, deleteBlob } from '@/shared/lib/blob-client';
import type { ProjectMeta, ProjectGalleryItem } from '@/shared/types/project';

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

  const meta: ProjectMeta = {
    slug,
    title: formData.get('title') as string,
    category: formData.get('category') as ProjectMeta['category'],
    locationCity: formData.get('locationCity') as string,
    locationCountry: formData.get('locationCountry') as string,
    location: formData.get('location') as string,
    projectType: formData.get('projectType') as ProjectMeta['projectType'],
    projectArea: (formData.get('projectArea') as string) || null,
    moodTags,
    style: (formData.get('style') as ProjectMeta['style']) || undefined,
    frameArchetype: formData.get('frameArchetype') as ProjectMeta['frameArchetype'],
    oneLine: formData.get('oneLine') as string,
    purpose: formData.get('purpose') as string,
  };

  const existing = await getProjectList();
  const updated = existing.map((p) => {
    if (p.slug !== slug) return p;
    return {
      ...p,
      title: meta.title,
      description: meta.oneLine,
      ...(coverPathname ? { image: coverPathname } : {}),
      locationCity: meta.locationCity,
      location: meta.location,
      category: meta.category,
      moodTags: meta.moodTags,
      style: meta.style,
      frameArchetype: meta.frameArchetype,
    };
  });

  await Promise.all([putProjectMeta(slug, meta), putProjectList(updated)]);

  revalidatePath(`/projects/${slug}`);
  revalidatePath('/projects');
  revalidatePath('/admin/projects');
}

export async function deleteProject(slug: string) {
  const existing = await getProjectList();
  const filtered = existing.filter((p) => p.slug !== slug);
  await putProjectList(filtered);

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

  const aspect = (formData.get('aspect') as ProjectGalleryItem['aspect']) ?? 'portrait';
  await putProjectGallery(slug, [...gallery, { id: nextId, image: pathname, aspect }]);

  revalidatePath(`/projects/${slug}`);
  revalidatePath(`/admin/projects/${slug}`);
}

export async function removeGalleryImage(slug: string, imageId: number) {
  const gallery = await getProjectGallery(slug);
  const item = gallery.find((g) => g.id === imageId);
  if (item) {
    try { await deleteBlob(item.image); } catch { /* ignore if already gone */ }
  }
  const updated = gallery.filter((g) => g.id !== imageId);
  await putProjectGallery(slug, updated);

  revalidatePath(`/projects/${slug}`);
  revalidatePath(`/admin/projects/${slug}`);
}

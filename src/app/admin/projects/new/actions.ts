'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { getProjectList, putProjectList, putProjectMeta, putProjectGallery } from '@/shared/lib/blob-data';
import { uploadBlob } from '@/shared/lib/blob-client';
import type { ProjectCatalogueEntry, ProjectMeta } from '@/shared/types/project';

export async function createProject(formData: FormData) {
  const slug = (formData.get('slug') as string).trim().toLowerCase().replace(/\s+/g, '-');
  const coverFile = formData.get('coverImage') as File | null;

  let coverPathname = '';
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
  const nextId = existing.length > 0 ? Math.max(...existing.map((p) => p.id)) + 1 : 1;

  const catalogueEntry: ProjectCatalogueEntry = {
    id: nextId,
    slug,
    title: meta.title,
    description: meta.oneLine,
    image: coverPathname,
    routeTo: `/projects/${slug}`,
    category: meta.category,
    locationCity: meta.locationCity,
    location: meta.location,
    moodTags: meta.moodTags,
    style: meta.style,
    frameArchetype: meta.frameArchetype,
  };

  await Promise.all([
    putProjectMeta(slug, meta),
    putProjectGallery(slug, []),
    putProjectList([...existing, catalogueEntry]),
  ]);

  revalidatePath('/projects');
  revalidatePath('/admin/projects');
  redirect(`/admin/projects/${slug}`);
}

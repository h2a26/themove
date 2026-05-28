'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { createProject as dbCreateProject } from '@/shared/lib/blob-data';
import { uploadBlob } from '@/shared/lib/blob-client';

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

  await dbCreateProject({
    slug,
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

  revalidatePath('/projects');
  revalidatePath('/admin/projects');
  redirect(`/admin/projects/${slug}`);
}

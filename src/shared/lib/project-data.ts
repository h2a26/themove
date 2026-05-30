import type { Project, ProjectDataFile, ProjectGalleryItem, ProjectMeta } from '@/shared/types/project';

/** Fix legacy Sanity URLs that used HTML-encoded ampersands */
export function normalizeImageUrl(url: string): string {
  return url.replace(/&amp;/g, '&');
}

function isLegacyGalleryArray(data: unknown): data is ProjectGalleryItem[] {
  return Array.isArray(data);
}

export function parseProjectData(raw: unknown): ProjectDataFile {
  if (isLegacyGalleryArray(raw)) {
    const legacy = raw as Project[];
    const featured = legacy.find((item) => item.featured) ?? legacy[0];
    const meta: ProjectMeta = {
      slug: '',
      title: featured?.caption ?? 'Project',
      category: 'residential',
      locationCity: '',
      locationCountry: 'Myanmar',
      location: featured?.location ?? '',
      projectType: 'interior',
      moodTags: [],
      frameArchetype: 'auto',
      oneLine: featured?.caption ?? '',
      purpose: featured?.purpose ?? '',
    };
    return {
      meta,
      gallery: legacy.map(({ id, image, aspect, caption }) => ({
        id,
        image: normalizeImageUrl(image),
        aspect,
        caption,
      })),
    };
  }

  const file = raw as ProjectDataFile;
  return {
    meta: file.meta,
    gallery: file.gallery.map((item) => ({
      ...item,
      image: normalizeImageUrl(item.image),
    })),
  };
}

function sectorLabel(category: string, categoryName?: string): string {
  if (categoryName) return categoryName;
  // Fallback for known slugs when no DB name is available
  if (category === 'residential') return 'Residential';
  if (category === 'commercial') return 'Commercial';
  if (category === 'hospitality') return 'Hospitality';
  return category.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

function projectTypeLabel(type: ProjectMeta['projectType']): string {
  if (type === 'architecture') return 'Architecture';
  if (type === 'both') return 'Interior Design & Landscape';
  return 'Interior Design';
}

function buildPhilosophyPoem(meta: ProjectMeta): string {
  const categoryLine =
    meta.category === 'residential'
      ? 'A home that remembers.'
      : meta.category === 'commercial'
        ? 'A threshold that welcomes.'
        : 'A gathering that lingers.';

  const typeLine =
    meta.projectType === 'architecture'
      ? 'Structure leads feeling.'
      : meta.projectType === 'both'
        ? 'Architecture and interior move as one.'
        : 'Interior becomes atmosphere.';

  const moodLine = meta.moodTags.length
    ? `${meta.moodTags.slice(0, 2).join(' · ')}.`
    : 'Light, material, and rhythm.';

  return [categoryLine, typeLine, moodLine, `${meta.location}.`].join('\n');
}

/** Merge meta into gallery for existing detail components */
export function toDetailGallery(data: ProjectDataFile, categoryName?: string): Project[] {
  const [first, ...rest] = data.gallery;
  if (!first) return [];

  const featured: Project = {
    ...first,
    featured: true,
    caption: data.meta.title,
    location: data.meta.location,
    locationCity: data.meta.locationCity,
    locationCountry: data.meta.locationCountry,
    description: data.meta.oneLine,
    purpose: data.meta.purpose,
    philosophy: buildPhilosophyPoem(data.meta),
    sectors: [sectorLabel(data.meta.category, categoryName)],
    status: projectTypeLabel(data.meta.projectType),
    category: data.meta.category,
    moodTags: data.meta.moodTags,
    projectType: data.meta.projectType,
    projectArea: data.meta.projectArea ?? null,
    frameArchetype: data.meta.frameArchetype,
    style: data.meta.style,
  };

  return [featured, ...rest];
}

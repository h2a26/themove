import type { FrameArchetype, FrameMood, FrameStyle, ProjectCategory, ProjectType } from '@/shared/components/frames/types';

export type { FrameArchetype, FrameMood, FrameStyle, ProjectCategory, ProjectType };

/** Single image in a project detail gallery */
export type ProjectGalleryItem = {
  id: number;
  image: string;
  aspect: 'landscape' | 'portrait' | string;
  caption?: string;
};

/** Canonical metadata — Showcase Book 2023–2025 */
export type ProjectMeta = {
  slug: string;
  title: string;
  category: ProjectCategory;
  locationCity: string;
  locationCountry: string;
  location: string;
  projectType: ProjectType;
  projectArea?: string | null;
  moodTags: string[];
  style?: FrameStyle;
  frameArchetype: FrameArchetype | 'auto';
  oneLine: string;
  purpose: string;
};

/** Per-project file: public/data/projects/{slug}/data.json */
export type ProjectDataFile = {
  meta: ProjectMeta;
  gallery: ProjectGalleryItem[];
};

/** Scroll catalogue row: public/data/project-list.json */
export type ProjectCatalogueEntry = {
  id: number;
  slug: string;
  title: string;
  description: string;
  image: string;
  routeTo: string;
  category: ProjectCategory;
  locationCity: string;
  location: string;
  moodTags: string[];
  style?: FrameStyle;
  frameArchetype: FrameArchetype | 'auto';
};

/** Flattened gallery row for detail layout (meta merged into featured image) */
export type Project = ProjectGalleryItem & {
  featured?: boolean;
  client?: string;
  description?: string;
  philosophy?: string;
  location?: string;
  locationCity?: string;
  locationCountry?: string;
  status?: string;
  sectors?: string[];
  purpose?: string;
  category?: ProjectCategory;
  moodTags?: string[];
  projectType?: ProjectType;
  projectArea?: string | null;
  frameArchetype?: FrameArchetype | 'auto';
  style?: FrameStyle;
};

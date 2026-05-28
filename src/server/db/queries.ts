import { eq, asc } from 'drizzle-orm';
import { db } from './index';
import { projects, galleryItems, books, aboutEntries, contactInfo } from './schema';
import type { ProjectCatalogueEntry, ProjectMeta, ProjectGalleryItem } from '@/shared/types/project';
import type { Book } from '@/shared/types/book';
import type { AboutEntry, ContactInfo } from '@/shared/types/cms';

// ── Input types ──────────────────────────────────────────────────────────────

export type ProjectInput = {
  slug: string;
  title: string;
  coverImage?: string;
  category: 'residential' | 'commercial' | 'hospitality';
  locationCity: string;
  locationCountry: string;
  location: string;
  projectType: 'interior' | 'architecture' | 'both';
  projectArea?: string | null;
  moodTags: string[];
  style?: 'traditional' | 'contemporary' | null;
  frameArchetype: string;
  oneLine: string;
  purpose: string;
};

export type GalleryItemInput = {
  image: string;
  aspect: string;
  caption?: string;
};

export type BookInput = {
  slug: string;
  title: string;
  subtitle?: string;
  description?: string;
  pdfUrl: string;
  year: string;
  pages?: number;
  published: boolean;
};

export type AboutEntryInput = {
  title: string;
  image?: string;
  bg?: string;
  position?: string;
  subtitle?: string;
  description: string[];
};

export type ContactInput = {
  image?: string;
  address: string;
  telephone: string;
  generalEnquiries: string;
  newBusinessEnquiries: string;
  careers: string;
};

// ── Row mappers ──────────────────────────────────────────────────────────────

function toProjectCatalogueEntry(row: typeof projects.$inferSelect): ProjectCatalogueEntry {
  return {
    id: row.sortOrder || row.id,
    slug: row.slug,
    title: row.title,
    description: row.description || row.oneLine,
    image: row.coverImage,
    routeTo: `/projects/${row.slug}`,
    category: row.category,
    locationCity: row.locationCity,
    location: row.location,
    moodTags: row.moodTags ?? [],
    style: row.style ?? undefined,
    frameArchetype: (row.frameArchetype as ProjectMeta['frameArchetype']) ?? 'auto',
  };
}

function toProjectMeta(row: typeof projects.$inferSelect): ProjectMeta {
  return {
    slug: row.slug,
    title: row.title,
    category: row.category,
    locationCity: row.locationCity,
    locationCountry: row.locationCountry,
    location: row.location,
    projectType: row.projectType,
    projectArea: row.projectArea ?? null,
    moodTags: row.moodTags ?? [],
    style: row.style ?? undefined,
    frameArchetype: (row.frameArchetype as ProjectMeta['frameArchetype']) ?? 'auto',
    oneLine: row.oneLine,
    purpose: row.purpose,
  };
}

function toGalleryItem(row: typeof galleryItems.$inferSelect): ProjectGalleryItem {
  return {
    id: row.id,
    image: row.image,
    aspect: row.aspect,
    caption: row.caption ?? undefined,
  };
}

function toBook(row: typeof books.$inferSelect): Book {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    subtitle: row.subtitle ?? undefined,
    description: row.description ?? undefined,
    pdfUrl: row.pdfUrl,
    year: row.year,
    pages: row.pages ?? undefined,
    published: row.published,
  };
}

function toAboutEntry(row: typeof aboutEntries.$inferSelect): AboutEntry {
  return {
    id: row.id,
    title: row.title,
    image: row.image,
    bg: row.bg ?? undefined,
    position: row.position ?? undefined,
    subtitle: row.subtitle ?? undefined,
    description: row.description ?? [],
  };
}

function toContactInfo(row: typeof contactInfo.$inferSelect): ContactInfo {
  return {
    id: row.id,
    image: row.image,
    address: row.address,
    telephone: row.telephone,
    generalEnquiries: row.generalEnquiries,
    newBusinessEnquiries: row.newBusinessEnquiries,
    careers: row.careers,
  };
}

// ── Project reads ────────────────────────────────────────────────────────────

export async function getProjectList(): Promise<ProjectCatalogueEntry[]> {
  const rows = await db.select().from(projects).orderBy(asc(projects.sortOrder), asc(projects.id));
  return rows.map(toProjectCatalogueEntry);
}

export async function getProjectMeta(slug: string): Promise<ProjectMeta> {
  const rows = await db.select().from(projects).where(eq(projects.slug, slug));
  if (rows.length === 0) throw new Error(`Project not found: ${slug}`);
  return toProjectMeta(rows[0]);
}

export async function getProjectGallery(slug: string): Promise<ProjectGalleryItem[]> {
  const rows = await db
    .select()
    .from(galleryItems)
    .where(eq(galleryItems.projectSlug, slug))
    .orderBy(asc(galleryItems.sortOrder), asc(galleryItems.id));
  return rows.map(toGalleryItem);
}

// ── Project writes ───────────────────────────────────────────────────────────

export async function createProject(data: ProjectInput): Promise<void> {
  const maxSortRows = await db.select({ s: projects.sortOrder }).from(projects).orderBy(asc(projects.sortOrder));
  const nextSort = maxSortRows.length > 0 ? Math.max(...maxSortRows.map((r) => r.s)) + 1 : 1;

  await db.insert(projects).values({
    slug: data.slug,
    sortOrder: nextSort,
    title: data.title,
    description: data.oneLine,
    coverImage: data.coverImage ?? '',
    category: data.category,
    locationCity: data.locationCity,
    locationCountry: data.locationCountry,
    location: data.location,
    moodTags: data.moodTags,
    style: data.style ?? null,
    frameArchetype: data.frameArchetype,
    projectType: data.projectType,
    projectArea: data.projectArea ?? null,
    oneLine: data.oneLine,
    purpose: data.purpose,
  });
}

export async function updateProject(slug: string, data: Omit<ProjectInput, 'slug'>): Promise<void> {
  const update: Partial<typeof projects.$inferInsert> = {
    title: data.title,
    description: data.oneLine,
    category: data.category,
    locationCity: data.locationCity,
    locationCountry: data.locationCountry,
    location: data.location,
    moodTags: data.moodTags,
    style: data.style ?? null,
    frameArchetype: data.frameArchetype,
    projectType: data.projectType,
    projectArea: data.projectArea ?? null,
    oneLine: data.oneLine,
    purpose: data.purpose,
    updatedAt: new Date(),
  };
  if (data.coverImage) update.coverImage = data.coverImage;

  await db.update(projects).set(update).where(eq(projects.slug, slug));
}

export async function deleteProject(slug: string): Promise<void> {
  await db.delete(projects).where(eq(projects.slug, slug));
}

// ── Gallery writes ───────────────────────────────────────────────────────────

export async function addGalleryItem(slug: string, item: GalleryItemInput): Promise<number> {
  const existing = await db
    .select({ so: galleryItems.sortOrder })
    .from(galleryItems)
    .where(eq(galleryItems.projectSlug, slug));
  const nextSort = existing.length > 0 ? Math.max(...existing.map((r) => r.so)) + 1 : 0;

  const inserted = await db
    .insert(galleryItems)
    .values({
      projectSlug: slug,
      image: item.image,
      aspect: item.aspect,
      caption: item.caption ?? null,
      sortOrder: nextSort,
    })
    .returning({ id: galleryItems.id });

  return inserted[0].id;
}

export async function removeGalleryItem(id: number): Promise<void> {
  await db.delete(galleryItems).where(eq(galleryItems.id, id));
}

// ── Book reads ───────────────────────────────────────────────────────────────

export async function getBooks(): Promise<Book[]> {
  const rows = await db.select().from(books).orderBy(asc(books.id));
  return rows.map(toBook);
}

// ── Book writes ──────────────────────────────────────────────────────────────

export async function createBook(data: BookInput): Promise<void> {
  await db.insert(books).values({
    slug: data.slug,
    title: data.title,
    subtitle: data.subtitle ?? null,
    description: data.description ?? null,
    pdfUrl: data.pdfUrl,
    year: data.year,
    pages: data.pages ?? null,
    published: data.published,
  });
}

export async function updateBook(slug: string, data: Omit<BookInput, 'slug'>): Promise<void> {
  const update: Partial<typeof books.$inferInsert> = {
    title: data.title,
    subtitle: data.subtitle ?? null,
    description: data.description ?? null,
    year: data.year,
    pages: data.pages ?? null,
    published: data.published,
  };
  if (data.pdfUrl) update.pdfUrl = data.pdfUrl;

  await db.update(books).set(update).where(eq(books.slug, slug));
}

export async function deleteBook(slug: string): Promise<void> {
  await db.delete(books).where(eq(books.slug, slug));
}

// ── About reads ──────────────────────────────────────────────────────────────

export async function getAbout(): Promise<AboutEntry[]> {
  const rows = await db
    .select()
    .from(aboutEntries)
    .orderBy(asc(aboutEntries.sortOrder), asc(aboutEntries.id));
  return rows.map(toAboutEntry);
}

// ── About writes ─────────────────────────────────────────────────────────────

export async function updateAboutEntry(id: number, data: AboutEntryInput): Promise<void> {
  const update: Partial<typeof aboutEntries.$inferInsert> = {
    title: data.title,
    bg: data.bg ?? null,
    position: data.position ?? null,
    subtitle: data.subtitle ?? null,
    description: data.description,
  };
  if (data.image) update.image = data.image;

  await db.update(aboutEntries).set(update).where(eq(aboutEntries.id, id));
}

// ── Contact reads ────────────────────────────────────────────────────────────

export async function getContact(): Promise<ContactInfo> {
  const rows = await db.select().from(contactInfo);
  if (rows.length === 0) throw new Error('Contact info not found');
  return toContactInfo(rows[0]);
}

// ── Contact writes ───────────────────────────────────────────────────────────

export async function upsertContact(data: ContactInput & { currentImage?: string }): Promise<void> {
  const image = data.image ?? data.currentImage ?? '';
  const payload = {
    id: 1 as const,
    image,
    address: data.address,
    telephone: data.telephone,
    generalEnquiries: data.generalEnquiries,
    newBusinessEnquiries: data.newBusinessEnquiries,
    careers: data.careers,
  };

  await db
    .insert(contactInfo)
    .values(payload)
    .onConflictDoUpdate({ target: contactInfo.id, set: payload });
}

import { eq, asc, and, desc, sql as rawSql } from 'drizzle-orm';
import { db } from './index';
import {
  categories, projects, galleryItems, books, aboutEntries, contactInfo,
  chapters, savedProjects, moodboardShares, users,
} from './schema';
import type { ProjectCatalogueEntry, ProjectMeta, ProjectGalleryItem } from '@/shared/types/project';
import type { Book } from '@/shared/types/book';
import type { AboutEntry, ContactInfo, Chapter } from '@/shared/types/cms';

// ── Input types ──────────────────────────────────────────────────────────────

export type ProjectInput = {
  slug: string;
  title: string;
  coverImage?: string;
  category: string;
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

export type ChapterInput = {
  categorySlug: string;
  title: string;
  subtitle: string;
  sortOrder?: number;
};

export type CategoryInput = {
  slug: string;
  name: string;
  sortOrder?: number;
};

export type ContactInput = {
  image?: string;
  address: string;
  telephone: string;
  generalEnquiries: string;
  newBusinessEnquiries: string;
  careers: string;
};

// ── Category type ─────────────────────────────────────────────────────────────

export type Category = {
  id: number;
  slug: string;
  name: string;
  sortOrder: number;
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
    coverImage: row.coverImage || undefined,
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

// ── Category reads ────────────────────────────────────────────────────────────

export async function getCategories(): Promise<Category[]> {
  const rows = await db.select().from(categories).orderBy(asc(categories.sortOrder), asc(categories.id));
  return rows.map((r) => ({ id: r.id, slug: r.slug, name: r.name, sortOrder: r.sortOrder }));
}

export async function getCategoryProjectCounts(): Promise<Record<string, number>> {
  const rows = await db
    .select({
      category: projects.category,
      count: rawSql<number>`count(*)::int`,
    })
    .from(projects)
    .groupBy(projects.category);
  return Object.fromEntries(rows.map((r) => [r.category, r.count]));
}

// ── Category writes ───────────────────────────────────────────────────────────

export async function createCategory(data: CategoryInput): Promise<void> {
  await db.insert(categories).values({
    slug: data.slug,
    name: data.name,
    sortOrder: data.sortOrder ?? 0,
  });
}

export async function updateCategory(id: number, data: { name: string; sortOrder: number }): Promise<void> {
  await db.update(categories).set({ name: data.name, sortOrder: data.sortOrder }).where(eq(categories.id, id));
}

export async function deleteCategory(id: number): Promise<void> {
  await db.delete(categories).where(eq(categories.id, id));
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

// ── Chapter reads ────────────────────────────────────────────────────────────

export async function getChapters(): Promise<Chapter[]> {
  const rows = await db
    .select()
    .from(chapters)
    .orderBy(asc(chapters.sortOrder));
  return rows.map((r) => ({
    id: r.id,
    title: r.title,
    subtitle: r.subtitle,
    categorySlug: r.categorySlug,
    sortOrder: r.sortOrder,
  }));
}

// ── Chapter writes ───────────────────────────────────────────────────────────

export async function upsertChapter(data: ChapterInput): Promise<void> {
  const payload = {
    categorySlug: data.categorySlug,
    title: data.title,
    subtitle: data.subtitle,
    sortOrder: data.sortOrder ?? 0,
  };
  await db
    .insert(chapters)
    .values(payload)
    .onConflictDoUpdate({ target: chapters.categorySlug, set: payload });
}

export async function updateChapterById(id: number, data: { title: string; subtitle: string; sortOrder: number }): Promise<void> {
  await db.update(chapters)
    .set({ title: data.title, subtitle: data.subtitle, sortOrder: data.sortOrder })
    .where(eq(chapters.id, id));
}

export async function deleteChapter(id: number): Promise<void> {
  await db.delete(chapters).where(eq(chapters.id, id));
}

// ── Moodboard reads ──────────────────────────────────────────────────────────

export async function getSavedSlugs(userId: string): Promise<string[]> {
  const rows = await db
    .select({ projectSlug: savedProjects.projectSlug })
    .from(savedProjects)
    .where(eq(savedProjects.userId, userId));
  return rows.map((r) => r.projectSlug);
}

export type SavedProjectEntry = ProjectCatalogueEntry & {
  savedAt: Date | null;
  moodTags: string[];
  style?: 'traditional' | 'contemporary' | null;
  category: string;
  coverImage: string;
};

export async function getSavedProjects(userId: string): Promise<SavedProjectEntry[]> {
  const rows = await db
    .select()
    .from(savedProjects)
    .innerJoin(projects, eq(savedProjects.projectSlug, projects.slug))
    .where(eq(savedProjects.userId, userId))
    .orderBy(desc(savedProjects.savedAt));

  return rows.map((r) => ({
    ...toProjectCatalogueEntry(r.projects),
    savedAt: r.saved_projects.savedAt,
    moodTags: r.projects.moodTags ?? [],
    style: r.projects.style ?? undefined,
    category: r.projects.category,
    coverImage: r.projects.coverImage,
  }));
}

// ── Moodboard writes ─────────────────────────────────────────────────────────

export async function toggleSaveProject(
  userId: string,
  slug: string,
): Promise<{ saved: boolean }> {
  const existing = await db
    .select({ id: savedProjects.id })
    .from(savedProjects)
    .where(and(eq(savedProjects.userId, userId), eq(savedProjects.projectSlug, slug)))
    .limit(1);

  if (existing.length > 0) {
    await db
      .delete(savedProjects)
      .where(and(eq(savedProjects.userId, userId), eq(savedProjects.projectSlug, slug)));
    return { saved: false };
  }

  await db.insert(savedProjects).values({ userId, projectSlug: slug });
  return { saved: true };
}

// ── Moodboard share ──────────────────────────────────────────────────────────

export async function getOrCreateMoodboardShare(userId: string): Promise<string> {
  const existing = await db
    .select({ shareToken: moodboardShares.shareToken })
    .from(moodboardShares)
    .where(eq(moodboardShares.userId, userId))
    .limit(1);

  if (existing.length > 0) return existing[0].shareToken;

  const token = crypto.randomUUID();
  await db.insert(moodboardShares).values({ userId, shareToken: token });
  return token;
}

export async function getSavedProjectsByShareToken(token: string): Promise<{
  ownerName: string | null;
  saved: SavedProjectEntry[];
} | null> {
  const shareRows = await db
    .select({ userId: moodboardShares.userId })
    .from(moodboardShares)
    .where(eq(moodboardShares.shareToken, token))
    .limit(1);

  if (shareRows.length === 0) return null;

  const { userId } = shareRows[0];

  const [userRows, savedRows] = await Promise.all([
    db.select({ name: users.name }).from(users).where(eq(users.id, userId)).limit(1),
    db
      .select()
      .from(savedProjects)
      .innerJoin(projects, eq(savedProjects.projectSlug, projects.slug))
      .where(eq(savedProjects.userId, userId))
      .orderBy(desc(savedProjects.savedAt)),
  ]);

  const saved = savedRows.map((r) => ({
    ...toProjectCatalogueEntry(r.projects),
    savedAt: r.saved_projects.savedAt,
    moodTags: r.projects.moodTags ?? [],
    style: r.projects.style ?? undefined,
    category: r.projects.category,
    coverImage: r.projects.coverImage,
  }));

  return { ownerName: userRows[0]?.name ?? null, saved };
}

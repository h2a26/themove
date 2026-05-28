import { getBlob, putBlob } from './blob-client';
import type { ProjectCatalogueEntry, ProjectMeta, ProjectGalleryItem } from '@/shared/types/project';
import type { Book } from '@/shared/types/book';
import type { AboutEntry, ContactInfo, Chapter } from '@/shared/types/cms';

// ── Project catalogue ────────────────────────────────────────────────────────

export async function getProjectList(): Promise<ProjectCatalogueEntry[]> {
  return getBlob<ProjectCatalogueEntry[]>('data/project-list.json');
}

export async function putProjectList(entries: ProjectCatalogueEntry[]): Promise<void> {
  await putBlob('data/project-list.json', entries);
}

// ── Per-project detail ───────────────────────────────────────────────────────

export async function getProjectMeta(slug: string): Promise<ProjectMeta> {
  return getBlob<ProjectMeta>(`data/projects/${slug}/meta.json`);
}

export async function putProjectMeta(slug: string, meta: ProjectMeta): Promise<void> {
  await putBlob(`data/projects/${slug}/meta.json`, meta);
}

export async function getProjectGallery(slug: string): Promise<ProjectGalleryItem[]> {
  return getBlob<ProjectGalleryItem[]>(`data/projects/${slug}/gallery.json`);
}

export async function putProjectGallery(slug: string, gallery: ProjectGalleryItem[]): Promise<void> {
  await putBlob(`data/projects/${slug}/gallery.json`, gallery);
}

// ── Books ────────────────────────────────────────────────────────────────────

export async function getBooks(): Promise<Book[]> {
  return getBlob<Book[]>('data/books.json');
}

export async function putBooks(books: Book[]): Promise<void> {
  await putBlob('data/books.json', books);
}

// ── About ────────────────────────────────────────────────────────────────────

export async function getAbout(): Promise<AboutEntry[]> {
  return getBlob<AboutEntry[]>('data/about.json');
}

export async function putAbout(entries: AboutEntry[]): Promise<void> {
  await putBlob('data/about.json', entries);
}

// ── Contact ──────────────────────────────────────────────────────────────────

export async function getContact(): Promise<ContactInfo> {
  const rows = await getBlob<ContactInfo[]>('data/contact.json');
  return rows[0];
}

export async function putContact(contact: ContactInfo): Promise<void> {
  await putBlob('data/contact.json', [contact]);
}

// ── Chapters ─────────────────────────────────────────────────────────────────

export async function getChapters(): Promise<Chapter[]> {
  return getBlob<Chapter[]>('data/chapters.json');
}

export async function putChapters(chapters: Chapter[]): Promise<void> {
  await putBlob('data/chapters.json', chapters);
}

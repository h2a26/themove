/**
 * Public data API — backed by Neon Postgres via Drizzle.
 * blob-client.ts still handles binary uploads/downloads (images, PDFs).
 */
export {
  getProjectList,
  getProjectMeta,
  getProjectGallery,
  getBooks,
  getAbout,
  getContact,
  createProject,
  updateProject,
  deleteProject,
  addGalleryItem,
  removeGalleryItem,
  createBook,
  updateBook,
  deleteBook,
  updateAboutEntry,
  upsertContact,
  getChapters,
  upsertChapter,
  deleteChapter,
} from '@/server/db/queries';

export type {
  ProjectInput,
  GalleryItemInput,
  BookInput,
  AboutEntryInput,
  ContactInput,
  ChapterInput,
} from '@/server/db/queries';

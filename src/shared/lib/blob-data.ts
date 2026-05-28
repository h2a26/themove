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
} from '@/server/db/queries';

export type {
  ProjectInput,
  GalleryItemInput,
  BookInput,
  AboutEntryInput,
  ContactInput,
} from '@/server/db/queries';

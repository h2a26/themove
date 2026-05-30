/**
 * Public data API — backed by Neon Postgres via Drizzle.
 * blob-client.ts still handles binary uploads/downloads (images, PDFs).
 */
export {
  getCategories,
  getCategoryProjectCounts,
  createCategory,
  updateCategory,
  deleteCategory,
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
  updateChapterById,
  deleteChapter,
  getSavedSlugs,
  getSavedProjects,
  getOrCreateMoodboardShare,
  getSavedProjectsByShareToken,
} from '@/server/db/queries';

export type {
  Category,
  CategoryInput,
  ProjectInput,
  GalleryItemInput,
  BookInput,
  AboutEntryInput,
  ContactInput,
  ChapterInput,
  SavedProjectEntry,
} from '@/server/db/queries';

import { pgTable, pgEnum, serial, integer, text, boolean, timestamp } from 'drizzle-orm/pg-core';

export const projectCategoryEnum = pgEnum('project_category', [
  'residential',
  'commercial',
  'hospitality',
]);

export const projectTypeEnum = pgEnum('project_type', [
  'interior',
  'architecture',
  'both',
]);

export const frameStyleEnum = pgEnum('frame_style', [
  'traditional',
  'contemporary',
]);

/** Merges ProjectCatalogueEntry + ProjectMeta — single source of truth per project */
export const projects = pgTable('projects', {
  id:              serial('id').primaryKey(),
  slug:            text('slug').unique().notNull(),
  sortOrder:       integer('sort_order').notNull().default(0),
  title:           text('title').notNull(),
  description:     text('description').notNull().default(''),
  coverImage:      text('cover_image').notNull().default(''),
  category:        projectCategoryEnum('category').notNull(),
  locationCity:    text('location_city').notNull().default(''),
  locationCountry: text('location_country').notNull().default(''),
  location:        text('location').notNull().default(''),
  moodTags:        text('mood_tags').array().notNull().default([]),
  style:           frameStyleEnum('style'),
  frameArchetype:  text('frame_archetype').notNull().default('auto'),
  projectType:     projectTypeEnum('project_type').notNull().default('interior'),
  projectArea:     text('project_area'),
  oneLine:         text('one_line').notNull().default(''),
  purpose:         text('purpose').notNull().default(''),
  createdAt:       timestamp('created_at').defaultNow(),
  updatedAt:       timestamp('updated_at').defaultNow(),
});

export const galleryItems = pgTable('gallery_items', {
  id:          serial('id').primaryKey(),
  projectSlug: text('project_slug')
    .notNull()
    .references(() => projects.slug, { onDelete: 'cascade' }),
  image:       text('image').notNull(),
  aspect:      text('aspect').notNull().default('landscape'),
  caption:     text('caption'),
  sortOrder:   integer('sort_order').notNull().default(0),
});

export const books = pgTable('books', {
  id:          serial('id').primaryKey(),
  slug:        text('slug').unique().notNull(),
  title:       text('title').notNull(),
  subtitle:    text('subtitle'),
  description: text('description'),
  pdfUrl:      text('pdf_url').notNull(),
  year:        text('year').notNull(),
  pages:       integer('pages'),
  published:   boolean('published').notNull().default(true),
  createdAt:   timestamp('created_at').defaultNow(),
});

export const aboutEntries = pgTable('about_entries', {
  id:          serial('id').primaryKey(),
  sortOrder:   integer('sort_order').notNull().default(0),
  title:       text('title').notNull(),
  image:       text('image').notNull().default(''),
  bg:          text('bg'),
  position:    text('position'),
  subtitle:    text('subtitle'),
  description: text('description').array().notNull().default([]),
});

/** Section chapter labels (residential / commercial / hospitality) */
export const chapters = pgTable('chapters', {
  id:        text('id').primaryKey(),           // e.g. 'residential'
  title:     text('title').notNull(),           // e.g. 'Spaces to live'
  subtitle:  text('subtitle').notNull().default(''), // e.g. 'Residential'
  category:  text('category').notNull(),
  sortOrder: integer('sort_order').notNull().default(0),
});

/** Always a single row (id = 1) */
export const contactInfo = pgTable('contact_info', {
  id:                   integer('id').primaryKey().default(1),
  image:                text('image').notNull().default(''),
  address:              text('address').notNull().default(''),
  telephone:            text('telephone').notNull().default(''),
  generalEnquiries:     text('general_enquiries').notNull().default(''),
  newBusinessEnquiries: text('new_business_enquiries').notNull().default(''),
  careers:              text('careers').notNull().default(''),
});

export type ProjectRow   = typeof projects.$inferSelect;
export type GalleryRow   = typeof galleryItems.$inferSelect;
export type BookRow      = typeof books.$inferSelect;
export type AboutRow     = typeof aboutEntries.$inferSelect;
export type ContactRow   = typeof contactInfo.$inferSelect;
export type ChapterRow   = typeof chapters.$inferSelect;

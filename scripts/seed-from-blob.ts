/**
 * One-time seed: reads all JSON data from Vercel Blob and inserts into Neon Postgres.
 * Run after drizzle-kit push:
 *   pnpm db:seed
 */
import { neonConfig, Pool } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import * as schema from '../src/server/db/schema';
import { getBlob } from '../src/shared/lib/blob-client';
import type { ProjectCatalogueEntry, ProjectMeta, ProjectGalleryItem } from '../src/shared/types/project';
import type { Book } from '../src/shared/types/book';
import type { AboutEntry, ContactInfo } from '../src/shared/types/cms';

// Node.js v21+ has native WebSocket; use it for local script execution
neonConfig.webSocketConstructor = WebSocket;
const pool = new Pool({ connectionString: process.env.POSTGRES_URL! });
const db = drizzle({ client: pool, schema });

async function seed() {
  console.log('🌱 Seeding Neon Postgres from Vercel Blob…\n');

  // ── Projects ──────────────────────────────────────────────────────────────
  console.log('Fetching project-list.json…');
  const projectList = await getBlob<ProjectCatalogueEntry[]>('data/project-list.json');
  console.log(`  → ${projectList.length} projects in catalogue`);

  let projectsInserted = 0;
  let galleryInserted = 0;

  for (const entry of projectList) {
    let meta: ProjectMeta;
    try {
      meta = await getBlob<ProjectMeta>(`data/projects/${entry.slug}/meta.json`);
    } catch {
      console.warn(`  ⚠ No meta.json for ${entry.slug}, using catalogue data`);
      meta = {
        slug: entry.slug,
        title: entry.title,
        category: entry.category,
        locationCity: entry.locationCity,
        locationCountry: '',
        location: entry.location,
        projectType: 'interior',
        moodTags: entry.moodTags,
        style: entry.style,
        frameArchetype: entry.frameArchetype,
        oneLine: entry.description,
        purpose: entry.description,
      };
    }

    await db.insert(schema.projects).values({
      slug: entry.slug,
      sortOrder: entry.id,
      title: entry.title,
      description: entry.description,
      coverImage: entry.image,
      category: entry.category,
      locationCity: entry.locationCity,
      locationCountry: meta.locationCountry,
      location: entry.location,
      moodTags: entry.moodTags,
      style: (entry.style as 'traditional' | 'contemporary' | null) ?? null,
      frameArchetype: entry.frameArchetype,
      projectType: meta.projectType,
      projectArea: meta.projectArea ?? null,
      oneLine: meta.oneLine,
      purpose: meta.purpose,
    }).onConflictDoUpdate({
      target: schema.projects.slug,
      set: {
        title: entry.title,
        description: entry.description,
        coverImage: entry.image,
        locationCity: entry.locationCity,
        locationCountry: meta.locationCountry,
        location: entry.location,
        moodTags: entry.moodTags,
        style: (entry.style as 'traditional' | 'contemporary' | null) ?? null,
        frameArchetype: entry.frameArchetype,
        projectType: meta.projectType,
        projectArea: meta.projectArea ?? null,
        oneLine: meta.oneLine,
        purpose: meta.purpose,
      },
    });
    projectsInserted++;

    // Gallery
    try {
      const gallery = await getBlob<ProjectGalleryItem[]>(`data/projects/${entry.slug}/gallery.json`);
      for (let i = 0; i < gallery.length; i++) {
        const item = gallery[i];
        await db.insert(schema.galleryItems).values({
          projectSlug: entry.slug,
          image: item.image,
          aspect: item.aspect,
          caption: item.caption ?? null,
          sortOrder: i,
        }).onConflictDoNothing();
        galleryInserted++;
      }
    } catch {
      // gallery.json might not exist for new projects
    }
  }

  console.log(`  ✓ ${projectsInserted} projects inserted/updated`);
  console.log(`  ✓ ${galleryInserted} gallery items inserted\n`);

  // ── Books ─────────────────────────────────────────────────────────────────
  console.log('Fetching books.json…');
  try {
    const booksData = await getBlob<Book[]>('data/books.json');
    for (const book of booksData) {
      await db.insert(schema.books).values({
        slug: book.slug,
        title: book.title,
        subtitle: book.subtitle ?? null,
        description: book.description ?? null,
        pdfUrl: book.pdfUrl,
        year: book.year,
        pages: book.pages ?? null,
        published: book.published,
      }).onConflictDoUpdate({
        target: schema.books.slug,
        set: {
          title: book.title,
          subtitle: book.subtitle ?? null,
          description: book.description ?? null,
          pdfUrl: book.pdfUrl,
          year: book.year,
          pages: book.pages ?? null,
          published: book.published,
        },
      });
    }
    console.log(`  ✓ ${booksData.length} books inserted\n`);
  } catch (e) {
    console.warn('  ⚠ Could not read books.json:', e);
  }

  // ── About ─────────────────────────────────────────────────────────────────
  console.log('Fetching about.json…');
  try {
    const aboutData = await getBlob<AboutEntry[]>('data/about.json');
    for (let i = 0; i < aboutData.length; i++) {
      const entry = aboutData[i];
      await db.insert(schema.aboutEntries).values({
        sortOrder: i,
        title: entry.title,
        image: entry.image,
        bg: entry.bg ?? null,
        position: entry.position ?? null,
        subtitle: entry.subtitle ?? null,
        description: entry.description,
      }).onConflictDoNothing();
    }
    console.log(`  ✓ ${aboutData.length} about entries inserted\n`);
  } catch (e) {
    console.warn('  ⚠ Could not read about.json:', e);
  }

  // ── Contact ───────────────────────────────────────────────────────────────
  console.log('Fetching contact.json…');
  try {
    const contactData = await getBlob<ContactInfo[]>('data/contact.json');
    const c = contactData[0];
    await db.insert(schema.contactInfo).values({
      id: 1,
      image: c.image,
      address: c.address,
      telephone: c.telephone,
      generalEnquiries: c.generalEnquiries,
      newBusinessEnquiries: c.newBusinessEnquiries,
      careers: c.careers,
    }).onConflictDoUpdate({
      target: schema.contactInfo.id,
      set: {
        image: c.image,
        address: c.address,
        telephone: c.telephone,
        generalEnquiries: c.generalEnquiries,
        newBusinessEnquiries: c.newBusinessEnquiries,
        careers: c.careers,
      },
    });
    console.log(`  ✓ Contact info inserted\n`);
  } catch (e) {
    console.warn('  ⚠ Could not read contact.json:', e);
  }

  console.log('✅ Seed complete.');
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});

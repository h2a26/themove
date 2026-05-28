/**
 * One-time migration: uploads all current /public/data JSON + Sanity CDN images to Vercel Blob.
 * Run: pnpm tsx scripts/migrate-to-blob.ts
 *
 * Requires .env.local with BLOB_READ_WRITE_TOKEN set.
 */
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import fs from 'fs';
import path from 'path';
import { put } from '@vercel/blob';

const ROOT = path.join(process.cwd());
const DATA = path.join(ROOT, 'public/data');

// ── Helpers ──────────────────────────────────────────────────────────────────

function readJson<T>(filePath: string): T {
  return JSON.parse(fs.readFileSync(filePath, 'utf-8')) as T;
}

async function putBlob(pathname: string, data: unknown) {
  await put(pathname, JSON.stringify(data, null, 2), {
    access: 'private',
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: 'application/json',
  });
  console.log(`  ✓ blob: ${pathname}`);
}

async function uploadImageFromUrl(url: string, pathname: string): Promise<string> {
  try {
    const res = await fetch(url.replace(/&amp;/g, '&'));
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    const contentType = res.headers.get('Content-Type') ?? 'image/jpeg';
    await put(pathname, buf, { access: 'private', addRandomSuffix: false, allowOverwrite: true, contentType });
    console.log(`  ✓ image: ${pathname}`);
    return pathname;
  } catch (err) {
    console.warn(`  ✗ failed to upload image (${pathname}): ${err}`);
    return url; // keep original URL as fallback
  }
}

async function uploadLocalFile(localPath: string, pathname: string, contentType: string): Promise<string> {
  const buf = fs.readFileSync(localPath);
  await put(pathname, buf, { access: 'private', addRandomSuffix: false, allowOverwrite: true, contentType });
  console.log(`  ✓ file: ${pathname}`);
  return pathname;
}

// ── Types ─────────────────────────────────────────────────────────────────────

interface CatalogueEntry {
  id: number; slug: string; title: string; description: string;
  image: string; routeTo: string; category: string;
  locationCity: string; location: string;
  moodTags: string[]; style?: string; frameArchetype: string;
}

interface ProjectDataFile {
  meta: {
    slug: string; title: string; category: string;
    locationCity: string; locationCountry: string; location: string;
    projectType: string; projectArea?: string | null;
    moodTags: string[]; style?: string; frameArchetype: string;
    oneLine: string; purpose: string;
  };
  gallery: { id: number; image: string; aspect: string; caption?: string }[];
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  console.log('\n🚀 The Move → Vercel Blob Migration\n');

  const projectList = readJson<CatalogueEntry[]>(path.join(DATA, 'project-list.json'));
  const updatedList: CatalogueEntry[] = [];

  for (const entry of projectList) {
    console.log(`\n📁 ${entry.title} (${entry.slug})`);

    // Upload cover image
    const coverPathname = `images/projects/${entry.slug}/cover.jpg`;
    const coverResult = await uploadImageFromUrl(entry.image, coverPathname);

    // Load per-project data.json
    const dataPath = path.join(DATA, 'projects', entry.slug, 'data.json');
    if (!fs.existsSync(dataPath)) {
      console.warn(`  ✗ No data.json for ${entry.slug}, skipping detail`);
      updatedList.push({ ...entry, image: coverResult });
      continue;
    }

    const projectData = readJson<ProjectDataFile>(dataPath);

    // Upload gallery images
    const updatedGallery: ProjectDataFile['gallery'] = [];
    for (const item of projectData.gallery) {
      const galleryPathname = `images/projects/${entry.slug}/gallery-${item.id}.jpg`;
      const galleryResult = await uploadImageFromUrl(item.image, galleryPathname);
      updatedGallery.push({ ...item, image: galleryResult });
    }

    // Upload meta.json
    await putBlob(`data/projects/${entry.slug}/meta.json`, projectData.meta);

    // Upload gallery.json
    await putBlob(`data/projects/${entry.slug}/gallery.json`, updatedGallery);

    updatedList.push({ ...entry, image: coverResult });
  }

  // Upload updated project-list.json
  console.log('\n📋 Uploading project-list.json');
  await putBlob('data/project-list.json', updatedList);

  // Upload books.json + PDF
  console.log('\n📚 Uploading books');
  const booksData = readJson<{ id: number; slug: string; title: string; subtitle?: string; description?: string; pdfUrl: string; year: string; pages?: number; published: boolean }[]>(
    path.join(DATA, 'books.json')
  );
  const updatedBooks = [];
  for (const book of booksData) {
    const localPdfPath = path.join(ROOT, 'public', book.pdfUrl);
    const pdfPathname = `books/${book.slug}.pdf`;
    let pdfResult = book.pdfUrl;
    if (fs.existsSync(localPdfPath)) {
      pdfResult = await uploadLocalFile(localPdfPath, pdfPathname, 'application/pdf');
    } else {
      console.warn(`  ✗ PDF not found locally: ${localPdfPath}`);
    }
    updatedBooks.push({ ...book, pdfUrl: pdfResult });
  }
  await putBlob('data/books.json', updatedBooks);

  // Upload about.json (re-upload images from their current URLs)
  console.log('\n👤 Uploading about');
  const aboutData = readJson<{ id: number; title: string; image: string; bg?: string; position?: string; subtitle?: string; description: string[] }[]>(
    path.join(DATA, 'about.json')
  );
  const updatedAbout = [];
  for (const entry of aboutData) {
    const imagePath = `images/about/entry-${entry.id}.jpg`;
    const imageResult = await uploadImageFromUrl(entry.image, imagePath);
    updatedAbout.push({ ...entry, image: imageResult });
  }
  await putBlob('data/about.json', updatedAbout);

  // Upload contact.json (keep image URL as-is for now)
  console.log('\n📞 Uploading contact');
  const contactData = readJson<unknown>(path.join(DATA, 'contact.json'));
  await putBlob('data/contact.json', contactData);

  // Upload chapters.json
  console.log('\n📂 Uploading chapters');
  const chaptersData = readJson<unknown>(path.join(DATA, 'chapters.json'));
  await putBlob('data/chapters.json', chaptersData);

  console.log('\n✅ Migration complete!\n');
  console.log('Next steps:');
  console.log('  1. Run: pnpm tsx scripts/hash-password.ts "your-password"');
  console.log('  2. Paste the hash into .env.local as ADMIN_PASSWORD_HASH');
  console.log('  3. Update public pages to use blob-data.ts (see plan)');
  console.log('  4. Visit /admin/login\n');
}

main().catch((err) => {
  console.error('\n❌ Migration failed:', err);
  process.exit(1);
});

/**
 * Deletes all blobs under the `data/` prefix in Vercel Blob storage.
 * These JSON files are now replaced by Neon Postgres — they are safe to remove.
 *
 * Run: pnpm tsx --env-file=.env.local scripts/delete-blob-data.ts
 */
import { list, del } from '@vercel/blob';

async function main() {
  let cursor: string | undefined;
  let total = 0;

  console.log('Listing blobs under data/ ...');

  do {
    const result = await list({
      prefix: 'data/',
      cursor,
      limit: 1000,
    });

    if (result.blobs.length === 0) break;

    const urls = result.blobs.map((b) => b.url);
    console.log(`  Found ${urls.length} blobs — deleting...`);
    urls.forEach((u) => console.log(`    - ${u.split('/').slice(-3).join('/')}`));

    await del(urls);
    total += urls.length;

    cursor = result.cursor;
  } while (cursor);

  console.log(`\nDone — ${total} blobs deleted from data/ prefix.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

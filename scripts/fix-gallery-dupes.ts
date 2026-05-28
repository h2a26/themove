/**
 * Removes duplicate rows from gallery_items.
 * Keeps the row with the lowest id for each (project_slug, image) pair.
 *
 * Run: pnpm tsx --env-file=.env.local scripts/fix-gallery-dupes.ts
 */
import { neonConfig, Pool } from '@neondatabase/serverless';

neonConfig.webSocketConstructor = WebSocket;

const pool = new Pool({ connectionString: process.env.POSTGRES_URL! });

async function main() {
  // ── 1. Show counts before ───────────────────────────────────────────────────
  const before = await pool.query<{ total: string; unique_combos: string }>(`
    SELECT
      COUNT(*) AS total,
      COUNT(DISTINCT (project_slug, image)) AS unique_combos
    FROM gallery_items
  `);
  const { total, unique_combos } = before.rows[0];
  console.log(`Before: ${total} rows, ${unique_combos} unique (project_slug, image) pairs`);

  if (total === unique_combos) {
    console.log('No duplicates found — nothing to do.');
    await pool.end();
    return;
  }

  // ── 2. Preview worst offenders ──────────────────────────────────────────────
  const sample = await pool.query<{ project_slug: string; cnt: string }>(`
    SELECT project_slug, COUNT(*) AS cnt
    FROM gallery_items
    GROUP BY project_slug
    ORDER BY cnt DESC
    LIMIT 5
  `);
  console.log('Top projects by row count:');
  sample.rows.forEach((r) => console.log(`  ${r.project_slug}: ${r.cnt} rows`));

  // ── 3. Delete duplicates — keep MIN(id) per (project_slug, image) ───────────
  const result = await pool.query(`
    DELETE FROM gallery_items
    WHERE id NOT IN (
      SELECT MIN(id)
      FROM gallery_items
      GROUP BY project_slug, image
    )
  `);
  console.log(`\nDeleted ${result.rowCount} duplicate rows.`);

  // ── 4. Verify after ─────────────────────────────────────────────────────────
  const after = await pool.query<{ total: string }>(`SELECT COUNT(*) AS total FROM gallery_items`);
  console.log(`After:  ${after.rows[0].total} rows remaining.`);

  await pool.end();
}

main().catch((e) => { console.error(e); process.exit(1); });

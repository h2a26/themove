import { neonConfig, Pool } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import * as schema from '../src/server/db/schema';

// Use native WebSocket in Node.js v22+
neonConfig.webSocketConstructor = WebSocket;

const pool = new Pool({ connectionString: process.env.POSTGRES_URL! });
const db = drizzle({ client: pool, schema });

const CHAPTERS = [
  { id: 'residential',  title: 'Spaces to live',         subtitle: 'Residential',       category: 'residential',  sortOrder: 0 },
  { id: 'commercial',   title: 'Spaces to gather & work', subtitle: 'Commercial',        category: 'commercial',   sortOrder: 1 },
  { id: 'hospitality',  title: 'Spaces to serve',         subtitle: 'Hospitality & F&B', category: 'hospitality',  sortOrder: 2 },
];

async function main() {
  console.log('Seeding chapters...');
  for (const ch of CHAPTERS) {
    await db
      .insert(schema.chapters)
      .values(ch)
      .onConflictDoUpdate({
        target: schema.chapters.id,
        set: { title: ch.title, subtitle: ch.subtitle, category: ch.category, sortOrder: ch.sortOrder },
      });
    console.log(`  ✓ ${ch.id}`);
  }
  console.log('Done — 3 chapters seeded.');
  await pool.end();
}

main().catch((e) => { console.error(e); process.exit(1); });

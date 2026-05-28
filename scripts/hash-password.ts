import { hashSync } from 'bcryptjs';
// run from project root

const password = process.argv[2];
if (!password) {
  console.error('Usage: pnpm tsx scripts/hash-password.ts "your-password"');
  process.exit(1);
}

const hash = hashSync(password, 10);
// Base64-encode so $-signs in the bcrypt hash survive dotenv interpolation
const b64 = Buffer.from(hash).toString('base64');
console.log('\nAdd this to your .env.local:\n');
console.log(`ADMIN_PASSWORD_HASH_B64="${b64}"`);
console.log('');

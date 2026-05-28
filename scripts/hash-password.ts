import { hashSync } from 'bcryptjs';
// run from project root

const password = process.argv[2];
if (!password) {
  console.error('Usage: pnpm tsx scripts/hash-password.ts "your-password"');
  process.exit(1);
}

const hash = hashSync(password, 10);
console.log('\nAdd this to your .env.local:\n');
console.log(`ADMIN_PASSWORD_HASH="${hash}"`);
console.log('');

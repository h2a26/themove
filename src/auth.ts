import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';
import { compare } from 'bcryptjs';
import { db } from '@/server/db';
import { users } from '@/server/db/schema';
import { eq, and } from 'drizzle-orm';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    // Only register Google when credentials are configured
    ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
      ? [Google({
          clientId: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })]
      : []),
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        const email = credentials?.email as string | undefined;
        const password = credentials?.password as string | undefined;

        if (!email || !password) return null;

        // Try DB first (post-migration)
        const rows = await db
          .select()
          .from(users)
          .where(and(eq(users.email, email), eq(users.role, 'admin')))
          .limit(1)
          .catch(() => []);

        if (rows.length > 0 && rows[0].passwordHash) {
          const valid = await compare(password, rows[0].passwordHash);
          if (!valid) return null;
          return { id: rows[0].id, email: rows[0].email, name: rows[0].name, role: 'admin' };
        }

        return null;
      },
    }),
  ],
  session: { strategy: 'jwt' },
  pages: {
    signIn: '/admin/login',
  },
  callbacks: {
    async jwt({ token, user, account }) {
      // Admin credentials sign-in
      if (user && (user as { role?: string }).role === 'admin') {
        token.role = 'admin';
        return token;
      }

      // Google initial sign-in — upsert user in DB (account only present on initial sign-in)
      if (account?.provider === 'google' && token.email) {
        const existing = await db.select().from(users)
          .where(eq(users.email, token.email)).limit(1);

        if (existing.length > 0) {
          token.dbUserId = existing[0].id;
          token.role = existing[0].role;
        } else {
          const [created] = await db.insert(users).values({
            id: crypto.randomUUID(),
            name: token.name ?? 'Member',
            email: token.email,
            avatarUrl: token.picture as string | undefined,
            googleId: account.providerAccountId,
            role: 'member',
          }).returning({ id: users.id, role: users.role });
          token.dbUserId = created.id;
          token.role = created.role;
        }
      }

      return token;
    },
    session({ session, token }) {
      if (token.role) (session.user as { role?: string }).role = token.role as string;
      if (token.dbUserId) (session.user as { id?: string }).id = token.dbUserId as string;
      return session;
    },
  },
});

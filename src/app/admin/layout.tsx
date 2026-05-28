import { auth } from '@/auth';
import { AdminNav } from './_components/AdminNav';
import type { ReactNode } from 'react';

export const metadata = { title: 'Admin | The Move' };

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const session = await auth();

  // Middleware handles redirects; layout only adds AdminNav for authenticated sessions
  if (!session) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen bg-[var(--mode-bg-from)]">
      <AdminNav />
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}

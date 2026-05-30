import { auth } from '@/auth';
import { AdminNav } from './_components/AdminNav';
import { Toaster } from 'sonner';
import type { ReactNode } from 'react';

export const metadata = { title: 'Admin | The Move' };

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const session = await auth();

  if (!session) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminNav />
      <main className="flex-1 overflow-auto">
        {children}
      </main>
      <Toaster position="bottom-right" richColors />
    </div>
  );
}

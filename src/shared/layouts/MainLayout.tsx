import React from 'react';
import { Navbar } from '@/shared/components/Navbar';
import { Footer } from '@/shared/components/Footer';
import { WeatherModeProvider } from '@/shared/state/weather-mode-context';
import { auth } from '@/auth';
import { getCategories } from '@/shared/lib/blob-data';

type MainLayoutProps = {
  children: React.ReactNode;
};

export const MainLayout = async ({ children }: MainLayoutProps) => {
  const [session, categories] = await Promise.all([
    auth(),
    getCategories().catch(() => []),
  ]);

  const user = session?.user as { name?: string | null; email?: string | null; image?: string | null; role?: string } | null ?? null;
  const isAdmin = user?.role === 'admin';
  const publicUser = isAdmin ? null : user;

  return (
    <WeatherModeProvider>
      <div className="flex flex-col min-h-screen">
        <Navbar user={publicUser} isAdmin={isAdmin} categories={categories} />
        <main className="flex-grow">{children}</main>
        <Footer />
      </div>
    </WeatherModeProvider>
  );
};

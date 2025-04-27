'use client';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import projectList from '@/public/data/project-list.json';

interface ProjectListItem {
  id: number;
  title: string;
  image: string;
  borderColor: string;
  routeTo: string;
}

const staticRoutes = [
  { pattern: /^web\+interiordesign:\/\/$/, path: '/' },
  { pattern: /^web\+interiordesign:\/\/about$/, path: '/about' },
  { pattern: /^web\+interiordesign:\/\/contact$/, path: '/contact' },
  { pattern: /^web\+interiordesign:\/\/projects$/, path: '/projects' },
];

export default function HandleProtocolPage() {
  const params = useSearchParams();
  const router = useRouter();
  const url = params.get('url');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (url) {
      // 1. Check static routes
      for (const route of staticRoutes) {
        if (route.pattern.test(url)) {
          router.replace(route.path);
          return;
        }
      }
      // 2. Dynamic project slug: web+interiordesign://projects/[slug]
      const match = url.match(/^web\+interiordesign:\/\/projects\/([^/]+)/);
      if (match) {
        const slug = match[1];
        const valid = (projectList as ProjectListItem[]).some(
          (item) => item.routeTo?.endsWith(slug)
        );
        if (valid) {
          router.replace(`/projects/${slug}`);
        } else {
          setError('Invalid or unknown project slug.');
        }
      } else {
        setError('Unrecognized protocol URL format.');
      }
    }
  }, [url, router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-light-beige text-deep-black p-8">
      <h1 className="text-2xl font-bold mb-4">Protocol Handler</h1>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      {!error && <p>Processing protocol link...</p>}
      {url && (
        <code className="block bg-gray-100 p-2 rounded text-sm mt-4">{url}</code>
      )}
    </div>
  );
}

import { MetadataRoute } from 'next';
import { getProjectList } from '@/shared/lib/blob-data';

export const revalidate = 3600; // rebuild sitemap at most once per hour

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://themovearchids.vercel.app';

  let projects: { slug: string }[] = [];
  try {
    projects = await getProjectList();
  } catch {
    projects = [];
  }

  const now = new Date().toISOString();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, lastModified: now },
    { url: `${baseUrl}/about`, lastModified: now },
    { url: `${baseUrl}/contact`, lastModified: now },
    { url: `${baseUrl}/projects`, lastModified: now },
  ];

  const dynamicRoutes: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${baseUrl}/projects/${p.slug}`,
    lastModified: now,
  }));

  return [...staticRoutes, ...dynamicRoutes];
}

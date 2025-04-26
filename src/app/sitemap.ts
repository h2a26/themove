import { MetadataRoute } from 'next';
import fs from 'fs';
import path from 'path';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://themovearchids.vercel.app';

  const projectListPath = path.join(process.cwd(), '/public/data/project-list.json'); // small path fix: no leading slash
  let projects: { routeTo: string }[] = [];

  try {
    const file = await fs.promises.readFile(projectListPath, 'utf-8');
    projects = JSON.parse(file);
  } catch (e) {
    console.error('Failed to load project-list.json:', e);
    projects = [];
  }

  const now = new Date().toISOString();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, lastModified: now },
    { url: `${baseUrl}/about`, lastModified: now },
    { url: `${baseUrl}/contact`, lastModified: now },
    { url: `${baseUrl}/projects`, lastModified: now },
  ];

  const dynamicRoutes: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${baseUrl}${project.routeTo}`,
    lastModified: now,
  }));

  return [...staticRoutes, ...dynamicRoutes];
}

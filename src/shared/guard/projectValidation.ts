import fs from 'fs';
import path from 'path';

export function getValidSlugs(): string[] {
  const projectListPath = path.join(process.cwd(), 'public/data/project-list.json');
  if (!fs.existsSync(projectListPath)) return [];
  const raw = fs.readFileSync(projectListPath, 'utf-8');
  let list: { routeTo: string }[];
  try {
    list = JSON.parse(raw);
  } catch {
    return [];
  }
  // Ensure only strings are returned, filter out undefined
  return list
    .map((item) => {
      const slug = item.routeTo?.split('/').pop();
      return typeof slug === 'string' ? slug : undefined;
    })
    .filter((slug): slug is string => Boolean(slug));
}

export function isValidProjectSlug(slug: string): boolean {
  const validSlugs = getValidSlugs();
  if (!validSlugs.includes(slug)) return false;
  const folderPath = path.join(process.cwd(), 'public/data/projects', slug);
  return fs.existsSync(folderPath);
}

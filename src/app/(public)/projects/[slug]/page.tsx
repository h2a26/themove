import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { ProjectSection } from '@/shared/components/project/ProjectSection';
import { ProjectDetails } from '@/shared/components/project/ProjectDetails';
import { featuredProjectGuard } from '@/shared/guard/featuredProjectGuard';
import { toDetailGallery } from '@/shared/lib/project-data';
import { blobMediaUrl } from '@/shared/lib/blob-client';
import { getProjectMeta, getProjectGallery, getSavedSlugs, getCategories } from '@/shared/lib/blob-data';
import { auth } from '@/auth';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://themovearchids.vercel.app';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const meta = await getProjectMeta(slug);
    const ogImage = meta.coverImage
      ? `${SITE_URL}/api/media/${meta.coverImage}`
      : undefined;
    return {
      title: `${meta.title} | The Move`,
      description: meta.oneLine,
      openGraph: {
        title: meta.title,
        description: meta.oneLine,
        url: `${SITE_URL}/projects/${slug}`,
        images: ogImage ? [{ url: ogImage, width: 1200, height: 800, alt: meta.title }] : [],
        type: 'website',
        siteName: 'The Move',
      },
      twitter: {
        card: 'summary_large_image',
        title: meta.title,
        description: meta.oneLine,
        images: ogImage ? [ogImage] : [],
      },
    };
  } catch {
    return { title: 'The Move' };
  }
}

export default async function ProjectSlugPage({ params }: PageProps) {
  const { slug } = await params;

  const session = await auth();
  const sessionUser = session?.user as { id?: string; role?: string } | undefined;
  const userId = sessionUser?.role === 'admin' ? null : (sessionUser?.id ?? null);

  let meta, gallery, savedSlugs: string[];
  try {
    [meta, gallery, savedSlugs] = await Promise.all([
      getProjectMeta(slug),
      getProjectGallery(slug),
      userId ? getSavedSlugs(userId).catch(() => [] as string[]) : Promise.resolve([] as string[]),
    ]);
  } catch {
    return notFound();
  }

  const categoryList = await getCategories().catch(() => []);
  const categoryName = categoryList.find((c) => c.slug === meta.category)?.name;

  // If no gallery images yet, fall back to cover image so the page doesn't 404
  const galleryImages = gallery.length > 0
    ? gallery.map((item) => ({ ...item, image: blobMediaUrl(item.image) }))
    : meta.coverImage
      ? [{ id: 0, image: blobMediaUrl(meta.coverImage), aspect: 'landscape' as const }]
      : [];

  const projectDataFile = { meta, gallery: galleryImages };

  const projects = toDetailGallery(projectDataFile, categoryName);
  if (!projects.length) return notFound();

  const featuredProject = featuredProjectGuard(projects);
  return (
    <>
      <ProjectSection projects={projects} />
      {featuredProject && (
        <ProjectDetails
          {...featuredProject}
          slug={slug}
          userId={userId}
          isSaved={savedSlugs.includes(slug)}
        />
      )}
    </>
  );
}

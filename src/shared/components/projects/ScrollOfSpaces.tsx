'use client';

import { groupCatalogueByChapter, type ChapterDefinition } from '@/shared/lib/group-catalogue-by-chapter';
import { ChapterInterstitial } from './ChapterInterstitial';
import { SpaceVignette, type SpaceVignetteProps } from './SpaceVignette';

export type ScrollOfSpacesProject = SpaceVignetteProps & {
  id: number;
  slug: string;
  category: string;
};

type ScrollOfSpacesProps = {
  projects: ScrollOfSpacesProject[];
  chapters: ChapterDefinition[];
  savedSlugs?: string[];
  userId?: string | null;
};

export function ScrollOfSpaces({ projects, chapters, savedSlugs, userId }: ScrollOfSpacesProps) {
  const groups = groupCatalogueByChapter(projects, chapters);

  return (
    <section
      className="shinkai-projects-canvas relative min-h-screen pt-13"
      aria-label="Scroll of Spaces"
    >
      {groups.map(({ chapter, projects: chapterProjects }) => (
        <div key={chapter.id} data-chapter={chapter.id}>
          <ChapterInterstitial chapter={chapter} />
          {chapterProjects.map((project) => (
            <SpaceVignette
              key={project.id}
              {...project}
              userId={userId}
              isSaved={savedSlugs?.includes(project.slug) ?? false}
            />
          ))}
        </div>
      ))}
    </section>
  );
}

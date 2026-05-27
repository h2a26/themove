'use client';

import chapters from '@/public/data/chapters.json';
import { groupCatalogueByChapter, type ChapterDefinition } from '@/shared/lib/group-catalogue-by-chapter';
import { ChapterInterstitial } from './ChapterInterstitial';
import { SpaceVignette, type SpaceVignetteProps } from './SpaceVignette';

export type ScrollOfSpacesProject = SpaceVignetteProps & {
  id: number;
  category: NonNullable<SpaceVignetteProps['category']>;
};

type ScrollOfSpacesProps = {
  projects: ScrollOfSpacesProject[];
};

export function ScrollOfSpaces({ projects }: ScrollOfSpacesProps) {
  const groups = groupCatalogueByChapter(projects, chapters as ChapterDefinition[]);

  return (
    <section
      className="shinkai-projects-canvas relative min-h-screen pt-13"
      aria-label="Scroll of Spaces"
    >
      {groups.map(({ chapter, projects: chapterProjects }) => (
        <div key={chapter.id} data-chapter={chapter.id}>
          <ChapterInterstitial chapter={chapter} />
          {chapterProjects.map((project) => (
            <SpaceVignette key={project.id} {...project} />
          ))}
        </div>
      ))}
    </section>
  );
}

import type { ProjectCategory } from '@/shared/components/frames/types';
import type { ScrollOfSpacesProject } from '@/shared/components/projects/ScrollOfSpaces';

export type ChapterDefinition = {
  id: string;
  title: string;
  subtitle: string;
  category: ProjectCategory;
};

const CHAPTER_ORDER: ProjectCategory[] = ['residential', 'commercial', 'hospitality'];

export function groupCatalogueByChapter(
  projects: ScrollOfSpacesProject[],
  chapters: ChapterDefinition[],
) {
  return CHAPTER_ORDER.map((category) => {
    const chapter = chapters.find((c) => c.category === category);
    const chapterProjects = projects.filter((p) => p.category === category);
    if (!chapter || chapterProjects.length === 0) return null;
    return { chapter, projects: chapterProjects };
  }).filter((group): group is { chapter: ChapterDefinition; projects: ScrollOfSpacesProject[] } =>
    Boolean(group),
  );
}

import type { ScrollOfSpacesProject } from '@/shared/components/projects/ScrollOfSpaces';

export type ChapterDefinition = {
  id: number;
  title: string;
  subtitle: string;
  categorySlug: string;
};

export function groupCatalogueByChapter(
  projects: ScrollOfSpacesProject[],
  chapters: ChapterDefinition[],
) {
  return chapters
    .map((chapter) => {
      const chapterProjects = projects.filter((p) => p.category === chapter.categorySlug);
      if (chapterProjects.length === 0) return null;
      return { chapter, projects: chapterProjects };
    })
    .filter(
      (group): group is { chapter: ChapterDefinition; projects: ScrollOfSpacesProject[] } =>
        Boolean(group),
    );
}

// src/shared/guard/featuredProjectGuard.ts

import { Project } from '@/shared/types/project';

export const featuredProjectGuard = (projects: Project[]) => {
  return projects.find((project) => project.featured === true);
};

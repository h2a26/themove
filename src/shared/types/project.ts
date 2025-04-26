// src/shared/types/project.ts

export type Project = {
  id: number;
  image: string;
  aspect: string;
  caption?: string;
  featured?: boolean;
  client?: string;
  location?: string;
  status?: string;
  sectors?: string[];
  purpose?: string;
};


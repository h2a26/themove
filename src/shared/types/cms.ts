export type AboutEntry = {
  id: number;
  title: string;
  image: string;
  bg?: string;
  position?: string;
  subtitle?: string;
  description: string[];
};

export type ContactInfo = {
  id: number;
  image: string;
  address: string;
  telephone: string;
  generalEnquiries: string;
  newBusinessEnquiries: string;
  careers: string;
};

import type { ProjectCategory } from '@/shared/components/frames/types';

export type Chapter = {
  id: string;
  title: string;
  subtitle: string;
  category: ProjectCategory;
  sortOrder?: number;
};

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

export type Chapter = {
  id: number;
  title: string;
  subtitle: string;
  categorySlug: string;
  sortOrder?: number;
};

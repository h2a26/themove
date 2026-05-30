export type FrameStyle = 'traditional' | 'contemporary';

export type ProjectCategory = string;

export type ProjectType = 'interior' | 'architecture' | 'both';

export type FrameArchetype =
  | 'heritage'
  | 'urban'
  | 'threshold'
  | 'interior-chamber'
  | 'garden'
  | 'hospitality-glow'
  | 'auto';

export type ProjectFrameMetadata = {
  title: string;
  frameArchetype?: FrameArchetype | 'auto';
};

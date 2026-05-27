export type FrameMood =
  | 'paris-morning'
  | 'london-mist'
  | 'traditional-golden'
  | 'contemporary-blue'
  | 'summer-bright'
  | 'winter-still'
  | 'yangon-mist'
  | 'mandalay-warm'
  | 'hill-station-calm';

export type FrameStyle = 'traditional' | 'contemporary';

export type ProjectCategory = 'residential' | 'commercial' | 'hospitality';

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
  location?: string;
  locationCity?: string;
  category?: ProjectCategory;
  style?: FrameStyle;
  mood?: string;
  moodTags?: string[];
  frameArchetype?: FrameArchetype | 'auto';
  season?: 'summer' | 'winter';
};

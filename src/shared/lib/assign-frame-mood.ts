import type { FrameArchetype, FrameMood, ProjectFrameMetadata } from '@/shared/components/frames/types';

const CITY_MOODS: Record<string, FrameMood> = {
  yangon: 'yangon-mist',
  mandalay: 'mandalay-warm',
  'pyin oo lwin': 'hill-station-calm',
  monywa: 'mandalay-warm',
};

const ARCHETYPE_MOODS: Record<FrameArchetype, FrameMood> = {
  heritage: 'traditional-golden',
  urban: 'contemporary-blue',
  threshold: 'mandalay-warm',
  'interior-chamber': 'mandalay-warm',
  garden: 'hill-station-calm',
  'hospitality-glow': 'summer-bright',
  auto: 'mandalay-warm',
};

export function resolveFrameArchetype(meta: ProjectFrameMetadata): Exclude<FrameArchetype, 'auto'> {
  if (meta.frameArchetype && meta.frameArchetype !== 'auto') {
    return meta.frameArchetype;
  }

  if (meta.category === 'hospitality') return 'hospitality-glow';
  if (meta.category === 'commercial') return 'threshold';

  const haystack = `${meta.title} ${meta.mood ?? ''} ${(meta.moodTags ?? []).join(' ')}`.toLowerCase();

  if (haystack.includes('heritage') || haystack.includes('classical')) return 'heritage';
  if (haystack.includes('garden') || haystack.includes('biophilic') || haystack.includes('spa')) {
    return 'garden';
  }
  if (haystack.includes('urban') || haystack.includes('condo')) return 'urban';
  if (haystack.includes('gold') || haystack.includes('retail') || haystack.includes('shop')) {
    return 'threshold';
  }

  return 'interior-chamber';
}

export function assignFrameMood(meta: ProjectFrameMetadata): FrameMood {
  if (meta.season === 'winter') return 'winter-still';
  if (meta.season === 'summer') return 'summer-bright';
  if (meta.style === 'traditional') return 'traditional-golden';
  if (meta.style === 'contemporary' && meta.category === 'commercial') return 'contemporary-blue';

  const city = (meta.locationCity ?? meta.location ?? '').toLowerCase();
  for (const [key, mood] of Object.entries(CITY_MOODS)) {
    if (city.includes(key)) return mood;
  }

  const archetype = resolveFrameArchetype(meta);
  return ARCHETYPE_MOODS[archetype] ?? 'mandalay-warm';
}

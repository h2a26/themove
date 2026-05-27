/**
 * Generates public/data/project-list.json and public/data/projects/{slug}/data.json
 * from Showcase Book 2023–2025 metadata. Images are placeholder Sanity CDN URLs.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const DATA_DIR = path.join(ROOT, 'public/data');
const PROJECTS_DIR = path.join(DATA_DIR, 'projects');

/** Portrait + landscape placeholders from legacy dummy projects */
const IMAGE_POOL = [
  'https://cdn.sanity.io/images/4jb8q7bc/production/725850fa288c724585c4e76e2655005cc3ce83ca-1440x1860.jpg?w=1440&h=1860&auto=format',
  'https://cdn.sanity.io/images/4jb8q7bc/production/c04a86c3615fef9bb3346ae02a11d341a8bd611e-1440x1860.jpg?w=1440&h=1860&auto=format',
  'https://cdn.sanity.io/images/4jb8q7bc/production/45a2c2a11346ddd7dc923a665e5c7a1b2be7ecc9-1440x1860.jpg?w=1440&h=1860&auto=format',
  'https://cdn.sanity.io/images/4jb8q7bc/production/abca6c234d691644d59b14b1ecc7fbcaee683948-3600x2571.jpg?w=3600&h=2571&auto=format',
  'https://cdn.sanity.io/images/4jb8q7bc/production/9e91c20edd51eb8d52c075783a6446e733bbab2f-3600x2325.jpg?w=3600&h=2325&auto=format',
  'https://cdn.sanity.io/images/4jb8q7bc/production/d49f78867e71355689930b999f45bcef36a4c1e5-1860x1201.jpg?w=1860&h=1201&auto=format',
  'https://cdn.sanity.io/images/4jb8q7bc/production/476280b78f60252d73e37d572fbc09fb2e4520fb-1440x1860.jpg?w=1440&h=1860&auto=format',
  'https://cdn.sanity.io/images/4jb8q7bc/production/697a7b32d12b34f9a26e2043d088fba0e1898d5a-1440x1860.jpg?w=1440&h=1860&auto=format',
  'https://cdn.sanity.io/images/4jb8q7bc/production/e0d4a31a31b34bbc740dcbe653201009b1ec8cb9-1440x1860.jpg?w=1440&h=1860&auto=format',
  'https://cdn.sanity.io/images/4jb8q7bc/production/4f1de826c7e68b775547d87e04b439fa2042c319-1440x1860.jpg?w=1440&h=1860&auto=format',
  'https://cdn.sanity.io/images/4jb8q7bc/production/2e24b4fa5920169d62b0b7ccb2f97cae0d2fc19d-1440x1860.jpg?w=1440&h=1860&auto=format',
  'https://cdn.sanity.io/images/4jb8q7bc/production/9869850e3fbc41a4711f95bab8c51d3ccadc9876-1440x1860.jpg?w=1440&h=1860&auto=format',
  'https://cdn.sanity.io/images/4jb8q7bc/production/893a121595e0480b0fd3fa7dedcb310462b16289-1440x1860.jpg?w=1440&h=1860&auto=format',
  'https://cdn.sanity.io/images/4jb8q7bc/production/52956ba9c93f0929fad99cd73024945a38be2f8e-1440x1860.jpg?w=1440&h=1860&auto=format',
  'https://cdn.sanity.io/images/4jb8q7bc/production/805b1f201587b66cf51a2fd247d408e7279d064f-1440x1860.jpg?w=1440&h=1860&auto=format',
  'https://cdn.sanity.io/images/4jb8q7bc/production/9c18893ae2c5cd4f35241ce3fc0a8cde846eb687-1440x1860.jpg?w=1440&h=1860&auto=format',
];

const BORDER_COLORS = [
  '#633b2f', '#B0BFDE', '#EEE9E2', '#AFDDFF', '#645E26', '#C6A664',
  '#FF8282', '#45519F', '#893521', '#f2e5dc', '#c3c0bb', '#8B7355',
];

const CATALOGUE = [
  { title: 'KT Residence', category: 'residential', city: 'Mandalay', area: '1,185 sqft', projectType: 'interior', moodTags: ['warm-minimal', 'modern'], frameArchetype: 'interior-chamber', style: 'contemporary', oneLine: 'Modern warm minimalism—cream walls, walnut accents, and concealed light.' },
  { title: 'MAAK Residence', category: 'residential', city: 'Mandalay', area: '1,296 sqft', projectType: 'interior', moodTags: ['heritage', 'warm-minimal'], frameArchetype: 'heritage', style: 'traditional', oneLine: 'Cultural reverence meets sleek modern luxury in Mandalay.' },
  { title: 'SSL Residence', category: 'residential', city: 'Yangon', area: '456 sqft', projectType: 'interior', moodTags: ['urban', 'warm-minimal'], frameArchetype: 'urban', style: 'contemporary', oneLine: 'A minimalist Yangon condo—calm, clarity, and soft material palettes.' },
  { title: 'KLG Residence', category: 'residential', city: 'Mandalay', area: '1,170 sqft', projectType: 'architecture', moodTags: ['classical', 'biophilic', 'accessible'], frameArchetype: 'heritage', style: 'traditional', oneLine: 'Classical architecture of care—flat floors, mango trees, and a welcoming porch.' },
  { title: 'MPP Residence', category: 'residential', city: 'Pyin Oo Lwin', area: '1,040 sqft', projectType: 'interior', moodTags: ['warm-minimal', 'contemporary'], frameArchetype: 'interior-chamber', style: 'contemporary', oneLine: 'Warm contemporary styling with gamer-centric tech aesthetics.' },
  { title: 'UWL Residence', category: 'residential', city: 'Mandalay', area: '3,956 sqft', projectType: 'interior', moodTags: ['serene', 'warm-minimal'], frameArchetype: 'garden', style: 'contemporary', oneLine: 'The art of taking away—a sanctuary home with a rooftop retreat.' },
  { title: 'Bungalow', category: 'residential', city: 'Yangon', area: '7,900 sqft', projectType: 'both', moodTags: ['spa', 'biophilic'], frameArchetype: 'garden', style: 'contemporary', oneLine: 'UVS Bungalow—jacuzzi under glass, Japanese shower, and warm textures.' },
  { title: 'TM Residence', category: 'residential', city: 'Mandalay', area: '1,800 sqft', projectType: 'architecture', moodTags: ['urban', 'minimal'], frameArchetype: 'urban', style: 'contemporary', oneLine: 'Minimalist exterior architecture on a narrow urban footprint.' },
  { title: '239 Residence', category: 'residential', city: 'Mandalay', area: null, projectType: 'interior', moodTags: ['warm-minimal'], frameArchetype: 'interior-chamber', style: 'contemporary', oneLine: 'Residential interior design in Mandalay.' },
  { title: 'TWA Residence', category: 'residential', city: 'Mandalay', area: null, projectType: 'interior', moodTags: ['warm-minimal'], frameArchetype: 'interior-chamber', style: 'contemporary', oneLine: 'Residential interior design in Mandalay.' },
  { title: 'HMM Residence', category: 'residential', city: 'Mandalay', area: null, projectType: 'interior', moodTags: ['warm-minimal'], frameArchetype: 'interior-chamber', style: 'contemporary', oneLine: 'Residential interior design in Mandalay.' },
  { title: 'Better U Hair & Wellness', category: 'commercial', city: 'Mandalay', area: null, projectType: 'interior', moodTags: ['spa', 'serene'], frameArchetype: 'hospitality-glow', style: 'contemporary', oneLine: 'Hair and wellness space designed for calm and renewal.' },
  { title: 'ATLAS Outlet', category: 'commercial', city: 'Pyin Oo Lwin', area: null, projectType: 'interior', moodTags: ['retail'], frameArchetype: 'threshold', style: 'contemporary', oneLine: 'Retail outlet interior in Pyin Oo Lwin.' },
  { title: 'Beauty Empire Cosmetic Shop', category: 'commercial', city: 'Mandalay', area: null, projectType: 'interior', moodTags: ['retail'], frameArchetype: 'threshold', style: 'contemporary', oneLine: 'Cosmetic retail interior with refined display logic.' },
  { title: 'Moe Kaung Gold Shop', category: 'commercial', city: 'Mandalay', area: null, projectType: 'interior', moodTags: ['retail', 'gold'], frameArchetype: 'threshold', style: 'traditional', oneLine: 'Gold shop interior—warm display and crafted detail.' },
  { title: 'LMT Office', category: 'commercial', city: 'Mandalay', area: null, projectType: 'interior', moodTags: ['urban', 'minimal'], frameArchetype: 'urban', style: 'contemporary', oneLine: 'Contemporary office interior in Mandalay.' },
  { title: 'Mini Mart', category: 'commercial', city: 'Yangon', area: null, projectType: 'interior', moodTags: ['retail'], frameArchetype: 'threshold', style: 'contemporary', oneLine: 'Urban mini mart—clarity and efficient circulation.' },
  { title: 'Mandalay Mahar Akarit', category: 'commercial', city: 'Mandalay', area: null, projectType: 'interior', moodTags: ['retail'], frameArchetype: 'threshold', style: 'contemporary', oneLine: 'Commercial interior in Mandalay.' },
  { title: 'Royal Auto Service', category: 'commercial', city: 'Mandalay', area: null, projectType: 'interior', moodTags: ['urban'], frameArchetype: 'urban', style: 'contemporary', oneLine: 'Auto service interior—functional precision and brand presence.' },
  { title: 'Shwe BonThar Gold & Jewellery Shop', category: 'commercial', city: 'Mandalay', area: null, projectType: 'interior', moodTags: ['retail', 'gold'], frameArchetype: 'threshold', style: 'traditional', oneLine: 'Jewellery retail—display, light, and material warmth.' },
  { title: 'Shwe Yamin Fancy & Bag Shop', category: 'commercial', city: 'Monywa', area: null, projectType: 'interior', moodTags: ['retail'], frameArchetype: 'threshold', style: 'contemporary', oneLine: 'Fancy goods and bag shop in Monywa.' },
  { title: 'Universe 51 Japanese Restaurant', category: 'hospitality', city: 'Yangon', area: null, projectType: 'interior', moodTags: ['japanese', 'urban'], frameArchetype: 'hospitality-glow', style: 'contemporary', oneLine: 'Japanese restaurant interior in Yangon.' },
  { title: 'Yadanar Moe Cafe', category: 'hospitality', city: 'Mandalay', area: null, projectType: 'interior', moodTags: ['warm-minimal'], frameArchetype: 'hospitality-glow', style: 'contemporary', oneLine: 'Cafe interior—warm, inviting, and quietly luxurious.' },
  { title: 'Coffee Burma Restaurant', category: 'hospitality', city: 'Pyin Oo Lwin', area: null, projectType: 'interior', moodTags: ['warm-minimal'], frameArchetype: 'hospitality-glow', style: 'contemporary', oneLine: 'Restaurant interior in the hill-station calm of Pyin Oo Lwin.' },
  { title: 'She Cafe', category: 'hospitality', city: 'Pyin Oo Lwin', area: null, projectType: 'interior', moodTags: ['warm-minimal'], frameArchetype: 'hospitality-glow', style: 'contemporary', oneLine: 'Cafe design with soft material palettes and gentle light.' },
  { title: 'Bokki', category: 'hospitality', city: 'Mandalay', area: null, projectType: 'interior', moodTags: ['contemporary'], frameArchetype: 'hospitality-glow', style: 'contemporary', oneLine: 'Hospitality interior in Mandalay.' },
  { title: 'UVS Canteen', category: 'hospitality', city: 'Yangon', area: null, projectType: 'interior', moodTags: ['urban'], frameArchetype: 'hospitality-glow', style: 'contemporary', oneLine: 'Canteen interior at Shwe Taung Gyar, Yangon.' },
  { title: 'Buzz Kaffee', category: 'hospitality', city: 'Mandalay', area: null, projectType: 'interior', moodTags: ['warm-minimal'], frameArchetype: 'hospitality-glow', style: 'contemporary', oneLine: 'Coffee shop interior in Mandalay.' },
  { title: 'Ingyin Myaing Academy', category: 'hospitality', city: 'Mandalay', area: null, projectType: 'interior', moodTags: ['serene'], frameArchetype: 'interior-chamber', style: 'contemporary', oneLine: 'Education and academy space in Mandalay.' },
  { title: 'Coffee Education Center', category: 'hospitality', city: 'Pyin Oo Lwin', area: null, projectType: 'interior', moodTags: ['warm-minimal'], frameArchetype: 'hospitality-glow', style: 'contemporary', oneLine: 'Coffee education center in Pyin Oo Lwin.' },
  { title: 'Hotel Wonderland', category: 'hospitality', city: 'Mandalay', area: null, projectType: 'interior', moodTags: ['luxury', 'hospitality'], frameArchetype: 'hospitality-glow', style: 'contemporary', oneLine: 'Hotel interior—guest experience through atmosphere and light.' },
  { title: 'Apollo Bar & KTV', category: 'hospitality', city: 'Yangon', area: null, projectType: 'interior', moodTags: ['urban', 'night'], frameArchetype: 'hospitality-glow', style: 'contemporary', oneLine: 'Bar and KTV interior in Yangon.' },
];

const PURPOSES = {
  'kt-residence': 'The interior design of KT Residence epitomizes Modern Warm Minimalism, seamlessly blending functional luxury with a serene, organic atmosphere. Warm cream walls, soft beige textiles, and rich walnut accents ground the home with concealed LED light throughout.',
  'maak-residence': 'The interior design of the MAAK Residence masterfully synthesizes timeless cultural reverence with sleek, modern luxury, utilizing deliberate lighting to create a cohesive, premium, and airy atmosphere throughout.',
  'ssl-residence': 'Located in Yangon, SSL Residence is a minimalist condo interior designed to bring calm and clarity into everyday urban living through simplicity, soft material palettes, and carefully balanced proportions.',
  'klg-residence': 'The KLG Residence is a gift of comfort for beloved family in Mandalay—classical and timeless, with flat floors, preserved mango trees, and a generous front porch for evening rest in the shade.',
  'mpp-residence': 'The MPP Residence blends modern minimalism, warm contemporary styling, and gamer-centric tech aesthetics across suites finished in olive greens, creams, warm wood, and integrated ambient light.',
  'uwl-residence': 'For UWL Residence we mastered the art of taking away—creating a home that breathes without clutter, beginning with a bedroom redesign and growing into a full home and rooftop pool retreat in Mandalay.',
  'bungalow': 'The UVS Bungalow is built for wine and conversation in the living room and sanctuary in the bedroom, with a jacuzzi beneath a glass roof and Japanese-style shower surrounded by warm textures.',
  'tm-residence': 'TM Residence showcases minimalist exterior architecture that maximizes a narrow urban footprint through sleek verticality, warm wood accents, and integrated greenery on a Mandalay site.',
};

function slugify(title) {
  return title
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function sectorLabel(category) {
  if (category === 'residential') return 'Residential';
  if (category === 'commercial') return 'Commercial';
  return 'Hospitality & F&B';
}

function projectTypeLabel(type) {
  if (type === 'architecture') return 'Architecture';
  if (type === 'both') return 'Interior Design & Landscape';
  return 'Interior Design';
}

function buildGallery(startIndex, title) {
  const items = [];
  for (let i = 0; i < 5; i++) {
    const url = IMAGE_POOL[(startIndex + i) % IMAGE_POOL.length];
    const landscape = url.includes('3600') || url.includes('1860x1201');
    items.push({
      id: i + 1,
      image: url,
      aspect: landscape ? 'landscape' : 'portrait',
      ...(i === 0 ? {} : {}),
    });
  }
  return items;
}

function removeLegacyProjects() {
  if (!fs.existsSync(PROJECTS_DIR)) fs.mkdirSync(PROJECTS_DIR, { recursive: true });
  for (const name of fs.readdirSync(PROJECTS_DIR)) {
    const full = path.join(PROJECTS_DIR, name);
    if (fs.statSync(full).isDirectory()) {
      fs.rmSync(full, { recursive: true, force: true });
    }
  }
}

function main() {
  removeLegacyProjects();

  const list = [];
  let imageCursor = 0;

  CATALOGUE.forEach((entry, index) => {
    const slug = slugify(entry.title);
    const location = `${entry.city}, Myanmar`;
    const purpose = PURPOSES[slug] || entry.oneLine;
    const heroImage = IMAGE_POOL[imageCursor % IMAGE_POOL.length];
    imageCursor += 1;

    const meta = {
      slug,
      title: entry.title,
      category: entry.category,
      locationCity: entry.city,
      locationCountry: 'Myanmar',
      location,
      projectType: entry.projectType,
      projectArea: entry.area,
      moodTags: entry.moodTags,
      style: entry.style,
      frameArchetype: entry.frameArchetype,
      oneLine: entry.oneLine,
      purpose,
      showcaseYear: '2023-2025',
    };

    const gallery = buildGallery(imageCursor, entry.title);
    imageCursor += 2;

    const dataFile = { meta, gallery };
    const projectDir = path.join(PROJECTS_DIR, slug);
    fs.mkdirSync(projectDir, { recursive: true });
    fs.writeFileSync(path.join(projectDir, 'data.json'), JSON.stringify(dataFile, null, 2) + '\n');

    list.push({
      id: index + 1,
      slug,
      title: entry.title,
      description: entry.oneLine,
      image: heroImage,
      routeTo: `/projects/${slug}`,
      category: entry.category,
      chapterOrder: index + 1,
      locationCity: entry.city,
      locationCountry: 'Myanmar',
      location,
      projectType: entry.projectType,
      projectArea: entry.area,
      moodTags: entry.moodTags,
      style: entry.style,
      frameArchetype: entry.frameArchetype,
      borderColor: BORDER_COLORS[index % BORDER_COLORS.length],
    });
  });

  fs.writeFileSync(path.join(DATA_DIR, 'project-list.json'), JSON.stringify(list, null, 2) + '\n');

  const chapters = [
    { id: 'residential', title: 'Spaces to live', subtitle: 'Residential', category: 'residential' },
    { id: 'commercial', title: 'Spaces to gather & work', subtitle: 'Commercial', category: 'commercial' },
    { id: 'hospitality', title: 'Spaces to serve', subtitle: 'Hospitality & F&B', category: 'hospitality' },
  ];
  fs.writeFileSync(path.join(DATA_DIR, 'chapters.json'), JSON.stringify(chapters, null, 2) + '\n');

  console.log(`Wrote ${list.length} projects and ${chapters.length} chapters.`);
}

main();

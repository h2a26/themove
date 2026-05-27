# The Move — static data

## Source of truth

- **Catalogue:** `The Move-Project Showcase Book 2023-2025.pdf` (32 Myanmar projects)
- **Images:** Placeholder Sanity CDN URLs until real photography is uploaded

## Files

| File | Purpose |
|------|---------|
| `project-list.json` | Scroll of Spaces — ordered catalogue (residential → commercial → hospitality) |
| `chapters.json` | English chapter interstitials for `/projects` |
| `projects/{slug}/data.json` | Per-project `meta` + `gallery` |

## Regenerate catalogue

```bash
node scripts/ingest-myanmar-catalogue.mjs
```

Edit project copy in `scripts/ingest-myanmar-catalogue.mjs` (`CATALOGUE`, `PURPOSES`) then re-run.

## Schema (`projects/{slug}/data.json`)

```json
{
  "meta": {
    "slug": "kt-residence",
    "title": "KT Residence",
    "category": "residential",
    "locationCity": "Mandalay",
    "locationCountry": "Myanmar",
    "location": "Mandalay, Myanmar",
    "projectType": "interior",
    "projectArea": "1,185 sqft",
    "moodTags": ["warm-minimal"],
    "style": "contemporary",
    "frameArchetype": "interior-chamber",
    "oneLine": "…",
    "purpose": "…",
    "showcaseYear": "2023-2025"
  },
  "gallery": [{ "id": 1, "image": "…", "aspect": "portrait" }]
}
```

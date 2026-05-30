import { SaveButton } from '@/shared/components/SaveButton';
import { ShareBar } from './ShareBar';

type ProjectDetailsProps = {
  title?: string;
  caption?: string;
  client?: string;
  location?: string;
  category?: string;
  locationCity?: string;
  locationCountry?: string;
  status?: string;
  sectors?: string[];
  projectType?: string;
  projectArea?: string | null;
  moodTags?: string[];
  description?: string;
  philosophy?: string;
  purpose?: string;
  slug?: string;
  userId?: string | null;
  isSaved?: boolean;
};

export const ProjectDetails = ({
  title,
  caption,
  client,
  location,
  category,
  locationCity,
  locationCountry,
  status,
  sectors,
  projectType,
  projectArea,
  moodTags,
  description,
  philosophy,
  purpose,
  slug,
  userId,
  isSaved,
}: ProjectDetailsProps) => {
  const normalize = (text: string) =>
    text
      .replace(/\s+/g, ' ')
      .replace(/\s*([.!?])\s*/g, '$1 ')
      .trim();

  // Deliberate line-break template (arbol-like vertical rhythm) without changing data.
  const toVerticalPoem = (text?: string) => {
    if (!text) return '';

    const clean = normalize(text);
    const cat = (category ?? '').toLowerCase();
    const pType = (projectType ?? '').toLowerCase();

    const dashSplit = clean.split(/—|–/);
    if (dashSplit.length >= 2) {
      const head = dashSplit[0].trim();
      const tail = dashSplit.slice(1).join('—').trim();
      const tailParts = tail
        .split(/,|;| and /g)
        .map((s) => s.trim())
        .filter(Boolean);

      const lines: string[] = [];
      if (head) lines.push(head);

      if (cat === 'residential') {
        if (tailParts[0]) lines.push(tailParts[0]);
        if (tailParts[1] && lines.length < 3) lines.push(tailParts[1]);
      } else if (cat === 'commercial') {
        if (tailParts[0]) lines.push(tailParts[0]);
        if (tailParts[1] && lines.length < 3) lines.push(tailParts[1]);
        if (!lines[1]) lines.push(tail);
      } else if (cat === 'hospitality') {
        if (tailParts[0]) lines.push(tailParts[0]);
        if (tailParts[1] && lines.length < 3) lines.push(tailParts[1]);
        if (tailParts[2] && lines.length < 4) lines.push(tailParts[2]);
      } else {
        // fallback: 2-3 lines
        if (tailParts[0]) lines.push(tailParts[0]);
        if (tailParts[1] && lines.length < 3) lines.push(tailParts[1]);
      }

      return lines.slice(0, 4).join('\n').trim();
    }

    // Architecture often reads as "feature leads feeling" — prefer first punctuation sentence breaks.
    if (pType === 'architecture' || cat === 'residential') {
      const sentences = clean.split(/(?<=[.!?])\s+/).filter(Boolean);
      if (sentences.length >= 2) {
        return [sentences[0], sentences[1], sentences.slice(2).join(' ')].filter(Boolean).slice(0, 4).join('\n');
      }
    }

    // Generic fallback: commas / semicolons into up to 3–4 lines.
    const parts = clean
      .split(/,|;|\s+\u2014\s+/g)
      .map((s) => s.trim())
      .filter(Boolean);
    if (parts.length > 1) return parts.slice(0, 4).join('\n');

    // Last fallback: chunk by length.
    const words = clean.split(' ');
    const maxLen = 38;
    const lines: string[] = [];
    let cur = '';
    for (const w of words) {
      const next = cur ? `${cur} ${w}` : w;
      if (next.length > maxLen && cur) {
        lines.push(cur);
        cur = w;
        if (lines.length >= 4) break;
      } else {
        cur = next;
      }
    }
    if (cur) lines.push(cur);
    return lines.slice(0, 4).join('\n').trim();
  };

  const poemDescription = toVerticalPoem(description);
  const poemPurpose = toVerticalPoem(purpose);
  const poemPhilosophy = philosophy
    ? philosophy
        .split('\n')
        .map((l) => l.trim())
        .filter(Boolean)
        .join('\n')
    : '';

  const metaRows: Array<{ label: string; value?: string }> = [
    { label: 'CITY', value: locationCity || undefined },
    { label: 'COUNTRY', value: locationCountry || undefined },
    { label: 'TYPE', value: projectType || status || undefined },
    { label: 'AREA', value: projectArea || undefined },
    { label: 'TAGS', value: sectors?.length ? sectors.join('\n') : undefined },
    { label: 'MOOD TAGS', value: moodTags?.length ? moodTags.join('\n') : undefined },
  ].filter((row) => Boolean(row.value));

  return (
    <div className="text-[var(--mode-text-primary)] px-8 md:px-20 py-20 grid md:grid-cols-12 gap-y-12 text-xs md:text-sm">
      <aside className="md:col-span-3 md:pr-8">
        <div className="max-w-[15rem]">
          {caption && (
            <p
              className="text-[10px] uppercase tracking-[0.32em] text-[var(--mode-text-primary)]/70"
              style={{ fontFamily: 'var(--font-euclid-circular-b)' }}
            >
              {caption}
            </p>
          )}

          {metaRows.length > 0 && (
            <div className="mt-10 space-y-7">
              {metaRows.map(({ label, value }) => (
                <div key={label}>
                  <p
                    className="text-[10px] uppercase tracking-[0.32em] text-[var(--mode-text-primary)]/70"
                    style={{ fontFamily: 'var(--font-euclid-circular-b)' }}
                  >
                    {label}
                  </p>
                  <p
                    className="mt-2 text-[12px] leading-6 tracking-[0.08em] text-[var(--mode-text-primary)] whitespace-pre-line"
                    style={{ fontFamily: 'var(--font-allrounder-antiqua)' }}
                  >
                    {value}
                  </p>
                </div>
              ))}
            </div>
          )}

          {slug !== undefined && (
            <div className="mt-10 flex flex-col gap-4">
              <SaveButton
                slug={slug}
                userId={userId ?? null}
                initialSaved={isSaved ?? false}
                variant="inline"
              />
              <ShareBar slug={slug} title={title ?? caption ?? ''} />
            </div>
          )}
        </div>
      </aside>

      <section className="md:col-span-6 md:col-start-4 md:pl-0 flex flex-col items-center text-center space-y-10">
        {poemDescription && (
          <div className="max-w-[40ch]">
            <p
              className="text-[9px] uppercase tracking-[0.34em] text-[var(--mode-text-primary)]/65"
              style={{ fontFamily: 'var(--font-euclid-circular-b)' }}
            >
              DESCRIPTION
            </p>
            <p
              className="mt-4 text-[13px] leading-7 tracking-[0.08em] text-[var(--mode-text-primary)] whitespace-pre-line"
              style={{ fontFamily: 'var(--font-euclid)' }}
            >
              {poemDescription}
            </p>
          </div>
        )}

        {poemPhilosophy && (
          <div className="max-w-[40ch]">
            <p
              className="text-[9px] uppercase tracking-[0.34em] text-[var(--mode-text-primary)]/65"
              style={{ fontFamily: 'var(--font-euclid-circular-b)' }}
            >
              PHILOSOPHY
            </p>
            <p
              className="mt-4 text-[13px] leading-7 tracking-[0.12em] text-[var(--mode-text-primary)] whitespace-pre-line"
              style={{ fontFamily: 'var(--font-allrounder-antiqua)' }}
            >
              {poemPhilosophy}
            </p>
          </div>
        )}

        {poemPurpose && (
          <div className="max-w-[40ch]">
            <p
              className="text-[9px] uppercase tracking-[0.34em] text-[var(--mode-text-primary)]/65"
              style={{ fontFamily: 'var(--font-euclid-circular-b)' }}
            >
              STORY
            </p>
            <p
              className="mt-4 text-[13px] leading-8 tracking-[0.06em] text-[var(--mode-text-primary)] whitespace-pre-line"
              style={{ fontFamily: 'var(--font-euclid)' }}
            >
              {poemPurpose}
            </p>
          </div>
        )}
      </section>

      {/* Right-side empty space so DESCRIPTION/PHILOSOPHY/STORY center on the whole container */}
      <div className="hidden md:block md:col-span-3" />
    </div>
  );
};

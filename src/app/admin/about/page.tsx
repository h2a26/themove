import { getAbout } from '@/shared/lib/blob-data';
import { blobMediaUrl } from '@/shared/lib/blob-client';
import { updateAboutEntry } from './actions';
import Image from 'next/image';

export default async function AdminAboutPage() {
  let entries: Awaited<ReturnType<typeof getAbout>> = [];
  let error = '';
  try {
    entries = await getAbout();
  } catch {
    error = 'Could not load about data. Run the migration script first.';
  }

  return (
    <div className="p-8 max-w-3xl">
      <div className="mb-8">
        <p className="text-[10px] uppercase tracking-[4px] text-[var(--mode-text-tertiary)] mb-1">CMS</p>
        <h1 className="text-2xl font-semibold tracking-wide text-[var(--mode-text-primary)]">About / Team</h1>
      </div>

      {error && (
        <div className="bg-amber-50 border border-amber-200 text-amber-800 rounded-lg px-4 py-3 text-sm mb-6">{error}</div>
      )}

      <div className="flex flex-col gap-8">
        {entries.map((entry) => {
          const updateBound = updateAboutEntry.bind(null, entry.id);
          const imgSrc = blobMediaUrl(entry.image);

          return (
            <div key={entry.id} className="bg-white/80 border border-[var(--mode-border)] rounded-lg p-6">
              <div className="flex gap-4 mb-5">
                <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                  <Image src={imgSrc} alt={entry.title} fill className="object-cover" unoptimized />
                </div>
                <div>
                  <p className="font-semibold text-[var(--mode-text-primary)]">{entry.title}</p>
                  {entry.position && <p className="text-sm text-[var(--mode-text-secondary)]">{entry.position}</p>}
                </div>
              </div>

              <form action={updateBound} className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Title" name="title" defaultValue={entry.title} required />
                  <Field label="Position" name="position" defaultValue={entry.position ?? ''} />
                  <Field label="Subtitle" name="subtitle" defaultValue={entry.subtitle ?? ''} />
                  <Field label="Background class" name="bg" defaultValue={entry.bg ?? ''} hint="e.g. bg-[#681313]" />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs tracking-wide text-[var(--mode-text-secondary)]">Description (separate paragraphs with blank line)</label>
                  <textarea
                    name="description"
                    rows={8}
                    defaultValue={entry.description.join('\n\n')}
                    className="border border-[var(--mode-border)] rounded px-3 py-2 text-sm text-[var(--mode-text-primary)] bg-white focus:outline-none focus:ring-1 focus:ring-[var(--color-deep-earth)] resize-y"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs tracking-wide text-[var(--mode-text-secondary)]">Replace Image</label>
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    className="text-sm text-[var(--mode-text-secondary)] file:mr-3 file:py-1.5 file:px-4 file:rounded file:border file:border-[var(--mode-border)] file:text-xs file:uppercase file:tracking-widest file:text-[var(--mode-text-primary)] file:bg-white"
                  />
                </div>

                <button
                  type="submit"
                  className="self-start bg-[var(--color-deep-earth)] text-white text-[11px] uppercase tracking-[3px] px-6 py-2.5 rounded hover:opacity-90 transition-opacity"
                >
                  Save
                </button>
              </form>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Field({ label, name, required, defaultValue, hint }: { label: string; name: string; required?: boolean; defaultValue?: string; hint?: string }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs tracking-wide text-[var(--mode-text-secondary)]">{label}{required && ' *'}</label>
      <input
        name={name}
        required={required}
        defaultValue={defaultValue ?? ''}
        className="border border-[var(--mode-border)] rounded px-3 py-2 text-sm text-[var(--mode-text-primary)] bg-white focus:outline-none focus:ring-1 focus:ring-[var(--color-deep-earth)]"
      />
      {hint && <p className="text-[11px] text-[var(--mode-text-tertiary)]">{hint}</p>}
    </div>
  );
}

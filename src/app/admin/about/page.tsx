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
    error = 'Could not load about data.';
  }

  return (
    <div className="p-8 max-w-3xl">
      <div className="mb-8">
        <p className="text-xs uppercase tracking-widest text-gray-400 mb-1">CMS</p>
        <h1 className="text-2xl font-semibold text-gray-900">About / Team</h1>
      </div>

      {error && (
        <div className="bg-amber-50 border border-amber-200 text-amber-800 rounded-lg px-4 py-3 text-sm mb-6">{error}</div>
      )}

      <div className="flex flex-col gap-6">
        {entries.map((entry) => {
          const updateBound = updateAboutEntry.bind(null, entry.id);

          return (
            <div key={entry.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden">
              {/* Entry header */}
              <div className="flex items-center gap-4 px-5 py-4 border-b border-gray-100">
                <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                  <Image
                    src={blobMediaUrl(entry.image)}
                    alt={entry.title}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{entry.title}</p>
                  {entry.position && <p className="text-xs text-gray-400">{entry.position}</p>}
                </div>
              </div>

              <form action={updateBound} className="p-5 flex flex-col gap-5">
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Name" name="title" defaultValue={entry.title} required />
                  <Field label="Position" name="position" defaultValue={entry.position ?? ''} />
                  <Field label="Subtitle" name="subtitle" defaultValue={entry.subtitle ?? ''} />
                  <Field label="Background class" name="bg" defaultValue={entry.bg ?? ''} hint="e.g. bg-[#681313]" />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs uppercase tracking-widest text-gray-400">Description</label>
                  <p className="text-[11px] text-gray-400">Separate paragraphs with a blank line.</p>
                  <textarea
                    name="description"
                    rows={8}
                    defaultValue={entry.description.join('\n\n')}
                    className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 bg-white focus:outline-none focus:ring-1 focus:ring-gray-900 resize-y"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs uppercase tracking-widest text-gray-400">Replace Image</label>
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    className="text-sm text-gray-500 file:mr-3 file:py-1.5 file:px-4 file:rounded-lg file:border file:border-gray-200 file:text-xs file:uppercase file:tracking-widest file:text-gray-700 file:bg-white hover:file:bg-gray-50"
                  />
                </div>

                <div>
                  <button
                    type="submit"
                    className="bg-gray-900 text-white text-xs uppercase tracking-widest px-5 py-2.5 rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Field({
  label, name, required, defaultValue, hint,
}: {
  label: string; name: string; required?: boolean; defaultValue?: string; hint?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs uppercase tracking-widest text-gray-400">{label}{required && ' *'}</label>
      <input
        name={name}
        required={required}
        defaultValue={defaultValue ?? ''}
        className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 bg-white focus:outline-none focus:ring-1 focus:ring-gray-900"
      />
      {hint && <p className="text-[11px] text-gray-400">{hint}</p>}
    </div>
  );
}

import { notFound } from 'next/navigation';
import { getProjectMeta, getProjectGallery } from '@/shared/lib/blob-data';
import { blobMediaUrl } from '@/shared/lib/blob-client';
import { ProjectForm } from '../_components/ProjectForm';
import { updateProject, deleteProject, addGalleryImage, removeGalleryImage } from './actions';
import Image from 'next/image';
import Link from 'next/link';

interface Props { params: Promise<{ slug: string }> }

export default async function EditProjectPage({ params }: Props) {
  const { slug } = await params;

  let meta: Awaited<ReturnType<typeof getProjectMeta>>;
  let gallery: Awaited<ReturnType<typeof getProjectGallery>>;
  try {
    [meta, gallery] = await Promise.all([getProjectMeta(slug), getProjectGallery(slug)]);
  } catch {
    return notFound();
  }

  const updateBound = updateProject.bind(null, slug);
  const deleteBound = deleteProject.bind(null, slug);
  const addImageBound = addGalleryImage.bind(null, slug);

  return (
    <div className="p-8 max-w-3xl">
      <div className="flex items-end justify-between mb-8">
        <div>
          <p className="text-[10px] uppercase tracking-[4px] text-[var(--mode-text-tertiary)] mb-1">
            <Link href="/admin/projects" className="hover:text-[var(--mode-text-primary)]">Projects</Link> / Edit
          </p>
          <h1 className="text-2xl font-semibold tracking-wide text-[var(--mode-text-primary)]">{meta.title}</h1>
        </div>
        <div className="flex gap-3">
          <Link
            href={`/projects/${slug}`}
            target="_blank"
            className="text-[11px] uppercase tracking-[2px] text-[var(--mode-text-tertiary)] hover:text-[var(--mode-text-primary)] border border-[var(--mode-border)] rounded px-4 py-2 transition-colors"
          >
            View →
          </Link>
          <form action={deleteBound}>
            <button
              type="submit"
              className="text-[11px] uppercase tracking-[2px] text-red-600 hover:bg-red-50 border border-red-200 rounded px-4 py-2 transition-colors"
              onClick={(e) => { if (!confirm('Delete this project?')) e.preventDefault(); }}
            >
              Delete
            </button>
          </form>
        </div>
      </div>

      <ProjectForm
        action={updateBound}
        defaultValues={{ ...meta, coverImage: meta.oneLine ? undefined : undefined }}
        isEdit
      />

      {/* Gallery */}
      <div className="mt-8">
        <h2 className="text-[10px] uppercase tracking-[4px] text-[var(--mode-text-tertiary)] mb-4">Gallery ({gallery.length} images)</h2>

        {gallery.length > 0 && (
          <div className="grid grid-cols-4 gap-3 mb-6">
            {gallery.map((item) => {
              const removeBound = removeGalleryImage.bind(null, slug, item.id);
              return (
                <div key={item.id} className="relative group">
                  <div className="relative aspect-[3/4] rounded overflow-hidden bg-gray-100">
                    <Image
                      src={blobMediaUrl(item.image)}
                      alt={`Gallery ${item.id}`}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <p className="text-[10px] text-[var(--mode-text-tertiary)] text-center mt-1">{item.aspect}</p>
                  <form action={removeBound} className="mt-1">
                    <button
                      type="submit"
                      className="w-full text-[10px] uppercase tracking-widest text-red-500 hover:text-red-700 transition-colors"
                    >
                      Remove
                    </button>
                  </form>
                </div>
              );
            })}
          </div>
        )}

        <form action={addImageBound} className="bg-white/80 border border-[var(--mode-border)] rounded-lg p-5 flex flex-col gap-4">
          <p className="text-[10px] uppercase tracking-[3px] text-[var(--mode-text-tertiary)]">Add Gallery Image</p>
          <div className="flex gap-4 items-end">
            <div className="flex-1">
              <input
                type="file"
                name="image"
                accept="image/*"
                required
                className="text-sm text-[var(--mode-text-secondary)] file:mr-3 file:py-1.5 file:px-4 file:rounded file:border file:border-[var(--mode-border)] file:text-xs file:uppercase file:tracking-widest file:text-[var(--mode-text-primary)] file:bg-white"
              />
            </div>
            <div>
              <label className="text-xs text-[var(--mode-text-secondary)] block mb-1">Aspect</label>
              <select
                name="aspect"
                className="border border-[var(--mode-border)] rounded px-3 py-2 text-sm bg-white focus:outline-none"
              >
                <option value="portrait">Portrait</option>
                <option value="landscape">Landscape</option>
                <option value="square">Square</option>
              </select>
            </div>
            <button
              type="submit"
              className="bg-[var(--color-deep-earth)] text-white text-[11px] uppercase tracking-[2px] px-5 py-2 rounded hover:opacity-90 transition-opacity whitespace-nowrap"
            >
              Upload
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

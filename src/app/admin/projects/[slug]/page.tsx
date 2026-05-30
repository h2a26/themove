import { notFound } from 'next/navigation';
import { getProjectMeta, getProjectGallery, getCategories } from '@/shared/lib/blob-data';
import { blobMediaUrl } from '@/shared/lib/blob-client';
import { ProjectForm } from '../_components/ProjectForm';
import { updateProject, deleteProject, addGalleryImage, removeGalleryImage } from './actions';
import { ConfirmButton } from '@/app/admin/_components/ConfirmButton';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, Trash2, Plus } from 'lucide-react';

interface Props { params: Promise<{ slug: string }> }

export default async function EditProjectPage({ params }: Props) {
  const { slug } = await params;

  let meta: Awaited<ReturnType<typeof getProjectMeta>>;
  let gallery: Awaited<ReturnType<typeof getProjectGallery>>;
  try {
    [meta, gallery] = await Promise.all([getProjectMeta(slug), getProjectGallery(slug)]);
  } catch (err) {
    if (err instanceof Error && err.message.includes('not found')) return notFound();
    throw err;
  }

  const categories = await getCategories().catch(() => []);

  const updateBound = updateProject.bind(null, slug);
  const deleteBound = deleteProject.bind(null, slug);
  const addImageBound = addGalleryImage.bind(null, slug);

  return (
    <div className="p-8 max-w-3xl">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <Link
            href="/admin/projects"
            className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-900 transition-colors mb-2"
          >
            <ArrowLeft size={12} />
            Projects
          </Link>
          <h1 className="text-2xl font-semibold text-gray-900">{meta.title}</h1>
          <p className="text-xs text-gray-400 font-mono mt-0.5">{slug}</p>
        </div>
        <div className="flex items-center gap-2 mt-1">
          <Link
            href={`/projects/${slug}`}
            target="_blank"
            className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-900 border border-gray-200 rounded-lg px-3.5 py-2 hover:bg-gray-50 transition-colors"
          >
            <ExternalLink size={12} />
            View
          </Link>
          <ConfirmButton
            formAction={deleteBound}
            message="Delete this project? This cannot be undone."
            className="flex items-center gap-1.5 text-xs text-red-500 hover:text-red-700 border border-red-200 rounded-lg px-3.5 py-2 hover:bg-red-50 transition-colors"
          >
            <Trash2 size={12} />
            Delete
          </ConfirmButton>
        </div>
      </div>

      {/* Project details form */}
      <ProjectForm action={updateBound} defaultValues={meta} isEdit categories={categories} />

      {/* Gallery */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xs uppercase tracking-widest text-gray-400">
            Gallery
            <span className="ml-1.5 text-gray-300">({gallery.length})</span>
          </h2>
        </div>

        {gallery.length > 0 && (
          <div className="grid grid-cols-4 gap-3 mb-5">
            {gallery.map((item) => {
              const removeBound = removeGalleryImage.bind(null, slug, item.id);
              return (
                <div key={item.id} className="group">
                  <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-gray-100">
                    <Image
                      src={blobMediaUrl(item.image)}
                      alt={`Gallery ${item.id}`}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                  </div>
                  <div className="flex items-center justify-between mt-1.5 px-0.5">
                    <span className="text-[10px] text-gray-400">{item.aspect}</span>
                    <ConfirmButton
                      formAction={removeBound}
                      message="Remove this image?"
                      className="text-[10px] text-red-400 hover:text-red-600 transition-colors"
                    >
                      Remove
                    </ConfirmButton>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Add image */}
        <div className="bg-white border border-dashed border-gray-300 rounded-xl p-5">
          <p className="text-xs uppercase tracking-widest text-gray-400 mb-4">Add Image</p>
          <form action={addImageBound} className="flex gap-4 items-end">
            <div className="flex-1">
              <input
                type="file"
                name="image"
                accept="image/*"
                required
                className="text-sm text-gray-500 file:mr-3 file:py-1.5 file:px-4 file:rounded-lg file:border file:border-gray-200 file:text-xs file:uppercase file:tracking-widest file:text-gray-700 file:bg-white hover:file:bg-gray-50"
              />
            </div>
            <div className="flex flex-col gap-1.5 shrink-0">
              <label className="text-xs uppercase tracking-widest text-gray-400">Aspect</label>
              <select
                name="aspect"
                className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 bg-white focus:outline-none focus:ring-1 focus:ring-gray-900"
              >
                <option value="portrait">Portrait</option>
                <option value="landscape">Landscape</option>
                <option value="square">Square</option>
              </select>
            </div>
            <button
              type="submit"
              className="flex items-center gap-1.5 bg-gray-900 text-white text-xs uppercase tracking-widest px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors shrink-0"
            >
              <Plus size={12} />
              Upload
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

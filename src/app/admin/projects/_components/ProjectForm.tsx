'use client';

import type { ProjectMeta } from '@/shared/types/project';
import type { Category } from '@/shared/lib/blob-data';
import { blobMediaUrl } from '@/shared/lib/blob-client';
import Image from 'next/image';

const PROJECT_TYPES = ['interior', 'architecture', 'both'] as const;
const STYLES = ['', 'traditional', 'contemporary'] as const;
const ARCHETYPES = ['auto', 'heritage', 'urban', 'threshold', 'interior-chamber', 'garden', 'hospitality-glow'] as const;

type Props = {
  action: (formData: FormData) => Promise<void>;
  defaultValues?: Partial<ProjectMeta & { coverImage?: string }>;
  isEdit?: boolean;
  categories: Category[];
};

export function ProjectForm({ action, defaultValues, isEdit, categories }: Props) {
  const v = defaultValues ?? {};

  return (
    <form action={action} className="flex flex-col gap-5">
      <Section label="Identity">
        <div className="grid grid-cols-2 gap-4">
          <Field label="Title *" name="title" required defaultValue={v.title} />
          <Field
            label="Slug *"
            name="slug"
            required
            defaultValue={v.slug}
            disabled={isEdit}
            hint="kebab-case · e.g. kt-residence"
          />
        </div>
      </Section>

      <Section label="Location">
        <div className="grid grid-cols-3 gap-4">
          <Field label="City *" name="locationCity" required defaultValue={v.locationCity} />
          <Field label="Country *" name="locationCountry" required defaultValue={v.locationCountry ?? 'Myanmar'} />
          <Field label="Display *" name="location" required defaultValue={v.location} hint="e.g. Mandalay, Myanmar" />
        </div>
      </Section>

      <Section label="Classification">
        <div className="grid grid-cols-3 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs uppercase tracking-widest text-gray-400">Category *</label>
            <select
              name="category"
              required
              defaultValue={v.category ?? ''}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 bg-white focus:outline-none focus:ring-1 focus:ring-gray-900"
            >
              <option value="">— select —</option>
              {categories.map((c) => (
                <option key={c.slug} value={c.slug}>{c.name}</option>
              ))}
            </select>
          </div>
          <SelectField label="Project Type *" name="projectType" options={PROJECT_TYPES} required defaultValue={v.projectType} />
          <SelectField label="Style" name="style" options={STYLES} defaultValue={v.style ?? ''} />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <SelectField label="Frame Archetype *" name="frameArchetype" options={ARCHETYPES} required defaultValue={v.frameArchetype ?? 'auto'} />
          <Field label="Project Area" name="projectArea" defaultValue={v.projectArea ?? ''} hint="e.g. 1,200 sqft" />
          <Field label="Mood Tags" name="moodTags" defaultValue={v.moodTags?.join(', ') ?? ''} hint="comma-separated" />
        </div>
      </Section>

      <Section label="Description">
        <Field label="One-Line *" name="oneLine" required defaultValue={v.oneLine} />
        <TextareaField label="Purpose / Story *" name="purpose" required defaultValue={v.purpose} rows={4} />
      </Section>

      <Section label="Cover Image">
        {v.coverImage && (
          <div className="relative w-28 h-36 rounded-lg overflow-hidden">
            <Image src={blobMediaUrl(v.coverImage)} alt="Cover" fill className="object-cover" unoptimized />
          </div>
        )}
        <div className="flex flex-col gap-1.5">
          <input
            type="file"
            name="coverImage"
            accept="image/*"
            className="text-sm text-gray-500 file:mr-3 file:py-1.5 file:px-4 file:rounded-lg file:border file:border-gray-200 file:text-xs file:uppercase file:tracking-widest file:text-gray-700 file:bg-white hover:file:bg-gray-50"
          />
          {isEdit && <p className="text-[11px] text-gray-400">Leave empty to keep existing image.</p>}
        </div>
      </Section>

      <div>
        <button
          type="submit"
          className="bg-gray-900 text-white text-xs uppercase tracking-widest px-5 py-2.5 rounded-lg hover:bg-gray-700 transition-colors"
        >
          {isEdit ? 'Save Changes' : 'Create Project'}
        </button>
      </div>
    </form>
  );
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 flex flex-col gap-4">
      <p className="text-xs uppercase tracking-widest text-gray-400">{label}</p>
      {children}
    </div>
  );
}

function Field({
  label, name, required, defaultValue, disabled, hint,
}: {
  label: string; name: string; required?: boolean;
  defaultValue?: string | null; disabled?: boolean; hint?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs uppercase tracking-widest text-gray-400">{label}</label>
      <input
        name={name}
        required={required}
        disabled={disabled}
        defaultValue={defaultValue ?? ''}
        className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 bg-white focus:outline-none focus:ring-1 focus:ring-gray-900 disabled:opacity-40 disabled:bg-gray-50"
      />
      {hint && <p className="text-[11px] text-gray-400">{hint}</p>}
    </div>
  );
}

function TextareaField({
  label, name, required, defaultValue, rows,
}: {
  label: string; name: string; required?: boolean; defaultValue?: string; rows?: number;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs uppercase tracking-widest text-gray-400">{label}</label>
      <textarea
        name={name}
        required={required}
        defaultValue={defaultValue ?? ''}
        rows={rows ?? 3}
        className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 bg-white focus:outline-none focus:ring-1 focus:ring-gray-900 resize-y"
      />
    </div>
  );
}

function SelectField({
  label, name, options, required, defaultValue,
}: {
  label: string; name: string;
  options: readonly string[]; required?: boolean; defaultValue?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs uppercase tracking-widest text-gray-400">{label}</label>
      <select
        name={name}
        required={required}
        defaultValue={defaultValue ?? ''}
        className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 bg-white focus:outline-none focus:ring-1 focus:ring-gray-900"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt || '— none —'}</option>
        ))}
      </select>
    </div>
  );
}

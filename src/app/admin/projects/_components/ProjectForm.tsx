'use client';

import type { ProjectMeta } from '@/shared/types/project';
import { blobMediaUrl } from '@/shared/lib/blob-client';
import Image from 'next/image';

const CATEGORIES = ['residential', 'commercial', 'hospitality'] as const;
const PROJECT_TYPES = ['interior', 'architecture', 'both'] as const;
const STYLES = ['', 'traditional', 'contemporary'] as const;
const ARCHETYPES = ['auto', 'heritage', 'urban', 'threshold', 'interior-chamber', 'garden', 'hospitality-glow'] as const;

type Props = {
  action: (formData: FormData) => Promise<void>;
  defaultValues?: Partial<ProjectMeta & { coverImage?: string }>;
  isEdit?: boolean;
};

export function ProjectForm({ action, defaultValues, isEdit }: Props) {
  const v = defaultValues ?? {};

  return (
    <form action={action} className="flex flex-col gap-6">
      <Section label="Identity">
        <Field label="Title" name="title" required defaultValue={v.title} />
        <Field
          label="Slug"
          name="slug"
          required
          defaultValue={v.slug}
          disabled={isEdit}
          hint="kebab-case, e.g. kt-residence"
        />
      </Section>

      <Section label="Location">
        <Field label="City" name="locationCity" required defaultValue={v.locationCity} />
        <Field label="Country" name="locationCountry" required defaultValue={v.locationCountry ?? 'Myanmar'} />
        <Field label="Location (display)" name="location" required defaultValue={v.location} hint="e.g. Mandalay, Myanmar" />
      </Section>

      <Section label="Classification">
        <SelectField label="Category" name="category" options={CATEGORIES} required defaultValue={v.category} />
        <SelectField label="Project Type" name="projectType" options={PROJECT_TYPES} required defaultValue={v.projectType} />
        <SelectField label="Style" name="style" options={STYLES} defaultValue={v.style ?? ''} />
        <SelectField label="Frame Archetype" name="frameArchetype" options={ARCHETYPES} required defaultValue={v.frameArchetype ?? 'auto'} />
        <Field label="Project Area" name="projectArea" defaultValue={v.projectArea ?? ''} hint="optional, e.g. 1,200 sqft" />
        <Field
          label="Mood Tags"
          name="moodTags"
          defaultValue={v.moodTags?.join(', ') ?? ''}
          hint="comma-separated, e.g. warm-minimal, modern"
        />
      </Section>

      <Section label="Description">
        <Field label="One-Line" name="oneLine" required defaultValue={v.oneLine} />
        <TextareaField label="Purpose / Story" name="purpose" required defaultValue={v.purpose} rows={4} />
      </Section>

      <Section label="Cover Image">
        {v.coverImage && (
          <div className="relative w-32 h-40 rounded overflow-hidden mb-2">
            <Image src={blobMediaUrl(v.coverImage)} alt="Cover" fill className="object-cover" unoptimized />
          </div>
        )}
        <input
          type="file"
          name="coverImage"
          accept="image/*"
          className="text-sm text-[var(--mode-text-secondary)] file:mr-3 file:py-1.5 file:px-4 file:rounded file:border file:border-[var(--mode-border)] file:text-xs file:uppercase file:tracking-widest file:text-[var(--mode-text-primary)] file:bg-white hover:file:bg-gray-50"
        />
        <p className="text-[11px] text-[var(--mode-text-tertiary)] mt-1">Max 10MB. Leave empty to keep existing.</p>
      </Section>

      <div className="pt-2">
        <SubmitButton label={isEdit ? 'Save Changes' : 'Create Project'} />
      </div>
    </form>
  );
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="bg-white/80 border border-[var(--mode-border)] rounded-lg p-5 flex flex-col gap-4">
      <p className="text-[10px] uppercase tracking-[3px] text-[var(--mode-text-tertiary)]">{label}</p>
      {children}
    </div>
  );
}

function Field({ label, name, required, defaultValue, disabled, hint }: {
  label: string; name: string; required?: boolean;
  defaultValue?: string | null; disabled?: boolean; hint?: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs tracking-wide text-[var(--mode-text-secondary)]">{label}{required && ' *'}</label>
      <input
        name={name}
        required={required}
        disabled={disabled}
        defaultValue={defaultValue ?? ''}
        className="border border-[var(--mode-border)] rounded px-3 py-2 text-sm text-[var(--mode-text-primary)] bg-white focus:outline-none focus:ring-1 focus:ring-[var(--color-deep-earth)] disabled:opacity-50"
      />
      {hint && <p className="text-[11px] text-[var(--mode-text-tertiary)]">{hint}</p>}
    </div>
  );
}

function TextareaField({ label, name, required, defaultValue, rows }: {
  label: string; name: string; required?: boolean; defaultValue?: string; rows?: number;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs tracking-wide text-[var(--mode-text-secondary)]">{label}{required && ' *'}</label>
      <textarea
        name={name}
        required={required}
        defaultValue={defaultValue ?? ''}
        rows={rows ?? 3}
        className="border border-[var(--mode-border)] rounded px-3 py-2 text-sm text-[var(--mode-text-primary)] bg-white focus:outline-none focus:ring-1 focus:ring-[var(--color-deep-earth)] resize-y"
      />
    </div>
  );
}

function SelectField({ label, name, options, required, defaultValue }: {
  label: string; name: string;
  options: readonly string[]; required?: boolean; defaultValue?: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs tracking-wide text-[var(--mode-text-secondary)]">{label}{required && ' *'}</label>
      <select
        name={name}
        required={required}
        defaultValue={defaultValue ?? ''}
        className="border border-[var(--mode-border)] rounded px-3 py-2 text-sm text-[var(--mode-text-primary)] bg-white focus:outline-none focus:ring-1 focus:ring-[var(--color-deep-earth)]"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt || '— none —'}</option>
        ))}
      </select>
    </div>
  );
}

function SubmitButton({ label }: { label: string }) {
  return (
    <button
      type="submit"
      className="bg-[var(--color-deep-earth)] text-white text-[11px] uppercase tracking-[3px] px-6 py-3 rounded hover:opacity-90 transition-opacity"
    >
      {label}
    </button>
  );
}

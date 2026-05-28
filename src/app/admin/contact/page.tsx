import { getContact } from '@/shared/lib/blob-data';
import { updateContact } from './actions';

export default async function AdminContactPage() {
  let contact: Awaited<ReturnType<typeof getContact>> | null = null;
  let error = '';
  try {
    contact = await getContact();
  } catch {
    error = 'Could not load contact data. Run the migration script first.';
  }

  return (
    <div className="p-8 max-w-2xl">
      <div className="mb-8">
        <p className="text-[10px] uppercase tracking-[4px] text-[var(--mode-text-tertiary)] mb-1">CMS</p>
        <h1 className="text-2xl font-semibold tracking-wide text-[var(--mode-text-primary)]">Contact</h1>
      </div>

      {error && (
        <div className="bg-amber-50 border border-amber-200 text-amber-800 rounded-lg px-4 py-3 text-sm mb-6">{error}</div>
      )}

      {contact && (
        <form action={updateContact} className="flex flex-col gap-5 bg-white/80 border border-[var(--mode-border)] rounded-lg p-6">
          <input type="hidden" name="currentImage" value={contact.image} />

          <Field label="Address" name="address" defaultValue={contact.address} required />
          <Field label="Telephone" name="telephone" defaultValue={contact.telephone} required />
          <Field label="General Enquiries Email" name="generalEnquiries" type="email" defaultValue={contact.generalEnquiries} required />
          <Field label="New Business Enquiries Email" name="newBusinessEnquiries" type="email" defaultValue={contact.newBusinessEnquiries} required />
          <Field label="Careers Email" name="careers" type="email" defaultValue={contact.careers} required />

          <div className="flex flex-col gap-1">
            <label className="text-xs tracking-wide text-[var(--mode-text-secondary)]">Replace Hero Image</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              className="text-sm text-[var(--mode-text-secondary)] file:mr-3 file:py-1.5 file:px-4 file:rounded file:border file:border-[var(--mode-border)] file:text-xs file:uppercase file:tracking-widest file:text-[var(--mode-text-primary)] file:bg-white"
            />
          </div>

          <button
            type="submit"
            className="bg-[var(--color-deep-earth)] text-white text-[11px] uppercase tracking-[3px] px-6 py-3 rounded hover:opacity-90 transition-opacity mt-2"
          >
            Save Changes
          </button>
        </form>
      )}
    </div>
  );
}

function Field({ label, name, required, defaultValue, type }: { label: string; name: string; required?: boolean; defaultValue?: string; type?: string }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs tracking-wide text-[var(--mode-text-secondary)]">{label}{required && ' *'}</label>
      <input
        name={name}
        type={type ?? 'text'}
        required={required}
        defaultValue={defaultValue ?? ''}
        className="border border-[var(--mode-border)] rounded px-3 py-2 text-sm text-[var(--mode-text-primary)] bg-white focus:outline-none focus:ring-1 focus:ring-[var(--color-deep-earth)]"
      />
    </div>
  );
}

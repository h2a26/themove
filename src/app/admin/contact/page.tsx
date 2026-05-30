import { getContact } from '@/shared/lib/blob-data';
import { updateContact } from './actions';

export default async function AdminContactPage() {
  let contact: Awaited<ReturnType<typeof getContact>> | null = null;
  let error = '';
  try {
    contact = await getContact();
  } catch {
    error = 'Could not load contact data.';
  }

  return (
    <div className="p-8 max-w-2xl">
      <div className="mb-8">
        <p className="text-xs uppercase tracking-widest text-gray-400 mb-1">CMS</p>
        <h1 className="text-2xl font-semibold text-gray-900">Contact</h1>
      </div>

      {error && (
        <div className="bg-amber-50 border border-amber-200 text-amber-800 rounded-lg px-4 py-3 text-sm mb-6">{error}</div>
      )}

      {contact && (
        <form action={updateContact} className="bg-white border border-gray-200 rounded-xl p-6 flex flex-col gap-5">
          <input type="hidden" name="currentImage" value={contact.image} />

          <Field label="Address" name="address" defaultValue={contact.address} required />
          <Field label="Telephone" name="telephone" defaultValue={contact.telephone} required />

          <div className="pt-1 pb-1 border-t border-gray-100">
            <p className="text-xs uppercase tracking-widest text-gray-400 mb-4">Email Addresses</p>
            <div className="flex flex-col gap-4">
              <Field label="General Enquiries" name="generalEnquiries" type="email" defaultValue={contact.generalEnquiries} required />
              <Field label="New Business" name="newBusinessEnquiries" type="email" defaultValue={contact.newBusinessEnquiries} required />
              <Field label="Careers" name="careers" type="email" defaultValue={contact.careers} required />
            </div>
          </div>

          <div className="flex flex-col gap-1.5 pt-1 border-t border-gray-100">
            <label className="text-xs uppercase tracking-widest text-gray-400">Replace Hero Image</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              className="text-sm text-gray-500 file:mr-3 file:py-1.5 file:px-4 file:rounded-lg file:border file:border-gray-200 file:text-xs file:uppercase file:tracking-widest file:text-gray-700 file:bg-white hover:file:bg-gray-50"
            />
          </div>

          <div className="pt-1">
            <button
              type="submit"
              className="bg-gray-900 text-white text-xs uppercase tracking-widest px-5 py-2.5 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Save Changes
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

function Field({
  label, name, required, defaultValue, type,
}: {
  label: string; name: string; required?: boolean; defaultValue?: string; type?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs uppercase tracking-widest text-gray-400">{label}{required && ' *'}</label>
      <input
        name={name}
        type={type ?? 'text'}
        required={required}
        defaultValue={defaultValue ?? ''}
        className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 bg-white focus:outline-none focus:ring-1 focus:ring-gray-900"
      />
    </div>
  );
}

'use server';

import { revalidatePath } from 'next/cache';
import { putContact } from '@/shared/lib/blob-data';
import { uploadBlob } from '@/shared/lib/blob-client';
import type { ContactInfo } from '@/shared/types/cms';

export async function updateContact(formData: FormData) {
  const imageFile = formData.get('image') as File | null;
  let imagePath = formData.get('currentImage') as string;

  if (imageFile && imageFile.size > 0) {
    const ext = imageFile.name.split('.').pop() ?? 'jpg';
    const buf = Buffer.from(await imageFile.arrayBuffer());
    imagePath = await uploadBlob(`images/contact/hero.${ext}`, buf, imageFile.type || 'image/jpeg');
  }

  const contact: ContactInfo = {
    id: 1,
    image: imagePath,
    address: formData.get('address') as string,
    telephone: formData.get('telephone') as string,
    generalEnquiries: formData.get('generalEnquiries') as string,
    newBusinessEnquiries: formData.get('newBusinessEnquiries') as string,
    careers: formData.get('careers') as string,
  };

  await putContact(contact);
  revalidatePath('/contact');
  revalidatePath('/admin/contact');
}

'use server';

import { revalidatePath } from 'next/cache';
import { upsertContact } from '@/shared/lib/blob-data';
import { uploadBlob } from '@/shared/lib/blob-client';

export async function updateContact(formData: FormData) {
  const imageFile = formData.get('image') as File | null;
  let imagePath: string | undefined;
  if (imageFile && imageFile.size > 0) {
    const ext = imageFile.name.split('.').pop() ?? 'jpg';
    const buf = Buffer.from(await imageFile.arrayBuffer());
    imagePath = await uploadBlob(
      `images/contact/hero.${ext}`,
      buf,
      imageFile.type || 'image/jpeg',
    );
  }

  await upsertContact({
    image: imagePath,
    currentImage: formData.get('currentImage') as string,
    address: formData.get('address') as string,
    telephone: formData.get('telephone') as string,
    generalEnquiries: formData.get('generalEnquiries') as string,
    newBusinessEnquiries: formData.get('newBusinessEnquiries') as string,
    careers: formData.get('careers') as string,
  });

  revalidatePath('/contact');
  revalidatePath('/admin/contact');
}

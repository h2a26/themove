'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { createBook as dbCreateBook } from '@/shared/lib/blob-data';
import { uploadBlob } from '@/shared/lib/blob-client';

export async function createBook(formData: FormData) {
  const pdfFile = formData.get('pdfFile') as File | null;
  if (!pdfFile || pdfFile.size === 0) throw new Error('PDF file required');

  const slug = (formData.get('slug') as string).trim().toLowerCase().replace(/\s+/g, '-');
  const buf = Buffer.from(await pdfFile.arrayBuffer());
  const pdfPathname = await uploadBlob(`books/${slug}.pdf`, buf, 'application/pdf');

  await dbCreateBook({
    slug,
    title: formData.get('title') as string,
    subtitle: (formData.get('subtitle') as string) || undefined,
    description: (formData.get('description') as string) || undefined,
    pdfUrl: pdfPathname,
    year: formData.get('year') as string,
    pages: parseInt(formData.get('pages') as string, 10) || undefined,
    published: formData.get('published') === 'true',
  });

  revalidatePath('/books');
  revalidatePath('/admin/books');
  redirect('/admin/books');
}

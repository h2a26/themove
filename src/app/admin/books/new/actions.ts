'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { getBooks, putBooks } from '@/shared/lib/blob-data';
import { uploadBlob } from '@/shared/lib/blob-client';
import type { Book } from '@/shared/types/book';

export async function createBook(formData: FormData) {
  const pdfFile = formData.get('pdfFile') as File | null;
  if (!pdfFile || pdfFile.size === 0) throw new Error('PDF file required');

  const slug = (formData.get('slug') as string).trim().toLowerCase().replace(/\s+/g, '-');
  const buf = Buffer.from(await pdfFile.arrayBuffer());
  const pdfPathname = await uploadBlob(`books/${slug}.pdf`, buf, 'application/pdf');

  const existing = await getBooks();
  const nextId = existing.length > 0 ? Math.max(...existing.map((b) => b.id)) + 1 : 1;

  const book: Book = {
    id: nextId,
    slug,
    title: formData.get('title') as string,
    subtitle: (formData.get('subtitle') as string) ?? '',
    description: (formData.get('description') as string) ?? '',
    pdfUrl: pdfPathname,
    year: formData.get('year') as string,
    pages: parseInt(formData.get('pages') as string, 10) || 0,
    published: formData.get('published') === 'true',
  };

  await putBooks([...existing, book]);

  revalidatePath('/books');
  revalidatePath('/admin/books');
  redirect('/admin/books');
}

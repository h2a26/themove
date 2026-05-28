'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { getBooks, putBooks } from '@/shared/lib/blob-data';
import { uploadBlob } from '@/shared/lib/blob-client';

export async function updateBook(slug: string, formData: FormData) {
  const pdfFile = formData.get('pdfFile') as File | null;

  const books = await getBooks();
  const idx = books.findIndex((b) => b.slug === slug);
  if (idx === -1) throw new Error('Book not found');

  let pdfPathname = books[idx].pdfUrl;
  if (pdfFile && pdfFile.size > 0) {
    const buf = Buffer.from(await pdfFile.arrayBuffer());
    pdfPathname = await uploadBlob(`books/${slug}.pdf`, buf, 'application/pdf');
  }

  books[idx] = {
    ...books[idx],
    title: formData.get('title') as string,
    subtitle: (formData.get('subtitle') as string) ?? '',
    description: (formData.get('description') as string) ?? '',
    pdfUrl: pdfPathname,
    year: formData.get('year') as string,
    pages: parseInt(formData.get('pages') as string, 10) || (books[idx].pages ?? 0),
    published: formData.get('published') === 'true',
  };

  await putBooks(books);

  revalidatePath('/books');
  revalidatePath('/admin/books');
}

export async function deleteBook(slug: string) {
  const books = await getBooks();
  await putBooks(books.filter((b) => b.slug !== slug));
  revalidatePath('/books');
  revalidatePath('/admin/books');
  redirect('/admin/books');
}

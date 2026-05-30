'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { getBooks, updateBook as dbUpdateBook, deleteBook as dbDeleteBook } from '@/shared/lib/blob-data';
import { uploadBlob } from '@/shared/lib/blob-client';

export async function updateBook(slug: string, formData: FormData) {
  const pdfFile = formData.get('pdfFile') as File | null;

  let pdfPathname: string | undefined;
  if (pdfFile && pdfFile.size > 0) {
    const buf = Buffer.from(await pdfFile.arrayBuffer());
    pdfPathname = await uploadBlob(`books/${slug}.pdf`, buf, 'application/pdf');
  }

  const books = await getBooks();
  const existing = books.find((b) => b.slug === slug);
  if (!existing) throw new Error('Book not found');

  await dbUpdateBook(slug, {
    title: formData.get('title') as string,
    subtitle: (formData.get('subtitle') as string) || undefined,
    description: (formData.get('description') as string) || undefined,
    pdfUrl: pdfPathname ?? existing.pdfUrl,
    year: formData.get('year') as string,
    pages: parseInt(formData.get('pages') as string, 10) || existing.pages,
    published: formData.get('published') === 'true',
  });

  revalidatePath('/books');
  revalidatePath('/admin/books');
  redirect(`/admin/books/${slug}`);
}

export async function deleteBook(slug: string) {
  await dbDeleteBook(slug);
  revalidatePath('/books');
  revalidatePath('/admin/books');
  redirect('/admin/books');
}

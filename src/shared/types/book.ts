export interface Book {
  id: number
  slug: string
  title: string
  subtitle?: string
  description?: string
  /** Local /public/books/ path or Vercel Blob URL — same field, no schema change on migration */
  pdfUrl: string
  year: string
  pages?: number
  published: boolean
}

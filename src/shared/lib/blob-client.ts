import { put, del } from '@vercel/blob';

/**
 * Derives the Vercel Blob public base URL.
 * Prefers BLOB_STORE_ID (custom var) but falls back to BLOB_READ_WRITE_TOKEN
 * (auto-injected by Vercel when a Blob store is connected).
 * Token format: vercel_blob_rw_{storeId}_{secret}
 */
function getBlobBase(): string {
  if (process.env.BLOB_STORE_ID) {
    return `https://${process.env.BLOB_STORE_ID.replace('store_', '')}.public.blob.vercel-storage.com`;
  }
  const t = process.env.BLOB_READ_WRITE_TOKEN ?? '';
  const m = t.match(/^vercel_blob_rw_([^_]+)_/);
  return m ? `https://${m[1]}.public.blob.vercel-storage.com` : '';
}

const BLOB_BASE = getBlobBase();

function token(): string {
  const t = process.env.BLOB_READ_WRITE_TOKEN;
  if (!t) throw new Error('BLOB_READ_WRITE_TOKEN is not set');
  return t;
}

/** Fetch private JSON blob — server-only */
export async function getBlob<T>(pathname: string): Promise<T> {
  const url = `${BLOB_BASE}/${pathname}`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token()}` },
    next: { revalidate: 30 },
  });
  if (!res.ok) throw new Error(`Blob not found: ${pathname} (${res.status})`);
  return res.json() as Promise<T>;
}

/** Write JSON to private blob */
export async function putBlob(pathname: string, data: unknown): Promise<void> {
  await put(pathname, JSON.stringify(data, null, 2), {
    access: 'private',
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: 'application/json',
  });
}

/** Upload binary (image / PDF) to private blob, returns pathname */
export async function uploadBlob(
  pathname: string,
  body: Buffer | ArrayBuffer | ReadableStream | Blob,
  contentType: string,
): Promise<string> {
  await put(pathname, body, {
    access: 'private',
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType,
  });
  return pathname;
}

/** Delete a blob by pathname */
export async function deleteBlob(pathname: string): Promise<void> {
  await del(`${BLOB_BASE}/${pathname}`);
}

/** Convert blob pathname → same-origin proxy URL for use in <img> / next/image */
export function blobMediaUrl(pathname: string): string {
  if (!pathname) return '';
  if (pathname.startsWith('/') || pathname.startsWith('http')) return pathname;
  return `/api/media/${pathname}`;
}

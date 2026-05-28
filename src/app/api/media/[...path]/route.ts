import { NextRequest, NextResponse } from 'next/server';

const BLOB_BASE = `https://${process.env.BLOB_STORE_ID?.replace('store_', '')}.public.blob.vercel-storage.com`;

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path } = await params;
  const pathname = path.join('/');
  const blobUrl = `${BLOB_BASE}/${pathname}`;

  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) return NextResponse.json({ error: 'Storage not configured' }, { status: 500 });

  try {
    const res = await fetch(blobUrl, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) return new NextResponse(null, { status: res.status });

    const contentType = res.headers.get('Content-Type') ?? 'application/octet-stream';
    const isPdf = pathname.endsWith('.pdf');

    return new NextResponse(res.body, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
        ...(isPdf ? { 'Content-Disposition': `attachment; filename="${path[path.length - 1]}"` } : {}),
      },
    });
  } catch {
    return new NextResponse(null, { status: 502 });
  }
}

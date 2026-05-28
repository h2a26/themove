import { NextRequest, NextResponse } from 'next/server';

const BLOB_BASE = `https://${process.env.BLOB_STORE_ID?.replace('store_', '')}.public.blob.vercel-storage.com`;

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path } = await params;
  const pathname = path.join('/');
  const blobUrl = `${BLOB_BASE}/${pathname}`;

  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) return NextResponse.json({ error: 'Storage not configured' }, { status: 500 });

  try {
    // Forward Range header so pdfjs can fetch only the bytes it needs
    const rangeHeader = req.headers.get('range');
    const fetchHeaders: Record<string, string> = { Authorization: `Bearer ${token}` };
    if (rangeHeader) fetchHeaders['Range'] = rangeHeader;

    const res = await fetch(blobUrl, { headers: fetchHeaders });

    if (!res.ok && res.status !== 206) return new NextResponse(null, { status: res.status });

    const contentType = res.headers.get('Content-Type') ?? 'application/octet-stream';
    const isPdf = pathname.endsWith('.pdf');

    const responseHeaders: Record<string, string> = {
      'Content-Type': contentType,
      'Cache-Control': 'public, max-age=31536000, immutable',
      // Tell pdfjs (and browsers) this endpoint supports range requests
      'Accept-Ranges': 'bytes',
    };

    // Forward range-response headers when serving a partial response
    const contentRange = res.headers.get('content-range');
    if (contentRange) responseHeaders['Content-Range'] = contentRange;
    const contentLength = res.headers.get('content-length');
    if (contentLength) responseHeaders['Content-Length'] = contentLength;

    // For downloads (not thumbnail rendering): signal browser to save the file
    if (isPdf && !rangeHeader) {
      responseHeaders['Content-Disposition'] = `attachment; filename="${path[path.length - 1]}"`;
    }

    return new NextResponse(res.body, {
      status: res.status,
      headers: responseHeaders,
    });
  } catch {
    return new NextResponse(null, { status: 502 });
  }
}

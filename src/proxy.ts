import { auth } from '@/auth';
import { NextResponse } from 'next/server';

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const isLoginPage = pathname === '/admin/login';

  if (!req.auth && !isLoginPage) {
    return NextResponse.redirect(new URL('/admin/login', req.url));
  }

  if (req.auth && isLoginPage) {
    return NextResponse.redirect(new URL('/admin', req.url));
  }
});

export const config = {
  matcher: ['/admin/:path*'],
};

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionCookie = request.cookies.get('mrm_session');

  // Protect all admin dashboard routes
  if (pathname.startsWith('/admin/dashboard')) {
    if (!sessionCookie || !sessionCookie.value) {
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('from', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // If user is already authenticated and visits login page without a forced redirect, send to dashboard
  if (pathname === '/admin/login' && sessionCookie && sessionCookie.value) {
    const fromParam = request.nextUrl.searchParams.get('from');
    if (fromParam && fromParam.startsWith('/admin/dashboard')) {
      return NextResponse.redirect(new URL(fromParam, request.url));
    }
    return NextResponse.redirect(new URL('/admin/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/dashboard/:path*', '/admin/dashboard', '/admin/login'],
};

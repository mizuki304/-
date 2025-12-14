import crypto from 'node:crypto';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const AUTH_COOKIE = 'trip_auth';

function passwordHash() {
  const password = process.env.SITE_PASSWORD;
  if (!password) return null;
  return crypto.createHash('sha256').update(password).digest('hex');
}

function isBypassPath(pathname: string) {
  return (
    pathname.startsWith('/auth') ||
    pathname.startsWith('/api/auth') ||
    pathname.startsWith('/_next') ||
    pathname === '/favicon.ico'
  );
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (isBypassPath(pathname)) {
    return NextResponse.next();
  }

  const hash = passwordHash();
  if (!hash) {
    return NextResponse.json(
      { message: 'SITE_PASSWORD is not configured on the server.' },
      { status: 500 },
    );
  }

  const cookie = request.cookies.get(AUTH_COOKIE)?.value;
  if (cookie === hash) {
    return NextResponse.next();
  }

  const loginUrl = new URL('/auth', request.url);
  loginUrl.searchParams.set('redirect', request.nextUrl.pathname + request.nextUrl.search);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};

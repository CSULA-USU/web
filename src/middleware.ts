// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;

  // Let NextAuth's own endpoints & the sign-in page pass
  if (pathname.startsWith('/api/auth')) return NextResponse.next();
  if (pathname.startsWith('/backoffice/signin')) return NextResponse.next();

  // Guard everything. /_edit is the Supabase-backed page editor: the leading
  // underscore keeps it out of search results but does nothing for access, so it
  // needs the same session check as the backoffice routes.
  if (
    pathname.startsWith('/backoffice') ||
    pathname.startsWith('/graffix/backoffice') ||
    pathname.startsWith('/_edit')
  ) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    // No session? -> send to /backoffice/signin with the original URL as callback
    if (!token) {
      const url = req.nextUrl.clone();
      url.pathname = '/backoffice/signin';
      url.searchParams.set('callbackUrl', pathname + search);
      return NextResponse.redirect(url);
    }

    // Optional: if you’ve enabled the Supabase allow-list gate,
    // and your JWT sets token.isBackofficeUser, enforce it here too.
    if (
      process.env.BACKOFFICE_AUTH_STRATEGY === 'supabase' &&
      token.isBackofficeUser === false
    ) {
      const url = req.nextUrl.clone();
      url.pathname = '/backoffice/signin';
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/backoffice/:path*',
    '/graffix/backoffice',
    '/graffix/backoffice/:path*',
    '/_edit',
    '/_edit/:path*',
  ],
};

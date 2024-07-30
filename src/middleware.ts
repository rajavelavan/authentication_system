import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const IsPublicPath =
    path === '/signup' || path === '/login' || path === '/verifyemail';

  const token = request.cookies.get('token')?.value || '';

  if (IsPublicPath && token) {
    return NextResponse.redirect(new URL('/', request.nextUrl));
  }

  if (!IsPublicPath && !token) {
    return NextResponse.redirect(new URL('/signup', request.nextUrl));
  }
}

export const config = {
  matcher: ['/', '/profile', '/login', '/signup', '/verifyemail'],
};

import { NextResponse } from 'next/server';

export function middleware(request) {
  const token = request.cookies.get('token')?.value;
  const pathname = request.nextUrl.pathname;
  const protectedPaths = ['/forum', '/admin'];

  const isProtected = protectedPaths.some(path =>
    pathname.startsWith(path)
  );

  if (isProtected && !token) {
    const url = new URL('/login', request.url);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

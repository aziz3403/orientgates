import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Allow static files and maintenance page
  const path = request.nextUrl.pathname;
  if (
    path.startsWith('/_next') ||
    path.startsWith('/logo') ||
    path.startsWith('/cover') ||
    path.startsWith('/favicon') ||
    path === '/maintenance'
  ) {
    return NextResponse.next();
  }
  
  // Redirect everything else to maintenance
  return NextResponse.rewrite(new URL('/maintenance', request.url));
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};

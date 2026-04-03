import createMiddleware from 'next-intl/middleware';
import { type NextRequest } from 'next/server';
import { routing } from './i18n/routing';

const handleRequest = createMiddleware(routing);

export function proxy(request: NextRequest) {
  return handleRequest(request);
}

export const config = {
  // Match all paths except Next.js internals, static files, and API routes
  matcher: [
    '/((?!_next|api|favicon.ico|robots.txt|sitemap.xml|.*\\..*).*)',
  ],
};

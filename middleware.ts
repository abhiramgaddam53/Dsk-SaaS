import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const rolePermissions = [
  { path: '/sa/gen', roles: ['Super-admin', 'valuator'] },
  { path: '/sa', roles: ['Super-admin'] },
  { path: '/d', roles: ['Super-admin', 'drafter'] },
  { path: '/s', roles: ['Super-admin', 'site-visitor', 'drafter', 'valuator'] }
];

export function middleware(request: NextRequest) {
  const session = request.cookies.get('session')?.value;
  const role = request.cookies.get('userRole')?.value;
  const { pathname } = request.nextUrl;

  const isAuthRoute = pathname.startsWith('/login') || pathname.startsWith('/register');

  if (!session && !isAuthRoute) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (session && isAuthRoute) {
    console.log('this is the culprit')
    const defaultPath = role === 'Super-admin' ? '/sa' : role === 'valuator' ? '/sa/gen' : role === 'drafter' ? '/d/dashboard' : '/s/dashboard';
    return NextResponse.redirect(new URL(defaultPath, request.url));
  }

  const matchedRoute = rolePermissions.find(route => pathname.startsWith(route.path));

  if (matchedRoute) {
    if (!role || !matchedRoute.roles.includes(role)) {
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/s/:path*', 
    '/d/:path*', 
    '/sa/:path*', 
    '/login',
    '/register'
  ],
};
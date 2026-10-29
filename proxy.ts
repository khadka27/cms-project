import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function proxy(req) {
    const host = req.headers.get('host') || '';
    const proto = req.headers.get('x-forwarded-proto') || 'https';
    const url = req.nextUrl;

    // 1. Canonical consolidation: www -> non-www (301 Permanent Redirect)
    if (host.startsWith('www.')) {
      const nonWwwHost = host.replace(/^www\./i, '');
      return NextResponse.redirect(`https://${nonWwwHost}${url.pathname}${url.search}`, 301);
    }

    // 2. Protocol enforcement: http -> https in production
    if (proto === 'http' && process.env.NODE_ENV === 'production' && !host.includes('localhost')) {
      return NextResponse.redirect(`https://${host}${url.pathname}${url.search}`, 301);
    }

    // Check if user is trying to access admin routes
    if (req.nextUrl.pathname.startsWith('/admin') && 
        req.nextUrl.pathname !== '/admin/login') {
      
      // Check if user has admin role
      if (req.nextauth.token?.role !== 'admin') {
        return NextResponse.redirect(new URL('/admin/login', req.url));
      }
    }
    
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Allow access to login page without authentication
        if (req.nextUrl.pathname === '/admin/login') {
          return true;
        }
        
        // For admin routes, require authentication and admin role
        if (req.nextUrl.pathname.startsWith('/admin')) {
          return !!token && token.role === 'admin';
        }
        
        // Allow all other public routes without authentication
        return true;
      },
    },
  }
);

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static build assets)
     * - _next/image (image optimization pipeline)
     * - Static asset files
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|json|webmanifest)).*)',
  ],
};

import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  // TEMPORARY: Disable middleware for debugging login issues
  console.log('🛡️ Middleware: Request to', req.nextUrl.pathname);
  
  // Allow all requests during debugging
  let res = NextResponse.next({
    request: {
      headers: req.headers,
    },
  });

  // Still create supabase client to maintain cookies
  try {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return req.cookies.get(name)?.value
          },
          set(name: string, value: string, options: any) {
            req.cookies.set({
              name,
              value,
              ...options,
            })
            res = NextResponse.next({
              request: {
                headers: req.headers,
              },
            })
            res.cookies.set({
              name,
              value,
              ...options,
            })
          },
          remove(name: string, options: any) {
            req.cookies.set({
              name,
              value: '',
              ...options,
            })
            res = NextResponse.next({
              request: {
                headers: req.headers,
              },
            })
            res.cookies.set({
              name,
              value: '',
              ...options,
            })
          },
        },
      }
    );

    // Check session but don't block access during debugging
    const { data: { session } } = await supabase.auth.getSession();
    console.log('🛡️ Middleware: Session check:', {
      path: req.nextUrl.pathname,
      hasSession: !!session,
      userEmail: session?.user?.email
    });

    return res;
  } catch (error) {
    console.error('🛡️ Middleware: Error:', error);
    return res;
  }
}

export const config = {
  matcher: ['/admin/:path*']
}
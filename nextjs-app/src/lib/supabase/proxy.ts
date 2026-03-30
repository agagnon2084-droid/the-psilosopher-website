import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import { ADMIN_EMAILS } from '@/lib/admin'

/**
 * Check if a /courses path is a lesson page (requires auth)
 * vs a listing/detail page (public).
 * Lesson pages have 2+ segments after /courses: /courses/[slug]/[lessonSlug]
 */
function isLessonPage(pathname: string): boolean {
  const segments = pathname.replace('/courses/', '').split('/').filter(Boolean)
  return segments.length >= 2
}

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          )
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()
  const pathname = request.nextUrl.pathname

  // Protected routes requiring authentication
  const needsAuth =
    pathname.startsWith('/dashboard') ||
    pathname.startsWith('/members') ||
    pathname.startsWith('/admin') ||
    pathname.startsWith('/community') ||
    (pathname.startsWith('/courses') && isLessonPage(pathname))

  if (!user && needsAuth) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  // Admin routes require admin email
  if (pathname.startsWith('/admin') && user) {
    if (!ADMIN_EMAILS.includes(user.email ?? '')) {
      const url = request.nextUrl.clone()
      url.pathname = '/'
      return NextResponse.redirect(url)
    }
  }

  return supabaseResponse
}

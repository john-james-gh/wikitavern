import {createServerClient} from "@supabase/ssr"
import {type NextRequest, NextResponse} from "next/server"

import {SupabaseConfig} from "@/config/environment"

export const updateSession = async (request: NextRequest) => {
  // This `try/catch` block is only here for the interactive tutorial.
  // Feel free to remove once you have Supabase connected.
  try {
    // Create an unmodified response
    let response = NextResponse.next({
      request: {
        headers: request.headers,
      },
    })

    const supabase = createServerClient(SupabaseConfig.url, SupabaseConfig.anonKey, {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({name, value}) => request.cookies.set(name, value))
          response = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({name, value, options}) => response.cookies.set(name, value, options))
        },
      },
    })

    // This will refresh session if expired - required for Server Components
    // https://supabase.com/docs/guides/auth/server-side/nextjs
    const user = await supabase.auth.getUser()

    // protected routes
    if (
      (request.nextUrl.pathname.startsWith("/admin") ||
        request.nextUrl.pathname.startsWith("/moderator") ||
        request.nextUrl.pathname.startsWith("/submit-wiki") ||
        request.nextUrl.pathname.startsWith("/reset-password") ||
        request.nextUrl.pathname.startsWith("/profile")) &&
      user.error
    ) {
      return NextResponse.redirect(new URL("/sign-in", request.url))
    }

    return response
  } catch (e) {
    // If you are here, a Supabase client could not be created!
    // This is likely because you have not set up environment variables.
    // Check out http://localhost:3000 for Next Steps.
    console.error("Error creating Supabase client", e)
    return NextResponse.next({
      request: {
        headers: request.headers,
      },
    })
  }
}

import {createServerClient} from "@supabase/ssr"
import {cookies} from "next/headers"

import {SupabaseConfig} from "@/config/environment"
import type {Database} from "@/types/supabase"

export const createClient = async () => {
  const cookieStore = await cookies()

  return createServerClient<Database>(SupabaseConfig.url, SupabaseConfig.anonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({name, value, options}) => {
            cookieStore.set(name, value, options)
          })
        } catch (error) {
          console.error("Error setting cookies", error)
          // The `set` method was called from a Server Component.
          // This can be ignored if you have middleware refreshing
          // user sessions.
        }
      },
    },
  })
}

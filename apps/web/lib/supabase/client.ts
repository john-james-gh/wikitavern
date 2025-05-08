import {createBrowserClient} from "@supabase/ssr"

import {SupabaseConfig} from "@/config/environment"
import type {Database} from "@/types/supabase"

export const createClient = () => createBrowserClient<Database>(SupabaseConfig.url, SupabaseConfig.anonKey)

import {SupabaseConfig} from "@/config/environment"
import type {Database} from "@/types/supabase"
import {createBrowserClient} from "@supabase/ssr"

export const createClient = () => createBrowserClient<Database>(SupabaseConfig.url, SupabaseConfig.anonKey)

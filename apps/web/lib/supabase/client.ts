import {SupabaseConfig} from "@/config/environment"
import {createBrowserClient} from "@supabase/ssr"

export const createClient = () => createBrowserClient(SupabaseConfig.url, SupabaseConfig.anonKey)

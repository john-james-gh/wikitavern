import {z} from "zod"

const envSchema = z.object({
  // Sanity configuration
  NEXT_PUBLIC_SANITY_DATASET: z.string().default("production"),
  NEXT_PUBLIC_SANITY_PROJECT_ID: z.string().default("j9ou61ca"),
  NEXT_PUBLIC_SANITY_API_VERSION: z.string().default("2025-04-17"),
  SANITY_API_TOKEN: z.string().default(""),

  // Supabase configuration
  NEXT_PUBLIC_SUPABASE_URL: z.string().default("https://enheqlnywwgrpouprkxz.supabase.co"),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z
    .string()
    .default(
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVuaGVxbG55d3dncnBvdXBya3h6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYyODU1NTYsImV4cCI6MjA2MTg2MTU1Nn0.-lQg4SMLycMJ3dGxuiITliYl56ZxWRkamAAJL7UVTf8",
    ),

  // Node environment
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
})

// Parse and validate environment variables
const env = envSchema.parse(process.env)

// Export validated environment variables with semantic names
export const SanityConfig = {
  dataset: env.NEXT_PUBLIC_SANITY_DATASET,
  projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  apiVersion: env.NEXT_PUBLIC_SANITY_API_VERSION,
  apiToken: env.SANITY_API_TOKEN,
} as const

export const SupabaseConfig = {
  url: env.NEXT_PUBLIC_SUPABASE_URL,
  anonKey: env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
} as const

export const IsTestEnvironment = env.NODE_ENV === "test"

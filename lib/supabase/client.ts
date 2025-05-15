import { createClient as supabaseCreateClient } from "@supabase/supabase-js"
import type { Database } from "@/app/types/db"

// Create a Supabase client for server-side operations
export function createClient() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    // If credentials are missing, return a mock client that won't crash the app
    if (!supabaseUrl || !supabaseAnonKey) {
      console.warn("Supabase credentials missing. Using mock client.")
      return createMockClient()
    }

    return supabaseCreateClient<Database>(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    })
  } catch (error) {
    console.error("Error creating Supabase client:", error)
    return createMockClient()
  }
}

// Create a mock client that won't throw errors
function createMockClient() {
  return {
    from: () => ({
      select: () => Promise.resolve({ data: [], error: null }),
      insert: () => Promise.resolve({ data: null, error: null }),
      update: () => Promise.resolve({ data: null, error: null }),
      delete: () => Promise.resolve({ data: null, error: null }),
      upsert: () => Promise.resolve({ data: null, error: null }),
      match: () => ({
        select: () => Promise.resolve({ data: [], error: null }),
      }),
    }),
    auth: {
      getSession: () => Promise.resolve({ data: { session: null }, error: null }),
      getUser: () => Promise.resolve({ data: { user: null }, error: null }),
      signOut: () => Promise.resolve({ error: null }),
    },
    storage: {
      from: () => ({
        upload: () => Promise.resolve({ data: null, error: null }),
        getPublicUrl: () => ({ data: { publicUrl: "" } }),
      }),
    },
    rpc: () => Promise.resolve({ data: null, error: null }),
  } as any
}

// For backward compatibility
export function createServerClient(cookieStore?: any) {
  return createClient()
}

// For backward compatibility
export function createServerSupabaseClient(cookieStore?: any) {
  return createClient()
}

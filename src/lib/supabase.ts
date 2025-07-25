import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

// Client-side Supabase client (for public operations)
export const supabase = createClient(supabaseUrl, supabaseServiceRoleKey)

// Server-side Supabase client with service role (for API routes)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

// Types for our contact form
export interface ContactSubmission {
  id?: string
  full_name: string
  practice_name: string
  email: string
  phone: string
  country_code: string
  message?: string
  created_at?: string
}
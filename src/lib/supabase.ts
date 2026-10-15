import { createClient, type SupabaseClient } from '@supabase/supabase-js'

export type AmbassadorRow = {
  id: string
  created_at: string
  name: string
  email: string
  whatsapp: string
  city: string
  instagram: string
  community: string
  community_value: string
  people: string
  people_value: string
  promote: string
  promote_values: string[]
  why: string
  attend: string
  attend_value: string
  locale: string
  status: 'new' | 'reviewing' | 'accepted' | 'declined'
}

export type SiteEventRow = {
  id: string
  created_at: string
  path: string
  locale: string | null
  kind: string
}

function supabaseEnv() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) return null
  return { url, key }
}

export function createAnonClient(): SupabaseClient | null {
  const env = supabaseEnv()
  if (!env) return null
  return createClient(env.url, env.key, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
}

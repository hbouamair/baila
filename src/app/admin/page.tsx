import { redirect } from 'next/navigation'

import { AdminDashboard } from '@/components/admin/AdminDashboard'
import { adminPassword, isAdminSession } from '@/lib/admin'
import { createAnonClient, type AmbassadorRow, type SiteEventRow } from '@/lib/supabase'

export default async function AdminPage() {
  if (!(await isAdminSession())) redirect('/admin/login')

  const supabase = createAnonClient()
  const password = adminPassword()
  if (!supabase || !password) {
    return (
      <main className="studio">
        <div className="studio-note">
          <p className="studio-word">Bailaimos</p>
          <h1>Supabase is not configured.</h1>
          <p className="studio-lead">Add NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY and ADMIN_PASSWORD, then restart.</p>
        </div>
      </main>
    )
  }

  const [{ data: applications, error: appError }, { data: events, error: eventError }] = await Promise.all([
    supabase.rpc('admin_list_applications', { p_password: password }),
    supabase.rpc('admin_list_events', { p_password: password, p_days: 30 }),
  ])

  if (appError || eventError) {
    return (
      <main className="studio">
        <div className="studio-note">
          <p className="studio-word">Bailaimos</p>
          <h1>Could not load studio data.</h1>
          <p className="studio-lead">{appError?.message || eventError?.message}</p>
        </div>
      </main>
    )
  }

  return (
    <AdminDashboard
      applications={(applications || []) as AmbassadorRow[]}
      events={(events || []) as SiteEventRow[]}
      now={Date.now()}
    />
  )
}

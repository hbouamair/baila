import { NextResponse } from 'next/server'

import { adminPassword, isAdminSession } from '@/lib/admin'
import { createAnonClient } from '@/lib/supabase'

const statuses = ['new', 'reviewing', 'accepted', 'declined'] as const

export async function POST(request: Request) {
  if (!(await isAdminSession())) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }

  const supabase = createAnonClient()
  const password = adminPassword()
  if (!supabase || !password) {
    return NextResponse.json({ error: 'not_configured' }, { status: 503 })
  }

  const body = (await request.json().catch(() => null)) as { id?: string; status?: string } | null
  const id = String(body?.id || '')
  const status = String(body?.status || '')
  if (!id || !statuses.includes(status as (typeof statuses)[number])) {
    return NextResponse.json({ error: 'invalid' }, { status: 400 })
  }

  const { error } = await supabase.rpc('admin_set_application_status', {
    p_password: password,
    p_id: id,
    p_status: status,
  })

  if (error) {
    return NextResponse.json({ error: 'save_failed' }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}

import { NextResponse } from 'next/server'

import { createAnonClient } from '@/lib/supabase'

export async function POST(request: Request) {
  const supabase = createAnonClient()
  if (!supabase) {
    return NextResponse.json({ ok: true })
  }

  const body = (await request.json().catch(() => null)) as { path?: string; locale?: string } | null
  const path = String(body?.path || '').slice(0, 300)
  if (!path.startsWith('/') || path.startsWith('/admin') || path.startsWith('/api')) {
    return NextResponse.json({ ok: true })
  }

  const locale = body?.locale
  await supabase.from('site_events').insert({
    path,
    locale: locale === 'fr' || locale === 'en' || locale === 'es' ? locale : null,
    kind: 'page_view',
  })

  return NextResponse.json({ ok: true })
}

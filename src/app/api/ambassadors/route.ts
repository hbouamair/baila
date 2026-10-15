import { NextResponse } from 'next/server'

import { createAnonClient } from '@/lib/supabase'

function text(value: unknown, max = 500) {
  return String(value || '')
    .trim()
    .slice(0, max)
}

export async function POST(request: Request) {
  const supabase = createAnonClient()
  if (!supabase) {
    return NextResponse.json({ error: 'not_configured' }, { status: 503 })
  }

  const body = (await request.json().catch(() => null)) as Record<string, unknown> | null
  if (!body) {
    return NextResponse.json({ error: 'invalid' }, { status: 400 })
  }

  if (text(body.company) || body.botcheck) {
    return NextResponse.json({ ok: true })
  }

  const name = text(body.name, 120)
  const email = text(body.email, 160)
  if (!name || !email || !email.includes('@')) {
    return NextResponse.json({ error: 'invalid' }, { status: 400 })
  }

  const { error } = await supabase.from('ambassador_applications').insert({
    name,
    email,
    whatsapp: text(body.whatsapp, 40),
    city: text(body.city, 120),
    instagram: text(body.instagram, 80),
    community: text(body.community, 240),
    community_value: text(body.communityValue, 40),
    people: text(body.people, 80),
    people_value: text(body.peopleValue, 20),
    promote: text(body.promote, 400),
    promote_values: Array.isArray(body.promoteValues)
      ? body.promoteValues.map((item) => text(item, 40)).filter(Boolean).slice(0, 8)
      : [],
    why: text(body.why, 2000),
    attend: text(body.attend, 120),
    attend_value: text(body.attendValue, 40),
    locale: ['fr', 'en', 'es'].includes(text(body.locale, 2)) ? text(body.locale, 2) : 'fr',
  })

  if (error) {
    return NextResponse.json({ error: 'save_failed' }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}

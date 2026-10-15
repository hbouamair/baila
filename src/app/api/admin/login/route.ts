import { timingSafeEqual } from 'crypto'
import { NextResponse } from 'next/server'

import { ADMIN_COOKIE, adminPassword, adminToken } from '@/lib/admin'

export async function POST(request: Request) {
  const expected = adminPassword()
  if (!expected) {
    return NextResponse.json({ error: 'not_configured' }, { status: 503 })
  }

  const body = (await request.json().catch(() => null)) as { password?: string } | null
  const given = String(body?.password || '')
  const left = Buffer.from(given)
  const right = Buffer.from(expected)
  if (left.length !== right.length || !timingSafeEqual(left, right)) {
    return NextResponse.json({ error: 'invalid' }, { status: 401 })
  }

  const response = NextResponse.json({ ok: true })
  response.cookies.set(ADMIN_COOKIE, adminToken(), {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 14,
  })
  return response
}

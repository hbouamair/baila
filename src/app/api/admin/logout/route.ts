import { NextResponse } from 'next/server'

import { ADMIN_COOKIE } from '@/lib/admin'

function clearAdminCookie(response: NextResponse) {
  response.cookies.set(ADMIN_COOKIE, '', {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 0,
    expires: new Date(0),
  })
}

export async function POST(request: Request) {
  const response = NextResponse.redirect(new URL('/admin/login', request.url), 303)
  clearAdminCookie(response)
  return response
}

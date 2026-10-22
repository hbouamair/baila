import createMiddleware from 'next-intl/middleware'
import { NextResponse, type NextRequest } from 'next/server'

import { routing } from './i18n/routing'

const handleI18n = createMiddleware(routing)

function withApexHost(url: URL) {
  if (url.hostname.startsWith('www.')) {
    url.hostname = url.hostname.slice(4)
    url.protocol = 'https:'
    url.port = ''
  }
  return url
}

function redirectKeepingCookies(from: NextResponse, destination: URL, status: number) {
  const next = NextResponse.redirect(destination, status)
  from.headers.forEach((value, key) => {
    const name = key.toLowerCase()
    if (name === 'location' || name === 'content-length') return
    if (!next.headers.has(key)) next.headers.set(key, value)
  })
  from.cookies.getAll().forEach((cookie) => next.cookies.set(cookie))
  return next
}

export default function proxy(request: NextRequest) {
  const response = handleI18n(request)
  const location = response.headers.get('location')

  if (location) {
    const destination = withApexHost(new URL(location, request.url))
    const status = response.status === 307 || response.status === 302 ? 308 : response.status
    return redirectKeepingCookies(response, destination, status)
  }

  if (request.nextUrl.hostname.startsWith('www.')) {
    return NextResponse.redirect(withApexHost(request.nextUrl.clone()), 308)
  }

  return response
}

export const config = {
  matcher: ['/((?!api|admin|trpc|_next|_vercel|sitemap\\.xml|robots\\.txt|.*\\..*).*)'],
}

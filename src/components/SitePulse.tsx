'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export function SitePulse({ locale }: { locale: string }) {
  const pathname = usePathname()

  useEffect(() => {
    if (!pathname || pathname.startsWith('/admin')) return
    void fetch('/api/event', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ path: pathname, locale }),
      keepalive: true,
    })
  }, [pathname, locale])

  return null
}

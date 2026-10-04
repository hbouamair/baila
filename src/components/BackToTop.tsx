'use client'

import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'

import { cn } from '@/lib/utils'

export function BackToTop() {
  const t = useTranslations('Nav')
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 480)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <button
      type="button"
      className={cn('back-to-top', visible && 'is-visible')}
      aria-label={t('backToTop')}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      <svg viewBox="0 0 24 24" aria-hidden className="h-5 w-5">
        <path
          d="M12 5.2 5.8 11.4l1.4 1.4L11 8.99V19h2V8.99l3.8 3.81 1.4-1.4Z"
          fill="currentColor"
        />
      </svg>
    </button>
  )
}

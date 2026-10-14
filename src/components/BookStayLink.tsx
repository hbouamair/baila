'use client'

import { useLocale } from 'next-intl'

import { getPathname } from '@/i18n/navigation'
import { cn } from '@/lib/utils'

type BookStayLinkProps = {
  children: React.ReactNode
  className?: string
  testId?: string
  onClick?: () => void
}

export function BookStayLink({ children, className, testId, onClick }: BookStayLinkProps) {
  const locale = useLocale()
  const href = `${getPathname({ href: '/pass', locale })}#tickets`

  return (
    <a href={href} className={cn('film-cta relative z-50', className)} data-testid={testId} onClick={onClick}>
      {children}
    </a>
  )
}

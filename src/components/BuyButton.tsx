'use client'

import { useLocale, useTranslations } from 'next-intl'

import { trackOutboundTicketClick } from '@/lib/analytics'
import { cn } from '@/lib/utils'

type BuyButtonProps = {
  href: string
  platform: string
  passSlug: string
  disabled?: boolean
  className?: string
}

export function BuyButton({ href, platform, passSlug, disabled, className }: BuyButtonProps) {
  const t = useTranslations('Pass')
  const locale = useLocale()
  const label = t('buyOn', { platform })

  if (disabled) {
    return (
      <span
        className={cn(
          'inline-flex min-h-12 w-full items-center justify-center rounded-full bg-line px-4 py-3 text-sm font-medium text-soldout',
          className,
        )}
      >
        {t('soldOut')}
      </span>
    )
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      data-testid="buy-button"
      data-pass={passSlug}
      data-platform={platform}
        className={cn('film-cta w-full justify-between', className)}
      onClick={() => {
        trackOutboundTicketClick({ pass: passSlug, platform, locale })
      }}
    >
      {label}
      <span className="film-cta-mark" aria-hidden />
    </a>
  )
}

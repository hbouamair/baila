import { getTranslations } from 'next-intl/server'
import { RichText } from '@payloadcms/richtext-lexical/react'

import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { BuyButton } from '@/components/BuyButton'
import type { AppLocale } from '@/i18n/routing'
import { getActivePricing } from '@/lib/pricing'
import { cn, formatDate, formatPrice } from '@/lib/utils'
import type { Pass } from '@/payload-types'

type PassCardProps = {
  pass: Pass
  locale: AppLocale
  platform: string
  fallbackUrl: string
  featured?: boolean
}

export async function PassCard({ pass, locale, platform, fallbackUrl, featured = false }: PassCardProps) {
  const t = await getTranslations({ locale, namespace: 'Pass' })
  const days = await getTranslations({ locale, namespace: 'Days' })
  const { active } = getActivePricing(pass.pricingTiers)
  const href = pass.purchaseUrl || fallbackUrl
  const soldOut = pass.status === 'soldOut'

  return (
    <Card
      className="relative flex h-full flex-col gap-0 overflow-hidden rounded-[1.35rem] border-white/10 bg-velvet/80 p-0"
      data-testid="pass-card"
    >
      <div className="h-1.5 bg-linear-to-r from-gold via-blush to-zellige" />
      <div
        className={cn(
          'flex flex-1 flex-col gap-6 px-6 py-6',
          featured && 'lg:grid lg:grid-cols-[minmax(0,1.15fr)_minmax(16rem,0.85fr)] lg:items-stretch lg:gap-10 lg:px-8 lg:py-8',
        )}
      >
        <div className="flex flex-col gap-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h2 className="font-display text-[2rem] leading-tight text-paper">{pass.name}</h2>
              <p className="mt-2 text-sm text-pretty text-ink-muted">{pass.shortDescription}</p>
            </div>
            <div className="flex flex-col items-end gap-2">
              {pass.badge ? <Badge>{pass.badge}</Badge> : null}
              <Badge className={soldOut ? 'bg-line text-soldout' : 'bg-gold text-gold-fg'}>
                {soldOut ? t('soldOut') : t('available')}
              </Badge>
            </div>
          </div>

          {pass.daysIncluded?.length ? (
            <div>
              <p className="text-sm text-ink-muted">{t('includedDays')}</p>
              <ul className="mt-2 flex flex-wrap gap-2">
                {pass.daysIncluded.map((day) => (
                  <li key={day}>
                    <Badge>{days(day)}</Badge>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {pass.inclusions?.length ? (
            <div>
              <p className="text-sm text-ink-muted">{t('inclusions')}</p>
              <ul className="mt-2 space-y-1.5 text-sm">
                {pass.inclusions
                  .filter((inclusion) => inclusion.item)
                  .map((inclusion, index) => (
                    <li key={`${inclusion.item}-${index}`} className="flex gap-2">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                      <span>{inclusion.item}</span>
                    </li>
                  ))}
              </ul>
            </div>
          ) : null}

          {pass.restrictions ? (
            <div>
              <p className="text-sm text-ink-muted">{t('restrictions')}</p>
              <div className="mt-2 text-sm text-ink-muted [&_p]:mb-2">
                <RichText data={pass.restrictions} />
              </div>
            </div>
          ) : null}
        </div>

        <div className={cn('flex flex-col gap-6', featured && 'lg:justify-between')}>
          <div className="rounded-2xl border border-white/8 bg-night/60 px-4 py-4">
            <p className="text-sm text-ink-muted">{t('currentPeriod')}</p>
            {active ? (
              <>
                <p className="font-display tabular mt-1 text-5xl text-gold" data-testid="pass-price">
                  {formatPrice(active.price, pass.currency || 'EUR', locale)}
                </p>
                <p className="mt-1 text-sm text-ink-muted">
                  {active.label}
                  {active.validUntil ? ` ${t('until', { date: formatDate(active.validUntil, locale) })}` : null}
                  {!active.validUntil && active.validFrom
                    ? ` ${t('from', { date: formatDate(active.validFrom, locale) })}`
                    : null}
                </p>
              </>
            ) : (
              <p className="mt-1 text-lg">{t('noPrice')}</p>
            )}
          </div>

          <div className="mt-auto">
            <BuyButton href={href} platform={platform} passSlug={pass.slug} disabled={soldOut} />
          </div>
        </div>
      </div>
    </Card>
  )
}

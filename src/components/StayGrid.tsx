import { getTranslations } from 'next-intl/server'

import { BuyButton } from '@/components/BuyButton'
import { Reveal } from '@/components/Reveal'
import type { AppLocale } from '@/i18n/routing'
import { stayPackages } from '@/lib/stays'
import { formatPrice } from '@/lib/utils'

type StayGridProps = {
  locale: AppLocale
  platform: string
  href: string
}

export async function StayGrid({ locale, platform, href }: StayGridProps) {
  const t = await getTranslations({ locale, namespace: 'Stay' })

  return (
    <div className="grid gap-8 xl:grid-cols-3">
      {stayPackages.map((stay, index) => {
        const early = stay.tiers[0]
        const rest = stay.tiers.slice(1)
        return (
          <Reveal key={stay.id} delay={index * 80} className="h-full">
            <article data-testid="pass-card" className="film-frame flex h-full flex-col">
              <div className="film-frame-core flex h-full flex-col bg-velvet">
                <div className="relative aspect-[5/3] overflow-hidden">
                  <img src={stay.photo} alt="" className="h-full w-full object-cover object-center" />
                </div>
                <div className="flex flex-1 flex-col gap-5 px-6 py-6">
                  <div>
                    <h2 className="font-poster text-[2rem] leading-none text-paper">{stay.name[locale]}</h2>
                    <p className="mt-2 text-sm text-paper/70">{t('occupancy', { count: stay.occupancy })}</p>
                    <p className="mt-2 text-sm text-ink-muted">{stay.summary[locale]}</p>
                  </div>
                  <div>
                    <p className="text-sm text-blush">{early.label[locale]}</p>
                    <p data-testid="pass-price" className="font-poster mt-1 text-5xl leading-none text-sun">
                      {formatPrice(early.price, 'EUR', locale)}
                    </p>
                    <p className="mt-2 text-sm text-ink-muted">{t('perPerson')}</p>
                  </div>
                  <ul className="space-y-2 text-sm">
                    {rest.map((tier) => (
                      <li key={tier.id} className="flex items-center justify-between gap-4 border-b border-white/8 pb-2 last:border-0">
                        <span className="text-ink-muted">{tier.label[locale]}</span>
                        <span className="tabular text-paper">{formatPrice(tier.price, 'EUR', locale)}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto">
                    <BuyButton href={href} platform={platform} passSlug={stay.id} />
                  </div>
                </div>
              </div>
            </article>
          </Reveal>
        )
      })}
    </div>
  )
}

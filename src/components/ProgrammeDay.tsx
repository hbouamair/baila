import { getFormatter, getTranslations } from 'next-intl/server'

import type { AppLocale } from '@/i18n/routing'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import type { Artist, Programme } from '@/payload-types'

type ProgrammeDayProps = {
  date: string
  items: Programme[]
  locale: AppLocale
}

function artistName(value: number | Artist) {
  if (typeof value === 'object' && value) return value.name
  return null
}

export async function ProgrammeDay({ date, items, locale }: ProgrammeDayProps) {
  const t = await getTranslations({ locale, namespace: 'Programme' })
  const format = await getFormatter({ locale })
  const label = format.dateTime(new Date(date), { weekday: 'long', day: 'numeric', month: 'long' })

  return (
    <section className="space-y-4">
      <h2 className="font-display text-[2rem] capitalize text-paper">{label}</h2>
      <div className="space-y-3">
        {items.map((item) => (
          <Card key={item.id} className="grid gap-3 sm:grid-cols-[7rem_1fr]">
            <p className="font-display tabular text-xl text-gold">
              {item.startTime}
              {item.endTime ? ` – ${item.endTime}` : ''}
            </p>
            <div>
              <div className="flex flex-wrap gap-2">
                <Badge>{t(`type_${item.type}` as 'type_workshop')}</Badge>
                {item.level ? <Badge>{t(`level_${item.level}` as 'level_all')}</Badge> : null}
                {item.room ? <Badge>{item.room}</Badge> : null}
              </div>
              <h3 className="mt-2 text-lg font-medium">{item.title}</h3>
              {item.artists?.length ? (
                <p className="mt-1 text-sm text-ink-muted">
                  {item.artists.map(artistName).filter(Boolean).join(', ')}
                </p>
              ) : null}
            </div>
          </Card>
        ))}
      </div>
    </section>
  )
}

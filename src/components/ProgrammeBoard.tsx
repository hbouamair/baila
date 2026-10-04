'use client'

import { useMemo, useState } from 'react'
import { useTranslations } from 'next-intl'

import { Reveal } from '@/components/Reveal'
import { cn } from '@/lib/utils'

export type ProgrammeItemView = {
  id: string | number
  title: string
  startTime: string
  endTime?: string | null
  type: string
  typeLabel: string
  levelLabel?: string | null
  room?: string | null
  artists?: string | null
}

export type ProgrammeDayView = {
  date: string
  weekday: string
  dayNum: string
  label: string
  items: ProgrammeItemView[]
}

const filters = ['all', 'workshop', 'party', 'show', 'other'] as const

export function ProgrammeBoard({ days }: { days: ProgrammeDayView[] }) {
  const t = useTranslations('Programme')
  const [filter, setFilter] = useState<(typeof filters)[number]>('all')

  const chapters = useMemo(
    () =>
      days.map((day) => ({
        ...day,
        items: filter === 'all' ? day.items : day.items.filter((item) => item.type === filter),
      })),
    [days, filter],
  )

  if (!days.length) return <p className="text-paper/70">{t('empty')}</p>

  return (
    <div>
      <div className="flex flex-nowrap gap-2 overflow-x-auto pb-1" role="tablist" aria-label={t('filterAll')}>
        {filters.map((item) => (
          <button
            key={item}
            type="button"
            role="tab"
            aria-selected={filter === item}
            onClick={() => setFilter(item)}
            className={cn(
              'programme-chip px-4 py-2 text-sm font-medium',
              filter === item ? 'border-sun bg-sun text-gold-fg' : 'bg-paper/5 text-paper/72 hover:text-paper',
            )}
          >
            {item === 'all' ? t('filterAll') : t(`type_${item}` as 'type_workshop')}
          </button>
        ))}
      </div>

      <nav className="programme-rail mt-8" aria-label={t('nav')}>
        {chapters.map((day) => (
          <a
            key={day.date}
            href={`#day-${day.date}`}
            className="min-w-28 bg-paper/5 px-5 py-3 text-paper/80 hover:text-paper"
          >
            <span className="font-poster block text-2xl leading-none">{day.weekday}</span>
            <span className="mt-1 block text-sm text-blush">{day.dayNum}</span>
          </a>
        ))}
      </nav>

      <div className="mt-16 space-y-20">
        {chapters.map((day) => (
          <section key={day.date} id={`day-${day.date}`} className="scroll-mt-32">
            <Reveal>
              <p className="font-script text-[clamp(2rem,4vw,3.2rem)] leading-none text-blush">{day.label}</p>
              <h2 className="font-poster mt-2 text-[clamp(2.8rem,12vw,7.5rem)] leading-[0.82]">{day.weekday}</h2>
            </Reveal>

            {day.items.length ? (
              <ol className="mt-10">
                {day.items.map((item, index) => (
                  <Reveal key={item.id} delay={index * 50}>
                    <li className="programme-row">
                      <p className="tabular-nums text-[1.05rem] leading-tight text-sun md:text-[1.2rem]">
                        <span className="block">{item.startTime}</span>
                        {item.endTime ? <span className="mt-1 block text-paper/45">{item.endTime}</span> : null}
                      </p>
                      <div>
                        <h3 className="text-[clamp(1.4rem,2.4vw,2rem)] font-medium leading-[1.1]">{item.title}</h3>
                        {item.artists ? <p className="mt-2 text-sm text-paper/68">{item.artists}</p> : null}
                      </div>
                      <p className="flex flex-wrap gap-x-3 gap-y-1 text-sm text-blush">
                        <span>{item.typeLabel}</span>
                        {item.levelLabel ? <span>{item.levelLabel}</span> : null}
                        {item.room ? <span>{item.room}</span> : null}
                      </p>
                    </li>
                  </Reveal>
                ))}
              </ol>
            ) : (
              <p className="mt-8 text-paper/68">{days.some((item) => item.items.length) ? t('emptyFilter') : t('empty')}</p>
            )}
          </section>
        ))}
      </div>
    </div>
  )
}

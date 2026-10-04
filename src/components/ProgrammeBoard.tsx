'use client'

import { useMemo, useState } from 'react'
import { useTranslations } from 'next-intl'

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
  weekdayShort: string
  dayNum: string
  label: string
  items: ProgrammeItemView[]
}

const filters = ['all', 'workshop', 'party', 'show', 'other'] as const
const YEAR = 2027
const MONTH = 4

function monthCells() {
  const firstWeekday = (new Date(Date.UTC(YEAR, MONTH, 1)).getUTCDay() + 6) % 7
  const daysInMonth = new Date(Date.UTC(YEAR, MONTH + 1, 0)).getUTCDate()
  const cells: Array<{ day: number | null; date: string | null }> = []

  for (let i = 0; i < firstWeekday; i += 1) cells.push({ day: null, date: null })
  for (let day = 1; day <= daysInMonth; day += 1) {
    cells.push({ day, date: `2027-05-${String(day).padStart(2, '0')}` })
  }
  while (cells.length % 7 !== 0) cells.push({ day: null, date: null })
  return cells
}

export function ProgrammeBoard({
  days,
  monthName,
  weekdays,
}: {
  days: ProgrammeDayView[]
  monthName: string
  weekdays: string[]
}) {
  const t = useTranslations('Programme')
  const [filter, setFilter] = useState<(typeof filters)[number]>('all')
  const [selected, setSelected] = useState(() => days.find((day) => day.items.length)?.date || days[0]?.date || '')

  const byDate = useMemo(() => new Map(days.map((day) => [day.date, day])), [days])
  const cells = useMemo(() => monthCells(), [])
  const active = byDate.get(selected)
  const dayIndex = days.findIndex((day) => day.date === selected)
  const prevDay = dayIndex > 0 ? days[dayIndex - 1] : null
  const nextDay = dayIndex >= 0 && dayIndex < days.length - 1 ? days[dayIndex + 1] : null
  const dayItems = active?.items || []
  const items = dayItems.filter((item) => filter === 'all' || item.type === filter)

  if (!days.length) return <p className="text-paper/70">{t('empty')}</p>

  return (
    <div className="cal-layout">
      <div className="cal-week" role="tablist" aria-label={t('nav')}>
        {days.map((day) => (
          <button
            key={day.date}
            type="button"
            role="tab"
            aria-selected={day.date === selected}
            onClick={() => setSelected(day.date)}
            className={cn('cal-week-day', day.date === selected && 'is-selected')}
          >
            <span className="cal-week-name">{day.weekdayShort}</span>
            <span className="cal-week-num">{day.dayNum}</span>
            <span className="cal-week-count">{day.items.length}</span>
          </button>
        ))}
      </div>

      <div className="cal-shell">
        <div className="cal-core">
          <div className="flex items-end justify-between gap-4 px-5 pt-6 sm:px-7 sm:pt-8">
            <div>
              <p className="font-script text-[clamp(1.8rem,3vw,3.2rem)] leading-none text-blush">{YEAR}</p>
              <h2 className="font-poster mt-1 text-[clamp(2.6rem,7vw,6.4rem)] leading-[0.82] capitalize">{monthName}</h2>
            </div>
            <p className="hidden max-w-[9rem] pb-2 text-right text-sm text-paper/58 lg:block">{t('calendarHint')}</p>
          </div>

          <div className="cal-weekdays" aria-hidden>
            {weekdays.map((label) => (
              <span key={label}>{label}</span>
            ))}
          </div>

          <div className="cal-grid" role="grid" aria-label={t('nav')}>
            {cells.map((cell, index) => {
              const day = cell.date ? byDate.get(cell.date) : undefined
              const live = Boolean(day)
              const isSelected = cell.date === selected
              const count = day?.items.length || 0

              if (!cell.day) {
                return <div key={`empty-${index}`} className="cal-cell is-empty" />
              }

              if (!live) {
                return (
                  <div key={cell.date} className="cal-cell is-mute">
                    <span className="cal-num">{cell.day}</span>
                  </div>
                )
              }

              return (
                <button
                  key={cell.date}
                  type="button"
                  role="gridcell"
                  aria-label={`${day?.weekday} ${cell.day}`}
                  aria-selected={isSelected}
                  aria-current={isSelected ? 'date' : undefined}
                  onClick={() => setSelected(cell.date!)}
                  className={cn('cal-cell is-live', isSelected && 'is-selected')}
                >
                  <span className="cal-num">{cell.day}</span>
                  <span className="cal-name">{day?.weekday}</span>
                  {count ? <span className="cal-pip">{count}</span> : <span className="cal-dot" />}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      <section className="cal-agenda" aria-live="polite">
        <div className="cal-agenda-head">
          <button
            type="button"
            className="cal-arrow"
            disabled={!prevDay}
            aria-label={t('prevDay')}
            onClick={() => prevDay && setSelected(prevDay.date)}
          >
            <svg viewBox="0 0 24 24" aria-hidden className="h-5 w-5">
              <path d="M14.8 5.8 8.6 12l6.2 6.2 1.4-1.4L11.4 12l4.8-4.8Z" fill="currentColor" />
            </svg>
          </button>
          <div className="min-w-0 text-center">
            <p className="font-script text-[clamp(1.5rem,5vw,2.6rem)] leading-none text-blush">{active?.label}</p>
            <h3 className="font-poster mt-1 text-[clamp(2rem,9vw,4.4rem)] leading-[0.88]">{active?.weekday}</h3>
            <p className="mt-2 text-sm text-paper/60">{t('moments', { count: items.length })}</p>
          </div>
          <button
            type="button"
            className="cal-arrow"
            disabled={!nextDay}
            aria-label={t('nextDay')}
            onClick={() => nextDay && setSelected(nextDay.date)}
          >
            <svg viewBox="0 0 24 24" aria-hidden className="h-5 w-5">
              <path d="M9.2 5.8 7.8 7.2 12.6 12l-4.8 4.8 1.4 1.4L15.4 12Z" fill="currentColor" />
            </svg>
          </button>
        </div>

        <div className="cal-filters" role="tablist" aria-label={t('filterAll')}>
          {filters.map((item) => (
            <button
              key={item}
              type="button"
              role="tab"
              aria-selected={filter === item}
              onClick={() => setFilter(item)}
              className={cn(
                'programme-chip px-3 py-2 text-sm font-medium sm:px-4',
                filter === item ? 'border-sun bg-sun text-gold-fg' : 'bg-paper/5 text-paper/72 hover:text-paper',
              )}
            >
              {item === 'all' ? t('filterAll') : t(`type_${item}` as 'type_workshop')}
            </button>
          ))}
        </div>

        {items.length ? (
          <ol className="cal-list">
            {items.map((item) => (
              <li key={`${item.startTime}-${item.id}`} className="programme-row">
                <p className="programme-time">
                  <span>{item.startTime}</span>
                  {item.endTime ? <span>{item.endTime}</span> : null}
                </p>
                <div className="min-w-0">
                  <h4 className="text-[clamp(1.15rem,4.4vw,1.8rem)] font-medium leading-[1.15]">{item.title}</h4>
                  {item.artists ? <p className="mt-1 text-sm text-paper/68">{item.artists}</p> : null}
                  <p className="programme-meta">
                    <span>{item.typeLabel}</span>
                    {item.levelLabel ? <span>{item.levelLabel}</span> : null}
                    {item.room ? <span>{item.room}</span> : null}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        ) : (
          <p className="mt-8 text-paper/68">
            {dayItems.length === 0 ? t('emptyDay') : t('emptyFilter')}
          </p>
        )}
      </section>
    </div>
  )
}

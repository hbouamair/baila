import { getFormatter, getTranslations, setRequestLocale } from 'next-intl/server'

import { ProgrammeBoard, type ProgrammeDayView } from '@/components/ProgrammeBoard'
import { ProgrammeStage } from '@/components/programme/ProgrammeStage'
import type { AppLocale } from '@/i18n/routing'
import { getProgramme } from '@/lib/payload'
import { buildPageMetadata } from '@/lib/seo'
import type { Artist, Programme } from '@/payload-types'

type PageProps = {
  params: Promise<{ locale: AppLocale }>
}

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params
  return buildPageMetadata(locale, 'programmeTitle', 'programmeDescription', '/programme')
}

function artistName(value: number | Artist) {
  if (typeof value === 'object' && value) return value.name
  return null
}

const PROGRAMME_DAYS = ['2027-05-20', '2027-05-21', '2027-05-22', '2027-05-23'] as const

function dateKey(value?: string | null) {
  return value?.slice(0, 10) || ''
}

function itemsByFestivalDay(items: Programme[]) {
  const matched = PROGRAMME_DAYS.map((date) => items.filter((item) => dateKey(item.date) === date))
  if (matched.some((day) => day.length)) return matched

  const leftover = new Map<string, Programme[]>()
  for (const item of items) {
    const key = dateKey(item.date) || 'unknown'
    leftover.set(key, [...(leftover.get(key) ?? []), item])
  }
  return PROGRAMME_DAYS.map((_, index) => [...leftover.values()][index] ?? [])
}

export default async function ProgrammePage({ params }: PageProps) {
  const { locale } = await params
  setRequestLocale(locale)
  const [items, t, format] = await Promise.all([
    getProgramme(locale),
    getTranslations({ locale, namespace: 'Programme' }),
    getFormatter({ locale }),
  ])
  const grouped = itemsByFestivalDay(items)
  const days: ProgrammeDayView[] = PROGRAMME_DAYS.map((date, index) => {
    const parsed = new Date(`${date}T00:00:00.000Z`)
    const dayItems = grouped[index] ?? []
    return {
      date,
      weekday: format.dateTime(parsed, { weekday: 'long', timeZone: 'UTC' }),
      dayNum: format.dateTime(parsed, { day: 'numeric', timeZone: 'UTC' }),
      label: format.dateTime(parsed, { weekday: 'long', day: 'numeric', month: 'long', timeZone: 'UTC' }),
      items: dayItems
        .sort((a, b) => a.startTime.localeCompare(b.startTime))
        .map((item) => ({
          id: item.id,
          title: item.title,
          startTime: item.startTime,
          endTime: item.endTime,
          type: item.type,
          typeLabel: t(`type_${item.type}` as 'type_workshop'),
          levelLabel: item.level ? t(`level_${item.level}` as 'level_all') : null,
          room: item.room,
          artists: item.artists?.map(artistName).filter(Boolean).join(', ') || null,
        })),
    }
  })

  return (
    <ProgrammeStage titleLead={t('titleLead')} title={t('title')} intro={t('intro')} seeDays={t('seeDays')}>
      {days.length ? <ProgrammeBoard days={days} /> : <p className="text-paper/70">{t('empty')}</p>}
    </ProgrammeStage>
  )
}

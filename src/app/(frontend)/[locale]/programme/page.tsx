import { getFormatter, getTranslations, setRequestLocale } from 'next-intl/server'

import { ProgrammeBoard, type ProgrammeDayView, type ProgrammeItemView } from '@/components/ProgrammeBoard'
import { ProgrammeStage } from '@/components/programme/ProgrammeStage'
import type { AppLocale } from '@/i18n/routing'
import { getProgramme } from '@/lib/payload'
import { festivalDateKey, PROGRAMME_DAYS, slotsForDay } from '@/lib/programme'
import { buildPageMetadata } from '@/lib/seo'
import type { Artist } from '@/payload-types'

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

function slotKey(item: { startTime: string; title: string }) {
  return `${item.startTime}|${item.title.toLowerCase()}`
}

export default async function ProgrammePage({ params }: PageProps) {
  const { locale } = await params
  setRequestLocale(locale)
  const [items, t, format] = await Promise.all([
    getProgramme(locale),
    getTranslations({ locale, namespace: 'Programme' }),
    getFormatter({ locale }),
  ])

  const days: ProgrammeDayView[] = PROGRAMME_DAYS.map((date) => {
    const parsed = new Date(`${date}T12:00:00.000Z`)
    const published = slotsForDay(date, locale).map((slot) => ({
      id: slot.id,
      title: slot.title,
      startTime: slot.startTime,
      endTime: slot.endTime,
      type: slot.type,
      typeLabel: t(`type_${slot.type}` as 'type_workshop'),
      levelLabel: t(`level_${slot.level}` as 'level_all'),
      room: slot.room,
      artists: slot.artists,
    }))
    const extras = items
      .filter((item) => festivalDateKey(item.date) === date)
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
      }))
    const seen = new Set(published.map(slotKey))
    const merged: ProgrammeItemView[] = [
      ...published,
      ...extras.filter((item) => !seen.has(slotKey(item))),
    ].sort((a, b) => a.startTime.localeCompare(b.startTime) || a.title.localeCompare(b.title))

    return {
      date,
      weekday: format.dateTime(parsed, { weekday: 'long', timeZone: 'UTC' }),
      weekdayShort: format.dateTime(parsed, { weekday: 'short', timeZone: 'UTC' }),
      dayNum: format.dateTime(parsed, { day: 'numeric', timeZone: 'UTC' }),
      label: format.dateTime(parsed, { weekday: 'long', day: 'numeric', month: 'long', timeZone: 'UTC' }),
      items: merged,
    }
  })

  const monthName = format.dateTime(new Date('2027-05-01T12:00:00.000Z'), {
    month: 'long',
    timeZone: 'UTC',
  })
  const weekdays = [1, 2, 3, 4, 5, 6, 7].map((day) =>
    format.dateTime(new Date(`2021-03-0${day}T12:00:00.000Z`), { weekday: 'short', timeZone: 'UTC' }),
  )

  return (
    <ProgrammeStage titleLead={t('titleLead')} title={t('title')} intro={t('intro')} seeDays={t('seeDays')}>
      <ProgrammeBoard days={days} monthName={monthName} weekdays={weekdays} />
    </ProgrammeStage>
  )
}

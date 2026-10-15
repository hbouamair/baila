import type { AppLocale } from '@/i18n/routing'

export const PROGRAMME_DAYS = ['2027-05-20', '2027-05-21', '2027-05-22', '2027-05-23', '2027-05-24'] as const

export type ProgrammeType = 'workshop' | 'party' | 'show' | 'other'
export type ProgrammeLevel = 'all' | 'beginner' | 'intermediate' | 'advanced'

export type PublishedSlot = {
  id: string
  date: (typeof PROGRAMME_DAYS)[number]
  startTime: string
  endTime?: string
  type: ProgrammeType
  level: ProgrammeLevel
  room: string
  artists?: string
  title: Record<AppLocale, string>
}

function slot(
  id: string,
  date: PublishedSlot['date'],
  startTime: string,
  endTime: string | undefined,
  type: ProgrammeType,
  room: string,
  title: Record<AppLocale, string>,
): PublishedSlot {
  return { id, date, startTime, endTime, type, level: 'all', room, title }
}

export const publishedProgramme: PublishedSlot[] = [
  slot('thu-essaouira', '2027-05-20', '10:00', '20:00', 'other', 'Essaouira', {
    fr: 'Excursion à Essaouira',
    en: 'Essaouira day trip',
    es: 'Excursión a Essaouira',
  }),
  slot('thu-workshops', '2027-05-20', '19:00', '21:00', 'workshop', 'Palm Plaza', {
    fr: 'Workshops',
    en: 'Workshops',
    es: 'Workshops',
  }),
  slot('thu-party', '2027-05-20', '23:00', '03:00', 'party', 'Palm Plaza', {
    fr: 'Night party',
    en: 'Night party',
    es: 'Night party',
  }),
  slot('fri-city', '2027-05-21', '14:00', '19:00', 'other', 'Marrakech', {
    fr: 'Visite de Marrakech',
    en: 'Marrakech city tour',
    es: 'Tour por Marrakech',
  }),
  slot('fri-workshops', '2027-05-21', '19:00', '21:00', 'workshop', 'Palm Plaza', {
    fr: 'Workshops',
    en: 'Workshops',
    es: 'Workshops',
  }),
  slot('fri-party', '2027-05-21', '23:00', '05:00', 'party', 'Palm Plaza', {
    fr: 'Night party',
    en: 'Night party',
    es: 'Night party',
  }),
  slot('sat-workshops', '2027-05-22', '11:00', '16:00', 'workshop', 'Palm Plaza', {
    fr: 'Workshops',
    en: 'Workshops',
    es: 'Workshops',
  }),
  slot('sat-pool', '2027-05-22', '15:00', '20:00', 'party', 'Piscine', {
    fr: 'Pool party',
    en: 'Pool party',
    es: 'Pool party',
  }),
  slot('sat-jj', '2027-05-22', '20:00', '22:00', 'other', 'Palm Plaza', {
    fr: 'Jack & Jill, éliminatoires',
    en: 'Jack & Jill prelims',
    es: 'Jack & Jill preliminares',
  }),
  slot('sat-party', '2027-05-22', '00:00', '06:00', 'party', 'Palm Plaza', {
    fr: 'Night party',
    en: 'Night party',
    es: 'Night party',
  }),
  slot('sun-jj', '2027-05-23', '13:00', '15:00', 'other', 'Palm Plaza', {
    fr: 'Jack & Jill, finale',
    en: 'Jack & Jill finals',
    es: 'Jack & Jill final',
  }),
  slot('sun-pool', '2027-05-23', '16:00', '20:00', 'party', 'Piscine', {
    fr: 'Pool party',
    en: 'Pool party',
    es: 'Pool party',
  }),
  slot('sun-closing', '2027-05-23', '22:00', '04:00', 'party', 'Palm Plaza', {
    fr: 'Closing party',
    en: 'Closing party',
    es: 'Closing party',
  }),
  slot('mon-agafay', '2027-05-24', '12:00', '19:00', 'other', 'Agafay', {
    fr: 'Expérience désert Agafay',
    en: 'Agafay desert experience',
    es: 'Experiencia desierto Agafay',
  }),
  slot('mon-party', '2027-05-24', '21:00', '01:00', 'party', 'Palm Plaza', {
    fr: 'Night party',
    en: 'Night party',
    es: 'Night party',
  }),
]

export function festivalDateKey(value?: string | null) {
  if (!value) return ''
  const parsed = new Date(value)
  if (Number.isNaN(parsed.getTime())) return value.slice(0, 10)
  return new Date(parsed.getTime() + 12 * 60 * 60 * 1000).toISOString().slice(0, 10)
}

export function slotsForDay(date: string, locale: AppLocale) {
  return publishedProgramme
    .filter((item) => item.date === date)
    .map((item) => ({
      id: item.id,
      title: item.title[locale],
      startTime: item.startTime,
      endTime: item.endTime,
      type: item.type,
      room: item.room,
      artists: item.artists || null,
      level: item.level,
    }))
}

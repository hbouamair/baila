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
  slot('thu-checkin', '2027-05-20', '15:00', undefined, 'other', 'Lobby', {
    fr: 'Check-in',
    en: 'Check-in',
    es: 'Check-in',
  }),
  slot('thu-pool', '2027-05-20', '15:00', '19:00', 'party', 'Piscine', {
    fr: 'Pool party',
    en: 'Pool party',
    es: 'Pool party',
  }),
  slot('thu-workshops', '2027-05-20', '19:00', '21:00', 'workshop', 'Centre de conférence', {
    fr: 'Workshops',
    en: 'Workshops',
    es: 'Workshops',
  }),
  slot('thu-welcome', '2027-05-20', '23:00', '04:00', 'party', 'Main room', {
    fr: 'Welcome party',
    en: 'Welcome party',
    es: 'Welcome party',
  }),
  slot('fri-breakfast', '2027-05-21', '07:00', '10:30', 'other', 'Restaurant', {
    fr: 'Petit-déjeuner',
    en: 'Breakfast',
    es: 'Desayuno',
  }),
  slot('fri-sightseeing', '2027-05-21', '11:00', '15:00', 'other', 'Marrakech', {
    fr: 'Sightseeing',
    en: 'Sightseeing',
    es: 'Visita de la ciudad',
  }),
  slot('fri-pool', '2027-05-21', '12:00', '19:00', 'party', 'Piscine', {
    fr: 'Pool party',
    en: 'Pool party',
    es: 'Pool party',
  }),
  slot('fri-workshops', '2027-05-21', '15:00', '19:00', 'workshop', 'Centre de conférence', {
    fr: 'Workshops',
    en: 'Workshops',
    es: 'Workshops',
  }),
  slot('fri-party', '2027-05-21', '23:00', '06:00', 'party', 'Main room', {
    fr: 'Friday party',
    en: 'Friday party',
    es: 'Friday party',
  }),
  slot('sat-breakfast', '2027-05-22', '06:00', '10:30', 'other', 'Restaurant', {
    fr: 'Petit-déjeuner',
    en: 'Breakfast',
    es: 'Desayuno',
  }),
  slot('sat-workshops', '2027-05-22', '11:00', '19:00', 'workshop', 'Centre de conférence', {
    fr: 'Workshops',
    en: 'Workshops',
    es: 'Workshops',
  }),
  slot('sat-pool', '2027-05-22', '12:00', '19:00', 'party', 'Piscine', {
    fr: 'Pool party',
    en: 'Pool party',
    es: 'Pool party',
  }),
  slot('sat-jj', '2027-05-22', '20:00', '22:00', 'other', 'Main room', {
    fr: 'Jack & Jill',
    en: 'Jack & Jill',
    es: 'Jack & Jill',
  }),
  slot('sat-party', '2027-05-22', '23:00', '06:00', 'party', 'Main room', {
    fr: 'Saturday party',
    en: 'Saturday party',
    es: 'Saturday party',
  }),
  slot('sun-breakfast', '2027-05-23', '06:00', '10:30', 'other', 'Restaurant', {
    fr: 'Petit-déjeuner',
    en: 'Breakfast',
    es: 'Desayuno',
  }),
  slot('sun-workshops', '2027-05-23', '11:00', '13:00', 'workshop', 'Centre de conférence', {
    fr: 'Workshops',
    en: 'Workshops',
    es: 'Workshops',
  }),
  slot('sun-pool', '2027-05-23', '12:00', '19:00', 'party', 'Piscine', {
    fr: 'Pool party',
    en: 'Pool party',
    es: 'Pool party',
  }),
  slot('sun-dinner', '2027-05-23', '20:00', '22:30', 'other', 'Restaurant', {
    fr: 'Dîner',
    en: 'Dinner',
    es: 'Cena',
  }),
  slot('sun-party', '2027-05-23', '23:00', '06:00', 'party', 'Main room', {
    fr: 'Closing party',
    en: 'Closing party',
    es: 'Closing party',
  }),
  slot('mon-breakfast', '2027-05-24', '06:00', '10:30', 'other', 'Restaurant', {
    fr: 'Petit-déjeuner',
    en: 'Breakfast',
    es: 'Desayuno',
  }),
  slot('mon-checkout', '2027-05-24', '12:00', undefined, 'other', 'Lobby', {
    fr: 'Check-out',
    en: 'Check-out',
    es: 'Check-out',
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

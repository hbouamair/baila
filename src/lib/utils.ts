import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number, currency = 'EUR', locale = 'fr') {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  })    .format(price)
    .replace(/\u202f/g, ' ')
    .replace(/\u00a0/g, ' ')
}

export function formatDate(value: string | Date | null | undefined, locale = 'fr') {
  if (!value) return ''
  const date = typeof value === 'string' ? new Date(value) : value
  if (Number.isNaN(date.getTime())) return ''
  return new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  })
    .format(date)
    .replace(/\u202f/g, ' ')
}

export function formatCompactRange(
  start: string | Date | null | undefined,
  end: string | Date | null | undefined,
  locale = 'fr',
) {
  if (!start || !end) return formatDate(start || end, locale)
  const startDate = typeof start === 'string' ? new Date(start) : start
  const endDate = typeof end === 'string' ? new Date(end) : end
  if (Number.isNaN(startDate.getTime()) || Number.isNaN(endDate.getTime())) return ''
  const month = new Intl.DateTimeFormat(locale, { month: 'short', timeZone: 'UTC' }).format(startDate)
  const startDay = new Intl.DateTimeFormat(locale, { day: 'numeric', timeZone: 'UTC' }).format(startDate)
  const endDay = new Intl.DateTimeFormat(locale, { day: 'numeric', timeZone: 'UTC' }).format(endDate)
  const year = new Intl.DateTimeFormat(locale, { year: 'numeric', timeZone: 'UTC' }).format(endDate)
  return `${startDay} - ${endDay} ${month} ${year}`.replace(/\u202f/g, ' ')
}

export function getMediaUrl(media: unknown): string | null {
  if (!media || typeof media !== 'object') return null
  const url = 'url' in media ? media.url : null
  return typeof url === 'string' ? url : null
}

export function getMediaAlt(media: unknown): string {
  if (!media || typeof media !== 'object') return ''
  const alt = 'alt' in media ? media.alt : null
  return typeof alt === 'string' ? alt : ''
}

const exampleArtistPhotos: Record<string, string> = {
  'aitor-y-angelica': '/examples/artists/aitor-y-angelica.jpg?v=2',
  'victor-y-alba': '/examples/artists/victor-y-alba.jpg?v=2',
  'daimy-y-valeria': '/examples/artists/daimy-y-valeria.jpg?v=2',
  'kevin-y-lucia': '/examples/artists/kevin-y-lucia.jpg?v=2',
  'jordi-judith': '/examples/artists/jordi-judith.jpg?v=2',
  'york-lisa': '/examples/artists/york-lisa.jpg?v=2',
  'kira-santos': '/examples/artists/kira-santos.jpg',
  'marco-duarte': '/examples/artists/marco-duarte.jpg',
  'dj-alma': '/examples/artists/dj-alma.jpg',
}

const examplePhotoPool = Object.values(exampleArtistPhotos)

export function resolveArtistPhoto(artist: {
  slug?: string | null
  name?: string | null
  photo?: unknown
}): string {
  const uploaded = getMediaUrl(artist.photo)
  if (uploaded) return uploaded
  if (artist.slug && exampleArtistPhotos[artist.slug]) return exampleArtistPhotos[artist.slug]
  const key = `${artist.slug || ''}${artist.name || 'artist'}`
  const index = [...key].reduce((sum, char) => sum + char.charCodeAt(0), 0)
  return examplePhotoPool[index % examplePhotoPool.length]
}

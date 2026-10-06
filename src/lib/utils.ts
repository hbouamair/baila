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
  'aitor-y-angelica': '/examples/artists/aitor-y-angelica.jpg?v=5',
  'victor-y-alba': '/examples/artists/victor-y-alba.jpg?v=5',
  'daimy-y-valeria': '/examples/artists/daimy-y-valeria.jpg?v=5',
  'jordi-judith': '/examples/artists/jordi-judith.jpg?v=5',
  'york-lisa': '/examples/artists/york-lisa.jpg?v=5',
  'giovana-y-rafael': '/examples/artists/giovana-y-rafael.jpg?v=5',
  'iman-y-nadina': '/examples/artists/iman-y-nadina.jpg?v=5',
  'smarty-y-mounia': '/examples/artists/smarty-y-mounia.jpg?v=5',
  'sergio-y-sasha': '/examples/artists/sergio-y-sasha.jpg?v=5',
  'jerem-y-jade': '/examples/artists/jerem-y-jade.jpg?v=5',
  'leandro-y-jomante': '/examples/artists/leandro-y-jomante.jpg?v=5',
  'kevin-y-lucia': '/examples/artists/kevin-y-lucia.jpg?v=5',
  habibi: '/examples/artists/habibi.jpg?v=5',
  sara: '/examples/artists/sara.jpg?v=5',
  'dj-chawkey': '/examples/artists/dj-chawkey.jpg?v=5',
  'dj-togo': '/examples/artists/dj-togo.jpg?v=5',
  'dj-york': '/examples/artists/dj-york.jpg?v=5',
  'dj-mr-t': '/examples/artists/dj-mr-t.jpg?v=5',
  'dj-one': '/examples/artists/dj-one.jpg?v=5',
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

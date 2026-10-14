export const CANONICAL_SITE_URL = 'https://bailaimosbachatafestival.com'
export const DEFAULT_OG_IMAGE = '/cinematic/nights.jpg'
export const SITE_NAME = 'Bailaimos'

const OG_LOCALES: Record<string, string> = {
  fr: 'fr_FR',
  en: 'en_GB',
  es: 'es_ES',
}

export function getSiteUrl() {
  const env = process.env.SITE_URL?.replace(/\/$/, '')
  if (env && !/localhost|127\.0\.0\.1/i.test(env)) return env
  return CANONICAL_SITE_URL
}

export function absoluteUrl(path: string) {
  if (path.startsWith('http://') || path.startsWith('https://')) return path
  return `${getSiteUrl()}${path.startsWith('/') ? path : `/${path}`}`
}

export function openGraphLocale(locale: string) {
  return OG_LOCALES[locale] || 'en_GB'
}

import type { AppLocale } from '@/i18n/routing'
import type { Artist, Faq, Page, Pass, PracticalInfo, Programme, SiteSetting } from '@/payload-types'

const siteSettings: SiteSetting = {
  id: 0,
  festivalName: 'Bailaimos',
  city: 'Marrakech',
  startDate: '2027-05-20',
  endDate: '2027-05-24',
  ticketingPlatformName: 'Go&Dance',
  ticketingUrl: 'https://example.com/billetterie',
  contactEmail: null,
  plausibleDomain: null,
  socials: [],
  footerNote: null,
}

const practicalInfo: PracticalInfo = {
  id: 0,
  venueName: 'Palm Plaza Marrakech',
  address: null,
  mapEmbedUrl: null,
  access: null,
  accommodation: null,
}

export async function getSiteSettings(_locale: AppLocale) {
  return siteSettings
}

export async function getHome(_locale: AppLocale) {
  return null
}

export async function getPracticalInfo(_locale: AppLocale) {
  return practicalInfo
}

export async function getPasses(_locale: AppLocale): Promise<Pass[]> {
  return []
}

export async function getArtists(_locale: AppLocale, _featuredOnly = false): Promise<Artist[]> {
  return []
}

export async function getArtistBySlug(_slug: string, _locale: AppLocale): Promise<Artist | null> {
  return null
}

export async function getProgramme(_locale: AppLocale): Promise<Programme[]> {
  return []
}

export async function getFaqs(_locale: AppLocale): Promise<Faq[]> {
  return []
}

export async function getLegalPages(_locale: AppLocale): Promise<Page[]> {
  return []
}

export async function getPageBySlug(_slug: string, _locale: AppLocale): Promise<Page | null> {
  return null
}

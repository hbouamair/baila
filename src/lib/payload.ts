import { cache } from 'react'
import { getPayload, type Payload } from 'payload'

import config from '@payload-config'
import type { AppLocale } from '@/i18n/routing'
import type { PracticalInfo, SiteSetting } from '@/payload-types'

const fallbackSettings: SiteSetting = {
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

const fallbackPracticalInfo: PracticalInfo = {
  id: 0,
  venueName: 'Palm Plaza Marrakech',
  address: null,
  mapEmbedUrl: null,
  access: null,
  accommodation: null,
}

export const getPayloadClient = cache(async (): Promise<Payload | null> => {
  try {
    return await getPayload({ config })
  } catch (error) {
    console.warn('[payload] Database unavailable, using fallback content.')
    if (process.env.NODE_ENV === 'development') {
      console.warn(error)
    }
    return null
  }
})

export async function getSiteSettings(locale: AppLocale) {
  const payload = await getPayloadClient()
  if (!payload) return fallbackSettings
  return payload.findGlobal({
    slug: 'site-settings',
    locale,
    depth: 0,
  })
}

export async function getHome(locale: AppLocale) {
  const payload = await getPayloadClient()
  if (!payload) return null
  return payload.findGlobal({
    slug: 'home',
    locale,
    depth: 1,
  })
}

export async function getPracticalInfo(locale: AppLocale) {
  const payload = await getPayloadClient()
  if (!payload) return fallbackPracticalInfo
  return payload.findGlobal({
    slug: 'practical-info',
    locale,
    depth: 0,
  })
}

export async function getPasses(locale: AppLocale) {
  const payload = await getPayloadClient()
  if (!payload) return []
  const result = await payload.find({
    collection: 'passes',
    locale,
    depth: 0,
    limit: 50,
    sort: 'order',
    where: { status: { not_equals: 'hidden' } },
  })
  return result.docs
}

export async function getArtists(locale: AppLocale, featuredOnly = false) {
  const payload = await getPayloadClient()
  if (!payload) return []
  const result = await payload.find({
    collection: 'artists',
    locale,
    depth: 1,
    limit: 100,
    sort: 'order',
    where: featuredOnly ? { featured: { equals: true } } : undefined,
  })
  return result.docs
}

export async function getArtistBySlug(slug: string, locale: AppLocale) {
  const payload = await getPayloadClient()
  if (!payload) return null
  const result = await payload.find({
    collection: 'artists',
    locale,
    depth: 1,
    limit: 1,
    where: { slug: { equals: slug } },
  })
  return result.docs[0] ?? null
}

export async function getProgramme(locale: AppLocale) {
  const payload = await getPayloadClient()
  if (!payload) return []
  const result = await payload.find({
    collection: 'programme',
    locale,
    depth: 1,
    limit: 200,
    sort: 'date',
  })
  return result.docs
}

export async function getFaqs(locale: AppLocale) {
  const payload = await getPayloadClient()
  if (!payload) return []
  const result = await payload.find({
    collection: 'faqs',
    locale,
    depth: 0,
    limit: 100,
    sort: 'order',
  })
  return result.docs
}

export async function getLegalPages(locale: AppLocale) {
  const payload = await getPayloadClient()
  if (!payload) return []
  const result = await payload.find({
    collection: 'pages',
    locale,
    depth: 0,
    limit: 20,
    sort: 'slug',
  })
  return result.docs
}

export async function getPageBySlug(slug: string, locale: AppLocale) {
  const payload = await getPayloadClient()
  if (!payload) return null
  const result = await payload.find({
    collection: 'pages',
    locale,
    depth: 0,
    limit: 1,
    where: { slug: { equals: slug } },
  })
  return result.docs[0] ?? null
}

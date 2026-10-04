import { cache } from 'react'
import { getPayload } from 'payload'

import config from '@payload-config'
import type { AppLocale } from '@/i18n/routing'

export const getPayloadClient = cache(async () => {
  return getPayload({ config })
})

export async function getSiteSettings(locale: AppLocale) {
  const payload = await getPayloadClient()
  return payload.findGlobal({
    slug: 'site-settings',
    locale,
    depth: 0,
  })
}

export async function getHome(locale: AppLocale) {
  const payload = await getPayloadClient()
  return payload.findGlobal({
    slug: 'home',
    locale,
    depth: 1,
  })
}

export async function getPracticalInfo(locale: AppLocale) {
  const payload = await getPayloadClient()
  return payload.findGlobal({
    slug: 'practical-info',
    locale,
    depth: 0,
  })
}

export async function getPasses(locale: AppLocale) {
  const payload = await getPayloadClient()
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
  const result = await payload.find({
    collection: 'pages',
    locale,
    depth: 0,
    limit: 1,
    where: { slug: { equals: slug } },
  })
  return result.docs[0] ?? null
}

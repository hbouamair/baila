import type { MetadataRoute } from 'next'

import { getPathname } from '@/i18n/navigation'
import { routing, type AppLocale } from '@/i18n/routing'
import { getSiteUrl } from '@/lib/site'
import { featuredArtists } from '@/lib/stays'

type Href = Parameters<typeof getPathname>[0]['href']

const STATIC_PAGES: { href: Href; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']; priority: number }[] =
  [
    { href: '/', changeFrequency: 'weekly', priority: 1 },
    { href: '/pass', changeFrequency: 'weekly', priority: 0.9 },
    { href: '/artistes', changeFrequency: 'weekly', priority: 0.8 },
    { href: '/programme', changeFrequency: 'weekly', priority: 0.8 },
    { href: '/infos-pratiques', changeFrequency: 'monthly', priority: 0.8 },
    { href: '/faq', changeFrequency: 'monthly', priority: 0.6 },
    { href: '/ambassadeurs', changeFrequency: 'monthly', priority: 0.5 },
    { href: '/contact', changeFrequency: 'yearly', priority: 0.4 },
  ]

function localeMap(href: Href) {
  const site = getSiteUrl()
  return {
    ...Object.fromEntries(
      routing.locales.map((locale: AppLocale) => [locale, `${site}${getPathname({ locale, href })}`]),
    ),
    'x-default': `${site}${getPathname({ locale: routing.defaultLocale, href })}`,
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const site = getSiteUrl()
  const lastModified = new Date('2026-10-14')

  const pages = STATIC_PAGES.flatMap((page) =>
    routing.locales.map((locale) => ({
      url: `${site}${getPathname({ locale, href: page.href })}`,
      lastModified,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
      alternates: { languages: localeMap(page.href) },
    })),
  )

  const artists = featuredArtists.flatMap((artist) => {
    const href: Href = { pathname: '/artistes/[slug]', params: { slug: artist.slug } }
    return routing.locales.map((locale) => ({
      url: `${site}${getPathname({ locale, href })}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
      alternates: { languages: localeMap(href) },
    }))
  })

  return [...pages, ...artists]
}

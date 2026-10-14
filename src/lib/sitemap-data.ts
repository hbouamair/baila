import { getPathname } from '@/i18n/navigation'
import { routing, type AppLocale } from '@/i18n/routing'
import { getSiteUrl } from '@/lib/site'
import { featuredArtists } from '@/lib/stays'

type Href = Parameters<typeof getPathname>[0]['href']

const STATIC_PAGES: Href[] = [
  '/',
  '/pass',
  '/artistes',
  '/programme',
  '/infos-pratiques',
  '/faq',
  '/ambassadeurs',
  '/contact',
]

export type SitemapEntry = {
  loc: string
  lastmod: string
  changefreq: 'weekly' | 'monthly' | 'yearly'
  priority: string
  alternates: { lang: string; href: string }[]
}

function pageUrl(locale: AppLocale, href: Href) {
  return `${getSiteUrl()}${getPathname({ locale, href })}`
}

function alternates(href: Href) {
  return [
    ...routing.locales.map((locale) => ({ lang: locale, href: pageUrl(locale, href) })),
    { lang: 'x-default', href: pageUrl(routing.defaultLocale, href) },
  ]
}

function pageMeta(href: Href): Pick<SitemapEntry, 'changefreq' | 'priority'> {
  if (href === '/') return { changefreq: 'weekly', priority: '1.0' }
  if (href === '/pass') return { changefreq: 'weekly', priority: '0.9' }
  if (href === '/artistes' || href === '/programme') return { changefreq: 'weekly', priority: '0.8' }
  if (href === '/contact') return { changefreq: 'yearly', priority: '0.4' }
  return { changefreq: 'monthly', priority: '0.6' }
}

export function getSitemapEntries(): SitemapEntry[] {
  const lastmod = '2026-10-14'
  const pages = STATIC_PAGES.flatMap((href) => {
    const langs = alternates(href)
    const meta = pageMeta(href)
    return routing.locales.map((locale) => ({
      loc: pageUrl(locale, href),
      lastmod,
      ...meta,
      alternates: langs,
    }))
  })

  const artists = featuredArtists.flatMap((artist) => {
    const href: Href = { pathname: '/artistes/[slug]', params: { slug: artist.slug } }
    const langs = alternates(href)
    return routing.locales.map((locale) => ({
      loc: pageUrl(locale, href),
      lastmod,
      changefreq: 'monthly' as const,
      priority: '0.5',
      alternates: langs,
    }))
  })

  return [...pages, ...artists]
}

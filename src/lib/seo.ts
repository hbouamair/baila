import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'

import { getPathname } from '@/i18n/navigation'
import { routing, type AppLocale } from '@/i18n/routing'
import { getSiteSettings } from '@/lib/payload'
import { absoluteUrl, DEFAULT_OG_IMAGE, getSiteUrl, openGraphLocale } from '@/lib/site'
import type frMessages from '../../messages/fr.json'

type Pathname = Parameters<typeof getPathname>[0]['href']
type MetaKey = keyof typeof frMessages.Meta

type BuildPageMetadataOptions = {
  image?: string
  titleOverride?: string
  descriptionOverride?: string
}

export async function buildPageMetadata(
  locale: AppLocale,
  titleKey: MetaKey,
  descriptionKey: MetaKey,
  href: Pathname,
  options: BuildPageMetadataOptions = {},
): Promise<Metadata> {
  setRequestLocale(locale)
  const t = await getTranslations('Meta')
  const settings = await getSiteSettings(locale)
  const siteName = settings.festivalName || t('siteName')
  const siteUrl = getSiteUrl()
  const path = getPathname({ locale, href })
  const url = `${siteUrl}${path}`
  const rawTitle = options.titleOverride ?? t(titleKey)
  const title = `${rawTitle} — ${siteName}`
  const description = options.descriptionOverride ?? t(descriptionKey)
  const image = absoluteUrl(options.image || DEFAULT_OG_IMAGE)

  const languages = {
    ...Object.fromEntries(
      routing.locales.map((item) => [item, `${siteUrl}${getPathname({ locale: item, href })}`]),
    ),
    'x-default': `${siteUrl}${getPathname({ locale: routing.defaultLocale, href })}`,
  }

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages,
    },
    openGraph: {
      title,
      description,
      url,
      locale: openGraphLocale(locale),
      alternateLocale: routing.locales
        .filter((item) => item !== locale)
        .map((item) => openGraphLocale(item)),
      siteName,
      type: 'website',
      images: [
        {
          url: image,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}

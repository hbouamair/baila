import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'

import { getPathname } from '@/i18n/navigation'
import { routing, type AppLocale } from '@/i18n/routing'
import { getSiteSettings } from '@/lib/payload'
import type frMessages from '../../messages/fr.json'

type Pathname = Parameters<typeof getPathname>[0]['href']
type MetaKey = keyof typeof frMessages.Meta

export async function buildPageMetadata(
  locale: AppLocale,
  titleKey: MetaKey,
  descriptionKey: MetaKey,
  href: Pathname,
): Promise<Metadata> {
  setRequestLocale(locale)
  const t = await getTranslations('Meta')
  const settings = await getSiteSettings(locale)
  const siteName = settings.festivalName || t('siteName')
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  const title = `${t(titleKey)} — ${siteName}`
  const description = t(descriptionKey)

  const languages = Object.fromEntries(
    routing.locales.map((item) => [
      item,
      `${siteUrl}${getPathname({ locale: item, href })}`,
    ]),
  )

  return {
    title,
    description,
    alternates: {
      canonical: `${siteUrl}${getPathname({ locale, href })}`,
      languages,
    },
    openGraph: {
      title,
      description,
      locale,
      siteName,
      type: 'website',
    },
  }
}

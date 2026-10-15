import { setRequestLocale } from 'next-intl/server'

import { InfosStage } from '@/components/infos/InfosStage'
import type { AppLocale } from '@/i18n/routing'
import { buildPageMetadata } from '@/lib/seo'

type PageProps = {
  params: Promise<{ locale: AppLocale }>
}

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params
  return buildPageMetadata(locale, 'infosTitle', 'infosDescription', '/infos', {
    image: '/campaign/getting-there-poster.jpg',
  })
}

export default async function InfosPage({ params }: PageProps) {
  const { locale } = await params
  setRequestLocale(locale)
  return <InfosStage />
}

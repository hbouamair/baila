import { setRequestLocale } from 'next-intl/server'

import { ExtrasStage } from '@/components/extras/ExtrasStage'
import type { AppLocale } from '@/i18n/routing'
import { buildPageMetadata } from '@/lib/seo'

type PageProps = {
  params: Promise<{ locale: AppLocale }>
}

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params
  return buildPageMetadata(locale, 'extrasTitle', 'extrasDescription', '/activites', {
    image: '/campaign/agafay.jpg',
  })
}

export default async function ExtrasPage({ params }: PageProps) {
  const { locale } = await params
  setRequestLocale(locale)
  return <ExtrasStage />
}

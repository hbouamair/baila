import { getTranslations, setRequestLocale } from 'next-intl/server'

import { AmbassadorForm } from '@/components/AmbassadorForm'
import { AmbassadorStage } from '@/components/ambassador/AmbassadorStage'
import type { AppLocale } from '@/i18n/routing'
import { buildPageMetadata } from '@/lib/seo'

type PageProps = {
  params: Promise<{ locale: AppLocale }>
}

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params
  return buildPageMetadata(locale, 'ambassadorsTitle', 'ambassadorsDescription', '/ambassadeurs')
}

export default async function AmbassadorsPage({ params }: PageProps) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'Ambassadors' })

  return (
    <AmbassadorStage
      titleLead={t('titleLead')}
      title={t('title')}
      intro={t('intro')}
      rewards={t('rewards')}
      apply={t('apply')}
      perks={[t('perk1'), t('perk2'), t('perk3'), t('perk4')]}
      reasons={[t('reason1'), t('reason2'), t('reason3'), t('reason4')]}
    >
      <AmbassadorForm locale={locale} />
    </AmbassadorStage>
  )
}

import { getTranslations, setRequestLocale } from 'next-intl/server'

import { HotelMark } from '@/components/HotelMark'
import { PageHero } from '@/components/PageHero'
import { RedirectNotice } from '@/components/RedirectNotice'
import { StayGrid } from '@/components/StayGrid'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import type { AppLocale } from '@/i18n/routing'
import { getSiteSettings } from '@/lib/payload'
import { buildPageMetadata } from '@/lib/seo'
import { earlyBirdMaxSaving } from '@/lib/stays'

type PageProps = {
  params: Promise<{ locale: AppLocale }>
}

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params
  return buildPageMetadata(locale, 'passTitle', 'passDescription', '/pass')
}

export default async function PassPage({ params }: PageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  const [settings, t] = await Promise.all([
    getSiteSettings(locale),
    getTranslations({ locale, namespace: 'Pass' }),
  ])

  const platform = settings.ticketingPlatformName || 'Go&Dance'
  const fallbackUrl = settings.ticketingUrl || 'https://example.com/billetterie'

  return (
    <>
      <PageHero title={t('title')} titleLead={t('titleLead')} intro={t('intro', { save: earlyBirdMaxSaving })}>
        <div className="space-y-6">
          <HotelMark place="Palm Plaza Marrakech" />
          <RedirectNotice />
        </div>
      </PageHero>
      <Section>
        <Container>
          <StayGrid locale={locale} platform={platform} href={fallbackUrl} />
        </Container>
      </Section>
    </>
  )
}

import { getTranslations, setRequestLocale } from 'next-intl/server'

import { GoAndanceTickets } from '@/components/GoAndanceTickets'
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
  return buildPageMetadata(locale, 'passTitle', 'passDescription', '/pass', {
    image: '/cinematic/hero.jpg',
  })
}

export default async function PassPage({ params }: PageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  const [settings, t] = await Promise.all([
    getSiteSettings(locale),
    getTranslations({ locale, namespace: 'Pass' }),
  ])

  const platform = settings.ticketingPlatformName || 'Go&Dance'

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
          <StayGrid locale={locale} platform={platform} href="#tickets" />
        </Container>
      </Section>
      <Section className="pt-0">
        <Container>
          <div id="tickets" className="scroll-mt-28">
            <p className="font-script text-[clamp(2rem,4vw,3.2rem)] leading-none text-blush">{t('ticketsLead')}</p>
            <h2 className="font-poster mt-2 text-[clamp(2.4rem,6vw,4.4rem)] leading-[0.9]">{t('ticketsTitle')}</h2>
            <p className="mt-4 max-w-[36rem] text-pretty text-paper/70">{t('ticketsIntro')}</p>
            <div className="mt-8 overflow-hidden rounded-[1.6rem] border border-white/10 bg-paper p-3 sm:p-5">
              <GoAndanceTickets locale={locale} />
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}

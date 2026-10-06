import { getTranslations, setRequestLocale } from 'next-intl/server'
import { RichText } from '@payloadcms/richtext-lexical/react'

import { Reveal } from '@/components/Reveal'
import { VenueStage } from '@/components/venue/VenueStage'
import { VenueStay } from '@/components/venue/VenueStay'
import { Link } from '@/i18n/navigation'
import type { AppLocale } from '@/i18n/routing'
import { withHotelName, withHotelNameDeep } from '@/lib/hotel'
import { getPracticalInfo } from '@/lib/payload'
import { buildPageMetadata } from '@/lib/seo'

type PageProps = {
  params: Promise<{ locale: AppLocale }>
}

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params
  return buildPageMetadata(locale, 'infoTitle', 'infoDescription', '/infos-pratiques')
}

export default async function PracticalInfoPage({ params }: PageProps) {
  const { locale } = await params
  setRequestLocale(locale)
  const [info, t] = await Promise.all([getPracticalInfo(locale), getTranslations('Info')])
  const nav = await getTranslations('Nav')
  const stay = await getTranslations('Stay')

  const hasContent = Boolean(info.address || info.access || info.accommodation)
  const stats = [
    { value: t('statCityValue'), label: t('statCity') },
    { value: t('statAirportValue'), label: t('statAirport') },
    { value: t('statWeatherValue'), label: t('statWeather') },
    { value: t('statDaysValue'), label: t('statDays') },
  ]

  return (
    <VenueStage
      title={t('heroLead')}
      headline={t('heroTitle')}
      hotel={t('hotel')}
      intro={t('intro')}
      stats={stats}
    >
      <VenueStay
        locale={locale}
        storyLead={t('storyLead')}
        storyTitle={t('storyTitle')}
        storyBody={t('storyBody')}
        groundsTitle={t('groundsTitle')}
        grounds={[
          { src: '/venue/pool.jpg?v=1', caption: t('shotPool'), position: 'center 72%' },
          { src: '/venue/terrace.jpg?v=1', caption: t('shotTerrace'), position: 'center 40%' },
          { src: '/venue/garden.jpg', caption: t('shotGarden'), position: 'center 45%' },
          { src: '/venue/exterior.jpg', caption: t('shotExterior'), position: 'center 40%' },
        ]}
        stayLead={t('stayLead')}
        stayTitle={t('stayTitle')}
        stayIntro={t('stayIntro')}
        nights={t('nights')}
        occupancy={(count) => stay('occupancy', { count })}
        seePasses={nav('discoverPasses')}
        stays={[
          {
            kicker: '01',
            body: t('catTwoBedBody'),
            extraSrc: '/venue/room.jpg?v=1',
            extraPosition: 'center 58%',
          },
          {
            kicker: '02',
            body: t('catOneBedBody'),
          },
          {
            kicker: '03',
            body: t('catDoubleBody'),
            extraSrc: '/venue/hotel-room.jpg?v=1',
            extraPosition: 'center 55%',
          },
        ]}
      />

      {hasContent ? (
        <section className="border-t border-white/10 px-5 py-[var(--space-section)] sm:px-10 lg:px-16">
          <div className="grid items-start gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              {info.address ? (
                <Reveal>
                  <h2 className="font-poster text-[clamp(2rem,4vw,3.2rem)] text-paper">{t('venue')}</h2>
                  <p className="mt-4 text-lg text-paper">{t('hotel')}</p>
                  <p className="mt-2 max-w-md whitespace-pre-line text-paper/70">
                    {info.address ? withHotelName(info.address) : null}
                  </p>
                </Reveal>
              ) : null}

              {info.access ? (
                <Reveal className="mt-12" delay={80}>
                  <h2 className="font-poster text-[clamp(2rem,4vw,3.2rem)] text-paper">{t('access')}</h2>
                  <div className="mt-4 max-w-xl text-paper/75 [&_p]:mb-2">
                    <RichText data={withHotelNameDeep(info.access)} />
                  </div>
                </Reveal>
              ) : null}

              {info.accommodation ? (
                <Reveal className="mt-12" delay={120}>
                  <h2 className="font-poster text-[clamp(2rem,4vw,3.2rem)] text-paper">{t('accommodation')}</h2>
                  <div className="mt-4 max-w-xl text-paper/75 [&_p]:mb-2">
                    <RichText data={withHotelNameDeep(info.accommodation)} />
                  </div>
                </Reveal>
              ) : null}
            </div>

            {info.mapEmbedUrl ? (
              <Reveal className="lg:sticky lg:top-28 lg:col-span-5" delay={160}>
                <div className="aspect-[16/10] overflow-hidden rounded-[1.6rem] border border-white/10 bg-night">
                  <iframe title={t('venue')} src={info.mapEmbedUrl} className="h-full w-full" loading="lazy" />
                </div>
              </Reveal>
            ) : null}
          </div>
        </section>
      ) : null}

      <section className="border-t border-white/10 px-5 py-16 sm:px-10 lg:px-16">
        <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <p className="font-poster text-[clamp(2.2rem,5vw,3.8rem)] leading-[0.9]">{t('ctaTitle')}</p>
            <p className="mt-4 max-w-[28rem] text-paper/70">{t('ctaBody')}</p>
          </div>
          <Link href="/pass" className="film-cta shrink-0">
            {nav('discoverPasses')}
            <span className="film-cta-mark" aria-hidden />
          </Link>
        </div>
      </section>
    </VenueStage>
  )
}

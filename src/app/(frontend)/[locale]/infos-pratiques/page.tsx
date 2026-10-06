import { getTranslations, setRequestLocale } from 'next-intl/server'
import { RichText } from '@payloadcms/richtext-lexical/react'

import { Reveal } from '@/components/Reveal'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { VenueStage } from '@/components/venue/VenueStage'
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

  const hasContent = Boolean(info.address || info.access || info.accommodation)
  const stats = [
    { value: t('statCityValue'), label: t('statCity') },
    { value: t('statAirportValue'), label: t('statAirport') },
    { value: t('statWeatherValue'), label: t('statWeather') },
    { value: t('statDaysValue'), label: t('statDays') },
  ]

  return (
    <>
      <VenueStage
        title={t('title')}
        hotel={t('hotel')}
        intro={t('intro')}
        place={t('hotelPlace')}
        roomsLabel={t('rooms')}
        stats={stats}
        shots={[
          { src: '/venue/room.jpg?v=1', caption: t('shotRoom'), position: 'center 58%' },
          { src: '/venue/hotel-room.jpg?v=1', caption: t('shotHotelRoom'), position: 'center 55%' },
          { src: '/venue/terrace.jpg?v=1', caption: t('shotTerrace'), position: 'center 40%' },
        ]}
      />
      <Section>
        <Container className="grid items-start gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            {!hasContent ? <p className="text-ink-muted">{t('empty')}</p> : null}

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

          <Reveal className="lg:sticky lg:top-28 lg:col-span-5" delay={160}>
            <div className="rounded-[1.6rem] border border-white/10 bg-velvet/70 p-6 sm:p-8">
              <p className="font-poster text-[2rem] leading-none">{t('hotel')}</p>
              <p className="mt-3 text-paper/70">{t('intro')}</p>
              {info.mapEmbedUrl ? (
                <div className="mt-6 aspect-[16/10] overflow-hidden rounded-[1.2rem] border border-white/10 bg-night">
                  <iframe title={t('venue')} src={info.mapEmbedUrl} className="h-full w-full" loading="lazy" />
                </div>
              ) : null}
              <Link href="/pass" className="film-cta mt-8">
                {nav('discoverPasses')}
                <span className="film-cta-mark" aria-hidden />
              </Link>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  )
}

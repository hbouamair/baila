import { getTranslations, setRequestLocale } from 'next-intl/server'

import { ArtistsStage } from '@/components/artists/ArtistsStage'
import type { AppLocale } from '@/i18n/routing'
import { getArtists } from '@/lib/payload'
import { buildPageMetadata } from '@/lib/seo'
import { featuredArtists } from '@/lib/stays'

type PageProps = {
  params: Promise<{ locale: AppLocale }>
}

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params
  return buildPageMetadata(locale, 'artistsTitle', 'artistsDescription', '/artistes')
}

export default async function ArtistsPage({ params }: PageProps) {
  const { locale } = await params
  setRequestLocale(locale)
  const [artists, t] = await Promise.all([
    getArtists(locale),
    getTranslations({ locale, namespace: 'Artists' }),
  ])
  const extras = featuredArtists.map((featured) => ({
    id: featured.id,
    name: featured.name,
    slug: featured.slug,
    role: featured.role,
    photo: featured.photo,
    country: null,
  }))
  const rest = artists.filter((artist) => !featuredArtists.some((featured) => featured.slug === artist.slug))
  const lineup = [...extras, ...rest]
  const dancers = lineup.filter((artist) => artist.role !== 'dj')
  const djs = lineup.filter((artist) => artist.role === 'dj')

  return (
    <ArtistsStage
      locale={locale}
      titleLead={t('titleLead')}
      title={t('title')}
      caption={t.rich('caption', {
        accent: (chunks) => <span className="font-script text-[1.15em] leading-none text-blush">{chunks}</span>,
      })}
      countLabel={t('countLabel', { count: lineup.length })}
      sectionKicker={t('sectionArtistsKicker')}
      sectionDisplay={t('sectionArtists')}
      sectionScript={t('sectionArtistsScript')}
      sectionIntro={t.rich('sectionArtistsIntro', {
        accent: (chunks) => <span className="font-script text-[1.2em] leading-none text-blush">{chunks}</span>,
      })}
      sectionNames={t('sectionNames', { count: dancers.length })}
      sectionDjs={t('sectionDjs')}
      sectionDjsKicker={t('sectionDjsKicker')}
      sectionDjsScript={t('sectionDjsScript')}
      sectionDjsIntro={t('sectionDjsIntro')}
      sectionDjNames={t('sectionDjNames', { count: djs.length })}
      empty={t('empty')}
      dancers={dancers}
      djs={djs}
    />
  )
}

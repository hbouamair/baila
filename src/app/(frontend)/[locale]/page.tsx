import { getFormatter, getTranslations, setRequestLocale } from 'next-intl/server'

import { CinematicFilm } from '@/components/cinematic/CinematicFilm'
import { AfterFilm } from '@/components/home/AfterFilm'
import type { AppLocale } from '@/i18n/routing'
import { getArtists, getSiteSettings } from '@/lib/payload'
import { buildPageMetadata } from '@/lib/seo'
import { featuredArtists, stayPackages } from '@/lib/stays'
import { formatCompactRange, formatPrice, resolveArtistPhoto } from '@/lib/utils'

type PageProps = {
  params: Promise<{ locale: AppLocale }>
}

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params
  return buildPageMetadata(locale, 'homeTitle', 'homeDescription', '/')
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  const [artists, settings, film, roles, home, stay, format] = await Promise.all([
    getArtists(locale),
    getSiteSettings(locale),
    getTranslations({ locale, namespace: 'Film' }),
    getTranslations({ locale, namespace: 'Artists' }),
    getTranslations({ locale, namespace: 'Home' }),
    getTranslations({ locale, namespace: 'Stay' }),
    getFormatter({ locale }),
  ])

  const when = formatCompactRange(
    settings.startDate && settings.startDate.startsWith('2027-05-2') ? settings.startDate : '2027-05-20',
    settings.endDate && settings.endDate.startsWith('2027-05-2') ? settings.endDate : '2027-05-24',
    locale,
  )

  const extras = featuredArtists.map((artist) => ({
    id: artist.id,
    name: artist.name,
    slug: artist.slug,
    roleLabel: roles('role_dancer'),
    country: null,
    photo: artist.photo,
  }))
  const rest = artists
    .filter((artist) => !featuredArtists.some((featured) => featured.slug === artist.slug))
    .map((artist) => ({
      id: artist.id,
      name: artist.name,
      slug: artist.slug,
      roleLabel: roles(`role_${artist.role}` as 'role_dancer'),
      country: artist.country,
      photo: resolveArtistPhoto(artist),
    }))
  const lineup = [...extras, ...rest]

  const featuredStay = stayPackages[0]
  const early = featuredStay.tiers[0]
  const start = new Date('2027-05-20T12:00:00.000Z')
  const end = new Date('2027-05-24T12:00:00.000Z')
  const festivalDays = ['2027-05-20', '2027-05-21', '2027-05-22', '2027-05-23'].map((date) => {
    const parsed = new Date(`${date}T00:00:00.000Z`)
    return {
      weekday: format.dateTime(parsed, { weekday: 'long', timeZone: 'UTC' }),
      dayNum: format.dateTime(parsed, { day: 'numeric', timeZone: 'UTC' }),
    }
  })

  return (
    <>
      <CinematicFilm
        when={when}
        where="Palm Plaza Marrakech"
        date={{
          start: format.dateTime(start, { day: 'numeric', timeZone: 'UTC' }),
          join: home('dateJoin'),
          end: format.dateTime(end, { day: 'numeric', timeZone: 'UTC' }),
          month: format.dateTime(start, { month: 'long', timeZone: 'UTC' }),
          year: format.dateTime(start, { year: 'numeric', timeZone: 'UTC' }),
        }}
        artists={lineup}
        copy={{
          artists: film('artists'),
          international: film('international'),
          getPass: film('getPass'),
        }}
      />
      <AfterFilm
        daysTitle={home('daysTitle')}
        daysIntro={home('daysIntro')}
        seeProgramme={home('seeProgramme')}
        days={festivalDays}
        stayTitle={home('stayTitle')}
        stayIntro={home('stayIntro')}
        stayFrom={home('stayFrom')}
        stayPrice={formatPrice(early.price, 'EUR', locale)}
        stayNote={stay('perPerson')}
        stayCta={home('stayCta')}
        stayPhoto="/cinematic/hero.jpg?v=7"
      />
    </>
  )
}

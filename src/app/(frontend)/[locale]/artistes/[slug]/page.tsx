import { getTranslations, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { RichText } from '@payloadcms/richtext-lexical/react'

import { Container } from '@/components/ui/Container'
import { Link } from '@/i18n/navigation'
import type { AppLocale } from '@/i18n/routing'
import { getArtistBySlug } from '@/lib/payload'
import { buildPageMetadata } from '@/lib/seo'
import { featuredArtists } from '@/lib/stays'
import { getMediaAlt, resolveArtistPhoto } from '@/lib/utils'

type PageProps = {
  params: Promise<{ locale: AppLocale; slug: string }>
}

export async function generateMetadata({ params }: PageProps) {
  const { locale, slug } = await params
  const artist = (await getArtistBySlug(slug, locale)) || featuredArtists.find((item) => item.slug === slug)
  const base = await buildPageMetadata(locale, 'artistsTitle', 'artistsDescription', {
    pathname: '/artistes/[slug]',
    params: { slug },
  })
  return {
    ...base,
    title: artist ? `${artist.name} - Bailaimos` : base.title,
  }
}

export default async function ArtistDetailPage({ params }: PageProps) {
  const { locale, slug } = await params
  setRequestLocale(locale)
  const cmsArtist = await getArtistBySlug(slug, locale)
  const featured = featuredArtists.find((item) => item.slug === slug)
  if (!cmsArtist && !featured) notFound()

  const t = await getTranslations({ locale, namespace: 'Artists' })
  const name = cmsArtist?.name || featured?.name || slug
  const role = cmsArtist?.role || featured?.role || 'dancer'
  const photo = featured?.photo || (cmsArtist ? resolveArtistPhoto(cmsArtist) : '')
  const country = cmsArtist?.country

  return (
    <div className="bg-night pb-24 pt-32 text-paper">
      <Container className="grid gap-10 lg:grid-cols-[minmax(0,22rem)_1fr] lg:items-end">
        <div className="film-frame">
          <div className="film-frame-core aspect-[4/5]">
            <img
              src={photo}
              alt={cmsArtist ? getMediaAlt(cmsArtist.photo) || name : name}
              className="h-full w-full object-cover"
              style={{ objectPosition: 'center 42%' }}
            />
          </div>
        </div>
        <div>
          <Link href="/artistes" className="text-sm text-paper/70 underline-offset-4 hover:text-sun hover:underline">
            {t('back')}
          </Link>
          <h1 className="font-poster mt-6 text-[clamp(3rem,7vw,5.6rem)]">{name}</h1>
          <p className="mt-3 text-paper/70">
            {t(`role_${role}` as 'role_dancer')}
            {country ? ` · ${country}` : ''}
          </p>
        </div>
      </Container>
      <Container className="mt-14 max-w-3xl">
        {cmsArtist?.bio ? (
          <div className="measure text-paper/80 [&_p]:mb-3">
            <RichText data={cmsArtist.bio} />
          </div>
        ) : null}
        {cmsArtist?.socials?.length ? (
          <ul className="mt-8 flex flex-wrap gap-2">
            {cmsArtist.socials.map((item) => (
              <li key={item.url}>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center rounded-full border border-white/12 px-4 py-2 text-sm hover:border-sun hover:text-sun"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        ) : null}
      </Container>
    </div>
  )
}
